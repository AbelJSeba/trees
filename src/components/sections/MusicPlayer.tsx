import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Clock, Disc, Headphones } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Slider } from '../ui/slider';

interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: string;
  genre: string;
  mood: 'calm' | 'energetic' | 'contemplative' | 'uplifting';
  url: string;
  coverUrl: string;
  waveformUrl?: string;
  plays?: number;
  releaseDate: string;
}

const sampleTracks: Track[] = [
  {
    id: '1',
    title: 'Forest Dawn',
    artist: 'Abel Sebastian',
    album: 'Nature\'s Symphony',
    duration: '4:32',
    genre: 'Ambient',
    mood: 'calm',
    url: '#',
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
    plays: 1234,
    releaseDate: 'January 2024'
  },
  {
    id: '2',
    title: 'Urban Pulse',
    artist: 'Abel Sebastian',
    album: 'City Lights',
    duration: '3:45',
    genre: 'Electronic',
    mood: 'energetic',
    url: '#',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    plays: 892,
    releaseDate: 'December 2023'
  },
  {
    id: '3',
    title: 'Contemplation',
    artist: 'Abel Sebastian',
    duration: '5:12',
    genre: 'Classical',
    mood: 'contemplative',
    url: '#',
    coverUrl: 'https://images.unsplash.com/photo-1458560871784-56d23406c091?w=300&h=300&fit=crop',
    plays: 567,
    releaseDate: 'November 2023'
  },
  {
    id: '4',
    title: 'Rising Sun',
    artist: 'Abel Sebastian',
    album: 'New Horizons',
    duration: '3:28',
    genre: 'Indie',
    mood: 'uplifting',
    url: '#',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    plays: 2103,
    releaseDate: 'October 2023'
  }
];

const moodColors = {
  calm: { bg: 'bg-blue-100', text: 'text-blue-700', icon: '🌊' },
  energetic: { bg: 'bg-orange-100', text: 'text-orange-700', icon: '⚡' },
  contemplative: { bg: 'bg-purple-100', text: 'text-purple-700', icon: '🤔' },
  uplifting: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: '☀️' }
};

export function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const genres = ['all', ...new Set(sampleTracks.map(track => track.genre))];
  const filteredTracks = selectedGenre === 'all' 
    ? sampleTracks 
    : sampleTracks.filter(track => track.genre === selectedGenre);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (!currentTrack) return;
    const currentIndex = filteredTracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % filteredTracks.length;
    playTrack(filteredTracks[nextIndex]);
  };

  const playPrevious = () => {
    if (!currentTrack) return;
    const currentIndex = filteredTracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? filteredTracks.length - 1 : currentIndex - 1;
    playTrack(filteredTracks[prevIndex]);
  };


  return (
    <div className="space-y-8">
      {/* Genre Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${selectedGenre === genre 
                ? 'bg-[#2a9d8f] text-white shadow-md scale-105' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }
            `}
          >
            {genre === 'all' ? 'All Genres' : genre}
          </button>
        ))}
      </div>

      {/* Track List */}
      <div className="grid gap-4">
        {filteredTracks.map((track, index) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Card 
              className={`
                group overflow-hidden transition-all duration-300 cursor-pointer
                hover:shadow-lg hover:scale-[1.02]
                ${currentTrack?.id === track.id ? 'ring-2 ring-[#2a9d8f] bg-[#2a9d8f]/5' : ''}
              `}
              onClick={() => playTrack(track)}
            >
              <div className="flex items-center gap-4 p-4">
                {/* Album Cover */}
                <div className="relative flex-shrink-0">
                  <img
                    src={track.coverUrl}
                    alt={track.album || track.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  {currentTrack?.id === track.id && isPlaying && (
                    <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 bg-white rounded-full"
                            animate={{
                              height: ['12px', '20px', '12px'],
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Track Info */}
                <div className="flex-grow">
                  <h3 className="font-medium text-lg group-hover:text-[#2a9d8f] transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{track.artist}</p>
                  {track.album && (
                    <p className="text-muted-foreground text-xs mt-1 flex items-center gap-1">
                      <Disc className="w-3 h-3" />
                      {track.album}
                    </p>
                  )}
                </div>

                {/* Track Meta */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge variant="outline" className={`${moodColors[track.mood].bg} ${moodColors[track.mood].text} border-0`}>
                      <span className="mr-1">{moodColors[track.mood].icon}</span>
                      {track.mood}
                    </Badge>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      {track.plays && (
                        <span className="flex items-center gap-1">
                          <Headphones className="w-3 h-3" />
                          {track.plays.toLocaleString()}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {track.duration}
                      </span>
                    </div>
                  </div>
                  
                  {/* Play Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (currentTrack?.id === track.id) {
                        togglePlayPause();
                      } else {
                        playTrack(track);
                      }
                    }}
                    className="p-3 bg-[#2a9d8f] text-white rounded-full hover:bg-[#2a9d8f]/90 transition-colors"
                  >
                    {currentTrack?.id === track.id && isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Fixed Player Bar */}
      <AnimatePresence>
        {currentTrack && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 backdrop-blur-lg shadow-lg z-40"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center gap-4">
                {/* Track Info */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <img
                    src={currentTrack.coverUrl}
                    alt={currentTrack.title}
                    className="w-12 h-12 rounded"
                  />
                  <div>
                    <h4 className="font-medium text-sm">{currentTrack.title}</h4>
                    <p className="text-xs text-muted-foreground">{currentTrack.artist}</p>
                  </div>
                </div>

                {/* Player Controls */}
                <div className="flex-grow flex items-center justify-center gap-2">
                  <button
                    onClick={playPrevious}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>
                  <button
                    onClick={togglePlayPause}
                    className="p-3 bg-[#2a9d8f] text-white rounded-full hover:bg-[#2a9d8f]/90 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" />
                    )}
                  </button>
                  <button
                    onClick={playNext}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="flex-grow max-w-md flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">0:00</span>
                  <Slider 
                    value={[0]} 
                    max={100} 
                    className="flex-grow"
                  />
                  <span className="text-xs text-muted-foreground">{currentTrack.duration}</span>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                  <Slider 
                    value={[volume]} 
                    max={100} 
                    className="w-20"
                    onValueChange={(value) => setVolume(value[0])}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed player */}
      {currentTrack && <div className="h-20" />}
    </div>
  );
}