(function() {
    let i = document.querySelector('#swiper__divider'),
        o = document.querySelector('#slider');


    o.addEventListener('change', function() {
		i.style.width = o.value+"%";
    }, false);
})();