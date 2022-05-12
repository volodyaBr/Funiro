if (document.querySelector(".slider-main__swiper")) {
    new Swiper(".slider-main__swiper", {
        loop: true,
        speed: 800,
        spaceBetween: 32,
        parallax: true,
        pagination: {
            el: ".slider-main__pagination",
            clickable: true
        },
        navigation: {
            prevEl:".slider-main__arrows .slider-arrow_prev",
            nextEl:".slider-main__arrows .slider-arrow_next"
        },
    })
}

if  (document.querySelector(".slider-rooms__body")) {
    new Swiper(".slider-rooms__body", {
        loop: true,
        speed: 800,
        spaceBetween: 24,
        parallax: true,
        slidesPerView: "auto",
        pagination: {
            el: ".slider-rooms__pagination",
            clickable: true
        },
        navigation: {
            prevEl:".slider-rooms__arrows .slider-arrow_prev",
            nextEl:".slider-rooms__arrows .slider-arrow_next"
        },
    })
}

if  (document.querySelector(".slider-tips__body")) {
    new Swiper(".slider-tips__body", {
        loop: true,
        speed: 800,
        spaceBetween: 32,
        watchOverflow: true,
        pagination: {
            el: ".slider-tips__pagination",
            clickable: true
        },
        navigation: {
            prevEl:".slider-tips .slider-arrow_prev",
            nextEl:".slider-tips .slider-arrow_next"
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            540: {
                slidesPerView: 2,
            },
            900: {
                slidesPerView: 3,
            }
        }
    })
}

