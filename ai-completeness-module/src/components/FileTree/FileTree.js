/* ==========================================================================
   КОМПОНЕНТ ВКЛАДКИ 2: РЕКУРСИВНОЕ ДЕРЕВО ВЛОЖЕНИЙ С РАГ-СТАТУСАМИ
   S.Cost / src / components / FileTree / FileTree.js
   ========================================================================== */

// Имитация дерева вложений (дублирует mockTreeData.json для надежного обхода CORS file://)
const treeMockData = [
  {
    "id": "node_1",
    "name": "RE_ACOP - Расценки СС Бриз Корпус 19.msg",
    "type": "msg",
    "size": 1824050,
    "pipeline_status": {
      "unpack": "green",
      "read": "green",
      "check": "red"
    },
    "ai_metadata": {
      "detected_type": "Электронное письмо с вложениями",
      "confidence": 99,
      "error_message": "Пакет содержит файлы с ошибками комплектности и сбоями OCR."
    },
    "metadata_details": {
      "sourceType": "Согласование РП",
      "authorName": "Смирнов Кирилл Андреевич",
      "authorRole": "estimator",
      "uploadDate": "25.02.2026 10:42",
      "originalComment": "Пересылаю финальные расценки от подрядчика на согласование.",
      "crossLinks": [
        { "text": "Приложение №1_РСС (xlsx)", "status": "green" },
        { "text": "Задание для СЦ (docx)", "status": "green" },
        { "text": "Чертежи_Архив_К19 (zip)", "status": "green" }
      ],
      "logs": [
        { "time": "12.05 12:15:02", "stage": "Распаковка", "status": "green", "text": "Контейнер .msg успешно распакован. Извлечено 3 вложенных файла." },
        { "time": "12.05 12:15:03", "stage": "Чтение", "status": "green", "text": "Метаданные письма прочитаны. Текст письма проанализирован." },
        { "time": "12.05 12:15:05", "stage": "Комплектность", "status": "red", "text": "Обнаружена ошибка комплектности во вложенном архиве и несоответствие нормативной базы в XLSX." }
      ],
      "compliance": [
        { "text": "Наличие электронного согласования от ГИП", "status": "green" }
      ],
      "pipelineTime": "2.1",
      "textChunks": "14",
      "llmModel": "Gemini 2.5 Flash",
      "embeddingLogs": [
        "[INFO] EmbeddingsConnector: Initiating vector search for msg metadata...",
        "[SUCCESS] Vector DB: Found 4 match clusters in project scope.",
        "[INFO] EmbeddingsConnector: Context built successfully."
      ]
    },
    "children": [
      {
        "id": "node_1_1",
        "name": "Задание для СЦ.docx",
        "type": "docx",
        "size": 420800,
        "pipeline_status": {
          "unpack": "green",
          "read": "green",
          "check": "green"
        },
        "ai_metadata": {
          "detected_type": "Задание на АСОР",
          "confidence": 98,
          "error_message": null
        },
        "metadata_details": {
          "sourceType": "Договоры",
          "authorName": "Мустафаева Эльвина Сейрановна",
          "authorRole": "contractor",
          "uploadDate": "25.02.2026 10:45",
          "originalComment": "Официальное задание на АСОР для Бриз Корпус 19.",
          "crossLinks": [
            { "text": "Договор подряда №19-Бриз", "status": "green" },
            { "text": "Коммерческое предложение №142", "status": "red" }
          ],
          "logs": [
            { "time": "12.05 12:15:06", "stage": "Распаковка", "status": "green", "text": "Файл успешно извлечен из MSG." },
            { "time": "12.05 12:15:08", "stage": "Чтение", "status": "green", "text": "Текст DOCX полностью распознан. Спецификации не найдены." },
            { "time": "12.05 12:15:09", "stage": "Комплектность", "status": "green", "text": "Документ полностью соответствует регламенту комплектности." }
          ],
          "compliance": [
            { "text": "Закрывает бизнес-требование: \"Наличие оформленного технического задания\"", "status": "green" }
          ],
          "pipelineTime": "1.2",
          "textChunks": "32",
          "llmModel": "Gemini 2.5 Flash",
          "embeddingLogs": [
            "[INFO] EmbeddingsConnector: Loading docx bytes...",
            "[INFO] TextSplitter: 32 chunks generated using recursive char splitter.",
            "[SUCCESS] Vector DB: Uploaded embeddings to collection 'scost_requirements'."
          ]
        },
        "children": null
      },
      {
        "id": "node_1_2",
        "name": "Приложение №1_РСС__СП_5_оч_1_эт_Компл_А1-корп_19_СС_БРИЗ-25-02-26.xlsx",
        "type": "xlsx",
        "size": 2540000,
        "pipeline_status": {
          "unpack": "green",
          "read": "yellow",
          "check": "red"
        },
        "ai_metadata": {
          "detected_type": "Смета РСС / Спецификация",
          "confidence": 91,
          "error_message": "Обнаружено расхождение: извлеченные объемы сметы (Лист 1) не совпадают с шифром нормативной базы АСОР. Необходима корректировка расценок во 2 столбце."
        },
        "metadata_details": {
          "sourceType": "Смета",
          "authorName": "Мустафаева Эльвина Сейрановна",
          "authorRole": "contractor",
          "uploadDate": "25.02.2026 10:46",
          "originalComment": "Таблица цен и сметных расценок БРИЗ К19.",
          "crossLinks": [
            { "text": "Приложение №3_Материалы", "status": "red" },
            { "text": "Регламент АСОР-25", "status": "green" }
          ],
          "logs": [
            { "time": "12.05 12:15:06", "stage": "Распаковка", "status": "green", "text": "Файл извлечен из MSG." },
            { "time": "12.05 12:15:10", "stage": "Чтение", "status": "yellow", "text": "Распознаны сметные листы. Обнаружено 12 позиций с несоответствием шифра базы." },
            { "time": "12.05 12:15:12", "stage": "Комплектность", "status": "red", "text": "Ошибка валидации сметных сумм по базе ФСНБ-2022. Требуется корректировка сметчика." }
          ],
          "compliance": [
            { "text": "Закрывает бизнес-требование: \"Предоставление сметы в формате РСС\"", "status": "green" }
          ],
          "pipelineTime": "5.4",
          "textChunks": "112",
          "llmModel": "Gemini 1.5 Pro (Heavy)",
          "embeddingLogs": [
            "[INFO] EmbeddingsConnector: Fetching Excel sheet structure...",
            "[WARNING] ParseEngine: Found unsupported style formulas in column 2. Falling back to value-based analysis.",
            "[SUCCESS] Vector DB: Ingested 112 tabular chunks into Vector Space."
          ]
        },
        "children": null
      },
      {
        "id": "node_1_3",
        "name": "Чертежи_Архив_К19.zip",
        "type": "zip",
        "size": 8450120,
        "pipeline_status": {
          "unpack": "green",
          "read": "yellow",
          "check": "yellow"
        },
        "ai_metadata": {
          "detected_type": "Архив проектных материалов",
          "confidence": 95,
          "error_message": "Архив успешно распакован. Обнаружен файл с низким качеством распознавания (низкая уверенность ИИ)."
        },
        "metadata_details": {
          "sourceType": "Архив",
          "authorName": "Смирнов Кирилл Андреевич",
          "authorRole": "estimator",
          "uploadDate": "25.02.2026 10:48",
          "originalComment": "Архив чертежей и проектных планов Корпуса 19.",
          "crossLinks": [
            { "text": "Разрез_Фундамент_К19 (pdf)", "status": "green" },
            { "text": "Спецификация_Материалов_Скан (pdf)", "status": "green" }
          ],
          "logs": [
            { "time": "12.05 12:15:06", "stage": "Распаковка", "status": "green", "text": "Архив успешно распакован. Найдено 2 вложенных PDF документа." },
            { "time": "12.05 12:15:12", "stage": "Чтение", "status": "yellow", "text": "Один из вложенных PDF-сканов распознан с ошибками OCR (Спецификация_Материалов_Скан.pdf)." },
            { "time": "12.05 12:15:14", "stage": "Комплектность", "status": "yellow", "text": "Пакет содержит частично нечитаемые материалы." }
          ],
          "compliance": [
            { "text": "Наличие рабочей документации разделов КР/СС", "status": "green" }
          ],
          "pipelineTime": "8.1",
          "textChunks": "48",
          "llmModel": "Gemini 2.5 Flash",
          "embeddingLogs": [
            "[INFO] EmbeddingsConnector: Unzipping 8.4 MB file stream...",
            "[INFO] ParseEngine: Extracted 2 files (PDF). Running bulk indexation...",
            "[SUCCESS] Vector DB: Indexed archive file tree."
          ]
        },
        "children": [
          {
            "id": "node_1_3_1",
            "name": "Разрез_Фундамент_К19.pdf",
            "type": "pdf",
            "size": 3120500,
            "pipeline_status": {
              "unpack": "green",
              "read": "green",
              "check": "green"
            },
            "ai_metadata": {
              "detected_type": "Рабочая документация (Конструкции)",
              "confidence": 96,
              "error_message": null
            },
            "metadata_details": {
              "sourceType": "Рабочая документация",
              "authorName": "Смирнов Кирилл Андреевич",
              "authorRole": "estimator",
              "uploadDate": "25.02.2026 10:49",
              "originalComment": "Конструктивные чертежи фундамента (КР) Корпус 19.",
              "crossLinks": [
                { "text": "ТЗ на АСОР К19 (docx)", "status": "green" },
                { "text": "Спецификация сметы (xlsx)", "status": "green" }
              ],
              "logs": [
                { "time": "12.05 12:15:07", "stage": "Распаковка", "status": "green", "text": "Файл успешно распакован из архива Чертежи_Архив_К19.zip." },
                { "time": "12.05 12:15:09", "stage": "Чтение", "status": "green", "text": "Текст и векторные слои PDF прочитаны корректно. OCR не требовалось." },
                { "time": "12.05 12:15:11", "stage": "Комплектность", "status": "green", "text": "Штампы чертежа совпадают с шифром Корпуса 19." }
              ],
              "compliance": [
                { "text": "Соответствие шифра объекта на чертеже заданию АСОР", "status": "green" }
              ],
              "pipelineTime": "2.4",
              "textChunks": "8",
              "llmModel": "Gemini 2.5 Flash",
              "embeddingLogs": [
                "[INFO] EmbeddingsConnector: Ingesting vector PDF pages...",
                "[INFO] TextSplitter: 8 high-density structural chunks created.",
                "[SUCCESS] Vector DB: Injected vector elements to project index."
              ]
            },
            "children": null
          },
          {
            "id": "node_1_3_2",
            "name": "Спецификация_Материалов_Скан.pdf",
            "type": "pdf",
            "size": 5140300,
            "pipeline_status": {
              "unpack": "green",
              "read": "red",
              "check": "gray"
            },
            "ai_metadata": {
              "detected_type": "Спецификация материалов и оборудования",
              "confidence": 64,
              "error_message": "Сбой этапа 'Чтение' (OCR): Низкое разрешение сканирования на страницах 3 и 4. Текст размыт, автоматический парсинг спецификации невозможен. Рекомендация: пересканировать документ с разрешением не менее 300 DPI."
            },
            "metadata_details": {
              "sourceType": "Рабочая документация",
              "authorName": "Смирнов Кирилл Андреевич",
              "authorRole": "estimator",
              "uploadDate": "25.02.2026 10:50",
              "originalComment": "Скан спецификации оборудования (низкое качество сканирования).",
              "crossLinks": [
                { "text": "Приложение №1_РСС (xlsx)", "status": "green" },
                { "text": "Оригинальный договор поставок", "status": "red" }
              ],
              "logs": [
                { "time": "12.05 12:15:07", "stage": "Распаковка", "status": "green", "text": "Файл успешно распакован из архива Чертежи_Архив_К19.zip." },
                { "time": "12.05 12:15:10", "stage": "Чтение", "status": "red", "text": "Сбой этапа 'Чтение' (OCR): Разрешение скана < 150 DPI на стр. 3 и 4. Текст размыт, автоматический парсинг таблицы спецификации приостановлен." },
                { "time": "12.05 12:15:11", "stage": "Комплектность", "status": "gray", "text": "Этап пропущен из-за критической ошибки чтения на предыдущем шаге." }
              ],
              "compliance": [
                { "text": "Наличие спецификации оборудования и ведомости материалов", "status": "red" }
              ],
              "pipelineTime": "4.8",
              "textChunks": "56",
              "llmModel": "Gemini 2.5 Flash",
              "embeddingLogs": [
                "[INFO] EmbeddingsConnector: Initiating OCR engine (Tesseract fallback)...",
                "[WARNING] ParseEngine: Confidence too low on pages 3-4 (< 70%). Indexation blocked.",
                "[ERROR] EmbeddingsConnector: Embedding generation failed for 56 chunks."
              ]
            },
            "children": null
          }
        ]
      }
    ]
  }
];

