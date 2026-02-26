import { CarrierDocument, HomologationTask } from '../types';

export const initialTasks: HomologationTask[] = [
  { id: '1', clientName: 'Heineken', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [] },
  { id: '2', clientName: 'Atvos Energia', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [] },
  { id: '3', clientName: 'Logshare', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [] },
  { id: '4', clientName: 'Minerva Foods', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [] },
  { id: '5', clientName: 'Mercado Livre', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [] },
  { id: '6', clientName: 'Flora Produtos De Higiene E Limpeza S/A', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [] },
  { id: '7', clientName: 'Vibra', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [] },
  { id: '8', clientName: 'Grupo Petropolis', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [] },
  { id: '9', clientName: 'Royal Fic Combustível', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [] },
  { id: '10', clientName: 'Inpasa', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [] },
  { id: '11', clientName: 'Fs Bioenergia', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [] },
  { id: '12', clientName: 'Raízen', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [] },
  { id: '13', clientName: 'Evonik', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [] },
  { id: '14', clientName: 'Novelis', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [] },
  { id: '15', clientName: 'Valgroup', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [] },
  { id: '16', clientName: 'Go Flux', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [] },
  { id: '17', clientName: 'Pão De Açucar', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [] },
  { id: '18', clientName: 'Permetal', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [] },
  { id: '19', clientName: 'Santa Helena', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [] },
  { id: '20', clientName: 'Gomes De Carvalho', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [] },
  { id: '21', clientName: 'Ambev', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [] },
];

export const initialDocuments: CarrierDocument[] = [
  {
    id: 'd1',
    name: 'Contrato Social Consolidado',
    category: 'Societário',
    expirationDate: '',
    status: 'Valid',
    notes: 'Última alteração contratual registrada em 2023.'
  },
  {
    id: 'd2',
    name: 'Certidão Negativa de Débitos Federais',
    category: 'Fiscal',
    expirationDate: '2026-08-15',
    status: 'Valid',
    notes: 'Emitida via site da Receita Federal.'
  },
  {
    id: 'd3',
    name: 'Certificado RNTRC (ANTT)',
    category: 'Operacional',
    expirationDate: '2026-01-10',
    status: 'Expired',
    notes: 'Necessário renovar com urgência. Processo já iniciado no Sindicato.'
  },
  {
    id: 'd4',
    name: 'Apólice RCTR-C',
    category: 'Seguros',
    expirationDate: '2026-12-31',
    status: 'Valid',
    notes: 'Seguradora Porto Seguro. Limite de R$ 500.000,00 por embarque.'
  }
];
