// Hardwired 28 Warband Builder - Utils and Constants

// Data references (set from main app)
window.H28_DATA = window.H28_DATA || {};

// Localization - set window.LOCALE before loading this file
const LOCALE = window.LOCALE || 'en';

const TRANSLATIONS = {
  en: {
    // General
    title: 'HARDWIRED 28', warbandName: 'Squad Name', loading: 'Loading Squad Builder...', spent: 'spent',
    // Modes
    build: 'BUILD', edit: 'EDIT', play: 'PLAY',
    buildDesc: 'BUILD MODE: Set contract types, stat arrays, and initial equipment. Use this when creating a new squad.',
    editDesc: 'EDIT MODE: Modify stats, add effects (injuries/promotions/criticals), manage equipment between games.',
    playDesc: 'PLAY MODE: Track health, use consumables. Contract type and base stats are locked.',
    // Stats
    combat: 'COMBAT', defense: 'DEFENSE', wits: 'WITS', health: 'HEALTH', move: 'MOVE',
    // Stat arrays
    specialist: 'Technician', generalist: 'Operative',
    specialistDesc: 'Technician (2d4/2d6/2d8)', generalistDesc: 'Operative (2d6/2d6/2d6)',
    combat2d8: 'COM 2d8', defense2d8: 'DEF 2d8', wits2d8: 'WIT 2d8',
    combat2d4: 'COM 2d4', defense2d4: 'DEF 2d4', wits2d4: 'WIT 2d4',
    // Equipment
    weapons: 'Weapons', armor: 'Armor', gear: 'Gear', consumables: 'Consumables', cybernetics: 'Cybernetics', grenades: 'Grenades', heresy: 'Powers',
    melee: 'Melee', ranged: 'Ranged', both: 'Both', noArmor: 'No armor', unarmed: 'Unarmed (1 dmg, -2 DT)',
    free: 'free', add: 'Add', use: 'USE', meleeWeapons: 'Melee Weapons', rangedWeapons: 'Ranged Weapons',
    // Evidence
    evidence: 'EVIDENCE', leads: 'LEADS',
    // Modifiers
    modifiers: 'MODIFIERS', negative: 'Negative', positive: 'Positive', noModifiers: 'No permanent modifiers',
    dead: 'Dead', outOfAction: 'Out of action',
    // Merits
    merits: 'Merits', next: 'Next', promotions: 'Promotions', unused: 'Unused', usePromotion: 'Use Promotion',
    // Stash
    stash: 'LOCKER ROOM', stashEmpty: 'Empty - use locker button on items to move here',
    giveTo: 'Give to...', discard: 'Discard', model: 'Model', toStash: 'To Locker',
    // Leader
    leaderDead: 'Leader dead - promote a henchman in Edit mode', leaderSuccessor: 'Leader dead - successor has ascended',
    makeLeader: 'Make Squad Leader', ascensionBonus: 'Choose ascension bonus:',
    bothWeapons: 'Both Weapons', armorTier: '+1 Armor Tier', cancel: 'Cancel',
    // Model card
    emptySlot: 'Empty Slot', addMember: '+ Add Member...', archetype: 'Contract Type...', noArchetype: 'No Contract Type',
    switchToBuild: 'Switch to Build mode to add members', modelName: 'Model Name', removeFromWarband: 'Remove from squad', confirmFireMember: 'Remove {name} from squad?', askReimburse: 'Reimburse {cost} subs?',
    choosePower: 'Choose a Power...', offensivePowers: 'Offensive (vs Wits)', supportPowers: 'Support (vs 2d6)', max: 'max', base: 'base',
    randomName: 'Random', randomSquadName: 'Random Name',
    // Buttons
    export: 'Export', import: 'Import', cards: 'Cards', print: 'Print', reset: 'Reset', quickView: 'Quick View',
    resetConfirm: 'Reset squad? This cannot be undone.', back: 'Back', backToBuilder: 'Back to Builder',
    // Multi-squad
    warband: 'squad', newWarband: 'New', switchWarband: 'Switch', unnamedWarband: 'Unnamed Squad',
    deleteWarband: 'Delete squad', deleteWarbandConfirm: 'Delete this squad? This cannot be undone.',
    preview: 'Preview', options: 'Options',
    // Print modal
    printCards: 'Print Cards', cardSize: 'Card Size', equipmentCards: 'Equipment Cards',
    archetypeCards: 'Contract Type Reference Cards', blankCards: 'Blank Model Cards', enemyCards: 'Enemy Cards',
    factionCards: 'Faction Cards', unitCards: 'Unit Cards', referenceTables: 'Reference Tables',
    criticalTables: 'Critical Tables', fumbleTables: 'Fumble Tables', campaignTables: 'Campaign Tables',
    sets: 'Sets', quantity: 'Quantity', selectAll: 'Select All', selectNone: 'Select None',
    all: 'All', none: 'None', global: 'Global', cardsTotal: 'cards total',
    noCardsSelected: 'No cards selected. Click "Options" to choose what to print.',
    equipment: 'Equipment', archetypes: 'Contract Types', set: 'set', referenceCard: 'reference card', referenceCards: 'reference cards',
    // Categories
    fallback: 'Improvised', powers: 'Powers',
    // Quick reference
    dice: 'Dice', turn: 'Turn', crit: 'Crit', fumble: 'Fumble',
    turnDesc: 'Move+Action or Action+Move', critDesc: '2x = max dmg, 3x+ = Crit table', fumbleDesc: 'Defender 3x+ = Fumble',
    // Card labels
    damage: 'DAMAGE', dmg: 'DMG', arm: 'ARM', type: 'TYPE', tier: 'TIER', spawn: 'Spawn', weapon: 'Weapon',
    maxArmor: 'MAX ARMOR', name: 'NAME', vs: 'VS', maxLimit: 'MAX',
    catMelee: 'MELEE', catRanged: 'RANGED', catArmor: 'ARMOR', catGear: 'GEAR',
    catConsumable: 'CONSUMABLE', catCybernetic: 'CYBERNETIC', catGrenade: 'GRENADE', catPower: 'POWER',
    weaponLight: 'LIGHT', weaponMedium: 'MEDIUM', weaponHeavy: 'HEAVY',
    tierLight: 'Light', tierMedium: 'Medium', tierHeavy: 'Heavy',
    // Print nav
    printPreview: 'Print Preview', onlineManual: 'Online Manual',
    // Modifier names
    modCombat: 'Combat', modDefense: 'Defense', modWits: 'Wits', modMove: 'Move', modHealth: 'Health',
    // Critical/Fumble card titles
    criticalWord: 'CRITICAL', fumbleWord: 'FUMBLE',
    critBladed: 'BLADED', critBlunt: 'BLUNT', critProjectile: 'PROJECTILE', critEnergy: 'ENERGY',
    critExplosive: 'EXPLOSIVE', critToxic: 'TOXIC', critStatic: 'STATIC',
    fumbleMelee: 'MELEE', fumbleRanged: 'RANGED', fumbleBroadcast: 'BROADCAST',
    // Campaign card titles
    cardSearch: 'Search', cardInterrogate: 'Interrogate', cardInjuries: 'Injuries', cardPromotions: 'Promotions', cardEvidence: 'Evidence',
    // Blessings and blank cards
    blessings: 'Blessings', inventory: 'INVENTORY', xp: 'XP',
    // Faction cards
    hostile: 'HOSTILE',
    // Squad-specific printing
    warbandOnly: 'Only Squad Items',
    excludeCards: 'Exclude cards (comma-separated):',
  },
  es: {
    // General
    title: 'HARDWIRED 28', warbandName: 'Nombre de Plantilla', loading: 'Cargando Constructor de Plantillas...', spent: 'gastados',
    // Modes
    build: 'CREAR', edit: 'EDITAR', play: 'JUGAR',
    buildDesc: 'MODO CREAR: Define tipos de contrato, matrices de atributos y equipo inicial. Usa esto al crear una nueva plantilla.',
    editDesc: 'MODO EDITAR: Modifica atributos, añade efectos (heridas/ascensos/críticos), gestiona equipo entre partidas.',
    playDesc: 'MODO JUGAR: Rastrea salud, usa consumibles. Tipo de contrato y atributos base bloqueados.',
    // Stats
    combat: 'COMBATE', defense: 'DEFENSA', wits: 'ASTUCIA', health: 'SALUD', move: 'MOV',
    // Stat arrays
    specialist: 'Técnico', generalist: 'Operario',
    specialistDesc: 'Técnico (2d4/2d6/2d8)', generalistDesc: 'Operario (2d6/2d6/2d6)',
    combat2d8: 'COM 2d8', defense2d8: 'DEF 2d8', wits2d8: 'AST 2d8',
    combat2d4: 'COM 2d4', defense2d4: 'DEF 2d4', wits2d4: 'AST 2d4',
    // Equipment
    weapons: 'Armas', armor: 'Armadura', gear: 'Equipo', consumables: 'Consumibles', cybernetics: 'Cibernéticos', grenades: 'Granadas', heresy: 'Poderes',
    melee: 'Melé', ranged: 'Disparo', both: 'Ambas', noArmor: 'Sin armadura', unarmed: 'Desarmado (1 daño, -2 ND)',
    free: 'gratis', add: 'Añadir', use: 'USAR', meleeWeapons: 'Armas Melé', rangedWeapons: 'Armas de Disparo',
    // Evidence
    evidence: 'PRUEBAS', leads: 'PISTAS',
    // Modifiers
    modifiers: 'MODIFICADORES', negative: 'Negativo', positive: 'Positivo', noModifiers: 'Sin modificadores permanentes',
    dead: 'Muerto', outOfAction: 'Fuera de combate',
    // Merits
    merits: 'Méritos', next: 'Siguiente', promotions: 'Ascensos', unused: 'Sin usar', usePromotion: 'Usar Ascenso',
    // Stash
    stash: 'TAQUILLAS', stashEmpty: 'Vacío - usa el botón de taquilla en objetos para moverlos aquí',
    giveTo: 'Dar a...', discard: 'Descartar', model: 'Modelo', toStash: 'A la Taquilla',
    // Leader
    leaderDead: 'Líder muerto - asciende un secuaz en modo Editar', leaderSuccessor: 'Líder muerto - sucesor ha ascendido',
    makeLeader: 'Convertir en Líder de Plantilla', ascensionBonus: 'Elige bonificación de ascenso:',
    bothWeapons: 'Ambas Armas', armorTier: '+1 Tier Armadura', cancel: 'Cancelar',
    // Model card
    emptySlot: 'Casilla Vacía', addMember: '+ Añadir Miembro...', archetype: 'Tipo de Contrato...', noArchetype: 'Sin Tipo de Contrato',
    switchToBuild: 'Cambia a modo Crear para añadir miembros', modelName: 'Nombre del Modelo', removeFromWarband: 'Quitar de la plantilla', confirmFireMember: '¿Quitar a {name} de la plantilla?', askReimburse: '¿Reembolsar {cost} subs?',
    choosePower: 'Elige un Poder...', offensivePowers: 'Ofensivo (vs Astucia)', supportPowers: 'Apoyo (vs 2d6)', max: 'máx', base: 'base',
    randomName: 'Aleatorio', randomSquadName: 'Nombre Aleatorio',
    // Buttons
    export: 'Exportar', import: 'Importar', cards: 'Cartas', print: 'Imprimir', reset: 'Reiniciar', quickView: 'Vista Rápida',
    resetConfirm: '¿Reiniciar plantilla? No se puede deshacer.', back: 'Volver', backToBuilder: 'Volver al Constructor',
    // Multi-squad
    warband: 'plantilla', newWarband: 'Nueva', switchWarband: 'Cambiar', unnamedWarband: 'Plantilla sin nombre',
    deleteWarband: 'Eliminar plantilla', deleteWarbandConfirm: '¿Eliminar esta plantilla? No se puede deshacer.',
    preview: 'Vista Previa', options: 'Opciones',
    // Print modal
    printCards: 'Imprimir Cartas', cardSize: 'Tamaño de Carta', equipmentCards: 'Cartas de Equipo',
    archetypeCards: 'Cartas de Referencia de Tipos de Contrato', blankCards: 'Cartas de Modelo en Blanco', enemyCards: 'Cartas de Enemigo',
    factionCards: 'Cartas de Facción', unitCards: 'Cartas de Unidad', referenceTables: 'Tablas de Referencia',
    criticalTables: 'Tablas de Críticos', fumbleTables: 'Tablas de Pifias', campaignTables: 'Tablas de Campaña',
    sets: 'Copias', quantity: 'Cantidad', selectAll: 'Seleccionar Todo', selectNone: 'Seleccionar Nada',
    all: 'Todo', none: 'Nada', global: 'Global', cardsTotal: 'cartas en total',
    noCardsSelected: 'Sin cartas seleccionadas. Haz clic en "Opciones" para elegir qué imprimir.',
    equipment: 'Equipo', archetypes: 'Tipos de Contrato', set: 'copia', referenceCard: 'carta de referencia', referenceCards: 'cartas de referencia',
    // Categories
    fallback: 'Improvisado', powers: 'Poderes',
    // Quick reference
    dice: 'Dados', turn: 'Turno', crit: 'Crítico', fumble: 'Pifia',
    turnDesc: 'Movimiento+Acción o Acción+Movimiento', critDesc: '2x = daño máx, 3x+ = tabla Crítico', fumbleDesc: 'Defensor 3x+ = Pifia',
    // Card labels
    damage: 'DAÑO', dmg: 'DAÑO', arm: 'ARM', type: 'TIPO', tier: 'NIVEL', spawn: 'Generar', weapon: 'Arma',
    maxArmor: 'ARM. MÁX', name: 'NOMBRE', vs: 'VS', maxLimit: 'MÁX',
    catMelee: 'CC', catRanged: 'DISTANCIA', catArmor: 'ARMADURA', catGear: 'EQUIPO',
    catConsumable: 'CONSUMIBLE', catCybernetic: 'CIBERNÉTICO', catGrenade: 'GRANADA', catPower: 'PODER',
    weaponLight: 'LIGERA', weaponMedium: 'MEDIA', weaponHeavy: 'PESADA',
    tierLight: 'Ligera', tierMedium: 'Media', tierHeavy: 'Pesada',
    // Print nav
    printPreview: 'Vista de Impresión', onlineManual: 'Manual Online',
    // Modifier names
    modCombat: 'Combate', modDefense: 'Defensa', modWits: 'Astucia', modMove: 'Mov', modHealth: 'Salud',
    // Critical/Fumble card titles
    criticalWord: 'CRÍTICO', fumbleWord: 'PIFIA',
    critBladed: 'CORTANTE', critBlunt: 'CONTUNDENTE', critProjectile: 'PROYECTIL', critEnergy: 'ENERGÍA',
    critExplosive: 'EXPLOSIVO', critToxic: 'TÓXICO', critStatic: 'ESTÁTICO',
    fumbleMelee: 'MELÉ', fumbleRanged: 'DISTANCIA', fumbleBroadcast: 'EMISIÓN',
    // Campaign card titles
    cardSearch: 'Búsqueda', cardInterrogate: 'Interrogar', cardInjuries: 'Heridas', cardPromotions: 'Ascensos', cardEvidence: 'Pruebas',
    // Blessings and blank cards
    blessings: 'Bendiciones', inventory: 'INVENTARIO', xp: 'XP',
    // Faction cards
    hostile: 'HOSTIL',
    // Squad-specific printing
    warbandOnly: 'Solo Items de la Plantilla',
    excludeCards: 'Excluir cartas (separadas por coma):',
  }
};

