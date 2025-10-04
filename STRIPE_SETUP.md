# Stripe Setup Guide for Opaw Cat Food

## 🏦 Step 1: Create Stripe Account

1. **Sign up at Stripe:**
   - Go to [https://stripe.com](https://stripe.com)
   - Click "Start now" or "Sign up"
   - Choose "I'm building a business"

2. **Complete Business Information:**
   - Business name: "Opaw Cat Food"
   - Country: Your country
   - Business type: E-commerce
   - Website: Your domain (or localhost for testing)

## 🔑 Step 2: Get API Keys

1. **Go to API Keys:**
   - Visit [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
   - You'll see two keys:

2. **Copy Your Keys:**
   ```
   Publishable key: pk_test_51... (for frontend)
   Secret key: sk_test_51... (for backend)
   ```

3. **For Production:**
   - Switch to "Live mode" toggle
   - Copy the live keys (pk_live_... and sk_live_...)

## ⚙️ Step 3: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Database
DATABASE_URL="your_database_url_here"

# Stripe Keys (replace with your actual keys)
STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key_here"
STRIPE_SECRET_KEY="sk_test_your_secret_key_here"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret_here"

# Next.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Admin credentials
ADMIN_EMAIL="admin@opaw.com"
ADMIN_PASSWORD="admin123"
```

## 💰 Step 4: Enable Payments

### A. Add Bank Account
1. Go to [https://dashboard.stripe.com/settings/payouts](https://dashboard.stripe.com/settings/payouts)
2. Click "Add bank account"
3. Enter your bank details
4. Verify your account (usually takes 1-2 business days)

### B. Complete Business Verification
1. Go to [https://dashboard.stripe.com/settings/account](https://dashboard.stripe.com/settings/account)
2. Complete all required fields:
   - Business information
   - Tax information
   - Identity verification
   - Bank account details

## 🧾 Step 5: Enable Invoicing

### A. Enable Invoicing Feature
1. Go to [https://dashboard.stripe.com/settings/billing](https://dashboard.stripe.com/settings/billing)
2. Enable "Invoicing" feature
3. Set up your business information for invoices

### B. Configure Invoice Settings
1. Go to [https://dashboard.stripe.com/settings/invoicing](https://dashboard.stripe.com/settings/invoicing)
2. Set up:
   - Business name and address
   - Logo (upload your Opaw logo)
   - Invoice footer text
   - Payment terms
   - Tax settings

## 🔄 Step 6: Set Up Webhooks (Optional but Recommended)

### A. Create Webhook Endpoint
1. Go to [https://dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `invoice.payment_succeeded`

### B. Get Webhook Secret
1. After creating the webhook, click on it
2. Copy the "Signing secret" (starts with `whsec_`)
3. Add it to your `.env.local` file

## 🧪 Step 7: Test Payments

### A. Use Test Cards
Stripe provides test card numbers:
```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0025 0000 3155
```

### B. Test Your Integration
1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000`
3. Add products to cart
4. Go to checkout
5. Use test card: `4242 4242 4242 4242`
6. Complete the payment

## 🚀 Step 8: Go Live

### A. Switch to Live Mode
1. In Stripe Dashboard, toggle "Test mode" to "Live mode"
2. Update your `.env.local` with live keys
3. Deploy your application

### B. Verify Everything Works
1. Test with real (small) payments
2. Check that money appears in your bank account
3. Verify invoices are generated correctly

## 📊 Step 9: Monitor Your Business

### A. Dashboard Overview
- Go to [https://dashboard.stripe.com](https://dashboard.stripe.com)
- View payments, customers, and analytics
- Monitor payouts to your bank account

### B. Financial Reports
- Access detailed financial reports
- Download CSV files for accounting
- Set up automated reports

## 🆘 Troubleshooting

### Common Issues:
1. **"Invalid API key"** - Check your keys are correct
2. **"Webhook signature invalid"** - Verify webhook secret
3. **"Payment failed"** - Check test card numbers
4. **"Account not verified"** - Complete business verification

### Support:
- Stripe Documentation: [https://stripe.com/docs](https://stripe.com/docs)
- Stripe Support: [https://support.stripe.com](https://support.stripe.com)
- Community: [https://github.com/stripe/stripe-node](https://github.com/stripe/stripe-node)

## 💡 Pro Tips

1. **Start with Test Mode** - Always test thoroughly before going live
2. **Use Webhooks** - For reliable payment processing
3. **Monitor Logs** - Check Stripe dashboard for failed payments
4. **Set Up Alerts** - Get notified of important events
5. **Keep Keys Secure** - Never commit API keys to version control

## 🎯 Next Steps

1. Complete Stripe account setup
2. Add your API keys to `.env.local`
3. Test payments with test cards
4. Complete business verification
5. Go live and start accepting real payments!

Your Opaw Cat Food store will be ready to accept payments and generate invoices! 🐱💰
