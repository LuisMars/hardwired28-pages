// Hardwired 28 - Scenario Generator

const LOCALE = window.LOCALE || 'en';

const T = {
  en: {
    title: 'SCENARIO GENERATOR',
    evidenceGap: 'Evidence Gap',
    playerA: 'Player A Total',
    playerB: 'Player B Total',
    aggressor: 'Aggressor',
    defender: 'Defender',
    gap: 'Gap',
    generate: 'Generate Mission',
    reroll: 'Re-roll',
    rerollAll: 'Re-roll All',
    mission: 'Mission',
    deployment: 'Deployment',
    coworkerSetup: 'Coworker Setup',
    coworkerModifiers: 'Coworker Modifiers',
    hostileTiming: 'Hostile Timing',
    hostileType: 'Hostile Type',
    hostileUnits: 'Hostile Units',
    coworkerUnit: 'Coworker Unit',
    spawn: 'Spawn',
    round: 'R',
    specialRule: 'Special Rule',
    behavior: 'Behavior',
    behaviorNormal: 'Normal',
    behaviorAttacked: 'Attacked',
    noLoS: 'No LoS',
    hasLoS: 'Has LoS',
    engaged: 'Engaged',
    lootLayout: 'Loot Layout',
    lootModifiers: 'Loot Modifiers',
    spawnLocation: 'Spawn Location',
    setupAdvantage: 'Setup Advantage',
    tacticalAdvantage: 'Tactical Advantage',
    bonusAdvantage: 'Bonus Advantage',
    defenderAdvantages: 'Defender Advantages',
    noAdvantages: 'No advantages (gap 0-1)',
    evidenceLeads: 'Evidence + Leads',
    tied: 'Tied: higher Evidence wins. Still tied: random.',
    share: 'Share',
    copied: 'Link copied!',
    print: 'Print',
    missionBriefing: 'Mission Briefing',
    unitReference: 'Unit Reference',
    hostiles: 'Hostiles',
    coworkers: 'Coworkers',
    weapon: 'Weapon',
    rounds: 'Rounds',
    advantages: 'Advantages',
  },
  es: {
    title: 'GENERADOR DE ESCENARIO',
    evidenceGap: 'Brecha de Pruebas',
    playerA: 'Total Jugador A',
    playerB: 'Total Jugador B',
    aggressor: 'Agresor',
    defender: 'Defensor',
    gap: 'Brecha',
    generate: 'Generar Misión',
    reroll: 'Retirar',
    rerollAll: 'Retirar Todo',
    mission: 'Misión',
    deployment: 'Despliegue',
    coworkerSetup: 'Colocación de Compañeros',
    coworkerModifiers: 'Modificadores de Compañeros',
    hostileTiming: 'Momento de Hostiles',
    hostileType: 'Tipo de Hostiles',
    hostileUnits: 'Unidades Hostiles',
    coworkerUnit: 'Unidad de Compañeros',
    spawn: 'Aparición',
    round: 'R',
    specialRule: 'Regla Especial',
    behavior: 'Comportamiento',
    behaviorNormal: 'Normal',
    behaviorAttacked: 'Atacado',
    noLoS: 'Sin LdV',
    hasLoS: 'Con LdV',
    engaged: 'Trabado',
    lootLayout: 'Disposición de Botín',
    lootModifiers: 'Modificadores de Botín',
    spawnLocation: 'Ubicación de Aparición',
    setupAdvantage: 'Ventaja de Preparación',
    tacticalAdvantage: 'Ventaja Táctica',
    bonusAdvantage: 'Ventaja Extra',
    defenderAdvantages: 'Ventajas del Defensor',
    noAdvantages: 'Sin ventajas (brecha 0-1)',
    evidenceLeads: 'Pruebas + Pistas',
    tied: 'Empate: más Pruebas gana. Sigue empatado: aleatorio.',
    share: 'Compartir',
    copied: '¡Enlace copiado!',
    print: 'Imprimir',
    missionBriefing: 'Informe de Misión',
    unitReference: 'Referencia de Unidades',
    hostiles: 'Hostiles',
    coworkers: 'Compañeros',
    weapon: 'Arma',
    rounds: 'Rondas',
    advantages: 'Ventajas',
  },
};

const t = (key) => (T[LOCALE] || T.en)[key] || T.en[key] || key;

// Theme CSS variables
const THEME_VARS = {
  zorn: `
    --wb-primary: #c9a227; --wb-primary-hover: #8b6914;
    --wb-danger: #8b2500; --wb-danger-hover: #c73e1d;
    --wb-accent: #1a1a1a; --wb-accent-text: #f5f5f0;
    --wb-bg-dark: #1a1a1a; --wb-bg-darker: #222; --wb-bg-medium: #333; --wb-bg-medium-hover: #444; --wb-bg-light: #f5f5f0;
    --wb-border: #333; --wb-border-hover: #555; --wb-border-light: #ddd;
    --wb-text-light: #f5f5f0; --wb-text-muted: #666; --wb-text-secondary: #8b6914; --wb-text-disabled: #999;
    --wb-text-on-light: #1a1a1a; --wb-text-on-primary: #000000;
  `,
  corporate: `
    --wb-primary: #2563EB; --wb-primary-hover: #1D4ED8;
    --wb-danger: #DC2626; --wb-danger-hover: #B91C1C;
    --wb-accent: #2563EB; --wb-accent-text: #FFFFFF;
    --wb-bg-dark: #F8FAFC; --wb-bg-darker: #F1F5F9; --wb-bg-medium: #E2E8F0; --wb-bg-medium-hover: #CBD5E1; --wb-bg-light: #FFFFFF;
    --wb-border: transparent; --wb-border-hover: transparent; --wb-border-light: transparent;
    --wb-text-light: #1E293B; --wb-text-muted: #64748B; --wb-text-secondary: #1D4ED8; --wb-text-disabled: #94A3B8;
    --wb-text-on-light: #1E293B; --wb-text-on-primary: #FFFFFF;
  `,
  fulfillment: `
    --wb-primary: #FFD814; --wb-primary-hover: #F7CA00;
    --wb-danger: #B12704; --wb-danger-hover: #922006;
    --wb-accent: #232F3E; --wb-accent-text: #FFFFFF;
    --wb-bg-dark: #FFFFFF; --wb-bg-darker: #232F3E; --wb-bg-medium: #F7F7F7; --wb-bg-medium-hover: #EDEDED; --wb-bg-light: #FFFFFF;
    --wb-border: transparent; --wb-border-hover: transparent; --wb-border-light: transparent;
    --wb-text-light: #0F1111; --wb-text-muted: #565959; --wb-text-secondary: #232F3E; --wb-text-disabled: #767676;
    --wb-text-on-light: #0F1111; --wb-text-on-primary: #0F1111;
  `,
  hallucination: `
    --wb-primary: #10A37F; --wb-primary-hover: #0D8A6A;
    --wb-danger: #EF4444; --wb-danger-hover: #DC2626;
    --wb-accent: #10A37F; --wb-accent-text: #FFFFFF;
    --wb-bg-dark: #212121; --wb-bg-darker: #171717; --wb-bg-medium: #2A2A2A; --wb-bg-medium-hover: #333333; --wb-bg-light: #343541;
    --wb-border: #4A4A4A; --wb-border-hover: #5A5A5A; --wb-border-light: #3A3A3A;
    --wb-text-light: #FFFFFF; --wb-text-muted: #B8B8B8; --wb-text-secondary: #10A37F; --wb-text-disabled: #666666;
    --wb-text-on-light: #FFFFFF; --wb-text-on-primary: #FFFFFF;
  `,
};

const THEME_CLASSES = `
  .wb-bg-dark { background-color: var(--wb-bg-dark); }
  .wb-bg-darker { background-color: var(--wb-bg-darker); }
  .wb-bg-medium { background-color: var(--wb-bg-medium); }
  .wb-bg-light { background-color: var(--wb-bg-light); }
  .wb-bg-primary { background-color: var(--wb-primary); }
  .wb-text-light { color: var(--wb-text-light); }
  .wb-text-muted { color: var(--wb-text-muted); }
  .wb-text-secondary { color: var(--wb-text-secondary); }
  .wb-text-on-primary { color: var(--wb-text-on-primary); }
  .wb-text-on-light { color: var(--wb-text-on-light); }
  .wb-border { border-color: var(--wb-border); }

  @media screen { .print-only { display: none !important; } }
  @media print {
    @page { size: 148mm 210mm; margin: 8mm; }
    .screen-only, .app-menu { display: none !important; }
    .print-only { display: block !important; }
    body { background: white !important; margin: 0 !important; }
  }

  .print-view { color: #111; font-family: 'PT Serif', serif; font-size: 11pt; line-height: 1.3; }
  .print-view h1 { font-family: 'Montserrat', sans-serif; font-size: 22pt; font-weight: 800; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; }
  .print-view h2 { font-family: 'Montserrat', sans-serif; font-size: 12pt; font-weight: 700; margin: 0 0 0.5mm; text-transform: uppercase; border-bottom: 0.5pt solid #999; padding-bottom: 0.5mm; }
  .print-view .print-lore { font-style: italic; font-size: 9pt; color: #444; margin: 0.5mm 0 1.5mm; line-height: 1.3; }
  .print-view .print-mission-desc { font-size: 10pt; margin-bottom: 1.5mm; line-height: 1.3; }
  .print-view .print-mission-desc p { margin: 0.5mm 0; }
  .print-view .print-mission-desc blockquote { font-style: italic; color: #555; border-left: 1.5pt solid #ccc; padding-left: 2mm; margin: 0.5mm 0; }
  .print-view .print-top { display: flex; gap: 3mm; align-items: flex-start; margin-bottom: 1.5mm; }
  .print-view .print-map { flex-shrink: 0; width: 58mm; }
  .print-view .print-map svg { width: 100%; display: block; }
  .print-view .print-map > div { border-color: #ccc !important; }
  .print-view .print-map-info { font-size: 9pt; color: #333; margin-top: 1mm; line-height: 1.4; }
  .print-view .print-map-info strong { font-weight: 600; color: #000; }
  .print-view .print-units { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1.5mm; }
  .print-view .print-bottom { display: flex; gap: 3mm; margin-top: 1.5mm; align-items: flex-start; }
  .print-view .print-bottom-col { flex: 1; min-width: 0; }
  .print-view .print-unit { background: #f5f5f5; border-radius: 1.5mm; padding: 1.5mm 2mm; }
  .print-view .print-unit-name { font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 11pt; }
  .print-view .print-unit-meta { font-size: 9pt; color: #444; }
  .print-view .print-stats { display: flex; gap: 1px; margin: 1mm 0 0; border-radius: 2px; overflow: hidden; }
  .print-view .print-stats > div { flex: 1; text-align: center; background: #e0e0e0; padding: 0.5mm 1mm; }
  .print-view .print-stats .stat-label { font-family: 'Montserrat', sans-serif; font-size: 7pt; color: #000; font-weight: 700; text-transform: uppercase; }
  .print-view .print-stats .stat-value { font-size: 10pt; font-weight: 700; }
  .print-view .print-behavior { width: 100%; border-collapse: collapse; font-size: 8.5pt; margin-top: 1mm; }
  .print-view .print-behavior th { background: #222; color: #fff; padding: 0.5mm 1.5mm; text-align: center; font-weight: 600; text-transform: uppercase; font-size: 7.5pt; }
  .print-view .print-behavior td { padding: 0.5mm 1.5mm; text-align: center; border-bottom: 0.25pt solid #ddd; }
  .print-view .print-special { font-size: 10pt; border-left: 2pt solid #333; padding-left: 2mm; margin: 1mm 0; }
  .print-view .print-detail { font-size: 10pt; color: #222; }
  .print-view .print-advantages { margin-top: 1.5mm; padding-top: 1mm; border-top: 0.5pt solid #999; font-size: 10pt; display: flex; flex-direction: column; gap: 0.5mm; }
  .print-view .print-advantages strong { font-weight: 600; }
  .print-view code { font-family: 'Ubuntu Mono', 'Liberation Mono', 'Courier New', monospace; font-weight: bold; background: #e8e8e8; padding: 0 2px; border-radius: 2px; font-size: 0.9em; }
`;

