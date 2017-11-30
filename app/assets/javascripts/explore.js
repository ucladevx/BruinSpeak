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
//var x = 250;
//var y = 150;
var count = 0;
var svg;
//var count = 0;
//var rowCounter = 0;

//var colorPick = 0;

/*
todo: randomize locations of the bubbles
make sure they dont overlap
*/

 //var data = new Object();
 var info = [];

function jsonify(name, url) {
	//var obj = {};
    var obj = new Object();

    obj.x = 45+(count*100);  //FIGURE OUT X AND Y 
    obj.y = 50;
    obj.name = name;
    obj.url = url;
    obj.r = maxsize;

    if (count < 3) 
    {
      obj.color = "292E49";
    }
    else 
    {
      obj.color = "11998e";
    }
    //console.log(obj);

    info.push(obj);
    //console.log(info);

   // data.info = info;
   // console.log(data);

    nextBubble();
}

function nextBubble() {
	if (maxsize > 80)
 	{
		maxsize = maxsize - 10; //make the next bubble smaller
	}
  count++;
}


function getRandomColor(num) {
    console.log(num);

     var colors = ["#292E49",  "11998e"];

     if (num < 3)
     {
      return colors[0];
     }
     return colors[1];
     num++;
 }

 var width = 1100;
 var height = 1100;

function createBubbles() {
  console.log(info);
 

 var svg = d3.select("svg")
 	.attr("width", window.innerWidth)
 	.attr("height", height)
  .attr("class", "bubble");
 //	.attr("transform", "translate(0,0)");

 var nodes = svg.selectAll("circle").data(info);

 nodes.enter().append("circle")
  .attr("cx", function(d){ return d.x; })
  .attr("cy", function(d){ return d.y; }); 

 nodes.attr("r", 0)
  .style("fill", function(d){return d.color;})
  .attr("r", function(d){return d.r;});

  nodes.enter().append("text")
        .attr("x", function(d){ return d.x; })
        .attr("y", function(d){ return d.y; })
        .attr("text-anchor", "middle")
        .text(function(d){ return d.name; })
        .style({
            "fill":"white", 
            "font-family":"Helvetica, sans-serif",
            "font-size": "12px"
        });

 
}


/*

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

	var circle = svg.append("circle")
		.attr("cx", x)
		.attr("cy", y)
		.style("fill", getRandomColor())
		.attr('class', 'click-circle')
		.attr("xlink:href", url)
		.attr("r", maxsize);
		
		//.attr("stroke", "black")
     	//.attr("stroke-width", 2); 

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
   			//.attr("dx", x-((1/3)*maxsize))
   			.attr("dx", x)
   			.attr("dy", y)
   			.attr("font-size", "12px")
   			.attr("fill", "black")  	//black text everywhere else
   			.attr("text-anchor", "middle")
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



*/