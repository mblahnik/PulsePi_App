const net = require("net");

/*SINGLETON */

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

    //private variables
    var sock = new net.Socket();
    var connectionStatus = false;
    sock.on("error", function(error) {
      sock.end();
      notifyObservers();
      connectionStatus = false;
    });

    return {
      // Public methods and variables
      connect: function(ip, port) {
        sock.connect(port, ip, function() {
          connectionStatus = true;
          notifyObservers();
        });
      },
      setInputHandler: function(fn) {
        sock.on("data", function(data) {
          fn(data);
        });
      },
      IsConnected: function() {
        return connectionStatus;
      },
      addObserver: function(fn) {
        observers.push(fn);
      },
      disconnect: function(fn) {
        sock.end();
        connectionStatus = false;
        notifyObservers();
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

/*class ClientSocket {
  constructor(ipAddress, port) {
    this.server_port = port;
    this.ip = ipAddress;
    this.socket = new net.Socket();
  }

  setInputHandler(fn) {
    this.socket.on("data", function(data) {
      fn(data);
    });
  }

  setErrorHandler(fn) {
    this.socket.on("error", function(error) {
      fn(error);
    });
  }

  connect() {
    this.socket.connect(this.server_port, this.ip, function() {
      console.log("Connected");
    });
  }
} */

module.exports = ClientSocket;
