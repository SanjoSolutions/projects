    // ***MASONRY*** for Lazy Grids - 24kb - https://masonry.desandro.com/
    import Masonry from "masonry-layout";
    // ***IMAGES LOADED*** for Lazy Grids - 10kb - https://imagesloaded.desandro.com/
    import imagesLoaded from "imagesloaded";
    // ***INFINITE SCROLL*** for Lazy Grids - 26kb - https://infinite-scroll.com/
    import InfiniteScroll from "infinite-scroll";


    // make imagesLoaded available for InfiniteScroll!!!
    InfiniteScroll.imagesLoaded = imagesLoaded;

    // Grid query selector
    var grid = document.querySelector('.grid');

    if (grid) {
        var msnry = new Masonry( grid, {
            percentPosition: true,
            itemSelector: 'none',
            columnWidth: '.grid-sizer',
            gutter: '.gutter-sizer',
            // nicer reveal transition
            visibleStyle: { transform: 'translateY(0)', opacity: 1 },
            hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
        });

        // make imagesLoaded assign msnry item selector
        imagesLoaded( grid, function() {
            grid.classList.remove('are-images-unloaded');
            msnry.options.itemSelector = '.grid-item';
            var items = grid.querySelectorAll('.grid-item');
            msnry.appended( items );
        });

        // init Infinte Scroll
        var infScroll = new InfiniteScroll( grid, {
            path: '.pagination__next',
            append: '.grid-item',
            outlayer: msnry,
            prefill: true,
            status: '.page-load-status',
            hideNav: '.pagination',
            scrollThreshold: 800,
            history: false,
        });
    }
