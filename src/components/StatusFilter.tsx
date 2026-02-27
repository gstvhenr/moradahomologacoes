import React, { useMemo } from 'react';
import { HomologationStatus, HomologationTask } from '../types';
import { CheckCircle2, Circle, PlayCircle, Clock4, AlertCircle, Filter, X } from 'lucide-react';

export type CompletionFilter = 'completed' | 'not-completed';

interface Props {
  selectedStatuses: HomologationStatus[];
  onChangeStatuses: (statuses: HomologationStatus[]) => void;
  selectedCompletionFilters: CompletionFilter[];
  onChangeCompletionFilters: (filters: CompletionFilter[]) => void;
  tasks: HomologationTask[];
}

const STATUS_OPTIONS: { value: HomologationStatus; label: string; icon: React.ReactNode; activeClass: string; inactiveClass: string }[] = [
  {
    value: 'Not Started',
    label: 'Não Iniciado',
    icon: <Clock4 className="w-3.5 h-3.5" />,
    activeClass: 'bg-slate-600 text-white border-slate-600 dark:bg-slate-500 dark:border-slate-500',
    inactiveClass: 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800/60 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-700/60',
  },
  {
    value: 'In Progress',
    label: 'Em Andamento',
    icon: <PlayCircle className="w-3.5 h-3.5" />,
    activeClass: 'bg-cyan-600 text-white border-cyan-600 dark:bg-cyan-500 dark:border-cyan-500',
    inactiveClass: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 dark:bg-cyan-900/30 dark:text-cyan-400 dark:border-cyan-800/50 dark:hover:bg-cyan-900/50',
  },
  {
    value: 'Waiting on Client',
    label: 'Ação Pendente',
    icon: <AlertCircle className="w-3.5 h-3.5" />,
    activeClass: 'bg-amber-500 text-white border-amber-500 dark:bg-amber-500 dark:border-amber-500',
    inactiveClass: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/50 dark:hover:bg-amber-900/50',
  },
  {
    value: 'Waiting on Sector',
    label: 'Aguardando Setor',
    icon: <Clock4 className="w-3.5 h-3.5" />,
    activeClass: 'bg-orange-500 text-white border-orange-500 dark:bg-orange-500 dark:border-orange-500',
    inactiveClass: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800/50 dark:hover:bg-orange-900/50',
  },
  {
    value: 'Approved',
    label: 'Finalizado',
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    activeClass: 'bg-emerald-600 text-white border-emerald-600 dark:bg-emerald-500 dark:border-emerald-500',
    inactiveClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50 dark:hover:bg-emerald-900/50',
  },
  {
    value: 'Rejected',
    label: 'Rejeitado',
    icon: <AlertCircle className="w-3.5 h-3.5" />,
    activeClass: 'bg-red-600 text-white border-red-600 dark:bg-red-500 dark:border-red-500',
    inactiveClass: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/50 dark:hover:bg-red-900/50',
  },
];

const COMPLETION_OPTIONS: { value: CompletionFilter; label: string; icon: React.ReactNode; activeClass: string; inactiveClass: string }[] = [
  {
    value: 'completed',
    label: 'Concluídas',
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    activeClass: 'bg-emerald-600 text-white border-emerald-600 dark:bg-emerald-500 dark:border-emerald-500',
    inactiveClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50 dark:hover:bg-emerald-900/50',
  },
  {
    value: 'not-completed',
    label: 'Não concluídas',
    icon: <Circle className="w-3.5 h-3.5" />,
    activeClass: 'bg-slate-600 text-white border-slate-600 dark:bg-slate-500 dark:border-slate-500',
    inactiveClass: 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800/60 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-700/60',
  },
];

export function StatusFilter({ selectedStatuses, onChangeStatuses, selectedCompletionFilters, onChangeCompletionFilters, tasks }: Props) {
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const task of tasks) {
      counts[task.status] = (counts[task.status] || 0) + 1;
    }
    return counts;
  }, [tasks]);

  const completionCounts = useMemo(() => ({
    completed: tasks.filter(t => t.completed).length,
    'not-completed': tasks.filter(t => !t.completed).length,
  }), [tasks]);

  const toggleStatus = (status: HomologationStatus) => {
    if (selectedStatuses.includes(status)) {
      onChangeStatuses(selectedStatuses.filter(s => s !== status));
    } else {
      onChangeStatuses([...selectedStatuses, status]);
    }
  };

  const toggleCompletion = (filter: CompletionFilter) => {
    if (selectedCompletionFilters.includes(filter)) {
      onChangeCompletionFilters(selectedCompletionFilters.filter(f => f !== filter));
    } else {
      onChangeCompletionFilters([...selectedCompletionFilters, filter]);
    }
  };

  const hasAnyFilter = selectedStatuses.length > 0 || selectedCompletionFilters.length > 0;

  const clearAll = () => {
    onChangeStatuses([]);
    onChangeCompletionFilters([]);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Row 1: Status filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 shrink-0">
          <Filter className="w-4 h-4" />
          <span>Status:</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {STATUS_OPTIONS.map(option => {
            const count = statusCounts[option.value] || 0;
            if (count === 0) return null;
            const isActive = selectedStatuses.includes(option.value);

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleStatus(option.value)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer select-none ${isActive ? option.activeClass : option.inactiveClass
                  }`}
              >
                {option.icon}
                {option.label}
                <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none ${isActive ? 'bg-white/25 text-white' : 'bg-black/5 dark:bg-white/10'
                  }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {hasAnyFilter && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 border border-transparent hover:border-red-200 dark:hover:border-red-800/50 transition-all duration-200 cursor-pointer"
            title="Limpar filtros"
          >
            <X className="w-3.5 h-3.5" />
            Limpar
          </button>
        )}
      </div>

      {/* Row 2: Completion filter select */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 shrink-0">
          <CheckCircle2 className="w-4 h-4" />
          <span>Tarefa concluída:</span>
        </div>

        <select
          aria-label="Filtrar por tarefa concluída"
          value={
            selectedCompletionFilters.length === 0
              ? 'all'
              : selectedCompletionFilters.length === 2
                ? 'all'
                : selectedCompletionFilters[0]
          }
          onChange={(e) => {
            const val = e.target.value;
            if (val === 'all') {
              onChangeCompletionFilters([]);
            } else {
              onChangeCompletionFilters([val as CompletionFilter]);
            }
          }}
          className="text-sm font-medium px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all"
        >
          <option value="all">Todas ({completionCounts.completed + completionCounts['not-completed']})</option>
          <option value="completed">Concluídas ({completionCounts.completed})</option>
          <option value="not-completed">Não concluídas ({completionCounts['not-completed']})</option>
        </select>
      </div>
    </div>
  );
}
