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
    activeFilter: "all",
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
    highlightedRowId: null,
    highlightedCellKey: null
  }
};

const reviewFilters = [
  { key: "all", label: "Все" },
  { key: "warning", label: "Предупреждения" },
  { key: "error", label: "Ошибки" },
  { key: "unresolved", label: "Непроверенные" },
  { key: "ai", label: "Созданы ИИ" }
];

const issueTypeLabels = {
  fuzzy_match: "Нечеткое совпадение",
  low_confidence: "Низкая уверенность",
  alternative_selected: "Выбран вариант из альтернатив",
  entity_not_found: "Не найдена сущность",
  missing_data: "Недостаточно данных",
  normalized_value: "Нормализация значения",
  ai_generated: "Создано ИИ"
};

const rows = buildRowsFromProjectData(projectData);
const issues = cloneData(projectData.issues || []);
const sourceAnrRows = cloneData(projectData.sourceAnrRows || []);
const matchDecisions = cloneData(projectData.matchDecisions || []);
const referenceCandidates = cloneData(projectData.referenceCandidates || []);
const reviewActions = cloneData(projectData.reviewActions || []);
const comments = cloneData(projectData.comments || []);
const processingLogEvents = cloneData(projectData.processingLogEvents || []);

function cloneData(value) {
  return JSON.parse(JSON.stringify(value || []));
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
  return roots;
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

function renderMatchToggleIcon(expanded) {
  if (expanded) {
    return '<svg class="match-toggle-svg" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="m7 7 10 10"></path><path d="m17 7-10 10"></path></svg>';
  }
  return '<svg class="match-toggle-svg" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>';
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

function renderCommentsAccordion(issue) {
  const items = getIssueCommentItems(issue);
  const isExpanded = state.review.commentsExpanded;
  const messageMarkup = items.length
    ? items.map(renderCommentMessage).join("")
    : '<div class="comments-empty"><span class="comments-empty-visual" aria-hidden="true">' + renderCommentIcon("message") + '</span><strong>Комментариев пока нет</strong><p>Оставьте заметку для коллег или зафиксируйте важное решение по проверке этой позиции.</p></div>';
  return '<section class="comments-accordion ' + (isExpanded ? 'expanded' : 'collapsed') + '">' +
    '<button class="comments-accordion-head" id="commentsAccordionToggle" type="button" aria-expanded="' + String(isExpanded) + '" aria-controls="commentsAccordionPanel">' +
      '<span class="comments-head-title"><span class="comments-head-icon" aria-hidden="true">' + renderCommentIcon("message") + '</span><span>Комментарии</span><b>' + items.length + '</b></span>' +
      '<span class="comments-accordion-icon" aria-hidden="true">' + renderAccordionArrowIcon(isExpanded) + '</span>' +
    '</button>' +
    '<div class="comments-accordion-panel" id="commentsAccordionPanel">' +
      '<div class="comments-timeline" id="commentsTimeline">' + messageMarkup + '</div>' +
      '<div class="comments-compose">' +
        '<input id="issueCommentInput" type="text" placeholder="Напишите комментарий к позиции..." autocomplete="off">' +
        '<button class="comments-send" type="button" data-review-action="comment" aria-label="Отправить комментарий">' + renderCommentIcon("send") + '</button>' +
      '</div>' +
    '</div>' +
  '</section>';
}

function renderCommentMessage(comment) {
  const isEditing = state.review.editingCommentId === comment.id;
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
  if (!buttonText) return;
  buttonText.textContent = "Проверка ИИ";
}

function renderReviewDrawer() {
  const drawer = document.getElementById("reviewDrawer");
  if (!drawer) return;
  const filteredIssues = getFilteredIssues();
  if (state.review.drawerOpen && !state.review.selectedIssueId) {
    state.review.selectedIssueId = getDefaultReviewIssueId();
  }
  if (state.review.drawerOpen && state.review.selectedIssueId && !filteredIssues.some((issue) => issue.id === state.review.selectedIssueId)) {
    state.review.selectedIssueId = filteredIssues[0]?.id || null;
  }
  drawer.setAttribute("aria-hidden", String(!state.review.drawerOpen));
  document.body.classList.toggle("ai-drawer-open", state.review.drawerOpen);
  renderReviewHeader();
  renderPositionAccordion();
  renderReviewFilters();
  renderReviewList();
  renderReviewDetail();
}

function renderPositionAccordion() {
  const accordion = document.getElementById("positionAccordion");
  const toggle = document.getElementById("positionAccordionToggle");
  const icon = document.getElementById("positionAccordionIcon");
  if (!accordion || !toggle || !icon) return;
  accordion.classList.toggle("expanded", state.review.positionsExpanded);
  accordion.classList.toggle("collapsed", !state.review.positionsExpanded);
  toggle.setAttribute("aria-expanded", String(state.review.positionsExpanded));
  icon.innerHTML = renderAccordionArrowIcon(state.review.positionsExpanded);
}

function renderReviewHeader() {
  const kicker = document.getElementById("reviewCollisionType");
  const title = document.getElementById("reviewContextTitle");
  const meta = document.getElementById("reviewHeaderMeta");
  const prevButton = document.getElementById("prevReviewIssue");
  const nextButton = document.getElementById("nextReviewIssue");
  const issue = getReviewIssue(state.review.selectedIssueId);
  const row = issue ? findRow(rows, issue.rowId) : null;
  if (kicker) {
    kicker.textContent = issue ? reviewStateLabel(issue) : "Проверка ИИ";
    kicker.className = "review-kicker" + (issue ? " " + reviewStateClass(issue) : "");
  }
  if (title) {
    title.textContent = row ? `Проверка позиции: строка ${row.number || issue.rowId}` : "Проверка позиций";
  }
  if (meta) {
    meta.innerHTML = issue
      ? '<span class="header-guidance">' + getHeaderGuidance(issue) + '</span>'
      : '<span class="header-guidance">' + (getActionableReviewItems().length ? 'Выберите предупреждение или ошибку для проверки' : 'Все активные предупреждения и ошибки обработаны') + '</span>';
  }
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
      const active = state.review.selectedIssueId === issue.id ? " active" : "";
      const showIssueTags = ["all", "ai"].includes(state.review.activeFilter);
      const reviewCopy = getReviewCopy(issue);
      const issueTags = showIssueTags
        ? '<span class="issue-card-tags"><span class="issue-tag ' + reviewStateClass(issue) + '">' + reviewStateLabel(issue) + '</span>' + (issue.status === "sent-to-manual" ? '' : '<span class="issue-tag status">' + statusLabel(issue.status) + '</span>') + '</span>'
        : "";
      return `<button class="issue-card ${issue.severity}${active}" type="button" data-select-issue="${issue.id}">
        <span class="issue-card-top"><span class="issue-card-main"><strong>${escapeAttr(row?.number || issue.rowId)}</strong><span class="issue-card-title">${escapeAttr(issue.title)}</span></span>${issueTags}</span>
        <span class="issue-card-meta">${escapeAttr(reviewCopy.shortDescription)}</span>
      </button>`;
    })
    .join("");
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

  const aiReasoningSteps = getAiReasoningSteps(issue, decision, metrics);
  const reasonText = getReasonCardText();
  const hasLongReason = reasonText.length > 180;
  const reasonTextClass = hasLongReason && !state.review.reasonExpanded ? " collapsed" : " expanded";
  const reasonToggle = hasLongReason
    ? '<button class="reason-more-button" id="reasonMoreToggle" type="button">' + (state.review.reasonExpanded ? 'Скрыть' : 'Показать еще') + '</button>'
    : "";

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
            '<span>Сопоставление с АСОР</span>' +
            '<div class="match-head-tags" aria-label="Состояние сопоставления">' + renderMatchHeadTags(metrics) + '</div>' +
            '<div class="match-head-metrics" aria-label="Метрики сопоставления">' +
              '<b class="match-chip confidence" title="Уверенность"><i aria-hidden="true">✓</i>' + metrics.confidence + '%</b>' +
              '<b class="match-chip threshold" title="Порог"><i aria-hidden="true">≥</i>' + metrics.threshold + '%</b>' +
            '</div>' +
          '</button>' +
          '<div class="match-panel-body">' +
            '<div class="issue-flow" aria-label="Сопоставление значения АНР и выбранного значения АСОР">' +
              '<div class="issue-flow-side"><small>Значение АНР</small><span title="' + escapeAttr(metrics.sourceValue) + '">' + escapeAttr(metrics.sourceValue) + '</span></div>' +
              '<div class="issue-flow-switch" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M7.5 7.5h8.8l-2.7-2.8"></path><path d="M16.5 16.5H7.7l2.7 2.8"></path><path d="M16.3 7.5 13.6 10"></path><path d="M7.7 16.5l2.7-2.5"></path></svg></div>' +
              '<div class="issue-flow-side selected-asor-side' + (hasDraftChange ? ' has-reset' : '') + '"><div class="issue-flow-selected-head"><small>Предложено ИИ в АСОР</small><span class="match-selected-actions">' + matchResetControl + '<span class="match-accordion-icon" aria-hidden="true">' + renderMatchToggleIcon(state.review.matchExpanded) + '</span></span></div><span title="' + escapeAttr(metrics.selectedValue) + '">' + escapeAttr(metrics.selectedValue) + '</span></div>' +
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
            '<span>Сформированные позиции АСОР</span>' +
            '<span class="position-accordion-icon" aria-hidden="true">' + renderAccordionArrowIcon(state.review.resultExpanded) + '</span>' +
          '</button>' +
          '<div class="result-ai-body">' +
            '<div class="source-result-grid">' + resultFields.map((field) => '<span>' + field.label + '</span><strong title="' + escapeAttr(field.value) + '">' + escapeAttr(field.value) + '</strong>').join("") + '</div>' +
            '<div class="result-reason"><h4>Почему так</h4><p class="reason-card-text' + reasonTextClass + '">' + escapeAttr(reasonText) + '</p>' + reasonToggle + '</div>' +
            '<div class="result-logic">' +
              '<button class="result-logic-head" id="aiLogicToggle" type="button" aria-expanded="' + String(state.review.aiLogicOpen) + '"><i aria-hidden="true">' + renderReasoningTriggerIcon() + '</i><span>Как рассуждал ИИ?</span></button>' +
            '</div>' +
          '</div>' +
        '</section>' +
        '<div class="detail-section info-card action-section"><div class="info-card-head"><span class="info-card-icon action" aria-hidden="true">' + renderInfoCardIcon("action") + '</span><h4>Что делать</h4></div><p>' + escapeAttr(getActionCardText(issue, metrics)) + '</p></div>' +
        renderCommentsAccordion(issue) +
      '</div>' +
    '</div>' +
    '<div class="detail-actions">' +
      '<button class="review-secondary-action" type="button" data-review-action="cancel">Отмена</button>' +
      '<span class="detail-actions-spacer" aria-hidden="true"></span>' +
      '<button class="review-manual-action" type="button" data-review-action="manual" ' + (manualDisabled ? 'disabled' : '') + '>Ручной разбор</button>' +
      '<button class="review-primary-action" type="button" data-review-action="commit" ' + (footerState.disabled ? 'disabled' : '') + '>' + footerState.label + '</button>' +
    '</div>' +
    renderAiReasoningOverlay(issue, row, metrics, aiReasoningSteps) +
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

function renderMatchHeadTags(metrics) {
  return getMatchHeadTags(metrics)
    .map((tag) => '<b class="match-chip ' + tag.className + '">' + escapeAttr(tag.label) + '</b>')
    .join("");
}

function getMatchHeadTags(metrics) {
  const rawTags = [
    { label: metrics.status, className: getMatchChipClass(metrics.status) }
  ].filter((tag) => tag.label && tag.label !== "Не определено");

  const seen = new Set();
  return rawTags.filter((tag) => {
    const key = String(tag.label).trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
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

function getAsorResultFields(row) {
  const path = row ? findRowPath(rows, row.id) : [];
  const group = path.find((item) => item.type === "group");
  const work = [...path].reverse().find((item) => item.type === "work");
  const material = row?.type === "material" ? row : null;
  return [
    { label: "Группа работ", value: group?.name || "Не определено" },
    { label: "Вид работ", value: work?.name || "Не определено" },
    { label: "Материал", value: material?.name || "Не определено" },
    { label: "Ед. изм.", value: row?.unit || work?.unit || material?.unit || "Не определено" }
  ];
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
  return aiRows.map((row) => getPrimaryIssueForRow(row.id) || createAiRowReviewItem(row));
}

function getFilteredIssues() {
  return getReviewItems().filter((issue) => {
    const row = findRow(rows, issue.rowId);
    if (state.review.activeFilter === "warning") return issue.severity === "warning" && isIssueActiveInTable(issue);
    if (state.review.activeFilter === "error") return issue.severity === "error" && isIssueActiveInTable(issue);
    if (state.review.activeFilter === "unresolved") return isIssueDecisionRequired(issue);
    if (state.review.activeFilter === "ai") return row && ["ai-generated", "mixed"].includes(row.sourceType);
    return true;
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
  const aiRows = reviewItems.filter((issue) => {
    const row = findRow(rows, issue.rowId);
    return row && ["ai-generated", "mixed"].includes(row.sourceType);
  }).length;
  const unresolved = reviewItems.filter(isIssueDecisionRequired).length;
  const openWarnings = reviewItems.filter((issue) => issue.severity === "warning" && isIssueActiveInTable(issue)).length;
  const openErrors = reviewItems.filter((issue) => issue.severity === "error" && isIssueActiveInTable(issue)).length;
  return {
    aiRows,
    unresolved,
    openWarnings,
    openErrors,
    openIssues: reviewItems.length
  };
}

function getReviewFilterCount(key, counts) {
  if (key === "warning") return counts.openWarnings;
  if (key === "error") return counts.openErrors;
  if (key === "unresolved") return counts.unresolved;
  if (key === "ai") return counts.aiRows;
  return counts.openIssues;
}

function severityLabel(severity) {
  if (severity === "clean") return "Создано ИИ";
  return severity === "error" ? "Ошибка" : "Предупреждение";
}

function reviewStateLabel(issue) {
  if (issue?.status === "sent-to-manual") return "Ручной разбор";
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
  const nextIssueId = issueId || getDefaultReviewIssueId();
  state.review.drawerOpen = true;
  if (nextIssueId) {
    state.review.selectedIssueId = nextIssueId;
    resetReviewAccordions();
  }
  renderReviewUi();
  if (nextIssueId) navigateToIssue(nextIssueId);
}

function closeReviewDrawer() {
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
  state.review.selectedIssueId = issueId;
  state.review.drawerOpen = true;
  resetReviewAccordions();
  navigateToIssue(issueId);
  renderReviewUi();
}

function navigateToIssue(issueId) {
  const issue = getReviewIssue(issueId);
  if (!issue) return;
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

function renderReviewDetailPreservingScroll() {
  const detailContent = document.querySelector("#reviewDetail .detail-content");
  const commentsTimeline = document.getElementById("commentsTimeline");
  const detailScroll = detailContent ? { top: detailContent.scrollTop, left: detailContent.scrollLeft } : null;
  const commentsScroll = commentsTimeline ? { top: commentsTimeline.scrollTop, left: commentsTimeline.scrollLeft } : null;
  renderReviewDetail();
  restoreReviewDetailScroll(detailScroll, commentsScroll);
}

function restoreReviewDetailScroll(detailScroll, commentsScroll) {
  const applyScroll = () => {
    const nextDetailContent = document.querySelector("#reviewDetail .detail-content");
    const nextCommentsTimeline = document.getElementById("commentsTimeline");
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
  const issue = issues.find((item) => item.id === state.review.selectedIssueId) || getReviewIssue(state.review.selectedIssueId);
  const input = document.getElementById("issueCommentInput");
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
  state.review.commentsExpanded = true;
  state.review.editingCommentId = null;
  input.value = "";
  renderReviewDetailPreservingScroll();
}

function updateIssueComment(commentId) {
  const issue = issues.find((item) => item.id === state.review.selectedIssueId);
  const input = document.getElementById("commentEditInput");
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
  state.review.editingCommentId = null;
  renderReviewDetailPreservingScroll();
}

function deleteIssueComment(commentId) {
  const issue = issues.find((item) => item.id === state.review.selectedIssueId);
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
  state.review.editingCommentId = null;
  renderReviewDetailPreservingScroll();
}

function cancelCommentEditingOnOutsideInteraction(event) {
  if (!state.review.editingCommentId) return;
  const target = event.target;
  if (target.closest(".comment-edit-form") || target.closest("[data-comment-action]")) return;
  const shouldFocusCompose = target.id === "issueCommentInput" || Boolean(target.closest(".comments-compose"));
  state.review.editingCommentId = null;
  if (!state.review.drawerOpen) return;
  renderReviewDetailPreservingScroll();
  if (shouldFocusCompose) {
    requestAnimationFrame(() => document.getElementById("issueCommentInput")?.focus({ preventScroll: true }));
  }
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
    state.review.activeFilter = "all";
    state.review.referenceQuery = "";
    state.review.referenceType = "all";
    openReviewDrawer(getDefaultReviewIssueId());
  });
  document.getElementById("closeReviewDrawer")?.addEventListener("click", closeReviewDrawer);
  document.getElementById("positionAccordionToggle")?.addEventListener("click", () => {
    state.review.positionsExpanded = !state.review.positionsExpanded;
    renderReviewUi();
  });
  document.getElementById("prevReviewIssue")?.addEventListener("click", () => selectPreviousActiveIssue());
  document.getElementById("nextReviewIssue")?.addEventListener("click", () => selectNextFilteredIssue());

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

    if (event.target.closest("#matchAccordionToggle") || event.target.closest(".match-accordion-icon")) {
      state.review.matchExpanded = !state.review.matchExpanded;
      renderReviewDetail();
      return;
    }

    if (event.target.closest("#referenceAccordionToggle")) {
      state.review.referencesExpanded = !state.review.referencesExpanded;
      renderReviewUi();
      return;
    }

    if (event.target.closest("#resultAccordionToggle")) {
      state.review.resultExpanded = !state.review.resultExpanded;
      renderReviewDetail();
      return;
    }

    if (event.target.closest("#aiLogicToggle")) {
      state.review.aiLogicOpen = true;
      renderReviewDetail();
      return;
    }

    if (event.target.closest("#aiLogicClose") || event.target.id === "aiReasoningOverlay") {
      state.review.aiLogicOpen = false;
      renderReviewDetail();
      return;
    }

    if (event.target.closest("#reasonMoreToggle")) {
      const scrollContainer = document.querySelector("#reviewDetail .detail-content");
      const scrollTop = scrollContainer ? scrollContainer.scrollTop : 0;
      state.review.reasonExpanded = !state.review.reasonExpanded;
      renderReviewDetail();
      const nextScrollContainer = document.querySelector("#reviewDetail .detail-content");
      if (nextScrollContainer) {
        nextScrollContainer.scrollTop = scrollTop;
        requestAnimationFrame(() => {
          nextScrollContainer.scrollTop = scrollTop;
        });
      }
      return;
    }

    if (event.target.closest("#commentsAccordionToggle")) {
      state.review.commentsExpanded = !state.review.commentsExpanded;
      state.review.editingCommentId = null;
      renderReviewDetail();
      return;
    }

    const commentActionButton = event.target.closest("[data-comment-action]");
    if (commentActionButton) {
      const commentId = commentActionButton.closest("[data-comment-id]")?.dataset.commentId;
      const action = commentActionButton.dataset.commentAction;
      if (action === "edit" && commentId) {
        state.review.editingCommentId = commentId;
        renderReviewDetailPreservingScroll();
        requestAnimationFrame(() => document.getElementById("commentEditInput")?.focus({ preventScroll: true }));
      }
      if (action === "save" && commentId) updateIssueComment(commentId);
      if (action === "delete" && commentId) deleteIssueComment(commentId);
      if (action === "cancel") {
        state.review.editingCommentId = null;
        renderReviewDetailPreservingScroll();
      }
      return;
    }

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
    if (action === "comment") {
      saveIssueComment();
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
    if (event.key === "Escape" && state.review.aiLogicOpen) {
      event.preventDefault();
      state.review.aiLogicOpen = false;
      renderReviewDetail();
      return;
    }
    if (event.target.id === "issueCommentInput" && event.key === "Enter") {
      event.preventDefault();
      saveIssueComment();
      return;
    }
    if (event.target.id === "commentEditInput" && event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      const commentId = event.target.closest("[data-comment-id]")?.dataset.commentId;
      if (commentId) updateIssueComment(commentId);
      return;
    }
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
