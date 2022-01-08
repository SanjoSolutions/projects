import {
  defineElement,
  generateCustomElementAlreadyDefinedWithDifferentConstructorErrorMessage,
} from './defineElement.js'

describe('defineElement', () => {
  test('defines a custom element', () => {
    class CustomElement extends HTMLElement {}

    defineElement('c-custom-element', CustomElement)
    const element = document.createElement('c-custom-element')
    expect(element).toBeInstanceOf(CustomElement)
  })

  test('throws when a custom element with the same name but another constructor is already registered', () => {
    class CustomElement2 extends HTMLElement {}

    defineElement('c-custom-element-2', CustomElement2)

    class CustomElement22 extends HTMLElement {}

    const name = 'c-custom-element-2'
    expect(() => defineElement(name, CustomElement22)).toThrow(
      generateCustomElementAlreadyDefinedWithDifferentConstructorErrorMessage(name, CustomElement2)
    )
  })

  test('if a custom element is already defined then it silently executes', () => {
    class CustomElement3 extends HTMLElement {}

    defineElement('c-custom-element-3', CustomElement3)

    expect(() => defineElement('c-custom-element-3', CustomElement3)).not.toThrow()
  })
})
