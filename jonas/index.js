var t = {
    705: (t, e, n) => {
      var i = n(639).Symbol
      t.exports = i
    },
    239: (t, e, n) => {
      var i = n(705),
        o = n(607),
        r = n(333),
        a = i ? i.toStringTag : void 0
      t.exports = function (t) {
        return null == t ? (void 0 === t ? '[object Undefined]' : '[object Null]') : a && a in Object(t) ? o(t) : r(t)
      }
    },
    561: (t, e, n) => {
      var i = n(990),
        o = /^\s+/
      t.exports = function (t) {
        return t ? t.slice(0, i(t) + 1).replace(o, '') : t
      }
    },
    957: (t, e, n) => {
      var i = 'object' == typeof n.g && n.g && n.g.Object === Object && n.g
      t.exports = i
    },
    607: (t, e, n) => {
      var i = n(705),
        o = Object.prototype,
        r = o.hasOwnProperty,
        a = o.toString,
        s = i ? i.toStringTag : void 0
      t.exports = function (t) {
        var e = r.call(t, s),
          n = t[s]
        try {
          t[s] = void 0
          var i = !0
        } catch (t) {}
        var o = a.call(t)
        return i && (e ? (t[s] = n) : delete t[s]), o
      }
    },
    333: t => {
      var e = Object.prototype.toString
      t.exports = function (t) {
        return e.call(t)
      }
    },
    639: (t, e, n) => {
      var i = n(957),
        o = 'object' == typeof self && self && self.Object === Object && self,
        r = i || o || Function('return this')()
      t.exports = r
    },
    990: t => {
      var e = /\s/
      t.exports = function (t) {
        for (var n = t.length; n-- && e.test(t.charAt(n)); );
        return n
      }
    },
    279: (t, e, n) => {
      var i = n(218),
        o = n(771),
        r = n(841),
        a = Math.max,
        s = Math.min
      t.exports = function (t, e, n) {
        var c,
          u,
          h,
          l,
          f,
          d,
          v = 0,
          w = !1,
          g = !1,
          p = !0
        if ('function' != typeof t) throw new TypeError('Expected a function')
        function m(e) {
          var n = c,
            i = u
          return (c = u = void 0), (v = e), (l = t.apply(i, n))
        }
        function x(t) {
          return (v = t), (f = setTimeout(b, e)), w ? m(t) : l
        }
        function y(t) {
          var n = t - d
          return void 0 === d || n >= e || n < 0 || (g && t - v >= h)
        }
        function b() {
          var t = o()
          if (y(t)) return M(t)
          f = setTimeout(
            b,
            (function (t) {
              var n = e - (t - d)
              return g ? s(n, h - (t - v)) : n
            })(t)
          )
        }
        function M(t) {
          return (f = void 0), p && c ? m(t) : ((c = u = void 0), l)
        }
        function $() {
          var t = o(),
            n = y(t)
          if (((c = arguments), (u = this), (d = t), n)) {
            if (void 0 === f) return x(d)
            if (g) return clearTimeout(f), (f = setTimeout(b, e)), m(d)
          }
          return void 0 === f && (f = setTimeout(b, e)), l
        }
        return (
          (e = r(e) || 0),
          i(n) &&
            ((w = !!n.leading),
            (h = (g = 'maxWait' in n) ? a(r(n.maxWait) || 0, e) : h),
            (p = 'trailing' in n ? !!n.trailing : p)),
          ($.cancel = function () {
            void 0 !== f && clearTimeout(f), (v = 0), (c = d = u = f = void 0)
          }),
          ($.flush = function () {
            return void 0 === f ? l : M(o())
          }),
          $
        )
      }
    },
    218: t => {
      t.exports = function (t) {
        var e = typeof t
        return null != t && ('object' == e || 'function' == e)
      }
    },
    5: t => {
      t.exports = function (t) {
        return null != t && 'object' == typeof t
      }
    },
    448: (t, e, n) => {
      var i = n(239),
        o = n(5)
      t.exports = function (t) {
        return 'symbol' == typeof t || (o(t) && '[object Symbol]' == i(t))
      }
    },
    771: (t, e, n) => {
      var i = n(639)
      t.exports = function () {
        return i.Date.now()
      }
    },
    841: (t, e, n) => {
      var i = n(561),
        o = n(218),
        r = n(448),
        a = /^[-+]0x[0-9a-f]+$/i,
        s = /^0b[01]+$/i,
        c = /^0o[0-7]+$/i,
        u = parseInt
      t.exports = function (t) {
        if ('number' == typeof t) return t
        if (r(t)) return NaN
        if (o(t)) {
          var e = 'function' == typeof t.valueOf ? t.valueOf() : t
          t = o(e) ? e + '' : e
        }
        if ('string' != typeof t) return 0 === t ? t : +t
        t = i(t)
        var n = s.test(t)
        return n || c.test(t) ? u(t.slice(2), n ? 2 : 8) : a.test(t) ? NaN : +t
      }
    },
  },
  e = {}
