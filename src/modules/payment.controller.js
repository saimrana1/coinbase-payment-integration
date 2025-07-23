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
      status: response.data.data.timeline[0]?.status,
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

exports.webhookHandler = async (req, res) => {
  try {
    const event = req.body;
    const chargeId = event?.data?.id;
    const status = event?.type;

    console.log("Webhook event received:", status, "for charge:", chargeId);

    if (chargeId) {
      await Payment.findOneAndUpdate({ chargeId }, { status }, { new: true });
    }

    return res.status(200).json({
      message: "Webhook processed successfully",
      data: { chargeId, status },
    });
  } catch (error) {
    console.error("Webhook processing failed:", error.message);
    return res.status(500).json({
      message: "Failed to process webhook",
      error: error.message,
    });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findOne({ chargeId: id });

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

exports.getPaymentStatus = async (req, res) => {
  try {
    const { chargeId } = req.params;

    const response = await coinbase.get(`/charges/${chargeId}`);
    console.log("response", response);

    const timeline = response.data.data.timeline;
    console.log("timeline", timeline);
    const status = timeline[timeline.length - 1].status;
    console.log("status", status);

    return res.status(200).json({
      message: "Payment status fetched successfully",
      data: {
        chargeId,
        status,
        hosted_url: response.data.data.hosted_url,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching payment status",
      error: error.message,
    });
  }
};
