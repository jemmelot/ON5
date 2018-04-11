/*
	ON5 interactive map of M4H
	
	Jesse Emmelot, 2018
*/

// activate popover functionality
$(document).ready(function(){
	$('[data-toggle="popover"]').popover({ html: true});
});

var circleData = [];
var clickStatus = 0;
var inputOne = 0;
var inputTwo = 0;
var type;
var height;

var rules = {
	1: {
		"Ortogonaal": "Vrije keus",
		"Afstand gebouwen": "10 - 14", 
		"Minimale afstand openbare structuur": "18",
		"Verboden afstandszone": "14 - 28",
		"Minimale bouwhoogte": 30,
		"Maximale bouwhoogte": 60
	},
	2: {
		"Ortogonaal": "Vrije keus",
		"Afstand gebouwen": "10 - 14", 
		"Minimale afstand openbare structuur": "18",
		"Verboden afstandszone": "14 - 28",
		"Minimale bouwhoogte": 20,
		"Maximale bouwhoogte": 40,
		"Bijzonder": "Bij een maximale kavelgrote kleiner dan 120 m2 is de minimale bouwhoogte hoogstens 20m"
	},
	3: {
		"Ortogonaal": "Ja",
		"Afstand gebouwen": "8 - 10", 
		"Minimale afstand openbare structuur": "16",
		"Verboden afstandszone": "10 - 24",
		"Minimale bouwhoogte": 15,
		"Maximale bouwhoogte": 30,
		"Bijzonder": "Bij een maximale kavelgrote kleiner dan 120 m2 is de minimale bouwhoogte hoogstens 20m"
	},
	4: {
		"Ortogonaal": "Vrije keus",
		"Afstand gebouwen": "10 - 14", 
		"Minimale afstand openbare structuur": "18",
		"Verboden afstandszone": "14 - 28",
		"Minimale bouwhoogte": 20,
		"Maximale bouwhoogte": 60,
		"Bijzonder": "Aan de openbare kade dient een paralelle zijde te worden gebouwd"
	},
	5: {
		"Ortogonaal": "Ja",
		"Afstand gebouwen": "8 - 10", 
		"Minimale afstand openbare structuur": "16",
		"Verboden afstandszone": "10 - 24",
		"Minimale bouwhoogte": 15,
		"Maximale bouwhoogte": 30
	},
	6: {
		"Ortogonaal": "Ja",
		"Afstand gebouwen": "8 - 10",
		"Maximale loodrechte breedte": "8 - 10",
		"Minimale afstand openbare structuur": "16",
		"Verboden afstandszone gebouw": "10 - 24",
		"Verboden afstandszone openbare structuur": "20 - 32",
		"Minimale bouwhoogte": 15,
		"Maximale bouwhoogte": 30,
		"Bijzonder": "Aan de openbare kade dient een paralelle zijde te worden gebouwd"
	},
	7: {
		"Ortogonaal": "Ja",
		"Afstand gebouwen": "8 - 10", 
		"Minimale afstand openbare structuur": "16",
		"Verboden afstandszone": "10 - 24",
		"Minimale bouwhoogte": 15,
		"Maximale bouwhoogte": 30
	},
	8: {
		"Ortogonaal": "Ja",
		"Afstand gebouwen": "8 - 10",
		"Maximale loodrechte breedte": "14",
		"Minimale afstand openbare structuur": "16",
		"Verboden afstandszone gebouw": "10 - 24",
		"Verboden afstandszone openbare structuur": "24 - 32",
		"Minimale bouwhoogte": 15,
		"Maximale bouwhoogte": 30,
		"Bijzonder": "Aan de openbare kade dient een paralelle zijde te worden gebouwd"
	},
	9: {
		"Ortogonaal": "Ja",
		"Afstand gebouwen": "8 - 10",
		"Maximale loodrechte breedte": "22",
		"Minimale afstand openbare structuur": "16",
		"Verboden afstandszone gebouw": "10 - 24",
		"Verboden loodrechte breedte gebouw": "8 - 16",
		"Minimale bouwhoogte": 15,
		"Maximale bouwhoogte": 30,
		"Bijzonder": "Aan de openbare kade dient een paralelle zijde te worden gebouwd"
	},
	10: {
		"Ortogonaal": "Vrije keus",
		"Afstand gebouwen": "10 - 14", 
		"Minimale afstand openbare structuur": "18",
		"Verboden afstandszone": "14 - 28",
		"Minimale bouwhoogte": 15,
		"Maximale bouwhoogte": 30,
		"Bijzonder": "Aan de openbare kade dient een paralelle zijde te worden gebouwd"
	},
	11: {
		"Ortogonaal": "Vrije keus",
		"Afstand gebouwen": "10 - 14", 
		"Minimale afstand openbare structuur": "18",
		"Verboden afstandszone": "14 - 28",
		"Minimale bouwhoogte": 20,
		"Maximale bouwhoogte": 40,
		"Bijzonder": "Aan de kade dient een paralelle zijde te worden gebouwd"
	},
	12: {
		"Ortogonaal": "Vrije keus",
		"Afstand gebouwen": "10 - 14", 
		"Minimale afstand openbare structuur": "18",
		"Verboden afstandszone": "14 - 28",
		"Minimale bouwhoogte": 40,
		"Maximale bouwhoogte": 60,
		"Bijzonder": "Aan de kade dient een paralelle zijde te worden gebouwd"
	}
};

