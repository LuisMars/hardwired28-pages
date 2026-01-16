// Hardwired 28 Warband Builder - Panel Components (Zorn Palette)

const { useState } = React;
const { Icon, TypeLabel, ItemCard, ArchetypeCard, BlankModelCard, BlankModelBackCard, EnemyCard, FactionCard, ReferenceCard, CorporateBlessingsCard } = window.H28_PRIMITIVES;
const { ICONS, CARD_SIZES, getItemType, getBaseItemId, t } = window.H28_UTILS;

// Reference data (loaded from JSON files via window.WARBAND_DATA)
const CRITICALS = window.WARBAND_DATA?.CRITICALS || {};
const FUMBLES = window.WARBAND_DATA?.FUMBLES || {};
const SEARCH = window.WARBAND_DATA?.SEARCH || {};
const INTERROGATE = window.WARBAND_DATA?.INTERROGATE || {};
const INJURIES = window.WARBAND_DATA?.INJURIES || {};
const PROMOTIONS = window.WARBAND_DATA?.PROMOTIONS || {};
const EVIDENCE_DISCOVERIES = window.WARBAND_DATA?.EVIDENCE_DISCOVERIES || {};
const HOSTILES = window.WARBAND_DATA?.HOSTILES || [];
const BLESSINGS = window.WARBAND_DATA?.BLESSINGS || {};

