import React from 'react'
import type { Container } from 'react-dom'
import { render } from 'react-dom'
import { OS } from './OS.js'

export function renderOS(container: Container) {
  render(<OS />, container)
}