function ensureCrossLinkContext(link) {
  const documentName = link.text || 'смежный документ';
  const statusText = link.status === 'green'
    ? 'Документ найден в загруженном пакете.'
    : 'Документ не найден среди загруженных вложений.';

  return `ИИ обнаружил в тексте текущего файла ссылку на ${documentName}. ${statusText}`;
}

function enrichCrossLinkContexts(nodes) {
  (nodes || []).forEach(node => {
    const links = node.metadata_details?.crossLinks;
    if (Array.isArray(links)) {
      links.forEach(link => {
        if (!link.context) link.context = ensureCrossLinkContext(link);
      });
    }

    if (Array.isArray(node.children)) enrichCrossLinkContexts(node.children);
  });
}

enrichCrossLinkContexts(treeMockData);

function createMetadataDetails({
  sourceType,
  authorName,
  authorRole,
  uploadDate,
  originalComment,
  status,
  pipelineTime,
  textChunks,
  llmModel,
  comments
}) {
  const pipelineLogLevel = status === 'red' ? 'ERROR' : status === 'green' ? 'SUCCESS' : 'INFO';
  const statusText = {
    green: 'Документ успешно обработан и связан с пакетом.',
    loading: 'Документ находится в процессе обработки, следующий этап ожидает результата.',
    yellow: 'Документ обработан с предупреждениями, требуется выборочная проверка.',
    red: 'Обнаружены ошибки обработки, требуется ручное уточнение.',
    gray: 'Этап обработки ожидает запуска или пропущен по правилу.'
  };

  return {
    sourceType,
    authorName,
    authorRole,
    uploadDate,
    originalComment,
    comments: Array.isArray(comments)
      ? comments
      : status === 'loading'
        ? []
        : [{ author: authorName, date: uploadDate, text: originalComment }],
    crossLinks: [
      {
        text: 'Задание на АСОР Бриз Корпус 19',
        status: status === 'red' ? 'red' : 'green',
        context: 'В тексте текущего документа найдено указание на выполнение работ по заданию на АСОР для корпуса 19.'
      },
      {
        text: 'Пакет сметных расчетов РСС',
        status: status === 'gray' ? 'red' : 'green',
        context: 'ИИ обнаружил ссылку на сметный пакет РСС как обязательное основание для проверки стоимости и объемов.'
      }
    ],
    logs: [
      { time: '12.05 12:16:02', stage: 'Распаковка', status: 'green', text: 'Файл принят в структуру вложений.' },
      { time: '12.05 12:16:06', stage: 'Чтение', status, text: statusText[status] }
    ],
    compliance: [
      { text: 'Соответствие пакету комплектности проекта', status: status === 'red' ? 'red' : 'green' }
    ],
    pipelineTime,
    textChunks,
    llmModel,
    embeddingLogs: [
      '[INFO] TreeMock: node inserted into demo state.',
      `[INFO] Parser: ${textChunks} chunks prepared.`,
      `[${pipelineLogLevel}] Pipeline status: ${status}.`
    ]
  };
}

