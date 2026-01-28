import { supabase } from '@/lib/supabase'
import ExpenseTable from './ExpenseTable'

export const revalidate = 0

export default async function Page() {
  const { data: expenses, error } = await supabase
    .from('expenses')
    .select('*')
    .order('date', { ascending: false })

  if (error) {
    return <div className="p-6">Gagal memuat data</div>
  }

  const total = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  )

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Laporan Penggunaan Anggaran
      </h1>

      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-sm text-gray-500">Total Pengeluaran</p>
        <p className="text-2xl font-semibold">
          Rp {total.toLocaleString('id-ID')}
        </p>
      </div>

      <ExpenseTable expenses={expenses} />
    </div>
  )
}
