/* ===========================================================================
   AI SIDEBAR DRAWER
   S.Cost / src / components / AISidebarDrawer / AISidebarDrawer.js
   =========================================================================== */

const defaultChatHistory = [
  {
    "id": "msg_general_1",
    "sender": "user",
    "timestamp": "2026-05-23T10:12:00.000Z",
    "text": "Какие именно ошибки ты нашёл в файле Приложение №1 (смета)? Расскажи подробнее.",
    "attachments": [],
    "actions": []
  },
  {
    "id": "msg_general_2",
    "sender": "ai",
    "timestamp": "2026-05-23T10:12:15.000Z",
    "text": "В файле `Приложение №1_РСС__СП_5_оч_1_эт_Компл_А1-корп_19_СС_БРИЗ-25-02-26.xlsx` на **Листе 2 (Строка 1124)** я обнаружил критическое расхождение сметной расценки с нормативной базой АСОР. Превышение лимита стоимости составляет **+14%**.",
    "attachments": [],
    "actions": [
      {
        "id": "action_apply_estimate",
        "label": "Скорректировать цену строки 1124",
        "payload": {
          "action": "recalc_row",
          "row_id": "1124",
          "new_price": 1120000
        }
      },
      {
        "id": "action_call_human",
        "label": "Позвать оператора",
        "payload": {
          "action": "escalate"
        }
      }
    ]
  },
  {
    "id": "msg_general_3",
    "sender": "user",
    "timestamp": "2026-05-25T12:05:00.000Z",
    "text": "Проверь, изменился ли статус после добавления договора подряда и коммерческого предложения.",
    "attachments": [],
    "actions": []
  },
  {
    "id": "msg_general_4",
    "sender": "ai",
    "timestamp": "2026-05-25T12:06:40.000Z",
    "text": "Договор подряда найден и приложен, но по коммерческому предложению №142 по-прежнему есть расхождение: файл не найден среди загруженных вложений. Статус комплектности остается: **требует проверки**.",
    "attachments": [],
    "actions": [
      {
        "id": "action_recalculate_completeness",
        "label": "Пересчитать комплектность",
        "payload": {
          "action": "recalculate_completeness",
          "row_id": "package_completeness"
        }
      }
    ]
  },
  {
    "id": "msg_general_5",
    "sender": "user",
    "timestamp": "2026-05-26T08:45:00.000Z",
    "text": "Сформируй короткое резюме по текущим критическим замечаниям перед отправкой подрядчику.",
    "attachments": [],
    "actions": []
  },
  {
    "id": "msg_general_6",
    "sender": "ai",
    "timestamp": "2026-05-26T08:46:15.000Z",
    "text": "Критическим остается отсутствие коммерческого предложения №142, на которое есть ссылка в сметном пакете. Также требуется контроль строки 1124 из-за превышения нормативного значения базы АСОР. Рекомендую запросить недостающее КП и после загрузки выполнить повторный расчет комплектности.",
    "attachments": [],
    "actions": [
      {
        "id": "action_accept_summary",
        "label": "Согласиться",
        "payload": {
          "action": "accept_summary",
          "row_id": "critical_summary"
        }
      },
      {
        "id": "action_reject_summary",
        "label": "Не согласиться",
        "payload": {
          "action": "reject_summary",
          "row_id": "critical_summary"
        }
      }
    ]
  }
];

