const loginURL = 'https://pulsepi.azurewebsites.net/api/account/login';
//const loginURL = "fakeAccount.json";

$(document).ready(function() {});

$('#CreateAccountLink').click(function() {
  require('./CreateAccount').OpenWindow();
});

$('#login').click(function() {
  setSpinner();
  removeErrorMessage();

  $.ajax({
    url: loginURL,
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({
      username: $('#usernameInput').val(),
      password: $('#passwordInput').val()
    }),
    success: function(data) {
      User.getInstance().LogInAccount(data);
      $('#loginModal').modal('hide');
      removeSpinner();
      $('#usernameInput').val('');
      $('#passwordInput').val('');
    },
    error: function(data) {
      showErrorMessage();
      removeSpinner();
    }
  });
});

function showErrorMessage() {
  $('#error').html('Invalid Username or password');
}
function removeErrorMessage() {
  $('#error').html('');
}
function setSpinner() {
  $('#login').html(`<div class="spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>`);
}

function removeSpinner() {
  $('#login').html(`LogIn`);
}
