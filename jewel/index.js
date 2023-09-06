var t = {
    296: (t, n, e) => {
      var r = /^\s+|\s+$/g,
        o = /^[-+]0x[0-9a-f]+$/i,
        c = /^0b[01]+$/i,
        i = /^0o[0-7]+$/i,
        s = parseInt,
        a = "object" == typeof e.g && e.g && e.g.Object === Object && e.g,
        l = "object" == typeof self && self && self.Object === Object && self,
        u = a || l || Function("return this")(),
        f = Object.prototype.toString,
        d = Math.max,
        m = Math.min,
        h = function () {
          return u.Date.now()
        }
      function p(t) {
        var n = typeof t
        return !!t && ("object" == n || "function" == n)
      }
      function y(t) {
        if ("number" == typeof t) return t
        if (
          (function (t) {
            return (
              "symbol" == typeof t ||
              ((function (t) {
                return !!t && "object" == typeof t
              })(t) &&
                "[object Symbol]" == f.call(t))
            )
          })(t)
        )
          return NaN
        if (p(t)) {
          var n = "function" == typeof t.valueOf ? t.valueOf() : t
          t = p(n) ? n + "" : n
        }
        if ("string" != typeof t) return 0 === t ? t : +t
        t = t.replace(r, "")
        var e = c.test(t)
        return e || i.test(t) ? s(t.slice(2), e ? 2 : 8) : o.test(t) ? NaN : +t
      }
      t.exports = function (t, n, e) {
        var r,
          o,
          c,
          i,
          s,
          a,
          l = 0,
          u = !1,
          f = !1,
          w = !0
        if ("function" != typeof t) throw new TypeError("Expected a function")
        function v(n) {
          var e = r,
            c = o
          return (r = o = void 0), (l = n), (i = t.apply(c, e))
        }
        function b(t) {
          return (l = t), (s = setTimeout(x, n)), u ? v(t) : i
        }
        function g(t) {
          var e = t - a
          return void 0 === a || e >= n || e < 0 || (f && t - l >= c)
        }
        function x() {
          var t = h()
          if (g(t)) return S(t)
          s = setTimeout(
            x,
            (function (t) {
              var e = n - (t - a)
              return f ? m(e, c - (t - l)) : e
            })(t),
          )
        }
        function S(t) {
          return (s = void 0), w && r ? v(t) : ((r = o = void 0), i)
        }
        function M() {
          var t = h(),
            e = g(t)
          if (((r = arguments), (o = this), (a = t), e)) {
            if (void 0 === s) return b(a)
            if (f) return (s = setTimeout(x, n)), v(a)
          }
          return void 0 === s && (s = setTimeout(x, n)), i
        }
        return (
          (n = y(n) || 0),
          p(e) &&
            ((u = !!e.leading),
            (c = (f = "maxWait" in e) ? d(y(e.maxWait) || 0, n) : c),
            (w = "trailing" in e ? !!e.trailing : w)),
          (M.cancel = function () {
            void 0 !== s && clearTimeout(s), (l = 0), (r = a = o = s = void 0)
          }),
          (M.flush = function () {
            return void 0 === s ? i : S(h())
          }),
          M
        )
      }
    },
    917: (t) => {
      var n = /^\s+|\s+$/g,
        e = /^[-+]0x[0-9a-f]+$/i,
        r = /^0b[01]+$/i,
        o = /^0o[0-7]+$/i,
        c = parseInt,
        i = Object.prototype.toString
      function s(t) {
        var n = typeof t
        return !!t && ("object" == n || "function" == n)
      }
      t.exports = function (t) {
        return (function (t, a) {
          var l
          if ("function" != typeof a) throw new TypeError("Expected a function")
          return (
            (t = (function (t) {
              var a = (function (t) {
                  return t
                    ? 1 / 0 ===
                        (t = (function (t) {
                          if ("number" == typeof t) return t
                          if (
                            (function (t) {
                              return (
                                "symbol" == typeof t ||
                                ((function (t) {
                                  return !!t && "object" == typeof t
                                })(t) &&
                                  "[object Symbol]" == i.call(t))
                              )
                            })(t)
                          )
                            return NaN
                          if (s(t)) {
                            var a =
                              "function" == typeof t.valueOf ? t.valueOf() : t
                            t = s(a) ? a + "" : a
                          }
                          if ("string" != typeof t) return 0 === t ? t : +t
                          t = t.replace(n, "")
                          var l = r.test(t)
                          return l || o.test(t)
                            ? c(t.slice(2), l ? 2 : 8)
                            : e.test(t)
                            ? NaN
                            : +t
                        })(t)) || t === -1 / 0
                      ? 17976931348623157e292 * (t < 0 ? -1 : 1)
                      : t == t
                      ? t
                      : 0
                    : 0 === t
                    ? t
                    : 0
                })(t),
                l = a % 1
              return a == a ? (l ? a - l : a) : 0
            })(t)),
            function () {
              return (
                --t > 0 && (l = a.apply(this, arguments)),
                t <= 1 && (a = void 0),
                l
              )
            }
          )
        })(2, t)
      }
    },
  },
  n = {}
