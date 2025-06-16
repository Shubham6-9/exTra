import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiPlusCircle, 
  FiList, 
  FiPieChart,
  FiSettings,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden fixed bottom-4 right-4 z-50 bg-blue-700 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed md:static inset-0 md:inset-auto z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white shadow-xl">
          {/* Close button for mobile */}
          <div className="md:hidden flex justify-end p-4">
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-blue-200"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Logo/Branding */}
          <div className="flex items-center justify-center mb-8 p-4">
            <h1 className="text-xl font-bold tracking-tight">ExpenseTrack</h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-2 space-y-2">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center p-4 rounded-lg
                transition-all duration-200 text-sm font-medium
                ${isActive 
                  ? 'bg-blue-700/50 shadow-inner border-l-4 border-blue-300' 
                  : 'hover:bg-blue-700/30'
                }
              `}
            >
              <FiHome className="text-lg mr-3" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/addExpense"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center p-4 rounded-lg
                transition-all duration-200 text-sm font-medium
                ${isActive 
                  ? 'bg-blue-700/50 shadow-inner border-l-4 border-blue-300' 
                  : 'hover:bg-blue-700/30'
                }
              `}
            >
              <FiPlusCircle className="text-lg mr-3" />
              <span>Add Expense</span>
            </NavLink>

            <NavLink
              to="/details"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center p-4 rounded-lg
                transition-all duration-200 text-sm font-medium
                ${isActive 
                  ? 'bg-blue-700/50 shadow-inner border-l-4 border-blue-300' 
                  : 'hover:bg-blue-700/30'
                }
              `}
            >
              <FiList className="text-lg mr-3" />
              <span>Transaction History</span>
            </NavLink>

            <NavLink
              to="/chart"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center p-4 rounded-lg
                transition-all duration-200 text-sm font-medium
                ${isActive 
                  ? 'bg-blue-700/50 shadow-inner border-l-4 border-blue-300' 
                  : 'hover:bg-blue-700/30'
                }
              `}
            >
              <FiPieChart className="text-lg mr-3" />
              <span>Analytics</span>
            </NavLink>
            
            <NavLink
              to="/backup"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                mb-4 flex items-center p-4 rounded-lg
                transition-all duration-200 text-sm font-medium
                ${isActive 
                  ? 'bg-blue-700/50 shadow-inner border-l-4 border-blue-300' 
                  : 'hover:bg-blue-700/30'
                }
              `}
            >
              <FiPieChart className="text-lg mr-3" />
              <span>Backup</span>
            </NavLink>
          </nav>

        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}