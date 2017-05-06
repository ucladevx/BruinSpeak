$(function() {
  (function (){
    let el = document.getElementById("profile_upload");
    let file = document.getElementById("user_profile_pic");

    el.onclick = function(event) {
      file.click();
    }
  })()
})
