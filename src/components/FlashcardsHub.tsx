import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { ALL_PORTIONS } from '../data/emsRepository';
import { FlashcardDeck } from './FlashcardDeck';

export const FlashcardsHub: React.FC = () => {
  const [selectedCatId, setSelectedCatId] = useState<number>(1);
  const [selectedPortionId, setSelectedPortionId] = useState<string>('all');

  const catPortions = ALL_PORTIONS.filter(p => p.categoryId === selectedCatId);

  const activeCards =
    selectedPortionId === 'all'
      ? catPortions.flatMap(p => p.flashcards)
      : catPortions.find(p => p.id === selectedPortionId)?.flashcards || [];

  const activeCategory = CATEGORIES_DATA.find(c => c.id === selectedCatId);

  return (
    <div className="space-y-4 sm:space-y-5 w-full max-w-full overflow-hidden">
      <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 max-w-full no-scrollbar">
        {CATEGORIES_DATA.map(c => (
          <button
            key={c.id}
            onClick={() => {
              setSelectedCatId(c.id);
              setSelectedPortionId('all');
            }}
            className={`btn-3d-base px-3 py-2 rounded-xl text-xs font-mono font-bold flex-shrink-0 cursor-pointer ${
              selectedCatId === c.id
                ? 'btn-3d-emerald text-white'
                : 'card-3d text-stone-300'
            }`}
          >
            Cat. {c.number}: {c.shortName}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto max-w-full text-xs font-mono text-stone-400 bg-stone-950 p-2 rounded-xl border border-stone-850 no-scrollbar">
        <Filter className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 ml-1" />
        <span className="flex-shrink-0 text-stone-300 font-semibold">Filtrar porción:</span>

        <button
          onClick={() => setSelectedPortionId('all')}
          className={`px-2.5 py-1 rounded transition flex-shrink-0 cursor-pointer ${
            selectedPortionId === 'all'
              ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          Todas las porciones ({catPortions.flatMap(p => p.flashcards).length} tarjetas)
        </button>

        {catPortions.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedPortionId(p.id)}
            className={`px-2.5 py-1 rounded transition flex-shrink-0 cursor-pointer ${
              selectedPortionId === p.id
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Porción {p.portionNumber} ({p.flashcards.length})
          </button>
        ))}
      </div>

      <FlashcardDeck
        cards={activeCards}
        categoryTitle={`${activeCategory?.name} – ${
          selectedPortionId === 'all'
            ? 'Mazo Completo de la Categoría'
            : `Porción ${selectedPortionId}`
        }`}
      />
    </div>
  );
};
