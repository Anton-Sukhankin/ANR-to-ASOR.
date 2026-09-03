const columns = [
  { key: "select", width: 40 },
  { key: "expand", width: 36 },
  { key: "number", width: 68 },
  { key: "rss", width: 112 },
  { key: "name", width: 390 },
  { key: "unit", width: 78 },
  { key: "add", width: 44 },
  { key: "materialNo", width: 70 },
  { key: "norm", width: 124 },
  { key: "qtyRcc", width: 104 },
  { key: "noteRcc", width: 270 },
  { key: "unitMatContractor", width: 136 },
  { key: "unitMatAuto", width: 114 },
  { key: "unitMatManual", width: 124 },
  { key: "unitMatEstimator", width: 124 },
  { key: "unitSmrContractor", width: 136 },
  { key: "unitSmrAuto", width: 114 },
  { key: "unitSmrManual", width: 124 },
  { key: "unitSmrEstimator", width: 124 },
  { key: "unitTotalContractor", width: 136 },
  { key: "unitTotalPlane", width: 126 },
  { key: "unitTotalEstimator", width: 126 },
  { key: "costMatContractor", width: 136 },
  { key: "costMatPlane", width: 126 },
  { key: "costMatEstimator", width: 126 },
  { key: "costSmrContractor", width: 136 },
  { key: "costSmrPlane", width: 126 },
  { key: "costSmrEstimator", width: 126 },
  { key: "costTotalContractor", width: 136 },
  { key: "costTotalPlane", width: 126 },
  { key: "costTotalEstimator", width: 126 },
  { key: "vat", width: 78 },
  { key: "done", width: 118 },
  { key: "qtyTd", width: 144 },
  { key: "noteTd", width: 260 },
  { key: "deviation", width: 110 },
  { key: "basis", width: 180 },
  { key: "remark", width: 170 }
];

const headerRows = [
  [
    { text: "", rowspan: 3, key: "select" },
    { text: "", rowspan: 3, key: "expand" },
    { text: "№", rowspan: 3, key: "number" },
    { text: "РСС / ТД / ДОП.", rowspan: 3, key: "rss" },
    { text: "Вид работ", rowspan: 3, key: "name" },
    { text: "Ед. изм.", rowspan: 3, key: "unit" },
    { text: "", rowspan: 3, key: "add" },
    { text: "Ном. мат.", rowspan: 3, key: "materialNo" },
    { text: "Норма расхода", rowspan: 3, key: "norm" },
    { text: "Объем по РСС", rowspan: 3, key: "qtyRcc" },
    { text: "Примечание по РСС", rowspan: 3, key: "noteRcc" },
    { text: "Стоимость ед., ₽ в т.ч. НДС", colspan: 11, className: "group-head" },
    { text: "Стоимость всего, ₽ в т.ч. НДС", colspan: 9, className: "group-head" },
    { text: "НДС", rowspan: 3, key: "vat" },
    { text: "Выполнено, объем", rowspan: 3, key: "done" },
    { text: "Объем по тех. документации", rowspan: 3, key: "qtyTd" },
    { text: "Примечания по ТД", rowspan: 3, key: "noteTd" },
    { text: "Отклонение", rowspan: 3, key: "deviation" },
    { text: "Обоснование", rowspan: 3, key: "basis" },
    { text: "Замечания", rowspan: 3, key: "remark" }
  ],
  [
    { text: "Основные материалы", colspan: 4, className: "group-head" },
    { text: "СМР", colspan: 4, className: "group-head" },
    { text: "Всего", colspan: 3, className: "group-head" },
    { text: "Основные материалы", colspan: 3, className: "group-head" },
    { text: "СМР", colspan: 3, className: "group-head" },
    { text: "Всего", colspan: 3, className: "group-head" }
  ],
  [
    "Подрядчик",
    "Авто",
    "Ручная",
    "Сметчик",
    "Подрядчик",
    "Авто",
    "Ручная",
    "Сметчик",
    "Подрядчик",
    "Самолет",
    "Сметчик",
    "Подрядчик",
    "Самолет",
    "Сметчик",
    "Подрядчик",
    "Самолет",
    "Сметчик",
    "Подрядчик",
    "Самолет",
    "Сметчик"
  ].map((text) => ({ text, sortable: true, className: "leaf-head" }))
];

const projectData = window.SCOST_PROJECT_DATA || {};

const state = {
  selected: new Set(),
  review: {
    drawerOpen: false,
    activeMode: "anr",
    activeFilter: "created",
    referenceQuery: "",
    referenceType: "all",
    referencesExpanded: true,
    commentsExpanded: true,
    reasonExpanded: false,
    syntheticSelectedValues: {},
    syntheticStatuses: {},
    draftDecisions: {},
    editingCommentId: null,
    matchExpanded: false,
    resultExpanded: false,
    aiLogicOpen: false,
    positionsExpanded: false,
    selectedIssueId: null,
    rdActiveFilter: "all",
    rdSelectedChangeId: null,
    rdChangesExpanded: true,
    rdSimilarExpanded: false,
    rdCommentsExpanded: true,
    rdEditingCommentId: null,
    rdEditingVolumeChangeId: null,
    rdEditingVolumeDraft: "",
    rdBulkMode: false,
    rdBulkSelectedIds: new Set(),
    rdBulkRestoreState: null,
    rdCancelAllDialogOpen: false,
    completenessExpanded: true,
    completenessConfirmationOpen: false,
    completenessHighlightedRequirementId: null,
    completenessStatusOverride: null,
    completenessRequirementExpanded: {
      "required-document": true,
      "special-condition": true
    },
    completenessFilesExpanded: true,
    completenessExpandedFileIds: new Set(),
    completenessSelectedFileId: null,
    completenessFilesInitialized: false,
    completenessView: "overview",
    completenessOverviewScrollTop: 0,
    completenessSearchQuery: "",
    completenessFilterPanelOpen: false,
    completenessOpenFilterGroups: new Set(["status"]),
    completenessAppliedFilters: createEmptyCompletenessFilters(),
    completenessDraftFilters: createEmptyCompletenessFilters(),
    completenessProblemIndex: 0,
    completenessHighlightedFileId: null,
    completenessPipelineExpanded: true,
    completenessLogsExpanded: false,
    completenessFileActionMenuOpen: false,
    completenessRecheckingFileIds: new Set(),
    completenessDataState: "loading",
    highlightedRowId: null,
    highlightedCellKey: null
  }
};

const reviewFilters = [
  { key: "created", label: "Всего создано" },
  { key: "warning", label: "Предупреждения" },
  { key: "transfer-error", label: "Ошибки переноса" }
];

const rdReviewFilters = [
  { key: "all", label: "Все изменения" },
  { key: "warnings", label: "Предупреждения" },
  { key: "resolved", label: "Решенные" }
];

const reviewModes = [
  {
    key: "completeness",
    label: "Комплектность",
    tabId: "reviewModeCompleteness",
    title: "Проверка комплектности",
    kicker: "Комплектность не подтверждена",
    guidance: "Есть обязательные документы или условия, требующие внимания",
    emptyTitle: "Комплектность не подтверждена",
    emptyDescription: "Не выполнено одно или несколько обязательных требований."
  },
  { key: "anr", label: "АНР", tabId: "reviewModeAnr", title: "Проверка позиций" },
  {
    key: "rd-changes",
    label: "Изменения РД",
    tabId: "reviewModeRdChanges",
    title: "Изменения РД: строка 1.1.1",
    kicker: "Предупреждение",
    guidance: "Изменение объема требует решения",
    emptyTitle: "Строка 1.1.1 выбрана",
    emptyDescription: "Кабель-канал мини ПВХ TMC 50x20 мм DKC 00313."
  }
];

const issueTypeLabels = {
  fuzzy_match: "Нечеткое совпадение",
  low_confidence: "Низкая уверенность",
  alternative_selected: "Выбран вариант из альтернатив",
  entity_not_found: "Не найдена сущность",
  missing_data: "Недостаточно данных",
  normalized_value: "Нормализация значения",
  unrecognized_anr_row: "Строка АНР не распознана",
  ai_generated: "Создано ИИ"
};

const rows = buildRowsFromProjectData(projectData);
const issues = cloneData(projectData.issues || []).map(normalizeReviewIssue);
const sourceAnrRows = cloneData(projectData.sourceAnrRows || []);
const matchDecisions = cloneData(projectData.matchDecisions || []);
const referenceCandidates = cloneData(projectData.referenceCandidates || []);
const reviewActions = cloneData(projectData.reviewActions || []);
const comments = cloneData(projectData.comments || []);
const processingLogEvents = cloneData(projectData.processingLogEvents || []);
const rdChanges = cloneData(projectData.checks?.rdChanges?.changes || []);
const completenessCheck = cloneData(projectData.checks?.completeness || {});

function createEmptyCompletenessFilters() {
  return { status: [], semanticType: [], author: [], format: [] };
}

function cloneCompletenessFilters(filters = {}) {
  return {
    status: [...(filters.status || [])],
    semanticType: [...(filters.semanticType || [])],
    author: [...(filters.author || [])],
    format: [...(filters.format || [])]
  };
}

function cloneData(value) {
  return JSON.parse(JSON.stringify(value || []));
}

function normalizeReviewIssue(issue) {
  if (!issue || isUnrecognizedIssue(issue)) return issue;
  if (issue.severity === "error" && issue.rowId) {
    return {
      ...issue,
      severity: "warning"
    };
  }
  return issue;
}

function buildRowsFromProjectData(data) {
  const flatRows = cloneData(data.asorRows || []);
  const byId = new Map(flatRows.map((row) => [row.id, { ...row, children: [] }]));
  const roots = [];

  flatRows.forEach((row) => {
    const current = byId.get(row.id);
    if (row.parentId && byId.has(row.parentId)) {
      byId.get(row.parentId).children.push(current);
    } else {
      roots.push(current);
    }
  });

  function cleanEmptyChildren(items) {
    items.forEach((row) => {
      if (row.children.length) cleanEmptyChildren(row.children);
      else delete row.children;
    });
  }

  cleanEmptyChildren(roots);
  expandRowsByDefault(roots);
  return roots;
}

function expandRowsByDefault(items) {
  items.forEach((row) => {
    if (!row.children) return;
    row.expanded = true;
    expandRowsByDefault(row.children);
  });
}

function getSourceAnrRow(sourceAnrRowId) {
  return sourceAnrRows.find((row) => row.id === sourceAnrRowId) || null;
}

function getMatchDecision(matchDecisionId) {
  return matchDecisions.find((decision) => decision.id === matchDecisionId) || null;
}

function getIssueDecision(issue) {
  return getMatchDecision(issue.matchDecisionId) || matchDecisions.find((decision) => decision.rowId === issue.rowId && decision.fieldKey === issue.cellKey) || null;
}

function getIssueSourceRow(issue) {
  return getSourceAnrRow(issue.sourceAnrRowId) || getSourceAnrRow(findRow(rows, issue.rowId)?.sourceAnrRowId) || null;
}

function getIssueCandidates(issue) {
  const decision = getIssueDecision(issue);
  const baseCandidates = decision?.candidateIds?.length
    ? decision.candidateIds.map((id) => referenceCandidates.find((candidate) => candidate.id === id)).filter(Boolean)
    : [];
  return ensureReferenceCandidateCount(issue, baseCandidates);
}

function ensureReferenceCandidateCount(issue, candidates) {
  const targetCount = 27;
  const result = [...candidates];
  const row = findRow(rows, issue.rowId);
  const baseName = issue.selectedValue || issue.sourceValue || row?.name || "Позиция справочника";
  const entityType = candidates[0]?.entityType || row?.type || "work";
  const prefix = entityType === "material" ? "MAT" : entityType === "group" ? "GRP" : "AOV-W";
  const templates = [
    "Совпали ключевые слова и назначение позиции.",
    "Совпала группа работ, но отличается формулировка.",
    "Совпали материал и контекст соседних строк.",
    "Похожий вариант найден по триграммам.",
    "Совпало назначение, требуется проверка диапазона.",
    "Справочник содержит близкую позицию с уточненным размером."
  ];

  while (result.length < targetCount) {
    const index = result.length + 1;
    const confidence = Math.max(0.34, (issue.confidence || 0.82) - index * 0.012);
    result.push({
      id: `generated-candidate-${issue.id}-${index}`,
      name: `${baseName} - вариант справочника ${index}`,
      code: `${prefix}-${String(index).padStart(3, "0")}`,
      confidence,
      entityType,
      reason: templates[index % templates.length]
    });
  }

  return result.slice(0, targetCount);
}

function flattenRows(items, level = 1, parentVisible = true) {
  const result = [];
  items.forEach((row) => {
    const normalized = { ...row, level, visible: parentVisible };
    if (parentVisible) result.push(normalized);
    const childrenVisible = parentVisible && row.expanded !== false;
    if (row.children) {
      result.push(...flattenRows(row.children, level + 1, childrenVisible));
    }
  });
  return result;
}

function flattenAllRows(items, level = 1) {
  const result = [];
  items.forEach((row) => {
    result.push({ ...row, level, visible: true });
    if (row.children) {
      result.push(...flattenAllRows(row.children, level + 1));
    }
  });
  return result;
}

function renderColumns() {
  const colgroup = document.getElementById("columnWidths");
  colgroup.innerHTML = columns.map((col) => `<col style="width:${col.width}px" />`).join("");
}

function renderFillMarkIcon() {
  return '<span class="fill-mark" title="Заливка колонки" aria-hidden="true">' +
    '<svg viewBox="0 0 24 24" focusable="false">' +
      '<path d="m4.5 12.2 7.7-7.7 7.3 7.3-7.7 7.7Z"></path>' +
      '<path d="M7.1 9.6h9.5"></path>' +
      '<path d="m6.4 5.2 3.1 3.1"></path>' +
    '</svg>' +
  '</span>';
}

function renderTableCommentIcon() {
  return '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">' +
    '<path d="M7.2 6.4h9.6a3.2 3.2 0 0 1 3.2 3.2v4.4a3.2 3.2 0 0 1-3.2 3.2h-5.3l-4.3 3v-3A3.2 3.2 0 0 1 4 14V9.6a3.2 3.2 0 0 1 3.2-3.2Z"></path>' +
    '<path d="M8.7 11.8h6.6"></path>' +
  '</svg>';
}

function renderHeader() {
  const thead = document.getElementById("tableHead");
  thead.innerHTML = headerRows
    .map((row, index) => {
      const cells = row
        .map((cell) => {
          const attrs = [
            cell.rowspan ? `rowspan="${cell.rowspan}"` : "",
            cell.colspan ? `colspan="${cell.colspan}"` : "",
            cell.key ? `data-key="${cell.key}"` : "",
            cell.className ? `class="${cell.className}"` : ""
          ]
            .filter(Boolean)
            .join(" ");
          const sort = cell.sortable ? renderFillMarkIcon() : "";
          if (cell.key === "select") {
            return `<th ${attrs}><input class="select-box" id="selectAll" type="checkbox" aria-label="Выбрать все строки" /></th>`;
          }
          return `<th ${attrs}>${cell.text}${sort}</th>`;
        })
        .join("");
      return `<tr class="head-row-${index + 1}">${cells}</tr>`;
    })
    .join("");

  document.getElementById("selectAll").addEventListener("change", (event) => {
    const visibleRows = flattenRows(rows);
    state.selected.clear();
    if (event.target.checked) {
      visibleRows.forEach((row) => state.selected.add(row.id));
    }
    renderBody();
  });
}

function renderBody() {
  refreshRowReviewStatuses();
  const tbody = document.getElementById("tableBody");
  const visibleRows = flattenRows(rows);
  tbody.innerHTML = visibleRows.map((row) => renderRow(row)).join("");
  bindBodyEvents();
  renderReviewUi();
}

function renderRow(row) {
  const typeClass = `${row.type}-row`;
  const archivedClass = row.archived ? " archived-row" : "";
  const sourceClass = row.sourceType ? ` source-${row.sourceType}` : "";
  const reviewClass = row.reviewStatus ? ` review-${row.reviewStatus}` : "";
  const highlightClass = state.review.highlightedRowId === row.id ? " is-highlighted" : "";
  return `<tr class="${typeClass}${archivedClass}${sourceClass}${reviewClass}${highlightClass}" data-id="${row.id}" style="--level:${row.level}">
    ${columns.map((col) => renderReviewCell(row, col.key)).join("")}
  </tr>`;
}

function renderCell(row, key) {
  const values = row.values || {};
  if (key === "select") {
    return `<td class="select-cell"><input class="select-box row-select" type="checkbox" aria-label="Выбрать строку ${row.number}" ${state.selected.has(row.id) ? "checked" : ""} /></td>`;
  }
  if (key === "expand") {
    const canExpand = row.type !== "material";
    if (!canExpand) return '<td class="expand-cell"><span class="expand-placeholder"></span></td>';
    return `<td class="expand-cell"><button class="expand-button" type="button" aria-label="${row.expanded ? "Свернуть" : "Раскрыть"} ${row.number}" aria-expanded="${row.expanded !== false}">${row.expanded === false ? "+" : "−"}</button></td>`;
  }
  if (key === "number") {
    return `<td class="number-cell">${row.number}</td>`;
  }
  if (key === "rss") {
    return `<td class="rss-cell">${row.source ? `<span class="rss-wrap"><button class="menu-button" type="button" aria-label="Меню ${row.number}">•••</button><a class="rss-link" href="#">ДОП</a></span>` : ""}</td>`;
  }
  if (key === "name") {
    const warning = row.type !== "group" ? '<span class="warn-dot" aria-label="Предупреждение">!</span>' : "";
    return `<td class="name-cell"><span class="name-wrap"><span class="tree-spacer"></span><span class="name-text" title="${escapeAttr(row.name)}">${row.name}</span>${warning}</span></td>`;
  }
  if (key === "unit") {
    return `<td><span class="plain-value">${row.unit || ""}</span></td>`;
  }
  if (key === "add") {
    return '<td class="add-cell"><button class="small-action" type="button" aria-label="Добавить позицию">' + renderAddPositionIcon() + '</button></td>';
  }
  if (key === "materialNo") {
    const isOn = row.enabled === true;
    return `<td class="toggle-cell"><button class="toggle ${isOn ? "is-on" : ""}" type="button" role="switch" aria-checked="${isOn}" aria-label="Номер материала"></button></td>`;
  }
  if (isEditable(key, row)) {
    return `<td><input class="cell-input" value="${escapeAttr(displayValue(values[key]))}" aria-label="${key} ${row.number}" /></td>`;
  }
  if (key === "noteTd" || key === "noteRcc") {
    const text = noteDisplay(values[key], "Нет примечаний");
    return `<td class="note-cell"><span class="commented"><span class="note-text ${isMuted(text) ? "muted" : ""}" title="${escapeAttr(text)}">${text}</span><button class="comment-icon" type="button" aria-label="Комментарий">${renderTableCommentIcon()}</button></span></td>`;
  }
  if (key === "basis" || key === "remark") {
    const fallback = key === "basis" ? "Нет обоснований" : "Нет замечаний";
    const text = noteDisplay(values[key], fallback);
    return `<td><span class="commented"><span class="plain-value ${isMuted(text) ? "muted" : ""}" title="${escapeAttr(text)}">${text}</span><button class="comment-icon" type="button" aria-label="Комментарий">${renderTableCommentIcon()}</button></span></td>`;
  }
  return `<td><span class="plain-value ${isMuted(values[key]) ? "muted" : ""}" title="${escapeAttr(displayValue(values[key]))}">${displayValue(values[key])}</span></td>`;
}

function renderReviewCell(row, key) {
  const values = row.values || {};
  const cellIssues = getCellIssues(row.id, key);
  const markers = "";
  const issueToneClass = getIssueToneClass(cellIssues);
  const issueClass = cellIssues.length ? ` has-issue ${issueToneClass}` : "";
  const highlightClass = isHighlightedCell(row, key) ? " is-cell-highlighted" : "";

  if (key === "name") {
    return `<td class="name-cell${issueClass}${highlightClass}" data-cell="${key}"><span class="name-wrap"><span class="tree-spacer"></span><span class="name-text" title="${escapeAttr(row.name)}">${escapeAttr(row.name)}</span></span></td>`;
  }

  if (!markers && !highlightClass && !cellIssues.length) {
    return renderCell(row, key);
  }

  if (isEditable(key, row)) {
    return `<td class="${issueClass}${highlightClass}" data-cell="${key}"><span class="input-wrap"><input class="cell-input" value="${escapeAttr(displayValue(values[key]))}" aria-label="${key} ${row.number}" />${markers}</span></td>`;
  }

  if (key === "noteTd" || key === "noteRcc") {
    const text = noteDisplay(values[key], "Нет примечаний");
    return `<td class="note-cell${issueClass}${highlightClass}" data-cell="${key}"><span class="commented"><span class="note-text ${isMuted(text) ? "muted" : ""}" title="${escapeAttr(text)}">${text}</span>${markers}<button class="comment-icon" type="button" aria-label="Комментарий">${renderTableCommentIcon()}</button></span></td>`;
  }

  if (key === "basis" || key === "remark") {
    const fallback = key === "basis" ? "Нет обоснований" : "Нет замечаний";
    const text = noteDisplay(values[key], fallback);
    return `<td class="${issueClass}${highlightClass}" data-cell="${key}"><span class="commented"><span class="plain-value ${isMuted(text) ? "muted" : ""}" title="${escapeAttr(text)}">${text}</span>${markers}<button class="comment-icon" type="button" aria-label="Комментарий">${renderTableCommentIcon()}</button></span></td>`;
  }

  return `<td class="${issueClass}${highlightClass}" data-cell="${key}"><span class="value-with-marker"><span class="plain-value ${isMuted(values[key]) ? "muted" : ""}" title="${escapeAttr(displayValue(values[key]))}">${displayValue(values[key])}</span>${markers}</span></td>`;
}

function isEditable(key, row) {
  if (row.type === "group") return false;
  if (["norm", "qtyTd", "vat"].includes(key)) return true;
  if (row.type === "material" && ["unitMatContractor", "unitMatManual", "unitSmrContractor", "unitSmrManual"].includes(key)) {
    return true;
  }
  if (row.type === "work" && ["unitMatContractor", "unitMatManual", "unitSmrContractor", "unitSmrManual"].includes(key)) {
    return true;
  }
  return false;
}

function isMuted(value) {
  return typeof value === "string" && value.startsWith("Нет ");
}

function displayValue(value) {
  return value === "" || value === null || value === undefined ? "0,00" : value;
}

function noteDisplay(value, fallback) {
  return value === "" || value === null || value === undefined ? fallback : value;
}