const initialChatWorkspace = {
  activeChatId: 'chat_general',
  chats: [
  {
    "id": "chat_general",
    "title": "Общий чат",
    "description": "Открыт сейчас",
    "participantsLabel": "Сметчик / ИИ-сметчик",
    "unreadCount": 0,
    "context": {
      "mode": "general",
      "projectTitle": "Задание на АСОР Бриз Корпус 19",
      "selectedNodeId": null
    },
    "createdAt": "2026-05-23T10:12:00.000Z",
    "updatedAt": "2026-05-26T08:46:15.000Z",
    "messages": cloneValue(defaultChatHistory)
  },
  {
    "id": "chat_drawings_archive",
    "title": "Чертежи_Архив.zip",
    "description": "Контекст проектных материалов",
    "participantsLabel": "Сметчик / ИИ-сметчик",
    "unreadCount": 2,
    "context": {
      "mode": "selected-document",
      "selectedNodeId": "zip-drawings"
    },
    "createdAt": "2026-05-26T08:30:00.000Z",
    "updatedAt": "2026-05-26T08:45:00.000Z",
    "messages": [
      {
        "id": "chat_drawings_msg_1",
        "sender": "user",
        "timestamp": "2026-05-26T08:30:00.000Z",
        "text": "Проверь архив чертежей: нужно понять, все ли листы рабочей документации извлечены.",
        "attachments": [],
        "actions": []
      },
      {
        "id": "chat_drawings_msg_2",
        "sender": "ai",
        "timestamp": "2026-05-26T08:32:10.000Z",
        "text": "Архив распакован. Найдены разделы КР и АР, но по листу `КР_лист_04.pdf` требуется ручная проверка качества OCR.",
        "attachments": [],
        "actions": []
      },
      {
        "id": "chat_drawings_msg_3",
        "sender": "operator",
        "timestamp": "2026-05-26T08:41:00.000Z",
        "text": "Подтверждаю: лист КР_04 читается частично, нужна повторная выгрузка из исходной CAD-системы.",
        "attachments": [],
        "actions": []
      },
      {
        "id": "chat_drawings_msg_4",
        "sender": "ai",
        "timestamp": "2026-05-26T08:45:00.000Z",
        "text": "Я отметил архив как требующий проверки и связал замечание с позицией `Чертежи_Архив.zip` в дереве вложений.",
        "attachments": [],
        "actions": []
      }
    ]
  },
  {
    "id": "chat_estimate_school",
    "title": "Смета_Школа_01",
    "description": "Проверка сметной позиции",
    "participantsLabel": "Сметчик / ИИ-сметчик",
    "unreadCount": 1,
    "context": {
      "mode": "estimate-review",
      "selectedNodeId": null
    },
    "createdAt": "2026-05-24T16:05:00.000Z",
    "updatedAt": "2026-05-24T16:20:00.000Z",
    "messages": [
      {
        "id": "chat_estimate_school_msg_1",
        "sender": "user",
        "timestamp": "2026-05-24T16:05:00.000Z",
        "text": "Создай отдельный контекст для проверки сметы школы и сравнения расценок по монтажным работам.",
        "attachments": [],
        "actions": []
      },
      {
        "id": "chat_estimate_school_msg_2",
        "sender": "ai",
        "timestamp": "2026-05-24T16:12:30.000Z",
        "text": "Контекст создан. Я выделил 18 позиций с повышенной стоимостью монтажа и сгруппировал их по разделам ведомости.",
        "attachments": [],
        "actions": []
      },
      {
        "id": "chat_estimate_school_msg_3",
        "sender": "ai",
        "timestamp": "2026-05-24T16:20:00.000Z",
        "text": "Непрочитанное уточнение: по разделу вентиляции найдено 3 позиции, где требуется подтверждение коэффициента стесненности.",
        "attachments": [],
        "actions": []
      }
    ]
  },
  {
    "id": "chat_contract_19",
    "title": "Договор_подряда_№19",
    "description": "Проверка договорных ссылок",
    "participantsLabel": "Сметчик / Оператор / ИИ-сметчик",
    "unreadCount": 1,
    "context": {
      "mode": "contract-review",
      "selectedNodeId": null
    },
    "createdAt": "2026-05-24T09:15:00.000Z",
    "updatedAt": "2026-05-24T09:34:00.000Z",
    "messages": [
      {
        "id": "chat_contract_19_msg_1",
        "sender": "user",
        "timestamp": "2026-05-24T09:15:00.000Z",
        "text": "Проверь, закрывает ли договор подряда №19 требования задания на АСОР.",
        "attachments": [],
        "actions": []
      },
      {
        "id": "chat_contract_19_msg_2",
        "sender": "ai",
        "timestamp": "2026-05-24T09:18:20.000Z",
        "text": "Договор найден в пакете и сопоставлен с заданием. Основные реквизиты совпадают, но приложение с графиком поставки отсутствует.",
        "attachments": [],
        "actions": []
      },
      {
        "id": "chat_contract_19_msg_3",
        "sender": "operator",
        "timestamp": "2026-05-24T09:26:00.000Z",
        "text": "График поставки запросили у подрядчика, ожидаем отдельным файлом.",
        "attachments": [],
        "actions": []
      },
      {
        "id": "chat_contract_19_msg_4",
        "sender": "ai",
        "timestamp": "2026-05-24T09:34:00.000Z",
        "text": "Непрочитанное обновление: после повторной проверки график поставки всё ещё не найден среди вложений.",
        "attachments": [],
        "actions": []
      }
    ]
  },
  {
    "id": "chat_offer_142",
    "title": "Коммерческое_предложение_№142",
    "description": "Недостающее КП",
    "participantsLabel": "Сметчик / ИИ-сметчик",
    "unreadCount": 3,
    "context": {
      "mode": "commercial-offer",
      "selectedNodeId": null
    },
    "createdAt": "2026-05-23T18:40:00.000Z",
    "updatedAt": "2026-05-23T19:05:00.000Z",
    "messages": [
      {
        "id": "chat_offer_142_msg_1",
        "sender": "user",
        "timestamp": "2026-05-23T18:40:00.000Z",
        "text": "Проверь, есть ли в пакете коммерческое предложение №142 или оно только упоминается в тексте.",
        "attachments": [],
        "actions": []
      },
      {
        "id": "chat_offer_142_msg_2",
        "sender": "ai",
        "timestamp": "2026-05-23T18:43:00.000Z",
        "text": "В тексте задания и сметы есть ссылка на КП №142, но файл с таким именем или реквизитами не найден.",
        "attachments": [],
        "actions": []
      },
      {
        "id": "chat_offer_142_msg_3",
        "sender": "user",
        "timestamp": "2026-05-23T18:50:00.000Z",
        "text": "Проверь похожие названия, возможно КП лежит в письме как вложение без номера.",
        "attachments": [],
        "actions": []
      },
      {
        "id": "chat_offer_142_msg_4",
        "sender": "ai",
        "timestamp": "2026-05-23T18:58:00.000Z",
        "text": "Найдено похожее вложение `КП_поставщика_материалы.pdf`, но номер 142 в нём не подтверждается.",
        "attachments": [],
        "actions": []
      },
      {
        "id": "chat_offer_142_msg_5",
        "sender": "ai",
        "timestamp": "2026-05-23T19:05:00.000Z",
        "text": "Рекомендую запросить у подрядчика КП №142 отдельным файлом. До загрузки этого документа статус комплектности останется критическим.",
        "attachments": [],
        "actions": [
          {
            "id": "action_request_offer_142",
            "label": "Запросить КП №142",
            "payload": {
              "action": "request_document",
              "document": "КП №142"
            }
          },
          {
            "id": "action_ignore_offer_142",
            "label": "Не учитывать КП",
            "payload": {
              "action": "ignore_requirement",
              "document": "КП №142"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "chat_volumes_sheet",
    "title": "Ведомость_объемов.xlsx",
    "description": "Объемы работ",
    "participantsLabel": "Сметчик / ИИ-сметчик",
    "unreadCount": 0,
    "context": {
      "mode": "volume-sheet",
      "selectedNodeId": null
    },
    "createdAt": "2026-05-22T11:05:00.000Z",
    "updatedAt": "2026-05-22T11:18:00.000Z",
    "messages": [
      {
        "id": "chat_volumes_sheet_msg_1",
        "sender": "user",
        "timestamp": "2026-05-22T11:05:00.000Z",
        "text": "Проверь ведомость объемов и сопоставь её с рабочей документацией.",
        "attachments": [],
        "actions": []
      },
      {
        "id": "chat_volumes_sheet_msg_2",
        "sender": "ai",
        "timestamp": "2026-05-22T11:12:00.000Z",
        "text": "Ведомость прочитана. По основным позициям объемы совпадают с листами КР, но по земляным работам требуется сверка с разделом ПЗУ.",
        "attachments": [],
        "actions": []
      },
      {
        "id": "chat_volumes_sheet_msg_3",
        "sender": "user",
        "timestamp": "2026-05-22T11:18:00.000Z",
        "text": "Принял. Оставим этот чат как рабочий контекст для последующей сверки.",
        "attachments": [],
        "actions": []
      }
    ]
  }
]
};

const CHAT_WORKSPACE_STORAGE_KEY = 'scost.aiChatWorkspace.v1';
let chatWorkspace = loadChatWorkspaceFromStorage();

function cloneValue(value) {
  if (typeof structuredClone === 'function') return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function loadChatWorkspaceFromStorage() {
  try {
    const rawWorkspace = window.localStorage?.getItem(CHAT_WORKSPACE_STORAGE_KEY);
    if (!rawWorkspace) return cloneValue(initialChatWorkspace);

    const parsedWorkspace = JSON.parse(rawWorkspace);
    if (!parsedWorkspace || !Array.isArray(parsedWorkspace.chats) || parsedWorkspace.chats.length === 0) {
      return cloneValue(initialChatWorkspace);
    }

    const hasActiveChat = parsedWorkspace.chats.some(chat => chat.id === parsedWorkspace.activeChatId);
    return {
      activeChatId: hasActiveChat ? parsedWorkspace.activeChatId : parsedWorkspace.chats[0].id,
      chats: parsedWorkspace.chats
    };
  } catch (error) {
    return cloneValue(initialChatWorkspace);
  }
}

function persistChatWorkspace() {
  try {
    window.localStorage?.setItem(CHAT_WORKSPACE_STORAGE_KEY, JSON.stringify(chatWorkspace));
  } catch (error) {
    // localStorage может быть недоступен в приватном режиме; интерфейс остается рабочим в памяти страницы.
  }
}

function getActiveChat() {
  return chatWorkspace.chats.find(chat => chat.id === chatWorkspace.activeChatId) || chatWorkspace.chats[0];
}

function getActiveChatMessages() {
  return getActiveChat()?.messages || [];
}

function pushMessageToActiveChat(message) {
  const activeChat = getActiveChat();
  if (!activeChat) return;
  activeChat.messages.push(message);
  activeChat.updatedAt = message.timestamp;
  persistChatWorkspace();
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

window.initAIDrawer = function() {
  const sceneRoot = document.getElementById('ai-sidebar-drawer-root');
  if (!sceneRoot) return;

  sceneRoot.innerHTML = `
    <div id="ai-drawer" class="ai-drawer">
      <div id="ai-drawer-resize-handle" class="ai-drawer-resize-handle"></div>
      <div class="ai-drawer-content">
        <div class="ai-drawer-header">
          <div class="header-title-block">
            <span class="ai-header-stars" aria-hidden="true">
              <svg class="ai-header-stars-icon" viewBox="0 0 24 24" focusable="false">
                <path d="M12 3.25l1.55 4.2a3.7 3.7 0 0 0 2.2 2.2L19.95 11l-4.2 1.55a3.7 3.7 0 0 0-2.2 2.2L12 18.95l-1.55-4.2a3.7 3.7 0 0 0-2.2-2.2L4.05 11l4.2-1.35a3.7 3.7 0 0 0 2.2-2.2L12 3.25Z"></path>
                <path d="M5.5 15.25l.55 1.5a1.5 1.5 0 0 0 .9.9l1.5.55-1.5.55a1.5 1.5 0 0 0-.9.9l-.55 1.5-.55-1.5a1.5 1.5 0 0 0-.9-.9l-1.5-.55 1.5-.55a1.5 1.5 0 0 0 .9-.9l.55-1.5Z"></path>
                <path d="M18.25 3.25l.45 1.2a1.25 1.25 0 0 0 .75.75l1.2.45-1.2.45a1.25 1.25 0 0 0-.75.75l-.45 1.2-.45-1.2a1.25 1.25 0 0 0-.75-.75l-1.2-.45 1.2-.45a1.25 1.25 0 0 0 .75-.75l.45-1.2Z"></path>
              </svg>
            </span>
            <div class="ai-header-copy">
              <h4 class="ai-header-title">ИИ-Сметчик S.Cost</h4>
              <span class="ai-header-context" id="chat-context-text">Контекст: ИИ-анализ комплектности · Задание на АСОР Бриз Корпус 19</span>
            </div>
          </div>
          <button class="btn-close-drawer" onclick="window.closeAIDrawer()" aria-label="Закрыть чат">×</button>
        </div>

        <div class="ai-drawer-main">
          <nav class="chat-workspace-accordion" id="chat-workspace-accordion" aria-label="Список чатов ИИ-сметчика"></nav>

          <div class="ai-chat-thread">
            <div class="ai-drawer-messages" id="ai-drawer-messages-list"></div>

            <div class="typing-indicator-block" id="typing-indicator" style="display: none;">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-text">ИИ-сметчик думает...</span>
            </div>

            <div class="ai-drawer-footer">
              <div class="input-container">
                <textarea class="ai-chat-textarea" id="ai-chat-input" placeholder="Задать вопрос сметчику..." rows="1"></textarea>
                <button class="btn-attach-file" onclick="alert('Прикрепление файлов: выберите документ для добавления в контекст чата ИИ.')" title="Прикрепить файл" aria-label="Прикрепить файл">
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <path d="M8.5 12.5 14.9 6.1a3.2 3.2 0 1 1 4.5 4.5L10.2 19.8a5 5 0 0 1-7.1-7.1l8.6-8.6a6.7 6.7 0 0 1 9.5 9.5l-8.6 8.6"></path>
                  </svg>
                </button>
                <button class="btn-send-message" id="btn-send-message-btn" aria-label="Отправить сообщение">
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <path d="M4 11.8 20.2 4 16 20l-4.1-6.1L4 11.8Z"></path>
                    <path d="M11.9 13.9 20.2 4"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="chat-create-modal-root" id="chat-create-modal-root"></div>
      </div>
    </div>
  `;

  setupResizeHandle();
  setupOutsideClickClose();
  setupInputHandlers();
  updateAIDrawerContext();
  renderChatWorkspaceAccordion();
  renderChatMessages();
};

function getAIDrawerContextLabel() {
  const projectTitle = getCurrentProjectTitle();
  const selectedNode = window.activeTreeNodeId && window.findMetadataNodeById
    ? window.findMetadataNodeById(window.activeTreeNodeId)
    : null;
  const selectedName = selectedNode?.name ? ` · ${selectedNode.name}` : '';

  if (document.getElementById('metadata-panel-root')?.querySelector('.filtering-panel')) {
    return `Контекст: фильтрация дерева документов · ${projectTitle}`;
  }

  if (window.metadataPanelState?.mode === 'technical') {
    return `Контекст: технические параметры pipeline${selectedName}`;
  }

  if (selectedNode) {
    return `Контекст: выбранный документ${selectedName}`;
  }

  if (document.getElementById('pane-ai')?.classList.contains('active')) {
    return `Контекст: ИИ-анализ комплектности · ${projectTitle}`;
  }

  return `Контекст: загруженные документы · ${projectTitle}`;
}

function getCurrentProjectTitle() {
  return document.querySelector('.scost-header')?.dataset?.projectTitle?.trim()
    || 'Задание на АСОР Бриз Корпус 19';
}

function updateAIDrawerContext() {
  const contextNode = document.getElementById('chat-context-text');
  if (!contextNode) return;
  contextNode.textContent = getAIDrawerContextLabel();
  contextNode.title = contextNode.textContent;
}

window.updateAIDrawerContext = updateAIDrawerContext;

window.toggleAIDrawer = function() {
  const drawer = document.getElementById('ai-drawer');
  if (!drawer) return;

  const isOpen = drawer.classList.toggle('open');
  if (isOpen) {
    updateAIDrawerContext();
    renderChatWorkspaceAccordion();
    const input = document.getElementById('ai-chat-input');
    if (input) input.focus();
    scrollToBottom();
  } else {
    collapseChatWorkspaceAccordion();
  }
};

window.closeAIDrawer = function() {
  const drawer = document.getElementById('ai-drawer');
  if (drawer) drawer.classList.remove('open');
  collapseChatWorkspaceAccordion();
};

function collapseChatWorkspaceAccordion() {
  renderChatWorkspaceAccordion();
}

function renderChatWorkspaceAccordion(options = {}) {
  const root = document.getElementById('chat-workspace-accordion');
  if (!root) return;

  const previousScrollTop = options.preserveScroll
    ? root.querySelector('.chat-workspace-scroll')?.scrollTop || 0
    : 0;
  const activeChat = getActiveChat();

  root.innerHTML = `
    <div class="chat-workspace-shell">
      <button class="chat-create-trigger" type="button" onclick="window.openCreateChatDialog()">
        <span aria-hidden="true">+</span>
        <span>Новый чат</span>
      </button>
      <div class="chat-workspace-scroll">
        <div class="chat-workspace-list">
          ${chatWorkspace.chats.map(chat => renderChatSessionRow(chat, chat.id === activeChat?.id)).join('')}
        </div>
      </div>
    </div>
  `;

  if (options.preserveScroll) {
    const scrollArea = root.querySelector('.chat-workspace-scroll');
    if (scrollArea) scrollArea.scrollTop = previousScrollTop;
  }
}

function renderChatSessionRow(chat, isCurrent) {
  if (!chat) return '';
  const metaLabel = escapeHtml(formatChatSessionMeta(chat));
  const unreadCount = Number(chat.unreadCount) || 0;
  const canDeleteChat = chatWorkspace.chats.length > 1;

  return `
    <div
      class="chat-session-row ${isCurrent ? 'is-current' : ''}"
      role="button"
      tabindex="0"
      onclick="window.selectChatSession('${escapeHtml(chat.id)}')"
      onkeydown="window.handleChatSessionKey(event, '${escapeHtml(chat.id)}')"
      aria-current="${isCurrent ? 'true' : 'false'}"
    >
      <span class="chat-session-copy">
        <span class="chat-session-title" title="${escapeHtml(chat.title)}">${escapeHtml(chat.title)}</span>
        <span class="chat-session-description">${metaLabel}</span>
      </span>
      <span class="chat-session-actions">
        ${unreadCount > 0 ? `
          <span class="chat-session-unread" title="Непрочитанные сообщения">
            ${renderUnreadIcon()}
            <span>${unreadCount}</span>
          </span>
        ` : '<span class="chat-session-unread-placeholder" aria-hidden="true"></span>'}
        <button
          class="chat-session-action-btn chat-session-edit-btn"
          type="button"
          title="Редактировать название чата"
          aria-label="Редактировать название чата"
          onclick="window.openEditChatDialog('${escapeHtml(chat.id)}', event)"
        >
          ${renderEditIcon()}
        </button>
        ${canDeleteChat ? `
          <button
            class="chat-session-action-btn chat-session-delete-btn"
            type="button"
            title="Удалить чат"
            aria-label="Удалить чат"
            onclick="window.openDeleteChatDialog('${escapeHtml(chat.id)}', event)"
          >
            ${renderDeleteIcon()}
          </button>
        ` : ''}
      </span>
    </div>
  `;
}

function renderEditIcon() {
  return `
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M4.75 19.25h3.5L18.7 8.8a2.1 2.1 0 0 0-3-3L5.25 16.25l-.5 3Z"></path>
      <path d="m14.5 7 2.5 2.5"></path>
    </svg>
  `;
}

function renderDeleteIcon() {
  return `
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M5.5 7.25h13"></path>
      <path d="M9.25 7.25V5.8a1.3 1.3 0 0 1 1.3-1.3h2.9a1.3 1.3 0 0 1 1.3 1.3v1.45"></path>
      <path d="M7.25 7.25l.65 11.1a1.55 1.55 0 0 0 1.55 1.45h5.1a1.55 1.55 0 0 0 1.55-1.45l.65-11.1"></path>
      <path d="M10.5 10.75v5.5"></path>
      <path d="M13.5 10.75v5.5"></path>
    </svg>
  `;
}

window.handleChatSessionKey = function(event, chatId) {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  event.preventDefault();
  window.selectChatSession(chatId);
};

window.openEditChatDialog = function(chatId, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const modalRoot = document.getElementById('chat-create-modal-root');
  const chat = chatWorkspace.chats.find(item => item.id === chatId);
  if (!modalRoot || !chat) return;

  modalRoot.innerHTML = `
    <div class="chat-create-backdrop" role="presentation" onclick="window.closeCreateChatDialog(event)">
      <div class="chat-create-dialog" role="dialog" aria-modal="true" aria-labelledby="chat-edit-title" onclick="event.stopPropagation()">
        <div class="chat-create-head">
          <h5 id="chat-edit-title">Редактировать чат</h5>
          <button type="button" class="chat-create-close" onclick="window.closeCreateChatDialog()" aria-label="Закрыть">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="m7 7 10 10"></path>
              <path d="m17 7-10 10"></path>
            </svg>
          </button>
        </div>
        <label class="chat-create-field">
          <span>Название чата</span>
          <input id="chat-edit-name-input" type="text" value="${escapeHtml(chat.title)}" maxlength="80">
        </label>
        <p class="chat-create-hint">Название изменится только для выбранного чата</p>
        <div class="chat-create-actions">
          <button type="button" class="chat-create-btn secondary" onclick="window.closeCreateChatDialog()">Отмена</button>
          <button type="button" class="chat-create-btn primary" onclick="window.confirmEditChat('${escapeHtml(chat.id)}')">Сохранить</button>
        </div>
      </div>
    </div>
  `;

  const input = document.getElementById('chat-edit-name-input');
  if (input) {
    input.focus();
    input.select();
  }
};

window.confirmEditChat = function(chatId) {
  const input = document.getElementById('chat-edit-name-input');
  const chat = chatWorkspace.chats.find(item => item.id === chatId);
  const title = input?.value?.trim();
  if (!chat || !title) return;

  chat.title = title;
  persistChatWorkspace();
  window.closeCreateChatDialog();
  renderChatWorkspaceAccordion();
};

window.openDeleteChatDialog = function(chatId, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const modalRoot = document.getElementById('chat-create-modal-root');
  const chat = chatWorkspace.chats.find(item => item.id === chatId);
  if (!modalRoot || !chat || chatWorkspace.chats.length <= 1) return;

  modalRoot.innerHTML = `
    <div class="chat-create-backdrop" role="presentation" onclick="window.closeCreateChatDialog(event)">
      <div class="chat-create-dialog chat-delete-dialog" role="dialog" aria-modal="true" aria-labelledby="chat-delete-title" onclick="event.stopPropagation()">
        <div class="chat-create-head">
          <h5 id="chat-delete-title">Удалить чат</h5>
          <button type="button" class="chat-create-close" onclick="window.closeCreateChatDialog()" aria-label="Закрыть">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="m7 7 10 10"></path>
              <path d="m17 7-10 10"></path>
            </svg>
          </button>
        </div>
        <p class="chat-delete-text">
          Чат <strong>${escapeHtml(chat.title)}</strong> будет удален из списка. История этого чата больше не будет отображаться в прототипе.
        </p>
        <div class="chat-create-actions">
          <button type="button" class="chat-create-btn secondary" onclick="window.closeCreateChatDialog()">Отмена</button>
          <button type="button" class="chat-create-btn danger" onclick="window.confirmDeleteChat('${escapeHtml(chat.id)}')">Удалить</button>
        </div>
      </div>
    </div>
  `;
};

window.confirmDeleteChat = function(chatId) {
  if (chatWorkspace.chats.length <= 1) return;

  const deleteIndex = chatWorkspace.chats.findIndex(chat => chat.id === chatId);
  if (deleteIndex === -1) return;

  const wasActive = chatWorkspace.activeChatId === chatId;
  chatWorkspace.chats.splice(deleteIndex, 1);

  if (wasActive) {
    const fallbackChat = chatWorkspace.chats[deleteIndex] || chatWorkspace.chats[deleteIndex - 1] || chatWorkspace.chats[0];
    chatWorkspace.activeChatId = fallbackChat?.id || null;
  }

  if (chatWorkspace.chats.length === 1) {
    chatWorkspace.activeChatId = chatWorkspace.chats[0].id;
  }

  persistChatWorkspace();
  window.closeCreateChatDialog();
  renderChatWorkspaceAccordion();
  updateAIDrawerContext();
  renderChatMessages();
};

function renderUnreadIcon() {
  return `
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M4.75 7.25h14.5v9.5H4.75v-9.5Z"></path>
      <path d="m5.25 8 6.75 5 6.75-5"></path>
    </svg>
  `;
}

function formatChatSessionMeta(chat) {
  const updatedLabel = formatChatSessionDate(chat.updatedAt);
  const participants = chat.participantsLabel || 'Сметчик / ИИ-сметчик';
  return `${updatedLabel} · ${participants}`;
}

function formatChatSessionDate(timestamp) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return '';

  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short'
  }).replace('.', '') + `, ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
}

window.toggleChatWorkspaceAccordion = function() {
  renderChatWorkspaceAccordion();
};

window.selectChatSession = function(chatId) {
  const selectedChat = chatWorkspace.chats.find(chat => chat.id === chatId);
  if (!selectedChat) return;
  selectedChat.unreadCount = 0;
  chatWorkspace.activeChatId = chatId;
  persistChatWorkspace();
  renderChatWorkspaceAccordion({ preserveScroll: true });
  updateAIDrawerContext();
  renderChatMessages();
};

window.openCreateChatDialog = function() {
  const modalRoot = document.getElementById('chat-create-modal-root');
  if (!modalRoot) return;

  const suggestedTitle = getSuggestedChatTitle();
  modalRoot.innerHTML = `
    <div class="chat-create-backdrop" role="presentation" onclick="window.closeCreateChatDialog(event)">
      <div class="chat-create-dialog" role="dialog" aria-modal="true" aria-labelledby="chat-create-title" onclick="event.stopPropagation()">
        <div class="chat-create-head">
          <h5 id="chat-create-title">Создать новый чат</h5>
          <button type="button" class="chat-create-close" onclick="window.closeCreateChatDialog()" aria-label="Закрыть">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="m7 7 10 10"></path>
              <path d="m17 7-10 10"></path>
            </svg>
          </button>
        </div>
        <label class="chat-create-field">
          <span>Название чата (контекст)</span>
          <input id="chat-create-name-input" type="text" value="${escapeHtml(suggestedTitle)}" maxlength="80">
        </label>
        <p class="chat-create-hint">Вы можете изменить название чата</p>
        <div class="chat-create-actions">
          <button type="button" class="chat-create-btn secondary" onclick="window.closeCreateChatDialog()">Отмена</button>
          <button type="button" class="chat-create-btn primary" onclick="window.confirmCreateChat()">Создать</button>
        </div>
      </div>
    </div>
  `;

  const input = document.getElementById('chat-create-name-input');
  if (input) {
    input.focus();
    input.select();
  }
};

window.closeCreateChatDialog = function(event) {
  if (event && event.target !== event.currentTarget) return;
  const modalRoot = document.getElementById('chat-create-modal-root');
  if (modalRoot) modalRoot.innerHTML = '';
};

window.confirmCreateChat = function() {
  const input = document.getElementById('chat-create-name-input');
  const title = input?.value?.trim() || 'Новый чат: контекст не выбран';
  const now = new Date().toISOString();
  const chatId = `chat_${Date.now()}`;

  chatWorkspace.chats.unshift({
    id: chatId,
    title,
    description: 'Новый чат добавлен',
    participantsLabel: 'Сметчик / ИИ-сметчик',
    unreadCount: 0,
    context: getCurrentChatContext(),
    createdAt: now,
    updatedAt: now,
    messages: []
  });
  chatWorkspace.activeChatId = chatId;
  persistChatWorkspace();

  window.closeCreateChatDialog();
  renderChatWorkspaceAccordion();
  updateAIDrawerContext();
  renderChatMessages();
};

function getSuggestedChatTitle() {
  const selectedNode = window.activeTreeNodeId && window.findMetadataNodeById
    ? window.findMetadataNodeById(window.activeTreeNodeId)
    : null;
  return selectedNode?.name || 'Новый чат: контекст не выбран';
}

function getCurrentChatContext() {
  const selectedNode = window.activeTreeNodeId && window.findMetadataNodeById
    ? window.findMetadataNodeById(window.activeTreeNodeId)
    : null;

  return {
    mode: window.metadataPanelState?.mode || (selectedNode ? 'selected-document' : 'general'),
    projectTitle: getCurrentProjectTitle(),
    selectedNodeId: selectedNode?.id || null,
    selectedNodeName: selectedNode?.name || null
  };
}

function renderChatMessages() {
  const list = document.getElementById('ai-drawer-messages-list');
  if (!list) return;

  let previousDayKey = '';
  const messages = getActiveChatMessages();
  list.innerHTML = messages.map(msg => {
    const dayKey = getMessageDayKey(msg.timestamp);
    const dateSeparator = dayKey !== previousDayKey ? renderDateSeparator(msg.timestamp) : '';
    previousDayKey = dayKey;

    let bubbleClass = 'bubble-ai';
    let senderName = 'ИИ-Сметчик';
    if (msg.sender === 'user') {
      bubbleClass = 'bubble-user';
      senderName = 'Вы';
    } else if (msg.sender === 'operator') {
      bubbleClass = 'bubble-operator';
      senderName = 'Оператор';
    }

    const formattedTime = new Date(msg.timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    const textHtml = parseMarkdown(msg.text);
    const avatarHtml = msg.sender === 'user'
      ? ''
      : `<div class="message-avatar" aria-hidden="true">${msg.sender === 'operator' ? 'ОП' : 'ИИ'}</div>`;

    return `
      ${dateSeparator}
      <div class="chat-message-row ${msg.sender}">
        ${avatarHtml}
        <div class="chat-message-content">
          <div class="message-meta">
            <span class="message-sender font-weight-600">${senderName}</span>
            <span class="message-time">${formattedTime}</span>
          </div>
          <div class="chat-bubble ${bubbleClass}">
            <div class="bubble-text">${textHtml}</div>
          </div>
          ${renderMessageActions(msg.actions)}
        </div>
      </div>
    `;
  }).join('');

  scrollToBottom();
}

function getMessageDayKey(timestamp) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return 'unknown-date';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function renderDateSeparator(timestamp) {
  const label = formatMessageDateLabel(timestamp);
  return `
    <div class="chat-date-separator" role="separator" aria-label="${escapeHtml(label)}">
      <span class="chat-date-label">${escapeHtml(label)}</span>
    </div>
  `;
}

function formatMessageDateLabel(timestamp) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return 'Дата не указана';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (targetDate.getTime() === today.getTime()) return 'Сегодня';
  if (targetDate.getTime() === yesterday.getTime()) return 'Вчера';

  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function renderMessageActions(actions) {
  if (!actions || actions.length === 0) return '';

  return `
    <div class="message-actions-block" aria-label="Действия по результату аналитики">
      ${actions.map(act => {
        const actionType = act.payload?.action || act.id || 'action';
        return `
          <button class="btn-message-action" data-action-type="${escapeHtml(actionType)}" onclick="window.triggerChatAction('${escapeHtml(act.id)}', '${escapeHtml(act.payload?.action || '')}', '${escapeHtml(act.payload?.row_id || '')}')">
            ${escapeHtml(act.label)}
          </button>
        `;
      }).join('')}
    </div>
  `;
}

function parseMarkdown(text) {
  if (!text) return '';
  let html = escapeHtml(text);

  html = html.replace(/^### (.*?)$/gm, '<h5 class="chat-message-h5">$1</h5>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/`(.*?)`/g, (match, value) => {
    const isErrorToken = /ошибка|🔴/i.test(value);
    const className = isErrorToken ? 'chat-inline-code is-error-token' : 'chat-inline-code';
    return `<code class="${className}">${value}</code>`;
  });
  html = html.replace(/^\* (.*?)$/gm, '<li class="chat-message-li">$1</li>');
  html = html.replace(/(<li class="chat-message-li">.*?<\/li>\n?)+/g, (match) => {
    return `<ul class="chat-message-ul">${match.replace(/\n/g, '')}</ul>`;
  });
  html = html.replace(/\n\n/g, '<br><br>');
  html = html.replace(/\n/g, '<br>');
  html = html.replace(/<br><br>(?=<h5 class="chat-message-h5">|<ul class="chat-message-ul">)/g, '');
  html = html.replace(/(<\/h5>)<br><br>(?=<ul class="chat-message-ul">)/g, '$1');
  html = html.replace(/(<\/ul>)<br><br>(?=<h5 class="chat-message-h5">)/g, '$1');

  return html;
}

function setupResizeHandle() {
  const handle = document.getElementById('ai-drawer-resize-handle');
  const drawer = document.getElementById('ai-drawer');
  if (!handle || !drawer) return;

  let isResizing = false;

  handle.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.body.classList.add('resizing-chat');
    handle.classList.add('active');
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth >= 670 && newWidth <= 1270) {
      drawer.style.width = `${newWidth}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    if (!isResizing) return;
    isResizing = false;
    document.body.classList.remove('resizing-chat');
    handle.classList.remove('active');
  });
}

function setupOutsideClickClose() {
  if (window.__scostAIDrawerOutsideCloseBound) return;
  window.__scostAIDrawerOutsideCloseBound = true;

  document.addEventListener('mousedown', (event) => {
    const drawer = document.getElementById('ai-drawer');
    if (!drawer?.classList.contains('open')) return;

    const trigger = document.getElementById('btn-trigger-ai-chat');
    const clickedInsideDrawer = drawer.contains(event.target);
    const clickedTrigger = trigger?.contains(event.target);

    if (clickedInsideDrawer || clickedTrigger) return;
    window.closeAIDrawer();
  });
}

function setupInputHandlers() {
  const input = document.getElementById('ai-chat-input');
  const sendBtn = document.getElementById('btn-send-message-btn');
  if (!input) return;

  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 120)}px`;
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUserSendMessage();
    }
  });

  if (sendBtn) sendBtn.addEventListener('click', handleUserSendMessage);
}

function handleUserSendMessage() {
  const input = document.getElementById('ai-chat-input');
  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  pushMessageToActiveChat({
    id: `msg_user_${Date.now()}`,
    sender: 'user',
    timestamp: new Date().toISOString(),
    text,
    attachments: [],
    actions: []
  });
  renderChatWorkspaceAccordion();
  renderChatMessages();

  input.value = '';
  input.style.height = 'auto';
  simulateAiResponse(text);
}

function simulateAiResponse(userText) {
  const typing = document.getElementById('typing-indicator');
  if (typing) typing.style.display = 'flex';
  scrollToBottom();

  setTimeout(() => {
    if (typing) typing.style.display = 'none';

    let aiText = 'Я получил ваш вопрос и анализирую контекст документов. Чем могу помочь прямо сейчас?';
    let aiActions = [];
    const lowerText = userText.toLowerCase();

    if (lowerText.includes('ошиб') || lowerText.includes('смет') || lowerText.includes('1124')) {
      aiText = 'По строке **1124** сметы: автоматическая проверка сверила расценку с нормативной базой АСОР-25 и выявила завышение на **+14%**.\n\nРекомендую применить автокоррекцию или привлечь оператора для ручной проверки.';
      aiActions = [
        {
          id: 'action_apply_estimate',
          label: 'Скорректировать цену строки 1124',
          payload: { action: 'recalc_row', row_id: '1124', new_price: 1120000 }
        },
        {
          id: 'action_call_human',
          label: 'Позвать оператора',
          payload: { action: 'escalate' }
        }
      ];
    } else if (lowerText.includes('привет') || lowerText.includes('здравствуй')) {
      aiText = 'Приветствую! Готов помочь проанализировать комплектность, расценки и связи между документами.';
    }

    pushMessageToActiveChat({
      id: `msg_ai_${Date.now()}`,
      sender: 'ai',
      timestamp: new Date().toISOString(),
      text: aiText,
      attachments: [],
      actions: aiActions
    });
    renderChatWorkspaceAccordion();
    renderChatMessages();
  }, 900);
}

window.triggerChatAction = function(actionId, actionType, rowId) {
  if (actionType === 'recalc_row') {
    pushMessageToActiveChat({
      id: `msg_sys_${Date.now()}`,
      sender: 'ai',
      timestamp: new Date().toISOString(),
      text: '⚡ **Системное действие:** сметная расценка по строке **№1124** скорректирована до нормативного лимита базы АСОР (**1 120 000 руб.**). Статус строки сметы переведен в `🟢 Проверено`.',
      attachments: [],
      actions: []
    });
    renderChatWorkspaceAccordion();
    renderChatMessages();
    alert('Расценка в смете успешно скорректирована. Системные статусы комплектности обновлены.');
    return;
  }

  if (actionType === 'escalate') {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.style.display = 'flex';
    scrollToBottom();

    setTimeout(() => {
      if (typing) typing.style.display = 'none';
      pushMessageToActiveChat({
        id: `msg_op_${Date.now()}`,
        sender: 'operator',
        timestamp: new Date().toISOString(),
        text: 'Здравствуйте! Я координатор сметчиков. Подключилась к вашему тикету и проверю обоснование замечания.',
        attachments: [],
        actions: []
      });
      renderChatWorkspaceAccordion();
      renderChatMessages();
    }, 900);
  }
};

function scrollToBottom() {
  const list = document.getElementById('ai-drawer-messages-list');
  if (list) list.scrollTop = list.scrollHeight;
}
