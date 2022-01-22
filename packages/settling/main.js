import { createFullDocumentCanvas } from '@sanjo/canvas';
import '@sanjo/canvas/createFullDocumentCanvas.css';
export function main() {
    const { canvas, context } = createFullDocumentCanvas();
    document.body.appendChild(canvas);
    const a = new A(canvas, context);
    context.fillStyle = 'darkblue';
    context.fillRect(0, 0, canvas.width, canvas.height);
    a.drawIsland();
}
class A {
    _canvas;
    _context;
    constructor(canvas, context) {
        this._canvas = canvas;
        this._context = context;
    }
    drawIsland() {
        this._context.fillStyle = 'papayawhip';
        this._context.fillRect(0.25 * this._canvas.width, 0.25 * this._canvas.height, 0.5 * this._canvas.width, 0.5 * this._canvas.height);
    }
}
//# sourceMappingURL=main.js.map