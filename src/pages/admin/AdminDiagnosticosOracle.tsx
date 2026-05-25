import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'sonner';
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock3,
  LockKeyhole,
  Mail,
  Paperclip,
  Phone,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Trash2,
  UserRound,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { api } from '../../config/api';

type DiagnosticStatus = 'nuevo' | 'en_revision' | 'contactado' | 'aprobado' | 'descartado';
type EmailStatus = 'not_sent' | 'sent' | 'preview' | 'failed';

type Diagnostic = {
  _id: string;
  contact: {
    name: string;
    role: string;
    email: string;
    company: string;
    phone?: string;
  };
  answers: Array<{
    questionId: number;
    question: string;
    answer: string;
    score: number;
  }>;
  result: {
    totalScore: number;
    level: 'CRITICO' | 'ALTO' | 'MEDIO' | 'BAJO';
    description: string;
    action: string;
    investment: string;
    roi: string;
    pattern: string;
  };
  status: DiagnosticStatus;
  emailStatus?: EmailStatus;
  emailSentAt?: string | null;
  emailError?: string;
  ip: string;
  userAgent: string;
  createdAt: string;
};

const STATUS_ORDER: DiagnosticStatus[] = ['nuevo', 'en_revision', 'contactado', 'aprobado', 'descartado'];

const STATUS_LABEL: Record<DiagnosticStatus, string> = {
  nuevo: 'Nuevo',
  en_revision: 'En revision',
  contactado: 'Contactado',
  aprobado: 'Aprobado',
  descartado: 'Descartado',
};

const STATUS_HINT: Record<DiagnosticStatus, string> = {
  nuevo: 'Entrada sin revisar',
  en_revision: 'Caso evaluado por admin',
  contactado: 'Prospecto ya recibido',
  aprobado: 'Listo para admision',
  descartado: 'Fuera de pipeline',
};

const STATUS_CLASS: Record<DiagnosticStatus, string> = {
  nuevo: 'border-sky-400/25 bg-sky-400/10 text-sky-300',
  en_revision: 'border-amber-300/30 bg-amber-300/10 text-amber-200',
  contactado: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
  aprobado: 'border-lime-400/25 bg-lime-400/10 text-lime-300',
  descartado: 'border-red-400/25 bg-red-400/10 text-red-300',
};

const EMAIL_LABEL: Record<EmailStatus, string> = {
  not_sent: 'No enviado',
  sent: 'Enviado',
  preview: 'Pendiente manual',
  failed: 'Error',
};

const EMAIL_CLASS: Record<EmailStatus, string> = {
  not_sent: 'border-zinc-700 bg-zinc-900 text-zinc-400',
  sent: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
  preview: 'border-amber-300/30 bg-amber-300/10 text-amber-200',
  failed: 'border-red-400/25 bg-red-400/10 text-red-300',
};

const LEVEL_CLASS: Record<string, string> = {
  CRITICO: 'text-red-300',
  ALTO: 'text-red-200',
  MEDIO: 'text-amber-200',
  BAJO: 'text-zinc-400',
};

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

