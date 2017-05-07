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

function clearPicture(e) {
  e.preventDefault();
  let file = document.getElementById("user_profile_pic");

  file.value = null;
  let el = document.getElementById("file-upload-edit");
  el.style.display = "none";
}

function handleProfileUpload() {
  let preview = document.getElementById("profile-pic-preview");
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
  preview.insertBefore(img, preview.childNodes[0]);

  let reader = new FileReader();
  reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
  reader.readAsDataURL(file);

  let el = document.getElementById("file-upload-edit");
  el.style.display = "block";

  let btn = document.getElementById("clear-picture");
  btn.onclick = clearPicture;
}
