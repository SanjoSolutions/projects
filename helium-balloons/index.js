var t = {
    705: (t, e, n) => {
      var o = n(639).Symbol;
      t.exports = o;
    },
    239: (t, e, n) => {
      var o = n(705),
        i = n(607),
        r = n(333),
        a = o ? o.toStringTag : void 0;
      t.exports = function (t) {
        return null == t
          ? void 0 === t
            ? "[object Undefined]"
            : "[object Null]"
          : a && a in Object(t)
          ? i(t)
          : r(t);
      };
    },
    561: (t, e, n) => {
      var o = n(990),
        i = /^\s+/;
      t.exports = function (t) {
        return t ? t.slice(0, o(t) + 1).replace(i, "") : t;
      };
    },
    957: (t, e, n) => {
      var o = "object" == typeof n.g && n.g && n.g.Object === Object && n.g;
      t.exports = o;
    },
    607: (t, e, n) => {
      var o = n(705),
        i = Object.prototype,
        r = i.hasOwnProperty,
        a = i.toString,
        c = o ? o.toStringTag : void 0;
      t.exports = function (t) {
        var e = r.call(t, c),
          n = t[c];
        try {
          t[c] = void 0;
          var o = !0;
        } catch (t) {}
        var i = a.call(t);
        return o && (e ? (t[c] = n) : delete t[c]), i;
      };
    },
    333: (t) => {
      var e = Object.prototype.toString;
      t.exports = function (t) {
        return e.call(t);
      };
    },
    639: (t, e, n) => {
      var o = n(957),
        i = "object" == typeof self && self && self.Object === Object && self,
        r = o || i || Function("return this")();
      t.exports = r;
    },
    990: (t) => {
      var e = /\s/;
      t.exports = function (t) {
        for (var n = t.length; n-- && e.test(t.charAt(n)); );
        return n;
      };
    },
    279: (t, e, n) => {
      var o = n(218),
        i = n(771),
        r = n(841),
        a = Math.max,
        c = Math.min;
      t.exports = function (t, e, n) {
        var u,
          s,
          f,
          h,
          l,
          d,
          v = 0,
          p = !1,
          w = !1,
          x = !0;
        if ("function" != typeof t) throw new TypeError("Expected a function");
        function g(e) {
          var n = u,
            o = s;
          return (u = s = void 0), (v = e), (h = t.apply(o, n));
        }
        function y(t) {
          return (v = t), (l = setTimeout(b, e)), p ? g(t) : h;
        }
        function m(t) {
          var n = t - d;
          return void 0 === d || n >= e || n < 0 || (w && t - v >= f);
        }
        function b() {
          var t = i();
          if (m(t)) return M(t);
          l = setTimeout(
            b,
            (function (t) {
              var n = e - (t - d);
              return w ? c(n, f - (t - v)) : n;
            })(t)
          );
        }
        function M(t) {
          return (l = void 0), x && u ? g(t) : ((u = s = void 0), h);
        }
        function j() {
          var t = i(),
            n = m(t);
          if (((u = arguments), (s = this), (d = t), n)) {
            if (void 0 === l) return y(d);
            if (w) return clearTimeout(l), (l = setTimeout(b, e)), g(d);
          }
          return void 0 === l && (l = setTimeout(b, e)), h;
        }
        return (
          (e = r(e) || 0),
          o(n) &&
            ((p = !!n.leading),
            (f = (w = "maxWait" in n) ? a(r(n.maxWait) || 0, e) : f),
            (x = "trailing" in n ? !!n.trailing : x)),
          (j.cancel = function () {
            void 0 !== l && clearTimeout(l), (v = 0), (u = d = s = l = void 0);
          }),
          (j.flush = function () {
            return void 0 === l ? h : M(i());
          }),
          j
        );
      };
    },
    218: (t) => {
      t.exports = function (t) {
        var e = typeof t;
        return null != t && ("object" == e || "function" == e);
      };
    },
    5: (t) => {
      t.exports = function (t) {
        return null != t && "object" == typeof t;
      };
    },
    448: (t, e, n) => {
      var o = n(239),
        i = n(5);
      t.exports = function (t) {
        return "symbol" == typeof t || (i(t) && "[object Symbol]" == o(t));
      };
    },
    771: (t, e, n) => {
      var o = n(639);
      t.exports = function () {
        return o.Date.now();
      };
    },
    841: (t, e, n) => {
      var o = n(561),
        i = n(218),
        r = n(448),
        a = /^[-+]0x[0-9a-f]+$/i,
        c = /^0b[01]+$/i,
        u = /^0o[0-7]+$/i,
        s = parseInt;
      t.exports = function (t) {
        if ("number" == typeof t) return t;
        if (r(t)) return NaN;
        if (i(t)) {
          var e = "function" == typeof t.valueOf ? t.valueOf() : t;
          t = i(e) ? e + "" : e;
        }
        if ("string" != typeof t) return 0 === t ? t : +t;
        t = o(t);
        var n = c.test(t);
        return n || u.test(t) ? s(t.slice(2), n ? 2 : 8) : a.test(t) ? NaN : +t;
      };
    },
  },
  e = {};
