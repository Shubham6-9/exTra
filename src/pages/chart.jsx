import React, { useState } from 'react'
import ExpenseChart from '../components/expenseChart.jsx'
import { useSelector } from 'react-redux'

export default function Chart() {
  const currentYear = (new Date()).getFullYear()


  const [year, setYear] = useState(currentYear)
  const expense = useSelector(state => state)
  let yearArr = []
  expense.expenses.forEach((e) => {
    let date = e.date.split("-")
    if (!yearArr.includes(date[0])) {
      yearArr.push(date[0])
    }
  })

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md mb-8 space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Get Another Year Graph:</h3>
        <select
          onChange={e => setYear(e.target.value)}
          value={year}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
        >
          <option disabled className="text-gray-400">Select Year</option>
          {yearArr.map((year) => (
            <option key={year} value={year} className="text-gray-700">
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full max-w-4xl space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Current Year: {year}</h3>
        <ExpenseChart year={year} />
      </div>
    </div>
  )
}
