const express = require("express");
const router = express.Router();
const paymentModule= require("../modules/")

router.use("/v1", paymentModule);

module.exports = router;
