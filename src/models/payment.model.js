const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    chargeId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum:["PENDING","PAID","FAILED"]
      
    },
    amount: {
      type: Number,
    },
    currency: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
