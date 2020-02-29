//const loginURL = 'https://pulsepi.azurewebsites.net/api/account/login'
const loginURL = 'fakeAccount.json';
const user = require('./User');

$(document).ready(function() {});

$('#login').click(function() {
  setSpinner();
  removeErrorMessage();
  //Simulate latency until endpoint is up and running
  setTimeout(function() {
    $.ajax({
      url: loginURL,
      type: 'GET',
      success: function(data) {
        user.getInstance().LogInAccount(data);
        $('#loginModal').modal('hide');
        removeSpinner();
      },
      error: function(data) {
        showErrorMessage();
        removeSpinner();
      }
    });
  }, 3000);
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
