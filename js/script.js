// =====================================================
// CHATBOT LOGIC
// =====================================================

// Elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const suggestions = document.querySelectorAll('.suggestion');

// Bot responses
const botResponses = {
    "destinasi": "Indonesia memiliki banyak destinasi wisata populer seperti Bali, Raja Ampat, Yogyakarta, Lombok, dan Danau Toba. Setiap destinasi menawarkan pengalaman unik.",
    "budaya": "Indonesia memiliki lebih dari 300 kelompok etnis dengan budaya kaya, termasuk Tari Kecak, Wayang Kulit, dan Rumah Gadang.",
    "tips": "Tips perjalanan: gunakan pakaian tropis, pelajari frasa bahasa lokal, hormati adat setempat, coba kuliner lokal, dan gunakan tabir surya.",
    "default": "Maaf, saya belum memahami pertanyaan Anda. Coba tanyakan tentang destinasi wisata, budaya, atau tips perjalanan."
};

// Add message
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Process input
function processUserInput() {
    const input = userInput.value.trim().toLowerCase();
    if (input === '') return;

    addMessage(input, true);
    userInput.value = '';

    let response = botResponses.default;

    if (/destinasi|wisata|tempat/.test(input)) {
        response = botResponses.destinasi;
    } else if (/budaya|tradisi|adat/.test(input)) {
        response = botResponses.budaya;
    } else if (/tips|saran|perjalanan/.test(input)) {
        response = botResponses.tips;
    }

    setTimeout(() => {
        addMessage(response);
    }, 800);
}

// Events
sendButton.addEventListener('click', processUserInput);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processUserInput();
});

// Quick suggestions
suggestions.forEach(s => {
    s.addEventListener('click', () => {
        const question = s.getAttribute('data-question');
        userInput.value = question;
        processUserInput();
    });
});


// =====================================================
// THEME TOGGLE
// =====================================================

const themeToggle = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");
    themeToggle.textContent = isDark ? "☀️" : "🌙";

    localStorage.setItem("theme", isDark ? "dark" : "light");
});


const hamburgerBtn = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".nav-menu");

hamburgerBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});
