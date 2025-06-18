import React, { useRef } from 'react';
import { FiDownload, FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';

function BackupRestore() {
    const fileInputRef = useRef(null);

    // Backup function (download backup)
    const handleBackup = () => {
        const data = localStorage.getItem('ExpenseTracker');
        if (!data) {
            toast.warn('No data to backup!');
            return;
        }

        // Ask user for filename WITHOUT extension
        let filename = prompt('Enter filename for backup (without extension):', 'expense-backup');
        if (!filename) {
            // User cancelled or empty input, do nothing
            toast.info('Backup cancelled');
            return;
        }

        // Always add .json extension
        filename = filename.trim() + '.json';

        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();

        URL.revokeObjectURL(url);
        toast.success(`Backup saved as ${filename}`);
    };

    // When restore button clicked, trigger hidden file input click
    const handleRestoreClick = () => {
        fileInputRef.current.click();
    };

    // Restore function (called when file selected)
    const handleRestore = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target.result;
                JSON.parse(text); // validate JSON

                localStorage.setItem('ExpenseTracker', text);
                toast.success('Backup restored! Please wait while the app refresh.');
                setTimeout(()=>{
                    window.location.reload()
                }, 2000)
            } catch {
                toast.error('Invalid backup file!');
            }
        };
        reader.readAsText(file);

        event.target.value = null;
    };

    return (
        <div className="relative min-h-[500px] sm:min-h-[600px] w-full p-4 sm:p-6 bg-gradient-to-br from-indigo-300 to-blue-400 overflow-hidden flex flex-col justify-center">
            <div className="relative z-10 max-w-md mx-auto w-full bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-white/30">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">
                    Backup & Restore
                </h2>

                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 text-center">
                    Protect your financial data with secure backups
                </p>

                <div className="flex flex-col gap-4 sm:gap-6">
                    <button
                        onClick={handleBackup}
                        className="flex items-center justify-center gap-2 sm:gap-3 px-4 py-3 sm:px-8 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all text-base sm:text-lg font-medium sm:font-semibold"
                    >
                        <FiDownload className="text-xl sm:text-2xl" />
                        <span>Download Backup</span>
                    </button>

                    <button
                        onClick={handleRestoreClick}
                        className="flex items-center justify-center gap-2 sm:gap-3 px-4 py-3 sm:px-8 sm:py-4 bg-white text-indigo-600 border-2 border-indigo-200 hover:border-indigo-300 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all text-base sm:text-lg font-medium sm:font-semibold"
                    >
                        <FiUpload className="text-xl sm:text-2xl" />
                        <span>Restore Backup</span>
                    </button>

                    <input
                        type="file"
                        accept="application/json"
                        ref={fileInputRef}
                        onChange={handleRestore}
                        className="hidden"
                    />
                </div>
            </div>
        </div>
    );
}

export default BackupRestore;