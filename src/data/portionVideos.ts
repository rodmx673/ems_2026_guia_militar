import { YouTubePreset } from '../utils/youtube';

export interface PortionVideoConfig {
  portionId: string;
  defaultUrl: string;
  title: string;
  description: string;
  presets: YouTubePreset[];
}

/**
 * Curated YouTube video links for EMS 2026 study sessions.
 * Each portion has a default video player link and curated presets.
 * Users can also paste and save any custom YouTube link!
 */
export const PORTION_VIDEOS_MAP: Record<string, PortionVideoConfig> = {
  'tutorial-induction': {
    portionId: 'tutorial-induction',
    defaultUrl: 'https://youtu.be/fYsuPCFG3fY',
    title: 'Video Tutorial de Inducción y Contexto EMS 2026',
    description: 'Video oficial de bienvenida, arquitectura pedagógica y método de 4 pasos para Sargento 1/o.',
    presets: [
      {
        id: 'tut-official',
        title: 'Video 1 Oficial: Inducción al Curso EMS 2026',
        url: 'https://youtu.be/fYsuPCFG3fY',
        description: 'Video principal de inducción y metodología de estudio para el ascenso.',
        duration: '3:00'
      },
      {
        id: 'tut-alt1',
        title: 'Principios Rectores de la Disciplina Militar',
        url: 'https://www.youtube.com/watch?v=s7sX922J9Rk',
        description: 'Fundamento doctrinario y bases de la disciplina militar mexicana.',
        duration: '6:00'
      }
    ]
  },
  '1.1': {
    portionId: '1.1',
    defaultUrl: 'https://youtu.be/npy0A6ucYfo',
    title: 'Principios Generales de la Disciplina Militar (Arts. 1-10)',
    description: 'Bases de la disciplina: obediencia, honor, justicia y moral. Subordinación y deberes militares.',
    presets: [
      {
        id: '1.1-official',
        title: 'Video Oficial: Principios Generales de la Disciplina Militar',
        url: 'https://youtu.be/npy0A6ucYfo',
        description: 'Video oficial de la Porción 1.1 (Arts. 1 al 10 de la Ley de Disciplina del Ejército y FAM).',
        duration: '7:30'
      },
      {
        id: '1.1-p1',
        title: 'Principios Rectores de la Disciplina Militar',
        url: 'https://www.youtube.com/watch?v=s7sX922J9Rk',
        description: 'Fundamento doctrinario y bases de la disciplina militar mexicana.',
        duration: '6:00'
      },
      {
        id: '1.1-p2',
        title: 'Valores y Virtudes Militares SEDENA',
        url: 'https://www.youtube.com/watch?v=k_n7kK7mQ6c',
        description: 'Doctrina de honor, lealtad y subordinación en el Ejército Mexicano.',
        duration: '5:30'
      }
    ]
  },
  '1.2': {
    portionId: '1.2',
    defaultUrl: 'https://www.youtube.com/watch?v=kYyYqW-0q3w',
    title: 'Correctivos Disciplinarios: Concepto y Clasificación (Arts. 11-24)',
    description: 'Análisis del Art. 24 de la Ley de Disciplina: Amonestación, Arresto y Cambio de Unidad. Diferencia entre falta administrativa y delito.',
    presets: [
      {
        id: '1.2-p1',
        title: 'Correctivos Disciplinarios (Art. 24 Ley de Disciplina)',
        url: 'https://www.youtube.com/watch?v=kYyYqW-0q3w',
        description: 'Explicación completa de las tres medidas disciplinarias legales y su procedimiento.',
        duration: '7:00'
      },
      {
        id: '1.2-p2',
        title: 'Amonestación, Arresto y Cambio de Unidad',
        url: 'https://www.youtube.com/watch?v=q6gO-cM6Q8E',
        description: 'Graduación de sanciones y respeto a la dignidad del militar según reglamento.',
        duration: '6:45'
      },
      {
        id: '1.2-p3',
        title: 'Doctrina Disciplinaria y Responsabilidad del Sargento 1/o.',
        url: 'https://www.youtube.com/watch?v=2n0v9e-9i3I',
        description: 'Facultades sancionadoras y límites legales en el servicio militar interior.',
        duration: '8:15'
      }
    ]
  },
  '1.3': {
    portionId: '1.3',
    defaultUrl: 'https://www.youtube.com/watch?v=kYyYqW-0q3w',
    title: 'El Arresto Militar: Modalidades y Cumplimiento',
    description: 'Arresto con perjuicio y sin perjuicio del servicio. Lugares y formalidades de cumplimiento.',
    presets: [
      {
        id: '1.3-p1',
        title: 'Modalidades de Arresto en Unidades Militares',
        url: 'https://www.youtube.com/watch?v=kYyYqW-0q3w',
        description: 'Diferencia táctica y administrativa del arresto militar.',
        duration: '6:30'
      }
    ]
  },
  '1.4': {
    portionId: '1.4',
    defaultUrl: 'https://www.youtube.com/watch?v=s7sX922J9Rk',
    title: 'Consejo de Honor: Integración y Atribuciones',
    description: 'Constitución del Consejo de Honor en corporaciones, facultades sancionadoras y resoluciones.',
    presets: [
      {
        id: '1.4-p1',
        title: 'Procedimiento del Consejo de Honor Militar',
        url: 'https://www.youtube.com/watch?v=s7sX922J9Rk',
        description: 'Análisis de juicio de honor y salvaguarda de la dignidad militar.',
        duration: '7:15'
      }
    ]
  },
  '1.5': {
    portionId: '1.5',
    defaultUrl: 'https://www.youtube.com/watch?v=k_n7kK7mQ6c',
    title: 'Recursos y Garantías en Materia Disciplinaria',
    description: 'Derecho de petición, audiencia y quejas individuales conforme al marco militar.',
    presets: [
      {
        id: '1.5-p1',
        title: 'Garantías Constitucionales y Conducto Jerárquico',
        url: 'https://www.youtube.com/watch?v=k_n7kK7mQ6c',
        description: 'Cómo tramitar recursos individuales sin incurrir en queja colectiva.',
        duration: '5:45'
      }
    ]
  },
  '1.6': {
    portionId: '1.6',
    defaultUrl: 'https://www.youtube.com/watch?v=2n0v9e-9i3I',
    title: 'Deberes del Sargento Primero en la Compañía',
    description: 'El Sargento 1/o. como auxiliar directo del Capitán de Compañía y enlace con la tropa.',
    presets: [
      {
        id: '1.6-p1',
        title: 'El Liderazgo del Sargento 1/o. en Infantería',
        url: 'https://www.youtube.com/watch?v=2n0v9e-9i3I',
        description: 'Mando, supervisión diaria de listas y mantenimiento de la disciplina.',
        duration: '8:00'
      }
    ]
  }
};

