// Hardwired 28 Warband Builder - Model Card Components (Zorn Palette)

const { useState } = React;
const { Icon, TypeLabel } = window.H28_PRIMITIVES;
const {
  ICONS, TYPE_LABELS, MODIFIERS, DICE_INDEX, applyDT, getItemType, getArmorOptions,
  getStatModFromModifiers, getHealthModFromModifiers, getMoveModFromModifiers, getArmorMoveMod, addDamageBonus,
  getCyberneticStatMod, getCyberneticHealthMod, getCyberneticMoveMod,
  markdownToHtml, stripMarkdown, t, generateModelName
} = window.H28_UTILS;

// Stat display and modification row
const StatRow = ({ model, onChange, mode, archetypes }) => {
  const getBase = (stat) => {
    if (model.statArray === 'Technician') {
      if (model.technicianStat === stat) return '2d8';
      if (model.technicianWeakStat === stat) return '2d4';
      return '2d6';
    }
    return '2d6'; // Operative: all 2d6
  };

  const StatCell = ({ stat, iconName, label }) => {
    const base = getBase(stat);
    const modFromModifiers = getStatModFromModifiers(model.modifiers, stat);
    const cyberMod = getCyberneticStatMod(model.equipment, stat);
    const buildMod = model[`${stat}Mod`] || 0;
    const totalMod = modFromModifiers + cyberMod + buildMod;
    const final = applyDT(base, totalMod);
    const isPlay = mode === 'play';

    return (
      <div className={`flex-1 text-center ${isPlay ? 'p-1 sm:p-2' : 'p-2'} border-r wb-border last:border-r-0`}>
        <div className="text-xs wb-text-muted mb-1">
          <Icon name={iconName} className="mr-1" />{label}
        </div>
        <div className={`font-mono font-bold ${isPlay ? 'text-2xl sm:text-xl' : 'text-xl'}`}>{final}</div>
        {mode === 'build' && (
          <div className="flex items-center justify-center gap-1 mt-1">
            <button
              onClick={() => onChange({ ...model, [`${stat}Mod`]: buildMod - 1 })}
              disabled={DICE_INDEX[base] + totalMod <= 0}
              className="w-6 h-6 rounded border wb-border text-sm font-bold disabled:opacity-30 hover:wb-bg-light"
            >-</button>
            <span className={`text-xs w-6 ${buildMod === 0 ? 'wb-text-muted' : buildMod > 0 ? 'wb-text-primary' : 'wb-text-danger'}`}>
              {buildMod > 0 ? '+' : ''}{buildMod}
            </span>
            <button
              onClick={() => onChange({ ...model, [`${stat}Mod`]: buildMod + 1 })}
              disabled={DICE_INDEX[base] + totalMod >= 4}
              className="w-6 h-6 rounded border wb-border text-sm font-bold disabled:opacity-30 hover:wb-bg-light"
            >+</button>
          </div>
        )}
        {mode !== 'build' && totalMod !== 0 && (
          <div className="text-xs wb-text-muted">
            <span className="line-through">{base}</span>
            <span className={totalMod > 0 ? 'wb-text-primary ml-1' : 'wb-text-danger ml-1'}>
              ({totalMod > 0 ? '+' : ''}{totalMod})
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="border-2 wb-border rounded bg-white mb-2">
      {mode === 'build' && (
        <div className="flex gap-2 p-2 border-b wb-border wb-bg-light text-xs">
          <select
            value={model.statArray || 'Operative'}
            onChange={(e) => onChange({ ...model, statArray: e.target.value })}
            className="border wb-border rounded px-2 py-1 flex-1 bg-white wb-text-dark"
          >
            <option value="Technician">{t('specialistDesc')}</option>
            <option value="Operative">{t('generalistDesc')}</option>
          </select>
          {model.statArray === 'Technician' && (
            <>
              <select
                value={model.technicianStat || 'wits'}
                onChange={(e) => onChange({ ...model, technicianStat: e.target.value })}
                className="border wb-border rounded px-2 py-1 bg-white wb-text-dark"
              >
                <option value="combat">{t('combat2d8')}</option>
                <option value="defense">{t('defense2d8')}</option>
                <option value="wits">{t('wits2d8')}</option>
              </select>
              <select
                value={model.technicianWeakStat || 'combat'}
                onChange={(e) => onChange({ ...model, technicianWeakStat: e.target.value })}
                className="border wb-border rounded px-2 py-1 bg-white wb-text-dark"
              >
                <option value="combat">{t('combat2d4')}</option>
                <option value="defense">{t('defense2d4')}</option>
                <option value="wits">{t('wits2d4')}</option>
              </select>
            </>
          )}
        </div>
      )}
      <div className="flex">
        <StatCell stat="combat" iconName="combat" label={t('combat')} />
        <StatCell stat="defense" iconName="defense" label={t('defense')} />
        <StatCell stat="wits" iconName="wits" label={t('wits')} />
      </div>
    </div>
  );
};

// Health and movement display
const HealthMoveRow = ({ model, onChange, mode }) => {
  const healthMod = getHealthModFromModifiers(model.modifiers);
  const cyberHealthMod = getCyberneticHealthMod(model.equipment);
  const moveMod = getMoveModFromModifiers(model.modifiers);
  const cyberMoveMod = getCyberneticMoveMod(model.equipment);
  const armorMoveMod = getArmorMoveMod(model.equipment);
  const baseHealth = model.baseHealth || 8;
  const baseMove = model.baseMove || 6;
  const maxHealth = baseHealth + healthMod + cyberHealthMod;
  const totalMoveMod = moveMod + cyberMoveMod + armorMoveMod;
  const move = baseMove + totalMoveMod;
  const isPlay = mode === 'play';

  return (
    <div className="flex gap-2 mb-2">
      <div className="flex-1 border-2 wb-border rounded p-2 bg-white">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold">
            <Icon name="health" className="mr-1" />{t('health')}
          </span>
          <span className="text-xs wb-text-muted">
            {model.currentHealth ?? maxHealth}/{maxHealth}
            {healthMod !== 0 && (
              <span className={healthMod > 0 ? 'wb-text-primary ml-1' : 'wb-text-danger ml-1'}>
                ({t('base')} {baseHealth})
              </span>
            )}
          </span>
        </div>
        <div className="flex gap-0.5 flex-wrap">
          {Array.from({ length: Math.max(0, maxHealth) }, (_, i) => (
            <button
              key={i}
              onClick={() => onChange({ ...model, currentHealth: i + 1 === (model.currentHealth ?? maxHealth) ? i : i + 1 })}
              className={`${isPlay ? 'w-7 h-7 sm:w-8 sm:h-8 text-sm' : 'w-5 h-5 text-xs'} rounded font-bold transition-colors border ${
                i < (model.currentHealth ?? maxHealth)
                  ? 'wb-bg-accent wb-text-accent wb-border-accent'
                  : 'bg-white wb-border wb-text-disabled'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <div className={`${isPlay ? 'w-20 sm:w-24' : 'w-24'} border-2 wb-border rounded p-2 bg-white text-center`}>
        <div className="text-xs font-semibold mb-1">
          <Icon name="move" className="mr-1" />{t('move')}
        </div>
        <div className={`font-mono font-bold ${isPlay ? 'text-3xl sm:text-2xl' : 'text-2xl'}`}>{move}"</div>
        {totalMoveMod !== 0 && (
          <div className={`text-xs ${totalMoveMod > 0 ? 'wb-text-primary' : 'wb-text-danger'}`}>
            ({t('base')} {baseMove}")
          </div>
        )}
      </div>
    </div>
  );
};

// Equipment item badge
const ItemBadge = ({ item, onRemove, onToStash, onUse, used, showActions = true, damageBonus = 0 }) => {
  if (!item) return null;
  const type = getItemType(item.id);
  const isCons = type === 'consumable';
  const effectiveDamage = damageBonus && item.damage ? addDamageBonus(item.damage, damageBonus) : item.damage;
  const hasBonus = damageBonus && item.damage && effectiveDamage !== item.damage;

  return (
    <div className={`flex items-center gap-2 p-2 rounded border wb-border text-xs group ${
      used ? 'wb-bg-light opacity-50' : 'bg-white'
    }`}>
      {item.type && <TypeLabel type={item.type} />}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className={`font-semibold ${used ? 'line-through' : ''}`}>{item.name}</span>
          {item.free && <span className="wb-text-primary text-xs">({t('free')})</span>}
        </div>
        <div className="wb-text-muted truncate text-xs">
          {item.damage && (
            <span className="mr-1">
              {hasBonus ? (
                <>
                  <span className="font-mono wb-text-primary font-bold">{effectiveDamage}</span>
                  <span className="wb-text-disabled ml-1">({item.damage}+{damageBonus})</span>
                </>
              ) : (
                <span className="font-mono">{item.damage}</span>
              )}
            </span>
          )}
          {item.reduction && <span className="mr-1">-{item.reduction}</span>}
          {item.special && item.special !== '-' && <span dangerouslySetInnerHTML={{ __html: markdownToHtml(item.special) }} />}
          {item.effect && <span dangerouslySetInnerHTML={{ __html: markdownToHtml(item.effect) }} />}
        </div>
      </div>
      {showActions && (
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {isCons && !used && onUse && (
            <button onClick={onUse} className="px-2 py-1 wb-bg-accent wb-text-accent rounded font-bold hover:wb-bg-medium">
              {t('use')}
            </button>
          )}
          {onToStash && !used && (
            <button onClick={onToStash} className="px-1.5 py-1 border wb-border rounded hover:wb-bg-light" title={t('toStash')}>
              <Icon name="stash" />
            </button>
          )}
          {onRemove && (
            <button onClick={onRemove} className="px-1.5 py-1 border wb-border wb-text-danger rounded hover:wb-bg-light">
              <Icon name="remove" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Equipment section with shop modals
const EquipmentSection = ({ model, onChange, onAddToStash, mode, subs, onBuy, ascendedBonus, archetypes, weaponData }) => {
  const [shopOpen, setShopOpen] = useState(null);
  const arch = archetypes[model.archetype];

  const { MELEE_WEAPONS, RANGED_WEAPONS, ARMOR, GEAR, CONSUMABLES, CYBERNETICS, GRENADES } = weaponData;

  // Language-agnostic weapon restrictions (EN: Melee/Ranged, ES: Melé/Disparo)
  const canMelee = !arch || !['Ranged', 'Disparo'].includes(arch.weapons) || ascendedBonus === 'weapons';
  const canRanged = !arch || !['Melee', 'Melé'].includes(arch.weapons) || ascendedBonus === 'weapons';

  let maxArmor = arch?.maxArmor || 'Light';
  if (ascendedBonus === 'armor') {
    // Handle both EN (Light/Medium/Heavy) and ES (Ligera/Media/Pesada) tier names
    const isLight = maxArmor === 'Light' || maxArmor === 'Ligera';
    const isMedium = maxArmor === 'Medium' || maxArmor === 'Media';
    maxArmor = isLight ? 'Medium' : isMedium ? 'Heavy' : 'Heavy';
  }

  const rangedDmgBonus = arch?.special?.includes('+1 ranged dmg') ? 1 : 0;

  const equipment = model.equipment || [];
  const melee = equipment.filter(e => getItemType(e.id) === 'melee');
  const ranged = equipment.filter(e => getItemType(e.id) === 'ranged');
  const armor = equipment.find(e => getItemType(e.id) === 'armor');
  const gear = equipment.filter(e => getItemType(e.id) === 'gear');
  const consumables = equipment.filter(e => getItemType(e.id) === 'consumable');
  const cybernetics = equipment.filter(e => getItemType(e.id) === 'cybernetic');
  const grenades = equipment.filter(e => getItemType(e.id) === 'grenade');

  const canEdit = mode === 'build' || mode === 'edit';

  const removeItem = (itemId) => {
    onChange({ ...model, equipment: equipment.filter(e => e.id !== itemId) });
  };

  const toStash = (item) => {
    onChange({ ...model, equipment: equipment.filter(e => e.id !== item.id) });
    onAddToStash(item);
  };

  const addItem = (item, free = false) => {
    const newItem = { ...item, free, used: false };
    let newEquipment;
    if (getItemType(item.id) === 'armor') {
      const withoutArmor = equipment.filter(e => getItemType(e.id) !== 'armor');
      newEquipment = [...withoutArmor, newItem];
    } else {
      newEquipment = [...equipment, { ...newItem, id: item.id + '-' + Date.now() }];
    }
    onChange({ ...model, equipment: newEquipment });
    if (!free) onBuy(item.cost);
    setShopOpen(null);
  };

  const useConsumable = (itemId) => {
    onChange({
      ...model,
      equipment: equipment.map(e => e.id === itemId ? { ...e, used: true } : e)
    });
  };

  const ShopModal = ({ items, title, onClose }) => (
    <div className="absolute z-50 top-0 left-0 right-0 bg-white border-2 wb-border rounded shadow-xl max-h-80 overflow-hidden">
      <div className="flex items-center justify-between p-2 wb-bg-accent wb-text-accent border-b wb-border sticky top-0">
        <span className="font-bold text-sm">{title}</span>
        <button onClick={onClose} className="wb-text-accent opacity-70 hover:opacity-100 text-lg">
          <Icon name="remove" />
        </button>
      </div>
      <div className="overflow-y-auto max-h-64">
        {items.map((item, idx) => (
          <div key={item.id || item.name || idx} className="p-2 border-b wb-border-light hover:wb-bg-light text-xs">
            <div className="flex items-center gap-2 mb-1">
              {item.type && <TypeLabel type={item.type} />}
              <span className="font-bold">{item.name}</span>
              {item.damage && <span className="font-mono wb-text-muted">{item.damage}</span>}
              {item.reduction && <span className="wb-text-muted">-{item.reduction}</span>}
              {item.tier && <span className="wb-text-muted">({t('tier' + item.tier)})</span>}
              <div className="flex-1" />
              <button
                onClick={() => addItem(item, true)}
                className="px-2 py-1 border wb-border rounded hover:wb-bg-light font-medium"
              >
                {t('free')}
              </button>
              <button
                onClick={() => addItem(item, false)}
                disabled={subs < item.cost}
                className="px-2 py-1 wb-bg-primary text-black rounded hover:wb-bg-primary-hover disabled:opacity-40 font-medium"
              >
                {item.cost}$
              </button>
            </div>
            <div className="wb-text-muted pl-4">
              {item.special && item.special !== '-' && <span dangerouslySetInnerHTML={{ __html: markdownToHtml(item.special) }} />}
              {item.effect && <span dangerouslySetInnerHTML={{ __html: markdownToHtml(item.effect) }} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SectionHeader = ({ iconName, label, onAdd, addLabel }) => (
    <div className="flex items-center justify-between mb-1">
      <span className="text-xs font-semibold wb-text-muted">
        <Icon name={iconName} className="mr-1" />{label}
      </span>
      {canEdit && onAdd && (
        <button onClick={onAdd} className="text-xs px-2 py-0.5 border wb-border rounded hover:wb-bg-light">
          + {addLabel || t('add')}
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-2 relative">
      {/* Weapons */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold wb-text-muted">
            <Icon name="melee" className="mr-1" />{t('weapons')}
            {rangedDmgBonus > 0 && <span className="wb-text-primary ml-1">(+{rangedDmgBonus} {t('ranged').toLowerCase()})</span>}
          </span>
          {canEdit && !(canMelee && canRanged) && (
            <button
              onClick={() => setShopOpen(canMelee ? 'melee' : 'ranged')}
              className="text-xs px-2 py-0.5 border wb-border rounded hover:wb-bg-light"
            >
              + {t('add')}
            </button>
          )}
        </div>
        {canEdit && canMelee && canRanged && (
          <div className="flex gap-1 mb-1">
            <button onClick={() => setShopOpen('melee')} className="text-xs px-2 py-0.5 border wb-border rounded hover:wb-bg-light">+ {t('melee')}</button>
            <button onClick={() => setShopOpen('ranged')} className="text-xs px-2 py-0.5 border wb-border rounded hover:wb-bg-light">+ {t('ranged')}</button>
          </div>
        )}
        <div className="space-y-1">
          {melee.map(item => (
            <ItemBadge
              key={item.id}
              item={item}
              onRemove={canEdit ? () => removeItem(item.id) : null}
              onToStash={() => toStash(item)}
              showActions={canEdit || mode === 'edit'}
              damageBonus={0}
            />
          ))}
          {ranged.map(item => (
            <ItemBadge
              key={item.id}
              item={item}
              onRemove={canEdit ? () => removeItem(item.id) : null}
              onToStash={() => toStash(item)}
              showActions={canEdit || mode === 'edit'}
              damageBonus={rangedDmgBonus}
            />
          ))}
          {melee.length === 0 && ranged.length === 0 && (
            <div className="text-xs wb-text-disabled italic p-2 wb-bg-light rounded border wb-border-light">{t('unarmed')}</div>
          )}
        </div>
        {shopOpen === 'melee' && <ShopModal items={MELEE_WEAPONS} title={t('meleeWeapons')} onClose={() => setShopOpen(null)} />}
        {shopOpen === 'ranged' && <ShopModal items={RANGED_WEAPONS} title={t('rangedWeapons')} onClose={() => setShopOpen(null)} />}
      </div>

      {/* Armor */}
      <div>
        <SectionHeader iconName="armor" label={t('armor')} onAdd={() => setShopOpen('armor')} />
        {armor ? (
          <ItemBadge item={armor} onRemove={canEdit ? () => removeItem(armor.id) : null} onToStash={() => toStash(armor)} showActions={canEdit} />
        ) : (
          <div className="text-xs wb-text-disabled italic p-2 wb-bg-light rounded border wb-border-light">{t('noArmor')}</div>
        )}
        {shopOpen === 'armor' && <ShopModal items={getArmorOptions(maxArmor, ARMOR)} title={t('armor')} onClose={() => setShopOpen(null)} />}
      </div>

      {/* Permanent: Gear + Cybernetics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div>
          <SectionHeader iconName="gear" label={t('gear')} onAdd={() => setShopOpen('gear')} />
          <div className="space-y-1">
            {gear.map(item => (
              <ItemBadge key={item.id} item={item} onRemove={canEdit ? () => removeItem(item.id) : null} onToStash={() => toStash(item)} showActions={canEdit} />
            ))}
          </div>
          {shopOpen === 'gear' && <ShopModal items={GEAR} title={t('gear')} onClose={() => setShopOpen(null)} />}
        </div>
        <div>
          <SectionHeader iconName="cybernetic" label={t('cybernetics')} onAdd={() => setShopOpen('cyber')} />
          <div className="space-y-1">
            {cybernetics.map(item => (
              <ItemBadge key={item.id} item={item} onRemove={canEdit ? () => removeItem(item.id) : null} showActions={canEdit} />
            ))}
          </div>
          {shopOpen === 'cyber' && <ShopModal items={CYBERNETICS} title={t('cybernetics')} onClose={() => setShopOpen(null)} />}
        </div>
      </div>

      {/* Single-use: Consumables + Grenades */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div>
          <SectionHeader iconName="consumable" label={t('consumables')} onAdd={() => setShopOpen('cons')} />
          <div className="space-y-1">
            {consumables.map(item => (
              <ItemBadge
                key={item.id}
                item={item}
                used={item.used}
                onUse={() => useConsumable(item.id)}
                onRemove={canEdit && !item.used ? () => removeItem(item.id) : null}
                onToStash={!item.used ? () => toStash(item) : null}
                showActions={true}
              />
            ))}
          </div>
          {shopOpen === 'cons' && <ShopModal items={CONSUMABLES} title={t('consumables')} onClose={() => setShopOpen(null)} />}
        </div>
        <div>
          <SectionHeader iconName="grenade" label={t('grenades')} onAdd={() => setShopOpen('grenade')} />
          <div className="space-y-1">
            {grenades.map(item => (
              <ItemBadge
                key={item.id}
                item={item}
                used={item.used}
                onUse={() => useConsumable(item.id)}
                onRemove={canEdit && !item.used ? () => removeItem(item.id) : null}
                onToStash={!item.used ? () => toStash(item) : null}
                showActions={true}
              />
            ))}
          </div>
          {shopOpen === 'grenade' && <ShopModal items={GRENADES} title={t('grenades')} onClose={() => setShopOpen(null)} />}
        </div>
      </div>
    </div>
  );
};

// Modifiers section (injuries, promotions)
const ModifiersSection = ({ model, onChange, mode }) => {
  const [showAdd, setShowAdd] = useState(null);
  const modifiers = model.modifiers || [];
  const canEdit = mode === 'edit' || mode === 'build';

  const addModifier = (mod) => {
    onChange({ ...model, modifiers: [...modifiers, { ...mod, timestamp: Date.now() }] });
    setShowAdd(null);
  };

  const removeModifier = (idx) => {
    onChange({ ...model, modifiers: modifiers.filter((_, i) => i !== idx) });
  };

  return (
    <div className="border-2 wb-border rounded p-2 bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold">{t('modifiers')}</span>
        {canEdit && (
          <div className="flex gap-1">
            <button
              onClick={() => setShowAdd(showAdd === 'negative' ? null : 'negative')}
              className={`text-xs px-2 py-0.5 rounded border ${showAdd === 'negative' ? 'wb-bg-danger text-white wb-border-danger' : 'wb-border wb-text-danger hover:wb-bg-light'}`}
            >
              - {t('negative')}
            </button>
            <button
              onClick={() => setShowAdd(showAdd === 'positive' ? null : 'positive')}
              className={`text-xs px-2 py-0.5 rounded border ${showAdd === 'positive' ? 'wb-bg-primary text-black wb-border-primary' : 'wb-border wb-text-primary-hover hover:wb-bg-light'}`}
            >
              + {t('positive')}
            </button>
          </div>
        )}
      </div>

      {showAdd && (
        <div className="mb-2 p-2 wb-bg-light rounded border wb-border-light">
          <div className="flex flex-wrap gap-1">
            {MODIFIERS[showAdd].map(mod => (
              <button
                key={mod.id}
                onClick={() => addModifier(mod)}
                className={`px-2 py-1 rounded text-xs font-medium border ${
                  showAdd === 'negative' ? 'wb-border-danger wb-text-danger hover:bg-white' : 'wb-border-primary wb-text-primary-hover hover:bg-white'
                }`}
              >
                <i className={mod.iconClass} /> {mod.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {modifiers.length === 0 ? (
        <div className="text-xs wb-text-disabled italic text-center py-2">{t('noModifiers')}</div>
      ) : (
        <div className="flex flex-wrap gap-1">
          {modifiers.map((mod, i) => (
            <span
              key={i}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium group border ${
                mod.id.includes('+') ? 'wb-border-primary wb-text-primary-hover' : 'wb-border-danger wb-text-danger'
              }`}
            >
              <i className={mod.iconClass} /> {mod.name}
              {canEdit && (
                <button
                  onClick={() => removeModifier(i)}
                  className="opacity-0 group-hover:opacity-100 ml-1 wb-text-disabled hover:wb-text-dark"
                >
                  <Icon name="remove" />
                </button>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// Main model card component
const ModelCard = ({ model, onChange, onFire, mode, subs, onSpend, onAddToStash, modelIndex, allModels, leaderDead, hasAscendedLeader, archetypes, weaponData, powers }) => {
  const [showAscendChoice, setShowAscendChoice] = useState(false);
  const arch = archetypes[model.archetype];
  const equipmentCost = (model.equipment || []).filter(e => !e.free).reduce((sum, e) => sum + (e.cost || 0), 0);
  const canEditArchetype = mode === 'build';

  // Language-agnostic role detection: Leader has max "*", Broadcaster has max "1"
  const isLeader = arch?.max === '*';
  const isBroadcaster = arch?.max === '1';

  const archetypeCounts = allModels.reduce((counts, m, i) => {
    if (m.archetype && i !== modelIndex) {
      counts[m.archetype] = (counts[m.archetype] || 0) + 1;
    }
    return counts;
  }, {});

  const canAscend = leaderDead && !hasAscendedLeader && !isLeader && model.archetype && !model.ascended;

  const handleAscend = (bonus) => {
    onChange({ ...model, ascended: true, ascendedBonus: bonus });
    setShowAscendChoice(false);
  };

  // Empty slot
  if (!model.archetype) {
    return (
      <div className="border-2 border-dashed wb-border rounded-lg wb-bg-light p-6 flex flex-col items-center justify-center min-h-[200px]">
        <Icon name="add" className="text-4xl wb-text-disabled mb-3" />
        <span className="wb-text-muted mb-3">{t('emptySlot')}</span>
        {mode === 'build' && (
          <select
            onChange={(e) => {
              const a = archetypes[e.target.value];
              if (a) {
                onChange({
                  ...model,
                  archetype: e.target.value,
                  baseHealth: a.health,
                  currentHealth: a.health,
                  baseMove: a.move,
                });
              }
            }}
            className="text-sm border-2 wb-border rounded px-3 py-2 bg-white wb-text-dark"
            defaultValue=""
          >
            <option value="">{t('addMember')}</option>
            {Object.entries(archetypes).map(([name, data]) => {
              const count = archetypeCounts[name] || 0;
              const atLimit = count >= data.limit;
              return (
                <option key={name} value={name} disabled={atLimit}>
                  {stripMarkdown(name)} ({count}/{data.limit})
                </option>
              );
            })}
          </select>
        )}
        {mode !== 'build' && (
          <span className="text-xs wb-text-disabled">{t('switchToBuild')}</span>
        )}
      </div>
    );
  }

  return (
    <div className={`border-2 rounded-lg bg-white overflow-hidden ${
      isLeader ? 'wb-border-primary' :
      model.ascended ? 'wb-border-danger' :
      'wb-border'
    }`}>
      {/* Header */}
      <div className={`px-3 py-2 border-b-2 ${
        isLeader ? 'wb-bg-accent wb-text-accent wb-border-primary' :
        model.ascended ? 'wb-bg-danger text-white wb-border-danger' :
        'wb-bg-light wb-border'
      }`}>
        <div className="flex flex-wrap items-center gap-2">
          {isLeader && <Icon name="leader" className="wb-text-accent" />}
          {model.ascended && !isLeader && <Icon name="leader" className="wb-text-light" title={t('makeLeader')} />}
          <input
            type="text"
            placeholder={t('modelName')}
            value={model.name || ''}
            onChange={(e) => onChange({ ...model, name: e.target.value })}
            className={`flex-1 font-bold bg-transparent border-b border-dashed border-transparent hover:border-current focus:border-current focus:outline-none ${
              isLeader ? 'wb-text-accent placeholder-white/60' :
              model.ascended ? 'text-white placeholder-gray-400' : ''
            }`}
          />
          <button
            onClick={() => onChange({ ...model, name: generateModelName() })}
            className={`px-1 ${isLeader ? 'wb-text-accent opacity-60 hover:opacity-100' : 'text-gray-500 hover:text-gray-700'}`}
            title={t('randomName')}
          >
            <i className="fa fa-dice text-xs" />
          </button>
          {canEditArchetype ? (
            <select
              value={model.archetype || ''}
              onChange={(e) => {
                const a = archetypes[e.target.value];
                if (a) {
                  onChange({
                    ...model,
                    archetype: e.target.value,
                    baseHealth: a.health,
                    currentHealth: a.health,
                    baseMove: a.move,
                  });
                }
              }}
              className="text-xs border wb-border rounded px-2 py-1 bg-white wb-text-dark"
            >
              <option value="">{t('archetype')}</option>
              {Object.entries(archetypes).map(([name, data]) => {
                const count = archetypeCounts[name] || 0;
                const atLimit = count >= data.limit;
                return (
                  <option key={name} value={name} disabled={atLimit}>
                    {stripMarkdown(name)} ({count}/{data.limit})
                  </option>
                );
              })}
            </select>
          ) : (
            <span className={`text-xs font-medium px-2 py-1 rounded ${
              model.ascended && !isLeader ? 'wb-bg-light wb-text-dark' :
              isLeader ? 'bg-white/20 wb-text-accent' : 'wb-bg-accent wb-text-accent'
            }`}>
              {stripMarkdown(model.archetype) || t('noArchetype')}
            </span>
          )}
          {model.ascended && model.ascendedBonus && (
            <span className="text-xs px-2 py-1 rounded bg-white wb-text-dark">
              {model.ascendedBonus === 'weapons' ? t('bothWeapons') : t('armorTier')}
            </span>
          )}
          {mode !== 'play' && model.archetype && (
            <button
              onClick={onFire}
              className={`text-xs px-2 py-1 border rounded ${
                isLeader ? 'wb-border-accent/50 wb-text-accent hover:bg-white/20' : 'wb-border hover:bg-white'
              }`}
              title={t('removeFromWarband')}
            >
              <Icon name="remove" />
            </button>
          )}
        </div>
        {arch && (
          <div className={`text-xs mt-1 flex gap-2 flex-wrap items-center ${
            model.ascended && !isLeader ? 'wb-text-light/80' : isLeader ? 'wb-text-accent opacity-80' : 'wb-text-muted'
          }`}>
            <span>{model.ascendedBonus === 'weapons' ? t('both') : arch.weapons}</span>
            <span>{t('max')} {model.ascendedBonus === 'armor' ?
              // Upgrade tier display (preserve language: EN Light→Medium→Heavy, ES Ligera→Media→Pesada)
              (['Light', 'Ligera'].includes(arch.maxArmor) ? (arch.maxArmor === 'Light' ? 'Medium' : 'Media') :
               ['Medium', 'Media'].includes(arch.maxArmor) ? (arch.maxArmor === 'Medium' ? 'Heavy' : 'Pesada') :
               arch.maxArmor)
              : arch.maxArmor}</span>
            {arch.special !== '-' && <span className={model.ascended && !isLeader ? 'wb-text-light' : isLeader ? 'wb-text-accent font-semibold' : 'wb-text-danger'} dangerouslySetInnerHTML={{ __html: markdownToHtml(arch.special) }} />}
            <span className={`font-bold px-2 py-0.5 rounded ml-auto ${
              isLeader ? 'bg-white/20 wb-text-accent' : 'wb-bg-accent wb-text-accent'
            }`}>
              {equipmentCost}$
            </span>
          </div>
        )}

        {canAscend && mode === 'edit' && !showAscendChoice && (
          <button
            onClick={() => setShowAscendChoice(true)}
            className="mt-2 w-full py-1 wb-bg-danger text-white text-xs font-bold rounded hover:wb-bg-danger-hover"
          >
            <Icon name="leader" className="mr-1" />{t('makeLeader')}
          </button>
        )}
        {showAscendChoice && (
          <div className="mt-2 p-2 bg-white rounded border wb-border">
            <div className="text-xs font-bold mb-2">{t('ascensionBonus')}</div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAscend('weapons')}
                className="flex-1 py-2 wb-bg-accent wb-text-accent text-xs font-bold rounded hover:wb-bg-medium"
              >
                {t('bothWeapons')}
              </button>
              <button
                onClick={() => handleAscend('armor')}
                className="flex-1 py-2 wb-bg-accent wb-text-accent text-xs font-bold rounded hover:wb-bg-medium"
              >
                {t('armorTier')}
              </button>
            </div>
            <button
              onClick={() => setShowAscendChoice(false)}
              className="mt-1 w-full text-xs wb-text-muted hover:underline"
            >
              {t('cancel')}
            </button>
          </div>
        )}
      </div>

      <div className="p-3 space-y-3">
        <StatRow model={model} onChange={onChange} mode={mode} archetypes={archetypes} />
        <HealthMoveRow model={model} onChange={onChange} mode={mode} />
        <EquipmentSection
          model={model}
          onChange={onChange}
          mode={mode}
          subs={subs}
          onBuy={onSpend}
          onAddToStash={onAddToStash}
          ascendedBonus={model.ascendedBonus}
          archetypes={archetypes}
          weaponData={weaponData}
        />
        <ModifiersSection model={model} onChange={onChange} mode={mode} />

        {/* Wave Heresy */}
        {isBroadcaster && (
          <div className="border-2 wb-border rounded p-2 bg-white">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold">
                <Icon name="power" className="mr-1" />{t('heresy')}
              </span>
            </div>
            {model.power ? (
              <div className="flex items-center gap-2 p-2 wb-bg-light rounded border wb-border-light text-xs">
                <span className="font-bold">{model.power.name}</span>
                <span className="wb-text-muted" dangerouslySetInnerHTML={{ __html: 'vs ' + markdownToHtml(model.power.vs) }} />
                <span className="wb-text-muted flex-1" dangerouslySetInnerHTML={{ __html: markdownToHtml(model.power.effect) }} />
                {(mode === 'build' || mode === 'edit') && (
                  <button
                    onClick={() => onChange({ ...model, power: null })}
                    className="wb-text-danger hover:wb-text-danger-hover"
                  >
                    <Icon name="remove" />
                  </button>
                )}
              </div>
            ) : (
              <select
                onChange={(e) => {
                  const power = powers.find(p => p.id === e.target.value);
                  if (power) onChange({ ...model, power });
                }}
                className="w-full text-xs border wb-border rounded px-2 py-1 bg-white wb-text-dark"
                disabled={mode === 'play'}
              >
                <option value="">{t('choosePower')}</option>
                {powers.map(p => (
                  <option key={p.id} value={p.id}>{stripMarkdown(p.name)} (vs {stripMarkdown(p.vs)}) - {stripMarkdown(p.effect)}</option>
                ))}
              </select>
            )}
          </div>
        )}

        {/* Merits */}
        <div className="flex items-center gap-2 pt-2 border-t wb-border-light">
          <div className="flex items-center gap-1 border wb-border px-3 py-1 rounded">
            <span className="text-xs font-semibold">
              <Icon name="xp" className="mr-1" />{t('merits')}
            </span>
            <input
              type="number"
              value={model.xp || 0}
              onChange={(e) => onChange({ ...model, xp: parseInt(e.target.value) || 0 })}
              className="w-12 text-sm font-bold text-center bg-white border wb-border-light rounded"
              disabled={mode === 'play'}
            />
          </div>
          <span className="text-xs wb-text-muted">
            {t('next')}: {[1,3,6,10,15,21,28].find(threshold => threshold > (model.xp || 0)) || '28+'}
          </span>
        </div>
      </div>
    </div>
  );
};

// Export to window
window.H28_MODEL_CARD = { StatRow, HealthMoveRow, ItemBadge, EquipmentSection, ModifiersSection, ModelCard };
