import { MusicPlayerState } from './types';

interface iPodScreenProps {
  state: MusicPlayerState;
}

export function iPodScreen({ state }: iPodScreenProps) {
  const currentTrack = state.tracks[state.currentTrackIndex];
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (state.currentView === 'list') {
    return (
      <div className="w-full h-full bg-white text-black font-mono text-sm">
        {/* Header */}
        <div className="flex justify-between items-center p-2 border-b border-gray-300 bg-gray-100">
          <span className="font-bold">♫ Music</span>
          <span className="text-xs">{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
        </div>
        
        {/* Song List */}
        <div className="p-2 space-y-1">
          {state.tracks.slice(0, 6).map((track, index) => (
            <div
              key={track.id}
              className={`p-1 rounded ${
                index === state.selectedIndex ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
              }`}
            >
              <div className="font-medium truncate">{track.title}</div>
              <div className="text-xs opacity-75 truncate">{track.artist}</div>
            </div>
          ))}
          
          {state.tracks.length > 6 && (
            <div className="text-center text-xs text-gray-500 pt-2">
              {state.tracks.length - 6} more songs...
            </div>
          )}
        </div>
      </div>
    );
  }

  // Now Playing View
  return (
    <div className="w-full h-full bg-black text-white font-mono text-sm">
      {/* Header */}
      <div className="flex justify-between items-center p-2 border-b border-gray-600">
        <span className="font-bold">Now Playing</span>
        <span className="text-xs">{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
      </div>
      
      {/* Content */}
      <div className="p-4 flex flex-col items-center justify-center h-full">
        {/* Album Art Placeholder */}
        <div className="w-20 h-20 bg-gray-700 rounded mb-4 flex items-center justify-center">
          <span className="text-2xl">♪</span>
        </div>
        
        {/* Song Info */}
        <div className="text-center mb-4">
          <div className="font-medium truncate mb-1">{currentTrack.title}</div>
          <div className="text-xs opacity-75 truncate">{currentTrack.artist}</div>
          {currentTrack.album && (
            <div className="text-xs opacity-50 truncate">{currentTrack.album}</div>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full max-w-[200px] mb-2">
          <div className="flex justify-between text-xs mb-1">
            <span>0:00</span>
            <span>{formatTime(currentTrack.duration)}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div 
              className="bg-white h-1 rounded-full transition-all duration-1000"
              style={{ width: state.isPlaying ? '30%' : '0%' }}
            />
          </div>
        </div>
        
        {/* Play Status */}
        <div className="text-center text-xs">
          {state.isPlaying ? '▶ Playing' : '⏸ Paused'}
        </div>
      </div>
    </div>
  );
}