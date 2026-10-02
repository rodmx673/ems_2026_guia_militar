import React, { useState, useEffect } from 'react';
import {
  Compass,
  ListChecks,
  BookOpen,
  Layers,
  HelpCircle,
  Target,
  Bot,
  Terminal,
  BarChart3,
  Flame,
  Award,
  Menu,
  X,
  Shield,
  LayoutDashboard,
  ChevronRight,
  Settings as SettingsIcon
} from 'lucide-react';
import { ProgressProvider, useEMSProgress } from './context/ProgressContext';
import { SettingsProvider, useSettings, EntryMode } from './context/SettingsContext';
import { FirstRunModal } from './components/FirstRunModal';
import { SettingsModal } from './components/SettingsModal';
import { WelcomeTutorialView } from './components/WelcomeTutorialView';
import { MasterIndexView } from './components/MasterIndexView';
import { DashboardView } from './components/DashboardView';
import { CategoriesListView } from './components/CategoriesListView';
import { PortionDetailView } from './components/PortionDetailView';
import { FlashcardsHub } from './components/FlashcardsHub';
import { QuizzesHub } from './components/QuizzesHub';
import { SimulacrosListView } from './components/SimulacrosListView';
import { SimulacroRunner } from './components/SimulacroRunner';
import { AssistantView } from './components/AssistantView';
import { PromptsExporterView } from './components/PromptsExporterView';
import { ProgressView } from './components/ProgressView';
import { MilitarySplashPage } from './components/MilitarySplashPage';
import { getPortionById } from './data/emsRepository';
import { SIMULACROS_DATA } from './data/simulacrosData';
import { Simulacro } from './types/ems';

type ViewMode =
  | 'welcome'
  | 'master-index'
  | 'dashboard'
  | 'categories'
  | 'category-detail'
  | 'portion'
  | 'flashcards'
  | 'quizzes'
  | 'simulacros'
  | 'simulacro-running'
  | 'assistant'
  | 'prompts'
  | 'progress';

