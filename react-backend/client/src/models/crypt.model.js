const crypto = require("crypto");

const aes = "aes-256-cbc";
const pwd = "ResNetCMMSResNetCMMSResNetCMMS13";
const iv = "107-database-G13";
const coding = "utf8";
const binaryCoding = "hex";

export const encrypt = data => {
  if (data) {
    console.log("encrypt: " + data);
    var jsonStr = JSON.stringify(data);
    var cipher = crypto.createCipheriv(aes, pwd, iv);
    var encrypted = cipher.update(jsonStr, "utf8", "hex");
    encrypted += cipher.final("hex");

    return encrypted;
  } else {
    console.log(data);
    return data;
  }
};

export const decrypt = data => {
  if (data) {
    var decipher = crypto.createDecipheriv(aes, pwd, iv);
    var decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    var decryptedJSON = JSON.parse(decrypted);

    return decryptedJSON;
  } else {
    return data;
  }
};