// Warband stash panel
const StashPanel = ({ stash, onRemove, onEquip, models }) => (
  <div className="border-2 border-dashed wb-border rounded-lg p-4 wb-bg-light">
    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
      <Icon name="stash" className="wb-text-primary" /> {t('stash')}
    </h3>
    {stash.length === 0 ? (
      <div className="wb-text-muted text-sm italic p-4 text-center">
        {t('stashEmpty')}
      </div>
    ) : (
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {stash.map((item, i) => (
          <div key={i} className="flex items-center gap-2 p-2 bg-white rounded border wb-border text-xs group">
            {item.type && <TypeLabel type={item.type} />}
            <div className="flex-1">
              <span className="font-semibold">{item.name}</span>
              {item.damage && <span className="wb-text-muted ml-1">{item.damage}</span>}
            </div>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  onEquip(i, parseInt(e.target.value));
                  e.target.value = '';
                }
              }}
              className="text-xs border wb-border rounded px-1 py-0.5 bg-white wb-text-dark"
              defaultValue=""
            >
              <option value="">{t('giveTo')}</option>
              {models.map((m, mi) => (
                <option key={mi} value={mi}>{m.name || `${t('model')} ${mi + 1}`}</option>
              ))}
            </select>
            <button
              onClick={() => onRemove(i)}
              className="px-2 py-1 wb-bg-danger text-white rounded opacity-0 group-hover:opacity-100"
            >
              {t('discard')}
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

// Leads counter
const LeadsCounter = ({ leads, onChange }) => (
  <div className="flex items-center gap-1">
    <button
      onClick={() => onChange(Math.max(0, leads - 1))}
      className="w-6 h-6 rounded wb-bg-medium text-gray-700 hover:wb-bg-medium-hover font-bold"
    >
      -
    </button>
    <span className="font-bold wb-text-primary w-6 text-center">{leads}</span>
    <button
      onClick={() => onChange(leads + 1)}
      className="w-6 h-6 rounded wb-bg-medium text-gray-700 hover:wb-bg-medium-hover font-bold"
    >
      +
    </button>
  </div>
);

// Evidence collection tracker
const EvidenceTracker = ({ evidence, onChange }) => (
  <div className="flex items-center gap-1 flex-wrap">
    {[1,2,3,4,5,6,7,8,9,10].map(n => (
      <button
        key={n}
        onClick={() => onChange(evidence.includes(n) ? evidence.filter(e => e !== n) : [...evidence, n])}
        className={`w-8 h-8 rounded font-bold transition-all border-2 ${
          evidence.includes(n)
            ? 'wb-bg-primary wb-text-on-primary wb-border-primary'
            : 'wb-bg-light wb-text-disabled wb-border hover:wb-bg-medium'
        }`}
      >
        {n}
      </button>
    ))}
    <span className={`ml-2 font-bold flex items-center gap-1 ${evidence.length >= 10 ? 'wb-text-primary' : 'text-gray-500'}`}>
      {evidence.length}/10 {evidence.length >= 10 && <Icon name="xp" />}
    </span>
  </div>
);

// Print options modal
const PrintModal = ({ isOpen, onCloseModal, onBack, options, setOptions, onPrint, archetypeCount = 0, hasWarband = false }) => {
  if (!isOpen) return null;

  // Equipment category keys
  const equipmentKeys = ['printFallback', 'printMelee', 'printRanged', 'printArmor', 'printGear', 'printConsumables', 'printGrenades', 'printCybernetics', 'printPowers'];

  // Toggle all equipment categories
  const toggleAllEquipment = (value) => {
    const updates = {};
    equipmentKeys.forEach(k => updates[k] = value);
    setOptions({ ...options, ...updates });
  };

  // Toggle all enemy factions
  const toggleAllEnemies = (value) => {
    const factions = {};
    HOSTILES.forEach(h => factions[h.table_name] = value);
    setOptions({ ...options, enemyFactions: factions });
  };

  // Toggle all reference cards (criticals, fumbles, campaign tables, blessings)
  const toggleAllReference = (value) => {
    setOptions({
      ...options,
      printCriticals: value,
      printFumbles: value,
      printSearch: value,
      printInterrogate: value,
      printInjuries: value,
      printPromotions: value,
      printEvidence: value,
      printBlessings: value,
    });
  };

  // Global select all / none
  const selectAll = () => {
    const updates = {};
    equipmentKeys.forEach(k => updates[k] = true);
    const factions = {};
    HOSTILES.forEach(h => factions[h.table_name] = true);
    setOptions({
      ...options,
      ...updates,
      printArchetypes: true,
      printBlankCards: true,
      enemyFactions: factions,
      printCriticals: true,
      printFumbles: true,
      printSearch: true,
      printInterrogate: true,
      printInjuries: true,
      printPromotions: true,
      printEvidence: true,
      evidenceCount: options.evidenceCount || 1,
      printBlessings: true,
      blessingsCount: options.blessingsCount || 1,
    });
  };

  const selectNone = () => {
    const updates = {};
    equipmentKeys.forEach(k => updates[k] = false);
    setOptions({
      ...options,
      ...updates,
      printArchetypes: false,
      printBlankCards: false,
      enemyFactions: {},
      printCriticals: false,
      printFumbles: false,
      printSearch: false,
      printInterrogate: false,
      printInjuries: false,
      printPromotions: false,
      printEvidence: false,
      printBlessings: false,
    });
  };

  // Helper component for All/None toggle
  const AllNoneToggle = ({ onAll, onNone }) => (
    <span className="text-xs text-gray-500 ml-auto">
      <button onClick={onAll} className="hover:text-black hover:underline">{t('all')}</button>
      {' / '}
      <button onClick={onNone} className="hover:text-black hover:underline">{t('none')}</button>
    </span>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white px-4 py-3 flex items-center justify-between">
          <h2 className="font-heading font-bold text-lg uppercase tracking-wide">{t('printCards')}</h2>
          <button onClick={onCloseModal} className="text-gray-400 hover:text-white">
            <Icon name="remove" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Global All/None */}
          <div className="flex items-center justify-end gap-2 text-sm border-b border-gray-200 pb-2">
            <span className="text-gray-600 font-medium">{t('global')}:</span>
            <button onClick={selectAll} className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold">{t('selectAll')}</button>
            <button onClick={selectNone} className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold">{t('selectNone')}</button>
          </div>
          {/* Card size */}
          <div>
            <label className="block text-sm font-bold mb-1">{t('cardSize')}</label>
            <select
              value={options.cardSize}
              onChange={(e) => setOptions({ ...options, cardSize: e.target.value })}
              className="w-full border-2 border-black rounded px-3 py-2"
            >
              {Object.entries(CARD_SIZES).map(([key, s]) => (
                <option key={key} value={key}>
                  {s.name} ({s.width} x {s.height}mm)
                </option>
              ))}
            </select>
          </div>

          {/* Warband-specific printing - only shown when a warband exists */}
          {hasWarband && (
            <div className="border-2 wb-border-primary rounded p-3 wb-bg-light">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.warbandOnly}
                  onChange={(e) => setOptions({ ...options, warbandOnly: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="font-bold">{t('warbandOnly')}</span>
              </label>
              {options.warbandOnly && (
                <div className="mt-2 ml-6">
                  <label className="text-sm text-gray-600">{t('excludeCards')}</label>
                  <input
                    type="text"
                    value={options.excludeCards}
                    onChange={(e) => setOptions({ ...options, excludeCards: e.target.value })}
                    placeholder="Knuckles, Frag, Smoke..."
                    className="w-full mt-1 border border-gray-300 rounded px-2 py-1 text-sm"
                  />
                </div>
              )}
            </div>
          )}

          {/* Equipment cards */}
          <div className="border-2 border-gray-200 rounded p-3">
            <div className="font-bold mb-2 flex items-center">
              {t('equipmentCards')}
              <AllNoneToggle onAll={() => toggleAllEquipment(true)} onNone={() => toggleAllEquipment(false)} />
            </div>
            <div className="grid grid-cols-2 gap-1 text-sm">
              {[
                { key: 'printFallback', label: t('fallback') },
                { key: 'printMelee', label: t('melee') },
                { key: 'printRanged', label: t('ranged') },
                { key: 'printArmor', label: t('armor') },
                { key: 'printGear', label: t('gear') },
                { key: 'printConsumables', label: t('consumables') },
                { key: 'printGrenades', label: t('grenades') },
                { key: 'printCybernetics', label: t('cybernetics') },
                { key: 'printPowers', label: t('powers') },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={options[key]}
                    onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                    className="w-3 h-3"
                  />
                  {label}
                </label>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <label className="text-sm">{t('sets')}:</label>
              <select
                value={options.equipmentSets}
                onChange={(e) => setOptions({ ...options, equipmentSets: parseInt(e.target.value) })}
                className="border border-gray-300 rounded px-2 py-1"
              >
                {[1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Archetype cards */}
          <div className="border-2 border-gray-200 rounded p-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.printArchetypes}
                onChange={(e) => setOptions({ ...options, printArchetypes: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="font-bold">{t('archetypeCards')}</span>
            </label>
            {options.printArchetypes && (
              <div className="flex items-center gap-2 mt-2 ml-6">
                <label className="text-sm">{t('sets')}:</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={options.archetypeSets}
                  onChange={(e) => setOptions({ ...options, archetypeSets: Math.max(1, parseInt(e.target.value) || 1) })}
                  className="border border-gray-300 rounded px-2 py-1 w-16"
                />
              </div>
            )}
          </div>

          {/* Blank model cards */}
          <div className="border-2 border-gray-200 rounded p-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.printBlankCards}
                onChange={(e) => setOptions({ ...options, printBlankCards: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="font-bold">{t('blankCards')}</span>
            </label>
            {options.printBlankCards && (
              <div className="mt-2 ml-6 flex items-center gap-2">
                <label className="text-sm">{t('quantity')}:</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={options.blankCardCount}
                  onChange={(e) => setOptions({ ...options, blankCardCount: Math.max(1, parseInt(e.target.value) || 1) })}
                  className="border border-gray-300 rounded px-2 py-1 w-16"
                />
              </div>
            )}
          </div>

          {/* Enemy cards */}
          <div className="border-2 border-gray-200 rounded p-3">
            <div className="font-bold mb-2 flex items-center">
              {t('enemyCards')}
              <AllNoneToggle onAll={() => toggleAllEnemies(true)} onNone={() => toggleAllEnemies(false)} />
            </div>
            <div className="grid grid-cols-2 gap-1 text-sm">
              {HOSTILES.map(h => (
                <label key={h.table_name} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={options.enemyFactions[h.table_name] || false}
                    onChange={(e) => setOptions({
                      ...options,
                      enemyFactions: { ...options.enemyFactions, [h.table_name]: e.target.checked }
                    })}
                    className="w-3 h-3"
                  />
                  {h.table_name}
                </label>
              ))}
            </div>
          </div>

          {/* Reference tables */}
          <div className="border-2 border-gray-200 rounded p-3">
            <div className="font-bold mb-2 flex items-center">
              {t('referenceTables')}
              <AllNoneToggle onAll={() => toggleAllReference(true)} onNone={() => toggleAllReference(false)} />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.printCriticals}
                  onChange={(e) => setOptions({ ...options, printCriticals: e.target.checked })}
                  className="w-3 h-3"
                />
                <span className="text-sm">{t('criticalTables')}</span>
                <span className="text-gray-500 text-xs">(8 cards)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.printFumbles}
                  onChange={(e) => setOptions({ ...options, printFumbles: e.target.checked })}
                  className="w-3 h-3"
                />
                <span className="text-sm">{t('fumbleTables')}</span>
                <span className="text-gray-500 text-xs">(3 cards)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.printSearch}
                  onChange={(e) => setOptions({ ...options, printSearch: e.target.checked })}
                  className="w-3 h-3"
                />
                <span className="text-sm">{t('cardSearch')}</span>
                <span className="text-gray-500 text-xs">(2 cards)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.printInterrogate}
                  onChange={(e) => setOptions({ ...options, printInterrogate: e.target.checked })}
                  className="w-3 h-3"
                />
                <span className="text-sm">{t('cardInterrogate')}</span>
                <span className="text-gray-500 text-xs">(1 card)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.printInjuries}
                  onChange={(e) => setOptions({ ...options, printInjuries: e.target.checked })}
                  className="w-3 h-3"
                />
                <span className="text-sm">{t('cardInjuries')}</span>
                <span className="text-gray-500 text-xs">(1 card)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.printPromotions}
                  onChange={(e) => setOptions({ ...options, printPromotions: e.target.checked })}
                  className="w-3 h-3"
                />
                <span className="text-sm">{t('cardPromotions')}</span>
                <span className="text-gray-500 text-xs">(1 card)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.printEvidence}
                  onChange={(e) => setOptions({ ...options, printEvidence: e.target.checked })}
                  className="w-3 h-3"
                />
                <span className="text-sm">{t('cardEvidence')}</span>
              </label>
              {options.printEvidence && (
                <div className="flex items-center gap-2 ml-5">
                  <label className="text-sm">{t('quantity')}:</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={options.evidenceCount}
                    onChange={(e) => setOptions({ ...options, evidenceCount: Math.max(1, parseInt(e.target.value) || 1) })}
                    className="border border-gray-300 rounded px-2 py-1 w-16"
                  />
                </div>
              )}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.printBlessings}
                  onChange={(e) => setOptions({ ...options, printBlessings: e.target.checked })}
                  className="w-3 h-3"
                />
                <span className="text-sm">{t('blessings')}</span>
              </label>
              {options.printBlessings && (
                <div className="flex items-center gap-2 ml-5">
                  <label className="text-sm">{t('quantity')}:</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={options.blessingsCount}
                    onChange={(e) => setOptions({ ...options, blessingsCount: Math.max(1, parseInt(e.target.value) || 1) })}
                    className="border border-gray-300 rounded px-2 py-1 w-16"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-4 py-3 flex justify-between">
          <button
            onClick={onBack}
            className="px-4 py-2 border-2 border-gray-400 text-gray-600 rounded font-bold hover:bg-gray-200"
          >
            {t('backToBuilder')}
          </button>
          <div className="flex gap-2">
            <button
              onClick={onCloseModal}
              className="px-4 py-2 border-2 border-black rounded font-bold hover:bg-gray-200"
            >
              {t('preview')}
            </button>
            <button
              onClick={onPrint}
              className="px-4 py-2 bg-black text-white rounded font-bold hover:bg-gray-800 flex items-center gap-2"
            >
              <Icon name="print" /> {t('print')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Default card print options
const DEFAULT_CARD_OPTIONS = {
  cardSize: 'tcg-standard',
  // Warband-specific printing
  warbandOnly: false,
  excludeCards: '',
  // Equipment categories
  printFallback: false,
  printMelee: true,
  printRanged: true,
  printArmor: true,
  printGear: true,
  printConsumables: true,
  printGrenades: true,
  printCybernetics: true,
  printPowers: true,
  equipmentSets: 1,
  // Other cards
  printArchetypes: true,
  archetypeSets: 1,
  printBlankCards: true,
  blankCardCount: 5,
  enemyFactions: {},
  printCriticals: false,
  printFumbles: false,
  printSearch: false,
  printInterrogate: false,
  printInjuries: false,
  printPromotions: false,
  printEvidence: false,
  evidenceCount: 1,
  printBlessings: true,
  blessingsCount: 1,
};

// Load options from localStorage
const loadCardOptions = () => {
  try {
    const saved = localStorage.getItem('h28-card-options');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with defaults to handle new options added later
      return { ...DEFAULT_CARD_OPTIONS, ...parsed };
    }
  } catch (e) {
    console.warn('Failed to load card options:', e);
  }
  return DEFAULT_CARD_OPTIONS;
};

// Card print view for all equipment (redesigned with modal)
const CardPrintView = ({ onClose, weaponData, archetypes, warband }) => {
  const [showModal, setShowModal] = useState(false);
  const [options, setOptions] = useState(loadCardOptions);
  const [excludedCards, setExcludedCards] = useState(new Set());

  // Toggle card exclusion
  const toggleExclude = (key) => {
    setExcludedCards(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  // Wrapper component for clickable cards with exclude toggle
  const CardWrapper = ({ cardKey, children }) => {
    const isExcluded = excludedCards.has(cardKey);
    return (
      <div
        onClick={() => toggleExclude(cardKey)}
        className={`cursor-pointer transition-all relative ${isExcluded ? 'opacity-30 grayscale print:hidden' : ''}`}
        title={isExcluded ? 'Click to include' : 'Click to exclude from print'}
      >
        {children}
        {isExcluded && (
          <div className="absolute inset-0 flex items-center justify-center print:hidden pointer-events-none">
            <div className="bg-black/50 text-white px-2 py-1 rounded text-xs font-bold">EXCLUDED</div>
          </div>
        )}
      </div>
    );
  };

  // Save options to localStorage when they change
  React.useEffect(() => {
    try {
      localStorage.setItem('h28-card-options', JSON.stringify(options));
    } catch (e) {
      console.warn('Failed to save card options:', e);
    }
  }, [options]);

  const { FALLBACK_WEAPONS, MELEE_WEAPONS, RANGED_WEAPONS, ARMOR, GEAR, CONSUMABLES, GRENADES, CYBERNETICS, OFFENSIVE_POWERS, SUPPORT_POWERS } = weaponData;
  const size = CARD_SIZES[options.cardSize];

  // Build equipment items based on category flags
  let allItems = [
    ...(options.printFallback && FALLBACK_WEAPONS ? FALLBACK_WEAPONS.map(i => ({ ...i, category: 'melee' })) : []),
    ...(options.printMelee ? MELEE_WEAPONS.map(i => ({ ...i, category: 'melee' })) : []),
    ...(options.printRanged ? RANGED_WEAPONS.map(i => ({ ...i, category: 'ranged' })) : []),
    ...(options.printArmor ? ARMOR.map(i => ({ ...i, category: 'armor' })) : []),
    ...(options.printGear ? GEAR.map(i => ({ ...i, category: 'gear' })) : []),
    ...(options.printConsumables ? CONSUMABLES.map(i => ({ ...i, category: 'consumable' })) : []),
    ...(options.printGrenades && GRENADES ? GRENADES.map(i => ({ ...i, category: 'grenade' })) : []),
    ...(options.printCybernetics ? CYBERNETICS.map(i => ({ ...i, category: 'cybernetic' })) : []),
    ...(options.printPowers ? [...(OFFENSIVE_POWERS || []), ...(SUPPORT_POWERS || [])].map(i => ({ ...i, category: 'power' })) : []),
  ];

  // Filter to only warband items if enabled
  if (options.warbandOnly && warband?.models?.length > 0) {
    // Build exclude list from comma-separated names
    const excludeList = (options.excludeCards || '')
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(Boolean);

    // Collect unique item names from all models
    const equippedNames = new Set();
    warband.models.forEach(model => {
      // Equipment array (gear, consumables, cybernetics, grenades)
      (model.equipment || []).forEach(item => {
        const name = (item.name || '').toLowerCase();
        if (name && !excludeList.includes(name)) {
          equippedNames.add(name);
        }
      });
      // Weapons array
      (model.weapons || []).forEach(item => {
        const name = (item.name || '').toLowerCase();
        if (name && !excludeList.includes(name)) {
          equippedNames.add(name);
        }
      });
      // Armor
      if (model.armor?.name) {
        const name = model.armor.name.toLowerCase();
        if (!excludeList.includes(name)) {
          equippedNames.add(name);
        }
      }
      // Powers (for broadcasters)
      (model.powers || []).forEach(item => {
        const name = (item.power || item.name || '').toLowerCase();
        if (name && !excludeList.includes(name)) {
          equippedNames.add(name);
        }
      });
    });

    // Filter allItems to only include equipped items
    allItems = allItems.filter(item => {
      const itemName = (item.name || item.power || '').toLowerCase();
      return equippedNames.has(itemName);
    });
  }

  // Generate equipment cards (with multiple sets)
  const equipmentCards = [];
  for (let set = 0; set < options.equipmentSets; set++) {
    allItems.forEach((item, idx) => {
      equipmentCards.push({ ...item, key: `${item.id || item.name || idx}-set${set}` });
    });
  }

  // Generate archetype cards (based on max limit, multiplied by sets)
  const archetypeCards = options.printArchetypes
    ? Object.entries(archetypes).flatMap(([name, data]) => {
        // Parse limit: "*" means 1, otherwise use the number
        const count = data.limit === '*' ? 1 : parseInt(data.limit) || 1;
        const totalCount = count * (options.archetypeSets || 1);
        return Array.from({ length: totalCount }, (_, i) => ({ name, data, key: `${name}-${i}` }));
      })
    : [];

  // Generate blank model cards
  const blankCards = options.printBlankCards
    ? Array.from({ length: options.blankCardCount }, (_, i) => ({ key: `blank-${i}` }))
    : [];

  // Generate cards from selected factions
  const selectedFactionNames = Object.entries(options.enemyFactions)
    .filter(([_, selected]) => selected)
    .map(([name]) => name);

  const selectedFactions = HOSTILES.filter(f => selectedFactionNames.includes(f.table_name));

  // Faction cards (1 per faction with special rule + behavior table)
  const factionCards = selectedFactions.map(f => ({
    key: `faction-${f.table_name}`,
    faction: f,
  }));

  // Unit cards (stats + faction name)
  const unitCards = selectedFactions.flatMap(f =>
    (f.units?.items || []).map((u, i) => ({
      key: `unit-${f.table_name}-${i}`,
      enemy: {
        name: u.name,
        faction: f.table_name,
        health: u.health,
        move: u.move,
        combat: u.combat,
        defense: u.defense,
        wits: u.wits,
        weapon: u.weapon,
        spawn: u.spawn,
      },
    }))
  );

  // Generate critical cards
  const criticalCards = [];
  const critTypeKey = { bladed: 'critBladed', blunt: 'critBlunt', projectile: 'critProjectile', energy: 'critEnergy', explosive: 'critExplosive', toxic: 'critToxic', static: 'critStatic' };
  if (options.printCriticals && Object.keys(CRITICALS).length > 0) {
    Object.entries(CRITICALS).forEach(([type, data]) => {
      criticalCards.push({
        key: `critical-${type}`,
        title: `${t(critTypeKey[type] || type.toUpperCase())} ${t('criticalWord')}`,
        table: data,
      });
    });
  }

  // Generate fumble cards
  const fumbleCards = [];
  const fumbleTypeKey = { melee: 'fumbleMelee', ranged: 'fumbleRanged', broadcast: 'fumbleBroadcast' };
  if (options.printFumbles && Object.keys(FUMBLES).length > 0) {
    Object.entries(FUMBLES).forEach(([type, data]) => {
      fumbleCards.push({
        key: `fumble-${type}`,
        title: `${t(fumbleTypeKey[type] || type.toUpperCase())} ${t('fumbleWord')}`,
        table: data,
      });
    });
  }

  // Generate campaign cards (each category has its own flag)
  const campaignCards = [];
  // Search (split into 2 cards)
  if (options.printSearch && SEARCH.items?.length > 0) {
    campaignCards.push({
      key: 'search-1-10',
      title: `${t('cardSearch')} (1-10)`,
      table: {
        columns: SEARCH.columns || ['d20', 'Finding'],
        items: SEARCH.items.slice(0, 10),
      },
    });
    campaignCards.push({
      key: 'search-11-20',
      title: `${t('cardSearch')} (11-20)`,
      table: {
        columns: SEARCH.columns || ['d20', 'Finding'],
        items: SEARCH.items.slice(10, 20),
      },
    });
  }
  // Interrogate
  if (options.printInterrogate && INTERROGATE.items?.length > 0) {
    campaignCards.push({
      key: 'interrogate',
      title: t('cardInterrogate'),
      table: INTERROGATE,
    });
  }
  // Injuries
  if (options.printInjuries && INJURIES.items?.length > 0) {
    campaignCards.push({
      key: 'injuries',
      title: t('cardInjuries'),
      table: INJURIES,
    });
  }
  // Promotions
  if (options.printPromotions && PROMOTIONS.items?.length > 0) {
    campaignCards.push({
      key: 'promotions',
      title: t('cardPromotions'),
      table: PROMOTIONS,
      smallFont: true,
    });
  }
  // Evidence (based on count if enabled)
  const evidenceCardCount = options.printEvidence && EVIDENCE_DISCOVERIES.items?.length > 0 ? (options.evidenceCount || 1) : 0;
  for (let i = 0; i < evidenceCardCount; i++) {
    campaignCards.push({
      key: `evidence-${i}`,
      title: t('cardEvidence'),
      table: EVIDENCE_DISCOVERIES,
    });
  }

  // Blessings cards (based on count if enabled)
  const blessingsCardCount = options.printBlessings && BLESSINGS.items?.length > 0 ? options.blessingsCount : 0;

  // Blank cards are now pairs (front + back)
  const blankCardsTotalCount = blankCards.length * 2;

  // Count all card keys for exclusion tracking
  const allCardKeys = [
    ...equipmentCards.map(c => c.key),
    ...archetypeCards.map(c => c.key),
    ...blankCards.flatMap(c => [`${c.key}-front`, `${c.key}-back`]),
    ...factionCards.map(c => c.key),
    ...unitCards.map(c => c.key),
    ...criticalCards.map(c => c.key),
    ...fumbleCards.map(c => c.key),
    ...campaignCards.map(c => c.key),
    ...Array.from({ length: blessingsCardCount }, (_, i) => `blessings-${i}`),
  ];
  const activeCards = allCardKeys.filter(k => !excludedCards.has(k)).length;
  const totalCards = allCardKeys.length;

  const handlePrint = () => {
    setShowModal(false);
    setTimeout(() => window.print(), 100);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Modal */}
      <PrintModal
        isOpen={showModal}
        onCloseModal={() => setShowModal(false)}
        onBack={onClose}
        options={options}
        setOptions={setOptions}
        onPrint={handlePrint}
        archetypeCount={Object.keys(archetypes || {}).length}
        hasWarband={warband?.models?.length > 0}
      />

      {/* Control bar - hidden when printing */}
      <div className="print:hidden sticky top-0 z-10 wb-bg-accent wb-text-accent p-4 border-b-2 wb-border-primary">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading uppercase tracking-wide">{t('title')} - {t('cards')}</h1>
            <p className="wb-text-muted text-sm">
              {size.name}: {size.width}mm x {size.height}mm | {activeCards}/{totalCards} {t('cardsTotal')}
              {excludedCards.size > 0 && (
                <button
                  onClick={() => setExcludedCards(new Set())}
                  className="ml-2 wb-text-primary hover:underline"
                >
                  (reset)
                </button>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 wb-bg-medium wb-text-light border wb-border-hover rounded hover:wb-bg-medium-hover font-bold"
            >
              {t('options')}
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 wb-bg-primary wb-text-dark rounded hover:wb-bg-primary-hover font-bold flex items-center gap-2"
            >
              <Icon name="print" /> {t('print')}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 wb-bg-medium wb-text-light border wb-border-hover rounded hover:wb-bg-medium-hover font-bold"
            >
              {t('back')}
            </button>
          </div>
        </div>
      </div>

      {/* Print area */}
      <div className="p-4 flex flex-wrap justify-center gap-2 print:p-0 print:gap-0">
        {/* Equipment section */}
        {equipmentCards.length > 0 && (
          <>
            <h2 className="w-full text-xl font-bold mb-3 wb-text-dark font-heading uppercase print:hidden">
              {t('equipment')} ({equipmentCards.length} {t('cards').toLowerCase()}, {options.equipmentSets} {t('set')}{options.equipmentSets > 1 ? 's' : ''})
            </h2>
            {equipmentCards.map(item => (
              <CardWrapper key={item.key} cardKey={item.key}>
                <ItemCard item={item} category={item.category} cardSize={options.cardSize} />
              </CardWrapper>
            ))}
          </>
        )}

        {/* Archetypes section */}
        {archetypeCards.length > 0 && (
          <>
            <h2 className="w-full text-xl font-bold mb-3 wb-text-dark font-heading uppercase print:hidden">
              {t('archetypes')} ({archetypeCards.length} {archetypeCards.length === 1 ? t('referenceCard') : t('referenceCards')})
            </h2>
            {archetypeCards.map(({ name, data, key }) => (
              <CardWrapper key={key} cardKey={key}>
                <ArchetypeCard name={name} data={data} cardSize={options.cardSize} />
              </CardWrapper>
            ))}
          </>
        )}

        {/* Blank model cards section (front + back pairs) */}
        {blankCards.length > 0 && (
          <>
            <h2 className="w-full text-xl font-bold mb-3 wb-text-dark font-heading uppercase print:hidden">
              {t('blankCards')} ({blankCards.length} pairs, {blankCardsTotalCount} {t('cards').toLowerCase()})
            </h2>
            {blankCards.map(({ key }) => (
              <React.Fragment key={key}>
                <CardWrapper cardKey={`${key}-front`}>
                  <BlankModelCard cardSize={options.cardSize} />
                </CardWrapper>
                <CardWrapper cardKey={`${key}-back`}>
                  <BlankModelBackCard cardSize={options.cardSize} />
                </CardWrapper>
              </React.Fragment>
            ))}
          </>
        )}

        {/* Faction cards section */}
        {factionCards.length > 0 && (
          <>
            <h2 className="w-full text-xl font-bold mb-3 wb-text-dark font-heading uppercase print:hidden">
              {t('factionCards')} ({factionCards.length})
            </h2>
            {factionCards.map(({ key, faction }) => (
              <CardWrapper key={key} cardKey={key}>
                <FactionCard faction={faction} cardSize={options.cardSize} />
              </CardWrapper>
            ))}
          </>
        )}

        {/* Unit cards section */}
        {unitCards.length > 0 && (
          <>
            <h2 className="w-full text-xl font-bold mb-3 wb-text-dark font-heading uppercase print:hidden">
              {t('unitCards')} ({unitCards.length})
            </h2>
            {unitCards.map(({ key, enemy }) => (
              <CardWrapper key={key} cardKey={key}>
                <EnemyCard enemy={enemy} cardSize={options.cardSize} />
              </CardWrapper>
            ))}
          </>
        )}

        {/* Critical tables section */}
        {criticalCards.length > 0 && (
          <>
            <h2 className="w-full text-xl font-bold mb-3 wb-text-dark font-heading uppercase print:hidden">
              {t('criticalTables')} ({criticalCards.length} {t('cards').toLowerCase()})
            </h2>
            {criticalCards.map(({ key, title, table }) => (
              <CardWrapper key={key} cardKey={key}>
                <ReferenceCard title={title} table={table} cardSize={options.cardSize} />
              </CardWrapper>
            ))}
          </>
        )}

        {/* Fumble tables section */}
        {fumbleCards.length > 0 && (
          <>
            <h2 className="w-full text-xl font-bold mb-3 wb-text-dark font-heading uppercase print:hidden">
              {t('fumbleTables')} ({fumbleCards.length} {t('cards').toLowerCase()})
            </h2>
            {fumbleCards.map(({ key, title, table }) => (
              <CardWrapper key={key} cardKey={key}>
                <ReferenceCard title={title} table={table} cardSize={options.cardSize} />
              </CardWrapper>
            ))}
          </>
        )}

        {/* Campaign tables section */}
        {campaignCards.length > 0 && (
          <>
            <h2 className="w-full text-xl font-bold mb-3 wb-text-dark font-heading uppercase print:hidden">
              {t('campaignTables')} ({campaignCards.length} {t('cards').toLowerCase()})
            </h2>
            {campaignCards.map(({ key, title, table, smallFont }) => (
              <CardWrapper key={key} cardKey={key}>
                <ReferenceCard title={title} table={table} cardSize={options.cardSize} smallFont={smallFont} />
              </CardWrapper>
            ))}
          </>
        )}

        {/* Corporate Blessings card */}
        {blessingsCardCount > 0 && (
          <>
            <h2 className="w-full text-xl font-bold mb-3 wb-text-dark font-heading uppercase print:hidden">
              {t('blessings')} ({blessingsCardCount} {blessingsCardCount === 1 ? 'card' : 'cards'})
            </h2>
            {Array.from({ length: blessingsCardCount }, (_, i) => (
              <CardWrapper key={`blessings-${i}`} cardKey={`blessings-${i}`}>
                <CorporateBlessingsCard blessings={BLESSINGS} cardSize={options.cardSize} />
              </CardWrapper>
            ))}
          </>
        )}

        {/* Empty state */}
        {totalCards === 0 && (
          <div className="text-center text-gray-500 py-12 print:hidden">
            <p className="text-lg">{t('noCardsSelected')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Export to window
window.H28_PANELS = { StashPanel, LeadsCounter, EvidenceTracker, CardPrintView };
