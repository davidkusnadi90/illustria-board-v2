import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

type Expense = {
  id: string
  date: string
  description: string
  category: string
  amount: number
  payment_method?: string | null
}

/* =======================
   Helpers (NO any)
   ======================= */

function groupByMonth(expenses: Expense[]) {
  const groups: Record<string, Expense[]> = {}

  expenses.forEach((e) => {
    const d = new Date(e.date)
    const key = d.toLocaleDateString('id-ID', {
      month: 'long',
      year: 'numeric',
    })

    if (!groups[key]) {
      groups[key] = []
    }

    groups[key].push(e)
  })

  return groups
}

function getMonthSubtotal(items: Expense[]) {
  return items.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  )
}

/* =======================
   Page
   ======================= */

export default async function LaporanPenggunaanAnggaranPage() {
  const { data } = await supabase
    .from('expenses')
    .select('*')
    .order('date', { ascending: false })

  const expenses: Expense[] = data ?? []

  const total = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  )

  const grouped = groupByMonth(expenses)

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <header className="space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:underline"
        >
          ← Kembali
        </Link>

        <h1 className="text-2xl font-bold">
          Laporan Penggunaan Anggaran 2026
        </h1>

        <p className="text-sm text-gray-600">
          Transparansi pengeluaran kas warga tahun 2026.
        </p>
      </header>

      {/* Summary */}
      <section className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-5 text-white shadow">
        <p className="text-sm text-white/90">
          Total Pengeluaran Anggaran
        </p>
        <p className="mt-2 text-2xl font-bold">
          Rp {total.toLocaleString('id-ID')}
        </p>
        <p className="mt-1 text-xs text-white/80">
          Akumulasi seluruh pengeluaran yang tercatat
        </p>
      </section>

      {/* Monthly grouped list */}
      <section className="space-y-6">
        {Object.entries(grouped).map(([month, items]) => (
          <div key={month} className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-700">
              {month}
            </h2>

            {items.map((e) => (
              <div
                key={e.id}
                className="rounded-xl border bg-white p-4 shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {e.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {e.category}
                    </p>
                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    Pengeluaran
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Jumlah</p>
                  <p className="font-medium">
                    Rp {Number(e.amount).toLocaleString('id-ID')}
                  </p>
                </div>

                <p className="text-xs text-gray-500">
                  Tanggal:{' '}
                  {new Date(e.date).toLocaleDateString('id-ID')}
                </p>

                {e.payment_method && (
                  <p className="text-xs text-gray-500">
                    Metode: {e.payment_method}
                  </p>
                )}
              </div>
            ))}

            {/* Monthly subtotal */}
            <div className="flex justify-between rounded-xl bg-gray-100 px-4 py-3 text-sm">
              <p className="font-medium text-gray-700">
                Subtotal {month}
              </p>
              <p className="font-semibold text-gray-800">
                Rp {getMonthSubtotal(items).toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        ))}

        {expenses.length === 0 && (
          <div className="rounded-xl border bg-white p-4 shadow-sm text-center text-sm
