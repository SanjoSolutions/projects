import { useApp } from "@pixi/react"
import React, { useEffect } from "react"

export function B() {
  const app = useApp()

  useEffect(
    function () {
      async function f() {}

      f()
    },
    [app],
  )

  return <></>
}
