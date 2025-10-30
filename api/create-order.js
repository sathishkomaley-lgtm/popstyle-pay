const Razorpay = require("razorpay");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: 50000, // amount in paise (₹500)
      currency: "INR",
      receipt: "receipt#1",
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({
      message: "Razorpay order creation failed",
      error: error.message,
    });
  }
};