function escapeAttr(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderAccordionArrowIcon(expanded) {
  return '<svg class="accordion-arrow-icon' + (expanded ? ' is-open' : '') + '" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="m7 10 5 5 5-5"></path></svg>';
}

function renderPositionNavIcon(direction) {
  return '<svg class="accordion-arrow-icon nav-arrow-icon ' + direction + '" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="m7 10 5 5 5-5"></path></svg>';
}

function renderReasoningTriggerIcon() {
  return '<svg class="reasoning-trigger-svg" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="m7 6 5 6-5 6"></path><path d="M14 18h5"></path></svg>';
}

function renderAddPositionIcon() {
  return '<svg class="add-position-svg" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>';
}

function renderInfoCardIcon(type) {
  if (type === "action") {
    return '<svg class="info-card-svg" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>';
  }
  return '<svg class="info-card-svg" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5A5 5 0 1 0 7.5 11.5C8.3 12.3 8.8 13 9 14"></path><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M10 14h4"></path></svg>';
}

function getReasonCardText() {
  return "Система сопоставила исходную формулировку АНР с выбранной позицией АСОР по нескольким признакам: совпали ключевые слова, назначение работы, диапазон ширины, единица измерения и контекст соседней группы. Дополнительно ИИ проверил похожие позиции в предыдущем АСОР, сравнил справочные варианты и выбрал значение с наибольшей уверенностью. Предупреждение появилось потому, что совпадение не является точным: в исходной строке есть расхождение по формулировке или диапазону, поэтому сметчику нужно подтвердить соответствие проектной спецификации. Если в проекте используется другой типоразмер, группа работ или материал, текущий вариант следует заменить через справочник. После проверки выбранное значение можно подтвердить, отправить на ручной разбор или отметить решенным.";
}

function getActionCardText() {
  return "Проверьте выбранное значение сравните его с АНР при необходимости выберите корректный вариант из справочника и подтвердите.";
}

function renderCommentIcon(type) {
  const icons = {
    message: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"></path></svg>',
    edit: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>',
    delete: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path></svg>',
    send: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>'
  };
  return icons[type] || icons.message;
}

function getIssueCommentItems(issue) {
  const storedComments = comments
    .filter((comment) => comment.issueId === issue.id)
    .map((comment) => ({
      id: comment.id,
      body: comment.body,
      author: comment.author || "Шпак Александр Константинович",
      role: comment.role || "Вед. сметчик",
      createdAt: comment.createdAt || new Date().toISOString(),
      source: "stored"
    }));
  const storedBodies = new Set(storedComments.map((comment) => comment.body));
  const inlineComments = (issue.comments || [])
    .filter((body) => !storedBodies.has(body))
    .map((body, index) => ({
      id: `inline-${issue.id}-${index + 1}`,
      body,
      author: "Шпак Александр Константинович",
      role: "Вед. сметчик",
      createdAt: "2026-06-23T11:15:00+03:00",
      source: "inline",
      inlineIndex: index
    }));
  const result = [...storedComments, ...inlineComments];
  if (result.length) return result;
  return [];
}

function formatCommentDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "23.06.2026, 11:15";
  return date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getCommentInitials(author) {
  const parts = String(author || "С").trim().split(/\s+/).filter(Boolean);
  const letters = parts.length > 1 ? parts.slice(0, 2).map((part) => part[0]) : [parts[0]?.slice(0, 2) || "С"];
  return letters.join("").toUpperCase();
}

function getCommentAuthorName(author) {
  const value = String(author || "").trim();
  if (!value || value === "Сметчик" || value.length < 12 || value.includes("Шпак А")) {
    return "Шпак Александр Константинович";
  }
  return value;
}

function getCommentRole(role) {
  return String(role || "").trim() || "Вед. сметчик";
}

function renderCommentsAccordion(commentContext, options = {}) {
  const items = getIssueCommentItems(commentContext);
  const isRdMode = options.mode === "rd";
  const isExpanded = isRdMode ? state.review.rdCommentsExpanded : state.review.commentsExpanded;
  const editingCommentId = isRdMode ? state.review.rdEditingCommentId : state.review.editingCommentId;
  const idPrefix = options.idPrefix ? `${options.idPrefix}-` : "";
  const toggleId = `${idPrefix}commentsAccordionToggle`;
  const panelId = `${idPrefix}commentsAccordionPanel`;
  const timelineId = `${idPrefix}commentsTimeline`;
  const inputId = `${idPrefix}issueCommentInput`;
  const emptyDescription = options.emptyDescription || "Оставьте заметку для коллег или зафиксируйте важное решение по проверке этой позиции.";
  const inputPlaceholder = options.inputPlaceholder || "Напишите комментарий к позиции...";
  const messageMarkup = items.length
    ? items.map((item) => renderCommentMessage(item, editingCommentId)).join("")
    : '<div class="comments-empty"><span class="comments-empty-visual" aria-hidden="true">' + renderCommentIcon("message") + '</span><strong>Комментариев пока нет</strong><p>' + escapeAttr(emptyDescription) + '</p></div>';
  return '<section class="comments-accordion ' + (isExpanded ? 'expanded' : 'collapsed') + '">' +
    '<button class="comments-accordion-head" id="' + toggleId + '" type="button" data-comments-toggle aria-expanded="' + String(isExpanded) + '" aria-controls="' + panelId + '">' +
      '<span class="comments-head-title"><span class="comments-head-icon" aria-hidden="true">' + renderCommentIcon("message") + '</span><span>Комментарии</span><b>' + items.length + '</b></span>' +
      '<span class="comments-accordion-icon" aria-hidden="true">' + renderAccordionArrowIcon(isExpanded) + '</span>' +
    '</button>' +
    '<div class="comments-accordion-panel" id="' + panelId + '">' +
      '<div class="comments-timeline" id="' + timelineId + '">' + messageMarkup + '</div>' +
      '<div class="comments-compose">' +
        '<input id="' + inputId + '" type="text" data-comment-input placeholder="' + escapeAttr(inputPlaceholder) + '" autocomplete="off">' +
        '<button class="comments-send" type="button" data-review-action="comment" aria-label="Отправить комментарий">' + renderCommentIcon("send") + '</button>' +
      '</div>' +
    '</div>' +
  '</section>';
}

function renderCommentMessage(comment, editingCommentId = state.review.editingCommentId) {
  const isEditing = editingCommentId === comment.id;
  const authorName = getCommentAuthorName(comment.author);
  const role = getCommentRole(comment.role);
  return '<article class="comment-message" data-comment-id="' + escapeAttr(comment.id) + '">' +
    '<div class="comment-avatar" aria-hidden="true">' + escapeAttr(getCommentInitials(authorName)) + '</div>' +
    '<div class="comment-content">' +
      '<div class="comment-meta"><span class="comment-person"><strong>' + escapeAttr(authorName) + '</strong><span class="comment-role">' + escapeAttr(role) + '</span></span><time>' + escapeAttr(formatCommentDate(comment.createdAt)) + '</time></div>' +
      '<div class="comment-bubble">' +
        (isEditing
          ? '<div class="comment-edit-form"><textarea id="commentEditInput" rows="3">' + escapeAttr(comment.body) + '</textarea><div><button type="button" data-comment-action="save">Сохранить</button><button type="button" data-comment-action="cancel">Отмена</button></div></div>'
          : '<p>' + escapeAttr(comment.body) + '</p>') +
        (!isEditing
          ? '<div class="comment-actions"><button type="button" data-comment-action="edit" aria-label="Редактировать комментарий">' + renderCommentIcon("edit") + '</button><button type="button" data-comment-action="delete" aria-label="Удалить комментарий">' + renderCommentIcon("delete") + '</button></div>'
          : '') +
      '</div>' +
    '</div>' +
  '</article>';
}

function resetReviewAccordions(options = {}) {
  if (options.includePositions) state.review.positionsExpanded = false;
  state.review.matchExpanded = false;
  state.review.resultExpanded = false;
  state.review.aiLogicOpen = false;
  state.review.commentsExpanded = true;
  state.review.reasonExpanded = false;
  state.review.editingCommentId = null;
}

function renderAiStatusIcon(icon) {
  const icons = {
    ai: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"></path><path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z"></path></svg>',
    warning: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="m12 4 9 16H3L12 4Z"></path><path d="M12 9v5"></path><path d="M12 17h.01"></path></svg>',
    error: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"></path><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>',
    reviewed: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>',
    manual: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"></path><path d="M9 15h6"></path><path d="M9 11h3"></path></svg>',
    edit: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>',
    reset: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M9 14 4 9l5-5"></path><path d="M4 9h10a6 6 0 1 1 0 12h-3"></path></svg>',
    book: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 7v14"></path><path d="M3 5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v16a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z"></path><path d="M21 5a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2v16a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2Z"></path></svg>'
  };
  return icons[icon] || icons.ai;
}

function renderReviewPlaceholder(kind) {
  const isComplete = kind === "complete";
  const title = isComplete ? "Все позиции проверены" : "Выберите позицию";
  const description = isComplete
    ? "Активные предупреждения и ошибки обработаны. Можно закрыть дровер или перейти к списку всех позиций."
    : "Выберите предупреждение, ошибку или позицию ИИ в списке выше, чтобы открыть сопоставление и детали проверки.";
  return '<div class="review-detail-placeholder ' + (isComplete ? 'complete' : 'select') + '">' +
    '<span class="review-placeholder-visual" aria-hidden="true">' + renderReviewPlaceholderIcon(isComplete ? "complete" : "select") + '</span>' +
    '<h3>' + title + '</h3>' +
    '<p>' + description + '</p>' +
  '</div>';
}

function renderReviewPlaceholderIcon(kind) {
  if (kind === "complete") {
    return '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>';
  }
  return '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M4 6h12"></path><path d="M4 11h10"></path><path d="M4 16h8"></path><path d="m16 15 4 4"></path><path d="m20 15-4 4"></path></svg>';
}

function getCellIssues(rowId, key) {
  return issues.filter((issue) => issue.rowId === rowId && issue.cellKey === key && isIssueActiveInTable(issue));
}

function getIssueToneClass(cellIssues) {
  if (cellIssues.some((issue) => issue.severity === "error")) return "issue-error";
  if (cellIssues.some((issue) => issue.severity === "warning")) return "issue-warning";
  return "issue-neutral";
}

function isIssueActiveInTable(issue) {
  return !["confirmed", "resolved", "sent-to-manual", "changed"].includes(issue.status);
}

function isHighlightedCell(row, key) {
  return state.review.highlightedRowId === row.id && state.review.highlightedCellKey === key;
}

function renderReviewUi() {
  renderReviewButton();
  renderReviewDrawer();
}

function renderReviewButton() {
  const buttonText = document.getElementById("reviewButtonText");
  const button = document.getElementById("openReviewDrawer");
  if (!buttonText) return;
  buttonText.textContent = "Проверка";
  button?.setAttribute("aria-label", "Открыть проверку документа");
}

function renderReviewDrawer() {
  const drawer = document.getElementById("reviewDrawer");
  if (!drawer) return;
  const isAnrMode = state.review.activeMode === "anr";
  const isRdChangesMode = state.review.activeMode === "rd-changes";
  const isCompletenessMode = state.review.activeMode === "completeness";
  if (isAnrMode) {
    if (!reviewFilters.some((filter) => filter.key === state.review.activeFilter)) {
      state.review.activeFilter = "transfer-error";
    }
    const filteredIssues = getFilteredIssues();
    if (state.review.drawerOpen && !state.review.selectedIssueId) {
      state.review.selectedIssueId = getDefaultReviewIssueId();
    }
    if (state.review.drawerOpen && state.review.selectedIssueId && !filteredIssues.some((issue) => issue.id === state.review.selectedIssueId)) {
      state.review.selectedIssueId = filteredIssues[0]?.id || null;
    }
  }
  if (isRdChangesMode) ensureRdReviewSelection();
  drawer.setAttribute("aria-hidden", String(!state.review.drawerOpen));
  drawer.dataset.reviewMode = state.review.activeMode;
  document.body.classList.toggle("ai-drawer-open", state.review.drawerOpen);
  document.body.classList.toggle("review-completeness-open", state.review.drawerOpen && isCompletenessMode);
  renderReviewHeader();
  renderReviewModeContent();
  if (isAnrMode) {
    renderPositionAccordion();
    renderReviewFilters();
    renderReviewList();
    renderReviewDetail();
  }
  if (isRdChangesMode) renderRdChangesMode();
  if (isCompletenessMode) renderCompletenessMode();
  renderRdCancelAllDialog();
  window.updateAIDrawerContext?.();
}

function getReviewMode(modeKey = state.review.activeMode) {
  return reviewModes.find((mode) => mode.key === modeKey) || reviewModes.find((mode) => mode.key === "anr");
}

function getReviewModeTabStatus(modeKey) {
  if (modeKey === "completeness") {
    const completeness = getCompletenessViewModel();
    const attentionCount = getCompletenessProblemFiles().length;
    if (completeness.status === "confirmed") return { tone: "success", label: "Комплектность подтверждена", attentionCount: 0 };
    if (completeness.status === "processing") return { tone: "processing", label: "Проверка выполняется", attentionCount };
    return { tone: "error", label: "Комплектность не подтверждена", attentionCount };
  }
  if (modeKey === "rd-changes") {
    const counts = getRdReviewCounts();
    if (counts.warnings) return { tone: "warning", label: `Требуют решения: ${counts.warnings}`, attentionCount: counts.warnings };
    return { tone: "success", label: "Нет изменений, требующих решения", attentionCount: 0 };
  }
  const activeItems = getReviewItems().filter(isIssueActiveInTable);
  const errorCount = activeItems.filter((issue) => issue.severity === "error").length;
  const warningCount = activeItems.filter((issue) => issue.severity === "warning").length;
  const attentionCount = errorCount + warningCount;
  if (errorCount) return { tone: "error", label: `Требуют исправления: ${errorCount}`, attentionCount };
  if (warningCount) return { tone: "warning", label: `Требуют проверки: ${warningCount}`, attentionCount };
  return { tone: "success", label: "Активных ошибок и предупреждений нет", attentionCount: 0 };
}

function renderReviewModeTabs() {
  const panel = document.getElementById("reviewModeContent");
  const activeMode = getReviewMode();
  document.querySelectorAll("[data-review-mode]").forEach((tab) => {
    const selected = tab.dataset.reviewMode === activeMode.key;
    const mode = getReviewMode(tab.dataset.reviewMode);
    const status = getReviewModeTabStatus(mode.key);
    const attentionCount = tab.querySelector(".review-mode-attention-count");
    const attentionLabel = status.attentionCount ? `Позиции, требующие внимания: ${status.attentionCount}` : "";
    tab.classList.toggle("active", selected);
    tab.classList.toggle("has-attention", Boolean(status.attentionCount));
    tab.setAttribute("aria-selected", String(selected));
    tab.setAttribute("aria-label", `${mode.label}: ${status.label}${attentionLabel ? `. ${attentionLabel}` : ""}`);
    tab.removeAttribute("title");
    delete tab.dataset.tooltip;
    tab.tabIndex = selected ? 0 : -1;
    if (attentionCount) {
      attentionCount.dataset.tone = status.tone;
      attentionCount.hidden = !status.attentionCount;
      attentionCount.textContent = status.attentionCount ? String(status.attentionCount) : "";
      attentionCount.removeAttribute("title");
      if (attentionLabel) {
        attentionCount.dataset.tooltip = attentionLabel;
        attentionCount.setAttribute("aria-label", attentionLabel);
      } else {
        delete attentionCount.dataset.tooltip;
        attentionCount.removeAttribute("aria-label");
      }
    }
  });
  panel?.setAttribute("aria-labelledby", activeMode.tabId);
}

function renderReviewModeContent() {
  const anrContent = document.getElementById("reviewAnrContent");
  const rdContent = document.getElementById("reviewRdContent");
  const completenessContent = document.getElementById("reviewCompletenessContent");
  const placeholder = document.getElementById("reviewModePlaceholder");
  if (!anrContent || !rdContent || !completenessContent || !placeholder) return;
  const activeMode = getReviewMode();
  const isAnrMode = activeMode.key === "anr";
  const isRdChangesMode = activeMode.key === "rd-changes";
  const isCompletenessMode = activeMode.key === "completeness";
  anrContent.hidden = !isAnrMode;
  rdContent.hidden = !isRdChangesMode;
  completenessContent.hidden = !isCompletenessMode;
  placeholder.hidden = isAnrMode || isRdChangesMode || isCompletenessMode;
  if (isAnrMode || isRdChangesMode || isCompletenessMode) {
    placeholder.innerHTML = "";
    return;
  }
  placeholder.innerHTML = '<div class="review-detail-placeholder select review-mode-empty">' +
    '<span class="review-placeholder-visual" aria-hidden="true">' + renderReviewPlaceholderIcon("select") + '</span>' +
    '<h3>' + activeMode.emptyTitle + '</h3>' +
    '<p>' + activeMode.emptyDescription + '</p>' +
  '</div>';
}

function getCompletenessFirstProblem() {
  return (completenessCheck.requirements || []).find((item) => item.status !== "completed") || null;
}

function normalizeCompletenessModuleTree(items = []) {
  return (Array.isArray(items) ? items : []).map((file) => ({
    ...file,
    children: normalizeCompletenessModuleTree(file.children || [])
  }));
}

function applyCompletenessModuleRequirementLinks() {
  const linkedFiles = {
    "cmp-required-quantities": "node_4",
    "cmp-required-rd": "node_2_1_1_1",
    "cmp-required-source-archive": "node_2",
    "cmp-special-approval": "node_5"
  };
  (completenessCheck.requirements || []).forEach((requirement) => {
    if (linkedFiles[requirement.id] && getCompletenessFile(linkedFiles[requirement.id])) {
      requirement.linkedFileId = linkedFiles[requirement.id];
    } else if (requirement.linkedFileId && !getCompletenessFile(requirement.linkedFileId)) {
      delete requirement.linkedFileId;
    }
  });
}

async function loadCompletenessModuleData() {
  try {
    let sourceFiles = window.AI_COMPLETENESS_TREE_DATA;
    if (!Array.isArray(sourceFiles) || !sourceFiles.length) {
      const response = await fetch("./ai-completeness-module/src/components/FileTree/mockTreeData.json", { cache: "no-store" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      sourceFiles = await response.json();
    }
    if (!Array.isArray(sourceFiles) || !sourceFiles.length) throw new Error("Пустая структура вложений");
    completenessCheck.files = normalizeCompletenessModuleTree(JSON.parse(JSON.stringify(sourceFiles)));
    state.review.completenessDataState = "ready";
    state.review.completenessFilesInitialized = false;
    state.review.completenessExpandedFileIds = new Set();
    state.review.completenessSelectedFileId = null;
    state.review.completenessView = "overview";
    applyCompletenessModuleRequirementLinks();
  } catch (error) {
    state.review.completenessDataState = "error";
    console.warn("Не удалось загрузить данные модуля комплектности:", error);
  }
  renderReviewUi();
}

function getCompletenessFlatFiles(items = completenessCheck.files || [], ancestors = [], depth = 0) {
  return items.flatMap((file) => [
    { file, ancestors, depth },
    ...getCompletenessFlatFiles(file.children || [], [...ancestors, file.id], depth + 1)
  ]);
}

function getCompletenessFile(fileId) {
  return getCompletenessFlatFiles().find((entry) => entry.file.id === fileId)?.file || null;
}

function getCompletenessFileAncestors(fileId) {
  return getCompletenessFlatFiles().find((entry) => entry.file.id === fileId)?.ancestors || [];
}

function ensureCompletenessFileState() {
  const files = completenessCheck.files || [];
  if (!files.length) {
    state.review.completenessSelectedFileId = null;
    return;
  }
  if (!state.review.completenessFilesInitialized) {
    getCompletenessFlatFiles(files).forEach(({ file }) => {
      if ((file.children || []).length) state.review.completenessExpandedFileIds.add(file.id);
    });
    state.review.completenessFilesInitialized = true;
  }
  if (state.review.completenessSelectedFileId && !getCompletenessFile(state.review.completenessSelectedFileId)) {
    state.review.completenessSelectedFileId = null;
    state.review.completenessView = "overview";
  }
}

function getCompletenessRawStatus(file) {
  if (!file) return "gray";
  if (state.review.completenessRecheckingFileIds.has(file.id)) return "loading";
  const explicitStatus = file.filter_metadata?.status?.overall;
  if (explicitStatus) return explicitStatus;
  const legacyStatuses = { ready: "green", processing: "loading", error: "red" };
  if (legacyStatuses[file.status]) return legacyStatuses[file.status];
  const pipelineStatuses = Object.values(file.pipeline_status || {});
  if (pipelineStatuses.includes("red")) return "red";
  if (pipelineStatuses.includes("loading")) return "loading";
  if (pipelineStatuses.includes("yellow")) return "yellow";
  if (pipelineStatuses.includes("gray")) return "gray";
  return pipelineStatuses.length ? "green" : "gray";
}

function getCompletenessFileStatus(file) {
  const statuses = {
    green: { label: "Выполнено", tone: "ready", icon: "confirmed" },
    loading: { label: "В обработке", tone: "processing", icon: "processing" },
    yellow: { label: "Требует проверки", tone: "warning", icon: "warnings" },
    red: { label: "Не выполнено", tone: "error", icon: "errors" },
    gray: { label: "Ожидает", tone: "pending", icon: "duration" }
  };
  return statuses[getCompletenessRawStatus(file)] || statuses.gray;
}

function getCompletenessFileKind(file) {
  const extension = String(file?.filter_metadata?.technical_format?.extension || file?.type || "file").toLowerCase();
  const category = file?.filter_metadata?.technical_format?.category;
  const hasChildren = Boolean((file?.children || []).length);
  if (category === "mail" || extension === "msg") return { label: "Электронное письмо", icon: "parentFile", extension };
  if (category === "archive" || ["zip", "rar", "7z"].includes(extension)) return { label: "Архив", icon: "archiveFile", extension };
  if (hasChildren) return { label: "Контейнер вложений", icon: "parentFile", extension };
  return { label: "Документ", icon: "extractedFile", extension };
}

function formatCompletenessFileSize(bytes) {
  const size = Number(bytes);
  if (!Number.isFinite(size) || size <= 0) return "Размер не указан";
  if (size < 1024) return size + " Б";
  if (size < 1024 * 1024) return Math.round(size / 1024) + " КБ";
  return (size / (1024 * 1024)).toFixed(size >= 10 * 1024 * 1024 ? 0 : 1).replace(".", ",") + " МБ";
}

function getCompletenessRequirementStats(files = getCompletenessFlatFiles().map(({ file }) => file)) {
  const uniqueRequirements = new Map();
  files.forEach((file) => {
    const details = file.metadata_details || {};
    [...(details.compliance || []), ...(details.crossLinks || [])].forEach((item) => {
      if (!item?.text) return;
      const key = item.text.toLowerCase();
      const current = uniqueRequirements.get(key);
      if (!current) {
        uniqueRequirements.set(key, { text: item.text, status: item.status || "gray" });
        return;
      }
      if (current.status !== "red" && item.status === "red") current.status = "red";
      else if (current.status === "green" && item.status === "yellow") current.status = "yellow";
    });
  });
  const items = [...uniqueRequirements.values()];
  return {
    total: items.length,
    closed: items.filter((item) => item.status === "green").length,
    missing: items.filter((item) => item.status === "red").length
  };
}

function getCompletenessTreeStats() {
  const files = getCompletenessFlatFiles().map(({ file }) => file);
  const total = files.length;
  const warnings = files.filter((file) => {
    const filterStatus = file.filter_metadata?.status;
    return filterStatus ? filterStatus.has_warning && !filterStatus.has_error : getCompletenessRawStatus(file) === "yellow";
  }).length;
  const errors = files.filter((file) => file.filter_metadata?.status?.has_error || getCompletenessRawStatus(file) === "red").length;
  const processing = files.filter((file) => {
    const statuses = Object.values(file.pipeline_status || {});
    return statuses.includes("loading") || statuses.includes("gray");
  }).length;
  const completenessOk = files.filter((file) => file.pipeline_status?.check === "green").length;
  return {
    total,
    warnings,
    errors,
    processing,
    completenessPct: total ? Math.round((completenessOk / total) * 100) : 0,
    requirements: getCompletenessRequirementStats(files)
  };
}

function getCompletenessStatusKey(stats = getCompletenessTreeStats()) {
  if (state.review.completenessStatusOverride === "processing") return "processing";
  const requirementsComplete = (completenessCheck.requirements || []).every((item) => item.status === "completed");
  if (stats.errors || stats.warnings || stats.requirements.missing || !requirementsComplete) return "incomplete";
  if (stats.processing) return "processing";
  return "confirmed";
}

function getCompletenessViewModel() {
  const stats = getCompletenessTreeStats();
  const status = getCompletenessStatusKey(stats);
  const states = {
    confirmed: {
      label: "Комплектность подтверждена",
      description: "Все обязательные требования закрыты найденными документами.",
      guidance: "Все обязательные требования комплектности выполнены",
      tone: "confirmed",
      kickerClass: "applied"
    },
    incomplete: {
      label: "Комплектность не подтверждена",
      description: "Обнаружены критические ошибки или отсутствуют обязательные документы. Дальнейшая обработка невозможна без вмешательства.",
      guidance: "Есть обязательные документы или условия, требующие внимания",
      tone: "incomplete",
      kickerClass: "error"
    },
    processing: {
      label: "Проверка комплектности выполняется",
      description: "Документы проходят распаковку, чтение и проверку комплектности.",
      guidance: "Выполняется повторная проверка комплектности",
      tone: "processing",
      kickerClass: "processing"
    }
  };
  return {
    status,
    stats,
    firstProblem: status === "processing" ? null : getCompletenessFirstProblem(),
    ...states[status]
  };
}

function renderCompletenessIcon(kind) {
  const icons = {
    confirmed: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="m8 12 2.6 2.6L16.5 9"></path></svg>',
    incomplete: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="m12 4 9 16H3L12 4Z"></path><path d="M12 9v5"></path><path d="M12 17h.01"></path></svg>',
    processing: '<svg class="is-spinning" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.34-5.66"></path><path d="M20 4v6h-6"></path></svg>',
    documents: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M14 3v5h5"></path><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"></path><path d="M9 13h6"></path><path d="M9 17h6"></path></svg>',
    warnings: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="m12 4 9 16H3L12 4Z"></path><path d="M12 9v5"></path><path d="M12 17h.01"></path></svg>',
    errors: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="m9 9 6 6"></path><path d="m15 9-6 6"></path></svg>',
    firstProblem: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><circle cx="12" cy="12" r="2"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M2 12h2"></path><path d="M20 12h2"></path></svg>',
    recheck: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.34-5.66"></path><path d="M20 4v6h-6"></path></svg>',
    duration: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg>',
    requiredDocuments: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M14 3v5h5"></path><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"></path><path d="M9 13h6"></path><path d="M9 17h4"></path></svg>',
    specialConditions: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 3 5 6v5c0 4.6 2.8 8 7 10 4.2-2 7-5.4 7-10V6l-7-3Z"></path><path d="m9 12 2 2 4-4"></path></svg>',
    parentFile: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M14 3v5h5"></path><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"></path></svg>',
    archiveFile: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M4 7h16v13H4Z"></path><path d="M3 3h18v4H3Z"></path><path d="M10 11h4"></path></svg>',
    extractedFile: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M14 3v5h5"></path><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"></path><path d="m9 15 2 2 4-4"></path></svg>',
    download: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path></svg>',
    comment: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"></path></svg>',
    back: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="m15 18-6-6 6-6"></path><path d="M9 12h10"></path></svg>',
    more: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle></svg>',
    search: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m16 16 4 4"></path></svg>',
    filter: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M4 5h16l-6 7v5l-4 2v-7Z"></path></svg>',
    link: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.2 1.2"></path><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.2-1.2"></path></svg>',
    classification: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M4 5h16v14H4Z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path></svg>',
    logs: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M5 4h14v16H5Z"></path><path d="M8 8h8"></path><path d="M8 12h8"></path><path d="M8 16h5"></path></svg>'
  };
  return icons[kind] || icons.documents;
}

function getCompletenessRequirementStatus(requirement) {
  const statusKey = state.review.completenessStatusOverride === "processing" ? "processing" : requirement.status;
  const statuses = {
    completed: { label: "Выполнено", tone: "completed", icon: "confirmed" },
    "not-completed": { label: "Не выполнено", tone: "not-completed", icon: "incomplete" },
    processing: { label: "В обработке", tone: "processing", icon: "processing" },
    error: { label: "Ошибка", tone: "error", icon: "errors" }
  };
  return statuses[statusKey] || statuses.error;
}

function getCompletenessRequirementGroups() {
  const requirements = completenessCheck.requirements || [];
  return [
    { kind: "required-document", title: "Требуемые входящие документы", icon: "requiredDocuments" },
    { kind: "special-condition", title: "Особые условия комплектности", icon: "specialConditions" }
  ].map((group) => ({
    ...group,
    items: requirements.filter((item) => item.kind === group.kind)
  })).filter((group) => group.items.length > 0);
}

function renderCompletenessRequirement(requirement) {
  const status = getCompletenessRequirementStatus(requirement);
  const highlighted = state.review.completenessHighlightedRequirementId === requirement.id;
  const linkedFile = requirement.linkedFileId ? getCompletenessFile(requirement.linkedFileId) : null;
  const sourceTone = status.tone === "completed" ? "green" : status.tone === "processing" ? "blue" : "red";
  return '<div class="completeness-requirement-row cross-link-item tone-' + sourceTone + ' ' + status.tone + (highlighted ? ' highlighted' : '') + '" id="completenessRequirement-' + escapeAttr(requirement.id) + '" tabindex="-1">' +
    '<span class="completeness-requirement-icon cross-link-icon" aria-hidden="true">' + renderCompletenessIcon(status.icon) + '</span>' +
    '<span class="completeness-requirement-copy cross-link-content">' +
      '<strong>' + escapeAttr(requirement.title) + '</strong>' +
      '<span>' + escapeAttr(requirement.result) + '</span>' +
      (linkedFile ? '<button class="completeness-requirement-file-link" type="button" data-completeness-action="open-file" data-file-id="' + escapeAttr(linkedFile.id) + '"><span aria-hidden="true">' + renderCompletenessIcon(getCompletenessFileKind(linkedFile).icon) + '</span>' + escapeAttr(linkedFile.name) + '</button>' : '') +
    '</span>' +
    '<span class="completeness-requirement-status cross-link-badge badge-' + sourceTone + ' ' + status.tone + '"><span class="cross-link-badge-dot" aria-hidden="true"></span>' + status.label + '</span>' +
  '</div>';
}

function renderCompletenessRequirements() {
  const groups = getCompletenessRequirementGroups();
  if (!groups.length) return "";
  return groups.map((group) => {
    const expanded = state.review.completenessRequirementExpanded[group.kind] !== false;
    const panelId = "completenessGroupPanel-" + group.kind;
    return '<section class="completeness-requirement-block metadata-card ' + (expanded ? 'expanded' : 'collapsed') + '" aria-labelledby="completenessGroup-' + group.kind + '">' +
      '<button class="completeness-requirement-group-head classification-section-head" id="completenessGroupToggle-' + group.kind + '" type="button" data-completeness-action="toggle-requirement-group" data-requirement-kind="' + group.kind + '" aria-expanded="' + String(expanded) + '" aria-controls="' + panelId + '">' +
        '<span class="completeness-requirement-group-title"><h3 id="completenessGroup-' + group.kind + '">' + group.title + '</h3></span>' +
        '<span class="completeness-requirement-group-actions"><b title="Количество элементов">' + group.items.length + '</b><span class="position-accordion-icon" aria-hidden="true">' + renderAccordionArrowIcon(expanded) + '</span></span>' +
      '</button>' +
      '<div class="completeness-requirement-list cross-links-list" id="' + panelId + '"' + (expanded ? '' : ' hidden') + '>' + group.items.map(renderCompletenessRequirement).join("") + '</div>' +
    '</section>';
  }).join("");
}

function renderCompletenessMetric(tone, label, value, note, progress = null) {
  const tooltip = escapeAttr(note);
  const accessibleValue = escapeAttr(label + ": " + value + ". " + note);
  return '<article class="completeness-dashboard-metric rve-summary-card rve-summary-' + tone + ' ' + tone + '">' +
    '<span class="completeness-dashboard-label rve-summary-label">' + label + '</span>' +
    '<strong class="rve-summary-value" title="' + tooltip + '" aria-label="' + accessibleValue + '">' + value + '</strong>' +
    (progress === null ? '' : '<span class="completeness-dashboard-progress rve-summary-progress" aria-hidden="true"><span style="width:' + progress + '%"></span></span>') +
  '</article>';
}

function renderCompletenessConfirmation() {
  if (!state.review.completenessConfirmationOpen) return "";
  return '<div class="completeness-confirmation" id="completenessConfirmation" role="alertdialog" aria-labelledby="completenessConfirmationTitle" aria-describedby="completenessConfirmationDescription" tabindex="-1">' +
    '<span class="completeness-confirmation-icon" aria-hidden="true">' + renderCompletenessIcon("duration") + '</span>' +
    '<div class="completeness-confirmation-copy">' +
      '<strong id="completenessConfirmationTitle">Повторная проверка может занять несколько минут</strong>' +
      '<span id="completenessConfirmationDescription">До завершения обработки итог будет показан в состоянии «В обработке».</span>' +
    '</div>' +
    '<div class="completeness-confirmation-actions">' +
      '<button type="button" data-completeness-action="cancel-recheck">Отмена</button>' +
      '<button class="primary" type="button" data-completeness-action="start-recheck">Запустить проверку</button>' +
    '</div>' +
  '</div>';
}

function renderCompletenessDashboard(model) {
  const stats = model.stats;
  const expanded = state.review.completenessExpanded;
  const recheckDisabled = model.status === "processing";
  const sourceTone = model.tone === "confirmed" ? "success" : model.tone === "processing" ? "processing" : model.tone === "warning" ? "warning" : "error";
  const alertTone = sourceTone === "error"
    ? "summary-critical"
    : sourceTone === "success"
      ? "summary-ok"
      : sourceTone === "processing"
        ? "summary-processing"
        : "summary-warning";
  const requirementsNote = stats.requirements.missing
    ? "Есть обязательные требования без вложений"
    : "Все обязательные требования закрыты";
  return '<section class="completeness-dashboard rve-dashboard-card rve-dashboard-' + sourceTone + ' is-summary-' + (expanded ? 'expanded' : 'collapsed') + ' ' + model.tone + (expanded ? ' expanded' : ' collapsed') + '" aria-label="Общий результат комплектности">' +
    '<div class="completeness-dashboard-status completeness-overall-alert overall-status-card overall-' + sourceTone + ' tree-check-summary ' + alertTone + '" id="completenessStatus" role="' + (sourceTone === "error" ? "alert" : "status") + '">' +
      '<span class="completeness-dashboard-status-icon overall-status-icon tree-check-summary-icon" aria-hidden="true"><span class="overall-status-glyph">' + renderCompletenessIcon(model.tone) + '</span></span>' +
      '<span class="completeness-dashboard-status-copy overall-status-main tree-check-summary-text"><strong class="overall-status-title">' + model.label + '</strong><small class="overall-status-description">' + model.description + '</small></span>' +
      '<span class="completeness-overall-alert-actions tree-check-actions"><button class="completeness-recheck-action tree-recalc-btn" id="completenessRecheckButton" type="button" data-completeness-action="request-recheck" aria-label="Перепроверить комплектность" title="' + (recheckDisabled ? 'Проверка комплектности уже выполняется' : 'Перепроверить комплектность') + '"' + (recheckDisabled ? ' disabled aria-disabled="true"' : '') + '>' + renderCompletenessIcon("recheck") + '</button><button class="completeness-overall-toggle" type="button" data-completeness-action="toggle-summary" aria-expanded="' + String(expanded) + '" aria-controls="completenessDashboardMetrics" aria-label="' + (expanded ? 'Свернуть сводную статистику' : 'Развернуть сводную статистику') + '" title="' + (expanded ? 'Свернуть сводную статистику' : 'Развернуть сводную статистику') + '"><span class="position-accordion-icon" aria-hidden="true">' + renderAccordionArrowIcon(expanded) + '</span></button></span>' +
    '</div>' +
    '<div class="completeness-dashboard-body" id="completenessDashboardMetrics"' + (expanded ? '' : ' hidden') + '>' +
      '<div class="completeness-dashboard-metrics rve-summary-cards">' +
        renderCompletenessMetric("requirements", "Требования", stats.requirements.closed + "/" + stats.requirements.missing, requirementsNote) +
        renderCompletenessMetric("completeness", "Комплектность", stats.completenessPct + "%", "по проверке обязательных вложений", stats.completenessPct) +
        renderCompletenessMetric("documents", "Документы", stats.total, "документов") +
        renderCompletenessMetric("processing", "В обработке", stats.processing, "ожидают завершения анализа") +
        renderCompletenessMetric("warnings", "Предупреждения", stats.warnings, "требуют внимания") +
        renderCompletenessMetric("errors", "Ошибки", stats.errors, "критических ошибок") +
        renderCompletenessMetric("profile", "Профиль проверки", "АСОР / ПИР v3", "Профиль содержит незакрытые обязательные правила") +
      '</div>' +
    '</div>' +
  '</section>';
}

function renderCompletenessTreeChevron(expanded) {
  return '<svg class="completeness-tree-chevron tree-toggle-icon' + (expanded ? ' expanded' : '') + '" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="m7 10 5 5 5-5"></path></svg>';
}

function getCompletenessSourceStatus(tone) {
  return {
    ready: "success",
    processing: "processing",
    warning: "review",
    error: "failed"
  }[tone] || "processing";
}

function getCompletenessSourceFormatClass(extension) {
  const value = String(extension || "file").toLowerCase();
  if (value === "msg") return "format-msg";
  if (["zip", "rar", "7z", "tar"].includes(value)) return "format-zip";
  if (["xlsx", "xls"].includes(value)) return "format-xls";
  if (["docx", "doc"].includes(value)) return "format-doc";
  if (value === "pdf") return "format-pdf";
  if (["jpg", "jpeg", "png"].includes(value)) return "format-jpg";
  return "format-file";
}

function renderCompletenessSourceFileIcon(kind, sourceStatus) {
  const label = kind.extension.slice(0, 4).toUpperCase();
  return '<span class="completeness-file-extension node-file-icon ' + getCompletenessSourceFormatClass(kind.extension) + ' status-' + sourceStatus + '" role="img" aria-label="Формат ' + escapeAttr(label) + '">' +
    '<svg viewBox="0 0 32 32" focusable="false" aria-hidden="true"><circle class="icon-bg" cx="16" cy="16" r="16"></circle><text class="icon-label" x="16" y="17">' + escapeAttr(label) + '</text></svg>' +
    (sourceStatus === "success" ? '' : '<span class="node-file-status-dot status-' + sourceStatus + '" aria-hidden="true"></span>') +
  '</span>';
}

function getCompletenessFilterValues(file) {
  return {
    status: getCompletenessRawStatus(file),
    semanticType: file.filter_metadata?.semantic_type?.key || file.filter_metadata?.semantic_type?.label || file.ai_metadata?.detected_type || "other",
    author: file.filter_metadata?.uploaded_by?.filter_key || file.filter_metadata?.uploaded_by?.full_name || file.metadata_details?.authorName || "Не указан",
    format: file.filter_metadata?.technical_format?.category || String(file.filter_metadata?.technical_format?.extension || file.type || "file").toLowerCase()
  };
}

function getCompletenessFilterOptions() {
  const files = getCompletenessFlatFiles().map(({ file }) => file);
  const statusOptions = [
    { value: "red", label: "Ошибка", tone: "red" },
    { value: "yellow", label: "Требует проверки", tone: "yellow" },
    { value: "loading", label: "Выполняется", tone: "loading" },
    { value: "green", label: "Успешно", tone: "green" },
    { value: "gray", label: "В очереди", tone: "gray" }
  ];
  const optionBuckets = (group, getLabel) => {
    const values = new Map();
    files.forEach((file) => {
      const value = getCompletenessFilterValues(file)[group];
      if (!value) return;
      const label = getLabel(file, value);
      if (!values.has(value)) values.set(value, { value, label, count: 0 });
      values.get(value).count += 1;
    });
    return [...values.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "ru"));
  };
  const statusCounts = new Map();
  files.forEach((file) => {
    const value = getCompletenessFilterValues(file).status;
    statusCounts.set(value, (statusCounts.get(value) || 0) + 1);
  });
  return [
    { key: "status", label: "По статусу обработки", options: statusOptions.map((option) => ({ ...option, count: statusCounts.get(option.value) || 0 })) },
    { key: "semanticType", label: "По смысловому типу документа", options: optionBuckets("semanticType", (file, value) => file.filter_metadata?.semantic_type?.label || file.ai_metadata?.detected_type || value) },
    { key: "author", label: "По автору загрузки / ФИО", options: optionBuckets("author", (file, value) => file.filter_metadata?.uploaded_by?.short_name || file.filter_metadata?.uploaded_by?.full_name || value) },
    { key: "format", label: "По техническому формату файла", options: optionBuckets("format", (file, value) => file.filter_metadata?.technical_format?.label || value.toUpperCase()) }
  ];
}

function getCompletenessActiveFilterCount(filters = state.review.completenessAppliedFilters) {
  return Object.values(filters).reduce((total, values) => total + (values || []).length, 0);
}

function matchesCompletenessFile(file) {
  const query = state.review.completenessSearchQuery.trim().toLocaleLowerCase("ru");
  const values = getCompletenessFilterValues(file);
  const details = file.metadata_details || {};
  const searchableText = [
    file.name,
    file.ai_metadata?.detected_type,
    details.sourceType,
    details.authorName,
    values.format
  ].filter(Boolean).join(" ").toLocaleLowerCase("ru");
  if (query && !searchableText.includes(query)) return false;
  return Object.entries(state.review.completenessAppliedFilters).every(([group, selected]) => {
    return !selected.length || selected.includes(values[group]);
  });
}

function buildCompletenessTreeView(items = completenessCheck.files || []) {
  const hasCriteria = Boolean(state.review.completenessSearchQuery.trim() || getCompletenessActiveFilterCount());
  const visit = (file) => {
    const children = (file.children || []).map(visit).filter(Boolean);
    const ownMatch = matchesCompletenessFile(file);
    if (hasCriteria && !ownMatch && !children.length) return null;
    return { file, children, forcedExpanded: hasCriteria && children.length > 0 };
  };
  return items.map(visit).filter(Boolean);
}

function getCompletenessFileDownloadHref(file) {
  return "data:text/plain;charset=utf-8," + encodeURIComponent("Демонстрационный файл: " + file.name);
}

function renderCompletenessFileTreeNode(view, depth = 0, activeFileId = "") {
  const file = view.file;
  const status = getCompletenessFileStatus(file);
  const kind = getCompletenessFileKind(file);
  const children = view.children || [];
  const expanded = view.forcedExpanded || state.review.completenessExpandedFileIds.has(file.id);
  const active = activeFileId === file.id;
  const detectedType = file.ai_metadata?.detected_type || file.metadata_details?.sourceType || kind.label;
  const sourceStatus = getCompletenessSourceStatus(status.tone);
  const rowAttention = sourceStatus === "failed" ? " tree-row-attention-failed" : sourceStatus === "review" ? " tree-row-attention-review" : "";
  const paddingLeft = 12 + depth * 32;
  return '<li class="completeness-file-tree-node tree-node-item ' + (children.length ? 'node-folder' + (expanded ? ' expanded' : '') : 'node-leaf') + '" role="none" data-id="' + escapeAttr(file.id) + '">' +
    '<div class="completeness-file-tree-row tree-row ' + status.tone + rowAttention + (active ? ' active' : '') + '" id="completenessFile-' + escapeAttr(file.id) + '" role="treeitem" tabindex="0" data-completeness-action="select-file" data-file-id="' + escapeAttr(file.id) + '" aria-level="' + (depth + 1) + '"' + (active ? ' aria-current="true"' : '') + (children.length ? ' aria-expanded="' + String(expanded) + '"' : '') + '>' +
      '<div class="completeness-file-tree-item tree-td col-tree-name" style="padding-left:' + paddingLeft + 'px">' +
        (children.length
          ? '<button class="completeness-file-tree-toggle tree-toggle" id="completenessFileToggle-' + escapeAttr(file.id) + '" type="button" data-completeness-action="toggle-file-node" data-file-id="' + escapeAttr(file.id) + '" aria-expanded="' + String(expanded) + '" aria-label="' + (expanded ? 'Свернуть ' : 'Раскрыть ') + escapeAttr(file.name) + '" title="' + (expanded ? 'Свернуть' : 'Раскрыть') + '">' + renderCompletenessTreeChevron(expanded) + '</button>'
          : '<span class="completeness-file-tree-toggle-placeholder tree-toggle-placeholder" aria-hidden="true"></span>') +
        renderCompletenessSourceFileIcon(kind, sourceStatus) +
        '<span class="completeness-file-tree-copy node-main-text"><strong class="node-name-text" title="' + escapeAttr(file.name) + '">' + escapeAttr(file.name) + '</strong><small class="node-subline"><span class="node-type-text" title="' + escapeAttr(detectedType) + '">' + escapeAttr(detectedType) + '</span><span class="node-size-text">' + formatCompletenessFileSize(file.size) + '</span></small></span>' +
        '<span class="completeness-file-status source-status-sr ' + status.tone + '">' + status.label + '</span>' +
      '</div>' +
      '<div class="tree-td col-tree-actions"><button class="completeness-tree-download" type="button" data-completeness-action="download-file" data-file-id="' + escapeAttr(file.id) + '" aria-label="Скачать документ ' + escapeAttr(file.name) + '" title="Скачать документ"><span aria-hidden="true">' + renderCompletenessIcon("download") + '</span></button></div>' +
    '</div>' +
    (children.length && expanded ? '<ul class="completeness-file-tree-children nested-tree-group" role="group">' + children.map((child) => renderCompletenessFileTreeNode(child, depth + 1, activeFileId)).join("") + '</ul>' : '') +
  '</li>';
}

function renderCompletenessFilterPanel() {
  if (!state.review.completenessFilterPanelOpen) return "";
  const groups = getCompletenessFilterOptions();
  const totalSelected = getCompletenessActiveFilterCount(state.review.completenessDraftFilters);
  return '<section class="completeness-filter-panel filtering-panel completeness-filter-inline" aria-label="Фильтры структуры вложений">' +
    '<header class="filtering-header"><button class="filtering-context-btn" type="button" data-completeness-action="toggle-filter-panel" aria-label="Вернуться к структуре вложений"><span class="filtering-context-icon filtering-context-filter" aria-hidden="true">' + renderCompletenessIcon("filter") + '</span><span class="filtering-context-icon filtering-context-back" aria-hidden="true">' + renderCompletenessIcon("back") + '</span></button><div class="filtering-header-copy"><h2>Фильтрация</h2><p>Для выполнения фильтрации выберите значения</p></div><button class="filtering-close-btn" type="button" data-completeness-action="toggle-filter-panel" aria-label="Закрыть фильтрацию"><span aria-hidden="true">×</span></button></header>' +
    '<div class="completeness-filter-groups filtering-groups">' + groups.map((group) => {
      const selectedCount = state.review.completenessDraftFilters[group.key].length;
      const open = state.review.completenessOpenFilterGroups.has(group.key);
      return '<section class="filtering-accordion' + (open ? ' open' : '') + '" data-filter-group="' + group.key + '"><div class="filtering-accordion-head"><button class="filtering-accordion-toggle" type="button" data-completeness-action="toggle-filter-group" data-filter-group="' + group.key + '" aria-expanded="' + String(open) + '"><span class="filtering-accordion-caret" aria-hidden="true"></span><span class="filtering-accordion-title">' + group.label + '</span></button><span class="filtering-accordion-actions">' + (selectedCount ? '<span class="filtering-selected-count">' + selectedCount + '</span><button class="filtering-reset-group" type="button" data-completeness-action="reset-filter-group" data-filter-group="' + group.key + '">Сбросить</button>' : '') + '</span></div><div class="completeness-filter-options filtering-options"' + (open ? '' : ' hidden') + '>' + group.options.map((option) => {
        const selected = state.review.completenessDraftFilters[group.key].includes(option.value);
        const statusDot = option.tone ? '<span class="filtering-status-dot status-' + escapeAttr(option.tone) + '" aria-hidden="true"></span>' : '';
        return '<label class="filtering-option' + (selected ? ' selected' : '') + '"><input type="checkbox"' + (selected ? ' checked' : '') + ' data-completeness-action="toggle-filter-value" data-filter-group="' + group.key + '" data-filter-value="' + escapeAttr(option.value) + '"><span class="filtering-checkmark" aria-hidden="true"></span>' + statusDot + '<span class="filtering-option-label">' + escapeAttr(option.label) + '</span><span class="filtering-option-count">' + option.count + '</span></label>';
      }).join("") + '</div></section>';
    }).join("") + '</div>' +
    '<div class="completeness-filter-actions filtering-footer"><button class="filtering-reset-all" type="button" data-completeness-action="reset-draft-filters">Сбросить всё</button><button class="filtering-apply-btn" type="button" data-completeness-action="apply-filters">Применить фильтры (' + totalSelected + ')</button></div>' +
  '</section>';
}

function syncCompletenessDraftFilterGroupUi(group, groupKey) {
  if (!group || !state.review.completenessDraftFilters[groupKey]) return;
  const selectedValues = state.review.completenessDraftFilters[groupKey];
  group.querySelectorAll('input[data-completeness-action="toggle-filter-value"]').forEach((input) => {
    input.checked = selectedValues.includes(input.dataset.filterValue);
    input.closest(".filtering-option")?.classList.toggle("selected", input.checked);
  });

  const actions = group.querySelector(".filtering-accordion-actions");
  if (actions) {
    actions.replaceChildren();
    if (selectedValues.length) {
      const badge = document.createElement("span");
      badge.className = "filtering-selected-count";
      badge.textContent = String(selectedValues.length);
      const reset = document.createElement("button");
      reset.className = "filtering-reset-group";
      reset.type = "button";
      reset.dataset.completenessAction = "reset-filter-group";
      reset.dataset.filterGroup = groupKey;
      reset.textContent = "Сбросить";
      actions.append(badge, reset);
    }
  }

  const applyButton = document.querySelector('.completeness-filter-panel [data-completeness-action="apply-filters"]');
  if (applyButton) applyButton.textContent = "Применить фильтры (" + getCompletenessActiveFilterCount(state.review.completenessDraftFilters) + ")";
}

function keepCompletenessFilterPanelInView() {
  requestAnimationFrame(() => {
    const panel = document.querySelector(".completeness-filter-panel");
    const scroller = document.querySelector(".review-completeness-content");
    if (!panel || !scroller) return;
    const panelRect = panel.getBoundingClientRect();
    const scrollerRect = scroller.getBoundingClientRect();
    const viewportGap = 12;
    if (panelRect.bottom > scrollerRect.bottom - viewportGap) {
      scroller.scrollTop += panelRect.bottom - scrollerRect.bottom + viewportGap;
    }
    const adjustedPanelTop = panel.getBoundingClientRect().top;
    if (adjustedPanelTop < scrollerRect.top + viewportGap) {
      scroller.scrollTop -= scrollerRect.top + viewportGap - adjustedPanelTop;
    }
  });
}

function getCompletenessProblemFiles() {
  return getCompletenessFlatFiles().map(({ file }) => file).filter((file) => ["red", "yellow"].includes(getCompletenessRawStatus(file)));
}

function renderCompletenessProblemNavigator(problems) {
  if (!problems.length) return "";
  const current = Math.min(state.review.completenessProblemIndex + 1, problems.length);
  return '<div class="completeness-problem-nav tree-problem-nav" aria-label="Навигация по проблемам">' +
    '<strong class="tree-problem-count">Проблемы</strong>' +
    '<button class="tree-problem-nav-btn" type="button" data-completeness-action="navigate-problem" data-problem-direction="-1" aria-label="Предыдущая проблема" title="Предыдущая проблема">‹</button>' +
    '<span class="tree-problem-position">' + current + '/' + problems.length + '</span>' +
    '<button class="tree-problem-nav-btn" type="button" data-completeness-action="navigate-problem" data-problem-direction="1" aria-label="Следующая проблема" title="Следующая проблема">›</button>' +
  '</div>';
}

function renderCompletenessTreeMarkup() {
  const problems = getCompletenessProblemFiles();
  const activeFileId = state.review.completenessHighlightedFileId || problems[Math.min(state.review.completenessProblemIndex, Math.max(0, problems.length - 1))]?.id || "";
  if (state.review.completenessDataState === "loading") {
    return '<div class="completeness-tree-state loading"><span aria-hidden="true">' + renderCompletenessIcon("processing") + '</span><strong>Загружаем структуру вложений</strong></div>';
  }
  const treeView = buildCompletenessTreeView();
  return treeView.length
    ? '<ul class="completeness-file-tree tree-nodes-list" role="tree" aria-label="Файлы и вложения">' + treeView.map((view) => renderCompletenessFileTreeNode(view, 0, activeFileId)).join("") + '</ul>'
    : '<div class="completeness-tree-state tree-search-empty"><strong>Ничего не найдено</strong><span>Измените запрос или сбросьте фильтры.</span><button type="button" data-completeness-action="reset-tree-view">Сбросить фильтры</button></div>';
}

function renderCompletenessFiles() {
  ensureCompletenessFileState();
  const expanded = state.review.completenessFilesExpanded;
  const stats = getCompletenessTreeStats();
  const problems = getCompletenessProblemFiles();
  const activeFilters = getCompletenessActiveFilterCount();
  const problemSummary = problems.length
    ? '<div class="completeness-tree-problem-summary tree-check-summary ' + (stats.errors ? 'critical summary-critical' : 'warning summary-warning') + '" role="status"><span class="completeness-tree-problem-icon tree-check-summary-icon" aria-hidden="true">' + renderCompletenessIcon(stats.errors ? "errors" : "warnings") + '</span><span class="tree-check-summary-text"><strong>Документы, требующие внимания</strong><small>Ошибки: ' + stats.errors + '. Предупреждения: ' + stats.warnings + '.</small></span><span class="tree-check-actions">' + renderCompletenessProblemNavigator(problems) + '</span></div>'
    : '';
  return '<section class="completeness-summary-accordion completeness-files-accordion tree-shell ' + (expanded ? 'expanded' : 'collapsed') + '">' +
    '<button class="completeness-summary-head completeness-files-head tree-toolbar" type="button" data-completeness-action="toggle-files" aria-expanded="' + String(expanded) + '" aria-controls="completenessFilesPanel">' +
      '<span class="tree-toolbar-main"><span class="tree-toolbar-title">Структура вложений</span></span>' +
      '<span class="completeness-files-head-actions"><span class="completeness-tree-legend tree-status-legend" aria-hidden="true"><span class="legend-item"><i class="tree-status-empty ready"></i>Выполнено</span><span class="legend-item"><i class="tree-status-dot status-processing processing"></i>В обработке</span><span class="legend-item"><i class="tree-status-dot status-review warning"></i>Требует проверки</span><span class="legend-item"><i class="tree-status-dot status-failed error"></i>Не выполнено</span></span><span class="position-accordion-icon" aria-hidden="true">' + renderAccordionArrowIcon(expanded) + '</span></span>' +
    '</button>' +
    '<div class="completeness-summary-panel completeness-files-panel" id="completenessFilesPanel"' + (expanded ? '' : ' hidden') + '>' +
      (state.review.completenessDataState === "error" ? '<div class="completeness-data-warning" role="status">Основной набор данных недоступен. Показана резервная структура прототипа.</div>' : '') +
      problemSummary +
      '<div class="completeness-tree-tools tree-tools">' +
        '<label class="completeness-tree-search tree-search-field"><span class="tree-search-icon" aria-hidden="true">' + renderCompletenessIcon("search") + '</span><input id="completenessTreeSearch" type="search" value="' + escapeAttr(state.review.completenessSearchQuery) + '" placeholder="Поиск по структуре документов" autocomplete="off" aria-label="Поиск по структуре документов"></label>' +
        '<span class="tree-filter-control"><button class="completeness-tree-filter tree-filter-btn' + (activeFilters ? ' active' : '') + '" type="button" data-completeness-action="toggle-filter-panel" aria-expanded="' + String(state.review.completenessFilterPanelOpen) + '" title="Фильтры" aria-label="Фильтры структуры вложений"><span aria-hidden="true">' + renderCompletenessIcon("filter") + '</span></button>' + (activeFilters ? '<button class="tree-filter-badge" type="button" data-completeness-action="reset-filters" aria-label="Сбросить примененные фильтры"><span class="tree-filter-badge-count">' + activeFilters + '</span><span class="tree-filter-badge-reset" aria-hidden="true">×</span></button>' : '') + '</span>' +
      '</div>' +
      renderCompletenessFilterPanel() +
      '<div class="completeness-tree-scroll tree-scroll-area">' + renderCompletenessTreeMarkup() + '</div>' +
    '</div>' +
  '</section>';
}

function syncCompletenessAccordionUi(trigger, expanded, options) {
  const root = trigger?.closest(options.rootSelector);
  const panel = root?.querySelector(options.panelSelector);
  if (!root || !panel) return;
  animateReviewAccordionPanel(panel, () => {
    root.classList.toggle("expanded", expanded);
    root.classList.toggle("collapsed", !expanded);
    trigger.setAttribute("aria-expanded", String(expanded));
    const icon = trigger.querySelector(".position-accordion-icon");
    if (icon) icon.innerHTML = renderAccordionArrowIcon(expanded);
    const compact = options.compactSelector ? root.querySelector(options.compactSelector) : null;
    if (compact) compact.hidden = expanded;
    if (options.expandedLabel && options.collapsedLabel) {
      const label = expanded ? options.expandedLabel : options.collapsedLabel;
      trigger.setAttribute("aria-label", label);
      trigger.dataset.tooltip = label;
    }
  }, expanded, { toggleHidden: true });
}

function refreshCompletenessTreeUi(focusFileId = "") {
  const tree = document.querySelector(".completeness-tree-scroll");
  if (!tree) return;
  const scrollTop = tree.scrollTop;
  tree.innerHTML = renderCompletenessTreeMarkup();
  tree.scrollTop = scrollTop;
  if (focusFileId) focusCompletenessElement("completenessFileToggle-" + focusFileId);
}

function getCompletenessPipelineStages(file) {
  const stages = [
    { key: "unpack", order: 1, label: "Распаковка", logStage: "Распаковка", fallback: "Извлечение файлов и вложений из контейнера." },
    { key: "read", order: 2, label: "Чтение ИИ", logStage: "Чтение", fallback: "Анализ текста документа и извлечение данных." },
    { key: "check", order: 3, label: "Комплектность", logStage: "Комплектность", fallback: "Проверка обязательных документов и смысловых связей." }
  ];
  const logs = file.metadata_details?.logs || [];
  const statusMeta = {
    green: { label: "Успешно", fallback: "Этап выполнен без ошибок." },
    loading: { label: "Выполняется", fallback: "Этап находится в процессе выполнения." },
    gray: { label: "В очереди", fallback: "Этап ожидает запуска." },
    yellow: { label: "Требует проверки", fallback: "Этап требует ручной проверки." },
    red: { label: "Ошибка", fallback: "Этап завершился с ошибкой." }
  };
  return stages.map((stage) => {
    const status = file.pipeline_status?.[stage.key] || "gray";
    const meta = statusMeta[status] || statusMeta.gray;
    const logMessage = logs.find((item) => item.stage === stage.logStage)?.text;
    return { ...stage, status, statusLabel: meta.label, message: logMessage || meta.fallback || stage.fallback };
  });
}

function renderCompletenessPipelineStageIcon(stageKey) {
  const icons = {
    unpack: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="m4.5 8.2 7.5-4 7.5 4-7.5 4-7.5-4Z"></path><path d="M4.5 8.2v7.6l7.5 4 7.5-4V8.2"></path><path d="M12 12.2v7.6"></path></svg>',
    read: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M7 3.8h7.2L18 7.6v12.6H7V3.8Z"></path><path d="M14.2 3.8v4h3.8"></path><path d="M9.8 11h4.8"></path><path d="M9.8 14h3"></path><circle cx="16.4" cy="16.8" r="2.1"></circle><path d="m18 18.4 1.7 1.7"></path></svg>',
    check: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M8.2 4.8h7.6"></path><path d="M9.5 3.5h5l.8 2H8.7l.8-2Z"></path><path d="M6.5 5.7h11v14.8h-11V5.7Z"></path><path d="m9 11.3 1.4 1.4 3-3"></path><path d="m9 16 1.4 1.4 3-3"></path></svg>'
  };
  return icons[stageKey] || icons.check;
}

function renderCompletenessPipelineStateIcon(status) {
  const icons = {
    green: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="m6.8 12.5 3.2 3.2 7.2-7.4"></path></svg>',
    loading: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M17.7 7.6A7 7 0 0 0 5 11.8"></path><path d="M6.3 16.4A7 7 0 0 0 19 12.2"></path></svg>',
    gray: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><circle cx="12" cy="12" r="7.2"></circle><path d="M12 8v4.4l2.8 2"></path></svg>',
    yellow: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 6.8v6.4"></path><path d="M12 17.3h.01"></path></svg>',
    red: '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="m7.6 7.6 8.8 8.8"></path><path d="m16.4 7.6-8.8 8.8"></path></svg>'
  };
  return icons[status] || icons.gray;
}

function renderCompletenessPipeline(file) {
  const stages = getCompletenessPipelineStages(file);
  const expanded = state.review.completenessPipelineExpanded;
  return '<section class="completeness-detail-section completeness-pipeline-section metadata-section pipeline-overview-section ' + (expanded ? 'expanded' : 'collapsed') + '">' +
    '<button class="completeness-detail-section-head pipeline-overview-summary" type="button" data-completeness-action="toggle-pipeline" aria-expanded="' + String(expanded) + '" aria-controls="completenessPipelinePanel"><span class="section-title">Статусы обработки</span><span class="accordion-arrow position-accordion-icon" aria-hidden="true">' + renderAccordionArrowIcon(expanded) + '</span></button>' +
    '<div class="completeness-pipeline-grid pipeline-overview-content pipeline-overview-grid" id="completenessPipelinePanel"' + (expanded ? '' : ' hidden') + '>' + stages.map((stage) => {
      return '<article class="completeness-pipeline-stage pipeline-stage-card status-' + stage.status + '" aria-label="' + stage.order + '. ' + stage.label + ': ' + stage.statusLabel + '"><div class="completeness-pipeline-stage-index pipeline-stage-icon-wrap"><span class="pipeline-stage-icon" aria-hidden="true">' + renderCompletenessPipelineStageIcon(stage.key) + '</span><span class="pipeline-state-badge" title="' + stage.statusLabel + '" aria-label="' + stage.statusLabel + '">' + renderCompletenessPipelineStateIcon(stage.status) + '</span></div><div class="pipeline-stage-copy"><span class="pipeline-stage-title">' + stage.order + '. ' + stage.label + '</span><span class="pipeline-stage-status">' + stage.statusLabel + '</span><span class="pipeline-stage-message">' + escapeAttr(stage.message) + '</span></div></article>';
    }).join("") + '</div>' +
  '</section>';
}

function renderCompletenessClassification(file) {
  const details = file.metadata_details || {};
  const detectedType = file.ai_metadata?.detected_type || "Не определено";
  const sourceType = details.sourceType || file.declaredType || "Не указан";
  const confidence = Math.max(0, Math.min(100, Number(file.ai_metadata?.confidence) || 0));
  const confidenceTone = confidence >= 90 ? "green" : confidence >= 70 ? "yellow" : "red";
  const confidenceLabel = confidence >= 90 ? "Высокая точность классификации" : confidence >= 70 ? "Средняя точность классификации" : "Низкая точность классификации";
  return '<section class="completeness-detail-section completeness-classification-section metadata-section classification-section">' +
    '<div class="completeness-detail-section-label classification-section-head"><span class="section-title">Классификация документа</span><b class="classification-confidence-label text-' + confidenceTone + '">' + confidenceLabel + '</b></div>' +
    '<div class="completeness-classification-card classification-card">' +
      '<div class="completeness-classification-comparison">' +
        '<div class="classification-type-cell"><small class="classification-label">Тип при загрузке</small><strong class="classification-value">' + escapeAttr(sourceType) + '</strong></div>' +
        '<div class="classification-type-cell classification-type-ai"><small class="classification-label">Тип по версии ИИ</small><strong class="classification-value text-primary">' + escapeAttr(detectedType) + '</strong></div>' +
        '<span class="completeness-classification-swap classification-match-icon" aria-label="Сопоставление типов"><svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M7.5 7.5h8.8l-2.7-2.8"></path><path d="M16.5 16.5H7.7l2.7 2.8"></path><path d="M16.3 7.5 13.6 10"></path><path d="M7.7 16.5l2.7-2.5"></path></svg></span>' +
      '</div>' +
      '<div class="classification-confidence confidence-' + confidenceTone + '" style="--confidence-value:' + confidence + '%" title="Уверенность классификации: ' + confidence + '%"><span>' + confidence + '%</span></div>' +
    '</div>' +
    (file.ai_metadata?.error_message ? '<div class="completeness-classification-message"><span aria-hidden="true">' + renderCompletenessIcon("warnings") + '</span><span>' + escapeAttr(file.ai_metadata.error_message) + '</span></div>' : '') +
  '</section>';
}

function renderCompletenessCrossLinks(file) {
  const links = file.metadata_details?.crossLinks || [];
  if (!links.length) return "";
  return '<section class="completeness-detail-section completeness-links-section metadata-section"><div class="completeness-detail-section-label"><span class="section-title">Кросс-требования комплектности (Смысловые связи)</span></div><div class="completeness-link-list cross-links-list">' + links.map((link) => {
    const present = link.status === "green";
    const context = link.context || (present ? "Документ найден в загруженном пакете." : "Документ не найден среди загруженных вложений.");
    const tone = present ? "green" : "red";
    return '<article class="completeness-link-row cross-link-item tone-' + tone + ' ' + (present ? 'present' : 'missing') + '"><span class="completeness-link-icon cross-link-icon" aria-hidden="true">' + renderCompletenessIcon(present ? "confirmed" : "errors") + '</span><span class="cross-link-content"><strong class="cross-link-text">' + escapeAttr(link.text) + '</strong><small class="cross-link-context">' + escapeAttr(context) + '</small></span><b class="cross-link-badge badge-' + tone + '"><span class="cross-link-badge-dot" aria-hidden="true"></span>' + (present ? 'Приложен' : 'Отсутствует') + '</b></article>';
  }).join("") + '</div></section>';
}

function renderCompletenessFileComments(file) {
  const details = file.metadata_details || {};
  const comments = Array.isArray(details.comments) && details.comments.length
    ? details.comments
    : details.originalComment
      ? [{ author: details.authorName || "Автор загрузки", date: details.uploadDate || "", text: details.originalComment }]
      : [];
  if (!comments.length) return "";
  return '<section class="completeness-detail-section completeness-comments-section metadata-section document-comments-card"><div class="completeness-detail-section-label"><span class="section-title">Комментарии</span></div><div class="completeness-detail-comments document-comments-list">' + comments.map((comment) => '<article class="document-comment-item"><div class="document-comment-head"><span class="document-comment-author">' + escapeAttr(comment.author || "Автор загрузки") + '</span><span class="document-comment-date">' + escapeAttr(comment.date || "") + '</span></div><p class="document-comment-text">' + escapeAttr(comment.text || "") + '</p></article>').join("") + '</div></section>';
}

function renderCompletenessLogs(file) {
  const logs = file.metadata_details?.logs || [];
  if (!logs.length) return "";
  const expanded = state.review.completenessLogsExpanded;
  return '<section class="completeness-detail-section completeness-logs-section logs-accordion">' +
    '<button class="completeness-detail-section-head logs-summary" type="button" data-completeness-action="toggle-logs" aria-expanded="' + String(expanded) + '" aria-controls="completenessLogsPanel"><span class="logs-summary-title">Ход обработки</span><b>' + logs.length + '</b><span class="accordion-arrow position-accordion-icon" aria-hidden="true">' + renderAccordionArrowIcon(expanded) + '</span></button>' +
    '<div class="completeness-log-list logs-content" id="completenessLogsPanel"' + (expanded ? '' : ' hidden') + '>' + logs.map((log) => '<article class="log-entry log-' + escapeAttr(log.status || "gray") + ' ' + escapeAttr(log.status || "gray") + '"><i aria-hidden="true"></i><span><strong>' + escapeAttr(log.stage || "Этап") + '</strong><small>' + escapeAttr(log.time || "") + '</small><p>' + escapeAttr(log.text || "") + '</p></span></article>').join("") + '</div>' +
  '</section>';
}

function renderCompletenessFileDetailPage(file) {
  const kind = getCompletenessFileKind(file);
  const details = file.metadata_details || {};
  const rechecking = state.review.completenessRecheckingFileIds.has(file.id);
  const downloadHref = getCompletenessFileDownloadHref(file);
  return '<div class="completeness-detail-page" id="completenessFileDetail" tabindex="-1">' +
    '<article class="completeness-detail-file-head metadata-header animate-fade-in">' +
      '<button class="completeness-detail-title-back metadata-icon-action" type="button" data-completeness-action="back-to-overview" aria-label="Вернуться к обзору комплектности" title="Назад к обзору комплектности"><span aria-hidden="true">' + renderCompletenessIcon("back") + '</span></button>' +
      '<span class="completeness-detail-file-copy metadata-title-block"><strong class="metadata-filename" title="' + escapeAttr(file.name) + '">' + escapeAttr(file.name) + '</strong><small class="metadata-file-meta"><span class="text-uppercase">' + escapeAttr(kind.extension) + '</span><span>' + formatCompletenessFileSize(file.size) + '</span>' + (details.uploadDate ? '<span>' + escapeAttr(details.uploadDate) + '</span>' : '') + (details.authorName ? '<span title="' + escapeAttr(details.authorName) + '">' + escapeAttr(details.authorName) + '</span>' : '') + '</small></span>' +
      '<div class="completeness-detail-menu metadata-header-actions" aria-label="Меню выбранного документа"><div class="metadata-actions-menu-wrap">' +
        '<button class="metadata-icon-action metadata-actions-trigger" type="button" data-completeness-action="toggle-file-menu" aria-expanded="' + String(state.review.completenessFileActionMenuOpen) + '" aria-label="Действия с файлом" title="Действия"><span aria-hidden="true">' + renderCompletenessIcon("more") + '</span></button>' +
        (state.review.completenessFileActionMenuOpen ? '<div class="completeness-detail-menu-popover metadata-actions-dropdown"><a href="' + escapeAttr(downloadHref) + '" download="' + escapeAttr(file.name) + '"><span class="metadata-menu-icon" aria-hidden="true">' + renderCompletenessIcon("download") + '</span>Скачать файл</a><button type="button" data-completeness-action="recheck-file" data-file-id="' + escapeAttr(file.id) + '"' + (rechecking ? ' disabled' : '') + '><span class="metadata-menu-icon" aria-hidden="true">' + renderCompletenessIcon("recheck") + '</span>' + (rechecking ? 'Проверяем...' : 'Пересчитать файл') + '</button></div>' : '') +
      '</div></div>' +
    '</article>' +
    renderCompletenessPipeline(file) +
    renderCompletenessClassification(file) +
    renderCompletenessCrossLinks(file) +
    renderCompletenessFileComments(file) +
    renderCompletenessLogs(file) +
  '</div>';
}

function downloadCompletenessFile(fileId) {
  const file = getCompletenessFile(fileId);
  if (!file) return;
  const blob = new Blob(["Демонстрационный файл: " + file.name], { type: "text/plain;charset=utf-8" });
  const downloadUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = downloadUrl;
  anchor.download = file.name;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
}

function renderCompletenessMode() {
  const content = document.getElementById("reviewCompletenessContent");
  if (!content) return;
  if (state.review.completenessView === "overview" && content.childElementCount) {
    state.review.completenessOverviewScrollTop = content.scrollTop;
  }
  ensureCompletenessFileState();
  const selectedFile = getCompletenessFile(state.review.completenessSelectedFileId);
  if (state.review.completenessView === "detail" && selectedFile) {
    content.innerHTML = renderCompletenessFileDetailPage(selectedFile);
    content.scrollTop = 0;
    return;
  }
  state.review.completenessView = "overview";
  const model = getCompletenessViewModel();
  content.innerHTML = '<div class="completeness-overview">' + renderCompletenessDashboard(model) + renderCompletenessConfirmation() + renderCompletenessRequirements() + renderCompletenessFiles() + '</div>';
  requestAnimationFrame(() => {
    content.scrollTop = state.review.completenessOverviewScrollTop;
  });
}

function focusCompletenessElement(elementId, block = "center") {
  requestAnimationFrame(() => {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.scrollIntoView({ block, behavior: block === "start" ? "auto" : "smooth" });
    element.focus({ preventScroll: true });
  });
}

function openCompletenessFileDetail(fileId) {
  const file = getCompletenessFile(fileId);
  if (!file) return;
  const content = document.getElementById("reviewCompletenessContent");
  state.review.completenessOverviewScrollTop = content?.scrollTop || 0;
  state.review.completenessSelectedFileId = fileId;
  state.review.completenessView = "detail";
  state.review.completenessPipelineExpanded = true;
  state.review.completenessLogsExpanded = getCompletenessRawStatus(file) === "red";
  state.review.completenessFileActionMenuOpen = false;
  state.review.completenessHighlightedFileId = null;
  renderReviewHeader();
  renderCompletenessMode();
  focusCompletenessElement("completenessFileDetail", "start");
}

function navigateCompletenessProblem(direction) {
  const problems = getCompletenessProblemFiles();
  if (!problems.length) return;
  const hadFilteredTree = Boolean(
    state.review.completenessSearchQuery.trim() ||
    getCompletenessActiveFilterCount() ||
    state.review.completenessFilterPanelOpen
  );
  state.review.completenessSearchQuery = "";
  state.review.completenessAppliedFilters = createEmptyCompletenessFilters();
  state.review.completenessDraftFilters = createEmptyCompletenessFilters();
  state.review.completenessFilterPanelOpen = false;
  state.review.completenessProblemIndex = (state.review.completenessProblemIndex + direction + problems.length) % problems.length;
  const file = problems[state.review.completenessProblemIndex];
  state.review.completenessHighlightedFileId = file.id;
  getCompletenessFileAncestors(file.id).forEach((ancestorId) => state.review.completenessExpandedFileIds.add(ancestorId));
  updateCompletenessProblemNavigation(file, problems, hadFilteredTree);
}

function updateCompletenessProblemNavigation(file, problems, forceTreeRender = false) {
  const content = document.getElementById("reviewCompletenessContent");
  if (!content) return;

  const position = content.querySelector(".tree-problem-position");
  if (position) position.textContent = (state.review.completenessProblemIndex + 1) + "/" + problems.length;

  const searchInput = content.querySelector("#completenessTreeSearch");
  if (searchInput) searchInput.value = "";
  content.querySelector(".completeness-filter-panel")?.remove();
  const filterButton = content.querySelector(".completeness-tree-filter");
  filterButton?.classList.remove("active");
  filterButton?.setAttribute("aria-expanded", "false");
  content.querySelector(".tree-filter-badge")?.remove();

  const treeScroller = content.querySelector(".completeness-tree-scroll");
  if (!treeScroller) return;
  let targetRow = document.getElementById("completenessFile-" + file.id);
  if (forceTreeRender || !targetRow) {
    const scrollTop = treeScroller.scrollTop;
    const treeView = buildCompletenessTreeView();
    treeScroller.innerHTML = '<ul class="completeness-file-tree tree-nodes-list" role="tree" aria-label="Файлы и вложения">' +
      treeView.map((view) => renderCompletenessFileTreeNode(view, 0, file.id)).join("") +
      "</ul>";
    treeScroller.scrollTop = scrollTop;
    targetRow = document.getElementById("completenessFile-" + file.id);
  } else {
    treeScroller.querySelectorAll(".completeness-file-tree-row.active").forEach((row) => {
      row.classList.remove("active");
      row.removeAttribute("aria-current");
    });
    targetRow.classList.add("active");
    targetRow.setAttribute("aria-current", "true");
  }

  if (!targetRow) return;
  requestAnimationFrame(() => {
    const scrollerRect = treeScroller.getBoundingClientRect();
    const rowRect = targetRow.getBoundingClientRect();
    const edgeGap = 8;
    let nextScrollTop = treeScroller.scrollTop;
    if (rowRect.top < scrollerRect.top + edgeGap) {
      nextScrollTop -= scrollerRect.top + edgeGap - rowRect.top;
    } else if (rowRect.bottom > scrollerRect.bottom - edgeGap) {
      nextScrollTop += rowRect.bottom - scrollerRect.bottom + edgeGap;
    }
    if (Math.abs(nextScrollTop - treeScroller.scrollTop) > 1) {
      treeScroller.scrollTo({ top: nextScrollTop, behavior: "smooth" });
    }
    targetRow.focus({ preventScroll: true });
  });
}

function setCompletenessFilePipelineStatus(file, status) {
  file.pipeline_status = status === "loading"
    ? { unpack: "loading", read: "gray", check: "gray" }
    : { unpack: "green", read: "green", check: "green" };
  if (file.filter_metadata?.status) {
    Object.assign(file.filter_metadata.status, {
      overall: status === "loading" ? "loading" : "green",
      has_error: false,
      has_warning: false,
      is_processing: status === "loading",
      is_success: status === "green",
      is_pending: false
    });
  }
  if (status === "green" && file.ai_metadata) file.ai_metadata.error_message = null;
}

function recheckCompletenessFile(fileId) {
  const file = getCompletenessFile(fileId);
  if (!file || state.review.completenessRecheckingFileIds.has(fileId)) return;
  state.review.completenessFileActionMenuOpen = false;
  state.review.completenessRecheckingFileIds.add(fileId);
  setCompletenessFilePipelineStatus(file, "loading");
  renderReviewHeader();
  renderCompletenessMode();
  setTimeout(() => {
    if (!getCompletenessFile(fileId)) return;
    file.pipeline_status = { unpack: "green", read: "loading", check: "gray" };
    if (state.review.completenessView === "detail" && state.review.completenessSelectedFileId === fileId) renderCompletenessMode();
  }, 900);
  setTimeout(() => {
    if (!getCompletenessFile(fileId)) return;
    setCompletenessFilePipelineStatus(file, "green");
    state.review.completenessRecheckingFileIds.delete(fileId);
    renderReviewHeader();
    renderCompletenessMode();
  }, 1900);
}

function handleCompletenessAction(action, trigger = null) {
  if (action === "download-file") {
    downloadCompletenessFile(trigger?.dataset.fileId);
    return;
  }
  if (action === "toggle-summary") {
    state.review.completenessExpanded = !state.review.completenessExpanded;
    syncCompletenessAccordionUi(trigger, state.review.completenessExpanded, {
      rootSelector: ".completeness-dashboard",
      panelSelector: "#completenessDashboardMetrics",
      expandedLabel: "Свернуть сводную статистику",
      collapsedLabel: "Развернуть сводную статистику"
    });
    return;
  }
  if (action === "toggle-files") {
    state.review.completenessFilesExpanded = !state.review.completenessFilesExpanded;
    syncCompletenessAccordionUi(trigger, state.review.completenessFilesExpanded, {
      rootSelector: ".completeness-files-accordion",
      panelSelector: "#completenessFilesPanel"
    });
    return;
  }
  if (action === "toggle-requirement-group") {
    const kind = trigger?.dataset.requirementKind;
    if (!kind || !(kind in state.review.completenessRequirementExpanded)) return;
    state.review.completenessRequirementExpanded[kind] = !state.review.completenessRequirementExpanded[kind];
    syncCompletenessAccordionUi(trigger, state.review.completenessRequirementExpanded[kind], {
      rootSelector: ".completeness-requirement-block",
      panelSelector: "#completenessGroupPanel-" + kind
    });
    return;
  }
  if (action === "toggle-file-node") {
    const fileId = trigger?.dataset.fileId;
    if (!fileId) return;
    if (state.review.completenessExpandedFileIds.has(fileId)) state.review.completenessExpandedFileIds.delete(fileId);
    else state.review.completenessExpandedFileIds.add(fileId);
    refreshCompletenessTreeUi(fileId);
    return;
  }
  if (action === "select-file" || action === "open-file") {
    openCompletenessFileDetail(trigger?.dataset.fileId);
    return;
  }
  if (action === "back-to-overview") {
    const previousFileId = state.review.completenessSelectedFileId;
    state.review.completenessView = "overview";
    state.review.completenessSelectedFileId = null;
    state.review.completenessFileActionMenuOpen = false;
    renderReviewHeader();
    renderCompletenessMode();
    if (previousFileId) focusCompletenessElement("completenessFile-" + previousFileId);
    return;
  }
  if (action === "toggle-filter-panel") {
    state.review.completenessFilterPanelOpen = !state.review.completenessFilterPanelOpen;
    state.review.completenessDraftFilters = cloneCompletenessFilters(state.review.completenessAppliedFilters);
    renderCompletenessMode();
    if (state.review.completenessFilterPanelOpen) keepCompletenessFilterPanelInView();
    return;
  }
  if (action === "toggle-filter-value") {
    const group = trigger?.dataset.filterGroup;
    const value = trigger?.dataset.filterValue;
    if (!group || !value || !state.review.completenessDraftFilters[group]) return;
    const values = state.review.completenessDraftFilters[group];
    const index = values.indexOf(value);
    if (trigger.checked && index < 0) values.push(value);
    if (!trigger.checked && index >= 0) values.splice(index, 1);
    syncCompletenessDraftFilterGroupUi(trigger.closest(".filtering-accordion"), group);
    return;
  }
  if (action === "toggle-filter-group") {
    const groupKey = trigger?.dataset.filterGroup;
    const group = trigger?.closest(".filtering-accordion");
    if (!groupKey || !group) return;
    const open = !state.review.completenessOpenFilterGroups.has(groupKey);
    if (open) state.review.completenessOpenFilterGroups.add(groupKey);
    else state.review.completenessOpenFilterGroups.delete(groupKey);
    group.classList.toggle("open", open);
    trigger.setAttribute("aria-expanded", String(open));
    const options = group.querySelector(".filtering-options");
    if (options) options.hidden = !open;
    return;
  }
  if (action === "reset-filter-group") {
    const groupKey = trigger?.dataset.filterGroup;
    const group = trigger?.closest(".filtering-accordion");
    if (!groupKey || !group || !state.review.completenessDraftFilters[groupKey]) return;
    state.review.completenessDraftFilters[groupKey] = [];
    syncCompletenessDraftFilterGroupUi(group, groupKey);
    group.querySelector(".filtering-accordion-toggle")?.focus({ preventScroll: true });
    return;
  }
  if (action === "reset-draft-filters") {
    state.review.completenessDraftFilters = createEmptyCompletenessFilters();
    document.querySelectorAll(".completeness-filter-panel .filtering-accordion").forEach((group) => {
      syncCompletenessDraftFilterGroupUi(group, group.dataset.filterGroup);
    });
    return;
  }
  if (action === "apply-filters") {
    state.review.completenessAppliedFilters = cloneCompletenessFilters(state.review.completenessDraftFilters);
    state.review.completenessFilterPanelOpen = false;
    state.review.completenessHighlightedFileId = null;
    renderCompletenessMode();
    return;
  }
  if (action === "reset-filters") {
    state.review.completenessDraftFilters = createEmptyCompletenessFilters();
    state.review.completenessAppliedFilters = createEmptyCompletenessFilters();
    renderCompletenessMode();
    return;
  }
  if (action === "reset-tree-view") {
    state.review.completenessSearchQuery = "";
    state.review.completenessDraftFilters = createEmptyCompletenessFilters();
    state.review.completenessAppliedFilters = createEmptyCompletenessFilters();
    state.review.completenessHighlightedFileId = null;
    renderCompletenessMode();
    return;
  }
  if (action === "navigate-problem") {
    navigateCompletenessProblem(Number(trigger?.dataset.problemDirection) || 0);
    return;
  }
  if (action === "toggle-pipeline") {
    state.review.completenessPipelineExpanded = !state.review.completenessPipelineExpanded;
    syncCompletenessAccordionUi(trigger, state.review.completenessPipelineExpanded, {
      rootSelector: ".completeness-pipeline-section",
      panelSelector: "#completenessPipelinePanel"
    });
    return;
  }
  if (action === "toggle-logs") {
    state.review.completenessLogsExpanded = !state.review.completenessLogsExpanded;
    syncCompletenessAccordionUi(trigger, state.review.completenessLogsExpanded, {
      rootSelector: ".completeness-logs-section",
      panelSelector: "#completenessLogsPanel"
    });
    return;
  }
  if (action === "toggle-file-menu") {
    state.review.completenessFileActionMenuOpen = !state.review.completenessFileActionMenuOpen;
    renderCompletenessMode();
    return;
  }
  if (action === "recheck-file") {
    recheckCompletenessFile(trigger?.dataset.fileId);
    return;
  }
  if (action === "first-problem") {
    const firstProblem = getCompletenessFirstProblem();
    if (!firstProblem) return;
    state.review.completenessExpanded = true;
    state.review.completenessRequirementExpanded[firstProblem.kind] = true;
    state.review.completenessHighlightedRequirementId = firstProblem.id;
    state.review.completenessConfirmationOpen = false;
    renderCompletenessMode();
    focusCompletenessElement("completenessRequirement-" + firstProblem.id);
    return;
  }
  if (action === "request-recheck") {
    if (getCompletenessStatusKey() === "processing") return;
    state.review.completenessConfirmationOpen = true;
    renderCompletenessMode();
    focusCompletenessElement("completenessConfirmation");
    return;
  }
  if (action === "cancel-recheck") {
    state.review.completenessConfirmationOpen = false;
    renderCompletenessMode();
    focusCompletenessElement("completenessRecheckButton");
    return;
  }
  if (action === "start-recheck") {
    state.review.completenessConfirmationOpen = false;
    state.review.completenessHighlightedRequirementId = null;
    state.review.completenessStatusOverride = "processing";
    renderReviewHeader();
    renderCompletenessMode();
    focusCompletenessElement("completenessStatus");
    setTimeout(() => {
      state.review.completenessStatusOverride = null;
      renderReviewHeader();
      renderCompletenessMode();
    }, 1800);
  }
}

function resetCompletenessModeUiState() {
  state.review.completenessExpanded = true;
  state.review.completenessConfirmationOpen = false;
  state.review.completenessHighlightedRequirementId = null;
  state.review.completenessRequirementExpanded = {
    "required-document": true,
    "special-condition": true
  };
  state.review.completenessFilesExpanded = true;
  state.review.completenessExpandedFileIds = new Set();
  state.review.completenessFilesInitialized = false;
  state.review.completenessSelectedFileId = null;
  state.review.completenessView = "overview";
  state.review.completenessOverviewScrollTop = 0;
  state.review.completenessSearchQuery = "";
  state.review.completenessFilterPanelOpen = false;
  state.review.completenessOpenFilterGroups = new Set(["status"]);
  state.review.completenessAppliedFilters = createEmptyCompletenessFilters();
  state.review.completenessDraftFilters = createEmptyCompletenessFilters();
  state.review.completenessProblemIndex = 0;
  state.review.completenessHighlightedFileId = null;
  state.review.completenessPipelineExpanded = true;
  state.review.completenessLogsExpanded = false;
  state.review.completenessFileActionMenuOpen = false;
}

function setReviewMode(modeKey) {
  if (!reviewModes.some((mode) => mode.key === modeKey) || state.review.activeMode === modeKey) return;
  const leavingCompletenessMode = state.review.activeMode === "completeness";
  const leavingRdMode = state.review.activeMode === "rd-changes";
  state.review.editingCommentId = null;
  state.review.rdEditingCommentId = null;
  if (leavingCompletenessMode) resetCompletenessModeUiState();
  if (leavingRdMode && state.review.rdBulkMode) exitRdBulkApplyMode({ render: false });
  if (leavingRdMode) state.review.rdCancelAllDialogOpen = false;
  state.review.activeMode = modeKey;
  renderReviewUi();
}

function setupAiChatEvents() {
  window.initAIDrawer?.();
  const trigger = document.getElementById("btn-trigger-ai-chat");
  if (!trigger) return;
  trigger.addEventListener("click", () => {
    const chatDrawer = document.getElementById("ai-drawer");
    const willOpenChat = !chatDrawer?.classList.contains("open");
    if (willOpenChat && state.review.drawerOpen) {
      closeReviewDrawer();
    }
    window.toggleAIDrawer?.();
  });
}

function renderPositionAccordion() {
  const accordion = document.getElementById("positionAccordion");
  const toggle = document.getElementById("positionAccordionToggle");
  const icon = document.getElementById("positionAccordionIcon");
  syncReviewAccordionElements(accordion, toggle, icon, state.review.positionsExpanded);
}

function syncReviewAccordionElements(root, toggle, icon, expanded, iconRenderer = renderAccordionArrowIcon) {
  if (!root || !toggle || !icon) return;
  const stateChanged = root.classList.contains("expanded") !== expanded;
  const update = () => {
    root.classList.toggle("expanded", expanded);
    root.classList.toggle("collapsed", !expanded);
    toggle.setAttribute("aria-expanded", String(expanded));
    icon.innerHTML = iconRenderer(expanded);
  };
  if (!stateChanged) {
    update();
    return;
  }
  const panel = root.classList.contains("normalization-panel")
    ? root.querySelector(".match-reference-area")
    : root.id === "positionAccordion"
      ? root.querySelector(".review-list")
      : root.querySelector(":scope > .position-accordion-panel, :scope > .result-ai-body, :scope > .reference-body, :scope > .comments-accordion-panel");
  if (!panel) {
    update();
    return;
  }
  animateReviewAccordionPanel(panel, update, expanded);
}

const reviewAccordionAnimations = new WeakMap();
let positionAccordionListRenderTimer = 0;

function resetReviewAccordionPanelStyles(panel) {
  panel.style.removeProperty("display");
  panel.style.removeProperty("height");
  panel.style.removeProperty("overflow");
  panel.style.removeProperty("opacity");
  panel.style.removeProperty("box-sizing");
  panel.style.removeProperty("padding-top");
  panel.style.removeProperty("padding-bottom");
}

function animateReviewAccordionPanel(panel, update, expanded, options = {}) {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const previousAnimation = reviewAccordionAnimations.get(panel);
  if (previousAnimation) {
    previousAnimation.cancel();
    reviewAccordionAnimations.delete(panel);
  }
  resetReviewAccordionPanelStyles(panel);
  const startStyles = getComputedStyle(panel);
  const startDisplay = startStyles.display;
  const startHeight = panel.hidden || startDisplay === "none" ? 0 : panel.getBoundingClientRect().height;
  const startPaddingTop = panel.hidden ? 0 : parseFloat(startStyles.paddingTop) || 0;
  const startPaddingBottom = panel.hidden ? 0 : parseFloat(startStyles.paddingBottom) || 0;
  if (options.toggleHidden && expanded) panel.hidden = false;
  update();
  const endStyles = getComputedStyle(panel);
  const renderedDisplay = endStyles.display;
  const endHeight = options.toggleHidden
    ? (expanded ? panel.scrollHeight : 0)
    : (renderedDisplay === "none" ? 0 : panel.getBoundingClientRect().height);
  const endPaddingTop = options.toggleHidden && !expanded ? 0 : parseFloat(endStyles.paddingTop) || 0;
  const endPaddingBottom = options.toggleHidden && !expanded ? 0 : parseFloat(endStyles.paddingBottom) || 0;
  if (!expanded && !options.toggleHidden && renderedDisplay === "none") {
    panel.style.display = startDisplay === "none" ? "block" : startDisplay;
  }
  if (reduceMotion || Math.abs(endHeight - startHeight) < 1) {
    resetReviewAccordionPanelStyles(panel);
    if (options.toggleHidden) panel.hidden = !expanded;
    return;
  }
  panel.style.boxSizing = "border-box";
  panel.style.height = startHeight + "px";
  panel.style.overflow = "hidden";
  const animation = panel.animate(
    [
      {
        height: startHeight + "px",
        paddingTop: startPaddingTop + "px",
        paddingBottom: startPaddingBottom + "px"
      },
      {
        height: endHeight + "px",
        paddingTop: endPaddingTop + "px",
        paddingBottom: endPaddingBottom + "px"
      }
    ],
    { duration: 180, easing: "cubic-bezier(0.2, 0, 0, 1)", fill: "both" }
  );
  reviewAccordionAnimations.set(panel, animation);
  animation.onfinish = () => {
    if (reviewAccordionAnimations.get(panel) !== animation) return;
    reviewAccordionAnimations.delete(panel);
    if (options.toggleHidden && !expanded) panel.hidden = true;
    animation.cancel();
    resetReviewAccordionPanelStyles(panel);
    if (options.toggleHidden && expanded) panel.hidden = false;
  };
  animation.oncancel = () => {
    if (reviewAccordionAnimations.get(panel) === animation) reviewAccordionAnimations.delete(panel);
  };
}

function renderReviewHeader() {
  const title = document.getElementById("reviewContextTitle");
  const meta = document.getElementById("reviewHeaderMeta");
  const prevButton = document.getElementById("prevReviewIssue");
  const nextButton = document.getElementById("nextReviewIssue");
  if (title) title.textContent = "Проверка";
  if (meta) meta.textContent = "Проверьте комплектность, сопоставление АНР и изменения РД";
  renderReviewModeTabs();
  if (state.review.activeMode !== "anr") return;
  const activeIssues = getFilteredIssues();
  const currentIndex = activeIssues.findIndex((item) => item.id === state.review.selectedIssueId);
  if (prevButton) {
    prevButton.innerHTML = renderPositionNavIcon("prev");
    prevButton.disabled = currentIndex <= 0;
  }
  if (nextButton) {
    nextButton.innerHTML = renderPositionNavIcon("next");
    nextButton.disabled = currentIndex < 0 || activeIssues.length <= 1;
  }
}

function renderReviewFilters() {
  const filters = document.getElementById("reviewFilters");
  if (!filters) return;
  const counts = getReviewCounts();
  filters.innerHTML = reviewFilters
    .map((filter) => {
      const count = getReviewFilterCount(filter.key, counts);
      return `<button class="review-filter ${state.review.activeFilter === filter.key ? "active" : ""}" type="button" data-review-filter="${filter.key}" aria-label="${filter.label}: ${count}"><span>${filter.label}</span><strong>${count}</strong></button>`;
    })
    .join("");
}

function renderReviewList() {
  const list = document.getElementById("reviewList");
  if (!list) return;
  const filteredIssues = getFilteredIssues();
  if (!filteredIssues.length) {
    list.innerHTML = '<div class="review-empty">Нет элементов для выбранного фильтра.</div>';
    return;
  }
  const visibleIssues = state.review.positionsExpanded
    ? filteredIssues
    : filteredIssues.filter((issue) => issue.id === state.review.selectedIssueId).slice(0, 1);
  const issueList = visibleIssues.length ? visibleIssues : filteredIssues.slice(0, 1);
  list.innerHTML = issueList
    .map((issue) => {
      const row = findRow(rows, issue.rowId);
      const sourceRow = getIssueSourceRow(issue);
      const active = state.review.selectedIssueId === issue.id ? " active" : "";
      const isUnrecognized = isUnrecognizedIssue(issue);
      const showIssueTags = ["created", "transfer-error"].includes(state.review.activeFilter);
      const reviewCopy = getReviewCopy(issue);
      const issueTags = showIssueTags
        ? '<span class="issue-card-tags"><span class="issue-tag ' + reviewStateClass(issue) + '">' + reviewStateLabel(issue) + '</span>' + (issue.status === "sent-to-manual" ? '' : '<span class="issue-tag status">' + statusLabel(issue.status) + '</span>') + '</span>'
        : "";
      const cardNumber = isUnrecognized ? `АНР ${sourceRow?.rowNumber || issue.sourceAnrRowId || issue.id}` : (row?.number || issue.rowId);
      const cardTitle = isUnrecognized ? (sourceRow?.rawText || issue.title) : issue.title;
      const cardMeta = isUnrecognized
        ? `Не применено в АСОР · ед. изм.: ${sourceRow?.unit || "не указана"} · объем: ${sourceRow?.quantity || "не указан"}`
        : reviewCopy.shortDescription;
      return `<button class="issue-card ${issue.severity}${isUnrecognized ? " unrecognized" : ""}${active}" type="button" data-select-issue="${issue.id}">
        <span class="issue-card-top"><span class="issue-card-main"><strong>${escapeAttr(cardNumber)}</strong><span class="issue-card-title">${escapeAttr(cardTitle)}</span></span>${issueTags}</span>
        <span class="issue-card-meta">${escapeAttr(cardMeta)}</span>
      </button>`;
    })
    .join("");
}

function getRdChange(changeId) {
  return rdChanges.find((change) => change.id === changeId) || null;
}

function getRdCommentContext(change) {
  if (!change) return null;
  if (!Array.isArray(change.comments)) change.comments = [];
  return {
    id: `rd-change:${change.id}`,
    rowId: change.rowId,
    comments: change.comments
  };
}

function getRdActionCardText(change) {
  if (change.reviewState === "warning") {
    return "Проверьте предложенный объем и похожие строки сметы. Если изменение корректно, примените его. Если изменение применять не нужно, отмените его; дальнейшую корректировку выполните вручную в документе.";
  }
  if (change.reviewState === "applied") {
    return "Изменение применено и сохранено в решенных. Дополнительных действий по этой строке не требуется.";
  }
  if (change.reviewState === "cancelled") {
    return "Изменение отменено. При необходимости скорректируйте строку вручную в документе вне дровера.";
  }
  return "Изменение обработано автоматически. Проверьте результат; дополнительных действий по этой строке не требуется.";
}

function renderRdActionCard(change) {
  return '<div class="detail-section info-card action-section rd-action-section"><div class="info-card-head"><span class="info-card-icon action" aria-hidden="true">' + renderInfoCardIcon("action") + '</span><h4>Что делать</h4></div><p>' + escapeAttr(getRdActionCardText(change)) + '</p></div>';
}

function renderRdDecisionIcon(kind) {
  if (kind === "cancel") {
    return '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M9 14 4 9l5-5"></path><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"></path></svg>';
  }
  if (kind === "select") {
    return '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="m3.5 6 1 1 2-2"></path><path d="m3.5 12 1 1 2-2"></path><path d="m3.5 18 1 1 2-2"></path></svg>';
  }
  return '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="m5 12 4 4L19 6"></path></svg>';
}

function renderRdVolumeEditIcon(kind) {
  if (kind === "edit") {
    return '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"></path></svg>';
  }
  if (kind === "cancel") {
    return '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="m6 6 12 12"></path><path d="M18 6 6 18"></path></svg>';
  }
  return '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="m5 12 4 4L19 6"></path></svg>';
}

let reviewToastTimer = 0;

function renderReviewToastIcon(tone) {
  return tone === "success" ? renderRdDecisionIcon("apply") : renderRdDecisionIcon("cancel");
}

function hideReviewToast() {
  const root = document.getElementById("reviewToastRegion");
  window.clearTimeout(reviewToastTimer);
  reviewToastTimer = 0;
  if (!root) return;
  root.hidden = true;
  root.innerHTML = "";
}

function showReviewToast({ tone = "info", title, description }) {
  const root = document.getElementById("reviewToastRegion");
  if (!root) return;
  window.clearTimeout(reviewToastTimer);
  root.hidden = false;
  root.innerHTML = '<div class="review-toast ' + escapeAttr(tone) + '" role="status">' +
    '<span class="review-toast-icon" aria-hidden="true">' + renderReviewToastIcon(tone) + '</span>' +
    '<span class="review-toast-copy"><strong>' + escapeAttr(title) + '</strong><span>' + escapeAttr(description) + '</span></span>' +
    '<button class="review-toast-close" type="button" data-review-toast-close aria-label="Закрыть уведомление"><svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="m7 7 10 10"></path><path d="M17 7 7 17"></path></svg></button>' +
  '</div>';
  reviewToastTimer = window.setTimeout(hideReviewToast, 3000);
}

function renderRdBulkCheckbox(selected) {
  return '<span class="rd-bulk-checkbox' + (selected ? ' selected' : '') + '" aria-hidden="true">' +
    (selected ? '<svg viewBox="0 0 16 16" focusable="false"><path d="m3.5 8 2.7 2.7L12.5 4.5"></path></svg>' : '') +
  '</span>';
}

function renderRdCardFooter(change, bulkMode = false) {
  if (change?.reviewState !== "warning") return "";
  const warningReason = change.warningReason
    ? '<span class="rd-change-reason"><span class="rd-change-reason-icon" aria-hidden="true">' + renderInfoCardIcon("action") + '</span><span class="rd-change-reason-text">' + escapeAttr(change.warningReason) + '</span></span>'
    : '<span class="rd-change-reason rd-change-reason-empty">Изменение требует решения.</span>';
  const actions = bulkMode ? "" : '<span class="rd-card-actions" aria-label="Действия с изменением РД">' +
    '<button class="rd-card-action cancel" type="button" data-rd-card-decision="cancel" data-rd-change-id="' + escapeAttr(change.id) + '" aria-label="Отменить изменение" data-tooltip="Отменить изменение">' + renderRdDecisionIcon("cancel") + '</button>' +
    '<button class="rd-card-action apply" type="button" data-rd-card-decision="apply" data-rd-change-id="' + escapeAttr(change.id) + '" aria-label="Применить изменение" data-tooltip="Применить изменение">' + renderRdDecisionIcon("apply") + '</button>' +
  '</span>';
  return '<span class="rd-card-footer">' + warningReason + actions + '</span>';
}

function isResolvedRdChange(change) {
  return ["applied", "cancelled"].includes(change?.reviewState);
}

function getFilteredRdChanges(filterKey = state.review.rdActiveFilter) {
  if (filterKey === "warnings") return rdChanges.filter((change) => change.reviewState === "warning");
  if (filterKey === "resolved") return rdChanges.filter(isResolvedRdChange);
  return rdChanges;
}

function getRdReviewCounts() {
  return {
    all: rdChanges.length,
    warnings: rdChanges.filter((change) => change.reviewState === "warning").length,
    resolved: rdChanges.filter(isResolvedRdChange).length
  };
}

function getRdReviewStateLabel(reviewState) {
  const labels = {
    warning: "Предупреждение",
    applied: "Применено",
    cancelled: "Отменено",
    "auto-applied": "Обработано автоматически"
  };
  return labels[reviewState] || "Изменение РД";
}

function getRdCardStateLabel(reviewState) {
  if (reviewState === "warning") return "Требует решения";
  return getRdReviewStateLabel(reviewState);
}

function getRdReviewStateClass(reviewState) {
  if (reviewState === "warning") return "warning";
  if (reviewState === "applied") return "applied";
  if (reviewState === "cancelled") return "cancelled";
  return "auto-applied";
}

function getRdHeaderGuidance(change) {
  if (!change) return "В выбранном фильтре нет изменений";
  if (change.reviewState === "warning") return change.warningReason || "Изменение требует решения";
  if (change.reviewState === "applied") return "Предложенное изменение применено";
  if (change.reviewState === "cancelled") return "Предложенное изменение отменено";
  return "Изменение обработано автоматически";
}

function ensureRdReviewSelection() {
  if (!rdReviewFilters.some((filter) => filter.key === state.review.rdActiveFilter)) {
    state.review.rdActiveFilter = "all";
  }
  const filteredChanges = getFilteredRdChanges();
  if (!filteredChanges.some((change) => change.id === state.review.rdSelectedChangeId)) {
    state.review.rdSelectedChangeId = filteredChanges[0]?.id || null;
  }
}

function renderRdChangesMode() {
  const content = document.getElementById("reviewRdContent");
  content?.classList.toggle("rd-bulk-mode", state.review.rdBulkMode);
  renderRdChangesAccordion();
  renderRdReviewFilters();
  renderRdReviewList();
  renderRdReviewNavigation();
  renderRdSelectedChange();
  renderRdBulkFooter();
}

function renderRdChangesAccordion() {
  const accordion = document.getElementById("rdChangesAccordion");
  const toggle = document.getElementById("rdChangesAccordionToggle");
  const icon = document.getElementById("rdChangesAccordionIcon");
  const expanded = state.review.rdBulkMode ? true : state.review.rdChangesExpanded;
  accordion?.classList.toggle("rd-bulk-selection", state.review.rdBulkMode);
  syncReviewAccordionElements(accordion, toggle, icon, expanded);
  if (toggle) {
    toggle.disabled = state.review.rdBulkMode;
    toggle.setAttribute("aria-disabled", String(state.review.rdBulkMode));
  }
}

function syncRdSimilarAccordion() {
  const change = getRdChange(state.review.rdSelectedChangeId);
  const root = document.getElementById("rdSimilarAccordion");
  const toggle = root?.querySelector("[data-toggle-rd-similar]");
  const icon = toggle?.querySelector(".position-accordion-icon");
  const panel = document.getElementById("rdSimilarAccordionPanel");
  if (!change || !root || !toggle || !icon || !panel) return;
  syncReviewAccordionElements(root, toggle, icon, state.review.rdSimilarExpanded);
  panel.innerHTML = renderRdSimilarRows(change, state.review.rdSimilarExpanded);
}

function renderRdReviewFilters() {
  const filters = document.getElementById("rdReviewFilters");
  if (!filters) return;
  filters.classList.toggle("rd-bulk-selection-toolbar", state.review.rdBulkMode);
  if (state.review.rdBulkMode) {
    const warnings = getFilteredRdChanges("warnings");
    const selectedCount = warnings.filter((change) => state.review.rdBulkSelectedIds.has(change.id)).length;
    const allSelected = Boolean(warnings.length) && selectedCount === warnings.length;
    const partiallySelected = selectedCount > 0 && selectedCount < warnings.length;
    filters.innerHTML = '<button class="rd-bulk-select-all" type="button" data-rd-bulk-action="toggle-all" aria-pressed="' + String(allSelected) + '" aria-label="' + (allSelected ? 'Снять выбор со всех изменений' : 'Выбрать все изменения') + '">' +
      renderRdBulkCheckbox(allSelected || partiallySelected) +
      '<span>' + (allSelected ? 'Снять выбор' : 'Выбрать все') + '</span>' +
    '</button><span class="rd-bulk-selection-count">Выбрано <strong>' + selectedCount + '</strong> из ' + warnings.length + '</span>';
    const checkbox = filters.querySelector(".rd-bulk-checkbox");
    checkbox?.classList.toggle("indeterminate", partiallySelected);
    return;
  }
  const counts = getRdReviewCounts();
  filters.innerHTML = rdReviewFilters
    .map((filter) => `<button class="review-filter ${state.review.rdActiveFilter === filter.key ? "active" : ""}" type="button" data-rd-review-filter="${filter.key}" aria-label="${filter.label}: ${counts[filter.key]}" aria-pressed="${state.review.rdActiveFilter === filter.key}"><span>${filter.label}</span><strong>${counts[filter.key]}</strong></button>`)
    .join("");
}

function getRdEmptyStateCopy() {
  if (state.review.rdActiveFilter === "warnings") {
    return {
      title: "Все предупреждения обработаны",
      description: "Активных изменений, требующих решения, больше нет.",
      action: ""
    };
  }
  if (state.review.rdActiveFilter === "resolved") {
    return { title: "Решенных изменений пока нет", description: "Примененные и отмененные изменения появятся в этом списке.", action: "" };
  }
  return { title: "Изменений РД нет", description: "Для текущей версии рабочей документации изменения не найдены.", action: "" };
}

function renderRdSvTag(svLevel, modifierClass = "") {
  const className = modifierClass ? ` ${modifierClass}` : "";
  const label = `Уровень принадлежности строки к 3D-модели: ${svLevel}`;
  return '<span class="rd-change-level' + className + '" title="' + escapeAttr(label) + '" aria-label="' + escapeAttr(label) + '"><img src="assets/icons/box.svg" alt="" aria-hidden="true"><span>' + escapeAttr(svLevel) + '</span></span>';
}

function getRdRowUnit(rowId, explicitUnit = "") {
  return String(explicitUnit || findRow(rows, rowId)?.unit || "").trim();
}

function sanitizeRdVolumeDraft(value) {
  const compactValue = String(value || "")
    .replace(/\s/g, "")
    .replace(/\./g, ",")
    .replace(/[^0-9,]/g, "");
  const separatorIndex = compactValue.indexOf(",");
  if (separatorIndex < 0) return compactValue;
  return compactValue.slice(0, separatorIndex + 1) + compactValue.slice(separatorIndex + 1).replace(/,/g, "");
}

function isValidRdVolumeDraft(value) {
  return /^\d+(?:,\d+)?$/.test(String(value || ""));
}

function renderRdVolumeEditor(change) {
  const isEditing = state.review.rdEditingVolumeChangeId === change.id;
  if (!isEditing) {
    return '<span class="rd-change-volume-value"><strong>' + escapeAttr(change.proposedVolume) + '</strong><button class="rd-volume-edit-trigger" type="button" data-rd-volume-action="start" data-rd-change-id="' + escapeAttr(change.id) + '" aria-label="Редактировать значение для строки ' + escapeAttr(change.rowNumber) + '" title="Редактировать значение">' + renderRdVolumeEditIcon("edit") + '</button></span>';
  }
  const draft = state.review.rdEditingVolumeDraft;
  return '<span class="rd-volume-editor" role="group" aria-label="Редактирование значения для строки ' + escapeAttr(change.rowNumber) + '">' +
    '<input class="rd-volume-edit-input" type="text" inputmode="decimal" pattern="[0-9]+([,.][0-9]+)?" autocomplete="off" value="' + escapeAttr(draft) + '" placeholder="Введите значение" aria-label="Новое значение" data-rd-volume-input data-rd-change-id="' + escapeAttr(change.id) + '">' +
    '<button class="rd-volume-edit-action confirm" type="button" data-rd-volume-action="confirm" data-rd-change-id="' + escapeAttr(change.id) + '" aria-label="Подтвердить редактирование" title="Подтвердить"' + (isValidRdVolumeDraft(draft) ? '' : ' disabled') + '>' + renderRdVolumeEditIcon("confirm") + '</button>' +
    '<button class="rd-volume-edit-action cancel" type="button" data-rd-volume-action="cancel" data-rd-change-id="' + escapeAttr(change.id) + '" aria-label="Отменить редактирование" title="Отменить">' + renderRdVolumeEditIcon("cancel") + '</button>' +
  '</span>';
}

function renderRdVolumeComparison(change, unit = "", modifierClass = "", editable = true) {
  const className = modifierClass ? ` ${modifierClass}` : "";
  const unitLabel = unit ? ", " + escapeAttr(unit) : "";
  const accessibleUnit = unit ? ", единица измерения " + escapeAttr(unit) : "";
  const isEditing = editable && state.review.rdEditingVolumeChangeId === change.id;
  const proposedValue = editable ? renderRdVolumeEditor(change) : '<strong>' + escapeAttr(change.proposedVolume) + '</strong>';
  const proposedLabel = isEditing ? "" : '<span>Стало' + unitLabel + '</span>';
  return '<span class="rd-change-comparison' + className + '" aria-label="Сравнение объема' + accessibleUnit + ': было ' + escapeAttr(change.previousVolume) + ', стало ' + escapeAttr(change.proposedVolume) + '"><span class="rd-change-volume"><span>Было' + unitLabel + '</span><strong>' + escapeAttr(change.previousVolume) + '</strong></span><span class="rd-change-volume rd-change-volume-editable' + (isEditing ? ' is-editing' : '') + '">' + proposedLabel + proposedValue + '</span><span class="rd-change-volume-switch" aria-hidden="true"><img src="assets/icons/arrow-left-right.svg" alt=""></span></span>';
}

function getRdSimilarRows(change) {
  if (!change || !Array.isArray(change.similarRows)) return [];
  return change.similarRows.filter((row) => row.rowId !== change.rowId);
}

function renderRdSimilarRows(change, expanded = true) {
  const similarRows = getRdSimilarRows(change);
  if (!similarRows.length) {
    return '<p class="rd-similar-empty">Похожие строки сметы не найдены.</p>';
  }
  const visibleRows = expanded ? similarRows : similarRows.slice(0, 1);
  return '<div class="review-list rd-similar-card-list" aria-label="Похожие строки сметы">' + visibleRows
    .map((row) => {
      const similarityPercent = Math.max(0, Math.min(100, Number(row.similarityPercent) || 0));
      const unit = getRdRowUnit(row.rowId, row.unit);
      const currentVolumeLabel = 'Текущий объем ' + row.currentVolume + (unit ? ' ' + unit : '');
      return '<button class="issue-card rd-change-card rd-similar-card" type="button" data-rd-go-to-row="' + escapeAttr(row.rowId) + '" aria-label="Перейти к похожей строке ' + escapeAttr(row.rowNumber) + ' в смете. ' + escapeAttr(currentVolumeLabel) + '. Сходство ' + similarityPercent + '%">' +
        '<span class="issue-card-top rd-similar-card-top"><span class="issue-card-tags rd-similar-tags">' + renderRdSvTag(row.svLevel) + '<span class="issue-tag rd-similarity-tag">Сходство <strong>' + similarityPercent + '%</strong></span></span><span class="rd-similar-current-volume" aria-label="' + escapeAttr(currentVolumeLabel) + '"><strong>' + escapeAttr(row.currentVolume) + '</strong>' + (unit ? '<span>' + escapeAttr(unit) + '</span>' : '') + '</span></span>' +
        '<span class="rd-change-row-title"><strong class="rd-change-number">' + escapeAttr(row.rowNumber) + '</strong><span class="issue-card-title" title="' + escapeAttr(row.name) + '">' + escapeAttr(row.name) + '</span></span>' +
      '</button>';
    })
    .join("") + '</div>';
}

function renderRdReviewList() {
  const list = document.getElementById("rdReviewList");
  if (!list) return;
  const bulkMode = state.review.rdBulkMode;
  const filteredChanges = bulkMode ? getFilteredRdChanges("warnings") : getFilteredRdChanges();
  const warningsComplete = !bulkMode && state.review.rdActiveFilter === "warnings" && !filteredChanges.length;
  list.setAttribute("aria-label", bulkMode ? "Выбор изменений РД для применения" : "Список изменений РД");
  document.getElementById("reviewRdContent")?.classList.toggle("rd-warnings-complete", warningsComplete);
  document.getElementById("rdChangesAccordion")?.classList.toggle("rd-warnings-complete", warningsComplete);
  if (!filteredChanges.length) {
    const emptyState = getRdEmptyStateCopy();
    list.innerHTML = warningsComplete
      ? '<div class="review-empty review-complete" role="status"><img class="rd-complete-illustration" src="assets/illustrations/rd-warnings-complete-documents.png" alt="" aria-hidden="true"><strong>' + emptyState.title + '</strong><span>' + emptyState.description + '</span>' + emptyState.action + '</div>'
      : '<div class="review-empty"><strong>' + emptyState.title + '</strong><span>' + emptyState.description + '</span>' + emptyState.action + '</div>';
    return;
  }
  const visibleChanges = bulkMode || state.review.rdChangesExpanded
    ? filteredChanges
    : filteredChanges.filter((change) => change.id === state.review.rdSelectedChangeId).slice(0, 1);
  const changeList = visibleChanges.length ? visibleChanges : filteredChanges.slice(0, 1);
  list.innerHTML = changeList
    .map((change) => {
      const isActive = !bulkMode && state.review.rdSelectedChangeId === change.id;
      const isBulkSelected = bulkMode && state.review.rdBulkSelectedIds.has(change.id);
      const active = isActive ? " active" : "";
      const bulkSelected = isBulkSelected ? " bulk-selected" : "";
      const warningClass = change.reviewState === "warning" ? " has-warning" : "";
      const volumeEditing = !bulkMode && state.review.rdEditingVolumeChangeId === change.id ? " is-volume-editing" : "";
      const stateClass = getRdReviewStateClass(change.reviewState);
      const interactionAttribute = bulkMode
        ? 'data-rd-bulk-toggle="' + escapeAttr(change.id) + '" aria-pressed="' + String(isBulkSelected) + '" aria-label="' + (isBulkSelected ? 'Снять выбор: ' : 'Выбрать: ') + escapeAttr(change.rowNumber + ' ' + change.name) + '"'
        : 'data-select-rd-change="' + escapeAttr(change.id) + '" aria-pressed="' + String(isActive) + '"';
      const selectionIndicator = bulkMode ? renderRdBulkCheckbox(isBulkSelected) : "";
      return '<article class="issue-card rd-change-card' + active + bulkSelected + warningClass + volumeEditing + '" data-rd-change-card="' + escapeAttr(change.id) + '">' +
        '<button class="rd-change-card-main" type="button" ' + interactionAttribute + '>' +
        '<span class="issue-card-top">' + renderRdSvTag(change.svLevel) + '<span class="issue-card-tags"><span class="issue-tag ' + stateClass + '">' + getRdCardStateLabel(change.reviewState) + '</span>' + selectionIndicator + '</span></span>' +
        '<span class="rd-change-row-title"><strong class="rd-change-number">' + escapeAttr(change.rowNumber) + '</strong><span class="issue-card-title" title="' + escapeAttr(change.name) + '">' + escapeAttr(change.name) + '</span></span>' +
        '</button>' +
        renderRdVolumeComparison(change, getRdRowUnit(change.rowId, change.unit), "rd-card-comparison", !bulkMode) +
        renderRdCardFooter(change, bulkMode) +
      '</article>';
    })
    .join("");
  if (!bulkMode && state.review.rdChangesExpanded) {
    const activeCard = list.querySelector(".rd-change-card.active");
    if (activeCard) {
      const listRect = list.getBoundingClientRect();
      const cardRect = activeCard.getBoundingClientRect();
      if (cardRect.top < listRect.top) {
        list.scrollTop -= listRect.top - cardRect.top;
      } else if (cardRect.bottom > listRect.bottom) {
        list.scrollTop += cardRect.bottom - listRect.bottom;
      }
    }
  }
}

function renderRdReviewNavigation() {
  const previousButton = document.getElementById("prevRdChange");
  const nextButton = document.getElementById("nextRdChange");
  const navigation = previousButton?.closest(".review-position-nav");
  if (navigation) navigation.hidden = state.review.rdBulkMode;
  if (state.review.rdBulkMode) return;
  const filteredChanges = getFilteredRdChanges();
  const currentIndex = filteredChanges.findIndex((change) => change.id === state.review.rdSelectedChangeId);
  if (previousButton) {
    previousButton.innerHTML = renderPositionNavIcon("prev");
    previousButton.disabled = currentIndex <= 0;
  }
  if (nextButton) {
    nextButton.innerHTML = renderPositionNavIcon("next");
    nextButton.disabled = currentIndex < 0 || currentIndex >= filteredChanges.length - 1;
  }
}

function renderRdSelectedChange() {
  const detail = document.getElementById("rdReviewDetail");
  if (!detail) return;
  if (state.review.rdBulkMode) {
    detail.hidden = true;
    detail.innerHTML = "";
    return;
  }
  const change = getRdChange(state.review.rdSelectedChangeId);
  const warningsComplete = state.review.rdActiveFilter === "warnings" && !getFilteredRdChanges("warnings").length;
  detail.hidden = warningsComplete;
  if (warningsComplete) {
    detail.innerHTML = "";
    return;
  }
  if (!change) {
    const emptyState = getRdEmptyStateCopy();
    detail.innerHTML = '<div class="review-detail-placeholder ' + (state.review.rdActiveFilter === "warnings" ? 'complete' : 'select') + '"><span class="review-placeholder-visual" aria-hidden="true">' + renderReviewPlaceholderIcon(state.review.rdActiveFilter === "warnings" ? "complete" : "select") + '</span><h3>' + emptyState.title + '</h3><p>' + emptyState.description + '</p></div>';
    return;
  }
  const similarRows = getRdSimilarRows(change);
  const expanded = state.review.rdSimilarExpanded;
  const commentContext = getRdCommentContext(change);
  detail.innerHTML = '<div class="rd-detail-scroll rd-review-detail-scroll">' +
    '<section class="position-accordion rd-similar-accordion ' + (expanded ? 'expanded' : 'collapsed') + '" id="rdSimilarAccordion">' +
      '<button class="position-accordion-head" type="button" data-toggle-rd-similar aria-expanded="' + expanded + '" aria-controls="rdSimilarAccordionPanel">' +
        '<span class="rd-similar-accordion-title"><span>Похожие строки</span><span class="rd-detail-count" title="Количество похожих строк">' + similarRows.length + '</span></span>' +
        '<span class="position-accordion-icon" aria-hidden="true">' + renderAccordionArrowIcon(expanded) + '</span>' +
      '</button>' +
      '<div class="position-accordion-panel" id="rdSimilarAccordionPanel">' +
        renderRdSimilarRows(change, expanded) +
      '</div>' +
    '</section>' +
    renderRdActionCard(change) +
    renderCommentsAccordion(commentContext, {
      mode: "rd",
      idPrefix: "rd",
      emptyDescription: "Оставьте заметку для коллег или зафиксируйте решение по этому изменению РД.",
      inputPlaceholder: "Напишите комментарий к изменению..."
    }) +
  '</div>';
}

function renderRdBulkFooter() {
  const footer = document.getElementById("rdBulkFooter");
  if (!footer) return;
  const warnings = getFilteredRdChanges("warnings");
  if (state.review.rdBulkMode) {
    const selectedCount = warnings.filter((change) => state.review.rdBulkSelectedIds.has(change.id)).length;
    footer.hidden = false;
    footer.innerHTML = '<button class="rd-bulk-secondary" type="button" data-rd-bulk-action="exit">Отмена</button>' +
      '<button class="rd-bulk-primary" type="button" data-rd-bulk-action="apply-selected"' + (selectedCount ? '' : ' disabled aria-disabled="true"') + '>' + renderRdDecisionIcon("apply") + '<span>Применить выбранные (' + selectedCount + ')</span></button>';
    return;
  }
  const visible = state.review.rdActiveFilter === "warnings" && warnings.length > 0;
  footer.hidden = !visible;
  if (!visible) {
    footer.innerHTML = "";
    return;
  }
  footer.innerHTML = '<button class="rd-bulk-secondary" type="button" data-rd-bulk-action="request-cancel-all">' + renderRdDecisionIcon("cancel") + '<span>Отменить все</span></button>' +
    '<button class="rd-bulk-secondary" type="button" data-rd-bulk-action="enter-apply">' + renderRdDecisionIcon("select") + '<span>Выбрать для применения</span></button>';
}

function renderRdCancelAllDialog() {
  const root = document.getElementById("rdBulkDialogRoot");
  if (!root) return;
  const count = getFilteredRdChanges("warnings").length;
  const open = state.review.rdCancelAllDialogOpen && count > 0;
  root.hidden = !open;
  if (!open) {
    root.innerHTML = "";
    return;
  }
  root.innerHTML = '<div class="rd-bulk-dialog-backdrop" data-rd-bulk-dialog-backdrop>' +
    '<section class="rd-bulk-dialog" role="dialog" aria-modal="true" aria-labelledby="rdBulkDialogTitle" aria-describedby="rdBulkDialogDescription">' +
      '<span class="rd-bulk-dialog-icon" aria-hidden="true">' + renderRdDecisionIcon("cancel") + '</span>' +
      '<div class="rd-bulk-dialog-copy"><h3 id="rdBulkDialogTitle">Отменить все изменения?</h3><p id="rdBulkDialogDescription">Все изменения, требующие решения (' + count + '), будут перенесены в «Решённые» со статусом «Отменено». Дальнейшую корректировку потребуется выполнить вручную в документе. Вернуть решения в предупреждения в текущей версии нельзя.</p></div>' +
      '<div class="rd-bulk-dialog-actions"><button type="button" data-rd-bulk-dialog-action="close">Вернуться</button><button class="primary" type="button" data-rd-bulk-dialog-action="confirm-cancel-all">Отменить все (' + count + ')</button></div>' +
    '</section>' +
  '</div>';
  requestAnimationFrame(() => root.querySelector('[data-rd-bulk-dialog-action="close"]')?.focus());
}

function enterRdBulkApplyMode() {
  const warnings = getFilteredRdChanges("warnings");
  if (!warnings.length) return;
  state.review.rdBulkRestoreState = {
    activeFilter: state.review.rdActiveFilter,
    selectedChangeId: state.review.rdSelectedChangeId,
    changesExpanded: state.review.rdChangesExpanded
  };
  state.review.rdBulkMode = true;
  state.review.rdBulkSelectedIds = new Set(warnings.map((change) => change.id));
  state.review.rdActiveFilter = "warnings";
  state.review.rdChangesExpanded = true;
  state.review.rdCancelAllDialogOpen = false;
  renderReviewUi();
  requestAnimationFrame(() => document.querySelector(".rd-bulk-select-all")?.focus({ preventScroll: true }));
}

function exitRdBulkApplyMode({ render = true } = {}) {
  const restore = state.review.rdBulkRestoreState;
  state.review.rdBulkMode = false;
  state.review.rdBulkSelectedIds = new Set();
  state.review.rdBulkRestoreState = null;
  state.review.rdCancelAllDialogOpen = false;
  if (restore) {
    state.review.rdActiveFilter = restore.activeFilter;
    state.review.rdSelectedChangeId = restore.selectedChangeId;
    state.review.rdChangesExpanded = restore.changesExpanded;
  }
  ensureRdReviewSelection();
  if (render) renderReviewUi();
}

function syncRdBulkSelectionUi() {
  const warnings = getFilteredRdChanges("warnings");
  document.querySelectorAll("#rdReviewList [data-rd-change-card]").forEach((card) => {
    const change = getRdChange(card.dataset.rdChangeCard);
    if (!change) return;
    const selected = state.review.rdBulkSelectedIds.has(change.id);
    card.classList.toggle("bulk-selected", selected);
    const toggle = card.querySelector("[data-rd-bulk-toggle]");
    toggle?.setAttribute("aria-pressed", String(selected));
    toggle?.setAttribute("aria-label", (selected ? "Снять выбор: " : "Выбрать: ") + change.rowNumber + " " + change.name);
    const checkbox = card.querySelector(".rd-bulk-checkbox");
    if (checkbox) {
      checkbox.classList.toggle("selected", selected);
      checkbox.innerHTML = selected ? '<svg viewBox="0 0 16 16" focusable="false" aria-hidden="true"><path d="m3.5 8 2.7 2.7L12.5 4.5"></path></svg>' : "";
    }
  });
  renderRdReviewFilters();
  renderRdBulkFooter();
  const selectedCount = warnings.filter((change) => state.review.rdBulkSelectedIds.has(change.id)).length;
  document.getElementById("rdReviewList")?.setAttribute("aria-label", "Выбор изменений РД для применения: " + selectedCount + " из " + warnings.length);
}

function toggleRdBulkSelection(changeId) {
  const change = getRdChange(changeId);
  if (!state.review.rdBulkMode || change?.reviewState !== "warning") return;
  if (state.review.rdBulkSelectedIds.has(changeId)) state.review.rdBulkSelectedIds.delete(changeId);
  else state.review.rdBulkSelectedIds.add(changeId);
  syncRdBulkSelectionUi();
}

function toggleAllRdBulkSelections() {
  if (!state.review.rdBulkMode) return;
  const warnings = getFilteredRdChanges("warnings");
  const allSelected = warnings.length > 0 && warnings.every((change) => state.review.rdBulkSelectedIds.has(change.id));
  state.review.rdBulkSelectedIds = allSelected ? new Set() : new Set(warnings.map((change) => change.id));
  syncRdBulkSelectionUi();
}

function applySelectedRdChanges() {
  if (!state.review.rdBulkMode || !state.review.rdBulkSelectedIds.size) return;
  const appliedCount = state.review.rdBulkSelectedIds.size;
  rdChanges.forEach((change) => {
    if (change.reviewState === "warning" && state.review.rdBulkSelectedIds.has(change.id)) change.reviewState = "applied";
  });
  state.review.rdBulkMode = false;
  state.review.rdBulkSelectedIds = new Set();
  state.review.rdBulkRestoreState = null;
  state.review.rdActiveFilter = "warnings";
  state.review.rdSelectedChangeId = getFilteredRdChanges("warnings")[0]?.id || null;
  state.review.rdChangesExpanded = true;
  renderReviewUi();
  showReviewToast({
    tone: "success",
    title: "Изменения применены",
    description: "Применено изменений: " + appliedCount + ". Карточки перенесены в «Решённые»."
  });
}

function openRdCancelAllDialog() {
  if (!getFilteredRdChanges("warnings").length) return;
  state.review.rdCancelAllDialogOpen = true;
  renderRdCancelAllDialog();
}

function closeRdCancelAllDialog() {
  state.review.rdCancelAllDialogOpen = false;
  renderRdCancelAllDialog();
  requestAnimationFrame(() => document.querySelector('[data-rd-bulk-action="request-cancel-all"]')?.focus({ preventScroll: true }));
}

function cancelAllRdChanges() {
  const cancelledChanges = getFilteredRdChanges("warnings");
  const cancelledCount = cancelledChanges.length;
  cancelledChanges.forEach((change) => {
    change.reviewState = "cancelled";
  });
  state.review.rdCancelAllDialogOpen = false;
  state.review.rdActiveFilter = "warnings";
  state.review.rdSelectedChangeId = null;
  state.review.rdChangesExpanded = true;
  renderReviewUi();
  showReviewToast({
    tone: "info",
    title: "Изменения отменены",
    description: "Отменено изменений: " + cancelledCount + ". Карточки перенесены в «Решённые»."
  });
}

function resolveRdChange(decision, changeId = state.review.rdSelectedChangeId) {
  if (!["apply", "cancel"].includes(decision)) return;
  const change = getRdChange(changeId);
  if (!change || change.reviewState !== "warning") return;
  const warningsBefore = getFilteredRdChanges("warnings");
  const currentIndex = warningsBefore.findIndex((item) => item.id === change.id);
  const resolvedSelectedChange = state.review.rdSelectedChangeId === change.id;
  change.reviewState = decision === "apply" ? "applied" : "cancelled";
  const remainingWarnings = getFilteredRdChanges("warnings");
  const nextWarning = remainingWarnings[currentIndex] || remainingWarnings[0] || null;
  state.review.rdEditingCommentId = null;
  if (resolvedSelectedChange && nextWarning) {
    state.review.rdSelectedChangeId = nextWarning.id;
  } else if (resolvedSelectedChange && !nextWarning) {
    state.review.rdActiveFilter = "warnings";
    state.review.rdSelectedChangeId = null;
  }
  renderReviewUi();
  showReviewToast({
    tone: decision === "apply" ? "success" : "info",
    title: decision === "apply" ? "Изменение применено" : "Изменение отменено",
    description: "Строка " + change.rowNumber + " перенесена в «Решённые»."
  });
}

function focusRdVolumeEditTrigger(changeId) {
  requestAnimationFrame(() => document.querySelector('[data-rd-volume-action="start"][data-rd-change-id="' + CSS.escape(changeId) + '"]')?.focus({ preventScroll: true }));
}

function startRdVolumeEdit(changeId) {
  const change = getRdChange(changeId);
  if (!change) return;
  state.review.rdSelectedChangeId = changeId;
  state.review.rdEditingVolumeChangeId = changeId;
  state.review.rdEditingVolumeDraft = "";
  renderReviewUi();
  requestAnimationFrame(() => document.querySelector('[data-rd-volume-input][data-rd-change-id="' + CSS.escape(changeId) + '"]')?.focus({ preventScroll: true }));
}

function cancelRdVolumeEdit(changeId) {
  if (state.review.rdEditingVolumeChangeId !== changeId) return;
  state.review.rdEditingVolumeChangeId = null;
  state.review.rdEditingVolumeDraft = "";
  renderRdReviewList();
  focusRdVolumeEditTrigger(changeId);
}

function confirmRdVolumeEdit(changeId) {
  const change = getRdChange(changeId);
  if (!change || state.review.rdEditingVolumeChangeId !== changeId) return;
  const value = sanitizeRdVolumeDraft(state.review.rdEditingVolumeDraft);
  if (!isValidRdVolumeDraft(value)) {
    document.querySelector('[data-rd-volume-input][data-rd-change-id="' + CSS.escape(changeId) + '"]')?.focus({ preventScroll: true });
    return;
  }
  change.proposedVolume = value.replace(/\./g, ",");
  state.review.rdEditingVolumeChangeId = null;
  state.review.rdEditingVolumeDraft = "";
  renderReviewUi();
  focusRdVolumeEditTrigger(changeId);
}

function setRdReviewFilter(filterKey) {
  if (!rdReviewFilters.some((filter) => filter.key === filterKey)) return;
  state.review.rdActiveFilter = filterKey;
  state.review.rdSelectedChangeId = getFilteredRdChanges(filterKey)[0]?.id || null;
  state.review.rdEditingCommentId = null;
  renderReviewUi();
}

function selectRdChange(changeId) {
  if (!getFilteredRdChanges().some((change) => change.id === changeId)) return;
  state.review.rdSelectedChangeId = changeId;
  state.review.rdEditingCommentId = null;
  renderReviewUi();
}

function selectAdjacentRdChange(direction) {
  const filteredChanges = getFilteredRdChanges();
  if (!filteredChanges.length) return;
  const currentIndex = filteredChanges.findIndex((change) => change.id === state.review.rdSelectedChangeId);
  const nextIndex = currentIndex + (direction === "previous" ? -1 : 1);
  const nextChange = filteredChanges[nextIndex];
  if (!nextChange) return;
  selectRdChange(nextChange.id);
}

function renderReviewDetail() {
  const detail = document.getElementById("reviewDetail");
  if (!detail) return;
  if (!state.review.drawerOpen) {
    detail.innerHTML = "";
    return;
  }
  if (!state.review.selectedIssueId) {
    detail.innerHTML = getActionableReviewItems().length
      ? renderReviewPlaceholder("select")
      : renderReviewPlaceholder("complete");
    return;
  }
  const issue = getReviewIssue(state.review.selectedIssueId);
  if (!issue) {
    detail.innerHTML = renderReviewPlaceholder("select");
    return;
  }

  state.review.selectedIssueId = issue.id;
  if (isUnrecognizedIssue(issue)) {
    renderUnrecognizedIssueDetail(detail, issue);
    return;
  }
  const renderIssue = getIssueWithDraft(issue);
  const row = findRow(rows, issue.rowId);
  const sourceRow = getIssueSourceRow(issue);
  const decision = getIssueDecision(issue);
  const candidates = getIssueCandidates(issue);
  const threshold = decision?.threshold ?? projectData.thresholdSettings?.[row?.type] ?? 0.85;
  const metrics = getIssueMetrics(renderIssue, row, decision, sourceRow);
  const resultFields = getAsorResultFields(row);
  const referenceQuery = state.review.referenceQuery.trim().toLowerCase();
  const filteredCandidates = candidates.filter((candidate) => {
    const candidateText = [candidate.name, candidate.code, candidate.reason, candidate.entityType].join(" ").toLowerCase();
    const matchesQuery = !referenceQuery || candidateText.includes(referenceQuery);
    return matchesQuery;
  });
  const selectedValue = String(getEffectiveSelectedValue(issue) || "").trim();
  const isSelectedCandidate = (candidate) => selectedValue && candidate.name.trim().toLowerCase() === selectedValue.toLowerCase();
  const visibleCandidates = filteredCandidates;
  const alternatives = visibleCandidates.length
    ? visibleCandidates
        .map((candidate) => {
          const isSelected = isSelectedCandidate(candidate);
          const actionAttr = candidate.id ? ' data-candidate-id="' + escapeAttr(candidate.id) + '" role="button" tabindex="0"' : "";
          return '<li class="candidate-item' + (isSelected ? ' selected' : '') + '"' + actionAttr + ' aria-pressed="' + String(isSelected) + '"><div class="candidate-copy"><div class="candidate-top"><strong>' + escapeAttr(candidate.name) + '</strong><span class="candidate-meta"><b class="candidate-code">' + escapeAttr(candidate.code || candidate.entityType) + '</b><b class="candidate-score">' + Math.round(candidate.confidence * 100) + '%</b></span></div><small>' + escapeAttr(candidate.reason) + '</small></div></li>';
        })
        .join("")
    : renderIssue.alternatives.length
      ? renderIssue.alternatives.map((item) => '<li><strong>' + escapeAttr(item) + '</strong><span>без оценки</span></li>').join("")
      : "<li>Нет надежных альтернатив</li>";
  const referenceEmpty = candidates.length && !visibleCandidates.length ? '<li class="candidate-empty">Нет кандидатов по этому поиску.</li>' : "";

  const footerState = getReviewFooterState(issue);
  const manualDisabled = !isManualReviewAvailable(issue);
  const draft = getIssueDraft(issue.id);
  const hasDraftChange = Boolean(draft?.changed);
  const matchResetControl = hasDraftChange
    ? '<button class="match-reset-icon" id="matchResetSelection" type="button" title="Сбросить к исходному значению" aria-label="Сбросить к исходному значению">' + renderAiStatusIcon("reset") + '</button>'
    : "";

  detail.innerHTML = '<div class="detail-card ' + issue.severity + '">' +
    '<div class="detail-content">' +
      '<div class="detail-summary">' +
        '<div class="normalization-panel ' + (state.review.matchExpanded ? 'expanded' : 'collapsed') + '">' +
          '<button class="match-panel-head" id="matchAccordionToggle" type="button" aria-label="Показать или скрыть варианты из справочника" aria-expanded="' + String(state.review.matchExpanded) + '">' +
            '<span>Сопоставление АНР с АСОР</span>' +
            '<div class="match-head-tags" aria-label="Состояние и параметр сопоставления">' + renderMatchHeadTags(metrics, issue, row) + '</div>' +
            '<div class="match-head-metrics" aria-label="Метрики сопоставления">' +
              '<b class="match-chip confidence" title="Уверенность"><i aria-hidden="true">✓</i>' + metrics.confidence + '%</b>' +
              '<b class="match-chip threshold" title="Порог"><i aria-hidden="true">≥</i>' + metrics.threshold + '%</b>' +
            '</div>' +
            '<span class="position-accordion-icon" aria-hidden="true">' + renderAccordionArrowIcon(state.review.matchExpanded) + '</span>' +
          '</button>' +
          '<div class="match-panel-body">' +
            '<div class="issue-flow" aria-label="Сопоставление значения АНР и выбранного значения АСОР">' +
              '<div class="issue-flow-side"><small>Значение АНР</small><span class="issue-flow-value" title="' + escapeAttr(metrics.sourceValue) + '">' + escapeAttr(metrics.sourceValue) + '</span></div>' +
              '<div class="issue-flow-switch" aria-hidden="true"><img src="assets/icons/arrow-left-right.svg" alt=""></div>' +
              '<div class="issue-flow-side selected-asor-side' + (hasDraftChange ? ' has-reset' : '') + '"><div class="issue-flow-selected-head"><small>Предложено ИИ в АСОР</small><span class="match-selected-actions">' + matchResetControl + '</span></div><span class="issue-flow-value" title="' + escapeAttr(metrics.selectedValue) + '">' + escapeAttr(metrics.selectedValue) + '</span></div>' +
            '</div>' +
            '<div class="match-reference-area">' +
              '<div class="match-reference-tools">' +
                '<label class="reference-search-wrap" aria-label="Поиск по кандидатам"><span class="reference-search-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="m21 21-4.3-4.3"></path><path d="M10.8 18a7.2 7.2 0 1 0 0-14.4 7.2 7.2 0 0 0 0 14.4Z"></path></svg></span><input class="reference-search" id="referenceSearch" type="search" value="' + escapeAttr(state.review.referenceQuery) + '" placeholder="Введите значение"></label>' +
              '</div>' +
              '<ul class="candidate-list match-candidate-list">' + (referenceEmpty || alternatives) + '</ul>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="analysis-column">' +
        '<section class="result-ai-panel ' + (state.review.resultExpanded ? 'expanded' : 'collapsed') + '">' +
          '<button class="result-ai-head" id="resultAccordionToggle" type="button" aria-expanded="' + String(state.review.resultExpanded) + '">' +
            '<span class="result-title-with-help"><span>Логика сопоставления</span>' + renderMatchingHelpTooltip() + '</span>' +
            '<span class="position-accordion-icon" aria-hidden="true">' + renderAccordionArrowIcon(state.review.resultExpanded) + '</span>' +
          '</button>' +
          '<div class="result-ai-body">' +
            '<div class="source-result-grid">' + resultFields.map((field) => '<span>' + field.label + '</span><strong title="' + escapeAttr(field.value) + '">' + escapeAttr(field.value) + '</strong>').join("") + '</div>' +
          '</div>' +
        '</section>' +
        '<div class="detail-section info-card action-section"><div class="info-card-head"><span class="info-card-icon action" aria-hidden="true">' + renderInfoCardIcon("action") + '</span><h4>Что делать</h4></div><p>' + escapeAttr(getActionCardText(issue, metrics)) + '</p></div>' +
        renderCommentsAccordion(issue) +
      '</div>' +
    '</div>' +
    '<div class="detail-actions">' +
      '<button class="review-secondary-action" type="button" data-review-action="cancel">Отмена</button>' +
      '<span class="detail-actions-spacer" aria-hidden="true"></span>' +
      '<button class="review-manual-action is-demo-hidden" type="button" data-review-action="manual" ' + (manualDisabled ? 'disabled' : '') + '>Ручной разбор</button>' +
      '<button class="review-primary-action" type="button" data-review-action="commit" ' + (footerState.disabled ? 'disabled' : '') + '>' + footerState.label + '</button>' +
    '</div>' +
  '</div>';
}

function renderUnrecognizedIssueDetail(detail, issue) {
  const sourceRow = getIssueSourceRow(issue) || {};
  const sourceFields = [
    { label: "Номер строки АНР", value: sourceRow.rowNumber || issue.sourceAnrRowId || "Не определено" },
    { label: "Наименование", value: sourceRow.rawText || issue.sourceValue || "Не определено" },
    { label: "Ед. изм.", value: sourceRow.unit || "Не указана" },
    { label: "Объем", value: sourceRow.quantity || "Не указан" }
  ];
  const manualDisabled = !isManualReviewAvailable(issue);
  detail.innerHTML = '<div class="detail-card error unrecognized-detail">' +
    '<div class="detail-content">' +
      '<div class="analysis-column">' +
        '<section class="result-ai-panel expanded">' +
          '<div class="result-ai-head static-head">' +
            '<span>Исходная строка АНР</span>' +
            '<span class="issue-tag error">Не распознано</span>' +
          '</div>' +
          '<div class="result-ai-body">' +
            '<div class="source-result-grid">' + sourceFields.map((field) => '<span>' + field.label + '</span><strong title="' + escapeAttr(field.value) + '">' + escapeAttr(field.value) + '</strong>').join("") + '</div>' +
            '<div class="result-reason"><h4>Почему не применено</h4><p class="reason-card-text expanded">' + escapeAttr(issue.reason || issue.description || "ИИ не смог надежно определить группу, вид работ или материал для переноса строки АНР в АСОР.") + '</p></div>' +
          '</div>' +
        '</section>' +
        '<div class="detail-section info-card action-section"><div class="info-card-head"><span class="info-card-icon action" aria-hidden="true">' + renderInfoCardIcon("action") + '</span><h4>Что делать</h4></div><p>' + escapeAttr(issue.recommendedAction || "Проверьте исходную строку АНР и отправьте ее на ручной разбор для создания корректной позиции в АСОР.") + '</p></div>' +
        renderCommentsAccordion(issue) +
      '</div>' +
    '</div>' +
    '<div class="detail-actions">' +
      '<button class="review-secondary-action" type="button" data-review-action="cancel">Отмена</button>' +
      '<span class="detail-actions-spacer" aria-hidden="true"></span>' +
      '<button class="review-manual-action is-demo-hidden" type="button" data-review-action="manual" ' + (manualDisabled ? 'disabled' : '') + '>Ручной разбор</button>' +
      '<button class="review-primary-action" type="button" data-review-action="commit" disabled>Подтвердить</button>' +
    '</div>' +
  '</div>';
}

function renderAiReasoningOverlay(issue, row, metrics, steps) {
  if (!state.review.aiLogicOpen) return "";
  const items = steps.length ? steps : [{
    title: "Логика сопоставления не передана",
    result: "Для этой позиции нет детального журнала рассуждений ИИ.",
    confidence: 0,
    key: "missingLogic"
  }];
  const list = items
    .map((step, index) => renderAiReasoningEvent(step, index, issue, row, metrics))
    .join("");
  return '<section class="ai-reasoning-overlay" id="aiReasoningOverlay" aria-label="История рассуждения ИИ">' +
    '<div class="ai-reasoning-panel" role="dialog" aria-modal="true" aria-labelledby="aiReasoningTitle">' +
      '<div class="ai-reasoning-head">' +
        '<div><span>История рассуждения ИИ</span><h3 id="aiReasoningTitle">Строка ' + escapeAttr(row?.number || issue.rowId) + '</h3></div>' +
        '<button class="ai-reasoning-close" type="button" id="aiLogicClose" aria-label="Вернуться к проверке">×</button>' +
      '</div>' +
      '<div class="ai-reasoning-summary">' +
        '<span>Сопоставление</span><strong title="' + escapeAttr(metrics.selectedValue) + '">' + escapeAttr(metrics.selectedValue) + '</strong><b>' + metrics.confidence + '%</b>' +
      '</div>' +
      '<ol class="ai-reasoning-list">' + list + '</ol>' +
    '</div>' +
  '</section>';
}

function renderAiReasoningEvent(step, index, issue, row, metrics) {
  const confidence = Math.round((step.confidence || 0) * 100);
  const statusClass = getReasoningStatusClass(step, issue);
  const operation = getReasoningOperation(step, issue);
  const lineNumber = String(index + 1).padStart(2, "0");
  const params = getReasoningTraceParams(step, metrics, confidence);
  return '<li class="ai-reasoning-event ' + statusClass + '">' +
    '<div class="reasoning-log-line">' +
      '<span class="reasoning-line-no">' + lineNumber + '</span>' +
      '<code>' + escapeAttr(operation) + '</code>' +
    '</div>' +
    '<div class="reasoning-log-title">' + escapeAttr(step.title) + '</div>' +
    '<p>' + escapeAttr(step.result) + '</p>' +
    '<div class="reasoning-param-row">' + params + '</div>' +
  '</li>';
}

function getReasoningStatusClass(step, issue) {
  const key = String(step.key || "").toLowerCase();
  if (key.includes("review")) return issue.severity === "error" ? "critical" : "warning";
  if (key.includes("threshold") && issue.severity === "warning") return "warning";
  return "process";
}

function getReasoningOperation(step, issue) {
  const key = String(step.key || "").toLowerCase();
  if (key.includes("normal")) return "НОРМАЛИЗАЦИЯ";
  if (key.includes("threshold")) return "ПОРОГ";
  if (key.includes("selected")) return "ВЫБОР_КАНДИДАТА";
  if (key.includes("previous")) return "ПРЕДЫДУЩИЙ_АСОР";
  if (key.includes("neighbor")) return "СОСЕДНИЕ_СТРОКИ";
  if (key.includes("trigram") || key.includes("reference")) return "СПРАВОЧНИК_ТРИГРАММЫ";
  if (key.includes("entity")) return "ТИП_СУЩНОСТИ";
  if (key.includes("missing")) return "НЕТ_ДАННЫХ";
  if (key.includes("review") || issue.severity === "error") return "РАЗРЕШЕНИЕ_КОЛЛИЗИИ";
  return "ЭТАП_СОПОСТАВЛЕНИЯ";
}

function getReasoningTraceParams(step, metrics, confidence) {
  const params = [["confidence", confidence + "%"]];
  if (step.key === "thresholdCheck") params.push(["threshold", metrics.threshold + "%"]);
  if (step.key === "selectedValueCheck") params.push(["selected", metrics.selectedValue]);
  return params
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => '<span><b>' + escapeAttr(key) + '</b>=<em>"' + escapeAttr(value) + '"</em></span>')
    .join("");
}

function getReferenceTypeLabel(type) {
  const labels = {
    group: "Группа",
    work: "Вид работ",
    material: "Материал"
  };
  return labels[type] || "Справочник";
}

function getAiReasoningSteps(issue, decision, metrics) {
  const baseSteps = (decision?.steps || []).map((step) => ({ ...step }));
  const fallbackSteps = [
    {
      key: "sourceNormalization",
      title: "Нормализация исходной строки",
      result: "Система очистила формулировку АНР и выделила признаки для поиска.",
      confidence: Math.min((issue.confidence ?? decision?.confidence ?? 0.6) + 0.04, 0.98)
    },
    {
      key: "entityScope",
      title: "Определение типа справочника",
      result: "ИИ определил, какой тип сущности нужно сопоставить: группа, вид работ, материал или значение.",
      confidence: Math.min((decision?.confidence ?? issue.confidence ?? 0.6) + 0.02, 0.96)
    },
    {
      key: "thresholdCheck",
      title: "Проверка порога уверенности",
      result: "Уверенность сопоставления сравнивалась с порогом " + metrics.threshold + "%.",
      confidence: decision?.threshold ?? 0.85
    },
    {
      key: "selectedValueCheck",
      title: "Проверка выбранного значения",
      result: "Выбранное значение в АСОР сверено с исходной строкой и найденными кандидатами.",
      confidence: issue.confidence ?? decision?.confidence ?? 0.6
    },
    {
      key: "reviewSignal",
      title: "Формирование сигнала проверки",
      result: issue.severity === "error"
        ? "Так как надежное сопоставление не найдено, строка требует исправления."
        : "Так как уверенность ниже или близка к порогу, создано предупреждение для сметчика.",
      confidence: issue.confidence ?? decision?.confidence ?? 0.6
    }
  ];
  const existingKeys = new Set(baseSteps.map((step) => step.key));
  for (const step of fallbackSteps) {
    if (baseSteps.length >= 5) break;
    if (!existingKeys.has(step.key)) baseSteps.push(step);
  }
  return baseSteps;
}

function getIssueMetrics(issue, row, decision, sourceRow) {
  const selectedValue = formatMetricValue(issue.selectedValue, issue.type);
  const sourceValue = issue.sourceValue || sourceRow?.rawText || "Не определено";
  const isNormalization = issue.type === "normalized_value" || /нормализ/i.test(issue.title + issue.description);
  return {
    sourceText: sourceRow?.rawText || sourceValue,
    sourceValue,
    selectedValue,
    confidence: Math.round((issue.confidence ?? decision?.confidence ?? 0) * 100),
    threshold: Math.round((decision?.threshold ?? projectData.thresholdSettings?.[row?.type] ?? 0.85) * 100),
    checkType: issueTypeLabels[issue.type] || issue.type || "Не определено",
    status: statusLabel(issue.status)
  };
}

function getIssueDraft(issueId) {
  return state.review.draftDecisions[issueId] || null;
}

function getEffectiveSelectedValue(issue) {
  return getIssueDraft(issue.id)?.selectedValue ?? issue.selectedValue;
}

function getIssueWithDraft(issue) {
  const draft = getIssueDraft(issue.id);
  if (!draft) return issue;
  return {
    ...issue,
    selectedValue: draft.selectedValue
  };
}

function hasDraftReviewChange(issue) {
  return Boolean(getIssueDraft(issue.id)?.changed);
}

function isFinalReviewStatus(status) {
  return ["confirmed", "resolved", "sent-to-manual", "changed"].includes(status);
}

function isIssueDecisionRequired(issue) {
  if (!issue || isFinalReviewStatus(issue.status)) return false;
  if (hasDraftReviewChange(issue)) return true;
  return isIssueActiveInTable(issue) && ["warning", "error"].includes(issue.severity);
}

function getReviewFooterState(issue) {
  const draft = getIssueDraft(issue.id);
  const selectedValue = String(getEffectiveSelectedValue(issue) || "").trim();
  const hasValidSelection = Boolean(selectedValue) && !/^(не\s+определено|не\s+найдено)/i.test(selectedValue);
  const hasDraftChange = Boolean(draft?.changed);
  const hasActiveCollision = isIssueActiveInTable(issue) && ["warning", "error"].includes(issue.severity);
  const disabled = hasDraftChange
    ? !hasValidSelection
    : (!hasActiveCollision || !hasValidSelection);
  let label = "Подтвердить";
  let mode = "confirm";
  if (hasDraftChange && hasActiveCollision) {
    label = "Подтвердить выбор";
    mode = "confirm-selection";
  } else if (hasDraftChange) {
    label = "Применить изменение";
    mode = "apply-change";
  }
  return {
    label,
    mode,
    disabled
  };
}

function isManualReviewAvailable(issue) {
  return Boolean(issue) && !isFinalReviewStatus(issue.status);
}

function renderMatchHeadTags(metrics, issue, row) {
  return getMatchHeadTags(metrics, issue, row)
    .map((tag) => '<b class="match-chip ' + tag.className + '">' + escapeAttr(tag.label) + '</b>')
    .join("");
}

function getMatchHeadTags(metrics, issue, row) {
  const attributeLabel = getReviewedAttributeLabel(issue, row);
  const rawTags = [
    { label: issue ? reviewStateLabel(issue) : metrics.status, className: getMatchChipClass(issue ? reviewStateLabel(issue) : metrics.status) },
    { label: attributeLabel, className: "attribute" }
  ].filter((tag) => tag.label && tag.label !== "Не определено");

  const seen = new Set();
  return rawTags.filter((tag) => {
    const key = String(tag.label).trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getReviewedAttributeLabel(issue, row) {
  if (!issue) return "";
  const key = issue.cellKey || "";
  if (key === "name") {
    if (row?.type === "group") return "Группа работ";
    if (row?.type === "material") return "Материал";
    return "Вид работ";
  }
  const labels = {
    unit: "Единица измерения",
    materialNo: "Признак номинации",
    norm: "Норма расхода",
    qtyRcc: "Объем по РСС",
    qtyTd: "Объем по ТД",
    done: "Выполненный объем",
    deviation: "Отклонение",
    vat: "НДС",
    noteRcc: "Примечание РСС",
    noteTd: "Примечание ТД",
    basis: "Обоснование",
    remark: "Замечание",
    unitMatContractor: "Цена материала",
    unitMatAuto: "Цена материала",
    unitMatManual: "Цена материала",
    unitMatEstimator: "Цена материала",
    unitSmrContractor: "Стоимость СМР",
    unitSmrAuto: "Стоимость СМР",
    unitSmrManual: "Стоимость СМР",
    unitSmrEstimator: "Стоимость СМР",
    unitTotalContractor: "Стоимость всего",
    unitTotalPlane: "Стоимость всего",
    unitTotalEstimator: "Стоимость всего",
    costMatContractor: "Сумма материала",
    costMatPlane: "Сумма материала",
    costMatEstimator: "Сумма материала",
    costSmrContractor: "Сумма СМР",
    costSmrPlane: "Сумма СМР",
    costSmrEstimator: "Сумма СМР",
    costTotalContractor: "Сумма всего",
    costTotalPlane: "Сумма всего",
    costTotalEstimator: "Сумма всего"
  };
  return labels[key] || "Параметр строки";
}

function getMatchChipClass(label) {
  const normalized = String(label || "").trim().toLowerCase();
  if (normalized.includes("ии")) return "ai";
  if (normalized.includes("ошиб")) return "error";
  if (normalized.includes("ручн")) return "manual";
  if (normalized.includes("пред") || normalized.includes("разбор") || normalized.includes("не пров")) return "warning";
  if (normalized.includes("реш") || normalized.includes("подт") || normalized.includes("изм") || normalized.includes("провер")) return "reviewed";
  return "neutral";
}

function formatMetricValue(value, issueType) {
  if (issueType !== "normalized_value") return displayValue(value);
  return formatEstimateNumber(value);
}

function formatEstimateNumber(value) {
  const text = displayValue(value);
  const match = text.match(/-?\d+(?:[,.]\d+)?/);
  if (!match) return text;
  const number = Number(match[0].replace(",", "."));
  if (!Number.isFinite(number)) return text;
  return number.toLocaleString("ru-RU", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  });
}

function renderMatchingHelpTooltip() {
  return '<span class="matching-help" tabindex="0" aria-label="Справка по логике сопоставления">' +
    '<span class="matching-help-icon" aria-hidden="true">?</span>' +
    '<span class="matching-help-tooltip" role="tooltip">Система сопоставляет строку АНР с АСОР по детерминированным правилам: типу объекта, специализации, группе работ, виду работ, материалу, единице измерения и совпадениям в справочниках.</span>' +
  '</span>';
}

function setupGlobalTooltips() {
  if (document.getElementById("globalTooltip")) return;
  const tooltip = document.createElement("div");
  tooltip.id = "globalTooltip";
  tooltip.className = "global-tooltip";
  tooltip.setAttribute("role", "tooltip");
  tooltip.hidden = true;
  document.body.append(tooltip);

  let activeTarget = null;
  let showTimer = null;

  const normalizeTarget = (target) => {
    if (!(target instanceof Element) || !target.hasAttribute("title")) return;
    const value = target.getAttribute("title")?.trim();
    if (value) target.dataset.tooltip = value;
    target.removeAttribute("title");
  };

  const normalizeTree = (root) => {
    if (!(root instanceof Element) && root !== document) return;
    if (root instanceof Element) normalizeTarget(root);
    root.querySelectorAll?.("[title]").forEach(normalizeTarget);
  };

  const positionTooltip = () => {
    if (!activeTarget || tooltip.hidden || !activeTarget.isConnected) return;
    const targetRect = activeTarget.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const edge = 8;
    const gap = 8;
    let left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
    left = Math.max(edge, Math.min(left, window.innerWidth - tooltipRect.width - edge));
    let top = targetRect.bottom + gap;
    let placement = "bottom";
    if (top + tooltipRect.height > window.innerHeight - edge) {
      top = targetRect.top - tooltipRect.height - gap;
      placement = "top";
    }
    tooltip.dataset.placement = placement;
    tooltip.style.left = Math.round(left) + "px";
    tooltip.style.top = Math.round(Math.max(edge, top)) + "px";
  };

  const hideTooltip = () => {
    clearTimeout(showTimer);
    showTimer = null;
    if (activeTarget?.getAttribute("aria-describedby") === tooltip.id) {
      activeTarget.removeAttribute("aria-describedby");
    }
    activeTarget = null;
    tooltip.hidden = true;
    tooltip.textContent = "";
  };

  const showTooltip = (target, delay = 180) => {
    const text = target?.dataset.tooltip?.trim();
    if (!text) return;
    clearTimeout(showTimer);
    if (activeTarget && activeTarget !== target) hideTooltip();
    activeTarget = target;
    showTimer = setTimeout(() => {
      if (!activeTarget?.isConnected) return hideTooltip();
      tooltip.textContent = text;
      tooltip.hidden = false;
      activeTarget.setAttribute("aria-describedby", tooltip.id);
      positionTooltip();
    }, delay);
  };

  document.addEventListener("mouseover", (event) => {
    const target = event.target.closest?.("[data-tooltip]");
    if (target && !target.contains(event.relatedTarget)) showTooltip(target);
  });
  document.addEventListener("mouseout", (event) => {
    if (activeTarget && !activeTarget.contains(event.relatedTarget)) hideTooltip();
  });
  document.addEventListener("focusin", (event) => {
    const target = event.target.closest?.("[data-tooltip]");
    if (target) showTooltip(target, 0);
  });
  document.addEventListener("focusout", (event) => {
    if (activeTarget && !activeTarget.contains(event.relatedTarget)) hideTooltip();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hideTooltip();
  });
  document.addEventListener("scroll", hideTooltip, true);
  window.addEventListener("resize", hideTooltip);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes") normalizeTarget(mutation.target);
      mutation.addedNodes.forEach((node) => normalizeTree(node));
    });
  });
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["title"] });
  normalizeTree(document);
}