function buildMailtoUrl(to: string, subject: string, body: string) {
  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function defaultEmailSubject(item: Diagnostic) {
  return `Diagnostico Oracle FABRIC - ${item.contact.company}`;
}

function defaultEmailMessage(item: Diagnostic) {
  return [
    `Hola ${item.contact.name},`,
    '',
    'Gracias por completar el diagnostico ejecutivo de FABRIC.',
    '',
    `Nivel detectado: ${item.result.level}`,
    `Patron principal: ${item.result.pattern}`,
    `Accion recomendada: ${item.result.action}`,
    `Inversion tipica: ${item.result.investment}`,
    '',
    item.result.description,
    '',
    'Este diagnostico es orientativo. El siguiente paso recomendado es una evaluacion senior para confirmar alcance, prioridades y viabilidad.',
    '',
    'FABRIC',
  ].join('\n');
}

function canMoveStatus(current: DiagnosticStatus, next: DiagnosticStatus) {
  return STATUS_ORDER.indexOf(next) >= STATUS_ORDER.indexOf(current);
}

function canSendDiagnostic(item: Diagnostic) {
  return ['en_revision', 'contactado', 'aprobado'].includes(item.status);
}

export default function AdminDiagnosticosOracle() {
  const { getToken } = useAuth();
  const [items, setItems] = useState<Diagnostic[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<DiagnosticStatus | 'todos'>('todos');
  const [levelFilter, setLevelFilter] = useState<string>('todos');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [composeItem, setComposeItem] = useState<Diagnostic | null>(null);

  const loadDiagnostics = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      if (!token) return;

      const { data } = await api.get('/diagnostico-oracle', {
        headers: authHeaders(token),
      });

      const nextItems = data.diagnosticos || [];
      setItems(nextItems);
      setSelectedId((current) => current || nextItems[0]?._id || null);
    } catch (error: any) {
      toast.error('No se pudieron cargar los diagnosticos', {
        description: error.response?.data?.error || 'Revisa el backend e intenta otra vez.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDiagnostics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      if (statusFilter !== 'todos' && item.status !== statusFilter) return false;
      if (levelFilter !== 'todos' && item.result.level !== levelFilter) return false;

      if (!query) return true;

      return [
        item.contact.name,
        item.contact.role,
        item.contact.email,
        item.contact.company,
        item.result.level,
        item.result.pattern,
        item.result.action,
        item.emailStatus,
        item.ip,
      ].some((value) => String(value || '').toLowerCase().includes(query));
    });
  }, [items, levelFilter, search, statusFilter]);

  const selected =
    filtered.find((item) => item._id === selectedId) ||
    items.find((item) => item._id === selectedId) ||
    filtered[0] ||
    items[0];

  const stats = useMemo(() => {
    const critical = items.filter((item) => ['CRITICO', 'ALTO'].includes(item.result.level)).length;
    const sent = items.filter((item) => item.emailStatus === 'sent').length;
    return { critical, sent };
  }, [items]);

  const updateStatus = async (id: string, status: DiagnosticStatus) => {
    const current = items.find((item) => item._id === id);

    if (current && !canMoveStatus(current.status, status)) {
      toast.error('Flujo bloqueado', {
        description: 'No puedes regresar un diagnostico a un estado anterior.',
      });
      return;
    }

    try {
      const token = await getToken();
      if (!token) return;

      const { data } = await api.patch(
        `/diagnostico-oracle/${id}/status`,
        { status },
        { headers: authHeaders(token) },
      );

      setItems((currentItems) => currentItems.map((item) => (item._id === id ? data.diagnostico : item)));
      toast.success('Estado actualizado');
    } catch (error: any) {
      toast.error('No se pudo actualizar el diagnostico', {
        description: error.response?.data?.error || 'Intenta otra vez.',
      });
    }
  };

  const sendDiagnostic = async (item: Diagnostic) => {
    if (!canSendDiagnostic(item)) {
      toast.error('Primero evalua el caso', {
        description: 'Marca el diagnostico como En revision o superior antes de enviarlo.',
      });
      return;
    }

    setComposeItem(item);
  };

  const openEmailComposer = async (item: Diagnostic, subject: string, message: string, attachmentName: string) => {
    try {
      const token = await getToken();
      if (!token) return;

      setSendingId(item._id);

      const { data } = await api.post(
        `/diagnostico-oracle/${item._id}/send`,
        {
          mode: 'manual',
          subject,
          message,
          attachmentName,
        },
        { headers: authHeaders(token) },
      );

      if (data.diagnostico) {
        setItems((current) => current.map((entry) => (entry._id === item._id ? data.diagnostico : entry)));
      }

      window.location.href = data.mailtoUrl || buildMailtoUrl(item.contact.email, subject, message);
      setComposeItem(null);

      toast.success('Correo preparado', {
        description: attachmentName ? 'Adjunta el archivo seleccionado antes de enviarlo.' : 'Revisa el mensaje antes de enviarlo.',
      });
    } catch (error: any) {
      if (error.response?.data?.diagnostico) {
        setItems((current) => current.map((entry) => (entry._id === item._id ? error.response.data.diagnostico : entry)));
      }

      toast.error('No se pudo preparar el correo', {
        description: error.response?.data?.error || 'Revisa el diagnostico e intenta otra vez.',
      });
    } finally {
      setSendingId(null);
    }
  };

  const deleteDiagnostic = async (item: Diagnostic) => {
    const confirmed = window.confirm(`Eliminar diagnostico de ${item.contact.company}? Esta accion no se puede deshacer.`);
    if (!confirmed) return;

    try {
      const token = await getToken();
      if (!token) return;

      setDeletingId(item._id);

      await api.delete(`/diagnostico-oracle/${item._id}`, {
        headers: authHeaders(token),
      });

      setItems((current) => {
        const next = current.filter((entry) => entry._id !== item._id);
        setSelectedId(next[0]?._id || null);
        return next;
      });

      toast.success('Diagnostico eliminado');
    } catch (error: any) {
      toast.error('No se pudo eliminar el diagnostico', {
        description: error.response?.data?.error || 'Intenta otra vez.',
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#17181B] px-3 py-4 text-zinc-100 sm:px-5 lg:px-8">
      <style>{`
        @keyframes diagnosticIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <header className="overflow-hidden border border-zinc-800 bg-[#111214] shadow-[0_18px_44px_rgba(0,0,0,0.18)] animate-[diagnosticIn_260ms_ease-out]">
        <div className="flex flex-col gap-5 border-b border-zinc-800 p-5 sm:p-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 border border-amber-400/25 bg-amber-400/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300">
              <ClipboardList size={13} />
              Rescue Diagnostic
            </div>
            <h1 className="font-serif text-3xl leading-tight text-zinc-50 sm:text-4xl">
              Diagnosticos Oracle
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              Pipeline ejecutivo para revisar solicitudes, bloquear avances hacia atras y enviar el diagnostico al correo corporativo del prospecto.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Stat icon={ClipboardList} label="Total" value={String(items.length)} />
            <Stat icon={AlertTriangle} label="Riesgo alto" value={String(stats.critical)} />
            <Stat icon={Send} label="Enviados" value={String(stats.sent)} />
          </div>
        </div>

        <div className="grid gap-3 p-4 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto] lg:items-center">
          <div className="relative min-w-0">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-10 w-full border border-zinc-800 bg-[#17181B] pl-9 pr-3 text-sm text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-amber-400/40"
              placeholder="Buscar empresa, email, nivel, patron, IP..."
            />
          </div>

          <Select value={statusFilter} onChange={(value) => setStatusFilter(value as DiagnosticStatus | 'todos')}>
            <option value="todos">Todos los estados</option>
            {Object.entries(STATUS_LABEL).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>

          <Select value={levelFilter} onChange={setLevelFilter}>
            <option value="todos">Todos los niveles</option>
            <option value="CRITICO">Critico</option>
            <option value="ALTO">Alto</option>
            <option value="MEDIO">Medio</option>
            <option value="BAJO">Bajo</option>
          </Select>

          <button
            type="button"
            onClick={loadDiagnostics}
            disabled={loading}
            className="inline-flex h-10 items-center justify-center gap-2 border border-zinc-800 bg-[#17181B] px-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400 transition hover:border-zinc-700 hover:text-zinc-100 disabled:cursor-wait disabled:opacity-60"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Actualizar
          </button>
        </div>
      </header>

      <section className="mt-5 grid gap-5 xl:grid-cols-[420px_minmax(0,1fr)]">
        <aside className="overflow-hidden border border-zinc-800 bg-[#111214] animate-[diagnosticIn_320ms_ease-out]">
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
              Solicitudes
            </span>
            <span className="font-mono text-[10px] text-zinc-500">{filtered.length}/{items.length}</span>
          </div>

          <div className="max-h-[560px] overflow-y-auto p-2 xl:h-[calc(100vh-315px)] xl:max-h-none">
            {loading && (
              <div className="border border-zinc-800 bg-[#17181B] p-4 text-sm text-zinc-500">
                Cargando diagnosticos...
              </div>
            )}

            {!loading && filtered.length === 0 && (
              <EmptyState
                icon={AlertTriangle}
                title="Sin resultados"
                text="Ajusta filtros o espera a que entren nuevas solicitudes desde el diagnostico publico."
              />
            )}

            <div className="space-y-1.5">
              {filtered.map((item) => {
                const active = selected?._id === item._id;
                const emailStatus = item.emailStatus || 'not_sent';

                return (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() => setSelectedId(item._id)}
                    className={[
                      'grid w-full grid-cols-[minmax(0,1fr)_auto] gap-3 border px-3 py-3 text-left transition active:scale-[0.99]',
                      active
                        ? 'border-amber-400/35 bg-amber-400/10'
                        : 'border-zinc-800 bg-[#17181B] hover:border-zinc-700 hover:bg-zinc-900/60',
                    ].join(' ')}
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-zinc-100">{item.contact.company}</div>
                      <div className="mt-1 truncate text-xs text-zinc-500">{item.contact.name} / {item.contact.role}</div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <Badge label={STATUS_LABEL[item.status]} className={STATUS_CLASS[item.status]} />
                        <Badge label={item.result.level} />
                        {emailStatus !== 'not_sent' && <Badge label={EMAIL_LABEL[emailStatus]} className={EMAIL_CLASS[emailStatus]} />}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-serif text-3xl leading-none ${LEVEL_CLASS[item.result.level] || 'text-zinc-50'}`}>
                        {item.result.totalScore}
                      </div>
                      <div className="mt-2 text-[10px] text-zinc-600">{formatRelative(item.createdAt)}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <main className="min-h-[620px] overflow-hidden border border-zinc-800 bg-[#111214] animate-[diagnosticIn_380ms_ease-out]">
          {selected ? (
            <DiagnosticDetail
              item={selected}
              deleting={deletingId === selected._id}
              sending={sendingId === selected._id}
              onDelete={() => deleteDiagnostic(selected)}
              onSend={() => sendDiagnostic(selected)}
              onStatusChange={(status) => updateStatus(selected._id, status)}
            />
          ) : (
            <div className="grid min-h-[620px] place-items-center p-8 text-center">
              <EmptyState icon={ClipboardList} title="Selecciona una solicitud" text="Los diagnosticos recibidos apareceran en la bandeja izquierda." />
            </div>
          )}
        </main>
      </section>

      {composeItem && (
        <EmailComposerModal
          item={composeItem}
          sending={sendingId === composeItem._id}
          onClose={() => setComposeItem(null)}
          onSubmit={(subject, message, attachmentName) => openEmailComposer(composeItem, subject, message, attachmentName)}
        />
      )}
    </div>
  );
}

function EmailComposerModal({
  item,
  sending,
  onClose,
  onSubmit,
}: {
  item: Diagnostic;
  sending: boolean;
  onClose: () => void;
  onSubmit: (subject: string, message: string, attachmentName: string) => void;
}) {
  const [subject, setSubject] = useState(() => defaultEmailSubject(item));
  const [message, setMessage] = useState(() => defaultEmailMessage(item));
  const [attachmentName, setAttachmentName] = useState('');

  useEffect(() => {
    setSubject(defaultEmailSubject(item));
    setMessage(defaultEmailMessage(item));
    setAttachmentName('');
  }, [item]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!subject.trim() || !message.trim()) {
      toast.error('Completa asunto y mensaje');
      return;
    }

    onSubmit(subject.trim(), message.trim(), attachmentName);
  };

  return (
    <div className="fixed inset-0 z-[120] grid place-items-center bg-black/75 px-4 py-6 backdrop-blur-sm animate-[diagnosticIn_180ms_ease-out]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[620px] overflow-hidden border border-zinc-800 bg-[#111214] shadow-[0_28px_80px_rgba(0,0,0,0.55)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-800 p-4 sm:p-5">
          <div className="min-w-0">
            <div className="mb-1 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-300">
              <Mail size={13} />
              Preparar correo
            </div>
            <h3 className="truncate font-serif text-2xl text-zinc-50">{item.contact.company}</h3>
            <p className="mt-1 text-xs text-zinc-500">{item.contact.email}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={sending}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-zinc-800 text-zinc-400 transition hover:border-zinc-700 hover:text-zinc-100 disabled:opacity-50"
            aria-label="Cerrar"
          >
            <X size={15} />
          </button>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          <label className="block">
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Asunto</span>
            <input
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="h-10 w-full border border-zinc-800 bg-[#17181B] px-3 text-sm text-zinc-100 outline-none transition focus:border-amber-400/40"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Mensaje</span>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="min-h-[220px] w-full resize-y border border-zinc-800 bg-[#17181B] p-3 text-sm leading-6 text-zinc-100 outline-none transition focus:border-amber-400/40"
            />
          </label>

          <label className="flex cursor-pointer flex-col gap-2 border border-dashed border-zinc-800 bg-[#17181B] p-3 transition hover:border-amber-400/35 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex min-w-0 items-center gap-2 text-sm text-zinc-300">
              <Paperclip size={15} className="shrink-0 text-amber-300" />
              <span className="truncate">{attachmentName || 'Seleccionar archivo opcional'}</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">Adjunto manual</span>
            <input
              type="file"
              className="hidden"
              onChange={(event) => setAttachmentName(event.target.files?.[0]?.name || '')}
            />
          </label>

          {attachmentName && (
            <div className="border border-amber-300/20 bg-amber-300/10 p-3 text-xs leading-5 text-amber-100">
              Por seguridad del navegador, el archivo no se adjunta automaticamente. Al abrir el correo, adjunta manualmente: {attachmentName}.
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-zinc-800 p-4 sm:flex-row sm:justify-end sm:p-5">
          <button
            type="button"
            onClick={onClose}
            disabled={sending}
            className="inline-flex h-10 items-center justify-center border border-zinc-800 px-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400 transition hover:border-zinc-700 hover:text-zinc-100 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={sending}
            className="inline-flex h-10 items-center justify-center gap-2 border border-amber-400/30 bg-amber-400/10 px-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-200 transition hover:border-amber-300 hover:bg-amber-400/15 disabled:cursor-wait disabled:opacity-60"
          >
            {sending ? <RefreshCw size={15} className="animate-spin" /> : <Send size={15} />}
            Abrir correo
          </button>
        </div>
      </form>
    </div>
  );
}

function DiagnosticDetail({
  item,
  deleting,
  sending,
  onDelete,
  onSend,
  onStatusChange,
}: {
  item: Diagnostic;
  deleting: boolean;
  sending: boolean;
  onDelete: () => void;
  onSend: () => void;
  onStatusChange: (status: DiagnosticStatus) => void;
}) {
  const sendEnabled = canSendDiagnostic(item);
  const emailStatus = item.emailStatus || 'not_sent';

  return (
    <div className="grid min-h-full gap-0 lg:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_380px]">
      <section className="min-w-0 border-b border-zinc-800 p-5 lg:border-b-0 lg:border-r 2xl:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300">
              Resultado tecnico
            </div>
            <h2 className="mt-1 break-words font-serif text-2xl text-zinc-50 sm:text-3xl">
              {item.contact.company}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              {item.result.description} Patron: {item.result.pattern}.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 xl:justify-end">
            <div className="text-left xl:text-right">
              <div className={`font-serif text-5xl ${LEVEL_CLASS[item.result.level] || 'text-zinc-50'}`}>{item.result.totalScore}</div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">{item.result.level}</div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onSend}
                disabled={!sendEnabled || sending}
                className={[
                  'inline-flex h-10 items-center justify-center gap-2 border px-3 text-[10px] font-semibold uppercase tracking-[0.14em] transition',
                  sendEnabled
                    ? 'border-amber-400/30 bg-amber-400/10 text-amber-200 hover:border-amber-300 hover:bg-amber-400/15'
                    : 'cursor-not-allowed border-zinc-800 bg-[#17181B] text-zinc-600',
                ].join(' ')}
                title={sendEnabled ? 'Enviar diagnostico al correo corporativo' : 'Primero marca el caso como En revision o superior'}
              >
                {sending ? <RefreshCw size={15} className="animate-spin" /> : <Send size={15} />}
                <span className="hidden sm:inline">{emailStatus === 'sent' ? 'Reenviar' : 'Enviar'}</span>
              </button>
              <button
                type="button"
                onClick={onDelete}
                disabled={deleting}
                className="inline-flex h-10 w-10 items-center justify-center border border-red-400/25 bg-red-400/10 text-red-300 transition hover:border-red-300 hover:bg-red-400/15 disabled:cursor-wait disabled:opacity-60"
                aria-label="Eliminar diagnostico"
                title="Eliminar diagnostico"
              >
                {deleting ? <RefreshCw size={16} className="animate-spin" /> : <Trash2 size={16} />}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <Info icon={UserRound} label="Directivo" value={item.contact.name} />
          <Info icon={ShieldCheck} label="Cargo" value={item.contact.role} />
          <Info icon={Building2} label="Empresa" value={item.contact.company} />
          <Info icon={Mail} label="Email" value={item.contact.email} />
          <Info icon={Phone} label="Telefono" value={item.contact.phone || 'No capturado'} />
          <Info icon={Clock3} label="Recibido" value={new Date(item.createdAt).toLocaleString('es-MX')} />
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-3">
          <Panel title="Accion recomendada">
            <p className="text-sm leading-6 text-zinc-300">{item.result.action}</p>
          </Panel>
          <Panel title="Inversion tipica">
            <p className="text-sm leading-6 text-amber-200">{item.result.investment}</p>
          </Panel>
          <Panel title="ROI esperado">
            <p className="text-sm leading-6 text-zinc-300">{item.result.roi}</p>
          </Panel>
        </div>

        <Panel title="Respuestas" className="mt-5">
          <div className="max-h-[430px] overflow-y-auto pr-1">
            <div className="divide-y divide-zinc-800">
              {item.answers.map((answer) => (
                <div key={answer.questionId} className="grid gap-3 py-3 md:grid-cols-[minmax(0,1fr)_220px_52px] md:items-center">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-zinc-600">Pregunta {answer.questionId}</div>
                    <div className="mt-1 text-sm leading-5 text-zinc-300">{answer.question}</div>
                  </div>
                  <div className="text-sm font-medium text-zinc-100">{answer.answer}</div>
                  <div className="font-mono text-xs text-amber-200">+{answer.score}</div>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </section>

      <aside className="p-5 2xl:p-6">
        <StatusPanel item={item} onStatusChange={onStatusChange} />
        <EmailPanel item={item} sending={sending} onSend={onSend} />

        <Panel title="Origen" className="mt-5">
          <div className="space-y-3 text-xs text-zinc-400">
            <Row label="IP" value={item.ip || 'No disponible'} />
            <Row label="User agent" value={item.userAgent || 'No disponible'} />
          </div>
        </Panel>
      </aside>
    </div>
  );
}

function StatusPanel({ item, onStatusChange }: { item: Diagnostic; onStatusChange: (status: DiagnosticStatus) => void }) {
  const currentIndex = STATUS_ORDER.indexOf(item.status);
  const progress = currentIndex <= 0 ? 0 : (currentIndex / (STATUS_ORDER.length - 1)) * 100;

  return (
    <Panel title="Estado">
      <div className="mb-4">
        <div className="h-1 overflow-hidden bg-zinc-900">
          <div className="h-full bg-amber-300 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-zinc-600">
          <span>Flujo bloqueado hacia atras</span>
          <span>{currentIndex + 1}/{STATUS_ORDER.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
        {STATUS_ORDER.map((value) => {
          const active = item.status === value;
          const locked = !canMoveStatus(item.status, value);
          const disabled = active || locked;

          return (
            <button
              key={value}
              type="button"
              onClick={() => onStatusChange(value)}
              disabled={disabled}
              title={locked ? 'No se puede volver a un estado anterior' : STATUS_HINT[value]}
              className={[
                'flex min-h-[44px] items-center justify-between gap-2 border px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.1em] transition',
                active
                  ? STATUS_CLASS[value]
                  : locked
                    ? 'cursor-not-allowed border-zinc-800 bg-[#111214] text-zinc-700'
                    : 'border-zinc-800 bg-[#111214] text-zinc-400 hover:border-zinc-700 hover:text-zinc-100',
              ].join(' ')}
            >
              <span className="min-w-0 truncate">{STATUS_LABEL[value]}</span>
              {active && <CheckCircle2 size={14} />}
              {locked && <LockKeyhole size={13} />}
            </button>
          );
        })}
      </div>
    </Panel>
  );
}

function EmailPanel({ item, sending, onSend }: { item: Diagnostic; sending: boolean; onSend: () => void }) {
  const emailStatus = item.emailStatus || 'not_sent';
  const sendEnabled = canSendDiagnostic(item);

  return (
    <Panel title="Correo al prospecto" className="mt-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-zinc-100">{item.contact.email}</div>
          <p className="mt-1 text-xs leading-5 text-zinc-500">
            {sendEnabled
              ? 'Envia el resumen ejecutivo validado al correo corporativo.'
              : 'Evalua el caso antes de enviar el diagnostico.'}
          </p>
        </div>
        <Badge label={EMAIL_LABEL[emailStatus]} className={EMAIL_CLASS[emailStatus]} />
      </div>

      {item.emailSentAt && (
        <div className="mt-3 border-t border-zinc-800 pt-3 text-xs text-zinc-500">
          Ultimo envio: {new Date(item.emailSentAt).toLocaleString('es-MX')}
        </div>
      )}

      {item.emailError && (
        <div className="mt-3 border border-amber-300/20 bg-amber-300/10 p-3 text-xs leading-5 text-amber-100">
          {item.emailError}
        </div>
      )}

      <button
        type="button"
        onClick={onSend}
        disabled={!sendEnabled || sending}
        className={[
          'mt-4 inline-flex h-10 w-full items-center justify-center gap-2 border px-4 text-[10px] font-semibold uppercase tracking-[0.14em] transition',
          sendEnabled
            ? 'border-amber-400/30 bg-amber-400/10 text-amber-200 hover:border-amber-300 hover:bg-amber-400/15'
            : 'cursor-not-allowed border-zinc-800 bg-[#111214] text-zinc-600',
        ].join(' ')}
      >
        {sending ? <RefreshCw size={15} className="animate-spin" /> : <Mail size={15} />}
        {emailStatus === 'sent' ? 'Reenviar diagnostico' : 'Enviar diagnostico'}
      </button>
    </Panel>
  );
}

function Stat({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="border border-zinc-800 bg-[#17181B] px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">{label}</div>
          <div className="mt-1 font-serif text-2xl text-zinc-50">{value}</div>
        </div>
        <Icon size={17} className="text-amber-300" />
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="border border-zinc-800 bg-[#17181B] p-4">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-zinc-500">
        <Icon size={14} className="text-amber-300" />
        {label}
      </div>
      <div className="mt-2 break-words text-sm font-medium text-zinc-100">{value || 'No detectado'}</div>
    </div>
  );
}

function Panel({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) {
  return (
    <article className={`border border-zinc-800 bg-[#17181B] p-4 ${className}`}>
      <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">{title}</div>
      {children}
    </article>
  );
}

function Badge({ label, className = 'border-zinc-700 bg-zinc-900 text-zinc-400' }: { label: string; className?: string }) {
  return (
    <span className={`inline-flex shrink-0 border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] ${className}`}>
      {label}
    </span>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-zinc-800 pb-3">
      <div className="text-[10px] uppercase tracking-[0.14em] text-zinc-600">{label}</div>
      <div className="mt-1 break-words text-zinc-300">{value}</div>
    </div>
  );
}

function Select({ value, onChange, children }: { value: string; onChange: (value: string) => void; children: ReactNode }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-10 border border-zinc-800 bg-[#17181B] px-3 text-[11px] uppercase tracking-[0.12em] text-zinc-300 outline-none transition focus:border-amber-400/40"
    >
      {children}
    </select>
  );
}

function EmptyState({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="border border-zinc-800 bg-[#17181B] p-6 text-center">
      <Icon className="mx-auto text-zinc-600" size={34} />
      <div className="mt-3 text-sm font-semibold text-zinc-300">{title}</div>
      <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-zinc-500">{text}</p>
    </div>
  );
}

function formatRelative(value: string) {
  const diff = Date.now() - new Date(value).getTime();
  const minutes = Math.max(0, Math.floor(diff / 60000));

  if (minutes < 1) return 'ahora';
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;

  return `${Math.floor(hours / 24)}d`;
}
