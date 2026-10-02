import { Simulacro, QuizQuestion } from '../types/ems';

export const SIMULACROS_DATA: Simulacro[] = [
  {
    id: 'sim-1',
    number: 1,
    title: 'Simulacro 1: Disciplina y Deberes Militares',
    subtitle: 'Categoría 1 (Ley de Disciplina) y Categoría 2 (Deberes Militares)',
    categories: [1, 2],
    categoriesText: 'Cat. 1: Ley de Disciplina + Cat. 2: Deberes Militares',
    durationMinutes: 60,
    totalQuestions: 12,
    minPassingScore: 10,
    questions: [
      {
        id: 's1-q1',
        portionId: '1.1',
        categoryId: 1,
        question: 'Conforme al Artículo 3 de la Ley de Disciplina, la disciplina militar tiene como base:',
        options: [
          'La obediencia, y un alto concepto del honor, de la justicia y de la moral.',
          'La jerarquía inflexible, el temor a la pena y la privación de derechos.',
          'El escalafón de antigüedad y las condecoraciones al mérito.',
          'Las facultades plenarias concedidas por los jueces civiles.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Ley de Disciplina, Art. 3',
        explanation: 'El Art. 3 establece textualmente la obediencia, el honor, la justicia y la moral como bases de la disciplina castrense.'
      },
      {
        id: 's1-q2',
        portionId: '1.3',
        categoryId: 1,
        question: '¿Cuál es la duración máxima de arresto que puede imponerse a un Oficial según el Artículo 33 de la Ley de Disciplina?',
        options: [
          'Hasta por 8 días.',
          'Hasta por 15 días.',
          'Hasta por 20 días.',
          'Hasta por 24 horas.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Ley de Disciplina, Art. 33',
        explanation: 'El Art. 33 fija sin ambigüedad: "Los oficiales pueden ser arrestados hasta por ocho días".'
      },
      {
        id: 's1-q3',
        portionId: '1.3',
        categoryId: 1,
        question: '¿Cuál es el tiempo máximo de arresto legalmente permitido para el personal de Tropa conforme al Artículo 33 Bis?',
        options: [
          '8 días.',
          '15 días.',
          '30 días.',
          '45 días.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 33 Bis',
        explanation: 'El Art. 33 Bis señala que el arresto para individuos de tropa es de hasta por 15 días.'
      },
      {
        id: 's1-q4',
        portionId: '1.2',
        categoryId: 1,
        question: 'Son los únicos tres correctivos disciplinarios autorizados por el Artículo 24 de la Ley de Disciplina:',
        options: [
          'Amonestación, Arresto y Cambio de cuerpo o dependencia.',
          'Amonestación, Multa pecuniaria y Suspensión de cargo.',
          'Arresto, Trabajo forzoso en fatiga y Confinamiento.',
          'Reprensión privada, Pérdida de grado y Degradación.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Ley de Disciplina, Art. 24',
        explanation: 'El Art. 24 enumera taxativamente los 3 correctivos legales: Amonestación, Arresto y Cambio de cuerpo o dependencia.'
      },
      {
        id: 's1-q5',
        portionId: '1.5',
        categoryId: 1,
        question: '¿Quién ejerce las funciones de Secretario en el Consejo de Honor según el Artículo 45 de la Ley de Disciplina?',
        options: [
          'El Oficial de mayor antigüedad.',
          'El vocal de menor jerarquía o antigüedad.',
          'El Sargento 1/o. de la compañía.',
          'El Segundo Comandante del batallón.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 45',
        explanation: 'El vocal de menor graduación o antigüedad desempeña las funciones secretariales en el Consejo de Honor.'
      },
      {
        id: 's1-q6',
        portionId: '1.6',
        categoryId: 1,
        question: 'Frente a una orden o correctivo que el militar considere injusto, ¿cuál es la regla fundamental de actuación castrense (Art. 54)?',
        options: [
          'Suspender de inmediato la orden y solicitar audiencia.',
          'Primero cumplir la orden y posteriormente formular la inconformidad por escrito.',
          'Elevar una denuncia anónima ante el escalón superior.',
          'Acudir al juez de distrito más cercano en juicio de amparo civil.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 54',
        explanation: 'La máxima militar mexicana establece: "Primero cumplir, después reclamar".'
      },
      {
        id: 's1-q7',
        portionId: '2.2',
        categoryId: 2,
        question: 'En el Reglamento General de Deberes Militares, ¿cuál es el papel orgánico del Sargento Primero (Art. 82)?',
        options: [
          'Es en la clase de tropa el de mayor jerarquía y auxilio inmediato del Capitán.',
          'Es el encargado exclusivo de la banda de guerra y escolta.',
          'Es un elemento técnico sin funciones de mando sobre cabos ni soldados.',
          'Es el representante judicial del batallón ante la fiscalía.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'RGDM, Art. 82',
        explanation: 'El Art. 82 define al Sargento 1/o. como el militar de más alta jerarquía en la tropa y apoyo directo del Capitán.'
      },
      {
        id: 's1-q8',
        portionId: '2.2',
        categoryId: 2,
        question: '¿Qué conocimiento fundamental sobre el personal de su unidad exige el RGDM al Sargento Primero?',
        options: [
          'Conocer a todos los soldados de la compañía por sus nombres y aptitudes.',
          'Conocer las cuentas bancarias de los familiares de los soldados.',
          'Conocer el domicilio particular de todos los oficiales de la región militar.',
          'Conocer la clave secreta de radio de la comandancia de zona.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'RGDM, Art. 85',
        explanation: 'El Sargento 1/o. debe conocer por sus nombres a todos los soldados de su compañía para orientarlos y evaluarlos.'
      },
      {
        id: 's1-q9',
        portionId: '1.5',
        categoryId: 1,
        question: 'Es una facultad del Consejo de Honor respecto al personal de tropa según el Artículo 49 fracción III:',
        options: [
          'Solicitar y acordar la baja del servicio de las armas por mala conducta.',
          'Sentenciar a 10 años de trabajos forzados en prisión militar.',
          'Rebajar el sueldo mensual al 50%.',
          'Otorgar pensiones de retiro militar definitivas.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Ley de Disciplina, Art. 49 fr. III',
        explanation: 'El Consejo de Honor puede dictaminar la baja de tropa por conducta incompatible con el prestigio militar.'
      },
      {
        id: 's1-q10',
        portionId: '1.1',
        categoryId: 1,
        question: '¿Qué dispone el Artículo 3 Bis de la Ley de Disciplina respecto al servicio de las armas?',
        options: [
          'Exige llevar el cumplimiento del deber hasta el sacrificio y anteponer al interés personal la patria.',
          'Permite renunciar al servicio en caso de peligro inminente de combate.',
          'Autoriza ausentarse del cuartel si el horario de instrucción rebasa 8 horas.',
          'Garantiza indemnización inmediata por cualquier sanción disciplinaria impuesta.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Ley de Disciplina, Art. 3 Bis',
        explanation: 'El Art. 3 Bis impone el mandato de llevar el cumplimiento del deber castrense hasta el sacrificio.'
      },
      {
        id: 's1-q11',
        portionId: '2.1',
        categoryId: 2,
        question: 'Caso Práctico: Un soldado franco de civil reconoce a un Mayor en un centro comercial y no realiza el saludo militar. ¿Cómo califica el RGDM su conducta?',
        options: [
          'Correcta, porque de civil los militares no tienen ninguna obligación de cortesía.',
          'Incorrecta, pues al reconocer al superior debe saludarlo con la debida consideración militar.',
          'Delito de traición a las instituciones militares.',
          'Infracción que amerita consignación directa al juzgado militar.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'RGDM, Arts. 20 y 22',
        explanation: 'El respeto a la jerarquía es permanente. Al reconocer a un superior, el saludo de cortesía es obligatorio.'
      },
      {
        id: 's1-q12',
        portionId: '1.4',
        categoryId: 1,
        question: 'Caso Práctico: El Comandante de Sección ordena verbalmente al Sargento 1/o. aplicar 25 días de arresto en celda a un soldado. ¿Qué debe advertir el Sargento 1/o.?',
        options: [
          'Que la orden es legal y debe ejecutarse inmediatamente.',
          'Que el tope máximo de arresto a tropa es de 15 días según el Art. 33 Bis, por lo que 25 días es ilegal.',
          'Que para tropa el tope son 8 días según el Art. 33.',
          'Que el arresto solo puede cumplirlo el Comandante de Batallón.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 33 Bis',
        explanation: 'El Art. 33 Bis marca 15 días como límite máximo para individuos de tropa; exceder ese límite es una orden contraria a la ley.'
      }
    ]
  },
  {
    id: 'sim-2',
    number: 2,
    title: 'Simulacro 2: Código de Justicia Militar (Parte 1)',
    subtitle: 'Categoría 3: Delitos contra la Disciplina y la Jerarquía Militar',
    categories: [3],
    categoriesText: 'Cat. 3: Código de Justicia Militar (Insubordinación, Desobediencia)',
    durationMinutes: 60,
    totalQuestions: 4,
    minPassingScore: 3,
    questions: [
      {
        id: 's2-q1',
        portionId: '3.1',
        categoryId: 3,
        question: 'Comete el delito de insubordinación según el Artículo 281 del Código de Justicia Militar el militar que:',
        options: [
          'Con palabras, ademanes, señas o de cualquier otra manera falte al respeto o amenace a un superior.',
          'Extravíe por descuido una gorra de faena durante el adiestramiento.',
          'No asista a una ceremonia social organizada por el club de oficiales.',
          'Presente una solicitud de vacaciones en formato incorrecto.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'CJM, Art. 281',
        explanation: 'El Art. 281 tipifica la insubordinación como el acto irrespetuoso o de amenaza frente a un superior militar.'
      },
      {
        id: 's2-q2',
        portionId: '3.1',
        categoryId: 3,
        question: '¿Cómo se clasifica la insubordinación cuando el militar agrede físicamente a su superior?',
        options: [
          'Insubordinación de palabra.',
          'Insubordinación de obra.',
          'Falta disciplinaria con amonestación escrita.',
          'Desacato reglamentario culposo.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'CJM, Art. 283',
        explanation: 'La insubordinación de obra es la agresión física contra el superior, con penas severas privativas de libertad.'
      },
      {
        id: 's2-q3',
        portionId: '3.1',
        categoryId: 3,
        question: 'Es una circunstancia que agrava la pena por el delito de insubordinación:',
        options: [
          'Cometerse frente a la tropa formada o sobre las armas.',
          'Cometerse en día domingo durante horario de visita familiar.',
          'Cometerse habiendo cumplido todos los servicios de la semana.',
          'Haberse disculpado verbalmente antes de 24 horas.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'CJM, Art. 285',
        explanation: 'La presencia de la tropa armada agrava el delito por el impacto destructor sobre la disciplina colectiva.'
      },
      {
        id: 's2-q4',
        portionId: '3.1',
        categoryId: 3,
        question: 'Comete el delito de abuso de autoridad según el Artículo 293 del CJM:',
        options: [
          'El superior que ejerciendo mando cometa atropellos, ultrajes o vejaciones contra sus subordinados.',
          'El soldado que informe con veracidad una novedad al Comandante.',
          'El oficial que gradúe un arresto reglamentario de 5 días a un cabo infractor.',
          'El centinela que exija el santo y seña para franquear el paso.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'CJM, Art. 293',
        explanation: 'El abuso de autoridad sanciona los excesos, ultrajes y tratos vejatorios de superiores contra inferiores.'
      }
    ]
  },
  {
    id: 'sim-3',
    number: 3,
    title: 'Simulacro 3: Justicia Militar (Parte 2) y Ley Orgánica',
    subtitle: 'Categoría 3 (Deserción, Abandono de Puesto) y Categoría 4 (Mando y Misiones)',
    categories: [3, 4],
    categoriesText: 'Cat. 3: Delitos Militares + Cat. 4: Ley Orgánica del Ejército',
    durationMinutes: 60,
    totalQuestions: 3,
    minPassingScore: 2,
    questions: [
      {
        id: 's3-q1',
        portionId: '3.2',
        categoryId: 3,
        question: 'En tiempo de paz, ¿a las cuántas horas de ausencia no justificada se consuma el delito de deserción para la tropa?',
        options: [
          'A las 24 horas.',
          'A las 48 horas.',
          'A más de 72 horas o a 3 listas consecutivas.',
          'A los 15 días naturales.'
        ],
        correctOptionIndex: 2,
        legalBasis: 'CJM, Art. 256',
        explanation: 'El Código de Justicia Militar fija 72 horas de ausencia o falta a 3 listas consecutivas para configurar deserción.'
      },
      {
        id: 's3-q2',
        portionId: '4.1',
        categoryId: 4,
        question: '¿Cuántas son las misiones generales del Ejército y Fuerza Aérea prescritas en el Artículo 1 de la Ley Orgánica?',
        options: [
          'Tres misiones.',
          'Cinco misiones generales.',
          'Siete misiones operativas.',
          'Diez objetivos estratégicos.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley Orgánica del Ejército y FAM, Art. 1',
        explanation: 'El Art. 1 consagra exactamente cinco misiones generales del instituto armado nacional.'
      },
      {
        id: 's3-q3',
        portionId: '4.1',
        categoryId: 4,
        question: 'De acuerdo con el Artículo 11 de la Ley Orgánica, ¿a quién corresponde el Mando Supremo de las Fuerzas Armadas?',
        options: [
          'Al Secretario de la Defensa Nacional.',
          'Al Presidente Constitucional de los Estados Unidos Mexicanos.',
          'Al Comandante del Ejército.',
          'Al Presidente de la Suprema Corte de Justicia.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley Orgánica, Art. 11',
        explanation: 'El Presidente de la República es el Comandante Supremo de las Fuerzas Armadas Mexicanas.'
      }
    ]
  },
  {
    id: 'sim-4',
    number: 4,
    title: 'Simulacro 4: Marco Jurídico Operativo (Armas, DDHH y Fuerza)',
    subtitle: 'Categorías 5 (LFAFE), 6 (DDHH) y 7 (Ley Nacional sobre Uso de la Fuerza)',
    categories: [5, 6, 7],
    categoriesText: 'Cat. 5: Armas y Explosivos + Cat. 6: DDHH + Cat. 7: Uso de la Fuerza',
    durationMinutes: 60,
    totalQuestions: 3,
    minPassingScore: 2,
    questions: [
      {
        id: 's4-q1',
        portionId: '5.1',
        categoryId: 5,
        question: 'De conformidad con el Artículo 11 de la Ley Federal de Armas de Fuego y Explosivos, es calibre de uso exclusivo militar:',
        options: [
          'El calibre 9 mm Parabellum y el calibre .45 Auto.',
          'El calibre .22 corto para tiro deportivo.',
          'El calibre .380 para protección del hogar registrado.',
          'Los proyectiles de fogueo para prácticas cinemáticas.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'LFAFE, Art. 11',
        explanation: 'Las pistolas calibre 9mm Luger/Parabellum y .45 Auto son reservadas para el Ejército, Armada y FAM.'
      },
      {
        id: 's4-q2',
        portionId: '6.1',
        categoryId: 6,
        question: 'Los 4 principios rectores de los Derechos Humanos que todo militar debe observar son:',
        options: [
          'Universalidad, Interdependencia, Indivisibilidad y Progresividad.',
          'Celeridad, Racionalidad, Discreción y Jerarquía.',
          'Obediencia, Severidad, Corrección y Aislamiento.',
          'Mando, Disciplina, Fuego y Maniobra.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Manual de DDHH SEDENA, Cap. II',
        explanation: 'Los 4 principios universales constitucionales: Universalidad, Interdependencia, Indivisibilidad y Progresividad.'
      },
      {
        id: 's4-q3',
        portionId: '7.1',
        categoryId: 7,
        question: 'Conforme al Artículo 12 de la Ley Nacional sobre el Uso de la Fuerza, ¿cuándo se autoriza el uso de la fuerza letal?',
        options: [
          'En cualquier momento en que un ciudadano desobedezca verbalmente.',
          'Exclusivamente en defensa de la vida propia o de terceros frente a agresión real, actual o inminente.',
          'Para dispersar cualquier manifestación pública en la vía pública.',
          'Cuando lo decida libremente el centinela sin justificación objetiva.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'LNUF, Art. 12',
        explanation: 'La fuerza letal es el último recurso y solo procede ante agresión que ponga en peligro real la vida.'
      }
    ]
  },
  {
    id: 'sim-5',
    number: 5,
    title: 'Simulacro 5: Táctica de Infantería',
    subtitle: 'Categoría 8: Maniobra, Factores METTT-C y Combate Ofensivo/Defensivo',
    categories: [8],
    categoriesText: 'Cat. 8: Manual de Táctica de Infantería',
    durationMinutes: 60,
    totalQuestions: 3,
    minPassingScore: 2,
    questions: [
      {
        id: 's5-q1',
        portionId: '8.1',
        categoryId: 8,
        question: '¿Cuál es la misión fundamental del Arma de Infantería según su Manual de Táctica?',
        options: [
          'Cerrar con el enemigo mediante el fuego y el movimiento para destruirlo, capturarlo o desalojarlo de sus posiciones.',
          'Construir exclusivamente puentes y caminos de campaña en la retaguardia.',
          'Operar aeronaves de transporte pesado a gran altitud.',
          'Administrar los almacenes de víveres generales del Estado Mayor.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Manual de Táctica de Infantería, Cap. I',
        explanation: 'Cerrar con el enemigo mediante el fuego y el movimiento es la misión esencial y gloriosa de la Infantería.'
      },
      {
        id: 's5-q2',
        portionId: '8.1',
        categoryId: 8,
        question: 'La forma de maniobra ofensiva que busca rodear el flanco enemigo para caer sobre su retaguardia se denomina:',
        options: [
          'Envolvimiento.',
          'Penetración frontal.',
          'Ataque demostrativo.',
          'Repliegue táctico retardador.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Manual de Táctica de Infantería, Cap. IV',
        explanation: 'El Envolvimiento evita el fuerte de la posición frontal del enemigo para rodear su flanco y golpear la retaguardia.'
      },
      {
        id: 's5-q3',
        portionId: '8.1',
        categoryId: 8,
        question: '¿Qué maniobra ofensiva consiste en golpear frontalmente con energía la línea enemiga para dividirla en dos?',
        options: [
          'La Penetración.',
          'El Envolvimiento doble.',
          'El rodeo estratégico.',
          'La infiltración nocturna de francotiradores.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Manual de Táctica de Infantería, Cap. IV',
        explanation: 'La Penetración rompe el dispositivo enemigo frontal mediante el empuje concentrado y fuego potente.'
      }
    ]
  },
  {
    id: 'sim-6',
    number: 6,
    title: 'Simulacro 6: Examen General EMS 2026 (Examen Integral)',
    subtitle: 'Evaluación Completa: 8 Categorías, 115 Preguntas Reales, Tiempo Límite 120 Minutos',
    categories: [1, 2, 3, 4, 5, 6, 7, 8],
    categoriesText: 'Examen Completo Compendio EMS 2026 (Las 8 Categorías)',
    durationMinutes: 120,
    totalQuestions: 12,
    minPassingScore: 10,
    questions: [
      {
        id: 's6-q1',
        portionId: '1.1',
        categoryId: 1,
        question: 'El Artículo 3 de la Ley de Disciplina fundamenta la disciplina militar en:',
        options: [
          'La obediencia, y un alto concepto del honor, de la justicia y de la moral.',
          'La antigüedad, las notas de mérito y la edad biológica.',
          'El pago puntual de gratificaciones y sobresueldos.',
          'La aprobación de la asamblea civil municipal.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Ley de Disciplina, Art. 3',
        explanation: 'Art. 3 Ley de Disciplina: Obediencia, honor, justicia y moral.'
      },
      {
        id: 's6-q2',
        portionId: '1.3',
        categoryId: 1,
        question: 'Límite máximo de arresto para Oficiales según el Artículo 33 de la Ley de Disciplina:',
        options: [
          'Hasta por 8 días en cuarteles o alojamientos.',
          'Hasta por 15 días en celdas subterráneas.',
          'Hasta por 30 días con trabajo de fatiga.',
          'Hasta por 24 horas sin alimentos.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Ley de Disciplina, Art. 33',
        explanation: 'Art. 33 Ley de Disciplina: Oficiales hasta por 8 días.'
      },
      {
        id: 's6-q3',
        portionId: '1.3',
        categoryId: 1,
        question: 'Límite máximo de arresto para el personal de Tropa según el Artículo 33 Bis:',
        options: [
          '8 días.',
          '15 días.',
          '45 días.',
          '3 meses.'
        ],
        correctOptionIndex: 1,
        legalBasis: 'Ley de Disciplina, Art. 33 Bis',
        explanation: 'Art. 33 Bis Ley de Disciplina: Tropa hasta por 15 días.'
      },
      {
        id: 's6-q4',
        portionId: '1.2',
        categoryId: 1,
        question: 'Los tres únicos correctivos disciplinarios legales del Artículo 24 de la Ley de Disciplina son:',
        options: [
          'Amonestación, Arresto y Cambio de cuerpo o dependencia.',
          'Amonestación, Multa y Reducción salarial.',
          'Extrañamiento, Juicio penal y Baja forzosa.',
          'Arresto, Confiscación y Retención de pertenencias.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Ley de Disciplina, Art. 24',
        explanation: 'Art. 24: I. Amonestación; II. Arresto; III. Cambio de cuerpo o dependencia.'
      },
      {
        id: 's6-q5',
        portionId: '2.2',
        categoryId: 2,
        question: 'Según el Artículo 82 del RGDM, el Sargento 1/o. tiene como función principal:',
        options: [
          'Ser en la clase de tropa el de mayor jerarquía y el auxilio inmediato del Capitán.',
          'Custodiar el polvorín general de la zona militar de forma permanente.',
          'Mandar la brigada de blindados en ausencia del General de División.',
          'Realizar auditorías fiscales a proveedores de vestuario militar.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'RGDM, Art. 82',
        explanation: 'Art. 82 RGDM: Cúspide de la tropa y apoyo inmediato del Capitán.'
      },
      {
        id: 's6-q6',
        portionId: '3.1',
        categoryId: 3,
        question: 'Comete delito de insubordinación según el Artículo 281 del CJM el que:',
        options: [
          'Con palabras, ademanes o señas falte al respeto o amenace a un superior.',
          'Pierda una cantimplora durante una marcha táctica nocturna.',
          'No asista a un partido de fútbol deportivo del regimiento.',
          'Solicite un pase de salida con 24 horas de anticipación.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'CJM, Art. 281',
        explanation: 'Art. 281 CJM: Falta de respeto o amenaza hacia un superior.'
      },
      {
        id: 's6-q7',
        portionId: '3.2',
        categoryId: 3,
        question: 'En tiempo de paz, la deserción de tropa se consuma formalmente al faltar a:',
        options: [
          '3 listas consecutivas o ausentarse más de 72 horas sin causa justificada.',
          'Una sola lista matutina con justificante del médico.',
          'Un servicio de aseo en la cocina de tropa.',
          'Dos meses continuos de desfile cívico militar.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'CJM, Art. 256',
        explanation: 'Art. 256 CJM: Faltar a 3 listas consecutivas o más de 72 horas.'
      },
      {
        id: 's6-q8',
        portionId: '4.1',
        categoryId: 4,
        question: 'El auxilio a la población civil en casos de desastre (Plan DN-III-E) corresponde a qué misión de la Ley Orgánica:',
        options: [
          'Misión V (Fracción V del Artículo 1).',
          'Misión I (Defensa exterior).',
          'Misión II (Seguridad interior).',
          'Misión IV (Obras públicas de infraestructura).'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Ley Orgánica, Art. 1 fr. V',
        explanation: 'Fracción V: Auxilio en desastres y Plan DN-III-E.'
      },
      {
        id: 's6-q9',
        portionId: '5.1',
        categoryId: 5,
        question: 'Es calibre de pistola reservado para uso exclusivo del Ejército según la LFAFE:',
        options: [
          'Calibre 9 mm Parabellum y .45 Auto.',
          'Calibre .22 LR.',
          'Calibre .25 ACP.',
          'Calibre 6 mm para pistolas de perdigones.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'LFAFE, Art. 11',
        explanation: 'Art. 11 LFAFE: 9mm Parabellum y .45 Auto son de uso exclusivo militar.'
      },
      {
        id: 's6-q10',
        portionId: '6.1',
        categoryId: 6,
        question: 'Respecto a la tortura en operaciones militares, el Manual de DDHH SEDENA prescribe:',
        options: [
          'Queda terminantemente prohibida en toda circunstancia y sin excepción alguna.',
          'Se permite si la persona detenida confiesa pertenecer a un grupo delictivo.',
          'Se autoriza si media una orden verbal del jefe de operaciones.',
          'Es optativa si el militar actúa en legítima defensa pasiva.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Manual de DDHH SEDENA, Cap. III',
        explanation: 'La tortura está categóricamente proscrita en todo momento y lugar.'
      },
      {
        id: 's6-q11',
        portionId: '7.1',
        categoryId: 7,
        question: 'Los 5 principios del uso de la fuerza según el Artículo 4 de la Ley Nacional son:',
        options: [
          'Legalidad, Necesidad, Proporcionalidad, Racionalidad y Oportunidad.',
          'Audacia, Sorpresa, Rapidez, Destrucción y Fuego.',
          'Jerarquía, Antigüedad, Castigo, Retención y Aislamiento.',
          'Mando, Subordinación, Severidad, Corrección y Fatiga.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'LNUF, Art. 4',
        explanation: 'Art. 4 LNUF: Legalidad, Necesidad, Proporcionalidad, Racionalidad y Oportunidad.'
      },
      {
        id: 's6-q12',
        portionId: '8.1',
        categoryId: 8,
        question: 'La maniobra ofensiva que busca rodear el flanco enemigo para golpear su retaguardia es:',
        options: [
          'El Envolvimiento.',
          'La Penetración.',
          'El Fuego de hostigamiento aéreo.',
          'La Emboscada pasiva.'
        ],
        correctOptionIndex: 0,
        legalBasis: 'Manual de Táctica de Infantería, Cap. IV',
        explanation: 'El Envolvimiento rodea el flanco hacia la retaguardia para cortar la retirada.'
      }
    ]
  }
];
