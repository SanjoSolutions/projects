/*
 The MIT License (MIT)

 Copyright (c) 2016 Pawel

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

var db,
  keyValue = {
    k: "",
    v: "",
  },
  request = indexedDB.open("d2", 1)
request.onsuccess = function (evt) {
  db = this.result
}
request.onerror = function (event) {
  console.error("indexedDB request error")
  console.log(event)
}

request.onupgradeneeded = function (event) {
  db = null
  var store = event.target.result.createObjectStore("str", {
    keyPath: "k",
  })

  store.transaction.oncomplete = function (e) {
    db = e.target.db
  }
}

export function getValue(key, callback) {
  return new Promise(async (resolve) => {
    if (!db) {
      await wait(100)
    }
    db.transaction("str").objectStore("str").get(key).onsuccess = function (
      event
    ) {
      var result = (event.target.result && event.target.result.v) || null
      resolve(result)
    }
  })
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function setValue(key, value) {
  // no callback for set needed because every next transaction will be anyway executed after this one
  keyValue.k = key
  keyValue.v = value
  db.transaction("str", "readwrite").objectStore("str").put(keyValue)
}
