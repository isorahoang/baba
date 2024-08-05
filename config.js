require("dotenv").config();
console.log("SECRETKEY in config:", process.env.SECRET);
module.exports = { SECRET: process.env.SECRET };
