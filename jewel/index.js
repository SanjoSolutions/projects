var n = {
    296: (n, t, e) => {
      var o = /^\s+|\s+$/g,
        r = /^[-+]0x[0-9a-f]+$/i,
        c = /^0b[01]+$/i,
        i = /^0o[0-7]+$/i,
        s = parseInt,
        l = 'object' == typeof e.g && e.g && e.g.Object === Object && e.g,
        u = 'object' == typeof self && self && self.Object === Object && self,
        f = l || u || Function('return this')(),
        a = Object.prototype.toString,
        d = Math.max,
        m = Math.min,
        p = function () {
          return f.Date.now()
        }
      function w(n) {
        var t = typeof n
        return !!n && ('object' == t || 'function' == t)
      }
      function y(n) {
        if ('number' == typeof n) return n
        if (
          (function (n) {
            return (
              'symbol' == typeof n ||
              ((function (n) {
                return !!n && 'object' == typeof n
              })(n) &&
                '[object Symbol]' == a.call(n))
            )
          })(n)
        )
          return NaN
        if (w(n)) {
          var t = 'function' == typeof n.valueOf ? n.valueOf() : n
          n = w(t) ? t + '' : t
        }
        if ('string' != typeof n) return 0 === n ? n : +n
        n = n.replace(o, '')
        var e = c.test(n)
        return e || i.test(n) ? s(n.slice(2), e ? 2 : 8) : r.test(n) ? NaN : +n
      }
      n.exports = function (n, t, e) {
        var o,
          r,
          c,
          i,
          s,
          l,
          u = 0,
          f = !1,
          a = !1,
          h = !0
        if ('function' != typeof n) throw new TypeError('Expected a function')
        function v(t) {
          var e = o,
            c = r
          return (o = r = void 0), (u = t), (i = n.apply(c, e))
        }
        function b(n) {
          return (u = n), (s = setTimeout(x, t)), f ? v(n) : i
        }
        function g(n) {
          var e = n - l
          return void 0 === l || e >= t || e < 0 || (a && n - u >= c)
        }
        function x() {
          var n = p()
          if (g(n)) return S(n)
          s = setTimeout(
            x,
            (function (n) {
              var e = t - (n - l)
              return a ? m(e, c - (n - u)) : e
            })(n)
          )
        }
        function S(n) {
          return (s = void 0), h && o ? v(n) : ((o = r = void 0), i)
        }
        function L() {
          var n = p(),
            e = g(n)
          if (((o = arguments), (r = this), (l = n), e)) {
            if (void 0 === s) return b(l)
            if (a) return (s = setTimeout(x, t)), v(l)
          }
          return void 0 === s && (s = setTimeout(x, t)), i
        }
        return (
          (t = y(t) || 0),
          w(e) &&
            ((f = !!e.leading),
            (c = (a = 'maxWait' in e) ? d(y(e.maxWait) || 0, t) : c),
            (h = 'trailing' in e ? !!e.trailing : h)),
          (L.cancel = function () {
            void 0 !== s && clearTimeout(s), (u = 0), (o = l = r = s = void 0)
          }),
          (L.flush = function () {
            return void 0 === s ? i : S(p())
          }),
          L
        )
      }
    },
    917: n => {
      var t = /^\s+|\s+$/g,
        e = /^[-+]0x[0-9a-f]+$/i,
        o = /^0b[01]+$/i,
        r = /^0o[0-7]+$/i,
        c = parseInt,
        i = Object.prototype.toString
      function s(n) {
        var t = typeof n
        return !!n && ('object' == t || 'function' == t)
      }
      n.exports = function (n) {
        return (function (n, l) {
          var u
          if ('function' != typeof l) throw new TypeError('Expected a function')
          return (
            (n = (function (n) {
              var l = (function (n) {
                  return n
                    ? 1 / 0 ===
                        (n = (function (n) {
                          if ('number' == typeof n) return n
                          if (
                            (function (n) {
                              return (
                                'symbol' == typeof n ||
                                ((function (n) {
                                  return !!n && 'object' == typeof n
                                })(n) &&
                                  '[object Symbol]' == i.call(n))
                              )
                            })(n)
                          )
                            return NaN
                          if (s(n)) {
                            var l = 'function' == typeof n.valueOf ? n.valueOf() : n
                            n = s(l) ? l + '' : l
                          }
                          if ('string' != typeof n) return 0 === n ? n : +n
                          n = n.replace(t, '')
                          var u = o.test(n)
                          return u || r.test(n) ? c(n.slice(2), u ? 2 : 8) : e.test(n) ? NaN : +n
                        })(n)) || n === -1 / 0
                      ? 17976931348623157e292 * (n < 0 ? -1 : 1)
                      : n == n
                      ? n
                      : 0
                    : 0 === n
                    ? n
                    : 0
                })(n),
                u = l % 1
              return l == l ? (u ? l - u : l) : 0
            })(n)),
            function () {
              return --n > 0 && (u = l.apply(this, arguments)), n <= 1 && (l = void 0), u
            }
          )
        })(2, n)
      }
    },
  },
  t = {}
