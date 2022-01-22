export function createCanvasCopy(canvas, context, { x, y, width, height }) {
    const canvasCopy = document.createElement('canvas');
    canvasCopy.width = width - x;
    canvasCopy.height = height - y;
    const copyContext = canvasCopy.getContext('2d');
    copyContext.putImageData(context.getImageData(x, y, width, height), 0, 0);
    return {
        canvas: canvasCopy,
        context: copyContext,
    };
}
//# sourceMappingURL=createCanvasCopy.js.map