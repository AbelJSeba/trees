import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Desktop } from '../components/Desktop';

describe('Desktop', () => {
  const mockProps = {
    wallpaper: 'linear-gradient(to bottom, #1e3c72, #2a5298)',
    onAppLaunch: vi.fn(),
    onDesktopClick: vi.fn(),
    selectedApp: null,
    onAppSelect: vi.fn(),
  };

  it('renders desktop with wallpaper', () => {
    const { container } = render(<Desktop {...mockProps} />);
    const desktop = container.querySelector('[style*="background"]');
    expect(desktop).toHaveStyle({ background: mockProps.wallpaper });
  });

  it('renders all desktop apps', () => {
    render(<Desktop {...mockProps} />);
    expect(screen.getByText('iPod')).toBeInTheDocument();
    expect(screen.getByText('Photos')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('handles app selection', () => {
    render(<Desktop {...mockProps} />);
    const ipodIcon = screen.getByText('iPod');
    fireEvent.click(ipodIcon);
    expect(mockProps.onAppSelect).toHaveBeenCalledWith('1');
  });

  it('launches app on double click', async () => {
    const user = userEvent.setup();
    render(<Desktop {...mockProps} />);
    const ipodIcon = screen.getByText('iPod');
    await user.dblClick(ipodIcon);
    expect(mockProps.onAppLaunch).toHaveBeenCalledWith('iPod');
  });

  it('shows context menu on right click', () => {
    const { container } = render(<Desktop {...mockProps} />);
    const desktop = container.querySelector('[style*="background"]');
    fireEvent.contextMenu(desktop!);
    expect(screen.getByText('Change Desktop Background...')).toBeInTheDocument();
  });
});