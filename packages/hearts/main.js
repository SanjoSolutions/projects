export function main() {
    let top = 0;
    const heart = document.createElement('div');
    heart.textContent = '❤';
    heart.classList.add('heart');
    document.body.appendChild(heart);
    function requestNextAnimationFrame() {
        requestAnimationFrame(animate);
    }
    function animate() {
        top += 0.125;
        heart.style.top = `${top}px`;
        requestNextAnimationFrame();
    }
    requestNextAnimationFrame();
}
//# sourceMappingURL=main.js.map