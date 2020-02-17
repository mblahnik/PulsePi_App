const find = require("local-devices");
var net = require("net");

const SERVER_PORT = 23;

var arduinoMac = "a4:cf:12:85:61:10";
var arduinoIp;
var client = new net.Socket();

document.getElementById("test").addEventListener("click", function() {
  console.log("Scanning network...");
  scan();
});

/* Set the ip of the Arduino manually */
function setIp(ip) {
  arduinoIp = ip;
}

/* Scan the local netwrok looking for the arduino.
   If the arduino is found, the ip will be set */
// devices format -> {name : "", ip : "", mac: ""}
function scan() {
  find().then(devices => {
    devices.forEach(element => {
      if (element.mac == arduinoMac) {
        console.log("Arduino found at ip " + element.ip);
        setIp(element.ip);
      }
    });
    if (arduinoIp) connect();
    else console.log("Arduino not found :(");
  });
}

/* Attempt to open a client socket with the Arduino. */
function connect() {
  console.log("trying to connect to " + arduinoIp);
  client.connect(SERVER_PORT, arduinoIp, function() {
    console.log("Connected");
  });
}

/* Set what happens when the Arduino sends over data */
client.on("data", function(data) {
  console.log("Received: " + data);
  //client.destroy(); // kill client after server's response
});

/* Set what happens when the socket it closed */
client.on("close", function() {
  console.log("Connection closed");
});

client.on("error", function(err) {
  console.log("An error has occured");
});

document.getElementById("send").addEventListener("click", function() {
  let message = document.getElementById("input").value;
  console.log(message);
  client.write(message);
});
