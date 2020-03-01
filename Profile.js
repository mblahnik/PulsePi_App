/*
fs.readdir(directoryPath, function(err, files) {
  files.forEach(x => console.log(x));
});
*/

if (User.getInstance().isLoggedIn()) setUpProfilePage();
else clearForm();

$('#avatarChange').click(function() {
  addAvatarsToModal();
  $('#avatarSelectModal').modal('show');
});

function addAvatarsToModal() {
  console.log('adding avatars...');
  let directoryPath = path.join(__dirname, 'assets/img/avatars');
  fs.readdir(directoryPath, function(err, files) {
    files.forEach(x => {
      if (!x.includes('.D'))
        $('#avatarList')
          .append(`<li> <div class="card-body text-center shadow"><img src="${'assets/img/avatars/' +
          x}" id="ProfilePic" class="rounded-circle mb-3 mt-4" width="160" height="160">
                                <div class="mb-3"><button class="btn btn-primary btn-sm" type="button">Select</button></div>
                                </div></li>`);
    });
  });
}

function setUpProfilePage() {
  setFormValuesToUser();
  setProfilePicture();
}

function setProfilePicture() {
  $('#ProfilePic').attr('src', User.getInstance().AvatarUrl);
}

function setFormValuesToUser() {
  $('#ProfileUsername').val(User.getInstance().UserName);
  $('#ProfileEmail').val(User.getInstance().Email);
  $('#ProfileFirst').val(User.getInstance().FName);
  $('#ProfileMiddle').val(User.getInstance().MName);
  $('#ProfileLast').val(User.getInstance().LName);
}

function clearForm() {
  $('#ProfileUsername').val('');
  $('#ProfileEmail').val('');
  $('#ProfileFirst').val('');
  $('#ProfileMiddle').val('');
  $('#ProfileLast').val('');
}
