const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

export default async function handler(req, res) {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ error: "Only POST allowed" });

    const { amount } = req.body;
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      payment_capture: 1
    });

    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
