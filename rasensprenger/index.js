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
        c = i ? i.toStringTag : void 0
      t.exports = function (t) {
        var e = r.call(t, c),
          n = t[c]
        try {
          t[c] = void 0
          var i = !0
        } catch (t) {}
        var o = a.call(t)
        return i && (e ? (t[c] = n) : delete t[c]), o
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
        c = Math.min
      t.exports = function (t, e, n) {
        var u,
          s,
          h,
          l,
          f,
          d,
          v = 0,
          w = !1,
          p = !1,
          g = !0
        if ('function' != typeof t) throw new TypeError('Expected a function')
        function x(e) {
          var n = u,
            i = s
          return (u = s = void 0), (v = e), (l = t.apply(i, n))
        }
        function y(t) {
          return (v = t), (f = setTimeout(b, e)), w ? x(t) : l
        }
        function m(t) {
          var n = t - d
          return void 0 === d || n >= e || n < 0 || (p && t - v >= h)
        }
        function b() {
          var t = o()
          if (m(t)) return M(t)
          f = setTimeout(
            b,
            (function (t) {
              var n = e - (t - d)
              return p ? c(n, h - (t - v)) : n
            })(t)
          )
        }
        function M(t) {
          return (f = void 0), g && u ? x(t) : ((u = s = void 0), l)
        }
        function j() {
          var t = o(),
            n = m(t)
          if (((u = arguments), (s = this), (d = t), n)) {
            if (void 0 === f) return y(d)
            if (p) return clearTimeout(f), (f = setTimeout(b, e)), x(d)
          }
          return void 0 === f && (f = setTimeout(b, e)), l
        }
        return (
          (e = r(e) || 0),
          i(n) &&
            ((w = !!n.leading),
            (h = (p = 'maxWait' in n) ? a(r(n.maxWait) || 0, e) : h),
            (g = 'trailing' in n ? !!n.trailing : g)),
          (j.cancel = function () {
            void 0 !== f && clearTimeout(f), (v = 0), (u = d = s = f = void 0)
          }),
          (j.flush = function () {
            return void 0 === f ? l : M(o())
          }),
          j
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
        c = /^0b[01]+$/i,
        u = /^0o[0-7]+$/i,
        s = parseInt
      t.exports = function (t) {
        if ('number' == typeof t) return t
        if (r(t)) return NaN
        if (o(t)) {
          var e = 'function' == typeof t.valueOf ? t.valueOf() : t
          t = o(e) ? e + '' : e
        }
        if ('string' != typeof t) return 0 === t ? t : +t
        t = i(t)
        var n = c.test(t)
        return n || u.test(t) ? s(t.slice(2), n ? 2 : 8) : a.test(t) ? NaN : +t
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
    function i(t) {
      t = Array.isArray(t) ? { hue: t[0], saturation: t[1], lightness: t[2], alpha: t[3] } : { ...t, hue: t.hue / 360 }
      const { hue: e, saturation: n, lightness: i, alpha: o } = t
      return o
        ? `hsla(${Math.round(360 * e)}, ${Math.round(100 * n)}%, ${Math.round(100 * i)}%, ${o})`
        : `hsl(${Math.round(360 * e)}, ${Math.round(100 * n)}%, ${Math.round(100 * i)}%)`
    }
    function o(t, e) {
      return (t = Math.floor(t)), (e = Math.floor(e)), t + Math.floor(Math.random() * (e - t + 1))
    }
    const r = new Array(100)
    for (let t = 0; t < 100; t++)
      r[t] = {
        x: o(0, window.innerWidth - 1),
        y: o(0, window.innerHeight - 1),
        color: { hue: o(0, 359), saturation: 1, lightness: 0.5 },
      }
    let a = []
    const { canvas: c, context: u } = (function ({
      onDevicePixelRatioOrDocumentSizeChange: n,
      afterCanvasSizeAndScaleSet: i,
    } = {}) {
      n || (n = t), i || (i = t)
      const o = document.createElement('canvas'),
        r = o.getContext('2d'),
        a = window.innerWidth,
        c = window.innerHeight,
        u = window.devicePixelRatio
      ;(o.style.width = `${a}px`), (o.style.height = `${c}px`), (o.width = u * a), (o.height = u * c), r.scale(u, u)
      const s = e(function () {
          const t = parseInt(o.style.width, 10),
            e = window.innerWidth,
            n = parseInt(o.style.height, 10),
            a = window.innerHeight,
            c = window.devicePixelRatio
          if (e > t || a > n) {
            const { canvas: i, context: u } = (function (t, e, { x: n, y: i, width: o, height: r }) {
              const a = document.createElement('canvas')
              ;(a.width = o - n), (a.height = r - i)
              const c = a.getContext('2d')
              return c.putImageData(e.getImageData(n, i, o, r), 0, 0), { canvas: a, context: c }
            })(0, r, { x: 0, y: 0, width: o.width, height: o.height })
            e > t && ((o.style.width = `${e}px`), (o.width = c * e)),
              a > n && ((o.style.height = `${a}px`), (o.height = c * a)),
              r.resetTransform(),
              r.scale(c, c),
              r.putImageData(u.getImageData(0, 0, i.width, i.height), 0, 0)
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
        s(), n(t)
      }
      return (
        window.addEventListener('resize', l),
        {
          canvas: o,
          context: r,
          removeEventListeners: function () {
            s.cancel(), h(), window.removeEventListener('resize', l)
          },
        }
      )
    })()
    document.body.appendChild(c)
    let s = 0
    const h = { hue: 208, saturation: 1, lightness: 0.87, alpha: 1 }
    function l({ x: t, y: e, color: n }) {
      const o = (2 * Math.PI) / 6
      u.fillStyle = i(n)
      for (let n = 0; n < 6; n++) {
        const i = n * o
        u.beginPath(), u.arc(t + 5 * Math.cos(i), e + 5 * Math.sin(i), 5, 0, 2 * Math.PI), u.fill()
      }
      ;(u.fillStyle = 'yellow'), u.beginPath(), u.arc(t, e, 5, 0, 2 * Math.PI), u.fill()
    }
    !(function (t) {
      let e
      function n() {
        {
          const t = Date.now()
          ;(() => {
            a = a.filter(({ spawnTime: t }) => Date.now() - t <= 5e3)
            for (let t = 0; t < 80; t++)
              a.push({ x: o(0, window.innerWidth - 1), y: o(0, window.innerHeight - 1), spawnTime: Date.now() })
            u.clearRect(0, 0, window.innerWidth, window.innerHeight),
              window.innerWidth,
              window.innerHeight,
              r.forEach(l),
              a.forEach(function ({ x: t, y: e, spawnTime: n }) {
                ;(u.fillStyle = i({ ...h, alpha: 1 - (Date.now() - n) / 5e3 })),
                  u.beginPath(),
                  u.arc(t, e, 1, 0, 2 * Math.PI),
                  u.fill()
              }),
              (s = (s + ((2 * Math.PI) / 360) * 0.125) % (2 * Math.PI))
          })(),
            (e = t),
            c()
        }
      }
      function c() {
        requestAnimationFrame(n)
      }
      c()
    })()
  })()
//# sourceMappingURL=index.js.map
