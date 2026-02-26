export type DocumentStatus = 'Valid' | 'Expired' | 'Pending';

export interface CarrierDocument {
  id: string;
  name: string;
  category: string;
  expirationDate: string;
  status: DocumentStatus;
  notes: string;
}

export type ChecklistStatus = 'NotStarted' | 'Pending' | 'Sent' | 'WaitingOtherSector' | 'Done';

export type SubtaskType = 'text' | 'number' | 'currency' | 'attachment' | 'checkbox' | 'select' | 'single-select';

export interface Subtask {
  id: string;
  title: string;
  type: SubtaskType;
  status: ChecklistStatus;
  value?: string | number | boolean | string[];
  options?: string[];
}

export interface ChecklistItem {
  id: string;
  title: string;
  status: ChecklistStatus;
  responsible: string;
  subtasks?: Subtask[];
}

export interface Interaction {
  id: string;
  date: string;
  description: string;
}

export type HomologationStatus = 'Not Started' | 'In Progress' | 'Waiting on Client' | 'Waiting on Sector' | 'Approved' | 'Rejected';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface HomologationTask {
  id: string;
  clientName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactIsWhatsApp: boolean;
  contactLink: string;
  empresa: string;
  filial: string;
  status: HomologationStatus;
  deadline: string;
  followUpDate: string;
  checklist: ChecklistItem[];
  history: Interaction[];
  notes: string;
  priority: TaskPriority;
  completed?: boolean;
}
