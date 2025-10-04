import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Create order in database
        await prisma.order.create({
          data: {
            id: session.id,
            userId: 'temp-user-id', // In a real app, get from session
            stripeId: session.payment_intent as string,
            status: 'PROCESSING',
            total: session.amount_total ? session.amount_total / 100 : 0,
            shippingAddress: session.shipping_details || {},
            items: {
              create: [] // In a real app, create order items from session
            }
          }
        })
        
        console.log('Order created:', session.id)
        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        
        // Update order status
        await prisma.order.update({
          where: { stripeId: paymentIntent.id },
          data: { status: 'PROCESSING' }
        })
        
        console.log('Payment succeeded:', paymentIntent.id)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        
        // Handle successful invoice payment
        console.log('Invoice payment succeeded:', invoice.id)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        
        // Handle failed invoice payment
        console.log('Invoice payment failed:', invoice.id)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
