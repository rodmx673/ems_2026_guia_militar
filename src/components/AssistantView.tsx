import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Shield,
  BookOpen,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Pause,
  Play,
  Square,
  FastForward,
  Radio,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  X,
  ExternalLink,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { findAnswerInKnowledgeBase } from '../data/assistantKnowledge';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  legalBasis?: string;
  exampleOrScenario?: string;
  verificationQuestion?: string;
  timestamp: string;
  mode?: 'llm' | 'local';
  sources?: string[];
}

interface AssistantApiResponse {
  answer: string;
  legalBasis?: string;
  sources?: { source: string; category: string }[];
  mode: 'llm';
  model: string;
  grounded: boolean;
}

const PRESET_QUERIES = [
  '¿Cuál es el máximo arresto para un Oficial?',
  '¿Cuál es el máximo arresto para personal de Tropa?',
  '¿Cuáles son los tres correctivos disciplinarios legales del Art. 24?',
  'Explícame la diferencia entre envolvimiento y penetración',
  '¿Cuándo se consuma la deserción y qué pasa con el centinela?',
  '¿Cuáles son las 5 misiones generales según la Ley Orgánica?',
  '¿Cuáles son los 5 niveles del uso de la fuerza?',
  '¿Cómo se integra el Consejo de Honor según el Art. 45?'
];

