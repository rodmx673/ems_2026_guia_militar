import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  X,
  Volume2,
  Gauge,
  RotateCcw,
  Shield,
  BookOpen,
  Check,
  Trash2,
  Mic
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useEMSProgress } from '../context/ProgressContext';

interface SettingsModalProps {
  onClose: () => void;
  onReopenSplash: () => void;
}

const RATE_STEPS = [0.75, 1, 1.25, 1.5, 1.75];

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onReopenSplash }) => {
  const { settings, setAutoPlayTts, setSpeechRate, reopenOnboarding, resetSettings } = useSettings();
  const { resetAllProgress } = useEMSProgress();
  const [confirmReset, setConfirmReset] = useState(false);

  const rateIndex = Math.max(0, RATE_STEPS.indexOf(settings.speechRate));
  const isCustomRate = rateIndex === -1;

  return (
    <div
      className="fixed inset-0 z-[95] bg-stone-950/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl shadow-[0_24px_60px_-8px_rgba(0,0,0,0.95)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-b from-stone-800 to-stone-900 border-b border-stone-800 px-5 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <SettingsIcon className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <h2 className="font-extrabold text-sm font-mono text-stone-100">AJUSTES</h2>
          </div>
          <button
            onClick={onClose}
            className="btn-3d-base btn-3d-stone p-1.5 rounded-lg cursor-pointer flex-shrink-0"
            aria-label="Cerrar ajustes"
          >
            <X className="w-4 h-4 text-stone-300" />
          </button>
        </div>

        <div className="px-5 py-4 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Audio autostart */}
          <section>
            <p className="font-mono text-[11px] font-bold text-amber-400 mb-2.5 tracking-wide">
              AUDIO DOCTRINAL
            </p>
            <button
              onClick={() => setAutoPlayTts(!settings.autoPlayTts)}
              className={`btn-3d-base w-full px-4 py-3 rounded-xl cursor-pointer flex items-center justify-between gap-3 ${
                settings.autoPlayTts ? 'btn-3d-emerald' : 'btn-3d-stone'
              }`}
            >
              <span className="flex items-center gap-2.5 min-w-0">
                <Volume2 className="w-4 h-4 flex-shrink-0" />
                <span
                  className={`font-mono text-xs font-bold text-left ${
                    settings.autoPlayTts ? 'text-white' : 'text-stone-300'
                  }`}
                >
                  Inicio automático
                </span>
              </span>
              <span
                className={`font-mono text-[10px] font-bold px-2 py-1 rounded flex-shrink-0 ${
                  settings.autoPlayTts
                    ? 'bg-white/20 text-white'
                    : 'bg-stone-950/50 text-stone-400'
                }`}
              >
                {settings.autoPlayTts ? 'ACTIVADO' : 'DESACTIVADO'}
              </span>
            </button>
            <p className="text-[10px] font-mono text-stone-500 mt-1.5 leading-relaxed">
              Reproduce el guion doctrinal al abrir cada porción o módulo.
            </p>
          </section>

          {/* Speech rate */}
          <section>
            <p className="font-mono text-[11px] font-bold text-amber-400 mb-2.5 tracking-wide">
              VELOCIDAD DE VOZ
            </p>
            <div className="flex items-center gap-2">
              {RATE_STEPS.map((rate) => (
                <button
                  key={rate}
                  onClick={() => setSpeechRate(rate)}
                  className={`btn-3d-base flex-1 py-2 rounded-lg cursor-pointer font-mono text-[11px] font-bold ${
                    settings.speechRate === rate ? 'btn-3d-sky' : 'btn-3d-stone opacity-70'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
            {isCustomRate && (
              <p className="text-[10px] font-mono text-sky-400 mt-1.5">
                Velocidad personalizada activa: {settings.speechRate}x
              </p>
            )}
            <p className="text-[10px] font-mono text-stone-500 mt-1.5 leading-relaxed flex items-center gap-1.5">
              <Gauge className="w-3 h-3 flex-shrink-0" />
              Aplica a los reproductores de guion y al audios del asistente.
            </p>
          </section>

          {/* Entry / onboarding */}
          <section className="border-t border-stone-800 pt-4">
            <p className="font-mono text-[11px] font-bold text-amber-400 mb-2.5 tracking-wide">
              INGRESO
            </p>
            <div className="space-y-2">
              <button
                onClick={() => {
                  onClose();
                  onReopenSplash();
                }}
                className="btn-3d-base btn-3d-amber w-full px-4 py-2.5 rounded-xl cursor-pointer flex items-center gap-2.5"
              >
                <Shield className="w-4 h-4 text-stone-950 flex-shrink-0" />
                <span className="font-mono text-xs font-bold text-stone-950">
                  Ver Splash Militar
                </span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  reopenOnboarding();
                }}
                className="btn-3d-base btn-3d-sky w-full px-4 py-2.5 rounded-xl cursor-pointer flex items-center gap-2.5"
              >
                <BookOpen className="w-4 h-4 text-white flex-shrink-0" />
                <span className="font-mono text-xs font-bold text-white">
                  Reabrir ventana de ingreso
                </span>
              </button>
            </div>
            <p className="text-[10px] font-mono text-stone-500 mt-1.5 leading-relaxed">
              Último modo: {settings.entryMode === 'direct' ? 'Ingreso directo' : 'Sistema doctrinal'}
            </p>
          </section>

          {/* Reset */}
          <section className="border-t border-stone-800 pt-4">
            <p className="font-mono text-[11px] font-bold text-red-400 mb-2.5 tracking-wide">
              ZONA DE RIESGO
            </p>
            <button
              onClick={() => {
                if (confirmReset) {
                  resetSettings();
                  resetAllProgress();
                  onClose();
                } else {
                  setConfirmReset(true);
                  setTimeout(() => setConfirmReset(false), 4000);
                }
              }}
              className={`btn-3d-base w-full px-4 py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-2 ${
                confirmReset ? 'btn-3d-red' : 'btn-3d-stone opacity-80'
              }`}
            >
              {confirmReset ? (
                <Check className="w-4 h-4 text-white flex-shrink-0" />
              ) : (
                <Trash2 className="w-4 h-4 text-red-400 flex-shrink-0" />
              )}
              <span
                className={`font-mono text-xs font-bold ${
                  confirmReset ? 'text-white' : 'text-red-400'
                }`}
              >
                {confirmReset ? 'CONFIRMAR: BORRAR TODO' : 'Restablecer progreso y ajustes'}
              </span>
            </button>
            <p className="text-[10px] font-mono text-stone-500 mt-1.5 leading-relaxed flex items-center gap-1.5">
              <RotateCcw className="w-3 h-3 flex-shrink-0" />
              Borra racha, tarjetas dominadas, intentos de simulacro y preferencias de este
              dispositivo.
            </p>
          </section>

          <p className="text-[10px] font-mono text-stone-600 leading-relaxed flex items-start gap-1.5 border-t border-stone-800/70 pt-3">
            <Mic className="w-3 h-3 flex-shrink-0 mt-0.5" />
            El progreso se guarda solo en este navegador (localStorage). No se sincroniza
            entre dispositivos.
          </p>
        </div>
      </div>
    </div>
  );
};