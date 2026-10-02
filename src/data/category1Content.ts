import { Portion } from '../types/ems';

export const CATEGORY_1_PORTIONS: Portion[] = [
  {
    id: '1.1',
    categoryId: 1,
    portionNumber: '1.1',
    title: 'Principios Generales de la Disciplina Militar',
    articles: 'Artículos 1 al 10',
    durationMinutes: 30,
    videoUrl: 'https://youtu.be/npy0A6ucYfo',
    audioScript: {
      durationEstimate: '6 min',
      intro: '¡Atención, personal cursante! Iniciamos el estudio de la Categoría 1: Ley de Disciplina del Ejército, Fuerza Aérea y Guardia Nacional. En esta primera porción analizaremos del Artículo 1 al 10, los cimientos doctrinarios e inquebrantables de nuestra vida militar.',
      development: [
        'Artículo 1: Establece que la presente Ley tiene por objeto prescribir las normas a que deben sujetarse los militares en los actos del servicio y fuera de él. Esto significa que la condición de militar no se suspende al cruzar el portón del cuartel.',
        'Artículo 3: Define la Disciplina Militar como la norma a que los militares deben sujetar su conducta; tiene como base la obediencia, y un alto concepto del honor, de la justicia y de la moral. Su objeto fundamental es el fiel y exacto cumplimiento de los deberes.',
        'Artículo 3 Bis: Nos exige que el servicio de las armas obligue a anteponer al interés personal el respeto a la Constitución, la soberanía de la nación y la lealtad a las instituciones patrias, llevando el cumplimiento del deber hasta el sacrificio de la propia vida si fuera necesario.',
        'Artículos 4 al 6: Regulan el principio de subordinación jerárquica. El superior debe mantener la dignidad militar frente al inferior y este debe guardar el más estricto respeto y acatamiento de las órdenes.',
        'Artículos 7 al 10: Toda orden militar debe ser relativa al servicio, legal, clara y concisa. Ningún militar está obligado a obedecer una orden que constituya notoriamente un delito. El Sargento 1/o. debe ser garante de que las órdenes se cumplan con exactitud y energía sin rayar en el abuso.'
      ],
      closure: 'Recuerda para tu examen de la EMS: El Artículo 3 define la disciplina como norma de conducta basada en obediencia, honor, justicia y moral. ¡Memoriza este cuarteto de valores!'
    },
    videoStoryboard: [
      {
        minute: '0:00 - 1:15',
        visual: 'Placa militar de infantería con el texto: "EMS 2026 - Ley de Disciplina Militar: Principios Rectores (Arts. 1-10)". Infografía con los cuatro pilares: Obediencia, Honor, Justicia y Moral.',
        narration: 'Bienvenidos cursantes al análisis de los principios fundacionales. La disciplina militar no es un capricho jerárquico; es la columna vertebral que mantiene en pie a las Fuerzas Armadas.'
      },
      {
        minute: '1:16 - 3:00',
        visual: 'Animación comparativa: Actos del servicio vs. Fuera del servicio (Art. 1). Cuadro resaltando el Art. 3 Bis con texto dorado: "Hasta el sacrificio de la vida".',
        narration: 'El Artículo 1 deja claro que el militar lo es 24 horas al día. El Artículo 3 Bis marca la diferencia ética entre un civil y un soldado: el deber patrio por encima del interés individual.'
      },
      {
        minute: '3:01 - 4:45',
        visual: 'Esquema de mando: Superior emitiendo orden legal hacia tropa. Flecha de verificación: Claridad, Concisión y Legalidad (Arts. 7 y 8).',
        narration: 'Como Sargento Primero, transmitirás y supervisarás órdenes en la línea de fuego y en el cuartel. La orden debe ser terminante y legal; nunca admitas órdenes ambiguas.'
      },
      {
        minute: '4:46 - 6:00',
        visual: 'Resumen con preguntas tipo examen. Fórmulas mnemotécnicas para los artículos 1, 3, 3 Bis y 10.',
        narration: 'Pregunta segura de examen: ¿En qué se fundamenta la disciplina militar? Respuesta: Obediencia, honor, justicia y moral (Art. 3).'
      }
    ],
    scenario: {
      id: 'scen-1.1',
      title: 'Cumplimiento de orden y límite de obediencia en servicio nocturno',
      context: 'Sector de operaciones en zona urbana, base de operaciones móviles.',
      situation: 'El Soldado Hernández, bajo las órdenes directas del Sargento 1/o. Gómez, manifiesta durante el pase de lista de las 21:00 horas que se niega a relevar el puesto de vigilancia perimétrica porque considera que ya cumplió su turno regular según su opinión personal.',
      questions: [
        {
          id: 'q1',
          question: '¿Qué principio de la disciplina militar viola el soldado al rehusar el servicio?',
          answer: 'Viola el principio de obediencia y subordinación estricta al servicio de las armas establecido en los Artículos 3 y 3 Bis.',
          legalBasis: 'Ley de Disciplina, Art. 3 y 3 Bis.'
        },
        {
          id: 'q2',
          question: '¿Puede un militar anteponer su descanso o interés particular a la orden de relevo?',
          answer: 'No. El Art. 3 Bis prohíbe taxativamente anteponer el interés personal al cumplimiento del deber militar.',
          legalBasis: 'Ley de Disciplina, Art. 3 Bis.'
        },
        {
          id: 'q3',
          question: '¿Qué facultad disciplinaria inmediata asiste al superior?',
          answer: 'Corregir la falta inmediatamente o dar parte al Oficial de Guardia para la imposición del correctivo disciplinario correspondiente.',
          legalBasis: 'Ley de Disciplina, Arts. 10 y 24.'
        }
      ],
      solutionSummary: 'El servicio militar exige entrega absoluta. La falta de obediencia a una orden de relevo atenta contra la disciplina del servicio de armas (Art. 3 y 3 Bis).'
    },
    flashcards: [
      {
        id: 'fc-1.1-1',
        portionId: '1.1',
        categoryId: 1,
        question: '¿Cuál es el objeto de la Ley de Disciplina Militar según su Artículo 1?',
        answer: 'Prescribir las normas a que deben sujetarse los militares en los actos del servicio y fuera de él.',
        article: 'Art. 1'
      },
      {
        id: 'fc-1.1-2',
        portionId: '1.1',
        categoryId: 1,
        question: '¿Cómo define el Artículo 3 a la Disciplina Militar?',
        answer: 'La norma a que los militares deben sujetar su conducta; tiene como base la obediencia, y un alto concepto del honor, de la justicia y de la moral.',
        article: 'Art. 3'
      },
      {
        id: 'fc-1.1-3',
        portionId: '1.1',
        categoryId: 1,
        question: '¿Qué exige el servicio de las armas según el Artículo 3 Bis?',
        answer: 'Que el militar lleve el cumplimiento del deber hasta el sacrificio y que anteponga al interés personal el respeto a la Constitución y la Patria.',
        article: 'Art. 3 Bis'
      },
      {
        id: 'fc-1.1-4',
        portionId: '1.1',
        categoryId: 1,
        question: '¿A qué tiene por objeto la disciplina militar según el Art. 3?',
        answer: 'El fiel y exacto cumplimiento de los deberes que prescriben las Leyes y Reglamentos Militares.',
        article: 'Art. 3'
      },
      {
        id: 'fc-1.1-5',
        portionId: '1.1',
        categoryId: 1,
        question: '¿Cómo debe conducirse el superior con el inferior según el Art. 4?',
        answer: 'Tratará a los inferiores con la mayor dignidad y decoro, cuidando de no inferirles ultrajes ni faltas de respeto.',
        article: 'Art. 4'
      },
      {
        id: 'fc-1.1-6',
        portionId: '1.1',
        categoryId: 1,
        question: '¿Cómo debe ser toda orden militar según el Art. 7?',
        answer: 'Debe ser relativa al servicio, emitida con claridad, concisión y legalidad.',
        article: 'Art. 7'
      },
      {
        id: 'fc-1.1-7',
        portionId: '1.1',
        categoryId: 1,
        question: '¿Qué debe hacer un militar ante una orden notoriamente delictiva?',
        answer: 'No está obligado a obedecerla, ya que el cumplimiento de órdenes no exime de responsabilidad penal en actos ilícitos.',
        article: 'Art. 8 y Código Penal Militar'
      },
      {
        id: 'fc-1.1-8',
        portionId: '1.1',
        categoryId: 1,
        question: '¿A quién corresponde mantener el principio de subordinación en el Ejército?',
        answer: 'A todos los militares, debiendo cada uno en su esfera de acción ser ejemplo de respeto a la jerarquía.',
        article: 'Art. 5'
      },
      {
        id: 'fc-1.1-9',
        portionId: '1.1',
        categoryId: 1,
        question: '¿Qué prohíbe el Artículo 9 a los militares en materia de quejas colectivas?',
        answer: 'Prohíbe terminantemente elevar solicitudes o quejas en forma tumultuaria o colectiva.',
        article: 'Art. 9'
      },
      {
        id: 'fc-1.1-10',
        portionId: '1.1',
        categoryId: 1,
        question: '¿Cuál es la función del Sargento 1/o. en relación con la disciplina de la tropa?',
        answer: 'Vigilar la estricta observancia de los deberes militares, instruir a los soldados y reportar irregularidades al Comandante de Compañía.',
        article: 'Art. 10 y Deberes Militares'
      }
    ],
    quiz: [
      {
        id: 'q-1.1-1',
        portionId: '1.1',
        categoryId: 1,
        question: 'Conforme al Artículo 3 de la Ley de Disciplina, ¿cuáles son las bases de la disciplina militar?',
        options: [
          'La obediencia, y un alto concepto del honor, de la justicia y de la moral.',
          'La antigüedad, el escalafón, el servicio y la jerarquía.',
          'El régimen penal, la subordinación ciega y la amonestación verbal.',
          'El mando supremo del Comandante de Región y de Zona Militar.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Ley de Disciplina, Art. 3',
        explanation: 'El Art. 3 señala textualmente: "La disciplina es la norma a que los militares deben sujetar su conducta; tiene como base la obediencia, y un alto concepto del honor, de la justicia y de la moral".'
      },
      {
        id: 'q-1.1-2',
        portionId: '1.1',
        categoryId: 1,
        question: '¿A qué obliga el servicio de las armas según el Artículo 3 Bis de la Ley de Disciplina?',
        options: [
          'A solicitar autorización civil antes de cualquier despliegue táctico.',
          'A que el militar anteponga al interés personal el respeto a la Constitución y lleve el deber hasta el sacrificio.',
          'A permanecer únicamente acuartelado durante los fines de semana de guardia.',
          'A desempeñar exclusivamente cargos técnicos de acuerdo al arma de origen.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 3 Bis',
        explanation: 'El Art. 3 Bis impone el mandato ético supremo de anteponer el deber militar y la soberanía patria a los intereses privados, incluso hasta el sacrificio.'
      },
      {
        id: 'q-1.1-3',
        portionId: '1.1',
        categoryId: 1,
        question: 'Según el Artículo 1 de la Ley de Disciplina, ¿en qué momentos rigen las normas prescritas por dicha ley?',
        options: [
          'Únicamente en operaciones de guerra exterior decretadas por el Congreso.',
          'Exclusivamente dentro del horario de lista de diana a lista de retreta.',
          'En los actos del servicio y fuera de él.',
          'Solo mientras el militar porte el uniforme de campaña o gala.'
        ],
        correctOptionIndex: 2,
        legalBasis: 'Ley de Disciplina, Art. 1',
        explanation: 'El Art. 1 prescribe taxativamente que la ley rige a los militares "en los actos del servicio y fuera de él".'
      },
      {
        id: 'q-1.1-4',
        portionId: '1.1',
        categoryId: 1,
        question: '¿Cómo debe formularse toda orden del servicio militar según el Artículo 7?',
        options: [
          'En clave militar secreta y cifrada por el escalón superior.',
          'Con claridad, concisión y ligada estrechamente a los actos del servicio.',
          'Con previo dictamen de un órgano colegiado disciplinario.',
          'De manera genérica dejando a criterio libre del soldado su ejecución.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 7',
        explanation: 'Toda orden debe ser terminante, clara, concisa y referida a actos estrictamente del servicio legal.'
      },
      {
        id: 'q-1.1-5',
        portionId: '1.1',
        categoryId: 1,
        question: '¿Qué dispone el Artículo 9 respecto a las solicitudes o quejas de los militares?',
        options: [
          'Se admiten asambleas deliberativas en los comedores de tropa.',
          'Queda prohibida toda manifestación colectiva o queja en común.',
          'Las quejas deben tramitarse mediante sindicato de clases y marinería.',
          'Todo militar puede unirse a peticiones públicas políticas en plazas cívicas.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 9',
        explanation: 'El Art. 9 prohíbe categóricamente las peticiones o quejas colectivas; el conducto debe ser siempre individual por la vía jerárquica.'
      }
    ]
  },
  {
    id: '1.2',
    categoryId: 1,
    portionNumber: '1.2',
    title: 'Correctivos Disciplinarios: Concepto y Clasificación',
    articles: 'Artículos 11 al 24',
    durationMinutes: 30,
    videoUrl: 'https://www.youtube.com/watch?v=kYyYqW-0q3w',
    audioScript: {
      durationEstimate: '7 min',
      intro: '¡Cursantes de la EMS! Entramos a la porción 1.2, una de las más examinadas en las evaluaciones de ascenso: Concepto y Clasificación de los Correctivos Disciplinarios, Artículos 11 al 24.',
      development: [
        'Artículo 24: Este es el corazón de la porción. Define qué es un correctivo disciplinario: "Correctivo disciplinario es la medida que se impone a un militar por haber infringido las leyes o reglamentos militares, siempre que no constituya delito". ¡Ojo! Si constituye delito, corresponde a la jurisdicción militar penal, no a correctivo.',
        'Clasificación del Artículo 24: Los correctivos disciplinarios son únicamente tres: I. Amonestación; II. Arresto; y III. Cambio de cuerpo o dependencia. Grábate bien estos tres.',
        'La Amonestación (Art. 25): Es el acto por el cual el superior advierte al subordinado sobre la falta cometida, exhortándolo a enmendarse. Puede ser de palabra o por escrito. Queda prohibida la amonestación en público o de forma denigrante.',
        'El Cambio de Unidad o Dependencia (Art. 27): Se acuerda por la Secretaría de la Defensa Nacional cuando la permanencia de un individuo en su unidad sea perjudicial para la disciplina o para la buena marcha del servicio.',
        'Principios de imposición: Ningún militar puede ser castigado dos veces por la misma falta (non bis in idem), y todo correctivo debe graduarse considerando la jerarquía, antecedentes y circunstancias del hecho.'
      ],
      closure: '¡Atención al Artículo 24! Solo hay tres correctivos disciplinarios legales: Amonestación, Arresto y Cambio de Unidad. En el examen suelen poner trampas con opciones inventadas como "rebaja de sueldo" o "trabajo forzado". ¡Esas no existen!'
    },
    videoStoryboard: [
      {
        minute: '0:00 - 1:30',
        visual: 'Infografía en pantalla: "¿Delito o Falta Disciplinaria?". Dos caminos: Delito va al Código de Justicia Militar; Falta va a la Ley de Disciplina (Art. 24).',
        narration: 'Diferencia clave para el Sargento Primero: un correctivo disciplinario jamás sanciona delitos, solo infracciones reglamentarias administrativas.'
      },
      {
        minute: '1:31 - 3:30',
        visual: 'Trilogía de correctivos en letras doradas sobre fondo táctico: 1. Amonestación, 2. Arresto, 3. Cambio de Unidad o Dependencia.',
        narration: 'El Artículo 24 no admite más correctivos. La amonestación busca corregir de palabra o por oficio; el arresto restringe la libertad en alojamiento o guardia; y el cambio de unidad separa al elemento tóxico.'
      },
      {
        minute: '3:31 - 5:15',
        visual: 'Escena interactiva de amonestación en oficina del Sargento 1/o. con el Soldado presente, a puerta cerrada. Indicador de "Prohibido amonestar frente a la tropa".',
        narration: 'El decoro militar exige amonestar en privado. Nunca humilles a un soldado ante sus compañeros; la amonestación educa, no degrada.'
      },
      {
        minute: '5:16 - 7:00',
        visual: 'Resumen en tabla comparativa: Medida / Definición / Fundamento Legal.',
        narration: 'Pregunta típica: ¿Cuál es el correctivo disciplinario que consiste en la advertencia que el superior hace al inferior? Respuesta: Amonestación (Art. 25).'
      }
    ],
    scenario: {
      id: 'scen-1.2',
      title: 'Distinción entre falta disciplinaria y delito en servicio de armas',
      context: 'Compañía de Fusileros del Batallón de Infantería.',
      situation: 'Durante la revista de armamento, el Cabo Martínez extravía su cargador con 20 cartuchos útiles 5.56 mm y además contesta con indolencia al Sargento 1/o. cuando es reconvenido.',
      questions: [
        {
          id: 'q1',
          question: '¿La insolencia verbal que no llegue a amenaza constituye falta disciplinaria o delito?',
          answer: 'Constituye falta contra la disciplina militar sancionable con correctivo disciplinario si no media amenaza o agresión física.',
          legalBasis: 'Ley de Disciplina, Arts. 24 y 25.'
        },
        {
          id: 'q2',
          question: '¿Qué correctivo disciplinario procede por la falta de compostura y negligencia leve?',
          answer: 'Amonestación o arresto graduado con o sin perjuicio del servicio conforme a las facultades del superior.',
          legalBasis: 'Ley de Disciplina, Art. 24 fr. I y II.'
        },
        {
          id: 'q3',
          question: '¿Puede el Sargento ordenar como castigo descuentos de haberes al Cabo?',
          answer: 'No. Los correctivos legales taxativos son solo amonestación, arresto y cambio de cuerpo; no existen multas ni descuentos económicos.',
          legalBasis: 'Ley de Disciplina, Art. 24.'
        }
      ],
      solutionSummary: 'Los correctivos disciplinarios son taxativos: amonestación, arresto o cambio de cuerpo (Art. 24). Cualquier sanción no tipificada es ilegal y arbitraria.'
    },
    flashcards: [
      {
        id: 'fc-1.2-1',
        portionId: '1.2',
        categoryId: 1,
        question: '¿Qué es un correctivo disciplinario según el Artículo 24?',
        answer: 'La medida que se impone a un militar por haber infringido las leyes o reglamentos militares, siempre que no constituya delito.',
        article: 'Art. 24'
      },
      {
        id: 'fc-1.2-2',
        portionId: '1.2',
        categoryId: 1,
        question: '¿Cuáles son los únicos 3 correctivos disciplinarios señalados por el Art. 24?',
        answer: 'I. Amonestación; II. Arresto; y III. Cambio de cuerpo o dependencia.',
        article: 'Art. 24'
      },
      {
        id: 'fc-1.2-3',
        portionId: '1.2',
        categoryId: 1,
        question: '¿En qué consiste la Amonestación según el Art. 25?',
        answer: 'En la advertencia que el superior hace al inferior, de palabra o por escrito, sobre la falta cometida para que reflexione y se enmiende.',
        article: 'Art. 25'
      },
      {
        id: 'fc-1.2-4',
        portionId: '1.2',
        categoryId: 1,
        question: '¿Cómo queda prohibido hacer una amonestación militar?',
        answer: 'Queda prohibida hacerla en público y en términos injuriosos o denigrantes.',
        article: 'Art. 25'
      },
      {
        id: 'fc-1.2-5',
        portionId: '1.2',
        categoryId: 1,
        question: '¿Quién tiene facultad para acordar el Cambio de Cuerpo o Dependencia?',
        answer: 'La Secretaría de la Defensa Nacional.',
        article: 'Art. 27'
      },
      {
        id: 'fc-1.2-6',
        portionId: '1.2',
        categoryId: 1,
        question: '¿Qué principio constitucional y militar prohíbe sancionar dos veces una misma falta?',
        answer: 'El principio de "Non bis in idem" (nadie puede ser juzgado o castigado dos veces por la misma falta).',
        article: 'Art. 24 y Constitución Art. 23'
      },
      {
        id: 'fc-1.2-7',
        portionId: '1.2',
        categoryId: 1,
        question: '¿Qué debe tomarse en cuenta para graduar un correctivo disciplinario?',
        answer: 'La jerarquía militar, los antecedentes de conducta, las circunstancias del hecho y el daño a la disciplina.',
        article: 'Art. 28'
      },
      {
        id: 'fc-1.2-8',
        portionId: '1.2',
        categoryId: 1,
        question: '¿Constituye un correctivo disciplinario el descuento económico de haberes?',
        answer: 'FALSO. Los descuentos no son correctivos disciplinarios en las leyes militares mexicanas.',
        article: 'Art. 24'
      },
      {
        id: 'fc-1.2-9',
        portionId: '1.2',
        categoryId: 1,
        question: '¿A quién debe darse parte cuando una infracción rebase la categoría de falta y constituya delito?',
        answer: 'Al Ministerio Público Militar correspondiente por el conducto regular.',
        article: 'Art. 24 y Código de Justicia Militar'
      },
      {
        id: 'fc-1.2-10',
        portionId: '1.2',
        categoryId: 1,
        question: '¿Qué objetivo primordial persigue la imposición de un correctivo?',
        answer: 'Mantener la disciplina, corregir la conducta del infractor y servir de ejemplo preventivo a los demás.',
        article: 'Art. 24'
      }
    ],
    quiz: [
      {
        id: 'q-1.2-1',
        portionId: '1.2',
        categoryId: 1,
        question: 'De acuerdo al Artículo 24 de la Ley de Disciplina, son correctivos disciplinarios:',
        options: [
          'Amonestación, Arresto y Cambio de cuerpo o dependencia.',
          'Arresto, Reducción de grado y Suspensión de haberes.',
          'Amonestación, Trabajo de cuartel y Prisión militar preventiva.',
          'Consignación judicial, Extrañamiento verbal y Degradación de tropa.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Ley de Disciplina, Art. 24',
        explanation: 'El Art. 24 enumera taxativamente los 3 correctivos: I. Amonestación; II. Arresto; y III. Cambio de cuerpo o dependencia.'
      },
      {
        id: 'q-1.2-2',
        portionId: '1.2',
        categoryId: 1,
        question: '¿Cuál es la condición sine qua non para imponer un correctivo disciplinario según el Art. 24?',
        options: [
          'Que haya sido autorizado por un tribunal federal de justicia.',
          'Que la infracción a leyes o reglamentos militares no constituya delito.',
          'Que el infractor firme previamente su carta de aceptación.',
          'Que el militar tenga una antigüedad mínima de un año en el activo.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 24',
        explanation: 'La ley especifica: "siempre que no constituya delito". Si hay delito, se consigna penalmente.'
      },
      {
        id: 'q-1.2-3',
        portionId: '1.2',
        categoryId: 1,
        question: 'Conforme al Artículo 25, la amonestación debe caracterizarse por:',
        options: [
          'Hacerse en la plaza principal frente a la tropa formada.',
          'Hacerse con dignidad y decoro, prohibiéndose en público y con injurias.',
          'Acompañarse invariablemente de 48 horas de aislamiento en celda.',
          'Publicarse en los periódicos civiles de mayor circulación estatal.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 25',
        explanation: 'La amonestación se realiza de palabra o por oficio, con dignidad y jamás en público ni con términos denigrantes.'
      },
      {
        id: 'q-1.2-4',
        portionId: '1.2',
        categoryId: 1,
        question: '¿Qué autoridad militar tiene la atribución para acordar el correctivo de cambio de cuerpo o dependencia?',
        options: [
          'El Sargento 1/o. de la compañía.',
          'El Comandante de la Guardia en Prevención.',
          'La Secretaría de la Defensa Nacional.',
          'El Consejo Municipal de Seguridad.'
        ],
        correctOptionIndex: 2,
        legalBasis: 'Ley de Disciplina, Art. 27',
        explanation: 'El Art. 27 reserva a la Secretaría de la Defensa Nacional la potestad de acordar el cambio de cuerpo o dependencia.'
      },
      {
        id: 'q-1.2-5',
        portionId: '1.2',
        categoryId: 1,
        question: 'Si un superior aplica una multa económica a un soldado por llegar tarde a lista de diana, ¿cómo se califica esta medida?',
        options: [
          'Legal y respaldada por la Ley de Hacienda Militar.',
          'Ilegal y arbitraria, pues la multa no es correctivo disciplinario militar.',
          'Facultad discrecional de cualquier clase de tropa.',
          'Correctivo especial para tiempos de paz.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 24',
        explanation: 'En las Fuerzas Armadas Mexicanas no existen multas ni sanciones pecuniarias como correctivo disciplinario; hacerlo constituye abuso de autoridad.'
      }
    ]
  },
  {
    id: '1.3',
    categoryId: 1,
    portionNumber: '1.3',
    title: 'El Arresto: Graduación, Lugares y Duración',
    articles: 'Artículos 24 Bis al 33 Bis',
    durationMinutes: 30,
    audioScript: {
      durationEstimate: '8 min',
      intro: '¡Firmes! Llegamos al tema nuclear de cualquier examen militar SEDENA: El Arresto, sus límites de tiempo, modalidades y lugares de cumplimiento según los Artículos 24 Bis al 33 Bis.',
      development: [
        'Concepto del Arresto (Art. 32): Es la reclusión que sufre un militar por un término que no exceda de 15 días en su alojamiento militar, cuartel o en las guardias de prevención.',
        'Modalidades del Arresto (Art. 32): El arresto puede ser: Con perjuicio del servicio o Sin perjuicio del servicio. "Con perjuicio" significa que desempeña únicamente aquellos servicios que no requieran salir del alojamiento militar o de la guardia. "Sin perjuicio" significa que sale a cumplir con sus servicios de armas o comisiones normales y al terminar regresa a su reclusión.',
        'Duración máxima para Generales y Jefes (Art. 33): Los Generales y Jefes pueden ser arrestados hasta por 24 horas y 48 horas respectivamente en sus alojamientos.',
        'Duración máxima para Oficiales (Art. 33): ¡Pregunta de cajón! Los Oficiales (Subtenientes, Tenientes, Capitanes Segundos y Primeros) pueden ser arrestados HASTA POR 8 DÍAS en sus cuarteles o alojamientos.',
        'Duración máxima para Tropa (Art. 33 Bis): Para la Tropa (Soldados, Cabos, Sargentos Segundos y Sargentos Primeros) el arresto puede ser HASTA POR 15 DÍAS en las guardias de prevención o prisiones militares.',
        'Cómputo del arresto: Comienza a correr desde el momento exacto en que el infractor queda formalmente notificado de la orden.'
      ],
      closure: 'Regla mnemotécnica indispensable: Oficiales = 8 días máximo. Tropa = 15 días máximo. Memoriza estos dos números para asegurar tus puntos en el examen de ascenso.'
    },
    videoStoryboard: [
      {
        minute: '0:00 - 1:45',
        visual: 'Reloj de arena militar y gráfico de barras: Oficiales (8 días) vs Tropa (15 días). Cita de los Arts. 33 y 33 Bis.',
        narration: 'No te equivoques jamás en estos plazos. El Art. 33 fija 8 días para oficiales; el Art. 33 Bis fija 15 días para tropa.'
      },
      {
        minute: '1:46 - 3:30',
        visual: 'Infografía animada: Con perjuicio del servicio vs Sin perjuicio del servicio. Soldado con fusil saliendo a servicio vs soldado permaneciendo en prevención.',
        narration: '¿Qué significa con perjuicio? El militar no sale del recinto, solo hace fatigas internas. ¿Sin perjuicio? Cumple sus servicios ordinarios de instrucción y armas, y al terminar vuelve a la guardia.'
      },
      {
        minute: '3:31 - 5:30',
        visual: 'Plano del cuartel militar: Señalización de los lugares legales para cumplir el arresto (Alojamiento de oficiales, Guardia de prevención, Prisión militar).',
        narration: 'Los oficiales jamás se arrestan en la celda de tropa de la guardia de prevención; cumplen en sus dormitorios o cuarteles.'
      },
      {
        minute: '5:31 - 8:00',
        visual: 'Simulador de preguntas con cuenta regresiva de 10 segundos. Análisis de distractores comunes.',
        narration: 'Cuidado con preguntas que digan "30 días de arresto". En la Ley de Disciplina el tope absoluto es de 15 días para tropa.'
      }
    ],
    scenario: {
      id: 'scen-1.3',
      title: 'Graduación de arresto a un Sargento 2/o. por omisión en el servicio',
      context: 'Puesto militar de seguridad en carretera federal.',
      situation: 'El Sargento 2/o. Ramírez fue sorprendido durmiendo durante su turno de inspección vehicular nocturna. El Comandante de la Sección propone imponerle 20 días de arresto.',
      questions: [
        {
          id: 'q1',
          question: '¿Es legal imponer 20 días de arresto al Sargento 2/o.?',
          answer: 'Es totalmente ilegal. El tope máximo que marca el Artículo 33 Bis para personal de tropa (incluyendo sargentos) es de 15 días.',
          legalBasis: 'Ley de Disciplina, Art. 33 Bis.'
        },
        {
          id: 'q2',
          question: '¿Dónde debe cumplir el arresto el Sargento 2/o.?',
          answer: 'En el cuartel, guardia de prevención o alojamiento militar de clases.',
          legalBasis: 'Ley de Disciplina, Art. 32.'
        },
        {
          id: 'q3',
          question: '¿Puede ordenarse que el arresto sea "sin perjuicio del servicio"?',
          answer: 'Sí, para que continúe desempeñando sus labores de instrucción y apoyo táctico diurno.',
          legalBasis: 'Ley de Disciplina, Art. 32.'
        }
      ],
      solutionSummary: 'El límite legal del arresto para clases y marinería o tropa es de hasta 15 días (Art. 33 Bis). Cualquier orden que exceda este término viola la ley.'
    },
    flashcards: [
      {
        id: 'fc-1.3-1',
        portionId: '1.3',
        categoryId: 1,
        question: '¿Cómo define el Artículo 32 de la Ley de Disciplina al Arresto?',
        answer: 'Es la reclusión que sufre un militar por un término que no exceda de 15 días en su alojamiento oficial o cuartel.',
        article: 'Art. 32'
      },
      {
        id: 'fc-1.3-2',
        portionId: '1.3',
        categoryId: 1,
        question: '¿Cuál es el límite máximo de arresto para un Oficial?',
        answer: 'Hasta por 8 días.',
        article: 'Art. 33'
      },
      {
        id: 'fc-1.3-3',
        portionId: '1.3',
        categoryId: 1,
        question: '¿Cuál es el límite máximo de arresto para el personal de Tropa?',
        answer: 'Hasta por 15 días.',
        article: 'Art. 33 Bis'
      },
      {
        id: 'fc-1.3-4',
        portionId: '1.3',
        categoryId: 1,
        question: '¿En qué modalidades puede imponerse el arresto según el Art. 32?',
        answer: 'Con perjuicio del servicio o sin perjuicio del servicio.',
        article: 'Art. 32'
      },
      {
        id: 'fc-1.3-5',
        portionId: '1.3',
        categoryId: 1,
        question: '¿Qué significa arresto "con perjuicio del servicio"?',
        answer: 'Que el militar solo desempeña aquellos servicios que no exijan salir de la guardia o alojamiento de reclusión.',
        article: 'Art. 32'
      },
      {
        id: 'fc-1.3-6',
        portionId: '1.3',
        categoryId: 1,
        question: '¿Qué significa arresto "sin perjuicio del servicio"?',
        answer: 'Que el militar sale a cumplir con sus servicios y comisiones de armas regulares, regresando al terminar al arresto.',
        article: 'Art. 32'
      },
      {
        id: 'fc-1.3-7',
        portionId: '1.3',
        categoryId: 1,
        question: '¿Dónde cumplen su arresto los Oficiales según el Art. 33?',
        answer: 'En sus alojamientos oficiales, cuarteles o habitaciones.',
        article: 'Art. 33'
      },
      {
        id: 'fc-1.3-8',
        portionId: '1.3',
        categoryId: 1,
        question: '¿Dónde cumple su arresto el personal de tropa según el Art. 33 Bis?',
        answer: 'En las guardias de prevención o recintos designados de su cuartel militar.',
        article: 'Art. 33 Bis'
      },
      {
        id: 'fc-1.3-9',
        portionId: '1.3',
        categoryId: 1,
        question: '¿Desde qué momento comienza a contarse el término de un arresto?',
        answer: 'Desde el momento en que el infractor queda formalmente notificado de la orden de arresto.',
        article: 'Art. 32 y Reglamento'
      },
      {
        id: 'fc-1.3-10',
        portionId: '1.3',
        categoryId: 1,
        question: '¿Puede un Sargento 1/o. arrestar a otro Sargento 1/o. de mayor antigüedad?',
        answer: 'No. No tiene facultad disciplinaria sobre militares de igual o superior jerarquía o mayor antigüedad sin comisión expresa.',
        article: 'Art. 34'
      }
    ],
    quiz: [
      {
        id: 'q-1.3-1',
        portionId: '1.3',
        categoryId: 1,
        question: 'Conforme al Artículo 33 de la Ley de Disciplina, ¿cuál es el tiempo máximo de arresto que puede imponerse a un Oficial?',
        options: [
          'Hasta por 8 días.',
          'Hasta por 15 días.',
          'Hasta por 30 días.',
          'Hasta por 48 horas.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Ley de Disciplina, Art. 33',
        explanation: 'El Art. 33 fija con total precisión: "Los oficiales pueden ser arrestados hasta por ocho días".'
      },
      {
        id: 'q-1.3-2',
        portionId: '1.3',
        categoryId: 1,
        question: 'De acuerdo con el Artículo 33 Bis, el arresto para el personal de Tropa tiene como límite máximo:',
        options: [
          '8 días.',
          '15 días.',
          '20 días.',
          '3 días naturales.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 33 Bis',
        explanation: 'El Art. 33 Bis señala que los individuos de tropa pueden ser arrestados hasta por 15 días.'
      },
      {
        id: 'q-1.3-3',
        portionId: '1.3',
        categoryId: 1,
        question: '¿En qué consiste el arresto "sin perjuicio del servicio" según el Artículo 32?',
        options: [
          'El elemento no realiza ninguna actividad y permanece en aislamiento.',
          'El militar sale a desempeñar sus servicios ordinarios de armas y comisiones, reintegrándose a su arresto al finalizar.',
          'Se le perdona el castigo si demuestra buen comportamiento.',
          'Solo se le arresta los domingos por la tarde.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 32',
        explanation: 'En el arresto sin perjuicio, el infractor no deja de cubrir sus servicios en plaza o campaña y regresa a pernoctar en su arresto.'
      },
      {
        id: 'q-1.3-4',
        portionId: '1.3',
        categoryId: 1,
        question: '¿En qué lugar debe cumplir el arresto un Subteniente de Infantería?',
        options: [
          'En las celdas comunes de la Guardia en Prevención.',
          'En su alojamiento militar, cuartel o dependencia oficial.',
          'En la cárcel municipal de la ciudad más cercana.',
          'En la sala de transmisiones de la brigada.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 33',
        explanation: 'Los Oficiales cumplen su arresto en sus alojamientos oficiales o cuarteles, no en celdas de tropa.'
      },
      {
        id: 'q-1.3-5',
        portionId: '1.3',
        categoryId: 1,
        question: 'Si a un Cabo se le imponen 16 días de arresto, ¿qué vicio legal presenta dicha orden?',
        options: [
          'Ninguno, pues el superior puede aumentar días libremente.',
          'Es ilegal, por violentar el tope máximo de 15 días prescrito por el Art. 33 Bis.',
          'Solo es válida si la firma el Gobernador del Estado.',
          'Se convalida si el Cabo no presenta queja dentro de las 24 horas.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 33 Bis',
        explanation: 'El Artículo 33 Bis es categórico: el máximo para tropa son 15 días. Imponer 16 es contravenir la ley.'
      }
    ]
  },
  {
    id: '1.4',
    categoryId: 1,
    portionNumber: '1.4',
    title: 'Facultades para Imponer Correctivos Disciplinarios',
    articles: 'Artículos 34 al 42',
    durationMinutes: 30,
    audioScript: {
      durationEstimate: '6 min',
      intro: '¡Cursantes! Porción 1.4: Facultades para graduar e imponer correctivos disciplinarios, Artículos 34 al 42. Como futuros Sargentos Primeros, deben saber con exactitud quién tiene la facultad de mandar arrestar y bajo qué formalidades.',
      development: [
        'Artículo 34: Tienen facultad para graduar arrestos: El Secretario de la Defensa Nacional, los Generales, Jefes y Oficiales con mando militar.',
        'Facultad de las Clases (Sargentos y Cabos): ¡Ojo aquí! Las clases no tienen por sí mismas la facultad de graduar arrestos independientes sobre tropas a menos que se encuentren en desempeño de una comisión de servicio o mando accidental. El Sargento da parte de la falta al Oficial de quien dependa para que este imponga y gradúe el correctivo.',
        'Artículo 37: La orden de arresto debe ser formulada con claridad y notificarse por escrito tratándose de oficiales o verbalmente con confirmación para la tropa.',
        'Artículo 39: Cuando un militar cometa una falta en presencia de varios superiores, el de mayor jerarquía o antigüedad es quien tiene la preferencia para ordenar el correctivo.',
        'Artículo 41: Ningún superior puede ordenar o graduar un correctivo si tiene parentesco cercano o enemistad manifiesta con el infractor, debiendo remitir el caso al escalón inmediato superior para garantizar la imparcialidad militar.'
      ],
      closure: '¡Concepto clave! El Sargento 1/o. auxilia al Comandante informando las faltas con veracidad objetiva. La graduación formal del arresto la realiza el oficial con mando.'
    },
    videoStoryboard: [
      {
        minute: '0:00 - 1:30',
        visual: 'Esquema de mando: Pirámide jerárquica con marcas verdes en Generales, Jefes y Oficiales ("Facultad directa para graduar") y flecha de "Dar parte" desde las Clases (Cabos/Sargentos).',
        narration: 'No confundas el derecho de mando con la potestad reglamentaria de graduación. Las clases informan y dan parte; los oficiales gradúan.'
      },
      {
        minute: '1:31 - 3:15',
        visual: 'Documento oficial militar: Hoja de boleta de arresto. Datos obligatorios: Motivo de la falta, Duración en días, Modalidad (con o sin perjuicio), Fecha y Firma del superior.',
        narration: 'Todo correctivo debe tener motivación y fundamentación. No se puede arrestar por capricho; se debe asentar la infracción específica cometida.'
      },
      {
        minute: '3:16 - 4:45',
        visual: 'Simulación: Dos superiores presentes (un Capitán y un Mayor) presenciando una falta de un soldado. Luz de enfoque sobre el Mayor.',
        narration: 'Principio del Art. 39: Ante varios superiores, corresponde intervenir al de mayor jerarquía para evitar duplicidad de órdenes contradictorias.'
      },
      {
        minute: '4:46 - 6:00',
        visual: 'Resumen de preguntas de examen sobre los artículos 34, 37 y 41.',
        narration: 'Memoriza el Art. 34: quiénes pueden graduar arrestos. Clave de éxito en el simulacro.'
      }
    ],
    scenario: {
      id: 'scen-1.4',
      title: 'Facultad de mando en ausencia del Comandante de Sección',
      context: 'Puesto de mando adelantado durante maniobras de adiestramiento de 3/er nivel.',
      situation: 'El Teniente Comandante de Sección sale a una reunión de coordinación táctica con el Estado Mayor. Deja al mando al Sargento 1/o. Jiménez. Durante su ausencia, un soldado comete una grave falta de disciplina faltando al respeto al centinela.',
      questions: [
        {
          id: 'q1',
          question: '¿Tiene el Sargento 1/o. Jiménez facultad accidental para intervenir y ordenar la retención del infractor?',
          answer: 'Sí. Por encontrarse en ejercicio accidental del mando de la sección, está facultado para tomar las medidas inmediatas para restablecer la disciplina.',
          legalBasis: 'Ley de Disciplina, Arts. 34 y 36.'
        },
        {
          id: 'q2',
          question: '¿Qué debe hacer el Sargento 1/o. al regreso del Teniente?',
          answer: 'Rendir el parte detallado por escrito de la novedad y de la medida precautoria adoptada para la formal graduación del correctivo.',
          legalBasis: 'Ley de Disciplina, Art. 37.'
        },
        {
          id: 'q3',
          question: '¿Puede un oficial de otra unidad ajena graduar un arresto sin pertenecer a la cadena de mando?',
          answer: 'Solo si el militar infractor se encuentra en tránsito o en comisión y no hay superior de su propia unidad presente.',
          legalBasis: 'Ley de Disciplina, Art. 38.'
        }
      ],
      solutionSummary: 'En funciones accidentales de mando, el Sargento 1/o. vela por el orden y rinde el parte correspondiente al oficial facultado para la graduación definitiva (Arts. 34 y 37).'
    },
    flashcards: [
      {
        id: 'fc-1.4-1',
        portionId: '1.4',
        categoryId: 1,
        question: '¿Quiénes tienen facultad para graduar arrestos según el Art. 34?',
        answer: 'El Secretario de la Defensa Nacional, los Generales, Jefes y Oficiales con mando o comisión oficial.',
        article: 'Art. 34'
      },
      {
        id: 'fc-1.4-2',
        portionId: '1.4',
        categoryId: 1,
        question: '¿Qué facultad tienen las clases (Sargentos y Cabos) ante una falta de un subordinado?',
        answer: 'Hacerle notar la falta, corregirlo verbalmente en el acto y dar parte al oficial facultado para su graduación.',
        article: 'Art. 34 y 36'
      },
      {
        id: 'fc-1.4-3',
        portionId: '1.4',
        categoryId: 1,
        question: 'Si una falta se comete ante varios superiores presentes, ¿quién ordena el correctivo?',
        answer: 'El superior de mayor jerarquía o de mayor antigüedad si son del mismo grado.',
        article: 'Art. 39'
      },
      {
        id: 'fc-1.4-4',
        portionId: '1.4',
        categoryId: 1,
        question: '¿Qué debe contener la comunicación u orden de arresto?',
        answer: 'La falta cometida, el fundamento legal, la duración y la modalidad (con o sin perjuicio del servicio).',
        article: 'Art. 37'
      },
      {
        id: 'fc-1.4-5',
        portionId: '1.4',
        categoryId: 1,
        question: '¿Puede un militar imponer un correctivo por rencilla o enemistad personal?',
        answer: 'No. El Art. 41 prohíbe imponer correctivos por motivos personales o con falta de ecuanimidad y justicia.',
        article: 'Art. 41'
      },
      {
        id: 'fc-1.4-6',
        portionId: '1.4',
        categoryId: 1,
        question: '¿Qué debe hacer un superior si se percata de que un correctivo impuesto por un subordinado fue injusto?',
        answer: 'Modificarlo o levantarlo, orientando al subordinado sobre la debida aplicación de la ley.',
        article: 'Art. 40'
      },
      {
        id: 'fc-1.4-7',
        portionId: '1.4',
        categoryId: 1,
        question: '¿Quién gradúa el arresto a un Capitán Primero?',
        answer: 'Un Jefe o General de quien dependa orgánicamente o en actos del servicio.',
        article: 'Art. 34'
      },
      {
        id: 'fc-1.4-8',
        portionId: '1.4',
        categoryId: 1,
        question: '¿Qué principio garantiza la imparcialidad al imponer un correctivo disciplinario?',
        answer: 'La debida ponderación de los hechos y la exclusión de apasionamientos o favoritismos.',
        article: 'Art. 41'
      },
      {
        id: 'fc-1.4-9',
        portionId: '1.4',
        categoryId: 1,
        question: '¿A qué autoridad le corresponde supervisar la legalidad de los arrestos en el cuartel?',
        answer: 'Al Comandante de la Unidad y a los órganos de inspección militar.',
        article: 'Art. 35'
      },
      {
        id: 'fc-1.4-10',
        portionId: '1.4',
        categoryId: 1,
        question: '¿Puede levantarse un arresto antes de cumplir su término?',
        answer: 'Sí, por la autoridad superior que lo graduó o una jerárquicamente superior con causa justificada.',
        article: 'Art. 42'
      }
    ],
    quiz: [
      {
        id: 'q-1.4-1',
        portionId: '1.4',
        categoryId: 1,
        question: 'De acuerdo con el Artículo 34 de la Ley de Disciplina, ¿quiénes poseen la facultad para graduar arrestos?',
        options: [
          'Únicamente los Jueces Militares adscritos a las Regiones.',
          'Los Generales, Jefes y Oficiales con mando o comisión del servicio.',
          'Cualquier soldado con más de tres años de antigüedad en filas.',
          'Los Comisarios de la Guardia Nacional civil sin grado militar.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 34',
        explanation: 'El Art. 34 otorga la facultad de graduar arrestos a los Generales, Jefes y Oficiales en ejercicio del mando o servicio.'
      },
      {
        id: 'q-1.4-2',
        portionId: '1.4',
        categoryId: 1,
        question: 'Cuando varios militares de diferente graduación presencian una falta cometida por un soldado, ¿a quién asiste la potestad de ordenar el correctivo?',
        options: [
          'Al de menor graduación por ser el más cercano a la tropa.',
          'Al de mayor jerarquía o antigüedad según el Art. 39.',
          'Se sortea la imposición entre los oficiales presentes.',
          'Se suspende la orden hasta que el soldado se retire.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 39',
        explanation: 'Conforme al Art. 39, la preferencia corresponde al militar de mayor jerarquía o antigüedad entre los presentes.'
      },
      {
        id: 'q-1.4-3',
        portionId: '1.4',
        categoryId: 1,
        question: '¿Qué papel juega el Sargento 1/o. ante la comisión de una falta disciplinaria de un soldado de su compañía?',
        options: [
          'Graduar unilateralmente 15 días de arresto en celda oscura.',
          'Reprender de inmediato si es procedente y rendir el parte respectivo al oficial para su graduación reglamentaria.',
          'Ignorar la falta si ocurrió fuera del horario de lista.',
          'Llevar al soldado ante un juzgado civil de paz.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Arts. 34 y 36',
        explanation: 'Las clases ejercen vigilancia, corrigen de palabra y dan parte a los oficiales facultados para la graduación formal.'
      },
      {
        id: 'q-1.4-4',
        portionId: '1.4',
        categoryId: 1,
        question: '¿Qué dispone el Artículo 41 sobre las motivaciones personales al imponer un correctivo?',
        options: [
          'Permite imponer arrestos por simpatía o animadversión si el superior lo desea.',
          'Prohíbe terminantemente sancionar por apasionamiento, odio o motivos extraños al servicio.',
          'Exige que el superior consulte a la familia del soldado antes de arrestarlo.',
          'Autoriza el uso de castigos físicos moderados.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 41',
        explanation: 'El Art. 41 salvaguarda la ecuanimidad y prohíbe tajantemente los abusos motivados por rencores o pasiones individuales.'
      },
      {
        id: 'q-1.4-5',
        portionId: '1.4',
        categoryId: 1,
        question: '¿Tiene un superior facultades para disminuir o levantar un correctivo impuesto por un inferior suyo?',
        options: [
          'No, la orden es irrevocable de por vida.',
          'Sí, el superior jerárquico puede modificar o dejar sin efecto el correctivo cuando lo estime de justicia.',
          'Solo si interviene la Comisión Nacional de los Derechos Humanos.',
          'Únicamente en días festivos patrios.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 40',
        explanation: 'El Art. 40 faculta al escalón superior para modificar o revocar correctivos cuando advierta desproporción o falta de fundamento.'
      }
    ]
  },
  {
    id: '1.5',
    categoryId: 1,
    portionNumber: '1.5',
    title: 'Consejo de Honor: Integración y Facultades',
    articles: 'Artículos 43 al 52',
    durationMinutes: 30,
    audioScript: {
      durationEstimate: '8 min',
      intro: '¡Atención cursantes! El Consejo de Honor es un tema de ALTA FRECUENCIA en los exámenes de ascenso de la Escuela Militar de Sargentos. Artículos 43 al 52 de la Ley de Disciplina.',
      development: [
        'Artículo 43: Se establece en las unidades y dependencias un órgano colegiado llamado Consejo de Honor. ¿Cuál es su objeto? Juzgar la conducta moral y el honor militar de los miembros del cuerpo militar.',
        '¿A quiénes juzga el Consejo de Honor? (Art. 44): Juzga a los Oficiales y al personal de Tropa. ¡Cuidado! Los Generales y Jefes no son juzgados por Consejos de Honor de unidad.',
        'Integración del Consejo de Honor en una Unidad (Art. 45): Se compone de: 1 Presidente (un Jefe de la corporación, ordinariamente el Segundo Comandante); 4 Vocales (oficiales de la unidad); y 1 Secretario (el vocal de menor graduación o antigüedad).',
        'Facultades del Consejo de Honor (Art. 49): Tiene facultades para: I. Dictaminar sobre notas de castigo; II. Juzgar la mala conducta en actos del servicio y fuera de él que afecte el prestigio del Ejército; III. Dictaminar sobre la solicitud de baja por mala conducta de la tropa; y IV. Consignar a los tribunales militares los casos que constituyan delito.',
        'Garantía de audiencia (Art. 51): El militar sujeto a Consejo de Honor tiene derecho irrestricto a ser oído en defensa, a nombrar un defensor militar y a aportar pruebas de descargo.'
      ],
      closure: '¡Grábate la integración! Presidente (un Jefe), cuatro vocales oficiales, y el vocal más novel actúa como secretario. Y recuerda: puede dictaminar la baja del servicio para la tropa por mala conducta (Art. 49).'
    },
    videoStoryboard: [
      {
        minute: '0:00 - 1:45',
        visual: 'Mesa de Consejo de Honor: Segundo Comandante al centro (Presidente), cuatro oficiales como vocales a los costados, expediente militar al frente.',
        narration: 'El Consejo de Honor es el tribunal moral del regimiento o batallón. Su función es salvaguardar la dignidad y el honor militar frente a faltas que manchan el uniforme.'
      },
      {
        minute: '1:46 - 3:30',
        visual: 'Diagrama con las 4 facultades principales del Art. 49. Destacada la facultad de proponer la BAJA por mala conducta para el personal de tropa.',
        narration: 'Mucha atención: El Consejo de Honor no condena a prisión; emite dictámenes de honorabilidad y puede acordar la baja de tropa por mala conducta justificada.'
      },
      {
        minute: '3:31 - 5:15',
        visual: 'Animación de derechos del acusado: Notificación previa, asistencia de defensor, desahogo de testimoniales y alegatos finales (Art. 51).',
        narration: 'El debido proceso militar no es opcional. El militar tiene derecho a nombrar un defensor de entre los oficiales o clases del cuerpo militar.'
      },
      {
        minute: '5:16 - 7:30',
        visual: 'Cuadro resumen con las trampas comunes de examen sobre la integración del Consejo de Honor.',
        narration: 'Pregunta típica: ¿Quién funge como Secretario en el Consejo de Honor? Respuesta: El vocal de menor graduación o antigüedad.'
      }
    ],
    scenario: {
      id: 'scen-1.5',
      title: 'Procedimiento del Consejo de Honor por conducta atentatoria contra el decoro militar',
      context: 'Instalaciones del Campo Militar Número 1.',
      situation: 'El Cabo de Infantería Rosas es sorprendido participando en riña pública en estado de ebriedad fuera del cuartel portando prendas del uniforme militar. Ha acumulado 45 días de arresto en el año militar en curso.',
      questions: [
        {
          id: 'q1',
          question: '¿Es procedente turnar el expediente del Cabo Rosas al Consejo de Honor de su batallón?',
          answer: 'Sí. El Consejo de Honor es competente para conocer de faltas contra la moral militar y acumulación excesiva de correctivos disciplinarios.',
          legalBasis: 'Ley de Disciplina, Art. 44 y 49.'
        },
        {
          id: 'q2',
          question: '¿Quién preside las sesiones del Consejo de Honor en una corporación?',
          answer: 'El Segundo Comandante del batallón u oficial jefe designado al efecto.',
          legalBasis: 'Ley de Disciplina, Art. 45.'
        },
        {
          id: 'q3',
          question: '¿Qué sanción extrema puede dictaminar el Consejo de Honor respecto al Cabo Rosas?',
          answer: 'Dictaminar su solicitud de baja del Ejército y Fuerza Aérea por mala conducta comprobada.',
          legalBasis: 'Ley de Disciplina, Art. 49 fr. III.'
        }
      ],
      solutionSummary: 'El Consejo de Honor salvaguarda el decoro militar. Ante faltas reiteradas o graves contra el honor, está facultado para emitir dictamen de baja del infractor (Art. 49).'
    },
    flashcards: [
      {
        id: 'fc-1.5-1',
        portionId: '1.5',
        categoryId: 1,
        question: '¿Cuál es el objeto del Consejo de Honor según el Artículo 43?',
        answer: 'Juzgar la conducta moral y las faltas que atenten contra el honor y prestigio militar de la corporación.',
        article: 'Art. 43'
      },
      {
        id: 'fc-1.5-2',
        portionId: '1.5',
        categoryId: 1,
        question: '¿A quiénes juzga el Consejo de Honor en las unidades?',
        answer: 'A los Oficiales y al personal de Tropa.',
        article: 'Art. 44'
      },
      {
        id: 'fc-1.5-3',
        portionId: '1.5',
        categoryId: 1,
        question: '¿Cómo se integra el Consejo de Honor en una corporación militar?',
        answer: 'Un Presidente (un Jefe) y cuatro vocales (oficiales).',
        article: 'Art. 45'
      },
      {
        id: 'fc-1.5-4',
        portionId: '1.5',
        categoryId: 1,
        question: '¿Quién desempeña las funciones de Secretario en el Consejo de Honor?',
        answer: 'El vocal de menor jerarquía o antigüedad.',
        article: 'Art. 45'
      },
      {
        id: 'fc-1.5-5',
        portionId: '1.5',
        categoryId: 1,
        question: '¿Qué facultad tiene el Consejo de Honor respecto a la tropa según la fracción III del Art. 49?',
        answer: 'Acordar la solicitud de baja del servicio de las armas por mala conducta.',
        article: 'Art. 49 fr. III'
      },
      {
        id: 'fc-1.5-6',
        portionId: '1.5',
        categoryId: 1,
        question: '¿Son juzgados los Generales y Jefes por los Consejos de Honor de unidad?',
        answer: 'No. Su conducta se rige por disposiciones del Alto Mando y tribunales militares competentes.',
        article: 'Art. 44'
      },
      {
        id: 'fc-1.5-7',
        portionId: '1.5',
        categoryId: 1,
        question: '¿Tiene derecho el acusado a nombrar defensor ante el Consejo de Honor?',
        answer: 'Sí. Es una garantía indispensable de audiencia y defensa militar.',
        article: 'Art. 51'
      },
      {
        id: 'fc-1.5-8',
        portionId: '1.5',
        categoryId: 1,
        question: '¿Qué debe hacer el Consejo de Honor si durante la audiencia descubre un hecho delictivo?',
        answer: 'Consignar inmediatamente el caso al Ministerio Público Militar correspondiente.',
        article: 'Art. 49 fr. IV'
      },
      {
        id: 'fc-1.5-9',
        portionId: '1.5',
        categoryId: 1,
        question: '¿Cuántos votos se requieren para tomar una resolución en el Consejo de Honor?',
        answer: 'Mayoría de votos de sus miembros presentes.',
        article: 'Art. 48'
      },
      {
        id: 'fc-1.5-10',
        portionId: '1.5',
        categoryId: 1,
        question: '¿Quién aprueba en última instancia la resolución de baja de un elemento de tropa?',
        answer: 'La Secretaría de la Defensa Nacional por conducto de la Dirección General respectiva.',
        article: 'Art. 52'
      }
    ],
    quiz: [
      {
        id: 'q-1.5-1',
        portionId: '1.5',
        categoryId: 1,
        question: 'El Consejo de Honor en una corporación u organismo militar se integra por:',
        options: [
          'Un Presidente (Jefe) y cuatro vocales oficiales.',
          'Tres Generales de Brigada y dos Coroneles de Estado Mayor.',
          'El Sargento 1/o. de la compañía y cuatro cabos de guardia.',
          'Un representante sindical y tres abogados civiles de oficio.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Ley de Disciplina, Art. 45',
        explanation: 'El Art. 45 estipula que se compondrá de un Presidente (Jefe) y cuatro vocales de la escala de oficiales.'
      },
      {
        id: 'q-1.5-2',
        portionId: '1.5',
        categoryId: 1,
        question: '¿Quién ejerce el cargo de Secretario dentro del Consejo de Honor?',
        options: [
          'El Oficial de mayor jerarquía entre los vocales.',
          'El vocal de menor jerarquía o menor antigüedad.',
          'El Escribiente de la Comandancia de Cuartel.',
          'El Asesor Jurídico de la Región Militar.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 45',
        explanation: 'La ley establece que el vocal de menor graduación o antigüedad fungirá como secretario de las sesiones.'
      },
      {
        id: 'q-1.5-3',
        portionId: '1.5',
        categoryId: 1,
        question: 'De acuerdo con el Artículo 44, ¿a qué categorías de militares juzga el Consejo de Honor?',
        options: [
          'Únicamente a los Generales de División retirados.',
          'A los Oficiales y al personal de Tropa.',
          'Exclusivamente a los conscriptos del Servicio Militar Nacional.',
          'A los civiles que ingresen sin autorización al cuartel militar.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 44',
        explanation: 'El Consejo de Honor tiene jurisdicción sobre Oficiales y Tropa en el ámbito interno del organismo militar.'
      },
      {
        id: 'q-1.5-4',
        portionId: '1.5',
        categoryId: 1,
        question: 'Es una facultad del Consejo de Honor respecto al personal de tropa según el Artículo 49:',
        options: [
          'Condenar a pena privativa de libertad en prisión militar.',
          'Dictaminar la baja del servicio de las armas por mala conducta comprobada.',
          'Ascender de forma directa a Subteniente sin presentar examen.',
          'Disolver la compañía de infantería por falta colectiva.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 49 fr. III',
        explanation: 'El Art. 49 faculta al Consejo para acordar la solicitud de baja de tropa por conducta incompatible con el honor militar.'
      },
      {
        id: 'q-1.5-5',
        portionId: '1.5',
        categoryId: 1,
        question: '¿Qué garantía protege al militar presentado ante el Consejo de Honor según el Artículo 51?',
        options: [
          'Garantía de audiencia, defensa propia o mediante defensor militar y presentación de pruebas.',
          'Inmunidad diplomática automática durante la sesión.',
          'El derecho a vetar a todos los vocales sin justificación.',
          'La anulación del cargo si guarda silencio.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Ley de Disciplina, Art. 51',
        explanation: 'El Art. 51 garantiza plenamente el derecho a ser oído en defensa y asistido por un militar designado.'
      }
    ]
  },
  {
    id: '1.6',
    categoryId: 1,
    portionNumber: '1.6',
    title: 'Recursos, Inconformidades y Procedimientos',
    articles: 'Artículos 53 al 60',
    durationMinutes: 30,
    audioScript: {
      durationEstimate: '6 min',
      intro: '¡Cursantes de la EMS! Concluimos la Categoría 1 con la Porción 1.6: Recursos, Inconformidades y Trámite de Quejas, Artículos 53 al 60 de la Ley de Disciplina.',
      development: [
        'Principio fundamental de la queja militar (Art. 53): Todo militar que se considere agraviado o perjudicado por una orden o correctivo disciplinario tiene derecho a inconformarse y hacer uso del recurso que la ley concede.',
        'Regla de oro: "Primero cumplir, luego quejarse" (Art. 54). Esta es la máxima rectora de las Fuerzas Armadas. Jamás un militar puede suspender el cumplimiento de un arresto u orden bajo el pretexto de interponer un recurso. Cumple la orden de inmediato y luego ejerce su derecho de petición.',
        'Plazo para inconformarse (Art. 55): El militar inconforme debe elevar su queja por escrito dentro de un plazo perentorio, debidamente fundado y respetando el conducto regular militar.',
        'El Conducto Regular (Art. 56): La queja o inconformidad debe enviarse a través del superior inmediato. Si este superior es precisamente el autor del agravio, el trámite puede solicitarse al escalón inmediato superior.',
        'Sanción por queja temeraria o dolosa (Art. 58): El militar que presente quejas falsas, insidiosas o carentes de verdad se hace acreedor a severos correctivos o a las penas militares por desacato y falsedad.'
      ],
      closure: '¡Consigna para el examen! La regla militar mexicana es inquebrantable: Primero se cumple la orden y luego se presenta la inconformidad debidamente fundamentada por el conducto regular.'
    },
    videoStoryboard: [
      {
        minute: '0:00 - 1:30',
        visual: 'Letrero táctico en letras de bronce: "PRIMERO CUMPLIR, DESPUÉS RECLAMAR". Ilustración de soldado cumpliendo servicio y posteriormente redactando oficio formal.',
        narration: 'En la vida castrense la disciplina operativa no admite vacilaciones. El derecho de inconformarse existe y es legal, pero condicionado al previo cumplimiento.'
      },
      {
        minute: '1:31 - 3:15',
        visual: 'Esquema de flujo del conducto regular: Del Soldado/Clase -> Comandante de Sección -> Comandante de Compañía -> Comandante de Batallón.',
        narration: 'Saltarse el conducto militar sin justificación reglamentaria es una falta disciplinaria. Toda inconformidad viaja por la cadena de mando.'
      },
      {
        minute: '3:16 - 4:45',
        visual: 'Sección de advertencia legal: Art. 58 y consecuencias de falsas acusaciones contra superiores.',
        narration: 'La queja debe sustentarse en hechos comprobables. Inventar falsedades contra un superior invierte la carga legal y produce consignación penal.'
      },
      {
        minute: '4:46 - 6:00',
        visual: 'Resumen completo de la Categoría 1. Mosaico con las 6 porciones completadas.',
        narration: '¡Enhorabuena, futuro Sargento 1/o.! Has concluido la Categoría 1: Ley de Disciplina. Estás listo para dominar sus tarjetas y simulacros.'
      }
    ],
    scenario: {
      id: 'scen-1.6',
      title: 'Trámite de inconformidad por arresto estimado indebido',
      context: 'Compañía de Infantería en base de operaciones fija.',
      situation: 'El Soldado Cruz considera que el arresto de 4 días que le fue graduado por el Capitán de su compañía es injustificado, ya que contaba con pase médico emitido por la enfermería militar.',
      questions: [
        {
          id: 'q1',
          question: '¿Puede el Soldado Cruz rehusarse a cumplir el arresto mientras se resuelve su queja?',
          answer: 'No. Debe cumplir el arresto inmediatamente; la inconformidad se sustancia posteriormente.',
          legalBasis: 'Ley de Disciplina, Art. 54.'
        },
        {
          id: 'q2',
          question: '¿Por qué medio y conducto debe hacer valer su inconformidad?',
          answer: 'Por escrito, en términos respetuosos, por el conducto regular anexando como prueba el comprobante del servicio médico militar.',
          legalBasis: 'Ley de Disciplina, Arts. 53 y 56.'
        },
        {
          id: 'q3',
          question: '¿Qué consecuencia jurídica sobreviene si se demuestra la total justificación médica del soldado?',
          answer: 'El superior jerárquico que revise el recurso ordenará el levantamiento del arresto y la cancelación de la nota desfavorable en su hoja de actuación.',
          legalBasis: 'Ley de Disciplina, Art. 57.'
        }
      ],
      solutionSummary: 'El principio militar consagra que primero se acata la disposición y después se reclama fundadamente por el conducto regular (Arts. 53 y 54).'
    },
    flashcards: [
      {
        id: 'fc-1.6-1',
        portionId: '1.6',
        categoryId: 1,
        question: '¿Cuál es el principio rector sobre el cumplimiento de una orden antes de recurrirla?',
        answer: 'Primero cumplir y después quejarse o inconformarse.',
        article: 'Art. 54'
      },
      {
        id: 'fc-1.6-2',
        portionId: '1.6',
        categoryId: 1,
        question: '¿Tiene derecho el militar a inconformarse contra un correctivo que estime ilegal?',
        answer: 'Sí, mediante los recursos e instancias que establece la Ley de Disciplina.',
        article: 'Art. 53'
      },
      {
        id: 'fc-1.6-3',
        portionId: '1.6',
        categoryId: 1,
        question: '¿A través de qué conducto debe formularse una queja militar?',
        answer: 'A través del conducto regular jerárquico ascendente.',
        article: 'Art. 56'
      },
      {
        id: 'fc-1.6-4',
        portionId: '1.6',
        categoryId: 1,
        question: '¿Cómo debe redactarse todo escrito de queja o inconformidad militar?',
        answer: 'En forma respetuosa, comedida, verídica y expresando con precisión los hechos y fundamentos.',
        article: 'Art. 55'
      },
      {
        id: 'fc-1.6-5',
        portionId: '1.6',
        categoryId: 1,
        question: '¿Qué sanción procede contra el militar que promueva quejas falsas o infundadas?',
        answer: 'Se le sancionará con correctivo disciplinario o se le consignará a la justicia militar si comete falsedad.',
        article: 'Art. 58'
      },
      {
        id: 'fc-1.6-6',
        portionId: '1.6',
        categoryId: 1,
        question: '¿Puede un militar inconformarse por conducto de personas civiles ajenas al Ejército?',
        answer: 'No. Toda gestión debe ser directa y a través de los canales reglamentarios castrenses.',
        article: 'Art. 56 y RGDM'
      },
      {
        id: 'fc-1.6-7',
        portionId: '1.6',
        categoryId: 1,
        question: 'Si el superior inmediato niega dar trámite a una queja, ¿qué puede hacer el subordinado?',
        answer: 'Acudir al escalón superior inmediato manifestando la negativa recibida.',
        article: 'Art. 56'
      },
      {
        id: 'fc-1.6-8',
        portionId: '1.6',
        categoryId: 1,
        question: '¿Qué efecto tiene una resolución favorable a la queja de un militar?',
        answer: 'Dejar sin efecto el correctivo disciplinario y ordenar no asentar nota negativa en su expediente.',
        article: 'Art. 57'
      },
      {
        id: 'fc-1.6-9',
        portionId: '1.6',
        categoryId: 1,
        question: '¿Se admiten reclamaciones anónimas en el ámbito de la disciplina militar?',
        answer: 'No. Los escritos anónimos carecen de validez y son desechados de plano.',
        article: 'Art. 55'
      },
      {
        id: 'fc-1.6-10',
        portionId: '1.6',
        categoryId: 1,
        question: '¿Cuál es la responsabilidad del superior al recibir una inconformidad de su tropa?',
        answer: 'Analizarla con imparcialidad y remitirla o resolverla conforme a derecho sin represalias.',
        article: 'Art. 60'
      }
    ],
    quiz: [
      {
        id: 'q-1.6-1',
        portionId: '1.6',
        categoryId: 1,
        question: 'En la doctrina militar mexicana, ¿cuál es la regla de oro ante una orden o correctivo disciplinario que se considere agraviante?',
        options: [
          'Desobedecer de inmediato mientras se consulta a un abogado.',
          'Primero cumplir la orden y posteriormente hacer valer la inconformidad.',
          'Convocar a los compañeros de escuadra para presentar una queja común.',
          'Hacer paro de labores hasta que el escalón superior atienda la queja.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 54',
        explanation: 'El principio cardinal es inalterable: primero se cumple la orden y luego se reclama.'
      },
      {
        id: 'q-1.6-2',
        portionId: '1.6',
        categoryId: 1,
        question: 'De conformidad con el Artículo 56, ¿cuál es el medio obligado para tramitar una inconformidad militar?',
        options: [
          'Publicarla en redes sociales para conocimiento de la opinión pública.',
          'El conducto regular jerárquico ascendente.',
          'Acudir a un juzgado del fuero común municipal.',
          'Solicitar el arbitraje de la policía preventiva estatal.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 56',
        explanation: 'Toda petición militar viaja forzosamente por la línea de mando o conducto regular.'
      },
      {
        id: 'q-1.6-3',
        portionId: '1.6',
        categoryId: 1,
        question: 'Si un soldado redacta un escrito de inconformidad empleando términos injuriosos o insultos hacia el Comandante:',
        options: [
          'Se le exenta de toda culpa por estar protegido por la libertad de expresión.',
          'Comete falta y posiblemente delito militar contra la disciplina por insubordinación o ultrajes.',
          'El Comandante está obligado a pedirle disculpas públicas.',
          'Se anula automáticamente el castigo que impugnaba.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 55 y Código de Justicia Militar',
        explanation: 'Todo escrito militar debe ser comedido y respetuoso. El uso de insultos configura delito militar.'
      },
      {
        id: 'q-1.6-4',
        portionId: '1.6',
        categoryId: 1,
        question: '¿Qué dispone la ley en caso de comprobarse que una queja fue dolosa o manifiestamente falsa?',
        options: [
          'Se premia al acusador por su iniciativa.',
          'Se le impone correctivo disciplinario o se le consigna a las autoridades penales militares correspondientes.',
          'Se archiva el expediente sin ninguna consecuencia.',
          'Se le concede un permiso de franquicia extraordinaria.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 58',
        explanation: 'El Art. 58 sanciona con severidad a quienes formulen imputaciones falsas o temerarias en el servicio militar.'
      },
      {
        id: 'q-1.6-5',
        portionId: '1.6',
        categoryId: 1,
        question: 'Cuando el escalón superior resuelve que un correctivo disciplinario fue impuesto indebidamente:',
        options: [
          'Se cancela de inmediato la sanción y se limpian las constancias desfavorables en el expediente militar.',
          'El soldado debe pagar los gastos procesales de su compañía.',
          'Se transfiere al soldado a la Fuerza Aérea de forma obligatoria.',
          'Se le niega el derecho de ascenso durante tres promociones consecutivas.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Ley de Disciplina, Art. 57',
        explanation: 'Al prosperar la queja fundada, el correctivo queda revocado y la anotación desfavorable es anulada en la hoja de actuación.'
      }
    ]
  }
];
