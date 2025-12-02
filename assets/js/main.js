// Отображение карточек предметов
function renderSubjects() {
    const subjects = window.SubjectData.getSubjects();
    const container = document.getElementById('subjectsGrid');

    if (!container) return;

    if (subjects.length === 0) {
        container.innerHTML = `
            <div class="no-subjects">
                <i class="fas fa-book-open fa-3x"></i>
                <h3>Пока нет предметов</h3>
                <p>Администратор добавит задания скоро</p>
            </div>
        `;
        return;
    }

    container.innerHTML = subjects.map(subject => `
        <div class="subject-card" data-id="${subject.id}">
            <div class="subject-header">
                <div>
                    <h3 class="subject-title">${subject.name}</h3>
                    <p class="subject-teacher">
                        <i class="fas fa-chalkboard-teacher"></i>
                        ${subject.teacher}
                    </p>
                </div>
                <span class="subject-badge">${subject.files ? subject.files.length : 0} файлов</span>
            </div>
            
            ${subject.files && subject.files.length > 0 ? `
                <div class="file-list">
                    ${subject.files.map(file => `
                        <div class="file-item">
                            <div class="file-icon">
                                ${getFileIcon(file.filename)}
                            </div>
                            <div class="file-info">
                                <span class="file-name">${file.name}</span>
                                <p class="file-desc">${file.desc}</p>
                            </div>
                            <a href="files/${file.filename}" 
                               class="download-btn" 
                               download 
                               target="_blank">
                                <i class="fas fa-download"></i>
                            </a>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <p class="no-files">Файлы пока не добавлены</p>
            `}
            
            <div class="subject-footer">
                <small class="text-muted">
                    <i class="far fa-clock"></i>
                    Обновлено: ${formatDate(subject.createdAt)}
                </small>
            </div>
        </div>
    `).join('');
}

// Иконка в зависимости от типа файла
function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const icons = {
        'doc': 'fas fa-file-word',
        'docx': 'fas fa-file-word',
        'pdf': 'fas fa-file-pdf',
        'txt': 'fas fa-file-alt',
        'xls': 'fas fa-file-excel',
        'xlsx': 'fas fa-file-excel',
        'ppt': 'fas fa-file-powerpoint',
        'pptx': 'fas fa-file-powerpoint',
        'zip': 'fas fa-file-archive',
        'rar': 'fas fa-file-archive'
    };
    return `<i class="${icons[ext] || 'fas fa-file'}"></i>`;
}

// Форматирование даты
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderSubjects();

    // Обновляем при изменениях в данных
    window.addEventListener('storage', (e) => {
        if (e.key === 'subjects_data') {
            renderSubjects();
        }
    });
});