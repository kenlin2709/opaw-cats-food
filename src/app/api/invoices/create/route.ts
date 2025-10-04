import { NextRequest, NextResponse } from 'next/server'
import { createStripeInvoice, InvoiceData } from '@/lib/invoice'

export async function POST(request: NextRequest) {
  try {
    const invoiceData: InvoiceData = await request.json()

    // Validate required fields
    if (!invoiceData.customerEmail || !invoiceData.items || invoiceData.items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const result = await createStripeInvoice(invoiceData)

    if (result.success) {
      return NextResponse.json({
        invoiceId: result.invoiceId,
        invoiceUrl: result.invoiceUrl,
        paymentIntent: result.paymentIntent
      })
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Invoice creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    )
  }
}
