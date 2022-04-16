function l(...l) {
  return [].concat(...l)
}
function* n(l, n, e = 1) {
  for (let u = l; u <= n; u += e) yield u
}
function e(l) {
  let n = [[]]
  for (const e of l) {
    const l = []
    for (const u of n) {
      const [n, t, r] = e
      for (let e = n; e <= t; e += r) {
        const n = [...u, e]
        l.push(n)
      }
    }
    n = l
  }
  return n
}
function u(l, ...n) {
  const e = new Set(l)
  for (const l of n) for (const n of l) e.delete(n)
  return e
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
    let e = this._cache
    for (const n of l.slice(0, l.length - 1))
      if (e instanceof Map && e.has(n)) e = e.get(n)
      else {
        const l = new Map()
        e.set(n, l), (e = l)
      }
    e.set(
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
    let e = this._cache
    for (const u of l) {
      if (!(e instanceof Map && e.has(u))) return n()
      e = e.get(u)
    }
    return e
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
    const e = this._convertKeyToArray(l)
    this._cache.set(e, n)
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
  for (const e of l) for (const l of e) n.add(l)
  return n
}
new r(), new r()
const c = [
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
function s(l) {
  const n = l.querySelectorAll('input'),
    e = new Array()
  for (let l = 0; l < 9; l++) {
    const u = new Array()
    e.push(u)
    for (let e = 0; e < 9; e++) {
      const t = n[9 * l + e].value,
        r = t ? Number(t) : 0
      u.push(r)
    }
  }
  return e
}
function a(l) {
  const n = document.createElement('table'),
    e = document.createElement('tbody')
  n.appendChild(e)
  for (let n = 0; n < 3; n++) {
    const u = document.createElement('tr')
    for (let e = 0; e < 3; e++) {
      const t = document.createElement('td'),
        r = 3 * n + e + 1
      ;(t.innerHTML = l && l.includes(r) ? r : '&nbsp;'), u.appendChild(t)
    }
    e.appendChild(u)
  }
  return n
}
function i(n) {
  const e = [
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
        (e[t][r] = [
          ...u(
            new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            o(o(new Set(m(n, t)), new Set(p(n, r))), new Set(l(...y(n, t, r))))
          ),
        ])
  for (let l = 0; l < e.length; l++)
    for (let n = 0; n < e[l].length; n++)
      for (let t = n + 1; t < e[l].length; t++) {
        const r = e[l][n],
          c = e[l][t]
        if (r && c && 2 === r.length && 2 === c.length && 2 === o(r, c).size) {
          for (let n = 0; n < e[l].length; n++) {
            const t = e[l][n]
            t && t !== r && t !== c && (e[l][n] = Array.from(u(t, new Set(r))))
          }
          if (v({ rowIndex: l, columnIndex: n }, { rowIndex: l, columnIndex: t })) {
            const o = g(l),
              c = w(n)
            for (let s = 0; s < 3; s++)
              for (let a = 0; a < 3; a++) {
                const i = o + s,
                  d = c + a
                e[i][d] &&
                  !((i === l && d === n) || (i === l && d === t)) &&
                  (e[i][d] = Array.from(u(e[i][d], new Set(r))))
              }
          }
        }
      }
  for (let l = 0; l < e[0].length; l++)
    for (let n = 0; n < e.length; n++)
      for (let t = n + 1; t < e.length; t++) {
        const r = e[n][l],
          c = e[t][l]
        if (r && c && 2 === r.length && 2 === c.length && 2 === o(r, c).size)
          for (let n = 0; n < e.length; n++) {
            const t = e[n][l]
            t && t !== r && t !== c && (e[n][l] = Array.from(u(t, new Set(r))))
          }
      }
  return e
}
function d(l, n, e) {
  const u = [...m(l, n)]
  return u.splice(e, 1), u
}
function f(l, n, e) {
  const u = [...p(l, e)]
  return u.splice(n, 1), u
}
function h(l, n, e) {
  const u = y(l, n, e)
  return (u[n % 3] = [...u[n % 3]]), u[n % 3].splice(e % 3, 1, null), u
}
function m(l, n) {
  return l[n]
}
function p(l, n) {
  const e = l.length,
    u = new Array(e)
  for (let t = 0; t < e; t++) u[t] = l[t][n]
  return u
}
function y(l, n, e) {
  ;(n = g(n)), (e = w(e))
  const u = new Array(3)
  for (let t = 0; t < 3; t++) {
    u[t] = new Array(3)
    for (let r = 0; r < 3; r++) u[t][r] = l[n + t][e + r]
  }
  return u
}
function g(l) {
  return 3 * Math.floor(l / 3)
}
function w(l) {
  return 3 * Math.floor(l / 3)
}
function v(l, n) {
  const { rowIndex: e, columnIndex: u } = l,
    { rowIndex: t, columnIndex: r } = n
  return g(e) === g(t) && w(u) === w(r)
}
function E(l) {
  if (C(l)) return l
  const n = i(l)
  if (
    (function (l, n) {
      return e([
        [0, 8, 1],
        [0, 8, 1],
      ]).every(([e, u]) => !(!l[e][u] && !n[e][u]))
    })(l, n)
  ) {
    let e
    e = l[0][0] ? b(l, 0, 0) : { row: 0, column: 0 }
    const u = (function (l) {
      return l.map(l => Array.from(l))
    })(l)
    return S(l, u, n, e.row, e.column)
  }
  return null
}
function S(l, n, e, u, t) {
  const r = (function (...l) {
    const n = new Set(l[0])
    for (const e of l.slice(1)) for (const l of e) n.delete(l)
    return n
  })(new Set(e[u][t]), m(n, u), p(n, t), y(n, u, t))
  if (r.size >= 1) {
    const o = b(l, u, t)
    for (const c of r)
      if (((n[u][t] = c), o)) {
        const u = S(l, n, e, o.row, o.column)
        if (u) return u
      } else if (C(n)) return n
  }
  return (n[u][t] = null), null
}
function b(l, n, e) {
  const u =
    (function (l, n) {
      return 9 * l + n
    })(n, e) + 1
  for (let n = u; n < 81; n++) {
    const { row: e, column: u } = A(n)
    if (!l[e][u]) return { row: e, column: u }
  }
  return null
}
function A(l) {
  return { row: Math.floor(l / 9), column: l % 9 }
}
function C(l) {
  return (
    (function (l) {
      return [...n(0, 8)].map(n => m(l, n))
    })(l).every(_) &&
    (function (l) {
      return [...n(0, 8)].map(n => p(l, n))
    })(l).every(L) &&
    (function (l) {
      return e([
        [0, 8, 3],
        [0, 8, 3],
      ]).map(([n, e]) => y(l, n, e).flat())
    })(l).every(T)
  )
}
function _(l) {
  return k(l)
}
function L(l) {
  return k(l)
}
function T(l) {
  return k(l)
}
const x = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])
function k(l) {
  return 9 === new Set(l).size && l.every(l => x.has(l))
}
let I
const M = localStorage.getItem('sudoku')
I = M ? JSON.parse(M) : [...c]
let N = [
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
function O() {
  document.body.innerHTML = ''
  const n = document.createElement('div')
  n.classList.add('row')
  const e = document.createElement('div')
  e.classList.add('column')
  const u = document.createElement('div')
  u.classList.add('column')
  const t = document.createElement('div')
  t.classList.add('column'), n.append(e, u, t), document.body.appendChild(n)
  const r = (function (l) {
      const n = document.createElement('table')
      n.classList.add('sudoku'), n.classList.add('sudoku-input')
      const e = document.createElement('tbody')
      n.appendChild(e)
      for (let n = 0; n < l.length; n++) {
        const u = document.createElement('tr')
        for (let e = 0; e < l[n].length; e++) {
          const t = document.createElement('td'),
            r = document.createElement('input')
          ;(r.type = 'text'), (r.inputMode = 'numeric'), (r.pattern = '[1-9]'), (r.maxLength = 1)
          const o = l[n][e]
          0 !== o && (r.value = o), t.appendChild(r), u.appendChild(t)
        }
        e.appendChild(u)
      }
      return n
    })(I),
    m = r.querySelector('input')
  ;(m.autofocus = !0), e.appendChild(r), m.select(), e.appendChild(document.createElement('br'))
  const p = document.createElement('button')
  ;(p.innerText = 'Next'),
    (p.style.marginRight = '0.5rem'),
    p.addEventListener('click', () => {
      ;(I = s(r)),
        (N = i(I)),
        (K = (function (n) {
          const e = [
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
          for (let u = 0; u < n.length; u++)
            for (let t = 0; t < n[u].length; t++)
              if (n[u][t]) {
                const r = n[u][t]
                let o
                if (1 === r.length) o = r[0]
                else {
                  const e = new Set(l(...d(n, u, t))),
                    c = new Set(l(...f(n, u, t))),
                    s = new Set(l(...l(...h(n, u, t))))
                  o = r.find(l => !e.has(l) || !c.has(l) || !s.has(l))
                }
                o && (e[u][t] = o)
              }
          return e
        })(N)),
        (I = (function (l, n) {
          l = [...l]
          for (let e = 0; e < l.length; e++) for (let u = 0; u < l[e].length; u++) n[e][u] && (l[e][u] = n[e][u])
          return l
        })(I, K)),
        O()
    }),
    e.appendChild(p)
  const y = document.createElement('button')
  ;(y.innerText = 'Brute force'),
    (y.style.marginRight = '0.5rem'),
    y.addEventListener('click', () => {
      const l = E(I)
      l && ((K = l.map((l, n) => l.map((l, e) => (I[n][e] ? null : l)))), (I = l)), O()
    }),
    e.appendChild(y)
  const g = document.createElement('button')
  ;(g.innerText = 'Reset'),
    g.addEventListener('click', () => {
      ;(I = [...c]), O()
    }),
    e.appendChild(g),
    u.appendChild(
      (function (l) {
        const n = document.createElement('table')
        n.classList.add('sudoku')
        const e = document.createElement('tbody')
        n.appendChild(e)
        for (let n = 0; n < l.length; n++) {
          const u = document.createElement('tr')
          for (let e = 0; e < l[n].length; e++) {
            const t = document.createElement('td'),
              r = l[n][e]
            0 === r ? (t.innerHTML = '&nbsp;') : (t.innerText = r), u.appendChild(t)
          }
          e.appendChild(u)
        }
        return n
      })(K)
    ),
    t.appendChild(
      (function (l) {
        const n = document.createElement('table')
        n.classList.add('possible-numbers')
        const e = document.createElement('tbody')
        n.appendChild(e)
        for (let n = 0; n < l.length; n++) {
          const u = document.createElement('tr')
          for (let e = 0; e < l[n].length; e++) {
            const t = document.createElement('td')
            t.appendChild(a(l[n][e])), u.appendChild(t)
          }
          e.appendChild(u)
        }
        return n
      })(N)
    )
  const w = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9']),
    v = o(w, new Set(['Backspace', 'Tab', 'Delete'])),
    S = o(w, new Set(['Enter']))
  document.addEventListener('keydown', function (l) {
    const { target: n } = l
    'INPUT' !== n.tagName || v.has(l.key) || l.preventDefault()
  }),
    document.addEventListener('keyup', function (l) {
      const { target: n } = l
      if ('INPUT' === n.tagName && S.has(l.key)) {
        const e = parseInt(n.value, 10)
        if ((e >= 1 && e <= 9) || 'Enter' === l.key) {
          const l = (function (l) {
            const n = Array.from(r.querySelectorAll('input')),
              e = n.indexOf(l)
            if (-1 !== e) {
              const l = e + 1
              if (l < n.length) return n[l]
            }
            return null
          })(n)
          l && (l.focus(), l.select())
        }
        localStorage.setItem('sudoku', JSON.stringify(s(r)))
      }
    }),
    document.addEventListener('focusin', function (l) {
      const { target: n } = l
      'INPUT' === n.tagName && n.select()
    })
}
document.addEventListener('DOMContentLoaded', () => {
  O()
})
//# sourceMappingURL=index.js.map