const additionalTreeMockData = [
  {
    id: 'node_2',
    name: 'Пакет_ТДУ_и_ведомостей_Бриз_К19.zip',
    type: 'zip',
    size: 12640500,
    pipeline_status: { unpack: 'green', read: 'yellow', check: 'yellow' },
    ai_metadata: {
      detected_type: 'Архив технической документации и ведомостей',
      confidence: 88,
      error_message: 'Часть вложенных PDF требует ручной проверки качества OCR.'
    },
    metadata_details: createMetadataDetails({
      sourceType: 'Архив',
      authorName: 'Смирнов Кирилл Андреевич',
      authorRole: 'estimator',
      uploadDate: '26.02.2026 09:12',
      originalComment: 'Дополнительные ТДУ, ведомости материалов и сканы согласований.',
      status: 'yellow',
      pipelineTime: '7.6',
      textChunks: '84',
      llmModel: 'Gemini 2.5 Flash'
    }),
    children: [
      {
        id: 'node_2_1',
        name: '01_Технические_данные.zip',
        type: 'zip',
        size: 5830000,
        pipeline_status: { unpack: 'green', read: 'green', check: 'yellow' },
        ai_metadata: {
          detected_type: 'Контейнер технических данных',
          confidence: 92,
          error_message: 'Вложенная спецификация требует сверки с ведомостью материалов.'
        },
        metadata_details: createMetadataDetails({
          sourceType: 'Архив',
          authorName: 'Смирнов Кирилл Андреевич',
          authorRole: 'estimator',
          uploadDate: '26.02.2026 09:13',
          originalComment: 'Подпакет технических исходных данных.',
          status: 'yellow',
          pipelineTime: '4.2',
          textChunks: '41',
          llmModel: 'Gemini 2.5 Flash'
        }),
        children: [
          {
            id: 'node_2_1_1',
            name: 'Раздел_КР.zip',
            type: 'zip',
            size: 3010000,
            pipeline_status: { unpack: 'green', read: 'green', check: 'green' },
            ai_metadata: {
              detected_type: 'Архив раздела конструктивных решений',
              confidence: 95,
              error_message: null
            },
            metadata_details: createMetadataDetails({
              sourceType: 'Архив',
              authorName: 'Смирнов Кирилл Андреевич',
              authorRole: 'estimator',
              uploadDate: '26.02.2026 09:14',
              originalComment: 'КР, чертежи и ведомости по корпусу 19.',
              status: 'green',
              pipelineTime: '3.1',
              textChunks: '26',
              llmModel: 'Gemini 2.5 Flash'
            }),
            children: [
              {
                id: 'node_2_1_1_1',
                name: 'Чертежи_КР_лист_04.pdf',
                type: 'pdf',
                size: 1240000,
                pipeline_status: { unpack: 'green', read: 'green', check: 'green' },
                ai_metadata: {
                  detected_type: 'Рабочий чертеж КР',
                  confidence: 97,
                  error_message: null
                },
                metadata_details: createMetadataDetails({
                  sourceType: 'Рабочая документация',
                  authorName: 'Смирнов Кирилл Андреевич',
                  authorRole: 'estimator',
                  uploadDate: '26.02.2026 09:15',
                  originalComment: 'Лист с конструктивными узлами.',
                  status: 'green',
                  pipelineTime: '1.8',
                  textChunks: '11',
                  llmModel: 'Gemini 2.5 Flash'
                }),
                children: [
                  {
                    id: 'node_2_1_1_1_1',
                    name: 'Фрагмент_узла_КР_04_A.pdf',
                    type: 'pdf',
                    size: 620000,
                    pipeline_status: { unpack: 'green', read: 'loading', check: 'gray' },
                    ai_metadata: {
                      detected_type: 'Фрагмент чертежа с частичным OCR',
                      confidence: 72,
                      error_message: 'Текстовые подписи распознаны частично.'
                    },
                    metadata_details: createMetadataDetails({
                      sourceType: 'Фрагмент PDF',
                      authorName: 'Смирнов Кирилл Андреевич',
                      authorRole: 'estimator',
                      uploadDate: '26.02.2026 09:16',
                      originalComment: 'Фрагмент листа для уточнения сметной позиции.',
                      status: 'loading',
                      pipelineTime: '2.5',
                      textChunks: '6',
                      llmModel: 'Gemini 2.5 Flash'
                    }),
                    children: null
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'node_3',
    name: 'Задание_на_АСОР_Бриз_К19_редакция_02.docx',
    type: 'docx',
    size: 510400,
    pipeline_status: { unpack: 'green', read: 'green', check: 'green' },
    ai_metadata: {
      detected_type: 'Задание на АСОР',
      confidence: 99,
      error_message: null
    },
    metadata_details: createMetadataDetails({
      sourceType: 'Задание',
      authorName: 'Мустафаева Эльвина Сейрановна',
      authorRole: 'contractor',
      uploadDate: '26.02.2026 09:30',
      originalComment: 'Обновленная редакция задания на АСОР.',
      status: 'green',
      pipelineTime: '1.4',
      textChunks: '34',
      llmModel: 'Gemini 2.5 Flash'
    }),
    children: null
  },
  {
    id: 'node_4',
    name: 'Ведомость_объемов_работ_К19.xlsx',
    type: 'xlsx',
    size: 1960000,
    pipeline_status: { unpack: 'green', read: 'yellow', check: 'red' },
    ai_metadata: {
      detected_type: 'Ведомость объемов работ',
      confidence: 86,
      error_message: 'Найдены расхождения объемов по двум позициям.'
    },
    metadata_details: createMetadataDetails({
      sourceType: 'Ведомость',
      authorName: 'Мустафаева Эльвина Сейрановна',
      authorRole: 'contractor',
      uploadDate: '26.02.2026 10:05',
      originalComment: 'ВОР для сверки с локальной сметой.',
      status: 'red',
      pipelineTime: '5.9',
      textChunks: '118',
      llmModel: 'Gemini 1.5 Pro (Heavy)'
    }),
    children: [
      {
        id: 'node_4_1',
        name: 'Лист_проверки_объемов.pdf',
        type: 'pdf',
        size: 860000,
        pipeline_status: { unpack: 'green', read: 'green', check: 'yellow' },
        ai_metadata: {
          detected_type: 'Лист проверки объемов',
          confidence: 90,
          error_message: 'Требуется подтверждение ответственного сметчика.'
        },
        metadata_details: createMetadataDetails({
          sourceType: 'Проверочный лист',
          authorName: 'Мустафаева Эльвина Сейрановна',
          authorRole: 'contractor',
          uploadDate: '26.02.2026 10:07',
          originalComment: 'Пояснение к спорным позициям ВОР.',
          status: 'yellow',
          pipelineTime: '2.2',
          textChunks: '16',
          llmModel: 'Gemini 2.5 Flash'
        }),
        children: null
      }
    ]
  },
  {
    id: 'node_5',
    name: 'Согласование_ГИП_по_комплектности.msg',
    type: 'msg',
    size: 960000,
    pipeline_status: { unpack: 'green', read: 'green', check: 'yellow' },
    ai_metadata: {
      detected_type: 'Электронное согласование комплектности',
      confidence: 94,
      error_message: 'В письме есть ссылка на отсутствующий договор поставки.'
    },
    metadata_details: createMetadataDetails({
      sourceType: 'Письмо',
      authorName: 'Волкова Анна Петровна',
      authorRole: 'estimator',
      uploadDate: '26.02.2026 10:22',
      originalComment: 'Согласование комплекта с приложениями.',
      status: 'yellow',
      pipelineTime: '2.8',
      textChunks: '19',
      llmModel: 'Gemini 2.5 Flash'
    }),
    children: [
      {
        id: 'node_5_1',
        name: 'Приложение_к_согласованию.pdf',
        type: 'pdf',
        size: 710000,
        pipeline_status: { unpack: 'green', read: 'green', check: 'green' },
        ai_metadata: {
          detected_type: 'Приложение к согласованию',
          confidence: 96,
          error_message: null
        },
        metadata_details: createMetadataDetails({
          sourceType: 'Приложение',
          authorName: 'Волкова Анна Петровна',
          authorRole: 'estimator',
          uploadDate: '26.02.2026 10:23',
          originalComment: 'Подтверждение состава пакета.',
          status: 'green',
          pipelineTime: '1.5',
          textChunks: '9',
          llmModel: 'Gemini 2.5 Flash'
        }),
        children: null
      }
    ]
  }
];

const FILTER_STAGE_META = {
  unpack: { key: 'unpack', code: 'Р', label: 'Распаковка' },
  read: { key: 'read', code: 'Ч', label: 'Чтение' },
  check: { key: 'check', code: 'К', label: 'Комплектность' }
};

const FILTER_STATUS_PRIORITY = ['red', 'yellow', 'loading', 'gray', 'green'];
const FILTER_CONTAINER_TYPES = ['msg', 'zip', '7z', 'tar', 'rar'];

const SEMANTIC_FILTER_RULES = [
  { key: 'asor_task', label: 'Задание на АСОР', patterns: ['асор'] },
  { key: 'rss_estimate', label: 'РСС (сметы)', patterns: ['рсс', 'смет', 'ведомость объемов'] },
  { key: 'working_docs', label: 'Рабочая документация', patterns: ['рабоч', 'чертеж', 'спецификац', 'фрагмент'] },
  { key: 'project_docs', label: 'Проектная документация', patterns: ['проект', 'раздел'] },
  { key: 'additional_agreement', label: 'Доп. соглашение', patterns: ['доп', 'соглашение'] },
  { key: 'contract', label: 'Договор', patterns: ['договор', 'контракт'] },
  { key: 'commercial_offer', label: 'Коммерческое предложение (КП)', patterns: ['кп', 'коммер'] },
  { key: 'rp_approval', label: 'Согласование РП', patterns: ['соглас'] }
];

function findMockTreeNode(nodes, id) {
  for (const node of nodes || []) {
    if (node.id === id) return node;
    const found = findMockTreeNode(node.children, id);
    if (found) return found;
  }
  return null;
}

function appendMockTreeChildren(parentId, children) {
  const parent = findMockTreeNode(treeMockData, parentId);
  if (!parent) return;
  parent.children = Array.isArray(parent.children) ? parent.children : [];
  parent.children.push(...children);
}

function getNodeExtension(node = {}) {
  return String(node.type || getExtensionFromName(node.name)).toLowerCase().replace(/^\./, '');
}

function isTreeContainerNode(node) {
  return FILTER_CONTAINER_TYPES.includes(getNodeExtension(node));
}

function getRenderableTreeChildren(node) {
  return isTreeContainerNode(node) && Array.isArray(node.children) ? node.children : [];
}

function hasRenderableTreeChildren(node) {
  return getRenderableTreeChildren(node).length > 0;
}

function normalizeTreeContainerHierarchy(nodes = []) {
  const normalizedNodes = [];

  nodes.forEach(node => {
    const normalizedChildren = Array.isArray(node.children)
      ? normalizeTreeContainerHierarchy(node.children)
      : [];

    if (isTreeContainerNode(node)) {
      node.children = normalizedChildren.length > 0 ? normalizedChildren : null;
      normalizedNodes.push(node);
      return;
    }

    node.children = null;
    normalizedNodes.push(node);
    normalizedNodes.push(...normalizedChildren);
  });

  return normalizedNodes;
}

const extendedTreeMockData = [
  {
    id: 'node_6',
    name: 'Договор_подряда_№19-Бриз.pdf',
    type: 'pdf',
    size: 1740000,
    pipeline_status: { unpack: 'green', read: 'green', check: 'green' },
    ai_metadata: {
      detected_type: 'Договор',
      confidence: 97,
      error_message: null
    },
    metadata_details: createMetadataDetails({
      sourceType: 'Договор',
      authorName: 'Волкова Анна Петровна',
      authorRole: 'estimator',
      uploadDate: '26.02.2026 10:34',
      originalComment: 'Договор подряда, на который ссылается задание и сметный пакет.',
      status: 'green',
      pipelineTime: '2.0',
      textChunks: '27',
      llmModel: 'Gemini 2.5 Flash'
    }),
    children: null
  },
  {
    id: 'node_7',
    name: 'Фотофиксация_обследования_К19.jpg',
    type: 'jpg',
    size: 2840000,
    pipeline_status: { unpack: 'green', read: 'loading', check: 'gray' },
    ai_metadata: {
      detected_type: 'Фотофиксация / скан обследования',
      confidence: 73,
      error_message: 'Изображение находится в OCR-обработке, комплектность будет проверена после извлечения подписей.'
    },
    metadata_details: createMetadataDetails({
      sourceType: 'Другое',
      authorName: 'Шутько Павел Игоревич',
      authorRole: 'contractor',
      uploadDate: '26.02.2026 10:41',
      originalComment: 'Фотофиксация обследования узлов перед уточнением объемов работ.',
      status: 'loading',
      pipelineTime: '3.4',
      textChunks: '5',
      llmModel: 'Gemini 2.5 Flash',
      comments: []
    }),
    children: null
  }
];

const formatCoverageTreeData = [
  {
    id: 'node_8',
    name: 'Договорные_материалы_и_переписка_К19.rar',
    type: 'rar',
    size: 4380000,
    pipeline_status: { unpack: 'green', read: 'yellow', check: 'yellow' },
    ai_metadata: {
      detected_type: 'Архив договорных материалов',
      confidence: 91,
      error_message: 'В архиве есть устаревшая редакция договора и письмо с уточнением КП.'
    },
    metadata_details: createMetadataDetails({
      sourceType: 'Договор',
      authorName: 'Шутько Павел Игоревич',
      authorRole: 'contractor',
      uploadDate: '26.02.2026 11:05',
      originalComment: 'Архив договорных материалов подрядчика с письмом-уточнением.',
      status: 'yellow',
      pipelineTime: '4.1',
      textChunks: '42',
      llmModel: 'Gemini 2.5 Flash'
    }),
    children: [
      {
        id: 'node_8_1',
        name: 'Договор_поставки_редакция_01.doc',
        type: 'doc',
        size: 920000,
        pipeline_status: { unpack: 'green', read: 'yellow', check: 'yellow' },
        ai_metadata: {
          detected_type: 'Договор',
          confidence: 86,
          error_message: 'Документ похож на устаревшую редакцию договора поставки.'
        },
        metadata_details: createMetadataDetails({
          sourceType: 'Договор',
          authorName: 'Шутько Павел Игоревич',
          authorRole: 'contractor',
          uploadDate: '26.02.2026 11:06',
          originalComment: 'DOC-версия договора поставки для сверки с актуальной редакцией.',
          status: 'yellow',
          pipelineTime: '2.4',
          textChunks: '38',
          llmModel: 'Gemini 2.5 Flash'
        }),
        children: null
      },
      {
        id: 'node_8_2',
        name: 'Письмо_поставщика_с_уточнением_КП.msg',
        type: 'msg',
        size: 1180000,
        pipeline_status: { unpack: 'green', read: 'green', check: 'yellow' },
        ai_metadata: {
          detected_type: 'Почтовое сообщение с вложениями',
          confidence: 94,
          error_message: 'Во вложении найдено КП, требующее сверки с договором.'
        },
        metadata_details: createMetadataDetails({
          sourceType: 'Согласование РП',
          authorName: 'Волкова Анна Петровна',
          authorRole: 'estimator',
          uploadDate: '26.02.2026 11:08',
          originalComment: 'Письмо поставщика с уточнением коммерческого предложения.',
          status: 'yellow',
          pipelineTime: '2.9',
          textChunks: '21',
          llmModel: 'Gemini 2.5 Flash'
        }),
        children: [
          {
            id: 'node_8_2_1',
            name: 'КП_поставщика_№142.xls',
            type: 'xls',
            size: 1340000,
            pipeline_status: { unpack: 'green', read: 'yellow', check: 'yellow' },
            ai_metadata: {
              detected_type: 'Коммерческое предложение (КП)',
              confidence: 88,
              error_message: 'Стоимость оборудования требует сверки с лимитами АСОР.'
            },
            metadata_details: createMetadataDetails({
              sourceType: 'Коммерческое предложение (КП)',
              authorName: 'Шутько Павел Игоревич',
              authorRole: 'contractor',
              uploadDate: '26.02.2026 11:09',
              originalComment: 'XLS-таблица коммерческого предложения поставщика.',
              status: 'yellow',
              pipelineTime: '3.6',
              textChunks: '73',
              llmModel: 'Gemini 1.5 Pro (Heavy)'
            }),
            children: null
          },
          {
            id: 'node_8_2_2',
            name: 'Фото_маркировки_оборудования.jpeg',
            type: 'jpeg',
            size: 2280000,
            pipeline_status: { unpack: 'green', read: 'loading', check: 'gray' },
            ai_metadata: {
              detected_type: 'Фотофиксация / скан обследования',
              confidence: 70,
              error_message: 'Изображение находится в OCR-обработке.'
            },
            metadata_details: createMetadataDetails({
              sourceType: 'Другое',
              authorName: 'Шутько Павел Игоревич',
              authorRole: 'contractor',
              uploadDate: '26.02.2026 11:10',
              originalComment: 'JPEG-фото маркировки оборудования для подтверждения позиции КП.',
              status: 'loading',
              pipelineTime: '3.0',
              textChunks: '3',
              llmModel: 'Gemini 2.5 Flash',
              comments: []
            }),
            children: null
          }
        ]
      }
    ]
  },
  {
    id: 'node_9',
    name: 'OCR_сканы_и_контрольные_листы_К19.7z',
    type: '7z',
    size: 5120000,
    pipeline_status: { unpack: 'green', read: 'loading', check: 'gray' },
    ai_metadata: {
      detected_type: 'Архив сканов и контрольных листов',
      confidence: 90,
      error_message: 'Часть изображений еще проходит OCR.'
    },
    metadata_details: createMetadataDetails({
      sourceType: 'Другое',
      authorName: 'Смирнов Кирилл Андреевич',
      authorRole: 'estimator',
      uploadDate: '26.02.2026 11:18',
      originalComment: 'Архив с OCR-сканами, текстовым протоколом и контрольными листами.',
      status: 'loading',
      pipelineTime: '5.2',
      textChunks: '31',
      llmModel: 'Gemini 2.5 Flash',
      comments: []
    }),
    children: [
      {
        id: 'node_9_1',
        name: 'Протокол_OCR_распознавания.txt',
        type: 'txt',
        size: 180000,
        pipeline_status: { unpack: 'green', read: 'green', check: 'green' },
        ai_metadata: {
          detected_type: 'Текстовый файл',
          confidence: 96,
          error_message: null
        },
        metadata_details: createMetadataDetails({
          sourceType: 'Другое',
          authorName: 'Смирнов Кирилл Андреевич',
          authorRole: 'estimator',
          uploadDate: '26.02.2026 11:19',
          originalComment: 'TXT-протокол распознавания сканов для проверки пайплайна.',
          status: 'green',
          pipelineTime: '0.8',
          textChunks: '9',
          llmModel: 'Gemini 2.5 Flash'
        }),
        children: null
      },
      {
        id: 'node_9_2',
        name: 'Схема_узла_монтажа.png',
        type: 'png',
        size: 1640000,
        pipeline_status: { unpack: 'green', read: 'yellow', check: 'gray' },
        ai_metadata: {
          detected_type: 'Фрагмент чертежа / изображение',
          confidence: 74,
          error_message: 'Размерные подписи на PNG распознаны частично.'
        },
        metadata_details: createMetadataDetails({
          sourceType: 'Рабочая документация',
          authorName: 'Смирнов Кирилл Андреевич',
          authorRole: 'estimator',
          uploadDate: '26.02.2026 11:20',
          originalComment: 'PNG-схема монтажного узла для OCR-проверки.',
          status: 'yellow',
          pipelineTime: '3.3',
          textChunks: '5',
          llmModel: 'Gemini 2.5 Flash'
        }),
        children: null
      },
      {
        id: 'node_9_3',
        name: 'Контрольные_листы_проверки.tar',
        type: 'tar',
        size: 1860000,
        pipeline_status: { unpack: 'green', read: 'green', check: 'yellow' },
        ai_metadata: {
          detected_type: 'Архив контрольных листов',
          confidence: 92,
          error_message: 'Один контрольный лист содержит замечание по комплектности.'
        },
        metadata_details: createMetadataDetails({
          sourceType: 'Согласование РП',
          authorName: 'Волкова Анна Петровна',
          authorRole: 'estimator',
          uploadDate: '26.02.2026 11:23',
          originalComment: 'TAR-архив контрольных листов проверки комплекта.',
          status: 'yellow',
          pipelineTime: '2.7',
          textChunks: '18',
          llmModel: 'Gemini 2.5 Flash'
        }),
        children: [
          {
            id: 'node_9_3_1',
            name: 'Лист_замечаний_комплектности.pdf',
            type: 'pdf',
            size: 760000,
            pipeline_status: { unpack: 'green', read: 'green', check: 'yellow' },
            ai_metadata: {
              detected_type: 'Согласование РП',
              confidence: 87,
              error_message: 'В листе указано замечание по отсутствующему приложению.'
            },
            metadata_details: createMetadataDetails({
              sourceType: 'Согласование РП',
              authorName: 'Волкова Анна Петровна',
              authorRole: 'estimator',
              uploadDate: '26.02.2026 11:24',
              originalComment: 'PDF-лист замечаний по комплектности.',
              status: 'yellow',
              pipelineTime: '1.7',
              textChunks: '14',
              llmModel: 'Gemini 2.5 Flash'
            }),
            children: null
          },
          {
            id: 'node_9_3_2',
            name: 'Ведомость_контроля_объемов.xls',
            type: 'xls',
            size: 980000,
            pipeline_status: { unpack: 'green', read: 'green', check: 'green' },
            ai_metadata: {
              detected_type: 'Ведомость объемов работ',
              confidence: 93,
              error_message: null
            },
            metadata_details: createMetadataDetails({
              sourceType: 'Ведомость',
              authorName: 'Мустафаева Эльвина Сейрановна',
              authorRole: 'contractor',
              uploadDate: '26.02.2026 11:25',
              originalComment: 'XLS-ведомость контроля объемов из TAR-архива.',
              status: 'green',
              pipelineTime: '2.2',
              textChunks: '45',
              llmModel: 'Gemini 1.5 Pro (Heavy)'
            }),
            children: null
          }
        ]
      }
    ]
  }
];

treeMockData.push(...additionalTreeMockData);

appendMockTreeChildren('node_2', [
  {
    id: 'node_2_2',
    name: '02_Геология_и_основания.pdf',
    type: 'pdf',
    size: 2180000,
    pipeline_status: { unpack: 'green', read: 'green', check: 'yellow' },
    ai_metadata: {
      detected_type: 'Проектная документация',
      confidence: 89,
      error_message: 'Требуется сверка ссылок на геологические приложения.'
    },
    metadata_details: createMetadataDetails({
      sourceType: 'Проектная документация',
      authorName: 'Смирнов Кирилл Андреевич',
      authorRole: 'estimator',
      uploadDate: '26.02.2026 09:18',
      originalComment: 'Раздел с исходными инженерно-геологическими условиями.',
      status: 'yellow',
      pipelineTime: '2.7',
      textChunks: '22',
      llmModel: 'Gemini 2.5 Flash'
    }),
    children: null
  },
  {
    id: 'node_2_3',
    name: '03_Ведомость_материалов_ТДУ.xlsx',
    type: 'xlsx',
    size: 1460000,
    pipeline_status: { unpack: 'green', read: 'yellow', check: 'yellow' },
    ai_metadata: {
      detected_type: 'Ведомость материалов',
      confidence: 84,
      error_message: 'Найдены позиции без ссылки на спецификацию материалов.'
    },
    metadata_details: createMetadataDetails({
      sourceType: 'Смета',
      authorName: 'Мустафаева Эльвина Сейрановна',
      authorRole: 'contractor',
      uploadDate: '26.02.2026 09:19',
      originalComment: 'Ведомость материалов из технических данных подрядчика.',
      status: 'yellow',
      pipelineTime: '3.8',
      textChunks: '67',
      llmModel: 'Gemini 1.5 Pro (Heavy)'
    }),
    children: null
  }
]);

appendMockTreeChildren('node_2_1', [
  {
    id: 'node_2_1_2',
    name: 'Пояснительная_записка_ТДУ.docx',
    type: 'docx',
    size: 740000,
    pipeline_status: { unpack: 'green', read: 'green', check: 'green' },
    ai_metadata: {
      detected_type: 'Проектная документация',
      confidence: 94,
      error_message: null
    },
    metadata_details: createMetadataDetails({
      sourceType: 'Проектная документация',
      authorName: 'Смирнов Кирилл Андреевич',
      authorRole: 'estimator',
      uploadDate: '26.02.2026 09:20',
      originalComment: 'Пояснительная записка к техническим исходным данным.',
      status: 'green',
      pipelineTime: '1.9',
      textChunks: '29',
      llmModel: 'Gemini 2.5 Flash'
    }),
    children: null
  },
  {
    id: 'node_2_1_3',
    name: 'Скан_подписей_ТДУ.pdf',
    type: 'pdf',
    size: 930000,
    pipeline_status: { unpack: 'green', read: 'red', check: 'gray' },
    ai_metadata: {
      detected_type: 'Скан согласования',
      confidence: 61,
      error_message: 'OCR не распознал часть подписей на скане.'
    },
    metadata_details: createMetadataDetails({
      sourceType: 'Согласование РП',
      authorName: 'Волкова Анна Петровна',
      authorRole: 'estimator',
      uploadDate: '26.02.2026 09:21',
      originalComment: 'Скан листа подписей по техническим данным.',
      status: 'red',
      pipelineTime: '4.6',
      textChunks: '12',
      llmModel: 'Gemini 2.5 Flash'
    }),
    children: null
  }
]);

appendMockTreeChildren('node_2_1_1', [
  {
    id: 'node_2_1_1_2',
    name: 'Спецификация_КР_лист_04.xlsx',
    type: 'xlsx',
    size: 1180000,
    pipeline_status: { unpack: 'green', read: 'green', check: 'yellow' },
    ai_metadata: {
      detected_type: 'РСС (сметы)',
      confidence: 88,
      error_message: 'Требуется сверка количества материалов с листом КР-04.'
    },
    metadata_details: createMetadataDetails({
      sourceType: 'Смета',
      authorName: 'Мустафаева Эльвина Сейрановна',
      authorRole: 'contractor',
      uploadDate: '26.02.2026 09:22',
      originalComment: 'Табличная спецификация к листу КР-04.',
      status: 'yellow',
      pipelineTime: '3.2',
      textChunks: '51',
      llmModel: 'Gemini 1.5 Pro (Heavy)'
    }),
    children: null
  }
]);

appendMockTreeChildren('node_2_1_1_1', [
  {
    id: 'node_2_1_1_1_2',
    name: 'Фрагмент_узла_КР_04_B.jpg',
    type: 'jpg',
    size: 540000,
    pipeline_status: { unpack: 'green', read: 'yellow', check: 'gray' },
    ai_metadata: {
      detected_type: 'Фрагмент чертежа / изображение',
      confidence: 69,
      error_message: 'Часть размеров распознана неуверенно, требуется контроль.'
    },
    metadata_details: createMetadataDetails({
      sourceType: 'Рабочая документация',
      authorName: 'Смирнов Кирилл Андреевич',
      authorRole: 'estimator',
      uploadDate: '26.02.2026 09:23',
      originalComment: 'JPG-фрагмент узла КР-04 для проверки OCR на изображениях.',
      status: 'yellow',
      pipelineTime: '2.9',
      textChunks: '4',
      llmModel: 'Gemini 2.5 Flash'
    }),
    children: null
  }
]);

appendMockTreeChildren('node_4', [
  {
    id: 'node_4_2',
    name: 'Протокол_разногласий_по_объемам.docx',
    type: 'docx',
    size: 680000,
    pipeline_status: { unpack: 'green', read: 'green', check: 'red' },
    ai_metadata: {
      detected_type: 'Доп. соглашение',
      confidence: 82,
      error_message: 'В протоколе есть ссылка на отсутствующее приложение с корректировками.'
    },
    metadata_details: createMetadataDetails({
      sourceType: 'Доп. соглашение',
      authorName: 'Мустафаева Эльвина Сейрановна',
      authorRole: 'contractor',
      uploadDate: '26.02.2026 10:09',
      originalComment: 'Протокол разногласий по объемам работ.',
      status: 'red',
      pipelineTime: '2.6',
      textChunks: '24',
      llmModel: 'Gemini 2.5 Flash'
    }),
    children: null
  }
]);

appendMockTreeChildren('node_5', [
  {
    id: 'node_5_2',
    name: 'Ответ_ГИП_по_КП_№142.msg',
    type: 'msg',
    size: 820000,
    pipeline_status: { unpack: 'green', read: 'green', check: 'yellow' },
    ai_metadata: {
      detected_type: 'Согласование РП',
      confidence: 91,
      error_message: 'В письме подтверждается необходимость приложить КП №142 отдельным файлом.'
    },
    metadata_details: createMetadataDetails({
      sourceType: 'Согласование РП',
      authorName: 'Волкова Анна Петровна',
      authorRole: 'estimator',
      uploadDate: '26.02.2026 10:25',
      originalComment: 'Ответ ГИП о составе коммерческих предложений.',
      status: 'yellow',
      pipelineTime: '2.1',
      textChunks: '18',
      llmModel: 'Gemini 2.5 Flash'
    }),
    children: null
  }
]);

treeMockData.push(...extendedTreeMockData, ...formatCoverageTreeData);
const normalizedTreeMockData = normalizeTreeContainerHierarchy(treeMockData);
treeMockData.length = 0;
treeMockData.push(...normalizedTreeMockData);
refreshTreeFilterMetadata();

// Хранилище обработчиков событий выбора файлов (Event Bridge)
let fileSelectedCallback = null;
let activeProblemIndex = 0;
let treeSearchQuery = '';
let treeAppliedFilters = {};
let treeFilterSubscriptionBound = false;
let treeOkSummaryDismissed = false;
let treeSummaryExpanded = false;

/**
 * Инициализирует и отрисовывает дерево файлов на Вкладке 2
 */
window.initFileTree = function() {
  const treeRoot = document.getElementById('file-tree-root');
  if (!treeRoot) return;

  console.log('FileTree: Отрисовка дерева вложений...');

  renderTreeShell(treeRoot);
  setupTreeInteractions();
};

function renderTreeShell(treeRoot) {
  refreshTreeFilterMetadata();
  const problems = collectProblemNodes(treeMockData);
  const criticalCount = problems.filter(item => item.severity === 'critical').length;
  const warningCount = problems.filter(item => item.severity === 'warning').length;
  const treeStats = getTreeStats(treeMockData);
  const treeViewContext = createTreeViewContext(treeMockData, treeSearchQuery, treeAppliedFilters);
  if (problems.length > 0) treeOkSummaryDismissed = false;
  renderTreeStatsCards(treeStats);

  treeRoot.innerHTML = `
    <div class="tree-shell">
      <div class="tree-fixed-head">
        <div class="tree-toolbar">
          <div class="tree-toolbar-main">
            <div class="tree-toolbar-title">Структура вложений</div>
          </div>
          <div class="tree-status-legend" aria-label="Легенда статусов обработки">
            <span class="legend-item"><span class="tree-status-empty"></span> Выполнено</span>
            <span class="legend-item"><span class="tree-status-dot status-processing"></span> В обработке</span>
            <span class="legend-item"><span class="tree-status-dot status-review"></span> Требует проверки</span>
            <span class="legend-item"><span class="tree-status-dot status-failed"></span> Невыполнено</span>
          </div>
        </div>
        ${renderTreeSummary(problems, criticalCount, warningCount)}
        ${renderTreeTools(treeViewContext)}
      </div>
      <div class="tree-scroll-area" id="tree-scroll-area">
        <ul class="tree-nodes-list" id="tree-container-ul">
          ${buildTreeHTML(treeMockData, 0, treeViewContext)}
        </ul>
        <div id="tree-search-empty-slot">
          ${renderTreeSearchEmpty(treeViewContext)}
        </div>
      </div>
    </div>
  `;
}

function renderProblemNavigator(problems) {
  if (problems.length === 0) return '';

  const current = Math.min(activeProblemIndex + 1, problems.length);
  return `
    <div class="tree-problem-nav" aria-label="Навигация по проблемам">
      <span class="tree-problem-count">Проблемы</span>
      <button type="button" class="tree-problem-nav-btn" data-problem-direction="-1" title="Предыдущая проблема">‹</button>
      <span class="tree-problem-position">${current}/${problems.length}</span>
      <button type="button" class="tree-problem-nav-btn" data-problem-direction="1" title="Следующая проблема">›</button>
    </div>
  `;
}

function getTreeStats(nodes) {
  const flatNodes = [];
  walkTree(nodes, node => flatNodes.push(node));

  const total = flatNodes.length;
  const processed = flatNodes.filter(node => !node.filter_metadata?.status?.is_pending).length;
  const warnings = flatNodes.filter(node =>
    node.filter_metadata?.status?.has_warning && !node.filter_metadata?.status?.has_error
  ).length;
  const errors = flatNodes.filter(node => node.filter_metadata?.status?.has_error).length;
  const completenessOk = flatNodes.filter(node => node.pipeline_status?.check === 'green').length;
  const processing = flatNodes.filter(node => {
    const statuses = Object.values(node.pipeline_status || {});
    return statuses.includes('loading') || statuses.includes('gray');
  }).length;
  const requirements = getTreeRequirementStats(flatNodes);

  return {
    total,
    processed,
    processedPct: getPercent(processed, total),
    warnings,
    warningsPct: getPercent(warnings, total),
    errors,
    errorsPct: getPercent(errors, total),
    processing,
    completenessPct: getPercent(completenessOk, total),
    requirements,
    overall: getOverallDocumentStatus({ total, warnings, errors, processing, requirements })
  };
}

function getPercent(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

function getTreeRequirementStats(nodes) {
  const uniqueRequirements = new Map();

  nodes.forEach(node => {
    const details = node.metadata_details || {};
    [...(details.compliance || []), ...(details.crossLinks || [])].forEach(item => {
      if (!item?.text) return;
      const key = item.text.toLowerCase();
      if (!uniqueRequirements.has(key)) {
        uniqueRequirements.set(key, {
          text: item.text,
          status: item.status || 'gray'
        });
        return;
      }

      const current = uniqueRequirements.get(key);
      if (current.status !== 'red' && item.status === 'red') current.status = 'red';
      if (current.status === 'green' && item.status === 'yellow') current.status = 'yellow';
    });
  });

  const items = Array.from(uniqueRequirements.values());
  const total = items.length;
  const closed = items.filter(item => item.status === 'green').length;
  const missing = items.filter(item => item.status === 'red').length;

  return {
    total,
    closed,
    missing,
    closedPct: getPercent(closed, total)
  };
}

function getOverallDocumentStatus({ total, warnings, errors, processing, requirements }) {
  if (errors > 0 || requirements.missing > 0) {
    return {
      key: 'blocked',
      apiStatus: 'Blocked',
      stageStatus: 'ERROR',
      tone: 'error',
      title: 'Комплектность не подтверждена',
      description: 'Обнаружены критические ошибки или отсутствуют обязательные документы. Дальнейшая обработка невозможна без вмешательства.',
      icon: '<path d="M12 8v5"></path><path d="M12 16.5h.01"></path><path d="M10.2 4.9 3.4 17.1c-.7 1.2.2 2.7 1.6 2.7h14c1.4 0 2.3-1.5 1.6-2.7L13.8 4.9c-.8-1.3-2.8-1.3-3.6 0Z"></path>'
    };
  }

  if (processing > 0 || total === 0) {
    return {
      key: 'processing',
      apiStatus: 'Processing',
      stageStatus: 'PROCESSING',
      tone: 'processing',
      title: 'Выполняется проверка комплектности',
      description: 'Документ проходит стадии распаковки, чтения и проверки комплектности. Пожалуйста, подождите завершения процесса.',
      icon: '<path d="M12 3a9 9 0 1 0 9 9"></path><path d="M21 3v6h-6"></path>'
    };
  }

  if (warnings > 0) {
    return {
      key: 'manual_review',
      apiStatus: 'Manual Review',
      stageStatus: 'REVIEW',
      tone: 'warning',
      title: 'Требуется ручная проверка',
      description: 'Система распознала документы, но некоторые позиции требуют ручного подтверждения сметчиком.',
      icon: '<path d="M12 8v5"></path><path d="M12 16.5h.01"></path><path d="M10.2 4.9 3.4 17.1c-.7 1.2.2 2.7 1.6 2.7h14c1.4 0 2.3-1.5 1.6-2.7L13.8 4.9c-.8-1.3-2.8-1.3-3.6 0Z"></path>'
    };
  }

  return {
    key: 'allowed',
    apiStatus: 'Allowed',
    stageStatus: 'Done',
    tone: 'success',
    title: 'Комплектность подтверждена',
    description: 'Все обязательные требования закрыты распознанными документами. РВЕ можно пропускать дальше по процессу.',
    icon: '<path d="M12 3.8 19 6.8v5.1c0 4.1-2.8 7.4-7 8.3-4.2-.9-7-4.2-7-8.3V6.8z"></path><path d="m8.8 12.2 2.1 2.1 4.5-4.8"></path>'
  };
}

function renderTreeStatsCards(stats) {
  const summaryRoot = document.getElementById('tree-summary-cards-root');
  if (!summaryRoot) return;
  const requirementsNote = stats.requirements.missing > 0
    ? 'Есть обязательные требования без вложений'
    : 'Все обязательные требования закрыты';
  const profileNote = stats.overall.key === 'blocked'
    ? 'Профиль содержит незакрытые обязательные правила'
    : 'Все обязательные правила профиля закрыты найденными вложениями';

  summaryRoot.innerHTML = `
    <section class="rve-dashboard-card rve-dashboard-${stats.overall.tone} ${treeSummaryExpanded ? 'is-summary-expanded' : 'is-summary-collapsed'}" aria-label="Общий статус и сводная статистика РВЕ">
      ${renderOverallDocumentStatus(stats)}
      <section class="rve-summary-cards" id="rve-summary-cards" aria-label="Сводная статистика по структуре вложений" aria-hidden="${treeSummaryExpanded ? 'false' : 'true'}">
        ${renderRveSummaryCard({
          tone: 'requirements',
          label: 'Требования',
          value: `${stats.requirements.closed}/${stats.requirements.missing}`,
          note: requirementsNote
        })}
        ${renderRveSummaryCard({
          tone: 'complete',
          label: 'Комплектность',
          value: `${stats.completenessPct}%`,
          note: 'по проверке обязательных вложений',
          progress: stats.completenessPct
        })}
        ${renderRveSummaryCard({
          tone: 'documents',
          label: 'Документы',
          value: stats.total,
          note: 'документов'
        })}
        ${renderRveSummaryCard({
          tone: 'processing',
          label: 'В обработке',
          value: stats.processing,
          note: 'ожидают завершения анализа'
        })}
        ${renderRveSummaryCard({
          tone: 'warnings',
          label: 'Предупреждения',
          value: stats.warnings,
          note: 'требуют внимания'
        })}
        ${renderRveSummaryCard({
          tone: 'errors',
          label: 'Ошибки',
          value: stats.errors,
          note: 'критических ошибок'
        })}
        ${renderRveSummaryCard({
          tone: 'profile',
          label: 'Профиль проверки',
          value: 'АСОР / ПИР v3',
          note: profileNote
        })}
      </section>
    </section>
  `;

  const summaryStatusCard = summaryRoot.querySelector('.overall-status-card');
  if (summaryStatusCard) {
    summaryStatusCard.addEventListener('click', () => {
      treeSummaryExpanded = !treeSummaryExpanded;
      renderTreeStatsCards(getTreeStats(treeMockData));
    });
  }
}

function renderOverallDocumentStatus(stats) {
  const { overall } = stats;

  return `
    <section class="overall-status-card overall-${overall.tone}" aria-label="Общий статус РВЕ">
      <button
        type="button"
        class="overall-status-icon"
        id="rve-summary-toggle"
        aria-label="${treeSummaryExpanded ? 'Свернуть сводную статистику' : 'Развернуть сводную статистику'}"
        aria-controls="rve-summary-cards"
        aria-expanded="${treeSummaryExpanded ? 'true' : 'false'}"
        title="${treeSummaryExpanded ? 'Свернуть сводную статистику' : 'Развернуть сводную статистику'}"
      >
        <span class="overall-status-glyph" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            ${overall.icon}
          </svg>
        </span>
        <span class="overall-summary-toggle-glyph" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            ${treeSummaryExpanded ? '<path d="m7 15 5-5 5 5"></path>' : '<path d="m7 9 5 5 5-5"></path>'}
          </svg>
        </span>
      </button>
      <div class="overall-status-main">
        <strong class="overall-status-title">${overall.title}</strong>
        <span class="overall-status-description">${overall.description}</span>
      </div>
    </section>
  `;
}

function renderRveSummaryCard({ tone, label, value, note, progress = null }) {
  return `
    <article class="rve-summary-card rve-summary-${tone}">
      <span class="rve-summary-label">${label}</span>
      <strong class="rve-summary-value">${value}</strong>
      ${progress !== null ? `<span class="rve-summary-progress" aria-hidden="true"><span style="width: ${progress}%"></span></span>` : ''}
      <span class="rve-summary-note">${note}</span>
    </article>
  `;
}

function renderTreeTools(treeViewContext) {
  const safeQuery = escapeAttribute(treeSearchQuery);
  const activeFiltersCount = getActiveFiltersCount(treeAppliedFilters);
  const filterClass = activeFiltersCount > 0 ? ' active' : '';

  return `
    <div class="tree-tools" aria-label="Поиск и фильтрация дерева документов">
      <label class="tree-search-field">
        <span class="tree-search-icon" aria-hidden="true">
          <svg viewBox="0 0 20 20" focusable="false">
            <circle cx="8.5" cy="8.5" r="5.2"></circle>
            <path d="M12.5 12.5 16 16"></path>
          </svg>
        </span>
        <input
          type="search"
          id="tree-search-input"
          value="${safeQuery}"
          placeholder="Поиск по структуре документов"
          autocomplete="off"
          aria-label="Поиск по структуре документов"
        >
      </label>
      <span class="tree-filter-control">
        <button type="button" class="tree-filter-btn${filterClass}" id="tree-filter-trigger" aria-label="Фильтрация" title="Фильтрация">
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <path d="M3.5 4.5h13l-5 5.8v4.1l-3 1.4v-5.5z"></path>
          </svg>
        </button>
        ${renderTreeFilterBadge(activeFiltersCount)}
      </span>
    </div>
  `;
}

function renderTreeFilterBadge(activeFiltersCount) {
  if (activeFiltersCount <= 0) return '';

  return `
    <button type="button" class="tree-filter-badge" id="tree-filter-reset-badge" aria-label="Сбросить примененные фильтры" title="Сбросить примененные фильтры">
      <span class="tree-filter-badge-count">${activeFiltersCount}</span>
      <span class="tree-filter-badge-reset" aria-hidden="true">×</span>
    </button>
  `;
}

function renderTreeSearchEmpty(treeViewContext) {
  if (!treeViewContext.isActive || treeViewContext.matchCount > 0) return '';

  return `
    <div class="tree-search-empty" role="status">
      <strong>Ничего не найдено</strong>
      <span>Попробуйте изменить запрос или сбросить выбранные фильтры.</span>
    </div>
  `;
}

function refreshTreeFilterMetadata() {
  enrichTreeFilterMetadata(treeMockData);
  if (typeof window !== 'undefined') {
    window.treeFilterIndex = buildTreeFilterIndex(treeMockData);
  }
}

function enrichTreeFilterMetadata(nodes, ancestors = []) {
  nodes.forEach((node, index) => {
    const pathNodes = [...ancestors, node];
    const parent = ancestors[ancestors.length - 1] || null;
    const stageEntries = buildStageFilterEntries(node.pipeline_status || {});
    const stageStatuses = Object.values(node.pipeline_status || {});
    const overallStatus = getOverallFilterStatus(stageStatuses);
    const technicalFormat = getTechnicalFormatFilter(node);
    const semanticType = getSemanticTypeFilter(node);
    const uploader = getUploaderFilter(node);

    node.filter_metadata = {
      schema_version: 1,
      status: {
        overall: overallStatus,
        colors: Array.from(new Set(stageStatuses)),
        has_error: stageStatuses.includes('red'),
        has_warning: stageStatuses.includes('yellow'),
        is_processing: stageStatuses.includes('loading'),
        is_success: stageStatuses.length > 0 && stageStatuses.every(status => status === 'green'),
        is_pending: stageStatuses.includes('gray')
      },
      pipeline: {
        stages: stageEntries,
        error_stages: stageEntries.filter(stage => stage.status === 'red').map(stage => stage.key),
        warning_stages: stageEntries.filter(stage => stage.status === 'yellow').map(stage => stage.key),
        processing_stages: stageEntries.filter(stage => stage.status === 'loading').map(stage => stage.key),
        pending_stages: stageEntries.filter(stage => stage.status === 'gray').map(stage => stage.key),
        problem_stages: stageEntries
          .filter(stage => ['red', 'yellow'].includes(stage.status))
          .map(stage => stage.key)
      },
      semantic_type: semanticType,
      uploaded_by: uploader,
      technical_format: technicalFormat,
      tree_context: {
        depth: ancestors.length,
        order_index: index,
        parent_id: parent ? parent.id : null,
        ancestor_ids: ancestors.map(item => item.id),
        ancestor_names: ancestors.map(item => item.name),
        path_ids: pathNodes.map(item => item.id),
        path_names: pathNodes.map(item => item.name),
        path_label: pathNodes.map(item => item.name).join(' / '),
        has_children: hasRenderableTreeChildren(node)
      },
      filter_flags: {
      include_for_status_filter: true,
      include_for_semantic_filter: true,
      include_for_uploader_filter: Boolean(uploader.full_name),
      include_for_format_filter: true,
        expand_ancestors_on_match: ancestors.map(item => item.id)
      }
    };

    const renderableChildren = getRenderableTreeChildren(node);
    if (renderableChildren.length > 0) {
      enrichTreeFilterMetadata(renderableChildren, pathNodes);
    }
  });
}

function buildStageFilterEntries(statuses) {
  return Object.keys(FILTER_STAGE_META).map(key => ({
    ...FILTER_STAGE_META[key],
    status: statuses[key] || 'gray',
    is_error: statuses[key] === 'red',
    is_warning: statuses[key] === 'yellow',
    is_processing: statuses[key] === 'loading',
    is_pending: statuses[key] === 'gray',
    is_success: statuses[key] === 'green'
  }));
}

function getOverallFilterStatus(statuses) {
  return FILTER_STATUS_PRIORITY.find(status => statuses.includes(status)) || 'gray';
}

function getSemanticTypeFilter(node) {
  const detectedType = node.ai_metadata?.detected_type || '';
  const normalizedType = normalizeFilterValue(detectedType);
  const matchedRule = SEMANTIC_FILTER_RULES.find(rule =>
    rule.patterns.some(pattern => normalizedType.includes(pattern))
  );

  if (matchedRule) {
    return {
      key: matchedRule.key,
      label: matchedRule.label,
      detected_label: detectedType,
      source: 'ai_metadata.detected_type'
    };
  }

  return {
    key: 'other',
    label: 'Другое',
    detected_label: detectedType || 'Тип не определен',
    source: detectedType ? 'ai_metadata.detected_type' : 'fallback'
  };
}

function getUploaderFilter(node) {
  const fullName = node.metadata_details?.authorName || 'Не указан';
  return {
    full_name: fullName,
    short_name: getShortPersonName(fullName),
    filter_key: normalizeFilterValue(fullName),
    source: 'metadata_details.authorName'
  };
}

function getTechnicalFormatFilter(node) {
  const extension = getNodeExtension(node);
  const isContainer = isTreeContainerNode(node);
  let category = 'final_document';
  let label = 'Конечный документ';

  if (['zip', 'rar', '7z', 'tar'].includes(extension)) {
    category = 'archive';
    label = `Архив .${extension}`;
  } else if (extension === 'msg') {
    category = 'mail';
    label = 'Почтовое сообщение';
  } else if (['xlsx', 'xls'].includes(extension)) {
    label = 'Таблица Excel';
  } else if (['docx', 'doc'].includes(extension)) {
    label = 'Документ Word';
  } else if (extension === 'pdf') {
    label = 'PDF документ';
  } else if (extension === 'txt') {
    label = 'Текстовый файл';
  } else if (['jpg', 'jpeg', 'png'].includes(extension)) {
    label = 'Изображение / скан';
  }

  return {
    extension,
    category,
    label,
    is_container: isContainer,
    is_archive: category === 'archive',
    is_mail: category === 'mail',
    is_folder: false,
    is_final_document: !isContainer,
    is_readable_document: ['docx', 'doc', 'xlsx', 'xls', 'pdf', 'txt', 'jpg', 'jpeg', 'png'].includes(extension)
  };
}

function getExtensionFromName(name = '') {
  const match = String(name).toLowerCase().match(/\.([a-z0-9]+)$/);
  return match ? match[1] : 'unknown';
}

function getShortPersonName(fullName) {
  const parts = String(fullName || '').trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return fullName || 'Не указан';
  const initials = parts.slice(1).map(part => `${part[0]}.`).join('');
  return `${parts[0]} ${initials}`;
}

function normalizeFilterValue(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .trim();
}

function escapeAttribute(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function createTreeSearchContext(nodes, query) {
  return createTreeViewContext(nodes, query, {});
}

function createTreeViewContext(nodes, query, filters = {}) {
  const normalizedQuery = normalizeFilterValue(query);
  const hasFilters = hasActiveTreeFilters(filters);
  const context = {
    query: normalizedQuery,
    filters,
    isSearchActive: normalizedQuery.length > 0,
    isFilterActive: hasFilters,
    isActive: normalizedQuery.length > 0 || hasFilters,
    matchIds: new Set(),
    visibleIds: new Set(),
    expandedIds: new Set(),
    matchCount: 0
  };

  if (!context.isActive) return context;

  walkSearchTree(nodes, context, []);
  context.matchCount = context.matchIds.size;
  return context;
}

function walkSearchTree(nodes, context, ancestors) {
  let branchHasVisibleMatch = false;

  nodes.forEach(node => {
    const ownMatch = doesNodeMatchSearch(node, context.query) && doesNodeMatchFilters(node, context.filters);
    const renderableChildren = getRenderableTreeChildren(node);
    const childHasMatch = renderableChildren.length > 0
      ? walkSearchTree(renderableChildren, context, [...ancestors, node])
      : false;
    const hasVisibleMatch = ownMatch || childHasMatch;

    if (ownMatch) {
      context.matchIds.add(node.id);
      context.visibleIds.add(node.id);
      ancestors.forEach(ancestor => {
        context.visibleIds.add(ancestor.id);
        context.expandedIds.add(ancestor.id);
      });

      if (context.isSearchActive && !context.isFilterActive && renderableChildren.length > 0) {
        context.expandedIds.add(node.id);
        addDescendantVisibility(renderableChildren, context);
      }
    }

    if (childHasMatch) {
      context.visibleIds.add(node.id);
      context.expandedIds.add(node.id);
    }

    branchHasVisibleMatch = branchHasVisibleMatch || hasVisibleMatch;
  });

  return branchHasVisibleMatch;
}

function addDescendantVisibility(nodes, context) {
  nodes.forEach(node => {
    context.visibleIds.add(node.id);
    const renderableChildren = getRenderableTreeChildren(node);
    if (renderableChildren.length > 0) {
      context.expandedIds.add(node.id);
      addDescendantVisibility(renderableChildren, context);
    }
  });
}

function doesNodeMatchSearch(node, query) {
  if (!query) return true;

  const searchable = [
    node.name,
    node.type,
    node.ai_metadata?.detected_type,
    node.metadata_details?.sourceType,
    node.metadata_details?.authorName,
    node.filter_metadata?.technical_format?.label,
    node.filter_metadata?.semantic_type?.label
  ];

  return searchable.some(value => normalizeFilterValue(value).includes(query));
}

function hasActiveTreeFilters(filters = {}) {
  return Object.values(filters || {}).some(values => Array.isArray(values) && values.length > 0);
}

function getActiveFiltersCount(filters = {}) {
  return Object.values(filters || {}).reduce((sum, values) => {
    return sum + (Array.isArray(values) ? values.length : 0);
  }, 0);
}

function doesNodeMatchFilters(node, filters = {}) {
  if (!hasActiveTreeFilters(filters)) return true;

  return Object.entries(filters).every(([groupKey, values]) => {
    if (!Array.isArray(values) || values.length === 0) return true;
    return values.some(value => doesNodeMatchFilterValue(node, groupKey, value));
  });
}

function doesNodeMatchFilterValue(node, groupKey, value) {
  const metadata = node.filter_metadata || {};

  switch (groupKey) {
    case 'status':
      return metadata.status?.overall === value;
    case 'semantic':
      return metadata.semantic_type?.key === value;
    case 'uploader':
      return metadata.uploaded_by?.filter_key === value;
    case 'format':
      return metadata.technical_format?.category === value;
    default:
      return true;
  }
}

function buildTreeFilterIndex(nodes) {
  const index = {
    statuses: new Map(),
    semantic_types: new Map(),
    uploaders: new Map(),
    technical_formats: new Map()
  };

  walkTree(nodes, node => {
    const metadata = node.filter_metadata;
    if (!metadata) return;

    addFilterIndexItem(index.statuses, metadata.status.overall, getStatusFilterLabel(metadata.status.overall), node.id);
    addFilterIndexItem(index.semantic_types, metadata.semantic_type.key, metadata.semantic_type.label, node.id);
    addFilterIndexItem(index.uploaders, metadata.uploaded_by.filter_key, metadata.uploaded_by.short_name, node.id);
    addFilterIndexItem(index.technical_formats, metadata.technical_format.category, metadata.technical_format.label, node.id);
  });

  return Object.fromEntries(
    Object.entries(index).map(([key, value]) => [key, Array.from(value.values())])
  );
}

function addFilterIndexItem(map, key, label, nodeId) {
  if (!map.has(key)) {
    map.set(key, { key, label, node_ids: [] });
  }
  map.get(key).node_ids.push(nodeId);
}

function getStatusFilterLabel(status) {
  const labels = {
    red: 'Ошибка',
    yellow: 'Требует проверки',
    green: 'Успешно',
    gray: 'В очереди',
    loading: 'Выполняется'
  };
  return labels[status] || status;
}

function walkTree(nodes, callback) {
  nodes.forEach(node => {
    callback(node);
    const renderableChildren = getRenderableTreeChildren(node);
    if (renderableChildren.length > 0) {
      walkTree(renderableChildren, callback);
    }
  });
}

function renderTreeSummary(problems, criticalCount, warningCount) {
  if (problems.length === 0) {
    if (treeOkSummaryDismissed) return '';

    return `
      <div class="tree-check-summary summary-ok">
        <div class="tree-check-summary-text">
          <strong>Комплектность проверена</strong>
          <span>Критические несоответствия не обнаружены.</span>
        </div>
        <button type="button" class="tree-summary-close-btn" id="tree-summary-close" title="Скрыть уведомление" aria-label="Скрыть уведомление">
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <path d="m6 6 8 8"></path>
            <path d="m14 6-8 8"></path>
          </svg>
        </button>
      </div>
    `;
  }

  const tone = criticalCount > 0 ? 'summary-critical' : 'summary-warning';
  const title = criticalCount > 0 ? 'Ошибка комплектности' : 'Есть замечания по комплектности';
  const details = criticalCount > 0
    ? `Выявлено критических позиций: ${criticalCount}. Предупреждений: ${warningCount}.`
    : `Найдены позиции, требующие проверки: ${warningCount}.`;
  const recalcButton = criticalCount > 0
    ? `
      <button type="button" class="tree-recalc-btn" id="tree-recalc-status" title="Пересчитать статус" aria-label="Пересчитать статус">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M20 7v5h-5"></path>
          <path d="M4 17v-5h5"></path>
          <path d="M18.1 9a7 7 0 0 0-11.6-2.6L4 9"></path>
          <path d="M5.9 15a7 7 0 0 0 11.6 2.6L20 15"></path>
        </svg>
      </button>
    `
    : '';

  return `
    <div class="tree-check-summary ${tone}">
      <span class="tree-check-summary-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M12 8v5"></path>
          <path d="M12 16.5h.01"></path>
          <path d="M10.2 4.9 3.4 17.1c-.7 1.2.2 2.7 1.6 2.7h14c1.4 0 2.3-1.5 1.6-2.7L13.8 4.9c-.8-1.3-2.8-1.3-3.6 0Z"></path>
        </svg>
      </span>
      <div class="tree-check-summary-text">
        <strong>${title}</strong>
        <span>${details}</span>
      </div>
      <div class="tree-check-actions">
        ${renderProblemNavigator(problems)}
        ${recalcButton}
      </div>
    </div>
  `;
}

function getNodeSeverity(node) {
  const statuses = Object.values(node.pipeline_status || {});
  if (statuses.includes('red')) return 'critical';
  if (statuses.includes('yellow')) return 'warning';
  return null;
}

function getAggregateProcessingStatus(status = {}, branchHasProblem = false) {
  const statuses = Object.values(status || {});
  if (statuses.includes('red')) return 'failed';
  if (statuses.includes('yellow') || branchHasProblem) return 'review';
  if (statuses.includes('loading') || statuses.includes('gray')) return 'processing';
  if (statuses.length > 0 && statuses.every(value => value === 'green')) return 'success';
  return 'processing';
}

function translateAggregateStatus(status) {
  switch (status) {
    case 'success': return 'Выполнено';
    case 'review': return 'Требует проверки';
    case 'failed': return 'Невыполнено';
    case 'processing': return 'В обработке';
    default: return 'В обработке';
  }
}

function getTreeRowAttentionClass(aggregateStatus) {
  if (aggregateStatus === 'failed') return 'tree-row-attention-failed';
  if (aggregateStatus === 'review') return 'tree-row-attention-review';
  return '';
}

function hasProblemInBranch(node) {
  if (getNodeSeverity(node)) return true;
  return getRenderableTreeChildren(node).some(child => hasProblemInBranch(child));
}

function collectProblemNodes(nodes, result = []) {
  nodes.forEach(node => {
    const severity = getNodeSeverity(node);
    if (severity) result.push({ id: node.id, severity });
    const renderableChildren = getRenderableTreeChildren(node);
    if (renderableChildren.length > 0) {
      collectProblemNodes(renderableChildren, result);
    }
  });
  return result;
}

function getFileTypeIconMeta(node) {
  const extension = getNodeExtension(node);

  if (extension === 'msg') return { className: 'format-msg', label: 'MSG' };
  if (['zip', 'rar', '7z', 'tar'].includes(extension)) return { className: 'format-zip', label: extension.toUpperCase() };
  if (['xlsx', 'xls'].includes(extension)) return { className: 'format-xls', label: 'XLS' };
  if (['docx', 'doc'].includes(extension)) return { className: 'format-doc', label: 'DOC' };
  if (extension === 'pdf') return { className: 'format-pdf', label: 'PDF' };
  if (['jpg', 'jpeg'].includes(extension)) return { className: 'format-jpg', label: 'JPG' };
  if (extension === 'png') return { className: 'format-jpg', label: 'PNG' };
  if (extension === 'txt') return { className: 'format-file', label: 'TXT' };

  return { className: 'format-file', label: 'FILE' };
}

function renderFileTypeIcon(iconMeta) {
  return `
    <svg viewBox="0 0 32 32" focusable="false" aria-hidden="true">
      <circle class="icon-bg" cx="16" cy="16" r="16"></circle>
      <text class="icon-label" x="16" y="17">${iconMeta.label}</text>
    </svg>
  `;
}

/**
 * Рекурсивно строит HTML-дерево вложений
 */
function buildTreeHTML(nodes, depth, searchContext = createTreeSearchContext([], '')) {
  return nodes.map(node => {
    if (searchContext.isActive && !searchContext.visibleIds.has(node.id)) return '';

    const renderableChildren = getRenderableTreeChildren(node);
    const hasChildren = renderableChildren.length > 0;
    const TREE_BASE_INDENT = 12;
    const TREE_DEPTH_INDENT = 32;
    const paddingLeft = TREE_BASE_INDENT + depth * TREE_DEPTH_INDENT; // Изолированный отступ для структуры дерева

    // Форматирование размера файла
    const sizeMB = (node.size / (1024 * 1024)).toFixed(1) + ' МБ';
    const isActive = window.activeTreeNodeId === node.id;
    const detectedType = node.ai_metadata?.detected_type || 'Тип не определен';
    const severity = getNodeSeverity(node);
    const branchHasProblem = hasChildren && renderableChildren.some(child => hasProblemInBranch(child));
    const aggregateStatus = getAggregateProcessingStatus(node.pipeline_status, branchHasProblem && !severity);
    const fileIconMeta = getFileTypeIconMeta(node);
    const fileIconStatusLabel = translateAggregateStatus(aggregateStatus);
    const isSearchMatch = searchContext.isSearchActive && searchContext.matchIds.has(node.id);
    const isExpanded = !searchContext.isActive || searchContext.expandedIds.has(node.id);
    const rowStateClass = [
      getTreeRowAttentionClass(aggregateStatus),
      isActive ? 'active' : '',
      isSearchMatch ? 'tree-row-search-match' : ''
    ].filter(Boolean).join(' ');

    return `
      <li class="tree-node-item ${hasChildren ? `node-folder ${isExpanded ? 'expanded' : ''}` : 'node-leaf'}" data-id="${node.id}">
        <div class="tree-row ${rowStateClass}" tabindex="0">
          
          <!-- Колонка 1 (Дерево, раскрытие, имя, тип и размер) с изолированным отступом вложенности -->
          <div class="tree-td col-tree-name" style="padding-left: ${paddingLeft}px;">
            ${hasChildren ? `
              <button type="button" class="tree-toggle" aria-label="${isExpanded ? 'Свернуть ветку' : 'Раскрыть ветку'}" aria-expanded="${isExpanded ? 'true' : 'false'}">
                <svg class="tree-toggle-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="m7 10 5 5 5-5"></path>
                </svg>
              </button>
            ` : '<span class="tree-toggle-placeholder" aria-hidden="true"></span>'}
            <span class="node-file-icon ${fileIconMeta.className} status-${aggregateStatus}" role="img" title="${fileIconMeta.label}, статус: ${fileIconStatusLabel}" aria-label="${fileIconMeta.label}, статус: ${fileIconStatusLabel}">
              ${renderFileTypeIcon(fileIconMeta)}
              ${aggregateStatus === 'success' ? '' : `<span class="node-file-status-dot status-${aggregateStatus}" aria-hidden="true"></span>`}
            </span>
            <div class="node-main-text">
              <span class="node-name-text" title="${node.name}">${node.name}</span>
              <span class="node-subline">
                <span class="node-type-text" title="${detectedType}">${detectedType}</span>
                <span class="node-size-text">${sizeMB}</span>
              </span>
            </div>
          </div>

          <div class="tree-td col-tree-actions">
            ${renderDocumentActions(node)}
          </div>

        </div>
        
        <!-- Рекурсивный рендеринг потомков -->
        ${hasChildren ? `
          <ul class="nested-tree-group">
            ${buildTreeHTML(renderableChildren, depth + 1, searchContext)}
          </ul>
        ` : ''}
      </li>
    `;
  }).join('');
}

function renderDocumentActions(node) {
  return `
    <div class="tree-actions" data-actions-for="${node.id}">
      <button type="button" class="tree-actions-btn" aria-label="Действия с документом" aria-expanded="false">
        <span aria-hidden="true"></span>
      </button>
      <div class="tree-actions-menu" role="menu" aria-label="Действия с документом">
        <button type="button" role="menuitem" data-action="download">
          <svg class="tree-action-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 4v10"></path>
            <path d="m8 10 4 4 4-4"></path>
            <path d="M5 19h14"></path>
          </svg>
          <span>Скачать документ</span>
        </button>
        <button type="button" role="menuitem" data-action="recalculate">
          <svg class="tree-action-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M20 7v5h-5"></path>
            <path d="M4 17v-5h5"></path>
            <path d="M18.1 9a7 7 0 0 0-11.6-2.6L4 9"></path>
            <path d="M5.9 15a7 7 0 0 0 11.6 2.6L20 15"></path>
          </svg>
          <span>Пересчитать статус</span>
        </button>
      </div>
    </div>
  `;
}

/**
 * Настройка событий кликов на строки и раскрытия/сворачивания
 */
function setupTreeInteractions() {
  const treeContainer = document.getElementById('tree-container-ul');
  const treeRoot = document.getElementById('file-tree-root');
  if (!treeContainer || !treeRoot) return;

  treeRoot.querySelectorAll('.tree-problem-nav-btn').forEach(button => {
    button.addEventListener('click', () => {
      const direction = Number(button.dataset.problemDirection || 1);
      navigateProblem(direction);
    });
  });

  const summaryCloseButton = document.getElementById('tree-summary-close');
  if (summaryCloseButton) {
    summaryCloseButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      treeOkSummaryDismissed = true;
      renderTreeShell(treeRoot);
      setupTreeInteractions();
    });
  }

  const recalcButton = document.getElementById('tree-recalc-status');
  if (recalcButton) {
    recalcButton.addEventListener('click', () => {
      if (window.triggerRAGPipelineSim) window.triggerRAGPipelineSim();
    });
  }

  const searchInput = document.getElementById('tree-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      treeSearchQuery = event.target.value;
      refreshTreeSearchView();
    });
  }

  const filterButton = document.getElementById('tree-filter-trigger');
  if (filterButton) {
    filterButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (window.openDocumentFilterPanel) {
        window.openDocumentFilterPanel({
          nodes: treeMockData,
          filters: treeAppliedFilters
        });
      }
    });
  }

  const filterResetBadge = document.getElementById('tree-filter-reset-badge');
  if (filterResetBadge) {
    filterResetBadge.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      resetAppliedTreeFilters();
    });
  }

  if (!treeFilterSubscriptionBound && window.onDocumentFiltersApplied) {
    window.onDocumentFiltersApplied((filters) => {
      treeAppliedFilters = normalizeAppliedFilters(filters);
      refreshTreeSearchView();
    });
    treeFilterSubscriptionBound = true;
  }

  // Слушатель кликов по элементам дерева
  treeContainer.addEventListener('click', (e) => {
    const actionsButton = e.target.closest('.tree-actions-btn');
    if (actionsButton) {
      e.preventDefault();
      e.stopPropagation();
      toggleTreeActionMenu(actionsButton);
      return;
    }

    const actionItem = e.target.closest('.tree-actions-menu button');
    if (actionItem) {
      e.preventDefault();
      e.stopPropagation();
      handleTreeActionClick(actionItem);
      return;
    }

    const rowElement = e.target.closest('.tree-row');
    if (!rowElement) return;

    const nodeItem = rowElement.closest('.tree-node-item');
    const nodeId = nodeItem.getAttribute('data-id');
    const clickedToggle = e.target.closest('.tree-toggle');

    const nodeData = findNodeById(treeMockData, nodeId);

    // Сценарий 1: Клик по стрелке раскрытия
    if (clickedToggle && nodeItem.classList.contains('node-folder')) {
      toggleFolderState(nodeItem);
      return;
    }

    // Сценарий 2: Клик по строке (Выбор сущности)
    selectTreeRow(rowElement, nodeItem, nodeData);
  });

  if (!window.__treeActionMenuGlobalCloseBound) {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.tree-actions')) closeTreeActionMenus();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeTreeActionMenus();
    });
    window.__treeActionMenuGlobalCloseBound = true;
  }
}

