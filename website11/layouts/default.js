import { render as renderNavbar } from '../blocks/navbar.js'

export function render(renderer, { title, content }) {
  return `
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta name="description" content="">
            <meta name="author" content="">
            <title>${title ? title + ' | ' : ''}Website 1</title>
        
            <link rel="canonical" href="http://localhost:8081/">
        
            <!-- Bootstrap core CSS -->
            <link href="/css/bootstrap.css" rel="stylesheet">
        
            <!-- Favicons -->
            <link rel="apple-touch-icon" href="/assets/img/favicons/apple-touch-icon.png"
                  sizes="180x180">
            <link rel="icon" href="/assets/img/favicons/favicon-32x32.png" sizes="32x32"
                  type="image/png">
            <link rel="icon" href="/assets/img/favicons/favicon-16x16.png" sizes="16x16"
                  type="image/png">
            <link rel="manifest" href="/assets/img/favicons/manifest.json">
            <link rel="mask-icon" href="/assets/img/favicons/safari-pinned-tab.svg" color="#563d7c">
            <link rel="icon" href="/assets/img/favicons/favicon.ico">
            <meta name="msapplication-config" content="/assets/img/favicons/browserconfig.xml">
            <meta name="theme-color" content="#563d7c">
        
        
            <style>
                .bd-placeholder-img {
                    font-size: 1.125rem;
                    text-anchor: middle;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
        
                @media (min-width: 768px) {
                    .bd-placeholder-img-lg {
                        font-size: 3.5rem;
                    }
                }
            </style>
            <!-- Custom styles for this template -->
            <link href="/css/style.css" rel="stylesheet">
        </head>
        <body>
        ${renderNavbar(renderer)}
        
        <main role="main" class="container">
        
            ${content}
        
        </main><!-- /.container -->
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
                integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
                crossorigin="anonymous"></script>
        <script>window.jQuery || document.write('<script src="/js/vendor/jquery.slim.min.js"><\\/script>')</script>
        <script src="/js/bootstrap.bundle.js"></script>
        </body>
        </html>
        `
}
