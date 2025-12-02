// Админ-панель
let isAdmin = false;

// Проверка авторизации
function checkAuth() {
    const saved = localStorage.getItem('admin_auth');
    if (saved && Date.now() < JSON.parse(saved).expires) {
        isAdmin = true;
        showAdminPanel();
    }
    updateUI();
}

// Вход в админку
function login() {
    const password = prompt('Введите пароль администратора:');
    if (window.SubjectData.checkAdminPassword(password)) {
        isAdmin = true;
        localStorage.setItem('admin_auth', JSON.stringify({
            expires: Date.now() + 3600000 // 1 час
        }));
        showAdminPanel();
        updateUI();
        alert('Вход выполнен!');
    } else {
        alert('Неверный пароль!');
    }
}

// Выход
function logout() {
    isAdmin = false;
    localStorage.removeItem('admin_auth');
    hideAdminPanel();
    updateUI();
    alert('Выход выполнен!');
}

// Показать админ-панель
function showAdminPanel() {
    const panel = document.getElementById('adminPanel');
    if (panel) panel.style.display = 'block';

    // Добавляем кнопки управления к карточкам
    document.querySelectorAll('.subject-card').forEach(card => {
        const id = card.dataset.id;

        // Создаем контейнер для кнопок
        let btnContainer = card.querySelector('.admin-buttons');
        if (!btnContainer) {
            btnContainer = document.createElement('div');
            btnContainer.className = 'admin-buttons';
            btnContainer.innerHTML = `
                <button onclick="editSubject(${id})" class="btn-edit">
                    <i class="fas fa-edit"></i> Редактировать
                </button>
                <button onclick="deleteSubject(${id})" class="btn-delete">
                    <i class="fas fa-trash"></i> Удалить
                </button>
            `;
            card.querySelector('.subject-footer').before(btnContainer);
        }
        btnContainer.style.display = 'block';
    });
}

// Скрыть админ-панель
function hideAdminPanel() {
    const panel = document.getElementById('adminPanel');
    if (panel) panel.style.display = 'none';

    // Скрываем кнопки управления
    document.querySelectorAll('.admin-buttons').forEach(btn => {
        btn.style.display = 'none';
    });
}

// Обновить интерфейс
function updateUI() {
    const loginBtn = document.getElementById('adminLoginBtn');
    const logoutBtn = document.getElementById('adminLogoutBtn');

    if (loginBtn) loginBtn.style.display = isAdmin ? 'none' : 'block';
    if (logoutBtn) logoutBtn.style.display = isAdmin ? 'block' : 'none';
}

// Удалить предмет
function deleteSubject(id) {
    if (!confirm('Удалить этот предмет? Все файлы будут удалены.')) return;

    if (window.SubjectData.deleteSubject(id)) {
        alert('Предмет удален!');
        window.location.reload();
    } else {
        alert('Ошибка при удалении!');
    }
}

// Редактировать предмет
function editSubject(id) {
    const subject = window.SubjectData.getSubjectById(id);
    if (!subject) return;

    const newName = prompt('Новое название предмета:', subject.name);
    if (!newName) return;

    const newTeacher = prompt('Имя преподавателя:', subject.teacher);

    if (window.SubjectData.updateSubject(id, {
        name: newName,
        teacher: newTeacher
    })) {
        alert('Предмет обновлен!');
        window.location.reload();
    }
}

// Добавить новый предмет
function addNewSubject() {
    const name = document.getElementById('subjectName').value;
    const teacher = document.getElementById('subjectTeacher').value;

    if (!name || !teacher) {
        alert('Заполните все поля!');
        return;
    }

    window.SubjectData.addSubject({
        name: name,
        teacher: teacher,
        files: []
    });

    alert('Предмет добавлен!');
    document.getElementById('subjectName').value = '';
    document.getElementById('subjectTeacher').value = '';
    window.location.reload();
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();

    // Обработчики кнопок
    const loginBtn = document.getElementById('adminLoginBtn');
    const logoutBtn = document.getElementById('adminLogoutBtn');

    if (loginBtn) loginBtn.addEventListener('click', login);
    if (logoutBtn) logoutBtn.addEventListener('click', logout);

    // Кнопка добавления
    const addBtn = document.getElementById('addSubjectBtn');
    if (addBtn) addBtn.addEventListener('click', addNewSubject);
});