// Translation function
const t = (key, params = {}) => {
  let text = TRANSLATIONS[LOCALE]?.[key] ?? TRANSLATIONS.en[key] ?? key;
  Object.entries(params).forEach(([k, v]) => {
    text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
  });
  return text;
};

// Get current locale
const getLocale = () => LOCALE;

// Icon class mappings (Font Awesome + RPG Awesome)
const ICONS = {
  combat: 'ra ra-crossed-swords',
  defense: 'ra ra-shield',
  wits: 'fa fa-eye',
  health: 'fa fa-heart',
  move: 'fa fa-person-running',
  subs: 'ra ra-gold-bar',
  stash: 'fa fa-box-archive',
  consumable: 'ra ra-flask',
  cybernetic: 'fa fa-gear',
  power: 'ra ra-fairy-wand',
  leader: 'ra ra-crown',
  dead: 'ra ra-skull',
  gear: 'fa fa-cog',
  grenade: 'fa fa-bomb',
  ranged: 'fa fa-crosshairs',
  melee: 'ra ra-sword',
  armor: 'ra ra-helmet',
  xp: 'ra ra-trophy',
  level: 'fa fa-arrow-up',
  save: 'fa fa-floppy-disk',
  load: 'fa fa-folder-open',
  print: 'fa fa-print',
  reset: 'fa fa-trash',
  cards: 'ra ra-scroll-unfurled',
  add: 'fa fa-plus',
  remove: 'fa fa-xmark',
  use: 'fa fa-bolt',
};

