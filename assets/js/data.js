// assets/js/data.js
// ВСЕ ДАННЫЕ САЙТА ХРАНЯТСЯ ЗДЕСЬ
// Обновите этот файл на GitHub для изменения контента сайта

window.SubjectData = (function() {
    'use strict';
    
    // Массив предметов (добавляйте новые предметы здесь)
    const subjects = [
        {
            id: 1,
            name: "МДК 03.02 Логистика сервисного обслуживания",
            teacher: "Володин С.П.",
            files: [
                {
                    filename: "photo_2025-12-03_12-52-45.jpg",
                    name: "Темы рефератов по логистике",
                    desc: "Список из 20 тем для написания реферата",
                    deadline: "до декабря 2025 г."
                }
                // Добавьте другие файлы для этого предмета:
                // {
                //     filename: "другой-файл.pdf",
                //     name: "Название файла",
                //     desc: "Описание",
                //     deadline: "срок сдачи"
                // }
            ],
            createdAt: "2025-12-03"
        }
        // Добавьте новый предмет здесь:
        // {
        //     id: 2,
        //     name: "Название предмета",
        //     teacher: "ФИО преподавателя",
        //     files: [...],
        //     createdAt: "дата"
        // }
    ];
    
    // Публичные методы
    return {
        // Получить все предметы
        getSubjects: function() {
            return subjects;
        },
        
        // Получить предмет по ID
        getSubjectById: function(id) {
            return subjects.find(subject => subject.id === id);
        },
        
        // Получить количество предметов
        getSubjectsCount: function() {
            return subjects.length;
        },
        
        // Получить общее количество файлов
        getTotalFilesCount: function() {
            return subjects.reduce((total, subject) => {
                return total + (subject.files ? subject.files.length : 0);
            }, 0);
        }
    };
})();

console.log("SubjectData загружен. Предметов:", window.SubjectData.getSubjectsCount());
