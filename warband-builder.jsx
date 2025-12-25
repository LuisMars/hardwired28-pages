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
  POWERS: DATA.POWERS || [],
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
  // Check URL param for direct card view access (?view=cards)
  const urlParams = new URLSearchParams(window.location.search);
  const initialView = urlParams.get('view') === 'cards' ? 'cards' : 'warband';
  const [viewMode, setViewMode] = useState(initialView);

  const updateModel = (i, m) => {
    setWarband(prev => {
      const models = [...prev.models];
      models[i] = m;
      return { ...prev, models };
    });
  };

  const fireModel = (i) => {
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

  // Card Print View
  if (viewMode === 'cards') {
    return <CardPrintView onClose={() => {
      setViewMode('warband');
      const url = new URL(window.location);
      url.searchParams.delete('view');
      window.history.pushState({}, '', url);
    }} weaponData={WEAPON_DATA} archetypes={ARCHETYPES} warband={warband} />;
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-2 sm:p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="bg-[#222] border border-[#333] rounded-lg p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <h1 className="text-xl sm:text-2xl font-bold text-[#f5f5f0] font-heading uppercase tracking-wider">{t('title')}</h1>
              <input
                type="text"
                placeholder={t('warbandName')}
                value={warband.name}
                onChange={(e) => setWarband({ ...warband, name: e.target.value })}
                className="bg-[#333] text-[#f5f5f0] text-lg sm:text-xl px-3 py-1 rounded border-2 border-[#444] focus:border-[#c9a227] focus:outline-none flex-1 min-w-[200px] sm:min-w-[280px]"
              />
              <button
                onClick={() => setWarband({ ...warband, name: generateWarbandName() })}
                className="bg-[#444] hover:bg-[#555] text-[#f5f5f0] px-2 py-1 rounded border border-[#555] text-sm"
                title={t('randomWarbandName')}
              >
                <i className="fa fa-dice" />
              </button>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <div className="bg-[#333] border border-[#c9a227] px-4 py-2 rounded-lg flex items-center gap-2">
                <Icon name="subs" className="text-[#c9a227]" />
                <input
                  type="number"
                  value={warband.subs}
                  onChange={(e) => setWarband({ ...warband, subs: parseInt(e.target.value) || 0 })}
                  className="w-16 bg-[#222] text-[#c9a227] font-bold text-lg rounded px-2 py-1 text-center"
                />
                <span className="text-[#8b6914] text-sm">({totalEquipmentCost}$ {t('spent')})</span>
              </div>
              <ModeSelector mode={mode} onChange={setMode} />
            </div>
          </div>

          {/* Warband Selector */}
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#333]">
            {warbands.length > 1 ? (
              <>
                <span className="text-[#999] text-sm">{t('switchWarband')}:</span>
                <select
                  value={currentId}
                  onChange={(e) => setCurrentId(e.target.value)}
                  className="bg-[#333] text-[#f5f5f0] px-3 py-1 rounded border border-[#444] focus:border-[#c9a227] focus:outline-none"
                >
                  {warbands.map(w => (
                    <option key={w.id} value={w.id}>{w.name || t('unnamedWarband')}</option>
                  ))}
                </select>
                <button
                  onClick={() => { if (confirm(t('deleteWarbandConfirm'))) deleteWarband(currentId); }}
                  className="bg-[#8b2500]/50 hover:bg-[#8b2500] text-[#f5f5f0] px-2 py-1 rounded border border-[#8b2500] text-sm"
                  title={t('deleteWarband')}
                >
                  <i className="fa fa-trash" />
                </button>
              </>
            ) : (
              <span className="text-[#666] text-sm">1 {t('warband')}</span>
            )}
            <button
              onClick={addWarband}
              className="bg-[#333] hover:bg-[#444] text-[#f5f5f0] px-2 py-1 rounded border border-[#444] text-sm flex items-center gap-1"
              title={t('newWarband')}
            >
              <Icon name="add" /> {t('newWarband')}
            </button>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-[#c9a227] font-bold">{t('evidence')}:</span>
              <EvidenceTracker evidence={warband.evidence} onChange={(e) => setWarband({ ...warband, evidence: e })} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#c9a227] font-bold">{t('leads')}:</span>
              <LeadsCounter leads={warband.leads} onChange={(l) => setWarband({ ...warband, leads: l })} />
            </div>
            {leaderDead && (
              <div className="flex items-center gap-2 px-3 py-1 bg-[#8b2500]/30 border border-[#8b2500] rounded text-[#c73e1d] text-sm">
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
          mode === 'build' ? 'bg-[#c9a227]/10 border-[#c9a227]/50 text-[#c9a227]' :
          mode === 'edit' ? 'bg-[#8b2500]/10 border-[#8b2500]/50 text-[#c73e1d]' :
          'bg-[#333] border-[#444] text-[#999]'
        }`}>
          {mode === 'build' && t('buildDesc')}
          {mode === 'edit' && t('editDesc')}
          {mode === 'play' && t('playDesc')}
        </div>

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
              powers={WEAPON_DATA.POWERS}
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
        <div className="bg-[#222] border border-[#333] rounded-lg p-3 text-xs text-[#666]">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span><strong className="text-[#c9a227]">{t('dice')}:</strong> 2d4 → 2d6 → 2d8 → 2d10 → 2d12</span>
            <span><strong className="text-[#c9a227]">{t('turn')}:</strong> {t('turnDesc')}</span>
            <span><strong className="text-[#c9a227]">{t('crit')}:</strong> {t('critDesc')}</span>
            <span><strong className="text-[#c9a227]">{t('fumble')}:</strong> {t('fumbleDesc')}</span>
            <span><strong className="text-[#c9a227]">{t('merits')}:</strong> 1 → 3 → 6 → 10 → 15 → 21 → 28</span>
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
            className="px-6 py-2 bg-[#333] text-[#f5f5f0] rounded-lg hover:bg-[#444] border border-[#444] font-bold flex items-center gap-2"
          >
            <Icon name="save" /> {t('export')}
          </button>
          <label className="px-6 py-2 bg-[#333] text-[#f5f5f0] rounded-lg hover:bg-[#444] border border-[#444] font-bold cursor-pointer flex items-center gap-2">
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
          }} className="px-6 py-2 bg-[#c9a227] text-[#1a1a1a] rounded-lg hover:bg-[#8b6914] font-bold flex items-center gap-2">
            <Icon name="cards" /> {t('cards')}
          </button>
          <button onClick={() => window.print()} className="px-6 py-2 bg-[#333] text-[#f5f5f0] rounded-lg hover:bg-[#444] border border-[#444] font-bold flex items-center gap-2">
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
            className="px-6 py-2 bg-[#8b2500] text-[#f5f5f0] rounded-lg hover:bg-[#c73e1d] font-bold flex items-center gap-2"
          >
            <Icon name="reset" /> {t('reset')}
          </button>
        </div>
      </div>
    </div>
  );
}

// Render the app (React 18)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<WarbandSheet />);
