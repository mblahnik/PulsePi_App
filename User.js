/*SINGLETON OBSERVABLE*/
var User = (function() {
  // Instance stores a reference to the Singleton
  var instance;

  function init() {
    // Singleton
    var observers = [];
    // Private methods
    function notifyObservers() {
      observers.forEach(x => x());
    }

    function setLoggedIn(bool) {
      if (loggedIn == bool) return;
      loggedIn = bool;
      notifyObservers();
    }

    //private variables
    let loggedIn = false;

    return {
      // Public methods and variables
      addObserver: function(fn) {
        observers.push(fn);
      },
      isLoggedIn: function() {
        return loggedIn;
      },
      LogInAccount: function(account) {
        this.UserName = account["username"];
        this.AvatarUrl = account["avatarUrl"];
        this.Email = account["email"];
        this.FName = account["firstName"];
        this.LName = account["lastName"];
        this.MName = account["middleName"];
        this.BirthDate = account["birthDate"];
        setLoggedIn(true);
      },
      LogOutAccout: function() {
        setLoggedIn(false);
      },
      setAvatar: function(url) {
        this.AvatarUrl = url;
        notifyObservers();
      },
      UserName: "",
      AvatarUrl: "",
      Email: "",
      FName: "",
      LName: "",
      MName: "",
      BirthDate: ""
    };
  }

  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function() {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };
})();

module.exports = User;
