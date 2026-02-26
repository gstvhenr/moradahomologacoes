import React, { useState } from 'react';
import { HomologationTask, HomologationStatus } from '../types';
import { Badge, Button } from './ui';
import { formatDate } from '../lib/utils';
import { Calendar, Clock, MoreHorizontal, Archive } from 'lucide-react';

interface Props {
  tasks: HomologationTask[];
  onTaskClick: (task: HomologationTask) => void;
  onArchiveTask: (taskId: string) => void;
}

const COLUMNS: { id: HomologationStatus; title: string; color: string; headerColor: string }[] = [
  { id: 'Not Started', title: 'Não Iniciado', color: 'bg-gray-50/80 dark:bg-slate-800/80 border-gray-200 dark:border-slate-700', headerColor: 'text-gray-700 dark:text-slate-300' },
  { id: 'In Progress', title: 'Em Andamento', color: 'bg-cyan-50/80 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800/50', headerColor: 'text-cyan-700 dark:text-cyan-400' },
  { id: 'Waiting on Client', title: 'Ação Pendente', color: 'bg-accent-50/80 dark:bg-accent-900/20 border-accent-200 dark:border-accent-800/50', headerColor: 'text-accent-700 dark:text-accent-400' },
  { id: 'Waiting on Sector', title: 'Aguardando Setor', color: 'bg-orange-50/80 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800/50', headerColor: 'text-orange-700 dark:text-orange-400' },
  { id: 'Approved', title: 'Finalizado', color: 'bg-emerald-50/80 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50', headerColor: 'text-emerald-700 dark:text-emerald-400' },
];

function isDeadlineExpired(deadline: string): boolean {
  if (!deadline) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(`${deadline}T12:00:00`);
  deadlineDate.setHours(0, 0, 0, 0);
  return deadlineDate <= today;
}

export function HomologationsView({ tasks, onTaskClick, onArchiveTask }: Props) {
  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors">Tarefas</h1>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 flex gap-4 pb-4 pr-2">
        {COLUMNS.map(column => {
          const columnTasks = tasks.filter(t => t.status === column.id);

          return (
            <div key={column.id} className={`flex-1 min-w-[200px] rounded-3xl border ${column.color} flex flex-col max-h-full shadow-sm backdrop-blur-md transition-colors`}>
              <div className="p-5 border-b border-black/5 dark:border-white/5 flex items-center justify-between transition-colors">
                <h3 className={`font-bold text-lg ${column.headerColor} transition-colors`}>{column.title}</h3>
                <span className="bg-white/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 text-sm font-bold px-3 py-1 rounded-full shadow-sm border border-white/50 dark:border-slate-600/50 transition-colors">
                  {columnTasks.length}
                </span>
              </div>

              <div className="p-4 flex-1 overflow-y-auto space-y-4">
                {columnTasks.map(task => {
                  const completedChecklist = task.checklist.filter(c => c.status === 'Done').length;
                  const totalChecklist = task.checklist.length;
                  const progress = totalChecklist === 0 ? 0 : Math.round((completedChecklist / totalChecklist) * 100);

                  return (
                    <div
                      key={task.id}
                      onClick={() => onTaskClick(task)}
                      className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-white/60 dark:border-slate-700/60 cursor-pointer hover:border-brand-300 dark:hover:border-brand-500/50 hover:shadow-md transition-all duration-200 group relative overflow-hidden"
                    >
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${task.status === 'Approved' ? 'bg-emerald-500' :
                        task.status === 'Waiting on Client' ? 'bg-accent-500' :
                          task.status === 'Waiting on Sector' ? 'bg-orange-400' :
                            task.status === 'In Progress' ? 'bg-cyan-300' :
                              task.status === 'Rejected' ? 'bg-red-500' : 'bg-slate-300'
                        }`} />

                      <div className="flex justify-between items-start mb-3 pl-2">
                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-2 leading-tight">
                          {task.clientName}
                        </h4>
                        <button aria-label="Mais opções" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-4 mt-5 pl-2">
                        {/* Progress Bar */}
                        <div>
                          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5 font-semibold transition-colors">
                            <span>Checklist</span>
                            <span className={progress === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-brand-600 dark:text-cyan-400'}>{completedChecklist}/{totalChecklist}</span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden transition-colors">
                            <div
                              className={`progress-bar-fill h-full rounded-full transition-all duration-500 ${progress === 100 ? 'bg-emerald-500' : 'bg-brand-500'}`}
                              ref={(el) => { if (el) el.style.width = `${progress}%`; }}
                            />
                          </div>
                        </div>

                        <div className={`flex items-center justify-between text-xs font-medium transition-colors ${isDeadlineExpired(task.deadline) && task.status !== 'Approved' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-2 py-1 rounded-lg border border-red-100 dark:border-red-800/30' : 'text-slate-500 dark:text-slate-400'}`}>
                          <div className="flex items-center gap-1.5" title="Prazo">
                            <Calendar className={`w-4 h-4 ${isDeadlineExpired(task.deadline) && task.status !== 'Approved' ? 'text-red-500 dark:text-red-400' : 'text-slate-400 dark:text-slate-500'}`} />
                            {formatDate(task.deadline) || 'Sem prazo'}
                          </div>
                        </div>
                      </div>

                      {/* Archive button for Finalizado column */}
                      {column.id === 'Approved' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onArchiveTask(task.id);
                          }}
                          className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-xl border border-emerald-200 dark:border-emerald-800/50 transition-all duration-200 hover:scale-[1.02]"
                          title="Arquivar como concluído"
                        >
                          <Archive className="w-3.5 h-3.5" />
                          Arquivar
                        </button>
                      )}
                    </div>
                  );
                })}
                {columnTasks.length === 0 && (
                  <div className="h-28 border-2 border-dashed border-slate-300/50 dark:border-slate-700/50 rounded-2xl flex items-center justify-center text-sm font-medium text-slate-400 dark:text-slate-500 bg-slate-50/30 dark:bg-slate-800/30 transition-colors">
                    Nenhuma tarefa
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
