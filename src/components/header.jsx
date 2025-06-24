import React from 'react';
import Logo from '../assets/expense-tracker-logo.png';

export default function Header() {
    return (
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-3 md:py-4">
                    <div className="flex items-center space-x-3">
                        <img
                            src={Logo}
                            className="h-10 w-10 md:h-12 md:w-12 flex-shrink-0"
                            alt="Expense Tracker Logo"
                        />
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                                Expense Tracker
                            </h1>
                            <p className="text-xs md:text-sm text-gray-500">
                                Track your spending effortlessly
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <a href="https://easy-expense-documentation.netlify.app/" target='_blank' className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium">
                            Read Documentation
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}