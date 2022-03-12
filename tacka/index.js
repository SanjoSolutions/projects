var t = {
    539: (t, e, n) => {
      var i = n(400).Symbol
      t.exports = i
    },
    736: (t, e, n) => {
      var i = n(539),
        o = n(840),
        r = n(258),
        a = i ? i.toStringTag : void 0
      t.exports = function (t) {
        return null == t ? (void 0 === t ? '[object Undefined]' : '[object Null]') : a && a in Object(t) ? o(t) : r(t)
      }
    },
    833: (t, e, n) => {
      var i = n(127),
        o = /^\s+/
      t.exports = function (t) {
        return t ? t.slice(0, i(t) + 1).replace(o, '') : t
      }
    },
    120: (t, e, n) => {
      var i = 'object' == typeof n.g && n.g && n.g.Object === Object && n.g
      t.exports = i
    },
    840: (t, e, n) => {
      var i = n(539),
        o = Object.prototype,
        r = o.hasOwnProperty,
        a = o.toString,
        u = i ? i.toStringTag : void 0
      t.exports = function (t) {
        var e = r.call(t, u),
          n = t[u]
        try {
          t[u] = void 0
          var i = !0
        } catch (t) {}
        var o = a.call(t)
        return i && (e ? (t[u] = n) : delete t[u]), o
      }
    },
    258: t => {
      var e = Object.prototype.toString
      t.exports = function (t) {
        return e.call(t)
      }
    },
    400: (t, e, n) => {
      var i = n(120),
        o = 'object' == typeof self && self && self.Object === Object && self,
        r = i || o || Function('return this')()
      t.exports = r
    },
    127: t => {
      var e = /\s/
      t.exports = function (t) {
        for (var n = t.length; n-- && e.test(t.charAt(n)); );
        return n
      }
    },
    726: (t, e, n) => {
      var i = n(611),
        o = n(846),
        r = n(936),
        a = Math.max,
        u = Math.min
      t.exports = function (t, e, n) {
        var c,
          s,
          h,
          l,
          f,
          d,
          v = 0,
          g = !1,
          p = !1,
          x = !0
        if ('function' != typeof t) throw new TypeError('Expected a function')
        function y(e) {
          var n = c,
            i = s
          return (c = s = void 0), (v = e), (l = t.apply(i, n))
        }
        function w(t) {
          return (v = t), (f = setTimeout(b, e)), g ? y(t) : l
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
              return p ? u(n, h - (t - v)) : n
            })(t)
          )
        }
        function M(t) {
          return (f = void 0), x && c ? y(t) : ((c = s = void 0), l)
        }
        function j() {
          var t = o(),
            n = m(t)
          if (((c = arguments), (s = this), (d = t), n)) {
            if (void 0 === f) return w(d)
            if (p) return clearTimeout(f), (f = setTimeout(b, e)), y(d)
          }
          return void 0 === f && (f = setTimeout(b, e)), l
        }
        return (
          (e = r(e) || 0),
          i(n) &&
            ((g = !!n.leading),
            (h = (p = 'maxWait' in n) ? a(r(n.maxWait) || 0, e) : h),
            (x = 'trailing' in n ? !!n.trailing : x)),
          (j.cancel = function () {
            void 0 !== f && clearTimeout(f), (v = 0), (c = d = s = f = void 0)
          }),
          (j.flush = function () {
            return void 0 === f ? l : M(o())
          }),
          j
        )
      }
    },
    611: t => {
      t.exports = function (t) {
        var e = typeof t
        return null != t && ('object' == e || 'function' == e)
      }
    },
    360: t => {
      t.exports = function (t) {
        return null != t && 'object' == typeof t
      }
    },
    193: (t, e, n) => {
      var i = n(736),
        o = n(360)
      t.exports = function (t) {
        return 'symbol' == typeof t || (o(t) && '[object Symbol]' == i(t))
      }
    },
    846: (t, e, n) => {
      var i = n(400)
      t.exports = function () {
        return i.Date.now()
      }
    },
    936: (t, e, n) => {
      var i = n(833),
        o = n(611),
        r = n(193),
        a = /^[-+]0x[0-9a-f]+$/i,
        u = /^0b[01]+$/i,
        c = /^0o[0-7]+$/i,
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
        var n = u.test(t)
        return n || c.test(t) ? s(t.slice(2), n ? 2 : 8) : a.test(t) ? NaN : +t
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
    var e = n(726)
    function i() {
      return { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    }
    function o({ origin: t, radius: e, angle: n }) {
      return { x: t.x + e * Math.cos(n), y: t.y + e * Math.sin(n) }
    }
    const r = 180 / Math.PI
    function a(t) {
      return t * r
    }
    const { canvas: u, context: c } = (function ({
      onDevicePixelRatioOrDocumentSizeChange: n,
      afterCanvasSizeAndScaleSet: i,
    } = {}) {
      n || (n = t), i || (i = t)
      const o = document.createElement('canvas'),
        r = o.getContext('2d'),
        a = window.innerWidth,
        u = window.innerHeight,
        c = window.devicePixelRatio
      ;(o.style.width = `${a}px`), (o.style.height = `${u}px`), (o.width = c * a), (o.height = c * u), r.scale(c, c)
      const s = e(function () {
          const t = parseInt(o.style.width, 10),
            e = window.innerWidth,
            n = parseInt(o.style.height, 10),
            a = window.innerHeight,
            u = window.devicePixelRatio
          if (e > t || a > n) {
            const { canvas: i, context: c } = (function (t, e, { x: n, y: i, width: o, height: r }) {
              const a = document.createElement('canvas')
              ;(a.width = o - n), (a.height = r - i)
              const u = a.getContext('2d')
              return u.putImageData(e.getImageData(n, i, o, r), 0, 0), { canvas: a, context: u }
            })(0, r, { x: 0, y: 0, width: o.width, height: o.height })
            e > t && ((o.style.width = `${e}px`), (o.width = u * e)),
              a > n && ((o.style.height = `${a}px`), (o.height = u * a)),
              r.resetTransform(),
              r.scale(u, u),
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
    document.body.appendChild(u)
    const s = 200
    let h = 200,
      l = -1,
      f = 0,
      d = ((2 * Math.PI) / 360) * 0.5
    const v = []
    !(function (t) {
      let e
      function n() {
        {
          const t = Date.now()
          v.push({ radius: h, angle: f }),
            (function (t, e, { radius: n, angle: r, minRadius: u, maxRadius: c, points: s }) {
              const h = i()
              e.save(),
                (e.lineWidth = 1),
                (e.lineCap = 'round'),
                (e.fillStyle = 'white'),
                (e.strokeStyle = 'black'),
                e.beginPath(),
                e.arc(h.x, h.y, c, 0, 2 * Math.PI),
                e.fill(),
                e.stroke(),
                e.beginPath(),
                e.arc(h.x, h.y, u, 0, 2 * Math.PI),
                e.fill(),
                e.stroke(),
                (function (t, e, n) {
                  if (n.length >= 1) {
                    const t = i()
                    e.save(), (e.lineWidth = 1)
                    let r = n[0],
                      { x: u, y: c } = o({ ...r, origin: t })
                    n.forEach(n => {
                      e.beginPath(), e.moveTo(u, c)
                      const i = { hue: Math.round(a((r.angle + n.angle) / 2)), saturation: 1, lightness: 0.5 }
                      e.strokeStyle = (function (t) {
                        t = Array.isArray(t)
                          ? { hue: t[0], saturation: t[1], lightness: t[2], alpha: t[3] }
                          : { ...t, hue: t.hue / 360 }
                        const { hue: e, saturation: n, lightness: i, alpha: o } = t
                        return o
                          ? `hsla(${Math.round(360 * e)}, ${Math.round(100 * n)}%, ${Math.round(100 * i)}%, ${o})`
                          : `hsl(${Math.round(360 * e)}, ${Math.round(100 * n)}%, ${Math.round(100 * i)}%)`
                      })(i)
                      const { x: s, y: h } = o({ ...n, origin: t })
                      e.lineTo(s, h), e.stroke(), (r = n), (u = s), (c = h)
                    }),
                      e.restore()
                  }
                })(0, e, s),
                e.beginPath(),
                e.moveTo(h.x, h.y),
                e.lineTo(h.x + n * Math.cos(r), h.y + n * Math.sin(r)),
                e.stroke(),
                e.restore()
            })(0, c, { radius: h, angle: f, minRadius: 40, maxRadius: s, points: v }),
            (f = (f + d) % (8 * Math.PI)),
            Math.abs(f) < d && (d /= 2),
            (h += l),
            h <= 40 ? (l = 1) : h >= s && (l = -1),
            (e = t),
            r()
        }
      }
      function r() {
        requestAnimationFrame(n)
      }
      r()
    })()
  })()
//# sourceMappingURL=index.js.map
