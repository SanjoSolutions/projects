import { render as renderLayout } from "../../layouts/default.js"

export function render(renderer) {
  return renderLayout(renderer, {
    title: "Products",
    content: `
                <div class="starter-template">
                    <h1>Products</h1>
                    <p class="lead">Use this document as a way to quickly start any new project.<br> All you get is this text and a
                        mostly barebones HTML document.</p>
                </div>
            `,
  })
}
