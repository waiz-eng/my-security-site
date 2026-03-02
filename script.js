const checkPassword = (password) => {
    let score = 0;
    if (password.length > 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

const scanLink = (url) => {
    const dangerous = ['free', 'gift', 'login', 'crypto', 'win'];
    return dangerous.some(word => url.toLowerCase().includes(word));
};

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => console.log('Клик по элементу: ' + el.innerText));
});

function checkLink() {
    const input = document.getElementById('urlInput').value.toLowerCase();
    const result = document.getElementById('scanResult');
    const dangerous = ['free', 'gift', 'promo', 'login', 'steam', 'crypto', 'win', 'giveaway'];

    if (!input) {
        result.textContent = "Введите ссылку!";
        return;
    }

    const isSuspicious = dangerous.some(word => input.includes(word));

    if (isSuspicious) {
        result.textContent = "⚠️ ВНИМАНИЕ: Похоже на скам-ссылку!";
        result.className = "danger";
    } else {
        result.textContent = "✅ На первый взгляд безопасно.";
        result.className = "safe";
    }
}

function checkLeak() {
    const email = document.getElementById('emailInput').value;
    const status = document.getElementById('leakStatus');

    if (!email.includes('@')) {
        status.innerHTML = "Введите корректный e-mail!";
        return;
    }

    status.innerHTML = "<span class='loading'>Стучимся в базы...</span>";

    setTimeout(() => {
        if (email.length % 2 === 0) {
            status.innerHTML = "<div class='warning'>🚨 ВНИМАНИЕ! Эта почта найдена в базе слитых паролей!</div>";
        } else {
            status.innerHTML = "<span class='clean'>✅ Чисто. Твои данные в безопасности.</span>";
        }
    }, 1200);
}

const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Закрывать меню при клике на ссылку
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

const text = "НЕ ОБЩИЕ.";
const speed = 150; 
const target = document.querySelector("#typewriter .highlight");
let i = 0;

function typeWriter() {
    if (i < text.length) {
        target.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

// Запуск после загрузки страницы
window.onload = typeWriter;

const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%'\"#&_";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ccff00"; // Цвет символов под стиль сайта
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound() {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'square'; // Хакерский "бип"
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // Частота
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // Громкость

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
    oscillator.stop(audioCtx.currentTime + 0.1);
}

document.addEventListener('mousedown', () => {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
});

document.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.card')) {
        playSound();
    }
});