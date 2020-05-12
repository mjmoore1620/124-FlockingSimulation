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

        for (let i = 0; i < boids.length; i++) {
            avg.add(boids[i].velocity);
        }

        avg.div(boids.length);
        avg.setMag(this.maxSpeed);
        avg.sub(this.velocity);
        avg.limit(this.maxForce);

        return avg;
    }


    cohesion(boids) {
        let avg = createVector();

        for (let i = 0; i < boids.length; i++) {
            avg.add(boids[i].position);
        }

        avg.div(boids.length);
        avg.sub(this.position);
        avg.setMag(this.maxSpeed);
        avg.sub(this.velocity);
        avg.limit(this.maxForce);

        return avg;
    }

    separation(boids) {
        let avg = createVector();

        for (let i = 0; i < boids.length; i++) {
            let d = p5.Vector.dist(boids[i].position, this.position);
            let diff = p5.Vector.sub(this.position, boids[i].position);
            diff.div(d);
            avg.add(diff);
        }

        avg.div(boids.length);
        avg.setMag(this.maxSpeed);
        avg.sub(this.velocity);
        avg.limit(this.maxForce);

        return avg;
    }

    steer(boids) {
        let locals = this.getLocalBoids(boids);

        if (locals.length > 0) {
            let alignment = this.alignment(locals);
            let cohesion = this.cohesion(locals);
            let separation = this.separation(locals);

            alignment.mult(alignmentSlider.value());
            cohesion.mult(cohesionSlider.value());
            separation.mult(separationSlider.value());

            this.acceleration.add(alignment);
            this.acceleration.add(cohesion);
            this.acceleration.add(separation);
        }
    }

    getLocalBoids(boids) {
        let locals = [];
        for (let i = 0; i < boids.length; i++) {
            let d = p5.Vector.dist(boids[i].position, this.position);
            if (d < this.perception && this != boids[i]) {
                locals.push(boids[i]);
            }
        }
        //console.log(locals.length);
        
        return locals;
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