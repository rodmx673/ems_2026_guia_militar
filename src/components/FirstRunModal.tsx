import React, { useState } from 'react';
import { Shield, Volume2, Zap, BookOpen, ArrowRight, Check, Settings as SettingsIcon } from 'lucide-react';
import { useSettings, EntryMode } from '../context/SettingsContext';

interface FirstRunModalProps {
  onEnter: (mode: EntryMode) => void;
}

export const FirstRunModal: React.FC<FirstRunModalProps> = ({ onEnter }) => {
  const { confirmOnboarding } = useSettings();
  const [autoPlayTts, setAutoPlayTts] = useState(true);
  const [hideOnboarding, setHideOnboarding] = useState(false);

  const handleConfirm = (mode: EntryMode) => {
    confirmOnboarding(mode, autoPlayTts, hideOnboarding);
    onEnter(mode);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl shadow-[0_24px_60px_-8px_rgba(0,0,0,0.95)] overflow-hidden my-auto">
        <div className="bg-gradient-to-b from-stone-800 to-stone-900 border-b border-stone-800 px-5 py-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-amber-400 to-amber-600 border border-amber-300 border-b-amber-800 shadow-[0_3px_0_0_#451a03] flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-stone-950 fill-stone-950" />
          </div>
          <div className="min-w-0">
            <h2 className="font-extrabold text-stone-100 text-sm sm:text-base leading-tight">
              EMS 2026 WORKBOOK
            </h2>
            <p className="font-mono text-[11px] text-stone-400">Configuración de ingreso</p>
          </div>
        </div>

        <div className="px-5 py-5 space-y-5">
          <div>
            <p className="font-mono text-[11px] font-bold text-amber-400 mb-2.5 tracking-wide">
              01 / ELIGE TU FORMA DE INGRESO
            </p>
            <div className="grid gap-2.5">
              <button
                onClick={() => handleConfirm('doctrinal')}
                className="btn-3d-base btn-3d-amber group text-left px-4 py-3 rounded-xl cursor-pointer flex items-center gap-3"
              >
                <BookOpen className="w-5 h-5 text-stone-950 flex-shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="block font-extrabold text-xs font-mono text-stone-950">
                    Ingresar al sistema doctrinal
                  </span>
                  <span className="block font-mono text-[10px] text-stone-800 font-semibold">
                    Inducción, método de 4 pasos y arquitectura del temario
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 text-stone-950 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleConfirm('direct')}
                className="btn-3d-base btn-3d-stone group text-left px-4 py-3 rounded-xl cursor-pointer flex items-center gap-3"
              >
                <Zap className="w-5 h-5 text-stone-300 flex-shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="block font-extrabold text-xs font-mono text-stone-100">
                    Ingresar directo
                  </span>
                  <span className="block font-mono text-[10px] text-stone-400 font-semibold">
                    Salta al Índice Maestro, directo a la materia
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 text-stone-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-4">
            <p className="font-mono text-[11px] font-bold text-amber-400 mb-2.5 tracking-wide">
              02 / AUDIO AUTOMÁTICO
            </p>
            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              Al abrir una porción, el audio doctrinal se inicia solo. Puedes detenerlo en
              cualquier momento con el botón de pausa.
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setAutoPlayTts(true)}
                className={`btn-3d-base px-3 py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-2 ${
                  autoPlayTts ? 'btn-3d-emerald' : 'btn-3d-emerald-inactive'
                }`}
              >
                {autoPlayTts ? (
                  <Check className="w-4 h-4 text-white flex-shrink-0" />
                ) : (
                  <Volume2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                )}
                <span
                  className={`font-mono text-[11px] font-bold ${
                    autoPlayTts ? 'text-white' : 'text-emerald-300'
                  }`}
                >
                  SÍ, INICIAR SOLO
                </span>
              </button>

              <button
                onClick={() => setAutoPlayTts(false)}
                className={`btn-3d-base px-3 py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-2 ${
                  !autoPlayTts ? 'btn-3d-stone' : 'btn-3d-stone opacity-70'
                }`}
              >
                {autoPlayTts ? (
                  <Volume2 className="w-4 h-4 text-stone-400 flex-shrink-0" />
                ) : (
                  <Check className="w-4 h-4 text-white flex-shrink-0" />
                )}
                <span
                  className={`font-mono text-[11px] font-bold ${
                    !autoPlayTts ? 'text-white' : 'text-stone-400'
                  }`}
                >
                  NO, MANUAL
                </span>
              </button>
            </div>
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer group select-none border-t border-stone-800/70 pt-4">
            <input
              type="checkbox"
              checked={hideOnboarding}
              onChange={(e) => setHideOnboarding(e.target.checked)}
              className="mt-0.5 w-4 h-4 flex-shrink-0 accent-amber-500 cursor-pointer"
            />
            <span className="min-w-0">
              <span className="block font-mono text-[11px] font-bold text-stone-300 group-hover:text-amber-400 transition-colors">
                No volver a mostrar esta ventana
              </span>
              <span className="block font-mono text-[10px] text-stone-500 leading-relaxed">
                Si no la marcas, se mostrará de nuevo al abrir la app. Puedes volver a
                abrirla desde{' '}
                <SettingsIcon className="inline w-3 h-3 align-text-bottom" /> Ajustes.
              </span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};