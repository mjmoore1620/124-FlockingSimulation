class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.perception = 50;
        this.maxForce = 0.2;
        this.maxSpeed = 3;
    }

    alignment(boids) {
        let avg = createVector();
        let count = 0;

        for (let i = 0; i < boids.length; i++) {
            let d = p5.Vector.dist(boids[i].position, this.position);
            if (d < this.perception && this != boids[i]) {
                avg.add(boids[i].velocity);
                count++;
            }
        }

        if (count > 0) {
            avg.div(count);
            avg.setMag(this.maxSpeed);
            avg.sub(this.velocity);
            avg.limit(this.maxForce);
        }

        return avg;
    }


    cohesion(boids) {
        let avg = createVector();
        let count = 0;

        for (let i = 0; i < boids.length; i++) {
            let d = p5.Vector.dist(boids[i].position, this.position);
            if (d < this.perception && this != boids[i]) {
                avg.add(boids[i].position);
                count++;
            }
        }

        if (count > 0) {
            avg.div(count);
            avg.sub(this.position);
            avg.setMag(this.maxSpeed);
            avg.sub(this.velocity);
            avg.limit(this.maxForce);
        }

        return avg;
    }

    seperation(boids) {
        let avg = createVector();
        let count = 0;

        for (let i = 0; i < boids.length; i++) {
            let d = p5.Vector.dist(boids[i].position, this.position);
            if (d < this.perception && this != boids[i]) {
                let diff = p5.Vector.sub(this.position, boids[i].position);
                diff.div(d);
                avg.add(diff);
                count++;
            }
        }

        if (count > 0) {
            avg.div(count);
            avg.setMag(this.maxSpeed);
            avg.sub(this.velocity);
            avg.limit(this.maxForce);
        }

        return avg;
    }

    steer(boids) {
        let alignment = this.alignment(boids);
        let cohesion = this.cohesion(boids);
        let seperation = this.seperation(boids);

        alignment.mult(alignmentSlider.value());
        cohesion.mult(cohesionSlider.value());
        seperation.mult(seperationSlider.value());

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(seperation);
    }

    wrap() {
        if (this.position.x > width) {
            this.position.x = 0;
        }
        else if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        }
        else if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);

        this.acceleration = createVector();
        this.wrap();

    }

    show() {
        strokeWeight(8);
        stroke(255);
        point(this.position.x, this.position.y);
    }
}