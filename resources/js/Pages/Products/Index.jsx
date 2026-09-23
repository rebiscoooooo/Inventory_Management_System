import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function ProductsIndex({ products }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        category: '',
        price: '',
        stock: '',
    });

    const openModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setData({
                name: product.name,
                category: product.category || '',
                price: product.price,
                stock: product.stock,
            });
        } else {
            setEditingProduct(null);
            reset();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingProduct) {
            put(route('products.update', editingProduct.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('products.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#94a3b8',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('products.destroy', id));
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold leading-tight text-gray-800">
                        Products Management
                    </h2>
                    <button
                        onClick={() => openModal()}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors font-medium flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Product
                    </button>
                </div>
            }
        >
            <Head title="Products" />

            <div className="glass-panel overflow-hidden sm:rounded-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200/50">
                        <thead className="bg-slate-50/50 backdrop-blur-md">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/50">
                            {products.data && products.data.length > 0 ? (
                                products.data.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">${parseFloat(product.price).toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 10 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                                {product.stock} in stock
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => openModal(product)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                            <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                {products.links && (
                    <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                        {/* Render simple pagination links here based on products.links array */}
                        <div className="text-sm text-gray-500">
                            Showing {products.from} to {products.to} of {products.total} results
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom glass-panel backdrop-blur-xl border border-white/20 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-0">
                            <form onSubmit={submit}>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                                        <i className={`bi ${editingProduct ? 'bi-pencil-square' : 'bi-plus-circle'} mr-3 text-blue-600`}></i>
                                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                                    </h3>
                                    
                                    <div className="mb-5">
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Product Name</label>
                                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full bg-white/70 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm" required />
                                        {errors.name && <p className="mt-1 text-sm text-red-500 font-medium">{errors.name}</p>}
                                    </div>

                                    <div className="mb-5">
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                                        <input type="text" value={data.category} onChange={e => setData('category', e.target.value)} className="w-full bg-white/70 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm" />
                                        {errors.category && <p className="mt-1 text-sm text-red-500 font-medium">{errors.category}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-5 mb-2">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Price (₱)</label>
                                            <input type="number" step="0.01" value={data.price} onChange={e => setData('price', e.target.value)} className="w-full bg-white/70 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm" required />
                                            {errors.price && <p className="mt-1 text-sm text-red-500 font-medium">{errors.price}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Stock Quantity</label>
                                            <input type="number" value={data.stock} onChange={e => setData('stock', e.target.value)} className="w-full bg-white/70 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm" required />
                                            {errors.stock && <p className="mt-1 text-sm text-red-500 font-medium">{errors.stock}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/40 border-t border-white/20 px-6 py-4 flex justify-end gap-3 rounded-b-2xl">
                                    <button type="button" onClick={closeModal} className="px-6 py-2.5 rounded-xl font-bold bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors shadow-sm border border-slate-200">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={processing} className="px-6 py-2.5 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50">
                                        {processing ? 'Saving...' : 'Save Product'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
