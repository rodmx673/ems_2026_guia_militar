import React, { useState } from 'react';
import { Flame, CheckCircle, Award, BookOpen, Layers, Play, Video, Volume2, FileText, HelpCircle, Bot, BarChart3, Target, ArrowRight, Copy, Check, ChevronRight } from 'lucide-react';
import { useEMSProgress } from '../context/ProgressContext';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { ALL_PORTIONS } from '../data/emsRepository';

interface DashboardViewProps {
  onNavigate: (view: string, param?: any) => void;
  onSelectPortion: (portionId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onSelectPortion
}) => {
  const { progress } = useEMSProgress();
  const [showMarkdownModal, setShowMarkdownModal] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  const totalPortions = 46;
  const completedPortionsCount = progress.completedPortionIds.length;
  const totalCardsGoal = 460;
  const masteredCardsCount = progress.masteredFlashcardIds.length;
  const totalSimulacrosGoal = 6;
  const passedSimulacrosCount = progress.examAttempts.filter(a => a.passed).length;

  const totalPercentage = Math.min(
    100,
    Math.round(
      ((completedPortionsCount / totalPortions) * 0.4 +
        (masteredCardsCount / totalCardsGoal) * 0.3 +
        (passedSimulacrosCount / totalSimulacrosGoal) * 0.3) *
        100
    )
  );

  const nextPortion =
    ALL_PORTIONS.find(p => !progress.completedPortionIds.includes(p.id)) || ALL_PORTIONS[0];

  const generateMarkdownParte1 = () => {
    let md = `🎖️ EMS 2026 – WORKBOOK\n\n`;
    md += `Curso de Formación de Sargento 1/o. de Infantería y Fuerza Aérea Fusilero Paracaidista\n\n`;
    md += `📊 MI PROGRESO\n\n`;
    md += `| Métrica | Valor |\n`;
    md += `| :--- | :--- |\n`;
    md += `| Racha de estudio | ${progress.streakDays} días |\n`;
    md += `| Porciones completadas | ${completedPortionsCount} / ${totalPortions} |\n`;
    md += `| Tarjetas dominadas | ${masteredCardsCount} / ${totalCardsGoal} |\n`;
    md += `| Simulacros aprobados | ${passedSimulacrosCount} / ${totalSimulacrosGoal} |\n`;
    md += `| % Avance total | ${totalPercentage} % |\n\n`;

    md += `📅 RUTA DEL DÍA\n\n`;
    md += `Hoy toca: Porción ${nextPortion.portionNumber} – ${nextPortion.title} (${nextPortion.articles}, ${nextPortion.durationMinutes} min)\n\n`;

    md += `🗂️ CATEGORÍAS\n\n`;
    md += `| # | Categoría | Porciones | Progreso |\n`;
    md += `| :---: | :--- | :---: | :---: |\n`;

    CATEGORIES_DATA.forEach(cat => {
      const portions = ALL_PORTIONS.filter(p => p.categoryId === cat.id);
      const completed = portions.filter(p => progress.completedPortionIds.includes(p.id)).length;
      const pct = portions.length ? Math.round((completed / portions.length) * 100) : 0;
      md += `| ${cat.number} | ${cat.name} | ${cat.portionsCount} | ${pct}% |\n`;
    });

    md += `\n🎯 ACCESOS RÁPIDOS\n\n`;
    md += `· 🎥 Videos\n`;
    md += `· 🎧 Audios\n`;
    md += `· 🃏 Tarjetas\n`;
    md += `· 📝 Escenarios\n`;
    md += `· ❓ Quizzes\n`;
    md += `· 🤖 Asistente\n`;
    md += `· 📊 Progreso\n`;
    md += `· 🎯 Simulacros\n`;

    return md;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownParte1());
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2500);
  };

  return (
    <div className="space-y-5 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* Top Banner with 3D Window Frame */}
      <div className="window-3d rounded-2xl p-4 sm:p-6 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow-sm">
                🎖️ SEDENA • ESCUELA MILITAR DE SARGENTOS
              </span>
              <span className="text-[11px] font-mono text-stone-400">Promoción 2026</span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-100 tracking-tight leading-tight">
              🎖️ EMS 2026 – WORKBOOK INTEGRAL
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Curso de Formación de Sargento 1/o. de Infantería y Fusileros Paracaidistas. Cuaderno digital centralizado, autoevaluable y fundamentado en el Compendio Oficial.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => setShowMarkdownModal(true)}
              className="btn-3d-base btn-3d-stone px-3.5 py-2.5 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Exportar Markdown
            </button>

            <button
              onClick={() => onSelectPortion(nextPortion.id)}
              className="btn-3d-base btn-3d-amber px-4 py-2.5 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Iniciar Estudio de Hoy
            </button>
          </div>
        </div>
      </div>

      {/* Progress Metric Cards - 9:16 Friendly with 3D Elevation */}
      <div>
        <h2 className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider mb-2.5 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-amber-400" /> 📊 MI PROGRESO DE FORMACIÓN EMS
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3.5">
          <div className="card-3d rounded-xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 flex-shrink-0 shadow-sm">
              <Flame className="w-5 h-5 animate-bounce" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] sm:text-[11px] font-mono text-stone-400 block truncate">Racha de estudio</span>
              <div className="text-base sm:text-xl font-bold font-mono text-stone-100">
                {progress.streakDays} <span className="text-[10px] sm:text-xs font-normal text-stone-400">días</span>
              </div>
            </div>
          </div>

          <div className="card-3d rounded-xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0 shadow-sm">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] sm:text-[11px] font-mono text-stone-400 block truncate">Porciones listas</span>
              <div className="text-base sm:text-xl font-bold font-mono text-stone-100 truncate">
                {completedPortionsCount}{' '}
                <span className="text-[10px] sm:text-xs font-normal text-stone-400">/ {totalPortions}</span>
              </div>
            </div>
          </div>

          <div className="card-3d rounded-xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0 shadow-sm">
              <Layers className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] sm:text-[11px] font-mono text-stone-400 block truncate">Tarjetas</span>
              <div className="text-base sm:text-xl font-bold font-mono text-stone-100 truncate">
                {masteredCardsCount}{' '}
                <span className="text-[10px] sm:text-xs font-normal text-stone-400">/ {totalCardsGoal}</span>
              </div>
            </div>
          </div>

          <div className="card-3d rounded-xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0 shadow-sm">
              <Target className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] sm:text-[11px] font-mono text-stone-400 block truncate">Simulacros</span>
              <div className="text-base sm:text-xl font-bold font-mono text-stone-100 truncate">
                {passedSimulacrosCount}{' '}
                <span className="text-[10px] sm:text-xs font-normal text-stone-400">/ {totalSimulacrosGoal}</span>
              </div>
            </div>
          </div>

          <div className="card-3d rounded-xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 col-span-2 sm:col-span-1 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0 shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] sm:text-[11px] font-mono text-stone-400 block truncate">% Avance Total</span>
              <div className="text-base sm:text-xl font-bold font-mono text-amber-400">
                {totalPercentage}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ruta del Día with 3D Window Frame */}
      <div className="window-3d rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 border-amber-500/40">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-mono font-bold text-xs sm:text-sm flex-shrink-0 shadow-sm">
            HOY
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">
                📅 RUTA DEL DÍA RECOMENDADA:
              </span>
              <span className="text-[10px] sm:text-xs font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300">
                Porción {nextPortion.portionNumber}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-stone-100 mt-0.5 truncate">
              {nextPortion.title}
            </h3>
            <p className="text-[11px] text-stone-400 font-mono mt-0.5 truncate">
              {nextPortion.articles} • Tiempo estimado: {nextPortion.durationMinutes} min
            </p>
          </div>
        </div>

        <button
          onClick={() => onSelectPortion(nextPortion.id)}
          className="btn-3d-base btn-3d-amber flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs font-bold w-full md:w-auto cursor-pointer flex-shrink-0"
        >
          Iniciar Porción {nextPortion.portionNumber} <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Accesos Rápidos - 4 cols on mobile fits 9:16 perfectly */}
      <div>
        <h2 className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider mb-2.5">
          🎯 ACCESOS RÁPIDOS
        </h2>

        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-2.5">
          <button
            onClick={() => onNavigate('categories')}
            className="btn-3d-base card-3d p-2 sm:p-3 rounded-xl text-center flex flex-col items-center gap-1 sm:gap-2 group cursor-pointer min-w-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition flex-shrink-0 shadow-sm">
              <Video className="w-4 h-4" />
            </div>
            <span className="text-[10px] sm:text-xs font-mono font-semibold text-stone-200 truncate w-full">🎥 Videos</span>
          </button>

          <button
            onClick={() => onNavigate('categories')}
            className="btn-3d-base card-3d p-2 sm:p-3 rounded-xl text-center flex flex-col items-center gap-1 sm:gap-2 group cursor-pointer min-w-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition flex-shrink-0 shadow-sm">
              <Volume2 className="w-4 h-4" />
            </div>
            <span className="text-[10px] sm:text-xs font-mono font-semibold text-stone-200 truncate w-full">🎧 Audios</span>
          </button>

          <button
            onClick={() => onNavigate('flashcards')}
            className="btn-3d-base card-3d p-2 sm:p-3 rounded-xl text-center flex flex-col items-center gap-1 sm:gap-2 group cursor-pointer min-w-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition flex-shrink-0 shadow-sm">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-[10px] sm:text-xs font-mono font-semibold text-stone-200 truncate w-full">🃏 Tarjetas</span>
          </button>

          <button
            onClick={() => onNavigate('categories')}
            className="btn-3d-base card-3d p-2 sm:p-3 rounded-xl text-center flex flex-col items-center gap-1 sm:gap-2 group cursor-pointer min-w-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center group-hover:scale-110 transition flex-shrink-0 shadow-sm">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-[10px] sm:text-xs font-mono font-semibold text-stone-200 truncate w-full">📝 Casos</span>
          </button>

          <button
            onClick={() => onNavigate('quizzes')}
            className="btn-3d-base card-3d p-2 sm:p-3 rounded-xl text-center flex flex-col items-center gap-1 sm:gap-2 group cursor-pointer min-w-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center group-hover:scale-110 transition flex-shrink-0 shadow-sm">
              <HelpCircle className="w-4 h-4" />
            </div>
            <span className="text-[10px] sm:text-xs font-mono font-semibold text-stone-200 truncate w-full">❓ Quizzes</span>
          </button>

          <button
            onClick={() => onNavigate('assistant')}
            className="btn-3d-base card-3d p-2 sm:p-3 rounded-xl text-center flex flex-col items-center gap-1 sm:gap-2 group cursor-pointer min-w-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition flex-shrink-0 shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
            <span className="text-[10px] sm:text-xs font-mono font-semibold text-stone-200 truncate w-full">🤖 Asistente</span>
          </button>

          <button
            onClick={() => onNavigate('progress')}
            className="btn-3d-base card-3d p-2 sm:p-3 rounded-xl text-center flex flex-col items-center gap-1 sm:gap-2 group cursor-pointer min-w-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition flex-shrink-0 shadow-sm">
              <BarChart3 className="w-4 h-4" />
            </div>
            <span className="text-[10px] sm:text-xs font-mono font-semibold text-stone-200 truncate w-full">📊 Progreso</span>
          </button>

          <button
            onClick={() => onNavigate('simulacros')}
            className="btn-3d-base card-3d p-2 sm:p-3 rounded-xl text-center flex flex-col items-center gap-1 sm:gap-2 group cursor-pointer min-w-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 flex items-center justify-center group-hover:scale-110 transition flex-shrink-0 shadow-sm">
              <Target className="w-4 h-4" />
            </div>
            <span className="text-[10px] sm:text-xs font-mono font-semibold text-stone-200 truncate w-full">🎯 Examen</span>
          </button>
        </div>
      </div>

      {/* 8 Categorías - Responsive: Cards on Mobile, Table on Desktop with 3D Frame */}
      <div className="window-3d rounded-xl p-4 sm:p-5 space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono font-bold text-stone-300 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" /> 🗂️ LAS 8 CATEGORÍAS DOCTRINALES
          </h2>
          <span className="text-[11px] font-mono text-stone-400">46 Porciones</span>
        </div>

        {/* Mobile Cards (9:16) */}
        <div className="md:hidden space-y-2.5">
          {CATEGORIES_DATA.map(cat => {
            const portions = ALL_PORTIONS.filter(p => p.categoryId === cat.id);
            const completed = portions.filter(p => progress.completedPortionIds.includes(p.id)).length;
            const pct = portions.length ? Math.round((completed / portions.length) * 100) : 0;

            return (
              <div
                key={cat.id}
                onClick={() => onNavigate('category-detail', cat.id)}
                className="bg-stone-950 border border-stone-800 hover:border-amber-500/50 rounded-xl p-3 transition cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono font-bold text-xs flex items-center justify-center">
                      {cat.number}
                    </span>
                    <span className="font-semibold text-xs text-stone-200 line-clamp-1">
                      {cat.shortName}
                    </span>
                  </div>

                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                      cat.examWeight === 'ALTO'
                        ? 'bg-red-950 text-red-300 border border-red-800/70'
                        : 'bg-stone-800 text-stone-300'
                    }`}
                  >
                    {cat.examWeight}
                  </span>
                </div>

                <div className="text-[11px] text-stone-400 font-mono truncate">
                  {cat.keyArticles}
                </div>

                <div className="flex items-center justify-between gap-3 pt-1 border-t border-stone-850 text-xs font-mono">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="flex-1 bg-stone-900 h-2 rounded-full overflow-hidden border border-stone-800">
                      <div
                        className="bg-amber-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-amber-400 font-bold">{pct}%</span>
                  </div>

                  <div className="flex items-center gap-1 text-stone-400 text-[11px]">
                    <span>{completed}/{cat.portionsCount}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-stone-800">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-950 text-stone-400 border-b border-stone-800 font-mono">
                <th className="py-2.5 px-3 w-12 text-center">#</th>
                <th className="py-2.5 px-3">Categoría Doctrinal</th>
                <th className="py-2.5 px-3 w-28 text-center">Porciones</th>
                <th className="py-2.5 px-3 w-32 text-center">Peso Examen</th>
                <th className="py-2.5 px-3 w-36">Progreso</th>
                <th className="py-2.5 px-3 w-24 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/70 font-sans">
              {CATEGORIES_DATA.map(cat => {
                const portions = ALL_PORTIONS.filter(p => p.categoryId === cat.id);
                const completed = portions.filter(p =>
                  progress.completedPortionIds.includes(p.id)
                ).length;
                const pct = portions.length ? Math.round((completed / portions.length) * 100) : 0;

                return (
                  <tr
                    key={cat.id}
                    onClick={() => onNavigate('category-detail', cat.id)}
                    className="hover:bg-stone-850/60 cursor-pointer transition"
                  >
                    <td className="py-3 px-3 text-center font-mono font-bold text-amber-400">
                      {cat.number}
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-semibold text-stone-200 hover:text-amber-300 transition">
                        {cat.name}
                      </div>
                      <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                        {cat.keyArticles}
                      </div>
                    </td>

                    <td className="py-3 px-3 text-center font-mono text-stone-300">
                      {completed} / {cat.portionsCount}
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          cat.examWeight === 'ALTO'
                            ? 'bg-red-950 text-red-300 border border-red-800/70'
                            : 'bg-stone-800 text-stone-300'
                        }`}
                      >
                        {cat.examWeight}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-stone-950 h-2 rounded-full overflow-hidden border border-stone-800">
                          <div
                            className="bg-amber-500 h-full rounded-full transition-all duration-300"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs text-stone-300 font-bold w-9 text-right">
                          {pct}%
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onNavigate('category-detail', cat.id);
                        }}
                        className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 font-mono text-xs transition cursor-pointer"
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Markdown Modal for Notion / Prompt Maestro PARTE 1 */}
      {showMarkdownModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-[95vw] sm:max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-3.5 sm:p-4 border-b border-stone-800 flex items-center justify-between bg-stone-950">
              <div className="flex items-center gap-2 min-w-0">
                <BookOpen className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-stone-100 font-mono truncate">
                  PARTE 1: DASHBOARD (Markdown Prompt Maestro)
                </h4>
              </div>
              <button
                onClick={() => setShowMarkdownModal(false)}
                className="text-stone-400 hover:text-stone-200 text-xs font-mono px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 cursor-pointer flex-shrink-0"
              >
                Cerrar
              </button>
            </div>

            <div className="p-3 sm:p-4 overflow-y-auto overflow-x-auto max-w-full flex-1 font-mono text-xs text-stone-300 bg-stone-950/70 whitespace-pre-wrap break-words leading-relaxed select-text border-b border-stone-800">
              {generateMarkdownParte1()}
            </div>

            <div className="p-3 sm:p-4 bg-stone-900 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <span className="text-[11px] font-mono text-stone-400">
                Estructura obligatoria lista para pegar en Notion o bitácora de estudio.
              </span>
              <button
                onClick={handleCopyMarkdown}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-mono font-bold text-xs transition cursor-pointer flex-shrink-0"
              >
                {copiedMarkdown ? (
                  <>
                    <Check className="w-4 h-4" /> ¡Dashboard Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copiar Markdown
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
