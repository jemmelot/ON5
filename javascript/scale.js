/*
	set page zoom level based on screen size
*/
var width = $(window).width();
var height = $(window).height();
var zoomWidth = width/1536;
var zoomHeight = height/772;

if (zoomWidth < zoomHeight) {
	document.body.style.zoom = zoomWidth;
}
else {
	document.body.style.zoom = zoomHeight;
};