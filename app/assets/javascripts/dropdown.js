var mouse_inside = false;

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
  if (!mouse_inside) {
    $("#status-dropdown-content").removeClass('selected');
  }
});

$(document).ready(function() {
  $('#status-dropdown').hover(function() {
    mouse_inside = true;
  }, function() {
    mouse_inside = false;
  });
});
