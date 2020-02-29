const User = require("./User");

//id = UserDropDown

$(document).ready(function() {
  setProperNav();
});

//Handle what to do when the user logs in and out
User.getInstance().addObserver(() => {
  setProperNav();
});

function setTopNavLoggedIn() {
  $.get("UserNav-LoggedIn.html", function(data) {
    $("#UserDropDown").html(data);
    $("#logout-item").click(function() {
      console.log("logout Clicked");
    });
  });
}

function setTopNavLoggedOut() {
  $.get("UserNav-LoggedOut.html", function(data) {
    $("#UserDropDown").html(data);
    $("#login-item").click(function() {
      console.log("login clicked");
    });
  });
}

function setProperNav() {
  User.getInstance().isLoggedIn() ? setTopNavLoggedIn() : setTopNavLoggedOut();
}