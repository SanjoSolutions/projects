function A() {
  return {
    foo() {
      return 'bar'
    },
  }
}

const a = new A()
console.log(a)
console.log(a.foo)
console.log(a.foo())

function B() {}

B.prototype = {
  foo() {
    return 'bar'
  },
}

const b = new B()
console.log(b)
console.log(b.foo)
console.log(b.foo())

class Page {
  goto() {
    return 'goto'
  }
}

const MyPageBase = {
  getFoo() {
    return null
  },
  getFoo2() {
    return null
  },
}

const MyPage = Object.assign({}, MyPageBase, {
  getFoo() {
    return 'bar'
  },
})

function decoratePage(page) {
  return Object.assign(page, MyPage)
}

const page = decoratePage(new Page())

console.log(page)
console.log(page.goto)
console.log(page.getFoo)
console.log(page.getFoo())
console.log(page.getFoo2())

const MyPage = Object.assign({}, MyPageBase, {
  getFoo() {
    return 'bar'
  },
})

let MyPage = {}
Object.assign(MyPage, MyPageBase)
Object.assign(MyPage, {
  getFoo() {
    return 'bar'
  },
})

Object.assign(MyPage, MyPageBase)

// naming problem

// Alternative names: sum/plus/addiere
function add(a, b) {
  return a + b
}

a + b
fn(a, b)
a.method(b)
b.method(a)
fn(b, a)

/*
function fn(argument1: Argument1Type, argument2: Argument2Type): ReturnType {

}
*/

// When you program (situation):

// one-pointedness of the mind
// comprehension without having words for it.