/**
 * Universal fallback video config for portions that do not have an explicit custom mapping yet.
 */
export function getDefaultVideoForPortion(
  portionId: string,
  portionTitle: string,
  portionNumber: string,
  customDefaultUrl?: string
): PortionVideoConfig {
  const existing = PORTION_VIDEOS_MAP[portionId];
  if (existing) {
    if (customDefaultUrl) {
      return { ...existing, defaultUrl: customDefaultUrl };
    }
    return existing;
  }

  // Generic military educational study video fallback
  const defaultUrl = customDefaultUrl || 'https://www.youtube.com/watch?v=kYyYqW-0q3w';
  return {
    portionId,
    defaultUrl,
    title: `Porción ${portionNumber}: ${portionTitle}`,
    description: `Sesión de estudio y videoclase orientada a la evaluación EMS 2026 para Sargento 1/o.`,
    presets: [
      {
        id: `${portionId}-default`,
        title: `Clase Principal: ${portionTitle}`,
        url: defaultUrl,
        description: `Video explicativo de la porción ${portionNumber}.`,
        duration: '6:00'
      },
      {
        id: `${portionId}-alt`,
        title: 'Doctrina Militar y Marco Normativo SEDENA',
        url: 'https://www.youtube.com/watch?v=s7sX922J9Rk',
        description: 'Marco normativo y adiestramiento de las Fuerzas Armadas de México.',
        duration: '7:30'
      }
    ]
  };
}
