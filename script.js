let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

const timeDisplay = document.getElementById('time');
const lapList = document.getElementById('laps');
const startStopBtn = document.getElementById('startStopBtn');
const lapResetBtn = document.getElementById('lapResetBtn');
const darkModeBtn = document.getElementById('darkModeBtn');
const stopwatchContainer = document.querySelector('.stopwatch');

function formatTime(ms) {
    let hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = ms % 1000;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function startStop() {
    if (!isRunning) {
        startStopBtn.textContent = 'Stop';
        startTime = Date.now() - elapsedTime;
        timer = setInterval(function () {
            elapsedTime = Date.now() - startTime;
            timeDisplay.textContent = formatTime(elapsedTime);
        }, 10);
    } else {
        startStopBtn.textContent = 'Start';
        clearInterval(timer);
    }
    isRunning = !isRunning;
}

function lapReset() {
    if (isRunning) {
        let lapTime = formatTime(elapsedTime);
        let lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapList.appendChild(lapItem);
    } else {
        startStopBtn.textContent = 'Start';
        clearInterval(timer);
        elapsedTime = 0;
        timeDisplay.textContent = '00:00:00.000';
        lapList.innerHTML = '';
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    stopwatchContainer.classList.toggle('dark-mode');
    darkModeBtn.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
}

startStopBtn.addEventListener('click', startStop);
lapResetBtn.addEventListener('click', lapReset);
darkModeBtn.addEventListener('click', toggleDarkMode);
