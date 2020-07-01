    MicroModal.init({
        onClose: modal => {
            document.querySelectorAll('.d3-youtube-iframe').forEach(iframe => {
                iframe.setAttribute('src', iframe.getAttribute('src'));
            });
        },
    });

    MicroModal.init({
        onClose: modal => {
            modal.querySelectorAll('.d3-youtube-iframe').forEach(iframe => {
                iframe.setAttribute('src', iframe.getAttribute('src'));
            });
        },
    });
