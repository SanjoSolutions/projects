var t = {
    296: (t, n, e) => {
      var o = /^\s+|\s+$/g,
        r = /^[-+]0x[0-9a-f]+$/i,
        c = /^0b[01]+$/i,
        i = /^0o[0-7]+$/i,
        s = parseInt,
        u = 'object' == typeof e.g && e.g && e.g.Object === Object && e.g,
        l = 'object' == typeof self && self && self.Object === Object && self,
        f = u || l || Function('return this')(),
        a = Object.prototype.toString,
        d = Math.max,
        m = Math.min,
        p = function () {
          return f.Date.now()
        }
      function w(t) {
        var n = typeof t
        return !!t && ('object' == n || 'function' == n)
      }
      function h(t) {
        if ('number' == typeof t) return t
        if (
          (function (t) {
            return (
              'symbol' == typeof t ||
              ((function (t) {
                return !!t && 'object' == typeof t
              })(t) &&
                '[object Symbol]' == a.call(t))
            )
          })(t)
        )
          return NaN
        if (w(t)) {
          var n = 'function' == typeof t.valueOf ? t.valueOf() : t
          t = w(n) ? n + '' : n
        }
        if ('string' != typeof t) return 0 === t ? t : +t
        t = t.replace(o, '')
        var e = c.test(t)
        return e || i.test(t) ? s(t.slice(2), e ? 2 : 8) : r.test(t) ? NaN : +t
      }
      t.exports = function (t, n, e) {
        var o,
          r,
          c,
          i,
          s,
          u,
          l = 0,
          f = !1,
          a = !1,
          y = !0
        if ('function' != typeof t) throw new TypeError('Expected a function')
        function v(n) {
          var e = o,
            c = r
          return (o = r = void 0), (l = n), (i = t.apply(c, e))
        }
        function b(t) {
          return (l = t), (s = setTimeout(x, n)), f ? v(t) : i
        }
        function g(t) {
          var e = t - u
          return void 0 === u || e >= n || e < 0 || (a && t - l >= c)
        }
        function x() {
          var t = p()
          if (g(t)) return S(t)
          s = setTimeout(
            x,
            (function (t) {
              var e = n - (t - u)
              return a ? m(e, c - (t - l)) : e
            })(t)
          )
        }
        function S(t) {
          return (s = void 0), y && o ? v(t) : ((o = r = void 0), i)
        }
        function M() {
          var t = p(),
            e = g(t)
          if (((o = arguments), (r = this), (u = t), e)) {
            if (void 0 === s) return b(u)
            if (a) return (s = setTimeout(x, n)), v(u)
          }
          return void 0 === s && (s = setTimeout(x, n)), i
        }
        return (
          (n = h(n) || 0),
          w(e) &&
            ((f = !!e.leading),
            (c = (a = 'maxWait' in e) ? d(h(e.maxWait) || 0, n) : c),
            (y = 'trailing' in e ? !!e.trailing : y)),
          (M.cancel = function () {
            void 0 !== s && clearTimeout(s), (l = 0), (o = u = r = s = void 0)
          }),
          (M.flush = function () {
            return void 0 === s ? i : S(p())
          }),
          M
        )
      }
    },
    917: t => {
      var n = /^\s+|\s+$/g,
        e = /^[-+]0x[0-9a-f]+$/i,
        o = /^0b[01]+$/i,
        r = /^0o[0-7]+$/i,
        c = parseInt,
        i = Object.prototype.toString
      function s(t) {
        var n = typeof t
        return !!t && ('object' == n || 'function' == n)
      }
      t.exports = function (t) {
        return (function (t, u) {
          var l
          if ('function' != typeof u) throw new TypeError('Expected a function')
          return (
            (t = (function (t) {
              var u = (function (t) {
                  return t
                    ? 1 / 0 ===
                        (t = (function (t) {
                          if ('number' == typeof t) return t
                          if (
                            (function (t) {
                              return (
                                'symbol' == typeof t ||
                                ((function (t) {
                                  return !!t && 'object' == typeof t
                                })(t) &&
                                  '[object Symbol]' == i.call(t))
                              )
                            })(t)
                          )
                            return NaN
                          if (s(t)) {
                            var u = 'function' == typeof t.valueOf ? t.valueOf() : t
                            t = s(u) ? u + '' : u
                          }
                          if ('string' != typeof t) return 0 === t ? t : +t
                          t = t.replace(n, '')
                          var l = o.test(t)
                          return l || r.test(t) ? c(t.slice(2), l ? 2 : 8) : e.test(t) ? NaN : +t
                        })(t)) || t === -1 / 0
                      ? 17976931348623157e292 * (t < 0 ? -1 : 1)
                      : t == t
                      ? t
                      : 0
                    : 0 === t
                    ? t
                    : 0
                })(t),
                l = u % 1
              return u == u ? (l ? u - l : u) : 0
            })(t)),
            function () {
              return --t > 0 && (l = u.apply(this, arguments)), t <= 1 && (u = void 0), l
            }
          )
        })(2, t)
      }
    },
  },
  n = {}