function n(o) {
  var i = e[o];
  if (void 0 !== i) return i.exports;
  var r = (e[o] = { exports: {} });
  return t[o](r, r.exports, n), r.exports;
}
(n.g = (function () {
  if ("object" == typeof globalThis) return globalThis;
  try {
    return this || new Function("return this")();
  } catch (t) {
    if ("object" == typeof window) return window;
  }
})()),
  (() => {
    function t(t, e) {
      return (
        (t = Math.floor(t)),
        (e = Math.floor(e)),
        t + Math.floor(Math.random() * (e - t + 1))
      );
    }
    function e(t) {
      t = Array.isArray(t)
        ? { hue: t[0], saturation: t[1], lightness: t[2], alpha: t[3] }
        : { ...t, hue: t.hue / 360 };
      const { hue: e, saturation: n, lightness: o, alpha: i } = t;
      return i
        ? `hsla(${Math.round(360 * e)}, ${Math.round(100 * n)}%, ${Math.round(
            100 * o
          )}%, ${i})`
        : `hsl(${Math.round(360 * e)}, ${Math.round(100 * n)}%, ${Math.round(
            100 * o
          )}%)`;
    }
    function o() {}
    var i = n(279);
    const r = 23.4375,
      a = 29.625,
      c = 74.0625,
      { canvas: u, context: s } = (function ({
        onDevicePixelRatioOrDocumentSizeChange: t,
        afterCanvasSizeAndScaleSet: e,
      } = {}) {
        t || (t = o), e || (e = o);
        const n = document.createElement("canvas"),
          r = n.getContext("2d"),
          a = window.innerWidth,
          c = window.innerHeight,
          u = window.devicePixelRatio;
        (n.style.width = `${a}px`),
          (n.style.height = `${c}px`),
          (n.width = u * a),
          (n.height = u * c),
          r.scale(u, u);
        const s = i(function () {
            const t = parseInt(n.style.width, 10),
              o = window.innerWidth,
              i = parseInt(n.style.height, 10),
              a = window.innerHeight,
              c = window.devicePixelRatio;
            if (o > t || a > i) {
              const { canvas: e, context: u } = (function (
                t,
                e,
                { x: n, y: o, width: i, height: r }
              ) {
                const a = document.createElement("canvas");
                (a.width = i - n), (a.height = r - o);
                const c = a.getContext("2d");
                return (
                  c.putImageData(e.getImageData(n, o, i, r), 0, 0),
                  { canvas: a, context: c }
                );
              })(0, r, { x: 0, y: 0, width: n.width, height: n.height });
              o > t && ((n.style.width = `${o}px`), (n.width = c * o)),
                a > i && ((n.style.height = `${a}px`), (n.height = c * a)),
                r.resetTransform(),
                r.scale(c, c),
                r.putImageData(u.getImageData(0, 0, e.width, e.height), 0, 0);
            }
            e();
          }, 200),
          f = (function (t) {
            let e;
            function n(e) {
              i(), o(), t(e);
            }
            function o() {
              (e = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)),
                e.addEventListener("change", n);
            }
            function i() {
              e.removeEventListener("change", n);
            }
            return o(), i;
          })(h);
        function h(e) {
          s(), t(e);
        }
        return (
          window.addEventListener("resize", h),
          {
            canvas: n,
            context: r,
            removeEventListeners: function () {
              s.cancel(), f(), window.removeEventListener("resize", h);
            },
          }
        );
      })();
    document.body.appendChild(u);
    let f = 0,
      h = 1,
      l = [];
    function d() {
      for (let t = 0; t < h; t++) v();
    }
    function v() {
      const n = window.innerWidth,
        o = { hue: t(0, 359), saturation: 0.9, lightness: 0.5, alpha: 0.9 },
        i = {
          x: t(r, n - 1 - r),
          y: -29.625,
          color: e(o),
          speed: (5, 10, 5 + 6 * Math.random()),
        };
      l.push(i);
    }
    d(),
      (function (t) {
        let e;
        function n() {
          {
            const t = Date.now();
            ((t) => {
              s.clearRect(0, 0, u.width, u.height);
              for (const t of l) w(t);
              for (const e of l)
                (e.y += e.speed * (t / 1e3)),
                  (e.x += (t / 1e3) * 3 * Math.cos(0)),
                  (e.y += (t / 1e3) * 3 * Math.sin(0));
              const e = window.innerWidth,
                n = window.innerHeight,
                o = e + r,
                i = n + a + c;
              l = l.filter(
                ({ x: t, y: e }) =>
                  -23.4375 <= t && t <= o && -29.625 <= e && e <= i
              );
            })(t - (e || t)),
              (e = t),
              o();
          }
        }
        function o() {
          requestAnimationFrame(n);
        }
        o();
      })(),
      setInterval(() => {
        v();
      }, 5e3),
      u.addEventListener("mousedown", (t) => {
        const e = window.innerHeight,
          n = t.offsetX,
          o = e - t.offsetY,
          i = l.findIndex(
            (t) => t.x - r <= n && n <= t.x + r && t.y - a <= o && o <= t.y + a
          );
        -1 !== i && (l.splice(i, 1), f++, (h = 1 + Math.floor(f / 10)), d());
      });
    const p = (function () {
      const t = new Path2D();
      return (
        t.ellipse(0, 0, r, a, 0, 0, 2 * Math.PI),
        t.moveTo(0, a),
        t.lineTo(0, 103.6875),
        t
      );
    })();
    function w({ x: t, y: e, color: n }) {
      (s.fillStyle = n),
        (function ({ x: t, y: e }, n) {
          s.save(),
            window.devicePixelRatio,
            s.translate(t, e),
            s.fill(p),
            s.stroke(p),
            s.restore();
        })({ x: t, y: window.innerHeight - e });
    }
  })();
//# sourceMappingURL=index.js.map
