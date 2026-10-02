import React, { useState, useEffect } from 'react';
import { Layers, RotateCw, CheckCircle2, ChevronLeft, ChevronRight, Shuffle, BookmarkCheck } from 'lucide-react';
import { Flashcard } from '../types/ems';
import { useEMSProgress } from '../context/ProgressContext';
import { useSettings } from '../context/SettingsContext';
import { ClassStepTTSPlayer, TTSPlayItem } from './ClassStepTTSPlayer';

interface FlashcardDeckProps {
  cards: Flashcard[];
  portionNumber?: string;
  categoryTitle?: string;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  cards,
  portionNumber,
  categoryTitle
}) => {
  const { progress, toggleFlashcardMastered } = useEMSProgress();
  const { settings } = useSettings();
  const [deck, setDeck] = useState<Flashcard[]>(cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'pending' | 'mastered'>('all');

  useEffect(() => {
    setDeck(cards);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [cards]);

  const filteredCards = deck.filter(c => {
    const isMastered = progress.masteredFlashcardIds.includes(c.id);
    if (filterMode === 'mastered') return isMastered;
    if (filterMode === 'pending') return !isMastered;
    return true;
  });

  const currentCard = filteredCards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
  };

  const isCurrentMastered = currentCard ? progress.masteredFlashcardIds.includes(currentCard.id) : false;

  // Build audio items for TTS
  const audioItems: TTSPlayItem[] = filteredCards.map((c, idx) => ({
    id: `card-${c.id}`,
    label: `Tarjeta ${idx + 1}: ${c.question.slice(0, 45)}...`,
    sublabel: `Artículo ${c.article}`,
    text: `Tarjeta ${idx + 1} de ${filteredCards.length}. Pregunta: ${c.question}. Respuesta: ${c.answer}. Fundamento legal: Artículo ${c.article}.`
  }));

  const handleAudioItemChange = (newIdx: number) => {
    if (newIdx >= 0 && newIdx < filteredCards.length) {
      setCurrentIndex(newIdx);
      setIsFlipped(false);
    }
  };

  return (
    <div className="window-3d rounded-xl p-3.5 sm:p-5 w-full max-w-full overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0 shadow-sm">
            <Layers className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] sm:text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 shadow-sm">
                TARJETAS DE MEMORIA (FLASHCARDS)
              </span>
              {portionNumber && (
                <span className="text-[11px] sm:text-xs text-stone-400 font-mono">Porción {portionNumber}</span>
              )}
            </div>
            <h4 className="text-xs sm:text-sm font-semibold text-stone-200 mt-0.5 truncate">
              {categoryTitle || 'Mazo Mnemotécnico EMS 2026'}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-stone-950/90 p-1 rounded-lg border border-stone-800 text-[11px] sm:text-xs font-mono w-full sm:w-auto justify-between sm:justify-start overflow-x-auto shadow-inner">
          <button
            onClick={() => { setFilterMode('all'); setCurrentIndex(0); setIsFlipped(false); }}
            className={`btn-3d-base px-2.5 py-1 rounded-md transition cursor-pointer flex-1 sm:flex-none text-center ${
              filterMode === 'all' ? 'btn-3d-amber text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Todas ({cards.length})
          </button>
          <button
            onClick={() => { setFilterMode('pending'); setCurrentIndex(0); setIsFlipped(false); }}
            className={`btn-3d-base px-2.5 py-1 rounded-md transition cursor-pointer flex-1 sm:flex-none text-center ${
              filterMode === 'pending' ? 'btn-3d-amber text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Por repasar
          </button>
          <button
            onClick={() => { setFilterMode('mastered'); setCurrentIndex(0); setIsFlipped(false); }}
            className={`btn-3d-base px-2.5 py-1 rounded-md transition cursor-pointer flex-1 sm:flex-none text-center ${
              filterMode === 'mastered' ? 'btn-3d-emerald text-white font-bold' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Dominadas
          </button>
        </div>
      </div>

      {/* TTS Audio Player for Flashcards */}
      {audioItems.length > 0 && (
<ClassStepTTSPlayer
            stepBadge="AUDIO TARJETAS"
            portionNumber={portionNumber || ''}
            items={audioItems}
            activeItemIndex={currentIndex}
            onItemChange={handleAudioItemChange}
            autoStart={settings.autoPlayTts}
            defaultSpeed={settings.speechRate}
          />
      )}

      {filteredCards.length === 0 ? (
        <div className="text-center py-12 bg-stone-950 rounded-xl border border-stone-800 text-stone-400">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2 opacity-80" />
          <p className="font-semibold text-stone-200">¡Excelente avance militar!</p>
          <p className="text-xs mt-1">No hay tarjetas pendientes en esta sección.</p>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-3 px-1">
            <span>
              Tarjeta <strong className="text-amber-400">{currentIndex + 1}</strong> de {filteredCards.length}
            </span>
            <div className="flex items-center gap-2">
              {isCurrentMastered ? (
                <span className="flex items-center gap-1 text-emerald-400 bg-emerald-950/60 border border-emerald-700/60 px-2 py-0.5 rounded text-[11px] font-bold shadow-sm">
                  <BookmarkCheck className="w-3.5 h-3.5" /> DOMINADA
                </span>
              ) : (
                <span className="text-stone-400 text-[11px]">En aprendizaje</span>
              )}
              <button
                onClick={handleShuffle}
                className="p-1 hover:text-amber-300 transition text-stone-400 cursor-pointer"
                title="Barajar tarjetas"
              >
                <Shuffle className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[220px] card-3d rounded-2xl p-6 flex flex-col justify-between relative group"
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className={`px-2.5 py-0.5 rounded font-bold ${
                isFlipped ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 shadow-sm' : 'bg-amber-950/80 text-amber-300 border border-amber-700/60 shadow-sm'
              }`}>
                {isFlipped ? 'RESPUESTA / FUNDAMENTO (REVERSO)' : 'PREGUNTA DOCTRINARIA (FRENTE)'}
              </span>

              <span className="text-stone-400 flex items-center gap-1 group-hover:text-amber-400 transition text-[11px]">
                <RotateCw className="w-3.5 h-3.5" /> Haz clic para voltear
              </span>
            </div>

            <div className="my-auto py-4 text-center">
              {!isFlipped ? (
                <p className="text-base md:text-lg font-semibold text-stone-100 leading-relaxed font-sans max-w-xl mx-auto">
                  {currentCard.question}
                </p>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm md:text-base font-medium text-stone-200 leading-relaxed font-sans max-w-xl mx-auto">
                    {currentCard.answer}
                  </p>
                  <div className="inline-block px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold shadow-sm">
                    Fundamento Legal: {currentCard.article}
                  </div>
                </div>
              )}
            </div>

            <div className="text-center text-[11px] font-mono text-stone-400">
              Toca la tarjeta para girar • Porción {currentCard.portionId}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-2.5 mt-4">
            <button
              onClick={handlePrev}
              className="btn-3d-base btn-3d-stone order-1 sm:order-1 flex items-center justify-center gap-1 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Anterior
            </button>

            <button
              onClick={() => toggleFlashcardMastered(currentCard.id)}
              className={`btn-3d-base col-span-2 sm:col-span-1 order-3 sm:order-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                isCurrentMastered
                  ? 'btn-3d-stone text-stone-400'
                  : 'btn-3d-emerald text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isCurrentMastered ? 'Quitar de Dominadas' : 'Marcar como Dominada'}
            </button>

            <button
              onClick={handleNext}
              className="btn-3d-base btn-3d-stone order-2 sm:order-3 flex items-center justify-center gap-1 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold cursor-pointer"
            >
              Siguiente <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
