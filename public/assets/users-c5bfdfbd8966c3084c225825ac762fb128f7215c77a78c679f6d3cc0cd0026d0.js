function handleProfileUpload(){var e=document.getElementById("profile-pic-edit"),t=this.files,n=t[0];if(/^image\//.test(n.type)){var o=document.createElement("img");o.classList.add("img-circle"),o.classList.add("profile-preview"),o.file=n,o.width=150,o.alt="profile picture",e.removeChild(e.firstElementChild),e.append(o);var i=new FileReader;i.onload=function(e){return function(t){e.src=t.target.result}}(o),i.readAsDataURL(n)}}$(document).on("click",function(e){console.log(e.target),$(e.target).is(".dropdown")||$(".dropdown-content").removeClass("selected")}),$(function(){!function(){var e=document.getElementById("profile_upload"),t=document.getElementById("user_profile_pic"),n=document.getElementById("button-clear");n&&(n.onclick=function(e){e.preventDefault(),location.reload()}),e&&(e.onclick=function(e){e.preventDefault(),t.click()});var o=document.getElementById("user_profile_pic");o&&o.addEventListener("change",handleProfileUpload,!1)}()});