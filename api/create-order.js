// api/create-order.js
const Razorpay = require("razorpay");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { amount, currency } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100,
      currency: currency || "INR",
      receipt: receipt_${Date.now()},
    };

    const order = await razorpay.orders.create(options);
    console.log("✅ Order created:", order.id);

    return res.status(200).json(order);
  } catch (error) {
    console.error("❌ Error creating order:", error);
    return res.status(500).json({ error: error.message });
  }
};
