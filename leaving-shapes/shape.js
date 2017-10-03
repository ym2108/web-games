class Shape {
    constructor(keyIndex, length, settings) {
        function rv() {
            return random(-5, 5);
        }
        this.length = length;
        this.settings = settings;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        const harmonicNumber = int(random(settings.numHarmonics)) + 1;
        this.hue = map(harmonicNumber, 1, settings.numHarmonics, 0, 255);
        this.dx = rv();
        this.dy = rv();
        this.dz = rv();
        const chromaticScaleFreqs = [
            65.41,
            69.30,
            73.42,
            77.78,
            82.41,
            87.31,
            92.50,
            98.00,
            103.83,
            110.00,
            116.54,
            123.47
        ];
        const fundamental = chromaticScaleFreqs[keyIndex];
        const freqMult = harmonicNumber;
        const maxPitchDev = 0.1;
        const pitchDev = (1 - settings.intonation) * maxPitchDev;
        const freq = fundamental * freqMult * random(1 - pitchDev, 1 + pitchDev);
        this.sound = new ShapeSound(freq, settings.volume, this.deltaMagnitude());
        this.startMillis = millis();
    }

    draw() {
        push();
        translate(this.x, this.y, this.z);
        fill(this.hue, 100, 100);
        rotateX(frameCount / 30);
        rotateY(frameCount / 35);
        rotateZ(frameCount / 40);
        box(this.length);
        pop();
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
        this.z += this.dz;
    }

    adjustSound() {
        const unclampedPan = map(this.x, -width / 2, width / 2, -1, 1);
        this.sound.setPan(constrain(unclampedPan, -1, 1));
    }

    distance() {
        return sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    deltaMagnitude() {
        return sqrt(this.dx * this.dx + this.dy * this.dy + this.dz * this.dz);
    }
}
