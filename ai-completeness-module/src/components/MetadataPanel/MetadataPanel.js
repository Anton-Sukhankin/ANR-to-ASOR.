/* ==========================================================================
   КОМПОНЕНТ ПАНЕЛИ МЕТАДАННЫХ (METADATA PANEL)
   S.Cost / src / components / MetadataPanel / MetadataPanel.js
   ========================================================================== */

window.metadataPanelState = window.metadataPanelState || {
  mode: 'empty',
  selectedNode: null,
  pipelineOverviewExpanded: false
};


/**
 * Инициализирует панель метаданных, выводя пустое состояние (Empty State)
 */
window.initMetadataPanel = function() {
  console.log('MetadataPanel: Отрисовка пустого состояния...');
  const root = document.getElementById('metadata-panel-root');
  if (!root) return;

  window.metadataPanelState = {
    mode: 'empty',
    selectedNode: null,
    pipelineOverviewExpanded: Boolean(window.metadataPanelState?.pipelineOverviewExpanded)
  };
  root.classList.remove('metadata-filtering-mode');

  root.innerHTML = `
    <div class="metadata-empty-state">
      <div class="empty-hero-illustration" aria-hidden="true">
        <img src="src/assets/metadata-empty-illustration.png" alt="" loading="eager">
      </div>

      <div class="empty-copy">
        <h4 class="empty-title">Выберите документ слева,<br>чтобы увидеть подробный анализ</h4>
        <p class="empty-subtitle">
          Выбранный файл будет обработан ИИ. Вы получите заключение, статистику обработки
          и логи РАГ-пайплайна в реальном времени.
        </p>
      </div>

      <div class="empty-benefits" aria-label="Что появится после выбора документа">
        <div class="empty-benefit-card">
          <span class="empty-benefit-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M5 18.5V6.5"></path>
              <path d="M5 18.5h14"></path>
              <path d="M5.5 16.5c2.2-4.6 4.5-5 6.2-3.2 2.2 2.4 4.2.6 6.8-5.8"></path>
              <path d="M16.2 7.5h2.3v2.3"></path>
            </svg>
          </span>
          <strong>Статистика</strong>
          <span>Актуальные метрики и прогресс обработки</span>
        </div>
        <div class="empty-benefit-card">
          <span class="empty-benefit-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
              <path d="m8.6 12.2 2.1 2.1 4.7-5"></path>
            </svg>
          </span>
          <strong>Заключение ИИ</strong>
          <span>Анализ содержания и выявленные выводы</span>
        </div>
        <div class="empty-benefit-card">
          <span class="empty-benefit-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="m8 7 5 5-5 5"></path>
              <path d="M14 17h4"></path>
            </svg>
          </span>
          <strong>Логи пайплайна</strong>
          <span>Подробный журнал всех этапов обработки</span>
        </div>
      </div>

    </div>
  `;
};

/**
 * Обновляет панель метаданных при выборе узла в дереве
 */
