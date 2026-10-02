import React, { useState, useEffect } from 'react';
import { Clock, Flag, CheckCircle, XCircle, Award, ArrowLeft, ArrowRight } from 'lucide-react';
import { fireConfetti } from '../utils/confetti';
import { Simulacro, ExamAttempt } from '../types/ems';
import { useEMSProgress } from '../context/ProgressContext';

interface SimulacroRunnerProps {
  simulacro: Simulacro;
  onExit: () => void;
}

export const SimulacroRunner: React.FC<SimulacroRunnerProps> = ({ simulacro, onExit }) => {
  const { recordExamAttempt, addFailedQuestion } = useEMSProgress();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(simulacro.durationMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime] = useState<number>(Date.now());

  useEffect(() => {
    if (!isTimerRunning || isFinished) return;

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, isFinished]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isFinished) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const toggleFlag = (idx: number) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleFinishExam = () => {
    setIsFinished(true);
    setIsTimerRunning(false);

    let correctCount = 0;
    const catBreakdown: Record<number, { correct: number; total: number }> = {};

    simulacro.questions.forEach((q, idx) => {
      if (!catBreakdown[q.categoryId]) {
        catBreakdown[q.categoryId] = { correct: 0, total: 0 };
      }
      catBreakdown[q.categoryId].total++;

      if (userAnswers[idx] === q.correctOptionIndex) {
        correctCount++;
        catBreakdown[q.categoryId].correct++;
      } else {
        addFailedQuestion(q.id);
      }
    });

    const percentage = Math.round((correctCount / simulacro.questions.length) * 100);
    const passed = percentage >= 80;
    const timeSpent = Math.round((Date.now() - startTime) / 1000);

    const attempt: ExamAttempt = {
      id: `attempt-${Date.now()}`,
      simulacroId: simulacro.id,
      simulacroTitle: simulacro.title,
      date: new Date().toLocaleDateString('es-MX'),
      score: correctCount,
      totalQuestions: simulacro.questions.length,
      percentage,
      passed,
      timeSpentSeconds: timeSpent,
      categoryBreakdown: catBreakdown
    };

    recordExamAttempt(attempt);

    if (passed) {
      fireConfetti();
    }
  };

  const currentQ = simulacro.questions[currentQuestionIndex];
  const totalAnswered = Object.keys(userAnswers).length;
  const isCurrentFlagged = flaggedQuestions[currentQuestionIndex];

  const correctCount = isFinished
    ? simulacro.questions.filter((q, idx) => userAnswers[idx] === q.correctOptionIndex).length
    : 0;
  const finalPercentage = isFinished
    ? Math.round((correctCount / simulacro.questions.length) * 100)
    : 0;
  const isPassed = finalPercentage >= 80;

  return (
    <div className="space-y-4 sm:space-y-5 w-full max-w-full overflow-hidden">
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-3 sm:p-4 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <button
            onClick={onExit}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition text-xs font-mono flex items-center gap-1.5 cursor-pointer flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" /> <span className="hidden xs:inline">Salir</span>
          </button>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs sm:text-base font-bold text-stone-100 flex items-center gap-1.5 truncate">
              <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 font-mono text-[10px] sm:text-xs flex-shrink-0">
                SIM. {simulacro.number}
              </span>
              <span className="truncate">{simulacro.title}</span>
            </h3>
            <p className="text-[11px] text-stone-400 font-mono truncate">{simulacro.categoriesText}</p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-800/80">
          {!isFinished ? (
            <>
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-mono text-xs sm:text-sm font-bold border ${
                  secondsRemaining < 300
                    ? 'bg-red-950/60 text-red-400 border-red-800 animate-pulse'
                    : 'bg-stone-950 text-amber-300 border-stone-800'
                }`}
              >
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {formatTime(secondsRemaining)}
              </div>

              <button
                onClick={handleFinishExam}
                className="px-3.5 py-1.5 sm:py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition shadow-md cursor-pointer flex-shrink-0"
              >
                Entregar Examen
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] sm:text-xs font-bold border ${
                  isPassed
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                    : 'bg-red-950 text-red-400 border-red-800'
                }`}
              >
                {isPassed ? 'APROBADO' : 'NO APROBADO'}: {finalPercentage}% ({correctCount}/{simulacro.questions.length})
              </span>
            </div>
          )}
        </div>
      </div>

      {isFinished && (
        <div
          className={`p-4 sm:p-6 rounded-xl border shadow-xl ${
            isPassed ? 'bg-emerald-950/40 border-emerald-800/80' : 'bg-red-950/30 border-red-900/60'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3.5 sm:gap-4 w-full">
              <div
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border flex-shrink-0 ${
                  isPassed
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                    : 'bg-red-500/20 border-red-500/40 text-red-400'
                }`}
              >
                <Award className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-base sm:text-xl font-bold text-stone-100">
                  {isPassed ? '¡SIMULACRO APROBADO!' : 'SIMULACRO NO APROBADO'}
                </h4>
                <p className="text-xs text-stone-300 mt-0.5">
                  {isPassed
                    ? `Estándar superado (${finalPercentage}%). Registrado en tu historial de progreso militar.`
                    : `Obtuviste ${finalPercentage}%. Mínimo aprobatorio EMS: 80%. Revisa cada reactivo abajo.`}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-stone-950/80 px-4 py-3 rounded-xl border border-stone-800 font-mono text-center w-full md:w-auto flex-shrink-0">
              <div>
                <span className="text-[10px] sm:text-[11px] text-stone-400 block">ACIERTOS</span>
                <span className="text-lg sm:text-2xl font-bold text-emerald-400">{correctCount}</span>
              </div>
              <div className="border-x border-stone-800 px-2">
                <span className="text-[10px] sm:text-[11px] text-stone-400 block">TOTAL</span>
                <span className="text-lg sm:text-2xl font-bold text-stone-300">{simulacro.questions.length}</span>
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] text-stone-400 block">PROMEDIO</span>
                <span className={`text-lg sm:text-2xl font-bold ${isPassed ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {finalPercentage}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-4 sm:gap-5 w-full max-w-full overflow-hidden">
        <div className="lg:col-span-3 bg-stone-900 border border-stone-800 rounded-xl p-3.5 sm:p-5 md:p-6 shadow-lg space-y-4 sm:space-y-5 w-full max-w-full overflow-hidden">
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-stone-800 text-xs font-mono text-stone-400 gap-2">
            <span className="flex items-center gap-2">
              <strong className="text-amber-400 text-xs sm:text-sm">Pregunta {currentQuestionIndex + 1}</strong> de{' '}
              {simulacro.questions.length}
              <span className="px-2 py-0.5 rounded bg-stone-800 text-[10px] sm:text-[11px] text-stone-300">
                Cat. {currentQ.categoryId}
              </span>
            </span>

            {!isFinished && (
              <button
                onClick={() => toggleFlag(currentQuestionIndex)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded transition text-xs font-semibold cursor-pointer ${
                  isCurrentFlagged
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-400'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span className="text-[11px] sm:text-xs">{isCurrentFlagged ? 'Marcada' : 'Marcar para revisar'}</span>
              </button>
            )}
          </div>

          <div className="py-2">
            <p className="text-sm md:text-base font-semibold text-stone-100 leading-relaxed font-sans">
              {currentQ.question}
            </p>
          </div>

          <div className="space-y-2.5">
            {currentQ.options.map((opt, optIdx) => {
              const letters = ['a)', 'b)', 'c)', 'd)'];
              const isSelected = userAnswers[currentQuestionIndex] === optIdx;
              const isCorrect = optIdx === currentQ.correctOptionIndex;

              let style = 'bg-stone-950 border-stone-800 text-stone-300 hover:border-amber-500/40 hover:bg-stone-920 cursor-pointer';

              if (isFinished) {
                if (isCorrect) {
                  style = 'bg-emerald-950/70 border-emerald-600 text-emerald-200 font-semibold';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-red-950/70 border-red-600 text-red-300';
                } else {
                  style = 'bg-stone-950/50 border-stone-850 text-stone-400 opacity-60';
                }
              } else if (isSelected) {
                style = 'bg-amber-950/60 border-amber-500 text-amber-200 font-medium shadow-sm';
              }

              return (
                <button
                  key={optIdx}
                  disabled={isFinished}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-3 sm:p-3.5 rounded-xl border text-xs sm:text-sm flex items-start justify-between gap-2.5 transition min-w-0 ${style}`}
                >
                  <div className="flex items-start gap-2.5 min-w-0 flex-1">
                    <span className="font-mono font-bold text-amber-400 flex-shrink-0 mt-0.5">
                      {letters[optIdx]}
                    </span>
                    <span className="break-words min-w-0 flex-1">{opt}</span>
                  </div>

                  {isFinished && (
                    <span className="flex-shrink-0 mt-0.5">
                      {isCorrect && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400" />}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {isFinished && (
            <div className="mt-4 p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-mono font-bold text-amber-400">
                <span>Fundamento Legal: {currentQ.legalBasis}</span>
              </div>
              <p className="text-stone-300 leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-stone-800 gap-2">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed text-stone-200 text-xs font-mono transition cursor-pointer flex-shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> <span className="hidden xs:inline">Anterior</span>
            </button>

            <span className="text-[11px] sm:text-xs font-mono text-stone-400 truncate text-center">
              {totalAnswered}/{simulacro.questions.length} contestadas
            </span>

            <button
              disabled={currentQuestionIndex === simulacro.questions.length - 1}
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed text-stone-200 text-xs font-mono transition cursor-pointer flex-shrink-0"
            >
              <span className="hidden xs:inline">Siguiente</span> <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-xl p-3.5 sm:p-5 shadow-lg space-y-3 sm:space-y-4 w-full max-w-full overflow-hidden">
          <h4 className="text-xs font-mono font-bold text-stone-300 uppercase tracking-wider">
            Matriz de Preguntas
          </h4>

          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-5 gap-1.5 sm:gap-2 max-h-[360px] overflow-y-auto pr-1">
            {simulacro.questions.map((q, idx) => {
              const isCurrent = currentQuestionIndex === idx;
              const isAnswered = userAnswers[idx] !== undefined;
              const isFlagged = flaggedQuestions[idx];
              const isCorrect = isFinished ? userAnswers[idx] === q.correctOptionIndex : false;

              let btnStyle = 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-700 cursor-pointer';

              if (isFinished) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950 border-emerald-600 text-emerald-300 font-bold';
                } else {
                  btnStyle = 'bg-red-950 border-red-600 text-red-300 font-bold';
                }
              } else if (isCurrent) {
                btnStyle = 'bg-amber-600 text-white font-bold border-amber-500 ring-2 ring-amber-500/30';
              } else if (isFlagged) {
                btnStyle = 'bg-amber-950/80 border-amber-500 text-amber-300 font-semibold';
              } else if (isAnswered) {
                btnStyle = 'bg-stone-800 text-stone-200 border-stone-700';
              }

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`h-9 rounded-lg border text-xs font-mono flex items-center justify-center transition relative ${btnStyle}`}
                >
                  {idx + 1}
                  {isFlagged && !isFinished && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400"></span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="space-y-1.5 pt-3 border-t border-stone-800 text-[11px] font-mono text-stone-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-600"></span>
              <span>Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-stone-800 border border-stone-700"></span>
              <span>Contestada</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-950 border border-amber-500"></span>
              <span>Marcada para revisión</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-stone-950 border border-stone-800"></span>
              <span>Pendiente</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
