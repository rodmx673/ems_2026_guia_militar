import { Category } from '../types/ems';

export const CATEGORIES_DATA: Category[] = [
  {
    id: 1,
    number: 1,
    name: 'Ley de Disciplina del Ejército, Fuerza Aérea y Guardia Nacional',
    shortName: 'Ley de Disciplina',
    dofDate: '15 de marzo de 1926 (Última reforma DOF 2024)',
    keyArticles: 'Arts. 1, 3, 3 Bis, 10, 24, 24 Bis, 32, 33, 43, 49',
    examWeight: 'ALTO',
    portionsCount: 6,
    badge: 'LEGAL / DISCIPLINARIO',
    color: 'emerald',
    description: 'Norma fundamental que rige la conducta, subordinación militar, graduación de correctivos disciplinarios y el funcionamiento de los Consejos de Honor.',
    keyConcepts: [
      { concept: 'Disciplina Militar', keyData: 'Norma a la que los militares deben sujetar su conducta; tiene como base la obediencia y un alto concepto del honor, la justicia y la moral.', article: 'Art. 3' },
      { concept: 'El Servicio de las Armas', keyData: 'Exige que el militar lleve el cumplimiento del deber hasta el sacrificio y que anteponga al interés personal la soberanía de la nación.', article: 'Art. 3 Bis' },
      { concept: 'Correctivos Disciplinarios', keyData: 'Medidas que se imponen a los militares por infracciones que no constituyan delito: Amonestación, Arresto y Cambio de Unidad/Cuerpo.', article: 'Art. 24' },
      { concept: 'Límite de Arresto a Oficiales', keyData: 'Hasta por 8 días en sus alojamientos militares o cuarteles.', article: 'Art. 33' },
      { concept: 'Límite de Arresto a Tropa', keyData: 'Hasta por 15 días con o sin perjuicio del servicio (en las prisiones militares o guardias de prevención).', article: 'Art. 33 Bis' },
      { concept: 'Facultad para graduar arrestos', keyData: 'Tienen facultad los Generales, Jefes y Oficiales con mando o cargo sobre sus subordinados.', article: 'Art. 34' },
      { concept: 'Consejo de Honor', keyData: 'Órgano colegiado para juzgar faltas contra la moral militar y la dignidad del cuerpo militar.', article: 'Art. 43' }
    ]
  },
  {
    id: 2,
    number: 2,
    name: 'Reglamento General de Deberes Militares',
    shortName: 'Deberes Militares',
    dofDate: '26 de marzo de 1937 (Revisión SEDENA)',
    keyArticles: 'Arts. 1 - 25, 40 - 65, 80 - 110 (Deberes del Sargento 1/o.)',
    examWeight: 'ALTO',
    portionsCount: 7,
    badge: 'DOCTRINA DEL SARGENTO',
    color: 'amber',
    description: 'Establece los deberes comunes a todos los militares y las obligaciones específicas según la jerarquía, destacando el rol del Sargento 1/o. como auxiliar directo del Capitán.',
    keyConcepts: [
      { concept: 'Deber Militar', keyData: 'El conjunto de las obligaciones que a un militar impone su situación dentro del Ejército; la subordinación debe ser rigurosa.', article: 'Art. 1' },
      { concept: 'Deber del Sargento 1/o.', keyData: 'Es en la clase de tropa el que tiene mayor jerarquía; debe ser modelo para sus inferiores y auxilio inmediato de los oficiales.', article: 'Art. 82' },
      { concept: 'Conocimiento del Personal', keyData: 'El Sargento 1/o. debe conocer por sus nombres a todos los soldados de la compañía, escuadrón o batería.', article: 'Art. 85' },
      { concept: 'Distribución del Servicio', keyData: 'Lleva el rol general de servicios de la compañía y vigila la exacta distribución y puntualidad.', article: 'Art. 91' },
      { concept: 'Saluto Militar', keyData: 'Obligación mutua de respeto y cortesía militar entre superiores y subalternos.', article: 'Art. 20' }
    ]
  },
  {
    id: 3,
    number: 3,
    name: 'Código de Justicia Militar (Libro II, Títulos VIII y IX)',
    shortName: 'Código de Justicia Militar',
    dofDate: '31 de agosto de 1933 (Reformado)',
    keyArticles: 'Arts. 200 - 275 (Insubordinación, Deserción, Abandono de Servicio, Delitos contra la Disciplina)',
    examWeight: 'ALTO',
    portionsCount: 8,
    badge: 'PENAL MILITAR',
    color: 'red',
    description: 'Tipificación de delitos militares, penas privativas de libertad militar, figuras de insubordinación, desobediencia, deserción y abandono de puesto o servicio de armas.',
    keyConcepts: [
      { concept: 'Insubordinación', keyData: 'Comete el delito de insubordinación el militar que con palabras, ademanes, señas o de cualquier otra manera falta al respeto o amenaza a un superior.', article: 'Art. 281' },
      { concept: 'Insubordinación de Obra', keyData: 'El militar que pone manos sobre el superior o le causa lesiones en actos de servicio.', article: 'Art. 283' },
      { concept: 'Deserción', keyData: 'Separación injustificada del servicio militar o falta a 3 listas consecutivas o ausencia mayor a 72 horas.', article: 'Art. 256' },
      { concept: 'Deserción de Centinela', keyData: 'El centinela que abandona su puesto o se duerme comete delito agravado con pena severa.', article: 'Art. 261 fr. IV' },
      { concept: 'Abuso de Autoridad', keyData: 'Militar que ejerciendo mando cometa atropellos o vejaciones arbitrarias contra sus subordinados.', article: 'Art. 293' }
    ]
  },
  {
    id: 4,
    number: 4,
    name: 'Ley Orgánica del Ejército y Fuerza Aérea Mexicanos',
    shortName: 'Ley Orgánica del Ejército',
    dofDate: '26 de diciembre de 1986 (Reformada)',
    keyArticles: 'Arts. 1 - 20, 50 - 75, 130 - 150',
    examWeight: 'MEDIO',
    portionsCount: 5,
    badge: 'ORGANIZACIÓN Y MANDO',
    color: 'blue',
    description: 'Misiones generales del Ejército y FAM, cadena de mando supremo, división territorial militar, ramas, armas y servicios, y escalafones de ascenso.',
    keyConcepts: [
      { concept: 'Cinco Misiones Generales', keyData: '1. Defender la integridad, soberanía; 2. Garantizar seguridad interior; 3. Auxiliar a población civil; 4. Acción cívica/obras; 5. Plan DN-III-E.', article: 'Art. 1' },
      { concept: 'Mando Supremo', keyData: 'Corresponde al Presidente Constitucional de los Estados Unidos Mexicanos.', article: 'Art. 11' },
      { concept: 'Alto Mando', keyData: 'Lo ejerce el Secretario de la Defensa Nacional.', article: 'Art. 16' },
      { concept: 'Armas del Ejército', keyData: 'Infantería, Caballería, Artillería, Blindada e Ingenieros.', article: 'Art. 54' },
      { concept: 'Jerarquía de Sargento 1/o.', keyData: 'Pertenece a la escala de Clases (Cabo, Sargento 2/o., Sargento 1/o.).', article: 'Art. 132' }
    ]
  },
  {
    id: 5,
    number: 5,
    name: 'Ley Federal de Armas de Fuego y Explosivos',
    shortName: 'Ley de Armas y Explosivos',
    dofDate: '11 de enero de 1972 (Reformada)',
    keyArticles: 'Arts. 8, 9, 10, 11, 24, 83, 84',
    examWeight: 'MEDIO',
    portionsCount: 5,
    badge: 'CONTROL DE ARMAMENTO',
    color: 'violet',
    description: 'Clasificación de calibres reservados para uso exclusivo del Ejército, Fuerza Aérea y Armada, posesión, portación, transportación e ilícitos conexos.',
    keyConcepts: [
      { concept: 'Armas de Uso Exclusivo', keyData: 'Revólveres .357 Magnum, 9mm Parabellum, .45 Auto, fusiles automáticos, carabinas, ametralladoras y calibres militares.', article: 'Art. 11' },
      { concept: 'Posesión Domiciliaria Permitida', keyData: 'Pistolas calibre .380 y revólveres .38 Especial (excepto .357) para seguridad y legítima defensa en domicilio.', article: 'Art. 9 y 10' },
      { concept: 'Portación de Armas por Militares', keyData: 'Militares en activo y francos conforme a las disposiciones emitidas por la SEDENA.', article: 'Art. 24' },
      { concept: 'Sanción por Portación Ilegal', keyData: 'Penas privativas de libertad según el calibre y si es de uso exclusivo militar.', article: 'Art. 83' }
    ]
  },
  {
    id: 6,
    number: 6,
    name: 'Manual de Derechos Humanos para el Ejército y Fuerza Aérea Mexicanos',
    shortName: 'Manual de Derechos Humanos',
    dofDate: 'Edición Oficial SEDENA',
    keyArticles: 'Principios rectores, detenciones, inspección de personas, prohibición de tortura',
    examWeight: 'ALTO',
    portionsCount: 5,
    badge: 'DERECHOS HUMANOS',
    color: 'teal',
    description: 'Obligaciones constitucionales en materia de DDHH, protocolos de detención en flagrancia, preservación del lugar de los hechos y respeto a la dignidad humana.',
    keyConcepts: [
      { concept: 'Obligación Constitucional Art. 1', keyData: 'Todas las autoridades en el ámbito de sus competencias tienen la obligación de promover, respetar, proteger y garantizar los DDHH.', article: 'Cap. I' },
      { concept: 'Principios de DDHH', keyData: 'Universalidad, Interdependencia, Indivisibilidad y Progresividad.', article: 'Cap. II' },
      { concept: 'Detención en Flagrancia', keyData: 'Poner de inmediato a disposición del Ministerio Público al detenido con el Informe Policial Homologado.', article: 'Cap. IV' },
      { concept: 'Prohibición Absoluta', keyData: 'Queda estrictamente prohibida la tortura, tratos crueles, inhumanos o degradantes en cualquier circunstancia.', article: 'Cap. III' }
    ]
  },
  {
    id: 7,
    number: 7,
    name: 'Ley Nacional sobre el Uso de la Fuerza',
    shortName: 'Uso de la Fuerza',
    dofDate: '27 de mayo de 2019',
    keyArticles: 'Arts. 4, 6, 9, 11, 12, 13, 21',
    examWeight: 'ALTO',
    portionsCount: 5,
    badge: 'MARCO OPERATIVO LEGAL',
    color: 'orange',
    description: 'Principios rectores del uso de la fuerza, niveles de impacto, clasificación de conductas de resistencia y uso de la fuerza letal como última opción en legítima defensa.',
    keyConcepts: [
      { concept: 'Principios Rectores', keyData: 'Legalidad, Necesidad, Proporcionalidad, Racionalidad y Oportunidad.', article: 'Art. 4' },
      { concept: 'Niveles del Uso de la Fuerza', keyData: '1. Presencia de autoridad; 2. Persuasión/disuasión verbal; 3. Reducción física de movimientos; 4. Armas menos letales; 5. Fuerza letal.', article: 'Art. 11' },
      { concept: 'Clasificación de Conductas', keyData: 'Resistencia pasiva, resistencia activa y resistencia de alta peligrosidad.', article: 'Art. 9' },
      { concept: 'Fuerza Letal (Último recurso)', keyData: 'Solo se autoriza en defensa de la vida propia o de terceros frente a una agresión real, actual o inminente.', article: 'Art. 12' }
    ]
  },
  {
    id: 8,
    number: 8,
    name: 'Manual de Táctica de Infantería',
    shortName: 'Táctica de Infantería',
    dofDate: 'Edición Oficial SEDENA',
    keyArticles: 'Principios de la Guerra, Maniobra Táctica, Combate Ofensivo y Defensivo, Patrullas de Infantería',
    examWeight: 'ALTO',
    portionsCount: 5,
    badge: 'TÁCTICA DE COMBATE',
    color: 'yellow',
    description: 'Doctrina táctica del arma de Infantería: factores del terreno y enemigo, formas de maniobra ofensiva (envolvimiento, penetración), organización de escuadras y pelotones.',
    keyConcepts: [
      { concept: 'Misión del Arma de Infantería', keyData: 'Cerrar con el enemigo mediante el fuego y el movimiento para destruirlo, capturarlo o desalojarlo de sus posiciones.', article: 'Cap. I' },
      { concept: 'Formas de Maniobra Ofensiva', keyData: 'Envolvimiento (rodea el flanco hacia retaguardia) y Penetración (golpe frontal que rompe la línea enemiga).', article: 'Cap. IV' },
      { concept: 'Pelotón de Fusileros', keyData: 'Elemento básico de maniobra y combate mandado por un Sargento 2/o. subordinado a la sección del Sargento 1/o.', article: 'Cap. II' },
      { concept: 'Principios de la Guerra', keyData: 'Unidad de objetivo, ofensiva, masa, economía de fuerzas, maniobra, sorpresa, seguridad, sencillez.', article: 'Cap. III' },
      { concept: 'Seguridad en Operaciones', keyData: 'Medidas activas y pasivas para evitar sorpresas por parte del enemigo y proteger las tropas.', article: 'Cap. V' }
    ]
  }
];