function refreshTreeSearchView() {
  const treeContainer = document.getElementById('tree-container-ul');
  if (!treeContainer) return;

  const treeViewContext = createTreeViewContext(treeMockData, treeSearchQuery, treeAppliedFilters);
  treeContainer.innerHTML = buildTreeHTML(treeMockData, 0, treeViewContext);

  const emptySlot = document.getElementById('tree-search-empty-slot');
  if (emptySlot) emptySlot.innerHTML = renderTreeSearchEmpty(treeViewContext);

  updateTreeFilterButtonState();

  closeTreeActionMenus();
}

function updateTreeFilterButtonState() {
  const filterButton = document.getElementById('tree-filter-trigger');
  const filterControl = filterButton?.closest('.tree-filter-control');
  if (!filterButton || !filterControl) return;

  const activeFiltersCount = getActiveFiltersCount(treeAppliedFilters);
  filterButton.classList.toggle('active', activeFiltersCount > 0);

  const existingBadge = filterControl.querySelector('.tree-filter-badge');
  const nextBadge = renderTreeFilterBadge(activeFiltersCount);
  if (existingBadge) existingBadge.remove();
  if (nextBadge) filterControl.insertAdjacentHTML('beforeend', nextBadge);

  const filterResetBadge = document.getElementById('tree-filter-reset-badge');
  if (filterResetBadge) {
    filterResetBadge.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      resetAppliedTreeFilters();
    });
  }
}

