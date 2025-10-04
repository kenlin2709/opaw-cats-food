'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'
import { prisma } from '@/lib/prisma'
import { FileText, Download, Eye, Plus, Search, Filter } from 'lucide-react'
import Image from 'next/image'
import { InvoiceData } from '@/types'

interface Invoice {
  id: string
  customerEmail: string
  customerName: string
  total: number
  status: string
  createdAt: string
  stripeId?: string
  invoiceUrl?: string
}

export default function InvoicesPage() {
  const { state } = useCart()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    try {
      // In a real app, you would fetch from your database
      // For now, we'll show mock data
      const mockInvoices: Invoice[] = [
        {
          id: 'inv_1',
          customerEmail: 'customer@example.com',
          customerName: 'John Doe',
          total: 45.99,
          status: 'paid',
          createdAt: '2024-01-15T10:30:00Z',
          stripeId: 'pi_1234567890',
          invoiceUrl: 'https://invoice.stripe.com/i/acct_123/inv_1'
        },
        {
          id: 'inv_2',
          customerEmail: 'jane@example.com',
          customerName: 'Jane Smith',
          total: 32.50,
          status: 'pending',
          createdAt: '2024-01-14T14:20:00Z',
          stripeId: 'pi_0987654321',
          invoiceUrl: 'https://invoice.stripe.com/i/acct_123/inv_2'
        }
      ]
      setInvoices(mockInvoices)
    } catch (error) {
      console.error('Error fetching invoices:', error)
    } finally {
      setLoading(false)
    }
  }

  const createInvoice = async () => {
    try {
      if (state.items.length === 0) {
        alert('Cart is empty. Add items to create an invoice.')
        return
      }

      const invoiceData: InvoiceData = {
        customerEmail: 'customer@example.com',
        customerName: 'Customer Name',
        items: state.items.map(item => ({
          name: item.name,
          description: `Cat food - ${item.name}`,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: {
          line1: '123 Main St',
          city: 'City',
          state: 'State',
          postal_code: '12345',
          country: 'US'
        }
      }

      const response = await fetch('/api/invoices/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      })

      if (response.ok) {
        const result = await response.json()
        alert(`Invoice created! View it at: ${result.invoiceUrl}`)
        fetchInvoices()
      } else {
        alert('Failed to create invoice')
      }
    } catch (error) {
      console.error('Error creating invoice:', error)
      alert('Error creating invoice')
    }
  }

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'All' || invoice.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'void':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Image
                src="/logo.png"
                alt="Opaw Cat Food"
                width={120}
                height={36}
                className="h-9 w-auto logo-transparent"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Invoice Management</h1>
                <p className="text-gray-600">Manage customer invoices and payments</p>
              </div>
            </div>
            <button
              onClick={createInvoice}
              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="All">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="draft">Draft</option>
                <option value="void">Void</option>
              </select>
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Invoices ({filteredInvoices.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      Loading invoices...
                    </td>
                  </tr>
                ) : filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {invoice.id}
                            </div>
                            {invoice.stripeId && (
                              <div className="text-sm text-gray-500">
                                Stripe: {invoice.stripeId.slice(0, 20)}...
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {invoice.customerName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {invoice.customerEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${invoice.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(invoice.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {invoice.invoiceUrl && (
                            <a
                              href={invoice.invoiceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-orange-600 hover:text-orange-900"
                              title="View Invoice"
                            >
                              <Eye className="h-4 w-4" />
                            </a>
                          )}
                          <button
                            className="text-gray-600 hover:text-gray-900"
                            title="Download PDF"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <FileText className="h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-lg font-medium text-gray-900 mb-2">No invoices found</p>
                        <p className="text-gray-500 mb-4">Create your first invoice to get started</p>
                        <button
                          onClick={createInvoice}
                          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                        >
                          Create Invoice
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
