import { generateRandomInteger } from '@sanjo/random';
class Heart {
    x;
    y;
    a = 0;
    b = 0;
    top = 0;
    offsetY = 0;
    // Polynomial function of 2nd degree to model the movement curve
    xs = 0;
    ys = 0;
    m = 0;
    element;
    constructor({ x, y }) {
        this.x = x;
        this.y = y;
        this.element = document.createElement('div');
        this.element.textContent = '❤';
        this.element.classList.add('heart');
        document.body.appendChild(this.element);
    }
    generateNewAAndB() {
        this.a = generateRandomInteger(128, 182 + 1);
        this.b = generateRandomInteger(-200, 200 + 1);
        this.offsetY = 0;
        this.xs = 0;
        this.ys = this.b;
        /**
         * @source https://www.wolframalpha.com/input/?i2d=true&i=0%3Dm*Power%5B%5C%2840%29a-e%5C%2841%29%2C2%5D%2Bd
         * d = ys
         * e = xs
         */
        this.m = -(this.ys / (this.xs - this.a) ** 2);
    }
    f(x) {
        return this.m * (x - this.xs) ** 2 + this.ys;
    }
}
export function main() {
    const hearts = [];
    function spawnHearts() {
        for (let i = 0; i < 5; i++) {
            const heart = new Heart({ x: generateRandomInteger(0, window.innerWidth), y: -10 });
            hearts.push(heart);
        }
    }
    spawnHearts();
    setInterval(spawnHearts, 3000);
    hearts.forEach(heart => heart.generateNewAAndB());
    function requestNextAnimationFrame() {
        requestAnimationFrame(animate);
    }
    function animate() {
        for (const heart of hearts) {
            const offsetX = heart.f(heart.offsetY - heart.a);
            if (heart.offsetY >= 2 * heart.a) {
                heart.generateNewAAndB();
            }
            const asd = 0.125;
            heart.top += asd;
            heart.offsetY += asd;
            heart.element.style.left = `${heart.x + offsetX}px`;
            heart.element.style.top = `${heart.top}px`;
        }
        requestNextAnimationFrame();
    }
    requestNextAnimationFrame();
}
//# sourceMappingURL=main.js.map