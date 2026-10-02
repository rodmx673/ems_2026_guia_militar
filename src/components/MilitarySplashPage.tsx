import React, { useState, useEffect } from 'react';
import {
  Shield,
  Target,
  Compass,
  Zap,
  CheckCircle2,
  Award,
  ChevronRight,
  Radio,
  Crosshair,
  Volume2,
  VolumeX,
  Layers,
  BookOpen
} from 'lucide-react';

interface MilitarySplashPageProps {
  onEnter: () => void;
}

export const MilitarySplashPage: React.FC<MilitarySplashPageProps> = ({ onEnter }) => {
  const [progressPct, setProgressPct] = useState(0);
  const [bootStep, setBootStep] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Subtle military beep using Web Audio API
  const playTacticalChirp = (freq = 880, duration = 0.08) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext unavailable or blocked by browser policy
    }
  };

  // Automated military boot telemetry sequence
  useEffect(() => {
    const timer = setInterval(() => {
      setProgressPct(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsReady(true);
          playTacticalChirp(1200, 0.15);
          return 100;
        }
        const next = prev + 4;
        if (next === 24) {
          setBootStep(1);
          playTacticalChirp(600, 0.05);
        } else if (next === 52) {
          setBootStep(2);
          playTacticalChirp(750, 0.05);
        } else if (next === 80) {
          setBootStep(3);
          playTacticalChirp(900, 0.05);
        } else if (next >= 96) {
          setBootStep(4);
        }
        return next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [soundEnabled]);

  const handleEnterApp = () => {
    playTacticalChirp(1040, 0.2);
    if (dontShowAgain) {
      try {
        localStorage.setItem('ems_splash_dismissed', 'true');
      } catch {
        // LocalStorage unavailable
      }
    }
    onEnter();
  };

  const bootMessages = [
    { title: 'INICIALIZANDO MOTOR TÁCTICO DOCTRINAL...', code: 'SYS-INIT // EMS-2026' },
    { title: 'CARGANDO 8 CATEGORÍAS Y 46 PORCIONES MODULARES...', code: 'LEY-DISC // CJM // DEBERES' },
    { title: 'VERIFICANDO 460 TARJETAS MNEMOTÉCNICAS Y 60 CASOS...', code: 'REPETICIÓN ESPACIADA OK' },
    { title: 'CONECTANDO ASISTENTE Y 6 SIMULACROS OFICIALES...', code: 'CRONÓMETRO Y CLAVE LISTOS' },
    { title: 'AUTORIZACIÓN DE MANDO CONCEDIDA: ACCESO AUTORIZADO', code: 'STATUS: 100% OPERATIVO' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950 text-stone-100 flex flex-col justify-between overflow-y-auto overflow-x-hidden font-sans select-none">
      {/* Background Tactical Grid & Radar Sweep */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 65%),
                              linear-gradient(rgba(245, 158, 11, 0.08) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(245, 158, 11, 0.08) 1px, transparent 1px)`,
            backgroundSize: '100% 100%, 32px 32px, 32px 32px'
          }}
        />
        {/* Subtle scanline effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent h-48 animate-pulse" />
      </div>

      {/* Top Tactical HUD Bar */}
      <header className="relative z-10 p-3 sm:p-5 flex items-center justify-between border-b border-stone-800/80 bg-stone-950/80 backdrop-blur-sm">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-400 tracking-widest uppercase">
                RED TÁCTICA SEDENA // EMS 2026
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            </div>
            <p className="text-[10px] text-stone-400 font-mono hidden sm:block">
              COORD: 22°03′24″N 98°10′48″W • SECTOR PÁNUCO, VERACRUZ
            </p>
          </div>
        </div>

        {/* Audio Toggle & Fast Skip Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-amber-400 transition cursor-pointer text-xs flex items-center gap-1 font-mono"
            title={soundEnabled ? 'Silenciar efectos' : 'Activar efectos'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline text-[11px]">{soundEnabled ? 'AUDIO ON' : 'AUDIO OFF'}</span>
          </button>

          <button
            onClick={handleEnterApp}
            className="btn-3d-base btn-3d-amber px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer flex items-center gap-1 text-stone-950"
            title="Saltar intro e ingresar de inmediato"
          >
            <span>INGRESAR DIRECTO</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Center Tactical Splash Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-3.5 sm:p-6 my-auto">
        <div className="max-w-2xl w-full window-3d rounded-2xl p-5 sm:p-8 border-2 border-amber-500/40 relative overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
          {/* Tactical Corner Crosshairs */}
          <div className="absolute top-2 left-2 text-amber-500/40 font-mono text-[10px] select-none pointer-events-none">
            ┌── [MIL-STD-2026]
          </div>
          <div className="absolute top-2 right-2 text-amber-500/40 font-mono text-[10px] select-none pointer-events-none">
            [PÁNUCO VER.] ──┐
          </div>
          <div className="absolute bottom-2 left-2 text-amber-500/40 font-mono text-[10px] select-none pointer-events-none">
            └── [INF-PARAC]
          </div>
          <div className="absolute bottom-2 right-2 text-amber-500/40 font-mono text-[10px] select-none pointer-events-none">
            [SGTO. 1/O.] ──┘
          </div>

          <div className="text-center space-y-4 pt-2">
            {/* Military Crest / Chevron Shield Emblem */}
            <div className="relative inline-block mx-auto">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-b from-stone-900 via-amber-950/40 to-stone-900 border-2 border-amber-500/60 shadow-[0_0_35px_rgba(245,158,11,0.25)] flex flex-col items-center justify-center p-2 relative group">
                {/* 3 Chevrons Sargento 1/o. Military Badge */}
                <div className="flex flex-col items-center justify-center -space-y-1 text-amber-400">
                  <Shield className="w-8 h-8 text-amber-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.6)]" />
                  <div className="flex flex-col items-center space-y-0.5 mt-1">
                    <span className="w-7 h-1 bg-amber-400 rounded-sm shadow-sm" />
                    <span className="w-5 h-1 bg-amber-400 rounded-sm shadow-sm" />
                    <span className="w-3 h-0.5 bg-amber-500 rounded-sm" />
                  </div>
                </div>

                <div className="absolute -bottom-2.5 px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 font-mono font-extrabold text-[9px] uppercase tracking-wider shadow-md">
                  EMS 2026
                </div>
              </div>
            </div>

            {/* Sub-badge: Institución y Escalafón */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                <span>CURSO DE FORMACIÓN PARA SARGENTO 1/O.</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-400 font-mono">
                ESCUELA MILITAR DE SARGENTOS • INFANTERÍA Y FUSILEROS PARACAIDISTAS
              </p>
            </div>

            {/* MANDATORY PROMINENT USER TEXT */}
            <div className="py-2">
              <div className="inline-block p-1 rounded-xl bg-gradient-to-r from-amber-600/30 via-yellow-500/40 to-amber-600/30 border border-amber-500/50 shadow-inner">
                <div className="px-4 py-3 rounded-lg bg-stone-950/90 border border-amber-400/40">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-mono tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 uppercase drop-shadow-[0_2px_10px_rgba(245,158,11,0.4)]">
                    CONCEPTOS AI MX - PANUCO VER. 2026
                  </h1>
                </div>
              </div>
              <p className="text-[11px] sm:text-xs text-amber-400/80 font-mono font-bold tracking-widest uppercase mt-2">
                PLATAFORMA INTEGRAL DE ADIESTRAMIENTO TÁCTICO-DOCTRINAL
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 pb-2">
              <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800 text-center">
                <div className="text-base sm:text-lg font-black font-mono text-amber-400">8</div>
                <div className="text-[10px] text-stone-400 uppercase font-mono">Categorías</div>
              </div>
              <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800 text-center">
                <div className="text-base sm:text-lg font-black font-mono text-amber-400">46</div>
                <div className="text-[10px] text-stone-400 uppercase font-mono">Porciones</div>
              </div>
              <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800 text-center">
                <div className="text-base sm:text-lg font-black font-mono text-amber-400">460</div>
                <div className="text-[10px] text-stone-400 uppercase font-mono">Tarjetas</div>
              </div>
              <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800 text-center">
                <div className="text-base sm:text-lg font-black font-mono text-amber-400">6</div>
                <div className="text-[10px] text-stone-400 uppercase font-mono">Simulacros</div>
              </div>
            </div>

            {/* Boot Telemetry Loading Progress Bar */}
            <div className="space-y-2 pt-1 text-left">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 text-stone-300">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="font-bold text-amber-400">{bootMessages[bootStep]?.code}</span>
                </div>
                <span className="font-extrabold text-amber-400">{progressPct}%</span>
              </div>

              {/* Progress Bar Track */}
              <div className="w-full h-3 bg-stone-950 rounded-full border border-stone-800 overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 rounded-full transition-all duration-100 shadow-[0_0_12px_rgba(245,158,11,0.7)]"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              <p className="text-[11px] text-stone-400 font-mono truncate">
                &gt; {bootMessages[bootStep]?.title}
              </p>
            </div>

            {/* Main Tactile Action Button */}
            <div className="pt-3 space-y-3">
              <button
                type="button"
                onClick={handleEnterApp}
                className="w-full btn-3d-base btn-3d-amber py-3.5 sm:py-4 px-6 rounded-xl text-stone-950 font-mono font-black text-sm sm:text-base tracking-wider uppercase cursor-pointer flex items-center justify-center gap-2 shadow-[0_12px_28px_rgba(245,158,11,0.35)]"
              >
                <span>⚔️ INGRESAR AL SISTEMA DOCTRINAL</span>
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Checkbox: No volver a mostrar al inicio */}
              <div className="flex items-center justify-center gap-2 text-xs text-stone-400 font-mono pt-1">
                <label className="flex items-center gap-2 cursor-pointer hover:text-stone-300 transition">
                  <input
                    type="checkbox"
                    checked={dontShowAgain}
                    onChange={e => setDontShowAgain(e.target.checked)}
                    className="w-4 h-4 rounded border-stone-700 bg-stone-900 text-amber-500 focus:ring-amber-500 cursor-pointer"
                  />
                  <span>No mostrar automáticamente al abrir la app</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Tactical Footer Coordinates */}
      <footer className="relative z-10 p-3 sm:p-4 border-t border-stone-800/80 bg-stone-950/80 backdrop-blur-sm text-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-stone-400">
          <div>
            <strong className="text-amber-400">CONCEPTOS AI MX</strong> • PÁNUCO, VERACRUZ • CICLO EMS 2026
          </div>
          <div>
            DISCIPLINA • HONOR • LEALTAD • DOCTRINA MILITAR MEXICANA
          </div>
        </div>
      </footer>
    </div>
  );
};
