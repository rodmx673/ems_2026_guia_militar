import React, { useState, useEffect } from 'react';
import {
  Shield,
  BookOpen,
  CheckCircle2,
  Video,
  Volume2,
  FileText,
  HelpCircle,
  Layers,
  Target,
  Bot,
  ArrowRight,
  Sparkles,
  Flame,
  Award,
  Clock,
  Compass,
  ListOrdered,
  Lightbulb,
  Check,
  ChevronDown,
  ChevronUp,
  Play,
  LayoutGrid,
  List
} from 'lucide-react';
import { YouTubePlayer } from './YouTubePlayer';
import { IntroTTSPlayer } from './IntroTTSPlayer';
import { VideoScene } from '../types/ems';
import { useSettings } from '../context/SettingsContext';

interface WelcomeTutorialViewProps {
  onStartFormation: () => void;
  onGoToPortion: (portionId: string) => void;
}

const TUTORIAL_SCENES: VideoScene[] = [
  {
    minute: '0:00 - 0:45',
    visual: 'Placa de Infantería EMS 2026. Texto en pantalla: "Manual de Operación del Workbook - Curso de Formación de Sargento 1/o.". Presentación del sistema modular.',
    narration: '¡Atención, personal cursante! Te damos la bienvenida a tu Workbook Integral EMS 2026. Esta plataforma no es un simple visor de PDFs; es tu centro de entrenamiento táctico-doctrinal diseñado para garantizar tu ascenso con la máxima calificación.'
  },
  {
    minute: '0:46 - 1:30',
    visual: 'Esquema animado del Método Militar de 4 Pasos: 1. Video doctrinal → 2. Audio teleprompter → 3. Escenario práctico → 4. Quiz de comprobación.',
    narration: 'Para dominar cada una de las 46 porciones de estudio, aplicarás la secuencia inquebrantable de 4 pasos: primero asimilas visualmente el marco normativo, luego refuerzas con audio, aplicas el criterio a un caso real y finalmente verificas tu retención en el quiz.'
  },
  {
    minute: '1:31 - 2:15',
    visual: 'Recorrido por la interfaz: Navegación de las 8 Categorías, las 460 Tarjetas mnemotécnicas y el Asistente Doctrinal militar en tiempo real.',
    narration: 'Tendrás a tu disposición 460 tarjetas de repetición espaciada y un Asistente especializado en legislación militar que resolverá al instante cualquier duda sobre artículos, deberes o límites de mando en el servicio de las armas.'
  },
  {
    minute: '2:16 - 3:00',
    visual: 'Simulador de examen oficial: Cronómetro en cuenta regresiva, hoja de respuestas y desglose por categorías. Texto final: "Disciplina, Honor y Lealtad".',
    narration: 'Concluirás tu preparación enfrentando los 6 Simulacros con temporizador y reactivos idénticos a los del examen de la Escuela Militar de Sargentos. Tu preparación comienza hoy. ¡A paso redoblado hacia el ascenso!'
  }
];

