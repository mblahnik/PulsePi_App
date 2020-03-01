/*
fs.readdir(directoryPath, function(err, files) {
  files.forEach(x => console.log(x));
});
*/

User.getInstance().addObserver(() => {
  setProfilePicture();
});

if (User.getInstance().isLoggedIn()) setUpProfilePage();
else clearForm();

$("#avatarChange").click(function() {
  addAvatarsToModal();
  $("#avatarSelectModal").modal("show");
});

function addAvatarsToModal() {
  let directoryPath = path.join(__dirname, "assets/img/avatars");
  fs.readdir(directoryPath, function(err, files) {
    files.forEach((x, i) => {
      if (!x.includes(".D"))
        $("#avatarList").append(`<div class="col-sm"> 
          <div class="card-body text-center shadow">
          <img src="${"assets/img/avatars/" +
            x}" id="ProfilePic" class="rounded-circle mb-3 mt-4" width="100" height="100">
          <div class="mb-3">
          <button class="btn btn-primary btn-sm" type="button" id="${i}">Select</button>
          </div>
          </div>
          </div> 
          <script> 
          $('#${i}').click(function(){
            User.getInstance().setAvatar("${"assets/img/avatars/" + x}")
            $("#avatarSelectModal").modal("hide");
          });
          </script>`);
    });
  });
}

function setUpProfilePage() {
  setFormValuesToUser();
  setProfilePicture();
}

function setProfilePicture() {
  $("#ProfilePic").attr("src", User.getInstance().AvatarUrl);
}

function setFormValuesToUser() {
  $("#ProfileUsername").val(User.getInstance().UserName);
  $("#ProfileEmail").val(User.getInstance().Email);
  $("#ProfileFirst").val(User.getInstance().FName);
  $("#ProfileMiddle").val(User.getInstance().MName);
  $("#ProfileLast").val(User.getInstance().LName);
}

function clearForm() {
  $("#ProfileUsername").val("");
  $("#ProfileEmail").val("");
  $("#ProfileFirst").val("");
  $("#ProfileMiddle").val("");
  $("#ProfileLast").val("");
}
