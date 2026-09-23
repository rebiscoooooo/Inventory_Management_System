import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome | GizmoCentral" />
            <div className="relative flex flex-col min-h-screen overflow-hidden bg-slate-900 selection:bg-blue-500 selection:text-white">

                {/* Premium Animated Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900"></div>
                </div>

                {/* Navbar */}
                <nav className="relative z-10 w-full px-8 py-6 flex justify-between items-center bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 p-2 border border-white/20">
                            <img src="/assets/stamp.png" alt="Logo" className="w-full h-full object-contain filter brightness-0 invert" />
                        </div>
                        <h1 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                            GizmoCentral
                        </h1>
                    </div>
                    <div className="flex gap-5 items-center">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="text-sm font-bold text-white hover:text-blue-300 transition-colors">
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">
                                    Sign In
                                </Link>
                                <Link href={route('register')} className="relative group overflow-hidden rounded-xl">
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 group-hover:scale-105 transition-transform duration-300"></span>
                                    <span className="relative text-sm font-bold text-white px-6 py-2.5 flex items-center justify-center">
                                        Get Started
                                    </span>
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Hero Content */}
                <div className="relative z-10 flex-grow flex flex-col items-center justify-center p-6 text-center">

                    <div className="animate-fade-in-up flex flex-col items-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-2xl text-blue-300 text-xs font-bold tracking-widest uppercase">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            The Future of Retail
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-slate-400 mb-6 tracking-tighter leading-tight drop-shadow-2xl animate-fade-in-up delay-100">
                            Manage Smarter.<br />Sell Faster.
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-16 animate-fade-in-up delay-200 leading-relaxed">
                            Experience the most aesthetic, lightning-fast Point of Sales & Inventory Management system designed for modern businesses.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-8 w-full max-w-4xl justify-center px-4 animate-fade-in-up delay-300">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="group relative flex-1 flex flex-col items-center justify-center p-10 overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)]"
                            >
                                <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl border border-white/10 group-hover:bg-white/10 transition-colors z-0"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>

                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                                        <i className="fa-solid fa-chart-line text-4xl text-white"></i>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 text-white">Your Dashboard</h3>
                                    <p className="text-sm text-slate-400 font-medium text-center">Return to your workspace and manage your inventory.</p>
                                </div>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="group relative flex-1 flex flex-col items-center justify-center p-10 overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)]"
                                >
                                    <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl border border-white/10 group-hover:bg-white/10 transition-colors z-0"></div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>

                                    <div className="relative z-10 flex flex-col items-center">
                                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center shadow-xl shadow-black/20 mb-6 group-hover:scale-110 transition-transform duration-500 border border-slate-600">
                                            <i className="fa-solid fa-right-to-bracket text-4xl text-blue-400"></i>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2 text-white">Sign In</h3>
                                        <p className="text-sm text-slate-400 font-medium text-center">Access your account and manage your store.</p>
                                    </div>
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="group relative flex-1 flex flex-col items-center justify-center p-10 overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)]"
                                >
                                    <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl border border-white/10 group-hover:bg-white/10 transition-colors z-0"></div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>

                                    <div className="relative z-10 flex flex-col items-center">
                                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl shadow-emerald-500/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                                            <i className="fa-solid fa-user-plus text-4xl text-white"></i>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2 text-white">Create Account</h3>
                                        <p className="text-sm text-slate-400 font-medium text-center">Join the future of retail management today.</p>
                                    </div>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 w-full text-center py-8 border-t border-white/10 bg-slate-900/50 backdrop-blur-lg">
                    <p className="text-slate-500 text-sm font-medium">
                        &copy; {new Date().getFullYear()} GizmoCentral.
                    </p>
                </div>

                {/* Custom animations block */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in-up {
                        animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                        opacity: 0;
                    }
                    .delay-100 { animation-delay: 0.15s; }
                    .delay-200 { animation-delay: 0.3s; }
                    .delay-300 { animation-delay: 0.45s; }
                    
                    @keyframes blob {
                        0% { transform: translate(0px, 0px) scale(1); }
                        33% { transform: translate(30px, -50px) scale(1.1); }
                        66% { transform: translate(-20px, 20px) scale(0.9); }
                        100% { transform: translate(0px, 0px) scale(1); }
                    }
                    .animate-blob {
                        animation: blob 7s infinite;
                    }
                    .animation-delay-2000 {
                        animation-delay: 2s;
                    }
                    .animation-delay-4000 {
                        animation-delay: 4s;
                    }
                `}} />
            </div>
        </>
    );
}
