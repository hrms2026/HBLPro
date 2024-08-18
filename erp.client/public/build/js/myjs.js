
var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],

    $BODY = $('body'),
    $MENU_TOGGLE = $('#menu_toggle'),
    $SIDEBAR_MENU = $('#sidebar-menu'),
    $SIDEBAR_FOOTER = $('.sidebar-footer'),
    $LEFT_COL = $('.left_col'),
    $RIGHT_COL = $('.right_col'),
    $NAV_MENU = $('.nav_menu'),
    $FOOTER = $('footer');
    

    $(function() {
    console.log('Document is ready');
    $('#menu_toggle').on('click', function () {
        if ($('body').hasClass('nav-md')) {
            $('#sidebar-menu').find('li.active ul').hide();
            $('#sidebar-menu').find('li.active').addClass('active-sm').removeClass('active');
        } else {
            $('#sidebar-menu').find('li.active-sm ul').show();
            $('#sidebar-menu').find('li.active-sm').addClass('active').removeClass('active-sm');
        }

        $('body').toggleClass('nav-md nav-sm');
        setContentHeight();
    });

    var openUpMenu = function () {
      
        $('#sidebar-menu').find('li').removeClass('active active-sm');
        $('#sidebar-menu').find('li ul').slideUp();
    };

    $('#sidebar-menu').find('a').on('click', function () {
       
        var $li = $(this).parent();
        if ($li.hasClass('active')) {
            $li.removeClass('active active-sm');
            $('ul:first', $li).slideUp(setContentHeight);
        } else {
            if (!$li.parent().hasClass('child_menu') || $('body').hasClass('nav-sm')) {
                openUpMenu();
            }
            $li.addClass('active');
            $('ul:first', $li).slideDown(setContentHeight);
        }
    });
    $('#sidebar-menu').find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');
    $('#sidebar-menu').find('a').filter(function () {
        return this.href === CURRENT_URL;
    }).parent('li').addClass('current-page')
        .parents('ul').slideDown(setContentHeight)
        .parent().addClass('active');
   

    if ($.fn.mCustomScrollbar) {
        $('.menu_fixed').mCustomScrollbar({
            autoHideScrollbar: true,
            theme: 'minimal',
            mouseWheel: { preventDefault: true }
        });
    }
    setContentHeight();
});



function setContentHeight() {
    // reset height
    $RIGHT_COL.css('min-height', $(window).height());

    var bodyHeight = $BODY.outerHeight(),
        footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
        leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
        contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

    // normalize content
    contentHeight -= $NAV_MENU.height() + footerHeight;

    $RIGHT_COL.css('min-height', contentHeight);
}
