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
      UserName: 'TEST',
      addObserver: function(fn) {
        observers.push(fn);
      },
      isLoggedIn: function() {
        return loggedIn;
      },
      LogInAccount: function(account) {
        this.AccountId = account['AccountId'];
        this.UserName = account['UserName'];
        this.AvatarURL = account['AvatarUrl'];
        this.Email = account['Email'];
        this.FName = account['FName'];
        this.LName = account['LName'];
        this.MName = account['MName'];
        this.BirthDate = account['BirthDate'];
        setLoggedIn(true);
      },
      LogOutAccout: function() {
        setLoggedIn(false);
      },
      AccountId: '',
      UserName: '',
      AvatarUrl: '',
      Email: '',
      FName: '',
      LName: '',
      MName: '',
      BirthDate: ''
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
