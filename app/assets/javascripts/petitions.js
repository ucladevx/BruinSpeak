(function() {
  let el = document.getElementById('petition-notice');
  if(el != null) {
    el.onclick = function (){
      let loader = document.createElement("div");

      el.innterText = "";
      el.append(loader);
      loader.classList = "loader";


      $.post( document.URL+"/public", function( data ) {
        el.removeChild(el.firstChild);
        el.classList = "notice alert alert-success";
        el.innerText = "This petition is now public";

        setTimeout(function() {
          el.remove();
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