// Type labels (text-based, replaces colored dots)
const TYPE_LABELS = {
  // English
  'Bladed': 'BLD',
  'Blunt': 'BLT',
  'Projectile': 'PRJ',
  'Energy': 'NRG',
  'Explosive': 'EXP',
  'Toxic': 'TOX',
  'Static': 'STC',
  'Broadcast': 'BRD',
  // Spanish
  'Cortante': 'CRT',
  'Contundente': 'CTD',
  'Proyectil': 'PRY',
  'Energía': 'NRG',
  'Explosivo': 'EXP',
  'Tóxico': 'TOX',
  'Estático': 'STC',
  'Emisión': 'EMS',
};

// Mode styling - uses CSS variables via utility classes
const getModeStyles = () => ({
  build: { bg: 'wb-bg-primary', text: 'text-white', label: t('build') },
  edit: { bg: 'wb-bg-danger', text: 'text-white', label: t('edit') },
  play: { bg: 'wb-bg-play', text: 'text-white', label: t('play') },
});
const MODE_STYLES = getModeStyles();

// Simplified permanent modifiers - uses translations
const getModifiers = () => ({
  negative: [
    { id: 'mod-dead', name: t('dead'), iconClass: ICONS.dead, effect: t('outOfAction') },
    { id: 'mod-combat-1', name: `-1 ${t('modCombat')}`, iconClass: ICONS.combat, effect: `-1 ND ${t('modCombat')}` },
    { id: 'mod-combat-2', name: `-2 ${t('modCombat')}`, iconClass: ICONS.combat, effect: `-2 ND ${t('modCombat')}` },
    { id: 'mod-defense-1', name: `-1 ${t('modDefense')}`, iconClass: ICONS.defense, effect: `-1 ND ${t('modDefense')}` },
    { id: 'mod-defense-2', name: `-2 ${t('modDefense')}`, iconClass: ICONS.defense, effect: `-2 ND ${t('modDefense')}` },
    { id: 'mod-wits-1', name: `-1 ${t('modWits')}`, iconClass: ICONS.wits, effect: `-1 ND ${t('modWits')}` },
    { id: 'mod-wits-2', name: `-2 ${t('modWits')}`, iconClass: ICONS.wits, effect: `-2 ND ${t('modWits')}` },
    { id: 'mod-move-1', name: `-1" ${t('modMove')}`, iconClass: ICONS.move, effect: `-1" ${t('modMove')}` },
    { id: 'mod-move-2', name: `-2" ${t('modMove')}`, iconClass: ICONS.move, effect: `-2" ${t('modMove')}` },
    { id: 'mod-health-1', name: `-1 ${t('modHealth')}`, iconClass: ICONS.health, effect: `-1 ${t('max')} ${t('modHealth')}` },
    { id: 'mod-health-2', name: `-2 ${t('modHealth')}`, iconClass: ICONS.health, effect: `-2 ${t('max')} ${t('modHealth')}` },
  ],
  positive: [
    { id: 'mod-combat+1', name: `+1 ${t('modCombat')}`, iconClass: ICONS.combat, effect: `+1 ND ${t('modCombat')}` },
    { id: 'mod-combat+2', name: `+2 ${t('modCombat')}`, iconClass: ICONS.combat, effect: `+2 ND ${t('modCombat')}` },
    { id: 'mod-defense+1', name: `+1 ${t('modDefense')}`, iconClass: ICONS.defense, effect: `+1 ND ${t('modDefense')}` },
    { id: 'mod-defense+2', name: `+2 ${t('modDefense')}`, iconClass: ICONS.defense, effect: `+2 ND ${t('modDefense')}` },
    { id: 'mod-wits+1', name: `+1 ${t('modWits')}`, iconClass: ICONS.wits, effect: `+1 ND ${t('modWits')}` },
    { id: 'mod-wits+2', name: `+2 ${t('modWits')}`, iconClass: ICONS.wits, effect: `+2 ND ${t('modWits')}` },
    { id: 'mod-move+1', name: `+1" ${t('modMove')}`, iconClass: ICONS.move, effect: `+1" ${t('modMove')}` },
    { id: 'mod-move+2', name: `+2" ${t('modMove')}`, iconClass: ICONS.move, effect: `+2" ${t('modMove')}` },
    { id: 'mod-health+1', name: `+1 ${t('modHealth')}`, iconClass: ICONS.health, effect: `+1 ${t('max')} ${t('modHealth')}` },
    { id: 'mod-health+2', name: `+2 ${t('modHealth')}`, iconClass: ICONS.health, effect: `+2 ${t('max')} ${t('modHealth')}` },
  ],
});
const MODIFIERS = getModifiers();

