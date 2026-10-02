import { ARTICLE_REVIEW_DATA } from './articleReviewQuestions';

export interface QnAPair {
  keywords: string[];
  question: string;
  answer: string;
  legalBasis: string;
  exampleOrScenario?: string;
  verificationQuestion?: string;
  articleNumber?: string;
}

export const KNOWLEDGE_BASE: QnAPair[] = [
  {
    keywords: ['arresto oficial', 'oficial', 'maximo oficial', 'limite oficial', 'duracion oficial', 'art 33', 'articulo 33', '8 dias'],
    question: '¿Cuál es el máximo arresto para un Oficial?',
    answer: 'El Artículo 33 de la Ley de Disciplina del Ejército, Fuerza Aérea y Guardia Nacional establece que los Oficiales pueden ser arrestados hasta por 8 días.',
    legalBasis: 'Ley de Disciplina del Ejército, Fuerza Aérea y Guardia Nacional, Art. 33.',
    exampleOrScenario: 'Un Subteniente comete una falta en el servicio; el Comandante de corporación solo puede graduarle hasta 8 días de arresto en su cuartel o alojamiento.',
    verificationQuestion: '¿En qué lugar debe cumplir el arresto un oficial según este artículo?',
    articleNumber: '33'
  },
  {
    keywords: ['arresto tropa', 'tropa', 'sargento', 'cabo', 'soldado', 'art 33 bis', 'articulo 33 bis', 'maximo tropa', '15 dias'],
    question: '¿Cuál es el máximo arresto para el personal de Tropa?',
    answer: 'El Artículo 33 Bis de la Ley de Disciplina establece que los individuos de tropa (Soldados, Cabos, Sargentos 2/os. y 1/os.) pueden ser arrestados hasta por un máximo de 15 días.',
    legalBasis: 'Ley de Disciplina del Ejército y FAM, Art. 33 Bis.',
    exampleOrScenario: 'Cualquier orden que pretenda imponer 16 días o más a un soldado o sargento es violatoria de la legislación militar y carece de validez jurídica.',
    verificationQuestion: '¿Bajo qué modalidades puede cumplirse este arresto según el Art. 32?',
    articleNumber: '33 bis'
  },
  {
    keywords: [
      '24',
      'art 24',
      'art. 24',
      'articulo 24',
      'correctivos',
      'correctivo',
      'correctivos disciplinarios',
      'correctivo disciplinario',
      'amonestacion',
      'tres correctivos',
      'clasificacion correctivos',
      'cual es el articulo 24',
      'que dice el articulo 24'
    ],
    question: '¿Qué establece el Artículo 24 de la Ley de Disciplina y cuáles son los correctivos disciplinarios?',
    answer:
      'El Artículo 24 de la Ley de Disciplina establece taxativamente que los correctivos disciplinarios son las sanciones que se imponen a los militares por infracciones a las leyes o reglamentos militares, siempre que no constituyan un delito.\n\nLos correctivos disciplinarios son únicamente tres:\nI. Amonestación;\nII. Arresto; y\nIII. Cambio de cuerpo o dependencia.\n\nQueda estrictamente prohibida la reprensión, que por ser afrentosa y degradante, es contraria a la dignidad militar.',
    legalBasis: 'Ley de Disciplina del Ejército, Fuerza Aérea y Guardia Nacional, Art. 24.',
    exampleOrScenario:
      'Las multas económicas, castigos físicos, ejercicios excesivos o humillaciones públicas NO son correctivos disciplinarios autorizados; constituyen faltas graves o abusos de autoridad punibles.',
    verificationQuestion: '¿Cuál es la condición indispensable para que proceda la imposición de un correctivo disciplinario?',
    articleNumber: '24'
  },
  {
    keywords: ['art 25', 'articulo 25', 'amonestacion', 'que es amonestacion'],
    question: '¿Qué es la amonestación según el Artículo 25?',
    answer: 'La amonestación es el acto por el cual el superior advierte al subalterno de la omisión o falta en el cumplimiento de sus deberes, invitándolo a corregirse, a fin de que no incurra en nueva falta y se haga acreedor a un arresto.',
    legalBasis: 'Ley de Disciplina, Art. 25.',
    exampleOrScenario: 'La amonestación se hace de palabra y en privado, previniendo al elemento sin exhibirlo frente a la tropa.',
    verificationQuestion: '¿Puede hacerse la amonestación en público o de forma degradante?',
    articleNumber: '25'
  },
  {
    keywords: ['art 26', 'articulo 26', 'definicion arresto', 'que es arresto'],
    question: '¿Qué es el arresto militar según el Artículo 26?',
    answer: 'El arresto es la reclusión que sufre un militar por un término de veinticuatro horas hasta quince días en su alojamiento, cuartel o en las guardias de prevención.',
    legalBasis: 'Ley de Disciplina, Art. 26.',
    exampleOrScenario: 'El arresto no puede exceder los límites legales fijados según la jerarquía del infractor.',
    verificationQuestion: '¿A partir de qué momento empieza a computarse el arresto militar?',
    articleNumber: '26'
  },
  {
    keywords: ['art 32', 'articulo 32', 'modalidades arresto', 'arresto con perjuicio', 'sin perjuicio'],
    question: '¿Cuáles son las modalidades del arresto según el Artículo 32?',
    answer: 'El arresto se cumple:\nI. Sin perjuicio del servicio: el militar sale únicamente a desempeñar las fatigas o comisiones asignadas y regresa de inmediato a cumplir su arresto.\nII. Con perjuicio del servicio: el militar queda exclusivamente recluido y relevado de todo servicio de armas o comisión exterior.',
    legalBasis: 'Ley de Disciplina, Art. 32.',
    exampleOrScenario: 'El personal de tropa que desempeña un servicio especial puede ser arrestado sin perjuicio para no afectar la operatividad de la unidad.',
    verificationQuestion: '¿Quién determina si el arresto es con o sin perjuicio del servicio?',
    articleNumber: '32'
  },
  {
    keywords: ['desercion', 'centinela', 'abandono', 'art 261', 'art 256', 'pena desercion', 'articulo 256', 'articulo 261'],
    question: '¿Cuándo se comete deserción y cuál es la falta del centinela?',
    answer: 'Según el Artículo 256 del Código de Justicia Militar, se comete deserción al faltar a 3 listas consecutivas o ausentarse más de 72 horas sin causa legal justificada.\n\nEl centinela que abandona su puesto o se duerme comete delito militar agravado según el Art. 261 fracción IV del CJM, sancionable con pena de prisión militar.',
    legalBasis: 'Código de Justicia Militar, Arts. 256 y 261 fr. IV.',
    exampleOrScenario: 'Un centinela nocturno abandona el polvorín para ir al comedor; comete delito militar grave contra la seguridad del puesto y de la tropa.',
    verificationQuestion: '¿A qué horas o listas se considera consumada la deserción en tiempo de paz?',
    articleNumber: '256'
  },
  {
    keywords: ['envolvimiento', 'penetracion', 'maniobra', 'tactica', 'diferencia envolvimiento'],
    question: '¿Cuál es la diferencia entre envolvimiento y penetración?',
    answer: 'Según el Manual de Táctica de Infantería (Capítulo IV):\n- Envolvimiento: Evita el choque frontal contra la parte más fuerte del enemigo, rodea sus flancos y busca caer sobre su retaguardia para cortar su retirada y aislarlo.\n- Penetración: Consiste en golpear con potencia de fuego y choque concentrado un punto vulnerable de la línea enemiga para romperla y dividir sus fuerzas en dos partes.',
    legalBasis: 'Manual de Táctica de Infantería, Capítulo IV (Maniobra Ofensiva).',
    exampleOrScenario: 'Si el enemigo posee campos de tiro despejados al frente pero un flanco débil o cubierto por vegetación, la maniobra doctrinal recomendada es el envolvimiento.',
    verificationQuestion: '¿Cuál de las dos maniobras busca dividir al enemigo en dos partes?',
    articleNumber: 'tactica'
  },
  {
    keywords: ['misiones', 'ley organica', 'art 1', 'articulo 1', 'cinco misiones', 'dn-iii', 'dn 3', 'misiones generales'],
    question: '¿Cuáles son las 5 misiones generales del Ejército y FAM?',
    answer: 'El Artículo 1 de la Ley Orgánica establece las 5 misiones generales:\n1. Defender la integridad, la independencia y la soberanía de la nación.\n2. Garantizar la seguridad interior.\n3. Auxiliar a la población civil en casos de necesidades públicas.\n4. Realizar acciones cívicas y obras sociales que tiendan al progreso del país.\n5. En caso de desastre, prestar ayuda para el auxilio de las personas y sus bienes, y la reconstrucción de las zonas afectadas (Plan DN-III-E).',
    legalBasis: 'Ley Orgánica del Ejército y Fuerza Aérea Mexicanos, Art. 1.',
    exampleOrScenario: 'El despliegue de comedores comunitarios, albergues y puentes aéreos tras un huracán se fundamenta en la Fracción V del Artículo 1.',
    verificationQuestion: '¿A quién corresponde el Mando Supremo del Ejército y FAM según el Art. 11 de la Ley Orgánica?',
    articleNumber: '1'
  },
  {
    keywords: ['uso de la fuerza', 'niveles', 'art 11', 'articulo 11', 'letal', 'principios fuerza', 'lnuf'],
    question: '¿Cuáles son los 5 niveles del uso de la fuerza según la LNUF?',
    answer: 'El Artículo 11 de la Ley Nacional sobre el Uso de la Fuerza establece 5 niveles escalonados:\n1. Presencia de autoridad.\n2. Persuasión o disuasión verbal.\n3. Reducción física de movimientos.\n4. Armas incapacitantes menos letales.\n5. Fuerza letal (solo en defensa de la vida ante agresión real, actual o inminente, conforme al Art. 12).',
    legalBasis: 'Ley Nacional sobre el Uso de la Fuerza, Arts. 4, 11 y 12.',
    exampleOrScenario: 'Frente a insultos o agresiones verbales, está prohibido emplear armas de fuego; debe utilizarse persuasión verbal o presencia de autoridad.',
    verificationQuestion: '¿Cuáles son los 5 principios rectores del uso de la fuerza según el Art. 4?',
    articleNumber: '11'
  },
  {
    keywords: ['sargento 1', 'sargento primero', 'deberes sargento', 'art 82', 'articulo 82', 'rgdm', 'funciones sargento primero'],
    question: '¿Cuáles son los deberes primordiales del Sargento Primero?',
    answer: 'El Artículo 82 del Reglamento General de Deberes Militares señala que el Sargento 1/o. es el de mayor jerarquía entre las clases de tropa, debe ser modelo de disciplina y es el auxilio inmediato del Capitán Comandante de la Compañía. Debe conocer a todos los soldados por sus nombres (Art. 85) y llevar el rol general de servicios.',
    legalBasis: 'Reglamento General de Deberes Militares, Arts. 80 al 95.',
    exampleOrScenario: 'El Sargento 1/o. supervisa la formación de diana, revista el estado del armamento y asegura la puntualidad de la compañía.',
    verificationQuestion: '¿Qué documento de control militar lleva directamente el Sargento 1/o. en la compañía?',
    articleNumber: '82'
  },
  {
    keywords: ['consejo de honor', 'integracion', 'art 45', 'articulo 45', 'art 49', 'articulo 49', 'quien juzga'],
    question: '¿Cómo se integra y qué juzga el Consejo de Honor?',
    answer: 'Según los Artículos 43 al 45 de la Ley de Disciplina:\n- Integración: 1 Presidente (un Jefe) y 4 Vocales (oficiales). El vocal de menor graduación o antigüedad actúa como Secretario.\n- Competencia: Juzga a Oficiales y Tropa por faltas contra la moral y el honor militar.\n- Facultades: Puede acordar la baja del servicio de las armas para la tropa por mala conducta (Art. 49 fr. III).',
    legalBasis: 'Ley de Disciplina del Ejército y FAM, Arts. 43, 44, 45 y 49.',
    exampleOrScenario: 'Un elemento que acumula faltas reiteradas o conductas públicas vergonzosas es presentado ante el Consejo de Honor para acordar su baja de las fuerzas armadas.',
    verificationQuestion: '¿Son juzgados los Generales y Jefes por el Consejo de Honor de unidad?',
    articleNumber: '45'
  }
];

