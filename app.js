let timeLeft = 25 * 60;
let timerId = null;
let isRunning = false;

const POMODORO_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const pomodoroButton = document.getElementById('Pomodoro');
const shortBreakButton = document.getElementById('ShortBreak');
const longBreakButton = document.getElementById('LongBreak');

updateDisplay();

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                stopTimer();
                playAlarm();
            }
        }, 1000);
        
        startButton.disabled = true;
        stopButton.disabled = false;
        startButton.style.opacity = '0.7';
        stopButton.style.opacity = '1';
    }
}

function stopTimer() {
    if (isRunning) {
        clearInterval(timerId);
        isRunning = false;
        
        startButton.disabled = false;
        stopButton.disabled = true;
        startButton.style.opacity = '1';
        stopButton.style.opacity = '0.7';
    }
}

function resetTimer() {
    stopTimer();
    timeLeft = getCurrentModeTime();
    updateDisplay();
    
    startButton.disabled = false;
    stopButton.disabled = false;
    startButton.style.opacity = '1';
    stopButton.style.opacity = '1';
}

function getCurrentModeTime() {
    if (pomodoroButton.classList.contains('active')) return POMODORO_TIME;
    if (shortBreakButton.classList.contains('active')) return SHORT_BREAK_TIME;
    if (longBreakButton.classList.contains('active')) return LONG_BREAK_TIME;
    return POMODORO_TIME;
}

function playAlarm() {
    const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
    audio.play().catch(error => console.log('Error playing sound:', error));
}

function changeMode(mode, time, colors) {
    stopTimer();
    timeLeft = time;
    updateDisplay();
    
    document.body.style.background = `linear-gradient(125deg, ${colors.join(', ')})`;
    document.body.style.backgroundSize = '400% 400%';
    
    [pomodoroButton, shortBreakButton, longBreakButton].forEach(btn => {
        btn.classList.remove('active');
    });
    
    switch(mode) {
        case 'pomodoro':
            pomodoroButton.classList.add('active');
            break;
        case 'shortBreak':
            shortBreakButton.classList.add('active');
            break;
        case 'longBreak':
            longBreakButton.classList.add('active');
            break;
    }
}

startButton.onclick = startTimer;
stopButton.onclick = stopTimer;
resetButton.onclick = resetTimer;

pomodoroButton.onclick = () => {
    changeMode('pomodoro', POMODORO_TIME, ['#000000', '#1a1a2e', '#16213e']);
};

shortBreakButton.onclick = () => {
    changeMode('shortBreak', SHORT_BREAK_TIME, ['#1a4645', '#2d6a4f', '#40916c']);
};

longBreakButton.onclick = () => {
    changeMode('longBreak', LONG_BREAK_TIME, ['#3d348b', '#7678ed', '#4a47a3']);
};

pomodoroButton.classList.add('active');
