const net = require("net");

/*OBSERVABLE SINGLETON */

var ClientSocket = (function() {
  // Instance stores a reference to the Singleton
  var instance;

  function init() {
    // Singleton
    var observers = [];
    // Private methods
    function notifyObservers() {
      observers.forEach(x => x());
    }
    function setConnectionStatus(bool) {
      if (bool == connectionStatus) return;
      connectionStatus = bool;
      notifyObservers();
    }
    //private variables
    var sock = new net.Socket();
    sock.setKeepAlive(true, 5000);
    var connectionStatus = false;
    sock.on("error", function(error) {});
    sock.on("close", function(x) {
      setConnectionStatus(false);
    });

    return {
      // Public methods and variables
      connect: function(ip, port) {
        return sock.connect(port, ip, function() {
          sock.write("1");
          setConnectionStatus(true);
        });
      },
      setInputHandler: function(fn) {
        sock.on("data", function(data) {
          fn(data);
        });
      },
      setErrorHandler: function(fn) {
        sock.on("error", function() {
          fn();
        });
      },
      IsConnected: function() {
        return connectionStatus;
      },
      addObserver: function(fn) {
        observers.push(fn);
      },
      disconnect: function(fn) {
        sock.destroy();
        setConnectionStatus(false);
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

module.exports = ClientSocket;
