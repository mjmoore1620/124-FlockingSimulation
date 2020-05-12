const flock = [];
const flockCount = 100;
let decimateButton;

let frameRate;
let frameRates = [];
let frameRateButton;

let alignmentSlider, cohesionSlider, separationSlider;

function setup() {
	createCanvas(800, 600);
	alignmentSlider = createSlider(0, 5, 1, .1);
	cohesionSlider = createSlider(0, 5, 1, .1);
	separationSlider = createSlider(0, 5, 1, .1);

	decimateButton = createButton('decimate the flock');
	decimateButton.mousePressed(decimateFlock);

	frameRateButton = createButton('average frames');
	frameRateButton.mousePressed(averageFrames);

	for (let i = 0; i < flockCount; i++) {
		flock.push(new Boid());
	}
}

function draw() {
	background(51);

	for (let i = 0; i < flock.length; i++) {
		flock[i].steer(flock);
		flock[i].update();
		flock[i].show();
	}

	frameRate = getFrameRate();
	frameRates.push(frameRate);
	frameRate = floor(frameRate);
	text(frameRate, 10, 10);
}

function decimateFlock() {
	let tenth = flock.length / 10;

	for (let i = 0; i < tenth; i++) {
		flock.shift();
	}
}

function mouseClicked() {
	let newBoid = new Boid();
	newBoid.position.x = mouseX;
	newBoid.position.y = mouseY;
	flock.push(newBoid);
}

function averageFrames() {
	let avg = 0;

	frameRates.forEach(element => {
		avg += element;
	});
	avg = avg / frameRates.length;
	console.log(avg);
}