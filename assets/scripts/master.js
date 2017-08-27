/*
$('document').ready(function() {
  $.ajax({
    url:      'http://labs.bible.org/api/?passage=votd&formatting=para&type=json&callback=displayVers',
    async:    false,
    type:     'POST',
    dataType: 'jsonp',
    jsonp:    false,
    jsonpCallback: "displayVers"
  });
});

function displayVers(data) {
  let votd = data[0];
  votd = "<div class='verse-text'>" + votd.text + "</div><div class='verse-ref'>" + votd.bookname + " " + votd.chapter + ": " + votd.verse + "</div>";
  votd = $(votd).find("a").remove().end();
  $('#votd').html(votd);
}
*/
(function () {
    /* begin: banner-resize-actions */
    const windowHeight = window.innerHeight;

    $('.header-1').css({
        height: windowHeight
    });

    $('#section-1').attr('scroll-to', windowHeight);
    /* end: banner-resize-actions */
})();

$(document).ready(function () {
    /* begin: menu-controller */
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
    /* end: menu-controller */

    /* being: on-resize-actions
     *        everything inside [banner-resize-actions] must be updated inside the handler
     */
    $(window).resize(function () {
        const windowHeight = window.innerHeight;

        $('.header-1').css({
            height: windowHeight
        });

        $('#section-1').attr('scroll-to', windowHeight);
    });
    /* end: on-resize-actions */


    /* SKROLLR JS CONFIG */
    let s = skrollr.init({
        smoothScrolling: true,
        forceHeight: false
    });

    /* SKROLLR MENU CONFIG */
    skrollr.menu.init(s, {
        //skrollr will smoothly animate to the new position using `animateTo`.
        animate: true,

        //The easing function to use.
        easing: 'sqrt',

        //Multiply your data-[offset] values so they match those set in skrollr.init
        scale: 1,

        //How long the animation should take in ms.
        duration: function(currentTop, targetTop) {
            let factor = Math.abs(currentTop - targetTop) / $(window).height();
            factor = factor >= 0.25 ? 0.25 : factor;
            //By default, the duration is hardcoded at 500ms.
            return 1000 * (1 - factor);

            //But you could calculate a value based on the current scroll position (`currentTop`) and the target scroll position (`targetTop`).
            //return Math.abs(currentTop - targetTop) * 10;
        },

        //If you pass a handleLink function you'll disable `data-menu-top` and `data-menu-offset`.
        //You are in control where skrollr will scroll to. You get the clicked link as a parameter and are expected to return a number.
        handleLink: function(link) {
            return Number.parseInt($(link).attr("scroll-to"));//Hardcoding 400 doesn't make much sense.
        },

        //By default skrollr-menu will only react to links whose href attribute contains a hash and nothing more, e.g. `href="#foo"`.
        //If you enable `complexLinks`, skrollr-menu also reacts to absolute and relative URLs which have a hash part.
        //The following will all work (if the user is on the correct page):
        //http://example.com/currentPage/#foo
        //http://example.com/currentDir/currentPage.html?foo=bar#foo
        ///?foo=bar#foo
        complexLinks: false,

        //This event is triggered right before we jump/animate to a new hash.
        change: function(newHash, newTopPosition) {
            //Do stuff
        },

        //Add hash link (e.g. `#foo`) to URL or not.
        updateUrl: false //defaults to `true`.
    });
});
