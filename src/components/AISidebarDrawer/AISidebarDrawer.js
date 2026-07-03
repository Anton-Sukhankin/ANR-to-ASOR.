/* ===========================================================================
   AI SIDEBAR DRAWER
   S.Cost / src / components / AISidebarDrawer / AISidebarDrawer.js
   =========================================================================== */

const defaultChatHistory = [];

const initialChatWorkspace = createEscostInitialWorkspace();

const CHAT_WORKSPACE_STORAGE_KEY = 'escost.anrAsor.aiChatWorkspace.v1';
let chatWorkspace = loadChatWorkspaceFromStorage();

function cloneValue(value) {
  if (typeof structuredClone === 'function') return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function loadChatWorkspaceFromStorage() {
  try {
    const rawWorkspace = window.localStorage?.getItem(CHAT_WORKSPACE_STORAGE_KEY);
    if (!rawWorkspace) return cloneValue(createEscostInitialWorkspace());

    const parsedWorkspace = JSON.parse(rawWorkspace);
    if (!parsedWorkspace || !Array.isArray(parsedWorkspace.chats) || parsedWorkspace.chats.length === 0) {
      return cloneValue(createEscostInitialWorkspace());
    }

    const hasActiveChat = parsedWorkspace.chats.some(chat => chat.id === parsedWorkspace.activeChatId);
    return {
      activeChatId: hasActiveChat ? parsedWorkspace.activeChatId : parsedWorkspace.chats[0].id,
      chats: parsedWorkspace.chats
    };
  } catch (error) {
    return cloneValue(createEscostInitialWorkspace());
  }
}

function createEscostInitialWorkspace() {
  const baseTimestamp = '2026-07-03T09:20:00.000Z';
  return {
    activeChatId: 'chat_asor_67408',
    chats: [
      {
        id: 'chat_asor_67408',
        title: 'АСОР №67408',
        description: 'Текущий документ',
        participantsLabel: 'Подрядчик / ИИ-сметчик',
        unreadCount: 0,
        context: {
          mode: 'estimate-document',
          projectTitle: 'АСОР №67408',
          selectedNodeId: null
        },
        createdAt: baseTimestamp,
        updatedAt: '2026-07-03T09:34:00.000Z',
        messages: [
          {
            id: 'escost_msg_1',
            sender: 'ai',
            timestamp: baseTimestamp,
            text: 'Здравствуйте! Я ИИ-сметчик EsCost. Могу помочь разобраться с загрузкой АНР, проверкой предупреждений, выбором справочных значений и правилами работы с текущей сметой.',
            attachments: [],
            actions: []
          },
          {
            id: 'escost_msg_2',
            sender: 'user',
            timestamp: '2026-07-03T09:28:00.000Z',
            text: 'Как понять, почему строка попала в предупреждения?',
            attachments: [],
            actions: []
          },
          {
            id: 'escost_msg_3',
            sender: 'ai',
            timestamp: '2026-07-03T09:29:00.000Z',
            text: 'Откройте кнопку **Проверка ИИ**, выберите фильтр **Предупреждения** и карточку нужной позиции. В блоке сопоставления будет видно исходное значение АНР, выбранное значение АСОР, проверяемый атрибут и уровень уверенности. Если вариант корректный, подтвердите позицию; если нет — выберите другое значение из справочника.',
            attachments: [],
            actions: []
          },
          {
            id: 'escost_msg_4',
            sender: 'user',
            timestamp: '2026-07-03T09:33:00.000Z',
            text: 'Чат может сам изменить строку сметы?',
            attachments: [],
            actions: []
          },
          {
            id: 'escost_msg_5',
            sender: 'ai',
            timestamp: '2026-07-03T09:34:00.000Z',
            text: 'Нет. В этой версии чат только объясняет правила, навигацию и методологию. Он не меняет ячейки, не выбирает значения за пользователя и не привязан к конкретной области таблицы.',
            attachments: [],
            actions: []
          }
        ]
      },
      {
        id: 'chat_rss_123',
        title: 'РСС №123',
        description: 'Методология расценок',
        participantsLabel: 'Подрядчик / ИИ-сметчик',
        unreadCount: 1,
        context: {
          mode: 'methodology',
          projectTitle: 'РСС №123',
          selectedNodeId: null
        },
        createdAt: '2026-07-03T08:40:00.000Z',
        updatedAt: '2026-07-03T08:58:00.000Z',
        messages: [
          {
            id: 'rss_msg_1',
            sender: 'user',
            timestamp: '2026-07-03T08:40:00.000Z',
            text: 'Почему у работы может быть выбрана именно эта группа работ?',
            attachments: [],
            actions: []
          },
          {
            id: 'rss_msg_2',
            sender: 'ai',
            timestamp: '2026-07-03T08:41:00.000Z',
            text: 'Группа работ определяется по ключу распознавания: тип объекта, специализация, соседние строки и найденные совпадения в справочнике. Если уверенность ниже порога, строка попадает в предупреждения и требует проверки сметчиком.',
            attachments: [],
            actions: []
          }
        ]
      },
      {
        id: 'chat_sor_80513',
        title: 'СОР №80513',
        description: 'Онбординг подрядчика',
        participantsLabel: 'Подрядчик / ИИ-сметчик',
        unreadCount: 0,
        context: {
          mode: 'onboarding',
          projectTitle: 'СОР №80513',
          selectedNodeId: null
        },
        createdAt: '2026-07-03T07:50:00.000Z',
        updatedAt: '2026-07-03T08:05:00.000Z',
        messages: [
          {
            id: 'sor_msg_1',
            sender: 'ai',
            timestamp: '2026-07-03T07:50:00.000Z',
            text: 'Начните с загрузки документа, затем проверьте список предупреждений и ошибок переноса. Для нераспознанных строк система покажет исходные параметры АНР: номер, наименование, единицу измерения и объем.',
            attachments: [],
            actions: []
          }
        ]
      }
    ]
  };
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
              <h4 class="ai-header-title">ИИ-сметчик EsCost</h4>
              <span class="ai-header-context" id="chat-context-text">Контекст: текущая смета · АНР → АСОР</span>
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
                <textarea class="ai-chat-textarea" id="ai-chat-input" placeholder="Задать вопрос по смете или интерфейсу..." rows="1"></textarea>
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
              <p class="ai-chat-disclaimer">ИИ может ошибаться</p>
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
  const reviewDrawer = document.getElementById('reviewDrawer');
  const reviewTitle = document.getElementById('reviewContextTitle')?.textContent?.trim();
  const reviewStatus = document.getElementById('reviewCollisionType')?.textContent?.trim();

  if (reviewDrawer?.getAttribute('aria-hidden') === 'false' && reviewTitle) {
    const statusLabel = reviewStatus ? ` · ${reviewStatus}` : '';
    return `Контекст: проверка позиции · ${reviewTitle}${statusLabel}`;
  }

  return `Контекст: текущая смета · ${projectTitle} · АНР → АСОР`;
}

function getCurrentProjectTitle() {
  const title = document.querySelector('.title-row h1')?.textContent?.trim();
  return title || 'АСОР №67408';
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
  document.body.classList.toggle('ai-chat-open', isOpen);
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
  document.body.classList.remove('ai-chat-open');
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

    let aiText = 'Я отвечаю в контексте текущей сметы и правил АНР → АСОР. Могу подсказать, где найти нужный блок, как проверить предупреждение или почему строка могла попасть в ошибки переноса.';
    let aiActions = [];
    const lowerText = userText.toLowerCase();

    if (lowerText.includes('создат') || lowerText.includes('строк')) {
      aiText = 'Чтобы создать или проверить строку, откройте текущую смету, перейдите к панели **Проверка ИИ** и выберите нужный тип позиций. Для созданных строк отображается сопоставление АНР с АСОР, для нераспознанных — исходные параметры АНР и причина, почему строка не была применена.';
    } else if (lowerText.includes('фильтр') || lowerText.includes('отфильтр')) {
      aiText = 'Фильтрация находится в блоке **Список позиций**. Используйте вкладки **Всего создано**, **Предупреждения**, **Ошибки переноса** и **Не распознано**. Стрелки справа листают позиции только внутри выбранного фильтра.';
    } else if (lowerText.includes('ошиб') || lowerText.includes('не распозн')) {
      aiText = 'Ошибки делятся на два типа. **Ошибки переноса** относятся к строкам, которые уже есть в АСОР, но требуют исправления. **Не распознано** — это исходные строки АНР, которые система не смогла применить в АСОР, поэтому по ним нет строки в таблице.';
    } else if (lowerText.includes('цена') || lowerText.includes('расцен') || lowerText.includes('группа') || lowerText.includes('материал')) {
      aiText = 'Методологически система сопоставляет исходный текст АНР со справочниками АСОР и показывает уровень уверенности. Если найдено несколько близких вариантов или уверенность ниже порога, сметчик выбирает корректное значение вручную и подтверждает результат.';
    } else if (lowerText.includes('привет') || lowerText.includes('здравствуй')) {
      aiText = 'Здравствуйте! Я помогу с навигацией по интерфейсу, проверкой предупреждений и методологическими вопросами по сметным позициям.';
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
  pushMessageToActiveChat({
    id: `msg_info_${Date.now()}`,
    sender: 'ai',
    timestamp: new Date().toISOString(),
    text: 'В текущей версии ИИ-чат не выполняет автоматические действия с таблицей. Я могу объяснить следующий шаг, но изменение строки выполняется только пользователем в интерфейсе проверки.',
    attachments: [],
    actions: []
  });
  renderChatWorkspaceAccordion();
  renderChatMessages();
};

function scrollToBottom() {
  const list = document.getElementById('ai-drawer-messages-list');
  if (list) list.scrollTop = list.scrollHeight;
}
