/* ==========================================================================
   ГЛОБАЛЬНЫЙ ОРКЕСТРАТОР ПРИЛОЖЕНИЯ S.COST: ДИРИЖЕР СОБЫТИЙ
   S.Cost / src / app.js
   ========================================================================== */

// Глобальные ссылки на DOM-элементы общего каркаса S.Cost
const DOM = {
  tabStandard: document.getElementById('tab-standard'),
  tabAI: document.getElementById('tab-ai'),
  paneStandard: document.getElementById('pane-standard'),
  paneAI: document.getElementById('pane-ai'),
  btnTriggerAIChat: document.getElementById('btn-trigger-ai-chat'),
  aiAlertDot: document.getElementById('ai-alert-dot'),
};

let isSimulating = false;
let localSimulating = {};

function runAppStep(label, action) {
  try {
    if (typeof action === 'function') action();
  } catch (error) {
    console.error(`S.Cost App: step failed [${label}]`, error);
  }
}

// ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
document.addEventListener('DOMContentLoaded', () => {
  console.log('S.Cost App: initializing application shell...');

  runAppStep('standard-upload-tab', () => {
    if (window.initStandardUploadTab) window.initStandardUploadTab();
  });

  runAppStep('tab-switcher', setupTabSwitcher);
  runAppStep('event-bridge', setupEventBridge);
  runAppStep('split-resize', setupSplitLayoutResize);

  runAppStep('file-tree', () => {
    if (window.initFileTree) window.initFileTree();
  });

  runAppStep('metadata-panel', () => {
    if (window.initMetadataPanel) window.initMetadataPanel();
  });

  runAppStep('ai-drawer', () => {
    if (window.initAIDrawer) window.initAIDrawer();
  });

  runAppStep('initial-error-state', setInitialErrorState);


});

/**
 * Установка базового демонстрационного состояния некомплекта/ошибок
 */
function setInitialErrorState() {
  console.log('S.Cost App: Установка базового состояния ошибок...');
  
  // Показываем мигающую точку алерта на кнопке ИИ-вкладки
  if (DOM.aiAlertDot) DOM.aiAlertDot.style.display = 'inline-flex';
  
}

/**
 * Логика переключения основных вкладок (Вкладка 1 vs Вкладка 2)
 */
function setupTabSwitcher() {
  DOM.tabStandard.addEventListener('click', () => {
    switchTab('standard');
  });

  DOM.tabAI.addEventListener('click', () => {
    switchTab('ai');
  });
}

function switchTab(tabName) {
  if (tabName === 'standard') {
    DOM.tabStandard.classList.add('active');
    DOM.tabAI.classList.remove('active');
    DOM.paneStandard.classList.add('active');
    DOM.paneAI.classList.remove('active');
  } else if (tabName === 'ai') {
    DOM.tabStandard.classList.remove('active');
    DOM.tabAI.classList.add('active');
    DOM.paneStandard.classList.remove('active');
    DOM.paneAI.classList.add('active');
    
    // Скрываем красный алерт-пульсатор на кнопке вкладки при её посещении
    DOM.aiAlertDot.style.display = 'none';
  }
  console.log(`S.Cost App: Переключение на вкладку [${tabName}]`);
}

/**
 * Перетаскивание разделителя между деревом документов и правой рабочей областью.
 */
