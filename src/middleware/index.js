const crypto=require("crypto")
exports.verifyCoinbaseSignature = (req, res, next) => {
  try {
    const webhookSecret = process.env.COINBASE_WEBHOOK_SECRET;
    const signature = req.headers["x-cc-webhook-signature"];

    if (!webhookSecret || !signature) {
      return res
        .status(400)
        .json({ message: "Missing webhook signature or secret" });
    }

    const rawBody = JSON.stringify(req.body);
    const hmac = crypto.createHmac("sha256", webhookSecret);
    hmac.update(rawBody, "utf8");
    const expectedSignature = hmac.digest("hex");

    if (signature !== expectedSignature) {
      return res.status(400).json({ message: "Invalid webhook signature" });
    }

    next();
  } catch (error) {
    console.error("Signature verification failed:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
