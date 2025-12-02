// РћС‚РѕР±СЂР°Р¶РµРЅРёРµ РєР°СЂС‚РѕС‡РµРє РїСЂРµРґРјРµС‚РѕРІ
function renderSubjects() {
    const subjects = window.SubjectData.getSubjects();
    const container = document.getElementById('subjectsGrid');

    if (!container) return;

    if (subjects.length === 0) {
        container.innerHTML = `
            <div class="no-subjects">
                <i class="fas fa-book-open fa-3x"></i>
                <h3>РџРѕРєР° РЅРµС‚ РїСЂРµРґРјРµС‚РѕРІ</h3>
                <p>РђРґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂ РґРѕР±Р°РІРёС‚ Р·Р°РґР°РЅРёСЏ СЃРєРѕСЂРѕ</p>
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
                <span class="subject-badge">${subject.files ? subject.files.length : 0} С„Р°Р№Р»РѕРІ</span>
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
                <p class="no-files">Р¤Р°Р№Р»С‹ РїРѕРєР° РЅРµ РґРѕР±Р°РІР»РµРЅС‹</p>
            `}
            
            <div class="subject-footer">
                <small class="text-muted">
                    <i class="far fa-clock"></i>
                    РћР±РЅРѕРІР»РµРЅРѕ: ${formatDate(subject.createdAt)}
                </small>
            </div>
        </div>
    `).join('');
}

// РРєРѕРЅРєР° РІ Р·Р°РІРёСЃРёРјРѕСЃС‚Рё РѕС‚ С‚РёРїР° С„Р°Р№Р»Р°
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

// Р¤РѕСЂРјР°С‚РёСЂРѕРІР°РЅРёРµ РґР°С‚С‹
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

// РРЅРёС†РёР°Р»РёР·Р°С†РёСЏ РїСЂРё Р·Р°РіСЂСѓР·РєРµ СЃС‚СЂР°РЅРёС†С‹
document.addEventListener('DOMContentLoaded', () => {
    renderSubjects();

    // РћР±РЅРѕРІР»СЏРµРј РїСЂРё РёР·РјРµРЅРµРЅРёСЏС… РІ РґР°РЅРЅС‹С…
    window.addEventListener('storage', (e) => {
        if (e.key === 'subjects_data') {
            renderSubjects();
        }
    });
});