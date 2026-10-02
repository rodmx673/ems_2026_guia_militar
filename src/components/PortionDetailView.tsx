import React, { useState, useEffect } from 'react';
import { Volume2, Video, FileText, Layers, HelpCircle, CheckCircle2, ArrowLeft, ArrowRight, BookOpen, Headphones } from 'lucide-react';
import { Portion } from '../types/ems';
import { AudioPlayerTTS } from './AudioPlayerTTS';
import { VideoStoryboardViewer } from './VideoStoryboardViewer';
import { ScenarioViewer } from './ScenarioViewer';
import { FlashcardDeck } from './FlashcardDeck';
import { MiniQuizViewer } from './MiniQuizViewer';
import { ArticleReviewViewer } from './ArticleReviewViewer';
import { useEMSProgress } from '../context/ProgressContext';
import { useSettings } from '../context/SettingsContext';
import { ALL_PORTIONS } from '../data/emsRepository';

interface PortionDetailViewProps {
  portion: Portion;
  onBack: () => void;
  onSelectPortion: (portionId: string) => void;
}

export const PortionDetailView: React.FC<PortionDetailViewProps> = ({
  portion,
  onBack,
  onSelectPortion
}) => {
  const { progress, togglePortionCompleted } = useEMSProgress();
  const { settings } = useSettings();
  const [activeTab, setActiveTab] = useState<'audio' | 'video' | 'scenario' | 'flashcards' | 'quiz' | 'review'>('audio');

  // Cancel any ongoing speech when switching tabs or portions
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [activeTab, portion.id]);

  const isCompleted = progress.completedPortionIds.includes(portion.id);
  const quizScore = progress.quizScores[portion.id];

  const currentIndex = ALL_PORTIONS.findIndex(p => p.id === portion.id);
  const prevPortion = currentIndex > 0 ? ALL_PORTIONS[currentIndex - 1] : null;
  const nextPortion = currentIndex < ALL_PORTIONS.length - 1 ? ALL_PORTIONS[currentIndex + 1] : null;

  return (
    <div className="space-y-4 sm:space-y-5 w-full max-w-full overflow-hidden">
      <div className="window-3d rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <button
            onClick={onBack}
            className="btn-3d-base btn-3d-stone p-2 rounded-lg text-stone-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" /> <span className="hidden xs:inline">Volver</span>
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] sm:text-xs font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 shadow-sm">
                PORCIÓN {portion.portionNumber}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-400 font-mono truncate">
                {portion.articles} • {portion.durationMinutes} min
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-stone-100 mt-0.5 truncate">
              {portion.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-800/80">
          {quizScore !== undefined && (
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-stone-950 border border-stone-800 text-amber-400 font-semibold flex-shrink-0 shadow-inner">
              Quiz: {quizScore}%
            </span>
          )}

          <button
            onClick={() => togglePortionCompleted(portion.id)}
            className={`btn-3d-base px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer flex-1 sm:flex-none ${
              isCompleted
                ? 'btn-3d-emerald text-white'
                : 'btn-3d-stone text-stone-300'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${isCompleted ? 'text-white' : 'text-stone-400'}`} />
            <span className="truncate">{isCompleted ? 'Completada' : 'Marcar Lista'}</span>
          </button>
        </div>
      </div>

      <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 border-b border-stone-800 no-scrollbar">
        <button
          onClick={() => setActiveTab('audio')}
          className={`btn-3d-base flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold flex-shrink-0 cursor-pointer ${
            activeTab === 'audio'
              ? 'btn-3d-amber text-stone-950'
              : 'card-3d text-stone-300'
          }`}
        >
          <Volume2 className="w-3.5 h-3.5" /> 🎧 Audio
        </button>

        <button
          onClick={() => setActiveTab('video')}
          className={`btn-3d-base flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold flex-shrink-0 cursor-pointer ${
            activeTab === 'video'
              ? 'btn-3d-blue text-white'
              : 'card-3d text-stone-300'
          }`}
        >
          <Video className="w-3.5 h-3.5" /> 🎥 Video
        </button>

        <button
          onClick={() => setActiveTab('scenario')}
          className={`btn-3d-base flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold flex-shrink-0 cursor-pointer ${
            activeTab === 'scenario'
              ? 'btn-3d-teal text-white'
              : 'card-3d text-stone-300'
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> 📝 Caso
        </button>

        <button
          onClick={() => setActiveTab('flashcards')}
          className={`btn-3d-base flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold flex-shrink-0 cursor-pointer ${
            activeTab === 'flashcards'
              ? 'btn-3d-emerald text-white'
              : 'card-3d text-stone-300'
          }`}
        >
          <Layers className="w-3.5 h-3.5" /> 🃏 Tarjetas ({portion.flashcards.length})
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`btn-3d-base flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold flex-shrink-0 cursor-pointer ${
            activeTab === 'quiz'
              ? 'btn-3d-purple text-white'
              : 'card-3d text-stone-300'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" /> ❓ Quiz ({portion.quiz.length})
        </button>

        <button
          onClick={() => setActiveTab('review')}
          className={`btn-3d-base flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold flex-shrink-0 cursor-pointer ${
            activeTab === 'review'
              ? 'btn-3d-sky text-white'
              : 'card-3d text-stone-300'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> 📝 Repaso por Artículos
        </button>
      </div>

      <div>
        {activeTab === 'audio' && (
          <AudioPlayerTTS
            script={portion.audioScript}
            portionTitle={portion.title}
            portionNumber={portion.portionNumber}
            autoStart={settings.autoPlayTts}
            defaultRate={settings.speechRate}
          />
        )}

        {activeTab === 'video' && (
          <VideoStoryboardViewer
            portionId={portion.id}
            defaultVideoUrl={portion.videoUrl}
            scenes={portion.videoStoryboard}
            portionNumber={portion.portionNumber}
            portionTitle={portion.title}
          />
        )}

        {activeTab === 'scenario' && (
          <ScenarioViewer
            scenario={portion.scenario}
            portionNumber={portion.portionNumber}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardDeck
            cards={portion.flashcards}
            portionNumber={portion.portionNumber}
            categoryTitle={portion.title}
          />
        )}

        {activeTab === 'quiz' && (
          <MiniQuizViewer
            questions={portion.quiz}
            portionNumber={portion.portionNumber}
            portionTitle={portion.title}
          />
        )}

        {activeTab === 'review' && (
          <ArticleReviewViewer
            portionId={portion.id}
            portionNumber={portion.portionNumber}
            portionTitle={portion.title}
          />
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-4 border-t border-stone-800">
        {prevPortion ? (
          <button
            onClick={() => onSelectPortion(prevPortion.id)}
            className="flex items-center justify-center sm:justify-start gap-2 px-3 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs font-mono text-stone-300 transition cursor-pointer min-w-0"
          >
            <ArrowLeft className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Porción {prevPortion.portionNumber}: {prevPortion.title}</span>
          </button>
        ) : (
          <div />
        )}

        {nextPortion && (
          <button
            onClick={() => onSelectPortion(nextPortion.id)}
            className="flex items-center justify-center sm:justify-end gap-2 px-3 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs font-mono text-stone-300 transition cursor-pointer min-w-0"
          >
            <span className="truncate">Porción {nextPortion.portionNumber}: {nextPortion.title}</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </button>
        )}
      </div>
    </div>
  );
};
