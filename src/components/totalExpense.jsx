import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

export default function TotalExpense() {
    const expense = useSelector(state => state) || {};
    const total = expense.totalAmount ?? 0;

    const [prevAmount, setPrevAmount] = useState(total);
    const [isIncreasing, setIsIncreasing] = useState(false);

    useEffect(() => {
        if (total !== prevAmount) {
            setIsIncreasing(total > prevAmount);
            setPrevAmount(total);
        }
    }, [total]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-6 hover:shadow-lg transition-shadow"
        >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-medium text-gray-500 mb-1 sm:mb-0">
                    Total Expense
                </h3>
                
                <motion.div
                    key={total}
                    initial={{ scale: 1.05, color: isIncreasing ? '#ef4444' : '#10b981' }}
                    animate={{ scale: 1, color: '#ef4444' }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl sm:text-4xl font-bold"
                >
                    ₹{Number(total).toLocaleString('en-IN')}
                </motion.div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <p className="text-sm text-gray-400">
                    {new Date().toLocaleDateString('en-IN', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long' 
                    })}
                </p>
            </div>
        </motion.div>
    );
}
