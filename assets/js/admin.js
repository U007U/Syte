// Админ-функции для сайта
function addNewSubject() {
    const name = document.getElementById('subjectName').value.trim();
    const teacher = document.getElementById('teacherName').value.trim();
    
    if (!name || !teacher) {
        alert('Заполните название предмета и имя преподавателя!');
        return;
    }
    
    if (window.SubjectData && window.SubjectData.addSubject) {
        window.SubjectData.addSubject({
            name: name,
            teacher: teacher,
            files: []
        });
        
        alert(`Предмет "${name}" добавлен!`);
        document.getElementById('subjectName').value = '';
        document.getElementById('teacherName').value = '';
        
        // Обновляем отображение без перезагрузки
        if (window.renderSubjects) {
            window.renderSubjects();
        } else {
            location.reload();
        }
    } else {
        alert('Ошибка: данные не загружены!');
        console.error('SubjectData не найден:', window.SubjectData);
    }
}

function deleteSubject(id) {
    if (!confirm('Удалить этот предмет? Все файлы будут удалены.')) return;
    
    if (window.SubjectData && window.SubjectData.deleteSubject(id)) {
        alert('Предмет удален!');
        // Обновляем отображение без перезагрузки
        if (window.renderSubjects) {
            window.renderSubjects();
        } else {
            location.reload();
        }
    } else {
        alert('Ошибка при удалении!');
    }
}

function editSubject(id) {
    const subject = window.SubjectData ? window.SubjectData.getSubjectById(id) : null;
    if (!subject) return;
    
    const newName = prompt('Новое название предмета:', subject.name);
    if (!newName) return;
    
    const newTeacher = prompt('Имя преподавателя:', subject.teacher);
    
    if (window.SubjectData.updateSubject(id, {
        name: newName,
        teacher: newTeacher
    })) {
        alert('Предмет обновлен!');
        // Обновляем отображение без перезагрузки
        if (window.renderSubjects) {
            window.renderSubjects();
        } else {
            location.reload();
        }
    }
}

// Делаем функции глобальными
window.addNewSubject = addNewSubject;
window.deleteSubject = deleteSubject;
window.editSubject = editSubject;

// Экспортируем renderSubjects если есть
if (typeof renderSubjects !== 'undefined') {
    window.renderSubjects = renderSubjects;
}
