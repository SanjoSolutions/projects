export type FeatureFlagName = string;
export type FeatureFlagValue = boolean;

export type FeatureFlagsObject = { [featureFlag: FeatureFlagName]: boolean };

export type FeatureFlagsInitializationValue = FeatureFlagsObject;

export class FeatureFlags {
  public _featureFlags: Map<FeatureFlagName, FeatureFlagValue>;

  constructor(featureFlags: FeatureFlagsInitializationValue) {
    this._featureFlags = new Map(Object.entries(featureFlags));
  }

  isEnabled(featureFlag: FeatureFlagName): FeatureFlagValue {
    if (this._featureFlags.has(featureFlag)) {
      return Boolean(this._featureFlags.get(featureFlag));
    } else {
      throw new Error(`Feature flag "${featureFlag}" has not been set.`);
    }
  }

  isDisabled(featureFlag: FeatureFlagName): FeatureFlagValue {
    return !this.isEnabled(featureFlag);
  }

  toObject(): FeatureFlagsObject {
    return Object.fromEntries(this._featureFlags.entries());
  }
}
