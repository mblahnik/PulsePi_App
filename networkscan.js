const find = require("local-devices");
var net = require("net");

var arduinoMac = "a4:cf:12:85:61:10";
var arduinoIp;
var client = new net.Socket();

document.getElementById("test").addEventListener("click", function() {
  console.log("Scanning network...");
  scan();
});

//  {name : "", ip : "", mac: ""}
function scan() {
  find().then(devices => {
    devices.forEach(element => {
      if (element.mac == arduinoMac) {
        console.log("Arduino found at ip " + element.ip);
        arduinoIp = element.ip;
      }
    });
    if (arduinoIp) connect();
    else console.log("Arduino not found :(");
  });
}

function connect() {
  console.log("trying to connect to " + arduinoIp);
  client.connect(23, arduinoIp, function() {
    console.log("Connected");
  });
}

client.on("data", function(data) {
  console.log("Received: " + data);
  //client.destroy(); // kill client after server's response
});

client.on("close", function() {
  console.log("Connection closed");
});

document.getElementById("send").addEventListener("click", function() {
  let message = document.getElementById("input").value;
  console.log(message);
  client.write(message);
});