export const WelcomeTutorialView: React.FC<WelcomeTutorialViewProps> = ({
  onStartFormation,
  onGoToPortion
}) => {
  const { settings } = useSettings();
  const [activeTab, setActiveTab] = useState<'overview' | 'method' | 'modules' | 'assistant' | 'simulacros' | 'video'>('overview');
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  // Default to compact list and collapsed by default for swift mobile navigation
  const [overviewViewMode, setOverviewViewMode] = useState<'cards' | 'list'>('list');
  const [isOverviewCollapsed, setIsOverviewCollapsed] = useState(true);
  const [isHeroCollapsed, setIsHeroCollapsed] = useState(true);

  // Stop speech when switching tabs inside Welcome or unmounting
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [activeTab]);

  return (
    <div className="space-y-5 sm:space-y-6 w-full max-w-full overflow-hidden pb-10">
      {/* Hero Welcome Header with 3D Window Frame */}
      <div className="window-3d rounded-2xl p-4 sm:p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2 max-w-2xl flex-1">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1.5 shadow-sm">
                  <Compass className="w-3.5 h-3.5 text-sky-400" /> TEMA 1: BIENVENIDA Y TUTORIAL GLOBAL
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono text-stone-400 bg-stone-800 border border-stone-700">
                  5-10 min
                </span>
              </div>

              {/* Hero Banner Collapse Toggle */}
              <button
                onClick={() => setIsHeroCollapsed(!isHeroCollapsed)}
                className="p-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-sky-400 transition cursor-pointer flex items-center gap-1 text-[11px] font-mono"
                title={isHeroCollapsed ? 'Desplegar resumen' : 'Colapsar resumen'}
              >
                {isHeroCollapsed ? (
                  <>
                    <ChevronDown className="w-4 h-4 text-sky-400" />
                    <span className="text-[10px] text-sky-400 font-bold hidden sm:inline">Desplegar</span>
                  </>
                ) : (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span className="text-[10px] hidden sm:inline">Colapsar</span>
                  </>
                )}
              </button>
            </div>

            <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-stone-100 tracking-tight leading-tight">
              Workbook EMS 2026: Curso de Formación de Sargento 1/o.
            </h1>

            {!isHeroCollapsed && (
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                Arquitectura pedagógica progresiva diseñada para transformar el Compendio Oficial de
                más de 1,200 artículos en dominio doctrinal, criterio táctico y éxito garantizado en tu
                evaluación de ascenso.
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 flex-shrink-0">
            <button
              onClick={onStartFormation}
              className="btn-3d-base btn-3d-amber px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm font-mono flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Comenzar mi formación</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className="btn-3d-base btn-3d-stone px-3.5 py-2 rounded-xl font-mono text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-red-400 fill-red-400" />
              <span>Ver Video 1 (3 min)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Navigation Tabs for the Tutorial with 3D tactile buttons */}
      <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar border-b border-stone-800">
        <button
          onClick={() => setActiveTab('overview')}
          className={`btn-3d-base px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
            activeTab === 'overview'
              ? 'btn-3d-sky text-white'
              : 'card-3d text-stone-300'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> 🎧 1. ¿Qué es este Workbook?
        </button>

        <button
          onClick={() => setActiveTab('method')}
          className={`btn-3d-base px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
            activeTab === 'method'
              ? 'btn-3d-sky text-white'
              : 'card-3d text-stone-300'
          }`}
        >
          <ListOrdered className="w-3.5 h-3.5" /> 🎧 2. Método de 4 Pasos
        </button>

        <button
          onClick={() => setActiveTab('modules')}
          className={`btn-3d-base px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
            activeTab === 'modules'
              ? 'btn-3d-sky text-white'
              : 'card-3d text-stone-300'
          }`}
        >
          <Shield className="w-3.5 h-3.5" /> 🎧 3. ¿Qué contiene?
        </button>

        <button
          onClick={() => setActiveTab('assistant')}
          className={`btn-3d-base px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
            activeTab === 'assistant'
              ? 'btn-3d-teal text-white'
              : 'card-3d text-stone-300'
          }`}
        >
          <Bot className="w-3.5 h-3.5" /> 🎧 4. Asistente EMS
        </button>

        <button
          onClick={() => setActiveTab('simulacros')}
          className={`btn-3d-base px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
            activeTab === 'simulacros'
              ? 'btn-3d-red text-white'
              : 'card-3d text-stone-300'
          }`}
        >
          <Target className="w-3.5 h-3.5" /> 🎧 5. Los 6 Simulacros
        </button>

        <button
          onClick={() => setActiveTab('video')}
          className={`btn-3d-base px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
            activeTab === 'video'
              ? 'btn-3d-red text-white'
              : 'card-3d text-stone-300'
          }`}
        >
          <Video className="w-3.5 h-3.5" /> 🎥 6. Video Tutorial (3 min)
        </button>
      </div>

      {/* TTS Narration Player for Personnel on Duty or in Service */}
      {activeTab !== 'video' && (
        <IntroTTSPlayer
          currentTab={activeTab}
          onSelectTab={tab => setActiveTab(tab)}
          settings={settings}
        />
      )}

      {/* SECTION 1: ¿QUÉ ES ESTE WORKBOOK? */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="window-3d rounded-xl p-4 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                    MÓDULO DE INDUCCIÓN DOCTRINAL
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-stone-100">
                    1. ¿Qué es este Workbook Integral?
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* View Mode: Cards vs Compact List */}
                <div className="flex items-center bg-stone-950 p-0.5 rounded-lg border border-stone-800 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setOverviewViewMode('cards')}
                    className={`px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1 transition ${
                      overviewViewMode === 'cards'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                    title="Vista en Tarjetas"
                  >
                    <LayoutGrid className="w-3 h-3" />
                    <span className="hidden sm:inline">Tarjetas</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOverviewViewMode('list')}
                    className={`px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1 transition ${
                      overviewViewMode === 'list'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                    title="Lista Compacta (Ahorro de Espacio Móvil)"
                  >
                    <List className="w-3 h-3" />
                    <span>Lista</span>
                  </button>
                </div>

                {/* Collapsible toggle */}
                <button
                  onClick={() => setIsOverviewCollapsed(!isOverviewCollapsed)}
                  className="p-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-400 hover:text-amber-400 transition cursor-pointer flex items-center gap-1 text-[11px] font-mono"
                  title={isOverviewCollapsed ? 'Desplegar contenido' : 'Colapsar contenido'}
                >
                  {isOverviewCollapsed ? (
                    <>
                      <ChevronDown className="w-4 h-4 text-amber-400" />
                      <span className="text-[10px] text-amber-400 font-bold hidden sm:inline">Desplegar</span>
                    </>
                  ) : (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      <span className="text-[10px] hidden sm:inline">Colapsar</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {!isOverviewCollapsed && (
              <>
                {overviewViewMode === 'list' ? (
                  /* COMPACT LIST VIEW FOR INDUCTION OVERVIEW */
                  <div className="space-y-2 pt-1">
                    <div className="card-3d rounded-lg p-2.5 flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded bg-blue-500/15 text-blue-400 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5">
                        01
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-stone-200">¿Qué es exactamente?</h4>
                        <p className="text-xs text-stone-300 leading-relaxed mt-0.5">
                          Plataforma de adiestramiento militar y compendio interactivo estructurado para Sargentos Segundos aspirantes a Sargento 1/o. en la EMS 2026.
                        </p>
                      </div>
                    </div>

                    <div className="card-3d rounded-lg p-2.5 flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5">
                        02
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-stone-200">¿Para qué sirve?</h4>
                        <p className="text-xs text-stone-300 leading-relaxed mt-0.5">
                          Transforma 1,200+ artículos en 46 porciones de 30 min con teleprompter, audios, casos, 460 tarjetas de memoria y simulacros.
                        </p>
                      </div>
                    </div>

                    <div className="card-3d rounded-lg p-2.5 flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded bg-amber-500/15 text-amber-400 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5">
                        03
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-stone-200">¿Quién lo debe usar?</h4>
                        <p className="text-xs text-stone-300 leading-relaxed mt-0.5">
                          Clases cursantes, instructores y aspirantes para desarrollar criterio militar, aplicar correctivos y aprobar el examen oficial.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* DETAILED CARDS FOR INDUCTION OVERVIEW */
                  <div className="grid md:grid-cols-3 gap-4 pt-1">
                    <div className="card-3d rounded-xl p-4 space-y-2">
                      <div className="w-7 h-7 rounded-md bg-blue-500/10 text-blue-400 flex items-center justify-center text-xs font-mono font-bold">
                        01
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-stone-200">¿Qué es exactamente?</h4>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        Es una plataforma de adiestramiento militar y compendio interactivo estructurado
                        específicamente para el personal de <strong>Sargentos Segundos de Infantería y
                        Fusileros Paracaidistas</strong> aspirantes a la jerarquía de Sargento 1/o. en la
                        Escuela Militar de Sargentos (EMS 2026).
                      </p>
                    </div>

                    <div className="card-3d rounded-xl p-4 space-y-2">
                      <div className="w-7 h-7 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">
                        02
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-stone-200">¿Para qué sirve?</h4>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        Transforma más de <strong>1,200 artículos legales dispersos</strong> (Ley de
                        Disciplina, Reglamento de Deberes, Código Militar, etc.) en <strong>46 porciones
                        asimilables de 30 minutos</strong>, con teleprompter, audios, casos situacionales,
                        460 tarjetas de memoria y simulacros oficiales.
                      </p>
                    </div>

                    <div className="card-3d rounded-xl p-4 space-y-2">
                      <div className="w-7 h-7 rounded-md bg-amber-500/10 text-amber-400 flex items-center justify-center text-xs font-mono font-bold">
                        03
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-stone-200">¿Quién lo debe usar?</h4>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        Está dirigido a <strong>clases cursantes, instructores y aspirantes de arma</strong> que
                        requieren no solo memorizar artículos aislados, sino desarrollar el criterio militar
                        para aplicar correctivos disciplinarios, conducir patrullas de infantería y superar el
                        examen con calificación sobresaliente.
                      </p>
                    </div>
                  </div>
                )}

                {/* Quick Video 1 Card in Section 1 */}
                <div className="card-3d p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 flex-shrink-0">
                      <Play className="w-5 h-5 fill-red-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-bold border border-red-500/30">
                          1ER VIDEO DE INDUCCIÓN DISPONIBLE
                        </span>
                        <span className="text-[11px] font-mono text-stone-400">Duración: 3 min</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-stone-100 mt-1">
                        Video Tutorial Oficial: Inducción y Método de Estudio EMS 2026
                      </h4>
                      <p className="text-[11px] font-mono text-stone-400 mt-0.5">
                        Enlace oficial: https://youtu.be/fYsuPCFG3fY
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('video')}
                    className="btn-3d-base btn-3d-crimson px-4 py-2.5 rounded-lg text-white font-mono text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Reproducir Video 1</span>
                  </button>
                </div>

                <div className="card-3d p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-xs text-stone-200 font-medium">
                      ¿Listo para explorar la arquitectura pedagógica? Conoce el método de 4 pasos.
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveTab('method')}
                    className="btn-3d-base btn-3d-amber px-3.5 py-1.5 rounded-lg text-stone-950 font-bold text-xs font-mono transition flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                  >
                    <span>Ver Método de 4 Pasos</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* SECTION 2: MÉTODO DE 4 PASOS */}
      {activeTab === 'method' && (
        <div className="space-y-4">
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 sm:p-6 shadow-lg space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <ListOrdered className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  METODOLOGÍA DE APRENDIZAJE EFECTIVO
                </span>
                <h3 className="text-base sm:text-lg font-bold text-stone-100">
                  2. ¿Cómo Estudiar Cada Porción? (El Método de 4 Pasos)
                </h3>
              </div>
            </div>

            <p className="text-xs text-stone-300">
              No intentes memorizar reglamentos de forma pasiva. Para cada una de las 46 porciones de
              estudio, sigue estrictamente esta secuencia pedagógica de 4 fases consecutivas:
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {/* Paso 1 */}
              <div className="bg-stone-950/80 rounded-xl p-4 border border-blue-500/30 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                    PASO 1
                  </span>
                  <Video className="w-4 h-4 text-blue-400" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-100">
                  🎥 Ver el Video In-App
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Reproduce el video didáctico directamente en la app y sigue el guion secuencial de
                  escenas. Comprende la estructura del tema y los principios rectores.
                </p>
                <div className="text-[11px] font-mono text-blue-400 pt-1">
                  ⏱ Tiempo estimado: 6 a 8 min
                </div>
              </div>

              {/* Paso 2 */}
              <div className="bg-stone-950/80 rounded-xl p-4 border border-amber-500/30 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    PASO 2
                  </span>
                  <Volume2 className="w-4 h-4 text-amber-400" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-100">
                  🎧 Escuchar el Audio TTS
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Activa el reproductor de voz con velocidad regulable. La síntesis militar repasa
                  artículo por artículo, afianzando la terminología legal en tu memoria auditiva.
                </p>
                <div className="text-[11px] font-mono text-amber-400 pt-1">
                  ⏱ Tiempo estimado: 6 min
                </div>
              </div>

              {/* Paso 3 */}
              <div className="bg-stone-950/80 rounded-xl p-4 border border-emerald-500/30 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    PASO 3
                  </span>
                  <FileText className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-100">
                  📝 Resolver el Escenario
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Analiza un caso real del servicio (arrestos, insubordinación, patrullas).
                  Fundamenta jurídicamente la solución antes de revelar las respuestas correctas.
                </p>
                <div className="text-[11px] font-mono text-emerald-400 pt-1">
                  ⏱ Tiempo estimado: 8 min
                </div>
              </div>

              {/* Paso 4 */}
              <div className="bg-stone-950/80 rounded-xl p-4 border border-red-500/30 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                    PASO 4
                  </span>
                  <HelpCircle className="w-4 h-4 text-red-400" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-100">
                  ❓ Quiz + Tarjetas
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Responde las 5 preguntas oficiales de opción múltiple con retroalimentación y repasa
                  las 10 tarjetas mnemotécnicas para fijar los números de artículo.
                </p>
                <div className="text-[11px] font-mono text-red-400 pt-1">
                  ⏱ Tiempo estimado: 8 min
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-stone-950 rounded-lg border border-stone-800 text-xs font-mono text-stone-300 flex items-center justify-between">
              <span>Duración total por sesión de estudio: <strong>30 minutos</strong></span>
              <span className="text-amber-400">Total: 46 porciones = 23 horas efectivas</span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: ¿QUÉ CONTIENE? (MAPA VISUAL) */}
      {activeTab === 'modules' && (
        <div className="space-y-4">
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 sm:p-6 shadow-lg space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider">
                  INVENTARIO TOTAL DEL COMPENDIO
                </span>
                <h3 className="text-base sm:text-lg font-bold text-stone-100">
                  3. ¿Qué Contiene el Workbook EMS 2026?
                </h3>
              </div>
            </div>

            <p className="text-xs text-stone-300">
              Un desglose exhaustivo de los contenidos doctrinales y herramientas pedagógicas que
              componen la formación integral del Sargento 1/o.:
            </p>

            {/* Metrics cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-center space-y-1">
                <BookOpen className="w-5 h-5 text-amber-400 mx-auto" />
                <div className="text-2xl font-extrabold text-stone-100 font-mono">8</div>
                <div className="text-xs font-semibold text-stone-300">Categorías Doctrinales</div>
                <div className="text-[10px] text-stone-400">Desde Disciplina hasta Táctica</div>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-center space-y-1">
                <Compass className="w-5 h-5 text-blue-400 mx-auto" />
                <div className="text-2xl font-extrabold text-stone-100 font-mono">46</div>
                <div className="text-xs font-semibold text-stone-300">Porciones de 30 min</div>
                <div className="text-[10px] text-stone-400">Lecciones modulares</div>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-center space-y-1">
                <Layers className="w-5 h-5 text-amber-400 mx-auto" />
                <div className="text-2xl font-extrabold text-stone-100 font-mono">460</div>
                <div className="text-xs font-semibold text-stone-300">Tarjetas de Memoria</div>
                <div className="text-[10px] text-stone-400">Repetición espaciada</div>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-center space-y-1">
                <FileText className="w-5 h-5 text-emerald-400 mx-auto" />
                <div className="text-2xl font-extrabold text-stone-100 font-mono">60</div>
                <div className="text-xs font-semibold text-stone-300">Escenarios Tácticos</div>
                <div className="text-[10px] text-stone-400">Casos reales del servicio</div>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-center space-y-1 col-span-2 sm:col-span-1">
                <Target className="w-5 h-5 text-red-400 mx-auto" />
                <div className="text-2xl font-extrabold text-stone-100 font-mono">6</div>
                <div className="text-xs font-semibold text-stone-300">Simulacros Oficiales</div>
                <div className="text-[10px] text-stone-400">Con cronómetro y calificación</div>
              </div>
            </div>

            {/* Categories summary table */}
            <div className="pt-3 border-t border-stone-800">
              <h4 className="text-xs font-mono font-bold text-stone-300 mb-2">
                Las 8 Categorías que Integran la Evaluación:
              </h4>
              <div className="grid sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 flex items-center justify-between">
                  <span className="text-stone-300"><strong>Cat. 1:</strong> Ley de Disciplina del Ejército y FAM</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">PESO ALTO</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 flex items-center justify-between">
                  <span className="text-stone-300"><strong>Cat. 2:</strong> Reglamento General de Deberes Militares</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">PESO ALTO</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 flex items-center justify-between">
                  <span className="text-stone-300"><strong>Cat. 3:</strong> Código de Justicia Militar</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">PESO ALTO</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 flex items-center justify-between">
                  <span className="text-stone-300"><strong>Cat. 4:</strong> Ley Orgánica del Ejército y FAM</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">PESO MEDIO</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 flex items-center justify-between">
                  <span className="text-stone-300"><strong>Cat. 5:</strong> Ley Federal de Armas de Fuego</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">PESO MEDIO</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 flex items-center justify-between">
                  <span className="text-stone-300"><strong>Cat. 6:</strong> Manual de Derechos Humanos</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">PESO MEDIO</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 flex items-center justify-between">
                  <span className="text-stone-300"><strong>Cat. 7:</strong> Ley Nacional de Uso de la Fuerza</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">PESO MEDIO</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 flex items-center justify-between">
                  <span className="text-stone-300"><strong>Cat. 8:</strong> Manual de Táctica de Infantería</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">PESO ALTO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: CÓMO USAR EL ASISTENTE */}
      {activeTab === 'assistant' && (
        <div className="space-y-4">
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 sm:p-6 shadow-lg space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                  INTELIGENCIA MILITAR Y CONSULTA 24/7
                </span>
                <h3 className="text-base sm:text-lg font-bold text-stone-100">
                  4. ¿Cómo Usar el Asistente Doctrinal EMS?
                </h3>
              </div>
            </div>

            <p className="text-xs text-stone-300">
              El Asistente está alimentado exclusivamente con el <strong>Compendio Oficial EMS 2026</strong>.
              No inventa datos ni busca en fuentes externas; responde con el artículo legal exacto y
              la doctrina de la SEDENA.
            </p>

            <div className="grid md:grid-cols-3 gap-3 pt-2">
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
                <div className="text-amber-400 font-mono text-xs font-bold">1. Consultas Doctrinales</div>
                <p className="text-xs text-stone-300">
                  Pide que te explique cualquier concepto confuso:
                  <span className="italic block text-stone-400 mt-1">
                    "¿Cuál es la diferencia entre arresto con y sin perjuicio del servicio según la Ley de Disciplina?"
                  </span>
                </p>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
                <div className="text-emerald-400 font-mono text-xs font-bold">2. Análisis de Casos Reales</div>
                <p className="text-xs text-stone-300">
                  Presenta situaciones de mando para conocer el procedimiento:
                  <span className="italic block text-stone-400 mt-1">
                    "Si un soldado pierde su cargador en una revista, ¿procede correctivo o delito militar?"
                  </span>
                </p>
              </div>

              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
                <div className="text-blue-400 font-mono text-xs font-bold">3. Simulador de Preguntas</div>
                <p className="text-xs text-stone-300">
                  Solicita reactivos tipo examen con trampa para evaluar tu criterio:
                  <span className="italic block text-stone-400 mt-1">
                    "Hazme 3 preguntas difíciles sobre los deberes del Sargento 1/o. en la Compañía".
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: CÓMO HACER LOS SIMULACROS */}
      {activeTab === 'simulacros' && (
        <div className="space-y-4">
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 sm:p-6 shadow-lg space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 flex-shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">
                  EVALUACIÓN OBJETIVA Y RETENCIÓN
                </span>
                <h3 className="text-base sm:text-lg font-bold text-stone-100">
                  5. ¿Cómo Hacer los 6 Simulacros Oficiales?
                </h3>
              </div>
            </div>

            <p className="text-xs text-stone-300">
              Los simulacros replican el rigor formal del examen de la Escuela Militar de Sargentos.
              Sigue estas pautas antes de iniciar:
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-stone-300">
                  <strong className="text-stone-100">Condiciones de examen real:</strong> Realiza cada simulacro sin pausas, sin consultar apuntes y en un ambiente aislado durante el tiempo asignado (60 o 90 minutos).
                </div>
              </div>

              <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-stone-300">
                  <strong className="text-stone-100">Puntaje mínimo aprobatorio: 80%:</strong> El examen militar no admite márgenes de duda; si obtienes menos de 80%, debes repasar las porciones señaladas en el desglose de errores frecuentes.
                </div>
              </div>

              <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-stone-300">
                  <strong className="text-stone-100">Revisión exhaustiva de reactivos:</strong> Al terminar, revisa cada reactivo fallado. Cada pregunta incluye su fundamento legal exacto y la explicación doctrinal.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: VIDEO TUTORIAL DE 3 MINUTOS (Con Reproductor In-App 100%) */}
      {activeTab === 'video' && (
        <div className="space-y-4">
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 sm:p-6 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 flex-shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">
                    GUION DE VIDEO / TELEPROMPTER DE INDUCCIÓN
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-stone-100">
                    6. Video Tutorial Oficial de Inducción (3 min)
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Reproductor YouTube In-App
                </span>
                <span className="text-xs font-mono text-stone-400">Escenas: 4</span>
              </div>
            </div>

            {/* Embedded YouTube Player with exact requested styling */}
            <YouTubePlayer
              portionId="tutorial-induction"
              defaultVideoUrl="https://youtu.be/fYsuPCFG3fY"
              portionNumber="0.0"
              portionTitle="Video 1: Inducción y Método de Estudio EMS 2026"
              scenes={TUTORIAL_SCENES}
              activeSceneIndex={activeSceneIndex}
              onSceneSelect={idx => setActiveSceneIndex(idx)}
            />

            {/* Teleprompter Scenes Breakdown */}
            <div className="mt-4 bg-stone-950 rounded-xl border border-stone-800 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                  <FilmIcon className="w-4 h-4" /> GUION SECUENCIAL Y TELEPROMPTER DEL TUTORIAL
                </h4>
                <span className="text-[11px] text-stone-400">4 Escenas sincronizadas</span>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {TUTORIAL_SCENES.map((scene, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveSceneIndex(idx)}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition ${
                      activeSceneIndex === idx
                        ? 'bg-amber-950/20 border-amber-500/50 ring-1 ring-amber-500/30'
                        : 'bg-stone-900 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                      <span className="font-bold text-amber-400">ESCENA {idx + 1}</span>
                      <span className="text-stone-400">{scene.minute}</span>
                    </div>
                    <div className="text-[11px] text-stone-400 mb-1 font-mono">
                      <strong>Visual:</strong> {scene.visual}
                    </div>
                    <p className="text-xs text-stone-200 italic">
                      "{scene.narration}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to action at bottom */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-stone-100 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            ¿Comprendiste el funcionamiento y el método de 4 pasos?
          </h4>
          <p className="text-xs text-stone-400 mt-0.5">
            Avanza al <strong>Índice Maestro</strong> para consultar el mapa de las 8 categorías (Temas 1 al 8),
            las 46 porciones y comenzar con tu primera clase.
          </p>
        </div>

        <button
          onClick={onStartFormation}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold font-mono text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md shadow-amber-600/20 flex-shrink-0 cursor-pointer"
        >
          <span>Comenzar mi formación → Ir al Índice Maestro</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

function FilmIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 3v18M17 3v18M3 7.5h4M3 12h18M3 16.5h4M17 7.5h4M17 16.5h4" />
    </svg>
  );
}
