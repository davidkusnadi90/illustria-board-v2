'use client'

import { useState } from 'react'

type ClusterAddress = {
  block: string
  house_number: string
}

type Payment = {
  id: number | string
  paid: boolean
  amount: number
  year: number
  received_at: string | null
  notes: string | null
  cluster_addresses: ClusterAddress
}

type SortOption =
  | 'block'
  | 'received_desc'

type Props = {
  paidPayments: Payment[]
  unpaidPayments: Payment[]
}

export default function PaymentListClient({
  paidPayments,
  unpaidPayments,
}: Props) {
  const [showPaid, setShowPaid] = useState(true)
  const [sortBy, setSortBy] = useState<SortOption>('block')

  function sortPayments(
    payments: Payment[],
    sortBy: SortOption
  ) {
    return [...payments].sort((a, b) => {
      // 1️⃣ Sort by Block + House Number
      if (sortBy === 'block') {
        const blockA = a.cluster_addresses.block
        const blockB = b.cluster_addresses.block

        if (blockA !== blockB) {
          return blockA.localeCompare(blockB)
        }

        return (
          Number(a.cluster_addresses.house_number) -
          Number(b.cluster_addresses.house_number)
        )
      }

      // 2️⃣ Sort by received_at DESC (newest first)
      if (sortBy === 'received_desc') {
        return (
          new Date(b.received_at!).getTime() -
          new Date(a.received_at!).getTime()
        )
      }

      return 0
    })
  }

const displayedPayments = showPaid
  ? sortPayments(paidPayments, sortBy)
  : sortPayments(unpaidPayments, 'block')

  return (
    <section className="space-y-4">
      {/* Paid / Unpaid Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowPaid(true)}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition
            ${
              showPaid
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }
          `}
        >
          Sudah Bayar
        </button>

        <button
          onClick={() => setShowPaid(false)}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition
            ${
              !showPaid
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }
          `}
        >
          Belum Bayar
        </button>
      </div>

      {/* Sorting (only for paid) */}
      {showPaid && (
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('block')}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition
              ${
                sortBy === 'block'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }
            `}
          >
            Blok / Rumah
          </button>

          <button
            onClick={() => setSortBy('received_desc')}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition
              ${
                sortBy === 'received_desc'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }
            `}
          >
            Terbaru
          </button>
        </div>
      )}

      {/* Payment Cards */}
      <div className="space-y-3">
        {displayedPayments.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border bg-white p-4 shadow-sm space-y-2"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  Blok {p.cluster_addresses.block} /{' '}
                  {p.cluster_addresses.house_number}
                </p>
                <p className="text-xs text-gray-500">
                  Iuran Tahun {p.year}
                </p>
              </div>

              {p.paid && (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  Lunas
                </span>
              )}
            </div>

            <div className="flex justify-between text-sm">
              <p className="text-gray-600">Jumlah</p>
              <p className="font-medium">
                Rp {p.amount.toLocaleString('id-ID')}
              </p>
            </div>

            {p.received_at && (
              <p className="text-xs text-gray-500">
                Dibayar pada:{' '}
                {new Date(p.received_at).toLocaleDateString('id-ID')}
              </p>
            )}

            {p.notes && (
              <p className="text-xs text-gray-500">
                Catatan: {p.notes}
              </p>
            )}
          </div>
        ))}

        {displayedPayments.length === 0 && (
          <div className="rounded-xl border bg-white p-4 shadow-sm text-center text-sm text-gray-500">
            Tidak ada data
          </div>
        )}
      </div>
    </section>
  )
}
