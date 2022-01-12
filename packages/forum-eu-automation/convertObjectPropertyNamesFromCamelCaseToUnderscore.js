import { camelCaseToUnderscore } from './camelCaseToUnderscore.js';
export function convertObjectPropertyNamesFromCamelCaseToUnderscore(data) {
    return Object.fromEntries(Object.entries(data).map(([propertyName, propertyValue]) => [
        camelCaseToUnderscore(propertyName),
        propertyValue,
    ]));
}
//# sourceMappingURL=convertObjectPropertyNamesFromCamelCaseToUnderscore.js.map