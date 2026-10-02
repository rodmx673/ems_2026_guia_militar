import React, { useState } from 'react';
import {
  Video,
  Film,
  Eye,
  Mic,
  Play,
  Tv,
  ListVideo,
  LayoutGrid,
  Sparkles,
  Link as LinkIcon,
  HelpCircle
} from 'lucide-react';
import { VideoScene } from '../types/ems';
import { YouTubePlayer } from './YouTubePlayer';
import { parseTimestampToSeconds } from '../utils/youtube';

interface VideoStoryboardViewerProps {
  portionId?: string;
  defaultVideoUrl?: string;
  scenes: VideoScene[];
  portionNumber: string;
  portionTitle: string;
}

type ViewMode = 'split' | 'video-only' | 'script-only';

export const VideoStoryboardViewer: React.FC<VideoStoryboardViewerProps> = ({
  portionId,
  defaultVideoUrl,
  scenes,
  portionNumber,
  portionTitle
}) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [customStartTime, setCustomStartTime] = useState<number>(0);

  const effectivePortionId = portionId || portionNumber;
  const currentScene = scenes[activeSceneIndex];

  const handleSelectScene = (idx: number) => {
    setActiveSceneIndex(idx);
    if (scenes[idx]) {
      const seconds = parseTimestampToSeconds(scenes[idx].minute);
      setCustomStartTime(seconds);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-hidden">
      {/* Top Header Card */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-3.5 sm:p-5 shadow-lg w-full max-w-full overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-stone-800">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  GUION DE VIDEO / TELEPROMPTER
                </span>
                <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Escenas: {scenes.length}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  YouTube In-App
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-semibold text-stone-200 mt-1 truncate">
                Porción {portionNumber}: {portionTitle}
              </h4>
            </div>
          </div>

          {/* View mode switcher */}
          <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-lg border border-stone-800 self-start lg:self-center">
            <button
              onClick={() => setViewMode('split')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'split'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Ver reproductor y guion simultáneamente"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Doble Vista</span>
            </button>

            <button
              onClick={() => setViewMode('video-only')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'video-only'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Solo reproductor de video"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Solo Video</span>
            </button>

            <button
              onClick={() => setViewMode('script-only')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'script-only'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Solo guion de teleprompter"
            >
              <ListVideo className="w-3.5 h-3.5" />
              <span>Solo Guion</span>
            </button>
          </div>
        </div>

        {/* Quick Scenes Selector Bar */}
        <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
            <span className="text-xs font-mono text-stone-400 mr-1 flex-shrink-0">
              Escenas ({scenes.length}):
            </span>
            {scenes.map((scene, idx) => {
              const isSelected = activeSceneIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectScene(idx)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition font-medium flex-shrink-0 flex items-center gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                  }`}
                >
                  <span>Escena {idx + 1}</span>
                  <span className="text-[10px] opacity-75">({scene.minute.split(' ')[0]})</span>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-mono text-stone-400 hidden sm:block">
            Reproducción integrada sin salir de la plataforma
          </div>
        </div>
      </div>

      {/* Main Content Area Based on ViewMode */}
      <div className="space-y-4">
        {/* YouTube Video Player Component */}
        {(viewMode === 'split' || viewMode === 'video-only') && (
          <div className="w-full">
            <YouTubePlayer
              portionId={effectivePortionId}
              defaultVideoUrl={defaultVideoUrl}
              portionNumber={portionNumber}
              portionTitle={portionTitle}
              scenes={scenes}
              activeSceneIndex={activeSceneIndex}
              onSceneSelect={handleSelectScene}
              startTime={customStartTime}
            />
          </div>
        )}

        {/* Teleprompter & Storyboard Details */}
        {(viewMode === 'split' || viewMode === 'script-only') && (
          <div className="space-y-4">
            {/* Active Scene Spotlight Card */}
            {currentScene && (
              <div className="bg-stone-900 rounded-xl border border-blue-500/30 overflow-hidden shadow-lg">
                <div className="bg-blue-950/40 px-3.5 py-2.5 sm:px-4 sm:py-3 border-b border-blue-900/40 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-400 flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5" /> ESCENA {activeSceneIndex + 1} DE {scenes.length}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {currentScene.minute}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const seconds = parseTimestampToSeconds(currentScene.minute);
                        setCustomStartTime(seconds);
                        if (viewMode === 'script-only') {
                          setViewMode('split');
                        }
                      }}
                      className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>Ir al minuto en video</span>
                    </button>
                    <span className="text-[11px] text-stone-400 hidden sm:inline">
                      Formato video de adiestramiento EMS
                    </span>
                  </div>
                </div>

                <div className="p-3.5 sm:p-5 grid md:grid-cols-2 gap-4">
                  <div className="bg-stone-950/80 rounded-lg p-3.5 sm:p-4 border border-stone-800">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-2">
                      <Eye className="w-4 h-4 flex-shrink-0" />
                      <span>QUÉ SE MUESTRA EN PANTALLA (VISUAL)</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed font-mono">
                      {currentScene.visual}
                    </p>
                  </div>

                  <div className="bg-stone-950/80 rounded-lg p-3.5 sm:p-4 border border-stone-800">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-2">
                      <Mic className="w-4 h-4 flex-shrink-0" />
                      <span>NARRACIÓN EN OFF / TELEPROMPTER</span>
                    </div>
                    <p className="text-xs text-stone-200 leading-relaxed italic">
                      "{currentScene.narration}"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Scenes Breakdown Table */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-3.5 sm:p-4 shadow-lg overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-xs font-mono font-bold text-stone-300 flex items-center gap-1.5">
                  <ListVideo className="w-3.5 h-3.5 text-blue-400" />
                  TABLA SECUENCIAL DE ESCENAS ({scenes.length})
                </h5>
                <span className="text-[11px] text-stone-400">
                  Haz clic en cualquier fila para sincronizar
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-950 text-stone-400 border-b border-stone-800 font-mono">
                      <th className="py-2 px-3 w-16 text-center">#</th>
                      <th className="py-2 px-3 w-32">Minuto</th>
                      <th className="py-2 px-3">Visual (Infografía / Cuadro)</th>
                      <th className="py-2 px-3">Narración Militar</th>
                      <th className="py-2 px-3 w-24 text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/60 font-sans">
                    {scenes.map((s, idx) => {
                      const isRowActive = activeSceneIndex === idx;
                      return (
                        <tr
                          key={idx}
                          onClick={() => handleSelectScene(idx)}
                          className={`cursor-pointer transition ${
                            isRowActive ? 'bg-blue-950/30 text-white' : 'hover:bg-stone-800/40 text-stone-300'
                          }`}
                        >
                          <td className="py-2.5 px-3 text-center font-mono font-bold text-stone-400">
                            {idx + 1}
                          </td>
                          <td className="py-2.5 px-3 font-mono font-bold text-amber-400 whitespace-nowrap">
                            {s.minute}
                          </td>
                          <td className="py-2.5 px-3 text-stone-300 max-w-xs">{s.visual}</td>
                          <td className="py-2.5 px-3 text-stone-200 italic">{s.narration}</td>
                          <td className="py-2.5 px-3 text-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectScene(idx);
                              }}
                              className={`p-1.5 rounded-lg text-[10px] font-mono transition flex items-center justify-center mx-auto ${
                                isRowActive
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                              }`}
                              title="Reproducir esta escena"
                            >
                              <Play className="w-3 h-3 fill-current" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
