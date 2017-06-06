var confirm_public = "This petition is now public.";
var confirm_private = "This petition is now private.";
var prompt_public = "Click here to make this petition public.";
var prompt_private = "Click here to make this petition private.";

function replaceChild(el, message) {
    el.removeChild(el.firstChild);

    var loader = document.createElement("div");
    el.append(loader);
    loader.classList = "loader";
    el.innerText = message;
}

function removeReciever(e) {
  e.preventDefault();

  this.parentElement.remove();
}

function initButtons() {
  $(".petition-create--btn").click(removeReciever);

  var el = document.getElementById('petition-notice');
  if(el != null) {
    el.onclick = function (){

      $.post( document.URL+"/public", function( data ) {
        var confirm_message = "";
        if (el.innerText == prompt_private)
          confirm_message = confirm_private;
        else
          confirm_message = confirm_public;

        el.classList = "notice alert alert-success";
        replaceChild(el, confirm_message);

        setTimeout(function() {
          // el.remove();
          var prompt_message = "";
          if (el.innerText == confirm_private)
            prompt_message = prompt_public;
          else
            prompt_message = prompt_private;

          el.classList = "notice alert alert-info";
          replaceChild(el, prompt_message);
        }, 3000);
      }).fail(function(err) {
        console.log(err);
        el.removeChild(el.firstChild);
        el.classList = "notice alert alert-danger";
        el.innerText = "There was a problem making this petition public.";
      });
    }
  }

  var btn = document.getElementById("petition-recievers-button");
  if(btn != null) {
    console.log("hi");
    btn.onclick = function(e) {
      e.preventDefault();

      var inHtml = '<input placeholder="Who?" type="text" name="petition[recievers][]" , class="petition-create--input petition-create--input--recievers"><button class="petition-create--btn">Remove</button>'

      var newInput = document.createElement("div");
      newInput.classList = ["petition-recievers-wrapper"];
      newInput.innerHTML = inHtml;
      newInput.children[1].onclick = removeReciever;
      document.getElementById("petition-recievers").append(newInput);
    }
  }
}

$(document).ready(function(){
    $('.dropdown-toggle').dropdown();
    initSearchOverride();

    initComments();
    initButtons();
})

function initComments() {
  $('.comment-reply').click(function() {
    $(this).closest('.comment').find('.reply-form').first().toggle();
  });
  console.log("Initializing comments.");
}

function initSearchOverride() {
  $('#search').val("");
  $('#search').keypress(function(e) {
    console.log("going");
    if(e.which == 13) {
      e.preventDefault();
      $('#search-btn').click();
    }
  });
}
