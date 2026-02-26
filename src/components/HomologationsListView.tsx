import React from 'react';
import { HomologationTask, HomologationStatus } from '../types';
import { Badge, Button } from './ui';
import { formatDate } from '../lib/utils';
import { Calendar, Plus, CheckCircle2, AlertCircle, PlayCircle, Clock4 } from 'lucide-react';

interface Props {
  tasks: HomologationTask[];
  onTaskClick: (task: HomologationTask) => void;
  onAddTask?: () => void;
  onUpdateTask?: (task: HomologationTask) => void;
}

function isDeadlineExpired(deadline: string): boolean {
  if (!deadline) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(`${deadline}T12:00:00`);
  deadlineDate.setHours(0, 0, 0, 0);
  return deadlineDate <= today;
}

export function HomologationsListView({ tasks, onTaskClick, onAddTask, onUpdateTask }: Props) {
  const getStatusBadge = (status: HomologationStatus) => {
    switch (status) {
      case 'Not Started': return <Badge variant="neutral" className="gap-1"><Clock4 className="w-3 h-3" /> Não Iniciado</Badge>;
      case 'In Progress': return <Badge variant="default" className="gap-1"><PlayCircle className="w-3 h-3" /> Em Andamento</Badge>;
      case 'Waiting on Client': return <Badge variant="warning" className="gap-1"><AlertCircle className="w-3 h-3" /> Ação Pendente</Badge>;
      case 'Waiting on Sector': return <Badge variant="neutral" className="gap-1 !bg-orange-50 !text-orange-700 !border-orange-200/50 dark:!bg-orange-900/30 dark:!text-orange-400 dark:!border-orange-800/50"><Clock4 className="w-3 h-3" /> Aguardando Setor</Badge>;
      case 'Approved': return <Badge variant="success" className="gap-1"><CheckCircle2 className="w-3 h-3" /> Finalizado</Badge>;
      case 'Rejected': return <Badge variant="danger" className="gap-1"><AlertCircle className="w-3 h-3" /> Rejeitado</Badge>;
      default: return null;
    }
  };

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors">Homologações</h1>
        </div>
        <div className="flex gap-3">
          {onAddTask && (
            <Button onClick={onAddTask} className="gap-2 bg-brand-700 dark:bg-brand-600 hover:bg-brand-600 dark:hover:bg-brand-500 text-white shadow-lg shadow-brand-700/20 dark:shadow-brand-500/20 rounded-full px-8 py-6 text-sm font-semibold transition-all hover:scale-105">
              <Plus className="w-5 h-5" />
              Nova Homologação
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-5 pb-8 pr-2">
        {tasks.map(task => {
          const allSubtasks = task.checklist.flatMap(c => c.subtasks || []);
          const totalChecklist = allSubtasks.length;
          const isFinished = task.status === 'Approved' || task.status === 'Rejected';
          const completedChecklist = isFinished ? totalChecklist : allSubtasks.filter(s => s.status === 'Done').length;
          const progress = isFinished ? 100 : (totalChecklist === 0 ? 0 : Math.round((completedChecklist / totalChecklist) * 100));
          const isCompleted = task.completed ?? false;

          return (
            <div
              key={task.id}
              onClick={() => onTaskClick(task)}
              className={`backdrop-blur-xl p-7 rounded-3xl border cursor-pointer transition-all duration-300 group flex flex-col md:flex-row md:items-center gap-8 relative overflow-hidden ${isCompleted
                  ? 'bg-slate-100/50 dark:bg-slate-800/40 shadow-none border-slate-200/40 dark:border-slate-700/40 hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
                  : 'bg-white/70 dark:bg-slate-800/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border-white/60 dark:border-slate-700/60 hover:bg-white/90 dark:hover:bg-slate-800/90 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:border-brand-100 dark:hover:border-brand-500/30'
                }`}
            >
              {/* Decorative side bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-opacity ${isCompleted ? 'opacity-30' : ''} ${task.status === 'Approved' ? 'bg-emerald-500' :
                task.status === 'Waiting on Client' ? 'bg-accent-500' :
                  task.status === 'Waiting on Sector' ? 'bg-orange-400' :
                    task.status === 'In Progress' ? 'bg-cyan-300' :
                      task.status === 'Rejected' ? 'bg-red-500' : 'bg-slate-300'
                }`} />

              <div className="flex-1 pl-3">
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <h3 className={`text-2xl font-bold transition-colors ${isCompleted
                      ? 'text-slate-400 dark:text-slate-500 line-through decoration-slate-300 dark:decoration-slate-600'
                      : 'text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-cyan-300'
                    }`}>
                    {task.clientName}
                  </h3>
                </div>

                {/* Completed checkbox */}
                {onUpdateTask && (
                  <label
                    className="inline-flex items-center gap-2 cursor-pointer select-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={(e) => {
                        e.stopPropagation();
                        onUpdateTask({ ...task, completed: e.target.checked });
                      }}
                      className="rounded border-slate-300 dark:border-slate-600 text-emerald-500 focus:ring-emerald-400 h-3.5 w-3.5 cursor-pointer"
                    />
                    <span className={`text-xs transition-colors ${isCompleted
                        ? 'text-emerald-500 dark:text-emerald-400 font-medium'
                        : 'text-slate-400 dark:text-slate-500'
                      }`}>
                      Tarefa concluída
                    </span>
                  </label>
                )}
              </div>

              <div className={`flex items-center gap-10 md:w-7/12 justify-between md:justify-end transition-opacity ${isCompleted ? 'opacity-40' : ''}`}>
                <div className="flex-1 max-w-[200px]">
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300 mb-2 font-semibold transition-colors">
                    <span>Progresso</span>
                    <span className={progress === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-brand-600 dark:text-cyan-400'}>{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100/80 dark:bg-slate-700/80 rounded-full h-3 overflow-hidden shadow-inner transition-colors">
                    <div
                      className={`progress-bar-fill h-full rounded-full transition-all duration-700 ease-out ${progress === 100 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-gradient-to-r from-brand-500 to-cyan-400'}`}
                      ref={(el) => { if (el) el.style.width = `${progress}%`; }}
                    />
                  </div>
                </div>

                <div className="min-w-[120px] flex justify-center">
                  {getStatusBadge(task.status)}
                </div>

                <div className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-300 min-w-[140px] transition-colors">
                  <div className={`flex items-center gap-3 ${isDeadlineExpired(task.deadline) && task.status !== 'Approved' ? 'bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-xl border border-red-100 dark:border-red-800/30' : ''}`} title="Prazo">
                    <div className={`p-2 rounded-xl shadow-sm border transition-colors ${isDeadlineExpired(task.deadline) && task.status !== 'Approved' ? 'bg-red-100/80 dark:bg-red-900/40 text-red-500 dark:text-red-400 border-red-200/50 dark:border-red-700/50' : 'bg-slate-100/80 dark:bg-slate-700/80 text-slate-500 dark:text-slate-400 border-slate-200/50 dark:border-slate-600/50'}`}>
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span className={`font-semibold transition-colors ${isDeadlineExpired(task.deadline) && task.status !== 'Approved' ? 'text-red-700 dark:text-red-400' : 'text-slate-700 dark:text-slate-200'}`}>{formatDate(task.deadline) || 'Sem prazo'}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {tasks.length === 0 && (
          <div className="h-32 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-gray-500 dark:text-slate-400 bg-gray-50 dark:bg-slate-800/50 transition-colors">
            <p>Nenhuma homologação cadastrada.</p>
            {onAddTask && <Button variant="outline" onClick={onAddTask} className="mt-2">Criar a primeira</Button>}
          </div>
        )}
      </div>
    </div>
  );
}
