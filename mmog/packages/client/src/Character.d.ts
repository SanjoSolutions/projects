import { type Container } from "pixi.js";
import { Object } from "./Object.js";
export declare class Character extends Object {
    #private;
    static loadSpritesheets(): Promise<void>;
    constructor(container: Container);
    protected _updateTextures(): void;
    private _updateTexture;
    protected _play(): void;
    protected _stop(): void;
    private _determineBodyTextures;
    private _determineHeadTextures;
    private _determineHairTextures;
    private _determineTexture;
}
//# sourceMappingURL=Character.d.ts.map