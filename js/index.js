$(function(){
    var isLateralNavAnimating = false;

    //open/close lateral navigation
    $('.cd-nav-trigger').on('click', triggerPage);

    triggerPage(event);
    function triggerPage(event){
        event.preventDefault();
        //stop if nav animation is running
        if( !isLateralNavAnimating ) {
            if($(this).parents('.csstransitions').length > 0 ) isLateralNavAnimating = true;

            $('body').toggleClass('navigation-is-open');
            $('.cd-navigation-wrapper').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                //animation is over
                isLateralNavAnimating = false;
            });
        }
    }
    //游戏指南界面
    $('.nav-el').clearQueue().click(function(){
        $(this).find('b.picText').toggle();
        $(this).find('div').toggle();
    });

    $('.nav-el:last-child').clearQueue().click(function(){
        $('b.picText').show().siblings().hide();
        triggerPage(event);
    });

    $('.nav-el').hover(function(){
        $(this).addClass('active');
    },function(){
        $(this).removeClass('active');
        $(this).find('div').fadeOut(600);
        $(this).find('b.picText').fadeIn(700);
    });
});