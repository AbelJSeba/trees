import { TouchZone, MusicPlayerState } from './types';

interface iPodControlsProps {
  state: MusicPlayerState;
  onCenterPress: () => void;
  onMenuPress: () => void;
  onPreviousPress: () => void;
  onNextPress: () => void;
  onScroll: (direction: 'up' | 'down') => void;
  onTogglePlayPause: () => void;
}

// Touch zones based on iPod SVG coordinates
const touchZones = {
  center: { x: 149, y: 402, radius: 40 } as TouchZone,
  menu: { x: 170, y: 343, width: 48, height: 25 } as TouchZone,
  previous: { x: 60, y: 417, radius: 25 } as TouchZone,
  next: { x: 268, y: 417, radius: 25 } as TouchZone,
  playPause: { x: 170, y: 521, width: 48, height: 25 } as TouchZone,
  scrollWheel: { x: 189, y: 442, innerRadius: 45, outerRadius: 110 },
};

export function IPodControls({ 
  state,
  onCenterPress, 
  onMenuPress, 
  onPreviousPress, 
  onNextPress, 
  onScroll,
  onTogglePlayPause
}: iPodControlsProps) {
  
  const isInButtonExclusionZone = (degrees: number) => {
    const buttonExclusionZones = [
      { center: 270, range: 30 }, // Menu (top)
      { center: 180, range: 30 }, // Previous (left)  
      { center: 0, range: 30 },   // Next (right)
      { center: 90, range: 30 }   // Play/Pause (bottom)
    ];
    
    return buttonExclusionZones.some(zone => {
      let diff = Math.abs(degrees - zone.center);
      // Handle wrap-around for 0/360 degrees
      if (diff > 180) diff = 360 - diff;
      return diff <= zone.range;
    });
  };

  const handleWheelInteraction = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const center = { x: 189, y: 442 };
    const mousePos = { 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    };
    
    const distance = Math.sqrt(
      Math.pow(mousePos.x - center.x, 2) + 
      Math.pow(mousePos.y - center.y, 2)
    );
    
    if (distance <= 41) {
      // Inner circle - Center button action
      onCenterPress();
    } else if (distance > 41 && distance <= 114) {
      // Outer ring - Scroll wheel action (but exclude button zones)
      const angle = Math.atan2(mousePos.y - center.y, mousePos.x - center.x);
      const degrees = (angle * 180 / Math.PI + 360) % 360;
      
      if (isInButtonExclusionZone(degrees)) {
        return; // Let the button handle this click
      }
      
      // Process scroll wheel interaction
      if (degrees > 45 && degrees < 135) {
        onScroll('down');
      } else if (degrees > 225 && degrees < 315) {
        onScroll('up');
      }
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* All buttons and interactive elements - invisible but functional */}
      {/* Center Button - Select/Play-Pause */}
      <button
        className="absolute pointer-events-auto"
        style={{
          left: touchZones.center.x,
          top: touchZones.center.y,
          width: touchZones.center.radius! * 2,
          height: touchZones.center.radius! * 2,
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          borderRadius: '50%',
          zIndex: 15,
        }}
        onClick={() => {
          onCenterPress();
        }}
        aria-label="Center button"
      />

      {/* Menu Button */}
      <button
        className="absolute pointer-events-auto"
        style={{
          left: touchZones.menu.x,
          top: touchZones.menu.y,
          width: touchZones.menu.width,
          height: touchZones.menu.height,
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          zIndex: 15,
        }}
        onClick={() => {
          onMenuPress();
        }}
        aria-label="Menu"
      />

      {/* Previous Button */}
      <button
        className="absolute pointer-events-auto"
        style={{
          left: touchZones.previous.x,
          top: touchZones.previous.y,
          width: touchZones.previous.radius! * 2,
          height: touchZones.previous.radius! * 2,
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          borderRadius: '50%',
          zIndex: 15,
        }}
        onClick={() => {
          onPreviousPress();
        }}
        aria-label="Previous track"
      />

      {/* Next Button */}
      <button
        className="absolute pointer-events-auto"
        style={{
          left: touchZones.next.x,
          top: touchZones.next.y,
          width: touchZones.next.radius! * 2,
          height: touchZones.next.radius! * 2,
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          borderRadius: '50%',
          zIndex: 15,
        }}
        onClick={() => {
          onNextPress();
        }}
        aria-label="Next track"
      />

      {/* Play/Pause Button - Context-aware behavior */}
      <button
        className="absolute pointer-events-auto"
        style={{
          left: touchZones.playPause.x,
          top: touchZones.playPause.y,
          width: touchZones.playPause.width,
          height: touchZones.playPause.height,
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          zIndex: 15,
        }}
        onClick={() => {
          // If music is playing, pause it
          if (state.isPlaying) {
            onTogglePlayPause();
          } 
          // If no music playing and in menu/list view, act as down arrow
          else if (state.currentView === 'mainmenu' || state.currentView === 'musiclist') {
            onScroll('down');
          }
          // If in now playing view but paused, resume music
          else {
            onTogglePlayPause();
          }
        }}
        aria-label={state.isPlaying ? "Pause" : (state.currentView === 'nowplaying' ? "Play" : "Down arrow")}
      />
    </div>
  );
}