const DICE_TIERS = ['2d4', '2d6', '2d8', '2d10', '2d12'];
const DICE_INDEX = { '2d4': 0, '2d6': 1, '2d8': 2, '2d10': 3, '2d12': 4 };

// Card sizes in mm (width x height)
const CARD_SIZES = {
  'tcg-standard': { name: 'TCG Standard', width: 63, height: 88 },
  'bridge': { name: 'Bridge', width: 57, height: 89 },
  'mini-us': { name: 'Mini US', width: 41, height: 63 },
  'mini-euro': { name: 'Mini Euro', width: 44, height: 68 },
  'tarot': { name: 'Tarot', width: 70, height: 120 },
  'square': { name: 'Square', width: 70, height: 70 },
};

// Helper functions
const getItemType = (id) => {
  if (id?.startsWith('melee')) return 'melee';
  if (id?.startsWith('ranged')) return 'ranged';
  if (id?.startsWith('armor')) return 'armor';
  if (id?.startsWith('gear')) return 'gear';
  if (id?.startsWith('cons')) return 'consumable';
  if (id?.startsWith('cyber')) return 'cybernetic';
  if (id?.startsWith('grenade')) return 'grenade';
  return 'unknown';
};

// Extract base item ID by stripping timestamp suffix
// "melee-knuckles-1703123456789" → "melee-knuckles"
const getBaseItemId = (id) => {
  if (!id) return id;
  const parts = id.split('-');
  // Remove last part if it's a timestamp (numeric, > 10 digits)
  if (parts.length > 2 && /^\d{10,}$/.test(parts[parts.length - 1])) {
    return parts.slice(0, -1).join('-');
  }
  return id;
};

