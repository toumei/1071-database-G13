var crypto = require("crypto");

module.exports = class Crypto {
  static encrypt(data) {
    var jsonStr = JSON.stringify(data);

    var cipher = crypto.createCipher(
      "aes-256-cbc",
      "residence network computerized maintenance management system"
    );

    var encrypted = cipher.update(jsonStr, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  }

  static decrypt(data) {
    var decipher = crypto.createDecipher(
      "aes-256-cbc",
      "residence network computerized maintenance management system"
    );
    var decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    var decryptedJSON = JSON.parse(decrypted);
    return decryptedJSON;
  }
};
