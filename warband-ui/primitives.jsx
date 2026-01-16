// Hardwired 28 Warband Builder - Primitive Components (Zorn Palette)

const { TYPE_LABELS, MODE_STYLES, ICONS, CARD_SIZES, markdownToHtml, stripMarkdown, t } = window.H28_UTILS;

// Default card size
const DEFAULT_CARD_SIZE = 'tcg-standard';

// Icon component helper
const Icon = ({ name, className = '' }) => (
  <i className={`${ICONS[name] || ''} ${className}`} />
);

// Type label (text-based, replaces colored dots)
const TypeLabel = ({ type }) => {
  const cleanType = stripMarkdown(type || '');
  const label = TYPE_LABELS[cleanType] || cleanType?.substring(0, 3).toUpperCase() || '???';
  return (
    <span className="font-mono text-xs font-bold wb-text-muted uppercase">{label}</span>
  );
};

// Mode selection tabs (Zorn palette)
const ModeSelector = ({ mode, onChange }) => (
  <div className="flex border-2 wb-border rounded-l overflow-hidden">
    {['build', 'edit', 'play'].map(m => {
      const style = MODE_STYLES[m];
      const isActive = mode === m;
      return (
        <button
          key={m}
          onClick={() => onChange(m)}
          className={`px-3 sm:px-4 py-2 sm:py-2 font-bold text-xs sm:text-sm transition-colors ${
            isActive
              ? `${style.bg} ${style.text}`
              : 'bg-white wb-text-dark hover:wb-bg-light'
          }`}
        >
          {style.label}
        </button>
      );
    })}
  </div>
);

// Category labels for cards - using function to get translated values
const getCategoryLabel = (category) => {
  const labels = {
    melee: t('catMelee'),
    ranged: t('catRanged'),
    armor: t('catArmor'),
    gear: t('catGear'),
    consumable: t('catConsumable'),
    cybernetic: t('catCybernetic'),
    power: t('catPower'),
  };
  return labels[category] || category.toUpperCase();
};

// Check if card size is mini
const isMiniCard = (cardSize) => cardSize === 'mini-us' || cardSize === 'mini-euro';

