/**
 * @see createFullDocumentCanvas.css
 */
export declare function createFullDocumentCanvas({ onDevicePixelRatioOrDocumentSizeChange, afterCanvasSizeAndScaleSet, }?: {
    onDevicePixelRatioOrDocumentSizeChange?: (event: Event) => void;
    afterCanvasSizeAndScaleSet?: () => void;
}): {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    removeEventListeners: () => void;
};
//# sourceMappingURL=createFullDocumentCanvas.d.ts.map