function e(o) {
  var r = t[o]
  if (void 0 !== r) return r.exports
  var c = (t[o] = { exports: {} })
  return n[o](c, c.exports, e), c.exports
}
;(e.n = n => {
  var t = n && n.__esModule ? () => n.default : () => n
  return e.d(t, { a: t }), t
}),
  (e.d = (n, t) => {
    for (var o in t) e.o(t, o) && !e.o(n, o) && Object.defineProperty(n, o, { enumerable: !0, get: t[o] })
  }),
  (e.g = (function () {
    if ('object' == typeof globalThis) return globalThis
    try {
      return this || new Function('return this')()
    } catch (n) {
      if ('object' == typeof window) return window
    }
  })()),
  (e.o = (n, t) => Object.prototype.hasOwnProperty.call(n, t))
var o = {}
;(() => {
  e.d(o, { D: () => i })
  var n = e(296),
    t = e.n(n),
    r = e(917),
    c = e.n(r)
  function i() {
    const n = 20,
      e = ['red', 'green', 'yellow', 'blue'],
      o = document.querySelector('.circle-grid')
    !(function (n, { rows: t, columns: e, colors: o }) {
      for (let r = 0; r < e; r++) {
        const e = document.createElement('div')
        e.classList.add('circles-column'), n.appendChild(e)
        for (let n = 0; n < t; n++) {
          const t = new Set(o)
          if (r >= 2) {
            const e = [N({ row: 19 - n, column: r - 1 }), N({ row: 19 - n, column: r - 2 })]
            if (p(e.map(n => u(n)))) {
              const n = u(e[0])
              t.delete(n)
            }
          }
          if (n >= 2) {
            const n = [e.children[e.children.length - 1], e.children[e.children.length - 2]]
            if (p(n.map(n => u(n)))) {
              const e = u(n[0])
              t.delete(e)
            }
          }
          const c = w(Array.from(t))
          e.appendChild(c)
        }
      }
    })(o, { rows: 20, columns: n, colors: e })
    const r = document.querySelector('.connection-line-canvas')
    ;(r.width = o.clientWidth), (r.height = o.clientHeight)
    const i = r.getContext('2d')
    let d = new Set(),
      h = null,
      v = null,
      b = null,
      g = null,
      x = null,
      S = !1
    function L() {
      ;(S = !0), document.body.classList.add('swapping-enabled')
    }
    function M() {
      return null !== b
    }
    function j() {
      !(function () {
        const { x: n, y: t } = A()
        h.style.transform = `translate(${n}px, ${t}px)`
      })(),
        (function () {
          const n = (function () {
            const { x: n, y: t } = g
            if (0 !== n || 0 !== t) {
              const e = Math.abs(n),
                o = Math.abs(t)
              return (function (n, t) {
                const e = k(n)
                return N({ row: e.row + t.row, column: e.column + t.column })
              })(h, { row: o > e ? (t > 0 ? 1 : -1) : 0, column: e > o ? (n > 0 ? 1 : -1) : 0 })
            }
            return null
          })()
          if ((x && n !== x && O(), n)) {
            const t = A(),
              e = -t.x,
              o = -t.y
            n.style.transform = `translate(${e}px, ${o}px)`
          }
          x = n
        })()
    }
    function A() {
      return (function (n) {
        const { x: t, y: e } = n,
          o = Math.abs(t),
          r = Math.abs(e)
        return {
          x: o > r ? Math.sign(t) * Math.min(Math.abs(t), 42) : 0,
          y: r > o ? Math.sign(e) * Math.min(Math.abs(e), 42) : 0,
        }
      })(g)
    }
    function O() {
      x && $(x)
    }
    function E() {
      let n = new Set()
      const t = o.querySelectorAll('.circle')
      for (const e of t) {
        const t = u(e),
          o = k(e),
          r = new Set([
            { row: 0, column: 1 },
            { row: 1, column: 0 },
          ])
        for (const e of r) {
          const r = P(t, o, e)
          r.size >= 3 && (n = y(n, r))
        }
      }
      T(n)
    }
    function $(n) {
      n.style.transform = null
    }
    function T(r) {
      if (r.size >= 1) {
        ;(S = !1), document.body.classList.remove('swapping-enabled')
        let i = new Set()
        for (const n of r) n.classList.add('circle--hidden')
        const s = (function (t) {
            const e = new Array(n)
            for (let n = 0; n < e.length; n++) e[n] = new Set()
            for (const n of t) {
              const { column: t } = k(n)
              e[t].add(n)
            }
            return e
          })(r),
          l = 42 * Math.max(...Array.from(s).map(n => n.size))
        o.style.top = -l + 'px'
        const u = new Array(n)
        for (let n = 0; n < s.length; n++) {
          const t = s[n]
          if (t.size >= 1) {
            const r = z(n, t)
            i = y(i, r)
            const c = o.children[n],
              s = t.size
            for (let n = 1; n <= s; n++) {
              const n = w(e)
              c.appendChild(n), r.add(n), i.add(n)
            }
            u[n] = r
          } else u[n] = new Set()
        }
        requestAnimationFrame(() => {
          for (const n of i) n.classList.add('circle--falling')
          requestAnimationFrame(() => {
            const e = t()(
              c()(function n() {
                ;(o.style.top = '0px'), o.removeEventListener('transitionend', n)
                for (const n of r) n.remove()
                for (const n of i) n.classList.remove('circle--falling'), (n.style.top = null)
                requestAnimationFrame(E)
              })
            )
            o.addEventListener('transitionend', e)
            for (let t = 0; t < n; t++) {
              const n = u[t]
              for (const e of n) {
                const n = k(e).row,
                  o = s[t],
                  r = 42 * Array.from(o).filter(t => k(t).row > n).length
                e.style.top = `${r}px`
              }
            }
          })
        })
      } else L()
    }
    function z(n, t) {
      const e = new Set()
      let o = Math.max(...Array.from(t).map(n => k(n).row)),
        r = 0
      for (; r < o; ) {
        const o = N({ row: r, column: n })
        o && !t.has(o) && e.add(o), r++
      }
      return e
    }
    function q(n) {
      const t = n.parentElement
      n.remove()
      const o = w(e)
      t.appendChild(o)
    }
    function N(t) {
      const { row: e, column: r } = t
      if (e >= 0 && e < 20 && r >= 0 && r < n) {
        const n = o.querySelectorAll('.circles-column')[r].children
        return n[n.length - 1 - e]
      }
      return null
    }
    function C(t, e, o) {
      const r = new Set()
      let c = l(e, o)
      for (; c.row < 20 && c.column < n; ) {
        const n = N(c)
        if (!n) break
        if (u(n) !== t) break
        r.add(n), (c = l(c, o))
      }
      return r
    }
    function P(t, e, o) {
      const r = new Set()
      let c = e
      for (; c.row < 20 && c.column < n; ) {
        const n = N(c)
        if (!n) break
        if (u(n) !== t) break
        r.add(n), (c = l(c, o))
      }
      return r
    }
    function k(n) {
      const t = n.parentElement,
        e = Array.from(o.children).indexOf(t),
        r = Array.from(t.children)
      return { row: r.length - 1 - r.indexOf(n), column: e }
    }
    L(),
      o.addEventListener('pointerdown', function (n) {
        if (S) {
          const t = n.target
          if (t.classList.contains('circle')) {
            n.preventDefault()
            const e = t
            d.add(e), (h = e), (v = u(h)), (b = e), (g = { x: 0, y: 0 }), h.classList.add('circle--dragged'), j()
          }
        }
      }),
      o.addEventListener('pointermove', function (n) {
        if (M()) {
          const t = n.target
          if (t.classList.contains('circle')) {
            const n = t
            u(n) === v &&
              (!d.has(n) || (d.size >= 3 && n === h)) &&
              s(n, b) &&
              ((function (n, t) {
                i.beginPath()
                const { x: e, y: o } = m(n)
                i.moveTo(e, o)
                const { x: r, y: c } = m(t)
                i.lineTo(r, c), i.stroke()
              })(n, b),
              d.add(n),
              (b = n))
          }
          ;(g = { x: g.x + n.movementX, y: g.y + n.movementY }), j()
        }
      }),
      window.addEventListener('pointerup', function () {
        if (M()) {
          if (d.size >= 2)
            if (a(d, n)) {
              const n = o.querySelectorAll('.circle')
              for (const t of n) u(t) === v && q(t)
            } else d.forEach(q)
          if (x) {
            const { x: n, y: t } = A()
            if (Math.abs(n + t) > 21) {
              !(function (n, t) {
                const e = f(n),
                  o = f(t)
                n.classList.remove(e), t.classList.remove(o), n.classList.add(o), t.classList.add(e)
              })(h, x)
              let n = new Set()
              for (const t of new Set([h, x])) {
                let e = new Set()
                const o = u(t),
                  r = k(t),
                  c = new Set([
                    { row: 0, column: -1 },
                    { row: 0, column: 1 },
                  ]),
                  i = new Set([
                    { row: -1, column: 0 },
                    { row: 1, column: 0 },
                  ]),
                  s = new Set([c, i])
                for (const n of s) {
                  let t = new Set()
                  for (const e of n) t = y(t, C(o, r, e))
                  t.size >= 2 && (e = y(e, t))
                }
                e.size >= 1 && e.add(t), (n = y(n, e))
              }
              T(n)
            }
          }
          h.classList.remove('circle--dragged'),
            $(h),
            O(),
            (d = new Set()),
            (h = null),
            (v = null),
            (b = null),
            (g = null),
            (x = null),
            i.clearRect(0, 0, r.width, r.height)
        }
      }),
      (window.removeConnectedCircles = E)
  }
  function s(n, t) {
    const e = determinePosition(n),
      o = determinePosition(t),
      r = Math.abs(e.row - o.row),
      c = Math.abs(e.column - o.column)
    return (0 === r && 1 === c) || (0 === c && 1 === r)
  }
  function l(n, t) {
    return { row: n.row + t.row, column: n.column + t.column }
  }
  function u(n) {
    return f(n).split('--')[1]
  }
  function f(n) {
    return Array.from(n.classList).find(n => n.includes('--'))
  }
  function a(n, t) {
    if (4 === n.size) {
      const e = Array.from(n).map(determinePosition)
      return (
        e.sort((n, e) => d(n, t) - d(e, t)),
        e[0].row === e[1].row &&
          e[0].column === e[1].column - 1 &&
          e[2].row === e[3].row &&
          e[2].column === e[3].column - 1 &&
          e[0].row === e[2].row - 1
      )
    }
    return !1
  }
  function d(n, t) {
    return n.row * t + n.column
  }
  function m(n) {
    return { x: n.offsetLeft + 0.5 * n.clientWidth, y: n.offsetTop + 0.5 * n.clientHeight }
  }
  function p(n) {
    return 1 === new Set(n).size
  }
  function w(n) {
    const t = (function (n) {
        return (t = n)[
          ((e = 0),
          (o = t.length - 1),
          (e = Math.floor(e)),
          (o = Math.floor(o)),
          e + Math.floor(Math.random() * (o - e + 1)))
        ]
        var t, e, o
      })(n),
      e = (function ({ color: n }) {
        const t = document.createElement('div')
        return t.classList.add('circle'), t.classList.add(`circle--${n}`), t
      })({ color: t })
    return e
  }
  function y(...n) {
    const t = new Set()
    for (const e of n) for (const n of e) t.add(n)
    return t
  }
})()
var r = o.D
export { r as main }
//# sourceMappingURL=index.js.map
