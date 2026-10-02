import React, { useState } from 'react';
import { HelpCircle, Play, LayoutGrid, List, ChevronDown, ChevronUp, CheckCircle, AlertCircle } from 'lucide-react';
import { ALL_PORTIONS } from '../data/emsRepository';
import { useEMSProgress } from '../context/ProgressContext';
import { MiniQuizViewer } from './MiniQuizViewer';
import { Portion } from '../types/ems';

export const QuizzesHub: React.FC = () => {
  const { progress } = useEMSProgress();
  const [activePortion, setActivePortion] = useState<Portion | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('list');
  const [isCollapsed, setIsCollapsed] = useState(true);

  if (activePortion) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setActivePortion(null)}
          className="btn-3d-base btn-3d-stone px-3 py-1.5 rounded-lg text-stone-300 text-xs font-mono cursor-pointer"
        >
          ← Volver a la Lista de Quizzes
        </button>

        <MiniQuizViewer
          questions={activePortion.quiz}
          portionNumber={activePortion.portionNumber}
          portionTitle={activePortion.title}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5 w-full max-w-full overflow-hidden">
      <div className="window-3d rounded-xl p-3.5 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0 shadow-sm">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-stone-100">
              Banco Centralizado de Quizzes Autoevaluables
            </h3>
            <p className="text-xs text-stone-400">
              5 preguntas de opción múltiple por cada porción con fundamento legal y justificación doctrinal.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-between sm:justify-end">
          {/* View mode toggle: cards vs compact list */}
          <div className="flex items-center bg-stone-950 p-0.5 rounded-lg border border-stone-800 shadow-inner">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1 transition ${
                viewMode === 'cards'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Vista en Tarjetas"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tarjetas</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1 transition ${
                viewMode === 'list'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Lista Compacta (Ahorro de Espacio Móvil)"
            >
              <List className="w-3.5 h-3.5" />
              <span>Lista</span>
            </button>
          </div>

          {/* Collapse toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-400 hover:text-purple-400 transition cursor-pointer flex items-center gap-1 text-[11px] font-mono"
            title={isCollapsed ? 'Desplegar quizzes' : 'Colapsar quizzes'}
          >
            {isCollapsed ? (
              <>
                <ChevronDown className="w-4 h-4 text-purple-400" />
                <span className="text-[10px] text-purple-400 font-bold hidden sm:inline">Desplegar</span>
              </>
            ) : (
              <>
                <ChevronUp className="w-4 h-4" />
                <span className="text-[10px] hidden sm:inline">Colapsar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <>
          {viewMode === 'list' ? (
            /* COMPACT LIST VIEW FOR QUIZZES */
            <div className="space-y-1.5">
              {ALL_PORTIONS.map(p => {
                const score = progress.quizScores[p.id];
                const isPassed = (score || 0) >= 80;

                return (
                  <div
                    key={p.id}
                    onClick={() => setActivePortion(p)}
                    className="card-3d rounded-lg p-2.5 flex items-center justify-between gap-2.5 cursor-pointer active:scale-[0.99] transition"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 flex-shrink-0">
                        {p.portionNumber}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-semibold text-stone-200 truncate">
                            {p.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400 mt-0.5">
                          <span className="truncate">{p.articles}</span>
                          <span>•</span>
                          {score !== undefined ? (
                            <span className={isPassed ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                              {score}%
                            </span>
                          ) : (
                            <span className="text-stone-500">Sin evaluar</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePortion(p);
                      }}
                      className="btn-3d-base btn-3d-purple px-2.5 py-1.5 rounded-md text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer flex-shrink-0"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{score !== undefined ? 'Repetir' : 'Presentar'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            /* DETAILED CARDS VIEW FOR QUIZZES */
            <div className="grid md:grid-cols-2 gap-3 sm:gap-3.5">
              {ALL_PORTIONS.map(p => {
                const score = progress.quizScores[p.id];
                const isPassed = (score || 0) >= 80;

                return (
                  <div
                    key={p.id}
                    className="card-3d rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 min-w-0"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-amber-400">
                          Porción {p.portionNumber}
                        </span>
                        <span className="text-[11px] text-stone-400 font-mono truncate">
                          {p.articles}
                        </span>
                      </div>

                      <h4 className="text-xs font-semibold text-stone-200 truncate">
                        {p.title}
                      </h4>

                      <div className="text-[11px] font-mono">
                        {score !== undefined ? (
                          <span
                            className={`px-2 py-0.5 rounded font-bold ${
                              isPassed
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-red-950 text-red-300 border border-red-800'
                            }`}
                          >
                            Calificación: {score}%
                          </span>
                        ) : (
                          <span className="text-stone-400">No evaluado</span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => setActivePortion(p)}
                      className="btn-3d-base btn-3d-purple w-full sm:w-auto px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold flex items-center justify-center gap-1 cursor-pointer flex-shrink-0"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> Presentar
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

