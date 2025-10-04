import { stripe } from './stripe'

export interface InvoiceData {
  customerEmail: string
  customerName: string
  items: {
    name: string
    description: string
    quantity: number
    price: number
  }[]
  shippingAddress: {
    line1: string
    city: string
    state: string
    postal_code: string
    country: string
  }
}

export async function createStripeInvoice(invoiceData: InvoiceData) {
  try {
    // Create or retrieve customer
    const customers = await stripe.customers.list({
      email: invoiceData.customerEmail,
      limit: 1
    })

    let customer
    if (customers.data.length > 0) {
      customer = customers.data[0]
    } else {
      customer = await stripe.customers.create({
        email: invoiceData.customerEmail,
        name: invoiceData.customerName,
        address: invoiceData.shippingAddress
      })
    }

    // Create invoice
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: 'send_invoice',
      days_until_due: 30,
      auto_advance: true,
      metadata: {
        source: 'opaw-cat-food'
      }
    })

    // Add line items
    for (const item of invoiceData.items) {
      await stripe.invoiceItems.create({
        customer: customer.id,
        invoice: invoice.id,
        amount: Math.round(item.price * 100), // Convert to cents
        currency: 'usd',
        description: `${item.name} - ${item.description}`,
        quantity: item.quantity
      })
    }

    // Finalize and send invoice
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id)
    await stripe.invoices.sendInvoice(invoice.id)

    return {
      success: true,
      invoiceId: finalizedInvoice.id,
      invoiceUrl: finalizedInvoice.hosted_invoice_url,
      paymentIntent: finalizedInvoice.payment_intent
    }
  } catch (error) {
    console.error('Error creating Stripe invoice:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function createStripePaymentIntent(amount: number, customerEmail: string) {
  try {
    // Create or retrieve customer
    const customers = await stripe.customers.list({
      email: customerEmail,
      limit: 1
    })

    let customer
    if (customers.data.length > 0) {
      customer = customers.data[0]
    } else {
      customer = await stripe.customers.create({
        email: customerEmail
      })
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      customer: customer.id,
      metadata: {
        source: 'opaw-cat-food'
      }
    })

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    }
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function getInvoiceStatus(invoiceId: string) {
  try {
    const invoice = await stripe.invoices.retrieve(invoiceId)
    return {
      success: true,
      status: invoice.status,
      paid: invoice.paid,
      amountPaid: invoice.amount_paid,
      amountDue: invoice.amount_due
    }
  } catch (error) {
    console.error('Error retrieving invoice:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
