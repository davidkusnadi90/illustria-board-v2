import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import PaymentListClient from '@/components/PaymentListClient'

export const revalidate = 60

export default async function LaporanIuran2026Page() {
  /**
   * 1. Fetch ALL cluster addresses
   */
  const { data: addresses, error: addressError } = await supabase
    .from('cluster_addresses')
    .select('id, block, house_number')

  /**
   * 2. Fetch IURAN payments for 2026
   */
  const { data: payments, error: paymentError } = await supabase
    .from('payments')
    .select(`
      id,
      paid,
      amount,
      year,
      received_at,
      notes,
      address_id,
      cluster_addresses (
        block,
        house_number
      )
    `)
    .eq('year', 2026)
    .eq('type', 'iuran')

  if (addressError || paymentError) {
    console.error(addressError || paymentError)
  }

  /**
   * 3. Build PAID list
   */
  const paidPayments =
    payments?.filter((p) => p.paid).map((p) => ({
      id: p.id,
      paid: true,
      amount: p.amount,
      year: p.year,
      received_at: p.received_at,
      notes: p.notes,
      cluster_addresses: {
        block: p.cluster_addresses?.[0]?.block ?? '',
        house_number: p.cluster_addresses?.[0]?.house_number ?? '',
      },
    })) ?? []
  /**
   * 4. Determine which addresses already have ANY iuran record
   */
  const paidAddressIds = new Set(
    payments?.map((p) => p.address_id) ?? []
  )

  /**
   * 5. Build UNPAID list
   *    = addresses with NO iuran payment record at all
   */
  const unpaidPayments =
    addresses
      ?.filter((addr) => !paidAddressIds.has(addr.id))
      .map((addr) => ({
        id: `unpaid-${addr.id}`,
        paid: false,
        amount: 0,
        year: 2026,
        received_at: null,
        notes: null,
        cluster_addresses: {
          block: addr.block,
          house_number: addr.house_number,
        },
      })) ?? []

  /**
   * 6. Summary numbers
   */
  const totalRumah = addresses?.length ?? 0
  const paidCount = paidPayments.length
  const unpaidCount = unpaidPayments.length

  const totalReceived = paidPayments.reduce(
    (sum, p) => sum + Number(p.amount),
    0
  )

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <header className="space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:underline"
        >
          ← Kembali
        </Link>

        <h1 className="text-2xl font-bold">
          Laporan Iuran 2026
        </h1>

        <p className="text-sm text-gray-600">
          Transparansi pembayaran iuran warga tahun 2026.
        </p>
      </header>

      {/* Total Amount */}
      <section className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-5 text-white shadow">
        <p className="text-sm text-white/90">
          Total Dana Iuran Diterima
        </p>
        <p className="mt-2 text-2xl font-bold">
          Rp {totalReceived.toLocaleString('id-ID')}
        </p>
        <p className="mt-1 text-xs text-white/80">
          Akumulasi pembayaran iuran yang sudah diterima
        </p>
      </section>

      {/* Summary */}
      <section className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-gray-100 p-3 text-center">
          <p className="text-xs text-gray-500">Total Rumah</p>
          <p className="text-lg font-semibold">{totalRumah}</p>
        </div>
        <div className="rounded-xl bg-emerald-100 p-3 text-center">
          <p className="text-xs text-emerald-700">Sudah Bayar</p>
          <p className="text-lg font-semibold text-emerald-800">
            {paidCount}
          </p>
        </div>
        <div className="rounded-xl bg-red-100 p-3 text-center">
          <p className="text-xs text-red-700">Belum Bayar</p>
          <p className="text-lg font-semibold text-red-800">
            {unpaidCount}
          </p>
        </div>
      </section>

      {/* Filter + List */}
      <PaymentListClient
        paidPayments={paidPayments}
        unpaidPayments={unpaidPayments}
      />
    </main>
  )
}