function e(r) {
  var o = n[r]
  if (void 0 !== o) return o.exports
  var c = (n[r] = { exports: {} })
  return t[r](c, c.exports, e), c.exports
}
;(e.n = (t) => {
  var n = t && t.__esModule ? () => t.default : () => t
  return e.d(n, { a: n }), n
}),
  (e.d = (t, n) => {
    for (var r in n)
      e.o(n, r) &&
        !e.o(t, r) &&
        Object.defineProperty(t, r, { enumerable: !0, get: n[r] })
  }),
  (e.g = (function () {
    if ("object" == typeof globalThis) return globalThis
    try {
      return this || new Function("return this")()
    } catch (t) {
      if ("object" == typeof window) return window
    }
  })()),
  (e.o = (t, n) => Object.prototype.hasOwnProperty.call(t, n))
var r = {}
;(() => {
  e.d(r, { D: () => u })
  var t = e(296),
    n = e.n(t),
    o = e(917),
    c = e.n(o)
  new Map()
  const i = "Failed to retrieve value."
  class s {
    _cache
    constructor() {
      this._cache = new Map()
    }
    has(t) {
      return Boolean(this._retrieveValue(t, () => !1))
    }
    retrieve(t) {
      return this._retrieveValue(t, () => {
        throw new Error(i)
      })
    }
    set(t, n) {
      t = this._convertKeyToArray(t)
      let e = this._cache
      for (const n of t.slice(0, t.length - 1))
        if (e instanceof Map && e.has(n)) e = e.get(n)
        else {
          const t = new Map()
          e.set(n, t), (e = t)
        }
      e.set(
        (function (t) {
          const n = t.length
          return n >= 1 ? t[n - 1] : null
        })(t),
        n,
      )
    }
    clear() {
      this._cache = new Map()
    }
    _convertKeyToArray(t) {
      let n
      return (n = Array.isArray(t) ? t : [t]), n
    }
    _retrieveValue(t, n) {
      t = this._convertKeyToArray(t)
      let e = this._cache
      for (const r of t) {
        if (!(e instanceof Map && e.has(r))) return n()
        e = e.get(r)
      }
      return e
    }
  }
  class a {
    _cache = new s()
    has(t) {
      const n = this._convertKeyToArray(t)
      return this._cache.has(n)
    }
    get(t) {
      const n = this._convertKeyToArray(t)
      try {
        return this._cache.retrieve(n)
      } catch (t) {
        if (t.message === i) return null
        throw t
      }
    }
    set(t, n) {
      const e = this._convertKeyToArray(t)
      this._cache.set(e, n)
    }
    clear() {
      this._cache.clear()
    }
    _convertKeyToArray(t) {
      return this._convertKeyObjectToArray(t)
    }
    _convertKeyObjectToArray(t) {
      const n = Object.keys(t)
      return n.sort(), n.map((n) => t[n])
    }
  }
  function l(...t) {
    const n = new Set()
    for (const e of t) for (const t of e) n.add(t)
    return n
  }
  function u() {
    const t = 20,
      e = ["red", "green", "yellow", "blue"],
      r = document.querySelector(".circle-grid")
    !(function (t, { rows: n, columns: e, colors: r }) {
      for (let o = 0; o < e; o++) {
        const e = document.createElement("div")
        e.classList.add("circles-column"), t.appendChild(e)
        for (let t = 0; t < n; t++) {
          const n = new Set(r)
          if (o >= 2) {
            const e = [
              $({ row: 19 - t, column: o - 1 }),
              $({ row: 19 - t, column: o - 2 }),
            ]
            if (w(e.map((t) => m(t)))) {
              const t = m(e[0])
              n.delete(t)
            }
          }
          if (t >= 2) {
            const t = [
              e.children[e.children.length - 1],
              e.children[e.children.length - 2],
            ]
            if (w(t.map((t) => m(t)))) {
              const e = m(t[0])
              n.delete(e)
            }
          }
          const c = v(Array.from(n))
          e.appendChild(c)
        }
      }
    })(r, { rows: 20, columns: t, colors: e })
    const o = document.querySelector(".container")
    ;(o.style.width = r.clientWidth + "px"),
      (o.style.height = r.clientHeight + "px")
    let i = new Set(),
      s = null,
      a = null,
      u = null,
      y = null,
      b = null,
      g = !1
    function x() {
      ;(g = !0), document.body.classList.add("swapping-enabled")
    }
    function S() {
      return null !== u
    }
    function M() {
      !(function () {
        const { x: t, y: n } = A()
        s.style.transform = `translate(${t}px, ${n}px)`
      })(),
        (function () {
          const t = (function () {
            const { x: t, y: n } = y
            if (0 !== t || 0 !== n) {
              const e = Math.abs(t),
                r = Math.abs(n)
              return (function (t, n) {
                const e = q(t)
                return $({ row: e.row + n.row, column: e.column + n.column })
              })(s, {
                row: r > e ? (n > 0 ? 1 : -1) : 0,
                column: e > r ? (t > 0 ? 1 : -1) : 0,
              })
            }
            return null
          })()
          if ((b && t !== b && _(), t)) {
            const n = A(),
              e = -n.x,
              r = -n.y
            t.style.transform = `translate(${e}px, ${r}px)`
          }
          b = t
        })()
    }
    function A() {
      return (function (t) {
        const { x: n, y: e } = t,
          r = Math.abs(n),
          o = Math.abs(e)
        return {
          x: r > o ? Math.sign(n) * Math.min(Math.abs(n), 42) : 0,
          y: o > r ? Math.sign(e) * Math.min(Math.abs(e), 42) : 0,
        }
      })(y)
    }
    function _() {
      b && j(b)
    }
    function L() {
      let t = new Set()
      const n = r.querySelectorAll(".circle")
      for (const e of n) {
        const n = m(e),
          r = q(e),
          o = new Set([
            { row: 0, column: 1 },
            { row: 1, column: 0 },
          ])
        for (const e of o) {
          const o = K(n, r, e)
          o.size >= 3 && (t = l(t, o))
        }
      }
      O(t)
    }
    function j(t) {
      t.style.transform = null
    }
    function O(o) {
      if (o.size >= 1) {
        ;(g = !1), document.body.classList.remove("swapping-enabled")
        let i = new Set()
        for (const t of o) t.classList.add("circle--hidden")
        const s = (function (n) {
            const e = new Array(t)
            for (let t = 0; t < e.length; t++) e[t] = new Set()
            for (const t of n) {
              const { column: n } = q(t)
              e[n].add(t)
            }
            return e
          })(o),
          a = 42 * Math.max(...Array.from(s).map((t) => t.size))
        r.style.top = -a + "px"
        const u = new Array(t)
        for (let t = 0; t < s.length; t++) {
          const n = s[t]
          if (n.size >= 1) {
            const o = T(t, n)
            i = l(i, o)
            const c = r.children[t],
              s = n.size
            for (let t = 1; t <= s; t++) {
              const t = v(e)
              c.appendChild(t), o.add(t), i.add(t)
            }
            u[t] = o
          } else u[t] = new Set()
        }
        requestAnimationFrame(() => {
          for (const t of i) t.classList.add("circle--falling")
          requestAnimationFrame(() => {
            const e = n()(
              c()(function t() {
                ;(r.style.top = "0px"),
                  r.removeEventListener("transitionend", t)
                for (const t of o) t.remove()
                for (const t of i)
                  t.classList.remove("circle--falling"), (t.style.top = null)
                requestAnimationFrame(L)
              }),
            )
            r.addEventListener("transitionend", e)
            for (let n = 0; n < t; n++) {
              const t = u[n]
              for (const e of t) {
                const t = q(e).row,
                  r = s[n],
                  o = 42 * Array.from(r).filter((n) => q(n).row > t).length
                e.style.top = `${o}px`
              }
            }
          })
        })
      } else x()
    }
    function T(t, n) {
      const e = new Set()
      let r = Math.max(...Array.from(n).map((t) => q(t).row)),
        o = 0
      for (; o < r; ) {
        const r = $({ row: o, column: t })
        r && !n.has(r) && e.add(r), o++
      }
      return e
    }
    function E(t) {
      const n = t.parentElement
      t.remove()
      const r = v(e)
      n.appendChild(r)
    }
    function $(n) {
      const { row: e, column: o } = n
      if (e >= 0 && e < 20 && o >= 0 && o < t) {
        const t = r.querySelectorAll(".circles-column")[o].children
        return t[t.length - 1 - e]
      }
      return null
    }
    function z(n, e, r) {
      const o = new Set()
      let c = d(e, r)
      for (; c.row < 20 && c.column < t; ) {
        const t = $(c)
        if (!t) break
        if (m(t) !== n) break
        o.add(t), (c = d(c, r))
      }
      return o
    }
    function K(n, e, r) {
      const o = new Set()
      let c = e
      for (; c.row < 20 && c.column < t; ) {
        const t = $(c)
        if (!t) break
        if (m(t) !== n) break
        o.add(t), (c = d(c, r))
      }
      return o
    }
    function q(t) {
      const n = t.parentElement,
        e = Array.from(r.children).indexOf(n),
        o = Array.from(n.children)
      return { row: o.length - 1 - o.indexOf(t), column: e }
    }
    x(),
      r.addEventListener("pointerdown", function (t) {
        if (g) {
          const n = t.target
          if (n.classList.contains("circle")) {
            t.preventDefault()
            const e = n
            i.add(e),
              (s = e),
              (a = m(s)),
              (u = e),
              (y = { x: 0, y: 0 }),
              s.classList.add("circle--dragged"),
              M()
          }
        }
      }),
      r.addEventListener("pointermove", function (t) {
        if (S()) {
          const n = t.target
          if (n.classList.contains("circle")) {
            const t = n
            m(t) === a &&
              (!i.has(t) || (i.size >= 3 && t === s)) &&
              f(t, u) &&
              (i.add(t), (u = t))
          }
          ;(y = { x: y.x + t.movementX, y: y.y + t.movementY }), M()
        }
      }),
      window.addEventListener("pointerup", function () {
        if (S()) {
          if (i.size >= 2)
            if (p(i, t)) {
              const t = r.querySelectorAll(".circle")
              for (const n of t) m(n) === a && E(n)
            } else i.forEach(E)
          if (b) {
            const { x: t, y: n } = A()
            if (Math.abs(t + n) > 21) {
              !(function (t, n) {
                const e = h(t),
                  r = h(n)
                t.classList.remove(e),
                  n.classList.remove(r),
                  t.classList.add(r),
                  n.classList.add(e)
              })(s, b)
              let t = new Set()
              for (const n of new Set([s, b])) {
                let e = new Set()
                const r = m(n),
                  o = q(n),
                  c = new Set([
                    { row: 0, column: -1 },
                    { row: 0, column: 1 },
                  ]),
                  i = new Set([
                    { row: -1, column: 0 },
                    { row: 1, column: 0 },
                  ]),
                  s = new Set([c, i])
                for (const t of s) {
                  let n = new Set()
                  for (const e of t) n = l(n, z(r, o, e))
                  n.size >= 2 && (e = l(e, n))
                }
                e.size >= 1 && e.add(n), (t = l(t, e))
              }
              O(t)
            }
          }
          s.classList.remove("circle--dragged"),
            j(s),
            _(),
            (i = new Set()),
            (s = null),
            (a = null),
            (u = null),
            (y = null),
            (b = null)
        }
      })
  }
  function f(t, n) {
    const e = determinePosition(t),
      r = determinePosition(n),
      o = Math.abs(e.row - r.row),
      c = Math.abs(e.column - r.column)
    return (0 === o && 1 === c) || (0 === c && 1 === o)
  }
  function d(t, n) {
    return { row: t.row + n.row, column: t.column + n.column }
  }
  function m(t) {
    return h(t).split("--")[1]
  }
  function h(t) {
    return Array.from(t.classList).find((t) => t.includes("--"))
  }
  function p(t, n) {
    if (4 === t.size) {
      const e = Array.from(t).map(determinePosition)
      return (
        e.sort((t, e) => y(t, n) - y(e, n)),
        e[0].row === e[1].row &&
          e[0].column === e[1].column - 1 &&
          e[2].row === e[3].row &&
          e[2].column === e[3].column - 1 &&
          e[0].row === e[2].row - 1
      )
    }
    return !1
  }
  function y(t, n) {
    return t.row * n + t.column
  }
  function w(t) {
    return 1 === new Set(t).size
  }
  function v(t) {
    const n = (function (t) {
        return (n = t)[
          ((e = 0),
          (r = n.length - 1),
          (e = Math.floor(e)),
          (r = Math.floor(r)),
          e + Math.floor(Math.random() * (r - e + 1)))
        ]
        var n, e, r
      })(t),
      e = (function ({ color: t }) {
        const n = document.createElement("div")
        return n.classList.add("circle"), n.classList.add(`circle--${t}`), n
      })({ color: n })
    return e
  }
  new a(), new a()
})()
var o = r.D
export { o as main }
//# sourceMappingURL=index.js.map