function getAsorResultFields(row) {
  const path = row ? findRowPath(rows, row.id) : [];
  const group = path.find((item) => item.type === "group");
  const work = [...path].reverse().find((item) => item.type === "work");
  const material = row?.type === "material" ? row : null;
  const recognitionKey = getRecognitionKey(row, group, work, material);
  return [
    { label: "Группа работ", value: group?.name || "Не определено" },
    { label: "Вид работ", value: work?.name || "Не определено" },
    { label: "Материал", value: material?.name || "Не определено" },
    { label: "Ед. изм.", value: row?.unit || work?.unit || material?.unit || "Не определено" },
    { label: "Ключ распознавания", value: recognitionKey }
  ];
}

function getRecognitionKey(row, group, work, material) {
  const typeLabels = {
    group: "Группа",
    work: "Работа",
    material: "Материал"
  };
  const objectType = projectData.project?.object || "Объект не определен";
  const specialization = group?.name || "Специализация не определена";
  const unit = row?.unit || work?.unit || material?.unit || "Ед. изм. не определена";
  return [
    `Тип объекта: ${objectType}`,
    `Специализация: ${specialization}`,
    `Тип позиции: ${typeLabels[row?.type] || "Позиция"}`,
    `Группа работ: ${group?.name || "не определено"}`,
    `Вид работ: ${work?.name || "не определено"}`,
    `Материал: ${material?.name || "не определено"}`,
    `Ед. изм.: ${unit}`
  ].join(" / ");
}

