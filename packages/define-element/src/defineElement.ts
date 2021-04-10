export function defineElement(
  name: string,
  constructor: CustomElementConstructor
) {
  const definedConstructor = customElements.get(name);
  if (definedConstructor) {
    if (definedConstructor !== constructor) {
      throw new Error(
        generateCustomElementAlreadyDefinedWithDifferentConstructorErrorMessage(
          name,
          definedConstructor
        )
      );
    }
  } else {
    customElements.define(name, constructor);
  }
}

export function generateCustomElementAlreadyDefinedWithDifferentConstructorErrorMessage(
  name: string,
  definedConstructor: CustomElementConstructor
) {
  return `customElement with name "${name}" already defined, but with different constructor "${definedConstructor.name}".`;
}
