// Hardwired 28 Warband Builder - Main Application (Zorn Palette)

const { useState, useMemo, useEffect } = React;

// Import from modules
const { Icon, ModeSelector } = window.H28_PRIMITIVES;
const { ModelCard } = window.H28_MODEL_CARD;
const { StashPanel, LeadsCounter, EvidenceTracker, CardPrintView } = window.H28_PANELS;
const { t, generateWarbandName, generateModelName, getLocale } = window.H28_UTILS;

// LocalStorage keys (per locale)
const STORAGE_KEY = `h28-warbands-${getLocale()}`;
const CURRENT_KEY = `h28-current-${getLocale()}`;

// Generate unique ID
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// Data from JSON
const DATA = window.WARBAND_DATA || {};
const ARCHETYPES = DATA.ARCHETYPES || {};
const WEAPON_DATA = {
  FALLBACK_WEAPONS: DATA.FALLBACK_WEAPONS || [],
  MELEE_WEAPONS: DATA.MELEE_WEAPONS || [],
  RANGED_WEAPONS: DATA.RANGED_WEAPONS || [],
  ARMOR: DATA.ARMOR || [],
  GEAR: DATA.GEAR || [],
  CONSUMABLES: DATA.CONSUMABLES || [],
  GRENADES: DATA.GRENADES || [],
  CYBERNETICS: DATA.CYBERNETICS || [],
  OFFENSIVE_POWERS: DATA.OFFENSIVE_POWERS || [],
  SUPPORT_POWERS: DATA.SUPPORT_POWERS || [],
};

