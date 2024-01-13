let startTime;
let running = false;
let lapCounter = 1;

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime();
        running = true;
        document.getElementById('startBtn').innerText = 'Pause';
        document.getElementById('pauseBtn').disabled = false;
        document.getElementById('lapBtn').disabled = false;
        updateDisplay();
        runTimer();
    } else {
        running = false;
        document.getElementById('startBtn').innerText = 'Resume';
        document.getElementById('pauseBtn').disabled = true;
    }
}

function pauseStopwatch() {
    running = false;
    document.getElementById('startBtn').innerText = 'Resume';
    document.getElementById('pauseBtn').disabled = true;
}

function resetStopwatch() {
    running = false;
    document.getElementById('startBtn').innerText = 'Start';
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('lapBtn').disabled = true;
    document.getElementById('display').innerText = '00:00:00';
    lapCounter = 1;
    document.getElementById('laps').innerHTML = '';
}

function recordLap() {
    const lapTime = getFormattedTime(new Date().getTime() - startTime);
    const lapItem = document.createElement('li');
    lapItem.innerHTML = `<strong>Lap ${lapCounter}:</strong> ${lapTime}`;
    document.getElementById('laps').appendChild(lapItem);
    lapCounter++;
}

function runTimer() {
    if (running) {
        setTimeout(function () {
            updateDisplay();
            runTimer();
        }, 10);
    }
}

function updateDisplay() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const formattedTime = getFormattedTime(elapsedTime);
    document.getElementById('display').innerText = formattedTime;
}

function getFormattedTime(time) {
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((time % 1000) / 10);

    const pad = (value) => value.toString().padStart(2, '0');

    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}
