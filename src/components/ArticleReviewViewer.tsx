import React, { useState } from 'react';
import { BookOpen, CheckCircle, XCircle, HelpCircle, Copy, Check, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { fireConfetti } from '../utils/confetti';
import { ArticleReviewGroup, QuizQuestion } from '../types/ems';
import { getArticleReviewGroupsForPortion } from '../data/articleReviewQuestions';
import { useEMSProgress } from '../context/ProgressContext';
import { useSettings } from '../context/SettingsContext';
import { ClassStepTTSPlayer, TTSPlayItem } from './ClassStepTTSPlayer';

interface ArticleReviewViewerProps {
  portionId: string;
  portionNumber: string;
  portionTitle: string;
}

export const ArticleReviewViewer: React.FC<ArticleReviewViewerProps> = ({
  portionId,
  portionNumber,
  portionTitle
}) => {
  const { recordQuizScore, addFailedQuestion } = useEMSProgress();
  const { settings } = useSettings();
  const reviewGroups: ArticleReviewGroup[] = getArticleReviewGroupsForPortion(portionId);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [showMarkdownModal, setShowMarkdownModal] = useState(false);
  const [activeAudioIndex, setActiveAudioIndex] = useState(0);

  // Build audio items for TTS
  const audioItems: TTSPlayItem[] = [];
  const questionIndexMap: { groupArticle: string; questionId: string }[] = [];

  reviewGroups.forEach(group => {
    group.questions.forEach((q, qIdx) => {
      questionIndexMap.push({ groupArticle: group.article, questionId: q.id });
      const letters = ['A', 'B', 'C', 'D'];
      const correctLetter = letters[q.correctOptionIndex];
      audioItems.push({
        id: `review-${q.id}`,
        label: `${group.article}: Pregunta ${qIdx + 1}`,
        sublabel: q.question.slice(0, 50) + '...',
        text: `${group.article}, ${group.articleSummary}. Pregunta ${qIdx + 1}: ${q.question}. Opción A: ${q.options[0]}. Opción B: ${q.options[1]}. Opción C: ${q.options[2]}. Opción D: ${q.options[3]}. Respuesta correcta: Opción ${correctLetter}. Fundamento legal: ${q.legalBasis}. Explicación: ${q.explanation}.`
      });
    });
  });

  const handleAudioItemChange = (idx: number) => {
    setActiveAudioIndex(idx);
    const mapping = questionIndexMap[idx];
    if (mapping) {
      setCollapsedGroups(prev => ({ ...prev, [mapping.groupArticle]: false }));
      setShowExplanations(prev => ({ ...prev, [mapping.questionId]: true }));
    }
  };

  // Flatten all questions across groups for aggregate stats
  const allQuestions: QuizQuestion[] = reviewGroups.flatMap(g => g.questions);

  const handleSelectOption = (question: QuizQuestion, optionIndex: number) => {
    if (selectedAnswers[question.id] !== undefined) return; // already answered

    const isCorrect = optionIndex === question.correctOptionIndex;
    setSelectedAnswers(prev => ({ ...prev, [question.id]: optionIndex }));
    setShowExplanations(prev => ({ ...prev, [question.id]: true }));

    if (isCorrect) {
      // Small celebratory burst if last question
      if (Object.keys(selectedAnswers).length === allQuestions.length - 1) {
        fireConfetti();
      }
    } else {
      addFailedQuestion(question.id);
    }
  };

  const toggleGroupCollapse = (articleName: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [articleName]: !prev[articleName]
    }));
  };

  const totalAnswered = Object.keys(selectedAnswers).length;
  const totalCorrect = allQuestions.filter(
    q => selectedAnswers[q.id] === q.correctOptionIndex
  ).length;

  const scorePercentage = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  // Generate clean Markdown conforming to PROMPT MAESTRO specifications
  const generateMarkdownRepaso = () => {
    let md = `### 📝 Preguntas de Repaso por Artículo Clave – Porción ${portionNumber} (${portionTitle})\n\n`;
    reviewGroups.forEach(group => {
      md += `#### 📖 ${group.article} – ${group.articleSummary}\n\n`;
      group.questions.forEach((q, idx) => {
        md += `${idx + 1}. ${q.question}\n`;
        const letters = ['a)', 'b)', 'c)', 'd)'];
        q.options.forEach((opt, oIdx) => {
          md += `   ${letters[oIdx]} ${opt}\n`;
        });
        const correctLetter = letters[q.correctOptionIndex].replace(')', '');
        md += `   **Respuesta:** ${correctLetter} | **Artículo:** ${q.legalBasis} | **Fundamento:** ${q.explanation}\n\n`;
      });
    });
    return md;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownRepaso());
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2500);
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* Top Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-3.5 sm:p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              PARTE 3 • REPASO DOCTRINAL
            </span>
            <span className="text-[11px] sm:text-xs font-mono text-stone-400">
              2-3 preguntas por cada artículo clave
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-stone-100 mt-1">
            Evaluación por Artículo: Porción {portionNumber}
          </h3>
          <p className="text-xs text-stone-300 mt-0.5">
            Preguntas analíticas de opción múltiple diseñadas con fidelidad textual al Compendio EMS 2026 y citas directas de ley.
          </p>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap">
          <div className="bg-stone-950 px-3.5 py-2 rounded-lg border border-stone-800 text-center font-mono">
            <div className="text-[10px] text-stone-400 uppercase">Progreso Repaso</div>
            <div className="text-sm font-bold text-amber-400">
              {totalAnswered} / {allQuestions.length} ({totalAnswered > 0 ? `${scorePercentage}% aciertos` : '0%'})
            </div>
          </div>

          <button
            onClick={() => setShowMarkdownModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-mono font-semibold transition cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Exportar Markdown
          </button>
        </div>
      </div>

      {/* TTS Audio Player for Article Review */}
      {audioItems.length > 0 && (
<ClassStepTTSPlayer
          stepBadge="AUDIO REPASO ARTICULOS"
          portionNumber={portionNumber}
          items={audioItems}
          activeItemIndex={activeAudioIndex}
          onItemChange={handleAudioItemChange}
          autoStart={settings.autoPlayTts}
          defaultSpeed={settings.speechRate}
        />
      )}

      {/* Article Groups */}
      <div className="space-y-5">
        {reviewGroups.map((group) => {
          const isCollapsed = collapsedGroups[group.article];
          const groupAnswered = group.questions.filter(q => selectedAnswers[q.id] !== undefined).length;
          const groupCorrect = group.questions.filter(q => selectedAnswers[q.id] === q.correctOptionIndex).length;

          return (
            <div
              key={group.article}
              className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden shadow-md"
            >
              {/* Group Header */}
              <div
                onClick={() => toggleGroupCollapse(group.article)}
                className="p-4 bg-stone-850 hover:bg-stone-800/80 transition cursor-pointer flex items-center justify-between border-b border-stone-800"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-xs border border-amber-500/30">
                    Art.
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-stone-100 font-mono">
                        {group.article}
                      </h4>
                      <span className="text-[11px] text-stone-400 font-mono">
                        ({group.questions.length} preguntas de opción múltiple)
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 mt-0.5">
                      {group.articleSummary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {groupAnswered > 0 && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-stone-950 text-amber-300 border border-stone-700">
                      {groupCorrect}/{group.questions.length} aciertos
                    </span>
                  )}
                  {isCollapsed ? (
                    <ChevronDown className="w-4 h-4 text-stone-400" />
                  ) : (
                    <ChevronUp className="w-4 h-4 text-stone-400" />
                  )}
                </div>
              </div>

              {/* Questions List */}
              {!isCollapsed && (
                <div className="p-4 space-y-6 divide-y divide-stone-800">
                  {group.questions.map((q, qIndex) => {
                    const selectedOpt = selectedAnswers[q.id];
                    const isAnswered = selectedOpt !== undefined;
                    const isCorrect = selectedOpt === q.correctOptionIndex;

                    return (
                      <div key={q.id} className={qIndex > 0 ? 'pt-5' : ''}>
                        <div className="flex items-start gap-2.5">
                          <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 text-xs font-mono font-bold mt-0.5">
                            {qIndex + 1}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-stone-100 leading-snug">
                              {q.question}
                            </p>

                            {/* 4 Options */}
                            <div className="mt-3 space-y-2">
                              {q.options.map((opt, optIdx) => {
                                const letters = ['a', 'b', 'c', 'd'];
                                let optionClasses =
                                  'w-full text-left p-3 rounded-lg border text-xs font-medium transition flex items-start justify-between gap-2.5 min-w-0 ';

                                if (!isAnswered) {
                                  optionClasses +=
                                    'bg-stone-950/70 border-stone-800 hover:border-amber-500/60 hover:bg-stone-800 text-stone-300 cursor-pointer';
                                } else {
                                  if (optIdx === q.correctOptionIndex) {
                                    optionClasses +=
                                      'bg-emerald-950/80 border-emerald-600 text-emerald-200 font-semibold';
                                  } else if (optIdx === selectedOpt && !isCorrect) {
                                    optionClasses +=
                                      'bg-red-950/80 border-red-600 text-red-200 line-through';
                                  } else {
                                    optionClasses +=
                                      'bg-stone-950/40 border-stone-800/60 text-stone-400 opacity-60';
                                  }
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    disabled={isAnswered}
                                    onClick={() => handleSelectOption(q, optIdx)}
                                    className={optionClasses}
                                  >
                                    <div className="flex items-start gap-2.5 min-w-0 flex-1">
                                      <span className="w-5 h-5 rounded flex items-center justify-center font-mono font-bold uppercase text-[11px] bg-stone-900 border border-stone-700 text-stone-300 flex-shrink-0 mt-0.5">
                                        {letters[optIdx]}
                                      </span>
                                      <span className="text-left break-words min-w-0 flex-1">{opt}</span>
                                    </div>

                                    {isAnswered && optIdx === q.correctOptionIndex && (
                                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-1 mt-0.5" />
                                    )}
                                    {isAnswered && optIdx === selectedOpt && !isCorrect && (
                                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 ml-1 mt-0.5" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Answer and Legal Basis Feedback */}
                            {isAnswered && (
                              <div
                                className={`mt-3 p-3.5 rounded-lg border text-xs space-y-1.5 ${
                                  isCorrect
                                    ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
                                    : 'bg-red-950/30 border-red-800/60 text-red-200'
                                }`}
                              >
                                <div className="flex items-center gap-2 font-mono font-bold">
                                  {isCorrect ? (
                                    <>
                                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                                      <span className="text-emerald-400">
                                        ¡RESPUESTA CORRECTA!
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <XCircle className="w-4 h-4 text-red-400" />
                                      <span className="text-red-400">
                                        RESPUESTA INCORRECTA — REVISA EL ARTÍCULO
                                      </span>
                                    </>
                                  )}
                                  <span className="text-stone-300 font-mono text-[11px]">
                                    (Opción correcta: {['a', 'b', 'c', 'd'][q.correctOptionIndex]})
                                  </span>
                                </div>

                                <div className="text-xs text-stone-300 flex items-center gap-1.5 font-mono">
                                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                                  <span>
                                    <strong>Fundamento Legal:</strong> {q.legalBasis}
                                  </span>
                                </div>

                                <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                                  {q.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Markdown Modal */}
      {showMarkdownModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-[95vw] sm:max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-3.5 sm:p-4 border-b border-stone-800 flex items-center justify-between bg-stone-950">
              <div className="flex items-center gap-2 min-w-0">
                <BookOpen className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-stone-100 font-mono truncate">
                  Formato Markdown (Prompt Maestro) – Repaso Porción {portionNumber}
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
              {generateMarkdownRepaso()}
            </div>

            <div className="p-3 sm:p-4 bg-stone-900 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <span className="text-[11px] font-mono text-stone-400">
                Estructura lista para copiar y pegar directamente en Notion o apuntes de estudio.
              </span>
              <button
                onClick={handleCopyMarkdown}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-mono font-bold text-xs transition cursor-pointer flex-shrink-0"
              >
                {copiedMarkdown ? (
                  <>
                    <Check className="w-4 h-4" /> ¡Copiado con Éxito!
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
