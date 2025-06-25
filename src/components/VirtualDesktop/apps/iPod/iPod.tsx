import { useMusicPlayer } from './useMusicPlayer';
import { iPodControls } from './iPodControls';
import { iPodScreen } from './iPodScreen';

export function iPod() {
  const { state, actions } = useMusicPlayer();

  return (
    <div className="relative w-[377px] h-[626px]">
      {/* iPod SVG Background */}
      <img 
        src="/icons/Ipod.svg" 
        alt="iPod" 
        className="absolute inset-0 w-full h-full select-none"
        draggable={false}
      />
      
      {/* Screen Overlay - positioned relative to iPod */}
      <div 
        className="absolute rounded-[5px] overflow-hidden"
        style={{
          top: '27px',
          left: '33px', 
          width: '312px',
          height: '236px',
        }}
      >
        <iPodScreen state={state} />
      </div>
      
      {/* Interactive Controls Overlay */}
      <iPodControls
        onCenterPress={actions.centerAction}
        onMenuPress={actions.goToMenu}
        onPreviousPress={actions.previousTrack}
        onNextPress={actions.nextTrack}
        onScroll={actions.scroll}
      />
    </div>
  );
}