import { calculateArea } from "./calculateArea"
import { pipe } from "./pipe"

describe("practice", () => {
  test("joining with comma and space between", () => {
    expect(["a", "b", "c"].join(", ")).toEqual("a, b, c")
  })

  test("prefixing string with '@'", () => {
    expect(["a", "b", "c"].map((a) => "@" + a)).toEqual(["@a", "@b", "@c"])
  })

  test("a++ returns a", () => {
    let a = 1
    expect(a++).toEqual(1)
  })

  test("++a returns a + 1", () => {
    let a = 1
    expect(++a).toEqual(1 + 1)
  })

  test("sorting", () => {
    expect(["b", "c", "a"].sort()).toEqual(["a", "b", "c"])
  })

  test("sorting and chaining", () => {
    expect(["b", "c", "a"].sort().map((value) => "@" + value)).toEqual([
      "@a",
      "@b",
      "@c",
    ])
  })

  test("reduce array of strings", () => {
    const array = ["a", "b", "c"]
    const concat = array.reduce((result, value) => result + value)
    expect(concat).toEqual("abc")
  })

  test("reduce array of objects", () => {
    const objects = [{ a: "a" }, { b: "b" }, { c: "c" }]
    const merge = objects.reduce(
      (merge, object) => Object.assign(merge, object),
      {}
    )
    expect(merge).toEqual({ a: "a", b: "b", c: "c" })
  })

  test("merge objects", () => {
    const objects = [{ a: "a" }, { b: "b" }, { c: "c" }]
    const merge = Object.assign({}, ...objects)
    expect(merge).toEqual({ a: "a", b: "b", c: "c" })
  })

  test("...", () => {
    function sum(...numbers) {
      return numbers.reduce((sum, number) => sum + number)
    }

    const numbers = [1, 2, 3, 4]

    const result = sum(...numbers)

    expect(result).toEqual(10)
  })

  test("", () => {
    const { a, b, c } = { a: 1, b: 2, c: 3 }
    expect(a).toEqual(1)
    expect(b).toEqual(2)
    expect(c).toEqual(3)
  })

  test("", () => {
    const [a, b, c] = [1, 2, 3]
    expect(a).toEqual(1)
    expect(b).toEqual(2)
    expect(c).toEqual(3)
  })

  test("pipe", () => {
    expect(
      pipe(
        1,
        (value) => value * 2,
        (value) => value + 3
      )
    ).toEqual(5)
  })

  test("calculate area", () => {
    const width = 50 // m
    const length = 45 // m
    const expectedArea = 2250 // m^2
    expect(calculateArea(width, length)).toEqual(expectedArea)
  })

  test.skip('replace "I" with "it"', () => {
    expect("I do not know.").toEqual("It does not know.")
  })
})
