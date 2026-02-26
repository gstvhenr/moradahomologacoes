import React, { useState } from 'react';
import { CarrierDocument } from '../types';
import { Modal } from './Modal';
import { Input, Label, Button } from './ui';

interface NewDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateDocument: (data: Partial<CarrierDocument>) => void;
}

const DOCUMENT_CATEGORIES = [
  'Societário',
  'Fiscal',
  'Trabalhista',
  'Operacional',
  'Seguros',
  'Outros',
] as const;

export function NewDocumentModal({ isOpen, onClose, onCreateDocument }: NewDocumentModalProps) {
  const [formData, setFormData] = useState<Partial<CarrierDocument>>({ status: 'Valid' });

  const handleCreate = () => {
    if (!formData.name || !formData.category) return;
    onCreateDocument(formData);
    setFormData({ status: 'Valid' });
    onClose();
  };

  const updateField = <K extends keyof CarrierDocument>(field: K, value: CarrierDocument[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Documento" size="md">
      <div className="space-y-4">
        <div>
          <Label>Nome do Documento</Label>
          <Input
            value={formData.name || ''}
            onChange={(e) => updateField('name', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="doc-category">Categoria</Label>
          <select
            id="doc-category"
            title="Categoria do Documento"
            aria-label="Categoria do Documento"
            value={formData.category || ''}
            onChange={(e) => updateField('category', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-2 border transition-colors"
          >
            <option value="">Selecione...</option>
            {DOCUMENT_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <Label>Data de Validade</Label>
          <Input
            type="date"
            value={formData.expirationDate || ''}
            onChange={(e) => updateField('expirationDate', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="doc-status">Status</Label>
          <select
            id="doc-status"
            title="Status do Documento"
            aria-label="Status do Documento"
            value={formData.status || 'Valid'}
            onChange={(e) => updateField('status', e.target.value as CarrierDocument['status'])}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-2 border transition-colors"
          >
            <option value="Valid">Válido</option>
            <option value="Expired">Vencido</option>
            <option value="Pending">Pendente</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleCreate}>Salvar Documento</Button>
        </div>
      </div>
    </Modal>
  );
}
