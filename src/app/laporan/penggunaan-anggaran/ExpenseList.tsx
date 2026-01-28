type Expense = {
  id: string
  date: string
  description: string
  category: string
  amount: number
  payment_method?: string
}

export default function ExpenseList({
  expenses,
}: {
  expenses: Expense[]
}) {
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 text-center text-gray-500 shadow">
        Belum ada data pengeluaran
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {expenses.map((e) => (
        <div
          key={e.id}
          className="bg-white rounded-xl shadow-sm border p-5 flex justify-between items-start"
        >
          {/* Left */}
          <div className="space-y-1">
            <p className="font-medium text-gray-800">
              {e.description}
            </p>

            <p className="text-sm text-gray-500">
              {e.category}
            </p>

            <p className="text-xs text-gray-400">
              {new Date(e.date).toLocaleDateString('id-ID')}
              {e.payment_method
                ? ` • ${e.payment_method}`
                : ''}
            </p>
          </div>

          {/* Right */}
          <div className="text-right">
            <p className="font-semibold text-gray-800">
              Rp {Number(e.amount).toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
