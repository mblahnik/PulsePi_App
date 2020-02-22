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
    document.getElementById("wifi-icon").className = "fas fa-thumbs-up fa-fw";
  } else {
    setUpConnectionForm();
    document.getElementById("wifi-icon").className = "fas fa-thumbs-down fa-fw";
  }
});

//Set the dropdown to the Disconnect from device form.
function setUpDisconnectForm() {
  document.getElementById("connection-dropdown").innerHTML = `
  <h6 class="dropdown-header" id="connection">
      You are Connected
  </h6>
   <button type="button" class="btn btn-primarty" id="disconnect">Disconnect</button>
  `;
  addDisconnectListener();
}

function addDisconnectListener() {
  document.getElementById("disconnect").addEventListener("click", function() {
    console.log("disconnect pressed");
    ClientSocket.getInstance().disconnect();
  });
}

//Set the dropdown to the Connect to device form
function setUpConnectionForm() {
  document.getElementById(
    "connection-dropdown"
  ).innerHTML = `<h6 class="dropdown-header" id="connection">
                  Connect To Your Device
                 </h6>
                <form class="px-4 py-3">
  <div class="form-group">
    <button
      type="button"
      class="btn-primary"
      id="scan-btn"
    >
      Scan for device
    </button>
    <div id="scan-status"></div>
  </div>
  <div class="form-group">
    <div class="input-group mb-3">
      <input
        type="text"
        id="ipInput"
        class="form-control"
        placeholder="Ip Address"
      />
      <div class="input-group-append">
        <button type="button" class="btn btn-primary" id="connect-btn">
          Connect
        </button>
      </div>
    </div>
  </div>
</form>`;
  addConnectListen();
  addScanListener();
}

//Add listen to the connect button
function addConnectListen() {
  document.getElementById("connect-btn").addEventListener("click", function() {
    let ip = document.getElementById("ipInput").value;
    DeviceFound(ip);
  });
}

//Add listener to auto scan button
function addScanListener() {
  document.getElementById("scan-btn").addEventListener("click", function() {
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
  document.getElementById("scan-status").innerHTML = ``;
  document.getElementById("scan-btn").innerHTML = ` <span
                   class="spinner-border spinner-border-sm"
                   role="status"
                   aria-hidden="true"
                  ></span>
                  Scanning...
                  `;
}

/*What to do when the device is found via auto scan*/
function DeviceFound(ip) {
  const sock = ClientSocket.getInstance();
  sock.setInputHandler(x => console.log(x.toString()));
  sock.connect(ip, SERVER_PORT);
}

/*What to do when the device is not found via auto scan*/
function DeviceNotFound() {
  document.getElementById(
    "scan-status"
  ).innerHTML = `<span class="text-warning">Device not found</span>`;
}

/*What to do when the autoscan is finished*/
function DoneScanning() {
  document.getElementById("scan-btn").innerHTML = `Scan for device`;
}
