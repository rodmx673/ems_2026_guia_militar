import React, { useState, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  Link as LinkIcon,
  Check,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Clock,
  Maximize2,
  Minimize2,
  Monitor,
  Tv
} from 'lucide-react';
import {
  extractYouTubeId,
  buildYouTubeEmbedUrl,
  getPortionStoredVideoUrl,
  setPortionStoredVideoUrl,
  clearPortionStoredVideoUrl
} from '../utils/youtube';
import { getDefaultVideoForPortion } from '../data/portionVideos';
import { VideoScene } from '../types/ems';

interface YouTubePlayerProps {
  portionId: string;
  defaultVideoUrl?: string;
  portionNumber: string;
  portionTitle: string;
  scenes?: VideoScene[];
  activeSceneIndex?: number;
  onSceneSelect?: (index: number) => void;
  startTime?: number;
  compactMode?: boolean;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  portionId,
  defaultVideoUrl,
  portionNumber,
  portionTitle,
  scenes = [],
  activeSceneIndex = 0,
  onSceneSelect,
  startTime = 0,
  compactMode = false
}) => {
  const portionConfig = getDefaultVideoForPortion(portionId, portionTitle, portionNumber, defaultVideoUrl);

  // Current video URL state (persisted per portion)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>(() => {
    const saved = getPortionStoredVideoUrl(portionId);
    return saved || portionConfig.defaultUrl;
  });

  // Edit / custom link input state
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Player state
  const [seekTime, setSeekTime] = useState<number>(startTime);
  const [autoplayKey, setAutoplayKey] = useState<number>(0);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [playerSize, setPlayerSize] = useState<'normal' | 'wide'>('normal');

  // Sync when portionId changes
  useEffect(() => {
    const saved = getPortionStoredVideoUrl(portionId);
    setCurrentVideoUrl(saved || portionConfig.defaultUrl);
    setInputUrl(saved || portionConfig.defaultUrl);
    setSeekTime(0);
    setIsEditingUrl(false);
    setUrlError(null);
  }, [portionId, portionConfig.defaultUrl]);

  // Sync when startTime changes externally
  useEffect(() => {
    if (startTime >= 0) {
      setSeekTime(startTime);
      setAutoplayKey(prev => prev + 1);
    }
  }, [startTime]);

  const videoId = extractYouTubeId(currentVideoUrl);
  const isCustomUrl = !!getPortionStoredVideoUrl(portionId);

  const handleApplyUrl = (urlToApply: string) => {
    setUrlError(null);
    const id = extractYouTubeId(urlToApply);
    if (!id) {
      setUrlError('Ingresa un enlace de YouTube válido (ej: https://www.youtube.com/watch?v=...)');
      return;
    }

    setCurrentVideoUrl(urlToApply.trim());
    setPortionStoredVideoUrl(portionId, urlToApply.trim());
    setSeekTime(0);
    setAutoplayKey(prev => prev + 1);
    setIsEditingUrl(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetToDefault = () => {
    clearPortionStoredVideoUrl(portionId);
    setCurrentVideoUrl(portionConfig.defaultUrl);
    setInputUrl(portionConfig.defaultUrl);
    setSeekTime(0);
    setAutoplayKey(prev => prev + 1);
    setIsEditingUrl(false);
    setUrlError(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleJumpToSceneTime = (sceneIndex: number, sceneMinute: string) => {
    if (onSceneSelect) {
      onSceneSelect(sceneIndex);
    }
    // Calculate seconds from scene minute format e.g. "1:31 - 3:30"
    const startStr = sceneMinute.split('-')[0].trim();
    const parts = startStr.split(':');
    let seconds = 0;
    if (parts.length === 2) {
      seconds = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    } else if (parts.length === 3) {
      seconds = parseInt(parts[0], 10) * 3600 + parseInt(parts[1], 10) * 60 + parseInt(parts[2], 10);
    }
    setSeekTime(seconds);
    setAutoplayKey(prev => prev + 1);
  };

  const embedUrl = videoId
    ? buildYouTubeEmbedUrl(videoId, seekTime, autoplayKey > 0)
    : '';

  return (
    <div
      className={`bg-stone-900 border border-stone-800 rounded-xl overflow-hidden shadow-xl transition-all ${
        isCinemaMode
          ? 'fixed inset-2 z-50 bg-stone-950 p-3 sm:p-6 overflow-y-auto flex flex-col justify-center'
          : ''
      }`}
    >
      {/* Player Header bar */}
      <div className="bg-stone-950/80 px-3.5 py-2.5 sm:px-4 sm:py-3 border-b border-stone-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 flex-shrink-0">
            <Tv className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-red-400 flex items-center gap-1">
                <Play className="w-3 h-3 fill-red-400" /> REPRODUCTOR YOUTUBE EMS
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% In-App
              </span>
              {isCustomUrl && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Enlace Personalizado
                </span>
              )}
            </div>
            <p className="text-xs text-stone-300 font-medium truncate max-w-sm sm:max-w-md">
              {portionConfig.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          {/* Size toggle: Normal vs Wide */}
          {!isCinemaMode && (
            <button
              onClick={() => setPlayerSize(playerSize === 'normal' ? 'wide' : 'normal')}
              className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition text-xs font-mono flex items-center gap-1 cursor-pointer"
              title={playerSize === 'normal' ? 'Ampliar tamaño del reproductor' : 'Tamaño normal de estudio'}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {playerSize === 'normal' ? 'Ampliar' : 'Normal'}
              </span>
            </button>
          )}

          {/* Change Link button */}
          <button
            onClick={() => {
              setIsEditingUrl(!isEditingUrl);
              setInputUrl(currentVideoUrl);
              setUrlError(null);
            }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1 transition cursor-pointer ${
              isEditingUrl
                ? 'bg-amber-600 text-white'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
            }`}
            title="Cambiar o pegar enlace de YouTube"
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cambiar Enlace</span>
          </button>

          {/* Cinema mode button */}
          <button
            onClick={() => setIsCinemaMode(!isCinemaMode)}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition text-xs cursor-pointer"
            title={isCinemaMode ? 'Salir de modo cine' : 'Modo Cine'}
          >
            {isCinemaMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Save Success Banner */}
      {saveSuccess && (
        <div className="bg-emerald-950/80 border-b border-emerald-800 px-4 py-2 flex items-center gap-2 text-xs text-emerald-300 font-mono">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>¡Enlace de YouTube actualizado y guardado para esta sesión!</span>
        </div>
      )}

      {/* Edit URL / Presets Drawer */}
      {isEditingUrl && (
        <div className="bg-stone-950 p-3.5 sm:p-4 border-b border-stone-800 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-semibold text-amber-400 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5" /> PEGAR ENLACE DE YOUTUBE PARA ESTA CLASE
            </label>
            <span className="text-[11px] text-stone-400">
              Se reproduce dentro de la app sin salir
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={inputUrl}
              onChange={e => {
                setInputUrl(e.target.value);
                setUrlError(null);
              }}
              placeholder="https://www.youtube.com/watch?v=... o https://youtu.be/..."
              className="flex-1 bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs font-mono text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleApplyUrl(inputUrl)}
                className="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs font-mono flex items-center gap-1.5 transition cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" /> Aplicar
              </button>
              {isCustomUrl && (
                <button
                  onClick={handleResetToDefault}
                  className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono flex items-center gap-1.5 transition cursor-pointer"
                  title="Restablecer al video recomendado"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Restablecer
                </button>
              )}
            </div>
          </div>

          {urlError && (
            <p className="text-xs font-mono text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {urlError}
            </p>
          )}

          {/* Presets suggestions */}
          {portionConfig.presets && portionConfig.presets.length > 0 && (
            <div className="pt-2 border-t border-stone-800">
              <span className="text-[11px] font-mono text-stone-400 flex items-center gap-1 mb-2">
                <Sparkles className="w-3 h-3 text-amber-400" /> Videos recomendados para Porción {portionNumber}:
              </span>
              <div className="grid sm:grid-cols-2 gap-2">
                {portionConfig.presets.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => handleApplyUrl(preset.url)}
                    className="text-left p-2 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-amber-500/50 transition cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-200 group-hover:text-amber-400">
                      <span className="truncate">{preset.title}</span>
                      {preset.duration && (
                        <span className="text-[10px] font-mono text-stone-400 ml-1.5 flex-shrink-0">
                          {preset.duration}
                        </span>
                      )}
                    </div>
                    {preset.description && (
                      <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                        {preset.description}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Video Screen (IFrame) Wrapper */}
      <div className="w-full bg-black/90 p-1 sm:p-2 flex items-center justify-center">
        <div
          className={`relative w-full bg-black aspect-video flex items-center justify-center overflow-hidden rounded-lg shadow-inner transition-all duration-300 ${
            isCinemaMode
              ? 'max-w-6xl max-h-[85vh]'
              : playerSize === 'normal'
              ? 'max-w-4xl'
              : 'max-w-full'
          }`}
        >
          {videoId ? (
            <iframe
              key={`${videoId}-${seekTime}-${autoplayKey}`}
              src={embedUrl}
              title={`EMS Video - ${portionTitle}`}
              className="w-full h-full border-0 absolute inset-0 block"
              style={{ width: '100%', height: '100%', minHeight: '100%' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="p-6 text-center text-stone-400 space-y-2">
              <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
              <p className="text-sm font-semibold text-stone-200">
                No se pudo cargar el video con el enlace provisto.
              </p>
              <p className="text-xs text-stone-400 font-mono">
                Enlace actual: {currentVideoUrl}
              </p>
              <button
                onClick={handleResetToDefault}
                className="mt-2 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono"
              >
                Cargar video recomendado
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Scene Synchronizer & Timestamps Bar */}
      {scenes.length > 0 && !compactMode && (
        <div className="bg-stone-950 p-2.5 sm:p-3 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-mono text-stone-400 flex-shrink-0">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-stone-300">Sincronizar Escena ({scenes.length}):</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {scenes.map((scene, idx) => {
              const isActive = activeSceneIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleJumpToSceneTime(idx, scene.minute)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition flex items-center gap-1 flex-shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-400'
                      : 'bg-stone-850 hover:bg-stone-800 text-stone-300 border border-stone-700/60'
                  }`}
                  title={`Ir a Escena ${idx + 1} (${scene.minute})`}
                >
                  <Play className={`w-2.5 h-2.5 ${isActive ? 'fill-white' : 'fill-stone-400'}`} />
                  <span>Escena {idx + 1}</span>
                  <span className="text-[10px] opacity-80 font-mono">({scene.minute.split(' ')[0]})</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