const applyDT = (base, mod) => {
  const idx = Math.max(0, Math.min(4, (DICE_INDEX[base] ?? 1) + mod));
  return DICE_TIERS[idx];
};

const getArmorOptions = (maxTier, armorList) => {
  // Support both EN and ES tier names
  const tiers = { 'Light': 1, 'Medium': 2, 'Heavy': 3, 'Ligera': 1, 'Media': 2, 'Pesada': 3 };
  return armorList.filter(a => tiers[a.tier] <= tiers[maxTier]);
};

// Calculate stat modifier from modifiers array
const getStatModFromModifiers = (modifiers, stat) => {
  if (!modifiers) return 0;
  let total = 0;
  modifiers.forEach(m => {
    if (m.id === `mod-${stat}-1`) total -= 1;
    if (m.id === `mod-${stat}-2`) total -= 2;
    if (m.id === `mod-${stat}+1`) total += 1;
    if (m.id === `mod-${stat}+2`) total += 2;
  });
  return total;
};

const getHealthModFromModifiers = (modifiers) => {
  if (!modifiers) return 0;
  let total = 0;
  modifiers.forEach(m => {
    if (m.id === 'mod-health-1') total -= 1;
    if (m.id === 'mod-health-2') total -= 2;
    if (m.id === 'mod-health+1') total += 1;
    if (m.id === 'mod-health+2') total += 2;
  });
  return total;
};

