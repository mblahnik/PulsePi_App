const find = require("local-devices");
class NetworkScanner {
  constructor() {}

  /**
   *
   * @param {*} macAddress
   */
  findDeviceByMac(macAddress) {
    return new Promise(resolve =>
      find().then(devices => {
        devices.forEach(element => {
          if (element.mac == macAddress) {
            resolve(element.ip);
          }
        });
        resolve(false);
      })
    );
  }
}

module.exports = NetworkScanner;
