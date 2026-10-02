import { Portion } from '../types/ems';

export const ADDITIONAL_PORTIONS: Portion[] = [
  // CATEGORIA 2: Reglamento General de Deberes Militares (7 porciones)
  {
    id: '2.1',
    categoryId: 2,
    portionNumber: '2.1',
    title: 'Deberes Comunes a Todos los Militares',
    articles: 'Arts. 1 al 25',
    durationMinutes: 30,
    audioScript: {
      durationEstimate: '6 min',
      intro: 'Iniciamos el estudio del Reglamento General de Deberes Militares. Porción 2.1: Deberes comunes a todos los militares.',
      development: [
        'El deber militar es el conjunto de obligaciones que a un militar impone su situación dentro del Ejército.',
        'La subordinación debe ser rigurosa y mantenerse a toda costa.',
        'El saludo militar es la manifestación mutua de respeto y confraternidad castrense.',
        'Todo militar debe guardar absoluto sigilo en los asuntos del servicio y de seguridad nacional.'
      ],
      closure: '¡Recuerda! La subordinación no solo es obligatoria con el superior directo, sino con todo superior en jerarquía.'
    },
    videoStoryboard: [
      { minute: '0:00 - 2:00', visual: 'Formación militar y saludo a la bandera. Infografía de Deberes Comunes.', narration: 'Principios de honor, cortesía y lealtad obligatorios para todo miembro del instituto armado.' },
      { minute: '2:01 - 5:00', visual: 'Demostración del saludo militar reglamentario y respeto a los símbolos patrios.', narration: 'El saludo militar es signo de disciplina y jamás debe omitirse.' }
    ],
    scenario: {
      id: 'scen-2.1',
      title: 'Omisión del saludo reglamentario en plaza militar',
      context: 'Explanada del Batallón de Infantería.',
      situation: 'Un soldado pasa frente a un Capitán franco y omite hacer el saludo militar argumentando que el oficial vestía de civil.',
      questions: [
        { id: 'q1', question: '¿Debe el militar saludar a un superior que vista de civil si lo conoce?', answer: 'Sí, al reconocer al superior debe saludarlo con la debida cortesía y respeto castrense.', legalBasis: 'RGDM, Art. 22.' },
        { id: 'q2', question: '¿Es el saludo un acto de humillación o de cortesía mutua?', answer: 'Es un acto mutuo de cortesía y reconocimiento a la jerarquía constitucional de las Fuerzas Armadas.', legalBasis: 'RGDM, Art. 20.' }
      ],
      solutionSummary: 'El respeto a la jerarquía es permanente y el saludo reafirma la cohesión militar.'
    },
    flashcards: [
      { id: 'fc-2.1-1', portionId: '2.1', categoryId: 2, question: '¿Qué es el deber militar según el Art. 1 del RGDM?', answer: 'El conjunto de las obligaciones que a un militar impone su situación dentro del Ejército.', article: 'RGDM Art. 1' },
      { id: 'fc-2.1-2', portionId: '2.1', categoryId: 2, question: '¿Cómo debe ser la subordinación según el RGDM?', answer: 'Rigurosa y respetada en todos los escalones del mando.', article: 'RGDM Art. 3' },
      { id: 'fc-2.1-3', portionId: '2.1', categoryId: 2, question: '¿Qué significa el saludo militar?', answer: 'Manifestación mutua de respeto y disciplina entre militares.', article: 'RGDM Art. 20' }
    ],
    quiz: [
      {
        id: 'q-2.1-1',
        portionId: '2.1',
        categoryId: 2,
        question: 'Conforme al RGDM, ¿qué es el deber militar?',
        options: [
          'El conjunto de obligaciones que a un militar impone su situación dentro del Ejército.',
          'Una sugerencia de conducta opcional en tiempo de paz.',
          'Un contrato de trabajo civil regido por la Ley Federal del Trabajo.',
          'Un trámite de ascenso automático a los cinco años.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'RGDM, Art. 1',
        explanation: 'El Art. 1 del RGDM define textualmente el deber militar como el conjunto de obligaciones inherentes a la condición castrense.'
      }
    ]
  },
  {
    id: '2.2',
    categoryId: 2,
    portionNumber: '2.2',
    title: 'Deberes Específicos del Sargento Primero',
    articles: 'Arts. 80 al 95',
    durationMinutes: 35,
    audioScript: {
      durationEstimate: '7 min',
      intro: '¡Atención futura Clase de Excelencia! Esta es la porción medular de tu curso: Los Deberes del Sargento 1/o. en el RGDM.',
      development: [
        'Artículo 82: En la clase de tropa, el Sargento Primero es el que tiene mayor jerarquía. Debe ser modelo de conducta, subordinación y pericia táctica.',
        'Artículo 85: Debe conocer a todos los soldados de la compañía por sus nombres, aptitudes y antecedentes.',
        'Artículo 91: Auxilia de forma inmediata al Capitán Comandante de la Compañía en la administración del personal, equipo y armamento.',
        'Vigila la exactitud de los toques de ordenanza y el pase de lista de diana y retreta.'
      ],
      closure: 'El Sargento Primero es el nervio motor de la compañía de infantería. Su presencia impone respeto y orden.'
    },
    videoStoryboard: [
      { minute: '0:00 - 3:00', visual: 'El Sargento 1/o. pasando revista a la compañía formada. Portapapeles y rol de servicios.', narration: 'El Sargento 1/o. es el brazo derecho del Capitán. Lleva el control numérico y táctico de la tropa.' },
      { minute: '3:01 - 6:00', visual: 'Interacción del Sargento 1/o. con los Sargentos 2/os. de pelotón y Cabos de escuadra.', narration: 'Liderazgo directo con las clases subalternas para asegurar la máxima operatividad.' }
    ],
    scenario: {
      id: 'scen-2.2',
      title: 'Supervisión del rol de servicios de la compañía',
      context: 'Oficina de la Primera Compañía de Fusileros.',
      situation: 'El Sargento 1/o. detecta que un Cabo alteró el rol de servicios para beneficiar a dos soldados amigos suyos con descansos no autorizados.',
      questions: [
        { id: 'q1', question: '¿Cuál es la obligación inmediata del Sargento 1/o.?', answer: 'Corregir el rol de servicios y dar parte al Comandante de Compañía de la irregularidad cometida.', legalBasis: 'RGDM, Arts. 82 y 91.' },
        { id: 'q2', question: '¿Qué principio de equidad rige la distribución del servicio militar?', answer: 'La rigurosa equidad y alternancia sin favoritismos ni excepciones indebidas.', legalBasis: 'RGDM, Art. 92.' }
      ],
      solutionSummary: 'La integridad del rol de servicios garantiza la moral y disciplina de la tropa.'
    },
    flashcards: [
      { id: 'fc-2.2-1', portionId: '2.2', categoryId: 2, question: '¿Cuál es la jerarquía del Sargento 1/o. dentro de la tropa?', answer: 'Es el de mayor jerarquía entre las clases de tropa.', article: 'RGDM Art. 82' },
      { id: 'fc-2.2-2', portionId: '2.2', categoryId: 2, question: '¿Qué debe conocer el Sargento 1/o. respecto al personal?', answer: 'Debe conocer por sus nombres a todos los soldados de la compañía y sus aptitudes.', article: 'RGDM Art. 85' },
      { id: 'fc-2.2-3', portionId: '2.2', categoryId: 2, question: '¿A quién auxilia de forma inmediata el Sargento 1/o.?', answer: 'Al Capitán Comandante de la Compañía, Escuadrón o Batería.', article: 'RGDM Art. 82' }
    ],
    quiz: [
      {
        id: 'q-2.2-1',
        portionId: '2.2',
        categoryId: 2,
        question: 'Según el Artículo 82 del RGDM, el Sargento 1/o. se distingue por:',
        options: [
          'Ser en la clase de tropa el que tiene mayor jerarquía y ser el auxilio inmediato del Capitán.',
          'Poder ordenar juicios de guerra sin consultar a sus superiores.',
          'Estar exento de cumplir con los toques de ordenanza del cuartel.',
          'Ser el responsable exclusivo de la contabilidad de la Secretaría de Hacienda.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'RGDM, Art. 82',
        explanation: 'El Art. 82 destaca al Sargento 1/o. como la cúspide de la tropa y apoyo directo del Capitán.'
      }
    ]
  },

  // CATEGORIA 3: Código de Justicia Militar (8 porciones)
  {
    id: '3.1',
    categoryId: 3,
    portionNumber: '3.1',
    title: 'Insubordinación: Tipificación y Agravantes',
    articles: 'Arts. 281 al 290',
    durationMinutes: 35,
    audioScript: {
      durationEstimate: '7 min',
      intro: 'Categoría 3: Código de Justicia Militar. Analizamos el delito de Insubordinación, uno de los más graves contra la disciplina castrense.',
      development: [
        'Artículo 281: Comete insubordinación el militar que con palabras, ademanes, señas o de cualquier otra manera falte al respeto o amenace a un superior.',
        'La insubordinación puede ser: De palabra o de obra.',
        'De obra: El militar que ponga manos sobre el superior o lo golpee. Si se comete en actos del servicio o frente a la tropa formada, las penas son severísimas.',
        'La tentativa de insubordinación también es punible bajo el fuero castrense.'
      ],
      closure: '¡Distinción de examen! La insubordinación es un DELITO juzgado por tribunales militares, a diferencia de una simple falta disciplinaria.'
    },
    videoStoryboard: [
      { minute: '0:00 - 3:00', visual: 'Código penal militar. Diferenciación visual entre Insubordinación de Palabra vs Insubordinación de Obra.', narration: 'Tipificación exacta de los delitos contra la jerarquía.' },
      { minute: '3:01 - 6:00', visual: 'Tribunal Militar. Sentencias y penas privativas de libertad militar.', narration: 'Agravantes: cometerse frente a tropa armada o en operaciones de combate.' }
    ],
    scenario: {
      id: 'scen-3.1',
      title: 'Insubordinación con amenaza en puesto de control',
      context: 'Operación de seguridad en puesto militar móvil.',
      situation: 'Un soldado a quien se le ordena revisar un vehículo desobedece abiertamente, arroja su casco y amenaza de muerte al Sargento al mando.',
      questions: [
        { id: 'q1', question: '¿Constituye este hecho una simple falta o un delito militar?', answer: 'Constituye delito militar de insubordinación tipificado en el Código de Justicia Militar.', legalBasis: 'CJM, Art. 281.' },
        { id: 'q2', question: '¿Cuál es el procedimiento inmediato a seguir?', answer: 'Asegurar al elemento, desarmarlo con seguridad y ponerlo a disposición del Ministerio Público Militar.', legalBasis: 'CJM, Arts. 281 y 282.' }
      ],
      solutionSummary: 'La amenaza directa contra un superior constituye delito militar de insubordinación flagrante.'
    },
    flashcards: [
      { id: 'fc-3.1-1', portionId: '3.1', categoryId: 3, question: '¿Quién comete delito de insubordinación según el Art. 281 del CJM?', answer: 'El militar que con palabras, ademanes, señas o de cualquier otra manera falte al respeto o amenace a un superior.', article: 'CJM Art. 281' },
      { id: 'fc-3.1-2', portionId: '3.1', categoryId: 3, question: '¿Qué es la insubordinación de obra?', answer: 'Aquella en que el militar agrede físicamente o pone manos sobre el superior.', article: 'CJM Art. 283' },
      { id: 'fc-3.1-3', portionId: '3.1', categoryId: 3, question: '¿Es agravante cometer insubordinación frente a la tropa formada?', answer: 'Sí, agrava considerablemente la pena militar.', article: 'CJM Art. 285' }
    ],
    quiz: [
      {
        id: 'q-3.1-1',
        portionId: '3.1',
        categoryId: 3,
        question: 'Comete el delito de insubordinación según el Artículo 281 del Código de Justicia Militar el que:',
        options: [
          'Con palabras, ademanes, señas o de cualquier otra manera falte al respeto o amenace a un superior.',
          'Llegue tarde cinco minutos al pase de lista de diana con permiso verbal.',
          'Pierda una fornitura en el campo de tiro por causas fortuitas.',
          'Solicite su cambio de corporación militar por escrito.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'CJM, Art. 281',
        explanation: 'El Art. 281 define la insubordinación como el desacato irrespetuoso o amenazante hacia el superior.'
      }
    ]
  },
  {
    id: '3.2',
    categoryId: 3,
    portionNumber: '3.2',
    title: 'Deserción y Abandono de Puesto',
    articles: 'Arts. 256 al 270',
    durationMinutes: 35,
    audioScript: {
      durationEstimate: '7 min',
      intro: 'Porción 3.2: Deserción y Abandono de Puesto de Centinela. Dos figuras delictivas de máxima trascendencia en campaña.',
      development: [
        'Deserción: Se configura por la separación no autorizada del servicio militar.',
        'Para la tropa: Faltar a tres listas consecutivas sin causa justificada o ausentarse del cuartel por más de 72 horas.',
        'La deserción de centinela (Art. 261 fr. IV): El centinela que abandona su puesto o se duerme mientras custodia vidas y armamento comete delito severamente castigado.',
        'Agravantes: Deserción con armamento oficial, municiones o en tiempo de hostilidades.'
      ],
      closure: '¡Dato de examen! La ausencia de 72 horas o falta a 3 listas consecutivas consuma el delito de deserción en tiempo de paz.'
    },
    videoStoryboard: [
      { minute: '0:00 - 3:00', visual: 'Línea de tiempo de 72 horas. Las tres listas consecutivas (diana, orden del día, retreta).', narration: 'Cómputo exacto de los términos legales que configuran la deserción militar.' },
      { minute: '3:01 - 6:00', visual: 'Puesto de centinela nocturno. Responsabilidad penal de vigilar el puesto de armas.', narration: 'El centinela es la vista y oído de la tropa; abandonarlo es delito contra la seguridad militar.' }
    ],
    scenario: {
      id: 'scen-3.2',
      title: 'Ausencia injustificada tras franquicia de fin de semana',
      context: 'Cuartel Militar del Batallón.',
      situation: 'El Soldado Reyes debió presentarse a las 06:00 horas del lunes. Faltó a la lista de diana del lunes, a la lista del mediodía y a la retreta. El martes y miércoles continúa ausente sin justificante médico.',
      questions: [
        { id: 'q1', question: '¿En qué momento se consuma el delito de deserción?', answer: 'Al faltar a tres listas consecutivas o al transcurrir más de 72 horas de ausencia no justificada.', legalBasis: 'CJM, Art. 256.' },
        { id: 'q2', question: '¿Qué acción administrativa y penal procede?', answer: 'Levantar el acta de deserción correspondiente y girar la orden de aprehensión militar.', legalBasis: 'CJM, Art. 258.' }
      ],
      solutionSummary: 'La consumación de la deserción exige levantar acta de inmediato para salvaguardar el régimen penal.'
    },
    flashcards: [
      { id: 'fc-3.2-1', portionId: '3.2', categoryId: 3, question: '¿Cuándo se configura la deserción de tropa en tiempo de paz?', answer: 'Al faltar a 3 listas consecutivas o ausentarse por más de 72 horas sin causa justificada.', article: 'CJM Art. 256' },
      { id: 'fc-3.2-2', portionId: '3.2', categoryId: 3, question: '¿Qué agrava el delito de deserción?', answer: 'Llevarse armamento oficial, prendas de equipo, vehículos o municiones de la nación.', article: 'CJM Art. 260' },
      { id: 'fc-3.2-3', portionId: '3.2', categoryId: 3, question: '¿Cuál es la falta más grave de un centinela?', answer: 'Abandonar su puesto o dormirse en funciones de vigilancia.', article: 'CJM Art. 261 fr. IV' }
    ],
    quiz: [
      {
        id: 'q-3.2-1',
        portionId: '3.2',
        categoryId: 3,
        question: 'En tiempo de paz, comete delito de deserción el individuo de tropa que sin justificación:',
        options: [
          'Falta a 3 listas consecutivas o se ausenta por más de 72 horas del cuartel.',
          'Solicita un anticipo de sueldo dos veces en el mismo mes.',
          'Comete un error ortográfico en la libreta de guardia.',
          'Llega quince minutos antes a la formación de honores a la bandera.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'CJM, Art. 256',
        explanation: 'El Art. 256 estipula que la ausencia de más de 72 horas o falta a 3 listas consecutivas constituye deserción.'
      }
    ]
  },

  // CATEGORIA 4: Ley Orgánica del Ejército y Fuerza Aérea Mexicanos (5 porciones)
  {
    id: '4.1',
    categoryId: 4,
    portionNumber: '4.1',
    title: 'Misiones Generales y Mando Supremo',
    articles: 'Arts. 1 al 16',
    durationMinutes: 30,
    audioScript: {
      durationEstimate: '6 min',
      intro: 'Categoría 4: Ley Orgánica del Ejército y Fuerza Aérea Mexicanos. Las 5 Misiones Generales de nuestras Fuerzas Armadas.',
      development: [
        'Artículo 1: Las Fuerzas Armadas tienen 5 misiones fundamentales:',
        '1. Defender la integridad, la independencia y la soberanía de la nación.',
        '2. Garantizar la seguridad interior.',
        '3. Auxiliar a la población civil en casos de necesidades públicas.',
        '4. Realizar acciones cívicas y obras sociales que tiendan al progreso del país.',
        '5. En caso de desastre, prestar ayuda para el auxilio de las personas y sus bienes (Plan DN-III-E).',
        'Artículo 11: El Mando Supremo corresponde al Presidente Constitucional de los Estados Unidos Mexicanos.',
        'Artículo 16: El Alto Mando es ejercido por el Secretario de la Defensa Nacional.'
      ],
      closure: '¡Las 5 misiones generales caen en todo examen militar! Apréndete su orden y redacción precisa.'
    },
    videoStoryboard: [
      { minute: '0:00 - 3:00', visual: 'Escudo Nacional y las 5 Misiones Generales desplegadas en pantalla con iconos de defensa, seguridad, auxilio y Plan DN-III-E.', narration: 'La razón constitucional de ser del Ejército y Fuerza Aérea Mexicanos.' },
      { minute: '3:01 - 6:00', visual: 'Organigrama: Mando Supremo (Presidente) -> Alto Mando (Secretario SEDENA) -> Mandos Superiores.', narration: 'Estructura vertical de la cadena de mando nacional.' }
    ],
    scenario: {
      id: 'scen-4.1',
      title: 'Despliegue de tropas ante contingencia meteorológica',
      context: 'Municipio costero afectado por huracán categoría 4.',
      situation: 'El batallón recibe la orden de activación de emergencia. El Sargento 1/o. debe coordinar la salida de las escuadras de rescate y auxilio a la población.',
      questions: [
        { id: 'q1', question: '¿Bajo qué misión general de la Ley Orgánica se fundamenta la acción?', answer: 'Misión 5: En caso de desastre prestar ayuda para el auxilio de las personas y sus bienes, y la reconstrucción (Plan DN-III-E).', legalBasis: 'Ley Orgánica, Art. 1 fr. V.' },
        { id: 'q2', question: '¿Quién ejerce el Alto Mando del Ejército y Fuerza Aérea?', answer: 'El Secretario de la Defensa Nacional.', legalBasis: 'Ley Orgánica, Art. 16.' }
      ],
      solutionSummary: 'El Plan DN-III-E encuentra su sustento orgánico directo en la misión 5 del Art. 1 de la Ley Orgánica.'
    },
    flashcards: [
      { id: 'fc-4.1-1', portionId: '4.1', categoryId: 4, question: '¿Cuántas misiones generales tiene el Ejército y FAM según el Art. 1?', answer: 'Cinco misiones generales.', article: 'Ley Orgánica Art. 1' },
      { id: 'fc-4.1-2', portionId: '4.1', categoryId: 4, question: '¿A quién corresponde el Mando Supremo de las Fuerzas Armadas?', answer: 'Al Presidente Constitucional de los Estados Unidos Mexicanos.', article: 'Ley Orgánica Art. 11' },
      { id: 'fc-4.1-3', portionId: '4.1', categoryId: 4, question: '¿Quién ejerce el Alto Mando?', answer: 'El Secretario de la Defensa Nacional.', article: 'Ley Orgánica Art. 16' }
    ],
    quiz: [
      {
        id: 'q-4.1-1',
        portionId: '4.1',
        categoryId: 4,
        question: 'Conforme al Artículo 1 de la Ley Orgánica del Ejército y FAM, la misión consistente en prestar ayuda para el auxilio de personas y sus bienes en desastres corresponde a la fracción:',
        options: [
          'Fracción V (Plan DN-III-E).',
          'Fracción I (Defensa exterior).',
          'Fracción II (Seguridad interior).',
          'Fracción IV (Obras sociales).'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Ley Orgánica, Art. 1 fr. V',
        explanation: 'La fracción V contempla expresamente el auxilio en desastres y la reconstrucción de zonas afectadas.'
      }
    ]
  },

  // CATEGORIA 5: Ley Federal de Armas de Fuego y Explosivos (5 porciones)
  {
    id: '5.1',
    categoryId: 5,
    portionNumber: '5.1',
    title: 'Clasificación de Armas y Calibres de Uso Exclusivo',
    articles: 'Arts. 9, 10, 11 y 24',
    durationMinutes: 30,
    audioScript: {
      durationEstimate: '6 min',
      intro: 'Categoría 5: Ley Federal de Armas de Fuego y Explosivos. Clasificación técnica y legal de armamento.',
      development: [
        'Artículo 11: Armas, municiones y material destinados exclusivamente para el uso del Ejército, Armada y Fuerza Aérea:',
        'Revólveres calibre .357 Magnum y los calibres superiores.',
        'Pistolas calibre 9 mm Parabellum, Luger y similares, .38 Super y .45 Auto.',
        'Fusiles, mosquetones, carabinas y tercerolas en calibres 7 mm, 7.62 mm, 5.56 mm (.223) y todos los de funcionamiento automático o ráfaga.',
        'Armas permitidas para posesión en domicilio particular (Arts. 9 y 10): Pistolas calibre .380 (.9mm corto) o revólveres .38 Especial (excepto .357 Magnum).'
      ],
      closure: '¡Atención en el examen! Los calibres 9mm Luger y .45 ACP son de USO EXCLUSIVO del Ejército (Art. 11).'
    },
    videoStoryboard: [
      { minute: '0:00 - 3:00', visual: 'Tabla comparativa de calibres: Permitidos a civiles en domicilio (.380, .38 Special, .22) vs Reservados al Ejército (9mm, .45, .357, 5.56mm, 7.62mm).', narration: 'Diferenciación técnica indispensable para operaciones de seguridad militar.' },
      { minute: '3:01 - 6:00', visual: 'Fundamentos de la portación militar legal (Art. 24).', narration: 'Los militares en activo portan armas de fuego conforme al marco reglamentario de la SEDENA.' }
    ],
    scenario: {
      id: 'scen-5.1',
      title: 'Aseguramiento de arma de fuego en puesto militar de seguridad',
      context: 'Inspección de rutina en carretera estatal.',
      situation: 'El Sargento 1/o. localiza en la guantera de un vehículo particular una pistola calibre 9x19 mm Parabellum con cargador abastecido.',
      questions: [
        { id: 'q1', question: '¿Es el calibre 9mm de uso exclusivo de las Fuerzas Armadas?', answer: 'Sí. El Art. 11 inciso b clasifica las pistolas calibre 9mm Parabellum como de uso exclusivo del Ejército, Armada y Fuerza Aérea.', legalBasis: 'LFAFE, Art. 11 inc. b.' },
        { id: 'q2', question: '¿Qué delito comete el conductor?', answer: 'Delito de portación de arma de fuego de uso exclusivo del Ejército, sancionado con pena privativa de libertad.', legalBasis: 'LFAFE, Art. 83.' }
      ],
      solutionSummary: 'La portación sin licencia de calibres militares constituye delito federal del orden común y federal.'
    },
    flashcards: [
      { id: 'fc-5.1-1', portionId: '5.1', categoryId: 5, question: '¿Qué calibres de pistola son de uso exclusivo militar según el Art. 11?', answer: 'Calibre 9 mm Parabellum, .38 Super y .45 Auto, así como automáticas de cualquier calibre.', article: 'LFAFE Art. 11' },
      { id: 'fc-5.1-2', portionId: '5.1', categoryId: 5, question: '¿Qué calibre de revólver sí está permitido para civiles en domicilio?', answer: 'Revólver calibre .38 Especial (excepto .357 Magnum).', article: 'LFAFE Art. 9' },
      { id: 'fc-5.1-3', portionId: '5.1', categoryId: 5, question: '¿A qué autoridad compete el control de armas de fuego en el país?', answer: 'A la Secretaría de la Defensa Nacional.', article: 'LFAFE Art. 2 y 3' }
    ],
    quiz: [
      {
        id: 'q-5.1-1',
        portionId: '5.1',
        categoryId: 5,
        question: 'Conforme al Artículo 11 de la Ley Federal de Armas de Fuego y Explosivos, es arma de uso exclusivo del Ejército:',
        options: [
          'La pistola calibre 9 mm Parabellum o Luger.',
          'El revólver calibre .22 corto para tiro al blanco.',
          'La escopeta calibre 12 con cañón de 30 pulgadas para cacería registrada.',
          'El rifle de aire comprimido calibre 4.5 mm.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'LFAFE, Art. 11 inc. b',
        explanation: 'El Art. 11 reserva expresamente las pistolas 9 mm Parabellum al uso exclusivo castrense.'
      }
    ]
  },

  // CATEGORIA 6: Manual de Derechos Humanos SEDENA (5 porciones)
  {
    id: '6.1',
    categoryId: 6,
    portionNumber: '6.1',
    title: 'Principios Constitucionales y Obligaciones Militares en DDHH',
    articles: 'Capítulos I y II',
    durationMinutes: 30,
    audioScript: {
      durationEstimate: '6 min',
      intro: 'Categoría 6: Manual de Derechos Humanos para el Ejército y Fuerza Aérea Mexicanos.',
      development: [
        'Artículo 1° Constitucional: Todas las autoridades tienen la obligación ineludible de promover, respetar, proteger y garantizar los derechos humanos.',
        'Principios rectores de los DDHH: Universalidad, Interdependencia, Indivisibilidad y Progresividad.',
        'Prohibición categórica de la tortura: En ningún caso, ni bajo orden superior o estado de emergencia, se tolera la tortura o los tratos crueles, inhumanos o degradantes.',
        'La legalidad en las detenciones: Inmediata puesta a disposición ante la autoridad ministerial correspondiente.'
      ],
      closure: '¡Un militar profesional combate al crimen dentro del marco de la ley y el respeto a la dignidad humana!'
    },
    videoStoryboard: [
      { minute: '0:00 - 3:00', visual: 'Constitución Política Art. 1 y Manual de DDHH SEDENA. Los 4 principios rectores.', narration: 'El actuar militar fundamentado en el respeto irrestricto a los derechos fundamentales.' },
      { minute: '3:01 - 6:00', visual: 'Protocolo de detención y llenado del Informe Policial Homologado (IPH).', narration: 'La flagrancia exige respeto a la integridad física y entrega inmediata al Ministerio Público.' }
    ],
    scenario: {
      id: 'scen-6.1',
      title: 'Detención en flagrancia y preservación de derechos humanos',
      context: 'Operativo interinstitucional en poblado rural.',
      situation: 'Una patrulla de infantería detiene a dos personas armadas en flagrante delito. Un soldado propone golpearlos para obtener información sobre sus cómplices.',
      questions: [
        { id: 'q1', question: '¿Cómo debe actuar de inmediato el Sargento 1/o.?', answer: 'Impedir tajantemente cualquier agresión física, recordando que la tortura está prohibida en cualquier circunstancia.', legalBasis: 'Manual DDHH SEDENA, Cap. III.' },
        { id: 'q2', question: '¿Cuál es la obligación legal respecto a los detenidos?', answer: 'Respetar su vida e integridad física y ponerlos sin demora a disposición del Ministerio Público.', legalBasis: 'Art. 16 Constitucional y Manual DDHH.' }
      ],
      solutionSummary: 'La tortura no solo es ilegal, sino que anula las pruebas procesales y constituye delito grave.'
    },
    flashcards: [
      { id: 'fc-6.1-1', portionId: '6.1', categoryId: 6, question: '¿Cuáles son los 4 principios rectores de los Derechos Humanos?', answer: 'Universalidad, Interdependencia, Indivisibilidad y Progresividad.', article: 'Art. 1° Constitucional y Manual DDHH' },
      { id: 'fc-6.1-2', portionId: '6.1', categoryId: 6, question: '¿Se justifica la tortura bajo orden del superior?', answer: 'JAMÁS. Ninguna circunstancia o mandato superior puede justificar la tortura.', article: 'Manual DDHH Cap. III' },
      { id: 'fc-6.1-3', portionId: '6.1', categoryId: 6, question: '¿A qué autoridad debe entregarse a una persona detenida en flagrancia?', answer: 'Inmediatamente al Ministerio Público competente con el respectivo IPH.', article: 'Art. 16 Const. y Manual DDHH' }
    ],
    quiz: [
      {
        id: 'q-6.1-1',
        portionId: '6.1',
        categoryId: 6,
        question: 'Los principios de los Derechos Humanos reconocidos en el Artículo 1° Constitucional y en el Manual de la SEDENA son:',
        options: [
          'Universalidad, Interdependencia, Indivisibilidad y Progresividad.',
          'Jerarquía, Mando, Antigüedad y Obediencia.',
          'Puntualidad, Energía, Castigo y Represión.',
          'Secreto de guerra, Compartimentación y Fuego.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Manual de DDHH SEDENA, Cap. II',
        explanation: 'Los 4 principios rectores constitucionales son la universalidad, interdependencia, indivisibilidad y progresividad.'
      }
    ]
  },

  // CATEGORIA 7: Ley Nacional sobre el Uso de la Fuerza (5 porciones)
  {
    id: '7.1',
    categoryId: 7,
    portionNumber: '7.1',
    title: 'Principios Rectores y Niveles del Uso de la Fuerza',
    articles: 'Arts. 4, 11 y 12',
    durationMinutes: 30,
    audioScript: {
      durationEstimate: '7 min',
      intro: 'Categoría 7: Ley Nacional sobre el Uso de la Fuerza. Los principios de legalidad, necesidad y proporcionalidad.',
      development: [
        'Artículo 4: Principios rectores: Legalidad, Necesidad, Proporcionalidad, Racionalidad y Oportunidad.',
        'Artículo 11: Los 5 niveles de impacto del uso de la fuerza:',
        '1. Presencia de autoridad (primera forma de disuasión).',
        '2. Persuasión o disuasión verbal (órdenes verbales claras).',
        '3. Reducción física de movimientos (inmovilización y candados de manos).',
        '4. Armas incapacitantes menos letales (agentes químicos o mecánicos).',
        '5. Fuerza letal (empleo de armas de fuego).',
        'Artículo 12: La fuerza letal es el ÚLTIMO RECURSO y solo se permite en defensa de la vida frente a una agresión real, actual o inminente.'
      ],
      closure: '¡Grábate la pirámide de la fuerza! Presencia, Verbalización, Control Físico, Armas Menos Letales y Fuerza Letal.'
    },
    videoStoryboard: [
      { minute: '0:00 - 3:00', visual: 'Pirámide escalonada de los 5 niveles del uso de la fuerza (Art. 11). Graduación de impacto.', narration: 'El uso de la fuerza es gradual y proporcional a la resistencia del infractor.' },
      { minute: '3:01 - 6:00', visual: 'Escena de legítima defensa: Amenaza con arma de fuego inminente vs defensa de la vida.', narration: 'La fuerza letal es la última opción para proteger la vida propia o de terceros.' }
    ],
    scenario: {
      id: 'scen-7.1',
      title: 'Graduación de la fuerza en manifestación hostil',
      context: 'Resguardo de instalación militar estratégica.',
      situation: 'Un grupo de personas insulta a la guardia y arroja piedras pequeñas a la reja exterior sin portar armas de fuego ni intentar derribar el portón.',
      questions: [
        { id: 'q1', question: '¿Sería legal abrir fuego con fusiles de asalto?', answer: 'No. Violaría los principios de necesidad, proporcionalidad y racionalidad (Art. 4 y 12).', legalBasis: 'LNUF, Arts. 4 y 12.' },
        { id: 'q2', question: '¿Qué nivel de fuerza corresponde emplear?', answer: 'Presencia de autoridad, disuasión verbal y, en caso necesario, equipo menos letal antimotín para contención perimétrica.', legalBasis: 'LNUF, Art. 11.' }
      ],
      solutionSummary: 'La fuerza letal no puede emplearse frente a insultos o agresiones no letales.'
    },
    flashcards: [
      { id: 'fc-7.1-1', portionId: '7.1', categoryId: 7, question: '¿Cuáles son los 5 principios del uso de la fuerza según el Art. 4?', answer: 'Legalidad, Necesidad, Proporcionalidad, Racionalidad y Oportunidad.', article: 'LNUF Art. 4' },
      { id: 'fc-7.1-2', portionId: '7.1', categoryId: 7, question: '¿Cuáles son los 5 niveles del uso de la fuerza según el Art. 11?', answer: '1. Presencia de autoridad; 2. Persuasión verbal; 3. Reducción física; 4. Armas menos letales; 5. Fuerza letal.', article: 'LNUF Art. 11' },
      { id: 'fc-7.1-3', portionId: '7.1', categoryId: 7, question: '¿Cuándo es legal el empleo de la fuerza letal según el Art. 12?', answer: 'Solo en defensa de la vida frente a una agresión real, actual o inminente.', article: 'LNUF Art. 12' }
    ],
    quiz: [
      {
        id: 'q-7.1-1',
        portionId: '7.1',
        categoryId: 7,
        question: 'De acuerdo con el Artículo 11 de la Ley Nacional sobre el Uso de la Fuerza, el primer nivel de impacto es:',
        options: [
          'La presencia de autoridad.',
          'El disparo de advertencia al aire.',
          'La inmovilización física con llaves de sometimiento.',
          'El uso de gas lacrimógeno.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'LNUF, Art. 11',
        explanation: 'El primer nivel de contacto y disuasión es la presencia de autoridad debidamente identificada y uniformada.'
      }
    ]
  },

  // CATEGORIA 8: Manual de Táctica de Infantería (5 porciones)
  {
    id: '8.1',
    categoryId: 8,
    portionNumber: '8.1',
    title: 'Maniobra Táctica y Formas de Combate Ofensivo',
    articles: 'Capítulos I al IV',
    durationMinutes: 35,
    audioScript: {
      durationEstimate: '7 min',
      intro: '¡Infantería en combate! Categoría 8: Manual de Táctica de Infantería. Formas de maniobra táctica ofensiva.',
      development: [
        'Misión del arma de infantería: Cerrar con el enemigo mediante el fuego y el movimiento para destruirlo o capturarlo.',
        'La maniobra táctica ofensiva tiene dos formas principales:',
        '1. El Envolvimiento: Consiste en rodear el flanco de la posición enemiga para golpear su retaguardia, evitando el choque frontal y cortando su retirada.',
        '2. La Penetración: Consiste en un ataque frontal enérgico que rompe la línea enemiga en un punto vulnerable, dividiendo sus fuerzas para batirlas sucesivamente.',
        'Factores de la decisión táctica (METTT-C): Misión, Enemigo, Terreno y Clima, Tropas y Medios Disponibles, y Tiempo.',
        'El Pelotón de Fusileros mandado por un Sargento 2/o. subordinado a la Sección del Sargento 1/o.'
      ],
      closure: '¡Pregunta clásica de la EMS! Envolvimiento evita el frente y rodea; Penetración rompe el frente dividiendo al enemigo.'
    },
    videoStoryboard: [
      { minute: '0:00 - 3:00', visual: 'Carta topográfica táctica con símbolos militares. Esquema gráfico del Envolvimiento vs Penetración.', narration: 'Las dos grandes formas de ataque coordinado del arma de Infantería.' },
      { minute: '3:01 - 6:00', visual: 'Fuego y movimiento en el terreno. Base de fuegos cubriendo al escalón de asalto.', narration: 'Fuego y maniobra coordinados para conquistar el objetivo asignado.' }
    ],
    scenario: {
      id: 'scen-8.1',
      title: 'Ataque a una cota defendida por el enemigo',
      context: 'Terreno montañoso con vegetación media.',
      situation: 'La sección de infantería tiene la misión de neutralizar una posición enemiga atrincherada en una colina. El frente enemigo cuenta con campos de tiro despejados, pero su flanco derecho tiene una cañada boscosa protegida de las vistas.',
      questions: [
        { id: 'q1', question: '¿Qué forma de maniobra ofensiva es la más idónea?', answer: 'El Envolvimiento por el flanco cubierto, fijando al enemigo de frente con una base de fuego.', legalBasis: 'Manual de Táctica, Cap. IV.' },
        { id: 'q2', question: '¿Cuál es la diferencia táctica con la penetración?', answer: 'El envolvimiento evita el choque frontal contra las mejores defensas enemigas y golpea su retaguardia, mientras que la penetración busca la ruptura frontal.', legalBasis: 'Manual de Táctica, Cap. IV.' }
      ],
      solutionSummary: 'Aprovechar las cubiertas del terreno para rodear el flanco hostil constituye un envolvimiento táctico de libro.'
    },
    flashcards: [
      { id: 'fc-8.1-1', portionId: '8.1', categoryId: 8, question: '¿Cuál es la misión fundamental del Arma de Infantería?', answer: 'Cerrar con el enemigo mediante el fuego y el movimiento para destruirlo, capturarlo o desalojarlo.', article: 'Manual Táctica Cap. I' },
      { id: 'fc-8.1-2', portionId: '8.1', categoryId: 8, question: '¿En qué consiste la maniobra de Envolvimiento?', answer: 'En evitar el choque frontal, rodeando la posición enemiga para caer sobre su flanco o retaguardia.', article: 'Manual Táctica Cap. IV' },
      { id: 'fc-8.1-3', portionId: '8.1', categoryId: 8, question: '¿En qué consiste la maniobra de Penetración?', answer: 'En golpear frontalmente la línea enemiga para romperla y dividir sus fuerzas en dos.', article: 'Manual Táctica Cap. IV' }
    ],
    quiz: [
      {
        id: 'q-8.1-1',
        portionId: '8.1',
        categoryId: 8,
        question: 'Según el Manual de Táctica de Infantería, la forma de maniobra ofensiva que busca rodear el flanco enemigo para golpear su retaguardia y cortar su retirada es:',
        options: [
          'El Envolvimiento.',
          'La Penetración.',
          'La Retirada fingida.',
          'La Defensa en punto de apoyo.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Manual de Táctica de Infantería, Cap. IV',
        explanation: 'El Envolvimiento rodea la posición para caer sobre el flanco o retaguardia eludiendo el esfuerzo defensivo frontal del enemigo.'
      }
    ]
  }
];
