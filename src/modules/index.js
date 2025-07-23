const express= require("express")
const controller= require("./payment.controller");
const { verifyCoinbaseSignature } = require("../middleware");
const router = express.Router();

router.post("/create-payment", controller.createPayment);
router.post("/webhook",[verifyCoinbaseSignature], controller.webhookHandler);
router.get("/payment-status/:chargeId", controller.getPaymentStatus);

module.exports=router
