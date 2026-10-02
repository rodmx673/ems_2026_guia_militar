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
  Sparkles,
  Radio,
  Zap
} from 'lucide-react';
import { AudioScript } from '../types/ems';

interface AudioPlayerTTSProps {
  script: AudioScript;
  portionTitle: string;
  portionNumber: string;
  autoStart?: boolean;
  defaultRate?: number;
}

export const AudioPlayerTTS: React.FC<AudioPlayerTTSProps> = ({
  script,
  portionTitle,
  portionNumber,
  autoStart = false,
  defaultRate = 1
}) => {
  // Build segmented items: 0 = Intro, 1..N = Development items, N+1 = Closure
  const segments = [
    { id: 'intro', label: 'Introducción Táctica', text: `Introducción: ${script.intro}` },
    ...script.development.map((item, idx) => ({
      id: `dev-${idx}`,
      label: item.split(':')[0] || `Artículo ${idx + 1}`,
      text: item
    })),
    { id: 'closure', label: 'Cierre y Regla de Examen', text: `Cierre: ${script.closure}` }
  ];

  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(defaultRate);
  const [isSupported, setIsSupported] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [autoStartEnabled] = useState(autoStart);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const userStoppedRef = useRef(false);
  const playbackRateRef = useRef(playbackRate);
  playbackRateRef.current = playbackRate;

  const autoAdvanceRef = useRef(autoAdvance);
  autoAdvanceRef.current = autoAdvance;

  const segmentsRef = useRef(segments);
  segmentsRef.current = segments;

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

  const speakSegment = (idx: number) => {
    if (!('speechSynthesis' in window) || document.hidden) return;
    const target = segmentsRef.current[idx];
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

      if (autoAdvanceRef.current && !userStoppedRef.current) {
        if (idx < segmentsRef.current.length - 1) {
          const nextIdx = idx + 1;
          setCurrentSegmentIndex(nextIdx);
          setTimeout(() => {
            speakSegment(nextIdx);
          }, 350);
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

  const handlePlayOrResume = () => {
    if (!('speechSynthesis' in window)) return;
    userStoppedRef.current = false;

    if (isPaused && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    speakSegment(currentSegmentIndex);
  };

  // Auto-start the doctrine script on mount when the user enabled it in Ajustes
  const autoStartRef = useRef(autoStartEnabled);
  useEffect(() => {
    if (!autoStartRef.current || document.hidden) return;
    if (!('speechSynthesis' in window)) return;

    const timer = setTimeout(() => {
      if (!userStoppedRef.current && !document.hidden) {
        speakSegment(0);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

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
    if (currentSegmentIndex < segments.length - 1) {
      const nextIdx = currentSegmentIndex + 1;
      setCurrentSegmentIndex(nextIdx);
      speakSegment(nextIdx);
    } else {
      setCurrentSegmentIndex(0);
      speakSegment(0);
    }
  };

  const handlePrev = () => {
    userStoppedRef.current = false;
    if (currentSegmentIndex > 0) {
      const prevIdx = currentSegmentIndex - 1;
      setCurrentSegmentIndex(prevIdx);
      speakSegment(prevIdx);
    } else {
      const lastIdx = segments.length - 1;
      setCurrentSegmentIndex(lastIdx);
      speakSegment(lastIdx);
    }
  };

  const handleRestart = () => {
    userStoppedRef.current = false;
    setCurrentSegmentIndex(0);
    speakSegment(0);
  };

  const cyclePlaybackRate = () => {
    const nextRate = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1;
    setPlaybackRate(nextRate);
    if (isPlaying) {
      speakSegment(currentSegmentIndex);
    }
  };

  const currentSegment = segments[currentSegmentIndex];

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-xl p-3.5 sm:p-5 shadow-lg w-full max-w-full overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-3 min-w-0">
          <div
            onClick={isPlaying ? handlePause : handlePlayOrResume}
            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer transition-all ${
              isPlaying
                ? 'bg-amber-500 text-stone-950 ring-2 ring-amber-400'
                : isPaused
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
            }`}
            title={isPlaying ? 'Pausar audio' : 'Reproducir audio'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-stone-950" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] sm:text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                AUDIO TTS MILITAR
              </span>
              <span className="text-[11px] text-stone-400 font-mono">
                Sección {currentSegmentIndex + 1} de {segments.length}
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
            <h4 className="text-xs sm:text-sm font-semibold text-stone-200 mt-0.5 truncate">
              Porción {portionNumber}: {portionTitle}
            </h4>
          </div>
        </div>

        {/* Controls: Prev, Next, Speed, Stop, Play/Pause */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap justify-end">
          {/* Previous section */}
          <button
            onClick={handlePrev}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer flex-shrink-0"
            title="Retroceder a sección anterior (⏮️)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next section */}
          <button
            onClick={handleNext}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer flex-shrink-0"
            title="Avanzar a siguiente sección (⏭️)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Speed switcher */}
          <button
            onClick={cyclePlaybackRate}
            className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono font-bold flex items-center gap-1 transition cursor-pointer flex-shrink-0"
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
            title="Avanzar automáticamente de sección"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">Auto</span>
          </button>

          {/* Stop Button */}
          {(isPlaying || isPaused) && (
            <button
              onClick={handleStop}
              className="px-2.5 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-mono font-semibold transition flex items-center gap-1 cursor-pointer flex-shrink-0"
              title="Detener audio por completo (⏹️)"
            >
              <Square className="w-3.5 h-3.5 fill-red-400 text-red-400" />
              <span className="hidden sm:inline">Detener</span>
            </button>
          )}

          {/* Play / Pause */}
          {isPlaying ? (
            <button
              onClick={handlePause}
              className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs font-mono flex items-center gap-1.5 transition shadow-md cursor-pointer flex-shrink-0"
            >
              <Pause className="w-4 h-4 fill-stone-950" />
              <span>Pausar</span>
            </button>
          ) : isPaused ? (
            <button
              onClick={handlePlayOrResume}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs font-mono flex items-center gap-1.5 transition shadow-md cursor-pointer flex-shrink-0"
            >
              <Play className="w-4 h-4 fill-stone-950" />
              <span>Reanudar</span>
            </button>
          ) : (
            <button
              onClick={handlePlayOrResume}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-xs font-mono flex items-center gap-1.5 transition shadow-md cursor-pointer flex-shrink-0"
            >
              <Play className="w-4 h-4 fill-stone-950" />
              <span>Escuchar Audio</span>
            </button>
          )}
        </div>
      </div>

      {!isSupported && (
        <div className="mb-3 text-xs bg-red-950/40 border border-red-800/40 text-red-300 p-2.5 rounded-lg flex items-center gap-2">
          <VolumeX className="w-4 h-4 flex-shrink-0" />
          La síntesis de voz no está habilitada en este navegador, pero puedes leer el guion militar completo a continuación.
        </div>
      )}

      {/* Currently playing section indicator */}
      {isPlaying && (
        <div className="flex items-center justify-between py-2 px-3 mb-3 bg-stone-950/80 rounded-lg border border-amber-500/30">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold">NARRANDO EN VIVO:</span>
            <span className="text-stone-200 truncate">{currentSegment.label}</span>
          </div>
          <span className="text-[11px] font-mono text-stone-400 flex-shrink-0 ml-2">
            Velocidad: {playbackRate}x
          </span>
        </div>
      )}

      {/* Teleprompter Text Display with Active Section Highlighting */}
      <div className="space-y-3 text-stone-300 text-xs leading-relaxed bg-stone-950/40 p-4 rounded-lg border border-stone-800/70 font-sans">
        {/* Intro */}
        <div
          onClick={() => {
            setCurrentSegmentIndex(0);
            speakSegment(0);
          }}
          className={`border-l-2 pl-3 py-1.5 rounded-r transition cursor-pointer ${
            currentSegmentIndex === 0
              ? 'border-amber-400 bg-amber-500/10 text-stone-100 ring-1 ring-amber-500/20'
              : 'border-amber-600 hover:bg-stone-900/60'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-amber-400 font-bold flex items-center gap-1">
              ▶ INTRODUCCIÓN TÁCTICA
            </span>
            {currentSegmentIndex === 0 && isPlaying && (
              <span className="text-[10px] font-mono text-emerald-400">Escuchando ahora</span>
            )}
          </div>
          <p className="italic text-stone-300">{script.intro}</p>
        </div>

        {/* Development Items */}
        <div className="space-y-2">
          {script.development.map((item, idx) => {
            const segIndex = idx + 1;
            const isCurrent = currentSegmentIndex === segIndex;
            return (
              <div
                key={idx}
                onClick={() => {
                  setCurrentSegmentIndex(segIndex);
                  speakSegment(segIndex);
                }}
                className={`border-l-2 pl-3 py-1.5 rounded-r transition cursor-pointer ${
                  isCurrent
                    ? 'border-emerald-400 bg-emerald-500/10 text-stone-100 ring-1 ring-emerald-500/20'
                    : 'border-emerald-600 hover:bg-stone-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-mono text-emerald-400 font-bold text-[11px]">
                    ▶ {item.split(':')[0]}
                  </span>
                  {isCurrent && isPlaying && (
                    <span className="text-[10px] font-mono text-emerald-400">Escuchando ahora</span>
                  )}
                </div>
                <p className="text-stone-300">
                  {item.split(':').slice(1).join(':')}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closure */}
        <div
          onClick={() => {
            const closureIdx = segments.length - 1;
            setCurrentSegmentIndex(closureIdx);
            speakSegment(closureIdx);
          }}
          className={`border-l-2 pl-3 py-1.5 rounded-r transition cursor-pointer ${
            currentSegmentIndex === segments.length - 1
              ? 'border-blue-400 bg-blue-500/10 text-stone-100 ring-1 ring-blue-500/20'
              : 'border-blue-600 hover:bg-stone-900/60'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-blue-400 font-bold flex items-center gap-1">
              ▶ CIERRE Y REGLA DE EXAMEN
            </span>
            {currentSegmentIndex === segments.length - 1 && isPlaying && (
              <span className="text-[10px] font-mono text-emerald-400">Escuchando ahora</span>
            )}
          </div>
          <p className="text-amber-200 font-medium">{script.closure}</p>
        </div>
      </div>
    </div>
  );
};
