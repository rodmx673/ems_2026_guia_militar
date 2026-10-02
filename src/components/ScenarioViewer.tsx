import React, { useState } from 'react';
import { FileText, CheckCircle, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { PracticalScenario } from '../types/ems';
import { useSettings } from '../context/SettingsContext';
import { ClassStepTTSPlayer, TTSPlayItem } from './ClassStepTTSPlayer';

interface ScenarioViewerProps {
  scenario: PracticalScenario;
  portionNumber: string;
}

export const ScenarioViewer: React.FC<ScenarioViewerProps> = ({
  scenario,
  portionNumber
}) => {
  const { settings } = useSettings();
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [activeAudioItemIndex, setActiveAudioItemIndex] = useState(0);

  const toggleSolution = (qId: string) => {
    setRevealedSolutions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const revealAll = () => {
    const allRevealed: Record<string, boolean> = {};
    scenario.questions.forEach(q => {
      allRevealed[q.id] = true;
    });
    setRevealedSolutions(allRevealed);
  };

  // Build audio items for the TTS narration
  const audioItems: TTSPlayItem[] = [
    {
      id: 'scenario-context',
      label: 'Contexto y Hechos Operativos',
      sublabel: scenario.title,
      text: `Caso Práctico Militar: ${scenario.title}. Contexto: ${scenario.context}. Situación operativa y hechos: ${scenario.situation}`
    },
    ...scenario.questions.map((q, idx) => ({
      id: `question-${q.id}`,
      label: `Pregunta ${idx + 1} y Resolución`,
      sublabel: q.question.slice(0, 50) + '...',
      text: `Pregunta ${idx + 1}: ${q.question}. Resolución conforme a derecho: ${q.answer}. Fundamento legal: ${q.legalBasis}.`
    })),
    {
      id: 'scenario-conclusion',
      label: 'Conclusión Doctrinaria del Caso',
      sublabel: 'Lección militar aprendida',
      text: `Conclusión doctrinaria del caso: ${scenario.solutionSummary}`
    }
  ];

  const handleAudioItemChange = (idx: number) => {
    setActiveAudioItemIndex(idx);
    // If it's a question (index 1 to questions.length), reveal its solution
    if (idx >= 1 && idx <= scenario.questions.length) {
      const q = scenario.questions[idx - 1];
      if (q) {
        setRevealedSolutions(prev => ({ ...prev, [q.id]: true }));
      }
    }
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-xl p-3.5 sm:p-5 shadow-lg w-full max-w-full overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] sm:text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                CASO PRÁCTICO MILITAR
              </span>
              <span className="text-[11px] text-stone-400 font-mono">Porción {portionNumber}</span>
            </div>
            <h4 className="text-xs sm:text-sm font-semibold text-stone-200 mt-0.5 truncate">
              {scenario.title}
            </h4>
          </div>
        </div>

        <button
          onClick={revealAll}
          className="text-xs font-mono font-medium px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 transition cursor-pointer self-stretch sm:self-auto text-center"
        >
          Despejar Todas las Respuestas
        </button>
      </div>

      {/* TTS Audio Player for Scenario */}
<ClassStepTTSPlayer
          stepBadge="CASO TACTICO"
          portionNumber={portionNumber}
          items={audioItems}
          activeItemIndex={activeAudioItemIndex}
          onItemChange={handleAudioItemChange}
          autoStart={settings.autoPlayTts}
          defaultSpeed={settings.speechRate}
        />

      {/* Situation & Facts */}
      <div className="mb-4 sm:mb-5 bg-stone-950 p-3.5 sm:p-4 rounded-xl border border-stone-800 space-y-2">
        <div className="flex items-start sm:items-center gap-2 text-xs font-mono font-bold text-amber-400">
          <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5 sm:mt-0" />
          <span className="text-stone-300 font-normal"><strong>CONTEXTO:</strong> {scenario.context}</span>
        </div>
        <div className="text-xs text-stone-200 leading-relaxed font-sans bg-stone-900/60 p-3 rounded-lg border border-stone-800/80">
          <strong className="text-amber-300 font-mono block mb-1">SITUACIÓN OPERATIVA / HECHOS:</strong>
          {scenario.situation}
        </div>
      </div>

      {/* Questionnaire */}
      <div className="space-y-3 mb-4">
        <h5 className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider">
          Cuestionario de Evaluación Táctica / Legal ({scenario.questions.length} preguntas)
        </h5>

        {scenario.questions.map((q, idx) => {
          const isRevealed = revealedSolutions[q.id];
          const isAudioActive = activeAudioItemIndex === idx + 1;
          return (
            <div
              key={q.id}
              className={`border rounded-lg p-3 sm:p-3.5 transition space-y-2 ${
                isAudioActive
                  ? 'bg-stone-950 border-amber-500/50 ring-1 ring-amber-500/30'
                  : 'bg-stone-950/70 border-stone-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="flex items-start gap-2.5 min-w-0 flex-1">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5 ${
                      isAudioActive
                        ? 'bg-amber-500 text-stone-950 font-extrabold'
                        : 'bg-stone-800 text-stone-300'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <p className="text-xs font-medium text-stone-200 break-words">{q.question}</p>
                </div>

                <button
                  onClick={() => toggleSolution(q.id)}
                  className="self-end sm:self-auto flex-shrink-0 text-xs font-mono font-semibold px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-emerald-400 flex items-center gap-1 transition cursor-pointer"
                >
                  {isRevealed ? (
                    <>
                      <ChevronUp className="w-3.5 h-3.5" /> Ocultar
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5" /> Ver Fundamento
                    </>
                  )}
                </button>
              </div>

              {isRevealed && (
                <div className="mt-3 pt-3 border-t border-stone-800/80 bg-stone-900/50 p-3 rounded-lg">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 mb-1">
                    <CheckCircle className="w-3.5 h-3.5" /> RESOLUCIÓN CONFORME A DERECHO:
                  </div>
                  <p className="text-xs text-stone-200 mb-2">{q.answer}</p>
                  <div className="text-[11px] font-mono text-amber-300 bg-amber-950/30 px-2.5 py-1 rounded border border-amber-800/40 inline-block">
                    Fundamento Legal: {q.legalBasis}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-lg p-3.5 text-xs">
        <span className="font-mono font-bold text-emerald-400 block mb-1">
          📌 CONCLUSIÓN DOCTRINARIA DEL CASO:
        </span>
        <p className="text-stone-300 leading-relaxed">{scenario.solutionSummary}</p>
      </div>
    </div>
  );
};
