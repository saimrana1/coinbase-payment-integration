const coinbase = require("../utils/coinbaseClient");
const Payment = require("../models/payment.model");
exports.createPayment = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const chargeData = {
      name: "Test Payment",
      description: "Crypto Payment using Coinbase Commerce",
      local_price: { amount, currency },
      pricing_type: "fixed_price",
    };

    const response = await coinbase.post("/charges", chargeData);
    console.log("response", response);
    const payment = await Payment.create({
      chargeId: response.data.data.id,
      amount,
      currency,
    });
    console.log("payment", payment);

    return res.status(201).json({
      message: "Payment created successfully",
      data: {
        url: response.data.data.hosted_url,
        chargeId: payment.chargeId,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

exports.getPaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findOne({ chargeId: req.params.chargeId });

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
        data: null,
      });
    }

    return res.status(200).json({
      message: "Payment status retrieved successfully",
      data: { status: payment.status },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

exports.webhookHandler = async (req, res) => {
  try {
    const event = req.body;
    const chargeId = event?.event?.data?.id;
    let status;

    switch (event?.event?.type) {
      case "charge:created":
        status = "PENDING";
        break;
      case "charge:confirmed":
        status = "PAID";
        break;
      case "charge:failed":
        status = "FAILED";
        break;
      default:
        status = "unknown";
    }

    console.log("Webhook event received:", {
      eventType: event.event.type,
      chargeId,
      fullEvent: event,
    });

    const updatedPayment = await Payment.findOneAndUpdate(
      { chargeId },
      { $set: { status } },
      { new: true }
    );
    if (!updatedPayment) {
      console.warn(`Payment not found for chargeId: ${chargeId}`);
    }

    return res.status(200).json({
      message: "Webhook processed successfully",
      data: updatedPayment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to process webhook",
      error: error.message,
    });
  }
};