window.updateMetadataPanel = function(fileNode) {
  const root = document.getElementById('metadata-panel-root');
  if (!root) return;

  console.log('MetadataPanel: Обновление панели под узел:', fileNode.name);
  const pipelineOverviewExpanded = Boolean(window.metadataPanelState?.pipelineOverviewExpanded);

  window.metadataPanelState = {
    mode: 'metadata',
    selectedNode: fileNode,
    pipelineOverviewExpanded
  };
  root.classList.remove('metadata-filtering-mode');

  // Извлекаем расширенные данные из единого JSON-состояния узла
  const hasMetadataDetails = Boolean(fileNode.metadata_details);
  const extData = fileNode.metadata_details || {
    sourceType: "Другое",
    authorName: "Неизвестный автор",
    authorRole: "contractor",
    uploadDate: "—",
    originalComment: "Комментарий отсутствует.",
    comments: [],
    crossLinks: [],
    logs: [{ time: "—", stage: "Общий статус", status: "green", text: "Файл ожидает проверки или не имеет логов." }],
    compliance: [{ text: "Специфические бизнес-требования не заданы", status: "green" }]
  };

  const confidence = fileNode.ai_metadata.confidence;
  const confClass = getConfidenceColorClass(confidence);
  const confLabel = getConfidenceLabel(confidence);

  // Форматирование размера файла
  const sizeMB = (fileNode.size / (1024 * 1024)).toFixed(2) + ' МБ';

  // Проверяем, нужно ли держать аккордеон логов открытым по умолчанию
  const hasIssue = fileNode.pipeline_status.read === 'red' || 
                   fileNode.pipeline_status.check === 'red' || 
                   fileNode.pipeline_status.read === 'yellow' || 
                   fileNode.pipeline_status.check === 'yellow';

  root.innerHTML = `
    <div class="metadata-card animate-fade-in">
      <!-- Шапка панели -->
      <div class="metadata-header">
        <span class="file-icon-badge">${getFileIcon(fileNode.type)}</span>
        <div class="metadata-title-block">
          <h4 class="metadata-filename" title="${fileNode.name}">${fileNode.name}</h4>
          <div class="metadata-file-meta">
            <span class="text-uppercase">${fileNode.type}</span>
            <span>${sizeMB}</span>
            <span>${extData.uploadDate}</span>
            <span title="${extData.authorName}">${extData.authorName}</span>
          </div>
        </div>
        <div class="metadata-header-actions" aria-label="Действия с файлом">
          <div class="metadata-actions-menu-wrap">
            <button
              type="button"
              class="metadata-icon-action metadata-actions-trigger"
              title="Действия с файлом"
              aria-label="Действия с файлом"
              aria-expanded="false"
              data-metadata-action="toggle-header-menu"
              onclick="event.preventDefault(); event.stopPropagation(); window.toggleMetadataHeaderMenu(this)"
            >
              <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <circle cx="6.5" cy="12" r="1.4"></circle>
                <circle cx="12" cy="12" r="1.4"></circle>
                <circle cx="17.5" cy="12" r="1.4"></circle>
              </svg>
            </button>
            <div class="metadata-actions-dropdown" role="menu" aria-label="Действия с файлом">
              <button type="button" role="menuitem" data-metadata-action="download-file" data-node-id="${fileNode.id}" data-file-name="${escapeHtml(fileNode.name)}">
                <span class="metadata-menu-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="M12 4v10"></path>
                    <path d="m8.5 10.5 3.5 3.5 3.5-3.5"></path>
                    <path d="M5 18.5h14"></path>
                  </svg>
                </span>
                <span>Скачать файл</span>
              </button>
              <button type="button" role="menuitem" data-metadata-action="recalculate-file" data-node-id="${fileNode.id}">
                <span class="metadata-menu-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="M20 7.5v4h-4"></path>
                    <path d="M4 16.5v-4h4"></path>
                    <path d="M18.3 10A6.5 6.5 0 0 0 7 7.7L4 12.5"></path>
                    <path d="M5.7 14A6.5 6.5 0 0 0 17 16.3l3-4.8"></path>
                  </svg>
                </span>
                <span>Пересчитать файл</span>
              </button>
              <button type="button" role="menuitem" data-metadata-action="open-technical-pipeline" data-node-id="${fileNode.id}">
                <span class="metadata-menu-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="M5.5 6.5h13"></path>
                    <path d="M5.5 12h13"></path>
                    <path d="M5.5 17.5h7"></path>
                    <path d="m16 16 2 2 3-4"></path>
                  </svg>
                </span>
                <span>\u0422\u0435\u0445\u043d\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b pipeline</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Статусы pipeline обработки -->
      <div class="metadata-scroll-content">
      <details class="metadata-section pipeline-overview-section" ${pipelineOverviewExpanded ? 'open' : ''}>
        <summary class="pipeline-overview-summary">
          <h5 class="section-title">Статусы обработки</h5>
          <span class="accordion-arrow" aria-hidden="true">
            <svg class="accordion-arrow-icon" viewBox="0 0 24 24" focusable="false">
              <path d="m7 10 5 5 5-5"></path>
            </svg>
          </span>
        </summary>
        <div class="pipeline-overview-content">
          ${renderPipelineOverview(fileNode.pipeline_status || {}, extData.logs || [])}
        </div>
      </details>

      <!-- Классификация документа -->
      <div class="metadata-section classification-section">
        <div class="classification-section-head">
          <h5 class="section-title">Классификация документа</h5>
          <span class="classification-confidence-label text-${confClass}">${confLabel}</span>
        </div>
        <div class="classification-card">
          <div class="classification-type-cell">
            <span class="classification-label">Тип при загрузке</span>
            <span class="classification-value" title="${extData.sourceType}">${extData.sourceType}</span>
          </div>
          <span class="classification-match-icon" aria-label="Сопоставление типов">
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <path d="M7.5 7.5h8.8l-2.7-2.8"></path>
              <path d="M16.5 16.5H7.7l2.7 2.8"></path>
              <path d="M16.3 7.5 13.6 10"></path>
              <path d="M7.7 16.5l2.7-2.5"></path>
            </svg>
          </span>
          <div class="classification-type-cell classification-type-ai">
            <span class="classification-label">Тип по версии ИИ</span>
            <span class="classification-value text-primary" title="${fileNode.ai_metadata.detected_type}">
              ${fileNode.ai_metadata.detected_type}
            </span>
          </div>
          <div
            class="classification-confidence confidence-${confClass}"
            style="--confidence-value: ${confidence}%;"
            title="Уверенность классификации: ${confidence}%"
          >
            <span>${confidence}%</span>
          </div>
        </div>
      </div>

      <!-- Кросс-требования комплектности (Смысловые связи) -->
      <div class="metadata-section">
        <h5 class="section-title">Кросс-требования комплектности (Смысловые связи)</h5>
        <div class="cross-links-list">
          ${renderCrossLinks(extData.crossLinks)}
        </div>
      </div>

      <!-- Комментарии выбранного файла -->
      <div class="metadata-section document-comments-card">
        <h5 class="section-title">Комментарии</h5>
        ${renderDocumentComments(extData)}
      </div>

      <!-- Аккордеон системных логов RAG -->
      <details class="logs-accordion superadmin-details" ${hasIssue ? 'open' : ''}>
        <summary class="logs-summary superadmin-summary">
          <span class="logs-summary-title">Системные логи и ошибки РАГ</span>
          <span class="accordion-arrow" aria-hidden="true">
            <svg class="accordion-arrow-icon" viewBox="0 0 24 24" focusable="false">
              <path d="m7 10 5 5 5-5"></path>
            </svg>
          </span>
        </summary>
        <div class="logs-content-wrapper superadmin-content">
          ${renderLogsList(extData.logs || [])}
        </div>
      </details>

      </div>
    </div>
  `;

  bindMetadataPanelActions(root);
  bindMetadataPanelAccordions(root);
};

