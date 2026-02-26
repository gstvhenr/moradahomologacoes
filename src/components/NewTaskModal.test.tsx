import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { NewTaskModal } from './NewTaskModal';

describe('NewTaskModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onCreateTask: vi.fn(),
  };

  it('should render the modal with title', () => {
    render(<NewTaskModal {...defaultProps} />);
    expect(screen.getByText('Nova Homologação')).toBeInTheDocument();
  });

  it('should render input and buttons', () => {
    render(<NewTaskModal {...defaultProps} />);
    expect(screen.getByPlaceholderText('Ex: Indústria XYZ')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Criar Homologação')).toBeInTheDocument();
  });

  it('should call onCreateTask with client name when form is submitted', async () => {
    const user = userEvent.setup();
    render(<NewTaskModal {...defaultProps} />);

    const input = screen.getByPlaceholderText('Ex: Indústria XYZ');
    await user.type(input, 'Empresa Test');
    await user.click(screen.getByText('Criar Homologação'));

    expect(defaultProps.onCreateTask).toHaveBeenCalledWith('Empresa Test');
  });

  it('should NOT call onCreateTask with empty input', async () => {
    const user = userEvent.setup();
    const onCreateTask = vi.fn();
    render(<NewTaskModal {...defaultProps} onCreateTask={onCreateTask} />);

    await user.click(screen.getByText('Criar Homologação'));

    expect(onCreateTask).not.toHaveBeenCalled();
  });

  it('should call onClose when Cancelar is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<NewTaskModal {...defaultProps} onClose={onClose} />);

    await user.click(screen.getByText('Cancelar'));

    expect(onClose).toHaveBeenCalled();
  });

  it('should not render when isOpen is false', () => {
    render(<NewTaskModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Nova Homologação')).not.toBeInTheDocument();
  });
});
