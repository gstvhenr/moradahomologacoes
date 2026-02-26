import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useThemeToggle } from './useThemeToggle';

vi.mock('./useLocalStorage', () => {
  const { useState } = require('react');
  return {
    useLocalStorage: <T,>(_key: string, initialValue: T) => {
      return useState<T>(initialValue);
    },
  };
});

describe('useThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.documentElement.classList.remove('dark');
  });

  it('should start with dark theme as default', () => {
    const { result } = renderHook(() => useThemeToggle());
    expect(result.current.theme).toBe('dark');
  });

  it('should be mounted after initial render', () => {
    const { result } = renderHook(() => useThemeToggle());
    expect(result.current.mounted).toBe(true);
  });

  it('should add dark class to document when theme is dark', () => {
    renderHook(() => useThemeToggle());
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should toggle from dark to light', () => {
    const { result } = renderHook(() => useThemeToggle());

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should toggle from light back to dark', () => {
    const { result } = renderHook(() => useThemeToggle());

    // Dark → Light
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('light');

    // Light → Dark
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
