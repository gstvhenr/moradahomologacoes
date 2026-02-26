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
  { id: 'In Progress', title: 'Em Andamento', color: 'bg-blue-50/80 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50', headerColor: 'text-blue-700 dark:text-blue-400' },
  { id: 'Waiting on Client', title: 'Ação Pendente', color: 'bg-amber-50/80 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/50', headerColor: 'text-amber-700 dark:text-amber-400' },
  { id: 'Approved', title: 'Finalizado', color: 'bg-emerald-50/80 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50', headerColor: 'text-emerald-700 dark:text-emerald-400' },
];

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
                      className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-white/60 dark:border-slate-700/60 cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-md transition-all duration-200 group relative overflow-hidden"
                    >
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${task.status === 'Approved' ? 'bg-emerald-500' :
                        task.status === 'Waiting on Client' ? 'bg-amber-500' :
                          task.status === 'In Progress' ? 'bg-blue-500' :
                            task.status === 'Rejected' ? 'bg-red-500' : 'bg-slate-300'
                        }`} />

                      <div className="flex justify-between items-start mb-3 pl-2">
                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-tight">
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
                            <span className={progress === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'}>{completedChecklist}/{totalChecklist}</span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden transition-colors">
                            <div
                              className={`progress-bar-fill h-full rounded-full transition-all duration-500 ${progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                              ref={(el) => { if (el) el.style.width = `${progress}%`; }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors">
                          <div className="flex items-center gap-1.5" title="Prazo">
                            <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
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
