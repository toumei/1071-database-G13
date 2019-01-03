const crypto = require("crypto");

const aes = "aes-256-cbc";
const pwd = "ResNetCMMSResNetCMMSResNetCMMS13";
const iv = "107-database-G13";
const coding = "utf8";
const binaryCoding = "hex";

export const encrypt = data => {
  const jsonStr = JSON.stringify(data);
  const cipher = crypto.createCipheriv(aes, pwd, iv);
  let encrypted = cipher.update(jsonStr, coding, binaryCoding);
  encrypted += cipher.final(binaryCoding);

  return encrypted;
};

export const decrypt = data => {
  const decipher = crypto.createDecipheriv(aes, pwd, iv);
  let decrypted = decipher.update(data, binaryCoding, coding);
  decrypted += decipher.final(coding);
  const decryptedJSON = JSON.parse(decrypted);

  return decryptedJSON;
};
