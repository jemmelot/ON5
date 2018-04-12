function pop(img) {
	var tip = d3.tip()
		.attr("class", "d3-tip")
		.offset([-12, 0])
		.html(function(d) {
		return 	"<strong>Helaas nog niet beschikbaar</strong>"
		});	
	
	img.call(tip)
	.on('mouseover', tip.show)
	.on('mouseout', tip.hide);
};