import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat } from 'lucide-react';
import { PlaybackRate, Sentence } from '../types';

interface AudioPlayerProps {
  src: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  playbackRate: PlaybackRate;
  onPlaybackRateChange: (rate: PlaybackRate) => void;
  currentTime: number;
  onTimeUpdate: (time: number) => void;
  // New props for range restriction
  startTime?: number;
  endTime?: number;
  sentences?: Sentence[];
  loop?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  isPlaying,
  onPlayPause,
  playbackRate,
  onPlaybackRateChange,
  currentTime,
  onTimeUpdate,
  startTime = 0,
  endTime,
  sentences = [],
  loop = false
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);

  // Effect to handle external time changes (like clicking a word or daily page auto-jump)
  useEffect(() => {
    if (audioRef.current && Math.abs(audioRef.current.currentTime - currentTime) > 0.5) {
       audioRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  // Effect to enforce start time on load or when start time changes (e.g. dictation sentence change)
  useEffect(() => {
      if (audioRef.current) {
          // If the current time is completely outside the new window, jump to start
          if (startTime > 0 && (currentTime < startTime - 0.5 || (endTime && currentTime > endTime + 0.5))) {
              audioRef.current.currentTime = startTime;
              onTimeUpdate(startTime);
          }
      }
  }, [startTime, endTime, src]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        // Ensure we are within bounds before playing
        if (endTime && audioRef.current.currentTime >= endTime) {
            audioRef.current.currentTime = startTime;
            onTimeUpdate(startTime);
        }
        
        audioRef.current.play().catch(e => {
            console.error("Play error:", e);
            setError(`Could not play audio. Tried loading: "${src}". Please check the file exists.`);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, src, startTime, endTime]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const curr = audioRef.current.currentTime;
      
      // Boundary enforcement
      if (endTime && curr >= endTime) {
          if (loop) {
              // Loop back to start
              audioRef.current.currentTime = startTime;
              onTimeUpdate(startTime);
              // Keep playing (isPlaying is true)
          } else {
              // Stop
              audioRef.current.pause();
              onPlayPause(); // Toggle state to paused
              onTimeUpdate(endTime);
          }
          return;
      }
      
      onTimeUpdate(curr);
    }
  };

  const handleError = () => {
      setError(`Audio missing. Looking for: "${src}"`);
  };

  const handleLoadedMetadata = () => {
      if (audioRef.current) {
          setDuration(audioRef.current.duration);
          setError(null);
          // Initial seek if at 0
          if (currentTime === 0 && startTime > 0) {
              audioRef.current.currentTime = startTime;
              onTimeUpdate(startTime);
          }
      }
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const relativeTime = Number(e.target.value);
    const absoluteTime = startTime + relativeTime;
    
    onTimeUpdate(absoluteTime);
    if (audioRef.current) {
      audioRef.current.currentTime = absoluteTime;
    }
  };

  const seekTo = (time: number) => {
      const clamped = Math.max(startTime, Math.min(endTime || duration, time));
      onTimeUpdate(clamped);
      if(audioRef.current) audioRef.current.currentTime = clamped;
  };

  // --- Sentence Navigation Logic ---

  const handlePrevSentence = () => {
    if (sentences.length === 0) {
        seekTo(currentTime - 5);
        return;
    }

    // Find active sentence index
    const currentIdx = sentences.findIndex(s => currentTime >= s.start && currentTime <= s.end);
    
    // If we are currently in a sentence
    if (currentIdx !== -1) {
        const currentSentence = sentences[currentIdx];
        // If we are more than 1.5s into the sentence, just restart the current sentence
        if (currentTime > currentSentence.start + 1.5) {
            seekTo(currentSentence.start);
        } else if (currentIdx > 0) {
            // Otherwise go to previous sentence
            seekTo(sentences[currentIdx - 1].start);
        } else {
            seekTo(startTime);
        }
    } else {
        // We are in a gap, find the last sentence that ended before now
        let prevIdx = -1;
        // Using manual loop for compatibility
        for (let i = sentences.length - 1; i >= 0; i--) {
            if (sentences[i].end < currentTime) {
                prevIdx = i;
                break;
            }
        }

        if (prevIdx !== -1) {
            seekTo(sentences[prevIdx].start);
        } else {
            seekTo(startTime);
        }
    }
  };

  const handleNextSentence = () => {
      if (sentences.length === 0) {
          seekTo(currentTime + 5);
          return;
      }

      // Find active sentence index
      const currentIdx = sentences.findIndex(s => currentTime >= s.start && currentTime <= s.end);

      if (currentIdx !== -1 && currentIdx < sentences.length - 1) {
          // Jump to next start
          seekTo(sentences[currentIdx + 1].start);
      } else {
          // If in a gap or at end, find the next upcoming start
          const nextSentence = sentences.find(s => s.start > currentTime);
          if (nextSentence) {
              seekTo(nextSentence.start);
          } else {
              seekTo(endTime || duration);
          }
      }
  };


  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleSpeed = () => {
    const rates: PlaybackRate[] = [0.8, 1.0, 1.2];
    const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
    onPlaybackRateChange(rates[nextIdx]);
  };

  // Calculations for UI (Relative times)
  const effectiveEndTime = endTime || duration;
  const segmentDuration = Math.max(0, effectiveEndTime - startTime);
  const relativeCurrentTime = Math.max(0, Math.min(currentTime - startTime, segmentDuration));

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] p-4 pb-6 sm:pb-4 z-50">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onError={handleError}
        onLoadedMetadata={handleLoadedMetadata}
      />
      
      {error && (
          <div className="absolute top-0 left-0 right-0 -mt-10 bg-red-100 text-red-700 text-center py-2 text-xs sm:text-sm font-medium border-t border-red-200">
              {error}
          </div>
      )}

      <div className="max-w-3xl mx-auto flex flex-col gap-2">
        {/* Progress Bar */}
        <div className="flex items-center gap-3 text-xs text-slate-500 font-mono select-none">
          <span className="w-10 text-right">{formatTime(relativeCurrentTime)}</span>
          <input
            ref={progressBarRef}
            type="range"
            min={0}
            max={segmentDuration > 0 ? segmentDuration : 100}
            step={0.1}
            value={relativeCurrentTime}
            onChange={handleScrub}
            className="flex-1 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          <span className="w-10">{formatTime(segmentDuration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-1">
            {/* Loop Indicator */}
            <div className="w-16 hidden sm:flex items-center justify-start text-indigo-500">
                {loop && <Repeat size={18} />}
            </div> 
            
            <div className="flex items-center gap-4 sm:gap-8 mx-auto sm:mx-0">
                <button 
                    onClick={handlePrevSentence}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all active:scale-95 disabled:opacity-30"
                    title="Previous Sentence"
                    disabled={loop} // Disable manual nav in loop dictation mode to enforce focus
                >
                    <SkipBack size={26} strokeWidth={2} />
                </button>

                <button 
                    onClick={onPlayPause}
                    className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-200 hover:shadow-xl hover:scale-105 transition-all active:scale-95"
                >
                    {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                </button>

                <button 
                     onClick={handleNextSentence}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all active:scale-95 disabled:opacity-30"
                    title="Next Sentence"
                    disabled={loop} // Disable manual nav in loop dictation mode
                >
                    <SkipForward size={26} strokeWidth={2} />
                </button>
            </div>

            <div className="w-16 flex justify-end">
                <button 
                    onClick={toggleSpeed}
                    className="flex items-center justify-center w-12 h-8 text-slate-600 hover:text-indigo-600 font-bold text-sm bg-slate-100 hover:bg-indigo-50 rounded transition-colors border border-slate-200 hover:border-indigo-200"
                    title="Playback Speed"
                >
                    {playbackRate}x
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;