/**
 * Возвращает правую область из режима фильтрации к предыдущему состоянию.
 */
window.restoreMetadataPanel = function() {
  const state = window.metadataPanelState || {};
  if (state.selectedNode) {
    window.updateMetadataPanel(state.selectedNode);
    return;
  }

  window.initMetadataPanel();
};


window.openTechnicalPipelinePanel = function(nodeId) {
  const node = resolveMetadataNode(nodeId);
  const root = document.getElementById('metadata-panel-root');
  if (!node || !root) return;

  const extData = node.metadata_details || {};
  const hasPipelineMetadata = Boolean(node.metadata_details) && hasTechnicalPipelineMetadata(extData);
  const isLoading = Boolean(extData.pipelineMetadataLoading);
  const fileMeta = [
    node.type?.toUpperCase(),
    formatFileSize(node.size),
    extData.uploadDate,
    extData.authorName
  ].filter(Boolean);

  window.metadataPanelState = {
    mode: 'technical',
    selectedNode: node,
    pipelineOverviewExpanded: Boolean(window.metadataPanelState?.pipelineOverviewExpanded)
  };
  root.classList.remove('metadata-filtering-mode');

  root.innerHTML = `
    <div class="metadata-card technical-interface-card animate-fade-in">
      <div class="metadata-header technical-interface-header">
        <button
          type="button"
          class="metadata-back-action"
          data-metadata-action="restore-metadata-panel"
          onclick="event.preventDefault(); event.stopPropagation(); window.restoreMetadataPanel()"
          title="Вернуться к метаданным"
          aria-label="Вернуться к метаданным"
        >
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <path d="M14.5 6.5 9 12l5.5 5.5"></path>
          </svg>
        </button>
        <div class="metadata-title-block">
          <h4 class="metadata-filename">Технические параметры pipeline</h4>
          <div class="metadata-file-meta">
            <span title="${escapeHtml(node.name)}">${node.name}</span>
            ${fileMeta.map(value => `<span>${escapeHtml(value)}</span>`).join('')}
          </div>
        </div>
        <div class="metadata-header-actions" aria-label="Действия с техническими параметрами">
          <button class="metadata-icon-action" type="button" data-metadata-action="copy-pipeline-log" data-node-id="${node.id}" title="Скопировать лог" aria-label="Скопировать лог">
            <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
              <path d="M7 7.2h8v9H7z"></path>
              <path d="M5 13H3.8V3.8h8.4V5"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="metadata-scroll-content technical-scroll-content">
      <section class="technical-interface-section">
        <div class="technical-section-head">
          <h5 class="section-title">Основные параметры</h5>
          <span class="technical-section-caption">Данные выбранного файла</span>
        </div>
        ${isLoading ? renderPipelineSkeleton() : hasPipelineMetadata ? renderTechnicalStatsGrid(getTechnicalPipelineStats(node, extData)) : renderPipelineNoData()}
      </section>

      <section class="technical-interface-section technical-connector-section">
        <div class="terminal-heading-row">
          <span class="terminal-title">Логика коннектора эмбеддингов</span>
          <div class="terminal-actions">
            <button class="btn-copy-log" type="button" data-metadata-action="copy-pipeline-log" data-node-id="${node.id}" title="Скопировать лог">
              <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path d="M7 7.2h8v9H7z"></path>
                <path d="M5 13H3.8V3.8h8.4V5"></path>
              </svg>
              <span>Скопировать лог</span>
            </button>
          </div>
        </div>
        ${isLoading ? renderPipelineSkeleton() : renderTechnicalTerminal(node, extData)}
      </section>

      <button class="btn-json-logs" type="button" data-metadata-action="open-node-json" data-node-id="${node.id}">
        Посмотреть подробный JSON узла
      </button>
      </div>
    </div>
  `;

  bindMetadataPanelActions(root);
};

