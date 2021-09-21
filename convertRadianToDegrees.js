const radianToDegreesConversionValue = 180 / Math.PI;

export function convertRadianToDegrees(value) {
  return value * radianToDegreesConversionValue;
}