function resetAppliedTreeFilters() {
  treeAppliedFilters = {};
  if (window.setDocumentFilterState) window.setDocumentFilterState(treeAppliedFilters);
  refreshTreeSearchView();
}

function normalizeAppliedFilters(filters = {}) {
  return Object.fromEntries(
    Object.entries(filters || {}).map(([key, values]) => [
      key,
      Array.isArray(values) ? Array.from(new Set(values)).filter(Boolean) : []
    ])
  );
}

function toggleTreeActionMenu(button) {
  const actions = button.closest('.tree-actions');
  const isOpen = actions.classList.contains('open');
  closeTreeActionMenus();
  if (!isOpen) {
    actions.classList.add('open');
    button.setAttribute('aria-expanded', 'true');
  }
}

function closeTreeActionMenus() {
  document.querySelectorAll('.tree-actions.open').forEach(actions => {
    actions.classList.remove('open');
    const button = actions.querySelector('.tree-actions-btn');
    if (button) button.setAttribute('aria-expanded', 'false');
  });
}

function handleTreeActionClick(actionItem) {
  const nodeItem = actionItem.closest('.tree-node-item');
  const rowElement = actionItem.closest('.tree-row');
  const nodeId = nodeItem?.getAttribute('data-id');
  const nodeData = nodeId ? findNodeById(treeMockData, nodeId) : null;

  if (rowElement && nodeItem && nodeData) {
    selectTreeRow(rowElement, nodeItem, nodeData, { allowDeselect: false });
  }

  if (actionItem.dataset.action === 'recalculate' && window.triggerFileRecalc) {
    window.triggerFileRecalc(nodeId);
  }

  closeTreeActionMenus();
}