// Main warband sheet component
function WarbandSheet() {
  const createModel = () => ({
    name: '',
    archetype: '',
    statArray: 'Operative',
    technicianStat: 'wits',
    technicianWeakStat: 'combat',
    combatMod: 0,
    defenseMod: 0,
    witsMod: 0,
    baseHealth: 8,
    currentHealth: 8,
    baseMove: 6,
    equipment: [],
    modifiers: [],
    power: null,
    xp: 0,
    levelUpsSpent: 0,
    ascended: false,
    ascendedBonus: null,
  });

  const createWarband = () => ({
    id: generateId(),
    name: '',
    subs: 60,
    leaderDead: false,
    evidence: [],
    leads: 0,
    stash: [],
    models: Array(5).fill(null).map(() => createModel()),
  });

  // Load all warbands from localStorage
  const [warbands, setWarbands] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migration: if old format (single warband without id), convert
        if (!Array.isArray(parsed)) {
          const migrated = { ...parsed, id: generateId() };
          return [migrated];
        }
        return parsed.length > 0 ? parsed : [createWarband()];
      }
    } catch (e) { /* ignore */ }
    return [createWarband()];
  });

  // Load current warband ID
  const [currentId, setCurrentId] = useState(() => {
    try {
      const saved = localStorage.getItem(CURRENT_KEY);
      if (saved) return saved;
    } catch (e) { /* ignore */ }
    return warbands[0]?.id || '';
  });

  // Get current warband
  const warband = useMemo(() => {
    return warbands.find(w => w.id === currentId) || warbands[0] || createWarband();
  }, [warbands, currentId]);

  // Update current warband
  const setWarband = (updater) => {
    setWarbands(prev => prev.map(w => {
      if (w.id !== currentId) return w;
      return typeof updater === 'function' ? updater(w) : updater;
    }));
  };

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(warbands));
    } catch (e) { /* ignore */ }
  }, [warbands]);

  useEffect(() => {
    try {
      localStorage.setItem(CURRENT_KEY, currentId);
    } catch (e) { /* ignore */ }
  }, [currentId]);

  // Warband management
  const addWarband = () => {
    const newWarband = createWarband();
    setWarbands(prev => [...prev, newWarband]);
    setCurrentId(newWarband.id);
  };

  const deleteWarband = (id) => {
    if (warbands.length <= 1) return;
    setWarbands(prev => {
      const filtered = prev.filter(w => w.id !== id);
      if (currentId === id) {
        setCurrentId(filtered[0]?.id || '');
      }
      return filtered;
    });
  };

  const [mode, setMode] = useState('build');
  const [theme, setTheme] = useState(() => localStorage.getItem('wb-theme') || 'corporate');

  // Apply theme to document and persist
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('wb-theme', theme);
  }, [theme]);

  // Check URL param for direct card view access (?view=cards)
  const urlParams = new URLSearchParams(window.location.search);
  const initialView = urlParams.get('view') === 'cards' ? 'cards' : 'warband';
  const [viewMode, setViewMode] = useState(initialView);
  const [showQuickView, setShowQuickView] = useState(false);

  const updateModel = (i, m) => {
    setWarband(prev => {
      const models = [...prev.models];
      models[i] = m;
      return { ...prev, models };
    });
  };

  const fireModel = (i) => {
    const model = warband.models[i];
    const modelName = model.name || `${t('model')} ${i + 1}`;
    if (!confirm(t('confirmFireMember', { name: modelName }))) return;

    setWarband(prev => {
      const model = prev.models[i];
      const equipment = model.equipment || [];
      const newStash = [...prev.stash, ...equipment.filter(e => !e.used)];
      const removingLeader = model.archetype === 'Leader';
      const newModel = createModel();
      const models = [...prev.models];
      models[i] = newModel;
      return {
        ...prev,
        models,
        stash: newStash,
        leaderDead: prev.leaderDead || removingLeader
      };
    });
  };

  const addToStash = (item) => {
    setWarband(prev => ({ ...prev, stash: [...prev.stash, item] }));
  };

  const removeFromStash = (i) => {
    setWarband(prev => ({ ...prev, stash: prev.stash.filter((_, idx) => idx !== i) }));
  };

  const equipFromStash = (stashIdx, modelIdx) => {
    setWarband(prev => {
      const item = prev.stash[stashIdx];
      const model = prev.models[modelIdx];
      const newEquipment = [...(model.equipment || []), { ...item, id: item.id + '-' + Date.now() }];
      const models = [...prev.models];
      models[modelIdx] = { ...model, equipment: newEquipment };
      return {
        ...prev,
        models,
        stash: prev.stash.filter((_, idx) => idx !== stashIdx)
      };
    });
  };

  const totalEquipmentCost = useMemo(() => {
    return warband.models.reduce((sum, m) => {
      return sum + (m.equipment || []).filter(e => !e.free).reduce((s, e) => s + (e.cost || 0), 0);
    }, 0);
  }, [warband.models]);

  const leaderDead = warband.leaderDead;
  const hasAscendedLeader = warband.models.some(m => m.ascended);

  // Theme styles (always loaded)
  const themeStyles = (
    <style>{`
        :root, [data-theme="zorn"] {
          --wb-primary: #c9a227;
          --wb-primary-hover: #8b6914;
          --wb-danger: #8b2500;
          --wb-danger-hover: #c73e1d;
          --wb-accent: #1a1a1a;
          --wb-accent-text: #f5f5f0;
          --wb-bg-dark: #1a1a1a;
          --wb-bg-darker: #222;
          --wb-bg-medium: #333;
          --wb-bg-medium-hover: #444;
          --wb-bg-light: #f5f5f0;
          --wb-border: #333;
          --wb-border-hover: #555;
          --wb-border-light: #ddd;
          --wb-text-light: #f5f5f0;
          --wb-text-muted: #666;
          --wb-text-secondary: #8b6914;
          --wb-text-disabled: #999;
          --wb-text-on-light: #1a1a1a;
          --wb-text-on-primary: #000000;
          --wb-play: #1a1a1a;
          --wb-play-text: #f5f5f0;
        }
        [data-theme="corporate"] {
          --wb-primary: #2563EB;
          --wb-primary-hover: #1D4ED8;
          --wb-danger: #DC2626;
          --wb-danger-hover: #B91C1C;
          --wb-accent: #2563EB;
          --wb-accent-text: #FFFFFF;
          --wb-bg-dark: #F8FAFC;
          --wb-bg-darker: #F1F5F9;
          --wb-bg-medium: #E2E8F0;
          --wb-bg-medium-hover: #CBD5E1;
          --wb-bg-light: #FFFFFF;
          --wb-border: transparent;
          --wb-border-hover: transparent;
          --wb-border-light: transparent;
          --wb-text-light: #1E293B;
          --wb-text-muted: #64748B;
          --wb-text-secondary: #1D4ED8;
          --wb-text-disabled: #94A3B8;
          --wb-text-on-light: #1E293B;
          --wb-text-on-primary: #FFFFFF;
          --wb-play: #475569;
          --wb-play-text: #FFFFFF;
        }
        /* Fulfillment - Amazon orange/navy */
        [data-theme="fulfillment"] {
          --wb-primary: #FFD814;
          --wb-primary-hover: #F7CA00;
          --wb-danger: #B12704;
          --wb-danger-hover: #922006;
          --wb-accent: #232F3E;
          --wb-accent-text: #FFFFFF;
          --wb-bg-dark: #FFFFFF;
          --wb-bg-darker: #232F3E;
          --wb-bg-medium: #F7F7F7;
          --wb-bg-medium-hover: #EDEDED;
          --wb-bg-light: #FFFFFF;
          --wb-border: transparent;
          --wb-border-hover: transparent;
          --wb-border-light: transparent;
          --wb-text-light: #0F1111;
          --wb-text-muted: #565959;
          --wb-text-secondary: #232F3E;
          --wb-text-disabled: #767676;
          --wb-text-on-light: #0F1111;
          --wb-text-on-primary: #0F1111;
          --wb-play: #232F3E;
          --wb-play-text: #FFFFFF;
          --wb-text-danger: #B12704;
        }
        /* Hallucination - ChatGPT with teal accents */
        [data-theme="hallucination"] {
          --wb-primary: #10A37F;
          --wb-primary-hover: #0D8A6A;
          --wb-danger: #EF4444;
          --wb-danger-hover: #DC2626;
          --wb-accent: #10A37F;
          --wb-accent-text: #FFFFFF;
          --wb-bg-dark: #212121;
          --wb-bg-darker: #171717;
          --wb-bg-medium: #2A2A2A;
          --wb-bg-medium-hover: #333333;
          --wb-bg-light: #343541;
          --wb-border: #4A4A4A;
          --wb-border-hover: #5A5A5A;
          --wb-border-light: #3A3A3A;
          --wb-text-light: #FFFFFF;
          --wb-text-muted: #B8B8B8;
          --wb-text-secondary: #10A37F;
          --wb-text-disabled: #666666;
          --wb-text-on-light: #FFFFFF;
          --wb-text-on-primary: #FFFFFF;
          --wb-play: #2A2A2A;
          --wb-play-text: #FFFFFF;
          --wb-text-dark: #FFFFFF;
          --wb-text-danger: #EF4444;
        }
        /* Utility classes */
        .wb-bg-dark { background-color: var(--wb-bg-dark); }
        .wb-bg-darker { background-color: var(--wb-bg-darker); }
        .wb-bg-medium { background-color: var(--wb-bg-medium); }
        .wb-bg-light { background-color: var(--wb-bg-light); }
        .wb-bg-primary { background-color: var(--wb-primary); }
        .wb-bg-danger { background-color: var(--wb-danger); }
        .wb-bg-play { background-color: var(--wb-play); }
        .wb-text-play { color: var(--wb-play-text); }
        .wb-text-light { color: var(--wb-text-light); }
        .wb-text-muted { color: var(--wb-text-muted); }
        .wb-text-secondary { color: var(--wb-text-secondary); }
        .wb-text-disabled { color: var(--wb-text-disabled); }
        .wb-text-primary { color: var(--wb-primary); }
        .wb-text-primary-hover { color: var(--wb-primary-hover); }
        .wb-text-danger { color: var(--wb-danger); }
        .wb-text-danger-hover { color: var(--wb-danger-hover); }
        .wb-border { border-color: var(--wb-border); }
        .wb-border-light { border-color: var(--wb-border-light); }
        .wb-border-primary { border-color: var(--wb-primary); }
        .wb-border-danger { border-color: var(--wb-danger); }
        /* Additional backgrounds */
        .wb-bg-medium-hover { background-color: var(--wb-bg-medium-hover); }
        .wb-border-hover { border-color: var(--wb-border-hover); }
        /* Hover variants */
        .hover\\:wb-bg-medium-hover:hover { background-color: var(--wb-bg-medium-hover); }
        .hover\\:wb-bg-danger-hover:hover { background-color: var(--wb-danger-hover); }
        .hover\\:wb-bg-danger:hover { background-color: var(--wb-danger); }
        .hover\\:wb-bg-primary-hover:hover { background-color: var(--wb-primary-hover); }
        .hover\\:wb-border:hover { border-color: var(--wb-border-hover); }
        .focus\\:wb-border-primary:focus { border-color: var(--wb-primary); }
        /* Opacity variants */
        .wb-bg-primary-10 { background-color: color-mix(in srgb, var(--wb-primary) 10%, transparent); }
        .wb-bg-danger-10 { background-color: color-mix(in srgb, var(--wb-danger) 10%, transparent); }
        .wb-bg-danger-30 { background-color: color-mix(in srgb, var(--wb-danger) 30%, transparent); }
        .wb-bg-danger-50 { background-color: color-mix(in srgb, var(--wb-danger) 50%, transparent); }
        .wb-border-primary-50 { border-color: color-mix(in srgb, var(--wb-primary) 50%, transparent); }
        .wb-border-danger-50 { border-color: color-mix(in srgb, var(--wb-danger) 50%, transparent); }
        /* Dark text and border - fixed dark text for light backgrounds */
        .wb-text-dark { color: var(--wb-text-on-light); }
        .wb-text-medium { color: var(--wb-text-muted); }
        .wb-border-dark { border-color: var(--wb-border); }
        .wb-text-on-light { color: var(--wb-text-on-light); }
        .wb-text-on-primary { color: var(--wb-text-on-primary); }
        /* Accent (for selected states - dark in Zorn, blue in Corporate) */
        .wb-bg-accent { background-color: var(--wb-accent); }
        .wb-text-accent { color: var(--wb-accent-text); }
        .wb-border-accent { border-color: var(--wb-accent); }
        .wb-border-primary { border-color: var(--wb-primary); }
        /* Hallucination theme overrides - force dark backgrounds */
        [data-theme="hallucination"] .bg-white {
          background-color: #212121 !important;
          color: #FFFFFF !important;
        }
        /* Force white text on all children of dark containers */
        [data-theme="hallucination"] .bg-white *,
        [data-theme="hallucination"] .bg-white span,
        [data-theme="hallucination"] .bg-white div,
        [data-theme="hallucination"] .bg-white label {
          color: #FFFFFF !important;
        }
        [data-theme="hallucination"] .text-black {
          color: #FFFFFF !important;
        }
        /* Force font styling to use white */
        [data-theme="hallucination"] .font-mono,
        [data-theme="hallucination"] .font-semibold,
        [data-theme="hallucination"] .font-bold {
          color: #FFFFFF !important;
        }
        [data-theme="hallucination"] select,
        [data-theme="hallucination"] input[type="text"],
        [data-theme="hallucination"] input[type="number"] {
          background-color: #2A2A2A !important;
          color: #FFFFFF !important;
          border-color: #2A2A2A !important;
        }
        [data-theme="hallucination"] select option {
          background-color: #212121;
          color: #FFFFFF;
        }
        [data-theme="hallucination"] .border,
        [data-theme="hallucination"] .border-2 {
          border-color: #2A2A2A !important;
        }
        [data-theme="hallucination"] .shadow-xl {
          box-shadow: 0 4px 20px rgba(0,0,0,0.5) !important;
        }
        /* Fix hardcoded Tailwind gray text colors */
        [data-theme="hallucination"] .text-gray-500,
        [data-theme="hallucination"] .text-gray-600,
        [data-theme="hallucination"] .text-gray-700 {
          color: #B8B8B8 !important;
        }
        [data-theme="hallucination"] .text-gray-400 {
          color: #9A9A9A !important;
        }
        [data-theme="hallucination"] .hover\\:text-gray-700:hover {
          color: #FFFFFF !important;
        }
        /* Fix wb-text-danger for dark theme */
        [data-theme="hallucination"] .wb-text-danger {
          color: #FFFFFF !important;
        }
        /* Fix placeholder colors */
        [data-theme="hallucination"] ::placeholder {
          color: #888888 !important;
          opacity: 1;
        }
        /* Fix wb-text-dark - should be light text on dark backgrounds */
        [data-theme="hallucination"] .wb-text-dark {
          color: #FFFFFF !important;
        }
        /* Fix wb-text-muted for visibility */
        [data-theme="hallucination"] .wb-text-muted {
          color: #B8B8B8 !important;
        }
        /* Fix wb-text-disabled for visibility */
        [data-theme="hallucination"] .wb-text-disabled {
          color: #666666 !important;
        }
        /* Fix wb-text-light on dark backgrounds */
        [data-theme="hallucination"] .wb-text-light {
          color: #FFFFFF !important;
        }
        /* Fix buttons with wb-bg-medium */
        [data-theme="hallucination"] button.wb-bg-medium,
        [data-theme="hallucination"] .wb-bg-medium {
          background-color: #2A2A2A !important;
          color: #FFFFFF !important;
        }
        /* Fix wb-bg-light sections */
        [data-theme="hallucination"] .wb-bg-light {
          background-color: #212121 !important;
          color: #FFFFFF !important;
        }
        /* Fix accent colors */
        [data-theme="hallucination"] .wb-bg-accent {
          background-color: #2A2A2A !important;
        }
        [data-theme="hallucination"] .wb-text-accent {
          color: #FFFFFF !important;
        }
        /* Fix primary/danger buttons */
        [data-theme="hallucination"] .wb-bg-primary,
        [data-theme="hallucination"] .wb-bg-danger {
          color: #FFFFFF !important;
        }
        /* Fix all buttons in hallucination theme */
        [data-theme="hallucination"] button {
          color: #FFFFFF !important;
        }
        /* Fix italic text */
        [data-theme="hallucination"] em,
        [data-theme="hallucination"] .italic {
          color: #B8B8B8 !important;
        }
        /* Fix wb-text-primary on wb-bg-medium for each theme */
        [data-theme="corporate"] .wb-bg-medium .wb-text-primary {
          color: #1D4ED8 !important; /* Darker blue for contrast on light gray */
        }
        [data-theme="fulfillment"] .wb-bg-medium .wb-text-primary {
          color: #FF9900 !important; /* Orange for contrast on dark navy */
        }
        [data-theme="hallucination"] .wb-bg-medium .wb-text-primary {
          color: #FFFFFF !important; /* White for contrast on dark gray */
        }
        /* Fulfillment theme overrides - yellow buttons need dark text */
        [data-theme="fulfillment"] .wb-bg-primary .text-white,
        [data-theme="fulfillment"] .wb-bg-primary.text-white {
          color: #0F1111 !important;
        }
        [data-theme="fulfillment"] .wb-bg-danger {
          background-color: #B12704 !important;
        }
        [data-theme="fulfillment"] .wb-text-danger {
          color: #B12704 !important;
        }
        /* Fix yellow border on leader card - use subtle border */
        [data-theme="fulfillment"] .wb-border-primary {
          border-color: #37475A !important;
        }
        /* Fix gray text colors for visibility on white backgrounds */
        [data-theme="fulfillment"] .text-gray-400 {
          color: #565959 !important;
        }
        [data-theme="fulfillment"] .text-gray-500 {
          color: #565959 !important;
        }
        [data-theme="fulfillment"] .text-gray-700 {
          color: #0F1111 !important;
        }
        /* Fix accent - dark navy with white text */
        [data-theme="fulfillment"] .wb-text-accent,
        [data-theme="fulfillment"] button.wb-bg-accent,
        [data-theme="fulfillment"] .wb-bg-accent {
          color: #FFFFFF !important;
        }
        [data-theme="fulfillment"] .wb-bg-accent {
          background-color: #232F3E !important;
        }
        /* Fix header title only - white on dark navy header */
        [data-theme="fulfillment"] .wb-bg-darker > div > h1.wb-text-light {
          color: #FFFFFF !important;
        }
        /* Fix inputs and buttons - dark navy with white text */
        [data-theme="fulfillment"] input.wb-bg-darker,
        [data-theme="fulfillment"] input.wb-bg-medium,
        [data-theme="fulfillment"] button.wb-bg-medium,
        [data-theme="fulfillment"] .wb-bg-medium.wb-text-light {
          background-color: #232F3E !important;
          color: #FFFFFF !important;
        }
        /* Corporate theme - white text on colored buttons */
        [data-theme="corporate"] .wb-bg-primary,
        [data-theme="corporate"] .wb-bg-danger,
        [data-theme="corporate"] .wb-bg-accent,
        [data-theme="corporate"] button.wb-bg-primary,
        [data-theme="corporate"] button.wb-bg-danger,
        [data-theme="corporate"] button.wb-bg-accent {
          color: #FFFFFF !important;
        }
        .hover\\:wb-bg-accent:hover { background-color: var(--wb-accent); }
        /* Hover for light backgrounds */
        .hover\\:wb-bg-light:hover { background-color: var(--wb-bg-light); }
        .hover\\:wb-bg-medium:hover { background-color: var(--wb-bg-medium); }
        .hover\\:wb-text-dark:hover { color: var(--wb-text-on-light); }
        .hover\\:wb-text-danger-hover:hover { color: var(--wb-danger-hover); }
      `}</style>
  );

  // Card Print View
  if (viewMode === 'cards') {
    return (
      <>
        {themeStyles}
        <CardPrintView onClose={() => {
          setViewMode('warband');
          const url = new URL(window.location);
          url.searchParams.delete('view');
          window.history.pushState({}, '', url);
        }} weaponData={WEAPON_DATA} archetypes={ARCHETYPES} warband={warband} />
      </>
    );
  }

  return (
    <>
      {themeStyles}
      <div className="min-h-screen wb-bg-dark p-2 sm:p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="wb-bg-darker border wb-border rounded-lg p-3 sm:p-4">
          {/* Row 1: Title + Warband Name */}
          <div className="flex items-center gap-2 sm:gap-4 mb-3">
            <h1 className="hidden sm:block text-2xl font-bold wb-text-light font-heading uppercase tracking-wider whitespace-nowrap">{t('title')}</h1>
            <input
              type="text"
              placeholder={t('warbandName')}
              value={warband.name}
              onChange={(e) => setWarband({ ...warband, name: e.target.value })}
              className="wb-bg-medium wb-text-light text-lg sm:text-xl px-3 py-1 rounded border-2 wb-border-hover focus:wb-border-primary focus:outline-none flex-1 min-w-0"
            />
            <button
              onClick={() => setWarband({ ...warband, name: generateWarbandName() })}
              className="wb-bg-medium-hover hover:wb-bg-medium-hover wb-text-light px-2 py-1 rounded border wb-border-hover text-sm"
              title={t('randomSquadName')}
            >
              <i className="fa fa-dice" />
            </button>
          </div>
          {/* Row 2: Subs + Mode Selector */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap mb-4">
            <div className="wb-bg-medium border wb-border-primary px-4 py-2 rounded-lg flex items-center gap-2">
              <Icon name="subs" className="wb-text-primary" />
              <input
                type="number"
                value={warband.subs}
                onChange={(e) => setWarband({ ...warband, subs: parseInt(e.target.value) || 0 })}
                className="w-16 wb-bg-darker wb-text-light font-bold text-lg rounded px-2 py-1 text-center border wb-border"
              />
              <span className="wb-text-muted text-sm">({totalEquipmentCost}$ {t('spent')})</span>
            </div>
            <div className="flex items-center">
              <ModeSelector mode={mode} onChange={setMode} />
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-white hover:wb-bg-light wb-text-dark px-2 py-2 border-2 border-l-0 wb-border text-xs rounded-r cursor-pointer"
                title="Select theme"
              >
                <option value="corporate">Corporate</option>
                <option value="fulfillment">Fulfillment</option>
                <option value="hallucination">Hallucination</option>
              </select>
            </div>
          </div>

          {/* Warband Selector */}
          <div className="flex items-center gap-2 mb-3 pb-3 border-b wb-border">
            {warbands.length > 1 ? (
              <>
                <span className="wb-text-disabled text-sm">{t('switchWarband')}:</span>
                <select
                  value={currentId}
                  onChange={(e) => setCurrentId(e.target.value)}
                  className="wb-bg-light wb-text-dark px-3 py-1 rounded border wb-border-hover focus:wb-border-primary focus:outline-none"
                >
                  {warbands.map(w => (
                    <option key={w.id} value={w.id}>{w.name || t('unnamedWarband')}</option>
                  ))}
                </select>
                <button
                  onClick={() => { if (confirm(t('deleteWarbandConfirm'))) deleteWarband(currentId); }}
                  className="wb-bg-danger-50 hover:wb-bg-danger wb-text-light px-2 py-1 rounded border wb-border-danger text-sm"
                  title={t('deleteWarband')}
                >
                  <i className="fa fa-trash" />
                </button>
              </>
            ) : (
              <span className="wb-text-muted text-sm">1 {t('warband')}</span>
            )}
            <button
              onClick={addWarband}
              className="wb-bg-medium hover:wb-bg-medium-hover wb-text-light px-2 py-1 rounded border wb-border-hover text-sm flex items-center gap-1"
              title={t('newWarband')}
            >
              <Icon name="add" /> {t('newWarband')}
            </button>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="wb-text-primary font-bold">{t('evidence')}:</span>
              <EvidenceTracker evidence={warband.evidence} onChange={(e) => setWarband({ ...warband, evidence: e })} />
            </div>
            <div className="flex items-center gap-2">
              <span className="wb-text-primary font-bold">{t('leads')}:</span>
              <LeadsCounter leads={warband.leads} onChange={(l) => setWarband({ ...warband, leads: l })} />
            </div>
            {leaderDead && (
              <div className="flex items-center gap-2 px-3 py-1 wb-bg-danger-30 border wb-border-danger rounded wb-text-danger-hover text-sm">
                <Icon name="dead" />
                <span>
                  {hasAscendedLeader ? t('leaderSuccessor') : t('leaderDead')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Mode Description */}
        <div className={`rounded-lg p-3 text-sm border ${
          mode === 'build' ? 'wb-bg-light wb-border wb-text-muted' :
          mode === 'edit' ? 'wb-bg-danger/10 wb-border-danger/50 wb-text-danger-hover' :
          'wb-bg-medium wb-border-hover wb-text-disabled'
        }`}>
          {mode === 'build' && t('buildDesc')}
          {mode === 'edit' && t('editDesc')}
          {mode === 'play' && t('playDesc')}
        </div>

        {/* Play Mode Summary */}
        {mode === 'play' && (() => {
          // Triangular number thresholds: 1, 3, 6, 10, 15, 21, 28, 36, 45, 55...
          const countPromotions = (xp) => {
            let count = 0, threshold = 1, step = 2;
            while (xp >= threshold) { count++; threshold += step; step++; }
            return count;
          };
          const totalMerits = warband.models.reduce((sum, m) => sum + (m.xp || 0), 0);
          const totalPromotions = warband.models.reduce((sum, m) => sum + countPromotions(m.xp || 0), 0);
          const spentPromotions = warband.models.reduce((sum, m) => sum + (m.levelUpsSpent || 0), 0);
          const unusedPromotions = Math.max(0, totalPromotions - spentPromotions);
          return (
            <div className="rounded-lg p-3 text-sm border wb-border wb-bg-light flex items-center gap-4 flex-wrap">
              <span className="font-bold flex items-center gap-1">
                <Icon name="xp" /> {t('merits')}: {totalMerits}
              </span>
              <span className="font-bold wb-text-primary flex items-center gap-1">
                <Icon name="level" /> {t('promotions')}: {totalPromotions}
              </span>
              {unusedPromotions > 0 && (
                <span className="font-bold wb-text-danger flex items-center gap-1">
                  <Icon name="level" /> {t('unused')}: {unusedPromotions}
                </span>
              )}
            </div>
          );
        })()}

        {/* Models */}
        <div className={`grid gap-3 sm:gap-4 ${mode === 'play' ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'}`}>
          {warband.models.map((model, i) => (
            <ModelCard
              key={i}
              model={model}
              onChange={(m) => updateModel(i, m)}
              onFire={() => fireModel(i)}
              mode={mode}
              subs={warband.subs}
              onSpend={(cost) => setWarband(prev => ({ ...prev, subs: prev.subs - cost }))}
              onAddToStash={addToStash}
              modelIndex={i}
              allModels={warband.models}
              leaderDead={leaderDead}
              hasAscendedLeader={hasAscendedLeader}
              archetypes={ARCHETYPES}
              weaponData={WEAPON_DATA}
              offensivePowers={WEAPON_DATA.OFFENSIVE_POWERS}
              supportPowers={WEAPON_DATA.SUPPORT_POWERS}
            />
          ))}
          <StashPanel
            stash={warband.stash}
            onRemove={removeFromStash}
            onEquip={equipFromStash}
            models={warband.models}
          />
        </div>

        {/* Quick Reference */}
        <div className="wb-bg-darker border wb-border rounded-lg p-3 text-xs wb-text-muted">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span><strong className="wb-text-primary">{t('dice')}:</strong> 2d4 → 2d6 → 2d8 → 2d10 → 2d12</span>
            <span><strong className="wb-text-primary">{t('turn')}:</strong> {t('turnDesc')}</span>
            <span><strong className="wb-text-primary">{t('crit')}:</strong> {t('critDesc')}</span>
            <span><strong className="wb-text-primary">{t('fumble')}:</strong> {t('fumbleDesc')}</span>
            <span><strong className="wb-text-primary">{t('merits')}:</strong> 1 → 3 → 6 → 10 → 15 → 21 → 28</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 justify-center flex-wrap">
          <button
            onClick={() => {
              const json = JSON.stringify(warband, null, 2);
              const blob = new Blob([json], { type: 'application/json' });
              const a = document.createElement('a');
              a.href = URL.createObjectURL(blob);
              a.download = `${warband.name || 'warband'}.json`;
              a.click();
            }}
            className="px-6 py-2 wb-bg-medium wb-text-light rounded-lg hover:wb-bg-medium-hover border wb-border-hover font-bold flex items-center gap-2"
          >
            <Icon name="save" /> {t('export')}
          </button>
          <label className="px-6 py-2 wb-bg-medium wb-text-light rounded-lg hover:wb-bg-medium-hover border wb-border-hover font-bold cursor-pointer flex items-center gap-2">
            <Icon name="load" /> {t('import')}
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    try {
                      const imported = JSON.parse(ev.target?.result);
                      // Add ID if missing, preserve current warband's ID
                      setWarband({ ...imported, id: warband.id });
                    } catch { alert('Invalid file'); }
                  };
                  reader.readAsText(file);
                }
              }}
            />
          </label>
          <button onClick={() => {
            setViewMode('cards');
            const url = new URL(window.location);
            url.searchParams.set('view', 'cards');
            window.history.pushState({}, '', url);
          }} className="px-6 py-2 wb-bg-primary text-black rounded-lg hover:wb-bg-primary-hover font-bold flex items-center gap-2">
            <Icon name="cards" /> {t('cards')}
          </button>
          <button onClick={() => window.print()} className="px-6 py-2 wb-bg-medium wb-text-light rounded-lg hover:wb-bg-medium-hover border wb-border-hover font-bold flex items-center gap-2">
            <Icon name="print" /> {t('print')}
          </button>
          <button
            onClick={() => {
              if (confirm(t('resetConfirm'))) {
                setWarband({
                  ...warband,
                  name: '',
                  subs: 60,
                  leaderDead: false,
                  evidence: [],
                  leads: 0,
                  stash: [],
                  models: Array(5).fill(null).map(() => createModel()),
                });
              }
            }}
            className="px-6 py-2 wb-bg-danger wb-text-light rounded-lg hover:wb-bg-danger-hover font-bold flex items-center gap-2"
          >
            <Icon name="reset" /> {t('reset')}
          </button>
        </div>
      </div>
    </div>

    {/* Quick View FAB - only in play mode */}
    {mode === 'play' && (
      <>
        <button
          onClick={() => setShowQuickView(!showQuickView)}
          className="fixed bottom-4 right-4 w-14 h-14 rounded-full wb-bg-primary wb-text-on-primary shadow-lg hover:wb-bg-primary-hover flex items-center justify-center text-xl font-bold z-50 print:hidden"
          title={t('quickView')}
        >
          <i className="fa fa-users" />
        </button>

        {/* Quick View Panel */}
        {showQuickView && (
          <div className="fixed bottom-20 right-4 w-80 max-h-[70vh] overflow-y-auto rounded-lg shadow-xl border-2 wb-border-primary wb-bg-light z-50 print:hidden">
            <div className="wb-bg-primary wb-text-on-primary p-2 flex items-center justify-between sticky top-0">
              <span className="font-bold">{t('quickView')}</span>
              <button onClick={() => setShowQuickView(false)} className="hover:opacity-70">
                <Icon name="remove" />
              </button>
            </div>
            <div className="p-2 space-y-2">
              {warband.models.filter(m => m.archetype).map((model, i) => {
                const arch = ARCHETYPES[model.archetype];
                const baseHealth = model.baseHealth || 8;
                const healthMod = arch?.healthMod || 0;
                const maxHealth = baseHealth + healthMod;
                const baseMove = model.baseMove || 6;
                const armor = (model.equipment || []).find(e => e.id?.includes('armor') || e.name?.toLowerCase().includes('armor'));
                const weapons = (model.equipment || []).filter(e =>
                  e.id?.includes('melee') || e.id?.includes('ranged') ||
                  e.damage || e.name?.toLowerCase().includes('weapon')
                );
                const statArray = model.statArray === 'Specialist' || model.statArray === 'Technician';
                const getCom = () => statArray ? (model.technicianStat === 'combat' ? '2d8' : model.technicianWeakStat === 'combat' ? '2d4' : '2d6') : '2d6';
                const getDef = () => statArray ? (model.technicianStat === 'defense' ? '2d8' : model.technicianWeakStat === 'defense' ? '2d4' : '2d6') : '2d6';
                const getWit = () => statArray ? (model.technicianStat === 'wits' ? '2d8' : model.technicianWeakStat === 'wits' ? '2d4' : '2d6') : '2d6';

                return (
                  <div
                    key={i}
                    className={`p-2 rounded border wb-border text-xs ${
                      model.outOfAction ? 'opacity-50 wb-bg-medium' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold truncate flex-1">
                        {model.name || `${t('model')} ${i + 1}`}
                      </span>
                      <span className={`font-bold ${(model.currentHealth ?? maxHealth) <= maxHealth / 2 ? 'wb-text-danger' : ''}`}>
                        <Icon name="health" className="mr-0.5" />
                        {model.currentHealth ?? maxHealth}/{maxHealth}
                      </span>
                      {model.outOfAction && <Icon name="dead" className="wb-text-danger" />}
                    </div>
                    <div className="flex gap-2 text-[10px] wb-text-muted">
                      <span title="Combat">C:{getCom()}</span>
                      <span title="Defense">D:{getDef()}</span>
                      <span title="Wits">W:{getWit()}</span>
                      <span title="Move"><Icon name="move" className="mr-0.5" />{baseMove}"</span>
                      {armor && <span title="Armor"><Icon name="armor" className="mr-0.5" />{armor.name?.split(' ')[0]}</span>}
                    </div>
                    {weapons.length > 0 && (
                      <div className="text-[10px] wb-text-muted mt-1 truncate">
                        {weapons.map(w => w.name?.split(' ')[0] || w.name).join(', ')}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </>
    )}
    </>
  );
}

// Render the app (React 18)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<WarbandSheet />);
