export function mixin(klass, mixinClass) {
  const klassPrototype = klass.prototype
  const mixinClassPrototype = mixinClass.prototype
  let methodNames = new Set(Object.getOwnPropertyNames(mixinClassPrototype))
  methodNames.delete('constructor')
  for (const methodName of methodNames) {
    klassPrototype[methodName] = mixinClassPrototype[methodName]
  }
}
