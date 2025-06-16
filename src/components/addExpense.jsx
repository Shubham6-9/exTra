import React, { useState, useEffect } from 'react';
import AddCategory from './addCategory';
import { useDispatch, useSelector } from 'react-redux';
import { addEntry } from '../redux/action.jsx';
import { FiPlusCircle, FiDollarSign, FiCalendar, FiTag, FiMessageSquare } from 'react-icons/fi';

export default function Add() {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    date: todayStr,
    categoryName: "Food",
    amount: "",
    remark: ""
  });
  
  const [errors, setErrors] = useState({
    date: "",
    amount: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const expense = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => setSubmitSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { date: "", amount: "" };

    if (!formData.date) {
      newErrors.date = "Date is required";
      valid = false;
    } else if (formData.date > todayStr) {
      newErrors.date = "Date cannot be in the future";
      valid = false;
    }

    if (!formData.amount) {
      newErrors.amount = "Amount is required";
      valid = false;
    } else if (Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be positive";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    const expenseObj = {
      id: Date.now(),
      date: formData.date,
      category: formData.categoryName,
      amount: formData.amount,
      remarks: formData.remark
    };

    // Dispatch Redux action
    dispatch(addEntry(expenseObj, formData.categoryName, formData.amount));

    // Update localStorage
    const expenseEntry = JSON.parse(localStorage.getItem("ExpenseTracker")) || expense;
    expenseEntry.expenses.push(expenseObj);
    expenseEntry.totalAmount = +(expenseEntry.totalAmount) + +(formData.amount);
    
    expenseEntry.categories.forEach((cat) => {
      if (cat.ctype === formData.categoryName) {
        cat.count++;
        cat.total += Number(formData.amount);
      }
    });

    localStorage.setItem("ExpenseTracker", JSON.stringify(expenseEntry));

    // Reset form and show success
    setFormData({
      date: todayStr,
      categoryName: "Food",
      amount: "",
      remark: ""
    });
    
    setSubmitSuccess(true);
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
      {/* Add Expense Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center mb-6">
          <FiPlusCircle className="text-blue-600 text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Add New Expense</h2>
        </div>
        
        {submitSuccess && (
          <div className="mb-6 p-3 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Expense added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <FiCalendar className="mr-2 text-gray-500" />
              Date
            </label>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              value={formData.date}
              max={todayStr}
              className={`w-full px-4 py-2.5 border ${errors.date ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}
          </div>

          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <FiTag className="mr-2 text-gray-500" />
              Category
            </label>
            <select
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {expense?.categories?.map((category, i) => (
                <option key={i} value={category.ctype}>{category.ctype}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <FiDollarSign className="mr-2 text-gray-500" />
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                name="amount"
                onChange={handleChange}
                value={formData.amount}
                placeholder="0.00"
                min="0"
                step="0.01"
                className={`w-full pl-8 pr-4 py-2.5 border ${errors.amount ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
            {errors.amount && <p className="text-sm text-red-500 mt-1">{errors.amount}</p>}
          </div>

          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <FiMessageSquare className="mr-2 text-gray-500" />
              Notes (Optional)
            </label>
            <input
              type="text"
              name="remark"
              onChange={handleChange}
              value={formData.remark}
              placeholder="Add any notes about this expense"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isSubmitting ? 'Processing...' : 'Save Expense'}
          </button>
        </form>
      </div>

      {/* Add Category Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center mb-6">
          <FiPlusCircle className="text-blue-600 text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Manage Categories</h2>
        </div>
        <AddCategory />
      </div>
    </div>
  );
}