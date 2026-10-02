import React, { useState } from 'react';
import { Target, Clock, Play, CheckCircle2, XCircle, LayoutGrid, List, ChevronDown, ChevronUp } from 'lucide-react';
import { SIMULACROS_DATA } from '../data/simulacrosData';
import { Simulacro } from '../types/ems';
import { useEMSProgress } from '../context/ProgressContext';

interface SimulacrosListViewProps {
  onStartSimulacro: (simulacro: Simulacro) => void;
}

export const SimulacrosListView: React.FC<SimulacrosListViewProps> = ({ onStartSimulacro }) => {
  const { progress } = useEMSProgress();
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('list');
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="space-y-5 sm:space-y-6 w-full max-w-full overflow-hidden">
      <div className="window-3d rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-sm flex-shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 shadow-sm">
                TEMA 9: SIMULACROS OFICIALES
              </span>
              <span className="text-xs text-stone-400 font-mono">6 Simulacros Oficiales</span>
            </div>
            <h3 className="text-base md:text-lg font-bold text-stone-100 mt-0.5">
              6 Simulacros de Examen con Cronómetro y Clave Justificada
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-between md:justify-end">
          {/* View mode toggle: cards vs compact list */}
          <div className="flex items-center bg-stone-950 p-0.5 rounded-lg border border-stone-800 shadow-inner">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1 transition ${
                viewMode === 'cards'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40 shadow-sm'
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

          <div className="text-xs font-mono text-stone-300 bg-stone-950/90 px-3 py-1.5 rounded-lg border border-stone-800 shadow-inner">
            Aprobación: <strong className="text-emerald-400 font-bold">80%</strong>
          </div>

          {/* Collapse Window Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-400 hover:text-red-400 transition cursor-pointer flex items-center gap-1 text-[11px] font-mono"
            title={isCollapsed ? 'Desplegar simulacros' : 'Colapsar simulacros'}
          >
            {isCollapsed ? (
              <>
                <ChevronDown className="w-4 h-4 text-red-400" />
                <span className="text-[10px] text-red-400 font-bold hidden sm:inline">Desplegar</span>
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
            /* COMPACT LIST VIEW FOR SIMULACROS */
            <div className="space-y-2">
              {SIMULACROS_DATA.map(sim => {
                const attempts = progress.examAttempts.filter(a => a.simulacroId === sim.id);
                const bestAttempt = attempts.length
                  ? attempts.reduce((prev, curr) => (curr.percentage > prev.percentage ? curr : prev))
                  : null;

                return (
                  <div
                    key={sim.id}
                    onClick={() => onStartSimulacro(sim)}
                    className="card-3d rounded-xl p-3 flex items-center justify-between gap-3 cursor-pointer active:scale-[0.99] transition"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span className="font-mono text-xs font-extrabold px-2 py-1 rounded bg-red-950 text-red-300 border border-red-800 flex-shrink-0">
                        S{sim.number}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs sm:text-sm text-stone-100 truncate">
                            {sim.title}
                          </h4>
                          {bestAttempt && (
                            <span
                              className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded flex-shrink-0 ${
                                bestAttempt.passed
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  : 'bg-red-950 text-red-300 border border-red-800'
                              }`}
                            >
                              {bestAttempt.percentage}%
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400 mt-0.5">
                          <span>⏱️ {sim.durationMinutes} min</span>
                          <span>•</span>
                          <span>{sim.questions.length} reactivos</span>
                          <span>•</span>
                          <span className="truncate">{sim.categoriesText}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartSimulacro(sim);
                      }}
                      className="btn-3d-base btn-3d-red px-3 py-1.5 rounded-lg font-mono text-xs font-bold flex items-center gap-1 cursor-pointer flex-shrink-0"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{bestAttempt ? 'Repetir' : 'Iniciar'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            /* DETAILED CARDS VIEW FOR SIMULACROS */
            <div className="grid md:grid-cols-2 gap-4">
              {SIMULACROS_DATA.map(sim => {
                const attempts = progress.examAttempts.filter(a => a.simulacroId === sim.id);
                const bestAttempt = attempts.length
                  ? attempts.reduce((prev, curr) => (curr.percentage > prev.percentage ? curr : prev))
                  : null;

                return (
                  <div
                    key={sim.id}
                    className="card-3d rounded-xl p-5 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded font-mono text-xs font-bold bg-red-500/15 text-red-300 border border-red-500/30 shadow-sm">
                          SIMULACRO {sim.number}
                        </span>

                        {bestAttempt ? (
                          <span
                            className={`px-2.5 py-0.5 rounded font-mono text-xs font-bold flex items-center gap-1 shadow-sm ${
                              bestAttempt.passed
                                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60'
                                : 'bg-red-950/80 text-red-300 border border-red-700/60'
                            }`}
                          >
                            {bestAttempt.passed ? (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5" />
                            )}
                            Mejor: {bestAttempt.percentage}%
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-stone-400">Sin intentos</span>
                        )}
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-stone-100 group-hover:text-red-300 transition">
                          {sim.title}
                        </h4>
                        <p className="text-xs text-stone-400 mt-1 font-mono">{sim.subtitle}</p>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono text-stone-300 bg-stone-950/80 p-2.5 rounded-lg border border-stone-850 shadow-inner">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-400" /> {sim.durationMinutes} min
                        </span>
                        <span>•</span>
                        <span>{sim.questions.length} preguntas de opción múltiple</span>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-800 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-stone-400">
                        {attempts.length} {attempts.length === 1 ? 'intento registrado' : 'intentos registrados'}
                      </span>

                      <button
                        onClick={() => onStartSimulacro(sim)}
                        className="btn-3d-base btn-3d-red px-4 py-2 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" /> Iniciar Simulacro
                      </button>
                    </div>
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

