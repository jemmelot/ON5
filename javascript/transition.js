$('.link0').click(function(event) {
	event.preventDefault();
	
	newLocation = "../html/vraag1.html"

	$('body').fadeOut(150, newpage);

});

$('.link1').click(function(event) {
	event.preventDefault();
	
	newLocation = "../html/vraag2.html"

	$('body').fadeOut(150, newpage);

});

$('.link2').click(function(event) {
	event.preventDefault();
	
	newLocation = "../html/vraag3.html"

	$('body').fadeOut(150, newpage);

});

$('.link3').click(function(event) {
	event.preventDefault();
	
	newLocation = "../html/map_house.html"

	$('body').fadeOut(150, newpage);

});

function newpage() {

window.location = newLocation;

}
