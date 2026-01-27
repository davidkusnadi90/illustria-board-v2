'use client'

import { useState } from 'react'

type PaymentLike = {
  id: string | number
  paid: boolean
  amount: number
  year: number
  received_at: string | null
  notes: string | null
  cluster_addresses: {
    block: string
    house_number: string
  }
}

export default function PaymentListClient({
  paidPayments,
  unpaidPayments,
}: {
  paidPayments: PaymentLike[]
  unpaidPayments: PaymentLike[]
}) {
  const [filter, setFilter] = useState<'paid' | 'unpaid'>('paid')

  const list = filter === 'paid' ? paidPayments : unpaidPayments

  return (
    <section className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('paid')}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition
            ${
              filter === 'paid'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }
          `}
        >
          Sudah Bayar
        </button>

        <button
          onClick={() => setFilter('unpaid')}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition
            ${
              filter === 'unpaid'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }
          `}
        >
          Belum Bayar
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {list.length > 0 ? (
          list.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border bg-white p-4 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    Blok {item.cluster_addresses.block} No.{' '}
                    {item.cluster_addresses.house_number}
                  </p>
                  <p className="text-xs text-gray-500">
                    THR Tahun {item.year}
                  </p>
                </div>

                {item.paid ? (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                    Lunas
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                    Belum Bayar
                  </span>
                )}
              </div>

              <div className="flex justify-between text-sm">
                <p className="text-gray-600">Jumlah</p>
                <p className="font-medium">
                  Rp {item.amount.toLocaleString('id-ID')}
                </p>
              </div>

              {item.received_at && (
                <p className="text-xs text-gray-500">
                  Dibayar pada:{' '}
                  {new Date(item.received_at).toLocaleDateString('id-ID')}
                </p>
              )}

              {item.notes && (
                <p className="text-xs text-gray-500">
                  Catatan: {item.notes}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-6">
            Tidak ada data.
          </p>
        )}
      </div>
    </section>
  )
}
