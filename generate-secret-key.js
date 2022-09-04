const crypto = require("crypto");

const accessSecretKey1 = crypto.randomBytes(64).toString("hex");
const accessSecretKey2 = crypto.randomBytes(64).toString("hex");

console.log({ accessSecretKey1, accessSecretKey2 });
