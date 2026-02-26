'use client';

import { useLocalStorage } from './useLocalStorage';
import { initialDocuments } from './mockData';
import { CarrierDocument } from '../types';

export function useCarrierDocuments() {
  const [documents, setDocuments] = useLocalStorage<CarrierDocument[]>('carrier-documents', initialDocuments);

  const createDocument = (data: Partial<CarrierDocument>) => {
    if (!data.name || !data.category) return;
    const document: CarrierDocument = {
      id: crypto.randomUUID(),
      name: data.name,
      category: data.category,
      expirationDate: data.expirationDate || '',
      status: data.status || 'Valid',
      notes: data.notes || ''
    };
    setDocuments([...documents, document]);
    return document;
  };

  return {
    documents,
    createDocument,
  };
}
