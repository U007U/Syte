Write-Host "=== УПРАВЛЕНИЕ САЙТОМ 'Задания для группы' ===" -ForegroundColor Cyan
Write-Host ""

while (True) {
    Write-Host "Выберите действие:" -ForegroundColor Yellow
    Write-Host "1. Показать все предметы"
    Write-Host "2. Создать шаблон для нового предмета"
    Write-Host "3. Открыть файл для редактирования на GitHub"
    Write-Host "4. Открыть инструкцию"
    Write-Host "5. Обновить сайт (сделать commit)"
    Write-Host "0. Выход"
    Write-Host ""
    
     = Read-Host "Ваш выбор"
    
    switch () {
        "1" {
            Write-Host "
=== ТЕКУЩИЕ ПРЕДМЕТЫ ===" -ForegroundColor Green
            & .\show-subjects.ps1
        }
        "2" {
            Write-Host "
=== ШАБЛОН ДЛЯ НОВОГО ПРЕДМЕТА ===" -ForegroundColor Green
            & .\add-subject-template.ps1
        }
        "3" {
            Write-Host "
Открываю GitHub для редактирования..." -ForegroundColor Blue
            Start-Process "https://github.com/U007U/Syte/edit/main/assets/js/data.js"
        }
        "4" {
            Write-Host "
=== ИНСТРУКЦИЯ ===" -ForegroundColor Green
            Get-Content "README-EDIT.txt" | Select-Object -First 30
            Write-Host "
(полная инструкция в файле README-EDIT.txt)" -ForegroundColor Gray
        }
        "5" {
            Write-Host "
=== ОБНОВЛЕНИЕ САЙТА ===" -ForegroundColor Green
            Write-Host "Для обновления выполните в терминале:" -ForegroundColor Yellow
            Write-Host "git add ." -ForegroundColor Cyan
            Write-Host "git commit -m 'ваше сообщение'" -ForegroundColor Cyan
            Write-Host "git push origin main" -ForegroundColor Cyan
        }
        "0" {
            Write-Host "
Выход..." -ForegroundColor Gray
            break
        }
        default {
            Write-Host "Неверный выбор!" -ForegroundColor Red
        }
    }
    
    Write-Host ""
    Write-Host "---" -ForegroundColor DarkGray
    Write-Host ""
}