function getReviewIssue(issueId) {
  return getReviewItems().find((issue) => issue.id === issueId) || null;
}

function getDefaultReviewIssueId() {
  return getFilteredIssues()[0]?.id || getReviewItems()[0]?.id || null;
}

function getPrimaryIssueForRow(rowId) {
  const rowIssues = issues.filter((issue) => issue.rowId === rowId);
  return rowIssues.find((issue) => issue.severity === "error" && isIssueActiveInTable(issue))
    || rowIssues.find((issue) => issue.severity === "warning" && isIssueActiveInTable(issue))
    || rowIssues.find((issue) => ["confirmed", "resolved", "changed"].includes(issue.status))
    || rowIssues[0]
    || null;
}

function createAiRowReviewItem(row) {
  const id = `ai-row-${row.id}`;
  const selectedValue = state.review.syntheticSelectedValues[id] || row.name;
  const status = state.review.syntheticStatuses[id] || "ai-generated";
  return {
    id,
    rowId: row.id,
    cellKey: "name",
    severity: "clean",
    status,
    type: "ai_generated",
    title: "Строка создана ИИ",
    description: "ИИ создал позицию без активных предупреждений и ошибок.",
    sourceAnrRowId: row.sourceAnrRowId,
    matchDecisionId: row.matchDecisionIds?.[0] || null,
    confidence: 1,
    sourceValue: row.name,
    selectedValue,
    alternatives: [],
    isSynthetic: true
  };
}

