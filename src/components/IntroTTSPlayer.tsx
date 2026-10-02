import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  RotateCcw,
  FastForward,
  Headphones,
  Sparkles,
  Radio,
  Zap,
  Volume1,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export interface TabAudioScript {
  id: string;
  tabKey: 'overview' | 'method' | 'modules' | 'assistant' | 'simulacros';
  title: string;
  durationEstimate: string;
  narration: string;
}

export const INTRO_TAB_SCRIPTS: Record<string, TabAudioScript> = {
  overview: {
    id: 'tab-1-overview',
    tabKey: 'overview',
    title: '1. ¿Qué es este Workbook Integral?',
    durationEstimate: '1 min 30 s',
    narration:
      '¡Atención personal cursante! Sección uno: ¿Qué es este Workbook Integral? Esta plataforma es tu centro de entrenamiento táctico-doctrinal estructurado específicamente para el personal de Sargentos Segundos de Infantería y Fusileros Paracaidistas aspirantes a la jerarquía de Sargento Primero en la Escuela Militar de Sargentos 2026. Transforma más de mil doscientos artículos legales dispersos en cuarenta y seis porciones asimilables de treinta minutos. Cada porción cuenta con video explicativo, síntesis de audio, casos prácticos, diez tarjetas de memoria y quiz de comprobación. Está diseñado para que desarrolles el criterio de mando y apliques la legislación militar con rectitud y honor en el servicio de las armas.'
  },
  method: {
    id: 'tab-2-method',
    tabKey: 'method',
    title: '2. Método de Estudio en 4 Pasos',
    durationEstimate: '1 min 45 s',
    narration:
      'Sección dos: Método Militar de cuatro pasos para estudiar cada porción. Para dominar cada una de las cuarenta y seis porciones, sigue esta secuencia disciplinada. Paso uno: Ver el video en la aplicación para comprender la estructura legal y los conceptos clave en seis a ocho minutos. Paso dos: Escuchar el audio con teleprompter para fijar los artículos en tu memoria auditiva en seis minutos. Paso tres: Resolver el escenario táctico analizando un dilema real del servicio militar en ocho minutos. Y Paso cuatro: Responder el quiz de cinco preguntas y repasar las diez tarjetas mnemotécnicas para afianzar la retención a largo plazo. Tiempo total por sesión: treinta minutos exactos.'
  },
  modules: {
    id: 'tab-3-modules',
    tabKey: 'modules',
    title: '3. ¿Qué contiene el Workbook?',
    durationEstimate: '1 min 40 s',
    narration:
      'Sección tres: Inventario general de contenidos del Workbook EMS 2026. La plataforma contiene ocho categorías doctrinales completas: Ley de Disciplina, Reglamento General de Deberes Militares, Código de Justicia Militar, Ley Orgánica del Ejército y Fuerza Aérea, Ley Federal de Armas de Fuego, Derechos Humanos, Ley Nacional de Uso de la Fuerza y Manual de Táctica de Infantería. El compendio integra cuarenta y seis porciones de estudio de treinta minutos, cuatrocientas sesenta tarjetas de memoria de repetición espaciada, sesenta escenarios tácticos con fundamentación jurídica, y seis simulacros oficiales con cronómetro militar.'
  },
  assistant: {
    id: 'tab-4-assistant',
    tabKey: 'assistant',
    title: '4. ¿Cómo usar el Asistente Doctrinal EMS?',
    durationEstimate: '1 min 30 s',
    narration:
      'Sección cuatro: Instrucciones para usar el Asistente Doctrinal EMS. El asistente de inteligencia artificial militar está entrenado exclusivamente con los manuales y leyes oficiales de la Secretaría de la Defensa Nacional. Puedes consultarle dudas doctrinales a cualquier hora, plantearle dilemas reales de servicio para saber qué correctivo disciplinario procede o si constituye delito militar, y pedirle que te genere preguntas tipo examen con trampa para poner a prueba tu conocimiento antes de la evaluación oficial.'
  },
  simulacros: {
    id: 'tab-5-simulacros',
    tabKey: 'simulacros',
    title: '5. ¿Cómo hacer los 6 Simulacros Oficiales?',
    durationEstimate: '1 min 35 s',
    narration:
      'Sección cinco: Instrucciones para presentar los seis simulacros oficiales de evaluación. Los simulacros replican el rigor formal del examen de la Escuela Militar de Sargentos. Debes presentarlos en condiciones reales de examen, sin pausas ni consultas, durante el tiempo asignado de sesenta o noventa minutos. La calificación mínima aprobatoria es del ochenta por ciento. Al finalizar, cada reactivo incluye su fundamento legal exacto y su explicación doctrinal para que corrijas cualquier error antes del examen final de ascenso.'
  }
};

