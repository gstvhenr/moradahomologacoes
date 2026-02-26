import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCarrierDocuments } from './useCarrierDocuments';

vi.stubGlobal('crypto', {
  randomUUID: vi.fn(() => 'test-doc-uuid-456'),
});

vi.mock('./useLocalStorage', () => {
  const { useState } = require('react');
  return {
    useLocalStorage: <T,>(_key: string, initialValue: T) => {
      return useState<T>(initialValue);
    },
  };
});

describe('useCarrierDocuments', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default documents from mockData', () => {
    const { result } = renderHook(() => useCarrierDocuments());
    expect(result.current.documents).toBeDefined();
    expect(Array.isArray(result.current.documents)).toBe(true);
  });

  it('should create a document with all required fields', () => {
    const { result } = renderHook(() => useCarrierDocuments());
    const initialCount = result.current.documents.length;

    act(() => {
      result.current.createDocument({
        name: 'Contrato Social',
        category: 'Societário',
        expirationDate: '2027-01-15',
        status: 'Valid',
        notes: 'Documento principal',
      });
    });

    expect(result.current.documents).toHaveLength(initialCount + 1);

    const created = result.current.documents[result.current.documents.length - 1];
    expect(created.name).toBe('Contrato Social');
    expect(created.category).toBe('Societário');
    expect(created.expirationDate).toBe('2027-01-15');
    expect(created.status).toBe('Valid');
    expect(created.notes).toBe('Documento principal');
    expect(created.id).toBe('test-doc-uuid-456');
  });

  it('should NOT create a document without name', () => {
    const { result } = renderHook(() => useCarrierDocuments());
    const initialCount = result.current.documents.length;

    act(() => {
      result.current.createDocument({
        category: 'Fiscal',
        status: 'Valid',
      });
    });

    expect(result.current.documents).toHaveLength(initialCount);
  });

  it('should NOT create a document without category', () => {
    const { result } = renderHook(() => useCarrierDocuments());
    const initialCount = result.current.documents.length;

    act(() => {
      result.current.createDocument({
        name: 'Certidão',
        status: 'Valid',
      });
    });

    expect(result.current.documents).toHaveLength(initialCount);
  });

  it('should default optional fields to empty strings', () => {
    const { result } = renderHook(() => useCarrierDocuments());

    act(() => {
      result.current.createDocument({
        name: 'Apólice',
        category: 'Seguros',
      });
    });

    const created = result.current.documents[result.current.documents.length - 1];
    expect(created.expirationDate).toBe('');
    expect(created.notes).toBe('');
    expect(created.status).toBe('Valid');
  });
});