function renderPipelineOverview(statuses = {}, logs = []) {
  const stages = [
    { key: 'unpack', order: 1, title: 'Распаковка', logStage: 'Распаковка', fallback: 'Извлечение файлов и вложений из контейнера.' },
    { key: 'read', order: 2, title: 'Чтение ИИ', logStage: 'Чтение', fallback: 'Анализ текста документа и извлечение данных.' },
    { key: 'check', order: 3, title: 'Комплектность', logStage: 'Комплектность', fallback: 'Проверка обязательных документов и смысловых связей.' }
  ];

  return `
    <div class="pipeline-overview-grid">
      ${stages.map(stage => {
        const status = statuses[stage.key] || 'gray';
        const meta = getPipelineStatusMeta(status);
        const message = getPipelineStageMessage(stage, status, logs);

        return `
          <article class="pipeline-stage-card status-${status}">
            <div class="pipeline-stage-icon-wrap">
              <span class="pipeline-stage-icon" aria-hidden="true">${getPipelineStageIcon(stage.key)}</span>
              <span class="pipeline-state-badge" title="${meta.label}" aria-label="${meta.label}">
                ${getPipelineStateIcon(status)}
              </span>
            </div>
            <div class="pipeline-stage-copy">
              <span class="pipeline-stage-title">${stage.order}. ${stage.title}</span>
              <span class="pipeline-stage-status">${meta.label}</span>
              <span class="pipeline-stage-message">${message}</span>
            </div>
          </article>
        `;
      }).join('')}
    </div>
  `;
}

function getPipelineStageMessage(stage, status, logs) {
  const log = (logs || []).find(item => item.stage === stage.logStage);
  if (log?.text) return log.text;

  const defaults = {
    green: 'Этап выполнен без ошибок.',
    loading: 'Этап находится в процессе выполнения.',
    gray: 'Этап ожидает запуска.',
    yellow: 'Этап требует ручной проверки.',
    red: 'Этап завершился с ошибкой.'
  };

  return defaults[status] || stage.fallback;
}

function getPipelineStatusMeta(status) {
  const map = {
    green: { label: 'Успешно' },
    loading: { label: 'Выполняется' },
    gray: { label: 'В очереди' },
    yellow: { label: 'Требует проверки' },
    red: { label: 'Ошибка' }
  };

  return map[status] || map.gray;
}

function getPipelineStageIcon(stageKey) {
  const icons = {
    unpack: `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="m4.5 8.2 7.5-4 7.5 4-7.5 4-7.5-4Z"></path>
        <path d="M4.5 8.2v7.6l7.5 4 7.5-4V8.2"></path>
        <path d="M12 12.2v7.6"></path>
      </svg>
    `,
    read: `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M7 3.8h7.2L18 7.6v12.6H7V3.8Z"></path>
        <path d="M14.2 3.8v4h3.8"></path>
        <path d="M9.8 11h4.8"></path>
        <path d="M9.8 14h3"></path>
        <circle cx="16.4" cy="16.8" r="2.1"></circle>
        <path d="m18 18.4 1.7 1.7"></path>
      </svg>
    `,
    check: `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M8.2 4.8h7.6"></path>
        <path d="M9.5 3.5h5l.8 2H8.7l.8-2Z"></path>
        <path d="M6.5 5.7h11v14.8h-11V5.7Z"></path>
        <path d="m9 11.3 1.4 1.4 3-3"></path>
        <path d="m9 16 1.4 1.4 3-3"></path>
      </svg>
    `
  };

  return icons[stageKey] || icons.check;
}

function getPipelineStateIcon(status) {
  const icons = {
    green: `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="m6.8 12.5 3.2 3.2 7.2-7.4"></path>
      </svg>
    `,
    loading: `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M17.7 7.6A7 7 0 0 0 5 11.8"></path>
        <path d="M6.3 16.4A7 7 0 0 0 19 12.2"></path>
      </svg>
    `,
    gray: `
      <svg viewBox="0 0 24 24" focusable="false">
        <circle cx="12" cy="12" r="7.2"></circle>
        <path d="M12 8v4.4l2.8 2"></path>
      </svg>
    `,
    yellow: `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M12 6.8v6.4"></path>
        <path d="M12 17.3h.01"></path>
      </svg>
    `,
    red: `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="m7.6 7.6 8.8 8.8"></path>
        <path d="m16.4 7.6-8.8 8.8"></path>
      </svg>
    `
  };

  return icons[status] || icons.gray;
}

function hasTechnicalPipelineMetadata(extData = {}) {
  return Boolean(
    extData.pipelineTime ||
    extData.textChunks ||
    extData.tokenCount ||
    extData.llmModel ||
    extData.embeddingLogs?.length ||
    extData.logs?.length
  );
}

