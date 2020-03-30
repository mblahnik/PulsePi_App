const CreateAccountURL = 'https://pulsepi.azurewebsites.net/api/';

const CreateAccountWindow = {
  remote: require('electron'),
  OpenWindow: function() {
    const win = new remote.BrowserWindow({
      width: 800,
      height: 600,
      icon: __dirname + './assets/img/icon/heart.png', //Set the icon for the system tray
      //frame: false,
      webPreferences: {
        nodeIntegration: true
      }
    });
    win.loadFile('Register.html');
    win.setMenu(null);
  },
  init: function() {
    $('#SubmitCreateAccountBtn').click(function() {
      //This should verify Inputs before sending.
      $.ajax({
        url: CreateAccountURL,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
          username: $('#CAUsernameInput').val(),
          password: $('#CAPasswordInput').val(),
          firstName: $('#CAFirstName').val(),
          lastName: $('#CALastName').val(),
          email: $('#CAInputEmail').val()
        }),
        success: function(data) {
          //Something Cool should happen
        },
        error: function(data) {
          //An error happened
        }
      });
    });
  }
};

CreateAccountWindow.init();

module.exports = CreateAccountWindow;
