const Razorpay = require("razorpay");

module.exports = async function handler(req, res) {
  console.log("✅ Function started");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // ✅ Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      console.error("❌ Missing Razorpay Keys");
      return res.status(500).json({ error: "Missing Razorpay keys" });
    }

    const razorpay = new Razorpay({ key_id, key_secret });

    const { amount, currency } = req.body;

    const orderOptions = {
      amount: amount * 100,
      currency: currency || "INR",
      receipt: receipt_${Date.now()},
    };

    const order = await razorpay.orders.create(orderOptions);
    console.log("✅ Order created:", order);

    res.status(200).json(order);
  } catch (error) {
    console.error("❌ Razorpay error:", error);
    res.status(500).json({ error: error.message });
  }
};
