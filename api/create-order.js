// api/create-order.js
import Razorpay from "razorpay";

export default async function handler(req, res) {
  // ✅ Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // ✅ Initialize Razorpay with environment variables
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // ✅ Validate Razorpay keys
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("❌ Razorpay API keys missing!");
      return res.status(500).json({
        error: "Razorpay keys missing in environment variables",
      });
    }

    // ✅ Get amount and currency from frontend (or set defaults)
    const { amount, currency } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    // ✅ Create order options
    const options = {
      amount: amount * 100, // Convert ₹ to paise
      currency: currency || "INR",
      receipt: receipt_order_${Date.now()},
    };

    // ✅ Create order
    const order = await razorpay.orders.create(options);

    console.log("✅ Order created successfully:", order.id);

    // ✅ Send order details to frontend
    return res.status(200).json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error) {
    console.error("❌ Razorpay order creation failed:", error);
    return res.status(500).json({
      success: false,
      message: "Server error: failed to create order",
      error: error.message,
    });
  }
}
