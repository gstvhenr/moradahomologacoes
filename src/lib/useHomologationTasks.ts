'use client';

import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { initialTasks } from './mockData';
import { HomologationTask } from '../types';

export function useHomologationTasks() {
  const [tasks, setTasks] = useLocalStorage<HomologationTask[]>('homologation-tasks', initialTasks);
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
    createTask,
  };
}
