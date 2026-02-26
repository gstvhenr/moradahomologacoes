import React, { useState } from 'react';
import { HomologationTask, ChecklistItem, HomologationStatus, ChecklistStatus, Subtask, SubtaskType } from '../types';
import { Button, Input, Label, Textarea } from './ui';

import {
  CheckCircle2, Plus, Trash2, User, Edit2, Check,
  Link as LinkIcon, Hash, Type, DollarSign, Paperclip,
  CheckSquare, List, CircleDot, ChevronDown
} from 'lucide-react';

interface Props {
  task: HomologationTask;
  onUpdate: (task: HomologationTask) => void;
  readOnly?: boolean;
}

const STATUS_COLORS: Record<ChecklistStatus, string> = {
  NotStarted: 'text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400',
  Pending: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/30 dark:text-cyan-400',
  Sent: 'text-accent-600 bg-accent-50 dark:bg-accent-900/30 dark:text-accent-400',
  WaitingOtherSector: 'text-orange-600 bg-orange-50 dark:bg-orange-900/30 dark:text-orange-400',
  Done: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400'
};

const STATUS_LABELS: Record<ChecklistStatus, string> = {
  NotStarted: 'Não Iniciado',
  Pending: 'Em andamento',
  Sent: 'Enviado',
  WaitingOtherSector: 'Aguardando Setor',
  Done: 'Concluído'
};

