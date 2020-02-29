const user = require('./User');

$(document).ready(function() {});

$('#login').click(function() {
  $.get('fakeAccount.json', function(data) {
    user.getInstance().LogInAccount(data);
    $('#loginModal').modal('hide');
  });
});
