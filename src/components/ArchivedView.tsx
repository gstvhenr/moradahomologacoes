import React from 'react';
import { HomologationTask } from '../types';
import { Badge, Button } from './ui';
import { formatDate } from '../lib/utils';
import { Calendar, CheckCircle2, ArchiveRestore, ArrowLeft } from 'lucide-react';

interface Props {
  tasks: HomologationTask[];
  onTaskClick: (task: HomologationTask) => void;
  onRestoreTask: (taskId: string) => void;
  onBack: () => void;
}

export function ArchivedView({ tasks, onTaskClick, onRestoreTask, onBack }: Props) {
  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors">Concluídos</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm transition-colors">Homologações finalizadas e arquivadas</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-5 pb-8 pr-2">
        {tasks.map(task => {
          const completedChecklist = task.checklist.filter(c => c.status === 'Done').length;
          const totalChecklist = task.checklist.length;
          const progress = totalChecklist === 0 ? 0 : Math.round((completedChecklist / totalChecklist) * 100);

          return (
            <div
              key={task.id}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl p-7 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white/60 dark:border-slate-700/60 hover:bg-white/90 dark:hover:bg-slate-800/90 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-300 group flex flex-col md:flex-row md:items-center gap-8 relative overflow-hidden"
            >
              {/* Decorative side bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500" />

              <div className="flex-1 pl-3 cursor-pointer" onClick={() => onTaskClick(task)}>
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-cyan-300 transition-colors">
                    {task.clientName}
                  </h3>
                  <Badge variant="success" className="gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Concluído
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-10 md:w-5/12 justify-between md:justify-end">
                <div className="flex-1 max-w-[200px]">
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300 mb-2 font-semibold transition-colors">
                    <span>Progresso</span>
                    <span className="text-emerald-600 dark:text-emerald-400">{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100/80 dark:bg-slate-700/80 rounded-full h-3 overflow-hidden shadow-inner transition-colors">
                    <div
                      className="progress-bar-fill h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-emerald-400 to-emerald-500"
                      ref={(el) => { if (el) el.style.width = `${progress}%`; }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-300 min-w-[140px] transition-colors">
                  <div className="flex items-center gap-3" title="Prazo">
                    <div className="p-2 bg-slate-100/80 dark:bg-slate-700/80 rounded-xl text-slate-500 dark:text-slate-400 shadow-sm border border-slate-200/50 dark:border-slate-600/50 transition-colors">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-slate-700 dark:text-slate-200 transition-colors">{formatDate(task.deadline) || 'Sem prazo'}</span>
                  </div>
                </div>

                <Button
                  onClick={() => onRestoreTask(task.id)}
                  className="gap-2 bg-accent-500 hover:bg-accent-400 text-brand-900 shadow-lg shadow-accent-500/20 rounded-full px-5 py-3 text-xs font-semibold transition-all hover:scale-105"
                  title="Restaurar homologação"
                >
                  <ArchiveRestore className="w-4 h-4" />
                  Restaurar
                </Button>
              </div>
            </div>
          );
        })}
        {tasks.length === 0 && (
          <div className="h-32 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-gray-500 dark:text-slate-400 bg-gray-50 dark:bg-slate-800/50 transition-colors">
            <p>Nenhuma homologação concluída.</p>
          </div>
        )}
      </div>
    </div>
  );
}