function n(i) {
  var o = e[i]
  if (void 0 !== o) return o.exports
  var r = (e[i] = { exports: {} })
  return t[i](r, r.exports, n), r.exports
}
;(n.g = (function () {
  if ('object' == typeof globalThis) return globalThis
  try {
    return this || new Function('return this')()
  } catch (t) {
    if ('object' == typeof window) return window
  }
})()),
  (() => {
    function t() {}
    var e = n(279)
    const i = 32,
      o = window.innerWidth,
      r = window.innerHeight,
      a = new (class {
        constructor(t, e, n) {
          ;(this.width = t), (this.height = e), this._initializeValues(t, e, n)
        }
        _initializeValues(t, e, n) {
          const i = t * e
          if (n) {
            if (n.length !== i) throw new Error(`values length ${n.length} does't match expected length of ${i}.`)
            this.values = n
          } else this.values = new Array(i)
        }
        get({ row: t, column: e }) {
          return this.values[this.calculateIndex({ row: t, column: e })]
        }
        set({ row: t, column: e }, n) {
          this.values[this.calculateIndex({ row: t, column: e })] = n
        }
        calculateIndex({ row: t, column: e }) {
          return (t - 1) * this.width + (e - 1)
        }
        indexToPosition(t) {
          return { row: 1 + Math.floor(t / this.width), column: 1 + (t % this.width) }
        }
        entries() {
          return Array.from(this.values.entries()).map(([t, e]) => [this.indexToPosition(t), e])
        }
        forEach(t) {
          this.values.forEach(t)
        }
        resize(t, e) {
          if (t !== this.width || e !== this.height) {
            const n = new Array(t * e)
            for (let i = 0; i < e; i++) {
              const e = this.calculateIndex({ row: i + 1, column: 1 }),
                o = this.values.slice(e, e + t)
              n.splice(i * t, o.length, ...o)
            }
            ;(this.width = t), (this.height = e), (this.values = n)
          }
        }
      })(Math.floor(o / i), Math.floor(r / i)),
      { canvas: s, context: c } = (function ({
        onDevicePixelRatioOrDocumentSizeChange: n,
        afterCanvasSizeAndScaleSet: i,
      } = {}) {
        n || (n = t), i || (i = t)
        const o = document.createElement('canvas'),
          r = o.getContext('2d'),
          a = window.innerWidth,
          s = window.innerHeight,
          c = window.devicePixelRatio
        ;(o.style.width = `${a}px`), (o.style.height = `${s}px`), (o.width = c * a), (o.height = c * s), r.scale(c, c)
        const u = e(function () {
            const t = parseInt(o.style.width, 10),
              e = window.innerWidth,
              n = parseInt(o.style.height, 10),
              a = window.innerHeight,
              s = window.devicePixelRatio
            if (e > t || a > n) {
              const { canvas: i, context: c } = (function (t, e, { x: n, y: i, width: o, height: r }) {
                const a = document.createElement('canvas')
                ;(a.width = o - n), (a.height = r - i)
                const s = a.getContext('2d')
                return s.putImageData(e.getImageData(n, i, o, r), 0, 0), { canvas: a, context: s }
              })(0, r, { x: 0, y: 0, width: o.width, height: o.height })
              e > t && ((o.style.width = `${e}px`), (o.width = s * e)),
                a > n && ((o.style.height = `${a}px`), (o.height = s * a)),
                r.resetTransform(),
                r.scale(s, s),
                r.putImageData(c.getImageData(0, 0, i.width, i.height), 0, 0)
            }
            i()
          }, 200),
          h = (function (t) {
            let e
            function n(e) {
              o(), i(), t(e)
            }
            function i() {
              ;(e = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)), e.addEventListener('change', n)
            }
            function o() {
              e.removeEventListener('change', n)
            }
            return i(), o
          })(l)
        function l(t) {
          u(), n(t)
        }
        return (
          window.addEventListener('resize', l),
          {
            canvas: o,
            context: r,
            removeEventListeners: function () {
              u.cancel(), h(), window.removeEventListener('resize', l)
            },
          }
        )
      })({
        onDevicePixelRatioOrDocumentSizeChange() {
          const t = window.innerWidth,
            e = window.innerHeight
          a.resize(Math.floor(t / i), Math.floor(e / i))
        },
      })
    function u({ row: t, column: e }, n) {
      const o = (e - 1) * i,
        r = (t - 1) * i
      ;(c.fillStyle = (function (t) {
        t = Array.isArray(t)
          ? { hue: t[0], saturation: t[1], lightness: t[2], alpha: t[3] }
          : { ...t, hue: t.hue / 360 }
        const { hue: e, saturation: n, lightness: i, alpha: o } = t
        return o
          ? `hsla(${Math.round(360 * e)}, ${Math.round(100 * n)}%, ${Math.round(100 * i)}%, ${o})`
          : `hsl(${Math.round(360 * e)}, ${Math.round(100 * n)}%, ${Math.round(100 * i)}%)`
      })(n)),
        c.fillRect(o, r, i, i)
    }
    document.body.appendChild(s),
      (function (t) {
        let e
        function n() {
          {
            const t = Date.now()
            ;(t => {
              const e = ((t / 1e3) * 10) / 100
              for (const [t, n] of a.entries()) n && a.set(t, { ...n, lightness: n.lightness + e })
              const n = a
                .entries()
                .filter(([t, e]) => !e)
                .map(([t, e]) => t)
              if (n.length >= 1) {
                const t = Math.floor(Math.random() * n.length),
                  { row: e, column: r } = n[t],
                  s = {
                    hue:
                      ((i = 0),
                      (o = 359),
                      (i = Math.floor(i)),
                      (o = Math.floor(o)),
                      i + Math.floor(Math.random() * (o - i + 1))),
                    saturation: 1,
                    lightness: 0.5,
                  }
                a.set({ row: e, column: r }, s)
              }
              var i, o
              c.clearRect(0, 0, s.width, s.height)
              for (const [t, e] of a.entries()) e && u(t, e)
              for (const [t, e] of a.entries()) e && e.lightness >= 1 && a.set(t, void 0)
            })(t - (e || t)),
              (e = t),
              i()
          }
        }
        function i() {
          requestAnimationFrame(n)
        }
        i()
      })()
  })()
//# sourceMappingURL=index.js.map
