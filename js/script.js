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

    $('.product-section-comments__title__container .product-section-comments__write__comment').click(function(e){
        e.preventDefault()
        $('.pop-up-comment').addClass('_avtive-pop-up')
        $('body').addClass('_lock')
    })

    $('.pop-up-comment__close__btn').click(function(e){
        $('.pop-up-comment').removeClass('_avtive-pop-up')
        $('body').removeClass('_lock')
    })
    
    //pop up raiting
    let stars = Array.from($('input[name=radio-raiting]'))
    //console.log(stars);

    $('input[name=radio-raiting]').click(function(e){
        let currentIndex = stars.indexOf(e.target)
        //console.log(e.target === stars[0]);

        stars.forEach((item, index, arr) => {
            if(index <= currentIndex){
                $(item).next().children('path').css('fill', '#FFC90C')
            }
            if(index > currentIndex){
                $(item).next().children('path').css('fill', '#EFF1F4')
            }
        })
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
    $(' .product-section').not($('.product-section._active-page')).fadeOut(200)

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

    $('.product-pages .product-pages__item').click(function(e){
        e.preventDefault()
        const goto = $(this).attr('data-product-page');

        if(goto && $(goto)){
            $(this).addClass("_active-page");
            $(goto).addClass("_active-page");

            $(`.product-pages .product-pages__item`).not($(this)).removeClass("_active-page");
            $(`.product-section`).not($(goto)).removeClass("_active-page");
            $(`.product-section`).not($(goto)).fadeOut(0)
        
            $(goto).fadeIn(400);
        }
    })

    $('.comment__action__wrapper .comment__action__item').not($('.comment__action__wrapper .comment__action__item._active-action')).fadeOut(200)
    
    
    $('.product-section__comments .comment__actions a').click(function(e){
            e.preventDefault()

            const goto = $(this).attr('data-active-action');
    
            if(goto && $(goto)){
                $(this).addClass("_active-action");
                $(goto).addClass("_active-action");
    
                $(`.product-section__comments .comment__actions a`).not($(this)).removeClass("_active-action");
                $(`.product-section__comments .comment__action__wrapper .comment__action__item`).not($(goto)).removeClass("_active-action");
                $(`.product-section__comments .comment__action__wrapper .comment__action__item`).not($(goto)).fadeOut(0)
            
                $(goto).fadeIn(400);
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


    //CHECK ANSWER LIST / GALLERY IS EMPTY
    // $('.answers__list').each(function(){
    //         if($(this).children().length === 0){
    //             $('a[data-active-action=.answers]').css('display', 'none')
    //         }

    //     }
    // );

    //INPUT-FILE---------------------------------------------------------
    let inputCounter = 0
    let inputCounterComment = 0

    
    

    let filePopUpCompredForm = $( '.pop-up-compred__form input[type=file]' )[0];
    let fileWriteAnswerForm = $( '.write-answer__form input[type=file]' )[0];
    let fileCommentForm = $( '.pop-up-comment__form input[type=file]' )[0];

    
    
    if(filePopUpCompredForm){
        inputHandler(filePopUpCompredForm)
    }
    if(fileWriteAnswerForm){
        inputHandler(fileWriteAnswerForm)
        $('.write-answer__form input[type="file"]')[inputCounter].addEventListener('change', addNewInput);
        
        
    }
    if(fileCommentForm){
        inputHandler(fileCommentForm)
        $('.pop-up-comment__form input[type="file"]')[inputCounter].addEventListener('change', addNewInputForComment);
    }

    //function input-file handler
    function inputHandler(input){
        
        let label	 = input.nextElementSibling
        let labelVal = label.innerHTML
        

        input.addEventListener( 'change', function( e ){
            //console.log('hui', e.target.files[0].name);
            let fileName = '';
            
            try{
                fileName = e.target.files[0].name
            } catch{
                fileName = ''
            }
            

            if( fileName ){
                label.querySelector( 'span' ).innerHTML = fileName;


            }else{
                label.innerHTML = labelVal;
            }
        })
    }

    //function add new input file
    function addNewInput(e){
        inputCounter++
        console.log(inputCounter);
        console.log($(e.target));
        

        $(`
            <div>
                <input type="file" name="photo-${inputCounter}" id="photo-${inputCounter}"/>

                <label for="photo-${inputCounter}">
                    <svg width="19" height="13" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.2 0.039978H3.8L0 6.11998V6.49996V12.9599H19V6.49996V6.11998L15.2 0.039978ZM4.256 0.799978H14.744L18.088 6.11998H12.92V7.63998C12.92 8.47596 12.236 9.15998 11.4 9.15998H7.6C6.76398 9.15998 6.08 8.47596 6.08 7.63998V6.11998H0.912L4.256 0.799978ZM18.24 12.2H0.76V6.87998H5.32V8.02C5.32 9.084 6.15602 9.91998 7.21998 9.91998H11.78C12.844 9.91998 13.68 9.084 13.68 8.02V6.87998H18.24V12.2Z" fill="black" fill-opacity="0.26"/>
                    </svg>
                    <span>
                        Загрузить фото
                    </span>
                </label>            
            </div>
        `).insertBefore('.write-answer__form button[type=submit]')

        e.target.removeEventListener('change', addNewInput)

        $( '.write-answer__form input[type=file]' )[inputCounter].addEventListener('change', addNewInput)
        
        inputHandler($( '.write-answer__form input[type=file]' )[inputCounter])


    }
    function addNewInputForComment(e){
        inputCounterComment++
        // console.log(inputCounterComment);
        // console.log($(e.target));
        

        $(`
            <div>
                <p></p>
                <input type="file" name="photo-${inputCounterComment}" id="photo-${inputCounterComment}"/>

                <label for="photo-${inputCounterComment}">
                    <svg width="19" height="13" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.2 0.039978H3.8L0 6.11998V6.49996V12.9599H19V6.49996V6.11998L15.2 0.039978ZM4.256 0.799978H14.744L18.088 6.11998H12.92V7.63998C12.92 8.47596 12.236 9.15998 11.4 9.15998H7.6C6.76398 9.15998 6.08 8.47596 6.08 7.63998V6.11998H0.912L4.256 0.799978ZM18.24 12.2H0.76V6.87998H5.32V8.02C5.32 9.084 6.15602 9.91998 7.21998 9.91998H11.78C12.844 9.91998 13.68 9.084 13.68 8.02V6.87998H18.24V12.2Z" fill="black" fill-opacity="0.26"/>
                    </svg>
                    <span>
                        Загрузить фото
                    </span>
                </label>            
            </div>
        `).insertBefore('.pop-up-comment__form button[type=submit]')

        e.target.removeEventListener('change', addNewInputForComment)

        $( '.pop-up-comment__form input[type=file]' )[inputCounterComment].addEventListener('change', addNewInputForComment)
        
        inputHandler($( '.pop-up-comment__form input[type=file]')[inputCounterComment])


    }

    //fancybox
    if(Array.from($('.product-section__comments')).length !== 0){
        Fancybox.bind('[data-fancybox="gallery"]', {
            dragToClose: false,
          
            Toolbar: false,
            closeButton: "top",
          
            Image: {
              zoom: false,
            },
        })
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

    //assortment same swiper
    var swiperSameAssort = new Swiper('.product-section-assortment .assortment-popular-swiper.swiper', {
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
    var swiperReviews = new Swiper('.reviews-swiper.swiper', {
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
    var swiperProductMini = new Swiper('.swiper-product-section-small', {
        slidesPerView: 4,
        direction: "vertical",
        // grid: {
        //     fill: 'row',
        //     rows: 4
        // },
        spaceBetween: 5,
        navigation: {
			nextEl: '.swiper-product-section-small__btns__container .swiper-button-next',
			prevEl: '.swiper-product-section-small__btns__container .swiper-button-prev',
		},
        breakpoints: {
            761:{
                slidesPerView: 4,
                direction: "horizontal",
                // grid: {
                //     fill: 'column',
                //     rows: 1
                // },
                spaceBetween: 6,
            },
            1020: {
                slidesPerView: 6,
               direction: "vertical",
                // grid: {
                //     fill: 'row',
                //     rows: 6
                // },
                spaceBetween: 18,
            },
        },
    })

    var swiperProductMain = new Swiper('.swiper-product-section-big', {
        slidesPerView: 1,
        spaceBetween: 30,
        effect: "fade",
        thumbs: {
			swiper: swiperProductMini,
		},
    })
    

})