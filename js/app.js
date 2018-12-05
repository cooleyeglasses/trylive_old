$( document ).ready(function($) {
    (function(){
		var is_iPad = navigator.userAgent.match(/iPad/i) != null;
		var headerHeight;
		if ( is_iPad){
			$("#header").height( ($(window).width() * 365) / 1463);
			headerHeight = 365 * $(window).width()  / 1463;
			$("#header img").css("margin-top","3%");
			$("#header p").css("margin-top","0");
		}else{
			$("#header").height( ($(window).width() * 483) / 1125);
			headerHeight = 483 * $(window).width()  / 1125;
		}
		$(".portrait, .white_bg").height( $(window).height() - headerHeight );
		$(".rendered").height( $(window).height() );

	})();

    $(".img_like").click(function(){
    	if( $(this).hasClass("selected") ) {
	    	$(this).attr("src", "img/button_like_off.png").removeClass("selected");
    	} else {
	    	$(this).attr("src", "img/button_like_on.png").addClass("selected");
    	}
    });
});