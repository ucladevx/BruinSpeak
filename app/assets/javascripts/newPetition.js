var ids = ["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8"];
var last = 7;

$(document).ready(function(){
	var clicked = document.getElementById("d1");
	$(clicked).prop("checked", true);

	var question = document.getElementById("q0");
	question.focus();

	$(".inputBox").keyup(function(event) {

		if (event.keyCode === 13) {
	        $("#next").click();
	    }
	});

});

$("#next").on("click", function(){

	var active = getCurr();
	var curr = active[0];
	$(curr).toggleClass("hidden");
	$(curr).toggleClass("active");

	var index = parseInt(curr.id);
	var oldBox = ids[index];

	var i = index + 1;

	var newBox = ids[i];

	i.toString();

	var oBox = document.getElementById(oldBox);
	var nBox = document.getElementById(newBox);

	$(oBox).prop("checked", false);
	$(nBox).prop("checked", true);

	var next = document.getElementById(i);
	$(next).toggleClass("hidden");
	$(next).toggleClass("active");

	var qNext = document.getElementById("q" + i);
	qNext.focus();

});

function getCurr(){
	return document.getElementsByClassName("active");
}

$("input[name='q']").on("change", function(){
	var clicked = $('input[name=q]:checked', '#dots');
	switchDiv(clicked)
})

// switch to div toggled by corresponding radio button
function switchDiv(n){

	// get active div
	var active = getCurr();
	var curr = active[0];

	// hide it
	$(curr).toggleClass("hidden");
	$(curr).toggleClass("active");

	// get index of next button
	var index = parseInt(n.val());
	var i = (index).toString()

	// toggle it active and unhide
	var nextDiv = document.getElementById(i);
	$(nextDiv).toggleClass("hidden");
	$(nextDiv).toggleClass("active");

	// no next button on last question
	// var button = document.getElementById("next");
	// var finalID = (parseInt(nextDiv.id));
	// console.log(i + " " + finalID);
	// if(i == finalID){
	// 	$(button).addClass("hidden");
	// }
	// else{
	// 	console.log("working");
	// 	$(button).removeClass("hidden");
	// }

	var qNext = document.getElementById("q" + i);
	qNext.focus();

}