function getReviewItems() {
  const allRows = flattenAllRows(rows);
  const aiRows = allRows.filter((row) => ["ai-generated", "mixed"].includes(row.sourceType));
  const createdItems = aiRows.map((row) => getPrimaryIssueForRow(row.id) || createAiRowReviewItem(row));
  const unrecognizedItems = issues.filter(isUnrecognizedIssue);
  return [...createdItems, ...unrecognizedItems];
}

function getFilteredIssues() {
  return getReviewItems().filter((issue) => {
    const row = findRow(rows, issue.rowId);
    if (state.review.activeFilter === "warning") return !isUnrecognizedIssue(issue) && issue.severity === "warning" && isIssueActiveInTable(issue);
    if (state.review.activeFilter === "transfer-error") return isUnrecognizedIssue(issue) && isIssueActiveInTable(issue);
    return row && ["ai-generated", "mixed"].includes(row.sourceType);
  });
}

function isActionableReviewItem(issue) {
  return isIssueDecisionRequired(issue);
}

function getActionableReviewItems() {
  return getReviewItems().filter(isActionableReviewItem);
}

function getReviewCounts() {
  const reviewItems = getReviewItems();
  const createdRows = reviewItems.filter((issue) => {
    const row = findRow(rows, issue.rowId);
    return row && ["ai-generated", "mixed"].includes(row.sourceType);
  }).length;
  const openWarnings = reviewItems.filter((issue) => !isUnrecognizedIssue(issue) && issue.severity === "warning" && isIssueActiveInTable(issue)).length;
  const openTransferErrors = reviewItems.filter((issue) => isUnrecognizedIssue(issue) && isIssueActiveInTable(issue)).length;
  return {
    createdRows,
    openWarnings,
    openTransferErrors,
    openIssues: reviewItems.length
  };
}

