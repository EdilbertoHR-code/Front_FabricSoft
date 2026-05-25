import { useEffect, useRef } from 'react';
import { api } from '../config/api';
import { useI18n } from './I18nProvider';

const originalText = new WeakMap<Text, string>();
const translatedText = new WeakMap<Text, string>();
const textCache = new Map<string, string>();

function normalize(text: string) {
  return text.replace(/\s+/g, ' ').trim();
}

function shouldSkipElement(element: Element | null) {
  if (!element) return true;
  const tag = element.tagName.toLowerCase();
  if (['script', 'style', 'noscript', 'textarea', 'input', 'select', 'option'].includes(tag)) return true;
  if (element.closest('[data-no-translate], .notranslate, .admin-main, .fabric-typewriter')) return true;
  return false;
}

function shouldTranslate(text: string) {
  const value = normalize(text);
  if (value.length < 2) return false;
  if (value.length > 900) return false;
  if (/^[\d\s.,:;|/\\()[\]{}+\-%$#@!?'"]+$/.test(value)) return false;
  if (/^[A-Z0-9\s.,:;|/\\()[\]{}+\-%$#@!?'"]{1,18}$/.test(value)) return false;
  if (value.includes('@') || value.startsWith('http')) return false;
  return /[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(value);
}

function collectTextNodes(root: HTMLElement) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const textNode = node as Text;
      if (shouldSkipElement(textNode.parentElement)) return NodeFilter.FILTER_REJECT;
      if (!shouldTranslate(textNode.data)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes: Text[] = [];
  let node = walker.nextNode();
  while (node) {
    nodes.push(node as Text);
    node = walker.nextNode();
  }
  return nodes;
}

export default function PageTranslator() {
  const { lang } = useI18n();
  const debounceRef = useRef<number | null>(null);
  const requestId = useRef(0);

  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) return;

    const restoreSpanish = () => {
      collectTextNodes(root).forEach(node => {
        const original = originalText.get(node);
        if (original) node.data = original;
      });
    };

    const translatePage = async () => {
      const currentRequest = ++requestId.current;
      const nodes = collectTextNodes(root);

      nodes.forEach(node => {
        if (!originalText.has(node)) originalText.set(node, node.data);
      });

      const pendingNodes = nodes.filter(node => !translatedText.has(node));
      pendingNodes.forEach(node => {
        const original = normalize(originalText.get(node) ?? node.data);
        const cached = textCache.get(original);
        if (cached) {
          translatedText.set(node, cached);
          node.data = cached;
        }
      });

      const unresolvedNodes = pendingNodes.filter(node => !translatedText.has(node));
      const uniqueTexts = [...new Set(unresolvedNodes.map(node => normalize(originalText.get(node) ?? node.data)))];
      if (uniqueTexts.length === 0) {
        nodes.forEach(node => {
          const cached = translatedText.get(node);
          if (cached) node.data = cached;
        });
        return;
      }

      try {
        const res = await api.post('/i18n/translate', {
          targetLang: lang,
          texts: uniqueTexts,
        });
        if (currentRequest !== requestId.current) return;

        const translations = res.data.data ?? {};
        Object.entries(translations).forEach(([source, translated]) => {
          if (typeof translated === 'string') textCache.set(source, translated);
        });

        unresolvedNodes.forEach(node => {
          const original = normalize(originalText.get(node) ?? node.data);
          const translated = translations[original];
          if (translated) {
            translatedText.set(node, translated);
            node.data = translated;
          }
        });
      } catch {
        // If the API is unavailable, keep the curated dictionary translations only.
      }
    };

    const schedule = () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        if (lang === 'en') translatePage();
        else restoreSpanish();
      }, 35);
    };

    schedule();

    const observer = new MutationObserver(() => schedule());
    observer.observe(root, { childList: true, subtree: true, characterData: true });

    return () => {
      observer.disconnect();
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [lang]);

  return null;
}
