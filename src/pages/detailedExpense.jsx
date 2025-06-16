import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteEntry } from '../redux/action'
import { NavLink } from 'react-router-dom'
import { FiSearch, FiTrash2, FiFileText, FiArrowRight } from 'react-icons/fi'
import { FaRupeeSign } from 'react-icons/fa'

export default function DetailedExpense() {
  const expense = useSelector(state => state)
  const dispatch = useDispatch()

  const [allExpenses, setAllExpenses] = useState(expense.expenses)
  const [notFound, setNotFound] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setAllExpenses(expense.expenses)
  }, [expense])

  const searchFilter = (value) => {
    setSearchTerm(value)
    value = value.toLowerCase()
    if (value === "") {
      setAllExpenses(expense.expenses)
    } else {
      let filtered = expense.expenses.filter((e) =>
        e.category.toLowerCase().includes(value) ||
        (e.remarks && e.remarks.toLowerCase().includes(value))
      )
      if (filtered.length === 0) {
        setNotFound(true)
      } else {
        setNotFound(false)
        setAllExpenses(filtered)
      }
    }
  }

  const deleteCurrentEntry = (id, amount, category) => {
    dispatch(deleteEntry(id, amount, category))
    let expense = JSON.parse(localStorage.getItem("ExpenseTracker"))
    let filteredDate = expense.expenses.filter((e) => e.id !== id)
    expense = {
      ...expense,
      expenses: filteredDate,
      totalAmount: Number(expense.totalAmount) - Number(amount),
      categories: expense.categories.map((e) => {
        if (e.ctype === category) {
          return { ctype: e.ctype, count: e.count - 1, total: e.total - +(amount) }
        }
        return e
      })
    }
    localStorage.setItem("ExpenseTracker", JSON.stringify(expense))
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Expense Details</h1>
        <NavLink
          to="/report"
          className="flex items-center justify-center space-x-2 text-white px-4 py-2 rounded-lg 
          bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
          transition-all duration-200 font-medium shadow-sm"
        >
          <span>Generate Report</span>
          <FiFileText className="text-lg" />
        </NavLink>
      </div>

      {/* Search Filter */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          type='text'
          value={searchTerm}
          onChange={e => searchFilter(e.target.value)}
          placeholder='Search by category or remarks...'
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none 
          focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        {/* Table Header - Visible on medium screens and up */}
        <div className="hidden sm:grid sm:grid-cols-5 bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="text-sm font-semibold text-gray-600">Date</div>
          <div className="text-sm font-semibold text-gray-600">Category</div>
          <div className="text-sm font-semibold text-gray-600">Amount</div>
          <div className="text-sm font-semibold text-gray-600">Remarks</div>
          <div className="text-sm font-semibold text-gray-600 text-right">Action</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {notFound ? (
            <div className="p-6 text-center">
              <div className="inline-flex items-center justify-center bg-gray-100 rounded-full p-4 mb-3">
                <FiSearch className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">No expenses found</h3>
              <p className="text-gray-500">Try searching other category</p>
            </div>
          ) : (
            (allExpenses.length === 0 ? (
              <div className="p-6 text-center">
                <div className="inline-flex items-center justify-center bg-gray-100 rounded-full p-4 mb-3">
                  <FiFileText className="text-gray-400 text-2xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">No expenses recorded</h3>
                <p className="text-gray-500">Add your first expense to get started</p>
              </div>
            ) : (
              (allExpenses.reverse()).map((e, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 sm:grid-cols-5 gap-4 p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-150"
                >
                  {/* Date */}
                  <div className="flex flex-col">
                    <span className="sm:hidden text-xs font-medium text-gray-500 mb-1">Date</span>
                    <p className="text-gray-600">
                      {new Date(e.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>

                  {/* Category */}
                  <div className="flex flex-col">
                    <span className="sm:hidden text-xs font-medium text-gray-500 mb-1">Category</span>
                    <div className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                      <p className="font-medium text-gray-700 capitalize">{e.category}</p>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="flex flex-col">
                    <span className="sm:hidden text-xs font-medium text-gray-500 mb-1">Amount</span>
                    <div className="flex items-center">
                      <FaRupeeSign className="text-blue-600 mr-1" size={12} />
                      <p className="text-blue-600 font-semibold">{e.amount.toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  {/* Remarks */}
                  <div className="flex flex-col">
                    <span className="sm:hidden text-xs font-medium text-gray-500 mb-1">Remarks</span>
                    <p className="text-gray-600 truncate" title={e.remarks}>
                      {e.remarks || <span className="text-gray-400">No remarks</span>}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="flex flex-col sm:items-end">
                    <span className="sm:hidden text-xs font-medium text-gray-500 mb-1">Action</span>
                    <button
                      type="button"
                      onClick={() => deleteCurrentEntry(e.id, e.amount, e.category)}
                      className="flex items-center justify-center sm:justify-end space-x-1 
                      py-1 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md 
                      transition-colors duration-200 text-sm font-medium w-full sm:w-auto"
                    >
                      <FiTrash2 className="text-sm" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))
            ))
          )}
        </div>
      </div>
    </div>
  )
}