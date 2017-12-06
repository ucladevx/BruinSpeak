// implements clicked cards, doesn't do anything yet
$(".card").on("click", function(){
  console.log("clicked");
});

document.addEventListener("turbolinks:load", function() {
  // update counters on home page
  var odometer1 = document.getElementById("odometer1");
  var odometer2 = document.getElementById("odometer2");

  var count1 = document.getElementById("count1");
  var count2 = document.getElementById("count2");
  setTimeout(function(){
    // odometer1.innerHTML = count1.innerHTML;
    // odometer2.innerHTML = count2.innerHTML;

    // hard coded for now
    odometer1.innerHTML = 576;
    odometer2.innerHTML = 1738;
  }, 1000);
});
