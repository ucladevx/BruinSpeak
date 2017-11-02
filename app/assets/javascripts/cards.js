// implements clicked cards, doesn't do anything yet
$(".card").on("click", function(){
  console.log("clicked");
});

jQuery(document).ready(function($) {
  $('.counter').counterUp({
      delay: 10,
      time: 1000
    });
});
