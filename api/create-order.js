import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      console.error("❌ Razorpay keys missing!");
      return res.status(500).json({
        error: "Razorpay API keys missing",
        details: "RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET not found",
      });
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
    console.error("❌ Razorpay order error:", error);
    res.status(500).json({ error: "Failed to create order", details: error.message });
  }
}
