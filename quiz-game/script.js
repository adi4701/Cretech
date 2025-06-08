
const questions = [
    {
        question: "What is the capital of France?",
        choices: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
    },
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        correctAnswer: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        choices: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
        correctAnswer: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correctAnswer: 3
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;


const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const questionElement = document.getElementById('question');
const choicesContainer = document.getElementById('choices');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const finalScoreSpan = document.getElementById('final-score');
const messageElement = document.getElementById('message');
const progressFill = document.querySelector('.progress-fill');

function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    showScreen('start-screen');
}

function showScreen(screenId) {
    [startScreen, quizScreen, endScreen].forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}


function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    
    
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    totalQuestionsSpan.textContent = questions.length;
    document.querySelector('.progress-fill').style.width = 
        `${((currentQuestionIndex + 1) / questions.length) * 100}%`;


    choicesContainer.innerHTML = '';
    question.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice;
        
        button.addEventListener('click', () => selectChoice(index));
        choicesContainer.appendChild(button);
    });


    nextBtn.style.display = currentQuestionIndex < questions.length - 1 ? 'inline-block' : 'none';
    submitBtn.style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
}


function selectChoice(choiceIndex) {
    selectedAnswer = choiceIndex;
    document.querySelectorAll('.choice-btn').forEach((button, index) => {
        button.classList.toggle('selected', index === choiceIndex);
    });
}


function calculateScore() {
    return score;
}


function showResults() {
    const percentage = (score / questions.length) * 100;
    finalScoreSpan.textContent = `${percentage}%`;
    
    let message;
    if (percentage >= 80) {
        message = "Excellent! You're a quiz master!";
    } else if (percentage >= 60) {
        message = "Good job! You did well!";
    } else if (percentage >= 40) {
        message = "Not bad, but there's room for improvement.";
    } else {
        message = "Keep practicing, you'll do better next time!";
    }
    messageElement.textContent = message;
    showScreen('end-screen');
}

startBtn.addEventListener('click', () => {
    showScreen('quiz-screen');
    loadQuestion();
});

nextBtn.addEventListener('click', () => {
    if (selectedAnswer !== null) {
        checkAnswer();
        currentQuestionIndex++;
        loadQuestion();
    }
});

submitBtn.addEventListener('click', () => {
    if (selectedAnswer !== null) {
        checkAnswer();
        showScreen('end-screen');
        showResults();
    }
});

restartBtn.addEventListener('click', () => {
    initQuiz();
    loadQuestion();
});

// Start the quiz
initQuiz(); 