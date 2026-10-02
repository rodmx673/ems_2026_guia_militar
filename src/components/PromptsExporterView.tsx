import React, { useState } from 'react';
import { Copy, Check, Terminal, Download, FileText } from 'lucide-react';
import { PROMPTS_DATA } from '../data/promptsData';
import { CATEGORY_1_PORTIONS } from '../data/category1Content';

export const PromptsExporterView: React.FC = () => {
  const [selectedPromptId, setSelectedPromptId] = useState<string>('prompt-maestro');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activePrompt = PROMPTS_DATA.find(p => p.id === selectedPromptId) || PROMPTS_DATA[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const generateCategory1Markdown = () => {
    let md = `# CATEGORÍA 1: LEY DE DISCIPLINA DEL EJÉRCITO, FUERZA AÉREA Y GUARDIA NACIONAL\n\n`;
    md += `**Curso de Formación de Sargento 1/o. de Infantería y Fusilero Paracaidista (EMS 2026)**\n\n`;

    CATEGORY_1_PORTIONS.forEach(p => {
      md += `## Porción ${p.portionNumber} – ${p.title}\n`;
      md += `**Artículos:** ${p.articles} | **Duración:** ${p.durationMinutes} min\n\n`;
      md += `### 🎧 Audio TTS (Guion):\n> ${p.audioScript.intro}\n>\n`;
      p.audioScript.development.forEach(d => {
        md += `> - ${d}\n`;
      });
      md += `>\n> **Cierre:** ${p.audioScript.closure}\n\n`;

      md += `### 🎥 Video (Storyboard):\n`;
      md += `| Minuto | Visual | Narración |\n|---|---|---|\n`;
      p.videoStoryboard.forEach(v => {
        md += `| ${v.minute} | ${v.visual} | ${v.narration} |\n`;
      });
      md += `\n`;

      md += `### 📝 Escenario Práctico:\n> **Situación:** ${p.scenario.situation}\n\n`;
      p.scenario.questions.forEach((q, i) => {
        md += `**P${i + 1}: ${q.question}**\n- **Respuesta:** ${q.answer} (${q.legalBasis})\n\n`;
      });

      md += `### 🃏 Tarjetas:\n`;
      p.flashcards.forEach((f, i) => {
        md += `${i + 1}. **F:** ${f.question} **R:** ${f.answer} (${f.article})\n`;
      });
      md += `\n`;

      md += `### ❓ Mini-Quiz (5 Preguntas):\n`;
      p.quiz.forEach((q, i) => {
        md += `${i + 1}. ${q.question}\n`;
        q.options.forEach((opt, optIdx) => {
          const l = ['a', 'b', 'c', 'd'][optIdx];
          md += `   ${l}) ${opt}\n`;
        });
        const correctLetter = ['a', 'b', 'c', 'd'][q.correctOptionIndex];
        md += `   **Respuesta:** ${correctLetter}) | **Fundamento:** ${q.legalBasis}\n\n`;
      });

      md += `---\n\n`;
    });

    return md;
  };

  const handleDownloadMarkdown = () => {
    const md = generateCategory1Markdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EMS_2026_Categoria_1_Completa.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 shadow-lg space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                CENTRO DE PROMPTS Y NOTION
              </span>
              <span className="text-xs text-stone-400 font-mono">Generador EMS 2026</span>
            </div>
            <h3 className="text-sm md:text-base font-bold text-stone-100">
              Biblioteca de Prompts Maestros y Exportador Markdown
            </h3>
          </div>
        </div>

        <button
          onClick={handleDownloadMarkdown}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition shadow-md cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Exportar Cat. 1 a Markdown / Notion (.md)
        </button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2.5">
        {PROMPTS_DATA.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedPromptId(p.id)}
            className={`text-left p-3 rounded-xl border text-xs transition cursor-pointer ${
              selectedPromptId === p.id
                ? 'bg-amber-950/40 border-amber-500 text-stone-100 shadow-md ring-1 ring-amber-500/40'
                : 'bg-stone-950 border-stone-800 hover:border-stone-700 text-stone-400'
            }`}
          >
            <span className="font-mono text-[10px] text-amber-400 font-bold block mb-1 uppercase">
              {p.category}
            </span>
            <span className="font-semibold block truncate text-stone-200">{p.title}</span>
          </button>
        ))}
      </div>

      <div className="bg-stone-950 rounded-xl border border-stone-800 p-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-amber-300 font-mono flex items-center gap-2">
              <FileText className="w-4 h-4" /> {activePrompt.title}
            </h4>
            <p className="text-xs text-stone-400 mt-0.5">{activePrompt.description}</p>
          </div>

          <button
            onClick={() => handleCopy(activePrompt.content, activePrompt.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono font-bold transition shadow-sm cursor-pointer"
          >
            {copiedId === activePrompt.id ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" /> ¡Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copiar Prompt
              </>
            )}
          </button>
        </div>

        <pre className="bg-stone-900 border border-stone-800/80 rounded-lg p-4 text-xs font-mono text-stone-300 overflow-x-auto max-h-[380px] whitespace-pre-wrap leading-relaxed select-all">
          {activePrompt.content}
        </pre>
      </div>

      <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-4 text-xs space-y-2 font-mono">
        <h5 className="font-bold text-amber-400">📅 PLAN DE ACCIÓN DE 10 DÍAS (RECOMENDADO EN EL PROMPT):</h5>
        <div className="grid md:grid-cols-2 gap-2 text-stone-300">
          <div>• <strong>Día 1:</strong> PROMPT MAESTRO + PDF → Dashboard + Cat. 1 (¡Listo en este applet!)</div>
          <div>• <strong>Día 2:</strong> PROMPT POR CATEGORÍA → Categoría 2 (Deberes Militares)</div>
          <div>• <strong>Día 3:</strong> PROMPT POR CATEGORÍA → Categoría 3 (Justicia Militar)</div>
          <div>• <strong>Día 4:</strong> PROMPT POR CATEGORÍA → Categorías 4 y 5 (Ley Orgánica / Armas)</div>
          <div>• <strong>Día 5:</strong> PROMPT POR CATEGORÍA → Categorías 6 y 7 (DDHH / Uso de Fuerza)</div>
          <div>• <strong>Día 6:</strong> PROMPT POR CATEGORÍA → Categoría 8 (Táctica de Infantería)</div>
          <div>• <strong>Día 7:</strong> PROMPT DE EXAMEN → Los 6 simulacros completos</div>
          <div>• <strong>Día 8:</strong> PROMPT DE ASISTENTE → Asistente militar configurado</div>
        </div>
      </div>
    </div>
  );
};
