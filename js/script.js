$(document).ready(function(){

    const isMobile = {
        Android: function(){
            return navigator.userAgent.match(/Android/i)
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i)
        },
        iOS: function(){
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        Opera: function(){
            return navigator.userAgent.match(/Opera mini/i)
        },
        Windows: function(){
            return navigator.userAgent.match(/IEMobile/i)
        },
        any: function(){
            return(
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows()
            )
        }
    }

    if(isMobile.any()){
        $('body').addClass('_touch')

    }else{
        $('body').addClass('_pc')
    }

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

        if($('body').hasClass('_lock') && $('.header-dop__catalog__btn').hasClass('_active-header-catalog')){
            return
        }
        $('body').toggleClass('_lock')

    })

    //header-search-placeholder
    if(document.body.clientWidth < 357){
        $('.form-search input[type=text]').attr('placeholder', 'Поиск')
    }

    //header dropdown menu
    if(isMobile.any()){
        $('.menu .menu__item__with__dop').click(function(e){
            e.preventDefault()
            appearDropDown.call(this, e)
        })
    }else{
        $('.menu .menu__item__with__dop').parent().hover(function(e){
            appearDropDown.call($('.menu__item__with__dop'), e)
        })
    }
    

    function appearDropDown(e){
        $(this).toggleClass('_active-dropdown')
        $('.menu-dropdown').slideToggle(300)
    }

    //header-anchor
    $('.menu__list .menu__link').click(function(event){
        onMenuLinkClick.call(this, event);
    })

    function onMenuLinkClick(event){
        const menuLink = event.target;
	    const goto = $(menuLink).attr('data-goto');
        if(goto && $(goto)){
            $([document.documentElement, document.body]).animate({
                scrollTop: $(goto).offset().top - Math.round($('.header').height())
            }, 500)
        }
        console.log(1, $(this)[0]);
        console.log(2, $('.menu .menu__item__with__dop')[0]);

        if($('.menu__toggle').hasClass('_active-menu')){
            if($(this)[0] !== $('.menu .menu__item__with__dop')[0]){
                $('.menu__toggle').removeClass('_active-menu')
                $('.menu__box').removeClass('_active-menu')

                $('.header-dop__catalog__btn').toggleClass('_active-header-catalog')
                $('.header-catalog').toggleClass('_active-header-catalog')

                $('body').removeClass('_lock')
            }
            
        }
        event.preventDefault();
    }

    //pop-up
    $('.main-swiper__btn').click(function(e){
        $('.pop-up-compred').addClass('_avtive-pop-up')
        $('body').addClass('_lock')
    })

    $('.pop-up__close__btn').click(function(e){
        $('.pop-up-compred').removeClass('_avtive-pop-up')
        $('body').removeClass('_lock')
    })

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

    //content-separate change separate
    $('.header-dop__catalog__btn').click(function(e){
        $(this).toggleClass('_active-header-catalog')
        $('.header-catalog').toggleClass('_active-header-catalog')

        if( $('.menu__box').hasClass('_active-menu')){
            return
        }

        if ($('body').hasClass('_lock') || !$(this).hasClass('_active-header-catalog')){
            $('body').removeClass('_lock')
        }else{
            $('body').addClass('_lock')
        }
        
    })

    $('.for-customer__separate .content-separate__separate__wrapper .for-customer-article').not($('.for-customer__separate .content-separate__separate__wrapper .for-customer-article._active-separate ')).fadeOut(200)
    $('.header-catalog__wrapper .content-separate__separate__wrapper .header-catalog-category').not($('.header-catalog__wrapper .content-separate__separate__wrapper .header-catalog-category._active-separate ')).fadeOut(200)

    $('.for-customer__separate .content-separate-menu .content-separate-menu__item').click(function(event){
        onCustomerMenuClick.apply(this, [event, 'for-customer__separate', 'for-customer-article']);
        
        if(document.body.clientWidth < 670){
            mooveTo.apply(this, [event, 'for-customer__separate', 'for-customer-article'])
        }
    })
    $('.header-catalog__wrapper .content-separate-menu .content-separate-menu__item').click(function(event){
        onCustomerMenuClick.apply(this, [event, 'header-catalog__wrapper', 'header-catalog-category']);
        
        if(document.body.clientWidth < 670){
           //setTimeout(() => {
                mooveTo.apply(this, [event, 'header-catalog__wrapper', 'header-catalog-category'])
           //}, 500);
            
        }
    })

    function onCustomerMenuClick(event, section, separateItem){
        //console.log(1, this);
        //const menuLink = event.target;
        const goto = $(this).attr('data-separate-appear');
       // console.log(2, $(goto));
        if(goto && $(goto)){
            $(this).addClass("_active-separate");
            $(goto).addClass("_active-separate");

            

            $(`.${section} .content-separate-menu .content-separate-menu__item`).not($(this)).removeClass("_active-separate");
            $(`.${section} .content-separate__separate__wrapper .${separateItem}`).not($(goto)).removeClass("_active-separate");
            $(`.${section} .content-separate__separate__wrapper .${separateItem}`).not($(goto)).fadeOut(0)
        
            $(goto).fadeIn(400);
        }

        event.preventDefault();
    }

    function mooveTo(event, section) {
        const goto = $(this).attr('data-separate-appear');
        // console.log(3, $('.header-catalog').scrollTop());
        // console.log(4, $(`.${section} .content-separate__separate__wrapper`).offset().top);
        // console.log(5, $(`.${section} .content-separate__separate__wrapper`).offset().top - Math.round($('.header-main').height() + $('.header-dop').height() ));

        $('.header-catalog').animate({
            scrollTop: $(`.${section} .content-separate__separate__wrapper`).offset().top - Math.round($('.header-main').height() + $('.header-dop').height() + 50)
        }, 500)

    }

    //faq accordion
    $('.faq-accordion .faq-accordion__body').slideUp(300)

    $('.faq-accordion .faq-accordion__item').click(function(e){
        $(this).toggleClass('_active-accordion')
        $(this).children('.faq-accordion__body').slideToggle(300)
        $('.faq-accordion__item').not($(this)).removeClass('_active-accordion')
        $('.faq-accordion__item').not($(this)).children('.faq-accordion__body').slideUp(300)
    })
    

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
    $('.sort').click(function(e){
        $('.sort__dropdown').toggleClass('_active-sort')
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

    //main-section swiper
    var swiperMain = new Swiper('.main-swiper.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: {
			nextEl: '.main__btns__container .swiper-button-next',
			prevEl: '.main__btns__container .swiper-button-prev',
		},
    })

    //assortment popular swiper
    var swiperPopularAssort = new Swiper('.assortment-popular-swiper.swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
			nextEl: '.assortment-popular__btns__container .swiper-button-next',
			prevEl: '.assortment-popular__btns__container .swiper-button-prev',
		},
        breakpoints: {
            370:{
                slidesPerView: 2,
            },
            690:{
                slidesPerView: 3,
            },
            1021:{
                slidesPerView: 5,
            },
        },
    })

    //reviews swiper
    var swiperPopularAssort = new Swiper('.reviews-swiper.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: {
			nextEl: '.reviews-swiper__btns__container .swiper-button-next',
			prevEl: '.reviews-swiper__btns__container .swiper-button-prev',
		},
        breakpoints: {
            630:{
                slidesPerView: 2,
                spaceBetween: 10,
            },
            // 690:{
            //     slidesPerView: 3,
            // },
            1021:{
                slidesPerView: 3,
            },
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
                    rows: 20
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