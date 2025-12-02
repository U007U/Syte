// РђРґРјРёРЅ-РїР°РЅРµР»СЊ
let isAdmin = false;

// РџСЂРѕРІРµСЂРєР° Р°РІС‚РѕСЂРёР·Р°С†РёРё
function checkAuth() {
    const saved = localStorage.getItem('admin_auth');
    if (saved && Date.now() < JSON.parse(saved).expires) {
        isAdmin = true;
        showAdminPanel();
    }
    updateUI();
}

// Р’С…РѕРґ РІ Р°РґРјРёРЅРєСѓ
function login() {
    const password = prompt('Р’РІРµРґРёС‚Рµ РїР°СЂРѕР»СЊ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂР°:');
    if (window.SubjectData.checkAdminPassword(password)) {
        isAdmin = true;
        localStorage.setItem('admin_auth', JSON.stringify({
            expires: Date.now() + 3600000 // 1 С‡Р°СЃ
        }));
        showAdminPanel();
        updateUI();
        alert('Р’С…РѕРґ РІС‹РїРѕР»РЅРµРЅ!');
    } else {
        alert('РќРµРІРµСЂРЅС‹Р№ РїР°СЂРѕР»СЊ!');
    }
}

// Р’С‹С…РѕРґ
function logout() {
    isAdmin = false;
    localStorage.removeItem('admin_auth');
    hideAdminPanel();
    updateUI();
    alert('Р’С‹С…РѕРґ РІС‹РїРѕР»РЅРµРЅ!');
}

// РџРѕРєР°Р·Р°С‚СЊ Р°РґРјРёРЅ-РїР°РЅРµР»СЊ
function showAdminPanel() {
    const panel = document.getElementById('adminPanel');
    if (panel) panel.style.display = 'block';

    // Р”РѕР±Р°РІР»СЏРµРј РєРЅРѕРїРєРё СѓРїСЂР°РІР»РµРЅРёСЏ Рє РєР°СЂС‚РѕС‡РєР°Рј
    document.querySelectorAll('.subject-card').forEach(card => {
        const id = card.dataset.id;

        // РЎРѕР·РґР°РµРј РєРѕРЅС‚РµР№РЅРµСЂ РґР»СЏ РєРЅРѕРїРѕРє
        let btnContainer = card.querySelector('.admin-buttons');
        if (!btnContainer) {
            btnContainer = document.createElement('div');
            btnContainer.className = 'admin-buttons';
            btnContainer.innerHTML = `
                <button onclick="editSubject(${id})" class="btn-edit">
                    <i class="fas fa-edit"></i> Р РµРґР°РєС‚РёСЂРѕРІР°С‚СЊ
                </button>
                <button onclick="deleteSubject(${id})" class="btn-delete">
                    <i class="fas fa-trash"></i> РЈРґР°Р»РёС‚СЊ
                </button>
            `;
            card.querySelector('.subject-footer').before(btnContainer);
        }
        btnContainer.style.display = 'block';
    });
}

// РЎРєСЂС‹С‚СЊ Р°РґРјРёРЅ-РїР°РЅРµР»СЊ
function hideAdminPanel() {
    const panel = document.getElementById('adminPanel');
    if (panel) panel.style.display = 'none';

    // РЎРєСЂС‹РІР°РµРј РєРЅРѕРїРєРё СѓРїСЂР°РІР»РµРЅРёСЏ
    document.querySelectorAll('.admin-buttons').forEach(btn => {
        btn.style.display = 'none';
    });
}

// РћР±РЅРѕРІРёС‚СЊ РёРЅС‚РµСЂС„РµР№СЃ
function updateUI() {
    const loginBtn = document.getElementById('adminLoginBtn');
    const logoutBtn = document.getElementById('adminLogoutBtn');

    if (loginBtn) loginBtn.style.display = isAdmin ? 'none' : 'block';
    if (logoutBtn) logoutBtn.style.display = isAdmin ? 'block' : 'none';
}

// РЈРґР°Р»РёС‚СЊ РїСЂРµРґРјРµС‚
function deleteSubject(id) {
    if (!confirm('РЈРґР°Р»РёС‚СЊ СЌС‚РѕС‚ РїСЂРµРґРјРµС‚? Р’СЃРµ С„Р°Р№Р»С‹ Р±СѓРґСѓС‚ СѓРґР°Р»РµРЅС‹.')) return;

    if (window.SubjectData.deleteSubject(id)) {
        alert('РџСЂРµРґРјРµС‚ СѓРґР°Р»РµРЅ!');
        window.location.reload();
    } else {
        alert('РћС€РёР±РєР° РїСЂРё СѓРґР°Р»РµРЅРёРё!');
    }
}

// Р РµРґР°РєС‚РёСЂРѕРІР°С‚СЊ РїСЂРµРґРјРµС‚
function editSubject(id) {
    const subject = window.SubjectData.getSubjectById(id);
    if (!subject) return;

    const newName = prompt('РќРѕРІРѕРµ РЅР°Р·РІР°РЅРёРµ РїСЂРµРґРјРµС‚Р°:', subject.name);
    if (!newName) return;

    const newTeacher = prompt('РРјСЏ РїСЂРµРїРѕРґР°РІР°С‚РµР»СЏ:', subject.teacher);

    if (window.SubjectData.updateSubject(id, {
        name: newName,
        teacher: newTeacher
    })) {
        alert('РџСЂРµРґРјРµС‚ РѕР±РЅРѕРІР»РµРЅ!');
        window.location.reload();
    }
}

// Р”РѕР±Р°РІРёС‚СЊ РЅРѕРІС‹Р№ РїСЂРµРґРјРµС‚
function addNewSubject() {
    const name = document.getElementById('subjectName').value;
    const teacher = document.getElementById('subjectTeacher').value;

    if (!name || !teacher) {
        alert('Р—Р°РїРѕР»РЅРёС‚Рµ РІСЃРµ РїРѕР»СЏ!');
        return;
    }

    window.SubjectData.addSubject({
        name: name,
        teacher: teacher,
        files: []
    });

    alert('РџСЂРµРґРјРµС‚ РґРѕР±Р°РІР»РµРЅ!');
    document.getElementById('subjectName').value = '';
    document.getElementById('subjectTeacher').value = '';
    window.location.reload();
}

// РРЅРёС†РёР°Р»РёР·Р°С†РёСЏ
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();

    // РћР±СЂР°Р±РѕС‚С‡РёРєРё РєРЅРѕРїРѕРє
    const loginBtn = document.getElementById('adminLoginBtn');
    const logoutBtn = document.getElementById('adminLogoutBtn');

    if (loginBtn) loginBtn.addEventListener('click', login);
    if (logoutBtn) logoutBtn.addEventListener('click', logout);

    // РљРЅРѕРїРєР° РґРѕР±Р°РІР»РµРЅРёСЏ
    const addBtn = document.getElementById('addSubjectBtn');
    if (addBtn) addBtn.addEventListener('click', addNewSubject);
});