function getReviewFilterCount(key, counts) {
  if (key === "warning") return counts.openWarnings;
  if (key === "transfer-error") return counts.openTransferErrors;
  return counts.createdRows;
}

function isUnrecognizedIssue(issue) {
  return issue?.type === "unrecognized_anr_row" || (!issue?.rowId && Boolean(issue?.sourceAnrRowId));
}

function severityLabel(severity) {
  if (severity === "clean") return "Создано ИИ";
  return severity === "error" ? "Ошибка" : "Предупреждение";
}

function reviewStateLabel(issue) {
  if (issue?.status === "sent-to-manual") return "Ручной разбор";
  if (isUnrecognizedIssue(issue)) return "Не распознано";
  return severityLabel(issue?.severity);
}

function reviewStateClass(issue) {
  if (issue?.status === "sent-to-manual") return "manual";
  return issue?.severity || "";
}

function getHeaderGuidance(issue) {
  if (!issue) return "";
  if (issue.status === "resolved") return "Коллизия закрыта, можно перейти к следующей";
  if (issue.status === "confirmed") return "Сопоставление подтверждено, можно перейти к следующей";
  if (issue.status === "changed") return "Значение изменено вручную, позиция обработана";
  if (issue.status === "ai-generated") return "Строка создана ИИ без активных предупреждений";
  if (issue.status === "sent-to-manual") return "Позиция отправлена на ручной разбор";
  if (isUnrecognizedIssue(issue)) return "Исходная строка АНР не применена в АСОР, требуется ручная проверка";
  if (issue.severity === "clean") return "Строка создана ИИ без активных предупреждений";
  return issue.severity === "error"
    ? "Нужно исправить сопоставление перед завершением проверки"
    : "Нужно проверить сопоставление, предложенное ИИ";
}

