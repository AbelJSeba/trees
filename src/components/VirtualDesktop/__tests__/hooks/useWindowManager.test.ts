import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWindowManager } from '../../hooks/useWindowManager';

describe('useWindowManager', () => {
  it('starts with no windows', () => {
    const { result } = renderHook(() => useWindowManager());
    expect(result.current.windows).toHaveLength(0);
  });

  it('opens a new window', () => {
    const { result } = renderHook(() => useWindowManager());
    
    act(() => {
      result.current.openWindow('iPod');
    });

    expect(result.current.windows).toHaveLength(1);
    expect(result.current.windows[0]).toMatchObject({
      appType: 'iPod',
      title: 'iPod',
      width: 320,
      height: 500,
      isActive: true,
    });
  });

  it('closes a window', () => {
    const { result } = renderHook(() => useWindowManager());
    
    act(() => {
      result.current.openWindow('iPod');
    });

    const windowId = result.current.windows[0].id;

    act(() => {
      result.current.closeWindow(windowId);
    });

    expect(result.current.windows).toHaveLength(0);
  });

  it('focuses a window', () => {
    const { result } = renderHook(() => useWindowManager());
    
    act(() => {
      result.current.openWindow('iPod');
      result.current.openWindow('Files');
    });

    const firstWindowId = result.current.windows[0].id;

    act(() => {
      result.current.focusWindow(firstWindowId);
    });

    expect(result.current.windows[0].isActive).toBe(true);
    expect(result.current.windows[1].isActive).toBe(false);
  });

  it('updates window state', () => {
    const { result } = renderHook(() => useWindowManager());
    
    act(() => {
      result.current.openWindow('iPod');
    });

    const windowId = result.current.windows[0].id;

    act(() => {
      result.current.updateWindowState(windowId, { x: 200, y: 300 });
    });

    expect(result.current.windows[0].x).toBe(200);
    expect(result.current.windows[0].y).toBe(300);
  });
});