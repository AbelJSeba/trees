import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MenuBar } from '../components/MenuBar';

describe('MenuBar', () => {
  const mockProps = {
    activeApp: null,
    onWallpaperChange: vi.fn(),
  };

  it('renders menu bar with default app name', () => {
    render(<MenuBar {...mockProps} />);
    expect(screen.getByText('Finder')).toBeInTheDocument();
  });

  it('displays active app name', () => {
    render(<MenuBar {...mockProps} activeApp="Files" />);
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('shows current time', () => {
    render(<MenuBar {...mockProps} />);
    // Check for time format
    expect(screen.getByText(/\d{1,2}:\d{2}\s?(AM|PM)/i)).toBeInTheDocument();
  });

  it('shows apple menu on click', () => {
    render(<MenuBar {...mockProps} />);
    const appleButton = screen.getByAltText('Apple');
    fireEvent.click(appleButton);
    expect(screen.getByText('About This Mac')).toBeInTheDocument();
    expect(screen.getByText('Change Wallpaper')).toBeInTheDocument();
  });

  it('calls wallpaper change handler', () => {
    render(<MenuBar {...mockProps} />);
    const appleButton = screen.getByAltText('Apple');
    fireEvent.click(appleButton);
    const changeWallpaperButton = screen.getByText('Change Wallpaper');
    fireEvent.click(changeWallpaperButton);
    expect(mockProps.onWallpaperChange).toHaveBeenCalled();
  });

  it('renders system menu items', () => {
    render(<MenuBar {...mockProps} />);
    expect(screen.getByText('File')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();
    expect(screen.getByText('Window')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
  });

  it('toggles volume mute state', () => {
    render(<MenuBar {...mockProps} />);
    const volumeButton = screen.getByTitle('Mute');
    expect(screen.getByText('🔊')).toBeInTheDocument();
    
    fireEvent.click(volumeButton);
    expect(screen.getByText('🔇')).toBeInTheDocument();
    expect(screen.getByTitle('Unmute')).toBeInTheDocument();
    
    fireEvent.click(volumeButton);
    expect(screen.getByText('🔊')).toBeInTheDocument();
    expect(screen.getByTitle('Mute')).toBeInTheDocument();
  });
});