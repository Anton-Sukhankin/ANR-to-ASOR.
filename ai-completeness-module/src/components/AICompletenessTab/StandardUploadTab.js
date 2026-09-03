/* ==========================================================================
   КОМПОНЕНТ ВКЛАДКИ 1: СТАНДАРТНАЯ ЗАГРУЗКА И СПИСОК ДОКУМЕНТОВ
   S.Cost / src / components / AICompletenessTab / StandardUploadTab.js
   ========================================================================== */

// Имитация локальных данных загруженных документов (в точности как на референсе)
const initialDocuments = [
  {
    id: "doc_ref_1",
    type: "Задание на АСОР",
    date: "12.05.2026 12:15",
    author: "Мустафаева Эльвина Сейрановна",
    comment: "Автор не оставил комментариев",
    fileName: "Приложение №1_РСС__СП_5_оч_1_эт_Компл_А1-корп_19_СС_БРИЗ-25-02-26.xlsx",
    fileType: "xlsx"
  },
  {
    id: "doc_ref_2",
    type: "Другое",
    date: "12.05.2026 12:15",
    author: "Мустафаева Эльвина Сейрановна",
    comment: "Автор не оставил комментариев",
    fileName: "Задание для СЦ.docx",
    fileType: "docx"
  },
  {
    id: "doc_ref_3",
    type: "Согласование РП",
    date: "12.05.2026 12:15",
    author: "Мустафаева Эльвина Сейрановна",
    comment: "Автор не оставил комментариев",
    fileName: "RE_ACOP - Расценки СС Бриз Корпус 19.msg",
    fileType: "msg"
  }
];

/**
 * Инициализирует и отрисовывает Вкладку 1 (Стандартная загрузка)
 */
window.initStandardUploadTab = function() {
  const rootContainer = document.getElementById('standard-upload-root');
  if (!rootContainer) return;

  console.log('StandardUploadTab: Отрисовка Вкладки 1...');
  
  // Генерация HTML-структуры под референс
  rootContainer.innerHTML = `
    <!-- Блок загрузки документов (Drag-and-Drop) -->
    <div class="upload-zone-card">
      <div class="upload-fields-row">
        <div class="form-group flex-1">
          <label class="form-label">Тип документа</label>
          <div class="select-wrapper">
            <select class="form-select" id="upload-doc-type">
              <option value="" disabled selected>Выберите тип документа</option>
              <option value="asor">Задание на АСОР</option>
              <option value="rp">Согласование РП</option>
              <option value="other">Другое</option>
            </select>
          </div>
        </div>
        <div class="form-group flex-1">
          <label class="form-label">Комментарий</label>
          <input type="text" class="form-input" id="upload-doc-comment" placeholder="Введите комментарий">
        </div>
      </div>
      
      <!-- Drag-and-Drop область -->
      <div class="drag-drop-area" id="drag-drop-zone">
        <div class="upload-icon-cloud">📁</div>
        <div class="upload-text">
          <span class="upload-link">Загрузите</span> или перетащите файл сюда
        </div>
        <div class="upload-limit">Максимальный размер: 150 МБ</div>
      </div>
    </div>

    <!-- Синий инфо-алерт "Выберите файлы для загрузки" -->
    <div class="info-alert-bar" id="info-alert-files">
      <div class="alert-left">
        <span class="info-icon">ℹ️</span>
        <span class="info-text">Выберите файлы для загрузки</span>
      </div>
      <button class="alert-close-btn" id="btn-close-info-alert">×</button>
    </div>

    <!-- Таблица загруженных документов -->
    <div class="documents-table-wrapper">
      <div class="table-actions-header">
        <h3 class="table-title">Загруженные документы <span class="doc-count">(${initialDocuments.length})</span></h3>
        <div class="action-buttons-group">
          <button class="btn-action secondary disabled" id="btn-tbl-download"><span class="btn-icon">📥</span> Скачать</button>
          <button class="btn-action secondary disabled" id="btn-tbl-delete"><span class="btn-icon">🗑️</span> Пометить на удаление</button>
          <button class="btn-action link-style" id="btn-tbl-download-all">Скачать все</button>
        </div>
      </div>

      <table class="docs-table">
        <thead>
          <tr>
            <th class="col-checkbox"><input type="checkbox" id="selectAllDocs"></th>
            <th class="col-type">Тип документа</th>
            <th class="col-date">Дата загрузки</th>
            <th class="col-author">Автор</th>
            <th class="col-comment">Комментарий</th>
            <th class="col-file">Файл</th>
          </tr>
        </thead>
        <tbody id="docs-table-body">
          ${renderTableRows(initialDocuments)}
        </tbody>
      </table>
    </div>
  `;

  // Настройка интерактивных событий вкладки
  setupLocalListeners();
}

