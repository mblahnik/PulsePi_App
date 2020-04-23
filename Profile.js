const ProfilePage = {
  updateAccountUrl:
    'https://pulsepi.azurewebsites.net/api/account/updateAccount',
  updateBiometricURL:
    'https://pulsepi.azurewebsites.net/api/biometric/createBiometric',
  getBiometricDataUrl:
    'https://pulsepi.azurewebsites.net/api/biometric/getBiometrics',
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
  setBiometicData: function (data) {
    $('#UserWeight').val(data.weight);
    $('#UserHeight').val(data.height);
    $('#UserSex').val(data.sex);
    $('#UserDOB').val(data.dob);
  },
  getBiometricData: function () {
    $.ajax({
      url: ProfilePage.getBiometricDataUrl,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        username: User.getInstance().UserName,
      }),
      success: function (data) {
        console.log('Got biometrics');
        console.log(data);
        ProfilePage.setBiometicData(data);
      },
      error: function (data) {
        console.log('Error getting biometrics');
        console.log(data);
      },
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
  accountLoading: function () {
    $('#SaveSettingsBtn')
      .html(`<div class="spinner-border text-primary" role="status">
           <span class="sr-only">Loading...</span>
           </div>`);
  },
  accountNotLoading: function () {
    $('#SaveSettingsBtn').html(`Save&nbsp;Settings`);
  },
  setBiometricMessageOkay: function () {
    $('#BiometricMessage').html(
      `<span class="text-success">Biometrics Updated</span>`
    );
  },
  setAccountMessageOkay: function () {
    $('#SettingsMessage').html(
      `<span class="text-success">Settings Saved</span>`
    );
  },
  setBiometricMessageError: function () {
    $('#BiometricMessage').html(
      `<span class="text-danger">Error Updating Biometrics</span>`
    );
  },
  setAccountMessageError: function () {
    $('#SettingsMessage').html(
      `<span class="text-danger">Error Saving Settings</span>`
    );
  },
  setBiometricMessageClear: function () {
    $('#BiometricMessage').html(``);
  },
  setAccountMessageClear: function () {
    $('#SettingsMessage').html(``);
  },
  attachListeners: function () {
    $('#avatarChange').click(function () {
      ProfilePage.addAvatarsToModal();
      $('#avatarSelectModal').modal('show');
    });
    $('#SaveSettingsBtn').click(function () {
      ProfilePage.setAccountMessageClear();
      ProfilePage.accountLoading();
      $.ajax({
        url: ProfilePage.updateAccountUrl,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
          username: User.getInstance().UserName,
          avatarUrl: User.getInstance().AvatarUrl,
          firstName: $('#ProfileFirst').val(),
          middleName: $('#ProfileMiddle').val(),
          lastName: $('#ProfileLast').val(),
          email: $('#ProfileEmail').val(),
        }),
        success: function (data) {
          ProfilePage.setAccountMessageOkay();
          ProfilePage.accountNotLoading();
          User.getInstance().LogInAccount(data);
        },
        error: function (data) {
          ProfilePage.setAccountMessageError();
          ProfilePage.accountNotLoading();
        },
      });
    });
    $('#SavebiometricsBtn').click(function () {
      ProfilePage.biometricLoading();
      ProfilePage.setBiometricMessageClear();
      $.ajax({
        url: ProfilePage.updateBiometricURL,
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
        success: function (err) {
          ProfilePage.setBiometricMessageOkay();
          ProfilePage.biometricNotLoading();
        },
        error: function (err) {
          ProfilePage.setAccountMessageError();
          ProfilePage.biometricNotLoading();
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
    this.getBiometricData();
  },
};

User.getInstance().addObserver(() => {
  ProfilePage.setProfilePicture();
});
