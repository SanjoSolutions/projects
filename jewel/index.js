var n = {
    296: (n, t, o) => {
      var e = /^\s+|\s+$/g,
        r = /^[-+]0x[0-9a-f]+$/i,
        c = /^0b[01]+$/i,
        i = /^0o[0-7]+$/i,
        s = parseInt,
        l = 'object' == typeof o.g && o.g && o.g.Object === Object && o.g,
        u = 'object' == typeof self && self && self.Object === Object && self,
        f = l || u || Function('return this')(),
        a = Object.prototype.toString,
        d = Math.max,
        m = Math.min,
        p = function () {
          return f.Date.now()
        }
      function h(n) {
        var t = typeof n
        return !!n && ('object' == t || 'function' == t)
      }
      function w(n) {
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
        if (h(n)) {
          var t = 'function' == typeof n.valueOf ? n.valueOf() : n
          n = h(t) ? t + '' : t
        }
        if ('string' != typeof n) return 0 === n ? n : +n
        n = n.replace(e, '')
        var o = c.test(n)
        return o || i.test(n) ? s(n.slice(2), o ? 2 : 8) : r.test(n) ? NaN : +n
      }
      n.exports = function (n, t, o) {
        var e,
          r,
          c,
          i,
          s,
          l,
          u = 0,
          f = !1,
          a = !1,
          v = !0
        if ('function' != typeof n) throw new TypeError('Expected a function')
        function y(t) {
          var o = e,
            c = r
          return (e = r = void 0), (u = t), (i = n.apply(c, o))
        }
        function g(n) {
          return (u = n), (s = setTimeout(x, t)), f ? y(n) : i
        }
        function b(n) {
          var o = n - l
          return void 0 === l || o >= t || o < 0 || (a && n - u >= c)
        }
        function x() {
          var n = p()
          if (b(n)) return L(n)
          s = setTimeout(
            x,
            (function (n) {
              var o = t - (n - l)
              return a ? m(o, c - (n - u)) : o
            })(n)
          )
        }
        function L(n) {
          return (s = void 0), v && e ? y(n) : ((e = r = void 0), i)
        }
        function M() {
          var n = p(),
            o = b(n)
          if (((e = arguments), (r = this), (l = n), o)) {
            if (void 0 === s) return g(l)
            if (a) return (s = setTimeout(x, t)), y(l)
          }
          return void 0 === s && (s = setTimeout(x, t)), i
        }
        return (
          (t = w(t) || 0),
          h(o) &&
            ((f = !!o.leading),
            (c = (a = 'maxWait' in o) ? d(w(o.maxWait) || 0, t) : c),
            (v = 'trailing' in o ? !!o.trailing : v)),
          (M.cancel = function () {
            void 0 !== s && clearTimeout(s), (u = 0), (e = l = r = s = void 0)
          }),
          (M.flush = function () {
            return void 0 === s ? i : L(p())
          }),
          M
        )
      }
    },
  },
  t = {}
function o(e) {
  var r = t[e]
  if (void 0 !== r) return r.exports
  var c = (t[e] = { exports: {} })
  return n[e](c, c.exports, o), c.exports
}
;(o.n = n => {
  var t = n && n.__esModule ? () => n.default : () => n
  return o.d(t, { a: t }), t
}),
  (o.d = (n, t) => {
    for (var e in t) o.o(t, e) && !o.o(n, e) && Object.defineProperty(n, e, { enumerable: !0, get: t[e] })
  }),
  (o.g = (function () {
    if ('object' == typeof globalThis) return globalThis
    try {
      return this || new Function('return this')()
    } catch (n) {
      if ('object' == typeof window) return window
    }
  })()),
  (o.o = (n, t) => Object.prototype.hasOwnProperty.call(n, t))
