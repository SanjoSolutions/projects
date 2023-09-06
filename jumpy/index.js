var t = {
    705: (t, n, e) => {
      var o = e(639).Symbol
      t.exports = o
    },
    239: (t, n, e) => {
      var o = e(705),
        i = e(607),
        r = e(333),
        a = o ? o.toStringTag : void 0
      t.exports = function (t) {
        return null == t
          ? void 0 === t
            ? "[object Undefined]"
            : "[object Null]"
          : a && a in Object(t)
          ? i(t)
          : r(t)
      }
    },
    561: (t, n, e) => {
      var o = e(990),
        i = /^\s+/
      t.exports = function (t) {
        return t ? t.slice(0, o(t) + 1).replace(i, "") : t
      }
    },
    957: (t, n, e) => {
      var o = "object" == typeof e.g && e.g && e.g.Object === Object && e.g
      t.exports = o
    },
    607: (t, n, e) => {
      var o = e(705),
        i = Object.prototype,
        r = i.hasOwnProperty,
        a = i.toString,
        c = o ? o.toStringTag : void 0
      t.exports = function (t) {
        var n = r.call(t, c),
          e = t[c]
        try {
          t[c] = void 0
          var o = !0
        } catch (t) {}
        var i = a.call(t)
        return o && (n ? (t[c] = e) : delete t[c]), i
      }
    },
    333: (t) => {
      var n = Object.prototype.toString
      t.exports = function (t) {
        return n.call(t)
      }
    },
    639: (t, n, e) => {
      var o = e(957),
        i = "object" == typeof self && self && self.Object === Object && self,
        r = o || i || Function("return this")()
      t.exports = r
    },
    990: (t) => {
      var n = /\s/
      t.exports = function (t) {
        for (var e = t.length; e-- && n.test(t.charAt(e)); );
        return e
      }
    },
    279: (t, n, e) => {
      var o = e(218),
        i = e(771),
        r = e(841),
        a = Math.max,
        c = Math.min
      t.exports = function (t, n, e) {
        var s,
          u,
          f,
          d,
          l,
          h,
          v = 0,
          w = !1,
          x = !1,
          p = !0
        if ("function" != typeof t) throw new TypeError("Expected a function")
        function g(n) {
          var e = s,
            o = u
          return (s = u = void 0), (v = n), (d = t.apply(o, e))
        }
        function y(t) {
          return (v = t), (l = setTimeout(b, n)), w ? g(t) : d
        }
        function m(t) {
          var e = t - h
          return void 0 === h || e >= n || e < 0 || (x && t - v >= f)
        }
        function b() {
          var t = i()
          if (m(t)) return j(t)
          l = setTimeout(
            b,
            (function (t) {
              var e = n - (t - h)
              return x ? c(e, f - (t - v)) : e
            })(t),
          )
        }
        function j(t) {
          return (l = void 0), p && s ? g(t) : ((s = u = void 0), d)
        }
        function T() {
          var t = i(),
            e = m(t)
          if (((s = arguments), (u = this), (h = t), e)) {
            if (void 0 === l) return y(h)
            if (x) return clearTimeout(l), (l = setTimeout(b, n)), g(h)
          }
          return void 0 === l && (l = setTimeout(b, n)), d
        }
        return (
          (n = r(n) || 0),
          o(e) &&
            ((w = !!e.leading),
            (f = (x = "maxWait" in e) ? a(r(e.maxWait) || 0, n) : f),
            (p = "trailing" in e ? !!e.trailing : p)),
          (T.cancel = function () {
            void 0 !== l && clearTimeout(l), (v = 0), (s = h = u = l = void 0)
          }),
          (T.flush = function () {
            return void 0 === l ? d : j(i())
          }),
          T
        )
      }
    },
    218: (t) => {
      t.exports = function (t) {
        var n = typeof t
        return null != t && ("object" == n || "function" == n)
      }
    },
    5: (t) => {
      t.exports = function (t) {
        return null != t && "object" == typeof t
      }
    },
    448: (t, n, e) => {
      var o = e(239),
        i = e(5)
      t.exports = function (t) {
        return "symbol" == typeof t || (i(t) && "[object Symbol]" == o(t))
      }
    },
    771: (t, n, e) => {
      var o = e(639)
      t.exports = function () {
        return o.Date.now()
      }
    },
    841: (t, n, e) => {
      var o = e(561),
        i = e(218),
        r = e(448),
        a = /^[-+]0x[0-9a-f]+$/i,
        c = /^0b[01]+$/i,
        s = /^0o[0-7]+$/i,
        u = parseInt
      t.exports = function (t) {
        if ("number" == typeof t) return t
        if (r(t)) return NaN
        if (i(t)) {
          var n = "function" == typeof t.valueOf ? t.valueOf() : t
          t = i(n) ? n + "" : n
        }
        if ("string" != typeof t) return 0 === t ? t : +t
        t = o(t)
        var e = c.test(t)
        return e || s.test(t) ? u(t.slice(2), e ? 2 : 8) : a.test(t) ? NaN : +t
      }
    },
  },
  n = {}
