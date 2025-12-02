// Простые админ-функции
window.addNewSubject = function() {
    const name = document.getElementById('subjectName').value.trim();
    const teacher = document.getElementById('teacherName').value.trim();
    
    if (!name || !teacher) {
        alert('Заполните оба поля!');
        return;
    }
    
    // Просто добавляем в localStorage
    const subjects = JSON.parse(localStorage.getItem('subjects_data') || '[]');
    subjects.push({
        id: Date.now(),
        name: name,
        teacher: teacher,
        files: [],
        createdAt: new Date().toISOString()
    });
    
    localStorage.setItem('subjects_data', JSON.stringify(subjects));
    alert('Добавлено!');
    document.getElementById('subjectName').value = '';
    document.getElementById('teacherName').value = '';
    
    // Обновляем если есть функция
    if (typeof renderSubjects === 'function') {
        renderSubjects();
    }
};

window.deleteSubject = function(id) {
    if (!confirm('Удалить предмет?')) return;
    
    const subjects = JSON.parse(localStorage.getItem('subjects_data') || '[]');
    const filtered = subjects.filter(s => s.id !== id);
    localStorage.setItem('subjects_data', JSON.stringify(filtered));
    alert('Удалено!');
    
    if (typeof renderSubjects === 'function') {
        renderSubjects();
    }
};

window.editSubject = function(id) {
    const subjects = JSON.parse(localStorage.getItem('subjects_data') || '[]');
    const subject = subjects.find(s => s.id === id);
    
    if (!subject) return;
    
    const newName = prompt('Название:', subject.name);
    if (!newName) return;
    
    const newTeacher = prompt('Преподаватель:', subject.teacher);
    
    const updated = subjects.map(s => 
        s.id === id ? {...s, name: newName, teacher: newTeacher} : s
    );
    
    localStorage.setItem('subjects_data', JSON.stringify(updated));
    alert('Обновлено!');
    
    if (typeof renderSubjects === 'function') {
        renderSubjects();
    }
};