var e = {}
;(() => {
  o.d(e, { D: () => r })
  var n = o(296),
    t = o.n(n)
  function r() {
    const n = ['red', 'green', 'yellow', 'blue'],
      o = document.querySelector('.circle-grid')
    !(function (n, { rows: t, columns: o, colors: e }) {
      for (let r = 0; r < o; r++) {
        const o = document.createElement('div')
        o.classList.add('circles-column'), n.appendChild(o)
        for (let n = 0; n < t; n++) {
          const t = new Set(e)
          if (r >= 2) {
            const o = [T({ row: 19 - n, column: r - 1 }), T({ row: 19 - n, column: r - 2 })]
            if (a(o.map(n => s(n)))) {
              const n = s(o[0])
              t.delete(n)
            }
          }
          if (n >= 2) {
            const n = [o.children[o.children.length - 1], o.children[o.children.length - 2]]
            if (a(n.map(n => s(n)))) {
              const o = s(n[0])
              t.delete(o)
            }
          }
          const c = d(Array.from(t))
          o.appendChild(c)
        }
      }
    })(o, { rows: 20, columns: 20, colors: n })
    const e = document.querySelector('.connection-line-canvas')
    ;(e.width = o.clientWidth), (e.height = o.clientHeight)
    const r = e.getContext('2d')
    let p = new Set(),
      h = null,
      w = null,
      v = null,
      y = null,
      g = null
    function b() {
      return null !== v
    }
    function x() {
      !(function () {
        const { x: n, y: t } = L()
        h.style.transform = `translate(${n}px, ${t}px)`
      })(),
        (function () {
          const n = (function () {
            const { x: n, y: t } = y
            if (0 !== n || 0 !== t) {
              const o = Math.abs(n),
                e = Math.abs(t)
              return (function (n, t) {
                const o = c(n)
                return T({ row: o.row + t.row, column: o.column + t.column })
              })(h, { row: e > o ? (t > 0 ? 1 : -1) : 0, column: o > e ? (n > 0 ? 1 : -1) : 0 })
            }
            return null
          })()
          if ((g && n !== g && M(), n)) {
            const t = L(),
              o = -t.x,
              e = -t.y
            n.style.transform = `translate(${o}px, ${e}px)`
          }
          g = n
        })()
    }
    function L() {
      return (function (n) {
        const { x: t, y: o } = n,
          e = Math.abs(t),
          r = Math.abs(o)
        return {
          x: e > r ? Math.sign(t) * Math.min(Math.abs(t), 42) : 0,
          y: r > e ? Math.sign(o) * Math.min(Math.abs(o), 42) : 0,
        }
      })(y)
    }
    function M() {
      g && S(g)
    }
    function S(n) {
      n.style.transform = null
    }
    function j(n, e) {
      const r = (function (n, t) {
        const o = new Set()
        let e = Math.min(...Array.from(t).map(n => c(n).row)),
          r = 0
        for (; r < e; ) {
          const t = T({ row: r, column: n })
          o.add(t), r++
        }
        return o
      })(n, e)
      for (const n of r) n.classList.add('circle--falling')
      const i = 42 * e.size
      requestAnimationFrame(() => {
        for (const n of r) n.style.top = `${i}px`
        const n = t()(function () {
          for (const n of e) n.remove()
          for (const n of r) n.classList.remove('circle--falling')
          o.removeEventListener('transitionend', n)
        })
        o.addEventListener('transitionend', n)
      })
    }
    function E(t) {
      const o = t.parentElement
      t.remove()
      const e = d(n)
      o.appendChild(e)
    }
    function T(n) {
      const { row: t, column: e } = n
      if (t < 20 && e < 20) {
        const n = o.querySelectorAll('.circles-column')[e].children
        return n[n.length - 1 - t]
      }
      return null
    }
    function O(n, t, o) {
      const e = new Set()
      let r = i(t, o)
      for (; r.row < 20 && r.column < 20; ) {
        const t = T(r)
        if (s(t) !== n) break
        e.add(t), (r = i(r, o))
      }
      return e
    }
    o.addEventListener('pointerdown', function (n) {
      const t = n.target
      if (t.classList.contains('circle')) {
        n.preventDefault()
        const o = t
        p.add(o), (h = o), (w = s(h)), (v = o), (y = { x: 0, y: 0 }), h.classList.add('circle--dragged'), x()
      }
    }),
      o.addEventListener('pointermove', function (n) {
        if (b()) {
          const t = n.target
          if (t.classList.contains('circle')) {
            const n = t
            s(n) === w &&
              (!p.has(n) || (p.size >= 3 && n === h)) &&
              (function (n, t) {
                const o = c(n),
                  e = c(t),
                  r = Math.abs(o.row - e.row),
                  i = Math.abs(o.column - e.column)
                return (0 === r && 1 === i) || (0 === i && 1 === r)
              })(n, v) &&
              ((function (n, t) {
                r.beginPath()
                const { x: o, y: e } = f(n)
                r.moveTo(o, e)
                const { x: c, y: i } = f(t)
                r.lineTo(c, i), r.stroke()
              })(n, v),
              p.add(n),
              (v = n))
          }
          ;(y = { x: y.x + n.movementX, y: y.y + n.movementY }), x()
        }
      }),
      window.addEventListener('pointerup', function () {
        if (b()) {
          if (p.size >= 2)
            if (
              (function (n, t) {
                if (4 === n.size) {
                  const t = Array.from(n).map(c)
                  return (
                    t.sort((n, t) => u(n, 20) - u(t, 20)),
                    t[0].row === t[1].row &&
                      t[0].column === t[1].column - 1 &&
                      t[2].row === t[3].row &&
                      t[2].column === t[3].column - 1 &&
                      t[0].row === t[2].row - 1
                  )
                }
                return !1
              })(p)
            ) {
              const n = o.querySelectorAll('.circle')
              for (const t of n) s(t) === w && E(t)
            } else p.forEach(E)
          if (g) {
            const { x: e, y: r } = L()
            if (Math.abs(e + r) > 21) {
              !(function (n, t) {
                const o = l(n),
                  e = l(t)
                n.classList.remove(o), t.classList.remove(e), n.classList.add(e), t.classList.add(o)
              })(h, g)
              let e = new Set()
              for (const n of new Set([h, g])) {
                let t = new Set()
                const o = s(n),
                  r = c(n),
                  i = new Set([
                    { row: 0, column: -1 },
                    { row: 0, column: 1 },
                  ]),
                  l = new Set([
                    { row: -1, column: 0 },
                    { row: 1, column: 0 },
                  ]),
                  u = new Set([i, l])
                for (const n of u) {
                  let e = new Set()
                  for (const t of n) e = m(e, O(o, r, t))
                  e.size >= 2 && (t = m(t, e))
                }
                t.size >= 1 && t.add(n), (e = m(e, t))
              }
              !(function (e) {
                for (const t of e) {
                  t.style.visibility = 'hidden'
                  const o = t.parentElement,
                    e = d(n)
                  o.appendChild(e)
                }
                const r = (function (n) {
                    const t = new Array(20)
                    for (let n = 0; n < t.length; n++) t[n] = new Set()
                    for (const o of n) {
                      const { column: n } = c(o)
                      t[n].add(o)
                    }
                    return t
                  })(e),
                  i = 42 * Math.max(...Array.from(r).map(n => n.size))
                o.style.top = -i + 'px'
                for (let n = 0; n < r.length; n++) {
                  const t = r[n]
                  t.size >= 1 && j(n, t)
                }
                const s = t()(function () {
                  ;(o.style.top = '0px'), o.removeEventListener('transitionend', s)
                })
                o.addEventListener('transitionend', s)
              })(e)
            }
          }
          h.classList.remove('circle--dragged'),
            S(h),
            M(),
            (p = new Set()),
            (h = null),
            (w = null),
            (v = null),
            (y = null),
            (g = null),
            r.clearRect(0, 0, e.width, e.height)
        }
      })
  }
  function c(n) {
    return { row: (n.offsetTop - 4) / 42, column: (n.offsetLeft - 4) / 42 }
  }
  function i(n, t) {
    return { row: n.row + t.row, column: n.column + t.column }
  }
  function s(n) {
    return l(n).split('--')[1]
  }
  function l(n) {
    return Array.from(n.classList).find(n => n.includes('--'))
  }
  function u(n, t) {
    return n.row * t + n.column
  }
  function f(n) {
    return { x: n.offsetLeft + 0.5 * n.clientWidth, y: n.offsetTop + 0.5 * n.clientHeight }
  }
  function a(n) {
    return 1 === new Set(n).size
  }
  function d(n) {
    const t = (function (n) {
        return (t = n)[
          ((o = 0),
          (e = t.length - 1),
          (o = Math.floor(o)),
          (e = Math.floor(e)),
          o + Math.floor(Math.random() * (e - o + 1)))
        ]
        var t, o, e
      })(n),
      o = (function ({ color: n }) {
        const t = document.createElement('div')
        return t.classList.add('circle'), t.classList.add(`circle--${n}`), t
      })({ color: t })
    return o
  }
  function m(...n) {
    const t = new Set()
    for (const o of n) for (const n of o) t.add(n)
    return t
  }
})()
var r = e.D
export { r as main }
//# sourceMappingURL=index.js.map
