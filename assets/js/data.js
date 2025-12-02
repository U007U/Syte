// РҐСЂР°РЅРµРЅРёРµ РґР°РЅРЅС‹С… РІ localStorage
const STORAGE_KEY = 'subjects_data';
const ADMIN_PASSWORD = 'admin123';

// РќР°С‡Р°Р»СЊРЅС‹Рµ РґР°РЅРЅС‹Рµ
let subjects = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
    {
        id: 1,
        name: "РќР°Р»РѕРіРё Рё РЅР°Р»РѕРіРѕРѕР±Р»РѕР¶РµРЅРёРµ",
        teacher: "РРІР°РЅРѕРІ РРІР°РЅ РРІР°РЅРѕРІРёС‡",
        files: [
            {
                name: "С‚РµРјС‹_СЂРµС„РµСЂР°С‚РѕРІ.docx",
                desc: "РЎРїРёСЃРѕРє С‚РµРј РґР»СЏ СЂРµС„РµСЂР°С‚РѕРІ. Р’С‹Р±РµСЂРёС‚Рµ СЃРІРѕСЋ С‚РµРјСѓ.",
                filename: "С‚РµРјС‹_СЂРµС„РµСЂР°С‚РѕРІ.docx"
            },
            {
                name: "Р·Р°РґР°РЅРёРµ_СЌСЃСЃРµ.pdf",
                desc: "РўСЂРµР±РѕРІР°РЅРёСЏ Рё РјРµС‚РѕРґРёС‡РµСЃРєРёРµ СѓРєР°Р·Р°РЅРёСЏ РґР»СЏ РЅР°РїРёСЃР°РЅРёСЏ СЌСЃСЃРµ",
                filename: "Р·Р°РґР°РЅРёРµ_СЌСЃСЃРµ.pdf"
            }
        ]
    }
];

// РЎРѕС…СЂР°РЅРёС‚СЊ РґР°РЅРЅС‹Рµ
function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
}

// РџРѕР»СѓС‡РёС‚СЊ РІСЃРµ РїСЂРµРґРјРµС‚С‹
function getSubjects() {
    return subjects;
}

// РќР°Р№С‚Рё РїСЂРµРґРјРµС‚ РїРѕ ID
function getSubjectById(id) {
    return subjects.find(subject => subject.id === id);
}

// Р”РѕР±Р°РІРёС‚СЊ РїСЂРµРґРјРµС‚
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

// РћР±РЅРѕРІРёС‚СЊ РїСЂРµРґРјРµС‚
function updateSubject(id, updates) {
    const index = subjects.findIndex(s => s.id === id);
    if (index !== -1) {
        subjects[index] = { ...subjects[index], ...updates };
        saveData();
        return true;
    }
    return false;
}

// РЈРґР°Р»РёС‚СЊ РїСЂРµРґРјРµС‚
function deleteSubject(id) {
    const index = subjects.findIndex(s => s.id === id);
    if (index !== -1) {
        subjects.splice(index, 1);
        saveData();
        return true;
    }
    return false;
}

// Р”РѕР±Р°РІРёС‚СЊ С„Р°Р№Р» Рє РїСЂРµРґРјРµС‚Сѓ
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

// РЈРґР°Р»РёС‚СЊ С„Р°Р№Р»
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

// РџСЂРѕРІРµСЂРёС‚СЊ РїР°СЂРѕР»СЊ Р°РґРјРёРЅР°
function checkAdminPassword(password) {
    return password === ADMIN_PASSWORD;
}

// Р­РєСЃРїРѕСЂС‚ С„СѓРЅРєС†РёР№
window.SubjectData = {
    getSubjects,
    getSubjectById,
    addSubject,
    updateSubject,
    deleteSubject,
    addFileToSubject,
    removeFileFromSubject,
    checkAdminPassword,
    saveData
};
