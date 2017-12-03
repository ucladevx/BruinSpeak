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

var maxsize = 120; //max bubble size

var count = 0;
var svg;

var info = []; //holds all the bubble objects

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
      obj.color = "blue";
      obj.over = "#292E49";
    }
    else 
    {
      obj.color = "green";
      obj.over = "#11998E";
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

/*
function getRandomColor(num) {

    //console.log(num);

   //  var colors = ["#292E49",  "11998e"];

     if (num < 3)
     {
      return "blue";
     }
     return "green"; //returns the bubble colors
     num++;
 } */

 var width = 1100;
 var height = 1100;

function createBubbles() {
  //console.log(info);
 

 var svg = d3.select("svg")
 	.attr("width", window.innerWidth) //create svg where the bubbles will go
 	.attr("height", height)
//	.attr("transform", "translate(0,0)");

var blue = svg.append("svg:defs")     //blue linear gradient
    .append("svg:linearGradient")
    .attr("id", "blue")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%")

 blue.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "#292E49")

blue.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", "#536976")


  var green = svg.append("svg:defs") //green linear gradient 
    .append("svg:linearGradient")
    .attr("id", "green")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%")

 green.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "#11998e")

green.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", "#38ef7d")


 var nodes = svg.selectAll("circle").data(info);

 nodes.enter().append("circle")
  .attr("cx", function(d){ return d.x; })
  .attr("cy", function(d){ return d.y; }); 

 nodes.attr("r", 0)
  .style("fill", function(d){console.log('url(#' + d.color+ ')'); return 'url(#' + d.color+ ')';}) //get linear gradient color
 // .style("fill", "url(#green)")
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

  nodes.on("mouseover", function(d){
  
        var lbl = svg.selectAll("g").interrupt().data([d]);  
        lbl.enter().append("g");

  lbl.attr("pointer-events", "none")
            .attr("transform", function(d){ return "translate(" + d.x + "," + d.y + ")"; })
            .append("text")
            .attr("text-anchor", "middle")
            .text(function(d) {return d.name; })
            //.style("font-weight", "bold")
            .style("fill", function(d){return d.over;})
            .style({ 
            "font-family":"Helvetica, sans-serif", //overwrite the old text with same bubble color to remove old text 
            "font-size": "12.1px"
          });

        lbl.attr("pointer-events", "none")
            .attr("transform", function(d){ return "translate(" + d.x + "," + d.y + ")"; })
            .append("text")
            .attr("text-anchor", "middle")
            .text(function(d) {return d.name; })
            .transition()
            .style({
            "fill":"white", 
            "font-family":"Helvetica, sans-serif", //enlarge bubble text when hovered over 
            "font-size": "18px"
          });
  }
  )


    .on("mouseout", function(d){
            var lbl = svg.selectAll("g").data([]);
            lbl.exit().transition()
            //    .duration(200)
               .style({"fill-opacity": 0.0})
                .remove();
        }
    );


 
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