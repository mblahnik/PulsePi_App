const ClientSocket = require("./ArduinoConnction/ClientSocket");
const NetworkScanner = require("./ArduinoConnction/NetworkScanner");
const $ = require("jquery");
const SERVER_PORT = 23;
const arduinoMac = "a4:cf:12:85:61:10";

$(document).ready(function() {
  setUpConnectionForm();
});

//Set the Icon for the dropdown depending on the Connection state
ClientSocket.getInstance().addObserver(function() {
  if (ClientSocket.getInstance().IsConnected()) {
    setUpDisconnectForm();
    $("#wifi-icon")
      .removeClass()
      .addClass("fas fa-thumbs-up fa-fw");
  } else {
    setUpConnectionForm();
    $("#wifi-icon")
      .removeClass()
      .addClass("fas fa-thumbs-down fa-fw");
  }
});

//Set the dropdown to the Disconnect from device form.
function setUpDisconnectForm() {
  $.get("disconnect-form.html", function(data) {
    $("#connection-dropdown").html(data);
    addDisconnectListener();
  });
}

function addDisconnectListener() {
  $("#disconnect").click(function() {
    ClientSocket.getInstance().disconnect();
  });
}

//Set the dropdown to the Connect to device form
function setUpConnectionForm() {
  $.get("connection-form.html", function(data) {
    $("#connection-dropdown").html(data);
    addConnectListen();
    addScanListener();
  });
}

//Add listen to the connect button
function addConnectListen() {
  $("#connect-btn").click(function() {
    let ip = $("#ipInput").val();
    DeviceFound(ip);
  });
}

//Add listener to auto scan button
function addScanListener() {
  $("#scan-btn").click(function() {
    const scan = new NetworkScanner();
    StartScanning();
    scan
      .findDeviceByMac(arduinoMac)
      .then(result => {
        ip = result;
      })
      .then(() => {
        if (ip) {
          DeviceFound(ip);
        } else {
          DeviceNotFound();
        }
      })
      .then(() => {
        DoneScanning();
      });
  });
}

/*Hook for start of scan*/
function StartScanning() {
  $("#scan-status").html("");
  $("#scan-btn").html(`<span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    ></span>
                    Scanning...
                  `);
}

/*What to do when the device is found via auto scan*/
function DeviceFound(ip) {
  const sock = ClientSocket.getInstance();
  sock.setInputHandler(x => console.log(x.toString()));
  sock.connect(ip, SERVER_PORT);
}

/*What to do when the device is not found via auto scan*/
function DeviceNotFound() {
  $("#scan-status").html(`<span class="text-warning">Device not found</span>`);
}

/*What to do when the autoscan is finished*/
function DoneScanning() {
  $("#scan-btn").html(`Scan for device`);
}
