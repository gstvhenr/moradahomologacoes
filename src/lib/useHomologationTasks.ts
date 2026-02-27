'use client';

import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { initialTasks } from './mockData';
import { HomologationTask } from '../types';

export function useHomologationTasks() {
  const DATA_VERSION = 'v37-agropalma-done';

  // Check if data needs re-seeding (SSR-safe)
  try {
    const storedVersion = localStorage.getItem('homologation-data-version');
    if (storedVersion !== DATA_VERSION) {
      localStorage.removeItem('homologation-tasks');
      localStorage.removeItem('homologation-archived');
      localStorage.setItem('homologation-data-version', DATA_VERSION);
    }
  } catch {
    // SSR or restricted context — skip
  }

  const [tasks, setTasks] = useLocalStorage<HomologationTask[]>('homologation-tasks', initialTasks);
  const [selectedTask, setSelectedTask] = useState<HomologationTask | null>(null);

  const updateTask = (updatedTask: HomologationTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setSelectedTask(updatedTask);
  };

  const updateTaskSilent = (updatedTask: HomologationTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const createTask = (clientName: string) => {
    if (!clientName.trim()) return;
    const newTask: HomologationTask = {
      id: crypto.randomUUID(),
      clientName,
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      contactIsWhatsApp: false,
      contactLink: '',
      empresa: '',
      filial: '',
      status: 'Not Started',
      deadline: '',
      followUpDate: '',
      checklist: [],
      history: [{ id: crypto.randomUUID(), date: new Date().toISOString(), description: 'Processo de homologação iniciado.' }],
      notes: '',
      priority: 'medium',
    };
    setTasks([...tasks, newTask]);
    setSelectedTask(newTask);
    return newTask;
  };

  return {
    tasks,
    selectedTask,
    setSelectedTask,
    updateTask,
    updateTaskSilent,
    createTask,
  };
}