function navigateProblem(direction) {
  const problems = collectProblemNodes(treeMockData);
  if (problems.length === 0) return;

  activeProblemIndex = (activeProblemIndex + direction + problems.length) % problems.length;
  focusProblemNode(problems[activeProblemIndex]);
}

function focusProblemNode(target) {
  if (!target) return;

  let targetRow = document.querySelector(`[data-id="${target.id}"] .tree-row`);
  if (!targetRow && (treeSearchQuery || hasActiveTreeFilters(treeAppliedFilters))) {
    treeSearchQuery = '';
    treeAppliedFilters = {};
    if (window.setDocumentFilterState) window.setDocumentFilterState(treeAppliedFilters);
    const searchInput = document.getElementById('tree-search-input');
    if (searchInput) searchInput.value = '';
    refreshTreeSearchView();
    targetRow = document.querySelector(`[data-id="${target.id}"] .tree-row`);
  }
  if (!targetRow) return;

  const nodeItem = targetRow.closest('.tree-node-item');
  const nodeData = nodeItem ? findNodeById(treeMockData, nodeItem.getAttribute('data-id')) : null;
  if (nodeItem && nodeData) {
    selectTreeRow(targetRow, nodeItem, nodeData, { allowDeselect: false });
  }
  targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
  updateProblemPosition();
}

