import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function SalesShow({ sale }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold leading-tight text-gray-800">
                        Transaction #{sale.id.toString().padStart(5, '0')}
                    </h2>
                    <Link href={route('sales.index')} className="text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Sales
                    </Link>
                </div>
            }
        >
            <Head title={`Transaction #${sale.id}`} />

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sale Details Card */}
                <div className="md:col-span-1 space-y-6">
                    <div className="glass-panel overflow-hidden sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200/50 pb-3 mb-4">Transaction Details</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Date & Time</p>
                                    <p className="font-semibold text-gray-900">{new Date(sale.sale_date || sale.created_at).toLocaleString()}</p>
                                </div>
                                
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Processed By (Cashier)</p>
                                    <p className="font-semibold text-gray-900">{sale.cashier || 'Unknown'}</p>
                                </div>
                                
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Status</p>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Completed
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel overflow-hidden sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200/50 pb-3 mb-4">Payment Summary</h3>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Amount</span>
                                    <span className="font-bold text-gray-900">₱{parseFloat(sale.total_amount).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Cash Tendered</span>
                                    <span className="font-medium text-gray-900">₱{parseFloat(sale.cash).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between border-t border-gray-200/50 pt-3">
                                    <span className="text-gray-600 font-medium">Change Due</span>
                                    <span className="font-bold text-indigo-600">₱{parseFloat(sale.change_amount).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Items List */}
                <div className="md:col-span-2">
                    <div className="glass-panel overflow-hidden sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200/50">
                            <h3 className="text-lg font-bold text-gray-900">Purchased Items</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200/50">
                                <thead className="bg-slate-50/50 backdrop-blur-md">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200/50">
                                    {sale.items && sale.items.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{item.product ? item.product.name : 'Unknown Product'}</div>
                                                {item.product && item.product.category && (
                                                    <div className="text-xs text-gray-500">{item.product.category}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                                {item.quantity}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                                                ₱{parseFloat(item.price).toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                                ₱{parseFloat(item.subtotal).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                    {(!sale.items || sale.items.length === 0) && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                                No items found for this transaction.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot className="bg-slate-50/50 backdrop-blur-md">
                                    <tr>
                                        <td colSpan="3" className="px-6 py-4 text-right text-sm font-bold text-gray-700">Total</td>
                                        <td className="px-6 py-4 text-right text-sm font-bold text-indigo-600">
                                            ₱{parseFloat(sale.total_amount).toFixed(2)}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
