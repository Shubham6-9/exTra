import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiExternalLink } from 'react-icons/fi'

export default function RecentExpense() {
    const expense = useSelector(state => state) || {};
    const expenses = Array.isArray(expense.expenses) ? expense.expenses : [];
    const recentExpenses = expenses.slice(-6).reverse(); // Last 6 items

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className='text-2xl font-bold text-gray-800'>Recent Expenses</h2>
                    <p className="text-sm text-gray-500 mt-1">Your most recent spending activities</p>
                </div>
                {expenses.length > 5 && (
                    <Link
                        to="/details"
                        className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        View all <FiExternalLink className="ml-1" size={14} />
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentExpenses.slice(0, 5).map((expense, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white p-5 rounded-xl shadow-xs border border-gray-100 hover:shadow-sm transition-all hover:border-blue-100 group"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-600 mb-2">
                                    {expense.category}
                                </span>
                                <p className="text-sm font-medium text-gray-500">
                                    {new Date(expense.date).toLocaleDateString('en-IN', { 
                                        day: 'numeric', 
                                        month: 'short', 
                                        year: 'numeric' 
                                    })}
                                </p>
                            </div>
                            <p className="text-xl font-bold text-blue-600">
                                ₹{Number(expense.amount).toLocaleString('en-IN')}
                            </p>
                        </div>

                        {expense.remark && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {expense.remark}
                                </p>
                            </div>
                        )}

                    </motion.div>
                ))}
            </div>

            {expenses.length > 5 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center pt-2"
                >
                    <Link
                        to="/details"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-xs hover:shadow-sm"
                    >
                        View All Expenses ({expenses.length - 5} more)
                        <FiExternalLink className="ml-2" size={14} />
                    </Link>
                </motion.div>
            )}

            <style jsx>{`
                .shadow-xs {
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                }
            `}</style>
        </div>
    )
}