function updateProblemPosition() {
  const position = document.querySelector('.tree-problem-position');
  const problems = collectProblemNodes(treeMockData);
  if (position && problems.length > 0) {
    position.textContent = `${activeProblemIndex + 1}/${problems.length}`;
  }
}

/**
 * Сворачивание и разворачивание папок
 */
function toggleFolderState(nodeItem) {
  const toggle = nodeItem.querySelector('.tree-toggle');
  if (nodeItem.classList.contains('expanded')) {
    nodeItem.classList.remove('expanded');
    if (toggle) {
      toggle.setAttribute('aria-label', 'Раскрыть ветку');
      toggle.setAttribute('aria-expanded', 'false');
    }
  } else {
    nodeItem.classList.add('expanded');
    if (toggle) {
      toggle.setAttribute('aria-label', 'Свернуть ветку');
      toggle.setAttribute('aria-expanded', 'true');
    }
  }
}

/**
 * Выделение выбранной строки и отправка события дирижеру
 */
function clearTreeSelection() {
  document.querySelectorAll('.tree-row.active').forEach(row => row.classList.remove('active'));
  window.activeTreeNodeId = null;
  console.log('FileTree: Выбор элемента снят.');

  if (fileSelectedCallback) {
    fileSelectedCallback(null);
  }
}

