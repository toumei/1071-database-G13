var crypto = require("crypto");
var aes = "aes-256-cbc";
var pwd = "ResNetCMMSResNetCMMSResNetCMMS13";
var iv = "107-database-G13";

module.exports = class Crypto {
  static encrypt(data) {
    var jsonStr = JSON.stringify(data);
    var cipher = crypto.createCipheriv(aes, pwd, iv);
    var encrypted = cipher.update(jsonStr, "utf8", "hex");
    encrypted += cipher.final("hex");

    return encrypted;
  }

  static decrypt(data) {
    var decipher = crypto.createDecipheriv(aes, pwd, iv);
    var decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    var decryptedJSON = JSON.parse(decrypted);

    return decryptedJSON;
  }
};
