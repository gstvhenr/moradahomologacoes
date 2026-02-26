import React, { useState } from 'react';
import { Modal } from './Modal';
import { Input, Label, Button } from './ui';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (clientName: string) => void;
}

export function NewTaskModal({ isOpen, onClose, onCreateTask }: NewTaskModalProps) {
  const [clientName, setClientName] = useState('');

  const handleCreate = () => {
    if (!clientName.trim()) return;
    onCreateTask(clientName);
    setClientName('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova Homologação" size="md">
      <div className="space-y-4">
        <div>
          <Label>Nome do Cliente / Empresa</Label>
          <Input
            autoFocus
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Ex: Indústria XYZ"
            className="mt-1"
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleCreate}>Criar Homologação</Button>
        </div>
      </div>
    </Modal>
  );
}