const getMoveModFromModifiers = (modifiers) => {
  if (!modifiers) return 0;
  let total = 0;
  modifiers.forEach(m => {
    if (m.id === 'mod-move-1') total -= 1;
    if (m.id === 'mod-move-2') total -= 2;
    if (m.id === 'mod-move+1') total += 1;
    if (m.id === 'mod-move+2') total += 2;
  });
  return total;
};

// Parse armor special for move modifiers (e.g., "-1\" Move", "+2\" `Move`")
const getArmorMoveMod = (equipment) => {
  if (!equipment) return 0;
  const armor = equipment.find(e => getItemType(e.id) === 'armor');
  if (!armor?.special) return 0;
  // Match patterns like "-1" Move", "+2" `Move`", "-1\" Mov"
  const match = armor.special.match(/([+-]\d+)[""]?\s*`?(?:Move|Mov|`Move`)/i);
  if (match) {
    return parseInt(match[1]) || 0;
  }
  return 0;
};

// Parse cybernetic effects for stat modifiers (DT = die tier)
// Effects like: "`+1 DT` `Combat`", "`+1 DT` `Defense`", "`+1 DT` `Wits`"
// ES: "`+1 ND` `Combate`", "`+1 ND` `Defensa`", "`+1 ND` `Astucia`"
const getCyberneticStatMod = (equipment, stat) => {
  if (!equipment) return 0;
  let total = 0;
  const cybernetics = equipment.filter(e => getItemType(e.id) === 'cybernetic');
  // Map stat names to both EN and ES patterns
  const statPatterns = {
    combat: /[+-]\d+\s*(?:DT|ND).*(?:Combat|Combate)/i,
    defense: /[+-]\d+\s*(?:DT|ND).*(?:Defense|Defensa)/i,
    wits: /[+-]\d+\s*(?:DT|ND).*(?:Wits|Astucia)/i,
  };
  const pattern = statPatterns[stat];
  if (!pattern) return 0;
  cybernetics.forEach(cyber => {
    if (cyber.effect) {
      const match = cyber.effect.match(/([+-]\d+)\s*(?:DT|ND)/i);
      if (match && pattern.test(cyber.effect)) {
        total += parseInt(match[1]) || 0;
      }
    }
  });
  return total;
};

// Parse cybernetic effects for health modifier
// Effects like: "+1 max `Health`", "+1 máx `Salud`"
const getCyberneticHealthMod = (equipment) => {
  if (!equipment) return 0;
  let total = 0;
  const cybernetics = equipment.filter(e => getItemType(e.id) === 'cybernetic');
  cybernetics.forEach(cyber => {
    if (cyber.effect) {
      const match = cyber.effect.match(/([+-]\d+)\s*(?:max|máx)/i);
      if (match && /(?:Health|Salud)/i.test(cyber.effect)) {
        total += parseInt(match[1]) || 0;
      }
    }
  });
  return total;
};

// Parse cybernetic effects for move modifier
// Effects like: "+1\" `Move`", "+1\" `Mov`"
const getCyberneticMoveMod = (equipment) => {
  if (!equipment) return 0;
  let total = 0;
  const cybernetics = equipment.filter(e => getItemType(e.id) === 'cybernetic');
  cybernetics.forEach(cyber => {
    if (cyber.effect) {
      const match = cyber.effect.match(/([+-]\d+)[""]?\s*`?(?:Move|Mov)/i);
      if (match) {
        total += parseInt(match[1]) || 0;
      }
    }
  });
  return total;
};

