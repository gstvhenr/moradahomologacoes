import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { NewDocumentModal } from './NewDocumentModal';

describe('NewDocumentModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onCreateDocument: vi.fn(),
  };

  it('should render the modal with title', () => {
    render(<NewDocumentModal {...defaultProps} />);
    expect(screen.getByText('Novo Documento')).toBeInTheDocument();
  });

  it('should render all form fields', () => {
    render(<NewDocumentModal {...defaultProps} />);
    expect(screen.getByText('Nome do Documento')).toBeInTheDocument();
    expect(screen.getByText('Categoria')).toBeInTheDocument();
    expect(screen.getByText('Data de Validade')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('should render all category options', () => {
    render(<NewDocumentModal {...defaultProps} />);
    const categorySelect = screen.getByLabelText('Categoria do Documento');
    expect(categorySelect).toBeInTheDocument();
    expect(screen.getByText('Societário')).toBeInTheDocument();
    expect(screen.getByText('Fiscal')).toBeInTheDocument();
    expect(screen.getByText('Trabalhista')).toBeInTheDocument();
    expect(screen.getByText('Operacional')).toBeInTheDocument();
    expect(screen.getByText('Seguros')).toBeInTheDocument();
    expect(screen.getByText('Outros')).toBeInTheDocument();
  });

  it('should NOT call onCreateDocument without name', async () => {
    const user = userEvent.setup();
    const onCreateDocument = vi.fn();
    render(<NewDocumentModal {...defaultProps} onCreateDocument={onCreateDocument} />);

    // Select category but no name
    const categorySelect = screen.getByLabelText('Categoria do Documento');
    await user.selectOptions(categorySelect, 'Fiscal');
    await user.click(screen.getByText('Salvar Documento'));

    expect(onCreateDocument).not.toHaveBeenCalled();
  });

  it('should NOT call onCreateDocument without category', async () => {
    const user = userEvent.setup();
    const onCreateDocument = vi.fn();
    render(<NewDocumentModal {...defaultProps} onCreateDocument={onCreateDocument} />);

    // Type name but no category
    const nameInput = screen.getByRole('textbox');
    await user.type(nameInput, 'Contrato');
    await user.click(screen.getByText('Salvar Documento'));

    expect(onCreateDocument).not.toHaveBeenCalled();
  });

  it('should call onClose when Cancelar is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<NewDocumentModal {...defaultProps} onClose={onClose} />);

    await user.click(screen.getByText('Cancelar'));

    expect(onClose).toHaveBeenCalled();
  });

  it('should not render when isOpen is false', () => {
    render(<NewDocumentModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Novo Documento')).not.toBeInTheDocument();
  });
});
