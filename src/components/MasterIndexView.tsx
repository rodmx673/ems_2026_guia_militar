import React, { useState } from 'react';
import {
  ListChecks,
  Compass,
  BookOpen,
  CheckCircle2,
  Circle,
  Video,
  Volume2,
  FileText,
  HelpCircle,
  Layers,
  Target,
  ArrowRight,
  Shield,
  Clock,
  Filter,
  Search,
  Award,
  ChevronRight,
  BarChart2,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { ALL_PORTIONS } from '../data/emsRepository';
import { SIMULACROS_DATA } from '../data/simulacrosData';
import { useEMSProgress } from '../context/ProgressContext';
import { Category, Portion } from '../types/ems';

interface MasterIndexViewProps {
  onSelectPortion: (portionId: string) => void;
  onSelectCategory: (categoryId: number) => void;
  onStartSimulacro: (simulacroId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const MasterIndexView: React.FC<MasterIndexViewProps> = ({
  onSelectPortion,
  onSelectCategory,
  onStartSimulacro,
  onNavigateTab
}) => {
  const { progress } = useEMSProgress();
  const [selectedCatFilter, setSelectedCatFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  // Responsive view mode for Section 2: 'cards' or 'list' (default to 'list' for agile mobile layout)
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('list');
  // Responsive view mode for Section 1 (Categories): 'cards' or 'list' (default to 'list' for agile layout)
  const [categoriesViewMode, setCategoriesViewMode] = useState<'cards' | 'list'>('list');

  // Collapsible section windows state (Default all to true so pages load collapsed for swift navigation)
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    header: true,
    categories: true,
    portions: true,
    resources: true,
    simulacros: true
  });

  const toggleSection = (sectionKey: string) => {
    setCollapsedSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  // Find first uncompleted portion or default to '1.1'
  const firstPendingPortion =
    ALL_PORTIONS.find(p => !progress.completedPortionIds.includes(p.id)) || ALL_PORTIONS[0];

  const completedCount = progress.completedPortionIds.length;
  const totalPortions = ALL_PORTIONS.length;
  const progressPct = Math.round((completedCount / totalPortions) * 100);

  const filteredPortions = ALL_PORTIONS.filter(portion => {
    const matchesCategory =
      selectedCatFilter === 'all' || portion.categoryId === selectedCatFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      portion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portion.portionNumber.includes(searchQuery) ||
      portion.articles.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden pb-10">
      {/* Header Banner with Deep 3D Frame */}
      <div className="window-3d rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow-sm">
                  <ListChecks className="w-3.5 h-3.5 text-amber-400" /> ÍNDICE MAESTRO DOCTRINAL
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono text-stone-400 bg-stone-800 border border-stone-750">
                  Plan de Estudios EMS 2026
                </span>
              </div>

              {/* Header Collapse Toggle */}
              <button
                onClick={() => toggleSection('header')}
                className="p-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-amber-400 transition cursor-pointer flex items-center gap-1 text-[11px] font-mono"
                title={collapsedSections.header ? 'Desplegar resumen' : 'Colapsar resumen'}
              >
                {collapsedSections.header ? (
                  <>
                    <ChevronDown className="w-4 h-4 text-amber-400" />
                    <span className="text-[10px] text-amber-400 hidden sm:inline">Desplegar</span>
                  </>
                ) : (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span className="text-[10px] hidden sm:inline">Colapsar</span>
                  </>
                )}
              </button>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-100 tracking-tight">
              Índice Maestro Doctrinal del Curso de Sargento 1/o.
            </h1>
            <p className="text-xs sm:text-sm text-stone-300">
              Mapa visual completo: 8 categorías, 46 porciones modulares, 460 tarjetas, 60 escenarios y 6 simulacros.
            </p>
          </div>

          {/* Primary Action Button (Tactile 3D) */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 flex-shrink-0">
            <button
              onClick={() => onSelectPortion(firstPendingPortion.id)}
              className="btn-3d-base btn-3d-amber px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm font-mono flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Ir a mi primera porción ({firstPendingPortion.portionNumber})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono text-stone-400 text-center">
              Recomendado: {firstPendingPortion.title}
            </span>
          </div>
        </div>

        {/* Global Progress Bar (Can be collapsed) */}
        {!collapsedSections.header && (
          <div className="pt-3 border-t border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-stone-300 flex items-center gap-1.5 font-semibold">
                <BarChart2 className="w-3.5 h-3.5 text-amber-400" /> Progreso General de Porciones:
              </span>
              <span className="text-amber-400 font-bold">
                {completedCount} de {totalPortions} porciones ({progressPct}%)
              </span>
            </div>
            <div className="w-full bg-stone-950 rounded-full h-2.5 overflow-hidden border border-stone-800 shadow-inner">
              <div
                className="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* SECTION 1: LAS 8 CATEGORÍAS DOCTRINALES */}
      <div className="window-3d rounded-xl p-3.5 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-800">
          <div>
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
              TEMAS 1 AL 8 • ESTRUCTURA GENERAL
            </span>
            <h3 className="text-sm sm:text-base font-bold text-stone-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" /> 1. Las 8 Categorías Doctrinales (Temas 1 al 8)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {/* View Mode Toggle for Categories (Mobile/Desktop space saver) */}
            <div className="flex items-center bg-stone-950 p-0.5 rounded-lg border border-stone-800 shadow-inner">
              <button
                type="button"
                onClick={() => setCategoriesViewMode('cards')}
                className={`px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1 transition ${
                  categoriesViewMode === 'cards'
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
                onClick={() => setCategoriesViewMode('list')}
                className={`px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1 transition ${
                  categoriesViewMode === 'list'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
                title="Lista Compacta (Ahorro de Espacio Móvil)"
              >
                <List className="w-3 h-3" />
                <span>Lista</span>
              </button>
            </div>

            {/* Collapse / Expand Toggle Button */}
            <button
              onClick={() => toggleSection('categories')}
              className="p-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-400 hover:text-amber-400 transition cursor-pointer flex items-center gap-1 text-[11px] font-mono"
              title={collapsedSections.categories ? 'Desplegar categorías' : 'Colapsar categorías'}
            >
              {collapsedSections.categories ? (
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

        {!collapsedSections.categories && (
          <>
            {/* 9:16 Mobile Responsive: Option between Cards or Compact List */}
            <div className="md:hidden">
              {categoriesViewMode === 'list' ? (
                /* COMPACT LIST VIEW FOR CATEGORIES */
                <div className="space-y-1.5">
                  {CATEGORIES_DATA.map(cat => {
                    const isHighWeight = cat.examWeight === 'ALTO';
                    const catPortions = ALL_PORTIONS.filter(p => p.categoryId === cat.id);
                    const completedInCat = catPortions.filter(p =>
                      progress.completedPortionIds.includes(p.id)
                    ).length;

                    return (
                      <div
                        key={cat.id}
                        onClick={() => onSelectCategory(cat.id)}
                        className="card-3d rounded-lg p-2.5 flex items-center justify-between gap-2.5 cursor-pointer active:scale-[0.99] transition"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <span className="font-mono text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm flex-shrink-0">
                            T{cat.number}
                          </span>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-xs text-stone-100 truncate">
                              {cat.name}
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400 mt-0.5">
                              <span className="text-amber-400/90 flex-shrink-0">{cat.portionsCount} Porc.</span>
                              <span>•</span>
                              <span className="text-emerald-400 flex-shrink-0">{completedInCat}/{cat.portionsCount} listas</span>
                              <span>•</span>
                              <span className={isHighWeight ? 'text-red-400' : 'text-stone-400'}>
                                {cat.examWeight}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            onSelectCategory(cat.id);
                          }}
                          className="btn-3d-base btn-3d-amber px-2.5 py-1.5 rounded-md text-[11px] font-mono font-bold flex-shrink-0 flex items-center gap-1 cursor-pointer"
                        >
                          <span>Explorar</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* DETAILED CARDS FOR CATEGORIES */
                <div className="space-y-3">
                  {CATEGORIES_DATA.map(cat => {
                    const isHighWeight = cat.examWeight === 'ALTO';
                    const catPortions = ALL_PORTIONS.filter(p => p.categoryId === cat.id);
                    const completedInCat = catPortions.filter(p =>
                      progress.completedPortionIds.includes(p.id)
                    ).length;

                    return (
                      <div
                        key={cat.id}
                        onClick={() => onSelectCategory(cat.id)}
                        className="card-3d rounded-xl p-3.5 space-y-3 cursor-pointer"
                      >
                        {/* Header row with badges */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm">
                              TEMA {cat.number}
                            </span>
                            <span className="font-mono text-[11px] text-stone-400">
                              {cat.portionsCount} Porciones
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wide ${
                                isHighWeight
                                  ? 'bg-red-950 text-red-400 border border-red-800'
                                  : 'bg-stone-800 text-stone-300 border border-stone-700'
                              }`}
                            >
                              PESO {cat.examWeight}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/70 border border-emerald-800/60 px-1.5 py-0.5 rounded">
                              {completedInCat}/{cat.portionsCount} listas
                            </span>
                          </div>
                        </div>

                        {/* Title & Description with full, complete visibility */}
                        <div className="space-y-1.5">
                          <h4 className="font-bold text-sm text-stone-100 leading-snug">
                            {cat.name}
                          </h4>
                          <p className="text-xs text-stone-300 leading-relaxed font-sans">
                            {cat.description}
                          </p>
                        </div>

                        {/* Key Articles pill */}
                        {cat.keyArticles && (
                          <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-300/90 bg-stone-900 px-2.5 py-1 rounded-md border border-stone-800 w-fit">
                            <BookOpen className="w-3 h-3 text-amber-400 flex-shrink-0" />
                            <span>Artículos: {cat.keyArticles}</span>
                          </div>
                        )}

                        {/* Action button: tactile 3D */}
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            onSelectCategory(cat.id);
                          }}
                          className="btn-3d-base btn-3d-stone w-full py-2.5 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Explorar Tema {cat.number} ({cat.portionsCount} Porciones)</span>
                          <ChevronRight className="w-4 h-4 text-amber-400" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-950 text-stone-400 border-b border-stone-800 font-mono">
                    <th className="py-2.5 px-3 w-12 text-center">#</th>
                    <th className="py-2.5 px-3">Categoría Doctrinal</th>
                    <th className="py-2.5 px-3 hidden md:table-cell">Artículos Clave</th>
                    <th className="py-2.5 px-3 text-center">Porciones</th>
                    <th className="py-2.5 px-3 text-center">Peso Examen</th>
                    <th className="py-2.5 px-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60 font-sans">
                  {CATEGORIES_DATA.map(cat => {
                    const isHighWeight = cat.examWeight === 'ALTO';
                    const catPortions = ALL_PORTIONS.filter(p => p.categoryId === cat.id);
                    const completedInCat = catPortions.filter(p =>
                      progress.completedPortionIds.includes(p.id)
                    ).length;

                    return (
                      <tr
                        key={cat.id}
                        onClick={() => onSelectCategory(cat.id)}
                        className="hover:bg-stone-850/60 transition cursor-pointer group"
                      >
                        <td className="py-3 px-3 text-center font-mono font-bold text-amber-400">
                          {cat.number}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-stone-100 group-hover:text-amber-400 transition">
                            {cat.name}
                          </div>
                          <div className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                            {cat.description}
                          </div>
                        </td>
                        <td className="py-3 px-3 font-mono text-stone-400 hidden md:table-cell">
                          {cat.keyArticles}
                        </td>
                        <td className="py-3 px-3 text-center font-mono">
                          <span className="text-stone-200">{cat.portionsCount}</span>
                          <span className="text-[10px] text-stone-400 block">
                            ({completedInCat} listas)
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                              isHighWeight
                                ? 'bg-red-950 text-red-400 border border-red-800'
                                : 'bg-stone-800 text-stone-300'
                            }`}
                          >
                            {cat.examWeight}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              onSelectCategory(cat.id);
                            }}
                            className="btn-3d-base btn-3d-stone px-2.5 py-1 rounded-lg text-xs font-mono inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>Explorar</span>
                            <ChevronRight className="w-3.5 h-3.5" />
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

      {/* SECTION 2: LAS 46 PORCIONES ORGANIZADAS */}
      <div className="window-3d rounded-xl p-3.5 sm:p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-stone-800">
          <div>
            <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider">
              DETALLE OPERATIVO
            </span>
            <h3 className="text-sm sm:text-base font-bold text-stone-100 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-400" /> 2. Las 46 Porciones de Estudio
            </h3>
          </div>

          {/* Filter, Search Bar & Compact List Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Toggle Button (Mobile & Desktop real estate saver) */}
            <div className="flex items-center bg-stone-950 p-0.5 rounded-lg border border-stone-800 shadow-inner">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`px-2 py-1 rounded-md text-[11px] font-mono font-bold flex items-center gap-1 transition ${
                  viewMode === 'cards'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
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
                className={`px-2 py-1 rounded-md text-[11px] font-mono font-bold flex items-center gap-1 transition ${
                  viewMode === 'list'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
                title="Vista de Lista Compacta (Ahorro de Espacio Móvil)"
              >
                <List className="w-3.5 h-3.5" />
                <span>Lista</span>
              </button>
            </div>

            <div className="relative flex-1 sm:flex-none">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar porción o artículo..."
                className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 shadow-inner"
              />
            </div>

            <select
              value={selectedCatFilter}
              onChange={e =>
                setSelectedCatFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
              }
              className="bg-stone-950 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-stone-200 focus:outline-none focus:border-amber-500 shadow-inner cursor-pointer"
            >
              <option value="all">Todas las Categorías (8)</option>
              {CATEGORIES_DATA.map(c => (
                <option key={c.id} value={c.id}>
                  Cat. {c.number}: {c.shortName}
                </option>
              ))}
            </select>

            {/* Section 2 Collapse Toggle */}
            <button
              onClick={() => toggleSection('portions')}
              className="p-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-400 hover:text-amber-400 transition cursor-pointer flex items-center gap-1 text-[11px] font-mono"
              title={collapsedSections.portions ? 'Desplegar porciones' : 'Colapsar porciones'}
            >
              {collapsedSections.portions ? (
                <>
                  <ChevronDown className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px] text-blue-400 font-bold hidden sm:inline">Desplegar</span>
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

        {!collapsedSections.portions && (
          <>
        {/* 9:16 Mobile Responsive: Option between Cards or Compact List */}
        <div className="md:hidden">
          {viewMode === 'list' ? (
            /* COMPACT LIST MODE (Maximum space saving on smartphones) */
            <div className="space-y-1.5">
              {filteredPortions.map(p => {
                const isCompleted = progress.completedPortionIds.includes(p.id);

                return (
                  <div
                    key={p.id}
                    onClick={() => onSelectPortion(p.id)}
                    className="card-3d rounded-lg p-2.5 flex items-center justify-between gap-2.5 cursor-pointer active:scale-[0.99] transition"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-stone-500 flex-shrink-0" />
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
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        onSelectPortion(p.id);
                      }}
                      className={`btn-3d-base px-2.5 py-1.5 rounded-md text-[11px] font-mono font-bold flex-shrink-0 flex items-center gap-1 cursor-pointer ${
                        isCompleted
                          ? 'btn-3d-emerald text-emerald-300'
                          : 'btn-3d-amber text-stone-950'
                      }`}
                    >
                      <span>{isCompleted ? 'Repasar' : 'Estudiar'}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            /* DETAILED CARDS MODE (9:16 Mobile Cards with full 3D) */
            <div className="space-y-2.5">
              {filteredPortions.map(p => {
                const isCompleted = progress.completedPortionIds.includes(p.id);

                return (
                  <div
                    key={p.id}
                    onClick={() => onSelectPortion(p.id)}
                    className="card-3d rounded-xl p-3.5 space-y-2.5 transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Porción {p.portionNumber}
                        </span>
                        <span className="text-[11px] font-mono text-stone-400">
                          ⏱️ {p.durationMinutes} min
                        </span>
                      </div>

                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold flex items-center gap-1 ${
                          isCompleted
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-stone-800 text-stone-400 border border-stone-700'
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Completada</span>
                          </>
                        ) : (
                          <>
                            <Circle className="w-3.5 h-3.5 text-stone-500" />
                            <span>Pendiente</span>
                          </>
                        )}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-stone-100 leading-snug">
                        {p.title}
                      </h4>
                      <p className="text-[11px] font-mono text-stone-400 mt-1">
                        Artículos: {p.articles}
                      </p>
                    </div>

                    {/* Resource quick tags */}
                    <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400 pt-1 border-t border-stone-800/60 flex-wrap">
                      <span className="flex items-center gap-1 text-red-400">
                        <Video className="w-3 h-3" /> Video
                      </span>
                      <span className="flex items-center gap-1 text-amber-400">
                        <Volume2 className="w-3 h-3" /> Audio
                      </span>
                      <span className="flex items-center gap-1 text-emerald-400">
                        <FileText className="w-3 h-3" /> Escenario
                      </span>
                      <span className="flex items-center gap-1 text-amber-400">
                        <Layers className="w-3 h-3" /> 10 Tarjetas
                      </span>
                      <span className="flex items-center gap-1 text-red-400">
                        <HelpCircle className="w-3 h-3" /> Quiz
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        onSelectPortion(p.id);
                      }}
                      className={`btn-3d-base w-full py-2.5 px-3 rounded-lg text-xs font-mono font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                        isCompleted
                          ? 'btn-3d-emerald text-emerald-300'
                          : 'btn-3d-amber text-stone-950 font-extrabold'
                      }`}
                    >
                      <span>{isCompleted ? `Repasar Porción ${p.portionNumber}` : `Estudiar Porción ${p.portionNumber}`}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-950 text-stone-400 border-b border-stone-800 font-mono">
                <th className="py-2.5 px-3 w-16 text-center">Estado</th>
                <th className="py-2.5 px-3 w-20">Código</th>
                <th className="py-2.5 px-3">Título de la Porción</th>
                <th className="py-2.5 px-3 hidden sm:table-cell">Artículos</th>
                <th className="py-2.5 px-3 hidden md:table-cell text-center">Recursos</th>
                <th className="py-2.5 px-3 text-center">Duración</th>
                <th className="py-2.5 px-3 text-right">Estudio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 font-sans">
              {filteredPortions.map(p => {
                const isCompleted = progress.completedPortionIds.includes(p.id);

                return (
                  <tr
                    key={p.id}
                    onClick={() => onSelectPortion(p.id)}
                    className="hover:bg-stone-850/60 transition cursor-pointer group"
                  >
                    <td className="py-2.5 px-3 text-center">
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                      ) : (
                        <Circle className="w-4 h-4 text-stone-600 mx-auto" />
                      )}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-amber-400">
                      {p.portionNumber}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-stone-100 group-hover:text-amber-400 transition">
                        {p.title}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-stone-400 font-mono text-[11px] hidden sm:table-cell">
                      {p.articles}
                    </td>
                    <td className="py-2.5 px-3 text-center hidden md:table-cell">
                      <div className="flex items-center justify-center gap-1.5 text-stone-400">
                        <span title="Video YouTube In-App" className="text-red-400">
                          <Video className="w-3.5 h-3.5" />
                        </span>
                        <span title="Audio interactivo" className="text-amber-400">
                          <Volume2 className="w-3.5 h-3.5" />
                        </span>
                        <span title="Escenario táctico" className="text-emerald-400">
                          <FileText className="w-3.5 h-3.5" />
                        </span>
                        <span title="Tarjetas mnemotécnicas" className="text-amber-400">
                          <Layers className="w-3.5 h-3.5" />
                        </span>
                        <span title="Quiz de porción" className="text-red-400">
                          <HelpCircle className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono text-stone-400 text-[11px]">
                      {p.durationMinutes} min
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onSelectPortion(p.id);
                        }}
                        className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition cursor-pointer ${
                          isCompleted
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold'
                        }`}
                      >
                        {isCompleted ? 'Repasar' : 'Comenzar'}
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

      {/* SECTION 3: RECURSOS DISPONIBLES */}
      <div className="window-3d rounded-xl p-3.5 sm:p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
              HERRAMIENTAS PEDAGÓGICAS
            </span>
            <h3 className="text-sm sm:text-base font-bold text-stone-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> 3. Recursos Disponibles en la Plataforma
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 font-mono hidden sm:inline">
              6 tipos de recursos integrados
            </span>
            <button
              onClick={() => toggleSection('resources')}
              className="p-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-400 hover:text-amber-400 transition cursor-pointer flex items-center gap-1 text-[11px] font-mono"
              title={collapsedSections.resources ? 'Desplegar recursos' : 'Colapsar recursos'}
            >
              {collapsedSections.resources ? (
                <>
                  <ChevronDown className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] text-emerald-400 font-bold hidden sm:inline">Desplegar</span>
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

        {!collapsedSections.resources && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="card-3d p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
                <Video className="w-4 h-4" /> Videos YouTube In-App
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-850">
                46 videos
              </span>
            </div>
            <p className="text-xs text-stone-300">
              Reproducción directa sin salir de la app, con teleprompter, cambio de enlace y sincronización de minutos.
            </p>
          </div>

          <div className="card-3d p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4" /> Audios Interactivos
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-850">
                46 audios
              </span>
            </div>
            <p className="text-xs text-stone-300">
              Síntesis de voz ajustable (0.75x a 1.5x) con guion completo y cierre doctrinal para memorización.
            </p>
          </div>

          <div className="card-3d p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Casos y Escenarios
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-850">
                60 casos
              </span>
            </div>
            <p className="text-xs text-stone-300">
              Dilemas de mando realistas con preguntas de criterio militar y fundamento legal de resolución.
            </p>
          </div>

          <div className="card-3d p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4" /> Tarjetas Mnemotécnicas
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-850">
                460 tarjetas
              </span>
            </div>
            <p className="text-xs text-stone-300">
              Mazo interactivo volteable por categoría o global para afianzar artículos y definiciones exactas.
            </p>
            <button
              onClick={() => onNavigateTab('flashcards')}
              className="text-[11px] font-mono text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1 cursor-pointer pt-1"
            >
              <span>Abrir mazo de tarjetas</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="card-3d p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" /> Quizzes de Comprobación
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-850">
                230 reactivos
              </span>
            </div>
            <p className="text-xs text-stone-300">
              5 preguntas por porción con explicación inmediata y registro de preguntas falladas.
            </p>
            <button
              onClick={() => onNavigateTab('quizzes')}
              className="text-[11px] font-mono text-red-400 hover:text-red-300 font-semibold inline-flex items-center gap-1 cursor-pointer pt-1"
            >
              <span>Ver centro de quizzes</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="card-3d p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-blue-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Repaso por Artículos
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-850">
                Examen focalizado
              </span>
            </div>
            <p className="text-xs text-stone-300">
              Evaluación profunda agrupada por cada artículo de la ley para asegurar cero errores en la prueba.
            </p>
          </div>
        </div>
        )}
      </div>

      {/* SECTION 4: LOS 6 SIMULACROS DE EVALUACIÓN */}
      <div className="window-3d rounded-xl p-3.5 sm:p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div>
            <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">
              EVALUACIÓN OFICIAL DE ASCENSO
            </span>
            <h3 className="text-sm sm:text-base font-bold text-stone-100 flex items-center gap-2">
              <Target className="w-4 h-4 text-red-400" /> 4. Los 6 Simulacros Tipo Examen Oficial
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 font-mono hidden sm:inline">
              Puntaje mínimo: 80%
            </span>
            <button
              onClick={() => toggleSection('simulacros')}
              className="p-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-400 hover:text-amber-400 transition cursor-pointer flex items-center gap-1 text-[11px] font-mono"
              title={collapsedSections.simulacros ? 'Desplegar simulacros' : 'Colapsar simulacros'}
            >
              {collapsedSections.simulacros ? (
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

        {!collapsedSections.simulacros && (
          <>
            {/* 9:16 Mobile Responsive Vertical Cards (Clean spacing, full button text) */}
            <div className="md:hidden space-y-3">
          {SIMULACROS_DATA.map(sim => {
            const passedAttempt = progress.examAttempts.find(
              a => a.simulacroId === sim.id && a.passed
            );

            return (
              <div
                key={sim.id}
                onClick={() => onStartSimulacro(sim.id)}
                className="card-3d rounded-xl p-3.5 space-y-2.5 transition cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
                    SIMULACRO {sim.number}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-stone-400">
                    <span>⏱️ {sim.durationMinutes} min</span>
                    <span>•</span>
                    <span className="text-amber-400 font-bold">{sim.totalQuestions} reactivos</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-stone-100 leading-snug">
                    {sim.title}
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">{sim.subtitle}</p>
                </div>

                <div className="text-[11px] font-mono text-stone-400 bg-stone-900/90 px-2.5 py-1 rounded border border-stone-800">
                  Materias: {sim.categoriesText}
                </div>

                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    onStartSimulacro(sim.id);
                  }}
                  className={`btn-3d-base w-full py-2.5 px-3 rounded-lg text-xs font-mono font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                    passedAttempt
                      ? 'btn-3d-emerald text-emerald-300'
                      : 'btn-3d-crimson text-white font-extrabold'
                  }`}
                >
                  <span>
                    {passedAttempt
                      ? `Repetir Simulacro ${sim.number} (Aprobado: ${passedAttempt.score}%)`
                      : `Iniciar Simulacro ${sim.number} (100 Reactivos)`}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-950 text-stone-400 border-b border-stone-800 font-mono">
                <th className="py-2.5 px-3 w-12 text-center">#</th>
                <th className="py-2.5 px-3">Título del Simulacro</th>
                <th className="py-2.5 px-3 hidden sm:table-cell">Materias Incluidas</th>
                <th className="py-2.5 px-3 text-center">Preguntas</th>
                <th className="py-2.5 px-3 text-center">Duración</th>
                <th className="py-2.5 px-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 font-sans">
              {SIMULACROS_DATA.map(sim => {
                const passedAttempt = progress.examAttempts.find(
                  a => a.simulacroId === sim.id && a.passed
                );

                return (
                  <tr
                    key={sim.id}
                    onClick={() => onStartSimulacro(sim.id)}
                    className="hover:bg-stone-850/60 transition cursor-pointer group"
                  >
                    <td className="py-3 px-3 text-center font-mono font-bold text-red-400">
                      {sim.number}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-stone-100 group-hover:text-red-400 transition">
                        {sim.title}
                      </div>
                      <div className="text-[11px] text-stone-400">{sim.subtitle}</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-stone-400 text-[11px] hidden sm:table-cell">
                      {sim.categoriesText}
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-stone-200">
                      {sim.totalQuestions} reactivos
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-stone-300">
                      {sim.durationMinutes} min
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onStartSimulacro(sim.id);
                        }}
                        className={`btn-3d-base px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                          passedAttempt
                            ? 'btn-3d-emerald text-emerald-300'
                            : 'btn-3d-crimson text-white'
                        }`}
                      >
                        {passedAttempt ? `Aprobado (${passedAttempt.score}%)` : 'Iniciar'}
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

      {/* Final Action Footing Banner */}
      <div className="window-3d rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-stone-100 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            ¡Mapa general asimilado! Es momento de iniciar el estudio doctrinal.
          </h4>
          <p className="text-xs text-stone-400 mt-0.5">
            Comienza con la <strong>Porción 1.1: Principios Generales de la Disciplina Militar</strong>.
          </p>
        </div>

        <button
          onClick={() => onSelectPortion(firstPendingPortion.id)}
          className="btn-3d-base btn-3d-amber w-full sm:w-auto px-6 py-3 rounded-xl font-bold font-mono text-xs sm:text-sm flex items-center justify-center gap-2 transition flex-shrink-0 cursor-pointer"
        >
          <span>Ir a mi primera porción ({firstPendingPortion.portionNumber})</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
