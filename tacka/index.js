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
        return null == t
          ? void 0 === t
            ? "[object Undefined]"
            : "[object Null]"
          : a && a in Object(t)
          ? o(t)
          : r(t)
      }
    },
    833: (t, e, n) => {
      var i = n(127),
        o = /^\s+/
      t.exports = function (t) {
        return t ? t.slice(0, i(t) + 1).replace(o, "") : t
      }
    },
    120: (t, e, n) => {
      var i = "object" == typeof n.g && n.g && n.g.Object === Object && n.g
      t.exports = i
    },
    840: (t, e, n) => {
      var i = n(539),
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
    258: (t) => {
      var e = Object.prototype.toString
      t.exports = function (t) {
        return e.call(t)
      }
    },
    400: (t, e, n) => {
      var i = n(120),
        o = "object" == typeof self && self && self.Object === Object && self,
        r = i || o || Function("return this")()
      t.exports = r
    },
    127: (t) => {
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
        c = Math.min
      t.exports = function (t, e, n) {
        var u,
          s,
          h,
          l,
          d,
          f,
          v = 0,
          g = !1,
          p = !1,
          x = !0
        if ("function" != typeof t) throw new TypeError("Expected a function")
        function w(e) {
          var n = u,
            i = s
          return (u = s = void 0), (v = e), (l = t.apply(i, n))
        }
        function y(t) {
          return (v = t), (d = setTimeout(b, e)), g ? w(t) : l
        }
        function m(t) {
          var n = t - f
          return void 0 === f || n >= e || n < 0 || (p && t - v >= h)
        }
        function b() {
          var t = o()
          if (m(t)) return M(t)
          d = setTimeout(
            b,
            (function (t) {
              var n = e - (t - f)
              return p ? c(n, h - (t - v)) : n
            })(t),
          )
        }
        function M(t) {
          return (d = void 0), x && u ? w(t) : ((u = s = void 0), l)
        }
        function j() {
          var t = o(),
            n = m(t)
          if (((u = arguments), (s = this), (f = t), n)) {
            if (void 0 === d) return y(f)
            if (p) return clearTimeout(d), (d = setTimeout(b, e)), w(f)
          }
          return void 0 === d && (d = setTimeout(b, e)), l
        }
        return (
          (e = r(e) || 0),
          i(n) &&
            ((g = !!n.leading),
            (h = (p = "maxWait" in n) ? a(r(n.maxWait) || 0, e) : h),
            (x = "trailing" in n ? !!n.trailing : x)),
          (j.cancel = function () {
            void 0 !== d && clearTimeout(d), (v = 0), (u = f = s = d = void 0)
          }),
          (j.flush = function () {
            return void 0 === d ? l : M(o())
          }),
          j
        )
      }
    },
    611: (t) => {
      t.exports = function (t) {
        var e = typeof t
        return null != t && ("object" == e || "function" == e)
      }
    },
    360: (t) => {
      t.exports = function (t) {
        return null != t && "object" == typeof t
      }
    },
    193: (t, e, n) => {
      var i = n(736),
        o = n(360)
      t.exports = function (t) {
        return "symbol" == typeof t || (o(t) && "[object Symbol]" == i(t))
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
        c = /^0b[01]+$/i,
        u = /^0o[0-7]+$/i,
        s = parseInt
      t.exports = function (t) {
        if ("number" == typeof t) return t
        if (r(t)) return NaN
        if (o(t)) {
          var e = "function" == typeof t.valueOf ? t.valueOf() : t
          t = o(e) ? e + "" : e
        }
        if ("string" != typeof t) return 0 === t ? t : +t
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
  if ("object" == typeof globalThis) return globalThis
  try {
    return this || new Function("return this")()
  } catch (t) {
    if ("object" == typeof window) return window
  }
})()),
  (() => {
    function t() {}
    var e = n(726)
    const i = 180 / Math.PI
    function o({ origin: t, radius: e, angle: n }) {
      return { x: t.x + e * Math.cos(n), y: t.y + e * Math.sin(n) }
    }
    const { canvas: r, context: a } = (function ({
      onDevicePixelRatioOrDocumentSizeChange: n,
      afterCanvasSizeAndScaleSet: i,
    } = {}) {
      n || (n = t), i || (i = t)
      const o = document.createElement("canvas"),
        r = o.getContext("2d"),
        a = window.innerWidth,
        c = window.innerHeight,
        u = window.devicePixelRatio
      ;(o.style.width = `${a}px`),
        (o.style.height = `${c}px`),
        (o.width = u * a),
        (o.height = u * c),
        r.scale(u, u)
      const s = e(function () {
          const t = parseInt(o.style.width, 10),
            e = window.innerWidth,
            n = parseInt(o.style.height, 10),
            a = window.innerHeight,
            c = window.devicePixelRatio
          if (e > t || a > n) {
            const { canvas: i, context: u } = (function (
              t,
              e,
              { x: n, y: i, width: o, height: r },
            ) {
              const a = document.createElement("canvas")
              ;(a.width = o - n), (a.height = r - i)
              const c = a.getContext("2d")
              return (
                c.putImageData(e.getImageData(n, i, o, r), 0, 0),
                { canvas: a, context: c }
              )
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
            ;(e = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)),
              e.addEventListener("change", n)
          }
          function o() {
            e.removeEventListener("change", n)
          }
          return i(), o
        })(l)
      function l(t) {
        s(), n(t)
      }
      return (
        window.addEventListener("resize", l),
        {
          canvas: o,
          context: r,
          removeEventListeners: function () {
            s.cancel(), h(), window.removeEventListener("resize", l)
          },
        }
      )
    })()
    document.body.appendChild(r)
    const c = 200
    let u = c,
      s = -0.1,
      h = 0,
      l = (((2 * Math.PI) / 360) * 0.5) / 10,
      d = { radius: u, angle: h }
    const f = document.createElement("canvas")
    ;(f.width = 402), (f.height = f.width)
    const v = f.getContext("2d")
    v.lineWidth = 1
    const g = { x: f.width / 2, y: f.height / 2 }
    !(function (t) {
      let e
      function n() {
        {
          const t = Date.now()
          ;((t) => {
            v.beginPath()
            const { x: e, y: n } = o({ ...d, origin: g })
            v.moveTo(e, n)
            const p = { radius: u, angle: h },
              x = {
                hue: Math.round(((w = (d.angle + p.angle) / 2), w * i)),
                saturation: 1,
                lightness: 0.5,
              }
            var w
            v.strokeStyle = (function (t) {
              t = Array.isArray(t)
                ? { hue: t[0], saturation: t[1], lightness: t[2], alpha: t[3] }
                : { ...t, hue: t.hue / 360 }
              const { hue: e, saturation: n, lightness: i, alpha: o } = t
              return o
                ? `hsla(${Math.round(360 * e)}, ${Math.round(
                    100 * n,
                  )}%, ${Math.round(100 * i)}%, ${o})`
                : `hsl(${Math.round(360 * e)}, ${Math.round(
                    100 * n,
                  )}%, ${Math.round(100 * i)}%)`
            })(x)
            const { x: y, y: m } = o({ ...p, origin: g })
            v.lineTo(y, m),
              v.stroke(),
              (d = p),
              (function (
                t,
                e,
                n,
                { radius: i, angle: o, minRadius: r, maxRadius: a },
              ) {
                const c = {
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                }
                e.save(),
                  (e.lineWidth = 1),
                  (e.lineCap = "round"),
                  (e.fillStyle = "white"),
                  (e.strokeStyle = "black"),
                  e.beginPath(),
                  e.arc(c.x, c.y, a, 0, 2 * Math.PI),
                  e.fill(),
                  e.stroke(),
                  e.beginPath(),
                  e.arc(c.x, c.y, r, 0, 2 * Math.PI),
                  e.fill(),
                  e.stroke(),
                  e.drawImage(
                    n,
                    0.5 * t.width - 0.5 * n.width,
                    0.5 * t.height - 0.5 * n.height,
                  ),
                  e.beginPath(),
                  e.moveTo(c.x, c.y),
                  e.lineTo(c.x + i * Math.cos(o), c.y + i * Math.sin(o)),
                  e.stroke(),
                  e.restore()
              })(r, a, f, { radius: u, angle: h, minRadius: 40, maxRadius: c }),
              (h = (h + t * l) % (8 * Math.PI)),
              (u += t * s),
              u <= 40 ? (s = 0.1) : u >= c && (s = -0.1),
              (u = Math.min(Math.max(40, u), c))
          })(t - (e || t)),
            (e = t),
            p()
        }
      }
      function p() {
        requestAnimationFrame(n)
      }
      p()
    })()
  })()
//# sourceMappingURL=index.js.map
