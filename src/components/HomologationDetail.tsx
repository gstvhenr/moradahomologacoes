import React, { useState } from 'react';
import { HomologationTask, ChecklistItem, HomologationStatus, ChecklistStatus, Subtask } from '../types';
import { Badge, Button, Input, Label, Textarea } from './ui';
import { formatDate } from '../lib/utils';
import { CheckCircle2, Circle, Plus, Trash2, User, Edit2, Check } from 'lucide-react';

interface Props {
  task: HomologationTask;
  onUpdate: (task: HomologationTask) => void;
}

const STATUS_COLORS: Record<ChecklistStatus, string> = {
  NotStarted: 'text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400',
  Pending: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400',
  Sent: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400',
  WaitingOtherSector: 'text-purple-600 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-400',
  Done: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400'
};

export function HomologationDetail({ task, onUpdate }: Props) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newChecklistTitle, setNewChecklistTitle] = useState('');
  const [newChecklistResponsible, setNewChecklistResponsible] = useState('');
  const [newSubtaskTitle, setNewSubtaskTitle] = useState<Record<string, string>>({});
  
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState('');
  
  const [editingSubtaskId, setEditingSubtaskId] = useState<string | null>(null);
  const [editingSubtaskTitle, setEditingSubtaskTitle] = useState('');

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate({ ...task, status: e.target.value as HomologationStatus });
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({ ...task, notes: e.target.value });
  };

  const handleAddChecklist = () => {
    if (!newChecklistTitle.trim()) return;
    const newItem: ChecklistItem = {
      id: crypto.randomUUID(),
      title: newChecklistTitle,
      status: 'NotStarted',
      responsible: newChecklistResponsible || 'Não definido',
      subtasks: []
    };
    onUpdate({ ...task, checklist: [...task.checklist, newItem] });
    setNewChecklistTitle('');
    setNewChecklistResponsible('');
    setIsAddingTask(false);
  };

  const handleChecklistStatusChange = (id: string, status: ChecklistStatus) => {
    const updated = task.checklist.map(item => {
      if (item.id === id) {
        return { ...item, status };
      }
      return item;
    });
    onUpdate({ ...task, checklist: updated });
  };

  const removeChecklistItem = (id: string) => {
    onUpdate({ ...task, checklist: task.checklist.filter(i => i.id !== id) });
  };

  const handleAddSubtask = (checklistItemId: string) => {
    const title = newSubtaskTitle[checklistItemId];
    if (!title?.trim()) return;
    
    const updated = task.checklist.map(item => {
      if (item.id === checklistItemId) {
        const newSubtask: Subtask = {
          id: crypto.randomUUID(),
          title: title,
          status: 'NotStarted'
        };
        return { ...item, subtasks: [...(item.subtasks || []), newSubtask] };
      }
      return item;
    });
    onUpdate({ ...task, checklist: updated });
    setNewSubtaskTitle(prev => ({ ...prev, [checklistItemId]: '' }));
  };

  const handleSubtaskStatusChange = (checklistItemId: string, subtaskId: string, status: ChecklistStatus) => {
    const updated = task.checklist.map(item => {
      if (item.id === checklistItemId) {
        const updatedSubtasks = (item.subtasks || []).map(st => 
          st.id === subtaskId ? { ...st, status } : st
        );
        return { ...item, subtasks: updatedSubtasks };
      }
      return item;
    });
    onUpdate({ ...task, checklist: updated });
  };

  const removeSubtask = (checklistItemId: string, subtaskId: string) => {
    const updated = task.checklist.map(item => {
      if (item.id === checklistItemId) {
        const updatedSubtasks = (item.subtasks || []).filter(st => st.id !== subtaskId);
        return { ...item, subtasks: updatedSubtasks };
      }
      return item;
    });
    onUpdate({ ...task, checklist: updated });
  };

  const saveTaskEdit = (id: string) => {
    if (!editingTaskTitle.trim()) {
      setEditingTaskId(null);
      return;
    }
    const updated = task.checklist.map(item => 
      item.id === id ? { ...item, title: editingTaskTitle } : item
    );
    onUpdate({ ...task, checklist: updated });
    setEditingTaskId(null);
  };

  const saveSubtaskEdit = (checklistItemId: string, subtaskId: string) => {
    if (!editingSubtaskTitle.trim()) {
      setEditingSubtaskId(null);
      return;
    }
    const updated = task.checklist.map(item => {
      if (item.id === checklistItemId) {
        const updatedSubtasks = (item.subtasks || []).map(st => 
          st.id === subtaskId ? { ...st, title: editingSubtaskTitle } : st
        );
        return { ...item, subtasks: updatedSubtasks };
      }
      return item;
    });
    onUpdate({ ...task, checklist: updated });
    setEditingSubtaskId(null);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg border border-gray-100 dark:border-slate-700 transition-colors">
        <div>
          <Label className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wider transition-colors">Status da Homologação</Label>
          <select 
            value={task.status} 
            onChange={handleStatusChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-2 border transition-colors"
          >
            <option value="Not Started">Não Iniciado</option>
            <option value="In Progress">Em Andamento</option>
            <option value="Waiting on Client">Ação Pendente</option>
            <option value="Approved">Concluindo</option>
            <option value="Rejected">Rejeitado</option>
          </select>
        </div>
        <div>
          <Label className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wider transition-colors">Prazo</Label>
          <Input 
            type="date" 
            value={task.deadline} 
            onChange={(e) => onUpdate({ ...task, deadline: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>

      {/* Checklist */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2 transition-colors">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 transition-colors" />
              Tarefas
            </h3>
            <span className="text-sm text-gray-500 dark:text-slate-400 transition-colors ml-2">
              {task.checklist.filter(c => c.status === 'Done').length} de {task.checklist.length} concluídos
            </span>
          </div>
          <Button onClick={() => setIsAddingTask(!isAddingTask)} variant="outline" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Adicionar nova tarefa
          </Button>
        </div>

        {isAddingTask && (
          <div className="flex gap-2 mb-4 items-start p-4 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
            <div className="flex-1 space-y-2">
              <Input 
                placeholder="Nova tarefa..." 
                value={newChecklistTitle}
                onChange={(e) => setNewChecklistTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddChecklist()}
                autoFocus
              />
              <Input 
                placeholder="Responsável (ex: Comercial, Fiscal)" 
                value={newChecklistResponsible}
                onChange={(e) => setNewChecklistResponsible(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddChecklist()}
                className="text-xs"
              />
            </div>
            <Button onClick={handleAddChecklist} variant="default" className="h-10">
              Salvar
            </Button>
          </div>
        )}

        <div className="space-y-3">
          {task.checklist.map(item => (
            <div key={item.id} className="flex flex-col gap-3 p-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-sm hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  {editingTaskId === item.id ? (
                    <div className="flex items-center gap-2">
                      <Input 
                        value={editingTaskTitle}
                        onChange={(e) => setEditingTaskTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && saveTaskEdit(item.id)}
                        autoFocus
                        className="h-8 text-sm"
                      />
                      <Button size="icon" variant="ghost" onClick={() => saveTaskEdit(item.id)} className="h-8 w-8 text-emerald-600">
                        <Check className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 group">
                      <p className={`text-sm font-medium transition-colors ${item.status === 'Done' ? 'text-gray-500 dark:text-slate-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                        {item.title}
                      </p>
                      <button 
                        onClick={() => {
                          setEditingTaskId(item.id);
                          setEditingTaskTitle(item.title);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-indigo-600 transition-all"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400 transition-colors">
                      <User className="w-3 h-3" /> {item.responsible}
                    </span>
                    <select
                      value={item.status}
                      onChange={(e) => handleChecklistStatusChange(item.id, e.target.value as ChecklistStatus)}
                      className={`text-xs rounded-md border-transparent p-1 border transition-colors font-medium focus:ring-0 ${STATUS_COLORS[item.status]}`}
                    >
                      <option value="NotStarted">Não Iniciado</option>
                      <option value="Pending">Em andamento</option>
                      <option value="Sent">Enviado</option>
                      <option value="WaitingOtherSector">Aguardando Setor</option>
                      <option value="Done">Concluído</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => removeChecklistItem(item.id)}
                    className="text-gray-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Subtasks - Always expanded */}
              <div className="pl-4 mt-2 border-l-2 border-indigo-100 dark:border-indigo-900/50 space-y-2">
                {(item.subtasks || []).map(subtask => (
                  <div key={subtask.id} className="flex items-center gap-2 group">
                    {editingSubtaskId === subtask.id ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Input 
                          value={editingSubtaskTitle}
                          onChange={(e) => setEditingSubtaskTitle(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && saveSubtaskEdit(item.id, subtask.id)}
                          autoFocus
                          className="h-8 text-sm"
                        />
                        <Button size="icon" variant="ghost" onClick={() => saveSubtaskEdit(item.id, subtask.id)} className="h-8 w-8 text-emerald-600">
                          <Check className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <span className={`flex-1 text-sm transition-colors flex items-center gap-2 ${subtask.status === 'Done' ? 'text-gray-500 dark:text-slate-400 line-through' : 'text-gray-700 dark:text-slate-300'}`}>
                          {subtask.title}
                          <button 
                            onClick={() => {
                              setEditingSubtaskId(subtask.id);
                              setEditingSubtaskTitle(subtask.title);
                            }}
                            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-indigo-600 transition-all"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                        </span>
                        
                        <select
                          value={subtask.status}
                          onChange={(e) => handleSubtaskStatusChange(item.id, subtask.id, e.target.value as ChecklistStatus)}
                          className={`text-xs rounded-md border-transparent p-1 border transition-colors font-medium focus:ring-0 ${STATUS_COLORS[subtask.status]}`}
                        >
                          <option value="NotStarted">Não Iniciado</option>
                          <option value="Pending">Em andamento</option>
                          <option value="Sent">Enviado</option>
                          <option value="WaitingOtherSector">Aguardando Setor</option>
                          <option value="Done">Concluído</option>
                        </select>
                        
                        <button 
                          onClick={() => removeSubtask(item.id, subtask.id)}
                          className="text-gray-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </>
                    )}
                  </div>
                ))}
                <div className="flex gap-2 mt-2 items-center">
                  <Input 
                    placeholder="Nova sub-tarefa..." 
                    value={newSubtaskTitle[item.id] || ''}
                    onChange={(e) => setNewSubtaskTitle(prev => ({ ...prev, [item.id]: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSubtask(item.id)}
                    className="h-8 text-sm"
                  />
                  <Button onClick={() => handleAddSubtask(item.id)} variant="secondary" className="h-8 px-3">
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {task.checklist.length === 0 && !isAddingTask && (
            <div className="text-center py-6 text-slate-500 dark:text-slate-400 text-sm bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-200 dark:border-slate-700">
              Nenhuma tarefa cadastrada. Adicione uma nova tarefa para começar.
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 transition-colors">Observações Gerais</h3>
        <Textarea 
          value={task.notes}
          onChange={handleNotesChange}
          placeholder="Anotações importantes sobre este cliente..."
          className="h-32 resize-none"
        />
      </div>
    </div>
  );
}

