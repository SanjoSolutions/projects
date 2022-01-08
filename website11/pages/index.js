import { render as renderLayout } from '../layouts/default.js'

export function render(renderer) {
  return renderLayout(renderer, {
    title: 'Home',
    content: `
                <div class="starter-template">
                    <h1>Home</h1>
                    <p class="lead">Use this document as a way to quickly start any new project.<br> All you get is this text and a
                        mostly barebones HTML document.</p>
                
                    <p>Lorem ipsum und so weiter…</p>
                
                    <div class="row text-left">
                        <div class="col-3">Hello</div>
                        <div class="col">What's up.</div>
                    </div>
                
                    <div class="row text-center mb-3">
                        <div class="col-md mb-2 mb-md-0">A</div>
                        <div class="col-md mb-2 mb-md-0">B</div>
                        <div class="col-md">C</div>
                    </div>
                
                    <div class="row row-cols-1 row-cols-md-2 justify-content-center" style="max-width: 690px;">
                    ${`<div class="col mb-3">
                        <div class="card">
                            <div class="pt-3 pr-3 pl-3">
                                <img src="assets/img/heart.png" class="card-img-top" alt="Heart">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>`.repeat(9)}
                    </div>
                </div>
            `,
  })
}
