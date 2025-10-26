import Razorpay from "razorpay";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { amount, currency } = req.body;

    // Make sure keys are in environment variables
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // convert to paise
      currency: currency || "INR",
      receipt: receipt_${Math.random().toString(36).substring(2, 15)}
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
