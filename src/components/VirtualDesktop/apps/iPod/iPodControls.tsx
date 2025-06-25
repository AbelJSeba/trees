import { TouchZone } from './types';

interface iPodControlsProps {
  onCenterPress: () => void;
  onMenuPress: () => void;
  onPreviousPress: () => void;
  onNextPress: () => void;
  onScroll: (direction: 'up' | 'down') => void;
}

// Touch zones based on iPod SVG coordinates
const touchZones = {
  center: { x: 149, y: 402, radius: 40 } as TouchZone,
  menu: { x: 170, y: 350, width: 38, height: 20 } as TouchZone,
  previous: { x: 60, y: 417, radius: 25 } as TouchZone,
  next: { x: 268, y: 417, radius: 25 } as TouchZone,
  scrollWheel: { x: 189, y: 442, innerRadius: 45, outerRadius: 110 },
};

export function iPodControls({ 
  onCenterPress, 
  onMenuPress, 
  onPreviousPress, 
  onNextPress, 
  onScroll 
}: iPodControlsProps) {
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
    
    // Check if in wheel ring area
    if (distance >= 45 && distance <= 110) {
      // Calculate angle to determine scroll direction
      const angle = Math.atan2(mousePos.y - center.y, mousePos.x - center.x);
      const degrees = (angle * 180 / Math.PI + 360) % 360;
      
      // Simple scroll detection based on top/bottom half
      if (degrees > 45 && degrees < 135) {
        onScroll('down'); // Bottom half
      } else if (degrees > 225 && degrees < 315) {
        onScroll('up'); // Top half
      }
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Center Button - Select/Play-Pause */}
      <button
        className="absolute pointer-events-auto rounded-full"
        style={{
          left: touchZones.center.x,
          top: touchZones.center.y,
          width: touchZones.center.radius! * 2,
          height: touchZones.center.radius! * 2,
          backgroundColor: 'transparent',
        }}
        onClick={onCenterPress}
        aria-label="Center button"
      />

      {/* Menu Button */}
      <button
        className="absolute pointer-events-auto rounded"
        style={{
          left: touchZones.menu.x,
          top: touchZones.menu.y,
          width: touchZones.menu.width,
          height: touchZones.menu.height,
          backgroundColor: 'transparent',
        }}
        onClick={onMenuPress}
        aria-label="Menu"
      />

      {/* Previous Button */}
      <button
        className="absolute pointer-events-auto rounded-full"
        style={{
          left: touchZones.previous.x,
          top: touchZones.previous.y,
          width: touchZones.previous.radius! * 2,
          height: touchZones.previous.radius! * 2,
          backgroundColor: 'transparent',
        }}
        onClick={onPreviousPress}
        aria-label="Previous track"
      />

      {/* Next Button */}
      <button
        className="absolute pointer-events-auto rounded-full"
        style={{
          left: touchZones.next.x,
          top: touchZones.next.y,
          width: touchZones.next.radius! * 2,
          height: touchZones.next.radius! * 2,
          backgroundColor: 'transparent',
        }}
        onClick={onNextPress}
        aria-label="Next track"
      />

      {/* Scroll Wheel Area */}
      <div
        className="absolute pointer-events-auto"
        style={{
          left: 75, // Approximate wheel area
          top: 328,
          width: 228,
          height: 228,
          borderRadius: '50%',
          backgroundColor: 'transparent',
        }}
        onClick={handleWheelInteraction}
        aria-label="Scroll wheel"
      />
    </div>
  );
}