// --- Share via query parameters ---

const ROLL_KEYS = ['m', 'dep', 'cs', 'cm', 'ht', 'hf', 'll', 'lm', 'sp'];
const ROLL_FIELDS = ['mission', 'deployment', 'coworkerSetup', 'coworkerModifiers', 'hostileTiming', 'hostileFactions', 'lootLayout', 'lootModifiers', 'spawnLocation'];

function resultsToParams(gap, results, loreSeed) {
  const p = new URLSearchParams();
  p.set('gap', gap);
  ROLL_KEYS.forEach((key, i) => {
    if (results[ROLL_FIELDS[i]]) p.set(key, results[ROLL_FIELDS[i]].roll);
  });
  if (results.setupAdvantage) p.set('sa', results.setupAdvantage.roll);
  if (results.tacticalAdvantage) p.set('ta', results.tacticalAdvantage.roll);
  if (results.bonusAdvantage) {
    p.set('ba', results.bonusAdvantage.roll);
    p.set('bt', results.bonusAdvantage.isSetup ? 's' : 't');
  }
  if (results.hostileUnits) {
    results.hostileUnits.forEach((u, i) => { if (u) p.set(`hu${i}`, u.roll); });
  }
  if (results.coworkerUnit) p.set('cu', results.coworkerUnit.roll);
  if (loreSeed !== undefined) p.set('ls', loreSeed);
  return p.toString();
}

function paramsToResults(data) {
  const p = new URLSearchParams(window.location.search);
  if (!p.has('m')) return null;
  const gap = parseInt(p.get('gap')) || 0;
  const tables = [data.missionTable, data.deployment, data.coworkerSetup, data.coworkerModifiers, data.hostileTiming, data.hostileFactions, data.lootLayout, data.lootModifiers, data.spawnLocation];
  const results = {};
  ROLL_KEYS.forEach((key, i) => {
    const roll = parseInt(p.get(key));
    if (roll) results[ROLL_FIELDS[i]] = { roll, item: findByRoll(tables[i], roll) };
  });
  if (!results.mission) return null;
  if (p.has('sa')) {
    const r = parseInt(p.get('sa'));
    results.setupAdvantage = { roll: r, item: findByRoll(data.setupAdvantages, r) };
  }
  if (p.has('ta')) {
    const r = parseInt(p.get('ta'));
    results.tacticalAdvantage = { roll: r, item: findByRoll(data.tacticalAdvantages, r) };
  }
  if (p.has('ba')) {
    const r = parseInt(p.get('ba'));
    const isSetup = p.get('bt') === 's';
    const table = isSetup ? data.setupAdvantages : data.tacticalAdvantages;
    results.bonusAdvantage = { roll: r, item: findByRoll(table, r), isSetup };
  }
  // Restore hostile unit rolls
  const factionItem = results.hostileFactions?.item;
  const timingItem = results.hostileTiming?.item;
  const factionFile = factionItem?.file;
  const factionUnits = factionFile ? data.factionData?.[factionFile] : null;
  if (factionUnits && timingItem?.spawns) {
    results.hostileUnits = timingItem.spawns.map((s, i) => {
      const r = parseInt(p.get(`hu${i}`));
      if (!r) return null;
      return { roll: r, unit: findUnitByRoll(factionUnits, r), tier: s.tier, round: s.round };
    });
  }
  // Restore coworker unit roll
  const coworkerTier = results.coworkerSetup?.item?.tier;
  if (coworkerTier && p.has('cu')) {
    const r = parseInt(p.get('cu'));
    results.coworkerUnit = { roll: r, unit: findUnitByRoll(data.coworkers, r), tier: coworkerTier };
  }
  const loreSeed = p.has('ls') ? parseInt(p.get('ls')) : null;
  return { gap, results, loreSeed };
}

// Roll a die (1 to sides)
function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

// Find item in table by roll value
function findByRoll(table, roll) {
  if (!table || !table.items) return null;
  return table.items.find(item => {
    const itemRoll = parseInt(item.roll);
    return itemRoll === roll;
  }) || table.items[table.items.length - 1];
}

// Get display values from a table item
function getItemDisplay(item, table) {
  if (!item) return { name: '?', detail: '' };
  // Try common field names
  const name = item.name || item.mission || item.faction || item.setup || item.location || item.advantage || '';
  const detail = item.effect || item.advantages || '';
  return { name, detail };
}

// Build anchor for a mission: "1-extraction", "2-control", etc.
function missionAnchor(item) {
  if (!item) return '';
  const name = (item.mission || '').toLowerCase().replace(/\s+/g, '-');
  return `${item.roll}-${name}`;
}

// Determine advantage count from gap
function getAdvantageCount(gap) {
  if (gap >= 4) return 3; // 1 setup + 1 tactical + 1 either
  if (gap >= 2) return 2; // 1 setup + 1 tactical
  return 0;
}

// --- Lore template engine ---

// Seeded PRNG (mulberry32) - deterministic random from a 32-bit seed
function mulberry32(seed) {
  let s = seed | 0;
  return function() {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function resolveLore(template, context, pools, seed) {
  const rng = mulberry32(seed);
  let text = template;
  for (let depth = 0; depth < 5; depth++) {
    // Phase 1: Resolve conditionals (innermost first)
    let prev;
    do {
      prev = text;
      text = text.replace(/\{\{if:([a-zA-Z0-9_]+)=([^}]+)\}\}([\s\S]*?)\{\{\/if\}\}/g,
        (_, key, val, body) => context[key] === val ? body : '');
    } while (text !== prev);

    // Phase 2: Resolve picks and variables
    let changed = false;
    text = text.replace(/\{\{pick:([a-zA-Z0-9_]+)(?::(\d+))?\}\}/g, (_, poolName, count) => {
      const pool = pools[poolName];
      if (!pool || pool.length === 0) return '';
      changed = true;
      const n = count ? Math.min(parseInt(count), pool.length) : 1;
      const shuffled = [...pool].sort(() => rng() - 0.5);
      return shuffled.slice(0, n).join(', ');
    });
    text = text.replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, (match, key) => {
      if (context[key] !== undefined && context[key] !== '') { changed = true; return context[key]; }
      return match;
    });
    if (!changed) break;
  }
  // Cleanup: strip unresolved tokens, collapse spaces, fix punctuation
  text = text.replace(/\{\{[^}]*\}\}/g, '');
  text = text.replace(/\s{2,}/g, ' ').replace(/\s+\./g, '.').replace(/\s+,/g, ',');
  return text.trim();
}

function buildLoreContext(results) {
  const file = results.hostileFactions?.item?.file || '';
  return {
    mission:      results.mission?.item?.mission || '',
    faction:      results.hostileFactions?.item?.faction || '',
    factionKey:   file.replace('hostiles/', '').replace('.json', ''),
    deployment:   results.deployment?.item?.name || '',
    timing:       results.hostileTiming?.item?.name || '',
    loot:         results.lootLayout?.item?.name || '',
    lootMod:      results.lootModifiers?.item?.name || '',
    coworkerMod:  results.coworkerModifiers?.item?.name || '',
    hostileUnit0: results.hostileUnits?.[0]?.unit?.name || '',
    hostileUnit1: results.hostileUnits?.[1]?.unit?.name || '',
    coworkerUnit: results.coworkerUnit?.unit?.name || '',
  };
}

function generateLoreText(results, loreData, seed) {
  if (!loreData?.templates || !loreData?.pools) return '';
  const context = buildLoreContext(results);
  const missionKey = context.mission;
  const candidates = loreData.templates[missionKey] || loreData.templates['default'] || [];
  if (candidates.length === 0) return '';
  const templateRng = mulberry32(seed);
  const template = candidates[Math.floor(templateRng() * candidates.length)];
  return resolveLore(template, context, loreData.pools, seed);
}

// --- Unit tier helpers ---

// Map tier name to d6 roll range: swarm=1-2, normal=3-4, elite=5-6
const TIER_ROLLS = { swarm: [1, 2], normal: [3, 4], elite: [5, 6] };

// Roll a unit within a tier from a faction's unit list
function rollUnitInTier(factionUnits, tier) {
  const rolls = TIER_ROLLS[tier];
  if (!rolls || !factionUnits?.units?.items) return null;
  const pick = rolls[rollDie(2) - 1]; // d2 → index 0 or 1
  return factionUnits.units.items.find(u => parseInt(u.roll) === pick) || null;
}

// Find a unit by exact roll in a faction's unit list
function findUnitByRoll(factionUnits, roll) {
  if (!factionUnits?.units?.items) return null;
  return factionUnits.units.items.find(u => parseInt(u.roll) === roll) || null;
}

// --- Markdown rendering ---