function statusLabel(status) {
  const labels = {
    open: "не проверено",
    confirmed: "подтверждено",
    changed: "изменено",
    "ai-generated": "Создано ИИ",
    "sent-to-manual": "ручной разбор",
    resolved: "решено"
  };
  return labels[status] || status;
}

function getReviewCopy(issue) {
  const typeLabel = issueTypeLabels[issue.type] || issue.type || "Проверка позиции";
  const baseDescription = issue.description || "Позиция требует проверки результата сопоставления.";

  if (isUnrecognizedIssue(issue)) {
    return {
      shortDescription: `${typeLabel} · строка не применена в АСОР`,
      detailDescription: `${baseDescription} Проверьте исходные параметры АНР и отправьте строку на ручной разбор для создания корректной позиции.`
    };
  }

  if (issue.status === "resolved") {
    return {
      shortDescription: `${typeLabel} · решено`,
      detailDescription: `${baseDescription} Решение по позиции закрыто, дополнительных действий по этой коллизии не требуется.`
    };
  }

  if (issue.status === "confirmed") {
    return {
      shortDescription: `${typeLabel} · подтверждено`,
      detailDescription: `${baseDescription} Сметчик подтвердил предложенное сопоставление, поэтому позиция считается проверенной.`
    };
  }

  if (issue.status === "changed") {
    return {
      shortDescription: `${typeLabel} · значение изменено`,
      detailDescription: `${baseDescription} Пользователь выбрал другое значение из справочника, изменение применено и позиция считается обработанной.`
    };
  }

  if (issue.status === "sent-to-manual") {
    return {
      shortDescription: `${typeLabel} · ручной разбор`,
      detailDescription: `${baseDescription} Позиция отправлена на ручной разбор, потому что автоматическое сопоставление требует дополнительной проверки.`
    };
  }

  if (issue.severity === "clean" || issue.status === "ai-generated") {
    return {
      shortDescription: "Создано ИИ · без активных предупреждений",
      detailDescription: "ИИ создал позицию без активных предупреждений и ошибок. Проверьте результат при необходимости или переходите к следующей позиции."
    };
  }

  if (issue.severity === "error") {
    return {
      shortDescription: `${typeLabel} · требуется исправление`,
      detailDescription: `${baseDescription} Выберите корректное значение из справочника или отправьте позицию на ручной разбор.`
    };
  }

  return {
    shortDescription: `${typeLabel} · требуется проверка`,
    detailDescription: `${baseDescription} Проверьте выбранное сопоставление и подтвердите его либо выберите более точный вариант из справочника.`
  };
}

function refreshRowReviewStatuses() {
  walkRows(rows, (row) => {
    row.issueIds = issues.filter((issue) => issue.rowId === row.id).map((issue) => issue.id);
    const rowIssues = issues.filter((issue) => issue.rowId === row.id);
    const hasOpenError = rowIssues.some((issue) => issue.severity === "error" && isIssueActiveInTable(issue));
    const hasOpenWarning = rowIssues.some((issue) => issue.severity === "warning" && isIssueActiveInTable(issue));
    const hasManual = rowIssues.some((issue) => issue.status === "sent-to-manual");
    const hasReviewed = rowIssues.length > 0 && rowIssues.every((issue) => !isIssueActiveInTable(issue));
    if (hasManual) row.reviewStatus = "manual-review";
    else if (hasOpenError) row.reviewStatus = "error";
    else if (hasOpenWarning) row.reviewStatus = "warning";
    else if (hasReviewed) row.reviewStatus = "reviewed";
    else row.reviewStatus = "clean";
  });
}

function applyReviewMetadata() {
  walkRows(rows, (row, parentId) => {
    row.parentId = row.parentId || parentId || null;
    row.sourceType = row.sourceType || "manual";
    row.sourceAnrRowId = row.sourceAnrRowId || null;
    row.matchDecisionIds = row.matchDecisionIds || [];
    row.valueSources = row.valueSources || {};
  });
}

function walkRows(items, callback, parentId = null) {
  items.forEach((row) => {
    callback(row, parentId);
    if (row.children) walkRows(row.children, callback, row.id);
  });
}

function openReviewDrawer(issueId = null) {
  window.closeAIDrawer?.();
  if (issueId) state.review.activeMode = "anr";
  const nextIssueId = state.review.activeMode === "anr" ? (issueId || getDefaultReviewIssueId()) : null;
  state.review.drawerOpen = true;
  if (nextIssueId) {
    state.review.selectedIssueId = nextIssueId;
    resetReviewAccordions();
  }
  renderReviewUi();
  if (nextIssueId) navigateToIssue(nextIssueId);
}

function closeReviewDrawer() {
  if (state.review.rdBulkMode) exitRdBulkApplyMode({ render: false });
  state.review.rdCancelAllDialogOpen = false;
  state.review.drawerOpen = false;
  state.review.selectedIssueId = null;
  state.review.highlightedRowId = null;
  state.review.highlightedCellKey = null;
  state.review.draftDecisions = {};
  resetReviewAccordions({ includePositions: true });
  renderReviewUi();
  renderBody();
}

function selectIssue(issueId) {
  state.review.activeMode = "anr";
  state.review.selectedIssueId = issueId;
  state.review.drawerOpen = true;
  resetReviewAccordions();
  navigateToIssue(issueId);
  renderReviewUi();
}

function navigateToIssue(issueId) {
  const issue = getReviewIssue(issueId);
  if (!issue) return;
  if (isUnrecognizedIssue(issue) || !issue.rowId) {
    state.review.highlightedRowId = null;
    state.review.highlightedCellKey = null;
    renderBody();
    return;
  }
  revealRow(issue.rowId);
  state.review.highlightedRowId = issue.rowId;
  state.review.highlightedCellKey = issue.cellKey;
  renderBody();
  requestAnimationFrame(() => {
    const rowEl = document.querySelector(`tr[data-id="${CSS.escape(issue.rowId)}"]`);
    const cellEl = rowEl?.querySelector(`[data-cell="${CSS.escape(issue.cellKey)}"]`);
    scrollTableToTarget(rowEl, cellEl);
  });
}

function navigateToRdChangeRow(rowId) {
  if (!rowId || !findRow(rows, rowId)) return;
  revealRow(rowId);
  state.review.highlightedRowId = rowId;
  state.review.highlightedCellKey = null;
  renderBody();
  requestAnimationFrame(() => {
    const rowEl = document.querySelector(`tr[data-id="${CSS.escape(rowId)}"]`);
    scrollTableToTarget(rowEl);
  });
}

function getTableStickyHeaderHeight() {
  const tableHead = document.getElementById("tableHead");
  const height = tableHead?.getBoundingClientRect().height || 0;
  return Math.max(72, Math.round(height));
}

function scrollTableToTarget(rowEl, cellEl = null) {
  const scrollEl = document.getElementById("tableScroll");
  if (!scrollEl || !rowEl) return;

  const scrollRect = scrollEl.getBoundingClientRect();
  const rowRect = rowEl.getBoundingClientRect();
  const headerHeight = getTableStickyHeaderHeight();
  const verticalGap = 16;
  const horizontalGap = 24;

  const rowTop = rowRect.top - scrollRect.top + scrollEl.scrollTop;
  const rowBottom = rowTop + rowRect.height;
  const visibleTop = scrollEl.scrollTop + headerHeight + verticalGap;
  const visibleBottom = scrollEl.scrollTop + scrollEl.clientHeight - verticalGap;

  let nextTop = scrollEl.scrollTop;
  if (rowTop < visibleTop || rowBottom > visibleBottom) {
    nextTop = rowTop - headerHeight - verticalGap;
  }

  let nextLeft = scrollEl.scrollLeft;
  if (cellEl) {
    const cellRect = cellEl.getBoundingClientRect();
    const cellLeft = cellRect.left - scrollRect.left + scrollEl.scrollLeft;
    const cellRight = cellLeft + cellRect.width;
    const visibleLeft = scrollEl.scrollLeft + horizontalGap;
    const visibleRight = scrollEl.scrollLeft + scrollEl.clientWidth - horizontalGap;

    if (cellLeft < visibleLeft) {
      nextLeft = cellLeft - horizontalGap;
    } else if (cellRight > visibleRight) {
      nextLeft = cellRight - scrollEl.clientWidth + horizontalGap;
    }
  }

  scrollEl.scrollTo({
    top: Math.max(0, nextTop),
    left: Math.max(0, nextLeft),
    behavior: "smooth"
  });
}

function revealRow(rowId) {
  const path = findRowPath(rows, rowId);
  path.slice(0, -1).forEach((row) => {
    row.expanded = true;
  });
}

function findRowPath(items, rowId, path = []) {
  for (const row of items) {
    const nextPath = [...path, row];
    if (row.id === rowId) return nextPath;
    if (row.children) {
      const childPath = findRowPath(row.children, rowId, nextPath);
      if (childPath.length) return childPath;
    }
  }
  return [];
}

