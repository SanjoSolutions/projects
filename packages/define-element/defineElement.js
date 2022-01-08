export function defineElement(name, constructor) {
  const definedConstructor = customElements.get(name)
  if (definedConstructor) {
    if (definedConstructor !== constructor) {
      throw new Error(generateCustomElementAlreadyDefinedWithDifferentConstructorErrorMessage(name, definedConstructor))
    }
  } else {
    customElements.define(name, constructor)
  }
}
export function generateCustomElementAlreadyDefinedWithDifferentConstructorErrorMessage(name, definedConstructor) {
  return `customElement with name "${name}" already defined, but with different constructor "${definedConstructor.name}".`
}
//# sourceMappingURL=defineElement.js.map
