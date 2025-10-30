import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    console.log("✅ Payment verified");

    // 🟢 Place order in your database
    // (e.g., createOrder({ userId, items, amount, status: "Paid" }))

    res.status(200).json({ success: true });
  } else {
    console.log("❌ Payment verification failed");
    res.status(400).json({ success: false });
  }
}
