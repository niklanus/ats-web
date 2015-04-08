function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}

function changeIntro(value){
	if ( ( !$("#ats-intro").hasClass(value) ) && ( !$("#ats-intro").hasClass("animating") ) ) {
		$('#ats-intro').attr("class", "ats-intro" + " " + value + " " + "animating");

		switch(value) {
			case "hotels":
				$(".ats-intro-text h1").text("Hotelería");
				$(".ats-intro-text p").text("Encontrá los mejores lugares para asegurarte una estadía inolvidable.");
				$("#search-placeholder").text("Buscá hoteles o ciudades...");

				$("#intro-bg-current").fadeOut(700, function(){
					$("#intro-bg-current").remove();
					$("#intro-bg-new").attr("id", "intro-bg-current");
					$("#ats-intro").removeClass("animating");
				}).after('<div class="ats-intro-bg hotels" id="intro-bg-new"></div>');
				
				break;
			case "gastro":
				$(".ats-intro-text h1").text("Gastronomía");
				$(".ats-intro-text p").text("Probá los mejores platos de la gastronomía Argentina e internacional.");
				$("#search-placeholder").text("Buscá restaurants o ciudades...");

				$("#intro-bg-current").fadeOut(700, function(){
					$("#intro-bg-current").remove();
					$("#intro-bg-new").attr("id", "intro-bg-current");
					$("#ats-intro").removeClass("animating");
				}).after('<div class="ats-intro-bg gastro" id="intro-bg-new"></div>');

				break;
			case "default":
				$(".ats-intro-text h1").text("Experiencias auténticas");
				$(".ats-intro-text p").text("Conocé Argentina en sus mejores hoteles y restaurants oficialmente autorizados por FEHGRA.");
				$("#search-placeholder").text("Buscá hoteles o restaurants...");

				$("#intro-bg-current").fadeOut(700, function(){
					$("#intro-bg-current").remove();
					$("#intro-bg-new").attr("id", "intro-bg-current");
					$("#ats-intro").removeClass("animating");
				}).after('<div class="ats-intro-bg default" id="intro-bg-new"></div>');

				break;
		}
	}
}

function makeSearch(value){
	$("#search-div").addClass("loading-now");
	$('#ats-search-results-wrapper').load("ajax/search-results.html", function() {
		$('#search-input').blur();
		$('#search-results-value').text(value);
		$('#search-bar-input').val(value);
		$.navigate.init();

		var headerWaypoint = $('#search-results-anchor').waypoint(function(direction) {
			$(".search-bar").toggleClass("visible");
		}, {
			offset: 0
		});

		setTimeout(function(){
			$.smoothScroll({
				scrollTarget: '#search-results-anchor',
				speed: 1000,
				easing: 'easeInOutCubic'
			});
			$("#search-div").removeClass("loading-now");
		}, 500);
	});
}

$(window).on("load resize",function(){
	var vh = $(window).height();
	$('#ats-intro').height(vh);
});

$( document ).ready(function() {
	preload(['img/intro-gastro-bg.jpg','img/intro-hotels-bg.jpg',]);

	$('#search-div').on("click",function(){
		$('#search-placeholder').fadeOut(300);
		$('#search-input').focus();
	});

	$('#search-input').val("");

	$('#search-input').focusout(function(){
		var searchVal = $('#search-input').val();
		
		if (searchVal === "") {
			$('#search-placeholder').fadeIn(300);
			$('#search-button').fadeOut(300);
		}
	});

	$('#switch-hotels').on("click",function(){
		changeIntro("hotels");
	});

	$('#switch-gastro').on("click",function(){
		changeIntro("gastro");
	});

	$('#search-input').keydown(function (e){
		var searchString = $('#search-input').val();

		if((e.keyCode === 13) && (searchString !== "")){
			makeSearch(searchString);
		}
	});

	$('#search-input').keydown(function (e){
		setTimeout(function(){
			var searchString = $('#search-input').val();

			if(searchString !== ""){
				$('#search-button').fadeIn(300);
			} else {
				$('#search-button').fadeOut(300);
			}
		}, 100);
	});

	$('#search-button').on("click",function(){
		var searchString = $('#search-input').val();

		if(searchString !== ""){
			makeSearch(searchString);
		}
	});

	$('#intro-search-spinner').animateSprite({
		fps: 12,
		loop: true,
		animations: {
            walk: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
        }
	});

	$('.chosen').chosen();

	$.navigate.init();
});

