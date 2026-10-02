import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  Shield,
  Video,
  Volume2,
  FileText,
  HelpCircle,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { ALL_PORTIONS } from '../data/emsRepository';
import { useEMSProgress } from '../context/ProgressContext';
import { Category } from '../types/ems';

interface CategoriesListViewProps {
  onSelectPortion: (portionId: string) => void;
  initialCategoryId?: number;
}

export const CategoriesListView: React.FC<CategoriesListViewProps> = ({
  onSelectPortion,
  initialCategoryId = 1
}) => {
  const { progress } = useEMSProgress();
  const [selectedCatId, setSelectedCatId] = useState<number>(initialCategoryId);
  // Default to compact list for space saving
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('list');
  // Resumen-Llave view mode and collapse state (default collapsed: true, view: list)
  const [keyConceptsViewMode, setKeyConceptsViewMode] = useState<'cards' | 'list'>('list');
  const [isKeyConceptsCollapsed, setIsKeyConceptsCollapsed] = useState(true);
  // Category portions collapsible state (default collapsed: true)
  const [isPortionsCollapsed, setIsPortionsCollapsed] = useState(true);
  const [isCategoryHeaderCollapsed, setIsCategoryHeaderCollapsed] = useState(true);

  const selectedCategory: Category =
    CATEGORIES_DATA.find(c => c.id === selectedCatId) || CATEGORIES_DATA[0];

  const categoryPortions = ALL_PORTIONS.filter(p => p.categoryId === selectedCatId);

  const completedInCategory = categoryPortions.filter(p =>
    progress.completedPortionIds.includes(p.id)
  ).length;
  const pctCategory = categoryPortions.length
    ? Math.round((completedInCategory / categoryPortions.length) * 100)
    : 0;

  return (
    <div className="space-y-5 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* Doctrinal Module Banner with 3D Window */}
      <div className="window-3d rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm">
              TEMAS 1 AL 8: CONTENIDO DOCTRINAL
            </span>
            <span className="text-[11px] font-mono text-stone-400">
              8 Categorías Oficiales
            </span>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-stone-100 mt-1">
            Módulo Doctrinal del Compendio Militar EMS 2026
          </h2>
        </div>
      </div>

      {/* Category selector grid - 9:16 friendly with 3D Tactile Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-2">
        {CATEGORIES_DATA.map(cat => {
          const portions = ALL_PORTIONS.filter(p => p.categoryId === cat.id);
          const isSelected = selectedCatId === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCatId(cat.id)}
              className={`btn-3d-base p-2.5 sm:p-3 rounded-xl border text-left flex flex-col justify-between cursor-pointer min-w-0 ${
                isSelected
                  ? 'btn-3d-amber ring-2 ring-amber-400/50'
                  : 'card-3d'
              }`}
            >
              <div className="flex items-center justify-between mb-1 w-full">
                <span className={`font-mono text-[11px] sm:text-xs font-extrabold ${isSelected ? 'text-stone-950' : 'text-amber-400'}`}>
                  CAT. {cat.number}
                </span>
                <span
                  className={`text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                    cat.examWeight === 'ALTO'
                      ? isSelected ? 'bg-red-900/80 text-white' : 'bg-red-950 text-red-400 border border-red-800/60'
                      : isSelected ? 'bg-amber-900/40 text-stone-900' : 'bg-stone-800 text-stone-300'
                  }`}
                >
                  {cat.examWeight}
                </span>
              </div>

              <h4 className={`text-[11px] sm:text-xs font-semibold line-clamp-2 leading-tight ${isSelected ? 'text-stone-950 font-bold' : 'text-stone-200'}`}>
                {cat.shortName}
              </h4>

              <div className={`mt-1.5 text-[9px] sm:text-[10px] font-mono ${isSelected ? 'text-stone-900/90 font-bold' : 'text-stone-400'}`}>
                {cat.portionsCount} porciones
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Category Details with 3D Window */}
      <div className="window-3d rounded-xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 shadow-sm">
                CATEGORÍA {selectedCategory.number}
              </span>
              <span
                className={`text-[11px] sm:text-xs px-2.5 py-0.5 rounded font-mono font-bold ${
                  selectedCategory.examWeight === 'ALTO'
                    ? 'bg-red-950 text-red-400 border border-red-800'
                    : 'bg-stone-800 text-stone-300'
                }`}
              >
                PESO EN EL EXAMEN: {selectedCategory.examWeight}
              </span>
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-stone-100 mt-1">
              📖 {selectedCategory.name}
            </h3>
            <p className="text-xs text-stone-400 mt-1">{selectedCategory.description}</p>
          </div>

          <div className="bg-stone-950/90 px-3.5 py-2.5 rounded-xl border border-stone-800 text-xs font-mono space-y-1 self-start md:self-auto w-full md:w-auto shadow-inner">
            <div className="text-stone-400">
              <strong className="text-amber-400">D.O.F.:</strong> {selectedCategory.dofDate}
            </div>
            <div className="text-stone-400">
              <strong className="text-amber-400">Artículos Clave:</strong> {selectedCategory.keyArticles}
            </div>
          </div>
        </div>

        {/* Portions Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <h4 className="text-xs font-mono font-bold text-stone-300 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" /> División en Porciones de Estudio
            </h4>
            
            <div className="flex items-center gap-2">
              {/* Compact List Mode Toggle for Mobile space saving */}
              <div className="flex items-center bg-stone-950 p-0.5 rounded-lg border border-stone-800 shadow-inner">
                <button
                  type="button"
                  onClick={() => setViewMode('cards')}
                  className={`px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1 transition ${
                    viewMode === 'cards'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Vista en Tarjetas"
                >
                  <LayoutGrid className="w-3 h-3" />
                  <span className="hidden sm:inline">Tarjetas</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1 transition ${
                    viewMode === 'list'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Lista Compacta (Ahorro de Espacio Móvil)"
                >
                  <List className="w-3 h-3" />
                  <span>Lista</span>
                </button>
              </div>

              <span className="text-xs font-mono text-stone-400 hidden sm:inline">
                Avance: <strong className="text-emerald-400">{completedInCategory}</strong> / {categoryPortions.length}
              </span>

              {/* Collapse Portions toggle */}
              <button
                onClick={() => setIsPortionsCollapsed(!isPortionsCollapsed)}
                className="p-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-400 hover:text-amber-400 transition cursor-pointer flex items-center gap-1 text-[11px] font-mono"
                title={isPortionsCollapsed ? 'Desplegar porciones' : 'Colapsar porciones'}
              >
                {isPortionsCollapsed ? (
                  <>
                    <ChevronDown className="w-4 h-4 text-amber-400" />
                    <span className="text-[10px] text-amber-400 font-bold hidden sm:inline">Desplegar</span>
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

          {!isPortionsCollapsed && (
            <>
          {/* Mobile Portions Display (Either Cards or Compact List for Space Saving) */}
          <div className="md:hidden">
            {viewMode === 'list' ? (
              /* COMPACT LIST VIEW */
              <div className="space-y-1.5">
                {categoryPortions.map(p => {
                  const isDone = progress.completedPortionIds.includes(p.id);
                  const score = progress.quizScores[p.id];

                  return (
                    <div
                      key={p.id}
                      onClick={() => onSelectPortion(p.id)}
                      className="card-3d rounded-lg p-2.5 flex items-center justify-between gap-2.5 cursor-pointer active:scale-[0.99] transition"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        {isDone ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-stone-600 flex-shrink-0 inline-block"></span>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex-shrink-0">
                              {p.portionNumber}
                            </span>
                            <span className="font-bold text-xs text-stone-100 truncate">
                              {p.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400 mt-0.5">
                            <span className="truncate">{p.articles}</span>
                            <span>•</span>
                            <span className="flex-shrink-0">⏱️ {p.durationMinutes}m</span>
                            {score !== undefined && (
                              <span className="text-emerald-400 font-bold ml-auto flex-shrink-0">
                                {score}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPortion(p.id);
                        }}
                        className={`btn-3d-base px-2.5 py-1.5 rounded-md text-[11px] font-mono font-bold flex-shrink-0 flex items-center gap-1 cursor-pointer ${
                          isDone
                            ? 'btn-3d-emerald text-emerald-300'
                            : 'btn-3d-amber text-stone-950'
                        }`}
                      >
                        <span>{isDone ? 'Repasar' : 'Estudiar'}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* DETAILED CARDS VIEW */
              <div className="space-y-2.5">
                {categoryPortions.map(p => {
                  const isDone = progress.completedPortionIds.includes(p.id);
                  const score = progress.quizScores[p.id];

                  return (
                    <div
                      key={p.id}
                      onClick={() => onSelectPortion(p.id)}
                      className="card-3d rounded-xl p-3.5 cursor-pointer space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1.5 font-mono text-xs font-bold text-amber-400">
                          {isDone ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <span className="w-3.5 h-3.5 rounded-full border border-stone-600 inline-block"></span>
                          )}
                          Porción {p.portionNumber}
                        </span>

                        <span className="text-[10px] font-mono text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                          {p.durationMinutes} min
                        </span>
                      </div>

                      <div>
                        <h5 className="text-xs font-semibold text-stone-100 leading-snug">
                          {p.title}
                        </h5>
                        <p className="text-[11px] text-stone-400 font-mono mt-0.5">
                          {p.articles}
                        </p>
                      </div>

                      {/* Resource Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                        <span className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800 text-blue-400 flex items-center gap-1">
                          <Video className="w-3 h-3" /> Video
                        </span>
                        <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800 text-amber-400 flex items-center gap-1">
                          <Volume2 className="w-3 h-3" /> Audio
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-400 flex items-center gap-1">
                          <FileText className="w-3 h-3" /> Caso
                        </span>
                        <span className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800 text-purple-300">
                          {p.flashcards.length} tarjetas
                        </span>
                        {score !== undefined && (
                          <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold">
                            Quiz: {score}%
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPortion(p.id);
                        }}
                        className={`btn-3d-base w-full py-2 rounded-lg font-mono text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer mt-1 ${
                          isDone
                            ? 'btn-3d-emerald text-emerald-300'
                            : 'btn-3d-amber text-stone-950'
                        }`}
                      >
                        <span>{isDone ? `Repasar Porción ${p.portionNumber}` : `Estudiar Porción ${p.portionNumber}`}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-stone-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-950 text-stone-400 border-b border-stone-800 font-mono">
                  <th className="py-2.5 px-3">Porción</th>
                  <th className="py-2.5 px-3">Tema Doctrinal</th>
                  <th className="py-2.5 px-3">Artículos</th>
                  <th className="py-2.5 px-3">Duración</th>
                  <th className="py-2.5 px-3 text-center">Video</th>
                  <th className="py-2.5 px-3 text-center">Audio</th>
                  <th className="py-2.5 px-3 text-center">Escenario</th>
                  <th className="py-2.5 px-3 text-center">Tarjetas</th>
                  <th className="py-2.5 px-3 text-center">Quiz</th>
                  <th className="py-2.5 px-3 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/70 font-sans">
                {categoryPortions.map(p => {
                  const isDone = progress.completedPortionIds.includes(p.id);
                  const score = progress.quizScores[p.id];

                  return (
                    <tr
                      key={p.id}
                      onClick={() => onSelectPortion(p.id)}
                      className="cursor-pointer hover:bg-stone-850/60 transition group"
                    >
                      <td className="py-3 px-3 font-mono font-bold text-amber-400 whitespace-nowrap">
                        <span className="flex items-center gap-1.5">
                          {isDone ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <span className="w-4 h-4 rounded-full border border-stone-600 inline-block"></span>
                          )}
                          {p.portionNumber}
                        </span>
                      </td>

                      <td className="py-3 px-3 font-semibold text-stone-200 group-hover:text-amber-300 transition">
                        {p.title}
                      </td>

                      <td className="py-3 px-3 font-mono text-stone-400 whitespace-nowrap">
                        {p.articles}
                      </td>

                      <td className="py-3 px-3 font-mono text-stone-400 whitespace-nowrap">
                        {p.durationMinutes} min
                      </td>

                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-blue-950/60 border border-blue-800 text-blue-400">
                          <Video className="w-3.5 h-3.5" />
                        </span>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-amber-950/60 border border-amber-800 text-amber-400">
                          <Volume2 className="w-3.5 h-3.5" />
                        </span>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-400">
                          <FileText className="w-3.5 h-3.5" />
                        </span>
                      </td>

                      <td className="py-3 px-3 text-center font-mono font-bold text-amber-300">
                        {p.flashcards.length}
                      </td>

                      <td className="py-3 px-3 text-center">
                        {score !== undefined ? (
                          <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                            {score}%
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-red-950/60 border border-red-800 text-red-400">
                            <HelpCircle className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectPortion(p.id);
                          }}
                          className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold transition flex items-center gap-1 mx-auto cursor-pointer"
                        >
                          Estudiar <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
            </>
          )}
        </div>

        {/* Resumen-Llave de la Categoría */}
        <div className="pt-2 border-t border-stone-800">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <h4 className="text-xs font-mono font-bold text-stone-300 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" /> Resumen-Llave de la Categoría
            </h4>

            <div className="flex items-center gap-2">
              {/* View Mode Toggle: Cards vs Compact List */}
              <div className="flex items-center bg-stone-950 p-0.5 rounded-lg border border-stone-800 shadow-inner">
                <button
                  type="button"
                  onClick={() => setKeyConceptsViewMode('cards')}
                  className={`px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1 transition ${
                    keyConceptsViewMode === 'cards'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Vista en Tarjetas"
                >
                  <LayoutGrid className="w-3 h-3" />
                  <span className="hidden sm:inline">Tarjetas</span>
                </button>
                <button
                  type="button"
                  onClick={() => setKeyConceptsViewMode('list')}
                  className={`px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1 transition ${
                    keyConceptsViewMode === 'list'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Lista Compacta (Ahorro de Espacio Móvil)"
                >
                  <List className="w-3 h-3" />
                  <span>Lista</span>
                </button>
              </div>

              {/* Collapse Toggle for Resumen-Llave (default collapsed: true) */}
              <button
                onClick={() => setIsKeyConceptsCollapsed(!isKeyConceptsCollapsed)}
                className="p-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-400 hover:text-amber-400 transition cursor-pointer flex items-center gap-1 text-[11px] font-mono"
                title={isKeyConceptsCollapsed ? 'Desplegar Resumen-Llave' : 'Colapsar Resumen-Llave'}
              >
                {isKeyConceptsCollapsed ? (
                  <>
                    <ChevronDown className="w-4 h-4 text-amber-400" />
                    <span className="text-[10px] text-amber-400 font-bold hidden sm:inline">Desplegar</span>
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

          {!isKeyConceptsCollapsed && (
            <>
              {keyConceptsViewMode === 'list' ? (
                /* COMPACT LIST VIEW FOR KEY CONCEPTS (Ahorro máximo de espacio) */
                <div className="space-y-1.5">
                  {selectedCategory.keyConcepts.map((item, idx) => (
                    <div
                      key={idx}
                      className="card-3d rounded-lg p-2.5 flex items-start sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-amber-300 font-mono text-xs">
                            {item.concept}
                          </span>
                          <span className="font-mono font-bold text-emerald-400 text-[11px] px-1.5 py-0.2 rounded bg-emerald-950/70 border border-emerald-800/60">
                            {item.article}
                          </span>
                        </div>
                        <p className="text-stone-300 text-xs mt-0.5 leading-snug">
                          {item.keyData}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* DETAILED CARDS / DESKTOP TABLE FOR KEY CONCEPTS */
                <>
                  <div className="sm:hidden space-y-2">
                    {selectedCategory.keyConcepts.map((item, idx) => (
                      <div key={idx} className="card-3d rounded-lg p-3 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-amber-300 font-mono text-xs">
                            {item.concept}
                          </span>
                          <span className="font-mono font-bold text-emerald-400 text-[11px]">
                            {item.article}
                          </span>
                        </div>
                        <p className="text-xs text-stone-200">
                          {item.keyData}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="hidden sm:block overflow-x-auto rounded-xl border border-stone-800">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-stone-950 text-stone-400 border-b border-stone-800 font-mono">
                          <th className="py-2.5 px-3 w-48">Concepto Militar</th>
                          <th className="py-2.5 px-3">Dato Clave para Examen</th>
                          <th className="py-2.5 px-3 w-40">Artículo</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-800/70 font-sans">
                        {selectedCategory.keyConcepts.map((item, idx) => (
                          <tr key={idx} className="hover:bg-stone-850/40 transition">
                            <td className="py-2.5 px-3 font-semibold text-amber-300 font-mono">
                              {item.concept}
                            </td>
                            <td className="py-2.5 px-3 text-stone-200">{item.keyData}</td>
                            <td className="py-2.5 px-3 font-mono font-bold text-emerald-400 whitespace-nowrap">
                              {item.article}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
