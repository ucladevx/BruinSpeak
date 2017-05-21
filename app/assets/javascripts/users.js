$(function() {
  (function (){
    var el = document.getElementById("profile_upload");
    var file = document.getElementById("user_profile_pic");

    var clear = document.getElementById("button-clear");
    if(!!clear) {
      clear.onclick = function(e) {
        e.preventDefault();
        location.reload();
      }
    }

    if(!!el) {
      el.onclick = function(e) {
        e.preventDefault();
        file.click();
      }
    }

    var fileSelect = document.getElementById("user_profile_pic");
    if(fileSelect) {
      fileSelect.addEventListener("change", handleProfileUpload, false);
    }
  })();

  (function() {
    // TODO: Clean this up later!

    let sel = document.getElementById("profile-role");
    let btn = document.getElementById("profile-role-button");
    if(btn && sel) {
      btn.onclick = function(e) {
        let parent = document.getElementById("profile-role-change");
        let wrapper = document.getElementById("profile-wrapper");
        let roleEl = document.getElementsByClassName("prof-sub")[1];

        const roles = {
          0 : "Role: Default",
          1 : "Role: Government",
          2 : "Role: Admin"
        }

        let self = this;
        e.preventDefault();
        let newRole = parseInt(sel.value,10);
        this.disabled = true;
        let loader = document.createElement("div");
        loader.classList = ["loader"];
        parent.prepend(loader);

        $.post(document.URL+"/role", { role: newRole })
          .done(function(data) {
            let notice = document.createElement("div")
            notice.classList = "notice alert alert-info";
            notice.innerText = "Role changed successfully";
            roleEl.innerText = roles[newRole];
            loader.remove();
            parent.prepend(notice);
            self.disabled = false;
            setTimeout(function() {
              notice.remove();
            }, 3000);
          }).fail(function(err) {
            console.log(err);
            let notice = document.createElement("div")
            notice.classList = "notice alert alert-danger";
            notice.innerText = "There was a problem changing the role";
            parent.prepend(notice);
            loader.remove();
            self.disabled = false;
            setTimeout(function() {
              notice.remove();
            }, 3000);
          });
      }
    }
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
