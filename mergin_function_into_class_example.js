class Foo {}

function fn() {}

Object.assign(Foo.prototype, { fn })

const foo = new Foo()
foo.fn()
