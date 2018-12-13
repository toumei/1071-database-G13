const crypto = require("crypto");
const aes = "aes-256-cbc";
const pwd = "ResNetCMMSResNetCMMSResNetCMMS13";
const iv = "107-database-G13";
const Crypt = {
  encrypt(data) {
    const jsonStr = JSON.stringify(data);
    const cipher = crypto.createCipheriv(aes, pwd, iv);
    let encrypted = cipher.update(jsonStr, "utf8", "hex");
    encrypted += cipher.final("hex");

    return encrypted;
  },

  decrypt(data) {
    const decipher = crypto.createDecipheriv(aes, pwd, iv);
    let decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    const decryptedJSON = JSON.parse(decrypted);

    return decryptedJSON;
  }
};

export default Crypt;