function setupSplitLayoutResize() {
  const layout = document.querySelector('.ai-split-layout');
  const handle = document.getElementById('ai-split-resize-handle');
  if (!layout || !handle) return;

  const minPaneWidth = 320;
  const step = 24;

  function getHandleWidth() {
    const value = getComputedStyle(layout).getPropertyValue('--split-handle-width').trim();
    return Number.parseFloat(value) || 16;
  }

  function setSplitLeftWidth(nextLeftWidth) {
    const rect = layout.getBoundingClientRect();
    const handleWidth = getHandleWidth();
    const availableWidth = rect.width - handleWidth;
    if (availableWidth <= minPaneWidth * 2) return;

    const maxLeftWidth = availableWidth - minPaneWidth;
    const leftWidth = Math.min(Math.max(nextLeftWidth, minPaneWidth), maxLeftWidth);
    const percent = Math.round((leftWidth / availableWidth) * 100);

    layout.style.setProperty('--split-left-width', `${Math.round(leftWidth)}px`);
    layout.style.setProperty('--split-right-width', '1fr');
    handle.setAttribute('aria-valuemin', '0');
    handle.setAttribute('aria-valuemax', '100');
    handle.setAttribute('aria-valuenow', String(percent));
  }

  function resetSplitWidth() {
    layout.style.removeProperty('--split-left-width');
    layout.style.removeProperty('--split-right-width');
    handle.setAttribute('aria-valuemin', '0');
    handle.setAttribute('aria-valuemax', '100');
    handle.setAttribute('aria-valuenow', '60');
  }

  function getCurrentLeftWidth() {
    return layout.querySelector('.split-pane-left')?.getBoundingClientRect().width || 0;
  }

  handle.setAttribute('aria-valuemin', '0');
  handle.setAttribute('aria-valuemax', '100');
  handle.setAttribute('aria-valuenow', '60');

  handle.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    event.preventDefault();

    layout.classList.add('is-resizing');
    document.body.classList.add('split-resizing');
    handle.setPointerCapture?.(event.pointerId);

    const onPointerMove = (moveEvent) => {
      const rect = layout.getBoundingClientRect();
      const nextLeftWidth = moveEvent.clientX - rect.left - getHandleWidth() / 2;
      setSplitLeftWidth(nextLeftWidth);
    };

    const stopResize = () => {
      layout.classList.remove('is-resizing');
      document.body.classList.remove('split-resizing');
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', stopResize);
      document.removeEventListener('pointercancel', stopResize);
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', stopResize);
    document.addEventListener('pointercancel', stopResize);
  });

  handle.addEventListener('dblclick', resetSplitWidth);

  handle.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setSplitLeftWidth(getCurrentLeftWidth() - step);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      setSplitLeftWidth(getCurrentLeftWidth() + step);
    }
    if (event.key === 'Home' || event.key === 'Enter') {
      event.preventDefault();
      resetSplitWidth();
    }
  });
}

/**
 * Глобальный мост связи между компонентами (Event Bridge)
 */
function setupEventBridge() {
  
  // А) Клик по файлу в Дереве (Слева) обновляет Панель Метаданных (Справа)
  if (window.onFileSelected) {
    window.onFileSelected((selectedNode) => {
      if (selectedNode) {
        console.log(`Event Bridge: Выбран файл [${selectedNode.name}]. Обновляем панель...`);
        updateSelectedNodeDetails(selectedNode);
        return;
      }

      console.log('Event Bridge: Выбор файла снят. Возвращаем пустое состояние панели.');
      if (window.initMetadataPanel) {
        window.initMetadataPanel();
      }
    });
  }

  // Б) Клик на плавающую круглую кнопку вызывает ИИ-чат (Drawer)
  DOM.btnTriggerAIChat.addEventListener('click', () => {
    if (window.toggleAIDrawer) window.toggleAIDrawer();
  });

}

/**
 * Глобальная имитация/Симулятор прохождения РАГ-пайплайна по всему дереву файлов
 */
