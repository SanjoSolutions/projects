function l(...l) {
  return [].concat(...l)
}
function* n(l, n, u = 1) {
  for (let e = l; e <= n; e += u) yield e
}
function u(l) {
  let n = [[]]
  for (const u of l) {
    const l = []
    for (const e of n) {
      const [n, t, r] = u
      for (let u = n; u <= t; u += r) {
        const n = [...e, u]
        l.push(n)
      }
    }
    n = l
  }
  return n
}
function e(l, ...n) {
  const u = new Set(l)
  for (const l of n) for (const n of l) u.delete(n)
  return u
}
new Map()
class t {
  _cache
  constructor() {
    this._cache = new Map()
  }
  has(l) {
    return Boolean(this._retrieveValue(l, () => !1))
  }
  retrieve(l) {
    return this._retrieveValue(l, () => {
      throw new Error('Failed to retrieve value.')
    })
  }
  set(l, n) {
    l = this._convertKeyToArray(l)
    let u = this._cache
    for (const n of l.slice(0, l.length - 1))
      if (u instanceof Map && u.has(n)) u = u.get(n)
      else {
        const l = new Map()
        u.set(n, l), (u = l)
      }
    u.set(
      (function (l) {
        const n = l.length
        return n >= 1 ? l[n - 1] : null
      })(l),
      n
    )
  }
  clear() {
    this._cache = new Map()
  }
  _convertKeyToArray(l) {
    let n
    return (n = Array.isArray(l) ? l : [l]), n
  }
  _retrieveValue(l, n) {
    l = this._convertKeyToArray(l)
    let u = this._cache
    for (const e of l) {
      if (!(u instanceof Map && u.has(e))) return n()
      u = u.get(e)
    }
    return u
  }
}
class r {
  _cache = new t()
  has(l) {
    const n = this._convertKeyToArray(l)
    return this._cache.has(n)
  }
  get(l) {
    const n = this._convertKeyToArray(l)
    try {
      return this._cache.retrieve(n)
    } catch (l) {
      if ('Failed to retrieve value.' === l.message) return null
      throw l
    }
  }
  set(l, n) {
    const u = this._convertKeyToArray(l)
    this._cache.set(u, n)
  }
  clear() {
    this._cache.clear()
  }
  _convertKeyToArray(l) {
    return this._convertKeyObjectToArray(l)
  }
  _convertKeyObjectToArray(l) {
    const n = Object.keys(l)
    return n.sort(), n.map(n => l[n])
  }
}
function o(...l) {
  const n = new Set()
  for (const u of l) for (const l of u) n.add(l)
  return n
}
new r(), new r()
function c(l) {
  const n = l.querySelectorAll('input'),
    u = new Array()
  for (let l = 0; l < 9; l++) {
    const e = new Array()
    u.push(e)
    for (let u = 0; u < 9; u++) {
      const t = n[9 * l + u].value,
        r = t ? Number(t) : 0
      e.push(r)
    }
  }
  return u
}
function s(l) {
  const n = document.createElement('table'),
    u = document.createElement('tbody')
  n.appendChild(u)
  for (let n = 0; n < 3; n++) {
    const e = document.createElement('tr')
    for (let u = 0; u < 3; u++) {
      const t = document.createElement('td'),
        r = 3 * n + u + 1
      ;(t.innerHTML = l && l.includes(r) ? r : '&nbsp;'), e.appendChild(t)
    }
    u.appendChild(e)
  }
  return n
}
function a(n) {
  const u = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ]
  for (let t = 0; t < n.length; t++)
    for (let r = 0; r < n[t].length; r++)
      n[t][r] ||
        (u[t][r] = [
          ...e(
            new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            o(o(new Set(h(n, t)), new Set(m(n, r))), new Set(l(...p(n, t, r))))
          ),
        ])
  for (let l = 0; l < u.length; l++)
    for (let n = 0; n < u[l].length; n++)
      for (let t = n + 1; t < u[l].length; t++) {
        const r = u[l][n],
          c = u[l][t]
        if (r && c && 2 === r.length && 2 === c.length && 2 === o(r, c).size) {
          for (let n = 0; n < u[l].length; n++) {
            const t = u[l][n]
            t && t !== r && t !== c && (u[l][n] = Array.from(e(t, new Set(r))))
          }
          if (g({ rowIndex: l, columnIndex: n }, { rowIndex: l, columnIndex: t })) {
            const o = y(l),
              c = w(n)
            for (let s = 0; s < 3; s++)
              for (let a = 0; a < 3; a++) {
                const i = o + s,
                  d = c + a
                u[i][d] &&
                  !((i === l && d === n) || (i === l && d === t)) &&
                  (u[i][d] = Array.from(e(u[i][d], new Set(r))))
              }
          }
        }
      }
  for (let l = 0; l < u[0].length; l++)
    for (let n = 0; n < u.length; n++)
      for (let t = n + 1; t < u.length; t++) {
        const r = u[n][l],
          c = u[t][l]
        if (r && c && 2 === r.length && 2 === c.length && 2 === o(r, c).size)
          for (let n = 0; n < u.length; n++) {
            const t = u[n][l]
            t && t !== r && t !== c && (u[n][l] = Array.from(e(t, new Set(r))))
          }
      }
  return u
}
function i(l, n, u) {
  const e = [...h(l, n)]
  return e.splice(u, 1), e
}
function d(l, n, u) {
  const e = [...m(l, u)]
  return e.splice(n, 1), e
}
function f(l, n, u) {
  const e = p(l, n, u)
  return (e[n % 3] = [...e[n % 3]]), e[n % 3].splice(u % 3, 1, null), e
}
function h(l, n) {
  return l[n]
}
function m(l, n) {
  const u = l.length,
    e = new Array(u)
  for (let t = 0; t < u; t++) e[t] = l[t][n]
  return e
}
function p(l, n, u) {
  ;(n = y(n)), (u = w(u))
  const e = new Array(3)
  for (let t = 0; t < 3; t++) {
    e[t] = new Array(3)
    for (let r = 0; r < 3; r++) e[t][r] = l[n + t][u + r]
  }
  return e
}
function y(l) {
  return 3 * Math.floor(l / 3)
}
function w(l) {
  return 3 * Math.floor(l / 3)
}
function g(l, n) {
  const { rowIndex: u, columnIndex: e } = l,
    { rowIndex: t, columnIndex: r } = n
  return y(u) === y(t) && w(e) === w(r)
}
function v(l) {
  if (_(l)) return l
  const n = a(l)
  if (
    (function (l, n) {
      return u([
        [0, 8, 1],
        [0, 8, 1],
      ]).every(([u, e]) => !(!l[u][e] && !n[u][e]))
    })(l, n)
  ) {
    let u
    u = l[0][0] ? C(l, 0, 0) : { row: 0, column: 0 }
    const e = (function (l) {
      return l.map(l => Array.from(l))
    })(l)
    return E(l, e, n, u.row, u.column)
  }
  return null
}
function E(l, n, u, e, t) {
  const r = (function (...l) {
    const n = new Set(l[0])
    for (const u of l.slice(1)) for (const l of u) n.delete(l)
    return n
  })(new Set(u[e][t]), h(n, e), m(n, t), p(n, e, t))
  if (r.size >= 1) {
    const o = C(l, e, t)
    for (const c of r)
      if (((n[e][t] = c), o)) {
        const e = E(l, n, u, o.row, o.column)
        if (e) return e
      } else if (_(n)) return n
  }
  return (n[e][t] = null), null
}
function C(l, n, u) {
  const e =
    (function (l, n) {
      return 9 * l + n
    })(n, u) + 1
  for (let n = e; n < 81; n++) {
    const { row: u, column: e } = S(n)
    if (!l[u][e]) return { row: u, column: e }
  }
  return null
}
function S(l) {
  return { row: Math.floor(l / 9), column: l % 9 }
}
function _(l) {
  return (
    (function (l) {
      return [...n(0, 8)].map(n => h(l, n))
    })(l).every(b) &&
    (function (l) {
      return [...n(0, 8)].map(n => m(l, n))
    })(l).every(A) &&
    (function (l) {
      return u([
        [0, 8, 3],
        [0, 8, 3],
      ]).map(([n, u]) => p(l, n, u).flat())
    })(l).every(L)
  )
}
function b(l) {
  return x(l)
}
function A(l) {
  return x(l)
}
function L(l) {
  return x(l)
}
const T = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])
function x(l) {
  return 9 === new Set(l).size && l.every(l => T.has(l))
}
let M
const I = localStorage.getItem('sudoku')
M = I
  ? JSON.parse(I)
  : [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
let k = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ],
  K = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ]
