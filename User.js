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
    let avatarURL = "";

    return {
      // Public methods and variables
      addObserver: function(fn) {
        observers.push(fn);
      },
      isLoggedIn: function() {
        return loggedIn;
      },
      getAvatarUrl: function() {
        return avatarURL;
      }
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
