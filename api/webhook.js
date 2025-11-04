const crypto = require('crypto');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error('RAZORPAY_WEBHOOK_SECRET not configured');
      return res.status(500).json({ error: 'Webhook not configured' });
    }

    // Verify webhook signature
    const signature = req.headers['x-razorpay-signature'];
    
    if (!signature) {
      return res.status(400).json({ error: 'No signature provided' });
    }

    const body = JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');

    const isValid = expectedSignature === signature;

    if (!isValid) {
      console.error('Invalid webhook signature');
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Process webhook event
    const event = req.body.event;
    const payload = req.body.payload;

    console.log('Webhook received:', event, payload);

    // Handle different event types
    switch (event) {
      case 'payment.authorized':
        console.log('Payment authorized:', payload.payment.entity.id);
        break;
      case 'payment.captured':
        console.log('Payment captured:', payload.payment.entity.id);
        break;
      case 'payment.failed':
        console.log('Payment failed:', payload.payment.entity.id);
        break;
      default:
        console.log('Unhandled event:', event);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: error.message });
  }
};
