/* ==========================================================================
   КОМПОНЕНТ ПАНЕЛИ ФИЛЬТРАЦИИ ДОКУМЕНТОВ
   S.Cost / src / components / Filtering / filtering.js
   ========================================================================== */

(function() {
  const STATUS_OPTIONS = [
    { value: 'red', label: 'Ошибка', tone: 'red' },
    { value: 'yellow', label: 'Требует проверки', tone: 'yellow' },
    { value: 'loading', label: 'Выполняется', tone: 'loading' },
    { value: 'green', label: 'Успешно', tone: 'green' },
    { value: 'gray', label: 'В очереди', tone: 'gray' }
  ];

  const STATUS_LABELS = {
    red: 'Ошибка',
    yellow: 'Требует проверки',
    green: 'Успешно',
    gray: 'В очереди',
    loading: 'Выполняется'
  };

  const FILTER_GROUPS = [
    { key: 'status', title: 'По статусу обработки' },
    { key: 'semantic', title: 'По смысловому типу документа' },
    { key: 'uploader', title: 'По автору загрузки / ФИО' },
    { key: 'format', title: 'По техническому формату файла' }
  ];

  let sourceNodes = [];
  let draftFilters = {};
  let appliedFilters = {};
  let filterOptions = {};
  let openGroups = new Set(['status']);
  const applyCallbacks = [];

  function ensureFilteringRoot() {
    let root = document.getElementById('metadata-panel-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'metadata-panel-root';
      document.body.appendChild(root);
    }
    return root;
  }

  function cloneFilters(filters = {}) {
    return Object.fromEntries(
      FILTER_GROUPS.map(group => [
        group.key,
        Array.isArray(filters[group.key]) ? Array.from(new Set(filters[group.key])) : []
      ])
    );
  }

  function getSelectedCount(filters = draftFilters) {
    return Object.values(filters || {}).reduce((sum, values) => {
      return sum + (Array.isArray(values) ? values.length : 0);
    }, 0);
  }

  function openPanel(options = {}) {
    sourceNodes = options.nodes || window.treeMockData || sourceNodes || [];
    appliedFilters = cloneFilters(options.filters || appliedFilters);
    draftFilters = cloneFilters(appliedFilters);
    filterOptions = buildFilterOptions(sourceNodes);
    renderPanel({ animate: true });
    document.body.classList.add('filtering-panel-open');
  }

  function closePanel({ restore = true, discardDraft = true } = {}) {
    const root = ensureFilteringRoot();
    if (discardDraft) draftFilters = cloneFilters(appliedFilters);
    root.classList.remove('metadata-filtering-mode');
    root.innerHTML = '';
    document.body.classList.remove('filtering-panel-open');

    if (restore && typeof window.restoreMetadataPanel === 'function') {
      window.restoreMetadataPanel();
    }
  }

  function setAppliedState(filters = {}) {
    appliedFilters = cloneFilters(filters);
    draftFilters = cloneFilters(filters);
  }

  function onApply(callback) {
    if (typeof callback === 'function') applyCallbacks.push(callback);
  }

  function applyFilters() {
    appliedFilters = cloneFilters(draftFilters);
    applyCallbacks.forEach(callback => callback(cloneFilters(appliedFilters)));
    closePanel({ discardDraft: false });
  }

  function resetGroup(groupKey) {
    draftFilters[groupKey] = [];
    renderPanel();
  }

  function resetAll() {
    draftFilters = cloneFilters({});
    renderPanel();
  }

  function toggleValue(groupKey, value, checked) {
    const values = new Set(draftFilters[groupKey] || []);
    if (checked) values.add(value);
    else values.delete(value);
    draftFilters[groupKey] = Array.from(values);
    renderPanel();
  }

  function toggleGroup(groupKey) {
    if (openGroups.has(groupKey)) openGroups.delete(groupKey);
    else openGroups.add(groupKey);
    renderPanel();
  }

  function renderPanel({ animate = false } = {}) {
    const root = ensureFilteringRoot();
    const selectedCount = getSelectedCount(draftFilters);
    const previousScrollTop = root.querySelector('.filtering-groups')?.scrollTop || 0;
    const panelClass = animate ? 'filtering-panel' : 'filtering-panel no-replay';

    root.classList.add('metadata-filtering-mode');
    root.innerHTML = `
        <section class="${panelClass}" role="region" aria-label="Фильтрация документов">
          <header class="filtering-header">
            <button type="button" class="filtering-context-btn" data-filter-cancel aria-label="Вернуться к деталям документа">
              <span class="filtering-context-icon filtering-context-filter" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M4 6.5h16L13.8 13v4.7l-3.6 1.8V13L4 6.5Z"></path>
                </svg>
              </span>
              <span class="filtering-context-icon filtering-context-back" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M14.7 6.2 9 12l5.7 5.8"></path>
                </svg>
              </span>
            </button>
            <div class="filtering-header-copy">
              <h2>Фильтрация</h2>
              <p>Для выполнения фильтрации выберите значения</p>
            </div>
            <button type="button" class="filtering-close-btn" data-filter-cancel aria-label="Закрыть фильтрацию">
              <span aria-hidden="true">×</span>
            </button>
          </header>

          <div class="filtering-groups">
            ${FILTER_GROUPS.map(group => renderFilterGroup(group)).join('')}
          </div>

          <footer class="filtering-footer">
            <button type="button" class="filtering-reset-all" data-filter-reset-all>Сбросить всё</button>
            <button type="button" class="filtering-apply-btn" data-filter-apply>
              Применить фильтры (${selectedCount})
            </button>
          </footer>
        </section>
    `;

    bindPanelEvents(root);

    const groups = root.querySelector('.filtering-groups');
    if (groups && previousScrollTop > 0) {
      groups.scrollTop = previousScrollTop;
    }
  }

  function renderFilterGroup(group) {
    const selectedValues = draftFilters[group.key] || [];
    const selectedCount = selectedValues.length;
    const isOpen = openGroups.has(group.key);
    const options = filterOptions[group.key] || [];

    return `
      <section class="filtering-accordion ${isOpen ? 'open' : ''}" data-filter-group="${group.key}">
        <div class="filtering-accordion-head">
          <button type="button" class="filtering-accordion-toggle" data-filter-toggle="${group.key}" aria-expanded="${isOpen ? 'true' : 'false'}">
            <span class="filtering-accordion-caret" aria-hidden="true"></span>
            <span class="filtering-accordion-title">${group.title}</span>
          </button>
          <span class="filtering-accordion-actions">
            ${selectedCount > 0 ? `<span class="filtering-selected-count">${selectedCount}</span>` : ''}
            ${selectedCount > 0 ? `<button type="button" class="filtering-reset-group" data-filter-reset-group="${group.key}">Сбросить</button>` : ''}
          </span>
        </div>
        ${isOpen ? `
          <div class="filtering-options">
            ${options.length > 0
              ? options.map(option => renderFilterOption(group.key, option, selectedValues)).join('')
              : '<div class="filtering-empty-group">Нет доступных значений</div>'}
          </div>
        ` : ''}
      </section>
    `;
  }

  function renderFilterOption(groupKey, option, selectedValues) {
    const checked = selectedValues.includes(option.value);
    const tone = option.tone ? ` status-${option.tone}` : '';

    return `
      <label class="filtering-option">
        <input
          type="checkbox"
          data-filter-checkbox
          data-filter-group="${groupKey}"
          value="${escapeAttribute(option.value)}"
          ${checked ? 'checked' : ''}
        >
        <span class="filtering-checkmark" aria-hidden="true"></span>
        ${option.tone ? `<span class="filtering-status-dot${tone}" aria-hidden="true"></span>` : ''}
        <span class="filtering-option-label">${option.label}</span>
        <span class="filtering-option-count">${option.count}</span>
      </label>
    `;
  }

  function bindPanelEvents(root) {
    root.querySelector('.filtering-panel')?.addEventListener('click', (event) => {
      const resetGroupControl = event.target.closest('[data-filter-reset-group]');
      if (resetGroupControl) {
        event.preventDefault();
        event.stopPropagation();
        resetGroup(resetGroupControl.dataset.filterResetGroup);
        return;
      }

      const toggleButton = event.target.closest('[data-filter-toggle]');
      if (toggleButton) {
        event.preventDefault();
        toggleGroup(toggleButton.dataset.filterToggle);
        return;
      }

      if (event.target.closest('[data-filter-reset-all]')) {
        resetAll();
        return;
      }

      if (event.target.closest('[data-filter-apply]')) {
        event.preventDefault();
        applyFilters();
        return;
      }

      if (event.target.closest('[data-filter-cancel]')) {
        event.preventDefault();
        closePanel();
      }
    });

    root.querySelector('.filtering-panel')?.addEventListener('change', (event) => {
      const checkbox = event.target.closest('[data-filter-checkbox]');
      if (!checkbox) return;
      toggleValue(checkbox.dataset.filterGroup, checkbox.value, checkbox.checked);
    });
  }

  function buildFilterOptions(nodes) {
    const buckets = {
      status: new Map(),
      semantic: new Map(),
      uploader: new Map(),
      format: new Map()
    };

    walkNodes(nodes, node => {
      const metadata = node.filter_metadata;
      if (!metadata) return;

      addOption(buckets.status, metadata.status.overall, getStatusLabel(metadata.status.overall), metadata.status.overall);

      addOption(buckets.semantic, metadata.semantic_type.key, metadata.semantic_type.label);
      addOption(buckets.uploader, metadata.uploaded_by.filter_key, metadata.uploaded_by.short_name || metadata.uploaded_by.full_name);
      addOption(buckets.format, metadata.technical_format.category, metadata.technical_format.label);
    });

    return {
      status: STATUS_OPTIONS.map(option => ({
        ...option,
        count: buckets.status.get(option.value)?.count || 0
      })),
      semantic: sortOptions(Array.from(buckets.semantic.values())),
      uploader: sortOptions(Array.from(buckets.uploader.values())),
      format: sortOptions(Array.from(buckets.format.values()))
    };
  }

  function addOption(map, value, label, tone = null) {
    if (!value) return;
    if (!map.has(value)) {
      map.set(value, { value, label, tone, count: 0 });
    }
    map.get(value).count += 1;
  }

  function sortOptions(options) {
    return options.sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return String(a.label).localeCompare(String(b.label), 'ru');
    });
  }

  function getStatusLabel(status) {
    return STATUS_LABELS[status] || status || 'Не определено';
  }

  function walkNodes(nodes, callback) {
    (nodes || []).forEach(node => {
      callback(node);
      if (node.children && node.children.length > 0) walkNodes(node.children, callback);
    });
  }

  function escapeAttribute(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.getElementById('metadata-panel-root')?.querySelector('.filtering-panel')) {
      closePanel();
    }
  });

  window.openDocumentFilterPanel = openPanel;
  window.onDocumentFiltersApplied = onApply;
  window.setDocumentFilterState = setAppliedState;
  window.getDocumentFilterState = () => cloneFilters(appliedFilters);
})();
