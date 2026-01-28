'use client'

type Expense = {
  id: string
  date: string
  description: string
  category: string
  amount: number
}

export default function ExpenseTable({
  expenses,
}: {
  expenses: Expense[]
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Tanggal</th>
            <th className="p-3">Deskripsi</th>
            <th className="p-3">Kategori</th>
            <th className="p-3 text-right">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id} className="border-t">
              <td className="p-3">
                {new Date(e.date).toLocaleDateString('id-ID')}
              </td>
              <td className="p-3">{e.description}</td>
              <td className="p-3">{e.category}</td>
              <td className="p-3 text-right">
                Rp {Number(e.amount).toLocaleString('id-ID')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