function triggerRAGPipelineSim() {
  if (isSimulating) {
    alert("Симуляция РАГ-пайплайна уже запущена. Пожалуйста, дождитесь ее окончания.");
    return;
  }

  isSimulating = true;
  console.log('Симулятор: Запуск РАГ-пайплайна по всему дереву...');

  // 3. Переводим все узлы дерева в состояние Unpack: loading, остальное в очереди (gray)
  forEachNode(window.treeMockData, (node) => {
    node.pipeline_status.unpack = 'loading';
    node.pipeline_status.read = 'gray';
    node.pipeline_status.check = 'gray';
  });
  window.reRenderTree();
  updateActiveNodeMetadata();

  // 4. Шаг 2: Через 1200мс переходим к чтению (Unpack -> green, Read -> loading)
  setTimeout(() => {
    forEachNode(window.treeMockData, (node) => {
      node.pipeline_status.unpack = 'green';
      node.pipeline_status.read = 'loading';
    });
    window.reRenderTree();
    updateActiveNodeMetadata();
  }, 1200);

  // 5. Шаг 3: Через 2400мс переходим к комплектности (Read -> green/yellow, Check -> loading)
  setTimeout(() => {
    forEachNode(window.treeMockData, (node) => {
      node.pipeline_status.read = 'green';
      node.pipeline_status.check = 'loading';
    });
    window.reRenderTree();
    updateActiveNodeMetadata();
  }, 2400);

  // 6. Шаг 4: Через 3600мс завершаем всё полным успехом (Check -> green)
  setTimeout(() => {
    forEachNode(window.treeMockData, (node) => {
      node.pipeline_status.check = 'green';
      node.ai_metadata.error_message = null; // Все ошибки устранены!
      
      if (node.metadata_details) {
        // Добавляем красивый лог об успешном повторном перерасчете
        node.metadata_details.logs.push({
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          stage: "Комплектность",
          status: "green",
          text: "Повторная перепроверка комплектности пройдена успешно. Ошибки устранены."
        });
        
        // Переводим комплаенс-требования в зеленый
        if (node.metadata_details.compliance) {
          node.metadata_details.compliance.forEach(c => c.status = 'green');
        }

        // Переводим все кросс-ссылки в найденные
        if (node.metadata_details.crossLinks) {
          node.metadata_details.crossLinks.forEach(l => l.status = 'green');
        }
      }
    });

    window.reRenderTree();
    
    // Скрываем красный пульсатор на кнопке вкладки
    if (DOM.aiAlertDot) DOM.aiAlertDot.style.display = 'none';

    // Обновляем открытую панель метаданных
    updateActiveNodeMetadata();

    isSimulating = false;
    console.log('Симулятор: Глобальная перепроверка завершена успехом.');
  }, 3800);
}

/**
 * Локальная имитация/Симулятор повторного чтения одного конкретного файла
 */
window.triggerFileRecalc = function(nodeId) {
  if (localSimulating[nodeId]) {
    alert("Пересчет этой ветки уже запущен.");
    return;
  }

  const node = findNodeById(window.treeMockData, nodeId);
  if (!node) return;

  const affectedNodes = collectNodeBranch(node);
  const updateAffectedSelection = () => {
    const activeAffectedNode = affectedNodes.find(item => item.id === window.activeTreeNodeId);
    updateSelectedNodeDetails(activeAffectedNode || node);
  };

  localSimulating[nodeId] = true;
  console.log(`S.Cost simulator: local recalculation started for branch [${nodeId}], nodes: ${affectedNodes.length}`);

  affectedNodes.forEach(item => {
    item.pipeline_status = item.pipeline_status || {};
    item.pipeline_status.unpack = 'loading';
    item.pipeline_status.read = 'gray';
    item.pipeline_status.check = 'gray';
  });
  window.reRenderTree();
  updateAffectedSelection();

  setTimeout(() => {
    affectedNodes.forEach(item => {
      item.pipeline_status = item.pipeline_status || {};
      item.pipeline_status.unpack = 'green';
      item.pipeline_status.read = 'loading';
    });
    window.reRenderTree();
    updateAffectedSelection();
  }, 800);

  setTimeout(() => {
    affectedNodes.forEach(item => {
      item.pipeline_status = item.pipeline_status || {};
      item.pipeline_status.read = 'green';
      item.pipeline_status.check = 'loading';
    });
    window.reRenderTree();
    updateAffectedSelection();
  }, 1600);

  setTimeout(() => {
    affectedNodes.forEach(item => finalizeLocalRecalcNode(item));

    window.reRenderTree();
    updateAffectedSelection();

    localSimulating[nodeId] = false;
    console.log(`S.Cost simulator: local recalculation finished for branch [${nodeId}].`);

    checkOverallStatus();
  }, 2400);
};