interface IntroTTSPlayerProps {
  currentTab: 'overview' | 'method' | 'modules' | 'assistant' | 'simulacros' | 'video';
  onSelectTab?: (tab: 'overview' | 'method' | 'modules' | 'assistant' | 'simulacros') => void;
  settings: { autoPlayTts: boolean; speechRate: number };
}

export const IntroTTSPlayer: React.FC<IntroTTSPlayerProps> = ({
  currentTab,
  onSelectTab,
  settings
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(settings.speechRate);
  const [isSupported, setIsSupported] = useState(true);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(settings.autoPlayTts);
  const [continuousMode, setContinuousMode] = useState(false);
  const [activeNarratedTab, setActiveNarratedTab] = useState<'overview' | 'method' | 'modules' | 'assistant' | 'simulacros'>('overview');
  // Default collapsed to true for swift navigation on mobile & desktop
  const [isCollapsed, setIsCollapsed] = useState(true);

  const playbackRateRef = useRef(playbackRate);
  playbackRateRef.current = playbackRate;

  const continuousModeRef = useRef(continuousMode);
  continuousModeRef.current = continuousMode;

  const userManuallyStoppedRef = useRef(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

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

  const currentScript = INTRO_TAB_SCRIPTS[activeNarratedTab] || INTRO_TAB_SCRIPTS.overview;

  const speakText = (script: TabAudioScript) => {
    if (!('speechSynthesis' in window)) return;
    if (document.hidden) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(script.narration);
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

      // Continuous mode: automatically advance to next tab if still on this page
      if (continuousModeRef.current && !userManuallyStoppedRef.current && !document.hidden) {
        const tabSequence: ('overview' | 'method' | 'modules' | 'assistant' | 'simulacros')[] = [
          'overview',
          'method',
          'modules',
          'assistant',
          'simulacros'
        ];
        const currentIndex = tabSequence.indexOf(script.tabKey);
        if (currentIndex !== -1 && currentIndex < tabSequence.length - 1) {
          const nextTabKey = tabSequence[currentIndex + 1];
          setActiveNarratedTab(nextTabKey);
          if (onSelectTab) {
            onSelectTab(nextTabKey);
          }
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

  // Sync and auto-play ONLY when tab changes AND autoPlayEnabled is explicitly active
  useEffect(() => {
    // If switched to video or another non-audio tab, cancel immediately
    if (currentTab === 'video') {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      setIsPaused(false);
      return;
    }

    // Cancel any previous tab speech when switching tabs
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);

    setActiveNarratedTab(currentTab);
    userManuallyStoppedRef.current = false;

    if (!autoPlayEnabled || document.hidden) {
      return;
    }

    // Auto-start speech with a slight delay if user turned auto on
    const targetScript = INTRO_TAB_SCRIPTS[currentTab] || INTRO_TAB_SCRIPTS.overview;
    const timer = setTimeout(() => {
      if (!userManuallyStoppedRef.current && !document.hidden) {
        speakText(targetScript);
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentTab, autoPlayEnabled]);

  const handlePlayOrResume = () => {
    if (!('speechSynthesis' in window)) return;

    userManuallyStoppedRef.current = false;

    if (isPaused && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    speakText(currentScript);
  };

  const handlePause = () => {
    if (!('speechSynthesis' in window)) return;
    userManuallyStoppedRef.current = true;
    window.speechSynthesis.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const handleStop = () => {
    if (!('speechSynthesis' in window)) return;
    userManuallyStoppedRef.current = true;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleRestart = () => {
    userManuallyStoppedRef.current = false;
    speakText(currentScript);
  };

  const cyclePlaybackRate = () => {
    const nextRate = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1;
    setPlaybackRate(nextRate);
    if (isPlaying) {
      speakText(currentScript);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="window-3d rounded-xl p-2.5 sm:p-4 relative overflow-hidden transition-all duration-300">
      {/* Background ambient pulse when playing */}
      {isPlaying && (
        <div className="absolute top-0 right-0 w-64 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none animate-pulse" />
      )}

      {/* Collapsed Compact State: maximum space savings on mobile */}
      {isCollapsed ? (
        <div className="flex items-center justify-between gap-2 relative z-10">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button
              onClick={isPlaying ? handlePause : handlePlayOrResume}
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer transition shadow-sm ${
                isPlaying
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-800 text-stone-300 hover:text-amber-400'
              }`}
              title={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold text-amber-400 truncate">
                  AUDIO TTS {isPlaying ? '• NARRANDO' : isPaused ? '• EN PAUSA' : ''}
                </span>
                <span className="text-[10px] font-mono text-stone-400 hidden xs:inline">
                  ({currentScript.durationEstimate})
                </span>
              </div>
              <p className="text-xs font-semibold text-stone-200 truncate">
                {currentScript.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            {isPlaying && (
              <button
                onClick={handleStop}
                className="p-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 text-xs font-mono transition"
                title="Detener"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
              </button>
            )}

            <button
              onClick={cyclePlaybackRate}
              className="px-2 py-1 rounded-lg bg-stone-800 text-stone-300 text-[10px] font-mono font-bold"
              title="Velocidad"
            >
              {playbackRate}x
            </button>

            <button
              onClick={() => setIsCollapsed(false)}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 transition flex items-center gap-1 text-[11px] font-mono cursor-pointer"
              title="Desplegar controles completos de Audio TTS"
            >
              <ChevronDown className="w-4 h-4" />
              <span className="hidden sm:inline">Desplegar</span>
            </button>
          </div>
        </div>
      ) : (
        /* Expanded Full Controls State */
        <>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 relative z-10">
            {/* Left: Info & Sound Wave */}
            <div className="flex items-center gap-3 min-w-0">
              <div
                onClick={isPlaying ? handlePause : handlePlayOrResume}
                className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 cursor-pointer transition-all shadow-md ${
                  isPlaying
                    ? 'bg-amber-500 text-stone-950 ring-2 ring-amber-400/80 scale-105'
                    : isPaused
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-stone-800 text-stone-300 border border-stone-700'
                }`}
                title={isPlaying ? 'Pausar audio' : 'Reproducir audio'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-stone-950" />
                ) : (
                  <Headphones className="w-5 h-5" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Volume2 className="w-3 h-3" /> AUDIO TTS AUTOMÁTICO
                  </span>

                  {isPlaying && (
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1 animate-pulse">
                      <Radio className="w-2.5 h-2.5" /> Narrando en vivo
                    </span>
                  )}

                  {isPaused && (
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                      ⏸️ En pausa
                    </span>
                  )}

                  <span className="text-[10px] font-mono text-stone-400">
                    Est: {currentScript.durationEstimate}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-semibold text-stone-100 truncate mt-0.5">
                  Escuchando: {currentScript.title}
                </h4>
              </div>
            </div>

            {/* Right: Controls Bar & Collapse Toggle */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap justify-end">
              {/* Auto-play toggle */}
              <button
                onClick={() => setAutoPlayEnabled(!autoPlayEnabled)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition flex items-center gap-1 cursor-pointer flex-shrink-0 ${
                  autoPlayEnabled
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-stone-800 text-stone-400 border border-stone-700/60'
                }`}
                title="Activar o desactivar inicio automático al cambiar de tema"
              >
                <Zap className={`w-3 h-3 ${autoPlayEnabled ? 'text-amber-400' : 'text-stone-500'}`} />
                <span>Auto: {autoPlayEnabled ? 'ON' : 'OFF'}</span>
              </button>

              {/* Continuous play toggle */}
              <button
                onClick={() => setContinuousMode(!continuousMode)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition flex items-center gap-1 cursor-pointer flex-shrink-0 ${
                  continuousMode
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold'
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-400 border border-stone-700/60'
                }`}
                title="Reproduce las 5 secciones de forma continua sin interrupción"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span className="hidden sm:inline">Continuo (5 temas)</span>
                <span className="sm:hidden">Continuo</span>
              </button>

              {/* Speed switcher */}
              <button
                onClick={cyclePlaybackRate}
                className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono font-bold flex items-center gap-1 transition cursor-pointer flex-shrink-0"
                title="Velocidad de narración"
              >
                <FastForward className="w-3.5 h-3.5" />
                {playbackRate}x
              </button>

              {/* Restart button */}
              <button
                onClick={handleRestart}
                className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer flex-shrink-0"
                title="Reiniciar este tema desde el principio"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Stop Button */}
              {(isPlaying || isPaused) && (
                <button
                  onClick={handleStop}
                  className="px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-mono font-semibold transition flex items-center gap-1 cursor-pointer flex-shrink-0"
                  title="Detener por completo el audio"
                >
                  <Square className="w-3 h-3 fill-red-400 text-red-400" />
                  <span>Detener</span>
                </button>
              )}

              {/* Play / Pause Primary Button */}
              {isPlaying ? (
                <button
                  onClick={handlePause}
                  className="btn-3d-base btn-3d-amber px-4 py-1.5 rounded-lg font-extrabold text-xs font-mono flex items-center gap-1.5 transition cursor-pointer flex-shrink-0"
                >
                  <Pause className="w-4 h-4 fill-stone-950" />
                  <span>Pausar</span>
                </button>
              ) : isPaused ? (
                <button
                  onClick={handlePlayOrResume}
                  className="btn-3d-base btn-3d-amber px-4 py-1.5 rounded-lg font-extrabold text-xs font-mono flex items-center gap-1.5 transition cursor-pointer flex-shrink-0"
                >
                  <Play className="w-4 h-4 fill-stone-950" />
                  <span>Reanudar</span>
                </button>
              ) : (
                <button
                  onClick={handlePlayOrResume}
                  className="btn-3d-base btn-3d-amber px-4 py-1.5 rounded-lg font-extrabold text-xs font-mono flex items-center gap-1.5 transition cursor-pointer flex-shrink-0"
                >
                  <Play className="w-4 h-4 fill-stone-950" />
                  <span>Reproducir</span>
                </button>
              )}

              {/* Collapse window button */}
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-amber-400 transition cursor-pointer flex items-center gap-1 text-[11px] font-mono flex-shrink-0"
                title="Colapsar ventana de audio para ahorrar espacio"
              >
                <ChevronUp className="w-4 h-4" />
                <span className="hidden sm:inline">Colapsar</span>
              </button>
            </div>
          </div>

          {/* Visual Equalizer bar when active */}
          {isPlaying && (
            <div className="mt-2.5 pt-2 border-t border-amber-500/20 flex items-center justify-between text-[11px] font-mono text-amber-300/90">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-1 h-3 bg-amber-400 animate-pulse" />
                <span className="inline-block w-1 h-4 bg-amber-400 animate-pulse delay-75" />
                <span className="inline-block w-1 h-2 bg-amber-400 animate-pulse delay-150" />
                <span className="inline-block w-1 h-4 bg-amber-400 animate-pulse delay-100" />
                <span className="ml-1 text-stone-300">
                  Audio militar en curso. Presiona <strong>Pausar</strong> o <strong>Detener</strong> en cualquier momento.
                </span>
              </div>
              <span className="text-stone-400 hidden sm:inline">Voz oficial en español</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
