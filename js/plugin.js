/* global $, document */

$(document).on('ready', function () {
    'use strict';
    
    window.fontLoaded = false;
    
    
    /* *****************************
      * Toggle mobile menu button
      ***************************** */
    var mobBtn = $('.mob-menu-btn');
    
    mobBtn.on('click', function() {
        $(this).toggleClass('active');
        $(this).parent().find('.menu-links').toggleClass('active');
    });

    /* **************************************************
        * Navigate when click on menu item
        * Add fixed class to menu
        * Spy menu ( Add active class to viewed section )
       ************************************************** */

    // * Navigate when click on menu item
    var menu = $( '.menu' ),
        menuBorder = menu.find( '.menu-border' ),
        menuLinks = menu.find( '.menu-links' ),
        menuItem = menuLinks.find( 'li' ),
        menuTop = menu.offset().top,
        elemFromPoint, activeItem;

    menuItem.on( 'click', (e)=> {
        e.preventDefault();
        menuItem.removeClass( 'active' );
        $(this).addClass( 'active' );
        $('html, body').animate({
            scrollTop: Math.max($(e.target.hash).offset().top - 88, 1) + 'px'
        })
    });

    
    // * Spy menu ( Add active class to item )
    // * Move border to active item
    activateSpyMenu();
    moveBorderToActiveItem();

    // * Add fixed class to menu
    $(window).on('scroll', ()=> {
        // Add fixed class
        if (window.scrollY > menuTop) {
            menu.addClass('fixed')
        } else {
            menu.removeClass('fixed')
        }
        // Spy menu
        activateSpyMenu();
        moveBorderToActiveItem();
    });

    // Spy menu function init
    function activateSpyMenu() {
        elemFromPoint = document.elementFromPoint(0, 90);
        if ( elemFromPoint.getAttribute( 'menu-target' ) ) {
            menuItem.removeClass('active')
            menu.find( `.for-${elemFromPoint.id}` ).addClass('active')
        }
    }

    // Spy menu function init
    function moveBorderToActiveItem() {
        activeItem = menuLinks.find( '.active' );
        menuBorder.css({
            width: activeItem.outerWidth() + 'px',
            left: activeItem.position().left + 'px',
            top: activeItem.position().top + 'px'
        });
    }
    
    
    /* **************************************
      * Add class when logo font is loaded
      ************************************** */
    var menuLogo = $('.menu').find('.logo');
    
    document.fonts.ready.then(function () {
        menuLogo.addClass('font-loaded');
        window.fontLoaded = true;
    });
    
    window.setTimeout(function() {
        if (!menuLogo.hasClass('font-loaded')) {
            menuLogo.addClass('font-loaded');
        }
    }, 4000);
    
    
    /* **************************
      * Services margin top
      ************************** */
    
    var halfTop = $('.half-top'),
        halfTopOffset = halfTop.find('.process').outerHeight();

    halfTop.css({
        marginTop: `-${halfTopOffset/2}px`
    });
    
    
    /* **************
      * About us
      ************** */
    
    // Set about us image height equal to text height
    var aboutUs = $('.about-us'),
        aboutImg = aboutUs.find('.image'),
        
        aboutInt = 
        window.setInterval(function () {
            if (window.fontLoaded) {
                aboutImg.css({
                    height: aboutImg.parent('.about-us-content').find('.text').outerHeight() + 40 + 'px'
                });
                window.clearInterval(aboutInt);
            }
        }, 1000);
    
    
    /* ****************************
      * About us text animation
      **************************** */
    
    var elementX = 0, 
        elementY = 0,
        elementW = 0,
        elementH = 0,
        mouseX = 0,
        mouseY = 0,
        text = aboutUs.find('.text'),
        heading = aboutUs.find(".text-content"),
        button = aboutUs.find(".buttons").find('.btn'),
        position, 
        xz, yz,
        halfW, halfH;

    text.mousemove(function(e){

        position = text.offset(),

        elementX = position.left;
        elementY = position.top;

        elementW = text.width();
        elementH = text.height();

        halfW = elementW/2;
        halfH = elementH/2;

        mouseX = (e.pageX - elementX - halfW)/halfW;
        mouseY = (e.pageY - elementY - halfH)/halfH;
        mouseX = Math.round(mouseX * 100)/100;
        mouseY = Math.round(mouseY * 100)/100;
        xz = mouseX < 0 ? mouseX * -1 : mouseX;
        yz = mouseY < 0 ? mouseY * -1 : mouseY;

        text.css("transform", "rotateX("+mouseY*-4+"deg) rotateY("+mouseX*4+"deg)");

        heading.css({
            transform: "translateX("+mouseX*3+"px) translateY("+mouseY*3+"px) translateZ("+Math.max(10*yz, 10*xz)+"px)"
        });

        button.css({
            transform: "translateX("+mouseX*4+"px) translateY("+mouseY*4+"px) translateZ("+Math.max(10*yz, 10*xz)+"px)",
            boxShadow: `${mouseX*2}px ${mouseY*2}px ${Math.max(xz ,yz)*4}px rgba(255, 255, 255, .7)`
       });
    });
    /* ******************** 
      * Services Video
      ******************** */
    
    var sVidDiv = $('#services-video'),
        vidTop = sVidDiv.offset().top,
        ts = vidTop - window.innerHeight,
        sVidDivHeight = sVidDiv.height(),
        vidBottom = vidTop + sVidDivHeight,        
        sVideo = sVidDiv.find('video'),
        sVideoHeight = sVideo.height(),
        sVideoWidth = sVideo.width(),
        widthToAdd, vid, py;
    
    // add Width to video to fill the height
    // width to add = (div.height - video.height) * 1.778
    if (sVideoHeight < sVidDivHeight) {
        widthToAdd = (sVidDivHeight - sVideoHeight) * 1.778;
        sVideo.css({
            width: sVideoWidth + widthToAdd + 'px',
            transform: 'translate(-'+ widthToAdd/2 +'px)'
        })
    }
    
    $(window).on('scroll', function() {
        py = window.pageYOffset;

        if (py > vidBottom || py < ts) {
            sVideo[0].pause();
        }

        if (py < vidBottom && py > ts) {
            sVideo[0].play();
        }
    });
    
    /* ******************** 
      * Services Video
      ******************** */
    
    if (window.innerWidth < 768) {
        $('#team').find('.members').addClass("owl-carousel");
        
        $('#team').find('.members').owlCarousel({
            stagePadding: 50,
            loop:0,
            margin:10,
            nav:true,
            items: 1
        })
    }

    /* ******************** 
      * Portfolio
    ******************** */

    var $grid = $( '.portfolio-grid' ).isotope({
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        percentPosition: true,
        masonry: {
            columnWidth: '.grid-sizer'
        }
    });

    var portfolioFilters = $('#portfolio-filters'),
        portfolioButtons = portfolioFilters.find('.button'),
        btnMargin = +window.getComputedStyle(portfolioButtons[0])['margin-top'].slice(0, -2),
        buttonBorder = portfolioFilters.find('.button-border');
    console.log(btnMargin);
    moveButtonTo(portfolioFilters.find('.active'));

    portfolioFilters.on( 'click', 'button', function() {
        portfolioButtons.removeClass('active');
        $( this ).addClass('active');

        var filterClass = $( this ).attr('data-filter');
        $(filterClass).addClass('active');
        $grid.isotope({ filter: filterClass });
        moveButtonTo(this);
    });

    function moveButtonTo( element ) {
        buttonBorder.css({
            top: $( element ).position().top -  + 'px',
            left: $( element ).position().left + 'px',
            width: $( element ).outerWidth() + 'px',
            height: $( element ).outerHeight() + 'px'
        })
    }

    
    /* ******************** 
      * Contact Form
      ******************** */
    var input = $('#contact-form').find('.form-control'),
        ths;
    
    input.change(function() {
        ths = $(this);
        if (!!ths.val().trim()) {
            ths.addClass('has-content');
        } else {
            ths.removeClass('has-content');
        }
    })
            
});
