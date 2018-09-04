const offset = 50;

const adjust_elements = () => {
    const windowHeight = window.innerHeight;

    $('.page-section').css({
      'min-height': windowHeight
    });

    $('#verse-1').css({
      top: offset
    });
    $('#verse-2').css({
      top: offset + (windowHeight / 3)
    });
    $('#verse-3').css({
      top: offset + ((windowHeight + windowHeight) / 3)
    });
};

const create_navbutton = (id, dest, time) => {
  $( id ).click( function () {
    $('html, body').animate({
      scrollTop: $( dest ).offset().top
    }, time);
  });
};

$(document).ready(function () {
    adjust_elements();

    /* start: menu-controller */
    $('#menu-toggle').on('click', function ( e ) {
        e.preventDefault();
        $('#sidebar-wrapper').toggleClass('active');
        $('.overlay').show();
        $('html, body').css({
            overflow: 'hidden'
        });
    });

    $('#menu-close, .sidebar-item, .overlay').on('click', function ( e ) {
        e.preventDefault();
        $('#sidebar-wrapper').toggleClass('active');
        $('.overlay').hide();
        $('html, body').css({
            overflow: 'auto'
        });
    });

    //nav buttons
    create_navbutton('#to-top', '#section-0', 500);
    create_navbutton('#to-section-1', '#section-1', 5000);
    /* end: menu-controller */

    $(window).resize(function () {
        adjust_elements();
    });

    const controller = new ScrollMagic.Controller();

    /* start: banner animation */
    const bannerTween = new TweenMax.fromTo('#banner', 2, {'background-position': '-1920px 0px'}, {'background-position': '-1920px -1024px'});
    const bannerScene = new ScrollMagic.Scene({
      triggerElement: '#section-0',
      triggerHook:    'onLeave',
      duration:       window.innerHeight
    })
    .setTween(bannerTween)
    .addTo(controller);
    /* end: banner animation */

    /* start: verse constants */
    const verse_bottom_1 = Number.parseInt((window.innerHeight / 3) - offset);
    const verse_bottom_2 = Number.parseInt(2 * (window.innerHeight / 3) - offset);
    const verse_bottom_3 = 2 * verse_bottom_1;
    /* end: verse constants */

    /* start: verse 1 animation */
    const verseTween1 = new TweenMax.fromTo('#verse-1', 1, {opacity: 1, left: '5%', top: '5%'}, {opacity: 0, left: '10%', top: '10%'});
    const verseScene1 = new ScrollMagic.Scene({
      triggerElement: '#verse-1',
      triggerHook:    'onLeave',
      duration:       verse_bottom_1
    })
    .setTween(verseTween1)
    .addTo(controller);
    /* end: verse 1 animation */

    /* start: verse 2 animation */
    const verseTween2 = new TimelineMax();
    verseTween2.set('#verse-2', {opacity: 0, right: '-5%', top: '40%'})
    .to('#verse-2', 0.5, {opacity: 1, right: '5%', top: '45%'})
    .to('#verse-2', 0.5, {opacity: 0, right: '10%'});

    const verseScene2 = new ScrollMagic.Scene({
      triggerElement: '#verse-1',
      triggerHook:    'onLeave',
      duration:       verse_bottom_2
    })
    .setTween(verseTween2)
    .addTo(controller);
    /* end: verse 2 animation */

    /* start: verse 3 animation */
    const verseTween3 = new TimelineMax();
    verseTween3.set('#verse-3', {opacity: 0, left: '-5%', top: '70%'})
    .to('#verse-3', 0.5, {opacity: 1, left: '5%', top: '75%'})
    .to('#verse-3', 0.5, {opacity: 0, left: '10%'});

    const verseScene3 = new ScrollMagic.Scene({
      triggerElement: '#verse-2',
      triggerHook:    'onLeave',
      duration:       verse_bottom_3
    })
    .setTween(verseTween3)
    .addTo(controller);
    /* end: verse 3 animation */
});
