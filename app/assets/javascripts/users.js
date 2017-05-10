$(function() {
  (function (){
    var el = document.getElementById("profile_upload");
    var file = document.getElementById("user_profile_pic");

    var clear = document.getElementById("button-clear");
    clear.onclick = function(e) {
      e.preventDefault();
      location.reload();
    }

    el.onclick = function(e) {
      e.preventDefault();
      file.click();
    }

    var fileSelect = document.getElementById("user_profile_pic");
    fileSelect.addEventListener("change", handleProfileUpload, false);
  })()
})

function handleProfileUpload() {
  var preview = document.getElementById("profile-pic-edit");
  var files = this.files;
  var file = files[0];
  var imageType = /^image\//;

  if(!imageType.test(file.type)) {
    return;
  }

  var img = document.createElement("img");
  img.classList.add("img-circle");
  img.classList.add("profile-preview");
  img.file = file;
  img.width = 150;
  img.alt = "profile picture";
  preview.removeChild(preview.firstElementChild)
  preview.append(img);

  var reader = new FileReader();
  reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
  reader.readAsDataURL(file);
}
