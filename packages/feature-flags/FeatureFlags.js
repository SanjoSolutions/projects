export class FeatureFlags {
    _featureFlags;
    constructor(featureFlags) {
        this._featureFlags = new Map(Object.entries(featureFlags));
    }
    isEnabled(featureFlag) {
        if (this._featureFlags.has(featureFlag)) {
            return Boolean(this._featureFlags.get(featureFlag));
        }
        else {
            throw new Error(`Feature flag "${featureFlag}" has not been set.`);
        }
    }
    isDisabled(featureFlag) {
        return !this.isEnabled(featureFlag);
    }
    toObject() {
        return Object.fromEntries(this._featureFlags.entries());
    }
}
//# sourceMappingURL=FeatureFlags.js.map