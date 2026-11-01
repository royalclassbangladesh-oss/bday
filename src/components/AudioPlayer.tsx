import React, { useState, useEffect } from 'react';
import { Music, Volume2, VolumeX, Pause, Play, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/sound';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [volume, setVolume] = useState(0.6);

  useEffect(() => {
    setIsPlaying(romanticAudio.getIsPlaying());
  }, []);

  const togglePlay = () => {
    const newState = romanticAudio.toggleMusic();
    setIsPlaying(newState);
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      romanticAudio.setVolume(volume);
      setIsMuted(false);
    } else {
      romanticAudio.setVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    romanticAudio.setVolume(val);
    if (val > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
      <div className="flex items-center gap-2 bg-white/85 backdrop-blur-md px-3.5 py-2 rounded-full border border-pink-200 shadow-md shadow-pink-200/40 transition-all duration-300 hover:shadow-lg hover:shadow-pink-300/40">
        <button
          onClick={togglePlay}
          className="flex items-center gap-2 text-xs md:text-sm font-medium text-pink-700 hover:text-pink-900 transition-colors focus:outline-none"
          title={isPlaying ? "Pause music" : "Play romantic melody"}
          aria-label={isPlaying ? "Pause background music" : "Play romantic background music"}
        >
          <div className={`relative flex items-center justify-center w-7 h-7 rounded-full bg-pink-100 text-pink-600 ${isPlaying ? 'animate-spin [animation-duration:8s]' : ''}`}>
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
            )}
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
              </span>
            )}
          </div>
          <span className="font-dancing text-base md:text-lg font-bold">
            {isPlaying ? "Music Playing 🎶" : "Play Romantic Music 🎵"}
          </span>
        </button>

        <button
          onClick={() => setShowControls(!showControls)}
          className="p-1 text-pink-400 hover:text-pink-600 transition-colors rounded-full"
          aria-label="Sound settings"
          title="Sound settings"
        >
          <Sparkles className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Expanded Sound Settings Popover */}
      {showControls && (
        <div className="mt-2 p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-pink-200 shadow-xl shadow-pink-200/50 w-56 animate-in fade-in slide-in-from-top-2">
          <div className="text-xs font-semibold text-pink-800 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Music className="w-3.5 h-3.5 text-pink-500" />
              Romantic Piano Melody
            </span>
            <button
              onClick={handleMuteToggle}
              className="text-pink-500 hover:text-pink-700"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full h-1.5 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500"
              aria-label="Volume slider"
            />
            <span className="text-[10px] text-pink-500 font-mono w-6">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>
          <p className="text-[11px] text-pink-400 mt-2 font-dancing text-center">
            A gentle melody crafted for you 💕
          </p>
        </div>
      )}
    </div>
  );
};
