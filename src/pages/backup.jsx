import React, { useRef } from 'react';
import { FiDownload, FiUpload } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';

function BackupRestore() {
    const fileInputRef = useRef(null);
    const [ref, inView] = useInView({
        triggerOnce: false, // Changed to false so animations replay when scrolled out/in
        threshold: 0.1,
    });

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

    // Background animation variants - More pronounced
    const backgroundVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
                ease: "easeInOut",
            }
        }
    };

    // Button animation variants - More dramatic
    const buttonVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.175, 0.885, 0.32, 1.275],
            }
        },
        hover: {
            scale: 1.1,
            boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)",
            transition: { duration: 0.3 }
        },
        tap: {
            scale: 0.95
        }
    };

    // Floating elements with more visible motion
    const floatingElements = [...Array(12)].map((_, i) => {
        const size = Math.random() * 120 + 80; // Larger elements
        const duration = Math.random() * 15 + 15; // Faster movement
        const delay = Math.random() * 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const rotate = Math.random() * 360;
        const isCircle = Math.random() > 0.5;

        return (
            <motion.div
                key={i}
                className={`absolute ${isCircle ? 'rounded-full' : 'rounded-3xl'} bg-indigo-300/40 backdrop-blur-sm`}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${x}%`,
                    top: `${y}%`,
                    rotate: `${rotate}deg`,
                }}
                animate={{
                    x: [0, Math.random() * 200 - 100],
                    y: [0, Math.random() * 200 - 100],
                    rotate: [rotate, rotate + 180],
                    opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: delay,
                    ease: "easeInOut",
                }}
            />
        );
    });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={backgroundVariants}
            className="relative min-h-[500px] sm:min-h-[600px] w-full p-4 sm:p-6 bg-gradient-to-br from-indigo-100 to-blue-200 overflow-hidden flex flex-col justify-center"
        >
            {/* Animated background elements */}
            {inView && (
                <>
                    <motion.div
                        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiKDIyMCwyMzAsMjUwKSIgb3BhY2l0eT0iMC42Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]"
                        animate={{
                            backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />

                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-transparent via-white/50 to-transparent"
                        animate={{
                            opacity: [0.5, 0.9, 0.5],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {floatingElements}

                    <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-indigo-200/20 to-blue-300/20"
                        animate={{
                            backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </>
            )}

            <div className="relative z-10 max-w-md mx-auto w-full bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-white/30">
                <motion.h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 text-center"
                    initial={{ opacity: 0, y: -30 }}
                    animate={inView ? {
                        opacity: 1,
                        y: 0,
                        transition: {
                            type: "spring",
                            stiffness: 100,
                            damping: 10
                        }
                    } : {}}
                    transition={{ delay: 0.2 }}
                >
                    Backup & Restore
                </motion.h2>

                <motion.p
                    className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 text-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? {
                        opacity: 1,
                        x: 0,
                        transition: {
                            type: "spring",
                            stiffness: 100,
                            damping: 10
                        }
                    } : {}}
                    transition={{ delay: 0.4 }}
                >
                    Protect your financial data with secure backups
                </motion.p>

                <div className="flex flex-col gap-4 sm:gap-6">
                    <motion.button
                        variants={buttonVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={handleBackup}
                        className="flex items-center justify-center gap-2 sm:gap-3 px-4 py-3 sm:px-8 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all text-base sm:text-lg font-medium sm:font-semibold"
                    >
                        <FiDownload className="text-xl sm:text-2xl" />
                        <span>Download Backup</span>
                    </motion.button>

                    <motion.button
                        variants={buttonVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={handleRestoreClick}
                        className="flex items-center justify-center gap-2 sm:gap-3 px-4 py-3 sm:px-8 sm:py-4 bg-white text-indigo-600 border-2 border-indigo-200 hover:border-indigo-300 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all text-base sm:text-lg font-medium sm:font-semibold"
                    >
                        <FiUpload className="text-xl sm:text-2xl" />
                        <span>Restore Backup</span>
                    </motion.button>

                    <input
                        type="file"
                        accept="application/json"
                        ref={fileInputRef}
                        onChange={handleRestore}
                        className="hidden"
                    />
                </div>
            </div>
        </motion.div>
    );
}

export default BackupRestore;