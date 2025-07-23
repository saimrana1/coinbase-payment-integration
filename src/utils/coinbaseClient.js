const axios = require("axios");

const coinbase = axios.create({
  baseURL: process.env.COINBASE_API_URL,
  headers: {
    "X-CC-Api-Key": process.env.COINBASE_API_KEY,
    "X-CC-Version": "2018-03-22",
    "Content-Type": "application/json",
  },
});
module.exports = coinbase;
