import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VirtualDesktop } from '../VirtualDesktop';

describe('VirtualDesktop', () => {
  it('renders without crashing', () => {
    render(<VirtualDesktop />);
    expect(screen.getByText('Finder')).toBeInTheDocument();
  });

  it('displays desktop apps', () => {
    render(<VirtualDesktop />);
    expect(screen.getByText('iPod')).toBeInTheDocument();
    expect(screen.getByText('Photos')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('shows menu bar with time', () => {
    render(<VirtualDesktop />);
    // Time format includes AM/PM
    expect(screen.getByText(/\d{1,2}:\d{2}\s?(AM|PM)/i)).toBeInTheDocument();
  });
});