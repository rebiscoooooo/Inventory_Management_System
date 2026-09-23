import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome | GizmoCentral" />
            <div className="relative flex flex-col min-h-screen font-['Poppins'] overflow-hidden">
                
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-blue-900/80 backdrop-blur-sm z-0"></div>

                {/* Navbar */}
                <nav className="relative z-10 w-full px-6 py-4 flex justify-between items-center bg-white/10 backdrop-blur-md border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <img src="/assets/stamp.png" alt="Logo" className="w-10 h-10 object-contain drop-shadow-md" />
                        <h1 className="text-xl font-bold text-white tracking-wider">GizmoCentral</h1>
                    </div>
                    <div className="flex gap-4">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="text-sm font-semibold text-white hover:text-blue-200 transition-colors">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-sm font-semibold text-white hover:text-blue-200 transition-colors">
                                    Sign In
                                </Link>
                                <Link href={route('register')} className="text-sm font-semibold bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-full shadow-lg transition-all">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Hero Content */}
                <div className="relative z-10 flex-grow flex flex-col items-center justify-center p-6 text-center">
                    
                    <div className="animate-fade-in-up">
                        <img 
                            src="/assets/stamp.png" 
                            alt="GizmoCentral Stamp" 
                            className="w-32 h-32 md:w-48 md:h-48 mx-auto drop-shadow-[0_20px_50px_rgba(14,177,210,0.5)] mb-8 hover:scale-105 transition-transform duration-500" 
                        />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-sky-300 drop-shadow-sm mb-4 tracking-tight animate-fade-in-up delay-100">
                        GizmoCentral
                    </h1>
                    <p className="text-lg md:text-2xl text-blue-100/90 font-light max-w-2xl mx-auto mb-12 animate-fade-in-up delay-200">
                        The ultimate Point of Sales & Inventory Management system for modern businesses.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 w-full max-w-3xl justify-center px-4 animate-fade-in-up delay-300">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="group flex-1 flex flex-col items-center justify-center p-8 transition-all duration-300 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl text-white hover:-translate-y-2 hover:bg-white/20 hover:border-white/40 hover:shadow-[0_20px_50px_rgba(14,177,210,0.3)]"
                            >
                                <i className="fa-solid fa-chart-line text-5xl mb-4 text-[#0EB1D2] group-hover:scale-110 transition-transform"></i>
                                <h3 className="text-2xl font-bold mb-1">Open Dashboard</h3>
                                <p className="text-sm text-blue-100/70 font-light">Continue where you left off</p>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="group flex-1 flex flex-col items-center justify-center p-8 transition-all duration-300 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl text-white hover:-translate-y-2 hover:bg-white/20 hover:border-white/40 hover:shadow-[0_20px_50px_rgba(14,177,210,0.3)]"
                                >
                                    <i className="fa-solid fa-right-to-bracket text-5xl mb-4 text-[#0EB1D2] group-hover:scale-110 transition-transform"></i>
                                    <h3 className="text-2xl font-bold mb-1">Sign In</h3>
                                    <p className="text-sm text-blue-100/70 font-light">Access your workspace</p>
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="group flex-1 flex flex-col items-center justify-center p-8 transition-all duration-300 bg-emerald-500/10 backdrop-blur-xl border border-emerald-400/20 shadow-2xl rounded-3xl text-white hover:-translate-y-2 hover:bg-emerald-500/20 hover:border-emerald-400/40 hover:shadow-[0_20px_50px_rgba(16,185,129,0.3)]"
                                >
                                    <i className="fa-solid fa-user-plus text-5xl mb-4 text-emerald-400 group-hover:scale-110 transition-transform"></i>
                                    <h3 className="text-2xl font-bold mb-1">Create Account</h3>
                                    <p className="text-sm text-emerald-100/70 font-light">Join the platform</p>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 w-full text-center py-6 text-white/50 text-sm">
                    &copy; {new Date().getFullYear()} GizmoCentral. All rights reserved.
                </div>
                
                {/* Custom animations block */}
                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in-up {
                        animation: fadeInUp 0.8s ease-out forwards;
                        opacity: 0;
                    }
                    .delay-100 { animation-delay: 0.1s; }
                    .delay-200 { animation-delay: 0.2s; }
                    .delay-300 { animation-delay: 0.3s; }
                `}} />
            </div>
        </>
    );
}
