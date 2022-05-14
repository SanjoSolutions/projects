export declare type FeatureFlagName = string;
export declare type FeatureFlagValue = boolean;
export declare type FeatureFlagsObject = {
    [featureFlag: FeatureFlagName]: boolean;
};
export declare type FeatureFlagsInitializationValue = FeatureFlagsObject;
export declare class FeatureFlags {
    _featureFlags: Map<FeatureFlagName, FeatureFlagValue>;
    constructor(featureFlags: FeatureFlagsInitializationValue);
    isEnabled(featureFlag: FeatureFlagName): FeatureFlagValue;
    isDisabled(featureFlag: FeatureFlagName): FeatureFlagValue;
    toObject(): FeatureFlagsObject;
}
//# sourceMappingURL=FeatureFlags.d.ts.map