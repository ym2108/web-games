let autoRotate = false;
let manualRotationAngle = 0;
let autoHue = true;
let manualHue = 0;
let strokes = 0;
let strokeTime = 0;

function setup() {
    createCanvas(innerWidth, innerHeight);
    colorMode(HSB);
    angleMode(DEGREES);
    background(0);
}

function draw() {
    if (mouseIsPressed) {
        background(0);
    }
}

function mouseMoved() {
    noStroke();
    const hue = autoHue ? frameCount % 360 : manualHue;
    fill(hue, 100, 100);
    translate(mouseX, mouseY);
    rotate(autoRotate ? frameCount : manualRotationAngle);
    const brushWidth = 100;
    const bristleSeparation = 3;
    const drawStartTime = performance.now();
    for (let xo = -brushWidth / 2; xo <= brushWidth / 2; xo += bristleSeparation) {
        for (let yo = -brushWidth / 2; yo <= brushWidth / 2; yo += bristleSeparation) {
            rect(xo, yo, 2, 2);
        }
    }
    strokeTime += performance.now() - drawStartTime;
    if (++strokes % 100 === 0) {
        console.log(`Average time of ${strokes} brush strokes: ${(strokeTime / strokes).toFixed(5)} ms`);
    }
}

function keyPressed(event) {
    switch (event.key) {
        case 'H':
            autoHue = ! autoHue;
            break;
        case 'h':
            autoHue = false;
            manualHue += 15;
            break;
        case 'R':
            autoRotate = ! autoRotate;
            break;
        case 'r':
            autoRotate = false;
            manualRotationAngle += 15;
            break;
        default:
            break;
    }
}