function e(o) {
  var r = n[o]
  if (void 0 !== r) return r.exports
  var c = (n[o] = { exports: {} })
  return t[o](c, c.exports, e), c.exports
}
;(e.n = t => {
  var n = t && t.__esModule ? () => t.default : () => t
  return e.d(n, { a: n }), n
}),
  (e.d = (t, n) => {
    for (var o in n) e.o(n, o) && !e.o(t, o) && Object.defineProperty(t, o, { enumerable: !0, get: n[o] })
  }),
  (e.g = (function () {
    if ('object' == typeof globalThis) return globalThis
    try {
      return this || new Function('return this')()
    } catch (t) {
      if ('object' == typeof window) return window
    }
  })()),
  (e.o = (t, n) => Object.prototype.hasOwnProperty.call(t, n))
var o = {}
;(() => {
  e.d(o, { D: () => i })
  var t = e(296),
    n = e.n(t),
    r = e(917),
    c = e.n(r)
  function i() {
    const t = 20,
      e = ['red', 'green', 'yellow', 'blue'],
      o = document.querySelector('.circle-grid')
    !(function (t, { rows: n, columns: e, colors: o }) {
      for (let r = 0; r < e; r++) {
        const e = document.createElement('div')
        e.classList.add('circles-column'), t.appendChild(e)
        for (let t = 0; t < n; t++) {
          const n = new Set(o)
          if (r >= 2) {
            const e = [z({ row: 19 - t, column: r - 1 }), z({ row: 19 - t, column: r - 2 })]
            if (p(e.map(t => l(t)))) {
              const t = l(e[0])
              n.delete(t)
            }
          }
          if (t >= 2) {
            const t = [e.children[e.children.length - 1], e.children[e.children.length - 2]]
            if (p(t.map(t => l(t)))) {
              const e = l(t[0])
              n.delete(e)
            }
          }
          const c = w(Array.from(n))
          e.appendChild(c)
        }
      }
    })(o, { rows: 20, columns: t, colors: e })
    const r = document.querySelector('.connection-line-canvas')
    ;(r.width = o.clientWidth), (r.height = o.clientHeight)
    const i = r.getContext('2d')
    let d = new Set(),
      y = null,
      v = null,
      b = null,
      g = null,
      x = null
    function S() {
      return null !== b
    }
    function M() {
      !(function () {
        const { x: t, y: n } = L()
        y.style.transform = `translate(${t}px, ${n}px)`
      })(),
        (function () {
          const t = (function () {
            const { x: t, y: n } = g
            if (0 !== t || 0 !== n) {
              const e = Math.abs(t),
                o = Math.abs(n)
              return (function (t, n) {
                const e = C(t)
                return z({ row: e.row + n.row, column: e.column + n.column })
              })(y, { row: o > e ? (n > 0 ? 1 : -1) : 0, column: e > o ? (t > 0 ? 1 : -1) : 0 })
            }
            return null
          })()
          if ((x && t !== x && j(), t)) {
            const n = L(),
              e = -n.x,
              o = -n.y
            t.style.transform = `translate(${e}px, ${o}px)`
          }
          x = t
        })()
    }
    function L() {
      return (function (t) {
        const { x: n, y: e } = t,
          o = Math.abs(n),
          r = Math.abs(e)
        return {
          x: o > r ? Math.sign(n) * Math.min(Math.abs(n), 42) : 0,
          y: r > o ? Math.sign(e) * Math.min(Math.abs(e), 42) : 0,
        }
      })(g)
    }
    function j() {
      x && O(x)
    }
    function A() {
      let t = new Set()
      const n = o.querySelectorAll('.circle')
      for (const e of n) {
        const n = l(e),
          o = C(e),
          r = new Set([
            { row: 0, column: 1 },
            { row: 1, column: 0 },
          ])
        for (const e of r) {
          const r = N(n, o, e)
          r.size >= 3 && (t = h(t, r))
        }
      }
      E(t)
    }
    function O(t) {
      t.style.transform = null
    }
    function E(r) {
      if (r.size >= 1) {
        let i = new Set()
        for (const t of r) t.classList.add('circle--hidden')
        const s = (function (n) {
            const e = new Array(t)
            for (let t = 0; t < e.length; t++) e[t] = new Set()
            for (const t of n) {
              const { column: n } = C(t)
              e[n].add(t)
            }
            return e
          })(r),
          u = 42 * Math.max(...Array.from(s).map(t => t.size))
        o.style.top = -u + 'px'
        const l = new Array(t)
        for (let t = 0; t < s.length; t++) {
          const n = s[t]
          if (n.size >= 1) {
            const r = $(t, n)
            i = h(i, r)
            const c = o.children[t],
              s = n.size
            for (let t = 1; t <= s; t++) {
              const t = w(e)
              c.appendChild(t), r.add(t), i.add(t)
            }
            l[t] = r
          } else l[t] = new Set()
        }
        requestAnimationFrame(() => {
          for (const t of i) t.classList.add('circle--falling')
          requestAnimationFrame(() => {
            const e = n()(
              c()(function t() {
                ;(o.style.top = '0px'), o.removeEventListener('transitionend', t)
                for (const t of r) t.remove()
                for (const t of i) t.classList.remove('circle--falling'), (t.style.top = null)
                requestAnimationFrame(A)
              })
            )
            o.addEventListener('transitionend', e)
            for (let n = 0; n < t; n++) {
              const t = l[n]
              for (const e of t) {
                const t = C(e).row,
                  o = s[n],
                  r = 42 * Array.from(o).filter(n => C(n).row > t).length
                e.style.top = `${r}px`
              }
            }
          })
        })
      }
    }
    function $(t, n) {
      const e = new Set()
      let o = Math.max(...Array.from(n).map(t => C(t).row)),
        r = 0
      for (; r < o; ) {
        const o = z({ row: r, column: t })
        o && !n.has(o) && e.add(o), r++
      }
      return e
    }
    function T(t) {
      const n = t.parentElement
      t.remove()
      const o = w(e)
      n.appendChild(o)
    }
    function z(n) {
      const { row: e, column: r } = n
      if (e >= 0 && e < 20 && r >= 0 && r < t) {
        const t = o.querySelectorAll('.circles-column')[r].children
        return t[t.length - 1 - e]
      }
      return null
    }
    function q(n, e, o) {
      const r = new Set()
      let c = u(e, o)
      for (; c.row < 20 && c.column < t; ) {
        const t = z(c)
        if (!t) break
        if (l(t) !== n) break
        r.add(t), (c = u(c, o))
      }
      return r
    }
    function N(n, e, o) {
      const r = new Set()
      let c = e
      for (; c.row < 20 && c.column < t; ) {
        const t = z(c)
        if (!t) break
        if (l(t) !== n) break
        r.add(t), (c = u(c, o))
      }
      return r
    }
    function C(t) {
      const n = t.parentElement,
        e = Array.from(o.children).indexOf(n),
        r = Array.from(n.children)
      return { row: r.length - 1 - r.indexOf(t), column: e }
    }
    o.addEventListener('pointerdown', function (t) {
      const n = t.target
      if (n.classList.contains('circle')) {
        t.preventDefault()
        const e = n
        d.add(e), (y = e), (v = l(y)), (b = e), (g = { x: 0, y: 0 }), y.classList.add('circle--dragged'), M()
      }
    }),
      o.addEventListener('pointermove', function (t) {
        if (S()) {
          const n = t.target
          if (n.classList.contains('circle')) {
            const t = n
            l(t) === v &&
              (!d.has(t) || (d.size >= 3 && t === y)) &&
              s(t, b) &&
              ((function (t, n) {
                i.beginPath()
                const { x: e, y: o } = m(t)
                i.moveTo(e, o)
                const { x: r, y: c } = m(n)
                i.lineTo(r, c), i.stroke()
              })(t, b),
              d.add(t),
              (b = t))
          }
          ;(g = { x: g.x + t.movementX, y: g.y + t.movementY }), M()
        }
      }),
      window.addEventListener('pointerup', function () {
        if (S()) {
          if (d.size >= 2)
            if (a(d, t)) {
              const t = o.querySelectorAll('.circle')
              for (const n of t) l(n) === v && T(n)
            } else d.forEach(T)
          if (x) {
            const { x: t, y: n } = L()
            if (Math.abs(t + n) > 21) {
              !(function (t, n) {
                const e = f(t),
                  o = f(n)
                t.classList.remove(e), n.classList.remove(o), t.classList.add(o), n.classList.add(e)
              })(y, x)
              let t = new Set()
              for (const n of new Set([y, x])) {
                let e = new Set()
                const o = l(n),
                  r = C(n),
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
                  for (const e of t) n = h(n, q(o, r, e))
                  n.size >= 2 && (e = h(e, n))
                }
                e.size >= 1 && e.add(n), (t = h(t, e))
              }
              E(t)
            }
          }
          y.classList.remove('circle--dragged'),
            O(y),
            j(),
            (d = new Set()),
            (y = null),
            (v = null),
            (b = null),
            (g = null),
            (x = null),
            i.clearRect(0, 0, r.width, r.height)
        }
      }),
      (window.removeConnectedCircles = A)
  }
  function s(t, n) {
    const e = determinePosition(t),
      o = determinePosition(n),
      r = Math.abs(e.row - o.row),
      c = Math.abs(e.column - o.column)
    return (0 === r && 1 === c) || (0 === c && 1 === r)
  }
  function u(t, n) {
    return { row: t.row + n.row, column: t.column + n.column }
  }
  function l(t) {
    return f(t).split('--')[1]
  }
  function f(t) {
    return Array.from(t.classList).find(t => t.includes('--'))
  }
  function a(t, n) {
    if (4 === t.size) {
      const e = Array.from(t).map(determinePosition)
      return (
        e.sort((t, e) => d(t, n) - d(e, n)),
        e[0].row === e[1].row &&
          e[0].column === e[1].column - 1 &&
          e[2].row === e[3].row &&
          e[2].column === e[3].column - 1 &&
          e[0].row === e[2].row - 1
      )
    }
    return !1
  }
  function d(t, n) {
    return t.row * n + t.column
  }
  function m(t) {
    return { x: t.offsetLeft + 0.5 * t.clientWidth, y: t.offsetTop + 0.5 * t.clientHeight }
  }
  function p(t) {
    return 1 === new Set(t).size
  }
  function w(t) {
    const n = (function (t) {
        return (n = t)[
          ((e = 0),
          (o = n.length - 1),
          (e = Math.floor(e)),
          (o = Math.floor(o)),
          e + Math.floor(Math.random() * (o - e + 1)))
        ]
        var n, e, o
      })(t),
      e = (function ({ color: t }) {
        const n = document.createElement('div')
        return n.classList.add('circle'), n.classList.add(`circle--${t}`), n
      })({ color: n })
    return e
  }
  function h(...t) {
    const n = new Set()
    for (const e of t) for (const t of e) n.add(t)
    return n
  }
})()
var r = o.D
export { r as main }
//# sourceMappingURL=index.js.map