function collectNodeBranch(rootNode) {
  const branch = [];
  const walk = (node) => {
    if (!node) return;
    branch.push(node);
    (node.children || []).forEach(walk);
  };
  walk(rootNode);
  return branch;
}

function finalizeLocalRecalcNode(node) {
  node.pipeline_status = node.pipeline_status || {};
  node.pipeline_status.unpack = 'green';
  node.pipeline_status.read = 'green';
  node.pipeline_status.check = 'green';

  node.ai_metadata = node.ai_metadata || {};
  node.ai_metadata.error_message = null;
  node.ai_metadata.confidence = Math.max(Number(node.ai_metadata.confidence) || 0, 99);

  node.metadata_details = node.metadata_details || {};
  node.metadata_details.logs = Array.isArray(node.metadata_details.logs)
    ? node.metadata_details.logs
    : [];
  node.metadata_details.logs.push({
    time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    stage: 'Комплектность',
    status: 'green',
    text: 'Локальный повторный RAG-пересчет завершен для выбранной ветки. Ошибки обработки устранены.'
  });

  if (Array.isArray(node.metadata_details.compliance)) {
    node.metadata_details.compliance.forEach(item => { item.status = 'green'; });
  }
  if (Array.isArray(node.metadata_details.crossLinks)) {
    node.metadata_details.crossLinks.forEach(item => { item.status = 'green'; });
  }
}

window.triggerRAGPipelineSim = triggerRAGPipelineSim;

/**
 * Авто-фокусировка на первой ошибке в дереве
 */
function focusFirstErrorInTree() {
  console.log('Симулятор: Авто-раскрытие дерева на первом файле с ошибкой...');
  
  // Ищем первый проблемный файл. В нашем стейте это xlsx смета (node_1_2)
  const targetRow = document.querySelector('[data-id="node_1_2"] .tree-row');
  if (targetRow) {
    // Симулируем клик по строке для выделения и обновления панели
    targetRow.click();
    // Плавно скроллим к элементу
    targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/**
 * Автоматически переводит общие статусы Gate Keeper и Шапки в Успешно,
 * если все файлы в дереве успешно прошли пайплайн.
 */
function checkOverallStatus() {
  let hasErrors = false;
  
  forEachNode(window.treeMockData, (n) => {
    if (n.pipeline_status.unpack === 'red' || n.pipeline_status.unpack === 'yellow' ||
        n.pipeline_status.read === 'red' || n.pipeline_status.read === 'yellow' ||
        n.pipeline_status.check === 'red' || n.pipeline_status.check === 'yellow') {
      hasErrors = true;
    }
  });

  if (!hasErrors) {
    console.log("Симулятор: Все файлы чисты! Переводим общие статусы Gate Keeper в Успешно.");
    
    if (DOM.aiAlertDot) DOM.aiAlertDot.style.display = 'none';

  }
}

/**
 * Вспомогательный метод для обновления выбранной панели
 */
function updateActiveNodeMetadata() {
  if (window.activeTreeNodeId) {
    const selected = findNodeById(window.treeMockData, window.activeTreeNodeId);
    if (selected) {
      updateSelectedNodeDetails(selected);
    }
  }
}

function updateSelectedNodeDetails(selectedNode) {
  if (!selectedNode) return;

  if (window.metadataPanelState?.mode === 'technical' && window.openTechnicalPipelinePanel) {
    window.openTechnicalPipelinePanel(selectedNode.id);
    return;
  }

  if (window.updateMetadataPanel) {
    window.updateMetadataPanel(selectedNode);
  }
}

/**
 * Рекурсивный поиск объекта узла в структуре по ID
 */
function findNodeById(nodes, id) {
  for (let node of nodes) {
    if (node.id === id) return node;
    if (node.children && node.children.length > 0) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Рекурсивный обход всех узлов дерева
 */
function forEachNode(nodes, callback) {
  for (let node of nodes) {
    callback(node);
    if (node.children && node.children.length > 0) {
      forEachNode(node.children, callback);
    }
  }
}

// Заносим оркестратор в глобальную область видимости
window.DOM = DOM;
window.switchTab = switchTab;
