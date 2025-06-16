import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { usePDF } from 'react-to-pdf';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// PDF Document Styles
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 12,
        lineHeight: 1.5,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2c3e50',
        borderBottomWidth: 2,
        borderBottomColor: '#3498db',
        borderBottomStyle: 'solid',
        paddingBottom: 10,
    },
    subheader: {
        fontSize: 10,
        color: '#7f8c8d',
        marginBottom: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    table: {
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginBottom: 20,
    },
    tableHeader: {
        backgroundColor: '#3498db',
        flexDirection: 'row',
        color: 'white',
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        borderBottomStyle: 'solid',
    },
    tableCol: {
        padding: 8,
        borderRightWidth: 1,
        borderRightColor: '#e0e0e0',
        borderRightStyle: 'solid',
        flex: 1,
    },
    tableCell: {
        fontSize: 10,
    },
    totalRow: {
        flexDirection: 'row',
        backgroundColor: '#f8f9fa',
        fontWeight: 'bold',
    },
    dateCol: {
        width: '20%',
    },
    categoryCol: {
        width: '25%',
    },
    amountCol: {
        width: '15%',
        textAlign: 'right',
    },
    remarkCol: {
        width: '40%',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        fontSize: 10,
        color: '#95a5a6',
        textAlign: 'center',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        borderTopStyle: 'solid',
        paddingTop: 10,
    },
});


// PDF Document Component
const MyDocument = ({ data, start, end }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.header}>Expense Report</Text>

            <View style={styles.subheader}>
                <Text>Date Range: {start} to {end}</Text>
                <Text>Generated on: {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}</Text>
            </View>

            <View style={styles.table}>
                {/* Table Header */}
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <View style={[styles.tableCol, styles.dateCol]}><Text>Date</Text></View>
                    <View style={[styles.tableCol, styles.categoryCol]}><Text>Category</Text></View>
                    <View style={[styles.tableCol, styles.amountCol]}><Text>Amount (₹)</Text></View>
                    <View style={[styles.tableCol, styles.remarkCol]}><Text>Remarks</Text></View>
                </View>

                {/* Table Rows */}
                {data.map((e, index) => (
                    <View style={styles.tableRow} key={index}>
                        <View style={[styles.tableCol, styles.dateCol]}>
                            <Text style={styles.tableCell}>
                                {new Date(e.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </Text>
                        </View>
                        <View style={[styles.tableCol, styles.categoryCol]}>
                            <Text style={[styles.tableCell, { textTransform: 'capitalize' }]}>
                                {e.category}
                            </Text>
                        </View>
                        <View style={[styles.tableCol, styles.amountCol]}>
                            <Text style={styles.tableCell}>
                                {parseFloat(e.amount).toLocaleString('en-IN', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                            </Text>
                        </View>
                        <View style={[styles.tableCol, styles.remarkCol]}>
                            <Text style={styles.tableCell}>
                                {e.remarks || '-'}
                            </Text>
                        </View>
                    </View>
                ))}

                {/* Total Row */}
                {data.length > 0 && (
                    <View style={[styles.tableRow, styles.totalRow]}>
                        <View style={[styles.tableCol, styles.dateCol]}><Text>Total</Text></View>
                        <View style={[styles.tableCol, styles.categoryCol]}><Text></Text></View>
                        <View style={[styles.tableCol, styles.amountCol]}>
                            <Text>
                                {data.reduce((total, item) => total + parseFloat(item.amount), 0).toLocaleString('en-IN', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                            </Text>

                        </View>
                        <View style={[styles.tableCol, styles.remarkCol]}><Text></Text></View>
                    </View>
                )}
            </View>

            <View style={styles.footer}>
                <Text>Generated by ExpenseTrack • WebSynk</Text>
            </View>
        </Page>
    </Document>
);

export default function Report() {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [data, setData] = useState([]);
    const [reportStart, setReportStart] = useState();
    const [reportEnd, setReportEnd] = useState();

    const expense = JSON.parse(localStorage.getItem("ExpenseTracker"));
    const { toPDF, targetRef } = usePDF({ filename: 'expense-report.pdf' });

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;

    const generateReport = () => {
        if (start == "") {
            toast.info("Enter start date")
        } else {
            if (start > todayStr) {
                toast.info("Start Date cannont be greater than current date")
            } else {
                if (end == "") {
                    toast.info("Enter end date")
                } else {
                    if (end > todayStr) {
                        toast.info("End date cannot be greater than current date")
                    } else {
                        if (start > end) {
                            toast.error("Start date cannot be Greater than End date")
                        } else {
                            let dataArr = expense.expenses.filter((e) => e.date >= start && e.date <= end);
                            dataArr.sort((a, b) => new Date(a.date) - new Date(b.date));
                            setData(dataArr);
                            toast.success("Report generated successfully!");
                            setReportStart(start)
                            setReportEnd(end)
                            setStart("");
                            setEnd("");
                        }
                    }
                }
            }
        }
    };

    const calculateTotal = () => {
        return data.reduce((total, item) => total + parseFloat(item.amount), 0).toFixed(2);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
            {/* Date Range Selector Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Generate Report
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                value={start}
                                onChange={e => setStart(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                value={end}
                                onChange={e => setEnd(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition"
                            />
                        </div>
                    </div>

                    <div className="flex space-x-4 md:col-span-2">
                        <button
                            type="button"
                            onClick={generateReport}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.01] shadow-md hover:shadow-lg flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                            </svg>
                            Generate Report
                        </button><br /><br />

                        {data.length > 0 && (
                            <PDFDownloadLink
                                document={<MyDocument data={data} start={reportStart} end={reportEnd} />}
                                fileName="expense-report.pdf"
                            >
                                {({ loading }) => (
                                    <button type='button' className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.01] shadow-md hover:shadow-lg flex items-center justify-center">
                                        {loading ? 'Preparing document...' : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                Download PDF
                                            </>
                                        )}
                                    </button>
                                )}
                            </PDFDownloadLink>
                        )}
                    </div>
                </div>
            </div>

            {/* Report Table Card - This is the element that will be converted to PDF */}
            <div ref={targetRef} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                {/* PDF Header - Only visible in the PDF */}
                <div className="hidden print:block p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800">Expense Report</h1>
                    <p className="text-gray-600">
                        {start && end ? `From ${start} to ${end}` : 'Date range not specified'}
                    </p>
                    <p className="text-gray-600 mt-2">
                        Generated on: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Date
                                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Remark</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((e, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'} style={{ transition: 'background-color 0.2s ease' }}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{e.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {e.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                        ₹{parseFloat(e.amount).toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate" title={e.remarks}>
                                        {e.remarks || '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        {data.length > 0 && (
                            <tfoot className="bg-gray-100">
                                <tr>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900" colSpan="2">Total</td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                        ₹{calculateTotal()}
                                    </td>
                                    <td className="px-6 py-4"></td>
                                </tr>
                            </tfoot>
                        )}
                    </table>
                </div>

                {/* Empty State */}
                {data.length === 0 && (
                    <div className="text-center py-12">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No reports generated</h3>
                        <p className="mt-1 text-sm text-gray-500">Select a date range and click "Generate Report" to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
}