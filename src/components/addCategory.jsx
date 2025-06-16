import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../redux/action';
import { FiTag, FiPlus } from 'react-icons/fi';

export default function AddCategory() {
    const [category, setCategory] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        setSuccess(false);

        // Validation
        if (!category.trim()) {
            setError("Category name is required");
            setIsSubmitting(false);
            return;
        }

        if (category.trim().length < 3) {
            setError("Category name must be at least 3 characters");
            setIsSubmitting(false);
            return;
        }

        // Process submission
        dispatch(addCategory(category));
        
        // Update localStorage
        const expenseData = JSON.parse(localStorage.getItem("ExpenseTracker")) || { categories: [] };
        expenseData.categories.push({ 
            ctype: category.trim(), 
            count: 0, 
            total: 0 
        });
        localStorage.setItem("ExpenseTracker", JSON.stringify(expenseData));

        // Reset and show success
        setCategory("");
        setSuccess(true);
        setIsSubmitting(false);

        // Hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center">
                <FiTag className="text-blue-600 text-xl mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Create New Category</h3>
            </div>

            {success && (
                <div className="p-3 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Category added successfully!
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category Name
                    </label>
                    <div className="relative">
                        <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                if (error) setError("");
                            }}
                            placeholder="e.g. Groceries, Entertainment"
                            className={`w-full pl-10 pr-4 py-2.5 border ${error ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            disabled={isSubmitting}
                        />
                    </div>
                    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                    <p className="text-xs text-gray-500 mt-1">
                        Minimum 3 characters required
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium text-white transition-colors ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {isSubmitting ? (
                        'Adding...'
                    ) : (
                        <>
                            <FiPlus className="mr-2" />
                            Add Category
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}