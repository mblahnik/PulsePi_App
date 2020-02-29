const User = require('./User');

//id = UserDropDown

$(document).ready(function() {
  $.get('Login-modal.html', function(data) {
    $('#modalContainer').html(data);
  });
  setProperNav();
});

//Handle what to do when the user logs in and out
User.getInstance().addObserver(() => {
  setProperNav();
});

function setTopNavLoggedIn() {
  $.get('UserNav-LoggedIn.html', function(data) {
    $('#UserDropDown').html(data);
    //Set the name next to the Avatar to the Users Name
    $('#namePlate').text(
      User.getInstance().FName + ' ' + User.getInstance().LName
    );
    //Add Listener To LogOut Button
    $('#logout-item').click(function() {
      User.getInstance().LogOutAccout();
    });
  });
}

function setTopNavLoggedOut() {
  $.get('UserNav-LoggedOut.html', function(data) {
    $('#UserDropDown').html(data);
  });
}

function setProperNav() {
  User.getInstance().isLoggedIn() ? setTopNavLoggedIn() : setTopNavLoggedOut();
}
