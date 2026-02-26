import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useHomologationTasks } from './useHomologationTasks';

// Mock crypto.randomUUID
vi.stubGlobal('crypto', {
  randomUUID: vi.fn(() => 'test-uuid-123'),
});

// Mock useLocalStorage to use simple useState
vi.mock('./useLocalStorage', () => ({
  useLocalStorage: <T,>(_key: string, initialValue: T) => {
    const [state, setState] = vi.importActual<typeof import('react')>('react').then(m => m.useState(initialValue)) as any;
    return [state, setState];
  },
}));

// Simpler approach: mock useLocalStorage with a factory
vi.mock('./useLocalStorage', () => {
  const { useState } = require('react');
  return {
    useLocalStorage: <T,>(_key: string, initialValue: T) => {
      return useState<T>(initialValue);
    },
  };
});

describe('useHomologationTasks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default tasks from mockData', () => {
    const { result } = renderHook(() => useHomologationTasks());
    expect(result.current.tasks).toBeDefined();
    expect(Array.isArray(result.current.tasks)).toBe(true);
    expect(result.current.selectedTask).toBeNull();
  });

  it('should create a new task with correct defaults', () => {
    const { result } = renderHook(() => useHomologationTasks());
    const initialCount = result.current.tasks.length;

    act(() => {
      result.current.createTask('Empresa Test ABC');
    });

    expect(result.current.tasks).toHaveLength(initialCount + 1);

    const created = result.current.tasks[result.current.tasks.length - 1];
    expect(created.clientName).toBe('Empresa Test ABC');
    expect(created.status).toBe('Not Started');
    expect(created.deadline).toBe('');
    expect(created.followUpDate).toBe('');
    expect(created.checklist).toEqual([]);
    expect(created.history).toHaveLength(1);
    expect(created.notes).toBe('');
  });

  it('should NOT create a task with empty name', () => {
    const { result } = renderHook(() => useHomologationTasks());
    const initialCount = result.current.tasks.length;

    act(() => {
      result.current.createTask('');
    });

    expect(result.current.tasks).toHaveLength(initialCount);
  });

  it('should NOT create a task with whitespace-only name', () => {
    const { result } = renderHook(() => useHomologationTasks());
    const initialCount = result.current.tasks.length;

    act(() => {
      result.current.createTask('   ');
    });

    expect(result.current.tasks).toHaveLength(initialCount);
  });

  it('should select a task after creation', () => {
    const { result } = renderHook(() => useHomologationTasks());

    act(() => {
      result.current.createTask('Empresa Nova');
    });

    expect(result.current.selectedTask).not.toBeNull();
    expect(result.current.selectedTask?.clientName).toBe('Empresa Nova');
  });

  it('should update an existing task', () => {
    const { result } = renderHook(() => useHomologationTasks());

    // Create a task first
    act(() => {
      result.current.createTask('Empresa Para Atualizar');
    });

    const taskToUpdate = result.current.selectedTask!;
    const updatedTask = { ...taskToUpdate, status: 'In Progress' as const };

    act(() => {
      result.current.updateTask(updatedTask);
    });

    const found = result.current.tasks.find(t => t.id === taskToUpdate.id);
    expect(found?.status).toBe('In Progress');
    expect(result.current.selectedTask?.status).toBe('In Progress');
  });

  it('should allow manual selection and deselection', () => {
    const { result } = renderHook(() => useHomologationTasks());

    // Select first task
    act(() => {
      result.current.setSelectedTask(result.current.tasks[0]);
    });
    expect(result.current.selectedTask).toBe(result.current.tasks[0]);

    // Deselect
    act(() => {
      result.current.setSelectedTask(null);
    });
    expect(result.current.selectedTask).toBeNull();
  });
});