// Calculate effective damage with bonuses
const addDamageBonus = (baseDamage, bonus) => {
  if (!baseDamage || !bonus) return baseDamage;
  const match = baseDamage.match(/^(d?\d+)(?:\+(\d+))?$/);
  if (!match) return baseDamage;
  const [, dice, existingBonus] = match;
  const totalBonus = (parseInt(existingBonus) || 0) + bonus;
  return totalBonus > 0 ? `${dice}+${totalBonus}` : dice;
};

// Convert markdown bold and code to HTML (for data from JSON files)
const markdownToHtml = (text) => {
  if (text == null) return '';
  const str = String(text);
  return str
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
};

// Strip markdown for plain text contexts (e.g., option elements)
const stripMarkdown = (text) => {
  if (text == null) return '';
  const str = String(text);
  return str
    .replace(/\*\*([^*]+)\*\*/g, '$1')  // bold
    .replace(/`([^`]+)`/g, '$1');       // code/backticks
};

// Random name generators
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateWarbandName = () => {
  const data = window.WARBAND_DATA?.NAMES_WARBAND || {};
  const prefix = pickRandom(data.prefix || ['Iron']);
  const core = pickRandom(data.core || ['Core']);
  const suffix = pickRandom(data.suffix || ['Collective']);
  return `${prefix} ${core} ${suffix}`;
};

const generateModelName = () => {
  const data = window.WARBAND_DATA?.NAMES_MODELS || {};
  const first = pickRandom(data.first || ['Unknown']);
  const last = pickRandom(data.last || ['Worker']);
  return `${first} ${last}`;
};

// Export to window for access by other modules
window.H28_UTILS = {
  // Localization
  t,
  getLocale,
  LOCALE,
  // Constants
  ICONS,
  TYPE_LABELS,
  MODE_STYLES,
  MODIFIERS,
  DICE_TIERS,
  DICE_INDEX,
  CARD_SIZES,
  // Functions
  getItemType,
  getBaseItemId,
  applyDT,
  getArmorOptions,
  getStatModFromModifiers,
  getHealthModFromModifiers,
  getMoveModFromModifiers,
  getArmorMoveMod,
  getCyberneticStatMod,
  getCyberneticHealthMod,
  getCyberneticMoveMod,
  addDamageBonus,
  markdownToHtml,
  stripMarkdown,
  // Name generators
  generateWarbandName,
  generateModelName,
};