// Datasheet-style equipment card with fixed text sizes (printer-friendly B&W)
const ItemCard = ({ item, category, cardSize = DEFAULT_CARD_SIZE }) => {
  const size = CARD_SIZES[cardSize] || CARD_SIZES[DEFAULT_CARD_SIZE];
  const isMini = isMiniCard(cardSize);
  const categoryLabel = getCategoryLabel(category);

  // Fixed text sizes - readable on all cards
  const fontSize = {
    header: isMini ? '8pt' : '10pt',
    name: isMini ? '11pt' : '14pt',
    statLabel: isMini ? '6pt' : '7pt',
    statValue: isMini ? '11pt' : '15pt',
    body: isMini ? '12pt' : '13pt',
  };

  // Padding scales with card size
  const pad = isMini ? '1mm' : '1.5mm';
  const padLarge = isMini ? '1.5mm' : '2mm';

  return (
    <div
      className="item-card bg-white border-[2px] border-black rounded-sm inline-flex flex-col text-black overflow-hidden align-top m-[1mm] print:m-0"
      style={{
        width: `${size.width}mm`,
        height: `${size.height}mm`,
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}
    >
      {/* Header bar - black background */}
      <div
        className="card-header bg-black text-white flex items-center justify-between"
        style={{ padding: `${pad} ${padLarge}`, fontSize: fontSize.header, fontFamily: 'var(--font-heading)' }}
      >
        <span className="font-bold uppercase tracking-wider">
          {categoryLabel}
        </span>
        {item.cost !== undefined && (
          <span className="font-bold">{item.cost}$</span>
        )}
      </div>

      {/* Name */}
      <div
        className="border-b-2 border-black text-center bg-gray-100"
        style={{ padding: `${pad} ${padLarge}` }}
      >
        <span
          className="font-bold uppercase tracking-wide"
          style={{ fontSize: fontSize.name, fontFamily: 'var(--font-heading)' }}
        >
          {item.name}
        </span>
      </div>

      {/* Stats grid - compact for mini, hidden if empty */}
      {(item.damage || item.reduction !== undefined || item.type || item.tier || item.vs) && (
        <div
          className={`border-b border-black grid text-center ${isMini ? 'grid-cols-2' : 'grid-cols-3'}`}
          style={{ fontSize: fontSize.statLabel }}
        >
          {item.damage && (
            <div className="border-r border-gray-400" style={{ padding: pad }}>
              <div className="text-gray-600 uppercase">{isMini ? t('dmg') : t('damage')}</div>
              <div className="font-mono font-bold" style={{ fontSize: fontSize.statValue }}>{item.damage}</div>
            </div>
          )}
          {item.reduction !== undefined && (
            <div className="border-r border-gray-400" style={{ padding: pad }}>
              <div className="text-gray-600 uppercase">{isMini ? t('arm') : t('armor')}</div>
              <div className="font-mono font-bold" style={{ fontSize: fontSize.statValue }}>{item.reduction}</div>
            </div>
          )}
          {item.type && (
            <div className={`col-span-2 ${!isMini ? 'border-r border-gray-400 last:border-r-0' : ''}`} style={{ padding: pad }}>
              <div className="text-gray-600 uppercase">{t('type')}</div>
              <div className="font-bold" style={{ fontSize: isMini ? '8pt' : '11pt' }}>{stripMarkdown(item.type)}</div>
            </div>
          )}
          {item.tier && !isMini && (
            <div className="border-r border-gray-400 last:border-r-0" style={{ padding: pad }}>
              <div className="text-gray-600 uppercase">{t('tier')}</div>
              <div className="font-bold" style={{ fontSize: '11pt' }}>{t('tier' + item.tier)}</div>
            </div>
          )}
          {item.vs && (
            <div className="col-span-3 text-center" style={{ padding: pad }}>
              <div className="text-gray-600 uppercase">{t('vs')}</div>
              <div className="font-bold" style={{ fontSize: isMini ? '10pt' : '13pt' }} dangerouslySetInnerHTML={{ __html: markdownToHtml(item.vs) }} />
            </div>
          )}
        </div>
      )}

      {/* Special rules */}
      <div className="flex-1 overflow-hidden" style={{ padding: padLarge, fontSize: fontSize.body }}>
        {item.special && item.special !== '-' && <p className="leading-tight" dangerouslySetInnerHTML={{ __html: markdownToHtml(item.special) }} />}
        {item.effect && <p className="leading-tight" dangerouslySetInnerHTML={{ __html: markdownToHtml(item.effect) }} />}
      </div>

    </div>
  );
};

// Simplified archetype card - single header (printer-friendly B&W)
const ArchetypeCard = ({ name, data, cardSize = DEFAULT_CARD_SIZE }) => {
  const size = CARD_SIZES[cardSize] || CARD_SIZES[DEFAULT_CARD_SIZE];
  const isMini = isMiniCard(cardSize);

  // Fixed text sizes
  const fontSize = {
    name: isMini ? '12pt' : '16pt',
    limit: isMini ? '9pt' : '11pt',
    statLabel: isMini ? '6pt' : '7pt',
    statValue: isMini ? '12pt' : '16pt',
    body: isMini ? '12pt' : '13pt',
  };

  const pad = isMini ? '1mm' : '1.5mm';
  const padLarge = isMini ? '1.5mm' : '2mm';

  return (
    <div
      className="archetype-card bg-white border-[2px] border-black rounded-sm inline-flex flex-col text-black overflow-hidden align-top m-[1mm] print:m-0"
      style={{
        width: `${size.width}mm`,
        height: `${size.height}mm`,
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}
    >
      {/* Single header - black with name and limit */}
      <div
        className="card-header bg-black text-white flex items-center justify-between"
        style={{ padding: `${padLarge} ${padLarge}`, fontFamily: 'var(--font-heading)' }}
      >
        <span
          className="font-bold uppercase tracking-wide"
          style={{ fontSize: fontSize.name }}
        >
          {stripMarkdown(name)}
        </span>
        <span className="font-bold" style={{ fontSize: fontSize.limit }}>
          0-{data.limit}
        </span>
      </div>

      {/* Stats grid - 2x2 */}
      <div className="border-b border-black grid grid-cols-2 text-center" style={{ fontSize: fontSize.statLabel }}>
        <div className="border-r border-gray-400" style={{ padding: pad }}>
          <div className="text-gray-600 uppercase">{t('health')}</div>
          <div className="font-mono font-bold" style={{ fontSize: fontSize.statValue }}>{data.health}</div>
        </div>
        <div style={{ padding: pad }}>
          <div className="text-gray-600 uppercase">{t('move')}</div>
          <div className="font-mono font-bold" style={{ fontSize: fontSize.statValue }}>{data.move}"</div>
        </div>
      </div>

      {/* Equipment restrictions */}
      <div className="border-b border-black grid grid-cols-2 text-center" style={{ fontSize: fontSize.statLabel }}>
        <div className="border-r border-gray-400" style={{ padding: pad }}>
          <div className="text-gray-600 uppercase">{t('weapons')}</div>
          <div className="font-bold" style={{ fontSize: isMini ? '8pt' : '11pt' }}>{data.weapons}</div>
        </div>
        <div style={{ padding: pad }}>
          <div className="text-gray-600 uppercase">{t('maxArmor')}</div>
          <div className="font-bold" style={{ fontSize: isMini ? '8pt' : '11pt' }}>{data.maxArmor}</div>
        </div>
      </div>

      {/* Special ability */}
      <div className="flex-1 overflow-hidden" style={{ padding: padLarge, fontSize: fontSize.body }}>
        {data.special !== '-' && (
          <p className="leading-tight" dangerouslySetInnerHTML={{ __html: markdownToHtml(data.special) }} />
        )}
      </div>
    </div>
  );
};

// Square component for health/Merit tracking
// highlight = true adds gray background as checkpoint marker
const TrackSquare = ({ size = '3.5mm', highlight = false }) => (
  <div
    style={{
      width: size,
      height: size,
      border: '1px solid black',
      backgroundColor: highlight ? '#d0d0d0' : 'transparent',
      flexShrink: 0,
      marginLeft: '-1px', // overlap borders
    }}
  />
);

// Blank model card for players to write stats - redesigned for gameplay
const BlankModelCard = ({ cardSize = DEFAULT_CARD_SIZE }) => {
  const size = CARD_SIZES[cardSize] || CARD_SIZES[DEFAULT_CARD_SIZE];
  const isMini = isMiniCard(cardSize);

  // Harmonized font sizes - consistent across all sections
  const fontSize = {
    label: isMini ? '6pt' : '7pt',       // Section labels (NAME, COMBAT, etc.)
    content: isMini ? '6pt' : '7pt',     // Equipment slot labels
  };

  const pad = isMini ? '1.5mm' : '2mm';
  const padHalf = isMini ? '0.75mm' : '1mm';
  const sqSize = isMini ? '4mm' : '5.5mm';
  const rowHeight = isMini ? '6mm' : '8mm';

  // Fixed 10 squares per row for health
  const squaresPerRow = 10;

  // Health: 40 squares total
  const healthSquares = 40;

  // Helper to render squares in fixed rows of 10
  const renderSquareRows = (total, isHighlight) => {
    const rows = [];
    for (let start = 0; start < total; start += squaresPerRow) {
      const count = Math.min(squaresPerRow, total - start);
      rows.push(
        <div key={start} className="flex justify-center" style={{ paddingLeft: '1px' }}>
          {Array.from({ length: count }, (_, i) => (
            <TrackSquare key={i} size={sqSize} highlight={isHighlight(start + i + 1)} />
          ))}
        </div>
      );
    }
    return rows;
  };

  // Equipment slot labels
  const equipmentSlots = [t('catMelee'), t('catRanged'), t('catArmor'), t('special')];

  return (
    <div
      className="blank-card bg-white border-[2px] border-black rounded-sm inline-flex flex-col text-black overflow-hidden align-top m-[1mm] print:m-0"
      style={{
        width: `${size.width}mm`,
        height: `${size.height}mm`,
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}
    >
      {/* Row 1: Name + Move - boxed like stats */}
      <div className="grid grid-cols-3 border-b-2 border-black" style={{ fontSize: fontSize.label, minHeight: rowHeight }}>
        {/* NAME - spans 2 columns */}
        <div className="col-span-2 text-center border-r border-gray-300" style={{ paddingTop: padHalf, paddingBottom: pad }}>
          <div className="text-black uppercase">{t('name')}</div>
          <div className="mx-auto" style={{ width: '100%', height: isMini ? '5mm' : '6mm' }} />
        </div>
        {/* MOVE - 1 column */}
        <div className="text-center" style={{ paddingTop: padHalf, paddingBottom: pad }}>
          <div className="text-black uppercase">{t('move')}</div>
          <div className="mx-auto" style={{ width: isMini ? '10mm' : '14mm', height: isMini ? '5mm' : '6mm' }} />
        </div>
      </div>

      {/* Row 2: Stats - Combat, Defense, Wits, Armor (4 columns) */}
      <div className="grid grid-cols-4 border-b border-black" style={{ fontSize: fontSize.label, minHeight: rowHeight }}>
        {[t('combat'), t('defense'), t('wits'), t('armor')].map((stat, idx) => (
          <div key={stat} className={`text-center ${idx < 3 ? 'border-r border-gray-300' : ''}`} style={{ paddingTop: padHalf, paddingBottom: pad }}>
            <div className="text-black uppercase">{stat}</div>
            <div
              className="mx-auto"
              style={{
                width: isMini ? '10mm' : '12mm',
                height: isMini ? '5mm' : '6mm',
              }}
            />
          </div>
        ))}
      </div>

      {/* Row 3: Equipment slots (MELEE, RANGED, ARMOR) */}
      <div className="border-b border-black" style={{ padding: pad }}>
        {equipmentSlots.map((label) => (
          <div key={label} style={{ marginBottom: isMini ? '0.5mm' : '1mm' }}>
            <span className="text-gray-500 uppercase" style={{ fontSize: fontSize.content }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Row 4: Health header */}
      <div className="bg-gray-100 text-center" style={{ padding: padHalf, fontSize: fontSize.label }}>
        <span className="font-bold uppercase">{t('health')}</span>
      </div>

      {/* Row 5: Health - 40 squares in rows of 10, highlighted every 5th */}
      <div className="flex-1" style={{ padding: pad }}>
        {renderSquareRows(healthSquares, (pos) => pos % 5 === 0)}
      </div>
    </div>
  );
};

// Enemy card for hostile units (simplified - no faction data)
const EnemyCard = ({ enemy, cardSize = DEFAULT_CARD_SIZE }) => {
  const size = CARD_SIZES[cardSize] || CARD_SIZES[DEFAULT_CARD_SIZE];
  const isMini = isMiniCard(cardSize);

  const fontSize = {
    name: isMini ? '10pt' : '12pt',
    statLabel: isMini ? '6pt' : '7pt',
    statValue: isMini ? '10pt' : '13pt',
    body: isMini ? '8pt' : '10pt',
  };

  const pad = isMini ? '1mm' : '1.5mm';
  const padLarge = isMini ? '1.5mm' : '2mm';

  return (
    <div
      className="enemy-card bg-white border-[2px] border-black rounded-sm inline-flex flex-col text-black overflow-hidden align-top m-[1mm] print:m-0"
      style={{
        width: `${size.width}mm`,
        height: `${size.height}mm`,
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}
    >
      {/* Name header - black background */}
      <div
        className="card-header bg-black text-white text-center"
        style={{ padding: `${pad} ${padLarge}`, fontFamily: 'var(--font-heading)' }}
      >
        <div
          className="font-bold uppercase tracking-wide"
          style={{ fontSize: fontSize.name }}
        >
          {enemy.name}
        </div>
        {enemy.faction && (
          <div className="uppercase tracking-wider text-gray-400" style={{ fontSize: isMini ? '6pt' : '7pt' }}>{enemy.faction}</div>
        )}
      </div>

      {/* Health & Move */}
      <div className="border-b border-black grid grid-cols-2 text-center" style={{ fontSize: fontSize.statLabel }}>
        <div className="border-r border-gray-400" style={{ padding: pad }}>
          <div className="text-gray-600 uppercase">{t('health')}</div>
          <div className="font-mono font-bold" style={{ fontSize: fontSize.statValue }}>{enemy.health || '-'}</div>
        </div>
        <div style={{ padding: pad }}>
          <div className="text-gray-600 uppercase">{t('move')}</div>
          <div className="font-mono font-bold" style={{ fontSize: fontSize.statValue }}>{enemy.move || '-'}</div>
        </div>
      </div>

      {/* Combat, Defense, Wits */}
      <div className="border-b border-black grid grid-cols-3 text-center" style={{ fontSize: fontSize.statLabel }}>
        <div className="border-r border-gray-400" style={{ padding: pad }}>
          <div className="text-gray-600 uppercase">{t('combat')}</div>
          <div className="font-bold" style={{ fontSize: isMini ? '8pt' : '10pt' }}>{enemy.combat || '-'}</div>
        </div>
        <div className="border-r border-gray-400" style={{ padding: pad }}>
          <div className="text-gray-600 uppercase">{t('defense')}</div>
          <div className="font-bold" style={{ fontSize: isMini ? '8pt' : '10pt' }}>{enemy.defense || '-'}</div>
        </div>
        <div style={{ padding: pad }}>
          <div className="text-gray-600 uppercase">{t('wits')}</div>
          <div className="font-bold" style={{ fontSize: isMini ? '8pt' : '10pt' }}>{enemy.wits || '-'}</div>
        </div>
      </div>

      {/* Weapon & Spawn */}
      <div className="flex-1 overflow-hidden" style={{ padding: padLarge, fontSize: fontSize.body }}>
        {enemy.weapon && <p className="leading-tight" dangerouslySetInnerHTML={{ __html: `<strong>${t('weapon')}:</strong> ${markdownToHtml(enemy.weapon)}` }} />}
        {enemy.spawn && <p className="leading-tight text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: `<strong>${t('spawn')}:</strong> ${markdownToHtml(enemy.spawn)}` }} />}
      </div>
    </div>
  );
};

// Reference card for criticals, fumbles, and other tables
// Supports 2-column (d20/finding) and 3-column (d6/result/effect) formats
const ReferenceCard = ({ title, table, cardSize = DEFAULT_CARD_SIZE, smallFont = false }) => {
  const size = CARD_SIZES[cardSize] || CARD_SIZES[DEFAULT_CARD_SIZE];
  const isMini = isMiniCard(cardSize);

  // Null safety - skip rendering if no table data
  if (!table || !table.items || table.items.length === 0) return null;

  const columns = table.display_columns || table.columns || ['d6', 'Result', 'Effect'];

  const fontSize = {
    header: isMini ? '8pt' : '10pt',
    tableHeader: isMini ? '6pt' : '8pt',
    tableBody: isMini ? (smallFont ? '5.5pt' : '6pt') : (smallFont ? '7pt' : '8pt'),
  };

  const pad = isMini ? '1mm' : '1.5mm';

  // Get value from item based on column name (handles various property names)
  // All values are transformed through markdownToHtml for consistent formatting
  const getItemValue = (item, colIndex) => {
    const colName = columns[colIndex]?.toLowerCase();
    let value;
    // Common mappings
    if (colIndex === 0) value = item.roll || item.total || item[colName];
    else if (colIndex === 1) value = item.result || item.finding || item[colName];
    else if (colIndex === 2) value = item.effect || item[colName];
    else value = item[colName];

    return markdownToHtml(value);
  };

  return (
    <div
      className="reference-card bg-white border-[2px] border-black rounded-sm inline-flex flex-col text-black overflow-hidden align-top m-[1mm] print:m-0"
      style={{
        width: `${size.width}mm`,
        height: `${size.height}mm`,
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}
    >
      {/* Header */}
      <div
        className="bg-black text-white text-center"
        style={{ padding: pad, fontSize: fontSize.header, fontFamily: 'var(--font-heading)' }}
      >
        <span className="font-bold uppercase tracking-wider">{title}</span>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-hidden">
        <table className="w-full border-collapse" style={{ fontSize: fontSize.tableBody }}>
          <thead>
            <tr style={{ fontSize: fontSize.tableHeader }}>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`${i === 0 ? 'text-center' : 'text-left'} border-b border-black font-bold uppercase`}
                  style={{ width: i === 0 ? (isMini ? '6mm' : '8mm') : undefined, padding: `0 ${pad}`, fontFamily: 'var(--font-heading)' }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.items?.map((item, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                {columns.map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className={`${colIndex === 0 ? 'text-center font-bold' : colIndex === 1 ? 'font-bold' : 'leading-tight'}`}
                    style={{ padding: `0 ${pad}` }}
                    dangerouslySetInnerHTML={{ __html: getItemValue(item, colIndex) }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Faction card for hostile faction special rules and behavior table
const FactionCard = ({ faction, cardSize = DEFAULT_CARD_SIZE }) => {
  const size = CARD_SIZES[cardSize] || CARD_SIZES[DEFAULT_CARD_SIZE];
  const isMini = isMiniCard(cardSize);

  // Null safety
  if (!faction) return null;

  const fontSize = {
    header: isMini ? '9pt' : '11pt',
    special: isMini ? '7pt' : '9pt',
    tableHeader: isMini ? '6pt' : '8pt',
    tableBody: isMini ? '6pt' : '7pt',
  };

  const pad = isMini ? '1mm' : '1.5mm';
  const padLarge = isMini ? '1.5mm' : '2mm';

  const behavior = faction.behavior || {};
  const behaviorAttacked = faction.behavior_attacked;
  // Base columns for key lookup (always English property names)
  const baseColumns = behavior.columns || ['d6', 'No LoS', 'Has LoS', 'Engaged'];
  const baseColumnsAttacked = behaviorAttacked?.columns || baseColumns;
  // Display columns for headers (localized)
  const displayColumns = behavior.display_columns || baseColumns;
  const displayColumnsAttacked = behaviorAttacked?.display_columns || baseColumnsAttacked;

  // Map column names to item property names using base columns
  const getItemValue = (item, colIndex, baseCols) => {
    const colName = (baseCols || baseColumns)[colIndex]?.toLowerCase().replace(/\s+/g, '_');
    if (colIndex === 0) return item.roll || item[colName];
    return item[colName] || item[(baseCols || baseColumns)[colIndex]?.toLowerCase()] || '-';
  };

  return (
    <div
      className="faction-card bg-white border-[2px] border-black rounded-sm inline-flex flex-col text-black overflow-hidden align-top m-[1mm] print:m-0"
      style={{
        width: `${size.width}mm`,
        height: `${size.height}mm`,
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}
    >
      {/* Faction name header */}
      <div
        className="bg-black text-white text-center"
        style={{ padding: pad, fontSize: fontSize.header, fontFamily: 'var(--font-heading)' }}
      >
        <span className="font-bold uppercase tracking-wider">{faction.table_name}</span>
      </div>

      {/* Special rule */}
      {faction.special_rule && (
        <div
          className="border-b border-black bg-gray-100"
          style={{ padding: padLarge, fontSize: fontSize.special }}
        >
          <p className="leading-tight" dangerouslySetInnerHTML={{ __html: markdownToHtml(faction.special_rule) }} />
        </div>
      )}

      {/* Behavior table */}
      <div className="flex-1 overflow-hidden">
        {/* Normal behavior header */}
        {behaviorAttacked && (
          <div
            className="bg-gray-200 text-center font-bold uppercase"
            style={{ padding: `0 ${pad}`, fontSize: fontSize.tableHeader, fontFamily: 'var(--font-heading)' }}
          >
            {behavior.title || 'Normal'}
          </div>
        )}
        <table className="w-full border-collapse" style={{ fontSize: fontSize.tableBody }}>
          <thead>
            <tr style={{ fontSize: fontSize.tableHeader }}>
              {displayColumns.map((col, i) => (
                <th
                  key={i}
                  className={`${i === 0 ? 'text-center' : 'text-left'} border-b border-black font-bold uppercase`}
                  style={{ padding: `${pad} ${pad}`, fontFamily: 'var(--font-heading)' }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {behavior.items?.map((item, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {baseColumns.map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className={`${colIndex === 0 ? 'text-center font-bold' : ''}`}
                    style={{ padding: `0 ${pad}` }}
                  >
                    {getItemValue(item, colIndex, baseColumns)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Attacked behavior table */}
        {behaviorAttacked && (
          <>
            <div
              className="bg-gray-200 text-center font-bold uppercase border-t border-black"
              style={{ padding: `0 ${pad}`, fontSize: fontSize.tableHeader, fontFamily: 'var(--font-heading)' }}
            >
              {behaviorAttacked.title || 'Attacked'}
            </div>
            <table className="w-full border-collapse" style={{ fontSize: fontSize.tableBody }}>
              <thead>
                <tr style={{ fontSize: fontSize.tableHeader }}>
                  {displayColumnsAttacked.map((col, i) => (
                    <th
                      key={i}
                      className={`${i === 0 ? 'text-center' : 'text-left'} border-b border-black font-bold uppercase`}
                      style={{ padding: `${pad} ${pad}`, fontFamily: 'var(--font-heading)' }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {behaviorAttacked.items?.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {baseColumnsAttacked.map((_, colIndex) => (
                      <td
                        key={colIndex}
                        className={`${colIndex === 0 ? 'text-center font-bold' : ''}`}
                        style={{ padding: `0 ${pad}` }}
                      >
                        {getItemValue(item, colIndex, baseColumnsAttacked)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

// Corporate Blessings card - live reference with checkboxes
const CorporateBlessingsCard = ({ blessings, cardSize = DEFAULT_CARD_SIZE }) => {
  const size = CARD_SIZES[cardSize] || CARD_SIZES[DEFAULT_CARD_SIZE];
  const isMini = isMiniCard(cardSize);

  // Null safety
  if (!blessings || !blessings.items || blessings.items.length === 0) return null;

  const fontSize = {
    header: isMini ? '8pt' : '10pt',
    roll: isMini ? '9pt' : '11pt',
    name: isMini ? '7.5pt' : '9.5pt',
    effect: isMini ? '6.5pt' : '8.5pt',
  };

  const pad = isMini ? '0.5mm' : '0.8mm';

  return (
    <div
      className="blessings-card bg-white border-[2px] border-black rounded-sm inline-flex flex-col text-black overflow-hidden align-top m-[1mm] print:m-0"
      style={{
        width: `${size.width}mm`,
        height: `${size.height}mm`,
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}
    >
      {/* Header */}
      <div
        className="bg-black text-white text-center"
        style={{ padding: pad, fontSize: fontSize.header, fontFamily: 'var(--font-heading)' }}
      >
        <span className="font-bold uppercase tracking-wider">{t('blessings')}</span>
      </div>

      {/* Blessings list */}
      <div className="flex-1 overflow-hidden" style={{ padding: `0 ${pad}` }}>
        {blessings.items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1 border-b border-gray-200 last:border-b-0"
            style={{ padding: `${pad} 0`, lineHeight: 1.1 }}
          >
            {/* Roll number */}
            <span className="font-mono font-bold text-center" style={{ fontSize: fontSize.roll, minWidth: isMini ? '5mm' : '6mm' }}>
              {item.roll}
            </span>
            {/* Name and effect on two lines */}
            <div className="flex-1" style={{ lineHeight: 1.15 }}>
              <div className="font-bold" style={{ fontSize: fontSize.name }}>{item.name}</div>
              <div className="text-gray-600" style={{ fontSize: fontSize.effect }}>{item.effect}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Blank model card back - XP/Merit track, restrictions, inventory
const BlankModelBackCard = ({ cardSize = DEFAULT_CARD_SIZE }) => {
  const size = CARD_SIZES[cardSize] || CARD_SIZES[DEFAULT_CARD_SIZE];
  const isMini = isMiniCard(cardSize);

  const fontSize = {
    label: isMini ? '6pt' : '7pt',
    content: isMini ? '7pt' : '9pt',
  };

  const pad = isMini ? '1.5mm' : '2mm';
  const padHalf = isMini ? '0.75mm' : '1mm';
  const sqSize = isMini ? '3.5mm' : '5.5mm';

  // Calculate squares per row based on card width
  const padNum = parseFloat(pad);
  const sqNum = parseFloat(sqSize);
  const cardBorder = 1;
  const availableWidth = size.width - (padNum * 2) - cardBorder;
  const squaresPerRow = Math.floor(availableWidth / sqNum);

  // Merit thresholds: triangular numbers (per rules)
  const meritThresholds = [1, 3, 6, 10, 15, 21, 28];

  // Helper to render squares in rows
  const renderSquareRows = (total, isHighlight) => {
    const rows = [];
    for (let start = 0; start < total; start += squaresPerRow) {
      const count = Math.min(squaresPerRow, total - start);
      rows.push(
        <div key={start} className="flex justify-center" style={{ paddingLeft: '1px' }}>
          {Array.from({ length: count }, (_, i) => (
            <TrackSquare key={i} size={sqSize} highlight={isHighlight(start + i + 1)} />
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
    <div
      className="blank-card-back bg-white border-[2px] border-black rounded-sm inline-flex flex-col text-black overflow-hidden align-top m-[1mm] print:m-0"
      style={{
        width: `${size.width}mm`,
        height: `${size.height}mm`,
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}
    >
      {/* Row 1: Merit track header */}
      <div className="bg-black text-white text-center" style={{ padding: padHalf, fontSize: fontSize.label, fontFamily: 'var(--font-heading)' }}>
        <span className="font-bold uppercase tracking-wider">{t('xp')}</span>
      </div>

      {/* Row 2: Merit track */}
      <div className="border-b border-black" style={{ padding: pad }}>
        {renderSquareRows(meritThresholds.at(-1), (pos) => meritThresholds.includes(pos))}
      </div>

      {/* Row 3: Weapon + Armor restrictions (words to strike through) */}
      <div className="border-b border-black" style={{ padding: pad }}>
        <div className="flex items-baseline justify-between" style={{ marginBottom: isMini ? '1mm' : '1.5mm' }}>
          <span style={{ fontSize: fontSize.content }}>{t('catMelee')}</span>
          <span style={{ fontSize: fontSize.content }}>{t('catRanged')}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span style={{ fontSize: fontSize.content }}>{t('weaponLight')}</span>
          <span style={{ fontSize: fontSize.content }}>{t('weaponMedium')}</span>
          <span style={{ fontSize: fontSize.content }}>{t('weaponHeavy')}</span>
        </div>
      </div>

      {/* Row 4: Inventory header */}
      <div className="bg-gray-100 text-center" style={{ padding: padHalf, fontSize: fontSize.label }}>
        <span className="font-bold uppercase">{t('inventory')}</span>
      </div>

      {/* Row 5: Free inventory space */}
      <div className="flex-1" style={{ padding: pad }}>
        {/* Empty space for writing */}
      </div>
    </div>
  );
};

// Export to window
window.H28_PRIMITIVES = { Icon, TypeLabel, ModeSelector, ItemCard, ArchetypeCard, BlankModelCard, BlankModelBackCard, EnemyCard, FactionCard, ReferenceCard, CorporateBlessingsCard };