export const AssistantView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: '¡A la orden, cursante! Soy el Asistente Especializado en el Compendio EMS 2026 para el Curso de Formación de Sargento 1/o. de Infantería y Fuerza Aérea Fusilero Paracaidista. Respondo con apego irrestricto al texto oficial de las 8 categorías del compendio, citando siempre el artículo y fundamento legal exacto. ¿Qué tema o artículo deseas repasar hoy?',
      timestamp: '08:00'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // STT Voice Recognition state
  const [isListening, setIsListening] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [voiceErrorMessage, setVoiceErrorMessage] = useState<string | null>(null);
  const [isTestingMic, setIsTestingMic] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const recognitionRef = useRef<any>(null);

  // TTS Voice Response state
  const [voiceResponseEnabled, setVoiceResponseEnabled] = useState(true);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [isPausedVoice, setIsPausedVoice] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [currentlySpeakingMsgId, setCurrentlySpeakingMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const activeTranscriptRef = useRef('');

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Cleanup on unmount or tab hide
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setIsPlayingVoice(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('pagehide', handleVisibility);
    window.addEventListener('beforeunload', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pagehide', handleVisibility);
      window.removeEventListener('beforeunload', handleVisibility);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const cleanTextForSpeech = (text: string): string => {
    return text
      .replace(/\n+/g, '. ')
      .replace(/[*_#`~]/g, '')
      .replace(/I\.\s+/g, 'Primero: ')
      .replace(/II\.\s+/g, 'Segundo: ')
      .replace(/III\.\s+/g, 'Tercero: ')
      .replace(/IV\.\s+/g, 'Cuarto: ')
      .replace(/V\.\s+/g, 'Quinto: ')
      .replace(/Arts?\./gi, 'artículo')
      .replace(/fr\.\s*/gi, 'fracción ')
      .replace(/Sgto\.?\s*1\/o\./gi, 'Sargento primero')
      .replace(/Sgto\.?\s*2\/o\./gi, 'Sargento segundo')
      .replace(/FAM/g, 'Fuerza Aérea Mexicana')
      .replace(/SEDENA/g, 'Secretaría de la Defensa Nacional')
      .trim();
  };

  const speakAssistantMessage = (msgId: string, text: string, legalBasis?: string) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const speechScript = `¡A la orden! ${cleanTextForSpeech(text)}${
      legalBasis ? `. Fundamento legal: ${cleanTextForSpeech(legalBasis)}` : ''
    }`;

    const utterance = new SpeechSynthesisUtterance(speechScript);
    utterance.lang = 'es-MX';
    utterance.rate = playbackRate;
    utterance.pitch = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const mxVoice = voices.find(
      v => v.lang.includes('es-MX') || v.lang.includes('es-ES') || v.lang.includes('es')
    );
    if (mxVoice) {
      utterance.voice = mxVoice;
    }

    utterance.onstart = () => {
      setIsPlayingVoice(true);
      setIsPausedVoice(false);
      setCurrentlySpeakingMsgId(msgId);
    };

    utterance.onpause = () => {
      setIsPausedVoice(true);
      setIsPlayingVoice(false);
    };

    utterance.onresume = () => {
      setIsPlayingVoice(true);
      setIsPausedVoice(false);
    };

    utterance.onend = () => {
      setIsPlayingVoice(false);
      setIsPausedVoice(false);
      setCurrentlySpeakingMsgId(null);
    };

    utterance.onerror = () => {
      setIsPlayingVoice(false);
      setIsPausedVoice(false);
      setCurrentlySpeakingMsgId(null);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlayingVoice(true);
    setIsPausedVoice(false);
    setCurrentlySpeakingMsgId(msgId);
  };

  const handleStopVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingVoice(false);
    setIsPausedVoice(false);
    setCurrentlySpeakingMsgId(null);
  };

  const handlePauseVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
    setIsPlayingVoice(false);
    setIsPausedVoice(true);
  };

  const handleResumeVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
    setIsPlayingVoice(true);
    setIsPausedVoice(false);
  };

  const cyclePlaybackRate = () => {
    const nextRate = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1;
    setPlaybackRate(nextRate);
    if (isPlayingVoice && currentlySpeakingMsgId) {
      const activeMsg = messages.find(m => m.id === currentlySpeakingMsgId);
      if (activeMsg) {
        speakAssistantMessage(activeMsg.id, activeMsg.text, activeMsg.legalBasis);
      }
    }
  };

  const nowLabel = () => new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });

  const askAssistantApi = async (
    query: string
  ): Promise<AssistantApiResponse | null> => {
    const history = messages
      .filter((m) => m.sender === 'user' || m.sender === 'assistant')
      .slice(-6)
      .map((m) => ({ role: m.sender, content: m.text }));

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30000);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ query, history })
      });

      if (!res.ok) return null;
      return (await res.json()) as AssistantApiResponse;
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    // Stop listening if mic is open
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      setIsListening(false);
    }

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: nowLabel()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    activeTranscriptRef.current = '';
    setIsTyping(true);

    const api = await askAssistantApi(query);
    let responseMsg: Message;

    if (api?.answer) {
      responseMsg = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: api.answer,
        legalBasis: api.legalBasis,
        sources: api.sources?.map((s) => s.source),
        mode: 'llm',
        timestamp: nowLabel()
      };
    } else {
      // Fallback: deterministic local lookup, keeps the assistant usable offline
      const match = findAnswerInKnowledgeBase(query);

      if (match) {
        responseMsg = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: match.answer,
          legalBasis: match.legalBasis,
          exampleOrScenario: match.exampleOrScenario,
          verificationQuestion: match.verificationQuestion,
          mode: 'local',
          timestamp: nowLabel()
        };
      } else {
        responseMsg = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: `Conforme a las reglas doctrinales del Compendio EMS 2026, toda consulta debe apegarse a los artículos de las 8 categorías oficiales (Ley de Disciplina, Deberes Militares, Código de Justicia Militar, Ley Orgánica, Ley de Armas, DDHH, Uso de la Fuerza y Táctica de Infantería). Prueba consultar sobre el Artículo 24, arrestos, facultades de mando, correctivos disciplinarios o maniobras tácticas.`,
          legalBasis: 'Compendio EMS 2026 - Doctrinas SEDENA',
          mode: 'local',
          timestamp: nowLabel()
        };
      }
    }

    setMessages(prev => [...prev, responseMsg]);
    setIsTyping(false);

    // Auto-speak response if voice enabled
    if (voiceResponseEnabled) {
      setTimeout(() => {
        speakAssistantMessage(responseMsg.id, responseMsg.text, responseMsg.legalBasis);
      }, 150);
    }
  };

  /**
   * Tests or requests microphone permissions explicitly.
   * Shows user clear visual status and result feedback.
   */
  const handleTestOrRequestMic = async () => {
    setIsTestingMic(true);
    setTestResult(null);

    // 1. Try getUserMedia to check/prompt audio device
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        setTestResult({
          success: true,
          message: '¡Permiso concedido! El micrófono está listo y activo. Iniciando interacción...'
        });
        setIsTestingMic(false);
        setTimeout(() => {
          setShowPermissionModal(false);
          startListeningDirectly();
        }, 750);
        return;
      } catch (err: any) {
        console.warn('getUserMedia test warning:', err);
      }
    }

    // 2. Try SpeechRecognition directly
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsTestingMic(false);
      setTestResult({
        success: false,
        message: 'Tu navegador no soporta SpeechRecognition. Utiliza Google Chrome, Safari o Microsoft Edge para interactuar por voz.'
      });
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-MX';
      recognition.onstart = () => {
        try {
          recognition.stop();
        } catch (e) {}
        setIsTestingMic(false);
        setTestResult({
          success: true,
          message: '¡Permiso de voz confirmado con éxito! Abriendo micrófono...'
        });
        setTimeout(() => {
          setShowPermissionModal(false);
          startListeningDirectly();
        }, 750);
      };
      recognition.onerror = (e: any) => {
        setIsTestingMic(false);
        if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
          setTestResult({
            success: false,
            message: 'El navegador tiene el micrófono bloqueado para este sitio. Debes cambiar el permiso a "Permitir" desde el candado (🔒) arriba a la izquierda y presionar "Recargar Página".'
          });
        } else {
          setTestResult({
            success: false,
            message: `Aviso del navegador: ${e.error || 'No se pudo iniciar el micrófono'}`
          });
        }
      };
      recognition.start();
    } catch (e: any) {
      setIsTestingMic(false);
      setTestResult({
        success: false,
        message: `Error al iniciar el micrófono: ${e.message || 'Bloqueado por el navegador'}`
      });
    }
  };

  /**
   * Starts native speech recognition directly when user clicks microphone.
   * Prompts native browser dialog on first attempt without getting blocked.
   */
  const startListeningDirectly = () => {
    handleStopVoice();
    setVoiceErrorMessage(null);
    setTestResult(null);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceErrorMessage(
        'El reconocimiento de voz no está habilitado en este navegador. Puedes escribir tu consulta en el teclado.'
      );
      setShowPermissionModal(true);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-MX';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      activeTranscriptRef.current = '';

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceErrorMessage(null);
        setShowPermissionModal(false);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += transcript;
          } else {
            interim += transcript;
          }
        }
        const currentSpoken = final || interim;
        if (currentSpoken) {
          activeTranscriptRef.current = currentSpoken;
          setInput(currentSpoken);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition status:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setShowPermissionModal(true);
          setVoiceErrorMessage('Permiso de micrófono bloqueado en el navegador.');
        } else if (event.error === 'no-speech') {
          setVoiceErrorMessage('No se detectó audio. Vuelve a presionar el micrófono y habla claramente.');
        } else {
          setVoiceErrorMessage(`Aviso de voz: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        // Automatically submit the spoken question when the soldier finishes speaking!
        const queryToSend = activeTranscriptRef.current.trim() || input.trim();
        if (queryToSend) {
          setTimeout(() => {
            handleSend(queryToSend);
          }, 250);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error('Error starting speech recognition:', err);
      setIsListening(false);
      setShowPermissionModal(true);
      setVoiceErrorMessage(`Error al iniciar reconocimiento: ${err.message || 'Error desconocido'}`);
    }
  };

  const toggleListening = () => {
    // If currently listening, stop immediately
    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {
        // ignore
      }
      setIsListening(false);
      return;
    }

    startListeningDirectly();
  };

  return (
    <div className="window-3d rounded-xl p-3.5 sm:p-5 flex flex-col h-[75dvh] min-h-[460px] max-h-[750px] w-full max-w-full overflow-hidden relative">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-stone-800">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner flex-shrink-0">
            <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                EMS 2026
              </span>
              <span className="text-[11px] text-stone-400 font-mono truncate">Tutor Doctrinal Oral e Interactivo</span>
            </div>
            <h3 className="text-xs sm:text-base font-bold text-stone-100 truncate">
              Asistente Jurídico y Táctico Militar
            </h3>
          </div>
        </div>

        {/* Voice Controls Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-end">
          {/* Voice Response Toggle */}
          <button
            onClick={() => setVoiceResponseEnabled(!voiceResponseEnabled)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition flex items-center gap-1 cursor-pointer flex-shrink-0 ${
              voiceResponseEnabled
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'bg-stone-800 text-stone-400 border border-stone-700/60'
            }`}
            title="Activar o desactivar que el tutor responda hablando en voz alta"
          >
            {voiceResponseEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-stone-500" />
            )}
            <span>Voz: {voiceResponseEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Playback Speed */}
          <button
            onClick={cyclePlaybackRate}
            className="px-2 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono font-bold flex items-center gap-1 transition cursor-pointer flex-shrink-0"
            title="Velocidad de locución militar"
          >
            <FastForward className="w-3.5 h-3.5" />
            {playbackRate}x
          </button>

          {/* Stop Voice Button if active */}
          {(isPlayingVoice || isPausedVoice) && (
            <button
              onClick={handleStopVoice}
              className="px-2.5 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-mono font-semibold transition flex items-center gap-1 cursor-pointer flex-shrink-0"
              title="Detener respuesta de voz"
            >
              <Square className="w-3 h-3 fill-red-400 text-red-400" />
              <span className="hidden xs:inline">Detener</span>
            </button>
          )}

          {/* Pause / Resume if speaking */}
          {isPlayingVoice ? (
            <button
              onClick={handlePauseVoice}
              className="p-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 transition cursor-pointer flex-shrink-0"
              title="Pausar voz"
            >
              <Pause className="w-4 h-4 fill-stone-950" />
            </button>
          ) : isPausedVoice ? (
            <button
              onClick={handleResumeVoice}
              className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-stone-950 transition cursor-pointer flex-shrink-0"
              title="Reanudar voz"
            >
              <Play className="w-4 h-4 fill-stone-950" />
            </button>
          ) : null}

          <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-stone-400 bg-stone-950 px-2.5 py-1.5 rounded-lg border border-stone-800">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Fidelidad Textual 100%</span>
          </div>
        </div>
      </div>

      {/* Preset Queries Pill List */}
      <div className="py-2 overflow-x-auto flex gap-1.5 border-b border-stone-800/80 no-scrollbar">
        {PRESET_QUERIES.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(preset)}
            className="flex-shrink-0 text-[10px] sm:text-[11px] font-mono bg-stone-950 hover:bg-stone-800 text-stone-300 hover:text-amber-300 px-2.5 py-1 rounded-md border border-stone-800 transition cursor-pointer"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Error or Warning Notice */}
      {voiceErrorMessage && (
        <div className="my-2 p-2.5 rounded-lg bg-amber-950/60 border border-amber-800/80 text-amber-300 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-400" />
            <span>{voiceErrorMessage}</span>
          </div>
          <button
            onClick={() => setVoiceErrorMessage(null)}
            className="text-stone-400 hover:text-stone-200 cursor-pointer p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Messages List Area */}
      <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1">
        {messages.map(msg => {
          const isThisMsgSpeaking = currentlySpeakingMsgId === msg.id && isPlayingVoice;
          const isThisMsgPaused = currentlySpeakingMsgId === msg.id && isPausedVoice;

          return (
            <div
              key={msg.id}
              className={`flex gap-2 sm:gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0 text-[10px] sm:text-xs font-mono font-bold mt-1">
                  EMS
                </div>
              )}

              <div
                className={`max-w-[88%] sm:max-w-2xl rounded-xl p-3 sm:p-4 text-xs sm:text-sm leading-relaxed space-y-2 break-words relative ${
                  msg.sender === 'user'
                    ? 'bg-amber-600 text-white font-medium rounded-tr-none'
                    : isThisMsgSpeaking
                    ? 'bg-stone-950 border border-amber-500/70 text-stone-200 rounded-tl-none shadow-xl ring-1 ring-amber-500/30'
                    : 'bg-stone-950 border border-stone-800 text-stone-200 rounded-tl-none shadow-md'
                }`}
              >
                {/* Assistant Voice Speaking Ribbon */}
                {isThisMsgSpeaking && (
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800 w-fit mb-1 animate-pulse">
                    <Radio className="w-3 h-3" />
                    <span>Respondiendo por voz militar...</span>
                  </div>
                )}

                <div className="whitespace-pre-line font-sans">{msg.text}</div>

                {msg.legalBasis && (
                  <div className="pt-2 border-t border-stone-800/80 font-mono text-xs text-amber-400 flex items-center gap-1.5 font-bold">
                    <BookOpen className="w-3.5 h-3.5" /> {msg.legalBasis}
                  </div>
                )}

                {msg.mode && (
                  <div className="font-mono text-[10px] text-stone-500">
                    {msg.mode === 'llm'
                      ? `Respondido por IA sobre ${msg.sources?.length ?? 0} articulo(s) del compendio`
                      : 'Respondido por la base local (IA no disponible)'}
                  </div>
                )}

                {msg.exampleOrScenario && (
                  <div className="bg-stone-900/80 p-2.5 rounded-lg border border-stone-800 text-xs text-stone-300">
                    <strong className="text-emerald-400 font-mono block mb-0.5">Ejemplo doctrinario:</strong>
                    {msg.exampleOrScenario}
                  </div>
                )}

                {msg.verificationQuestion && (
                  <div className="bg-amber-950/20 p-2.5 rounded-lg border border-amber-800/40 text-xs text-amber-200">
                    <strong className="text-amber-400 font-mono block mb-0.5">Pregunta de verificación EMS:</strong>
                    {msg.verificationQuestion}
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 border-t border-stone-800/40 text-[10px] font-mono">
                  {/* Re-listen button for assistant messages */}
                  {msg.sender === 'assistant' ? (
                    <button
                      onClick={() => {
                        if (isThisMsgSpeaking) {
                          handlePauseVoice();
                        } else if (isThisMsgPaused) {
                          handleResumeVoice();
                        } else {
                          speakAssistantMessage(msg.id, msg.text, msg.legalBasis);
                        }
                      }}
                      className="text-stone-400 hover:text-amber-300 transition flex items-center gap-1 cursor-pointer"
                      title="Escuchar esta respuesta"
                    >
                      {isThisMsgSpeaking ? (
                        <>
                          <Pause className="w-3 h-3 text-amber-400" />
                          <span className="text-amber-400 font-bold">Pausar</span>
                        </>
                      ) : isThisMsgPaused ? (
                        <>
                          <Play className="w-3 h-3 text-amber-400" />
                          <span className="text-amber-400 font-bold">Reanudar</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3 text-stone-400 hover:text-amber-400" />
                          <span>Escuchar</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div />
                  )}

                  <div className={msg.sender === 'user' ? 'text-amber-200' : 'text-stone-400'}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-amber-400 bg-stone-950 px-3 py-2 rounded-lg max-w-full border border-stone-800 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 animate-spin flex-shrink-0" />
            <span className="truncate">Verificando fundamento jurídico en Compendio EMS 2026...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice Listening Wave Bar when user is speaking */}
      {isListening && (
        <div className="mb-2.5 py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-red-950 via-stone-950 to-amber-950/80 border-2 border-red-500/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-stone-100 shadow-xl animate-pulse">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-red-600/30 border border-red-500 flex items-center justify-center flex-shrink-0 relative">
              <Mic className="w-4 h-4 text-red-400" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-red-400">MICRO ACTIVO (HABLANDO AL TUTOR)</span>
                {/* Visual sound equalizer bars */}
                <div className="flex items-center gap-1">
                  <span className="inline-block w-1 h-3 bg-red-400 animate-pulse" />
                  <span className="inline-block w-1 h-4 bg-red-400 animate-pulse delay-75" />
                  <span className="inline-block w-1 h-2 bg-red-400 animate-pulse delay-150" />
                  <span className="inline-block w-1 h-4 bg-red-400 animate-pulse delay-100" />
                </div>
              </div>
              <p className="text-[11px] text-stone-300 truncate">
                {activeTranscriptRef.current || 'Habla con claridad... Al detenerte se enviará automáticamente.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={() => {
                const query = activeTranscriptRef.current.trim() || input.trim();
                if (query) {
                  handleSend(query);
                } else {
                  toggleListening();
                }
              }}
              className="text-xs font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 px-3 py-1.5 rounded-lg shadow-md cursor-pointer flex items-center gap-1 transition"
            >
              <Send className="w-3.5 h-3.5 fill-stone-950" />
              <span>Enviar Ahora</span>
            </button>

            <button
              type="button"
              onClick={toggleListening}
              className="text-xs font-mono text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 px-2.5 py-1.5 rounded-lg border border-stone-700 cursor-pointer transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Input Form with Microphone & Send */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
        className="pt-3 border-t border-stone-800 flex items-center gap-2 w-full max-w-full"
      >
        <div className="relative flex-1 min-w-0 flex items-center">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={
              isListening
                ? 'Escuchando tu voz militar...'
                : 'Escribe o presiona el micrófono para hablar al tutor...'
            }
            className={`w-full bg-stone-950 border rounded-xl pl-3 sm:pl-4 pr-11 py-2.5 sm:py-3 text-xs sm:text-sm text-stone-100 placeholder-stone-400 focus:outline-none transition font-sans ${
              isListening
                ? 'border-red-500 ring-2 ring-red-500/30 shadow-inner'
                : 'border-stone-800 focus:border-amber-500'
            }`}
          />

          {/* In-input mic icon button */}
          <button
            type="button"
            onClick={toggleListening}
            className={`absolute right-2 p-1.5 sm:p-2 rounded-lg transition cursor-pointer ${
              isListening
                ? 'bg-red-600 text-white animate-pulse shadow-md ring-2 ring-red-400 scale-105'
                : 'bg-stone-800 hover:bg-stone-700 text-amber-400 hover:text-amber-300 hover:scale-105'
            }`}
            title={
              isListening
                ? 'Detener micrófono'
                : 'Presiona para hablar (solicitará permiso y enviará al detenerte)'
            }
          >
            {isListening ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!input.trim() && !isListening}
          className="btn-3d-base btn-3d-teal px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed font-mono font-bold text-xs flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <Send className="w-4 h-4 fill-current" />
          <span className="hidden sm:inline">Consultar</span>
        </button>
      </form>

      {/* Permission Guide Modal when permission was denied or requested */}
      {showPermissionModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="window-3d rounded-2xl max-w-lg w-full p-5 sm:p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-stone-100">
                    Activación de Micrófono Militar
                  </h4>
                  <p className="text-xs text-amber-400 font-mono">
                    Interacción Oral EMS 2026
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPermissionModal(false)}
                className="text-stone-400 hover:text-stone-200 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Test Feedback Result */}
            {testResult && (
              <div
                className={`p-3 rounded-xl border text-xs font-sans ${
                  testResult.success
                    ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
                    : 'bg-red-950/80 border-red-500/60 text-red-200'
                }`}
              >
                <div className="flex items-start gap-2">
                  {testResult.success ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <p className="font-semibold">{testResult.message}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2 text-xs text-stone-300 font-sans leading-relaxed">
              <p>
                Si no apareció la ventana emergente de permiso, es porque tu navegador tiene el micrófono bloqueado por defecto o guardó esa preferencia anteriormente. Para desbloquearlo:
              </p>
            </div>

            {/* 3 Step Resolution Box */}
            <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 space-y-2.5 text-xs text-stone-300 font-sans">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 mt-0.5">
                  1
                </span>
                <p>
                  <strong>En la barra de direcciones de tu navegador (arriba):</strong> Pulsa el icono de <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-stone-800 text-stone-200 font-mono text-[11px] font-bold">🔒 Candado</span> o <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-stone-800 text-stone-200 font-mono text-[11px] font-bold">🎛️ Ajustes</span> al lado izquierdo del enlace URL.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 mt-0.5">
                  2
                </span>
                <p>
                  En la sección <strong>Micrófono</strong>, cambia la opción a <strong className="text-emerald-400">"Permitir"</strong> (o presiona "Restablecer permisos").
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 mt-0.5">
                  3
                </span>
                <p>
                  Presiona el botón <strong className="text-amber-400">"🔄 Recargar Página"</strong> para aplicar el permiso y hablar al tutor.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleTestOrRequestMic}
                disabled={isTestingMic}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-mono font-bold text-xs transition shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                {isTestingMic ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                    <span>Conectando con el micrófono...</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 text-stone-950" />
                    <span>Solicitar / Probar Micrófono</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto py-2.5 px-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer border border-stone-700"
                title="Recargar la página para aplicar los permisos de Chrome"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                <span>Recargar Página</span>
              </button>

              <button
                type="button"
                onClick={() => window.open(window.location.href, '_blank')}
                className="w-full sm:w-auto py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-mono text-xs flex items-center justify-center gap-1 transition cursor-pointer border border-stone-700"
                title="Abrir en pestaña completa fuera del iframe para solicitar permisos nativos"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Pestaña Completa</span>
              </button>
            </div>

            {/* Quick Test Voice Prompts if user wants immediate oral test */}
            <div className="pt-2 border-t border-stone-800/80">
              <span className="text-[11px] font-mono text-stone-400 block mb-1.5">
                O prueba una consulta con respuesta oral inmediata (TTS):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['¿Cuál es el artículo 24?', '¿Cuál es el máximo arresto para un Oficial?', '¿Cuáles son las 5 misiones generales?'].map(q => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => {
                      setShowPermissionModal(false);
                      handleSend(q);
                    }}
                    className="text-[10px] font-mono px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 cursor-pointer"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
