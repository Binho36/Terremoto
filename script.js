const platform = document.querySelector('.platform'); 
const building1 = document.getElementById('building1');
const building2 = document.getElementById('building2');
const building3 = document.getElementById('building3');
const slider = document.getElementById('slider');
const frequencyLabel = document.getElementById('frequencyLabel');
const playButton = document.getElementById('playButton');
const gridButton = document.getElementById('gridButton');
const timerDisplay = document.getElementById('timer');
const simulation = document.getElementById('simulation');

let frequency = 1.0;
let time = 0;
let elapsedTime = 0; 
let isPlaying = false;
let isGridVisible = false;
let animationFrame;
let startTime;

const naturalFrequencyBuilding1 = 1.0;
const naturalFrequencyBuilding2 = 4.0;
const naturalFrequencyBuilding3 = 7.5;

function createBuilding(building, segments) {
    for (let i = 0; i < segments; i++) {
        const segment = document.createElement('div');
        segment.classList.add('segment');
        building.appendChild(segment);
    }
}

createBuilding(building1, 20);
createBuilding(building2, 15);
createBuilding(building3, 10);

slider.addEventListener('input', function () {
    frequency = parseFloat(slider.value);
    frequencyLabel.textContent = frequency.toFixed(1) + ' Hz';
});

function applyOscillation(building, naturalFrequency, segments) {
    const segmentElements = building.querySelectorAll('.segment');
    segmentElements.forEach((segment, index) => {
        const ratio = (segments - index) / segments;
        const segmentDisplacement = Math.sin(time * frequency * naturalFrequency) * ratio * Math.exp(-Math.abs(frequency - naturalFrequency));
        segment.style.transform = `translateX(${segmentDisplacement * 50}px)`;
    });
}

function oscillate() {
    time += 0.05;
    const displacement = Math.sin(time * frequency);

    platform.style.transform = `translateX(${displacement * 20}px)`;

    applyOscillation(building1, naturalFrequencyBuilding1, 20);
    applyOscillation(building2, naturalFrequencyBuilding2, 15);
    applyOscillation(building3, naturalFrequencyBuilding3, 10);

    const currentTime = (Date.now() - startTime) / 1000 + elapsedTime;
    timerDisplay.textContent = `Tempo: ${currentTime.toFixed(1)}s`;

    animationFrame = requestAnimationFrame(oscillate);
}

playButton.addEventListener('click', function () {
    if (isPlaying) {
        cancelAnimationFrame(animationFrame);
        elapsedTime += (Date.now() - startTime) / 1000;
        playButton.textContent = 'PLAY';
    } else {
        startTime = Date.now();
        oscillate();
        playButton.textContent = 'PAUSE';
    }
    isPlaying = !isPlaying;
});

gridButton.addEventListener('click', function () {
    if (isGridVisible) {
        simulation.classList.remove('gridBackground');
        gridButton.textContent = 'Mostrar Grade';
    } else {
        simulation.classList.add('gridBackground');
        gridButton.textContent = 'Esconder Grade';
    }
    isGridVisible = !isGridVisible;
});
