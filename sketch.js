const flock = [];
const flockCount = 100;
let frameRate;
let frameRates = [];

let alignmentSlider, cohesionSlider, separationSlider;
let frameRateButton;

function setup() {
	createCanvas(800, 600);
	alignmentSlider = createSlider(0, 5, 1, .1);
	cohesionSlider = createSlider(0, 5, 1, .1);
	separationSlider = createSlider(0, 5, 1, .1);

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

function averageFrames() {
	let avg = 0;

	frameRates.forEach(element => {
		avg += element;
	});
	avg = avg / frameRates.length;
	console.log(avg);
	
		
}