function renderTechnicalStatsGrid(stats) {
  return `
    <div class="admin-grid technical-admin-grid">
      ${stats.map(item => `
        <div class="admin-cell technical-admin-cell">
          <span class="admin-label">${item.label}</span>
          <span class="admin-val ${item.accent ? 'text-primary font-weight-600' : ''}">${item.value}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderTechnicalTerminal(fileNode, extData) {
  const stats = getTechnicalPipelineStats(fileNode, extData);
  const terminalLogs = getPipelineTerminalLogs(fileNode, extData, stats);

  return `<div class="debug-terminal-logs">${renderColorizedTerminalLogs(terminalLogs)}</div>`;
}

function getTechnicalPipelineStats(fileNode, extData) {
  const severity = getPipelineSeverityCounts(fileNode, extData);
  const chunks = toNumber(extData.textChunks);
  const tokenCount = extData.tokenCount || (chunks ? chunks * 420 : 0);
  const nestedFiles = countNestedFiles(fileNode);
  const vectorCount = extData.vectorCount || chunks || 0;
  const ocrStatus = getOcrStatus(fileNode);
  const vectorizationResult = extData.vectorizationResult || `${vectorCount} векторов сохранено`;

  return [
    { label: 'ID документа', value: fileNode.id },
    { label: 'Инициатор загрузки', value: extData.authorName || 'Не указан' },
    { label: 'LLM-модель', value: extData.llmModel || 'Не указана', accent: true },
    { label: 'Execution time', value: extData.pipelineTime ? `${extData.pipelineTime} сек` : '—' },
    { label: 'Чанки текста', value: chunks ? `${chunks}` : '0' },
    { label: 'Токены', value: tokenCount ? `${tokenCount}` : '0' },
    { label: 'Вложенных файлов', value: `${nestedFiles}` },
    { label: 'Ошибки / проверки', value: `${severity.errors} / ${severity.warnings}` },
    { label: 'OCR', value: ocrStatus },
    { label: 'Векторизация', value: vectorizationResult }
  ];
}

function getPipelineTerminalLogs(fileNode, extData, stats) {
  const baseLogs = Array.isArray(extData.embeddingLogs) ? extData.embeddingLogs : [];
  const now = '2026-05-25 12:00:00.000';
  const severity = getPipelineSeverityCounts(fileNode, extData);
  const contextLines = [
    `${now} [SYS] Pipeline metadata loaded for ${fileNode.id}`,
    `${now} [INFO] File: ${fileNode.name}`,
    `${now} [INFO] Extracted ${formatFileSize(fileNode.size)}`,
    `${now} [INFO] Pipeline time: ${extData.pipelineTime || '—'} sec`,
    `${now} [INFO] Text chunks: ${extData.textChunks || 0}`,
    `${now} [INFO] Model: ${extData.llmModel || '—'}`,
    `${now} [INFO] Vectorization: ${stats.find(item => item.label === 'Векторизация')?.value || 'unavailable'}`,
    `${now} [WARN] Warnings: ${severity.warnings}, errors: ${severity.errors}`
  ];

  if (baseLogs.length > 0) {
    return [...contextLines, '---', ...baseLogs];
  }

  return contextLines;
}

function renderPipelineSkeleton() {
  return `
    <div class="technical-skeleton-grid" aria-label="Загрузка технических параметров">
      ${Array.from({ length: 6 }).map(() => '<span class="technical-skeleton-line"></span>').join('')}
    </div>
    <div class="technical-skeleton-terminal">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
}

function renderPipelineNoData() {
  return `
    <div class="technical-no-data" role="status">
      <strong>Технические параметры пайплайна отсутствуют</strong>
      <span>Для выбранного файла пока нет pipeline metadata, логов коннектора или технических метрик обработки.</span>
    </div>
  `;
}

function renderColorizedTerminalLogs(lines = []) {
  if (!lines.length) {
    return `<div class="terminal-log-line log-tone-muted"><span class="terminal-log-text">Логи коннектора отсутствуют.</span></div>`;
  }

  return lines.map(line => {
    const text = String(line || '');
    const match = text.match(/\[(SYS|INFO|WARN|ERROR|SUCCESS)\]/);
    const level = match?.[1] || 'LOG';
    const tone = getLogTone(level);
    const cleanText = match ? text.replace(match[0], '').trim() : text;

    if (text === '---') {
      return `<div class="terminal-log-separator" aria-hidden="true"></div>`;
    }

    return `
      <div class="terminal-log-line log-tone-${tone}">
        <span class="terminal-log-level">[${escapeHtml(level)}]</span>
        <span class="terminal-log-text">${escapeHtml(cleanText)}</span>
      </div>
    `;
  }).join('');
}

function getLogTone(level) {
  const tones = {
    SYS: 'sys',
    INFO: 'success',
    SUCCESS: 'success',
    WARN: 'warning',
    ERROR: 'error',
    LOG: 'muted'
  };

  return tones[level] || 'muted';
}

/**
 * Рендерит кросс-ссылки
 */
function renderCrossLinks(crossLinks) {
  if (!crossLinks || crossLinks.length === 0) {
    return `<div style="font-size: 11.5px; color: var(--color-text-muted);">Кросс-ссылки в тексте не обнаружены.</div>`;
  }

  return crossLinks.map(link => {
    const isFound = link.status === 'green';
    const tone = getCrossLinkTone(link.status);
    const context = formatCrossLinkContext(link.context || link.reason || link.extraction_context || getCrossLinkContext(link, isFound));
    const statusLabel = getCrossLinkStatusLabel(link.status);
    return `
      <div class="cross-link-item tone-${tone}">
        <span class="cross-link-icon" aria-hidden="true">
          ${getCrossLinkIcon(tone)}
        </span>
        <div class="cross-link-content">
          <span class="cross-link-text">${link.text}</span>
          <span class="cross-link-context">${context}</span>
        </div>
        <span class="cross-link-badge badge-${tone}">
          <span class="cross-link-badge-dot" aria-hidden="true"></span>
          ${statusLabel}
        </span>
      </div>
    `;
  }).join('');
}

function getCrossLinkContext(link, isFound) {
  const documentName = link.text || 'смежный документ';
  const statusText = isFound
    ? 'Документ найден в загруженном пакете.'
    : 'Документ не найден среди загруженных вложений.';

  return `ИИ обнаружил в тексте текущего файла ссылку на ${documentName}. ${statusText}`;
}

function formatCrossLinkContext(context) {
  return String(context || '')
    .replace(/[«»"“”]/g, '')
    .trim();
}

function renderDocumentComments(extData = {}) {
  const comments = getDocumentComments(extData);

  if (comments.length === 0) {
    return `
      <div class="document-comments-empty" role="status">
        <span class="document-comments-empty-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M5 6.5h14"></path>
            <path d="M5 11.5h9"></path>
            <path d="M5 16.5h6"></path>
          </svg>
        </span>
        <span>Комментарии отсутствуют</span>
      </div>
    `;
  }

  return `
    <div class="document-comments-list">
      ${comments.map(comment => `
        <article class="document-comment-item">
          <div class="document-comment-head">
            <span class="document-comment-author">${escapeHtml(comment.author || 'Автор не указан')}</span>
            <span class="document-comment-date">${escapeHtml(comment.date || '')}</span>
          </div>
          <p class="document-comment-text">${escapeHtml(comment.text)}</p>
        </article>
      `).join('')}
    </div>
  `;
}

function getDocumentComments(extData = {}) {
  if (Array.isArray(extData.comments)) {
    return extData.comments
      .filter(comment => comment && String(comment.text || '').trim())
      .map(comment => ({
        author: comment.author || extData.authorName,
        date: comment.date || extData.uploadDate,
        text: String(comment.text || '').trim()
      }));
  }

  const originalComment = String(extData.originalComment || '').trim();
  if (!originalComment || originalComment === 'Комментарий отсутствует.') {
    return [];
  }

  return [{
    author: extData.authorName || 'Автор не указан',
    date: extData.uploadDate || '',
    text: originalComment
  }];
}

function getCrossLinkTone(status) {
  if (status === 'green') return 'green';
  if (status === 'yellow') return 'yellow';
  if (status === 'blue') return 'blue';
  return 'red';
}

function getCrossLinkStatusLabel(status) {
  if (status === 'green') return 'Приложен';
  if (status === 'yellow') return 'Требует проверки';
  if (status === 'blue') return 'Связан';
  return 'Отсутствует';
}

function getCrossLinkIcon(tone) {
  const icons = {
    red: `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M12 7.2v6.2"></path>
        <path d="M12 16.8h.01"></path>
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"></path>
      </svg>
    `,
    yellow: `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M12 8.2v5.3"></path>
        <path d="M12 17h.01"></path>
        <path d="m10.2 4.8-7.4 12.8A1.6 1.6 0 0 0 4.2 20h15.6a1.6 1.6 0 0 0 1.4-2.4L13.8 4.8a1.6 1.6 0 0 0-3.6 0Z"></path>
      </svg>
    `,
    green: `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="m7.6 12.4 3 3 5.8-6.1"></path>
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"></path>
      </svg>
    `,
    blue: `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M9.6 14.4 14.4 9.6"></path>
        <path d="M10.8 7.2 12 6a4.2 4.2 0 0 1 6 6l-1.2 1.2"></path>
        <path d="M13.2 16.8 12 18a4.2 4.2 0 0 1-6-6l1.2-1.2"></path>
      </svg>
    `
  };

  return icons[tone] || icons.red;
}

/**
 * Имитация кнопки перечитать / пересчитать
 */
window.triggerFileRecalc = function(nodeId) {
  console.log(`Симулятор: Запуск парсинга ветки дерева для узла [${nodeId}]`);
  alert(`Запущен повторный принудительный парсинг и RAG-анализ для файла ID: ${nodeId}.\nСтатусы будут обновлены.`);
};

/**
 * Вспомогательные функции рендеринга логов и полей
 */
function getFileIcon(type) {
  switch (type) {
    case 'msg': return '✉️';
    case 'zip': return '📦';
    case 'xlsx': return '📊';
    case 'docx': return '📝';
    case 'pdf': return '📕';
    default: return '📄';
  }
}

function getConfidenceColorClass(score) {
  if (score >= 90) return 'green';
  if (score >= 70) return 'yellow';
  return 'red';
}

function getConfidenceLabel(score) {
  if (score >= 90) return 'Высокая точность классификации';
  if (score >= 70) return 'Средняя точность (Рекомендуется контроль)';
  return 'Критически низкая точность (Ручная проверка!)';
}

function renderLogsList(logs) {
  if (!logs || logs.length === 0) {
    return `<div class="technical-no-data" role="status"><strong>Логи пайплайна отсутствуют</strong><span>Для выбранного файла пока нет событий обработки.</span></div>`;
  }

  return logs.map(log => {
    let dotStatus = 'status-gray';
    if (log.status === 'green') dotStatus = 'status-green';
    else if (log.status === 'yellow') dotStatus = 'status-yellow';
    else if (log.status === 'red') dotStatus = 'status-red';

    return `
      <div class="log-item">
        <div class="log-meta">
          <span class="log-time">${log.time}</span>
          <span class="log-stage font-weight-600">${log.stage}:</span>
          <span class="rag-dot ${dotStatus}"></span>
        </div>
        <div class="log-text">${log.text}</div>
      </div>
    `;
  }).join('');
}

function getPipelineSeverityCounts(fileNode, extData = {}) {
  const stageStatuses = Object.values(fileNode.pipeline_status || {});
  const logStatuses = (extData.logs || []).map(log => log.status);
  const statuses = [...stageStatuses, ...logStatuses];

  return {
    errors: statuses.filter(status => status === 'red').length,
    warnings: statuses.filter(status => status === 'yellow').length
  };
}

function countNestedFiles(node) {
  if (!node?.children?.length) return 0;

  return node.children.reduce((total, child) => total + 1 + countNestedFiles(child), 0);
}

function getOcrStatus(fileNode) {
  const readStatus = fileNode.pipeline_status?.read;
  if (readStatus === 'green') return 'Текст извлечён';
  if (readStatus === 'loading') return 'Выполняется OCR';
  if (readStatus === 'yellow') return 'Нужна проверка OCR';
  if (readStatus === 'red') return 'Ошибка OCR';
  return 'Ожидает чтения';
}

function toNumber(value) {
  const normalized = Number(String(value || '').replace(/[^\d.]/g, ''));
  return Number.isFinite(normalized) ? normalized : 0;
}

function formatFileSize(bytes) {
  if (!bytes) return '0 МБ';
  return `${(bytes / (1024 * 1024)).toFixed(2)} МБ`;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function findMetadataNodeInTree(nodes, id) {
  for (const node of nodes || []) {
    if (node.id === id) return node;
    const found = findMetadataNodeInTree(node.children, id);
    if (found) return found;
  }

  return null;
}

window.findMetadataNodeById = function(nodeId) {
  return findMetadataNodeInTree(window.treeMockData || [], nodeId);
};


window.toggleMetadataHeaderMenu = function(trigger) {
  const menuWrap = trigger?.closest('.metadata-actions-menu-wrap');
  if (!menuWrap) return;

  const shouldOpen = !menuWrap.classList.contains('open');
  closeMetadataHeaderMenus();

  if (shouldOpen) {
    menuWrap.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
  }
};

function closeMetadataHeaderMenus() {
  document.querySelectorAll('.metadata-actions-menu-wrap.open').forEach(menuWrap => {
    menuWrap.classList.remove('open');
    const trigger = menuWrap.querySelector('.metadata-actions-trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  });
}

function resolveMetadataNode(nodeId) {
  const selectedNode = window.metadataPanelState?.selectedNode;
  const nodeFromTree = nodeId ? window.findMetadataNodeById(nodeId) : null;
  const activeNodeFromTree = window.activeTreeNodeId ? window.findMetadataNodeById(window.activeTreeNodeId) : null;

  if (nodeFromTree) return nodeFromTree;
  if (selectedNode && (!nodeId || selectedNode.id === nodeId)) return selectedNode;
  if (activeNodeFromTree) return activeNodeFromTree;

  return selectedNode || null;
}

function bindMetadataPanelActions(root) {
  if (!root) return;

  root.querySelectorAll('[data-metadata-action]').forEach(actionElement => {
    if (actionElement.dataset.metadataActionBound === 'true') return;
    actionElement.dataset.metadataActionBound = 'true';
    actionElement.addEventListener('click', event => {
      handleMetadataPanelAction(event, actionElement);
    }, true);
  });
}

function bindMetadataPanelAccordions(root) {
  const pipelineDetails = root?.querySelector('.pipeline-overview-section');
  if (!pipelineDetails || pipelineDetails.dataset.accordionStateBound === 'true') return;

  pipelineDetails.dataset.accordionStateBound = 'true';
  pipelineDetails.addEventListener('toggle', () => {
    window.metadataPanelState = {
      ...(window.metadataPanelState || {}),
      pipelineOverviewExpanded: pipelineDetails.open
    };
  });
}

function handleMetadataPanelAction(event, actionElement) {
  if (!actionElement) return false;

  const action = actionElement.dataset.metadataAction;
  const nodeId = actionElement.dataset.nodeId;

  if (action === 'toggle-header-menu') {
    event.preventDefault();
    event.stopPropagation();
    window.toggleMetadataHeaderMenu(actionElement);
    return true;
  }

  closeMetadataHeaderMenus();

  if (action === 'download-file') {
    event.preventDefault();
    event.stopPropagation();
    const node = resolveMetadataNode(nodeId);
    const fileName = node?.name || actionElement.dataset.fileName || 'выбранный файл';
    alert(`Скачивание вложения: ${fileName}`);
    return true;
  }

  if (action === 'recalculate-file') {
    event.preventDefault();
    event.stopPropagation();
    window.triggerFileRecalc(nodeId);
    return true;
  }

  if (action === 'open-technical-pipeline') {
    event.preventDefault();
    event.stopPropagation();
    window.openTechnicalPipelinePanel(nodeId);
    return true;
  }

  if (action === 'restore-metadata-panel') {
    event.preventDefault();
    event.stopPropagation();
    window.restoreMetadataPanel();
    return true;
  }

  if (action === 'copy-pipeline-log') {
    event.preventDefault();
    event.stopPropagation();
    window.copyPipelineLog(nodeId);
    return true;
  }

  if (action === 'expand-connector-log') {
    event.preventDefault();
    event.stopPropagation();
    window.openMetadataBottomDrawer('connector-log', nodeId);
    return true;
  }

  if (action === 'open-node-json') {
    event.preventDefault();
    event.stopPropagation();
    window.openMetadataBottomDrawer('node-json', nodeId);
    return true;
  }

  if (action === 'close-bottom-drawer') {
    event.preventDefault();
    event.stopPropagation();
    window.closeMetadataBottomDrawer();
    return true;
  }

  return false;
}

window.copyPipelineLog = function(nodeId) {
  const node = resolveMetadataNode(nodeId);
  const technicalStats = node?.metadata_details ? getTechnicalPipelineStats(node, node.metadata_details) : [];
  const lines = node?.metadata_details ? getPipelineTerminalLogs(node, node.metadata_details, technicalStats) : [];
  const text = lines.join('\n');
  if (!text) return;

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
};

window.openMetadataBottomDrawer = function(drawerType, nodeId) {
  const node = resolveMetadataNode(nodeId);
  if (!node) return;

  const drawer = ensureMetadataBottomDrawer();
  const title = drawerType === 'node-json'
    ? 'Подробный JSON узла'
    : 'Логи коннектора эмбеддингов';
  const subtitle = `${node.name} · ${node.id}`;
  const content = drawerType === 'node-json'
    ? renderDrawerJsonContent(node)
    : renderDrawerConnectorLogContent(node);
  const drawerModeClass = drawerType === 'node-json'
    ? 'is-node-json'
    : 'is-connector-log';

  drawer.innerHTML = `
    <div class="metadata-bottom-drawer-panel" role="dialog" aria-modal="false" aria-label="${title}">
      <div class="metadata-bottom-drawer-header">
        <div class="metadata-bottom-drawer-title-block">
          <strong>${title}</strong>
          <span>${escapeHtml(subtitle)}</span>
        </div>
        <button class="metadata-bottom-drawer-close" type="button" data-metadata-action="close-bottom-drawer" onclick="event.preventDefault(); event.stopPropagation(); window.closeMetadataBottomDrawer()" aria-label="Закрыть">
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <path d="m5 5 10 10"></path>
            <path d="m15 5-10 10"></path>
          </svg>
        </button>
      </div>
      <div class="metadata-bottom-drawer-body">
        ${content}
      </div>
    </div>
  `;
  drawer.classList.remove('is-node-json', 'is-connector-log');
  drawer.classList.add('is-open', drawerModeClass);
};

window.closeMetadataBottomDrawer = function() {
  const drawer = document.getElementById('metadata-bottom-drawer-root');
  if (!drawer) return;
  drawer.classList.remove('is-open', 'is-node-json', 'is-connector-log');
  drawer.innerHTML = '';
};

function ensureMetadataBottomDrawer() {
  let drawer = document.getElementById('metadata-bottom-drawer-root');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'metadata-bottom-drawer-root';
    drawer.className = 'metadata-bottom-drawer';
    document.body.appendChild(drawer);
  }

  return drawer;
}

function renderDrawerConnectorLogContent(node) {
  const extData = node.metadata_details || {};
  const stats = getTechnicalPipelineStats(node, extData);
  const lines = getPipelineTerminalLogs(node, extData, stats);

  return `
    <div class="drawer-terminal-block">
      <div class="drawer-terminal-toolbar">
        <span>События pipeline и коннектора</span>
        <button class="btn-copy-log" type="button" data-metadata-action="copy-pipeline-log" data-node-id="${node.id}" onclick="event.preventDefault(); event.stopPropagation(); window.copyPipelineLog(this.dataset.nodeId)" title="Скопировать лог">
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <path d="M7 7.2h8v9H7z"></path>
            <path d="M5 13H3.8V3.8h8.4V5"></path>
          </svg>
          <span>Скопировать лог</span>
        </button>
      </div>
      <div class="debug-terminal-logs drawer-terminal-logs">${renderColorizedTerminalLogs(lines)}</div>
    </div>
  `;
}

function renderDrawerJsonContent(node) {
  return `
    <div class="drawer-terminal-block">
      <div class="drawer-terminal-toolbar">
        <span>Структура данных выбранного узла</span>
      </div>
      <pre class="drawer-json-code">${escapeHtml(JSON.stringify(node, null, 2))}</pre>
    </div>
  `;
}

if (!window.metadataPanelDelegatedActionsBound) {
  document.addEventListener('click', event => {
    const actionElement = event.target.closest('[data-metadata-action]');
    if (!actionElement) {
      if (!event.target.closest('.metadata-actions-menu-wrap')) {
        closeMetadataHeaderMenus();
      }
      return;
    }

    handleMetadataPanelAction(event, actionElement);
  }, true);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMetadataHeaderMenus();
      window.closeMetadataBottomDrawer?.();
    }
  });

  window.metadataPanelDelegatedActionsBound = true;
}