/* 
	define map variable to log mouse position to place circles
*/
var map = d3.selectAll("g")

// sliders
var sliderOne = d3.slider().axis(d3.svg.axis().ticks(5)).min(60).max(120).step(1)
	.on("slide", function(evt, valueOne) {
		document.getElementById("slider-one").value = valueOne;
	});
var sliderTwo = d3.slider().axis(d3.svg.axis().ticks(10)).min(15).max(60).step(1)
	.on("slide", function(evt, valueTwo) {
		document.getElementById("slider-two").value = valueTwo;
		
		for (var i = 0; i < polygons[0].length; i++) {
			if (polygons[0][i].id.includes("Regel")) {
				console.log(polygons[0][i])
				for (var j = 0; j < polygons[0][i].children.length; j++) {
					polygons[0][i].children[j].style.opacity = "0.5"
					polygons[0][i].children[j].style.fill = "#939393"
				};
			};
		};	
		
		Object.keys(rules).forEach(function(rule,index) {
			if (rules[rule]["Maximale bouwhoogte"] >= valueTwo && rules[rule]["Minimale bouwhoogte"] <= valueTwo) {
				for (var i = 0; i < polygons[0].length; i++) {
					if (polygons[0][i].id.includes("Regel")) {
						if (polygons[0][i].id.replace("Regel_", "") == (String(rule))) {
							for (var j = 0; j < polygons[0][i].children.length; j++) {
								polygons[0][i].children[j].style.opacity = "1"
								polygons[0][i].children[j].style.fill = "#E98532"
							};
						};
					}
				};
			};
		});		
	});

// log radio button click value
$("input[type=radio]").change(function() {
	type = this.id;
	
	if (type == "grondgebonden") {
		$("#bouwregels")[0].style.visibility = "hidden"
		d3.selectAll(".mouseDot").remove();
		
		for (var i = 0; i < polygons[0].length; i++) {
			if (polygons[0][i].id == "Grondgebonden") {
				for (var j = 0; j < polygons[0][i].children.length; j++) {
					for (k = 0; k < polygons[0][i].children[j].children.length; k++) {
						polygons[0][i].children[j].children[k].style.opacity = 1
						polygons[0][i].children[j].children[k].style.fill = "#E98532"
					};
				};				
			}	
		};
	};
	
	if (type == "appartement") {
		d3.selectAll(".mouseDot").remove();
		
		for (var i = 0; i < polygons[0].length; i++) {
			if (polygons[0][i].id == "Grondgebonden") {
				for (var j = 0; j < polygons[0][i].children.length; j++) {
					for (k = 0; k < polygons[0][i].children[j].children.length; k++) {
						polygons[0][i].children[j].children[k].style.opacity = 0
						polygons[0][i].children[j].children[k].style.fill = "#939393"
					};
				};				
			}	
		};
	};
	
	// call the sliders to display them on the page
	d3.select("#legend").append("text")
		.attr("class", "sliderOne")
		.attr("x", 10)
		.attr("y", 466)
		.text("Oppervlakte:")
		.style("font-size", "20px")
		.style("font-weight", "bold");
	
	d3.select("#legend").append("text")
		.attr("class", "sliderOne")
		.attr("x", 200)
		.attr("y", 466)
		.text("m2")
		.style("font-size", "20px")
		
	d3.select("#legend").append("text")
		.attr("class", "sliderTwo")
		.attr("x", 10)
		.attr("y", 365)
		.text("Hoogte:")
		.style("font-size", "20px")
		.style("font-weight", "bold");
		
	d3.select("#legend").append("text")
		.attr("class", "sliderTwo")
		.attr("x", 148)
		.attr("y", 365)
		.text("meter")
		.style("font-size", "20px")	
	
	if (clickStatus == 0) {	
		d3.select("#slider-hoogte").call(sliderTwo);	
		d3.select("#slider-oppervlakte").call(sliderOne);	
		d3.select("#slider-two-title")[0][0].style.visibility = "visible"		
		d3.select("#slider-one-title")[0][0].style.visibility = "visible"
		document.getElementById("slider-one").value = 60;		
	};
	
	if (type == "grondgebonden") {
		$("#slider-hoogte").hide();
		$(".sliderTwo").hide();
		d3.select("#slider-two-title")[0][0].style.visibility = "hidden";
	};
	if (type == "appartement") {
		$("#slider-hoogte").show();
		d3.select("#slider-two-title")[0][0].style.visibility = "visible"
		sliderTwo.value(15);
		document.getElementById("slider-two").value = 15;
	};
	
	// register the first click so that sliders don't get duplicated
	clickStatus = 1;
});

// log input	
inputOne = $("#slider-one").change(function() {
	sliderOne.value(document.getElementById("slider-one").value);
});

