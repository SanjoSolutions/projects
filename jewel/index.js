var t = {
    296: (t, n, e) => {
      var o = /^\s+|\s+$/g,
        r = /^[-+]0x[0-9a-f]+$/i,
        c = /^0b[01]+$/i,
        i = /^0o[0-7]+$/i,
        s = parseInt,
        a = 'object' == typeof e.g && e.g && e.g.Object === Object && e.g,
        l = 'object' == typeof self && self && self.Object === Object && self,
        u = a || l || Function('return this')(),
        f = Object.prototype.toString,
        d = Math.max,
        m = Math.min,
        h = function () {
          return u.Date.now()
        }
      function y(t) {
        var n = typeof t
        return !!t && ('object' == n || 'function' == n)
      }
      function p(t) {
        if ('number' == typeof t) return t
        if (
          (function (t) {
            return (
              'symbol' == typeof t ||
              ((function (t) {
                return !!t && 'object' == typeof t
              })(t) &&
                '[object Symbol]' == f.call(t))
            )
          })(t)
        )
          return NaN
        if (y(t)) {
          var n = 'function' == typeof t.valueOf ? t.valueOf() : t
          t = y(n) ? n + '' : n
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
          a,
          l = 0,
          u = !1,
          f = !1,
          w = !0
        if ('function' != typeof t) throw new TypeError('Expected a function')
        function v(n) {
          var e = o,
            c = r
          return (o = r = void 0), (l = n), (i = t.apply(c, e))
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
            })(t)
          )
        }
        function S(t) {
          return (s = void 0), w && o ? v(t) : ((o = r = void 0), i)
        }
        function M() {
          var t = h(),
            e = g(t)
          if (((o = arguments), (r = this), (a = t), e)) {
            if (void 0 === s) return b(a)
            if (f) return (s = setTimeout(x, n)), v(a)
          }
          return void 0 === s && (s = setTimeout(x, n)), i
        }
        return (
          (n = p(n) || 0),
          y(e) &&
            ((u = !!e.leading),
            (c = (f = 'maxWait' in e) ? d(p(e.maxWait) || 0, n) : c),
            (w = 'trailing' in e ? !!e.trailing : w)),
          (M.cancel = function () {
            void 0 !== s && clearTimeout(s), (l = 0), (o = a = r = s = void 0)
          }),
          (M.flush = function () {
            return void 0 === s ? i : S(h())
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
        return (function (t, a) {
          var l
          if ('function' != typeof a) throw new TypeError('Expected a function')
          return (
            (t = (function (t) {
              var a = (function (t) {
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
                            var a = 'function' == typeof t.valueOf ? t.valueOf() : t
                            t = s(a) ? a + '' : a
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
                l = a % 1
              return a == a ? (l ? a - l : a) : 0
            })(t)),
            function () {
              return --t > 0 && (l = a.apply(this, arguments)), t <= 1 && (a = void 0), l
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
  e.d(o, { D: () => u })
  var t = e(296),
    n = e.n(t),
    r = e(917),
    c = e.n(r)
  new Map()
  const i = 'Failed to retrieve value.'
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
        n
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
      for (const o of t) {
        if (!(e instanceof Map && e.has(o))) return n()
        e = e.get(o)
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
      return n.sort(), n.map(n => t[n])
    }
  }
  function l(...t) {
    const n = new Set()
    for (const e of t) for (const t of e) n.add(t)
    return n
  }
  function u() {
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
            const e = [K({ row: 19 - t, column: r - 1 }), K({ row: 19 - t, column: r - 2 })]
            if (v(e.map(t => m(t)))) {
              const t = m(e[0])
              n.delete(t)
            }
          }
          if (t >= 2) {
            const t = [e.children[e.children.length - 1], e.children[e.children.length - 2]]
            if (v(t.map(t => m(t)))) {
              const e = m(t[0])
              n.delete(e)
            }
          }
          const c = b(Array.from(n))
          e.appendChild(c)
        }
      }
    })(o, { rows: 20, columns: t, colors: e })
    const r = document.querySelector('.connection-line-canvas')
    ;(r.width = o.clientWidth), (r.height = o.clientHeight)
    const i = r.getContext('2d')
    let s = new Set(),
      a = null,
      u = null,
      p = null,
      g = null,
      x = null,
      S = !1
    function M() {
      ;(S = !0), document.body.classList.add('swapping-enabled')
    }
    function A() {
      return null !== p
    }
    function _() {
      !(function () {
        const { x: t, y: n } = L()
        a.style.transform = `translate(${t}px, ${n}px)`
      })(),
        (function () {
          const t = (function () {
            const { x: t, y: n } = g
            if (0 !== t || 0 !== n) {
              const e = Math.abs(t),
                o = Math.abs(n)
              return (function (t, n) {
                const e = k(t)
                return K({ row: e.row + n.row, column: e.column + n.column })
              })(a, { row: o > e ? (n > 0 ? 1 : -1) : 0, column: e > o ? (t > 0 ? 1 : -1) : 0 })
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
    function T() {
      let t = new Set()
      const n = o.querySelectorAll('.circle')
      for (const e of n) {
        const n = m(e),
          o = k(e),
          r = new Set([
            { row: 0, column: 1 },
            { row: 1, column: 0 },
          ])
        for (const e of r) {
          const r = N(n, o, e)
          r.size >= 3 && (t = l(t, r))
        }
      }
      E(t)
    }
    function O(t) {
      t.style.transform = null
    }
    function E(r) {
      if (r.size >= 1) {
        ;(S = !1), document.body.classList.remove('swapping-enabled')
        let i = new Set()
        for (const t of r) t.classList.add('circle--hidden')
        const s = (function (n) {
            const e = new Array(t)
            for (let t = 0; t < e.length; t++) e[t] = new Set()
            for (const t of n) {
              const { column: n } = k(t)
              e[n].add(t)
            }
            return e
          })(r),
          a = 42 * Math.max(...Array.from(s).map(t => t.size))
        o.style.top = -a + 'px'
        const u = new Array(t)
        for (let t = 0; t < s.length; t++) {
          const n = s[t]
          if (n.size >= 1) {
            const r = $(t, n)
            i = l(i, r)
            const c = o.children[t],
              s = n.size
            for (let t = 1; t <= s; t++) {
              const t = b(e)
              c.appendChild(t), r.add(t), i.add(t)
            }
            u[t] = r
          } else u[t] = new Set()
        }
        requestAnimationFrame(() => {
          for (const t of i) t.classList.add('circle--falling')
          requestAnimationFrame(() => {
            const e = n()(
              c()(function t() {
                ;(o.style.top = '0px'), o.removeEventListener('transitionend', t)
                for (const t of r) t.remove()
                for (const t of i) t.classList.remove('circle--falling'), (t.style.top = null)
                requestAnimationFrame(T)
              })
            )
            o.addEventListener('transitionend', e)
            for (let n = 0; n < t; n++) {
              const t = u[n]
              for (const e of t) {
                const t = k(e).row,
                  o = s[n],
                  r = 42 * Array.from(o).filter(n => k(n).row > t).length
                e.style.top = `${r}px`
              }
            }
          })
        })
      } else M()
    }
    function $(t, n) {
      const e = new Set()
      let o = Math.max(...Array.from(n).map(t => k(t).row)),
        r = 0
      for (; r < o; ) {
        const o = K({ row: r, column: t })
        o && !n.has(o) && e.add(o), r++
      }
      return e
    }
    function z(t) {
      const n = t.parentElement
      t.remove()
      const o = b(e)
      n.appendChild(o)
    }
    function K(n) {
      const { row: e, column: r } = n
      if (e >= 0 && e < 20 && r >= 0 && r < t) {
        const t = o.querySelectorAll('.circles-column')[r].children
        return t[t.length - 1 - e]
      }
      return null
    }
    function q(n, e, o) {
      const r = new Set()
      let c = d(e, o)
      for (; c.row < 20 && c.column < t; ) {
        const t = K(c)
        if (!t) break
        if (m(t) !== n) break
        r.add(t), (c = d(c, o))
      }
      return r
    }
    function N(n, e, o) {
      const r = new Set()
      let c = e
      for (; c.row < 20 && c.column < t; ) {
        const t = K(c)
        if (!t) break
        if (m(t) !== n) break
        r.add(t), (c = d(c, o))
      }
      return r
    }
    function k(t) {
      const n = t.parentElement,
        e = Array.from(o.children).indexOf(n),
        r = Array.from(n.children)
      return { row: r.length - 1 - r.indexOf(t), column: e }
    }
    M(),
      o.addEventListener('pointerdown', function (t) {
        if (S) {
          const n = t.target
          if (n.classList.contains('circle')) {
            t.preventDefault()
            const e = n
            s.add(e), (a = e), (u = m(a)), (p = e), (g = { x: 0, y: 0 }), a.classList.add('circle--dragged'), _()
          }
        }
      }),
      o.addEventListener('pointermove', function (t) {
        if (A()) {
          const n = t.target
          if (n.classList.contains('circle')) {
            const t = n
            m(t) === u &&
              (!s.has(t) || (s.size >= 3 && t === a)) &&
              f(t, p) &&
              ((function (t, n) {
                i.beginPath()
                const { x: e, y: o } = w(t)
                i.moveTo(e, o)
                const { x: r, y: c } = w(n)
                i.lineTo(r, c), i.stroke()
              })(t, p),
              s.add(t),
              (p = t))
          }
          ;(g = { x: g.x + t.movementX, y: g.y + t.movementY }), _()
        }
      }),
      window.addEventListener('pointerup', function () {
        if (A()) {
          if (s.size >= 2)
            if (y(s, t)) {
              const t = o.querySelectorAll('.circle')
              for (const n of t) m(n) === u && z(n)
            } else s.forEach(z)
          if (x) {
            const { x: t, y: n } = L()
            if (Math.abs(t + n) > 21) {
              !(function (t, n) {
                const e = h(t),
                  o = h(n)
                t.classList.remove(e), n.classList.remove(o), t.classList.add(o), n.classList.add(e)
              })(a, x)
              let t = new Set()
              for (const n of new Set([a, x])) {
                let e = new Set()
                const o = m(n),
                  r = k(n),
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
                  for (const e of t) n = l(n, q(o, r, e))
                  n.size >= 2 && (e = l(e, n))
                }
                e.size >= 1 && e.add(n), (t = l(t, e))
              }
              E(t)
            }
          }
          a.classList.remove('circle--dragged'),
            O(a),
            j(),
            (s = new Set()),
            (a = null),
            (u = null),
            (p = null),
            (g = null),
            (x = null),
            i.clearRect(0, 0, r.width, r.height)
        }
      })
  }
  function f(t, n) {
    const e = determinePosition(t),
      o = determinePosition(n),
      r = Math.abs(e.row - o.row),
      c = Math.abs(e.column - o.column)
    return (0 === r && 1 === c) || (0 === c && 1 === r)
  }
  function d(t, n) {
    return { row: t.row + n.row, column: t.column + n.column }
  }
  function m(t) {
    return h(t).split('--')[1]
  }
  function h(t) {
    return Array.from(t.classList).find(t => t.includes('--'))
  }
  function y(t, n) {
    if (4 === t.size) {
      const e = Array.from(t).map(determinePosition)
      return (
        e.sort((t, e) => p(t, n) - p(e, n)),
        e[0].row === e[1].row &&
          e[0].column === e[1].column - 1 &&
          e[2].row === e[3].row &&
          e[2].column === e[3].column - 1 &&
          e[0].row === e[2].row - 1
      )
    }
    return !1
  }
  function p(t, n) {
    return t.row * n + t.column
  }
  function w(t) {
    return { x: t.offsetLeft + 0.5 * t.clientWidth, y: t.offsetTop + 0.5 * t.clientHeight }
  }
  function v(t) {
    return 1 === new Set(t).size
  }
  function b(t) {
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
  new a(), new a()
})()
var r = o.D
export { r as main }
//# sourceMappingURL=index.js.map