function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[¿?¡!.,;:()\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function findAnswerInKnowledgeBase(query: string): QnAPair | null {
  const normalized = normalizeText(query);

  // 1. Direct Article Number Extraction (e.g. "articulo 24", "art 24", "24", "articulo 33 bis")
  const articleRegex = /(?:art[ií]culo|art\.?)\s*(\d+(?:\s*bis)?)/i;
  const articleMatch = query.match(articleRegex);
  const targetArticleNum = articleMatch ? normalizeText(articleMatch[1]) : null;

  if (targetArticleNum) {
    // Check in KNOWLEDGE_BASE by articleNumber
    const directKb = KNOWLEDGE_BASE.find(item => item.articleNumber && normalizeText(item.articleNumber) === targetArticleNum);
    if (directKb) return directKb;

    // Search in ARTICLE_REVIEW_DATA across all portions
    for (const portionKey of Object.keys(ARTICLE_REVIEW_DATA)) {
      const groups = ARTICLE_REVIEW_DATA[portionKey];
      for (const group of groups) {
        const groupNorm = normalizeText(group.article);
        if (groupNorm.includes(targetArticleNum) || groupNorm.endsWith(targetArticleNum)) {
          // Construct rich answer from article review group
          const firstQ = group.questions[0];
          if (!firstQ) continue;
          const secondQ = group.questions[1];
          return {
            keywords: [targetArticleNum, group.article],
            question: `¿Qué prescribe el ${group.article}?`,
            answer: `Conforme al ${group.article} de la legislación militar:\n\n${group.articleSummary}.\n\nCriterio y doctrina militar:\n${firstQ.explanation}${secondQ ? `\n\nRegla de observancia: ${secondQ.explanation}` : ''}`,
            legalBasis: firstQ.legalBasis,
            exampleOrScenario: `Para efectos de evaluación y servicio: ${firstQ.question} Respuesta doctrinaria: ${firstQ.options[firstQ.correctOptionIndex]}`,
            verificationQuestion: secondQ ? secondQ.question : firstQ.question,
            articleNumber: targetArticleNum
          };
        }
      }
    }
  }

  // 2. Exact keyword matching with score weighting
  let bestMatch: QnAPair | null = null;
  let maxScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      const normKw = normalizeText(kw);
      if (normalized.includes(normKw)) {
        score += normKw.length * 2;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  if (maxScore >= 4 && bestMatch) {
    return bestMatch;
  }

  // 3. Fallback: Search in ARTICLE_REVIEW_DATA questions and summaries
  const queryTokens = normalized.split(' ').filter(t => t.length > 3);
  if (queryTokens.length > 0) {
    let bestReviewGroup = null;
    let maxTokensMatched = 0;

    for (const portionKey of Object.keys(ARTICLE_REVIEW_DATA)) {
      const groups = ARTICLE_REVIEW_DATA[portionKey];
      for (const group of groups) {
        const searchCorpus = normalizeText(`${group.article} ${group.articleSummary} ${group.questions.map(q => q.question + ' ' + q.explanation).join(' ')}`);
        let matches = 0;
        for (const token of queryTokens) {
          if (searchCorpus.includes(token)) matches++;
        }
        if (matches > maxTokensMatched) {
          maxTokensMatched = matches;
          bestReviewGroup = group;
        }
      }
    }

    if (bestReviewGroup && maxTokensMatched >= 2) {
      const q = bestReviewGroup.questions[0];
      return {
        keywords: queryTokens,
        question: `Consulta doctrinal sobre ${bestReviewGroup.article}`,
        answer: `Conforme al ${bestReviewGroup.article} del Compendio EMS 2026:\n\n${bestReviewGroup.articleSummary}.\n\nFundamento Doctrinal: ${q.explanation}`,
        legalBasis: q.legalBasis,
        exampleOrScenario: `Cuestión aplicable: ${q.question} Solución legal: ${q.options[q.correctOptionIndex]}`,
        verificationQuestion: q.question,
        articleNumber: bestReviewGroup.article
      };
    }
  }

  return null;
}
