const User = require("./User");

$(document).ready(function() {
  console.log("Ready");
});

//Handle what to do when the user logs in and out
User.getInstance().addObserver(() => {
  User.getInstance().isLoggedIn() ? console.log("Yes") : console.log("No");
});
