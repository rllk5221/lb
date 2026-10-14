// ====================================================
// 1. АКТУАЛЬНЫЙ ГОД В ПОДВАЛЕ
// ====================================================
const yearEl = document.querySelector('#year');
yearEl.textContent = new Date().getFullYear();


// ====================================================
// 2. ПЕРЕКЛЮЧЕНИЕ ТЁМНОЙ ТЕМЫ
//    JS переключает класс на <html>, а стили описаны в CSS
// ====================================================
const themeBtn = document.querySelector('#theme-toggle');

themeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');

    const isDark = document.documentElement.classList.contains('dark');
    themeBtn.textContent = isDark ? '☀️' : '🌙';
});


// ====================================================
// 3. ОТПРАВКА ФОРМЫ БЕЗ ПЕРЕЗАГРУЗКИ СТРАНИЦЫ
// ====================================================
const form = document.querySelector('form');
const statusMsg = document.querySelector('#form-status');

form.addEventListener('submit', (event) => {
    event.preventDefault();        // отменяем перезагрузку

    const name = document.querySelector('#name').value.trim();

    statusMsg.textContent = `Спасибо, ${name}! Сообщение отправлено.`;
    statusMsg.classList.add('visible');

    form.reset();                  // очищаем поля
});


// ====================================================
// 4. КНОПКА «НАВЕРХ» ПОЯВЛЯЕТСЯ ПРИ ПРОКРУТКЕ
// ====================================================
const upBtn = document.querySelector('#to-top');

window.addEventListener('scroll', () => {
    upBtn.classList.toggle('visible', window.scrollY > 400);
});

upBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.addEventListener('DOMContentLoaded', () => {
    // Инициализируем базовый размер шрифта (в процентах)
    let currentFontSize = parseInt(localStorage.getItem('siteFontSize')) || 100;
    document.documentElement.style.fontSize = `${currentFontSize}%`;

    // Проверяем, был ли включен режим высокой контрастности ранее
    if (localStorage.getItem('highContrast') === 'enabled') {
        document.body.classList.add('high-contrast-mode');
    }

    // Находим кнопки панели в DOM
    const btnZoomIn = document.getElementById('btn-zoom-in');
    const btnZoomOut = document.getElementById('btn-zoom-out');
    const btnContrast = document.getElementById('btn-contrast');
    const btnSpeech = document.getElementById('btn-speech');

    // 1. УВЕЛИЧЕНИЕ ШРИФТА (Максимум до 160%)
    btnZoomIn.addEventListener('click', () => {
        if (currentFontSize < 160) {
            currentFontSize += 15;
            document.documentElement.style.fontSize = `${currentFontSize}%`;
            localStorage.setItem('siteFontSize', currentFontSize);
        }
    });

    // 2. УМЕНЬШЕНИЕ ШРИФТА (Минимум до 100%)
    btnZoomOut.addEventListener('click', () => {
        if (currentFontSize > 100) {
            currentFontSize -= 15;
            document.documentElement.style.fontSize = `${currentFontSize}%`;
            localStorage.setItem('siteFontSize', currentFontSize);
        }
    });

    // 3. ВКЛЮЧЕНИЕ / ВЫКЛЮЧЕНИЕ КОНТРАСТНОГО РЕЖИМА
    btnContrast.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast-mode');
        
        // Сохраняем выбор пользователя в браузере
        if (document.body.classList.contains('high-contrast-mode')) {
            localStorage.setItem('highContrast', 'enabled');
        } else {
            localStorage.setItem('highContrast', 'disabled');
        }
    });

    // 4. ОЗВУЧКА САЙТА (Синтез речи для незрячих/слабовидящих)
    btnSpeech.addEventListener('click', () => {
        if ('speechSynthesis' in window) {
            // Если сайт уже "говорит" — останавливаем речь по нажатию кнопки
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                return;
            }

            // Получаем чистый текст со страницы, убирая меню панели доступности
            const pageText = document.body.innerText
                .replace(/А\+\s*А-\s*Высокий контраст 👁️\s*Озвучить сайт 🔊/, '')
                .trim();

            const utterance = new SpeechSynthesisUtterance(pageText);
            utterance.lang = 'ru-RU'; // Читать строго на русском языке
            
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Извините, ваш браузер не поддерживает синтез речи.');
        }
    });
});
