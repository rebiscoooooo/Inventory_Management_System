import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function Authenticated({ header, children }) {
    const user = usePage().props.auth.user;
    const flash = usePage().props.flash || {};
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    useEffect(() => {
        const Toast = MySwal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        if (flash.success) {
            Toast.fire({
                icon: 'success',
                title: flash.success
            });
        }
        if (flash.error) {
            Toast.fire({
                icon: 'error',
                title: flash.error
            });
        }
    }, [flash]);

    return (
        <div className="flex bg-transparent min-h-screen">
            {/* Mobile Toggle */}
            <button
                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                className="fixed top-4 left-4 md:hidden z-50 bg-white rounded-full shadow-lg p-2 print:hidden"
            >
                <i className="bi bi-list text-2xl text-gray-700"></i>
            </button>

            {/* Sidebar */}
            <aside 
                className={`fixed md:sticky top-0 left-0 z-40 w-72 min-h-screen bg-white/40 backdrop-blur-2xl border-r border-white/50 shadow-[0_18px_45px_rgba(15,23,42,0.05)] p-5 flex flex-col transition-transform duration-300 print:hidden ${
                    showingNavigationDropdown ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}
            >
                {/* Logo */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <img
                            src="/assets/stamp.png"
                            alt="Logo"
                            className="w-10 h-10 object-contain mr-3"
                        />
                        <h4 className="font-bold text-xl text-slate-800">
                            GizmoCentral
                        </h4>
                    </div>
                </div>

                {/* User Info Glass Panel */}
                <div className="glass-panel text-center p-3 mb-5">
                    <i className="bi bi-person-circle text-5xl text-blue-600"></i>
                    <p className="mt-2 font-semibold text-slate-800">
                        {user.name}
                    </p>
                </div>

                <hr className="mb-4 border-slate-200" />

                {/* Navigation Links */}
                <nav className="flex-1 flex flex-col gap-1">
                    {user.role === 'admin' ? (
                        <>
                            <p className="uppercase font-bold text-xs mb-2 text-slate-500 tracking-wider">
                                Admin Controls
                            </p>
                            <Link href={route('dashboard')} className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${route().current('dashboard') ? 'bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/30' : 'text-slate-700 hover:bg-slate-100'}`}>
                                <i className="bi bi-speedometer2 text-lg mr-3"></i>
                                Dashboard
                            </Link>
                            <Link href={route('products.index')} className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${route().current('products.*') ? 'bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/30' : 'text-slate-700 hover:bg-slate-100'}`}>
                                <i className="bi bi-box-seam text-lg mr-3"></i>
                                Manage Inventory
                            </Link>
                            <Link href={route('sales.index')} className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${route().current('sales.*') ? 'bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/30' : 'text-slate-700 hover:bg-slate-100'}`}>
                                <i className="bi bi-graph-up-arrow text-lg mr-3"></i>
                                Sales Reports
                            </Link>
                            <Link href={route('staff.index')} className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${route().current('staff.*') ? 'bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/30' : 'text-slate-700 hover:bg-slate-100'}`}>
                                <i className="bi bi-people text-lg mr-3"></i>
                                Manage Staff
                            </Link>
                            <hr className="my-4 border-slate-200" />
                        </>
                    ) : (
                        <>
                            <p className="uppercase font-bold text-xs mb-2 text-slate-500 tracking-wider">
                                Staff Controls
                            </p>
                            <Link href={route('dashboard')} className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${route().current('dashboard') ? 'bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/30' : 'text-slate-700 hover:bg-slate-100'}`}>
                                <i className="bi bi-speedometer2 text-lg mr-3"></i>
                                Dashboard
                            </Link>
                            <hr className="my-4 border-slate-200" />
                        </>
                    )}

                    <p className="uppercase font-bold text-xs mb-2 text-slate-500 tracking-wider">
                        POS Controls
                    </p>
                    <Link href={route('pos.index')} className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${route().current('pos.*') ? 'bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/30' : 'text-slate-700 hover:bg-slate-100'}`}>
                        <i className="bi bi-calculator text-lg mr-3"></i>
                        POS System
                    </Link>
                    <Link href={route('profile.edit')} className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${route().current('profile.*') ? 'bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/30' : 'text-slate-700 hover:bg-slate-100'}`}>
                        <i className="bi bi-person-gear text-lg mr-3"></i>
                        My Profile
                    </Link>
                </nav>

                <div className="mt-auto">
                    <hr className="my-4 border-slate-200" />
                    <Link href={route('logout')} method="post" as="button" className="w-full flex items-center px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <i className="bi bi-box-arrow-right text-lg mr-3"></i>
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {showingNavigationDropdown && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setShowingNavigationDropdown(false)}
                />
            )}

            {/* Main Content Area */}
            <main className="flex-1 min-h-screen p-4 md:p-8 overflow-y-auto print:p-0 print:m-0 print:overflow-visible">
                {header && (
                    <div className="mb-8 mt-12 md:mt-4 print:hidden">
                        {header}
                    </div>
                )}
                {children}
            </main>
        </div>
    );
}