function updateIssueStatus(action) {
  if (action === "cancel") {
    cancelReviewDecision();
    return;
  }
  if (action === "commit") {
    commitReviewDecision();
    return;
  }
  const issue = issues.find((item) => item.id === state.review.selectedIssueId) || getReviewIssue(state.review.selectedIssueId);
  if (!issue) return;
  if (action === "manual" && !isManualReviewAvailable(issue)) return;
  const nextIssueId = ["confirm", "resolve", "manual"].includes(action) ? getNextActionableIssueId(issue.id) : null;
  const storedIssue = issues.find((item) => item.id === issue.id);
  const setStatus = (status) => {
    issue.status = status;
    if (storedIssue) storedIssue.status = status;
    else state.review.syntheticStatuses[issue.id] = status;
  };
  if (action === "confirm") setStatus("confirmed");
  if (action === "change") {
    setStatus("changed");
    const firstCandidate = getIssueCandidates(issue)[0];
    if (firstCandidate) {
      issue.selectedValue = firstCandidate.name;
      if (storedIssue) storedIssue.selectedValue = firstCandidate.name;
      else state.review.syntheticSelectedValues[issue.id] = firstCandidate.name;
    } else if (issue.alternatives[0]) {
      issue.selectedValue = issue.alternatives[0];
      if (storedIssue) storedIssue.selectedValue = issue.alternatives[0];
      else state.review.syntheticSelectedValues[issue.id] = issue.alternatives[0];
    }
  }
  if (action === "manual") setStatus("sent-to-manual");
  if (action === "resolve") setStatus("resolved");
  reviewActions.push({
    id: `action-${issue.id}-${reviewActions.length + 1}`,
    issueId: issue.id,
    rowId: issue.rowId,
    action: issue.status,
    actor: "Сметчик",
    createdAt: new Date().toISOString()
  });
  renderBody();
  if (["confirm", "resolve", "manual"].includes(action)) {
    selectNextActiveIssue(nextIssueId);
  } else {
    renderReviewUi();
  }
}

function cancelReviewDecision() {
  const issueId = state.review.selectedIssueId;
  if (issueId && state.review.draftDecisions[issueId]) {
    delete state.review.draftDecisions[issueId];
    renderReviewUi();
    return;
  }
  closeReviewDrawer();
}

function commitReviewDecision() {
  const issue = issues.find((item) => item.id === state.review.selectedIssueId) || getReviewIssue(state.review.selectedIssueId);
  if (!issue) return;
  const footerState = getReviewFooterState(issue);
  if (footerState.disabled) return;

  const draft = getIssueDraft(issue.id);
  const nextIssueId = getNextActionableIssueId(issue.id);
  const storedIssue = issues.find((item) => item.id === issue.id);
  const selectedValue = draft?.selectedValue ?? issue.selectedValue;
  const nextStatus = footerState.mode === "confirm" ? "confirmed" : "changed";

  if (storedIssue) {
    if (selectedValue) storedIssue.selectedValue = selectedValue;
    storedIssue.status = nextStatus;
  } else {
    if (selectedValue) state.review.syntheticSelectedValues[issue.id] = selectedValue;
    state.review.syntheticStatuses[issue.id] = nextStatus;
  }

  delete state.review.draftDecisions[issue.id];
  reviewActions.push({
    id: `action-${issue.id}-${reviewActions.length + 1}`,
    issueId: issue.id,
    rowId: issue.rowId,
    action: footerState.mode,
    selectedValue,
    actor: "Сметчик",
    createdAt: new Date().toISOString()
  });

  renderBody();
  selectNextActiveIssue(nextIssueId);
}

function getAdjacentActiveIssueId(direction, currentIssueId = state.review.selectedIssueId, options = {}) {
  const activeIssues = getFilteredIssues();
  if (!activeIssues.length) return null;
  const currentIndex = activeIssues.findIndex((item) => item.id === currentIssueId);
  if (currentIndex < 0) return activeIssues[0].id;
  const nextIndex = currentIndex + (direction === "previous" ? -1 : 1);
  if (options.wrap && direction === "next" && nextIndex >= activeIssues.length) {
    return activeIssues[0].id;
  }
  return activeIssues[nextIndex]?.id || null;
}

function getNextActiveIssueId(currentIssueId = state.review.selectedIssueId) {
  return getAdjacentActiveIssueId("next", currentIssueId);
}

function getNextActionableIssueId(currentIssueId = state.review.selectedIssueId) {
  const actionableItems = getActionableReviewItems();
  if (!actionableItems.length) return null;
  const currentIndex = actionableItems.findIndex((item) => item.id === currentIssueId);
  if (currentIndex < 0) return actionableItems[0]?.id || null;
  return actionableItems[currentIndex + 1]?.id || actionableItems.find((item) => item.id !== currentIssueId)?.id || null;
}

function selectNextActiveIssue(preferredIssueId = null) {
  const nextIssueId = preferredIssueId || getNextActionableIssueId();
  if (!nextIssueId) {
    state.review.selectedIssueId = null;
    state.review.highlightedRowId = null;
    state.review.highlightedCellKey = null;
    state.review.referenceQuery = "";
    state.review.referenceType = "all";
    renderReviewUi();
    renderBody();
    return;
  }
  state.review.referenceQuery = "";
  state.review.referenceType = "all";
  selectIssue(nextIssueId);
}

function selectNextFilteredIssue() {
  const nextIssueId = getAdjacentActiveIssueId("next", state.review.selectedIssueId, { wrap: true });
  if (!nextIssueId) {
    renderReviewUi();
    return;
  }
  state.review.referenceQuery = "";
  state.review.referenceType = "all";
  selectIssue(nextIssueId);
}

function selectPreviousActiveIssue() {
  const activeIssues = getFilteredIssues();
  const previousIssueId = getAdjacentActiveIssueId("previous");
  if (!activeIssues.length || !previousIssueId) {
    renderReviewUi();
    return;
  }
  state.review.referenceQuery = "";
  state.review.referenceType = "all";
  selectIssue(previousIssueId);
}

function chooseReferenceCandidate(candidateId) {
  const issue = issues.find((item) => item.id === state.review.selectedIssueId) || getReviewIssue(state.review.selectedIssueId);
  const candidate = getIssueCandidates(issue || {}).find((item) => item.id === candidateId);
  if (!issue || !candidate) return;
  const originalValue = String(issue.selectedValue || "").trim().toLowerCase();
  const nextValue = String(candidate.name || "").trim();
  if (nextValue.toLowerCase() === originalValue) {
    delete state.review.draftDecisions[issue.id];
    renderReviewUi();
    return;
  }
  state.review.draftDecisions[issue.id] = {
    selectedValue: candidate.name,
    selectedCandidateId: candidate.id,
    changed: nextValue.toLowerCase() !== originalValue
  };
  renderReviewUi();
}

function resetIssueDraftSelection() {
  const issueId = state.review.selectedIssueId;
  if (!issueId || !state.review.draftDecisions[issueId]) return;
  delete state.review.draftDecisions[issueId];
  renderReviewDetailPreservingScroll();
}

function isRdCommentMode() {
  return state.review.activeMode === "rd-changes";
}

function getActiveCommentContext() {
  if (isRdCommentMode()) {
    return getRdCommentContext(getRdChange(state.review.rdSelectedChangeId));
  }
  return issues.find((item) => item.id === state.review.selectedIssueId) || getReviewIssue(state.review.selectedIssueId);
}

function getActiveReviewDetailRoot() {
  return document.getElementById(isRdCommentMode() ? "rdReviewDetail" : "reviewDetail");
}

function getActiveCommentInputId() {
  return isRdCommentMode() ? "rd-issueCommentInput" : "issueCommentInput";
}

function getActiveCommentsTimelineId() {
  return isRdCommentMode() ? "rd-commentsTimeline" : "commentsTimeline";
}

function getActiveCommentsExpanded() {
  return isRdCommentMode() ? state.review.rdCommentsExpanded : state.review.commentsExpanded;
}

function setActiveCommentsExpanded(value) {
  if (isRdCommentMode()) state.review.rdCommentsExpanded = value;
  else state.review.commentsExpanded = value;
}

function getActiveEditingCommentId() {
  return isRdCommentMode() ? state.review.rdEditingCommentId : state.review.editingCommentId;
}

function setActiveEditingCommentId(commentId) {
  if (isRdCommentMode()) state.review.rdEditingCommentId = commentId;
  else state.review.editingCommentId = commentId;
}

function renderActiveReviewDetail() {
  if (isRdCommentMode()) renderRdSelectedChange();
  else renderReviewDetail();
}

function renderReviewDetailPreservingScroll() {
  const detailContent = isRdCommentMode()
    ? document.querySelector("#rdReviewDetail .rd-detail-scroll")
    : document.querySelector("#reviewDetail .detail-content");
  const commentsTimeline = document.getElementById(getActiveCommentsTimelineId());
  const detailScroll = detailContent ? { top: detailContent.scrollTop, left: detailContent.scrollLeft } : null;
  const commentsScroll = commentsTimeline ? { top: commentsTimeline.scrollTop, left: commentsTimeline.scrollLeft } : null;
  renderActiveReviewDetail();
  restoreReviewDetailScroll(detailScroll, commentsScroll);
}

function restoreReviewDetailScroll(detailScroll, commentsScroll) {
  const applyScroll = () => {
    const nextDetailContent = isRdCommentMode()
      ? document.querySelector("#rdReviewDetail .rd-detail-scroll")
      : document.querySelector("#reviewDetail .detail-content");
    const nextCommentsTimeline = document.getElementById(getActiveCommentsTimelineId());
    if (detailScroll && nextDetailContent) {
      nextDetailContent.scrollTop = detailScroll.top;
      nextDetailContent.scrollLeft = detailScroll.left;
    }
    if (commentsScroll && nextCommentsTimeline) {
      nextCommentsTimeline.scrollTop = commentsScroll.top;
      nextCommentsTimeline.scrollLeft = commentsScroll.left;
    }
  };
  applyScroll();
  requestAnimationFrame(applyScroll);
}

function saveIssueComment() {
  const issue = getActiveCommentContext();
  const input = document.getElementById(getActiveCommentInputId());
  const value = input?.value.trim();
  if (!issue || !value) return;
  comments.push({
    id: `comment-${issue.id}-${comments.length + 1}`,
    issueId: issue.id,
    rowId: issue.rowId,
    author: "Шпак Александр Константинович",
    role: "Вед. сметчик",
    body: value,
    createdAt: new Date().toISOString()
  });
  setActiveCommentsExpanded(true);
  setActiveEditingCommentId(null);
  input.value = "";
  renderReviewDetailPreservingScroll();
}

function updateIssueComment(commentId) {
  const issue = getActiveCommentContext();
  const input = getActiveReviewDetailRoot()?.querySelector("#commentEditInput");
  const value = input?.value.trim();
  if (!value) return;
  const comment = comments.find((item) => item.id === commentId);
  if (comment) {
    comment.body = value;
  } else if (issue && commentId.startsWith(`inline-${issue.id}-`)) {
    const index = Number(commentId.split("-").at(-1)) - 1;
    if (Number.isInteger(index) && index >= 0) issue.comments[index] = value;
  } else {
    return;
  }
  setActiveEditingCommentId(null);
  renderReviewDetailPreservingScroll();
}

function deleteIssueComment(commentId) {
  const issue = getActiveCommentContext();
  const commentIndex = comments.findIndex((item) => item.id === commentId);
  if (commentIndex >= 0) {
    const [removed] = comments.splice(commentIndex, 1);
    if (issue && removed?.body) {
      issue.comments = (issue.comments || []).filter((body) => body !== removed.body);
    }
  } else if (issue && commentId.startsWith(`inline-${issue.id}-`)) {
    const index = Number(commentId.split("-").at(-1)) - 1;
    if (Number.isInteger(index) && index >= 0) issue.comments.splice(index, 1);
  } else {
    return;
  }
  setActiveEditingCommentId(null);
  renderReviewDetailPreservingScroll();
}

function cancelCommentEditingOnOutsideInteraction(event) {
  if (!getActiveEditingCommentId()) return;
  const target = event.target;
  if (target.closest(".comment-edit-form") || target.closest("[data-comment-action]")) return;
  const shouldFocusCompose = target.id === getActiveCommentInputId() || Boolean(target.closest(".comments-compose"));
  setActiveEditingCommentId(null);
  if (!state.review.drawerOpen) return;
  renderReviewDetailPreservingScroll();
  if (shouldFocusCompose) {
    requestAnimationFrame(() => document.getElementById(getActiveCommentInputId())?.focus({ preventScroll: true }));
  }
}

function handleCommentUiClick(event) {
  if (event.target.closest("[data-comments-toggle]")) {
    setActiveCommentsExpanded(!getActiveCommentsExpanded());
    const hadEditingComment = Boolean(getActiveEditingCommentId());
    setActiveEditingCommentId(null);
    if (hadEditingComment) {
      renderActiveReviewDetail();
      return true;
    }
    const root = getActiveReviewDetailRoot()?.querySelector(".comments-accordion");
    const toggle = root?.querySelector("[data-comments-toggle]");
    const icon = toggle?.querySelector(".comments-accordion-icon");
    syncReviewAccordionElements(root, toggle, icon, getActiveCommentsExpanded());
    return true;
  }

  const commentActionButton = event.target.closest("[data-comment-action]");
  if (commentActionButton) {
    const commentId = commentActionButton.closest("[data-comment-id]")?.dataset.commentId;
    const action = commentActionButton.dataset.commentAction;
    if (action === "edit" && commentId) {
      setActiveEditingCommentId(commentId);
      renderReviewDetailPreservingScroll();
      requestAnimationFrame(() => getActiveReviewDetailRoot()?.querySelector("#commentEditInput")?.focus({ preventScroll: true }));
    }
    if (action === "save" && commentId) updateIssueComment(commentId);
    if (action === "delete" && commentId) deleteIssueComment(commentId);
    if (action === "cancel") {
      setActiveEditingCommentId(null);
      renderReviewDetailPreservingScroll();
    }
    return true;
  }

  if (event.target.closest('[data-review-action="comment"]')) {
    saveIssueComment();
    return true;
  }
  return false;
}

function handleCommentUiKeydown(event) {
  if (event.target.id === getActiveCommentInputId() && event.key === "Enter") {
    event.preventDefault();
    saveIssueComment();
    return true;
  }
  if (event.target.id === "commentEditInput" && event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    const commentId = event.target.closest("[data-comment-id]")?.dataset.commentId;
    if (commentId) updateIssueComment(commentId);
    return true;
  }
  return false;
}

function bindBodyEvents() {
  document.querySelectorAll(".expand-button").forEach((button) => {
    button.addEventListener("click", () => {
      const rowId = button.closest("tr").dataset.id;
      const row = findRow(rows, rowId);
      if (!row) return;
      row.expanded = row.expanded === false;
      renderBody();
    });
  });

  document.querySelectorAll(".toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const rowId = button.closest("tr").dataset.id;
      const row = findRow(rows, rowId);
      if (!row) return;
      row.enabled = row.enabled !== true;
      button.classList.toggle("is-on", row.enabled);
      button.setAttribute("aria-checked", String(row.enabled));
    });
  });

  document.querySelectorAll(".row-select").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const rowId = checkbox.closest("tr").dataset.id;
      if (checkbox.checked) state.selected.add(rowId);
      else state.selected.delete(rowId);
      syncSelectAll();
    });
  });

}

function setupReviewEvents() {
  document.addEventListener("click", cancelCommentEditingOnOutsideInteraction);
  document.getElementById("openReviewDrawer")?.addEventListener("click", () => {
    state.review.activeFilter = "created";
    state.review.referenceQuery = "";
    state.review.referenceType = "all";
    openReviewDrawer();
  });
  document.getElementById("closeReviewDrawer")?.addEventListener("click", closeReviewDrawer);
  document.getElementById("reviewToastRegion")?.addEventListener("click", (event) => {
    if (event.target.closest("[data-review-toast-close]")) hideReviewToast();
  });
  document.getElementById("reviewModeTabs")?.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-review-mode]");
    if (!tab) return;
    setReviewMode(tab.dataset.reviewMode);
  });
  document.getElementById("reviewModeTabs")?.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    const currentIndex = reviewModes.findIndex((mode) => mode.key === state.review.activeMode);
    let nextIndex = currentIndex;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + reviewModes.length) % reviewModes.length;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % reviewModes.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = reviewModes.length - 1;
    event.preventDefault();
    const nextMode = reviewModes[nextIndex];
    setReviewMode(nextMode.key);
    document.getElementById(nextMode.tabId)?.focus();
  });
  document.getElementById("positionAccordionToggle")?.addEventListener("click", () => {
    window.clearTimeout(positionAccordionListRenderTimer);
    state.review.positionsExpanded = !state.review.positionsExpanded;
    if (state.review.positionsExpanded) renderReviewList();
    renderPositionAccordion();
    if (!state.review.positionsExpanded) {
      positionAccordionListRenderTimer = window.setTimeout(() => {
        if (!state.review.positionsExpanded) renderReviewList();
      }, 190);
    }
  });
  document.getElementById("rdChangesAccordionToggle")?.addEventListener("click", () => {
    if (state.review.rdBulkMode) return;
    state.review.rdChangesExpanded = !state.review.rdChangesExpanded;
    if (state.review.rdChangesExpanded) renderRdReviewList();
    renderRdChangesAccordion();
  });
  const completenessContent = document.getElementById("reviewCompletenessContent");
  completenessContent?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-completeness-action]");
    if (!button) {
      if (state.review.completenessFileActionMenuOpen && !event.target.closest(".completeness-detail-menu")) {
        state.review.completenessFileActionMenuOpen = false;
        renderCompletenessMode();
      }
      return;
    }
    handleCompletenessAction(button.dataset.completenessAction, button);
  });
  completenessContent?.addEventListener("input", (event) => {
    if (event.target.id !== "completenessTreeSearch") return;
    state.review.completenessSearchQuery = event.target.value;
    state.review.completenessHighlightedFileId = null;
    renderCompletenessMode();
    requestAnimationFrame(() => {
      const input = document.getElementById("completenessTreeSearch");
      if (!input) return;
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    });
  });
  completenessContent?.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (state.review.completenessFileActionMenuOpen) {
      state.review.completenessFileActionMenuOpen = false;
      renderCompletenessMode();
      return;
    }
    if (state.review.completenessFilterPanelOpen) {
      state.review.completenessFilterPanelOpen = false;
      state.review.completenessDraftFilters = cloneCompletenessFilters(state.review.completenessAppliedFilters);
      renderCompletenessMode();
      return;
    }
    if (state.review.completenessView === "detail") {
      handleCompletenessAction("back-to-overview");
    }
  });
  document.getElementById("prevReviewIssue")?.addEventListener("click", () => selectPreviousActiveIssue());
  document.getElementById("nextReviewIssue")?.addEventListener("click", () => selectNextFilteredIssue());
  document.getElementById("prevRdChange")?.addEventListener("click", () => selectAdjacentRdChange("previous"));
  document.getElementById("nextRdChange")?.addEventListener("click", () => selectAdjacentRdChange("next"));

  document.getElementById("rdReviewFilters")?.addEventListener("click", (event) => {
    const bulkAction = event.target.closest("[data-rd-bulk-action]");
    if (bulkAction?.dataset.rdBulkAction === "toggle-all") {
      toggleAllRdBulkSelections();
      return;
    }
    const button = event.target.closest("[data-rd-review-filter]");
    if (!button) return;
    setRdReviewFilter(button.dataset.rdReviewFilter);
  });

  document.getElementById("rdReviewList")?.addEventListener("click", (event) => {
    const volumeAction = event.target.closest("[data-rd-volume-action]");
    if (volumeAction) {
      const action = volumeAction.dataset.rdVolumeAction;
      const changeId = volumeAction.dataset.rdChangeId;
      if (action === "start") startRdVolumeEdit(changeId);
      if (action === "confirm") confirmRdVolumeEdit(changeId);
      if (action === "cancel") cancelRdVolumeEdit(changeId);
      return;
    }
    const decisionButton = event.target.closest("[data-rd-card-decision]");
    if (decisionButton) {
      resolveRdChange(decisionButton.dataset.rdCardDecision, decisionButton.dataset.rdChangeId);
      return;
    }
    const bulkToggle = event.target.closest("[data-rd-bulk-toggle]");
    if (bulkToggle) {
      toggleRdBulkSelection(bulkToggle.dataset.rdBulkToggle);
      return;
    }
    const filterTarget = event.target.closest("[data-rd-review-filter-target]");
    if (filterTarget) {
      setRdReviewFilter(filterTarget.dataset.rdReviewFilterTarget);
      return;
    }
    const button = event.target.closest("[data-select-rd-change]");
    if (!button) return;
    selectRdChange(button.dataset.selectRdChange);
  });

  document.getElementById("rdReviewList")?.addEventListener("input", (event) => {
    const input = event.target.closest("[data-rd-volume-input]");
    if (!input || state.review.rdEditingVolumeChangeId !== input.dataset.rdChangeId) return;
    const sanitizedValue = sanitizeRdVolumeDraft(input.value);
    if (input.value !== sanitizedValue) input.value = sanitizedValue;
    state.review.rdEditingVolumeDraft = sanitizedValue;
    const confirmButton = input.parentElement?.querySelector('[data-rd-volume-action="confirm"]');
    if (confirmButton) confirmButton.disabled = !isValidRdVolumeDraft(sanitizedValue);
  });

  document.getElementById("rdReviewList")?.addEventListener("keydown", (event) => {
    const input = event.target.closest("[data-rd-volume-input]");
    if (!input) return;
    if (event.key === "Enter") {
      event.preventDefault();
      confirmRdVolumeEdit(input.dataset.rdChangeId);
    }
    if (event.key === "Escape") {
      event.preventDefault();
      cancelRdVolumeEdit(input.dataset.rdChangeId);
    }
  });

  document.getElementById("rdReviewDetail")?.addEventListener("click", (event) => {
    if (handleCommentUiClick(event)) return;
    const toggle = event.target.closest("[data-toggle-rd-similar]");
    if (toggle) {
      state.review.rdSimilarExpanded = !state.review.rdSimilarExpanded;
      syncRdSimilarAccordion();
      return;
    }
    const button = event.target.closest("[data-rd-go-to-row]");
    if (!button) return;
    navigateToRdChangeRow(button.dataset.rdGoToRow);
  });
  document.getElementById("rdReviewDetail")?.addEventListener("keydown", (event) => {
    handleCommentUiKeydown(event);
  });

  document.getElementById("rdBulkFooter")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-rd-bulk-action]");
    if (!button) return;
    const action = button.dataset.rdBulkAction;
    if (action === "request-cancel-all") openRdCancelAllDialog();
    if (action === "enter-apply") enterRdBulkApplyMode();
    if (action === "exit") exitRdBulkApplyMode();
    if (action === "apply-selected") applySelectedRdChanges();
  });

  document.getElementById("rdBulkDialogRoot")?.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-rd-bulk-dialog-action]");
    if (actionButton?.dataset.rdBulkDialogAction === "close") {
      closeRdCancelAllDialog();
      return;
    }
    if (actionButton?.dataset.rdBulkDialogAction === "confirm-cancel-all") {
      cancelAllRdChanges();
      return;
    }
    if (event.target.matches("[data-rd-bulk-dialog-backdrop]")) closeRdCancelAllDialog();
  });

  document.getElementById("rdBulkDialogRoot")?.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeRdCancelAllDialog();
      return;
    }
    if (event.key !== "Tab") return;
    const controls = [...event.currentTarget.querySelectorAll("button:not(:disabled)")];
    if (!controls.length) return;
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || state.review.activeMode !== "rd-changes") return;
    if (state.review.rdCancelAllDialogOpen) return;
    if (state.review.rdBulkMode) {
      event.preventDefault();
      exitRdBulkApplyMode();
    }
  });

  document.getElementById("reviewFilters")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-review-filter]");
    if (!button) return;
    state.review.activeFilter = button.dataset.reviewFilter;
    const firstIssue = getFilteredIssues()[0];
    state.review.referenceQuery = "";
    state.review.referenceType = "all";
    if (firstIssue) {
      selectIssue(firstIssue.id);
      return;
    }
    state.review.selectedIssueId = null;
    resetReviewAccordions();
    renderReviewUi();
  });

  document.getElementById("reviewList")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-select-issue]");
    if (!button) return;
    state.review.referenceQuery = "";
    state.review.referenceType = "all";
    selectIssue(button.dataset.selectIssue);
  });

  document.getElementById("reviewDetail")?.addEventListener("click", (event) => {
    if (event.target.closest("#matchResetSelection")) {
      resetIssueDraftSelection();
      return;
    }

    if (event.target.closest("#matchAccordionToggle")) {
      state.review.matchExpanded = !state.review.matchExpanded;
      const root = document.querySelector("#reviewDetail .normalization-panel");
      const toggle = document.getElementById("matchAccordionToggle");
      const icon = toggle?.querySelector(".position-accordion-icon");
      syncReviewAccordionElements(root, toggle, icon, state.review.matchExpanded);
      return;
    }

    if (event.target.closest("#referenceAccordionToggle")) {
      state.review.referencesExpanded = !state.review.referencesExpanded;
      const root = document.querySelector("#reviewDetail .reference-panel");
      const toggle = document.getElementById("referenceAccordionToggle");
      const icon = root?.querySelector(".reference-accordion-icon");
      syncReviewAccordionElements(root, toggle, icon, state.review.referencesExpanded);
      return;
    }

    if (event.target.closest("#resultAccordionToggle")) {
      state.review.resultExpanded = !state.review.resultExpanded;
      const root = document.querySelector("#reviewDetail .result-ai-panel");
      const toggle = document.getElementById("resultAccordionToggle");
      const icon = root?.querySelector(".position-accordion-icon");
      syncReviewAccordionElements(root, toggle, icon, state.review.resultExpanded);
      return;
    }

    if (handleCommentUiClick(event)) return;

    const candidateCard = event.target.closest(".candidate-item[data-candidate-id]");
    if (candidateCard) {
      chooseReferenceCandidate(candidateCard.dataset.candidateId);
      return;
    }
    const referenceButton = event.target.closest("[data-reference-type]");
    if (referenceButton) {
      state.review.referenceType = referenceButton.dataset.referenceType;
      renderReviewDetail();
      return;
    }
    const actionButton = event.target.closest("[data-review-action]");
    if (!actionButton) return;
    const action = actionButton.dataset.reviewAction;
    if (action === "navigate") {
      navigateToIssue(state.review.selectedIssueId);
      return;
    }
    updateIssueStatus(action);
  });

  document.getElementById("reviewDetail")?.addEventListener("input", (event) => {
    if (event.target.id !== "referenceSearch") return;
    state.review.referenceQuery = event.target.value;
    renderReviewDetail();
    requestAnimationFrame(() => {
      const input = document.getElementById("referenceSearch");
      if (!input) return;
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    });
  });

  document.getElementById("reviewDetail")?.addEventListener("keydown", (event) => {
    if (handleCommentUiKeydown(event)) return;
    const candidateCard = event.target.closest(".candidate-item[data-candidate-id]");
    if (!candidateCard || !["Enter", " "].includes(event.key)) return;
    event.preventDefault();
    chooseReferenceCandidate(candidateCard.dataset.candidateId);
  });

}

function syncSelectAll() {
  const selectAll = document.getElementById("selectAll");
  const visibleRows = flattenRows(rows);
  const selectedVisible = visibleRows.filter((row) => state.selected.has(row.id)).length;
  selectAll.checked = selectedVisible === visibleRows.length && visibleRows.length > 0;
  selectAll.indeterminate = selectedVisible > 0 && selectedVisible < visibleRows.length;
}

function findRow(items, id) {
  for (const row of items) {
    if (row.id === id) return row;
    if (row.children) {
      const found = findRow(row.children, id);
      if (found) return found;
    }
  }
  return null;
}

function normalizeTree(items) {
  items.forEach((row) => {
    if (!row.children) return;
    const normalized = [];
    row.children.forEach((child) => {
      if (child.type === "material") {
        const parentId = child.number.split(".").slice(0, -1).join(".");
        const parent = normalized.find((candidate) => candidate.number === parentId && candidate.type === "work");
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(child);
          return;
        }
      }
      normalized.push(child);
    });
    row.children = normalized;
    normalizeTree(row.children);
  });
}

normalizeTree(rows);
applyReviewMetadata();
renderColumns();
renderHeader();
renderBody();
setupReviewEvents();
setupAiChatEvents();
setupGlobalTooltips();
loadCompletenessModuleData();