function selectTreeRow(rowElement, nodeItem, nodeData, options = {}) {
  const allowDeselect = options.allowDeselect !== false;
  const isSameActiveRow = allowDeselect && window.activeTreeNodeId === nodeData.id && rowElement.classList.contains('active');

  if (isSameActiveRow) {
    clearTreeSelection();
    return;
  }

  // Снимаем выделение со всех остальных строк
  document.querySelectorAll('.tree-row.active').forEach(r => r.classList.remove('active'));
  
  // Добавляем активный класс текущей строке
  rowElement.classList.add('active');
  
  // Сохраняем активный ID глобально
  window.activeTreeNodeId = nodeData.id;

  console.log(`FileTree: Выбран элемент с ID [${nodeData.id}]`);

  // Отправляем сигнал дирижеру через зарегистрированный коллбек
  if (fileSelectedCallback && nodeData) {
    fileSelectedCallback(nodeData);
  }
}

/**
 * Рекурсивный поиск объекта узла в структуре по ID
 */
function findNodeById(nodes, id) {
  for (let node of nodes) {
    if (node.id === id) return node;
    const renderableChildren = getRenderableTreeChildren(node);
    if (renderableChildren.length > 0) {
      const found = findNodeById(renderableChildren, id);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Глобальный метод регистрации слушателя выбора файла (Event Bridge)
 */
window.onFileSelected = function(callback) {
  fileSelectedCallback = callback;
};

/**
 * Перерисовывает элементы дерева на основе текущего состояния treeMockData
 */
window.reRenderTree = function() {
  console.log('FileTree: Принудительный перерендер дерева...');
  const treeRoot = document.getElementById('file-tree-root');
  if (treeRoot) {
    renderTreeShell(treeRoot);
    setupTreeInteractions();
  }
};

// Экспортируем моковые данные для отладки симулятора в будущем
window.treeMockData = treeMockData;
window.treeFilterIndex = buildTreeFilterIndex(treeMockData);
