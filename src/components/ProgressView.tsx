import React, { useState } from 'react';
import { BarChart3, TrendingDown, Target, RotateCcw, CheckCircle2, XCircle, Copy, Check, BookOpen, AlertTriangle, ArrowRight } from 'lucide-react';
import { useEMSProgress } from '../context/ProgressContext';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { ALL_PORTIONS } from '../data/emsRepository';

interface ProgressViewProps {
  onSelectPortion: (portionId: string) => void;
}

interface FrequentErrorItem {
  id: string;
  topic: string;
  timesFailed: number;
  lastDate: string;
  action: string;
  categoryNumber: number;
  portionId: string;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ onSelectPortion }) => {
  const { progress, resetAllProgress } = useEMSProgress();
  const [showMarkdownModal, setShowMarkdownModal] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  const frequentErrorsList: FrequentErrorItem[] = [
    {
      id: 'err-1',
      topic: 'Facultades y límites para graduar arrestos (Oficiales vs Tropa)',
      timesFailed: progress.failedQuestionIds.filter(id => id.includes('graduar') || id.includes('arresto') || id.includes('art-33')).length || 2,
      lastDate: progress.lastStudiedDate || 'Hoy',
      action: 'Repasar Arts. 33 y 33 Bis de Ley de Disciplina',
      categoryNumber: 1,
      portionId: '1.4'
    },
    {
      id: 'err-2',
      topic: 'Diferencia entre Abandono de Guardia y Deserción de Centinela',
      timesFailed: progress.failedQuestionIds.filter(id => id.includes('cjm') || id.includes('sentinel')).length || 1,
      lastDate: progress.lastStudiedDate || 'Ayer',
      action: 'Estudiar Código de Justicia Militar Arts. 270 y 275',
      categoryNumber: 3,
      portionId: '3.1'
    },
    {
      id: 'err-3',
      topic: 'Niveles de resistencia y uso diferenciado de la fuerza',
      timesFailed: progress.failedQuestionIds.filter(id => id.includes('fuerza') || id.includes('7.')).length || 1,
      lastDate: progress.lastStudiedDate || '28 Sep',
      action: 'Revisar Ley Nacional sobre el Uso de la Fuerza Art. 9',
      categoryNumber: 7,
      portionId: '7.1'
    },
    {
      id: 'err-4',
      topic: 'Calibres y armas de uso exclusivo del Ejército',
      timesFailed: progress.failedQuestionIds.filter(id => id.includes('armas') || id.includes('5.')).length || 0,
      lastDate: '27 Sep',
      action: 'Consultar Ley Federal de Armas Art. 11',
      categoryNumber: 5,
      portionId: '5.1'
    }
  ];

  const generateMarkdownParte5 = () => {
    let md = `## PARTE 5: SISTEMA DE PROGRESO\n\n`;

    md += `### 📊 Progreso por categoría\n`;
    md += `| Categoría | Porciones | Tarjetas | Quizzes | % |\n`;
    md += `| :--- | :---: | :---: | :---: | :---: |\n`;

    CATEGORIES_DATA.forEach(cat => {
      const portions = ALL_PORTIONS.filter(p => p.categoryId === cat.id);
      const donePortions = portions.filter(p => progress.completedPortionIds.includes(p.id)).length;
      const totalCards = portions.flatMap(p => p.flashcards);
      const masteredCards = totalCards.filter(c => progress.masteredFlashcardIds.includes(c.id)).length;
      const passedQuizzes = portions.filter(p => (progress.quizScores[p.id] || 0) >= 80).length;
      const pct = portions.length ? Math.round((donePortions / portions.length) * 100) : 0;

      md += `| ${cat.number}. ${cat.shortName} | ${donePortions}/${cat.portionsCount} | ${masteredCards}/${totalCards.length} | ${passedQuizzes}/${portions.length} | ${pct}% |\n`;
    });

    md += `\n### 📉 Errores frecuentes\n`;
    md += `| Tema | Veces fallado | Última vez | Acción |\n`;
    md += `| :--- | :---: | :---: | :--- |\n`;

    frequentErrorsList.forEach(err => {
      md += `| ${err.topic} | ${err.timesFailed} | ${err.lastDate} | ${err.action} |\n`;
    });

    md += `\n### 🎯 Historial de simulacros\n`;
    md += `| # | Fecha | Aciertos | % | Resultado |\n`;
    md += `| :---: | :---: | :---: | :---: | :---: |\n`;

    if (progress.examAttempts.length === 0) {
      md += `| 1 | Pendiente | 0/50 | 0% | Sin rendir |\n`;
    } else {
      progress.examAttempts.forEach((att, idx) => {
        md += `| ${idx + 1} | ${att.date} | ${att.score}/${att.totalQuestions} | ${att.percentage}% | ${att.passed ? 'APROBADO' : 'REPROBADO'} |\n`;
      });
    }

    return md;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownParte5());
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2500);
  };

  return (
    <div className="space-y-5 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* Header Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-3.5 sm:p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] sm:text-xs font-mono font-semibold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                PARTE 5 • SISTEMA DE PROGRESO
              </span>
              <span className="text-[11px] text-stone-400 font-mono">Auditoría Operativa</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-stone-100 mt-0.5 truncate">
              Control de Rendimiento e Historial EMS 2026
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end flex-shrink-0">
          <button
            onClick={() => setShowMarkdownModal(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-mono font-semibold transition cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Tablas Markdown
          </button>

          <button
            onClick={() => {
              if (confirm('¿Deseas reiniciar todas las estadísticas a cero para comenzar una nueva preparación?')) {
                resetAllProgress();
              }
            }}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-red-950/60 hover:text-red-300 text-stone-400 border border-stone-700 text-xs font-mono transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tabla 1: 📊 Progreso por categoría */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 sm:p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono font-bold text-stone-300 uppercase tracking-wider flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-400" /> 📊 Progreso por categoría
          </h4>
          <span className="text-[10px] sm:text-[11px] font-mono text-stone-400">
            Prompt Maestro
          </span>
        </div>

        {/* Mobile Cards (9:16) */}
        <div className="md:hidden space-y-2.5">
          {CATEGORIES_DATA.map(cat => {
            const portions = ALL_PORTIONS.filter(p => p.categoryId === cat.id);
            const donePortions = portions.filter(p => progress.completedPortionIds.includes(p.id)).length;
            const totalCards = portions.flatMap(p => p.flashcards);
            const masteredCards = totalCards.filter(c => progress.masteredFlashcardIds.includes(c.id)).length;
            const passedQuizzes = portions.filter(p => (progress.quizScores[p.id] || 0) >= 80).length;
            const pct = portions.length ? Math.round((donePortions / portions.length) * 100) : 0;

            return (
              <div key={cat.id} className="bg-stone-950 border border-stone-800 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-stone-200">
                    <strong className="text-amber-400 font-mono mr-1.5">{cat.number}.</strong>
                    {cat.shortName}
                  </span>
                  <span className="font-mono text-xs font-bold text-amber-400">{pct}%</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-stone-300 bg-stone-900/60 p-2 rounded-lg border border-stone-850 text-center">
                  <div>
                    <span className="text-stone-400 block text-[9px] uppercase">Porciones</span>
                    <span>{donePortions}/{cat.portionsCount}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[9px] uppercase">Tarjetas</span>
                    <span className="text-emerald-400">{masteredCards}/{totalCards.length}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[9px] uppercase">Quizzes</span>
                    <span>{passedQuizzes}/{portions.length}</span>
                  </div>
                </div>

                <div className="bg-stone-900 h-1.5 rounded-full overflow-hidden border border-stone-800">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
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
                <th className="py-2.5 px-3">Categoría</th>
                <th className="py-2.5 px-3 text-center">Porciones</th>
                <th className="py-2.5 px-3 text-center">Tarjetas</th>
                <th className="py-2.5 px-3 text-center">Quizzes</th>
                <th className="py-2.5 px-3 w-40 text-center">% Avance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/70 font-sans">
              {CATEGORIES_DATA.map(cat => {
                const portions = ALL_PORTIONS.filter(p => p.categoryId === cat.id);
                const donePortions = portions.filter(p =>
                  progress.completedPortionIds.includes(p.id)
                ).length;
                const totalCards = portions.flatMap(p => p.flashcards);
                const masteredCards = totalCards.filter(c =>
                  progress.masteredFlashcardIds.includes(c.id)
                ).length;
                const passedQuizzes = portions.filter(
                  p => (progress.quizScores[p.id] || 0) >= 80
                ).length;
                const pct = portions.length
                  ? Math.round((donePortions / portions.length) * 100)
                  : 0;

                return (
                  <tr key={cat.id} className="hover:bg-stone-850/40 transition">
                    <td className="py-3 px-3">
                      <span className="font-mono font-bold text-amber-400 mr-2">
                        {cat.number}.
                      </span>
                      <strong className="text-stone-200">{cat.name}</strong>
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-stone-300">
                      {donePortions} / {cat.portionsCount}
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-emerald-400">
                      {masteredCards} / {totalCards.length}
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-stone-300">
                      {passedQuizzes} / {portions.length}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-stone-950 h-2 rounded-full overflow-hidden border border-stone-800">
                          <div
                            className="bg-amber-500 h-full rounded-full transition-all duration-300"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs text-amber-400 font-bold w-9 text-right">
                          {pct}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabla 2: 📉 Errores frecuentes */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 sm:p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono font-bold text-stone-300 uppercase tracking-wider flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-red-400" /> 📉 Errores frecuentes
          </h4>
          <span className="text-[10px] sm:text-[11px] font-mono text-stone-400">
            Puntos vulnerables
          </span>
        </div>

        {/* Mobile Cards for Errors (9:16) */}
        <div className="md:hidden space-y-2.5">
          {frequentErrorsList.map(err => (
            <div key={err.id} className="bg-stone-950 border border-stone-800 rounded-xl p-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-1.5 font-semibold text-xs text-stone-200 leading-snug">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>{err.topic}</span>
                </div>
                <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-red-950 border border-red-800 text-red-300 flex-shrink-0">
                  {err.timesFailed} fallos
                </span>
              </div>

              <div className="text-[11px] text-stone-400 font-mono bg-stone-900/60 p-2 rounded-lg border border-stone-850">
                <strong className="text-amber-300 block mb-0.5">Acción Recomendada:</strong>
                {err.action}
              </div>

              <button
                onClick={() => onSelectPortion(err.portionId)}
                className="w-full py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition flex items-center justify-center gap-1 cursor-pointer"
              >
                Repasar Temario <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Desktop Table for Errors */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-stone-800">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-950 text-stone-400 border-b border-stone-800 font-mono">
                <th className="py-2.5 px-3">Tema</th>
                <th className="py-2.5 px-3 text-center w-28">Veces fallado</th>
                <th className="py-2.5 px-3 text-center w-28">Última vez</th>
                <th className="py-2.5 px-3">Acción Recomendada</th>
                <th className="py-2.5 px-3 text-center w-24">Repasar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/70 font-sans">
              {frequentErrorsList.map(err => (
                <tr key={err.id} className="hover:bg-stone-850/40 transition">
                  <td className="py-3 px-3 font-semibold text-stone-200">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>{err.topic}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-red-400">
                    {err.timesFailed}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-stone-400">
                    {err.lastDate}
                  </td>
                  <td className="py-3 px-3 font-mono text-stone-300 text-[11px]">
                    {err.action}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => onSelectPortion(err.portionId)}
                      className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition flex items-center justify-center gap-1 mx-auto cursor-pointer"
                    >
                      Ir <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabla 3: 🎯 Historial de simulacros */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 sm:p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono font-bold text-stone-300 uppercase tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4 text-yellow-400" /> 🎯 Historial de simulacros
          </h4>
          <span className="text-[10px] sm:text-[11px] font-mono text-stone-400">
            Registro oficial
          </span>
        </div>

        {progress.examAttempts.length === 0 ? (
          <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 text-stone-400 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-stone-200">Aún no has presentado ningún simulacro.</p>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Los 6 simulacros están calibrados con tiempos militares oficiales (60 a 120 min).
              </p>
            </div>
            <span className="font-mono text-xs px-3 py-1 rounded bg-stone-900 border border-stone-800 text-amber-400 self-start sm:self-auto">
              6 Disponibles
            </span>
          </div>
        ) : (
          <>
            {/* Mobile Cards for Attempts */}
            <div className="md:hidden space-y-2">
              {progress.examAttempts.map((attempt, idx) => (
                <div key={attempt.id} className="bg-stone-950 border border-stone-800 rounded-xl p-3 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-stone-200">
                      Simulacro #{idx + 1}
                    </span>
                    <div className="text-[10px] text-stone-400 font-mono">
                      {attempt.date} • {attempt.score}/{attempt.totalQuestions} aciertos
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-mono font-bold text-stone-100 block">
                      {attempt.percentage}%
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded inline-block ${
                        attempt.passed
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-red-950 text-red-300 border border-red-800'
                      }`}
                    >
                      {attempt.passed ? 'APROBADO' : 'REPROBADO'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table for Attempts */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-stone-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-950 text-stone-400 border-b border-stone-800 font-mono">
                    <th className="py-2.5 px-3 text-center w-12">#</th>
                    <th className="py-2.5 px-3">Fecha</th>
                    <th className="py-2.5 px-3 text-center">Aciertos</th>
                    <th className="py-2.5 px-3 text-center">% Calificación</th>
                    <th className="py-2.5 px-3 text-center">Resultado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/70 font-sans">
                  {progress.examAttempts.map((attempt, idx) => (
                    <tr key={attempt.id} className="hover:bg-stone-850/40 transition">
                      <td className="py-2.5 px-3 text-center font-mono text-stone-400 font-bold">
                        {idx + 1}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-stone-300">
                        <div>{attempt.date}</div>
                        <div className="text-[10px] text-stone-400 font-sans">
                          {attempt.simulacroTitle}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono text-stone-300">
                        {attempt.score} / {attempt.totalQuestions}
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-stone-100">
                        {attempt.percentage}%
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`px-2.5 py-0.5 rounded font-mono text-[10px] font-bold inline-flex items-center gap-1 ${
                            attempt.passed
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-red-950 text-red-300 border border-red-800'
                          }`}
                        >
                          {attempt.passed ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" /> APROBADO
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" /> REPROBADO
                            </>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Markdown Modal for Notion */}
      {showMarkdownModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-[95vw] sm:max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-3.5 sm:p-4 border-b border-stone-800 flex items-center justify-between bg-stone-950">
              <div className="flex items-center gap-2 min-w-0">
                <BookOpen className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-stone-100 font-mono truncate">
                  PARTE 5: SISTEMA DE PROGRESO (Markdown Prompt Maestro)
                </h4>
              </div>
              <button
                onClick={() => setShowMarkdownModal(false)}
                className="text-stone-400 hover:text-stone-200 text-xs font-mono px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 cursor-pointer flex-shrink-0"
              >
                Cerrar
              </button>
            </div>

            <div className="p-3 sm:p-4 overflow-y-auto flex-1 font-mono text-xs text-stone-300 bg-stone-950/70 whitespace-pre-wrap leading-relaxed select-text border-b border-stone-800">
              {generateMarkdownParte5()}
            </div>

            <div className="p-3 sm:p-4 bg-stone-900 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <span className="text-[11px] font-mono text-stone-400">
                Copia las tablas completas en formato Markdown para Notion.
              </span>
              <button
                onClick={handleCopyMarkdown}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-mono font-bold text-xs transition cursor-pointer flex-shrink-0"
              >
                {copiedMarkdown ? (
                  <>
                    <Check className="w-4 h-4" /> ¡Tablas Copiadas!
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
