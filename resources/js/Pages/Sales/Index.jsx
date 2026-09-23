import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function SalesIndex({ sales }) {
    const exportToPDF = () => {
        const doc = new jsPDF();
        
        // Add Title
        doc.setFontSize(20);
        doc.setTextColor(15, 23, 42); // slate-900
        doc.text("GizmoCentral - Sales Report", 14, 22);
        
        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139); // slate-500
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
        
        // Add Table
        const tableColumn = ["Transaction ID", "Date & Time", "Cashier", "Items", "Total (PHP)"];
        const tableRows = [];

        if (sales.data && sales.data.length > 0) {
            sales.data.forEach(sale => {
                let itemsText = '';
                if (sale.items) {
                    sale.items.forEach(item => {
                        itemsText += `${item.quantity}x ${item.product ? item.product.name : 'Unknown'}\n`;
                    });
                } else {
                    itemsText = 'No items';
                }

                const saleData = [
                    `#${sale.id.toString().padStart(6, '0')}`,
                    new Date(sale.sale_date || sale.created_at).toLocaleString(),
                    sale.cashier || 'Unknown',
                    itemsText.trim(),
                    `P ${parseFloat(sale.total_amount).toFixed(2)}`
                ];
                tableRows.push(saleData);
            });
        }

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 40,
            styles: { fontSize: 9, cellPadding: 4, lineColor: [226, 232, 240], lineWidth: 0.1 },
            headStyles: { fillColor: [37, 99, 235], textColor: [255, 255, 255], fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [248, 250, 252] },
        });

        doc.save("GizmoCentral_Sales_Report.pdf");
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold leading-tight text-gray-800">
                        Sales History
                    </h2>
                    <button 
                        onClick={exportToPDF}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all font-bold flex items-center gap-2"
                    >
                        <i className="bi bi-file-earmark-pdf-fill"></i>
                        Export PDF
                    </button>
                </div>
            }
        >
            <Head title="Sales History" />

            <div className="glass-panel overflow-hidden border border-white/40 shadow-2xl rounded-3xl p-1 mb-8">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/20">
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/20 backdrop-blur-md first:rounded-tl-2xl">Transaction ID</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/20 backdrop-blur-md">Date & Time</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/20 backdrop-blur-md">Cashier</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/20 backdrop-blur-md">Items</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/20 backdrop-blur-md text-right">Total Amount</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/20 backdrop-blur-md text-right last:rounded-tr-2xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/20 bg-white/30 backdrop-blur-sm">
                            {sales.data && sales.data.length > 0 ? (
                                sales.data.map((sale) => (
                                    <tr key={sale.id} className="hover:bg-white/60 transition-colors duration-300 group">
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold shadow-sm">
                                                    <i className="bi bi-receipt"></i>
                                                </div>
                                                <div className="font-bold text-slate-800">#{sale.id.toString().padStart(6, '0')}</div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap text-sm text-slate-600 font-medium">
                                            {new Date(sale.sale_date || sale.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <span className="px-3 py-1 bg-white/50 border border-white/50 text-slate-700 rounded-full text-xs font-semibold shadow-sm inline-flex items-center gap-1.5">
                                                <i className="bi bi-person-circle text-slate-400"></i> {sale.cashier}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-sm text-slate-600">
                                            <div className="flex flex-col gap-1">
                                                {sale.items && sale.items.slice(0, 2).map(item => (
                                                    <div key={item.id} className="truncate w-48 font-medium">
                                                        <span className="text-blue-500 font-bold mr-1">{item.quantity}x</span> 
                                                        {item.product ? item.product.name : 'Unknown Product'}
                                                    </div>
                                                ))}
                                                {sale.items && sale.items.length > 2 && (
                                                    <div className="text-xs text-slate-400 font-semibold italic mt-1">+{sale.items.length - 2} more items</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap text-right font-black text-blue-600 text-lg">
                                            ₱{parseFloat(sale.total_amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap text-right text-sm">
                                            <Link href={route('sales.show', sale.id)} className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-white/50 text-blue-600 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-md transition-all">
                                                <i className="bi bi-eye"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-8 py-16 text-center text-slate-500">
                                        <div className="mb-3 text-4xl text-slate-300"><i className="bi bi-receipt-cutoff"></i></div>
                                        <p className="font-medium text-lg">No sales records found</p>
                                        <p className="text-sm">Process a transaction in the POS to see it here.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                {sales.links && (
                    <div className="px-8 py-5 bg-white/20 border-t border-white/20 flex justify-between items-center rounded-b-3xl backdrop-blur-md">
                        <div className="text-sm font-semibold text-slate-600">
                            Showing {sales.from} to {sales.to} of {sales.total} transactions
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
