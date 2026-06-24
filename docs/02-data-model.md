# Контракт модели данных

Сейчас прототип читает демонстрационные данные из `data/project-data.js` через `window.SCOST_PROJECT_DATA`. Объект совместим с JSON, но хранится как JavaScript, чтобы статичная страница работала без сборщика и без ограничений локального `fetch`.

## Верхний уровень

- `project`: метаданные АСОР и задачи.
- `processingRun`: один запуск обработки АНР.
- `thresholdSettings`: пороги уверенности по типам сущностей.
- `sourceAnrRows`: исходные строки АНР до обработки.
- `asorRows`: плоский список строк таблицы АСОР.
- `matchDecisions`: решения ИИ по сопоставлению.
- `referenceCandidates`: альтернативы из справочников.
- `issues`: предупреждения и ошибки, отображаемые в таблице и дровере.
- `reviewActions`: решения пользователя во время проверки.
- `comments`: комментарии к проблемам или строкам.
- `processingLogEvents`: события журнала обработки.

## Основные сущности

### `sourceAnrRow`

Описывает исходную строку до обработки ИИ:

- `id`
- `rowNumber`
- `rawText`
- `group`
- `work`
- `material`
- `unit`
- `quantity`
- `price`
- `excelFields`

### `asorRow`

Описывает видимую строку таблицы АСОР:

- `id`
- `type`: `group`, `work` или `material`
- `parentId`
- `number`
- `name`
- `unit`
- `values`
- `sourceType`: `manual`, `imported`, `ai-generated` или `mixed`
- `sourceAnrRowId`
- `matchDecisionIds`
- `valueSources`

Приложение строит дерево из плоского массива `asorRows` по полю `parentId`.

### `matchDecision`

Описывает, как ИИ сопоставил исходные данные с АСОР или справочником:

- `id`
- `rowId`
- `sourceAnrRowId`
- `fieldKey`
- `entityType`
- `selectedValue`
- `confidence`
- `threshold`
- `algorithm`
- `steps`
- `candidateIds`
- `warningThresholdReason`

Массив `steps` хранит трехэтапное объяснение: поиск в предыдущем АСОР, анализ соседних строк и сопоставление со справочником по триграммам.

### `referenceCandidate`

Описывает одну альтернативу из справочника:

- `id`
- `entityType`: группа, вид работ, материал, объем или цена
- `code`
- `name`
- `confidence`
- `reason`

### `issue`

Описывает предупреждение или ошибку:

- `id`
- `severity`
- `type`
- `rowId`
- `cellKey`
- `sourceAnrRowId`
- `matchDecisionId`
- `title`
- `description`
- `sourceValue`
- `selectedValue`
- `confidence`
- `alternatives`
- `reason`
- `recommendedAction`
- `status`
- `comments`

## Правила связей

- `asorRow.sourceAnrRowId` связывает строку АСОР с исходной строкой АНР.
- `asorRow.matchDecisionIds` связывает строку с решениями ИИ.
- `issue.rowId` связывает проблему с видимой строкой АСОР.
- `issue.sourceAnrRowId` связывает проблему с исходной строкой АНР.
- `issue.matchDecisionId` связывает проблему с решением ИИ, которое ее вызвало.
- `matchDecision.candidateIds` связывает решение со справочными альтернативами.
- `reviewAction.issueId` и `comment.issueId` связывают работу пользователя с предупреждением или ошибкой.
- `processingLogEvent.rowId` и `processingLogEvent.issueId` позволят в будущем переходить из журнала к строке или проблеме.

## Правило работы в прототипе

Статичный прототип изменяет `issues`, `comments` и `reviewActions` только в памяти страницы. Он не записывает изменения обратно в `data/project-data.js` и не обращается к серверу.
