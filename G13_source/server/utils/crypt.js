var crypto = require("crypto");
const log = require("../utils/logger");

var aes = "aes-256-cbc";
var pwd = "ResNetCMMSResNetCMMSResNetCMMS13";
var iv = "107-database-G13";

module.exports = class {
  static md5(data) {
    log.cryptMsg("md5", "encrypt", data);
    return crypto
      .createHash("md5")
      .update(data.toString())
      .digest("hex");
  }

  static encrypt(data) {
    if (data) {
      log.cryptMsg("aes-256-cbc", "encrypt", data);
      var jsonStr = JSON.stringify(data);
      var cipher = crypto.createCipheriv(aes, pwd, iv);
      var encrypted = cipher.update(jsonStr, "utf8", "hex");
      encrypted += cipher.final("hex");

      return encrypted;
    } else {
      console.log(data);
      return data;
    }
  }

  static decrypt(data) {
    if (data) {
      log.cryptMsg("aes-256-cbc", "decrypt", data);
      var decipher = crypto.createDecipheriv(aes, pwd, iv);
      var decrypted = decipher.update(data, "hex", "utf8");
      decrypted += decipher.final("utf8");
      var decryptedJSON = JSON.parse(decrypted);

      return decryptedJSON;
    } else {
      return data;
    }
  }
};
