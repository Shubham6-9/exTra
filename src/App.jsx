import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import AddExpensePage from './pages/addExpensePage'
import DetailedExpense from './pages/detailedExpense'
import Chart from './pages/chart'
import Report from './pages/report'
import Sidebar from './components/sidebar'
import Header from './components/header'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoneyBillWave, FaChartLine, FaPiggyBank, FaCheckCircle } from 'react-icons/fa';
import BackupRestore from './pages/backup.jsx'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const initial = localStorage.getItem("isData") || false
    if (initial == false) {
      localStorage.setItem("isData", true)
      localStorage.setItem("ExpenseTracker", JSON.stringify({
        expenses: [],
        totalAmount: 0,
        categories: [
          { ctype: "Office Expense", count: 0, total: 0 },
          { ctype: "Transport", count: 0, total: 0 },
          { ctype: "Food", count: 0, total: 0 },
          { ctype: "Household", count: 0, total: 0 }
        ]
      }))
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center p-8 max-w-md"
        >
          <motion.div
            animate={{
              rotateY: [0, 360, 360, 0],
              scale: [1, 1.2, 1.2, 1]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.3, 0.7, 1]
            }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <FaMoneyBillWave className="text-blue-600 text-5xl" />
              <motion.div
                className="absolute -bottom-2 -right-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <FaCheckCircle className="text-green-500 text-xl" />
              </motion.div>
            </div>
          </motion.div>

          <motion.p
            className="text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Tracking your expenses made easy
          </motion.p>

          <motion.div
            className="flex justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <FaChartLine className="text-indigo-500 animate-pulse" />
            <FaPiggyBank className="text-purple-500 animate-pulse delay-100" />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Router>
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
          <Header />
        </header>

        {/* Page Title */}
        <h3 className="text-center py-3 md:py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-lg md:text-xl shadow-lg transform transition-all hover:scale-[1.01] hover:shadow-xl">
          <span className="inline-block px-2">
            Proof That You <span className="whitespace-nowrap">Had Money Once!</span>
          </span>
        </h3>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Fixed Sidebar - Hidden on mobile, shown from md-up */}
          <aside className="hidden md:block fixed md:static h-[calc(100vh-64px)] w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-lg">
            <Sidebar />
          </aside>

          {/* Mobile Bottom Nav - Shown only on mobile */}
          <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 z-40">
            <Sidebar mobile />
          </div>

          {/* Main Content Container */}
          <main className="flex-1 overflow-y-auto pt-4 pb-16 md:pb-4 md:ml-10 h-[calc(100vh-64px)]">
            <div className="container mx-auto px-4 md:px-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/addExpense" element={<AddExpensePage />} />
                <Route path="/details" element={<DetailedExpense />} />
                <Route path="/chart" element={<Chart />} />
                <Route path="/report" element={<Report />} />
                <Route path="/backup" element={<BackupRestore />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App