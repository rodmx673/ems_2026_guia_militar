import { KNOWLEDGE_BASE } from './assistantKnowledge';
import { ARTICLE_REVIEW_DATA } from './articleReviewQuestions';

export interface DoctrineChunk {
  id: string;
  category: string;
  source: string;
  text: string;
  score: number;
}

const STOPWORDS = new Set([
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'al', 'a',
  'por', 'para', 'con', 'sin', 'sobre', 'entre', 'y', 'o', 'u', 'que', 'qué',
  'cual', 'cuál', 'cuales', 'cuáles', 'como', 'cómo', 'cuando', 'cuándo',
  'donde', 'dónde', 'es', 'son', 'fue', 'ser', 'estar', 'esta', 'está', 'estan',
  'están', 'se', 'su', 'sus', 'lo', 'le', 'les', 'me', 'te', 'ti', 'nos',
  'the', 'of', 'to', 'in', 'is', 'are', 'and', 'or', 'for', 'on', 'with',
  'que', 'quien', 'cuien', 'esto', 'esta', 'ese', 'esa', 'aquel', 'aqui', 'alli',
  'mas', 'más', 'muy', 'poco', 'toda', 'todo', 'todos', 'todas', 'segun', 'según',
  'art', 'articulo', 'artículo', 'la', 'ley', 'compendio'
]);

function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(input: string): string[] {
  return normalizeText(input)
    .split(' ')
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));
}

/**
 * Scored lexical retrieval over the EMS 2026 doctrine corpus.
 * Shared by the server-side RAG pipeline and the client-side fallback so both
 * always agree on which articles are relevant.
 */
export function retrieveDoctrine(query: string, maxChunks = 6): DoctrineChunk[] {
  const normalizedQuery = normalizeText(query);
  const queryTokens = tokenize(query);
  const tokenSet = new Set(queryTokens);

  const articleMatch = query.match(/(?:articulos?|art\.?)\s*(\d+(?:\s*bis)?)/i);
  const targetArticle = articleMatch ? normalizeText(articleMatch[1]).replace(/\s+/g, '') : null;

  const chunks: DoctrineChunk[] = [];

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;

    for (const kw of item.keywords) {
      const normKw = normalizeText(kw);
      if (normKw && normalizedQuery.includes(normKw)) {
        score += normKw.length * 2;
      }
    }

    const itemTokens = new Set(tokenize(`${item.question} ${item.answer}`));
    for (const t of tokenSet) {
      if (itemTokens.has(t)) score += 2;
    }

    if (targetArticle && item.articleNumber && normalizeText(item.articleNumber) === targetArticle) {
      score += 40;
    }

    if (score <= 0) continue;

    const parts = [item.answer];
    if (item.exampleOrScenario) parts.push(`Ejemplo: ${item.exampleOrScenario}`);

    chunks.push({
      id: `kb-${item.articleNumber ?? item.keywords[0] ?? item.question}`,
      category: 'Base de conocimiento',
      source: item.legalBasis,
      text: parts.join('\n\n'),
      score
    });
  }

  for (const portionKey of Object.keys(ARTICLE_REVIEW_DATA)) {
    for (const group of ARTICLE_REVIEW_DATA[portionKey]) {
      const groupNorm = normalizeText(group.article);

      let score = 0;

      if (targetArticle) {
        const flatArticle = groupNorm.replace(/\s+/g, '');
        if (flatArticle.includes(targetArticle)) score += 40;
      }

      const corpus = normalizeText(
        `${group.article} ${group.articleSummary} ${group.questions
          .map((q) => `${q.question} ${q.explanation} ${q.options.join(' ')}`)
          .join(' ')}`
      );
      const corpusTokens = new Set(corpus.split(' '));

      for (const t of tokenSet) {
        if (corpusTokens.has(t)) score += 2;
      }

      if (score <= 0) continue;

      const evidence = group.questions
        .slice(0, 4)
        .map((q) => `- ${q.question} Respuesta: ${q.options[q.correctOptionIndex]} (${q.legalBasis})`)
        .join('\n');

      chunks.push({
        id: `art-${portionKey}-${group.article}`,
        category: `Repaso por artículo - Porción ${portionKey}`,
        source: group.article,
        text: `Resumen del ${group.article}: ${group.articleSummary}\n${evidence}`,
        score
      });
    }
  }

  return chunks.sort((a, b) => b.score - a.score).slice(0, maxChunks);
}

export function buildDoctrineContext(chunks: DoctrineChunk[]): string {
  if (chunks.length === 0) return '';
  return chunks
    .map((c, i) => `[${i + 1}] Fuente: ${c.source}\n${c.text}`)
    .join('\n\n---\n\n');
}