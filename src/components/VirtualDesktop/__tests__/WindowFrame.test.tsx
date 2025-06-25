import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WindowFrame } from '../components/WindowFrame';
import { WindowState } from '../types';

describe('WindowFrame', () => {
  const mockWindow: WindowState = {
    id: 'test-window',
    appType: 'iPod',
    title: 'iPod',
    x: 100,
    y: 100,
    width: 400,
    height: 500,
    isMinimized: false,
    isMaximized: false,
    isActive: true,
    zIndex: 1000,
  };

  const mockProps = {
    window: mockWindow,
    onClose: vi.fn(),
    onFocus: vi.fn(),
    onUpdateState: vi.fn(),
  };

  it('renders window with title', () => {
    render(<WindowFrame {...mockProps} />);
    // Get the title in the window titlebar specifically
    const titlebar = screen.getByText('iPod', { selector: '.window-titlebar *' });
    expect(titlebar).toBeInTheDocument();
  });

  it('renders window controls', () => {
    const { container } = render(<WindowFrame {...mockProps} />);
    const closeButton = container.querySelector('.bg-red-500');
    const minimizeButton = container.querySelector('.bg-yellow-500');
    const maximizeButton = container.querySelector('.bg-green-500');
    
    expect(closeButton).toBeInTheDocument();
    expect(minimizeButton).toBeInTheDocument();
    expect(maximizeButton).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const { container } = render(<WindowFrame {...mockProps} />);
    const closeButton = container.querySelector('.bg-red-500');
    fireEvent.click(closeButton!);
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('minimizes window when minimize button clicked', () => {
    const { container } = render(<WindowFrame {...mockProps} />);
    const minimizeButton = container.querySelector('.bg-yellow-500');
    fireEvent.click(minimizeButton!);
    expect(mockProps.onUpdateState).toHaveBeenCalledWith({ isMinimized: true });
  });

  it('renders app content', () => {
    render(<WindowFrame {...mockProps} />);
    // Check for iPod content
    expect(screen.getByText(/Virtual iPod coming soon/)).toBeInTheDocument();
  });

  it('hides window when minimized', () => {
    const minimizedWindow = { ...mockWindow, isMinimized: true };
    const { container } = render(<WindowFrame {...mockProps} window={minimizedWindow} />);
    expect(container.firstChild).toBeNull();
  });
});