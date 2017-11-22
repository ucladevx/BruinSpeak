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
  $(".petition-create--btn").unbind('click').click(removeReciever);

  var sign_mobile = document.getElementById('sign-mobile');
  if (sign_mobile != null) {
    sign_mobile.onclick = function(e) {
      e.preventDefault();

      console.log("Clicking mobile sign button");

      if ($("#petition-overlay").css("visibility") == "hidden") {
        $("#petition-overlay").css("visibility", "visible");
        $("#share-card-mobile").css("visibility", "visible");
      }
      else {
        $("#petition-overlay").css("visibility", "hidden");
        $("#share-card-mobile").css("visibility", "hidden");
      }
    }
  }

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

function autocomplete()
{
  var petitions = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: 'searchPetitions/?search=%QUERY',
      wildcard: '%QUERY'
    }
  });

  var users = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('first_name' + 'last_name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: 'searchUsers/?search=%QUERY',
      wildcard: '%QUERY'
    }
  });

  var tags = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: 'searchTags/?search=%QUERY',
      wildcard: '%QUERY'
    }
  });

  petitions.initialize();
  tags.initialize();
  users.initialize();
  $('.typeahead').typeahead({
    hint: false,
    highlight: true
  },
  {
    name: 'petitions',
    displayKey: 'title',
    source: petitions.ttAdapter(),
    limit: 10,
    templates: {
      header: '<h4 class="league-name">Petitions</h4>'
    }
  },
  {
    name: 'users',
    source: users.ttAdapter(),
    displayKey: function(user) {
      return user.first_name + " " + user.last_name
    },
    limit: 10,
    templates: {
      header: '<h4 class="league-name">Users</h4>'
    }
  },
  {
    name: 'tags',
    displayKey: 'name',
    source: tags.ttAdapter(),
    limit: 10,
    templates: {
      header: '<h4 class="league-name">Tags</h4>'
    }
  })

  .on('typeahead:select', submitSuggestion)
  .on('keydown', function(event) {
    if (event.which === 13) {
      submitSuggestion();
    }
  });
}

function submitSuggestion() {
  $('#search-btn').click();
}

$('#new-petition-form').carousel({
    interval: false,
})

$(document).ready(function(){
    $('.dropdown-toggle').dropdown();
    initSearchOverride();
    checkitem();
    initButtons();
    autocomplete();
})

function checkitem()                        // check function
{
    var $this = $('#new-petition-form');
    if ($('.carousel-inner .item:first').hasClass('active')) {
        // Hide left arrow
        $('#left-arrow-petition-form').hide();
        // But show right arrow
        $('#right-arrow-petition-form').show();
    } else if ($('.carousel-inner .item:last').hasClass('active')) {
        // Hide right arrow
        $('#right-arrow-petition-form').hide();
        // But show left arrow
        $('#left-arrow-petition-form').show();
    } else {
        $('#left-arrow-petition-form').show();
        $('#right-arrow-petition-form').show();
    }
}

document.addEventListener("turbolinks:load", function() {
  initPetitionDropdown();
  initComments();
  initButtons();
  checkitem();
  autocomplete();
  $('#new-petition-form').on('slid.bs.carousel', checkitem);
})

function initPetitionDropdown() {
  $('#status-dropdown').off('click').on('click', function(e) {
    $dropdown = $('.status-dropdown-content');
    if($dropdown.hasClass('selected')) {
      $dropdown.removeClass('selected');
    } else {
      $dropdown.addClass('selected');
    }
  })
}

function initComments() {
  $('.comment-reply').closest('.comment').find('.reply-form').hide()
  $('.comment-reply').unbind('click').bind('click', function() {
    $(this).closest('.comment').find('.reply-form').first().toggle();
  });
  console.log("Initializing comments.");
}

function initSearchOverride() {
  $('#search').val("");
  $('#search').unbind('keypress').keypress(function(e) {
    console.log("going");
    if(e.which == 13) {
      e.preventDefault();
      $('#search-btn').click();
    }
  });
}
