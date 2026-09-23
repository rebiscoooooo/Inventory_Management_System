import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function ProductsIndex({ products }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const { data, setData, post, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        category: '',
        price: '',
        stock: '',
        image: null,
    });

    const openModal = (product = null) => {
        clearErrors();
        if (product) {
            setEditingProduct(product);
            setData({
                name: product.name,
                category: product.category || '',
                price: product.price,
                stock: product.stock,
                image: null,
            });
            setPreviewImage(product.image_url);
        } else {
            setEditingProduct(null);
            setPreviewImage(null);
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
            post(route('products.update', editingProduct.id) + '?_method=put', {
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

            <div className="glass-panel overflow-hidden border border-white/40 shadow-2xl rounded-3xl p-1 mb-8">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/20">
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/20 backdrop-blur-md first:rounded-tl-2xl w-16">Image</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/20 backdrop-blur-md">Name</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/20 backdrop-blur-md">Category</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/20 backdrop-blur-md">Price</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/20 backdrop-blur-md">Stock</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/20 backdrop-blur-md text-right last:rounded-tr-2xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/20 bg-white/30 backdrop-blur-sm">
                            {products.data && products.data.length > 0 ? (
                                products.data.map((product) => (
                                    <tr key={product.id} className="hover:bg-white/60 transition-colors duration-300 group">
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            {product.image_url ? (
                                                <img src={product.image_url} alt={product.name} className="w-12 h-12 rounded-xl object-cover shadow-sm border border-white/50" />
                                            ) : (
                                                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-sm">
                                                    <i className="bi bi-image text-slate-400 text-xl"></i>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <div className="font-bold text-slate-800">{product.name}</div>
                                            <div className="text-xs text-slate-500 mt-1">ID: {product.id}</div>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <span className="px-3 py-1 bg-white/50 border border-white/50 text-slate-700 rounded-full text-xs font-semibold shadow-sm inline-block">
                                                {product.category || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap font-bold text-blue-600">
                                            ₱{parseFloat(product.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <div className={`px-3 py-1 inline-flex items-center gap-2 rounded-full text-xs font-bold border shadow-sm ${
                                                product.stock > 10 
                                                    ? 'bg-emerald-100/80 border-emerald-200 text-emerald-700' 
                                                    : product.stock > 0 
                                                    ? 'bg-amber-100/80 border-amber-200 text-amber-700' 
                                                    : 'bg-red-100/80 border-red-200 text-red-700'
                                            }`}>
                                                <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                                                {product.stock} in stock
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap text-right text-sm">
                                            <button onClick={() => openModal(product)} className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-white/50 text-blue-600 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-md transition-all mr-2">
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button onClick={() => handleDelete(product.id)} className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-white/50 text-red-500 hover:bg-red-500 hover:text-white shadow-sm hover:shadow-md transition-all">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-8 py-16 text-center text-slate-500">
                                        <div className="mb-3 text-4xl text-slate-300"><i className="bi bi-box-seam"></i></div>
                                        <p className="font-medium text-lg">No products found</p>
                                        <p className="text-sm">Click "Add Product" to get started.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                {products.links && (
                    <div className="px-8 py-5 bg-white/20 border-t border-white/20 flex justify-between items-center rounded-b-3xl backdrop-blur-md">
                        <div className="text-sm font-semibold text-slate-600">
                            Showing {products.from} to {products.to} of {products.total} products
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
                                    
                                    <div className="mb-5 flex gap-5">
                                        <div className="flex-1">
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Product Name</label>
                                            <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full bg-white/70 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm" required />
                                            {errors.name && <p className="mt-1 text-sm text-red-500 font-medium">{errors.name}</p>}
                                        </div>
                                        <div className="w-24">
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Image</label>
                                            <label className="cursor-pointer block w-24 h-24 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/50 transition-all flex flex-col items-center justify-center overflow-hidden relative">
                                                {previewImage ? (
                                                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="text-slate-400 text-center p-2">
                                                        <i className="bi bi-camera text-2xl"></i>
                                                    </div>
                                                )}
                                                <input 
                                                    type="file" 
                                                    className="hidden" 
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        setData('image', file);
                                                        if (file) {
                                                            setPreviewImage(URL.createObjectURL(file));
                                                        } else {
                                                            setPreviewImage(null);
                                                        }
                                                    }}
                                                />
                                            </label>
                                            {errors.image && <p className="mt-1 text-xs text-red-500 font-medium whitespace-nowrap">{errors.image}</p>}
                                        </div>
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
