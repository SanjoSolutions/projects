export type FeatureFlagName = string;
export type FeatureFlagValue = boolean;
export type FeatureFlagsObject = {
    [featureFlag: FeatureFlagName]: boolean;
};
export type FeatureFlagsInitializationValue = FeatureFlagsObject;
export declare class FeatureFlags {
    _featureFlags: Map<FeatureFlagName, FeatureFlagValue>;
    constructor(featureFlags: FeatureFlagsInitializationValue);
    isEnabled(featureFlag: FeatureFlagName): FeatureFlagValue;
    isDisabled(featureFlag: FeatureFlagName): FeatureFlagValue;
    toObject(): FeatureFlagsObject;
}
//# sourceMappingURL=FeatureFlags.d.ts.map