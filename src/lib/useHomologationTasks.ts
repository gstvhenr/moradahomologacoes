'use client';

import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { initialTasks, initialArchivedTasks } from './mockData';
import { HomologationTask } from '../types';

export function useHomologationTasks() {
  const DATA_VERSION = 'v19-agropalma';

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
  const [archivedTasks, setArchivedTasks] = useLocalStorage<HomologationTask[]>('homologation-archived', initialArchivedTasks);
  const [selectedTask, setSelectedTask] = useState<HomologationTask | null>(null);

  const updateTask = (updatedTask: HomologationTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setSelectedTask(updatedTask);
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

  const archiveTask = (taskId: string) => {
    const taskToArchive = tasks.find(t => t.id === taskId);
    if (!taskToArchive) return;
    setArchivedTasks([...archivedTasks, taskToArchive]);
    setTasks(tasks.filter(t => t.id !== taskId));
    setSelectedTask(null);
  };

  const restoreTask = (taskId: string) => {
    const taskToRestore = archivedTasks.find(t => t.id === taskId);
    if (!taskToRestore) return;
    setTasks([...tasks, taskToRestore]);
    setArchivedTasks(archivedTasks.filter(t => t.id !== taskId));
  };

  return {
    tasks,
    archivedTasks,
    selectedTask,
    setSelectedTask,
    updateTask,
    createTask,
    archiveTask,
    restoreTask,
  };
}
