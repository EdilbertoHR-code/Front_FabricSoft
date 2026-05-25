import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'sonner';
import {
  AlertTriangle,
  ArrowUpRight,
  Bot,
  Building2,
  CheckCircle2,
  Clock3,
  Filter,
  Gauge,
  MessageSquareText,
  RefreshCw,
  Search,
  ShieldCheck,
  Target,
  Trash2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { api } from '../../config/api';

type LeadStatus = 'nuevo' | 'calificado' | 'aplico' | 'abandonado' | 'descartado';
type ScoreFilter = 'todos' | 'hot' | 'medium' | 'low';
type SortMode = 'recent' | 'score' | 'status';

type AgentLead = {
  _id: string;
  sessionId: string;
  score: number;
  intent: string;
  urgency: string;
  estimatedRevenue: string;
  company: string;
  industry: string;
  currentSystem: string;
  painPoint: string;
  fabricFit: string;
  summary: string;
  nextStep: string;
  pendingQuestions: string[];
  status: LeadStatus;
  ctaType: string;
  lastQuestion: string;
  ip: string;
  userAgent: string;
  lastSeenAt: string;
  conversation: Array<{ role: 'user' | 'agent'; text: string }>;
};

const STATUS_LABEL: Record<LeadStatus, string> = {
  nuevo: 'Nuevo',
  calificado: 'Calificado',
  aplico: 'Aplicó',
  abandonado: 'Abandonado',
  descartado: 'Descartado',
};

const STATUS_CLASS: Record<LeadStatus, string> = {
  nuevo: 'border-sky-400/25 bg-sky-400/10 text-sky-300',
  calificado: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
  aplico: 'border-amber-300/30 bg-amber-300/10 text-amber-200',
  abandonado: 'border-zinc-700 bg-zinc-900 text-zinc-400',
  descartado: 'border-red-400/25 bg-red-400/10 text-red-300',
};

const SCORE_LABEL: Record<ScoreFilter, string> = {
  todos: 'Todos',
  hot: '80+',
  medium: '65-79',
  low: '<65',
};

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export default function AdminConversacionesIA() {
  const { getToken } = useAuth();
  const [leads, setLeads] = useState<AgentLead[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'todos'>('todos');
  const [scoreFilter, setScoreFilter] = useState<ScoreFilter>('todos');
  const [sortMode, setSortMode] = useState<SortMode>('recent');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadLeads = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      if (!token) return;

      const { data } = await api.get('/agente-ia/leads', {
        headers: authHeaders(token),
      });

      const nextLeads = data.leads || [];
      setLeads(nextLeads);
      setSelectedId((current) => current || nextLeads[0]?._id || null);
    } catch (error: any) {
      toast.error('No se pudieron cargar las conversaciones IA', {
        description: error.response?.data?.error || 'Revisa el backend e intenta otra vez.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();

    return leads
      .filter((lead) => {
        if (statusFilter !== 'todos' && lead.status !== statusFilter) return false;
        if (scoreFilter === 'hot' && lead.score < 80) return false;
        if (scoreFilter === 'medium' && (lead.score < 65 || lead.score >= 80)) return false;
        if (scoreFilter === 'low' && lead.score >= 65) return false;

        if (!query) return true;

        return [
          lead.company,
          lead.intent,
          lead.industry,
          lead.currentSystem,
          lead.painPoint,
          lead.lastQuestion,
          lead.summary,
          lead.ip,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));
      })
      .sort((a, b) => {
        if (sortMode === 'score') return b.score - a.score;
        if (sortMode === 'status') return a.status.localeCompare(b.status);
        return new Date(b.lastSeenAt).getTime() - new Date(a.lastSeenAt).getTime();
      });
  }, [leads, scoreFilter, search, sortMode, statusFilter]);

  const selectedLead =
    filteredLeads.find((lead) => lead._id === selectedId) ||
    leads.find((lead) => lead._id === selectedId) ||
    filteredLeads[0] ||
    leads[0];

  const stats = useMemo(() => {
    const hot = leads.filter((lead) => lead.score >= 80).length;
    const applied = leads.filter((lead) => lead.status === 'aplico').length;
    const avg = Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / Math.max(leads.length, 1));
    const active = leads.filter((lead) => !['descartado', 'abandonado'].includes(lead.status)).length;

    return { hot, applied, avg, active };
  }, [leads]);

  const updateStatus = async (leadId: string, status: LeadStatus) => {
    try {
      const token = await getToken();
      if (!token) return;

      const { data } = await api.patch(
        `/agente-ia/leads/${leadId}/status`,
        { status },
        { headers: authHeaders(token) },
      );

      setLeads((current) => current.map((lead) => (lead._id === leadId ? data.lead : lead)));
      toast.success('Estado actualizado');
    } catch (error: any) {
      toast.error('No se pudo actualizar el estado', {
        description: error.response?.data?.error || 'Intenta otra vez.',
      });
    }
  };

  const deleteLead = async (lead: AgentLead) => {
    const label = lead.company !== 'No detectada' ? lead.company : lead.intent.replaceAll('_', ' ');
    const confirmed = window.confirm(`Eliminar conversación de ${label}? Esta acción no se puede deshacer.`);

    if (!confirmed) return;

    try {
      const token = await getToken();
      if (!token) return;

      setDeletingId(lead._id);

      await api.delete(`/agente-ia/leads/${lead._id}`, {
        headers: authHeaders(token),
      });

      setLeads((current) => {
        const next = current.filter((item) => item._id !== lead._id);
        setSelectedId(next[0]?._id || null);
        return next;
      });

      toast.success('Conversación eliminada');
    } catch (error: any) {
      toast.error('No se pudo eliminar la conversación', {
        description: error.response?.data?.error || 'Intenta otra vez.',
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#17181B] px-4 py-5 text-zinc-100 sm:px-6 lg:px-8">
      <header className="border border-zinc-800 bg-[#111214] shadow-[0_18px_44px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-5 border-b border-zinc-800 p-5 sm:p-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 border border-amber-400/25 bg-amber-400/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300">
              <Bot size={13} />
              Agente IA · Conversaciones
            </div>
            <h1 className="font-serif text-3xl leading-tight text-zinc-50 sm:text-4xl">
              Prospectos detectados
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              Bandeja operativa para revisar, priorizar y limpiar conversaciones calificadas por el agente.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-4">
            <Stat icon={MessageSquareText} label="Total" value={String(leads.length)} />
            <Stat icon={Gauge} label="Activos" value={String(stats.active)} />
            <Stat icon={Target} label="Score prom." value={String(stats.avg || 0)} />
            <Stat icon={CheckCircle2} label="Aplicaron" value={String(stats.applied)} />
          </div>
        </div>

        <div className="grid gap-3 p-4 lg:grid-cols-[1fr_auto_auto_auto_auto] lg:items-center">
          <div className="relative min-w-0">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-10 w-full border border-zinc-800 bg-[#17181B] pl-9 pr-3 text-sm text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-amber-400/40"
              placeholder="Buscar empresa, intención, sistema, IP..."
            />
          </div>

          <Select value={statusFilter} onChange={(value) => setStatusFilter(value as LeadStatus | 'todos')}>
            <option value="todos">Todos los estados</option>
            {Object.entries(STATUS_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>

          <Select value={scoreFilter} onChange={(value) => setScoreFilter(value as ScoreFilter)}>
            {Object.entries(SCORE_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                Score {label}
              </option>
            ))}
          </Select>

          <Select value={sortMode} onChange={(value) => setSortMode(value as SortMode)}>
            <option value="recent">Más recientes</option>
            <option value="score">Mayor score</option>
            <option value="status">Estado</option>
          </Select>

          <button
            type="button"
            onClick={loadLeads}
            disabled={loading}
            className="inline-flex h-10 items-center justify-center gap-2 border border-zinc-800 bg-[#17181B] px-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400 transition hover:border-zinc-700 hover:text-zinc-100 disabled:cursor-wait disabled:opacity-60"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Actualizar
          </button>
        </div>
      </header>

      <section className="mt-5 grid gap-5 xl:grid-cols-[420px_minmax(0,1fr)]">
        <aside className="border border-zinc-800 bg-[#111214]">
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
              <Filter size={14} className="text-amber-300" />
              Pipeline IA
            </div>
            <span className="font-mono text-[10px] text-zinc-500">
              {filteredLeads.length}/{leads.length}
            </span>
          </div>

          <div className="h-[calc(100vh-315px)] min-h-[520px] overflow-y-auto p-2">
            {loading && (
              <div className="border border-zinc-800 bg-[#17181B] p-4 text-sm text-zinc-500">
                Cargando conversaciones...
              </div>
            )}

            {!loading && filteredLeads.length === 0 && (
              <EmptyState
                icon={AlertTriangle}
                title="Sin resultados"
                text="Ajusta los filtros o espera a que el agente detecte prospectos con intención real."
              />
            )}

            <div className="space-y-1.5">
              {filteredLeads.map((lead) => {
                const active = selectedLead?._id === lead._id;
                const title = lead.company !== 'No detectada' ? lead.company : lead.intent.replaceAll('_', ' ');

                return (
                  <button
                    key={lead._id}
                    type="button"
                    onClick={() => setSelectedId(lead._id)}
                    className={[
                      'grid w-full grid-cols-[1fr_auto] gap-3 border px-3 py-3 text-left transition active:scale-[0.99]',
                      active
                        ? 'border-amber-400/35 bg-amber-400/10'
                        : 'border-zinc-800 bg-[#17181B] hover:border-zinc-700 hover:bg-zinc-900/60',
                    ].join(' ')}
                  >
                    <div className="min-w-0">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="truncate text-sm font-semibold text-zinc-100">{title}</span>
                        {lead.score >= 80 && (
                          <span className="shrink-0 border border-amber-400/25 bg-amber-400/10 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.12em] text-amber-200">
                            Hot
                          </span>
                        )}
                      </div>
                      <div className="mt-1 truncate text-xs text-zinc-500">{lead.lastQuestion}</div>
                      <div className="mt-2 flex min-w-0 flex-wrap gap-1.5">
                        <Badge label={STATUS_LABEL[lead.status]} className={STATUS_CLASS[lead.status]} />
                        <Badge label={lead.intent.replaceAll('_', ' ')} />
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-serif text-3xl leading-none text-zinc-50">{lead.score}</div>
                      <div className="mt-2 text-[10px] text-zinc-600">
                        {formatRelative(lead.lastSeenAt)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <main className="min-h-[620px] border border-zinc-800 bg-[#111214]">
          {selectedLead ? (
            <LeadDetail
              lead={selectedLead}
              deleting={deletingId === selectedLead._id}
              onDelete={() => deleteLead(selectedLead)}
              onStatusChange={(status) => updateStatus(selectedLead._id, status)}
            />
          ) : (
            <div className="grid min-h-[620px] place-items-center p-8 text-center">
              <EmptyState
                icon={MessageSquareText}
                title="Selecciona una conversación"
                text="Cuando tengas prospectos calificados, aparecerán en la bandeja izquierda."
              />
            </div>
          )}
        </main>
      </section>
    </div>
  );
}

function LeadDetail({
  lead,
  deleting,
  onDelete,
  onStatusChange,
}: {
  lead: AgentLead;
  deleting: boolean;
  onDelete: () => void;
  onStatusChange: (status: LeadStatus) => void;
}) {
  return (
    <div className="grid min-h-full gap-0 2xl:grid-cols-[minmax(0,1fr)_380px]">
      <section className="border-b border-zinc-800 p-5 2xl:border-b-0 2xl:border-r 2xl:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300">
              Caso detectado
            </div>
            <h2 className="mt-1 truncate font-serif text-2xl text-zinc-50 sm:text-3xl">
              {lead.company !== 'No detectada' ? lead.company : 'Prospecto sin empresa detectada'}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">{lead.summary}</p>
          </div>

          <div className="grid grid-cols-[auto_auto] items-center gap-3">
            <div className="text-right">
              <div className="font-serif text-5xl text-zinc-50">{lead.score}</div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">Score</div>
            </div>
            <button
              type="button"
              onClick={onDelete}
              disabled={deleting}
              className="inline-flex h-10 w-10 items-center justify-center border border-red-400/25 bg-red-400/10 text-red-300 transition hover:border-red-300 hover:bg-red-400/15 disabled:cursor-wait disabled:opacity-60"
              title="Eliminar conversación"
              aria-label="Eliminar conversación"
            >
              {deleting ? <RefreshCw size={16} className="animate-spin" /> : <Trash2 size={16} />}
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <Info icon={Building2} label="Industria" value={lead.industry} />
          <Info icon={ShieldCheck} label="Sistema actual" value={lead.currentSystem} />
          <Info icon={Clock3} label="Urgencia" value={lead.urgency} />
          <Info icon={Gauge} label="Revenue" value={lead.estimatedRevenue} />
          <Info icon={Target} label="Fit FABRIC" value={lead.fabricFit} />
          <Info icon={ArrowUpRight} label="Siguiente paso" value={lead.nextStep} />
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-2">
          <Panel title="Dolor principal">
            <p className="text-sm leading-6 text-zinc-300">{lead.painPoint}</p>
          </Panel>
          <Panel title="Preguntas pendientes">
            <div className="flex flex-wrap gap-2">
              {lead.pendingQuestions.length ? (
                lead.pendingQuestions.map((question) => <Badge key={question} label={question} />)
              ) : (
                <span className="text-sm text-zinc-500">Sin preguntas críticas pendientes.</span>
              )}
            </div>
          </Panel>
        </div>

        <Panel title="Conversación" className="mt-5">
          <div className="h-[420px] space-y-3 overflow-y-auto pr-1">
            {lead.conversation.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={[
                  'max-w-[88%] border px-3 py-2 text-sm leading-6',
                  message.role === 'user'
                    ? 'ml-auto border-amber-400/20 bg-amber-400/10 text-amber-100'
                    : 'border-zinc-800 bg-[#111214] text-zinc-400',
                ].join(' ')}
              >
                {message.text}
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <aside className="p-5 2xl:p-6">
        <Panel title="Estado">
          <div className="space-y-2">
            {Object.entries(STATUS_LABEL).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => onStatusChange(value as LeadStatus)}
                className={[
                  'flex h-10 w-full items-center justify-between border px-3 text-left text-xs transition',
                  lead.status === value
                    ? 'border-amber-400/35 bg-amber-400/10 text-amber-200'
                    : 'border-zinc-800 bg-[#111214] text-zinc-400 hover:border-zinc-700 hover:text-zinc-100',
                ].join(' ')}
              >
                {label}
                {lead.status === value && <CheckCircle2 size={14} />}
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Origen" className="mt-5">
          <div className="space-y-3 text-xs text-zinc-400">
            <Row label="IP" value={lead.ip || 'No disponible'} />
            <Row label="Sesión" value={lead.sessionId} />
            <Row label="Última actividad" value={new Date(lead.lastSeenAt).toLocaleString('es-MX')} />
            <Row label="User agent" value={lead.userAgent || 'No disponible'} />
          </div>
        </Panel>
      </aside>
    </div>
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
      <div className="mt-2 text-sm font-medium text-zinc-100">{value || 'No detectado'}</div>
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
    <span className={`inline-flex border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] ${className}`}>
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

function Select({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
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
