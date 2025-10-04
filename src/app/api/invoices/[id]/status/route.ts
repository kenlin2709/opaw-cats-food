import { NextRequest, NextResponse } from 'next/server'
import { getInvoiceStatus } from '@/lib/invoice'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const result = await getInvoiceStatus(id)

    if (result.success) {
      return NextResponse.json({
        status: result.status,
        paid: result.paid,
        amountPaid: result.amountPaid,
        amountDue: result.amountDue
      })
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Invoice status error:', error)
    return NextResponse.json(
      { error: 'Failed to get invoice status' },
      { status: 500 }
    )
  }
}