function N() {
  document.body.innerHTML = ''
  const n = document.createElement('div')
  n.classList.add('row')
  const u = document.createElement('div')
  u.classList.add('column')
  const e = document.createElement('div')
  e.classList.add('column')
  const t = document.createElement('div')
  t.classList.add('column'), n.append(u, e, t), document.body.appendChild(n)
  const r = (function (l) {
    const n = document.createElement('table')
    n.classList.add('sudoku'), n.classList.add('sudoku-input')
    const u = document.createElement('tbody')
    n.appendChild(u)
    for (let n = 0; n < l.length; n++) {
      const e = document.createElement('tr')
      for (let u = 0; u < l[n].length; u++) {
        const t = document.createElement('td'),
          r = document.createElement('input')
        r.maxLength = 1
        const o = l[n][u]
        0 !== o && (r.value = o), t.appendChild(r), e.appendChild(t)
      }
      u.appendChild(e)
    }
    return n
  })(M)
  ;(r.querySelector('input').autofocus = !0), u.appendChild(r), u.appendChild(document.createElement('br'))
  const o = document.createElement('button')
  ;(o.innerText = 'Next'),
    (o.style.marginRight = '0.5rem'),
    o.addEventListener('click', () => {
      ;(M = c(r)),
        (k = a(M)),
        (K = (function (n) {
          const u = [
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
          ]
          for (let e = 0; e < n.length; e++)
            for (let t = 0; t < n[e].length; t++)
              if (n[e][t]) {
                const r = n[e][t]
                let o
                if (1 === r.length) o = r[0]
                else {
                  const u = new Set(l(...i(n, e, t))),
                    c = new Set(l(...d(n, e, t))),
                    s = new Set(l(...l(...f(n, e, t))))
                  o = r.find(l => !u.has(l) || !c.has(l) || !s.has(l))
                }
                o && (u[e][t] = o)
              }
          return u
        })(k)),
        (M = (function (l, n) {
          l = [...l]
          for (let u = 0; u < l.length; u++) for (let e = 0; e < l[u].length; e++) n[u][e] && (l[u][e] = n[u][e])
          return l
        })(M, K)),
        N()
    }),
    u.appendChild(o)
  const h = document.createElement('button')
  ;(h.innerText = 'Brute force'),
    h.addEventListener('click', () => {
      const l = v(M)
      l && ((K = l.map((l, n) => l.map((l, u) => (M[n][u] ? null : l)))), (M = l)), N()
    }),
    u.appendChild(h),
    e.appendChild(
      (function (l) {
        const n = document.createElement('table')
        n.classList.add('sudoku')
        const u = document.createElement('tbody')
        n.appendChild(u)
        for (let n = 0; n < l.length; n++) {
          const e = document.createElement('tr')
          for (let u = 0; u < l[n].length; u++) {
            const t = document.createElement('td'),
              r = l[n][u]
            0 === r ? (t.innerHTML = '&nbsp;') : (t.innerText = r), e.appendChild(t)
          }
          u.appendChild(e)
        }
        return n
      })(K)
    ),
    t.appendChild(
      (function (l) {
        const n = document.createElement('table')
        n.classList.add('possible-numbers')
        const u = document.createElement('tbody')
        n.appendChild(u)
        for (let n = 0; n < l.length; n++) {
          const e = document.createElement('tr')
          for (let u = 0; u < l[n].length; u++) {
            const t = document.createElement('td')
            t.appendChild(s(l[n][u])), e.appendChild(t)
          }
          u.appendChild(e)
        }
        return n
      })(k)
    ),
    document.addEventListener('keyup', function (l) {
      'INPUT' === l.target.tagName && localStorage.setItem('sudoku', JSON.stringify(c(r)))
    })
}
document.addEventListener('DOMContentLoaded', () => {
  N()
})
//# sourceMappingURL=index.js.map