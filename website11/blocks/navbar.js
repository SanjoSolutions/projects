export function render(renderer) {
  function navbarActive(navbarItemPagePath) {
    return navbarItemPagePath === renderer.getPagePath() ? "active" : ""
  }

  return `
        <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
                    aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        
            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item ${navbarActive("index.js")}">
                        <a class="nav-link" href="/index.html">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item ${navbarActive("about.js")}">
                        <a class="nav-link" href="/about.html">About</a>
                    </li>
                    <li class="nav-item ${navbarActive("products/index.js")}">
                        <a class="nav-link" href="/products/index.html">Products</a>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
                    <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    `
}
