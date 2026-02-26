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

export interface Subtask {
  id: string;
  title: string;
  status: ChecklistStatus;
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

export type HomologationStatus = 'Not Started' | 'In Progress' | 'Waiting on Client' | 'Approved' | 'Rejected';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface HomologationTask {
  id: string;
  clientName: string;
  status: HomologationStatus;
  deadline: string;
  followUpDate: string;
  checklist: ChecklistItem[];
  history: Interaction[];
  notes: string;
  priority: TaskPriority;
}