const SUBTASK_TYPE_CONFIG: Record<SubtaskType, { label: string; icon: React.ReactNode; color: string }> = {
  text: { label: 'Texto', icon: <Type className="w-3 h-3" />, color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-900/30' },
  number: { label: 'Número', icon: <Hash className="w-3 h-3" />, color: 'text-brand-500 bg-brand-50 dark:bg-brand-900/30' },
  currency: { label: 'Monetário', icon: <DollarSign className="w-3 h-3" />, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30' },
  attachment: { label: 'Anexo', icon: <Paperclip className="w-3 h-3" />, color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/30' },
  checkbox: { label: 'Check-box', icon: <CheckSquare className="w-3 h-3" />, color: 'text-teal-500 bg-teal-50 dark:bg-teal-900/30' },
  select: { label: 'Seleção múltipla', icon: <List className="w-3 h-3" />, color: 'text-brand-600 bg-brand-50 dark:bg-brand-900/30' },
  'single-select': { label: 'Seleção única', icon: <CircleDot className="w-3 h-3" />, color: 'text-rose-500 bg-rose-50 dark:bg-rose-900/30' },
};

export function HomologationDetail({ task, onUpdate, readOnly = false }: Props) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newChecklistTitle, setNewChecklistTitle] = useState('');
  const [newChecklistResponsible, setNewChecklistResponsible] = useState('');

  const [addingSubtaskFor, setAddingSubtaskFor] = useState<string | null>(null);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [newSubtaskType, setNewSubtaskType] = useState<SubtaskType>('text');
  const [newSubtaskOptions, setNewSubtaskOptions] = useState('');

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState('');
  const [editingSubtaskId, setEditingSubtaskId] = useState<string | null>(null);
  const [editingSubtaskTitle, setEditingSubtaskTitle] = useState('');

  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedTasks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (readOnly) return;
    onUpdate({ ...task, status: e.target.value as HomologationStatus });
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (readOnly) return;
    onUpdate({ ...task, notes: e.target.value });
  };

  const handleAddChecklist = () => {
    if (readOnly) return;
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
    if (readOnly) return;
    const updated = task.checklist.map(item =>
      item.id === id ? { ...item, status } : item
    );
    onUpdate({ ...task, checklist: updated });
  };

  const removeChecklistItem = (id: string) => {
    if (readOnly) return;
    onUpdate({ ...task, checklist: task.checklist.filter(i => i.id !== id) });
  };

  const handleAddSubtask = (checklistItemId: string) => {
    if (readOnly) return;
    if (!newSubtaskTitle.trim()) return;
    const needsOptions = newSubtaskType === 'select' || newSubtaskType === 'single-select';
    const parsedOptions = needsOptions
      ? newSubtaskOptions.split(',').map(o => o.trim()).filter(Boolean)
      : undefined;
    const defaultValue = getDefaultValue(newSubtaskType);

    const updated = task.checklist.map(item => {
      if (item.id === checklistItemId) {
        const newSubtask: Subtask = {
          id: crypto.randomUUID(),
          title: newSubtaskTitle,
          type: newSubtaskType,
          status: 'NotStarted',
          value: defaultValue,
          options: parsedOptions,
        };
        return { ...item, subtasks: [...(item.subtasks || []), newSubtask] };
      }
      return item;
    });
    onUpdate({ ...task, checklist: updated });
    setNewSubtaskTitle('');
    setNewSubtaskType('text');
    setNewSubtaskOptions('');
    setAddingSubtaskFor(null);
  };

  const getDefaultValue = (type: SubtaskType): string | number | boolean | string[] => {
    switch (type) {
      case 'number': return 0;
      case 'currency': return 0;
      case 'checkbox': return false;
      case 'select': return [];
      case 'single-select': return '';
      default: return '';
    }
  };

  const handleSubtaskValueChange = (checklistItemId: string, subtaskId: string, value: string | number | boolean | string[]) => {
    if (readOnly) return;
    const updated = task.checklist.map(item => {
      if (item.id === checklistItemId) {
        const updatedSubtasks = (item.subtasks || []).map(st =>
          st.id === subtaskId ? { ...st, value } : st
        );
        return { ...item, subtasks: updatedSubtasks };
      }
      return item;
    });
    onUpdate({ ...task, checklist: updated });
  };

  const handleSubtaskStatusChange = (checklistItemId: string, subtaskId: string, status: ChecklistStatus) => {
    if (readOnly) return;
    const updated = task.checklist.map(item => {
      if (item.id === checklistItemId) {
        const updatedSubtasks = (item.subtasks || []).map(st =>
          st.id === subtaskId ? { ...st, status } : st
        );
        const allDone = updatedSubtasks.length > 0 && updatedSubtasks.every(st => st.status === 'Done');
        const newItemStatus = allDone ? 'Done' as ChecklistStatus : (item.status === 'Done' ? 'Pending' as ChecklistStatus : item.status);
        return { ...item, subtasks: updatedSubtasks, status: newItemStatus };
      }
      return item;
    });
    onUpdate({ ...task, checklist: updated });
  };

  const removeSubtask = (checklistItemId: string, subtaskId: string) => {
    if (readOnly) return;
    const updated = task.checklist.map(item => {
      if (item.id === checklistItemId) {
        return { ...item, subtasks: (item.subtasks || []).filter(st => st.id !== subtaskId) };
      }
      return item;
    });
    onUpdate({ ...task, checklist: updated });
  };

  const saveTaskEdit = (id: string) => {
    if (readOnly) return;
    if (!editingTaskTitle.trim()) { setEditingTaskId(null); return; }
    const updated = task.checklist.map(item =>
      item.id === id ? { ...item, title: editingTaskTitle } : item
    );
    onUpdate({ ...task, checklist: updated });
    setEditingTaskId(null);
  };

  const saveSubtaskEdit = (checklistItemId: string, subtaskId: string) => {
    if (readOnly) return;
    if (!editingSubtaskTitle.trim()) { setEditingSubtaskId(null); return; }
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

  const allSubtasks = task.checklist.flatMap(c => c.subtasks || []);
  const totalCount = allSubtasks.length;
  const isFinished = task.status === 'Approved' || task.status === 'Rejected';
  const completedCount = isFinished ? totalCount : allSubtasks.filter(s => s.status === 'Done').length;
  const overallProgress = isFinished ? 100 : (totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100));

  const renderSubtaskInput = (item: ChecklistItem, subtask: Subtask) => {
    switch (subtask.type) {
      case 'number':
        return (
          <Input
            type="number"
            value={String(subtask.value ?? '')}
            onChange={(e) => handleSubtaskValueChange(item.id, subtask.id, Number(e.target.value))}
            disabled={readOnly}
            className="h-8 text-sm rounded-lg w-32"
            placeholder="0"
          />
        );
      case 'currency':
        return (
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">R$</span>
            <Input
              type="number"
              step="0.01"
              value={String(subtask.value ?? '')}
              onChange={(e) => handleSubtaskValueChange(item.id, subtask.id, Number(e.target.value))}
              disabled={readOnly}
              className="h-8 text-sm rounded-lg w-32"
              placeholder="0,00"
            />
          </div>
        );
      case 'checkbox':
        return (
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={Boolean(subtask.value)}
              onChange={(e) => handleSubtaskValueChange(item.id, subtask.id, e.target.checked)}
              disabled={readOnly}
              className="rounded border-gray-300 dark:border-slate-600 text-brand-600 focus:ring-brand-500 h-4 w-4"
            />
            <span className={`text-xs ${subtask.value ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
              {subtask.value ? 'Sim' : 'Não'}
            </span>
          </label>
        );
      case 'attachment': {
        const url = String(subtask.value ?? '');
        const hasUrl = url.startsWith('http');
        return (
          <div className="flex items-center gap-2">
            {hasUrl ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-300 border border-brand-200 dark:border-brand-700/50 hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-colors"
              >
                <Paperclip className="w-3 h-3" />
                Abrir documento ↗
              </a>
            ) : (
              <>
                <Input
                  type="text"
                  value={url}
                  onChange={(e) => handleSubtaskValueChange(item.id, subtask.id, e.target.value)}
                  disabled={readOnly}
                  className="h-8 text-sm rounded-lg flex-1"
                  placeholder="URL"
                />
                <Paperclip className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              </>
            )}
          </div>
        );
      }
      case 'select': {
        const selectedValues = Array.isArray(subtask.value) ? subtask.value : [];
        return (
          <div className="flex flex-wrap gap-1.5">
            {(subtask.options || []).map(opt => {
              const isSelected = selectedValues.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => {
                    const next = isSelected
                      ? selectedValues.filter(v => v !== opt)
                      : [...selectedValues, opt];
                    handleSubtaskValueChange(item.id, subtask.id, next);
                  }}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all font-medium ${isSelected
                    ? 'bg-brand-100 dark:bg-brand-900/40 border-brand-300 dark:border-brand-600 text-brand-700 dark:text-brand-300'
                    : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:border-brand-200'
                    }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        );
      }
      case 'single-select':
        return (
          <select
            value={String(subtask.value ?? '')}
            onChange={(e) => handleSubtaskValueChange(item.id, subtask.id, e.target.value)}
            disabled={readOnly}
            aria-label={`Seleção: ${subtask.title}`}
            className="text-xs rounded-lg border-gray-200 dark:border-slate-700 p-1.5 border transition-colors bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-brand-500 disabled:cursor-default"
          >
            <option value="">Selecione...</option>
            {(subtask.options || []).map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );
      default:
        return (
          <Input
            type="text"
            value={String(subtask.value ?? '')}
            onChange={(e) => handleSubtaskValueChange(item.id, subtask.id, e.target.value)}
            disabled={readOnly}
            className="h-8 text-sm rounded-lg flex-1"
            placeholder="Valor..."
          />
        );
    }
  };

  return (
    <div className={`flex flex-col gap-6 ${readOnly ? '[&_input]:opacity-80 [&_select]:opacity-80 [&_textarea]:opacity-80' : ''}`}>
      {/* Progress Overview */}
      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-brand-50 to-cyan-50 dark:from-brand-900/20 dark:to-cyan-900/20 rounded-xl border border-brand-100 dark:border-brand-800/30 transition-colors">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Progresso Geral</span>
            <span className={`text-sm font-bold ${overallProgress === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-brand-600 dark:text-cyan-400'}`}>{overallProgress}%</span>
          </div>
          <div className="w-full bg-white/60 dark:bg-slate-700/60 rounded-full h-2.5 overflow-hidden shadow-inner">
            <div
              className={`progress-bar-fill h-full rounded-full transition-all duration-700 ease-out ${overallProgress === 100 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-gradient-to-r from-brand-500 to-cyan-400'}`}
              ref={(el) => { if (el) el.style.width = `${overallProgress}%`; }}
            />
          </div>
        </div>
        <div className="text-right pl-4 border-l border-brand-200/50 dark:border-brand-700/50">
          <p className="text-2xl font-bold text-brand-600 dark:text-cyan-400">{completedCount}/{totalCount}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">tarefas</p>
        </div>
      </div>

      {/* Status | Prazo | Empresa | Filial */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-accent-50/40 dark:bg-accent-900/10 border border-accent-100 dark:border-accent-800/30">
        <div>
          <Label className="text-xs text-accent-700 dark:text-accent-400 uppercase tracking-wider font-semibold">Status</Label>
          <select
            value={task.status}
            onChange={handleStatusChange}
            disabled={readOnly}
            aria-label="Status da Homologação"
            className="mt-1.5 block w-full rounded-xl border-accent-200 dark:border-slate-700 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5 border disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <option value="Not Started">Não Iniciado</option>
            <option value="In Progress">Em Andamento</option>
            <option value="Waiting on Client">Ação Pendente</option>
            <option value="Waiting on Sector">Aguardando Setor</option>
            <option value="Approved">Finalizado</option>
            <option value="Rejected">Rejeitado</option>
          </select>
        </div>
        <div>
          <Label className="text-xs text-accent-700 dark:text-accent-400 uppercase tracking-wider font-semibold">Prazo</Label>
          <Input
            type="date"
            value={task.deadline}
            onChange={(e) => { if (!readOnly) onUpdate({ ...task, deadline: e.target.value }); }}
            disabled={readOnly}
            className="mt-1.5 rounded-xl"
          />
        </div>
        <div>
          <Label className="text-xs text-accent-700 dark:text-accent-400 uppercase tracking-wider font-semibold">Empresa</Label>
          <select
            value={task.empresa || ''}
            onChange={(e) => { if (!readOnly) onUpdate({ ...task, empresa: e.target.value, filial: '' }); }}
            disabled={readOnly}
            aria-label="Empresa"
            className="mt-1.5 block w-full rounded-xl border-accent-200 dark:border-slate-700 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5 border disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <option value="">Selecione...</option>
            <option value="Morada">Morada</option>
            <option value="Itaobi">Itaobi</option>
          </select>
        </div>
        <div>
          <Label className="text-xs text-accent-700 dark:text-accent-400 uppercase tracking-wider font-semibold">Filial</Label>
          <select
            value={task.filial || ''}
            onChange={(e) => { if (!readOnly) onUpdate({ ...task, filial: e.target.value }); }}
            aria-label="Filial"
            disabled={readOnly || !task.empresa}
            className="mt-1.5 block w-full rounded-xl border-accent-200 dark:border-slate-700 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5 border disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Selecione...</option>
            {task.empresa === 'Morada' && (
              <>
                <option value="Araraquara (Matriz)">Araraquara (Matriz)</option>
                <option value="Americana (Filial)">Americana (Filial)</option>
              </>
            )}
            {task.empresa === 'Itaobi' && (
              <option value="Jardinópolis (Matriz)">Jardinópolis (Matriz)</option>
            )}
          </select>
        </div>
      </div>

      {/* Contact Info */}
      <div className="p-4 rounded-xl bg-cyan-50/40 dark:bg-cyan-900/10 border border-cyan-100 dark:border-cyan-800/30">
        <h3 className="text-xs font-semibold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <User className="w-3.5 h-3.5" />
          Informações de Contato
        </h3>
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Label className="text-xs text-slate-500 dark:text-slate-400">Nome</Label>
              <Input
                value={task.contactName || ''}
                onChange={(e) => { if (!readOnly) onUpdate({ ...task, contactName: e.target.value }); }}
                disabled={readOnly}
                placeholder="Nome do contato"
                className="mt-1 h-9 rounded-xl"
              />
            </div>
            <div>
              <Label className="text-xs text-slate-500 dark:text-slate-400">E-mail</Label>
              <Input
                type="email"
                value={task.contactEmail || ''}
                onChange={(e) => { if (!readOnly) onUpdate({ ...task, contactEmail: e.target.value }); }}
                disabled={readOnly}
                placeholder="email@exemplo.com"
                className="mt-1 h-9 rounded-xl"
              />
            </div>
            <div>
              <Label className="text-xs text-slate-500 dark:text-slate-400">Telefone</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="tel"
                  value={task.contactPhone || ''}
                  onChange={(e) => { if (!readOnly) onUpdate({ ...task, contactPhone: e.target.value }); }}
                  disabled={readOnly}
                  placeholder="(XX) XXXXX-XXXX"
                  className="h-9 rounded-xl flex-1"
                />
                <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 whitespace-nowrap cursor-pointer select-none bg-white dark:bg-slate-800 px-2.5 py-2 rounded-xl border border-cyan-200 dark:border-slate-700">
                  <input
                    type="checkbox"
                    checked={task.contactIsWhatsApp || false}
                    onChange={(e) => { if (!readOnly) onUpdate({ ...task, contactIsWhatsApp: e.target.checked }); }}
                    disabled={readOnly}
                    className="rounded border-gray-300 dark:border-slate-600 text-brand-600 focus:ring-brand-500 h-3.5 w-3.5"
                  />
                  WhatsApp
                </label>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-xs text-slate-500 dark:text-slate-400">Link / Plataforma</Label>
            <div className="flex items-center gap-2 mt-1">
              <LinkIcon className="w-4 h-4 text-cyan-400 dark:text-cyan-500 shrink-0" />
              <Input
                value={task.contactLink || ''}
                onChange={(e) => { if (!readOnly) onUpdate({ ...task, contactLink: e.target.value }); }}
                disabled={readOnly}
                placeholder="https://plataforma.com.br"
                className="h-9 rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="p-4 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />
            Tarefas
            <span className="text-xs font-normal text-gray-400 dark:text-slate-500 normal-case tracking-normal ml-1">
              {completedCount} de {totalCount}
            </span>
          </h3>
          {!readOnly && (
            <Button onClick={() => setIsAddingTask(!isAddingTask)} variant="outline" size="sm" className="gap-1.5 rounded-xl text-xs">
              <Plus className="w-3.5 h-3.5" />
              Nova tarefa
            </Button>
          )}
        </div>

        {isAddingTask && (
          <div className="flex gap-2 mb-4 items-start p-4 bg-brand-50/60 dark:bg-brand-900/10 rounded-xl border border-brand-100 dark:border-brand-800/30">
            <div className="flex-1 space-y-2">
              <Input
                placeholder="Nome da tarefa..."
                value={newChecklistTitle}
                onChange={(e) => setNewChecklistTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddChecklist()}
                autoFocus
                className="rounded-xl"
              />
              <Input
                placeholder="Responsável (ex: Comercial, Fiscal)"
                value={newChecklistResponsible}
                onChange={(e) => setNewChecklistResponsible(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddChecklist()}
                className="text-xs rounded-xl"
              />
            </div>
            <Button onClick={handleAddChecklist} variant="default" className="h-10 rounded-xl">
              Salvar
            </Button>
          </div>
        )}

        <div className="space-y-3">
          {task.checklist.map(item => {
            const isExpanded = expandedTasks.has(item.id);
            const subtaskCount = (item.subtasks || []).length;
            const subtaskDone = (item.subtasks || []).filter(s => s.status === 'Done').length;

            const statusBg: Record<string, string> = {
              NotStarted: 'bg-white dark:bg-slate-800/80 border-gray-100 dark:border-slate-700/80',
              Pending: 'bg-cyan-50/30 dark:bg-cyan-900/10 border-cyan-100 dark:border-cyan-800/40',
              Sent: 'bg-accent-50/30 dark:bg-accent-900/10 border-accent-100 dark:border-accent-800/40',
              WaitingOtherSector: 'bg-orange-50/30 dark:bg-orange-900/10 border-orange-100 dark:border-orange-800/40',
              Done: 'bg-emerald-50/30 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/40',
            };

            return (
              <div key={item.id} className={`border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${statusBg[item.status] || statusBg.NotStarted}`}>
                {/* Collapsible Header */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors"
                >
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isExpanded ? '' : '-rotate-90'}`} />
                  <span className="text-sm font-medium text-gray-800 dark:text-white flex-1 truncate">{item.title}</span>
                  {subtaskCount > 0 && (
                    <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                      {subtaskDone}/{subtaskCount}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400 shrink-0">
                    <User className="w-3 h-3" /> {item.responsible}
                  </span>
                  <span className={`text-xs rounded-lg px-2 py-0.5 font-medium shrink-0 ${STATUS_COLORS[item.status]}`}>
                    {STATUS_LABELS[item.status]}
                  </span>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-50 dark:border-slate-700/50">
                    {/* Task actions */}
                    <div className="flex items-center gap-2 py-2">
                      <select
                        value={item.status}
                        onChange={(e) => handleChecklistStatusChange(item.id, e.target.value as ChecklistStatus)}
                        onClick={(e) => e.stopPropagation()}
                        disabled={readOnly}
                        aria-label="Status da tarefa"
                        className={`text-xs rounded-lg border-transparent p-1 border transition-colors font-medium focus:ring-0 disabled:cursor-default ${STATUS_COLORS[item.status]}`}
                      >
                        <option value="NotStarted">Não Iniciado</option>
                        <option value="Pending">Em andamento</option>
                        <option value="Sent">Enviado</option>
                        <option value="WaitingOtherSector">Aguardando Setor</option>
                        <option value="Done">Concluído</option>
                      </select>
                      <div className="flex-1" />
                      {editingTaskId === item.id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            value={editingTaskTitle}
                            onChange={(e) => setEditingTaskTitle(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && saveTaskEdit(item.id)}
                            autoFocus
                            className="h-8 text-sm rounded-lg"
                          />
                          <Button size="icon" variant="ghost" onClick={() => saveTaskEdit(item.id)} className="h-8 w-8 text-emerald-600">
                            <Check className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : !readOnly ? (
                        <button
                          onClick={() => { setEditingTaskId(item.id); setEditingTaskTitle(item.title); }}
                          aria-label="Editar tarefa"
                          className="text-slate-400 hover:text-brand-600 p-1 transition-all"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      ) : null}
                      {!readOnly && (
                        <button
                          onClick={() => removeChecklistItem(item.id)}
                          aria-label="Remover tarefa"
                          className="text-gray-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Subtasks */}
                    <div className="pl-4 border-l-2 border-brand-100 dark:border-brand-900/50 space-y-2 mt-2">
                      {(item.subtasks || []).map(subtask => {
                        return (
                          <div key={subtask.id} className="flex items-center gap-2 group py-1">
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
                                <span className="text-sm text-gray-700 dark:text-slate-300 flex items-center gap-1.5 min-w-[80px]">
                                  {subtask.title}
                                  {!readOnly && (
                                    <button
                                      onClick={() => { setEditingSubtaskId(subtask.id); setEditingSubtaskTitle(subtask.title); }}
                                      aria-label="Editar sub-tarefa"
                                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-brand-600 transition-all"
                                    >
                                      <Edit2 className="w-3 h-3" />
                                    </button>
                                  )}
                                </span>

                                <div className="flex-1">
                                  {renderSubtaskInput(item, subtask)}
                                </div>

                                <select
                                  value={subtask.status}
                                  onChange={(e) => handleSubtaskStatusChange(item.id, subtask.id, e.target.value as ChecklistStatus)}
                                  disabled={readOnly}
                                  aria-label="Status da sub-tarefa"
                                  className={`text-xs rounded-lg border-transparent p-1 border transition-colors font-medium focus:ring-0 disabled:cursor-default ${STATUS_COLORS[subtask.status]}`}
                                >
                                  <option value="NotStarted">Não Iniciado</option>
                                  <option value="Pending">Em andamento</option>
                                  <option value="Sent">Enviado</option>
                                  <option value="WaitingOtherSector">Aguardando Setor</option>
                                  <option value="Done">Concluído</option>
                                </select>

                                {!readOnly && (
                                  <button
                                    onClick={() => removeSubtask(item.id, subtask.id)}
                                    aria-label="Remover sub-tarefa"
                                    className="text-gray-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-all"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        );
                      })}

                      {/* Add subtask UI */}
                      {addingSubtaskFor === item.id ? (
                        <div className="space-y-2 p-3 bg-brand-50/40 dark:bg-brand-900/10 rounded-xl border border-brand-100 dark:border-brand-800/30 mt-2">
                          <div className="flex gap-2 items-center">
                            <select
                              value={newSubtaskType}
                              onChange={(e) => setNewSubtaskType(e.target.value as SubtaskType)}
                              aria-label="Tipo da sub-tarefa"
                              className="text-xs rounded-lg border-gray-200 dark:border-slate-700 p-1.5 border bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-brand-500"
                            >
                              {Object.entries(SUBTASK_TYPE_CONFIG).map(([key, cfg]) => (
                                <option key={key} value={key}>{cfg.label}</option>
                              ))}
                            </select>
                            <Input
                              placeholder="Nome do campo..."
                              value={newSubtaskTitle}
                              onChange={(e) => setNewSubtaskTitle(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleAddSubtask(item.id)}
                              autoFocus
                              className="h-8 text-sm rounded-lg flex-1"
                            />
                          </div>
                          {(newSubtaskType === 'select' || newSubtaskType === 'single-select') && (
                            <Input
                              placeholder="Opções separadas por vírgula (ex: Opção A, Opção B, Opção C)"
                              value={newSubtaskOptions}
                              onChange={(e) => setNewSubtaskOptions(e.target.value)}
                              className="h-8 text-xs rounded-lg"
                            />
                          )}
                          <div className="flex gap-2">
                            <Button onClick={() => handleAddSubtask(item.id)} variant="default" size="sm" className="rounded-lg text-xs">
                              Adicionar
                            </Button>
                            <Button onClick={() => { setAddingSubtaskFor(null); setNewSubtaskTitle(''); setNewSubtaskType('text'); setNewSubtaskOptions(''); }} variant="ghost" size="sm" className="rounded-lg text-xs">
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      ) : !readOnly ? (
                        <button
                          onClick={() => setAddingSubtaskFor(item.id)}
                          className="flex items-center gap-1.5 text-xs text-brand-500 hover:text-brand-700 dark:hover:text-brand-300 mt-1 transition-colors font-medium"
                        >
                          <Plus className="w-3 h-3" />
                          Adicionar campo
                        </button>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {task.checklist.length === 0 && !isAddingTask && (
            <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-sm bg-white/50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
              Nenhuma tarefa cadastrada. Adicione uma nova tarefa para começar.
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="p-4 rounded-xl bg-green-50/30 dark:bg-green-900/10 border border-green-100 dark:border-green-800/30">
        <h3 className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider mb-3">Observações Gerais</h3>
        <Textarea
          value={task.notes}
          onChange={handleNotesChange}
          disabled={readOnly}
          placeholder="Anotações importantes sobre este cliente..."
          className="h-28 resize-none rounded-xl bg-white dark:bg-slate-800"
        />
      </div>


    </div>
  );
}
