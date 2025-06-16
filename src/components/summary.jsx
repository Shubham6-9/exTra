import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

export default function Summary() {
    const expense = useSelector(state => state) || {};
    const categories = Array.isArray(expense.categories) ? expense.categories : [];

    const totalExpense = categories.reduce(
        (sum, category) => sum + Number(category.total),
        0
    );

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h2 className='text-2xl font-bold text-gray-800'>
                    Category Breakdown
                    <span className="block text-sm font-normal text-gray-500 mt-1">
                        Distribution of your expenses across categories
                    </span>
                </h2>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
                    <div className="h-[280px] overflow-y-auto custom-scrollbar p-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {categories.map((category, index) => {
                                const percentage = totalExpense > 0
                                    ? Math.round((Number(category.total) / totalExpense * 100))
                                    : 0;

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-all"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-medium text-gray-700 capitalize">
                                                {category.ctype}
                                            </h3>
                                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                                                {category.count} {category.count === 1 ? 'item' : 'items'}
                                            </span>
                                        </div>

                                        <p className="text-2xl font-bold text-gray-800 mb-2">
                                            ₹{Number(category.total).toLocaleString('en-IN')}
                                        </p>

                                        <div className="flex items-center space-x-2">
                                            <div className="w-full bg-gray-100 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-medium text-gray-500">
                                                {percentage}%
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #a1a1a1;
                }
            `}</style>
        </div>
    )
}