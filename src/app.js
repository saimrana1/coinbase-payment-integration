require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const paymentRoutes= require("./api-routes")

app.use(express.json());



(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
})();

app.use("/api", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
