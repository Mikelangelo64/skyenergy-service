$(document).ready(function(){

    //animateOn
    wow = new WOW({
        boxClass:     'wow',   
        animateClass: 'animated', 
        offset:       0,         
        mobile:       true,       
        live:         true       
      })
    wow.init();

    //menuToggle
    $('.menu__toggle').click(function(e){
        $(this).toggleClass('_active-menu')
        $('.menu__box').toggleClass('_active-menu')
        $('body').toggleClass('_lock')

    })

    //header-anchor
    $('.menu__list .menu__link').click(function(event){
        onMenuLinkClick(event);
    })

    function onMenuLinkClick(event){
        const menuLink = event.target;
	    const goto = $(menuLink).attr('data-goto');
        if(goto && $(goto)){
            $([document.documentElement, document.body]).animate({
                scrollTop: $(goto).offset().top - Math.round($('.header').height())
            }, 500)
        }
        if($('.menu__toggle').hasClass('_active-menu')){
            
            $('.menu__toggle').removeClass('_active-menu')
            $('.menu__box').removeClass('_active-menu')
            $('body').removeClass('_lock')
        }
        event.preventDefault();
    }

    //blog-anchor
    $('.blog-titles__list .blog-titles__link').click(function(event){
        onBlogLinkClick(event);
    })

    function onBlogLinkClick(event){
        const menuLink = event.target;
	    const goto = $(menuLink).attr('data-goto');
        if(goto && $(goto)){
            $([document.documentElement, document.body]).animate({
                scrollTop: $(goto).offset().top - Math.round($('.header').height())
            }, 500)
        }

        event.preventDefault();
    }

    //accordion footer
    if(document.body.clientWidth < 771){
        $('.footer__accordion__title').next().slideUp(300)

        $('.footer__accordion__title').click(function(e){
            $(this).toggleClass('_active-accordion').next().slideToggle(300)
            
            $('.footer__accordion__title').not($(this)).removeClass('_active-accordion')
            $('.footer__accordion__title').not($(this)).next().slideUp(300)
        })
    }/* else{
        $('.footer__accordion__title').next().css('display', "flex")
    } */
    
    //SORT-active
    $('.sort__current').click(function(e){
        $(this).toggleClass('_active-sort')
        $(".sort__choise").toggleClass('_active-sort')
    })

    //COUNTER--------
    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });

    //SWIPER

    var galleryThumbs = new Swiper('.gallery-thumbs', {
		spaceBetween: 10,
		slidesPerView: 2,
		//loop: true,
		//freeMode: true,
		//loopedSlides: 5, //looped slides should be the same
		//watchSlidesVisibility: true,
		//watchSlidesProgress: true,
        
        /* grid:{
            rows: 3,
        }, */
	});
	var galleryTop = new Swiper('.gallery-top', {
		spaceBetween: 10,
		// loop:true,
		// loopedSlides: 5, //looped slides should be the same
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		/* thumbs: {
			swiper: galleryThumbs,
		}, */
	});

    //gallery swiper
    var swiperGAlleryMini = new Swiper('.swiper-gallery-mini', {
        slidesPerView: 5,
        grid: {
          fill: 'row',
          rows: 1
        },
        spaceBetween: 5,
        breakpoints: {
            690:{
                slidesPerView: 5,
                grid: {
                fill: 'row',
                rows: 2
                },
                spaceBetween: 5,
            },
            1020: {
                slidesPerView: 2,
                grid: {
                fill: 'row',
                rows: 5
                },
                spaceBetween: 18,
            },
        },
    })

    var swiperGAlleryMain = new Swiper('.swiper-gallery-big', {
        slidesPerView: 1,
        spaceBetween: 0,
        effect: "fade",
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
        thumbs: {
			swiper: swiperGAlleryMini,
		},
    })


    //product-swiper
    var swiperProductMini = new Swiper('.swiper-product-small', {
        slidesPerView: 1,
        grid: {
            fill: 'row',
            rows: 4
        },
        spaceBetween: 6,
        breakpoints: {
            761:{
                slidesPerView: 4,
                grid: {
                    fill: 'column',
                    rows: 1
                },
                spaceBetween: 6,
            },
            1020: {
                slidesPerView: 1,
                grid: {
                    fill: 'row',
                    rows: 4
                },
                spaceBetween: 18,
            },
        },
    })

    var swiperProductMain = new Swiper('.swiper-product-big', {
        slidesPerView: 1,
        spaceBetween: 0,
        effect: "fade",
        thumbs: {
			swiper: swiperProductMini,
		},
    })

    //description swiper

    var swiperDescription = new Swiper('.product-description__swiper', {
        slidesPerView: 1,
        spaceBetween: 40,
        autoHeight: true,
        loop: false,
        //effect: 'fade',
        /* grid: {
            fill: 'row',
            rows: 1
        }, */

        navigation: {
			nextEl: '.characteristic-title',
			prevEl: '.description-title',
		},
        //freeMode: false,
    })

    

})