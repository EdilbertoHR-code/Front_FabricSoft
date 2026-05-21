// Central navigation and CTA flow glue.
(function () {
  function targetFromHash(hash) {
    if (!hash || hash === '#') return null;
    try {
      return document.getElementById(decodeURIComponent(hash.slice(1)));
    } catch (e) {
      return null;
    }
  }

  function scrollToHash(hash) {
    var target = targetFromHash(hash);
    if (!target) return false;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', hash);
    return true;
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (link.dataset.wizard) return;
      if (!targetFromHash(link.getAttribute('href'))) return;
      e.preventDefault();
      scrollToHash(link.getAttribute('href'));
    });
  });

  document.querySelectorAll('[data-ai-scenario]').forEach(function (link) {
    link.addEventListener('click', function () {
      var scenario = link.dataset.aiScenario;
      var trigger = Array.prototype.find.call(document.querySelectorAll('.ai-scenario'), function (btn) {
        return btn.textContent.trim() === scenario;
      });
      if (trigger) {
        setTimeout(function () { trigger.click(); }, 450);
      }
    });
  });

  document.querySelectorAll('[data-engagement-intent]').forEach(function (link) {
    link.addEventListener('click', function () {
      try {
        sessionStorage.setItem('fabricEngagementIntent', link.dataset.engagementIntent);
      } catch (e) {}
    });
  });
})();
