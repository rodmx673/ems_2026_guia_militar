import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  RotateCcw,
  FastForward,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Radio,
  Zap,
  Sparkles
} from 'lucide-react';

export interface TTSPlayItem {
  id: string;
  label: string;
  text: string;
  sublabel?: string;
}

interface ClassStepTTSPlayerProps {
  stepBadge: string;
  portionNumber: string;
  items: TTSPlayItem[];
  activeItemIndex?: number;
  onItemChange?: (index: number) => void;
  autoStart?: boolean;
  defaultSpeed?: number;
  className?: string;
}

export const ClassStepTTSPlayer: React.FC<ClassStepTTSPlayerProps> = ({
  stepBadge,
  portionNumber,
  items,
  activeItemIndex = 0,
  onItemChange,
  autoStart = false,
  defaultSpeed = 1,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(activeItemIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(defaultSpeed);
  const [isSupported, setIsSupported] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [autoStartEnabled, setAutoStartEnabled] = useState(autoStart);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const userStoppedRef = useRef(false);
  const playbackRateRef = useRef(playbackRate);
  playbackRateRef.current = playbackRate;

  const autoAdvanceRef = useRef(autoAdvance);
  autoAdvanceRef.current = autoAdvance;

  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;

  const itemsRef = useRef(items);
  itemsRef.current = items;

  // Sync with external activeItemIndex if provided
  useEffect(() => {
    if (activeItemIndex !== undefined && activeItemIndex !== currentIndex) {
      setCurrentIndex(activeItemIndex);
    }
  }, [activeItemIndex]);

  // Check speech synthesis support on mount & cancel on unmount or tab blur
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }

    const handleVisibilityChange = () => {
      if (document.hidden && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setIsPaused(false);
      }
    };

    const handlePageHide = () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('beforeunload', handlePageHide);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('beforeunload', handlePageHide);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const currentItem = items[currentIndex] || items[0];

  const speakItem = (indexToSpeak: number) => {
    if (!('speechSynthesis' in window)) return;
    if (document.hidden) return;
    const target = itemsRef.current[indexToSpeak];
    if (!target) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(target.text);
    utterance.lang = 'es-MX';
    utterance.rate = playbackRateRef.current;
    utterance.pitch = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const mxVoice = voices.find(
      v => v.lang.includes('es-MX') || v.lang.includes('es-ES') || v.lang.includes('es')
    );
    if (mxVoice) {
      utterance.voice = mxVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onpause = () => {
      setIsPlaying(false);
      setIsPaused(true);
    };

    utterance.onresume = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);

      // Auto-advance if enabled and not stopped by user
      if (autoAdvanceRef.current && !userStoppedRef.current && !document.hidden) {
        if (indexToSpeak < itemsRef.current.length - 1) {
          const nextIdx = indexToSpeak + 1;
          setCurrentIndex(nextIdx);
          if (onItemChange) {
            onItemChange(nextIdx);
          }
          setTimeout(() => {
            if (!document.hidden && !userStoppedRef.current) {
              speakItem(nextIdx);
            }
          }, 450);
        }
      }
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  // Auto-start on mount or item change ONLY if autoStartEnabled is active and window is visible
  useEffect(() => {
    if (!autoStartEnabled || document.hidden) return;

    const timer = setTimeout(() => {
      if (!userStoppedRef.current && !document.hidden) {
        speakItem(currentIndex);
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlayOrResume = () => {
    if (!('speechSynthesis' in window)) return;
    userStoppedRef.current = false;

    if (isPaused && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    speakItem(currentIndex);
  };

  const handlePause = () => {
    if (!('speechSynthesis' in window)) return;
    userStoppedRef.current = true;
    window.speechSynthesis.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const handleStop = () => {
    if (!('speechSynthesis' in window)) return;
    userStoppedRef.current = true;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleNext = () => {
    userStoppedRef.current = false;
    if (currentIndex < items.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      if (onItemChange) {
        onItemChange(nextIdx);
      }
      speakItem(nextIdx);
    } else {
      // Loop to beginning
      setCurrentIndex(0);
      if (onItemChange) {
        onItemChange(0);
      }
      speakItem(0);
    }
  };

  const handlePrev = () => {
    userStoppedRef.current = false;
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      if (onItemChange) {
        onItemChange(prevIdx);
      }
      speakItem(prevIdx);
    } else {
      const lastIdx = items.length - 1;
      setCurrentIndex(lastIdx);
      if (onItemChange) {
        onItemChange(lastIdx);
      }
      speakItem(lastIdx);
    }
  };

  const cycleSpeed = () => {
    const nextRate = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1;
    setPlaybackRate(nextRate);
    if (isPlaying) {
      speakItem(currentIndex);
    }
  };

  if (!isSupported || items.length === 0) {
    return null;
  }

  return (
    <div
      className={`bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/30 border border-amber-500/30 rounded-xl p-3 sm:p-3.5 shadow-md mb-4 ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3">
        {/* Info Left */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            onClick={isPlaying ? handlePause : handlePlayOrResume}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer transition-all ${
              isPlaying
                ? 'bg-amber-500 text-stone-950 ring-2 ring-amber-400'
                : isPaused
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
            title={isPlaying ? 'Pausar narración' : 'Escuchar narración de voz'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-stone-950" />
            ) : (
              <Headphones className="w-4 h-4" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Volume2 className="w-3 h-3" /> {stepBadge}
              </span>
              <span className="text-[10px] font-mono text-stone-400">
                Punto {currentIndex + 1} de {items.length}
              </span>

              {isPlaying && (
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 px-1.5 py-0.2 rounded border border-emerald-800 flex items-center gap-1 animate-pulse">
                  <Radio className="w-2.5 h-2.5" /> Narrando
                </span>
              )}
              {isPaused && (
                <span className="text-[10px] font-mono text-amber-400 bg-amber-950/70 px-1.5 py-0.2 rounded border border-amber-800">
                  ⏸️ En Pausa
                </span>
              )}
            </div>

            <h5 className="text-xs font-semibold text-stone-100 truncate mt-0.5">
              {currentItem?.label || 'Narración de voz militar'}
            </h5>
          </div>
        </div>

        {/* Controls Right */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap justify-end">
          {/* Previous item button */}
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer flex-shrink-0"
            title="Retroceder al punto anterior (⏮️)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next / Advance button */}
          <button
            onClick={handleNext}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer flex-shrink-0"
            title="Avanzar al siguiente punto (⏭️)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Speed switcher */}
          <button
            onClick={cycleSpeed}
            className="px-2 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono font-bold flex items-center gap-1 transition cursor-pointer flex-shrink-0"
            title="Velocidad de reproducción"
          >
            <FastForward className="w-3.5 h-3.5" />
            {playbackRate}x
          </button>

          {/* Auto advance toggle */}
          <button
            onClick={() => setAutoAdvance(!autoAdvance)}
            className={`px-2 py-1.5 rounded-lg text-xs font-mono transition flex items-center gap-1 cursor-pointer flex-shrink-0 ${
              autoAdvance
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold'
                : 'bg-stone-800 text-stone-400 border border-stone-700/60'
            }`}
            title="Avanzar automáticamente al terminar cada punto"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">Auto-avance</span>
          </button>

          {/* Stop Button */}
          {(isPlaying || isPaused) && (
            <button
              onClick={handleStop}
              className="px-2.5 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-mono font-semibold transition flex items-center gap-1 cursor-pointer flex-shrink-0"
              title="Detener audio por completo (⏹️)"
            >
              <Square className="w-3 h-3 fill-red-400 text-red-400" />
              <span className="hidden sm:inline">Detener</span>
            </button>
          )}

          {/* Main Play / Pause Button */}
          {isPlaying ? (
            <button
              onClick={handlePause}
              className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs font-mono flex items-center gap-1 transition shadow-sm cursor-pointer flex-shrink-0"
            >
              <Pause className="w-3.5 h-3.5 fill-stone-950" />
              <span>Pausar</span>
            </button>
          ) : isPaused ? (
            <button
              onClick={handlePlayOrResume}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs font-mono flex items-center gap-1 transition shadow-sm cursor-pointer flex-shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-stone-950" />
              <span>Reanudar</span>
            </button>
          ) : (
            <button
              onClick={handlePlayOrResume}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-xs font-mono flex items-center gap-1 transition shadow-sm cursor-pointer flex-shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-stone-950" />
              <span>Escuchar Audio</span>
            </button>
          )}
        </div>
      </div>

      {/* Visual audio wave when playing */}
      {isPlaying && (
        <div className="mt-2 pt-2 border-t border-amber-500/20 flex items-center justify-between text-[11px] font-mono text-amber-300/80">
          <div className="flex items-center gap-1">
            <span className="inline-block w-1 h-2.5 bg-amber-400 animate-pulse" />
            <span className="inline-block w-1 h-3.5 bg-amber-400 animate-pulse delay-75" />
            <span className="inline-block w-1 h-2 bg-amber-400 animate-pulse delay-150" />
            <span className="ml-1 text-stone-300 truncate max-w-xs sm:max-w-md">
              Leyendo: {currentItem?.sublabel || currentItem?.label}
            </span>
          </div>
          <span className="text-stone-400 hidden sm:inline">Usa ⏮️ / ⏭️ para cambiar</span>
        </div>
      )}
    </div>
  );
};
