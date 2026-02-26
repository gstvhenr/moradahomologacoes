import React, { useState } from 'react';
import { CarrierDocument } from '../types';
import { Badge, Button, Input } from './ui';
import { formatDate } from '../lib/utils';
import { FileText, Plus, Search, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  documents: CarrierDocument[];
  onAddDocument: () => void;
  onUpdateDocument: (doc: CarrierDocument) => void;
}

export function DocumentsView({ documents, onAddDocument, onUpdateDocument }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocs = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Valid': return <Badge variant="success" className="gap-1"><CheckCircle2 className="w-3 h-3" /> Válido</Badge>;
      case 'Expired': return <Badge variant="danger" className="gap-1"><AlertCircle className="w-3 h-3" /> Vencido</Badge>;
      case 'Pending': return <Badge variant="warning">Pendente</Badge>;
      default: return null;
    }
  };

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Documentos da Transportadora</h1>
          <p className="text-base text-slate-500 mt-2 font-medium">Repositório centralizado de documentos para envio rápido.</p>
        </div>
        <Button onClick={onAddDocument} className="gap-2 bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 rounded-full px-8 py-6 text-sm font-semibold transition-all hover:scale-105">
          <Plus className="w-5 h-5" />
          Novo Documento
        </Button>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex-1 flex flex-col">
        <div className="p-6 border-b border-slate-200/60 flex items-center gap-4 bg-slate-50/30">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input 
              placeholder="Buscar documentos..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 h-12 rounded-2xl border-slate-200/60 bg-white/50 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/50 text-xs uppercase text-slate-500 border-b border-slate-200/60 sticky top-0 backdrop-blur-md">
              <tr>
                <th className="px-8 py-5 font-bold tracking-wider">Nome do Documento</th>
                <th className="px-8 py-5 font-bold tracking-wider">Categoria</th>
                <th className="px-8 py-5 font-bold tracking-wider">Validade</th>
                <th className="px-8 py-5 font-bold tracking-wider">Status</th>
                <th className="px-8 py-5 font-bold tracking-wider">Observações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {filteredDocs.map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-100 transition-colors">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-slate-900 text-base">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 font-medium">{doc.category}</td>
                  <td className="px-8 py-5 font-medium">
                    {doc.expirationDate ? formatDate(doc.expirationDate) : <span className="text-slate-400">N/A</span>}
                  </td>
                  <td className="px-8 py-5">
                    {getStatusBadge(doc.status)}
                  </td>
                  <td className="px-8 py-5 max-w-xs truncate font-medium text-slate-500" title={doc.notes}>
                    {doc.notes || '-'}
                  </td>
                </tr>
              ))}
              {filteredDocs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center text-slate-500 font-medium">
                    Nenhum documento encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
