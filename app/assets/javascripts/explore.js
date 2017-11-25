// function getRandomColor() {
//     var colours = ["#00c0f1", "#add036", "#ec2426", "#ffc116"];
//     return colours[Math.floor(Math.random() * 4)]
// }
//
// var maxDiam = 200;
// var circleNum = 4;
// var container = $(".center-info")
// var containerWidth = container.width();
// var containerHeight = container.height();
//
// $(document).ready(function() {
//     for (var i = 0; i < circleNum; i++) {
//         var newCircle = $("<div />")
//         var d = Math.floor(Math.random() * maxDiam);
//         newCircle.addClass("circle");
//
//         newCircle.css({
//             width: d,
//             height: d,
//             left: Math.random() * Math.max(containerWidth - d, 0),
//             top: Math.random() * Math.max(containerHeight - d, 0),
//             backgroundColor: getRandomColor()
//         });
//         container.append(newCircle);
//     }
// });

//http://vallandingham.me/bubble_charts_in_js.html
//https://github.com/vlandham/bubble_chart/blob/gh-pages/src/bubble_chart.js

var maxsize = 120;
var x = 250;
var y = 150;

var svg;
var count = 0;
var rowCounter = 0;

var colorPick = 0;

/*
todo: randomize locations of the bubbles
make sure they dont overlap

how to read in the text, all examples online use csv???
figure out the window size restriction in the csss
*/

 var data = new Object();
 var nodes = [];

function jsonify(name, url) {
	var obj = {};

    obj.name = name;
    obj.url = url;
    console.log(obj);

    nodes.push(obj);
    console.log(nodes);

    data.nodes = nodes;
    console.log(data);
}

function getRandomColor() {
	/*
     var colours = ["#00c0f1", "#add036", "#ec2426", "#ffc116", "#FFF95F", "#83B8FD"];
     return colours[Math.floor(Math.random() * 6)]
     */

     var colors = ["#292E49",  "11998e"];
     return colors[colorPick];

 }

function makeBubble(name, url) {

if (count == 0)
{
	svg = d3.select("#explore-chart")
	.append("svg")
	.attr("width", 1100)
	.attr("height", 1100)
	.append("g")
	.attr("transform", "translate(0,0)");
}
//	alert(name);

	var circle = svg.append("circle")
		.attr("cx", x)
		.attr("cy", y)
		.style("fill", getRandomColor())
		.attr('class', 'click-circle')
		.attr("xlink:href", url)
		.attr("r", maxsize);
		/*
		.attr("stroke", "black")
     	.attr("stroke-width", 2); */

     	if (count == 2)
     	{
     		colorPick = 1; //switch colors after the 3rd circle of the first row
     	}

     	if (maxsize >= 100)
     	{

     		var text = svg.append("text") //add text 
   			.attr("dx", x-((1/3)*maxsize))
   			.attr("dy", y)
   			.attr("font-size", "12px")
   			.attr("fill", "white")  	//white text top row only
   			.text(name);
     		x+=maxsize*2;
     		if (maxsize == 100)
     		{
     			x = 250;
     			y += 250;
     		}

     	
     	}
     	else if (maxsize >= 80)
     	{
     	var text = svg.append("text") 	//add text
   			.attr("dx", x-((1/3)*maxsize))
   			.attr("dy", y)
   			.attr("font-size", "12px")
   			.attr("fill", "black")  	//black text everywhere else
   			.text(name);
     		x+=maxsize*2;
  			if (rowCounter == 4)	//new row, push bubbles down 1
  			{
  				x = 250;
  				y+= 170;
  				rowCounter = 0;
  			}
  			rowCounter++;

  	
     	}


	count++;
  	nextBubble(); //get new bubble size
}

function nextBubble() {
	if (maxsize > 80)
 	{
		maxsize = maxsize - 10; //make the next bubble smaller
	}
}

svg.on('click', function() {
        var coords = d3.mouse(this);
        console.log(coords);
        window.open(url, '_blank');
        //alert("works");
    });

/*
var circle = svg.append("circle")
	.attr("cx", 30)
    .attr("cy", 30)
     .attr("r", 20)
     .style("fill", "blue");

var circle2 = svg.append("circle")
	.attr("cx", 90)
    .attr("cy", 90)
     .attr("r", 50);


var circle3 = svg.append("circle")
	.attr("cx", 300)
	.attr("cy", 210)
	.style("fill", "red")
	.attr("r", 200);

	*/
