$(function() {
  (function (){
    let el = document.getElementById("profile_upload");
    let file = document.getElementById("user_profile_pic");

    el.onclick = function(e) {
      e.preventDefault();
      file.click();
    }

    var fileSelect = document.getElementById("user_profile_pic");
    fileSelect.addEventListener("change", handleProfileUpload, false);
  })()
})

function handleProfileUpload() {
  let preview = document.getElementById("profile-pic-edit");
  let files = this.files;
  let file = files[0];
  let imageType = /^image\//;

  if(!imageType.test(file.type)) {
    return;
  }

  let img = document.createElement("img");
  img.classList.add("img-circle");
  img.classList.add("profile-preview");
  img.file = file;
  img.width = 150;
  img.alt = "profile picture";
  preview.removeChild(preview.firstElementChild)
  preview.append(img);

  let reader = new FileReader();
  reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
  reader.readAsDataURL(file);
}
