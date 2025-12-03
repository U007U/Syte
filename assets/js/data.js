const STORAGE_KEY = 'subjects_data';

// Начальные данные
let subjects = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
    {
        id: 1,
        name: "Налоги и налогообложение",
        teacher: "Иванов Иван Иванович",
        files: [
            {
                name: "Темы рефератов и задания по эссе",
                desc: "Все материалы по налогам в одном файле",
                filename: "налоги_и_налогообложение_темы рефератов + эссе.docx"
            }
        ]
    },
    {
        id: 2,
        name: "Математика",
        teacher: "Петрова Анна Сергеевна",
        files: []
    },
    {
        id: 3,
        name: "Физика",
        teacher: "Сидоров Алексей Владимирович",
        files: []
    },
    {
        id: 4,
        name: "Информатика",
        teacher: "Кузнецова Марина Игоревна",
        files: []
    },
    {
        id: 5,
        name: "История",
        teacher: "Николаев Дмитрий Петрович",
        files: []
    }
];

// Сохранить данные
function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
}

// Получить все предметы
function getSubjects() {
    return subjects;
}

// Найти предмет по ID
function getSubjectById(id) {
    return subjects.find(subject => subject.id === id);
}

// Добавить предмет
function addSubject(subject) {
    const newSubject = {
        id: Date.now(),
        ...subject,
        createdAt: new Date().toISOString()
    };
    subjects.push(newSubject);
    saveData();
    return newSubject;
}

// Обновить предмет
function updateSubject(id, updates) {
    const index = subjects.findIndex(s => s.id === id);
    if (index !== -1) {
        subjects[index] = { ...subjects[index], ...updates };
        saveData();
        return true;
    }
    return false;
}

// Удалить предмет
function deleteSubject(id) {
    const index = subjects.findIndex(s => s.id === id);
    if (index !== -1) {
        subjects.splice(index, 1);
        saveData();
        return true;
    }
    return false;
}

// Добавить файл к предмету
function addFileToSubject(subjectId, file) {
    const subject = getSubjectById(subjectId);
    if (subject) {
        if (!subject.files) subject.files = [];
        const newFile = {
            id: Date.now(),
            ...file,
            addedAt: new Date().toISOString()
        };
        subject.files.push(newFile);
        saveData();
        return newFile;
    }
    return null;
}

// Удалить файл
function removeFileFromSubject(subjectId, fileId) {
    const subject = getSubjectById(subjectId);
    if (subject && subject.files) {
        const index = subject.files.findIndex(f => f.id === fileId);
        if (index !== -1) {
            subject.files.splice(index, 1);
            saveData();
            return true;
        }
    }
    return false;
}

// Экспорт функций
window.SubjectData = {
    getSubjects,
    getSubjectById,
    addSubject,
    updateSubject,
    deleteSubject,
    addFileToSubject,
    removeFileFromSubject,
    saveData
};
