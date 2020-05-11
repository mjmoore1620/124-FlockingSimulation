const flock = [];
const flockCount = 50;

let alignmentSlider, cohesionSlider, seperationSlider;

function setup() {
	createCanvas(800, 600);
	alignmentSlider = createSlider(0, 5, 1, .1);
	cohesionSlider = createSlider(0, 5, 1, .1);
	seperationSlider = createSlider(0, 5, 1, .1);

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
}