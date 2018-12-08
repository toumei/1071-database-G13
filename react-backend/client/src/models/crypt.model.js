var crypto = require("crypto");
var aes = "aes-256-cbc";
var psd = "residence network computerized maintenance management system";
var Crypt = {
  encrypt(data) {
    var jsonStr = JSON.stringify(data);

    var cipher = crypto.createCipher(aes, psd);

    var encrypted = cipher.update(jsonStr, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  },

  decrypt(data) {
    var decipher = crypto.createDecipher(aes, psd);
    var decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    var decryptedJSON = JSON.parse(decrypted);
    return decryptedJSON;
  }
};

export default Crypt;
