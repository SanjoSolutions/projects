import { renderOS } from './renderOS';
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#root');
    renderOS(container);
    setTimeout(() => {
        container.classList.add('rotate-out');
    }, 2000);
});
//# sourceMappingURL=index.js.map