/**
 * Рендерит строки таблицы на основе массива данных
 */
function renderTableRows(docs) {
  return docs.map(doc => {
    // Выбор иконки формата
    let formatIcon = '📄';
    if (doc.fileType === 'xlsx') formatIcon = '📊';
    if (doc.fileType === 'docx') formatIcon = '📝';
    if (doc.fileType === 'msg') formatIcon = '✉️';

    return `
      <tr class="doc-row" data-id="${doc.id}">
        <td class="col-checkbox"><input type="checkbox" class="doc-row-checkbox"></td>
        <td class="col-type"><span class="doc-type-badge">${doc.type}</span></td>
        <td class="col-date">${doc.date}</td>
        <td class="col-author">${doc.author}</td>
        <td class="col-comment">${doc.comment}</td>
        <td class="col-file">
          <div class="file-cell-content">
            <span class="file-icon">${formatIcon}</span>
            <span class="file-name-text" title="${doc.fileName}">${doc.fileName}</span>
            <div class="file-row-actions">
              <button class="row-action-btn download" title="Скачать файл">📥</button>
              <button class="row-action-btn delete" title="Удалить файл">🗑️</button>
            </div>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

/**
 * Внутренние обработчики кликов и драг-событий во Вкладке 1
 */
function setupLocalListeners() {
  const btnCloseAlert = document.getElementById('btn-close-info-alert');
  const infoAlert = document.getElementById('info-alert-files');
  const selectAll = document.getElementById('selectAllDocs');
  const rowCheckboxes = document.querySelectorAll('.doc-row-checkbox');
  const btnDownload = document.getElementById('btn-tbl-download');
  const btnDelete = document.getElementById('btn-tbl-delete');
  
  // Закрытие синего алерта
  if (btnCloseAlert && infoAlert) {
    btnCloseAlert.addEventListener('click', () => {
      infoAlert.style.opacity = '0';
      setTimeout(() => infoAlert.style.display = 'none', 200);
    });
  }

  // Выбор всех чекбоксов
  if (selectAll) {
    selectAll.addEventListener('change', (e) => {
      rowCheckboxes.forEach(cb => {
        cb.checked = e.target.checked;
        const row = cb.closest('.doc-row');
        if (row) {
          if (e.target.checked) row.classList.add('selected');
          else row.classList.remove('selected');
        }
      });
      toggleTableActionButtons();
    });
  }

  // Выбор индивидуального чекбокса
  rowCheckboxes.forEach(cb => {
    cb.addEventListener('change', (e) => {
      const row = cb.closest('.doc-row');
      if (row) {
        if (e.target.checked) row.classList.add('selected');
        else row.classList.remove('selected');
      }
      
      // Снимаем главный чекбокс, если выбран не весь список
      if (!e.target.checked && selectAll) {
        selectAll.checked = false;
      }
      
      toggleTableActionButtons();
    });
  });

  // Активация кнопок действий таблицы в зависимости от чекбоксов
  function toggleTableActionButtons() {
    const checkedCount = document.querySelectorAll('.doc-row-checkbox:checked').length;
    if (checkedCount > 0) {
      btnDownload.classList.remove('disabled');
      btnDelete.classList.remove('disabled');
    } else {
      btnDownload.classList.add('disabled');
      btnDelete.classList.add('disabled');
    }
  }

  // Драг-энд-дроп симуляция
  const dragZone = document.getElementById('drag-drop-zone');
  if (dragZone) {
    dragZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dragZone.classList.add('dragover');
    });

    dragZone.addEventListener('dragleave', () => {
      dragZone.classList.remove('dragover');
    });

    dragZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dragZone.classList.remove('dragover');
      console.log('StandardUploadTab: Файл успешно перетащен в область загрузки.');
    });
  }
}
