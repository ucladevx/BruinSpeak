let confirm_public = "This petition is now public.";
let confirm_private = "This petition is now private.";
let prompt_public = "Click here to make this petition public.";
let prompt_private = "Click here to make this petition private.";

function replaceChild(el, message) {
    el.removeChild(el.firstChild);

    let loader = document.createElement("div");
    el.append(loader);
    loader.classList = "loader";
    el.innerText = message;
}

(function() {
  let el = document.getElementById('petition-notice');
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

  let btn = document.getElementById("petition-recievers-button");
  if(btn != null) {
    btn.onclick = function(e) {
      e.preventDefault();
      var newInput = "<input placeholder='Who?' type='text' name='petition[recievers][]'>";
      document.getElementById("petition-recievers").innerHTML += newInput;
    }
  }
})()