const MainApp: React.FC = () => {
  const { progress } = useEMSProgress();
  const { settings, showOnboarding } = useSettings();
  // Splash Page: defaults to true on first load or can be re-triggered anytime
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ems_splash_dismissed') !== 'true';
    } catch {
      return true;
    }
  });
  // Start on TEMA 1: BIENVENIDA Y TUTORIAL GLOBAL
  const [currentView, setCurrentView] = useState<ViewMode>('welcome');
  const [selectedPortionId, setSelectedPortionId] = useState<string>('1.1');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
  const [activeSimulacro, setActiveSimulacro] = useState<Simulacro | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Global TTS management: cancel speech on any view switch, portion change, or splash trigger
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [currentView, selectedPortionId, selectedCategoryId, activeSimulacro, showSplash, showOnboarding]);

  // Cancel TTS when browser tab is switched, minimized, or window closed
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
    const handlePageHide = () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('beforeunload', handlePageHide);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('beforeunload', handlePageHide);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSelectPortion = (portionId: string) => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setSelectedPortionId(portionId);
    setCurrentView('portion');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryId: number) => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setSelectedCategoryId(categoryId);
    setCurrentView('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartSimulacro = (simulacro: Simulacro) => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setActiveSimulacro(simulacro);
    setCurrentView('simulacro-running');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartSimulacroById = (simulacroId: string) => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    const sim = SIMULACROS_DATA.find(s => s.id === simulacroId);
    if (sim) {
      handleStartSimulacro(sim);
    }
  };

  const handleNavigate = (view: string, param?: any) => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (view === 'category-detail') {
      if (typeof param === 'number') {
        setSelectedCategoryId(param);
      }
      setCurrentView('categories');
    } else {
      setCurrentView(view as ViewMode);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPortion = getPortionById(selectedPortionId) || getPortionById('1.1')!;

  const totalPercentage = Math.min(
    100,
    Math.round(
      ((progress.completedPortionIds.length / 46) * 0.4 +
        (progress.masteredFlashcardIds.length / 460) * 0.3 +
        (progress.examAttempts.filter(a => a.passed).length / 6) * 0.3) *
        100
    )
  );

  if (showOnboarding) {
    return (
      <FirstRunModal
        onEnter={(mode: EntryMode) => {
          handleNavigate(mode === 'direct' ? 'master-index' : 'welcome');
        }}
      />
    );
  }

  if (showSplash) {
    return <MilitarySplashPage onEnter={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-600/30 selection:text-amber-200">
      {/* Top Header Navbar with Deep 3D Shadowing */}
      <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 shadow-[0_12px_30px_-5px_rgba(0,0,0,0.9),0_2px_4px_rgba(0,0,0,0.6)] w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo / Badge */}
          <div
            onClick={() => handleNavigate('welcome')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0"
            title="Ir a Inducción y Contexto"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-b from-amber-400 to-amber-600 border border-amber-300 border-b-amber-800 shadow-[0_3px_0_0_#451a03,0_6px_12px_rgba(0,0,0,0.6)] flex items-center justify-center text-stone-950 font-extrabold group-hover:scale-105 active:scale-95 transition flex-shrink-0">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-stone-950 fill-stone-950" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="font-extrabold text-xs sm:text-sm tracking-tight text-stone-100 group-hover:text-amber-400 transition truncate">
                  EMS 2026 WORKBOOK
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex-shrink-0">
                  SGTO. 1/O.
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-stone-400 font-mono hidden sm:block truncate">
                Infantería y Fusileros Paracaidistas
              </p>
            </div>
          </div>

          {/* Center Navigation Links (Desktop with 3D tactile buttons & distinct section colors) */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {/* 1. 🏠 Inducción y Contexto (Sky) */}
            <button
              onClick={() => handleNavigate('welcome')}
              className={`btn-3d-base px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5 ${
                currentView === 'welcome' ? 'btn-3d-sky' : 'btn-3d-sky-inactive'
              }`}
              title="Inducción y Contexto EMS 2026"
            >
              <Compass className={`w-3.5 h-3.5 ${currentView === 'welcome' ? 'text-white' : 'text-sky-300'}`} />
              <span>🏠 Inducción y Contexto</span>
            </button>

            {/* 2. 📋 Índice Maestro (Amber) */}
            <button
              onClick={() => handleNavigate('master-index')}
              className={`btn-3d-base px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5 ${
                currentView === 'master-index' ? 'btn-3d-amber' : 'btn-3d-amber-inactive'
              }`}
              title="Índice Maestro Doctrinal"
            >
              <ListChecks className={`w-3.5 h-3.5 ${currentView === 'master-index' ? 'text-stone-950' : 'text-amber-400'}`} />
              <span>📋 Índice Maestro</span>
            </button>

            {/* 3. 📖 Temas 1-8: Categorías (Blue) */}
            <button
              onClick={() => handleNavigate('categories')}
              className={`btn-3d-base px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5 ${
                currentView === 'categories' || currentView === 'portion' ? 'btn-3d-blue' : 'btn-3d-blue-inactive'
              }`}
              title="Temas 1 al 8: Categorías Doctrinales"
            >
              <BookOpen className={`w-3.5 h-3.5 ${currentView === 'categories' || currentView === 'portion' ? 'text-white' : 'text-blue-300'}`} />
              <span>📖 Temas 1-8: Categorías</span>
            </button>

            {/* 4. 🃏 Tarjetas (460) (Emerald) */}
            <button
              onClick={() => handleNavigate('flashcards')}
              className={`btn-3d-base px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5 ${
                currentView === 'flashcards' ? 'btn-3d-emerald' : 'btn-3d-emerald-inactive'
              }`}
              title="Tarjetas de Estudio Nemotécnico"
            >
              <Layers className={`w-3.5 h-3.5 ${currentView === 'flashcards' ? 'text-white' : 'text-emerald-300'}`} />
              <span>Tarjetas (460)</span>
            </button>

            {/* 5. ❓ Quizzes (Purple) */}
            <button
              onClick={() => handleNavigate('quizzes')}
              className={`btn-3d-base px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5 ${
                currentView === 'quizzes' ? 'btn-3d-purple' : 'btn-3d-purple-inactive'
              }`}
              title="Quizzes por Porción"
            >
              <HelpCircle className={`w-3.5 h-3.5 ${currentView === 'quizzes' ? 'text-white' : 'text-purple-300'}`} />
              <span>Quizzes</span>
            </button>

            {/* 6. 🎯 Tema 9: Simulacros (Red) */}
            <button
              onClick={() => handleNavigate('simulacros')}
              className={`btn-3d-base px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5 ${
                currentView === 'simulacros' || currentView === 'simulacro-running' ? 'btn-3d-red' : 'btn-3d-red-inactive'
              }`}
              title="Tema 9: 6 Simulacros Oficiales"
            >
              <Target className={`w-3.5 h-3.5 ${currentView === 'simulacros' || currentView === 'simulacro-running' ? 'text-white' : 'text-red-300'}`} />
              <span>🎯 Tema 9: Simulacros</span>
            </button>

            {/* 7. 🤖 Asistente EMS (Teal) */}
            <button
              onClick={() => handleNavigate('assistant')}
              className={`btn-3d-base px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5 ${
                currentView === 'assistant' ? 'btn-3d-teal' : 'btn-3d-teal-inactive'
              }`}
              title="Tutor y Asistente Doctrinal"
            >
              <Bot className={`w-3.5 h-3.5 ${currentView === 'assistant' ? 'text-white' : 'text-teal-300'}`} />
              <span>Asistente EMS</span>
            </button>

            {/* 8. 📊 Racha & Métricas (Orange) */}
            <button
              onClick={() => handleNavigate('dashboard')}
              className={`btn-3d-base px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5 ${
                currentView === 'dashboard' ? 'btn-3d-orange' : 'btn-3d-orange-inactive'
              }`}
              title="Panel de Racha y Métricas Operativas"
            >
              <BarChart3 className={`w-3.5 h-3.5 ${currentView === 'dashboard' ? 'text-white' : 'text-orange-300'}`} />
              <span>Racha & Métricas</span>
            </button>

            {/* 9. ⚙️ Ajustes */}
            <button
              onClick={() => setSettingsOpen(true)}
              className="btn-3d-base btn-3d-stone px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5"
              title="Ajustes: audio, velocidad de voz e ingreso"
            >
              <SettingsIcon className="w-3.5 h-3.5 text-stone-300" />
              <span>Ajustes</span>
            </button>
          </nav>

          {/* Right Stats Quick Pill & Splash Militar Button */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Splash Militar Re-open Button */}
            <button
              onClick={() => setShowSplash(true)}
              className="btn-3d-base btn-3d-amber hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl cursor-pointer"
              title="Abrir Splash Militar: CONCEPTOS AI MX - PANUCO VER. 2026"
            >
              <Shield className="w-3.5 h-3.5 text-stone-950 fill-stone-950" />
              <span className="font-extrabold text-xs font-mono text-stone-950">
                Splash Militar
              </span>
            </button>

            <button
              onClick={() => handleNavigate('dashboard')}
              className="btn-3d-base btn-3d-streak flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl cursor-pointer"
              title="Racha y Simulacros: 4 días de racha | 6 simulacros oficiales"
            >
              <div className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 fill-orange-500/20 animate-pulse flex-shrink-0" />
                <span className="font-extrabold text-xs sm:text-sm font-mono text-orange-300">
                  {progress.streakDays || 4}d
                </span>
              </div>
              <span className="text-amber-500/80 font-bold font-mono text-xs sm:text-sm">|</span>
              <div className="flex items-center gap-1">
                <Target className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 flex-shrink-0" />
                <span className="font-extrabold text-xs sm:text-sm font-mono text-amber-300">
                  6
                </span>
              </div>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-3d-base btn-3d-stone xl:hidden p-2 rounded-lg cursor-pointer"
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-stone-200" />}
            </button>
          </div>
        </div>

        {/* Responsive Horizontal 3D Quick-Action Ribbon for Mobile / Tablet Viewports */}
        <div className="xl:hidden bg-stone-950/95 border-t border-stone-850 px-2 py-2 overflow-x-auto flex items-center gap-2 no-scrollbar shadow-[0_8px_16px_rgba(0,0,0,0.85)]">
          {/* Splash Militar quick button */}
          <button
            onClick={() => setShowSplash(true)}
            className="btn-3d-base btn-3d-amber px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 text-stone-950"
            title="Abrir Splash Militar: CONCEPTOS AI MX - PANUCO VER. 2026"
          >
            <Shield className="w-3.5 h-3.5 text-stone-950 fill-stone-950" />
            <span>🎖️ Splash Militar</span>
          </button>

          {/* 1. Sky */}
          <button
            onClick={() => handleNavigate('welcome')}
            className={`btn-3d-base px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 ${
              currentView === 'welcome' ? 'btn-3d-sky' : 'btn-3d-sky-inactive'
            }`}
          >
            <Compass className="w-3.5 h-3.5 flex-shrink-0" />
            <span>🏠 Inducción y Contexto</span>
          </button>

          {/* 2. Amber */}
          <button
            onClick={() => handleNavigate('master-index')}
            className={`btn-3d-base px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 ${
              currentView === 'master-index' ? 'btn-3d-amber' : 'btn-3d-amber-inactive'
            }`}
          >
            <ListChecks className="w-3.5 h-3.5 flex-shrink-0" />
            <span>📋 Índice Maestro</span>
          </button>

          {/* 3. Blue */}
          <button
            onClick={() => handleNavigate('categories')}
            className={`btn-3d-base px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 ${
              currentView === 'categories' || currentView === 'portion' ? 'btn-3d-blue' : 'btn-3d-blue-inactive'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
            <span>📖 Temas 1-8: Categorías</span>
          </button>

          {/* 4. Emerald */}
          <button
            onClick={() => handleNavigate('flashcards')}
            className={`btn-3d-base px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 ${
              currentView === 'flashcards' ? 'btn-3d-emerald' : 'btn-3d-emerald-inactive'
            }`}
          >
            <Layers className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Tarjetas (460)</span>
          </button>

          {/* 5. Purple */}
          <button
            onClick={() => handleNavigate('quizzes')}
            className={`btn-3d-base px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 ${
              currentView === 'quizzes' ? 'btn-3d-purple' : 'btn-3d-purple-inactive'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Quizzes</span>
          </button>

          {/* 6. Red */}
          <button
            onClick={() => handleNavigate('simulacros')}
            className={`btn-3d-base px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 ${
              currentView === 'simulacros' || currentView === 'simulacro-running' ? 'btn-3d-red' : 'btn-3d-red-inactive'
            }`}
          >
            <Target className="w-3.5 h-3.5 flex-shrink-0" />
            <span>🎯 Tema 9: Simulacros</span>
          </button>

          {/* 7. Teal */}
          <button
            onClick={() => handleNavigate('assistant')}
            className={`btn-3d-base px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 ${
              currentView === 'assistant' ? 'btn-3d-teal' : 'btn-3d-teal-inactive'
            }`}
          >
            <Bot className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Asistente EMS</span>
          </button>

          {/* 8. Orange */}
          <button
            onClick={() => handleNavigate('dashboard')}
            className={`btn-3d-base px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 ${
              currentView === 'dashboard' ? 'btn-3d-orange' : 'btn-3d-orange-inactive'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Racha & Métricas</span>
          </button>

          {/* 9. Ajustes */}
          <button
            onClick={() => setSettingsOpen(true)}
            className="btn-3d-base btn-3d-stone px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold whitespace-nowrap flex items-center gap-1.5 flex-shrink-0"
            title="Ajustes"
          >
            <SettingsIcon className="w-3.5 h-3.5 text-stone-300 flex-shrink-0" />
            <span>⚙️ Ajustes</span>
          </button>
        </div>

        {/* Mobile Dropdown Menu with 3D tactile buttons */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-stone-950 border-b border-stone-800 p-3.5 space-y-2 shadow-[0_20px_40px_rgba(0,0,0,0.95)] max-h-[80vh] overflow-y-auto">
            {/* Splash Militar in Mobile Menu */}
            <button
              onClick={() => {
                setShowSplash(true);
                setMobileMenuOpen(false);
              }}
              className="btn-3d-base w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2.5 btn-3d-amber text-stone-950 shadow-md"
            >
              <Shield className="w-4 h-4 text-stone-950 fill-stone-950" />
              <span>🎖️ Ver Splash Militar (Pánuco Ver. 2026)</span>
            </button>

            {/* 1. Sky */}
            <button
              onClick={() => handleNavigate('welcome')}
              className={`btn-3d-base w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2.5 ${
                currentView === 'welcome' ? 'btn-3d-sky' : 'btn-3d-sky-inactive'
              }`}
            >
              <Compass className="w-4 h-4 text-sky-400" />
              <span>🏠 Inducción y Contexto</span>
            </button>

            {/* 2. Amber */}
            <button
              onClick={() => handleNavigate('master-index')}
              className={`btn-3d-base w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2.5 ${
                currentView === 'master-index' ? 'btn-3d-amber' : 'btn-3d-amber-inactive'
              }`}
            >
              <ListChecks className="w-4 h-4 text-amber-400" />
              <span>📋 Índice Maestro</span>
            </button>

            {/* 3. Blue */}
            <button
              onClick={() => handleNavigate('categories')}
              className={`btn-3d-base w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2.5 ${
                currentView === 'categories' || currentView === 'portion' ? 'btn-3d-blue' : 'btn-3d-blue-inactive'
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>📖 Temas 1-8: Categorías</span>
            </button>

            {/* 4. Emerald */}
            <button
              onClick={() => handleNavigate('flashcards')}
              className={`btn-3d-base w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2.5 ${
                currentView === 'flashcards' ? 'btn-3d-emerald' : 'btn-3d-emerald-inactive'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Tarjetas (460)</span>
            </button>

            {/* 5. Purple */}
            <button
              onClick={() => handleNavigate('quizzes')}
              className={`btn-3d-base w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2.5 ${
                currentView === 'quizzes' ? 'btn-3d-purple' : 'btn-3d-purple-inactive'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-purple-400" />
              <span>Quizzes</span>
            </button>

            {/* 6. Red */}
            <button
              onClick={() => handleNavigate('simulacros')}
              className={`btn-3d-base w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2.5 ${
                currentView === 'simulacros' || currentView === 'simulacro-running' ? 'btn-3d-red' : 'btn-3d-red-inactive'
              }`}
            >
              <Target className="w-4 h-4 text-red-400" />
              <span>🎯 Tema 9: Simulacros</span>
            </button>

            {/* 7. Teal */}
            <button
              onClick={() => handleNavigate('assistant')}
              className={`btn-3d-base w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2.5 ${
                currentView === 'assistant' ? 'btn-3d-teal' : 'btn-3d-teal-inactive'
              }`}
            >
              <Bot className="w-4 h-4 text-teal-400" />
              <span>Asistente EMS</span>
            </button>

            {/* 8. Orange */}
            <button
              onClick={() => handleNavigate('dashboard')}
              className={`btn-3d-base w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2.5 ${
                currentView === 'dashboard' ? 'btn-3d-orange' : 'btn-3d-orange-inactive'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-orange-400" />
              <span>Racha & Métricas</span>
            </button>

            {/* Export Prompts */}
            <button
              onClick={() => handleNavigate('prompts')}
              className={`btn-3d-base w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2.5 ${
                currentView === 'prompts' ? 'btn-3d-stone text-white' : 'btn-3d-stone opacity-80'
              }`}
            >
              <Terminal className="w-4 h-4 text-stone-400" />
              <span>📑 Exportar Prompts y Notion</span>
            </button>

            {/* Ajustes */}
            <button
              onClick={() => {
                setSettingsOpen(true);
                setMobileMenuOpen(false);
              }}
              className="btn-3d-base w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2.5 btn-3d-stone text-stone-200"
            >
              <SettingsIcon className="w-4 h-4 text-stone-300" />
              <span>⚙️ Ajustes</span>
            </button>
          </div>
        )}
      </header>

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2.5 sm:px-6 lg:px-8 py-3.5 sm:py-6 pb-24 sm:pb-10 overflow-x-hidden">
        {currentView === 'welcome' && (
          <WelcomeTutorialView
            onStartFormation={() => setCurrentView('master-index')}
            onGoToPortion={handleSelectPortion}
          />
        )}

        {currentView === 'master-index' && (
          <MasterIndexView
            onSelectPortion={handleSelectPortion}
            onSelectCategory={handleSelectCategory}
            onStartSimulacro={handleStartSimulacroById}
            onNavigateTab={handleNavigate}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            onNavigate={handleNavigate}
            onSelectPortion={handleSelectPortion}
          />
        )}

        {currentView === 'categories' && (
          <CategoriesListView
            onSelectPortion={handleSelectPortion}
            initialCategoryId={selectedCategoryId}
          />
        )}

        {currentView === 'portion' && (
          <PortionDetailView
            portion={currentPortion}
            onBack={() => setCurrentView('master-index')}
            onSelectPortion={handleSelectPortion}
          />
        )}

        {currentView === 'flashcards' && <FlashcardsHub />}

        {currentView === 'quizzes' && <QuizzesHub />}

        {currentView === 'simulacros' && (
          <SimulacrosListView onStartSimulacro={handleStartSimulacro} />
        )}

        {currentView === 'simulacro-running' && activeSimulacro && (
          <SimulacroRunner
            simulacro={activeSimulacro}
            onExit={() => setCurrentView('simulacros')}
          />
        )}

        {currentView === 'assistant' && <AssistantView />}

        {currentView === 'prompts' && <PromptsExporterView />}

        {currentView === 'progress' && (
          <ProgressView onSelectPortion={handleSelectPortion} />
        )}

        {settingsOpen && (
          <SettingsModal
            onClose={() => setSettingsOpen(false)}
            onReopenSplash={() => setShowSplash(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-900/60 py-6 mt-12 text-center text-xs text-stone-400 font-mono">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="text-stone-300 font-semibold">
            ESCUELA MILITAR DE SARGENTOS • EMS 2026
          </p>
          <p>
            Curso de Formación de Sargento 1/o. de Infantería y Fuerza Aérea Fusilero Paracaidista • Compendio Doctrinal SEDENA
          </p>
          <p className="text-[11px] text-stone-400">
            Arquitectura pedagógica: Inducción y Contexto → Índice Maestro → Temas 1-8 (Categorías Doctrinales) → Tema 9 (Simulacros Oficiales).
          </p>
        </div>
      </footer>

      {/* 9:16 Mobile Native Bottom Navigation Bar with Deep 3D Shadowing */}
      <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-xl border-t border-stone-800 px-2 py-1.5 flex items-center justify-around shadow-[0_-12px_28px_rgba(0,0,0,0.95),0_-2px_6px_rgba(0,0,0,0.8)] pb-[max(0.45rem,env(safe-area-inset-bottom))] gap-1.5">
        {/* 1. Sky */}
        <button
          onClick={() => handleNavigate('welcome')}
          className={`btn-3d-base flex flex-col items-center justify-center py-1.5 px-1 rounded-xl flex-1 min-w-0 cursor-pointer ${
            currentView === 'welcome'
              ? 'btn-3d-sky'
              : 'btn-3d-sky-inactive text-stone-400'
          }`}
        >
          <Compass className="w-4 h-4 mb-0.5" />
          <span className="text-[9px] font-mono tracking-tight truncate">Inducción</span>
        </button>

        {/* 2. Amber */}
        <button
          onClick={() => handleNavigate('master-index')}
          className={`btn-3d-base flex flex-col items-center justify-center py-1.5 px-1 rounded-xl flex-1 min-w-0 cursor-pointer ${
            currentView === 'master-index'
              ? 'btn-3d-amber'
              : 'btn-3d-amber-inactive text-stone-400'
          }`}
        >
          <ListChecks className="w-4 h-4 mb-0.5" />
          <span className="text-[9px] font-mono tracking-tight truncate">Índice</span>
        </button>

        {/* 3. Blue */}
        <button
          onClick={() => handleNavigate('categories')}
          className={`btn-3d-base flex flex-col items-center justify-center py-1.5 px-1 rounded-xl flex-1 min-w-0 cursor-pointer ${
            currentView === 'categories' || currentView === 'portion'
              ? 'btn-3d-blue'
              : 'btn-3d-blue-inactive text-stone-400'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span className="text-[9px] font-mono tracking-tight truncate">Temas 1-8</span>
        </button>

        {/* 4. Emerald */}
        <button
          onClick={() => handleNavigate('flashcards')}
          className={`btn-3d-base flex flex-col items-center justify-center py-1.5 px-1 rounded-xl flex-1 min-w-0 cursor-pointer ${
            currentView === 'flashcards'
              ? 'btn-3d-emerald'
              : 'btn-3d-emerald-inactive text-stone-400'
          }`}
        >
          <Layers className="w-4 h-4 mb-0.5" />
          <span className="text-[9px] font-mono tracking-tight truncate">Tarjetas</span>
        </button>

        {/* 5. Red */}
        <button
          onClick={() => handleNavigate('simulacros')}
          className={`btn-3d-base flex flex-col items-center justify-center py-1.5 px-1 rounded-xl flex-1 min-w-0 cursor-pointer ${
            currentView === 'simulacros' || currentView === 'simulacro-running'
              ? 'btn-3d-red'
              : 'btn-3d-red-inactive text-stone-400'
          }`}
        >
          <Target className="w-4 h-4 mb-0.5" />
          <span className="text-[9px] font-mono tracking-tight truncate">Tema 9</span>
        </button>
      </nav>
    </div>
  );
};

export default function App() {
  return (
    <SettingsProvider>
      <ProgressProvider>
        <MainApp />
      </ProgressProvider>
    </SettingsProvider>
  );
}
