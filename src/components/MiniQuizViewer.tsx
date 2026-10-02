import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';
import { fireConfetti } from '../utils/confetti';
import { QuizQuestion } from '../types/ems';
import { useEMSProgress } from '../context/ProgressContext';
import { useSettings } from '../context/SettingsContext';
import { ClassStepTTSPlayer, TTSPlayItem } from './ClassStepTTSPlayer';

interface MiniQuizViewerProps {
  questions: QuizQuestion[];
  portionNumber: string;
  portionTitle: string;
  onCompleted?: (percentage: number) => void;
}

export const MiniQuizViewer: React.FC<MiniQuizViewerProps> = ({
  questions,
  portionNumber,
  portionTitle,
  onCompleted
}) => {
  const { recordQuizScore, addFailedQuestion } = useEMSProgress();
  const { settings } = useSettings();
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [activeAudioIndex, setActiveAudioIndex] = useState(0);

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (showResults) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctOptionIndex) {
        correct++;
      } else {
        addFailedQuestion(q.id);
      }
    });
    return correct;
  };

  const handleSubmit = () => {
    setShowResults(true);
    const correctCount = calculateScore();
    const pct = Math.round((correctCount / questions.length) * 100);
    recordQuizScore(portionNumber, pct);
    if (onCompleted) {
      onCompleted(pct);
    }

    if (pct >= 80) {
      fireConfetti();
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
    setActiveAudioIndex(0);
  };

  const allAnswered = Object.keys(userAnswers).length === questions.length;
  const correctCount = showResults ? calculateScore() : 0;
  const percentage = showResults ? Math.round((correctCount / questions.length) * 100) : 0;
  const isPassed = percentage >= 80;

  // Build audio items for TTS
  const audioItems: TTSPlayItem[] = questions.map((q, qIdx) => {
    const letters = ['A', 'B', 'C', 'D'];
    let text = `Pregunta ${qIdx + 1} de ${questions.length}: ${q.question}. Opción A: ${q.options[0]}. Opción B: ${q.options[1]}. Opción C: ${q.options[2]}. Opción D: ${q.options[3]}.`;
    if (showResults) {
      text += ` Respuesta correcta: Opción ${letters[q.correctOptionIndex]}. Fundamento legal: ${q.legalBasis}. Explicación: ${q.explanation}.`;
    }
    return {
      id: `quiz-q-${q.id}`,
      label: `Pregunta ${qIdx + 1}: ${q.question.slice(0, 45)}...`,
      sublabel: `Pregunta ${qIdx + 1} de ${questions.length}`,
      text
    };
  });

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-xl p-3.5 sm:p-5 shadow-lg w-full max-w-full overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                MINI-QUIZ EVALUABLE (5 PREGUNTAS)
              </span>
              <span className="text-xs text-stone-400 font-mono">Porción {portionNumber}</span>
            </div>
            <h4 className="text-sm font-semibold text-stone-200 mt-0.5">
              {portionTitle}
            </h4>
          </div>
        </div>

        {showResults && (
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
              isPassed ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'
            }`}>
              {isPassed ? 'APROBADO' : 'REQUERIDO REPASO'}: {correctCount}/{questions.length} ({percentage}%)
            </span>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
              title="Reintentar quiz"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* TTS Audio Player for Quiz */}
      {audioItems.length > 0 && (
        <ClassStepTTSPlayer
          stepBadge="AUDIO QUIZ"
          portionNumber={portionNumber}
          items={audioItems}
          activeItemIndex={activeAudioIndex}
          onItemChange={idx => setActiveAudioIndex(idx)}
          autoStart={settings.autoPlayTts}
          defaultSpeed={settings.speechRate}
        />
      )}

      {showResults && (
        <div className={`p-4 rounded-xl mb-5 border ${
          isPassed ? 'bg-emerald-950/40 border-emerald-800/60' : 'bg-amber-950/40 border-amber-800/60'
        }`}>
          <div className="flex items-center gap-3">
            <Award className={`w-8 h-8 ${isPassed ? 'text-emerald-400' : 'text-amber-400'}`} />
            <div>
              <h5 className="font-bold text-sm text-stone-100">
                {isPassed ? '¡Excelente desempeño, Sgto. 1/o.!' : 'Faltó afinar artículos clave'}
              </h5>
              <p className="text-xs text-stone-300 mt-0.5">
                {isPassed
                  ? `Has alcanzado el ${percentage}% de aciertos requeridos por la Escuela Militar de Sargentos.`
                  : `Obtuviste ${percentage}%. El estándar mínimo aprobatorio EMS es 80%. Revisa las explicaciones de abajo.`}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const selectedOption = userAnswers[qIdx];
          const isAudioActive = activeAudioIndex === qIdx;

          return (
            <div
              key={q.id}
              className={`p-4 rounded-xl border transition space-y-3 ${
                isAudioActive
                  ? 'bg-stone-950 border-amber-500/60 ring-1 ring-amber-500/30'
                  : 'bg-stone-950 border-stone-800/80'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5 ${
                    isAudioActive
                      ? 'bg-amber-500 text-stone-950 font-extrabold'
                      : 'bg-stone-800 text-stone-300'
                  }`}
                >
                  {qIdx + 1}
                </span>
                <p className="text-xs md:text-sm font-semibold text-stone-200 leading-relaxed font-sans">
                  {q.question}
                </p>
              </div>

              <div className="grid gap-2 pl-2">
                {q.options.map((opt, optIdx) => {
                  const letters = ['a)', 'b)', 'c)', 'd)'];
                  const isSelected = selectedOption === optIdx;
                  const isCorrect = optIdx === q.correctOptionIndex;

                  let optionStyle = 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-850 hover:border-stone-700 cursor-pointer';

                  if (showResults) {
                    if (isCorrect) {
                      optionStyle = 'bg-emerald-950/60 border-emerald-600 text-emerald-200 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-red-950/60 border-red-600 text-red-300';
                    } else {
                      optionStyle = 'bg-stone-900/40 border-stone-850 text-stone-400 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-amber-950/50 border-amber-500 text-amber-200 font-medium';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={showResults}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs flex items-center justify-between gap-2 transition ${optionStyle}`}
                    >
                      <div className="flex items-start gap-2 min-w-0 flex-1">
                        <span className="font-mono font-bold text-stone-400 flex-shrink-0">{letters[optIdx]}</span>
                        <span className="break-words">{opt}</span>
                      </div>

                      {showResults && (
                        <span className="flex-shrink-0 ml-1">
                          {isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                          {isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-400" />}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div className="mt-3 pt-3 border-t border-stone-800 bg-stone-900/60 p-3 rounded-lg text-xs space-y-1">
                  <div className="font-mono font-bold text-amber-400 flex items-center gap-1.5 flex-wrap">
                    <span>Fundamento: {q.legalBasis}</span>
                  </div>
                  <p className="text-stone-300 leading-relaxed break-words">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!showResults && (
        <div className="mt-6 pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <span className="text-xs text-stone-400 font-mono text-center sm:text-left">
            Preguntas respondidas: {Object.keys(userAnswers).length} de {questions.length}
          </span>

          <button
            disabled={!allAnswered}
            onClick={handleSubmit}
            className={`px-5 py-2.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition shadow-md ${
              allAnswered
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
                : 'bg-stone-800 text-stone-400 cursor-not-allowed border border-stone-700'
            }`}
          >
            Calificar Quiz Ahora <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
