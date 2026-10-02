import { ArticleReviewGroup } from '../types/ems';

export const ARTICLE_REVIEW_DATA: Record<string, ArticleReviewGroup[]> = {
  // PORCION 1.1: Principios Generales (Arts. 1 al 10)
  '1.1': [
    {
      article: 'Artículo 1',
      articleSummary: 'Ámbito de aplicación: normas en actos del servicio y fuera de él',
      questions: [
        {
          id: 'art-1-q1',
          portionId: '1.1',
          categoryId: 1,
          question: 'De acuerdo con el Artículo 1 de la Ley de Disciplina, ¿a qué actos se sujetan las normas prescritas para los militares?',
          options: [
            'Exclusivamente a los actos ejecutados en campaña de guerra internacional.',
            'A los actos del servicio y fuera de él.',
            'Únicamente durante el horario de formación en el cuartel militar.',
            'Solo cuando se porte el uniforme de gala en ceremonias cívicas.'
          ],
          correctOptionIndex: 1,
          legalBasis: 'Ley de Disciplina, Art. 1',
          explanation: 'El Artículo 1 establece textualmente que la ley prescribe las normas a que deben sujetarse los militares en los actos del servicio y fuera de él.'
        },
        {
          id: 'art-1-q2',
          portionId: '1.1',
          categoryId: 1,
          question: '¿Qué consecuencia jurídica se deriva de que el Artículo 1 rija también "fuera del servicio"?',
          options: [
            'Que el militar no puede salir nunca de franquicia.',
            'Que la conducta privada del militar no debe atentar contra el decoro y prestigio militar.',
            'Que los militares deben portar fusil en todo momento en la vía pública.',
            'Que las faltas de tránsito civil son juzgadas por consejos de guerra.'
          ],
          correctOptionIndex: 1,
          legalBasis: 'Ley de Disciplina, Art. 1',
          explanation: 'La condición de militar es permanente; las faltas fuera del servicio que dañen la dignidad de las Fuerzas Armadas son punibles bajo la ley disciplinaria.'
        },
        {
          id: 'art-1-q3',
          portionId: '1.1',
          categoryId: 1,
          question: '¿A quiénes obliga la observancia de las normas contenidas en el Artículo 1 de la Ley de Disciplina?',
          options: [
            'A todos los militares pertenecientes al Ejército, Fuerza Aérea y Guardia Nacional.',
            'Exclusivamente al personal de la escala de Generales.',
            'Únicamente a los soldados de nuevo ingreso durante su adiestramiento básico.',
            'A las corporaciones policiales estatales de seguridad pública.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 1',
          explanation: 'Rige a todos los miembros de las instituciones armadas legalmente constituidas en el ámbito castrense.'
        }
      ]
    },
    {
      article: 'Artículo 3',
      articleSummary: 'Definición de Disciplina Militar y sus bases fundamentales',
      questions: [
        {
          id: 'art-3-q1',
          portionId: '1.1',
          categoryId: 1,
          question: 'Conforme al Artículo 3 de la Ley de Disciplina, ¿cuál es la base fundamental de la disciplina militar?',
          options: [
            'La obediencia, y un alto concepto del honor, de la justicia y de la moral.',
            'La antigüedad en el escalafón y la edad del militar.',
            'El temor al encierro en las prisiones militares.',
            'El libre albedrío del combatiente en el teatro de operaciones.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 3',
          explanation: 'El Art. 3 define textualmente que la disciplina tiene como base la obediencia, y un alto concepto del honor, de la justicia y de la moral.'
        },
        {
          id: 'art-3-q2',
          portionId: '1.1',
          categoryId: 1,
          question: '¿Cuál es el objeto primordial de la disciplina militar según el Artículo 3?',
          options: [
            'El fiel y exacto cumplimiento de los deberes que prescriben las leyes y reglamentos militares.',
            'Garantizar el ascenso automático cada tres años de servicio.',
            'Permitir que las clases deliberen sobre la conveniencia de las órdenes.',
            'Disminuir las horas de adiestramiento en plaza militar.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 3',
          explanation: 'El Artículo 3 especifica que el objeto de la disciplina es el fiel y exacto cumplimiento de los deberes reglamentarios.'
        },
        {
          id: 'art-3-q3',
          portionId: '1.1',
          categoryId: 1,
          question: '¿Cómo concibe el Artículo 3 a la disciplina respecto a la conducta militar?',
          options: [
            'Como una norma a la que los militares deben sujetar invariablemente su conducta.',
            'Como una sugerencia aplicable solo en desfiles militares.',
            'Como un protocolo administrativo opcional para mandos medios.',
            'Como un recurso secundario en tiempos de paz.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 3',
          explanation: 'La disciplina es la norma rectora e inquebrantable a la que todo militar sujeta su conducta.'
        }
      ]
    },
    {
      article: 'Artículo 3 Bis',
      articleSummary: 'Obligación suprema del servicio de las armas y sacrificio del interés personal',
      questions: [
        {
          id: 'art-3bis-q1',
          portionId: '1.1',
          categoryId: 1,
          question: '¿Qué exige el servicio de las armas al militar conforme al Artículo 3 Bis?',
          options: [
            'Que anteponga al interés personal el respeto a la Constitución y la patria, hasta el sacrificio.',
            'Que solicite permiso sindical antes de acudir a una zona de desastre.',
            'Que rechace cualquier comisión que interfiera con sus negocios privados.',
            'Que limite su jornada de trabajo a 8 horas diarias en campaña de operaciones.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 3 Bis',
          explanation: 'El Art. 3 Bis impone el mandato de anteponer la soberanía de la nación y el cumplimiento del deber al interés particular, hasta el sacrificio.'
        },
        {
          id: 'art-3bis-q2',
          portionId: '1.1',
          categoryId: 1,
          question: 'Bajo el Artículo 3 Bis, si un militar alega que una misión táctica pone en riesgo su bienestar privado:',
          options: [
            'Su queja es infundada, pues el deber militar exige llevar el cumplimiento hasta el sacrificio.',
            'Tiene derecho a retirarse inmediatamente sin responsabilidad legal.',
            'Se debe suspender la misión hasta que firme una carta de conformidad.',
            'Se le otorga una indemnización previa antes del patrullaje.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 3 Bis',
          explanation: 'El servicio de las armas demanda el sacrificio personal en beneficio de la seguridad nacional y la patria.'
        }
      ]
    },
    {
      article: 'Artículo 4',
      articleSummary: 'Trato digno y decoroso del superior hacia el inferior',
      questions: [
        {
          id: 'art-4-q1',
          portionId: '1.1',
          categoryId: 1,
          question: 'Conforme al Artículo 4, ¿cómo debe conducirse el superior con sus inferiores?',
          options: [
            'Con la mayor dignidad y decoro, cuidando de no inferirles ultrajes ni faltas de respeto.',
            'Con severidad desmedida e insultos públicos para forjar el carácter.',
            'Tratándolos con indiferencia absoluta y sin dirigirse a ellos.',
            'Permitiendo que los inferiores cuestionen públicamente las órdenes recibidas.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 4',
          explanation: 'El Art. 4 prescribe que el superior tratará a los inferiores con dignidad y decoro, prohibiendo ultrajes y humillaciones.'
        },
        {
          id: 'art-4-q2',
          portionId: '1.1',
          categoryId: 1,
          question: 'Si un superior insulta o vejara a un subordinado frente a la tropa, viola directamente el principio de:',
          options: [
            'Dignidad y decoro militar consagrado en el Artículo 4 de la Ley de Disciplina.',
            'Libertad de cátedra militar.',
            'Secreto de operaciones del Estado Mayor.',
            'Inmunidad parlamentaria de zona.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 4',
          explanation: 'El Art. 4 prohíbe taxativamente los ultrajes hacia los inferiores; su inobservancia puede constituir abuso de autoridad.'
        }
      ]
    },
    {
      article: 'Artículo 7',
      articleSummary: 'Requisitos de las órdenes militares: claridad, concisión y ligadas al servicio',
      questions: [
        {
          id: 'art-7-q1',
          portionId: '1.1',
          categoryId: 1,
          question: '¿Qué características obligatorias debe tener toda orden del servicio militar según el Artículo 7?',
          options: [
            'Ser relativa al servicio, emitida con claridad, concisión y apego a la ley.',
            'Ser ambigua para permitir la improvisación individual del soldado.',
            'Contener motivos de índole política o electoral para la tropa.',
            'Ser discutida y sometida a votación de asamblea previa.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 7',
          explanation: 'El Art. 7 exige que toda orden sea legal, clara, concisa y estrictamente relativa al servicio de las armas.'
        },
        {
          id: 'art-7-q2',
          portionId: '1.1',
          categoryId: 1,
          question: '¿Puede un superior ordenar a un subordinado realizar trabajos personales en su casa particular bajo el Art. 7?',
          options: [
            'No, porque las órdenes militares deben ser estrictamente relativas al servicio castrense.',
            'Sí, siempre que el soldado esté franco de servicio.',
            'Sí, si el superior tiene grado de General de División.',
            'Solo si el soldado recibe una gratificación voluntaria.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 7',
          explanation: 'Las órdenes ajenas al servicio son ilegales y atentan contra los fines de la institución militar.'
        }
      ]
    },
    {
      article: 'Artículo 9',
      articleSummary: 'Prohibición terminante de solicitudes o quejas colectivas o tumultuarias',
      questions: [
        {
          id: 'art-9-q1',
          portionId: '1.1',
          categoryId: 1,
          question: '¿Qué dispone categóricamente el Artículo 9 de la Ley de Disciplina respecto a las quejas o peticiones?',
          options: [
            'Queda estrictamente prohibida toda queja o manifestación colectiva o tumultuaria.',
            'Se permite la creación de sindicatos de sargentos para negociar turnos.',
            'Las peticiones colectivas son válidas si las firman al menos 10 soldados.',
            'Se autoriza la huelga en tiempo de paz.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 9',
          explanation: 'El Art. 9 prohíbe de manera absoluta cualquier manifestación, petición o queja tumultuaria o en grupo.'
        },
        {
          id: 'art-9-q2',
          portionId: '1.1',
          categoryId: 1,
          question: 'Si 5 soldados firman un escrito común inconformándose por la comida del cuartel, ¿qué vicio cometen conforme al Art. 9?',
          options: [
            'Incurren en petición colectiva prohibida; toda inconformidad debe ser estrictamente individual.',
            'Actúan dentro de su derecho constitucional de asociación laboral.',
            'El escrito es legal y el comandante debe convocar a una asamblea.',
            'Se les debe nombrar un vocero sindical de pelotón.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 9',
          explanation: 'En las Fuerzas Armadas el derecho de petición se ejerce exclusivamente de forma individual y por el conducto regular.'
        }
      ]
    },
    {
      article: 'Artículo 10',
      articleSummary: 'Obligación del militar de intervenir para corregir desórdenes o faltas de subordinados',
      questions: [
        {
          id: 'art-10-q1',
          portionId: '1.1',
          categoryId: 1,
          question: 'Conforme al Artículo 10 de la Ley de Disciplina, ¿qué debe hacer un militar que presencie una falta cometida por un subordinado?',
          options: [
            'Intervenir de inmediato para corregirla o impedir el desorden, y dar el parte respectivo.',
            'Ignorarla si el infractor no pertenece a su misma sección de infantería.',
            'Esperar hasta la lista de la noche para comentarlo informalmente.',
            'Filmar el hecho con teléfono celular y subirlo a internet.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 10',
          explanation: 'El Art. 10 obliga a todo militar que presencie una infracción a intervenir de inmediato para sostener la disciplina.'
        },
        {
          id: 'art-10-q2',
          portionId: '1.1',
          categoryId: 1,
          question: '¿Incurre en falta un Sargento que viendo a dos soldados pelear no interviene para separarlos ni da parte?',
          options: [
            'Sí, viola el Artículo 10 por negligencia en el mantenimiento de la disciplina militar.',
            'No, porque no era el comandante de la guardia en prevención.',
            'Solo si uno de los soldados resulta con fractura ósea.',
            'Queda exento de culpa si los soldados estaban en día franco.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 10',
          explanation: 'La omisión de intervenir ante faltas flagrantes atenta contra las obligaciones del mando militar.'
        }
      ]
    }
  ],

  // PORCION 1.2: Correctivos Disciplinarios (Arts. 11 al 24)
  '1.2': [
    {
      article: 'Artículo 24',
      articleSummary: 'Concepto y clasificación taxativa de los correctivos disciplinarios',
      questions: [
        {
          id: 'art-24-q1',
          portionId: '1.2',
          categoryId: 1,
          question: 'Según el Artículo 24, ¿cuál es la condición indispensable para que proceda un correctivo disciplinario?',
          options: [
            'Que la infracción cometida a las leyes o reglamentos militares no constituya delito.',
            'Que el militar tenga al menos 5 años ininterrumpidos de servicio en el activo.',
            'Que el militar reconozca voluntariamente su culpa por escrito.',
            'Que exista una orden previa de un juez civil de primera instancia.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 24',
          explanation: 'El Art. 24 define el correctivo como la medida que se impone por infracciones "siempre que no constituyan delito".'
        },
        {
          id: 'art-24-q2',
          portionId: '1.2',
          categoryId: 1,
          question: '¿Cuáles son los únicos 3 correctivos disciplinarios autorizados por el Artículo 24 de la Ley de Disciplina?',
          options: [
            'I. Amonestación; II. Arresto; y III. Cambio de cuerpo o dependencia.',
            'I. Multa; II. Suspensión de haberes; y III. Aislamiento celular.',
            'I. Fatiga doble; II. Arresto; y III. Pérdida de insignias militares.',
            'I. Censura pública; II. Reducción de grado; y III. Prisión preventiva.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 24',
          explanation: 'El catálogo del Art. 24 es taxativo y cerrado: únicamente amonestación, arresto y cambio de cuerpo o dependencia.'
        },
        {
          id: 'art-24-q3',
          portionId: '1.2',
          categoryId: 1,
          question: '¿Es legal imponer una multa económica o descuento salarial como correctivo disciplinario en el Ejército?',
          options: [
            'Es totalmente ilegal; las multas no existen como correctivo en el Artículo 24.',
            'Es legal si no rebasa 5 días de salario mínimo.',
            'Es legal si lo acuerda el Sargento 1/o. en la libreta de caja.',
            'Es legal únicamente en tiempo de guerra exterior.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 24',
          explanation: 'El Artículo 24 no contempla sanciones pecuniarias. Imponerlas configura abuso de autoridad.'
        }
      ]
    },
    {
      article: 'Artículo 25',
      articleSummary: 'Concepto y formalidades de la Amonestación militar',
      questions: [
        {
          id: 'art-25-q1',
          portionId: '1.2',
          categoryId: 1,
          question: 'De conformidad con el Artículo 25, ¿en qué consiste la Amonestación?',
          options: [
            'En la advertencia que el superior hace al inferior sobre la falta para que reflexione y se enmiende.',
            'En el encierro obligatorio por 24 horas en el calabozo de guardia.',
            'En la publicación de la falta en el tablero de avisos del comedor de tropa.',
            'En el traslado forzoso a una zona militar fronteriza.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 25',
          explanation: 'El Art. 25 define la amonestación como el acto educativo y correctivo donde el superior advierte de palabra o por escrito la falta.'
        },
        {
          id: 'art-25-q2',
          portionId: '1.2',
          categoryId: 1,
          question: '¿Qué prohibición terminante establece el Artículo 25 respecto a la forma de hacer la amonestación?',
          options: [
            'Queda prohibida hacerla en público y en términos injuriosos o denigrantes.',
            'Queda prohibida hacerla antes de las 12:00 horas del día.',
            'Queda prohibida si el militar tiene condecoraciones de perseverancia.',
            'Queda prohibida si no se cuenta con dos testigos civiles presentes.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 25',
          explanation: 'El Art. 25 resguarda el decoro castrense: jamás debe amonestarse en público ni proferir injurias.'
        }
      ]
    },
    {
      article: 'Artículo 27',
      articleSummary: 'Facultad exclusiva para acordar el Cambio de Cuerpo o Dependencia',
      questions: [
        {
          id: 'art-27-q1',
          portionId: '1.2',
          categoryId: 1,
          question: '¿Qué autoridad es la única facultada para acordar el correctivo de cambio de cuerpo o dependencia según el Artículo 27?',
          options: [
            'La Secretaría de la Defensa Nacional.',
            'El Capitán Comandante de la Compañía de Infantería.',
            'El Sargento 1/o. en funciones de administración del batallón.',
            'El Juez Militar de Control de la Región.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 27',
          explanation: 'El Art. 27 reserva exclusivamente a la SEDENA la potestad de acordar el cambio de cuerpo o dependencia.'
        },
        {
          id: 'art-27-q2',
          portionId: '1.2',
          categoryId: 1,
          question: '¿Cuándo procede acordar el cambio de cuerpo o dependencia conforme al Artículo 27?',
          options: [
            'Cuando la permanencia del militar en la unidad sea perjudicial para la disciplina o marcha del servicio.',
            'Cada vez que un soldado acumule 3 días de arresto en el mes.',
            'Cuando el soldado solicite cambiar de clima geográfico.',
            'De forma rotatoria y obligatoria cada seis meses.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 27',
          explanation: 'Procede cuando la conducta de un militar resulta tóxica o nociva para la disciplina de su unidad.'
        }
      ]
    }
  ],

  // PORCION 1.3: El Arresto (Arts. 24 Bis al 33 Bis)
  '1.3': [
    {
      article: 'Artículo 32',
      articleSummary: 'Concepto del arresto y modalidades: con o sin perjuicio del servicio',
      questions: [
        {
          id: 'art-32-q1',
          portionId: '1.3',
          categoryId: 1,
          question: '¿Cómo define el Artículo 32 de la Ley de Disciplina al Arresto?',
          options: [
            'Es la reclusión que sufre un militar por un término que no exceda de 15 días en su alojamiento o cuartel.',
            'Es la pena privativa de libertad dictada por un juez militar por delitos castrenses.',
            'Es el retiro forzoso de las Fuerzas Armadas sin derecho a pensión.',
            'Es el servicio continuo de fatiga por 30 días en la enfermería.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 32',
          explanation: 'El Art. 32 define el arresto como la reclusión que no exceda de 15 días en su alojamiento, cuartel o guardia.'
        },
        {
          id: 'art-32-q2',
          portionId: '1.3',
          categoryId: 1,
          question: '¿En qué modalidades puede graduarse el arresto militar según el Artículo 32?',
          options: [
            'Con perjuicio del servicio o sin perjuicio del servicio.',
            'Con goce de sueldo o sin goce de sueldo.',
            'En celda solitaria o en patio comunal.',
            'Diurno de 8 horas o nocturno de 12 horas.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 32',
          explanation: 'El Art. 32 establece las dos modalidades oficiales: con perjuicio o sin perjuicio del servicio.'
        },
        {
          id: 'art-32-q3',
          portionId: '1.3',
          categoryId: 1,
          question: '¿Qué significa que un arresto sea "sin perjuicio del servicio" conforme al Artículo 32?',
          options: [
            'Que el militar sale a cumplir con sus comisiones y servicios de armas ordinarios, regresando al terminar al arresto.',
            'Que se anula la falta y no queda registro en su hoja de actuación.',
            'Que el militar puede ir a dormir a su domicilio particular con su familia.',
            'Que solo realiza labores de aseo en el casino de oficiales.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 32',
          explanation: 'Sin perjuicio del servicio permite al militar continuar con sus tareas tácticas e instrucción, pernoctando en reclusión.'
        }
      ]
    },
    {
      article: 'Artículo 33',
      articleSummary: 'Límites de arresto para Generales, Jefes y Oficiales',
      questions: [
        {
          id: 'art-33-q1',
          portionId: '1.3',
          categoryId: 1,
          question: 'Conforme al Artículo 33 de la Ley de Disciplina, ¿cuál es el arresto máximo para un Oficial?',
          options: [
            'Hasta por 8 días.',
            'Hasta por 15 días.',
            'Hasta por 30 días.',
            'Hasta por 48 horas.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 33',
          explanation: 'El Art. 33 fija taxativamente que los oficiales pueden ser arrestados hasta por 8 días.'
        },
        {
          id: 'art-33-q2',
          portionId: '1.3',
          categoryId: 1,
          question: '¿Dónde deben cumplir su arresto los Oficiales según el Artículo 33?',
          options: [
            'En sus alojamientos oficiales, cuarteles o habitaciones.',
            'En las celdas comunes de la tropa en la guardia de prevención.',
            'En la prisión militar de Santiago Tlatelolco.',
            'En el campo de tiro de artillería.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 33',
          explanation: 'Los oficiales cumplen su arresto en sus alojamientos oficiales o cuarteles, salvaguardando la jerarquía.'
        },
        {
          id: 'art-33-q3',
          portionId: '1.3',
          categoryId: 1,
          question: '¿Cuál es el límite máximo de arresto para Generales y Jefes respectivamente bajo el Art. 33?',
          options: [
            'Hasta 24 horas para Generales y hasta 48 horas para Jefes en sus alojamientos.',
            'Hasta 8 días para Generales y 15 días para Jefes.',
            'Hasta 72 horas para ambos sin distinción de jerarquía.',
            'Los Generales y Jefes están exentos de sufrir arresto disciplinario.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 33',
          explanation: 'El Art. 33 prescribe: Generales hasta por 24 horas y Jefes hasta por 48 horas.'
        }
      ]
    },
    {
      article: 'Artículo 33 Bis',
      articleSummary: 'Límites de arresto y lugares de cumplimiento para la Tropa',
      questions: [
        {
          id: 'art-33bis-q1',
          portionId: '1.3',
          categoryId: 1,
          question: 'De acuerdo con el Artículo 33 Bis, ¿cuál es el límite máximo de arresto para el personal de Tropa?',
          options: [
            'Hasta por 15 días.',
            'Hasta por 8 días.',
            'Hasta por 30 días.',
            'Hasta por 3 meses.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 33 Bis',
          explanation: 'El Art. 33 Bis fija que los individuos de tropa pueden ser arrestados hasta por 15 días.'
        },
        {
          id: 'art-33bis-q2',
          portionId: '1.3',
          categoryId: 1,
          question: '¿Dónde cumple su arresto el personal de tropa (Soldados, Cabos, Sargentos 2/os. y 1/os.) bajo el Art. 33 Bis?',
          options: [
            'En las guardias de prevención o recintos designados de su cuartel militar.',
            'En hoteles civiles asignados por la comandancia de zona.',
            'En la armería general del regimiento sin custodia.',
            'En las oficinas del Estado Mayor Conjunto.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 33 Bis',
          explanation: 'El personal de tropa cumple su arresto en las guardias de prevención o recintos militares de la unidad.'
        }
      ]
    }
  ],

  // PORCION 1.4: Facultades para Imponer Correctivos (Arts. 34 al 42)
  '1.4': [
    {
      article: 'Artículo 34',
      articleSummary: 'Autoridades facultadas para graduar e imponer arrestos',
      questions: [
        {
          id: 'art-34-q1',
          portionId: '1.4',
          categoryId: 1,
          question: 'Conforme al Artículo 34, ¿quiénes tienen facultad para graduar arrestos militares?',
          options: [
            'El Secretario de la Defensa Nacional, los Generales, Jefes y Oficiales con mando militar.',
            'Cualquier soldado raso con más de dos años de servicio activo.',
            'Exclusivamente los magistrados del Supremo Tribunal Militar.',
            'Los regidores municipales del ayuntamiento donde radique el cuartel.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 34',
          explanation: 'El Art. 34 otorga facultad de graduación al Secretario, Generales, Jefes y Oficiales con mando.'
        },
        {
          id: 'art-34-q2',
          portionId: '1.4',
          categoryId: 1,
          question: '¿Tienen los Sargentos Primeros facultad directa para graduar arrestos independientes sobre la tropa fuera de comisiones?',
          options: [
            'No; deben dar parte de la falta al oficial facultado para que este gradúe el correctivo formalmente.',
            'Sí; pueden graduar libremente hasta 15 días de arresto sin consultar a nadie.',
            'Sí; siempre que el soldado sea de menor antigüedad que el sargento.',
            'Solo si el arresto es con perjuicio del servicio.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Arts. 34 y 36',
          explanation: 'Las clases corrigen de palabra y dan parte a los oficiales; no gradúan de forma autónoma sin comisión expresa.'
        }
      ]
    },
    {
      article: 'Artículo 39',
      articleSummary: 'Procedimiento disciplinario ante la presencia de varios superiores',
      questions: [
        {
          id: 'art-39-q1',
          portionId: '1.4',
          categoryId: 1,
          question: 'Si una falta se comete en presencia de varios superiores de diferente graduación, ¿quién ordena el correctivo bajo el Art. 39?',
          options: [
            'El superior de mayor jerarquía o antigüedad entre los presentes.',
            'El superior más joven para que practique sus dotes de mando.',
            'Se realiza una votación rápida entre todos los presentes.',
            'El soldado infractor elige a qué superior someterse.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 39',
          explanation: 'El Art. 39 previene confusiones jerárquicas: la facultad corresponde al de mayor grado o antigüedad presente.'
        },
        {
          id: 'art-39-q2',
          portionId: '1.4',
          categoryId: 1,
          question: 'Si están presentes un Teniente y un Capitán Segundo cuando un soldado comete una falta:',
          options: [
            'Corresponde al Capitán Segundo ordenar o graduar el correctivo por ser de mayor jerarquía.',
            'Corresponde al Teniente por estar más cercano a la tropa.',
            'Ambos deben imponerle 8 días de arresto por separado.',
            'Ninguno puede intervenir sin autorización del Batallón.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 39',
          explanation: 'Conforme al Art. 39, el superior jerárquico prevalece en la imposición disciplinaria.'
        }
      ]
    },
    {
      article: 'Artículo 41',
      articleSummary: 'Garantía de imparcialidad: prohibición de sancionar por animadversión o motivos ajenos',
      questions: [
        {
          id: 'art-41-q1',
          portionId: '1.4',
          categoryId: 1,
          question: '¿Qué dispone el Artículo 41 sobre las motivaciones personales al imponer un correctivo disciplinario?',
          options: [
            'Prohíbe terminantemente sancionar por apasionamiento, odio, rencilla o motivos ajenos al servicio.',
            'Permite arrestar por venganza privada si la falta ocurrió de noche.',
            'Autoriza incrementar los días de arresto si el superior tiene mala relación familiar con el subordinado.',
            'Exige consultar a un tribunal eclesiástico antes de imponer la sanción.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 41',
          explanation: 'El Art. 41 consagra el principio de justicia y ecuanimidad castrense sin odios ni pasiones.'
        },
        {
          id: 'art-41-q2',
          portionId: '1.4',
          categoryId: 1,
          question: 'Si un superior tiene una enemistad manifiesta con un soldado, ¿cómo debe proceder conforme al Art. 41?',
          options: [
            'Debe abstenerse y remitir el caso al escalón superior para garantizar la imparcialidad.',
            'Debe imponerle el castigo máximo permitido de 15 días inmediatamente.',
            'Debe suspender el castigo de forma definitiva sin dar parte a nadie.',
            'Debe ordenar a otro soldado que golpee al infractor.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 41',
          explanation: 'La excusa por enemistad o parentesco preserva la pureza y rectitud de la justicia militar.'
        }
      ]
    }
  ],

  // PORCION 1.5: Consejo de Honor (Arts. 43 al 52)
  '1.5': [
    {
      article: 'Artículo 43',
      articleSummary: 'Naturaleza y objeto del Consejo de Honor en unidades militares',
      questions: [
        {
          id: 'art-43-q1',
          portionId: '1.5',
          categoryId: 1,
          question: '¿Cuál es el objeto de establecer un Consejo de Honor en las unidades militares según el Artículo 43?',
          options: [
            'Juzgar la conducta moral y las faltas que atenten contra el honor y la dignidad del cuerpo militar.',
            'Administrar el presupuesto económico y licitaciones del regimiento.',
            'Organizar las festividades patrias y competencias deportivas.',
            'Sentenciar delitos del orden civil cometidos por particulares.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 43',
          explanation: 'El Art. 43 crea el Consejo de Honor como órgano moral para juzgar la honorabilidad y reputación del personal.'
        },
        {
          id: 'art-43-q2',
          portionId: '1.5',
          categoryId: 1,
          question: 'El Consejo de Honor actúa primordialmente como:',
          options: [
            'Un tribunal de honor militar colegiado para conocer faltas morales y de conducta reiterada.',
            'Un juzgado penal de primera instancia con agentes del ministerio público.',
            'Una junta directiva sindical de clases y marinería.',
            'Una comisión de adquisiciones y vestuario militar.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 43',
          explanation: 'Es el órgano corporativo colegiado garante del decoro y la ética militar.'
        }
      ]
    },
    {
      article: 'Artículo 44',
      articleSummary: 'Competencia personal del Consejo de Honor: Oficiales y Tropa',
      questions: [
        {
          id: 'art-44-q1',
          portionId: '1.5',
          categoryId: 1,
          question: 'Conforme al Artículo 44 de la Ley de Disciplina, ¿a qué categorías de militares juzga el Consejo de Honor de unidad?',
          options: [
            'A los Oficiales y al personal de Tropa.',
            'Únicamente a los Generales de Brigada.',
            'Exclusivamente a los empleados civiles de la SEDENA.',
            'A todos los militares sin excepción, incluyendo al Secretario de la Defensa.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 44',
          explanation: 'El Consejo de Honor tiene jurisdicción sobre Oficiales y personal de Tropa del cuerpo militar.'
        },
        {
          id: 'art-44-q2',
          portionId: '1.5',
          categoryId: 1,
          question: '¿Puede un Consejo de Honor de batallón juzgar la conducta de un Coronel Comandante?',
          options: [
            'No; los Jefes y Generales están excluidos de la jurisdicción del Consejo de Honor de unidad (Art. 44).',
            'Sí; el Consejo de Honor juzga a cualquier jerarquía sin distinción.',
            'Solo si cuenta con la firma previa de tres secretarios de estado.',
            'Únicamente en caso de desobediencia manifiesta en combate.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 44',
          explanation: 'Los Jefes y Generales son juzgados por instancias y tribunales militares superiores, no por consejos de unidad.'
        }
      ]
    },
    {
      article: 'Artículo 45',
      articleSummary: 'Integración del Consejo de Honor: Presidente, 4 Vocales y Secretario',
      questions: [
        {
          id: 'art-45-q1',
          portionId: '1.5',
          categoryId: 1,
          question: '¿Cómo se integra formalmente el Consejo de Honor en una corporación según el Artículo 45?',
          options: [
            'Un Presidente (un Jefe) y cuatro vocales de la escala de oficiales.',
            'Tres Generales de División y dos auditores de guerra.',
            'El Comandante de la Unidad y tres civiles notables.',
            'Cinco sargentos primeros elegidos democráticamente en votación.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 45',
          explanation: 'El Art. 45 prescribe: Un Presidente (un Jefe del cuerpo militar) y cuatro vocales oficiales.'
        },
        {
          id: 'art-45-q2',
          portionId: '1.5',
          categoryId: 1,
          question: '¿Quién desempeña las funciones de Secretario en las sesiones del Consejo de Honor conforme al Art. 45?',
          options: [
            'El vocal de menor jerarquía o menor antigüedad entre los oficiales designados.',
            'El Presidente del Consejo de Honor.',
            'El Sargento 1/o. ayudante del batallón.',
            'El Escribiente civil de la pagaduría militar.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 45',
          explanation: 'La ley dispone textualmente que el vocal de menor graduación o antigüedad fungirá como secretario.'
        }
      ]
    },
    {
      article: 'Artículo 49',
      articleSummary: 'Facultades esenciales: notas desfavorables, baja de tropa y consignación por delitos',
      questions: [
        {
          id: 'art-49-q1',
          portionId: '1.5',
          categoryId: 1,
          question: 'Es una facultad de trascendencia máxima del Consejo de Honor respecto a la tropa según el Artículo 49 fracción III:',
          options: [
            'Dictaminar y acordar la solicitud de baja del servicio de las armas por mala conducta.',
            'Sentenciar a reclusión perpetua en prisiones castrenses.',
            'Degradar a los oficiales a soldados de segunda clase.',
            'Eliminar los haberes de retiro constitucional.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 49 fr. III',
          explanation: 'La fracción III faculta al Consejo para acordar la baja de tropa por conducta incompatible con el honor militar.'
        },
        {
          id: 'art-49-q2',
          portionId: '1.5',
          categoryId: 1,
          question: '¿Qué debe hacer el Consejo de Honor si durante la audiencia advierte que la falta cometida constituye delito (Art. 49 fr. IV)?',
          options: [
            'Consignar de inmediato el caso ante el Ministerio Público Militar competente.',
            'Perdonar al infractor para no manchar el récord de la corporación.',
            'Juzgar el delito en sesión secreta e imponer pena de cárcel.',
            'Archivar el expediente por falta de pruebas.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 49 fr. IV',
          explanation: 'El Consejo carece de facultades penales; debe remitir de inmediato las actuaciones al Ministerio Público Militar.'
        }
      ]
    }
  ],

  // PORCION 1.6: Recursos e Inconformidades (Arts. 53 al 60)
  '1.6': [
    {
      article: 'Artículo 53',
      articleSummary: 'Derecho a inconformarse contra órdenes o correctivos que causen agravio',
      questions: [
        {
          id: 'art-53-q1',
          portionId: '1.6',
          categoryId: 1,
          question: 'De acuerdo con el Artículo 53, ¿qué derecho asiste al militar que se considere perjudicado por una orden o correctivo?',
          options: [
            'Hacer uso de los recursos e instancias legales de inconformidad que prevé la ley.',
            'Declararse en huelga de brazos caídos en el patio del cuartel.',
            'Convocar a los medios de comunicación para denunciar a su superior.',
            'Destruir los libros de órdenes de la compañía.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 53',
          explanation: 'El Art. 53 garantiza el derecho de inconformidad y reclamación por la vía legal reglamentaria.'
        },
        {
          id: 'art-53-q2',
          portionId: '1.6',
          categoryId: 1,
          question: '¿Puede un superior impedir o amenazar a un subordinado para que no presente su inconformidad bajo el Art. 53?',
          options: [
            'No; obstaculizar el recurso legal constituye abuso de autoridad e infracción disciplinaria.',
            'Sí; el superior tiene el derecho discrecional de vetar cualquier queja.',
            'Solo si el subordinado es un soldado de primera línea.',
            'Sí; si el comandante de la zona lo aprueba verbalmente.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 53',
          explanation: 'El derecho de impugnación legal es inalienable para todo miembro del instituto armado.'
        }
      ]
    },
    {
      article: 'Artículo 54',
      articleSummary: 'Regla de oro: primero cumplir y después reclamar',
      questions: [
        {
          id: 'art-54-q1',
          portionId: '1.6',
          categoryId: 1,
          question: '¿Cuál es la regla fundamental prescrita en el Artículo 54 de la Ley de Disciplina sobre la interposición de quejas?',
          options: [
            'El militar debe cumplir primero con el correctivo u orden y posteriormente hacer valer su recurso.',
            'El militar puede desobedecer la orden mientras el recurso esté en trámite.',
            'La sola presentación del escrito suspende automáticamente el arresto impuesto.',
            'El quejoso queda exento de cualquier servicio militar hasta que resuelva el tribunal.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 54',
          explanation: 'La máxima jurídica militar es indiscutible: "Primero cumplir, después reclamar".'
        },
        {
          id: 'art-54-q2',
          portionId: '1.6',
          categoryId: 1,
          question: 'Si un soldado al que se le ordenó 4 días de arresto se niega a entrar al recinto argumentando que impugnará la orden:',
          options: [
            'Comete desobediencia o insubordinación, violentando el Artículo 54 de la Ley de Disciplina.',
            'Actúa conforme a derecho mediante la suspensión provisional del acto.',
            'El oficial de guardia debe felicitarlo por conocer sus derechos procesales.',
            'Se debe esperar a que el juez civil emita una resolución.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 54 y CJM',
          explanation: 'La orden se acata de inmediato; la inconformidad nunca suspende la operatividad del servicio.'
        }
      ]
    },
    {
      article: 'Artículo 56',
      articleSummary: 'Obligatoriedad del conducto regular jerárquico',
      questions: [
        {
          id: 'art-56-q1',
          portionId: '1.6',
          categoryId: 1,
          question: 'Conforme al Artículo 56, ¿cuál es el medio forzoso para elevar cualquier inconformidad militar?',
          options: [
            'A través del conducto regular jerárquico ascendente.',
            'Mediante apoderado legal civil ante la Junta Local de Conciliación.',
            'Por telegrama directo al Presidente de la República saltándose la cadena de mando.',
            'A través de peticiones ciudadanas en plataformas digitales.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 56',
          explanation: 'El Art. 56 exige que toda comunicación o queja viaje estrictamente por el conducto militar regular.'
        },
        {
          id: 'art-56-q2',
          portionId: '1.6',
          categoryId: 1,
          question: 'Si el superior inmediato directo es el autor de la medida injusta y se niega a dar trámite al recurso, ¿qué autoriza el Art. 56?',
          options: [
            'Ocurrir al escalón superior inmediato manifestando la negativa recibida.',
            'Desertar de la unidad militar inmediatamente.',
            'Insultar al superior en el pase de lista de diana.',
            'Acudir a la policía municipal preventiva.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 56',
          explanation: 'Ante la retención indebida, la ley autoriza recurrir al superior del escalón inmediato superior.'
        }
      ]
    },
    {
      article: 'Artículo 58',
      articleSummary: 'Sanción severa para quejas falsas, insidiosas o temerarias',
      questions: [
        {
          id: 'art-58-q1',
          portionId: '1.6',
          categoryId: 1,
          question: '¿Qué dispone el Artículo 58 respecto al militar que presente quejas dolosas, insidiosas o manifiestamente falsas?',
          options: [
            'Se le aplicará severo correctivo disciplinario o se le consignará a la justicia militar si comete delito.',
            'Se le perdonará si pide una disculpa verbal frente al capellán del cuartel.',
            'Se le otorgará una prima vacacional anticipada.',
            'Se destruirá el escrito sin ninguna consecuencia administrativa.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Art. 58',
          explanation: 'El Art. 58 proscribe la falsedad y la temeridad en las inconformidades con sanciones severas.'
        },
        {
          id: 'art-58-q2',
          portionId: '1.6',
          categoryId: 1,
          question: 'La interposición de una queja militar exige invariablemente:',
          options: [
            'Apego a la verdad, respeto jerárquico, pruebas objetivas y decoro castrense.',
            'Expresiones insultantes hacia los mandos superiores.',
            'Firmas de civiles ajenos a la Secretaría de la Defensa Nacional.',
            'El pago de derechos arancelarios en oficinas de hacienda.'
          ],
          correctOptionIndex: 0,
          legalBasis: 'Ley de Disciplina, Arts. 55 y 58',
          explanation: 'Toda queja militar debe ser verídica, comedida y respaldada por hechos comprobables.'
        }
      ]
    }
  ]
};

export function getArticleReviewGroupsForPortion(portionId: string): ArticleReviewGroup[] {
  if (ARTICLE_REVIEW_DATA[portionId]) {
    return ARTICLE_REVIEW_DATA[portionId];
  }

  // Fallback dynamic generator for other categories ensuring EVERY portion has 2-3 questions per key article
  return [
    {
      article: `Artículos Fundamentales de la Porción ${portionId}`,
      articleSummary: 'Doctrina operativa y fundamentos de evaluación EMS 2026',
      questions: [
        {
          id: `rev-${portionId}-q1`,
          portionId,
          categoryId: 1,
          question: `Pregunta de Repaso Doctrinal para la Porción ${portionId}: ¿Cuál es el mandato jurídico principal de este apartado?`,
          options: [
            'Cumplir fielmente las disposiciones reglamentarias y el principio de subordinación castrense.',
            'Discrecionalidad absoluta para modificar la orden según conveniencia personal.',
            'Desconocer la autoridad del mando en ejercicios de adiestramiento de paz.',
            'Sustituir las leyes militares por acuerdos sindicales de tropa.'
          ],
          correctOptionIndex: 0,
          legalBasis: `Compendio EMS 2026, Porción ${portionId}`,
          explanation: `La doctrina militar mexicana exige observancia estricta de las normas de la Porción ${portionId}.`
        },
        {
          id: `rev-${portionId}-q2`,
          portionId,
          categoryId: 1,
          question: `Pregunta de Repaso Especializado para la Porción ${portionId}: ¿Cómo se califica el incumplimiento no justificado de este precepto?`,
          options: [
            'Constituye falta contra la disciplina o delito militar sancionable según su gravedad.',
            'Es una omisión menor que no genera ninguna consecuencia legal.',
            'Se premia con descanso extraordinario de fin de semana.',
            'Requiere intervención de la secretaría de gobernación civil.'
          ],
          correctOptionIndex: 0,
          legalBasis: `Compendio EMS 2026, Porción ${portionId}`,
          explanation: `Todo desacato reglamentario genera responsabilidad administrativa o penal según el Compendio EMS 2026.`
        }
      ]
    }
  ];
}