// log input	
inputTwo = $("#slider-two").change(function() {
	sliderTwo.value(document.getElementById("slider-two").value);
});

// activate map interactivity
var polygons = d3.selectAll("g")
	.on('mouseover', function () {
		//console.log(this.id);
		
		if (type == "grondgebonden") {
			if (this.id == "Grondgebonden") {
				this.style.opacity = 0.3;
			};
		};
		
		if (this.id.includes == "Regel") {
			console.log(this.id);
			this.style.opacity = 0.3;
		};
		
		d3.select(".legendColor").remove();
		
		d3.select("#legend").append("rect")
			.attr("id", this.id)
			.attr("class", "legendColor")
			.attr("x", 10)
			.attr("y", 180)
			.attr("width", 20)
			.attr("height", 20)
			.style("fill", this.children[0].style.fill)
		
		d3.select(".legendText").remove();
		
		// append text next to color tag
		d3.select("#legend").append("text")
			.attr("class", "legendText")
			.attr("id", this.id)
			.attr("x", 40)
			.attr("y", 195)
			.text(this.id)
			.style("font-size", "17px")
			.on('mouseover', function () {
				polygons[i].style.opacity = 0.1;
			})
			.on('mouseout', function () {
				polygons[i].style.opacity = 1;
			})
	})
	.on('mouseout', function () {
		this.style.opacity = 1;
		
		d3.select(".legendColor").remove();
		
		d3.select("#legend").append("rect")
			.attr("id", this.id)
			.attr("class", "legendColor")
			.attr("x", 10)
			.attr("y", 180)
			.attr("width", 20)
			.attr("height", 20)
			.style("fill", this.style.fill)
		
		d3.select(".legendText").remove();
		
		// append text next to color tag
		d3.select("#legend").append("text")
			.attr("class", "legendText")
			.attr("id", this.id)
			.attr("x", 40)
			.attr("y", 195)
			.text(this.id)
			.style("font-size", "17px")
	})
	.on('click', function () {
		// if clicked in available area, show options
		if (type == "grondgebonden") {
			if (this.id == "Grondgebonden") {
				var coords = d3.mouse(this);
						
				var newData = {
					x: Math.round(coords[0]),  // Takes the pixel number to convert to number
					y: Math.round(coords[1])
				};
				
				circleData = [];
				d3.selectAll(".mouseDot").remove();
				circleData.push(newData);
				
				map.selectAll("circle")
					.data(circleData)
					.enter()
					.append("circle")
					.attr("class", "mouseDot")
					.attr("cx", function(d){ return d.x; })
					.attr("cy", function(d){ return d.y; })
					.attr("r", 10)
					.style("fill", "red")			
			};
		};
		if (type == "appartement") {
			if (this.id.includes("Regel")) {
				var coords = d3.mouse(this);
						
				var newData = {
					x: Math.round(coords[0]),  // Takes the pixel number to convert to number
					y: Math.round(coords[1])
				};
				
				circleData = [];
				d3.selectAll(".mouseDot").remove();
				circleData.push(newData);
				
				map.selectAll("circle")
					.data(circleData)
					.enter()
					.append("circle")
					.attr("class", "mouseDot")
					.attr("cx", function(d){ return d.x; })
					.attr("cy", function(d){ return d.y; })
					.attr("r", 10)
					.style("fill", "red")

				//console.log(parseInt(this.id[(this.id.length - 1)]));
				
				var rule = rules[parseInt(this.id[(this.id.length - 1)])]
				
				$("#bouwregels")[0].dataset.content = ""
				
				Object.keys(rule).forEach(function(key,index) {
					$("#bouwregels")[0].dataset.content += key + ": " + rule[key] + "<br>";
				});				
								
				$("#bouwregels")[0].style.visibility = "visible"
			};
		};		
	});

// add legend title
d3.select("#legend").append("text")
	.attr("class", "responses")
	.attr("x", 10)
	.attr("y", 25)
	.text("Specificaties")
	.style("font-size", "20px")
	.style("font-weight", "bold")

// add available space tag in legend
d3.select("#legend").append("rect")
	.attr("x", 10)
	.attr("y", 150)
	.attr("width", 20)
	.attr("height", 20)
	.style("fill", "#E98532")

// append text next to color tag
d3.select("#legend").append("text")
	.attr("x", 40)
	.attr("y", 165)
	.text("beschikbare grond")
	.style("font-size", "17px")

// hardcoded responses (FOR NOW!)
var responses = ["Woningbouw", "Particulier", "Eén type gebouw"]

// show responses in the legend
for (var i = 0; i < responses.length; i++) {
	d3.select("#legend").append("text")
		.attr("class", "responses")
		.attr("x", 10)
		.attr("y", i*30 + 55)
		.text("- " + responses[i])
		.style("font-size", "17px")
};

// zoom functionality
$(function() {
	panZoomInstance = svgPanZoom("#Zones", {
		zoomEnabled: true,
		controlIconsEnabled: true,
		fit: false,
		center: true,
		minZoom: 0.6
	});

	// zoom out
	panZoomInstance.zoom(1)	
})