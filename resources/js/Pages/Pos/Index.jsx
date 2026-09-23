import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function PosIndex({ products, categories }) {
    const { flash } = usePage().props;
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [cashTendered, setCashTendered] = useState('');
    const [showReceipt, setShowReceipt] = useState(false);
    const [receiptData, setReceiptData] = useState(null);

    useEffect(() => {
        if (flash && flash.receipt) {
            setReceiptData(flash.receipt);
            setShowReceipt(true);
        }
    }, [flash]);

    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const changeAmount = cashTendered ? (parseFloat(cashTendered) - totalAmount) : 0;

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const addToCart = (product) => {
        if (product.stock <= 0) {
            MySwal.fire({ icon: 'warning', title: 'Out of Stock', text: 'This product is currently out of stock!' });
            return;
        }

        setCart(currentCart => {
            const existingItem = currentCart.find(item => item.id === product.id);
            if (existingItem) {
                if (existingItem.quantity >= product.stock) {
                    MySwal.fire({ icon: 'warning', title: 'Limit Reached', text: 'Cannot add more than available stock.' });
                    return currentCart;
                }
                return currentCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.price }
                        : item
                );
            }
            return [...currentCart, { ...product, quantity: 1, subtotal: product.price }];
        });
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        
        const product = products.find(p => p.id === productId);
        if (newQuantity > product.stock) {
            MySwal.fire({ icon: 'warning', title: 'Limit Reached', text: 'Cannot exceed available stock.' });
            return;
        }

        setCart(currentCart =>
            currentCart.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity, subtotal: newQuantity * item.price }
                    : item
            )
        );
    };

    const removeFromCart = (productId) => {
        setCart(currentCart => currentCart.filter(item => item.id !== productId));
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            MySwal.fire({ icon: 'error', title: 'Empty Cart', text: 'Please add items to the cart before checking out.' });
            return;
        }
        
        if (!cashTendered || parseFloat(cashTendered) < totalAmount) {
            MySwal.fire({ icon: 'error', title: 'Insufficient Cash', text: 'The cash tendered is less than the total amount.' });
            return;
        }

        const formattedItems = cart.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.subtotal
        }));

        router.post(route('pos.checkout'), {
            total_amount: totalAmount,
            cash: cashTendered,
            change_amount: changeAmount,
            items: formattedItems
        }, {
            onSuccess: () => {
                setCart([]);
                setCashTendered('');
            }
        });
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <AuthenticatedLayout>
            <Head title="Point of Sale" />

            <div className="flex flex-col lg:flex-row gap-6 pos-container transition-colors duration-300 h-[calc(100vh-100px)] print:hidden">
                
                {/* Product Catalog (Left Side) */}
                <div className="w-full lg:w-7/12 mb-4 h-[60vh] lg:h-full flex flex-col">
                    <div className="glass-panel h-full flex flex-col p-0 overflow-hidden shadow-2xl transition-colors">
                        
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-200/50 flex justify-between items-center shrink-0">
                            <h5 className="mb-0 font-bold text-slate-800 text-xl tracking-wide flex items-center">
                                <i className="bi bi-box-seam mr-3 text-blue-600 text-2xl"></i>Product Catalog
                            </h5>
                        </div>

                        <div className="p-5 flex flex-col flex-grow overflow-hidden">
                            {/* Search Bar */}
                            <div className="relative mb-5 flex form-control p-0 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-all shadow-sm group shrink-0 items-center bg-white/70 rounded-xl">
                                <span className="px-5 py-3.5 text-slate-400 flex items-center justify-center">
                                    <i className="bi bi-search text-lg"></i>
                                </span>
                                <input 
                                    type="text" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            if (filteredProducts.length === 1) {
                                                addToCart(filteredProducts[0]);
                                                setSearchQuery('');
                                            } else if (filteredProducts.length === 0) {
                                                MySwal.fire({ icon: 'warning', title: 'Not Found', text: 'No products match your search.' });
                                            } else if (searchQuery) {
                                                const exactMatch = filteredProducts.find(p => p.name.toLowerCase() === searchQuery.toLowerCase());
                                                if (exactMatch) {
                                                    addToCart(exactMatch);
                                                    setSearchQuery('');
                                                }
                                            }
                                        }
                                    }}
                                    className="w-full py-3.5 pr-12 border-0 bg-transparent text-slate-800 focus:outline-none focus:ring-0" 
                                    placeholder="Search product name..." 
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="absolute right-0 top-0 h-full px-5 text-slate-400 hover:text-red-500 bg-transparent border-0">
                                        <i className="bi bi-x-lg text-lg"></i>
                                    </button>
                                )}
                            </div>

                            {/* Category Buttons */}
                            <div className="flex gap-3 overflow-x-auto pb-4 mb-2 category-scroll hide-scroll px-1 shrink-0">
                                <button 
                                    onClick={() => setSelectedCategory('all')}
                                    className={`px-6 py-2.5 rounded-xl font-bold shadow-sm whitespace-nowrap transition-all tracking-wide text-sm border-0 ${selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-transparent text-slate-500 border border-slate-300 hover:bg-blue-600/10 hover:text-blue-600'}`}
                                >
                                    All Items
                                </button>
                                {categories.map(category => (
                                    <button 
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-6 py-2.5 rounded-xl font-bold shadow-sm whitespace-nowrap transition-all tracking-wide text-sm border-0 ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-transparent text-slate-500 border border-slate-300 hover:bg-blue-600/10 hover:text-blue-600'}`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                            {/* Product Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pb-6 px-1 hide-scroll product-list-container content-start flex-grow">
                                {filteredProducts.map((product) => (
                                    <div 
                                        key={product.id} 
                                        onClick={() => addToCart(product)}
                                        className="product-item cursor-pointer group h-full flex flex-col"
                                    >
                                        {/* Card Design */}
                                        <div className="glass-panel h-full rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col relative border-0 p-0">
                                            
                                            <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-50/50 shrink-0 border-b border-gray-200/50 flex justify-center items-center p-3">
                                                <img 
                                                    src={product.image_url || `https://placehold.co/300x200/1e293b/94a3b8?text=${encodeURIComponent(product.name.charAt(0).toUpperCase())}`}
                                                    alt={product.name}
                                                    className="w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                                                />
                                            </div>
                                            
                                            <div className="p-3.5 flex flex-col flex-grow bg-transparent">                                     
                                                <span className="text-blue-500 text-[10px] font-bold tracking-widest uppercase mb-1 truncate block">{product.category}</span>                                     
                                                <h6 className="font-medium text-slate-800 text-sm line-clamp-2 leading-snug flex-grow mb-3">{product.name}</h6>                                     
                                                
                                                <div className="mt-auto pt-2.5 flex flex-col gap-1.5 w-full border-t border-gray-200/50 shrink-0">                                         
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Stock</span>
                                                        <span className="bg-transparent text-slate-500 px-1.5 py-0.5 rounded font-bold text-[10px] border border-slate-300">{product.stock} left</span>                                     
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Price</span>
                                                        <p className="text-blue-600 font-bold text-sm leading-none m-0">₱{parseFloat(product.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>                                         
                                                    </div>
                                                </div>                                 
                                            </div>                             
                                        </div>                         
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Current Order (Right Side) */}
                <div className="w-full lg:w-5/12 mb-4 h-[50vh] lg:h-full flex flex-col">
                    <div className="glass-panel h-full flex flex-col p-0 overflow-hidden transition-colors">
                        
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-200/50 flex justify-between items-center shrink-0">
                            <h5 className="mb-0 font-bold text-slate-800 text-xl tracking-wide flex items-center">
                                <i className="bi bi-cart3 mr-3 text-blue-600 text-2xl"></i>Current Order
                            </h5>
                            <button onClick={() => setCart([])} className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-1.5 rounded-full font-bold text-xs transition-colors shadow-sm bg-transparent">
                                Void All
                            </button>
                        </div>

                        {/* Cart Table */}
                        <div className="flex-grow overflow-y-auto cart-container hide-scroll bg-transparent">
                            <table className="table-auto w-full text-left border-collapse mb-0">
                                <thead className="text-xs uppercase sticky top-0 z-10 bg-slate-50/50 backdrop-blur-md">
                                    <tr>
                                        <th className="pl-6 py-3 font-bold tracking-wider w-1/2 text-slate-500">Item</th>
                                        <th className="text-center py-3 font-bold tracking-wider w-1/4 text-slate-500">Qty</th>
                                        <th className="text-right pr-6 py-3 font-bold tracking-wider w-1/4 text-slate-500">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200/50">
                                    {cart.length > 0 ? (
                                        cart.map(item => (
                                            <tr key={item.id} className="hover:bg-slate-50/50">
                                                <td className="pl-6 py-3">
                                                    <div className="font-semibold text-sm text-slate-800 line-clamp-2">{item.name}</div>
                                                    <div className="text-xs text-slate-500">₱{parseFloat(item.price).toFixed(2)} / ea</div>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <div className="flex items-center justify-center bg-slate-100 rounded-lg p-1 border border-slate-200 w-24 mx-auto">
                                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-blue-600 rounded bg-transparent">
                                                            <i className="bi bi-dash"></i>
                                                        </button>
                                                        <input 
                                                            type="number" 
                                                            value={item.quantity}
                                                            readOnly
                                                            className="w-8 text-center bg-transparent border-0 font-bold text-sm cart-qty-input p-0 focus:ring-0 text-slate-800"
                                                        />
                                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-blue-600 rounded bg-transparent">
                                                            <i className="bi bi-plus"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="pr-6 py-3 text-right">
                                                    <div className="font-bold text-sm text-slate-800 mb-1">₱{item.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                                    <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:text-red-700 bg-transparent p-0 border-0">
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center py-10 text-slate-400">
                                                <i className="bi bi-cart-x text-4xl block mb-2 opacity-50"></i>
                                                Cart is empty
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Checkout Block */}
                        <div className="border-t border-gray-200/50 p-5 z-10 shrink-0 bg-white/40 backdrop-blur-md">
                            {/* Total Amount */}
                            <div className="flex justify-between items-center border border-gray-200 p-4 mb-4 rounded-2xl bg-white/60 shadow-sm">
                                <h5 className="text-slate-500 mb-0 font-bold tracking-wider text-xs uppercase">Total Due</h5>
                                <h2 className="font-black text-blue-600 text-2xl mb-0 tracking-tight">₱ {totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                            </div>

                            {/* Cash Tendered */}
                            <div className="mb-4">
                                <label className="block font-bold text-[10px] mb-2 tracking-wide uppercase text-slate-500">Cash Tendered</label>
                                <div className="relative form-control p-0 overflow-hidden flex focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 transition-all shadow-sm items-center bg-white/80 rounded-xl border border-slate-200">
                                    <span className="px-4 py-3 text-green-500 font-bold text-lg border-r border-slate-200">₱ </span>
                                    <input 
                                        type="number" 
                                        value={cashTendered}
                                        onChange={(e) => setCashTendered(e.target.value)}
                                        className="w-full py-3 pr-4 bg-transparent border-0 font-bold text-xl text-right text-green-600 focus:outline-none focus:ring-0" 
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            {/* Change */}
                            <div className="flex justify-between px-2 mb-4 items-center">
                                <h5 className="text-slate-500 mb-0 font-bold text-xs tracking-wider uppercase">Change</h5>
                                <h4 className={`font-bold text-lg mb-0 tracking-tight ${changeAmount < 0 ? 'text-red-500' : 'text-slate-800'}`}>
                                    ₱ {changeAmount < 0 ? '0.00' : changeAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </h4>
                            </div>

                            {/* Pay Button */}
                            <button 
                                onClick={handleCheckout}
                                disabled={cart.length === 0 || !cashTendered || parseFloat(cashTendered) < totalAmount}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 font-bold rounded-2xl text-base flex justify-center items-center transition-all shadow-md uppercase tracking-wide border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <i className="bi bi-printer mr-2"></i> PAY & PRINT
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Receipt Modal (Visible only when showReceipt is true or when printing) */}
            {showReceipt && receiptData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm print:bg-white print:backdrop-blur-none p-4">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full print:shadow-none print:w-[80mm] print:p-0">
                        {/* Receipt Content */}
                        <div className="receipt-content text-slate-800 font-mono text-sm" id="printable-receipt">
                            <div className="text-center mb-6">
                                <h2 className="font-bold text-2xl mb-1">GizmoCentral</h2>
                                <p className="text-xs text-slate-500">Point of Sales & Inventory System</p>
                                <div className="mt-4 text-left border-t border-b border-dashed border-slate-300 py-2">
                                    <p>Receipt #: {receiptData.id.toString().padStart(6, '0')}</p>
                                    <p>Date: {new Date(receiptData.created_at).toLocaleString()}</p>
                                    <p>Cashier: {receiptData.cashier}</p>
                                </div>
                            </div>

                            <table className="w-full text-left mb-4">
                                <thead>
                                    <tr className="border-b border-dashed border-slate-300">
                                        <th className="py-2">Item</th>
                                        <th className="text-center py-2">Qty</th>
                                        <th className="text-right py-2">Amt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {receiptData.items.map((item, index) => (
                                        <tr key={index}>
                                            <td className="py-2 truncate max-w-[120px]">{item.product ? item.product.name : 'Item'}</td>
                                            <td className="text-center py-2">{item.quantity}</td>
                                            <td className="text-right py-2">{parseFloat(item.subtotal).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="border-t border-dashed border-slate-300 pt-4 space-y-1">
                                <div className="flex justify-between font-bold text-base">
                                    <span>Total Due:</span>
                                    <span>₱{parseFloat(receiptData.total_amount).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Cash:</span>
                                    <span>₱{parseFloat(receiptData.cash).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Change:</span>
                                    <span>₱{parseFloat(receiptData.change_amount).toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="text-center mt-8 text-xs text-slate-500">
                                <p>Thank you for your purchase!</p>
                                <p>Please come again.</p>
                            </div>
                        </div>

                        {/* Modal Actions (Hidden on Print) */}
                        <div className="mt-8 flex gap-3 print:hidden">
                            <button 
                                onClick={handlePrint}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
                            >
                                <i className="bi bi-printer mr-2"></i> Print
                            </button>
                            <button 
                                onClick={() => setShowReceipt(false)}
                                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3 rounded-xl transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
