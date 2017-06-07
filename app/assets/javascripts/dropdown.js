var dropDown = function() {
  'use strict';

  $('.dropdown').click(function(e){
     e.stopPropagation();
      $('#dropdown-content').toggleClass('selected');
  });
};

document.addEventListener("turbolinks:load", function() {
  dropDown();
})

$(document).click(function(){
  $("#dropdown-content").removeClass('selected');
});
