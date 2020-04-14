const ProfilePage = {
  updateAccountUrl: '',
  updateBiometricURL: '',
  setFormValuesToUser: function () {
    $('#ProfileUsername').val(User.getInstance().UserName);
    $('#ProfileEmail').val(User.getInstance().Email);
    $('#ProfileFirst').val(User.getInstance().FName);
    $('#ProfileMiddle').val(User.getInstance().MName);
    $('#ProfileLast').val(User.getInstance().LName);
  },
  setProfilePicture: function () {
    $('#ProfilePic').attr('src', User.getInstance().AvatarUrl);
  },
  addAvatarsToModal: function () {
    let directoryPath = path.join(__dirname, 'assets/img/avatars');
    fs.readdir(directoryPath, function (err, files) {
      files.forEach((x, i) => {
        if (x.includes('.jpg') || x.includes('.png'))
          $('#avatarList').append(`<div class="col-md"> 
            <div class="card-body text-center shadow">
            <img src="${
              'assets/img/avatars/' + x
            }" id="ProfilePic" class="rounded-circle mb-3 mt-4" width="100" height="100">
            <div class="mb-3">
            <button class="btn btn-primary btn-sm" type="button" id="${i}">Select</button>
            </div>
            </div>
            </div> 
            <script> 
            $('#${i}').click(function(){
              User.getInstance().setAvatar("${'assets/img/avatars/' + x}")
              $("#avatarSelectModal").modal("hide");
              $('#avatarList').html('')
            });
            </script>`);
      });
    });
  },
  biometricLoading: function () {
    $('#SavebiometricsBtn')
      .html(`<div class="spinner-border text-primary" role="status">
           <span class="sr-only">Loading...</span>
           </div>`);
  },
  biometricNotLoading: function () {
    $('#SavebiometricsBtn').html(`Save&nbsp;Biometrics`);
  },
  attachListeners: function () {
    $('#avatarChange').click(function () {
      ProfilePage.addAvatarsToModal();
      $('#avatarSelectModal').modal('show');
    });
    $('#SaveSettingsBtn').click(function () {
      $.ajax({
        url: updateAccountUrl,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function () {},
        error: function () {},
      });
    });
    $('#SavebiometricsBtn').click(function () {
      ProfilePage.biometricLoading();
      $.ajax({
        url: updateBiometricURL,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
          username: User.getInstance().UserName,
          height: $('#UserHeight').val(),
          weight: $('#UserWeight').val(),
          sex: $('#UserSex').val(),
          dob: $('#UserDOB').val(),
        }),
        success: function () {
          // biometricNotLoading();
        },
        error: function () {
          // biometricNotLoading();
        },
      });
    });
  },
  init: function () {
    this.attachListeners();
    $('#avatarSelectModal').on('hidden.bs.modal', function () {
      $('#avatarList').html('');
    });
    this.setFormValuesToUser();
    this.setProfilePicture();
  },
};

User.getInstance().addObserver(() => {
  ProfilePage.setProfilePicture();
});