// Convert inline markdown to React elements: `code`, **bold**, *italic*
function renderMarkdown(text) {
  if (!text) return null;
  const parts = [];
  let remaining = String(text);
  let key = 0;
  while (remaining.length > 0) {
    const codeMatch = remaining.match(/`([^`]+)`/);
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    // *italic* but not **bold** : single * followed by non-* content and closing single *
    const italicMatch = remaining.match(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/);
    const matches = [codeMatch, boldMatch, italicMatch].filter(Boolean);
    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }
    const earliest = matches.reduce((a, b) => a.index < b.index ? a : b);
    if (earliest.index > 0) {
      parts.push(remaining.slice(0, earliest.index));
    }
    if (earliest === codeMatch) {
      parts.push(<code key={key++} style={{
        fontFamily: "'Courier New', monospace", fontWeight: 'bold',
        backgroundColor: 'var(--wb-bg-medium)', padding: '1px 4px', borderRadius: '3px',
        fontSize: '0.85em',
      }}>{earliest[1]}</code>);
    } else if (earliest === boldMatch) {
      parts.push(<strong key={key++}>{earliest[1]}</strong>);
    } else {
      parts.push(<em key={key++}>{earliest[1]}</em>);
    }
    remaining = remaining.slice(earliest.index + earliest[0].length);
  }
  return parts;
}

// Split markdown text into paragraph blocks, merging consecutive blockquote lines
function splitIntoBlocks(text) {
  if (!text) return [];
  const lines = text.split('\n');
  const blocks = [];
  let current = { type: 'text', lines: [] };

  function flush() {
    const content = current.lines.join('\n').trim();
    if (content) blocks.push({ type: current.type, content });
    current = { type: 'text', lines: [] };
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flush();
      continue;
    }
    if (trimmed.startsWith('> ')) {
      if (current.type !== 'quote') flush();
      current.type = 'quote';
      current.lines.push(trimmed.slice(2));
    } else {
      if (current.type !== 'text') flush();
      // Bold labels like **Reward:** start a new block
      if (trimmed.startsWith('**') && current.lines.length > 0) flush();
      current.type = 'text';
      current.lines.push(trimmed);
    }
  }
  flush();
  return blocks;
}

// --- Board Map DSL parser + SVG renderer ---

const MAP_COLORS = {
  blue:   { fill: 'rgba(60,100,180,0.25)', stroke: 'rgba(60,100,180,0.7)' },
  red:    { fill: 'rgba(180,60,60,0.30)',  stroke: 'rgba(180,60,60,0.7)' },
  green:  { fill: 'rgba(60,140,60,0.15)',  stroke: 'rgba(60,140,60,0.6)' },
  yellow: { fill: 'rgba(200,180,40,0.20)', stroke: 'rgba(200,180,40,0.7)' },
  orange: { fill: 'rgba(200,120,40,0.20)', stroke: 'rgba(200,120,40,0.7)' },
};

function parseDSL(text) {
  if (!text) return [];
  return text.split('\n').map(line => {
    line = line.trim();
    if (!line) return null;

    // Extract label
    let label = null;
    const lm = line.match(/"([^"]*)"/);
    if (lm) { label = lm[1]; line = line.slice(0, lm.index).trim(); }

    const parts = line.split(/\s+/);
    const cmd = parts[0]; // zone, area, obj, spawn

    if (cmd === 'zone' || cmd === 'area') {
      const type = parts[1]; // rect, box, diag, circle
      const filled = cmd === 'zone';
      if (type === 'box') {
        return { cmd, type, filled, x1: +parts[2], y1: +parts[3], x2: +parts[4], y2: +parts[5], color: parts[6] || 'blue', label };
      }
      if (type === 'ring') {
        return { cmd: 'area', type, filled: false, side: parts[2], inner: +parts[3], outer: +parts[4], color: parts[5] || 'green', label };
      }
      // rect, diag, circle
      return { cmd, type, filled, side: parts[2], depth: +parts[3], color: parts[4] || 'blue', label };
    }
    if (cmd === 'obj') {
      return { cmd, x: +parts[1], y: +parts[2], label };
    }
    if (cmd === 'measure') {
      return { cmd, x1: +parts[1], y1: +parts[2], x2: +parts[3], y2: +parts[4], label };
    }
    if (cmd === 'spawn') {
      return { cmd, side: parts[1], color: parts[2] || 'red', label };
    }
    return null;
  }).filter(Boolean);
}

function getRectBBox(side, depth) {
  if (side === 'top')    return { x: 0, y: 0, w: 24, h: depth };
  if (side === 'bottom') return { x: 0, y: 24 - depth, w: 24, h: depth };
  if (side === 'left')   return { x: 0, y: 0, w: depth, h: 24 };
  if (side === 'right')  return { x: 24 - depth, y: 0, w: depth, h: 24 };
  return { x: 0, y: 0, w: 0, h: 0 };
}

function getDiagPoints(corner, depth) {
  const d = depth;
  if (corner === 'top-left')     return `0,0 ${d},0 0,${d}`;
  if (corner === 'top-right')    return `24,0 ${24-d},0 24,${d}`;
  if (corner === 'bottom-left')  return `0,24 ${d},24 0,${24-d}`;
  if (corner === 'bottom-right') return `24,24 ${24-d},24 24,${24-d}`;
  return '';
}

function getDiagCenter(corner, depth) {
  const d = depth;
  if (corner === 'top-left')     return { x: d/3, y: d/3 };
  if (corner === 'top-right')    return { x: 24 - d/3, y: d/3 };
  if (corner === 'bottom-left')  return { x: d/3, y: 24 - d/3 };
  if (corner === 'bottom-right') return { x: 24 - d/3, y: 24 - d/3 };
  return { x: 12, y: 12 };
}

function getCenter(side) {
  const centers = { center: [12,12], top: [12,0], bottom: [12,24], left: [0,12], right: [24,12] };
  return centers[side] || [12,12];
}

function getSpawnPos(side) {
  const positions = {
    center: [12,12], top: [12,1], bottom: [12,23], left: [1,12], right: [23,12],
    'top-left': [2,2], 'top-right': [22,2], 'bottom-left': [2,22], 'bottom-right': [22,22],
  };
  return positions[side] || [12,12];
}

// Measurement line with dimension text (e.g., |<--3"-->|)
function MeasureLine({ x1, y1, x2, y2, label, color }) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const vertical = Math.abs(x2 - x1) < Math.abs(y2 - y1);
  const tick = 0.3;
  const c = color || 'rgba(0,0,0,0.5)';
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="0.06" strokeDasharray="0.2 0.15" />
      {vertical ? (
        <React.Fragment>
          <line x1={x1-tick} y1={y1} x2={x1+tick} y2={y1} stroke={c} strokeWidth="0.06" />
          <line x1={x2-tick} y1={y2} x2={x2+tick} y2={y2} stroke={c} strokeWidth="0.06" />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <line x1={x1} y1={y1-tick} x2={x1} y2={y1+tick} stroke={c} strokeWidth="0.06" />
          <line x1={x2} y1={y2-tick} x2={x2} y2={y2+tick} stroke={c} strokeWidth="0.06" />
        </React.Fragment>
      )}
      <text x={mx} y={my + 0.25} textAnchor="middle" fontSize="0.7" fontWeight="bold" fill={c} stroke="white" strokeWidth="0.2" paintOrder="stroke">{label}</text>
    </g>
  );
}

function deoverlapLabels(labels) {
  for (let iter = 0; iter < 20; iter++) {
    let moved = false;
    for (let i = 0; i < labels.length; i++) {
      if (labels[i].rotate) continue;
      for (let j = i + 1; j < labels.length; j++) {
        if (labels[j].rotate) continue;
        const a = labels[i], b = labels[j];
        const aw = a.text.length * a.fs * 0.6 + 0.8;
        const bw = b.text.length * b.fs * 0.6 + 0.8;
        const ah = a.fs * 1.6, bh = b.fs * 1.6;
        const ox = (aw + bw) / 2 - Math.abs(a.x - b.x);
        const oy = (ah + bh) / 2 - Math.abs(a.y - b.y);
        if (ox > 0 && oy > 0) {
          const dy = oy / 2 + 0.15;
          if (a.y <= b.y) { a.y -= dy; b.y += dy; }
          else { a.y += dy; b.y -= dy; }
          a.y = Math.max(0.5, Math.min(23.5, a.y));
          b.y = Math.max(0.5, Math.min(23.5, b.y));
          moved = true;
        }
      }
    }
    if (!moved) break;
  }
}

function BoardMap({ layers }) {
  const allDirectives = layers.flatMap(dsl => parseDSL(dsl));
  if (allDirectives.length === 0) return null;

  const FS = 1.4;   // main font
  const SM = 0.9;   // small font (obj labels)
  const mc = 'rgba(0,0,0,0.45)'; // measurement color

  // Collect measurements to draw on top
  const measurements = [];

  function addRectMeasure(side, depth, idx) {
    if (depth < 1) return; // Skip measurements for edge-only zones
    const label = `${depth}"`;
    const off = 0.6;
    if (side === 'top')    measurements.push({ x1: 24-off, y1: 0, x2: 24-off, y2: depth, label, key: `m${idx}` });
    if (side === 'bottom') measurements.push({ x1: 24-off, y1: 24-depth, x2: 24-off, y2: 24, label, key: `m${idx}` });
    if (side === 'left')   measurements.push({ x1: 0, y1: 24-off, x2: depth, y2: 24-off, label, key: `m${idx}` });
    if (side === 'right')  measurements.push({ x1: 24-depth, y1: 24-off, x2: 24, y2: 24-off, label, key: `m${idx}` });
  }

  const seenCircles = new Set();
  function addCircleMeasure(side, radius, idx) {
    const ck = `${side}_${radius}`;
    if (seenCircles.has(ck)) return;
    seenCircles.add(ck);
    const [cx, cy] = getCenter(side);
    if (side === 'center') {
      // Draw leftward from center to avoid label overlap at bottom
      measurements.push({ x1: cx, y1: cy - 0.5, x2: cx - radius, y2: cy - 0.5, label: `${radius}"`, key: `m${idx}` });
    } else {
      measurements.push({ x1: cx, y1: cy, x2: cx + radius, y2: cy, label: `${radius}"`, key: `m${idx}` });
    }
  }

  function addBoxMeasure(x1, y1, x2, y2, idx) {
    // Show distance from nearest edge (skip for thin strips or edge-touching boxes)
    const w = x2 - x1, h = y2 - y1;
    if (x1 > 0 && w > 2) measurements.push({ x1: 0, y1: y1 + 0.8, x2: x1, y2: y1 + 0.8, label: `${x1}"`, key: `m${idx}a` });
    // Skip vertical measurement if same as horizontal (symmetric centered box)
    if (y1 > 0 && h > 2 && y1 !== x1) measurements.push({ x1: x1 + 0.8, y1: 0, x2: x1 + 0.8, y2: y1, label: `${y1}"`, key: `m${idx}b` });
  }

  // Measurement for filled box zones (show depth from nearest edge)
  const seenBoxes = new Set();
  const filledBoxes = []; // collect for gap measurement
  function addFilledBoxMeasure(x1, y1, x2, y2, idx) {
    const w = x2 - x1, h = y2 - y1;
    const off = 0.6;
    if (y2 === 24 && h < 12) {
      const k = `bottom_${h}`;
      // Draw measurement on left side if box touches right edge, otherwise right side
      const mx = x2 >= 24 ? x1 - off : x2 + off;
      if (!seenBoxes.has(k)) { seenBoxes.add(k); measurements.push({ x1: mx, y1: y1, x2: mx, y2: 24, label: `${h}"`, key: `m${idx}` }); }
    } else if (y1 === 0 && h < 12) {
      const k = `top_${h}`;
      const mx = x2 >= 24 ? x1 - off : x2 + off;
      if (!seenBoxes.has(k)) { seenBoxes.add(k); measurements.push({ x1: mx, y1: 0, x2: mx, y2: h, label: `${h}"`, key: `m${idx}` }); }
    } else if (x2 === 24 && w < 12) {
      const k = `right_${w}`;
      const my = y2 >= 24 ? y1 - off : y2 + off;
      if (!seenBoxes.has(k)) { seenBoxes.add(k); measurements.push({ x1: x1, y1: my, x2: 24, y2: my, label: `${w}"`, key: `m${idx}` }); }
    } else if (x1 === 0 && w < 12) {
      const k = `left_${w}`;
      const my = y2 >= 24 ? y1 - off : y2 + off;
      if (!seenBoxes.has(k)) { seenBoxes.add(k); measurements.push({ x1: 0, y1: my, x2: w, y2: my, label: `${w}"`, key: `m${idx}` }); }
    }
    filledBoxes.push({ x1, y1, x2, y2, idx });
  }
  // After all boxes collected, check for horizontal/vertical gaps between same-row boxes
  function addFilledBoxGaps() {
    for (let a = 0; a < filledBoxes.length; a++) {
      for (let b = a + 1; b < filledBoxes.length; b++) {
        const A = filledBoxes[a], B = filledBoxes[b];
        // Same vertical band (same y range) — horizontal gap
        if (A.y1 === B.y1 && A.y2 === B.y2) {
          const left = A.x2 < B.x1 ? A : B;
          const right = A.x2 < B.x1 ? B : A;
          const gap = right.x1 - left.x2;
          if (gap > 0) {
            const my = A.y1 + 0.8; // near top edge to avoid depth measurement overlap
            measurements.push({ x1: left.x2, y1: my, x2: right.x1, y2: my, label: `${gap}"`, key: `mgap${a}_${b}` });
          }
        }
        // Same horizontal band (same x range) — vertical gap
        if (A.x1 === B.x1 && A.x2 === B.x2) {
          const top = A.y2 < B.y1 ? A : B;
          const bottom = A.y2 < B.y1 ? B : A;
          const gap = bottom.y1 - top.y2;
          if (gap > 0) {
            const mx = A.x1 + (A.x2 - A.x1) / 2;
            measurements.push({ x1: mx, y1: top.y2, x2: mx, y2: bottom.y1, label: `${gap}"`, key: `mgap${a}_${b}` });
          }
        }
      }
    }
  }

  // Measurement for diagonal (corner) zones — show leg length
  const seenDiags = new Set();
  function addDiagMeasure(corner, depth, idx) {
    if (seenDiags.has(depth)) return;
    seenDiags.add(depth);
    const off = 0.6;
    // Show measurement along the top edge for any corner
    if (corner === 'top-left') {
      measurements.push({ x1: 0, y1: -off + 0.1, x2: depth, y2: -off + 0.1, label: `${depth}"`, key: `m${idx}` });
    } else if (corner === 'top-right') {
      measurements.push({ x1: 24 - depth, y1: -off + 0.1, x2: 24, y2: -off + 0.1, label: `${depth}"`, key: `m${idx}` });
    } else if (corner === 'bottom-left') {
      measurements.push({ x1: 0, y1: 24 + off - 0.1, x2: depth, y2: 24 + off - 0.1, label: `${depth}"`, key: `m${idx}` });
    } else if (corner === 'bottom-right') {
      measurements.push({ x1: 24 - depth, y1: 24 + off - 0.1, x2: 24, y2: 24 + off - 0.1, label: `${depth}"`, key: `m${idx}` });
    }
  }

  return (
    <div className="rounded-lg overflow-hidden border-2" style={{ borderColor: 'var(--wb-border)' }}>
      <svg viewBox="-0.5 -0.5 25 25" xmlns="http://www.w3.org/2000/svg"
           style={{ width: '100%', display: 'block', backgroundColor: '#fff' }}>
        <defs>
          {/* Diagonal stripes for coworker zones (green) */}
          <pattern id="hatch-green" patternUnits="userSpaceOnUse" width="0.7" height="0.7" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="0.7" stroke="rgba(60,140,60,0.25)" strokeWidth="0.2" />
          </pattern>
          {/* Dot pattern for loot zones (yellow) */}
          <pattern id="hatch-yellow" patternUnits="userSpaceOnUse" width="1.2" height="1.2">
            <circle cx="0.6" cy="0.6" r="0.15" fill="rgba(180,160,30,0.3)" />
          </pattern>
          {/* Cross-hatch for deployment areas (red/blue) */}
          <pattern id="hatch-red" patternUnits="userSpaceOnUse" width="0.8" height="0.8" patternTransform="rotate(-45)">
            <line x1="0" y1="0" x2="0" y2="0.8" stroke="rgba(180,60,60,0.2)" strokeWidth="0.2" />
          </pattern>
          <pattern id="hatch-blue" patternUnits="userSpaceOnUse" width="0.8" height="0.8" patternTransform="rotate(-45)">
            <line x1="0" y1="0" x2="0" y2="0.8" stroke="rgba(60,100,180,0.2)" strokeWidth="0.2" />
          </pattern>
          <pattern id="hatch-orange" patternUnits="userSpaceOnUse" width="0.8" height="0.8" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="0.8" stroke="rgba(200,120,40,0.2)" strokeWidth="0.2" />
          </pattern>
        </defs>
        {/* Grid lines — 2" minor, 6" major */}
        {[2,4,6,8,10,12,14,16,18,20,22].map(v => {
          const major = v % 6 === 0;
          return (
            <React.Fragment key={v}>
              <line x1={v} y1={0} x2={v} y2={24} stroke={major ? '#bbb' : '#e8e8e8'} strokeWidth={major ? 0.06 : 0.03} />
              <line x1={0} y1={v} x2={24} y2={v} stroke={major ? '#bbb' : '#e8e8e8'} strokeWidth={major ? 0.06 : 0.03} />
            </React.Fragment>
          );
        })}
        {/* Grid labels at 6" */}
        {[6,12,18].map(v => (
          <React.Fragment key={`l${v}`}>
            <text x={v} y={-0.15} textAnchor="middle" fontSize="0.45" fill="#aaa">{v}"</text>
            <text x={-0.15} y={v + 0.15} textAnchor="end" fontSize="0.45" fill="#aaa">{v}"</text>
          </React.Fragment>
        ))}
        {/* Board outline */}
        <rect x={0} y={0} width={24} height={24} fill="none" stroke="#000" strokeWidth="0.12" />

        {/* Render directives — two passes: shapes first, then labels on top */}
        {(() => {
          const shapes = [];
          const labels = [];
          const labelData = [];

          allDirectives.forEach((d, i) => {
            // --- Filled zones ---
            if ((d.cmd === 'zone' || d.cmd === 'area') && d.filled) {
              const c = MAP_COLORS[d.color] || MAP_COLORS.blue;
              if (d.type === 'rect') {
                const b = getRectBBox(d.side, d.depth);
                const isEdge = d.depth < 1;
                const isNarrow = !isEdge && b.h > b.w * 2;
                const cx = b.x + b.w/2, cy = b.y + b.h/2;
                addRectMeasure(d.side, d.depth, i);
                let lx = cx, ly = cy, lfs = FS * 0.75;
                if (isEdge) {
                  const inset = 1;
                  if (d.side === 'top')    { lx = cx; ly = b.y + b.h + inset; }
                  if (d.side === 'bottom') { lx = cx; ly = b.y - inset; }
                  if (d.side === 'left')   { lx = b.x + b.w + inset; ly = cy; }
                  if (d.side === 'right')  { lx = b.x - inset; ly = cy; }
                } else if (!isNarrow) {
                  lfs = Math.min(FS, b.w / ((d.label || '').length * 0.55), b.h * 0.7);
                } else {
                  lfs = Math.min(FS, b.h / ((d.label || '').length * 0.55), b.w * 0.65);
                }
                shapes.push(<rect key={`s${i}`} x={b.x} y={b.y} width={b.w} height={b.h} fill={c.fill} stroke="#000" strokeWidth="0.08" />);
                const edgeVertical = isEdge && (d.side === 'left' || d.side === 'right');
                if (d.label) labelData.push({ x: lx, y: ly, text: d.label, fs: lfs, fill: c.stroke || '#000', key: `l${i}`, rotate: (isNarrow || edgeVertical) ? -90 : null });
              }
              if (d.type === 'box') {
                const w = d.x2 - d.x1, h = d.y2 - d.y1;
                const cx = d.x1 + w/2, cy = d.y1 + h/2;
                const isNarrow = h > w * 2;
                const fitW = isNarrow ? h : w;
                const fitH = isNarrow ? w : h;
                const fs = d.label ? Math.min(FS, fitW / (d.label.length * 0.7), fitH * 0.7) : FS;
                addFilledBoxMeasure(d.x1, d.y1, d.x2, d.y2, i);
                shapes.push(<rect key={`s${i}`} x={d.x1} y={d.y1} width={w} height={h} fill={c.fill} stroke="#000" strokeWidth="0.08" />);
                if (d.label) labelData.push({ x: cx, y: cy, text: d.label, fs, fill: c.stroke || '#000', key: `l${i}`, rotate: isNarrow ? -90 : null });
              }
              if (d.type === 'diag') {
                const pts = getDiagPoints(d.side, d.depth);
                const ct = getDiagCenter(d.side, d.depth);
                const diagW = d.depth * 0.85;
                const diagFs = d.label ? Math.min(FS * 0.8, diagW / (d.label.length * 0.7)) : FS * 0.8;
                const isTop = d.side.includes('top');
                const isLeft = d.side.includes('left');
                const rot = (isTop === isLeft) ? -45 : 45;
                addDiagMeasure(d.side, d.depth, i);
                shapes.push(<polygon key={`s${i}`} points={pts} fill={c.fill} stroke="#000" strokeWidth="0.08" />);
                if (d.label) labelData.push({ x: ct.x, y: ct.y, text: d.label, fs: diagFs, fill: c.stroke || '#000', key: `l${i}`, rotate: rot });
              }
              if (d.type === 'circle') {
                const [cx, cy] = getCenter(d.side);
                addCircleMeasure(d.side, d.depth, i);
                shapes.push(<circle key={`s${i}`} cx={cx} cy={cy} r={d.depth} fill={c.fill} stroke="#000" strokeWidth="0.08" />);
                if (d.label) labelData.push({ x: cx, y: cy, text: d.label, fs: FS, fill: c.stroke || '#000', key: `l${i}` });
              }
            }

            // --- Dashed areas ---
            if ((d.cmd === 'zone' || d.cmd === 'area') && !d.filled) {
              const c = MAP_COLORS[d.color] || MAP_COLORS.green;
              const hatchMap = { yellow: 'url(#hatch-yellow)', green: 'url(#hatch-green)', red: 'url(#hatch-red)', blue: 'url(#hatch-blue)', orange: 'url(#hatch-orange)' };
              const hatch = hatchMap[d.color] || 'none';
              if (d.type === 'circle') {
                const [cx, cy] = getCenter(d.side);
                addCircleMeasure(d.side, d.depth, i);
                shapes.push(<circle key={`s${i}`} cx={cx} cy={cy} r={d.depth} fill={hatch} stroke={c.stroke} strokeWidth="0.12" strokeDasharray="0.4 0.25" />);
                if (d.label) labelData.push({ x: cx, y: cy + d.depth - 1.2, text: d.label, fs: FS * 0.85, fill: c.stroke, key: `l${i}` });
              }
              if (d.type === 'box') {
                const w = d.x2 - d.x1, h = d.y2 - d.y1;
                if (d.label) addBoxMeasure(d.x1, d.y1, d.x2, d.y2, i);
                shapes.push(<rect key={`s${i}`} x={d.x1} y={d.y1} width={w} height={h} fill={hatch} stroke={c.stroke} strokeWidth="0.12" strokeDasharray="0.4 0.25" />);
                if (d.label) {
                  const ly = d.color === 'green' ? d.y2 - 1.2 : d.y1 + 1.2;
                  labelData.push({ x: d.x1 + w/2, y: ly, text: d.label, fs: FS * 0.85, fill: c.stroke, key: `l${i}` });
                }
              }
              if (d.type === 'rect') {
                const b = getRectBBox(d.side, d.depth);
                shapes.push(<rect key={`s${i}`} x={b.x} y={b.y} width={b.w} height={b.h} fill={hatch} stroke={c.stroke} strokeWidth="0.12" strokeDasharray="0.4 0.25" />);
                if (d.label) labelData.push({ x: b.x + b.w/2, y: b.y + b.h/2, text: d.label, fs: FS * 0.85, fill: c.stroke, key: `l${i}` });
              }
              if (d.type === 'ring') {
                const [cx, cy] = getCenter(d.side);
                addCircleMeasure(d.side, d.inner, `${i}a`);
                addCircleMeasure(d.side, d.outer, `${i}b`);
                const ro = d.outer, ri = d.inner;
                const ringPath = `M${cx-ro},${cy} A${ro},${ro} 0 1,1 ${cx+ro},${cy} A${ro},${ro} 0 1,1 ${cx-ro},${cy} Z M${cx-ri},${cy} A${ri},${ri} 0 1,0 ${cx+ri},${cy} A${ri},${ri} 0 1,0 ${cx-ri},${cy} Z`;
                shapes.push(<path key={`sr${i}`} d={ringPath} fill={hatch} fillRule="evenodd" stroke="none" />);
                shapes.push(<circle key={`si${i}`} cx={cx} cy={cy} r={d.inner} fill="none" stroke={c.stroke} strokeWidth="0.12" strokeDasharray="0.4 0.25" />);
                shapes.push(<circle key={`so${i}`} cx={cx} cy={cy} r={d.outer} fill="none" stroke={c.stroke} strokeWidth="0.12" strokeDasharray="0.4 0.25" />);
                if (d.label) {
                  const midR = (d.inner + d.outer) / 2;
                  const ang = -Math.PI / 4; // upper-right diagonal
                  labelData.push({ x: cx + midR * Math.cos(ang), y: cy + midR * Math.sin(ang), text: d.label, fs: FS * 0.85, fill: c.stroke, key: `l${i}` });
                }
              }
            }

            // --- Objectives ---
            if (d.cmd === 'obj') {
              shapes.push(<circle key={`s${i}`} cx={d.x} cy={d.y} r={0.6} fill="#FFD700" stroke="#000" strokeWidth="0.08" />);
              if (d.label) labels.push(<text key={`l${i}`} x={d.x} y={d.y} textAnchor="middle" dominantBaseline="central" fontSize={SM} fontWeight="bold" fill="#000">{d.label}</text>);
            }

            // --- Measure lines ---
            if (d.cmd === 'measure') {
              let ml = d.label;
              if (!ml) {
                const dx = d.x2 - d.x1, dy = d.y2 - d.y1;
                ml = `${Math.round(Math.sqrt(dx*dx + dy*dy))}"`;
              }
              measurements.push({ x1: d.x1, y1: d.y1, x2: d.x2, y2: d.y2, label: ml, key: `m${i}` });
            }

            // --- Spawn markers ---
            if (d.cmd === 'spawn') {
              const sc = "rgba(180,60,60,0.8)";
              const sw = 0.25;
              const edges = { top: [[0,0],[24,0]], bottom: [[0,24],[24,24]], left: [[0,0],[0,24]], right: [[24,0],[24,24]] };
              const corners = {
                'top-left': [[[0,0],[3,0]],[[0,0],[0,3]]], 'top-right': [[[21,0],[24,0]],[[24,0],[24,3]]],
                'bottom-left': [[[0,21],[0,24]],[[0,24],[3,24]]], 'bottom-right': [[[21,24],[24,24]],[[24,21],[24,24]]],
              };
              const [sx, sy] = getSpawnPos(d.side);
              if (edges[d.side]) {
                const [[x1,y1],[x2,y2]] = edges[d.side];
                shapes.push(<line key={`s${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={sc} strokeWidth={sw} />);
              } else if (corners[d.side]) {
                const [l1, l2] = corners[d.side];
                shapes.push(<g key={`s${i}`}><line x1={l1[0][0]} y1={l1[0][1]} x2={l1[1][0]} y2={l1[1][1]} stroke={sc} strokeWidth={sw} /><line x1={l2[0][0]} y1={l2[0][1]} x2={l2[1][0]} y2={l2[1][1]} stroke={sc} strokeWidth={sw} /></g>);
              } else {
                const s = 0.8;
                shapes.push(<g key={`s${i}`}><line x1={sx-s} y1={sy-s} x2={sx+s} y2={sy+s} stroke={sc} strokeWidth="0.15" /><line x1={sx+s} y1={sy-s} x2={sx-s} y2={sy+s} stroke={sc} strokeWidth="0.15" /></g>);
              }
              if (d.label) labelData.push({ x: sx, y: sy + 1.2, text: d.label, fs: SM, fill: sc, key: `l${i}` });
            }
          });

          addFilledBoxGaps();

          // De-overlap and render labels with white stroke
          deoverlapLabels(labelData);
          labelData.forEach(ld => {
            const props = { key: ld.key, x: ld.x, y: ld.y, textAnchor: 'middle', dominantBaseline: 'central', fontSize: ld.fs, fontWeight: 'bold', fill: ld.fill, stroke: 'white', strokeWidth: 0.25, paintOrder: 'stroke' };
            if (ld.rotate) props.transform = `rotate(${ld.rotate} ${ld.x} ${ld.y})`;
            labels.push(<text {...props}>{ld.text}</text>);
          });

          return (
            <React.Fragment>
              {shapes}
              {labels}
            </React.Fragment>
          );
        })()}

        {/* Measurement lines on top */}
        {measurements.map(m => (
          <MeasureLine key={m.key} x1={m.x1} y1={m.y1} x2={m.x2} y2={m.y2} label={m.label} color={mc} />
        ))}
      </svg>
    </div>
  );
}

// --- Components ---

function ResultCard({ label, dieSize, roll, item, table, onReroll }) {
  const display = getItemDisplay(item, table);
  return (
    <div className="wb-bg-light rounded-lg p-4 border-2 wb-border flex flex-col gap-2"
         style={{ borderColor: 'var(--wb-border)' }}>
      <div className="flex items-center justify-between">
        <span className="font-bold wb-text-light text-sm uppercase tracking-wide">{label}</span>
        <div className="flex items-center gap-2">
          <span className="wb-text-muted text-xs font-mono">d{dieSize}: {roll}</span>
          <button onClick={onReroll}
                  className="wb-bg-medium hover:wb-bg-medium-hover wb-text-light text-xs px-2 py-1 rounded"
                  style={{ backgroundColor: 'var(--wb-bg-medium)', color: 'var(--wb-text-light)' }}
                  title={t('reroll')}>
            <i className="fas fa-dice"></i>
          </button>
        </div>
      </div>
      <div>
        <span className="wb-text-secondary font-bold" style={{ color: 'var(--wb-text-secondary)' }}>{renderMarkdown(display.name)}</span>
        {display.detail && (
          <span className="wb-text-muted text-sm ml-2" style={{ color: 'var(--wb-text-muted)' }}>{renderMarkdown(display.detail)}</span>
        )}
      </div>
    </div>
  );
}

function AdvantageCard({ label, dieSize, roll, item, table, onReroll, highlight }) {
  const display = getItemDisplay(item, table);
  return (
    <div className="rounded-lg p-4 border-2 flex flex-col gap-2"
         style={{
           backgroundColor: highlight ? 'var(--wb-bg-medium)' : 'var(--wb-bg-light)',
           borderColor: 'var(--wb-primary)',
         }}>
      <div className="flex items-center justify-between">
        <span className="font-bold text-sm uppercase tracking-wide" style={{ color: 'var(--wb-primary)' }}>{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono" style={{ color: 'var(--wb-text-muted)' }}>d{dieSize}: {roll}</span>
          <button onClick={onReroll}
                  className="text-xs px-2 py-1 rounded"
                  style={{ backgroundColor: 'var(--wb-bg-medium)', color: 'var(--wb-text-light)' }}
                  title={t('reroll')}>
            <i className="fas fa-dice"></i>
          </button>
        </div>
      </div>
      <div>
        <span className="font-bold" style={{ color: 'var(--wb-text-secondary)' }}>{renderMarkdown(display.name || display.detail)}</span>
        {display.name && display.detail && (
          <span className="text-sm ml-2" style={{ color: 'var(--wb-text-muted)' }}>{renderMarkdown(display.detail)}</span>
        )}
      </div>
    </div>
  );
}

function StatLine({ unit }) {
  const stats = [
    { label: 'COM', value: unit.combat },
    { label: 'DEF', value: unit.defense },
    { label: 'WIT', value: unit.wits },
    { label: 'HP', value: unit.health },
    { label: 'MOV', value: unit.move },
  ];
  return (
    <div className="flex mt-1" style={{ gap: '1px', borderRadius: '4px', overflow: 'hidden' }}>
      {stats.map(s => (
        <div key={s.label} className="text-center px-2 py-0.5"
             style={{ backgroundColor: 'var(--wb-bg-darker)', minWidth: 0, flex: '1 1 0' }}>
          <div className="font-mono" style={{ fontSize: '10px', color: 'var(--wb-text-muted)', lineHeight: 1 }}>{s.label}</div>
          <div className="font-mono font-bold" style={{ fontSize: '11px', color: 'var(--wb-text-light)', lineHeight: 1.3 }}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}

function BehaviorTable({ behavior, title }) {
  if (!behavior?.items) return null;
  return (
    <div className="rounded overflow-hidden" style={{ backgroundColor: 'var(--wb-bg-darker)' }}>
      <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--wb-bg-medium)' }}>
            <th className="px-2 py-1 text-left font-bold uppercase tracking-wide" colSpan={4}
                style={{ color: 'var(--wb-text-light)', fontSize: '10px' }}>{title || t('behavior')}</th>
          </tr>
          <tr style={{ backgroundColor: 'var(--wb-bg-medium)' }}>
            <th className="px-2 py-1 text-center font-mono" style={{ color: 'var(--wb-text-muted)', width: '2rem' }}>d6</th>
            <th className="px-2 py-1 text-center" style={{ color: 'var(--wb-text-muted)' }}>{t('noLoS')}</th>
            <th className="px-2 py-1 text-center" style={{ color: 'var(--wb-text-muted)' }}>{t('hasLoS')}</th>
            <th className="px-2 py-1 text-center" style={{ color: 'var(--wb-text-muted)' }}>{t('engaged')}</th>
          </tr>
        </thead>
        <tbody>
          {behavior.items.map((row, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 ? 'var(--wb-bg-medium)' : 'transparent' }}>
              <td className="px-2 py-1 text-center font-mono" style={{ color: 'var(--wb-text-muted)', whiteSpace: 'nowrap' }}>{row.roll}</td>
              <td className="px-2 py-1 text-center" style={{ color: 'var(--wb-text-light)' }}>{row.no_los}</td>
              <td className="px-2 py-1 text-center" style={{ color: 'var(--wb-text-light)' }}>{row.has_los}</td>
              <td className="px-2 py-1 text-center" style={{ color: 'var(--wb-text-light)' }}>{row.engaged}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UnitRow({ unit, tier, round, label, onReroll }) {
  const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);
  return (
    <div className="rounded-lg px-3 py-2" style={{ backgroundColor: 'var(--wb-bg-medium)' }}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          {label && <div className="font-bold text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--wb-text-muted)' }}>{label}</div>}
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {round && <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--wb-bg-darker)', color: 'var(--wb-text-light)' }}>{t('round')}{round}</span>}
            <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--wb-bg-darker)', color: 'var(--wb-text-light)' }}>{tierLabel}</span>
            <span className="font-bold" style={{ color: 'var(--wb-text-secondary)', fontSize: '1rem' }}>{unit.name}</span>
            <span className="text-sm font-mono" style={{ color: 'var(--wb-text-light)' }}>×{unit.spawn}</span>
          </div>
          <div className="text-sm mb-1" style={{ color: 'var(--wb-text-light)' }}>
            {renderMarkdown(unit.weapon)}
          </div>
          <StatLine unit={unit} />
        </div>
        <button onClick={onReroll}
                className="text-xs px-2 py-1 rounded flex-shrink-0 mt-1"
                style={{ backgroundColor: 'var(--wb-bg-darker)', color: 'var(--wb-text-light)' }}
                title={t('reroll')}>
          <i className="fas fa-dice"></i>
        </button>
      </div>
    </div>
  );
}

// --- Print View ---

function PrintBehavior({ behavior, title }) {
  if (!behavior?.items) return null;
  return (
    <table className="print-behavior">
      <thead>
        <tr><th colSpan={4}>{title}</th></tr>
        <tr><th>d6</th><th>{t('noLoS')}</th><th>{t('hasLoS')}</th><th>{t('engaged')}</th></tr>
      </thead>
      <tbody>
        {behavior.items.map((row, i) => (
          <tr key={i} style={{ backgroundColor: i % 2 ? '#f5f5f5' : 'transparent' }}>
            <td style={{ fontFamily: 'monospace' }}>{row.roll}</td>
            <td>{row.no_los}</td>
            <td>{row.has_los}</td>
            <td>{row.engaged}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PrintUnit({ unit, tier, round }) {
  if (!unit) return null;
  const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);
  const stats = [
    { label: 'COM', value: unit.combat },
    { label: 'DEF', value: unit.defense },
    { label: 'WIT', value: unit.wits },
    { label: 'HP', value: unit.health },
    { label: 'MOV', value: unit.move },
  ];
  return (
    <div className="print-unit">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '2mm', flexWrap: 'wrap' }}>
        <span className="print-unit-name">{unit.name}</span>
        <span className="print-unit-meta">{tierLabel} ×{unit.spawn}</span>
        {round && <span className="print-unit-meta">{t('round')}{round}</span>}
      </div>
      <div className="print-unit-meta">{renderMarkdown(unit.weapon)}</div>
      <div className="print-stats">
        {stats.map(s => (
          <div key={s.label}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrintView({ results, data, loreText, gap }) {
  if (!results) return null;
  const missionDisplay = getItemDisplay(results.mission.item);
  const deployDisplay = getItemDisplay(results.deployment.item, data.deployment);
  const lootDisplay = getItemDisplay(results.lootLayout.item, data.lootLayout);
  const lootModDisplay = getItemDisplay(results.lootModifiers.item, data.lootModifiers);
  const spawnDisplay = getItemDisplay(results.spawnLocation.item, data.spawnLocation);
  const timingDisplay = getItemDisplay(results.hostileTiming.item, data.hostileTiming);
  const factionDisplay = getItemDisplay(results.hostileFactions.item, data.hostileFactions);
  const cwSetupDisplay = getItemDisplay(results.coworkerSetup.item, data.coworkerSetup);
  const cwModDisplay = getItemDisplay(results.coworkerModifiers.item, data.coworkerModifiers);
  const advantageCount = getAdvantageCount(gap);

  const fFile = results.hostileFactions?.item?.file;
  const fData = fFile ? data.factionData?.[fFile] : null;

  return (
    <div className="print-view">
      {/* Header */}
      <h1>{missionDisplay.name}</h1>
      {loreText && <p className="print-lore">{loreText}</p>}

      {/* Mission description */}
      {results.mission.item?.description && (
        <div className="print-mission-desc">
          {splitIntoBlocks(results.mission.item.description).map((block, i) => {
            if (block.type === 'quote') {
              return <blockquote key={i}>
                {block.content.split('\n').map((line, j) => <span key={j}>{renderMarkdown(line)}{j < block.content.split('\n').length - 1 && <br />}</span>)}
              </blockquote>;
            }
            return <p key={i}>{renderMarkdown(block.content)}</p>;
          })}
        </div>
      )}

      {/* Middle: map + info left, units right */}
      <div className="print-top">
        <div className="print-map">
          <BoardMap layers={[
            results.deployment?.item?.map || '',
            results.lootLayout?.item?.map || '',
            results.coworkerSetup?.item?.map || '',
            results.spawnLocation?.item?.map || '',
          ]} />
          <div className="print-map-info">
            <strong>{t('deployment')}:</strong> {deployDisplay.name}{deployDisplay.detail ? ` (${deployDisplay.detail})` : ''}<br />
            <strong>{t('lootLayout')}:</strong> {lootDisplay.name}<br />
            {lootModDisplay.name !== 'Standard' && <span><strong>{t('lootModifiers')}:</strong> {renderMarkdown(lootModDisplay.detail || lootModDisplay.name)}<br /></span>}
            <strong>{t('spawnLocation')}:</strong> {spawnDisplay.name}{spawnDisplay.detail ? ` (${spawnDisplay.detail})` : ''}<br />
            <strong>{t('hostileTiming')}:</strong> {renderMarkdown(timingDisplay.detail || timingDisplay.name)}
          </div>
        </div>

        <div className="print-units">
          {/* Hostile units */}
          <h2>{factionDisplay.name || t('hostiles')}</h2>
          {fData?.special_rule && (
            <div className="print-special">{renderMarkdown(fData.special_rule)}</div>
          )}
          {results.hostileUnits?.map((hu, i) => hu?.unit && (
            <PrintUnit key={i} unit={hu.unit} tier={hu.tier} round={hu.round} />
          ))}

          {/* Coworker unit */}
          <h2>{t('coworkers')}: {cwSetupDisplay.name}</h2>
          {cwModDisplay.name !== 'Standard' && (
            <div className="print-detail"><strong>{cwModDisplay.name}:</strong> {renderMarkdown(cwModDisplay.detail)}</div>
          )}
          {data.coworkers?.special_rule && (
            <div className="print-special">
              {data.coworkers.special_rule.split('\n').map((line, i) => (
                <div key={i}>{renderMarkdown(line)}</div>
              ))}
            </div>
          )}
          {results.coworkerUnit?.unit && (
            <PrintUnit unit={results.coworkerUnit.unit} tier={results.coworkerUnit.tier} />
          )}
        </div>
      </div>

      {/* Bottom: behavior tables — 3 equal columns */}
      <div className="print-bottom">
        <div className="print-bottom-col">
          {fData?.behavior && <PrintBehavior behavior={fData.behavior} title={factionDisplay.name || t('behavior')} />}
        </div>
        <div className="print-bottom-col">
          {data.coworkers?.behavior && <PrintBehavior behavior={data.coworkers.behavior} title={t('coworkers') + ' · ' + t('behaviorNormal')} />}
        </div>
        <div className="print-bottom-col">
          {data.coworkers?.behavior_attacked && <PrintBehavior behavior={data.coworkers.behavior_attacked} title={t('behaviorAttacked')} />}
        </div>
      </div>

      {/* Advantages (if any) */}
      {advantageCount >= 2 && results.setupAdvantage && (
        <div className="print-advantages">
          <div><strong>{t('setupAdvantage')}: </strong>{getItemDisplay(results.setupAdvantage.item, data.setupAdvantages).name}
          {getItemDisplay(results.setupAdvantage.item, data.setupAdvantages).detail &&
            ` (${getItemDisplay(results.setupAdvantage.item, data.setupAdvantages).detail})`}</div>
          <div><strong>{t('tacticalAdvantage')}: </strong>{getItemDisplay(results.tacticalAdvantage.item, data.tacticalAdvantages).name}
          {getItemDisplay(results.tacticalAdvantage.item, data.tacticalAdvantages).detail &&
            ` (${getItemDisplay(results.tacticalAdvantage.item, data.tacticalAdvantages).detail})`}</div>
          {results.bonusAdvantage && (
            <div><strong>{t('bonusAdvantage')}: </strong>{getItemDisplay(results.bonusAdvantage.item, results.bonusAdvantage.isSetup ? data.setupAdvantages : data.tacticalAdvantages).name}</div>
          )}
        </div>
      )}
    </div>
  );
}

function ScenarioGenerator() {
  const data = window.SCENARIO_DATA;
  const shared = React.useMemo(() => paramsToResults(data), []);
  const [gap, setGap] = React.useState(shared ? shared.gap : 0);
  const [results, setResults] = React.useState(shared ? shared.results : null);
  const [copied, setCopied] = React.useState(false);
  const [loreSeed, setLoreSeed] = React.useState(() => shared?.loreSeed ?? (Math.random() * 0xFFFFFFFF) >>> 0);

  const advantageCount = getAdvantageCount(gap);

  const loreText = React.useMemo(() => {
    if (!results || !data.loreData) return '';
    return generateLoreText(results, data.loreData, loreSeed);
  }, [results, loreSeed]);

  function generateAll() {
    const missionCount = data.missionTable?.items?.length || 12;
    const missionRoll = rollDie(missionCount);
    const rolls = {
      mission: { roll: missionRoll, item: findByRoll(data.missionTable, missionRoll) },
      deployment: (() => { const r = rollDie(6); return { roll: r, item: findByRoll(data.deployment, r) }; })(),
      coworkerSetup: (() => { const r = rollDie(6); return { roll: r, item: findByRoll(data.coworkerSetup, r) }; })(),
      coworkerModifiers: (() => { const r = rollDie(6); return { roll: r, item: findByRoll(data.coworkerModifiers, r) }; })(),
      hostileTiming: (() => { const r = rollDie(6); return { roll: r, item: findByRoll(data.hostileTiming, r) }; })(),
      hostileFactions: (() => { const r = rollDie(6); return { roll: r, item: findByRoll(data.hostileFactions, r) }; })(),
      lootLayout: (() => { const r = rollDie(6); return { roll: r, item: findByRoll(data.lootLayout, r) }; })(),
      lootModifiers: (() => { const r = rollDie(6); return { roll: r, item: findByRoll(data.lootModifiers, r) }; })(),
      spawnLocation: (() => { const r = rollDie(6); return { roll: r, item: findByRoll(data.spawnLocation, r) }; })(),
    };

    // Roll hostile units based on faction + timing
    const factionFile = rolls.hostileFactions.item?.file;
    const factionUnits = factionFile ? data.factionData?.[factionFile] : null;
    const spawns = rolls.hostileTiming.item?.spawns || [];
    if (factionUnits) {
      rolls.hostileUnits = spawns.map(s => {
        const tierRolls = TIER_ROLLS[s.tier];
        const pick = tierRolls[rollDie(2) - 1];
        return { roll: pick, unit: findUnitByRoll(factionUnits, pick), tier: s.tier, round: s.round };
      });
    }

    // Roll coworker unit based on setup tier
    const cwTier = rolls.coworkerSetup.item?.tier;
    if (cwTier && data.coworkers) {
      const cwRolls = TIER_ROLLS[cwTier];
      const cwPick = cwRolls[rollDie(2) - 1];
      rolls.coworkerUnit = { roll: cwPick, unit: findUnitByRoll(data.coworkers, cwPick), tier: cwTier };
    }

    if (advantageCount >= 2) {
      rolls.setupAdvantage = (() => { const r = rollDie(6); return { roll: r, item: findByRoll(data.setupAdvantages, r) }; })();
      rolls.tacticalAdvantage = (() => { const r = rollDie(6); return { roll: r, item: findByRoll(data.tacticalAdvantages, r) }; })();
    }
    if (advantageCount >= 3) {
      // Bonus: either setup or tactical
      const bonusTable = Math.random() < 0.5 ? data.setupAdvantages : data.tacticalAdvantages;
      const r = rollDie(6);
      rolls.bonusAdvantage = { roll: r, item: findByRoll(bonusTable, r), isSetup: bonusTable === data.setupAdvantages };
    }

    setResults(rolls);
    setLoreSeed((Math.random() * 0xFFFFFFFF) >>> 0);
  }

  function reroll(key, sides, tableData) {
    const r = rollDie(sides);
    setResults(prev => {
      const next = { ...prev, [key]: { ...prev[key], roll: r, item: findByRoll(tableData, r) } };
      // Re-roll dependent units when faction or timing changes
      if (key === 'hostileFactions' || key === 'hostileTiming') {
        const fFile = next.hostileFactions?.item?.file;
        const fUnits = fFile ? data.factionData?.[fFile] : null;
        const spwns = next.hostileTiming?.item?.spawns || [];
        if (fUnits) {
          next.hostileUnits = spwns.map(s => {
            const tr = TIER_ROLLS[s.tier];
            const pick = tr[rollDie(2) - 1];
            return { roll: pick, unit: findUnitByRoll(fUnits, pick), tier: s.tier, round: s.round };
          });
        }
      }
      if (key === 'coworkerSetup') {
        const cwT = next.coworkerSetup?.item?.tier;
        if (cwT && data.coworkers) {
          const cwR = TIER_ROLLS[cwT];
          const cwP = cwR[rollDie(2) - 1];
          next.coworkerUnit = { roll: cwP, unit: findUnitByRoll(data.coworkers, cwP), tier: cwT };
        }
      }
      return next;
    });
  }

  function rerollHostileUnit(index) {
    setResults(prev => {
      const units = [...(prev.hostileUnits || [])];
      const s = prev.hostileTiming?.item?.spawns?.[index];
      const fFile = prev.hostileFactions?.item?.file;
      const fUnits = fFile ? data.factionData?.[fFile] : null;
      if (s && fUnits) {
        const tr = TIER_ROLLS[s.tier];
        const pick = tr[rollDie(2) - 1];
        units[index] = { roll: pick, unit: findUnitByRoll(fUnits, pick), tier: s.tier, round: s.round };
      }
      return { ...prev, hostileUnits: units };
    });
  }

  function rerollCoworkerUnit() {
    setResults(prev => {
      const cwT = prev.coworkerSetup?.item?.tier;
      if (!cwT || !data.coworkers) return prev;
      const cwR = TIER_ROLLS[cwT];
      const cwP = cwR[rollDie(2) - 1];
      return { ...prev, coworkerUnit: { roll: cwP, unit: findUnitByRoll(data.coworkers, cwP), tier: cwT } };
    });
  }

  function rerollBonus() {
    const bonusTable = Math.random() < 0.5 ? data.setupAdvantages : data.tacticalAdvantages;
    const r = rollDie(6);
    setResults(prev => ({
      ...prev,
      bonusAdvantage: { roll: r, item: findByRoll(bonusTable, r), isSetup: bonusTable === data.setupAdvantages },
    }));
  }

  // Auto-generate on load if no shared URL
  React.useEffect(() => { if (!shared) generateAll(); }, []);

  // Keep URL in sync with current results
  React.useEffect(() => {
    if (!results) return;
    const qs = resultsToParams(gap, results, loreSeed);
    const url = window.location.pathname + '?' + qs;
    window.history.replaceState(null, '', url);
  }, [gap, results, loreSeed]);

  function shareResults() {
    if (!results) return;
    const url = window.location.href;
    const missionName = results.mission.item?.mission || '';
    const shareData = { title: `Hardwired 28: ${missionName}`, url };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).catch(() => {});
    } else {
      const input = document.createElement('textarea');
      input.value = url;
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div>
      <style>{Object.entries(THEME_VARS).map(([k, v]) => `[data-theme="${k}"] { ${v} }`).join('\n')}{THEME_CLASSES}</style>

      {/* Print-only view */}
      <div className="print-only">
        <PrintView results={results} data={data} loreText={loreText} gap={gap} />
      </div>

      {/* Screen-only interactive UI */}
      <div className="screen-only wb-bg-dark wb-text-light min-h-screen" style={{ backgroundColor: 'var(--wb-bg-dark)', color: 'var(--wb-text-light)' }}>
        <div className="w-full mx-auto p-4 pt-6">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-black tracking-wider" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {t('title')}
            </h1>
          </div>

          {/* Evidence Gap + Buttons Row */}
          <div className="flex gap-2 mb-6 items-center" style={{ flexWrap: 'nowrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'nowrap' }}>
              <span className="font-bold text-sm uppercase tracking-wide wb-text-light"
                  style={{ color: 'var(--wb-text-light)', whiteSpace: 'nowrap', flexShrink: 0, display: 'inline' }}>
                {t('evidenceGap')}
              </span>
              <input type="number" min="0" max="10" value={gap}
                     onChange={e => {
                       const newGap = Math.max(0, parseInt(e.target.value) || 0);
                       const prevAdvantageCount = advantageCount;
                       const newAdvantageCount = getAdvantageCount(newGap);
                       setGap(newGap);

                       // If gap crosses threshold that affects advantages, regenerate them
                       if (results && (
                         (prevAdvantageCount < 2 && newAdvantageCount >= 2) ||
                         (prevAdvantageCount >= 2 && newAdvantageCount < 2) ||
                         (prevAdvantageCount < 3 && newAdvantageCount >= 3) ||
                         (prevAdvantageCount >= 3 && newAdvantageCount < 3)
                       )) {
                         // Regenerate advantages based on new advantage count
                         const newResults = { ...results };
                         if (newAdvantageCount >= 2) {
                           const r1 = rollDie(6);
                           const r2 = rollDie(6);
                           newResults.setupAdvantage = { roll: r1, item: findByRoll(data.setupAdvantages, r1) };
                           newResults.tacticalAdvantage = { roll: r2, item: findByRoll(data.tacticalAdvantages, r2) };
                         } else {
                           delete newResults.setupAdvantage;
                           delete newResults.tacticalAdvantage;
                           delete newResults.bonusAdvantage;
                         }

                         if (newAdvantageCount >= 3) {
                           const bonusTable = Math.random() < 0.5 ? data.setupAdvantages : data.tacticalAdvantages;
                           const r = rollDie(6);
                           newResults.bonusAdvantage = { roll: r, item: findByRoll(bonusTable, r), isSetup: bonusTable === data.setupAdvantages };
                         } else if (newResults.bonusAdvantage) {
                           delete newResults.bonusAdvantage;
                         }

                         setResults(newResults);
                       }
                     }}
                     className="px-2 py-1 rounded border text-center font-mono font-bold"
                     style={{ backgroundColor: 'var(--wb-bg-medium)', color: 'var(--wb-text-secondary)', borderColor: 'var(--wb-border)', fontSize: '16px', width: '40px', flexShrink: 0 }} />
              {advantageCount > 0 && (
                <span className="text-xs" style={{ color: 'var(--wb-primary)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  <i className="fas fa-shield-halved mr-1"></i>
                  {advantageCount === 2 ? '1 Setup + 1 Tactical' : '1 Setup + 1 Tactical + 1 Bonus'}
                </span>
              )}
            </div>
            <button onClick={generateAll}
                    className="py-3 px-4 rounded-lg font-bold text-sm uppercase tracking-wider"
                    style={{ backgroundColor: 'var(--wb-primary)', color: 'var(--wb-text-on-primary)', flexShrink: 0, marginLeft: 'auto' }}>
              <i className="fas fa-dice-d20 mr-2"></i>{t('generate')}
            </button>
            {results && (
              <button onClick={shareResults}
                      className="py-3 px-4 rounded-lg font-bold text-sm"
                      style={{ backgroundColor: 'var(--wb-bg-medium)', color: 'var(--wb-text-light)', flexShrink: 0 }}>
                <i className={copied ? 'fas fa-check' : 'fas fa-share-nodes'}></i>
                {copied ? ` ${t('copied')}` : ` ${t('share')}`}
              </button>
            )}
            {results && (
              <button onClick={() => window.print()}
                      className="py-3 px-4 rounded-lg font-bold text-sm"
                      style={{ backgroundColor: 'var(--wb-bg-medium)', color: 'var(--wb-text-light)', flexShrink: 0 }}>
                <i className="fas fa-print"></i>
                {` ${t('print')}`}
              </button>
            )}
          </div>

          {/* Lore Banner */}
          {results && loreText && (
            <div className="rounded-lg p-4 mb-4 border-l-4" style={{
              backgroundColor: 'var(--wb-bg-medium)',
              borderColor: 'var(--wb-primary)',
            }}>
              <p className="text-sm" style={{ color: 'var(--wb-text-light)', fontStyle: 'italic', lineHeight: '1.6' }}>
                {loreText}
              </p>
              <button onClick={() => setLoreSeed((Math.random() * 0xFFFFFFFF) >>> 0)}
                      className="text-xs mt-2 px-2 py-1 rounded"
                      style={{ backgroundColor: 'var(--wb-bg-darker)', color: 'var(--wb-text-muted)' }}>
                <i className="fas fa-dice mr-1"></i>{t('reroll')}
              </button>
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Column 1: Mission */}
              <div className="w-full lg:w-1/4 flex flex-col gap-3">
                {/* Mission Card */}
                <div className="rounded-lg p-2 border-2"
                   style={{ backgroundColor: 'var(--wb-bg-light)', borderColor: 'var(--wb-primary)' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs uppercase tracking-wide" style={{ color: 'var(--wb-primary)' }}>{t('mission')}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-mono" style={{ color: 'var(--wb-text-muted)' }}>d{data.missionTable?.items?.length || 12}: {results.mission.roll}</span>
                    <button onClick={() => reroll('mission', data.missionTable?.items?.length || 12, data.missionTable)}
                            className="text-xs px-1 py-0.5 rounded"
                            style={{ backgroundColor: 'var(--wb-bg-medium)', color: 'var(--wb-text-light)' }}>
                      <i className="fas fa-dice"></i>
                    </button>
                  </div>
                </div>
                <span className="text-lg font-black block"
                   style={{ color: 'var(--wb-text-secondary)', fontFamily: 'Montserrat, sans-serif' }}>
                  {getItemDisplay(results.mission.item).name}
                </span>
                {results.mission.item?.description && (
                  <div className="mt-1 flex flex-col gap-1">
                    {splitIntoBlocks(results.mission.item.description).map((block, i) => {
                      if (block.type === 'quote') {
                        return (
                          <blockquote key={i} className="text-xs italic pl-2 border-l-2"
                                      style={{ color: 'var(--wb-text-muted)', borderColor: 'var(--wb-border)' }}>
                            {block.content.split('\n').map((line, j) => (
                              <span key={j}>{renderMarkdown(line)}{j < block.content.split('\n').length - 1 && <br />}</span>
                            ))}
                          </blockquote>
                        );
                      }
                      return <p key={i} className="text-xs" style={{ color: 'var(--wb-text-light)' }}>{renderMarkdown(block.content)}</p>;
                    })}
                  </div>
                )}
              </div>

              {/* Deployment */}
              <ResultCard label={t('deployment')} dieSize={6} roll={results.deployment.roll}
                          item={results.deployment.item} table={data.deployment}
                          onReroll={() => reroll('deployment', 6, data.deployment)} />
              </div>

              {/* Column 2: Coworkers */}
              <div className="w-full lg:w-1/4 flex flex-col gap-3">
              {/* Setup Cards */}
              <div className="flex flex-col gap-3">
              <ResultCard label={t('coworkerSetup')} dieSize={6} roll={results.coworkerSetup.roll}
                          item={results.coworkerSetup.item} table={data.coworkerSetup}
                          onReroll={() => reroll('coworkerSetup', 6, data.coworkerSetup)} />

              <ResultCard label={t('coworkerModifiers')} dieSize={6} roll={results.coworkerModifiers.roll}
                          item={results.coworkerModifiers.item} table={data.coworkerModifiers}
                          onReroll={() => reroll('coworkerModifiers', 6, data.coworkerModifiers)} />
              </div>

              {/* Coworker Unit */}
              {results.coworkerUnit?.unit && (
                <div className="wb-bg-light rounded-lg p-4 border-2 flex flex-col gap-2"
                     style={{ borderColor: 'var(--wb-border)' }}>
                  <UnitRow unit={results.coworkerUnit.unit} tier={results.coworkerUnit.tier}
                           label={t('coworkerUnit')} onReroll={rerollCoworkerUnit} />
                  {data.coworkers?.special_rule && (
                    <div className="text-xs px-3 py-1.5" style={{ borderLeft: '3px solid var(--wb-primary)', color: 'var(--wb-text-light)' }}>
                      {data.coworkers.special_rule.split('\n').map((line, i) => (
                        <div key={i}>{renderMarkdown(line)}</div>
                      ))}
                    </div>
                  )}
                  <BehaviorTable behavior={data.coworkers?.behavior} title={t('behaviorNormal')} />
                  <BehaviorTable behavior={data.coworkers?.behavior_attacked} title={t('behaviorAttacked')} />
                </div>
              )}
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px" style={{ backgroundColor: 'var(--wb-border)' }}></div>

              {/* Column 3: Hostiles */}
              <div className="w-full lg:w-1/4 flex flex-col gap-3">
              {/* Hostile Cards */}
              <div className="flex flex-col gap-3">
              <ResultCard label={t('hostileType')} dieSize={6} roll={results.hostileFactions.roll}
                          item={results.hostileFactions.item} table={data.hostileFactions}
                          onReroll={() => reroll('hostileFactions', 6, data.hostileFactions)} />

              <ResultCard label={t('hostileTiming')} dieSize={6} roll={results.hostileTiming.roll}
                          item={results.hostileTiming.item} table={data.hostileTiming}
                          onReroll={() => reroll('hostileTiming', 6, data.hostileTiming)} />

              <ResultCard label={t('spawnLocation')} dieSize={6} roll={results.spawnLocation.roll}
                          item={results.spawnLocation.item} table={data.spawnLocation}
                          onReroll={() => reroll('spawnLocation', 6, data.spawnLocation)} />
              </div>

              {/* Hostile Units */}
              {results.hostileUnits && results.hostileUnits.length > 0 && (() => {
                const fFile = results.hostileFactions?.item?.file;
                const fData = fFile ? data.factionData?.[fFile] : null;
                return (
                  <div className="wb-bg-light rounded-lg p-4 border-2 flex flex-col gap-2"
                       style={{ borderColor: 'var(--wb-border)' }}>
                    <span className="font-bold wb-text-light text-sm uppercase tracking-wide"
                          style={{ color: 'var(--wb-text-light)' }}>{t('hostileUnits')}</span>
                    {fData?.special_rule && (
                      <div className="text-xs px-3 py-1.5" style={{ borderLeft: '3px solid var(--wb-primary)', color: 'var(--wb-text-light)' }}>
                        {renderMarkdown(fData.special_rule)}
                      </div>
                    )}
                    {results.hostileUnits.map((hu, i) => hu?.unit && (
                      <UnitRow key={i} unit={hu.unit} tier={hu.tier} round={hu.round}
                               onReroll={() => rerollHostileUnit(i)} />
                    ))}
                    <BehaviorTable behavior={fData?.behavior} title={t('behavior')} />
                  </div>
                );
              })()}
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px" style={{ backgroundColor: 'var(--wb-border)' }}></div>

              {/* Column 4: Loot, Map & Advantages */}
              <div className="w-full lg:w-1/4 flex flex-col gap-3" style={{ paddingLeft: '1rem' }}>
              {/* Loot Cards */}
              <div className="flex flex-col gap-3">
              <ResultCard label={t('lootLayout')} dieSize={6} roll={results.lootLayout.roll}
                          item={results.lootLayout.item} table={data.lootLayout}
                          onReroll={() => reroll('lootLayout', 6, data.lootLayout)} />

              <ResultCard label={t('lootModifiers')} dieSize={6} roll={results.lootModifiers.roll}
                          item={results.lootModifiers.item} table={data.lootModifiers}
                          onReroll={() => reroll('lootModifiers', 6, data.lootModifiers)} />
              </div>

              {/* Board map — inline SVG from DSL */}
              <div>
                <BoardMap layers={[
                  results.deployment?.item?.map || '',
                  results.lootLayout?.item?.map || '',
                  results.coworkerSetup?.item?.map || '',
                  results.spawnLocation?.item?.map || '',
                ]} />
              </div>

              {/* Defender Advantages */}
              {advantageCount >= 2 && results.setupAdvantage && (
                <div className="mt-2">
                  <h3 className="font-bold text-sm uppercase tracking-wide mb-2" style={{ color: 'var(--wb-primary)' }}>
                    <i className="fas fa-shield-halved mr-1"></i>{t('defenderAdvantages')}
                  </h3>
                  <div className="flex flex-col gap-3">
                    <AdvantageCard label={t('setupAdvantage')} dieSize={6} roll={results.setupAdvantage.roll}
                                   item={results.setupAdvantage.item} table={data.setupAdvantages}
                                   onReroll={() => reroll('setupAdvantage', 6, data.setupAdvantages)} />
                    <AdvantageCard label={t('tacticalAdvantage')} dieSize={6} roll={results.tacticalAdvantage.roll}
                                   item={results.tacticalAdvantage.item} table={data.tacticalAdvantages}
                                   onReroll={() => reroll('tacticalAdvantage', 6, data.tacticalAdvantages)} />
                    {results.bonusAdvantage && (
                      <AdvantageCard label={t('bonusAdvantage') + (results.bonusAdvantage.isSetup ? ` (${t('setupAdvantage')})` : ` (${t('tacticalAdvantage')})`)}
                                     dieSize={6} roll={results.bonusAdvantage.roll}
                                     item={results.bonusAdvantage.item}
                                     table={results.bonusAdvantage.isSetup ? data.setupAdvantages : data.tacticalAdvantages}
                                     onReroll={rerollBonus} highlight />
                    )}
                  </div>
                </div>
              )}
              {advantageCount === 0 && (
                <div className="text-sm text-center py-2" style={{ color: 'var(--wb-text-muted)' }}>
                  <i className="fas fa-shield-halved mr-1"></i>{t('noAdvantages')}
                </div>
              )}
              </div>
            </div>
          )}

          {/* Footer spacing */}
          <div className="h-16"></div>
        </div>
      </div>
    </div>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ScenarioGenerator />);
