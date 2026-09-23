import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function SalesIndex({ sales }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold leading-tight text-gray-800">
                    Sales History
                </h2>
            }
        >
            <Head title="Sales History" />

            <div className="glass-panel overflow-hidden sm:rounded-lg">
                <div className="p-6 border-b border-gray-200/50">
                    <p className="text-sm text-gray-600">
                        View a detailed log of all transactions processed in the POS system.
                    </p>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200/50">
                        <thead className="bg-slate-50/50 backdrop-blur-md">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cashier</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/50">
                            {sales.data && sales.data.length > 0 ? (
                                sales.data.map((sale) => (
                                    <tr key={sale.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                            #{sale.id.toString().padStart(5, '0')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(sale.sale_date || sale.created_at).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {sale.cashier}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            <ul className="list-disc pl-4">
                                                {sale.items && sale.items.slice(0, 2).map(item => (
                                                    <li key={item.id} className="truncate w-48">
                                                        {item.quantity}x {item.product ? item.product.name : 'Unknown Product'}
                                                    </li>
                                                ))}
                                                {sale.items && sale.items.length > 2 && (
                                                    <li className="text-xs text-gray-400 italic">+{sale.items.length - 2} more items</li>
                                                )}
                                            </ul>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-indigo-600">
                                            ${parseFloat(sale.total_amount).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link href={route('sales.show', sale.id)} className="text-indigo-600 hover:text-indigo-900">
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        No sales records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {sales.links && (
                    <div className="px-6 py-4 border-t border-gray-200">
                        <div className="text-sm text-gray-500">
                            Showing {sales.from} to {sales.to} of {sales.total} transactions
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