function e(o) {
  var i = n[o]
  if (void 0 !== i) return i.exports
  var r = (n[o] = { exports: {} })
  return t[o](r, r.exports, e), r.exports
}
;(e.g = (function () {
  if ("object" == typeof globalThis) return globalThis
  try {
    return this || new Function("return this")()
  } catch (t) {
    if ("object" == typeof window) return window
  }
})()),
  (() => {
    function t() {}
    var n = e(279)
    async function o(t) {
      return new Promise((n, e) => {
        const o = new Image()
        ;(o.onload = () => n(o)), (o.onerror = e), (o.src = t)
      })
    }
    const i = 100,
      r = { x: 0, y: 25 }
    let a,
      c = [],
      s = 0,
      u = 0,
      f = 25
    for (; f < window.innerHeight; ) {
      const t = { x: d(), y: f }
      c.push(t), (f = l(f))
    }
    function d() {
      const t = window.innerWidth / 2 - i
      return (
        (n = -t),
        (e = t),
        (n = Math.floor(n)),
        (e = Math.floor(e)),
        n + Math.floor(Math.random() * (e - n + 1))
      )
      var n, e
    }
    function l(t) {
      return t + 120 - 20
    }
    function h(t) {
      a = { startFrame: t, endFrame: t + 120 }
    }
    function v({ canvas: t, context: n }, e, o) {
      n.beginPath()
      const { x: r, y: a } = (function ({ canvas: t }, n) {
        return {
          x: n.x - 50 + window.innerWidth / 2,
          y: window.innerHeight - n.y + s,
        }
      })({ canvas: t }, e)
      n.drawImage(o, r, a, i, 25), n.stroke()
    }
    ;(async function () {
      const e = await o("jumpy.png"),
        i = await o("platform.png"),
        { canvas: f, context: w } = (function ({
          onDevicePixelRatioOrDocumentSizeChange: e,
          afterCanvasSizeAndScaleSet: o,
        } = {}) {
          e || (e = t), o || (o = t)
          const i = document.createElement("canvas"),
            r = i.getContext("2d"),
            a = window.innerWidth,
            c = window.innerHeight,
            s = window.devicePixelRatio
          ;(i.style.width = `${a}px`),
            (i.style.height = `${c}px`),
            (i.width = s * a),
            (i.height = s * c),
            r.scale(s, s)
          const u = n(function () {
              const t = parseInt(i.style.width, 10),
                n = window.innerWidth,
                e = parseInt(i.style.height, 10),
                a = window.innerHeight,
                c = window.devicePixelRatio
              if (n > t || a > e) {
                const { canvas: o, context: s } = (function (
                  t,
                  n,
                  { x: e, y: o, width: i, height: r },
                ) {
                  const a = document.createElement("canvas")
                  ;(a.width = i - e), (a.height = r - o)
                  const c = a.getContext("2d")
                  return (
                    c.putImageData(n.getImageData(e, o, i, r), 0, 0),
                    { canvas: a, context: c }
                  )
                })(0, r, { x: 0, y: 0, width: i.width, height: i.height })
                n > t && ((i.style.width = `${n}px`), (i.width = c * n)),
                  a > e && ((i.style.height = `${a}px`), (i.height = c * a)),
                  r.resetTransform(),
                  r.scale(c, c),
                  r.putImageData(s.getImageData(0, 0, o.width, o.height), 0, 0)
              }
              o()
            }, 200),
            f = (function (t) {
              let n
              function e(n) {
                i(), o(), t(n)
              }
              function o() {
                ;(n = matchMedia(
                  `(resolution: ${window.devicePixelRatio}dppx)`,
                )),
                  n.addEventListener("change", e)
              }
              function i() {
                n.removeEventListener("change", e)
              }
              return o(), i
            })(d)
          function d(t) {
            u(), e(t)
          }
          return (
            window.addEventListener("resize", d),
            {
              canvas: i,
              context: r,
              removeEventListeners: function () {
                u.cancel(), f(), window.removeEventListener("resize", d)
              },
            }
          )
        })()
      document.body.appendChild(f)
      let x = null
      document.addEventListener("mousemove", (t) => {
        ;(x = t.pageX), (r.x = x - 0.5 * window.innerWidth)
      })
      let p = 0
      const { stop: g } = (function (t) {
        let n,
          o = !1
        function x() {
          if (!o) {
            const t = Date.now()
            ;(() => {
              if (((p += 1), r.y - s <= 0))
                !(function ({ canvas: t, context: n }) {
                  n.save(), (n.font = "64px sans-serif"), n.beginPath()
                  const e = "Game over!",
                    o = n.measureText(e)
                  n.fillText(
                    e,
                    window.innerWidth / 2 - 0.5 * o.width,
                    window.innerHeight / 2 +
                      0.5 *
                        (o.actualBoundingBoxAscent +
                          o.actualBoundingBoxDescent),
                  ),
                    (n.fillStyle = "red"),
                    n.fillRect(
                      window.innerWidth / 2,
                      window.innerHeight / 2,
                      1,
                      1,
                    ),
                    n.restore()
                })({ canvas: f, context: w }),
                  g()
              else {
                if ((u > s && (s += 1), a))
                  (r.y += 1), p >= a.endFrame && (a = null)
                else {
                  const t = c.find(
                    (t) => t.y === r.y && t.x - 50 <= r.x && r.x <= t.x + 50,
                  )
                  if (t) {
                    u = t.y - 25 - 20
                    const n = c[c.length - 1],
                      e = (window.innerWidth, d())
                    c.push({ x: e, y: l(n.y) }), h(p)
                  } else r.y -= 1
                }
                !(function ({ canvas: t, context: n }) {
                  n.clearRect(0, 0, t.width, t.height)
                })({ canvas: f, context: w })
                for (const t of c) v({ canvas: f, context: w }, t, i)
                ;(function ({ canvas: t, context: n }, e, o) {
                  n.beginPath()
                  const { x: i, y: r } = (function ({ canvas: t }, n) {
                    return {
                      x: n.x - 25 + window.innerWidth / 2,
                      y: window.innerHeight - n.y - 100 + s,
                    }
                  })({ canvas: t }, e)
                  n.drawImage(o, i, r, 50, 100), n.stroke()
                })({ canvas: f, context: w }, r, e),
                  (c = c.filter((t) => t.y > s))
              }
            })(),
              (n = t),
              y()
          }
        }
        function y() {
          requestAnimationFrame(x)
        }
        return (
          y(),
          {
            stop: function () {
              o = !0
            },
          }
        )
      })()
      h(p)
    })().then(console.log, console.error)
  })()
//# sourceMappingURL=index.js.map
