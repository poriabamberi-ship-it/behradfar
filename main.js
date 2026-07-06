// سیستم تغییر تم (سیاه و سفید / روشن و تاریک)
const themeToggle = document.querySelector('#themeToggle');
const htmlElement = document.documentElement;

themeToggle.addEventListener('click', (e) => {
    e.preventDefault()
    if (htmlElement.getAttribute('data-bs-theme') === 'light') {
        htmlElement.setAttribute('data-bs-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> حالت روز';
        themeToggle.className = 'btn btn-outline-light ms-lg-3 mt-2 mt-lg-0';
    } else {
        htmlElement.setAttribute('data-bs-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i> حالت شب';
        themeToggle.className = 'btn btn-outline-secondary ms-lg-3 mt-2 mt-lg-0';
    }
});

// دیتابیس سوالات تعیین سطح (شامل ۵ سوال برای هر ۶ سطح)
const quizData = {
    'A1': [
        { q: "What ___ your name?", a: ["is", "am", "are", "be"], c: 0 },
        { q: "I ___ a student.", a: ["is", "am", "are", "be"], c: 1 },
        { q: "She ___ from Iran.", a: ["come", "comes", "coming", "is come"], c: 1 },
        { q: "Where ___ you live?", a: ["do", "does", "are", "is"], c: 0 },
        { q: "This is ___ apple.", a: ["a", "an", "the", "any"], c: 1 }
    ],
    'A2': [
        { q: "Yesterday, I ___ to the cinema.", a: ["go", "gone", "went", "going"], c: 2 },
        { q: "Have you ___ been to London?", a: ["never", "ever", "already", "yet"], c: 1 },
        { q: "He is ___ than his brother.", a: ["tall", "taller", "tallest", "more tall"], c: 1 },
        { q: "Look! It ___.", a: ["rain", "rains", "is raining", "rained"], c: 2 },
        { q: "I don't have ___ money.", a: ["some", "any", "many", "no"], c: 1 }
    ],
    'B1': [
        { q: "If it rains tomorrow, we ___ the party.", a: ["cancel", "would cancel", "will cancel", "canceled"], c: 2 },
        { q: "The book ___ by J.K. Rowling.", a: ["wrote", "was written", "is writing", "has written"], c: 1 },
        { q: "I'm looking forward to ___ you.", a: ["see", "seeing", "seen", "saw"], c: 1 },
        { q: "You ___ smoke here; it's forbidden.", a: ["mustn't", "don't have to", "shouldn't", "can't"], c: 0 },
        { q: "He asked me where I ___.", a: ["live", "lived", "living", "am living"], c: 1 }
    ],
    'B2': [
        { q: "I wish I ___ harder when I was at school.", a: ["study", "studied", "have studied", "had studied"], c: 3 },
        { q: "By next year, they ___ the new highway.", a: ["will finish", "will have finished", "finish", "are finishing"], c: 1 },
        { q: "Despite ___ tired, she finished her homework.", a: ["be", "she was", "being", "been"], c: 2 },
        { q: "Should you need any help, please ___ me.", a: ["contact", "will contact", "contacted", "to contact"], c: 0 },
        { q: "Hardly ___ entered the room when the lights went out.", a: ["I had", "had I", "I have", "have I"], c: 1 }
    ],
    'C1': [
        { q: "Such was the demand that the book ___ out in hours.", a: ["sold", "was sold", "selling", "had sold"], c: 0 },
        { q: "It's high time you ___ taking life seriously.", a: ["start", "started", "should start", "have started"], c: 1 },
        { q: "Were it ___ for your help, I wouldn't have succeeded.", a: ["not", "but", "had", "without"], c: 0 },
        { q: "He speaks English as if it ___ his native language.", a: ["is", "was", "were", "has been"], c: 2 },
        { q: "No sooner had he arrived ___ it started to pour.", a: ["then", "than", "when", "that"], c: 1 }
    ],
    'C2': [
        { q: "The company's success is largely attributable ___ its innovative marketing strategy.", a: ["to", "for", "with", "by"], c: 0 },
        { q: "Under no circumstances ___ you disclose this password.", a: ["you should", "should you", "must you not", "you ought to"], c: 1 },
        { q: "He is a politician ___ excellence.", a: ["by", "par", "with", "in"], c: 1 },
        { q: "The provision of healthcare is ___ to the government's agenda.", a: ["paramount", "central", "pivotal", "top"], c: 1 },
        { q: "She was completely taken ___ by his charming lies.", a: ["away", "in", "up", "over"], c: 1 }
    ]
};

let currentLevel = '';

// باز کردن مودال آزمون و رندر کردن سوالات
function openQuiz(level) {
    currentLevel = level;
    const modalTitle = document.getElementById('quizModalTitle');
    const modalBody = document.getElementById('quizModalBody');
    
    modalTitle.innerText = `آزمون تعیین سطح - سطح ${level}`;
    modalBody.innerHTML = '';

    quizData[level].forEach((quiz, index) => {
        let optionsHtml = '';
        quiz.a.forEach((option, optIndex) => {
            optionsHtml += `
                <div class="form-check mb-2">
                    <input class="form-check-input" type="radio" name="question${index}" id="q${index}o${optIndex}" value="${optIndex}">
                    <label class="form-check-label ms-2" for="q${index}o${optIndex}">${option}</label>
                </div>
            `;
        });

        modalBody.innerHTML += `
            <div class="mb-4 p-3 border rounded bg-body-tertiary text-start" dir="ltr">
                <p class="fw-bold">${index + 1}. ${quiz.q}</p>
                ${optionsHtml}
            </div>
        `;
    });

    const myModal = new bootstrap.Modal(document.getElementById('quizModal'));
    myModal.show();
}

// بررسی جواب‌ها
function submitQuiz() {
    const questions = quizData[currentLevel];
    let score = 0;
    let allAnswered = true;

    questions.forEach((quiz, index) => {
        const selected = document.querySelector(`input[name="question${index}"]:checked`);
        if (!selected) {
            allAnswered = false;
        } else if (parseInt(selected.value) === quiz.c) {
            score++;
        }
    });

    if (!allAnswered) {
        alert("لطفاً به تمام سوالات پاسخ دهید.");
        return;
    }

    const modalBody = document.getElementById('quizModalBody');
    modalBody.innerHTML = `
        <div class="text-center py-4">
            <i class="fas fa-chart-bar fa-4x text-primary mb-3"></i>
            <h4>نتیجه آزمون شما در سطح ${currentLevel}</h4>
            <p class="display-6 fw-bold text-success mt-3">${score} از ۵</p>
            <p class="lead mt-3">${score >= 4 ? 'عالی بود! شما آمادگی ورود به سطح بالاتر را دارید.' : 'پیشنهاد می‌شود این سطح را بیشتر تمرین کنید.'}</p>
        </div>
    `;
}