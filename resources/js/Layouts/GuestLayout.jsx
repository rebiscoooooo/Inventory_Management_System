import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat font-['Poppins']">
            {/* Dark overlay for better contrast */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-0"></div>
            
            <div className="z-10 text-center mb-8">
                <Link href="/" className="flex flex-col items-center gap-3 group">
                    <img
                        src="/assets/stamp.png"
                        alt="GizmoCentral Logo"
                        className="h-24 w-24 object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-300"
                    />
                    <h1 className="text-4xl font-bold text-white tracking-wider drop-shadow-lg">
                        GizmoCentral
                    </h1>
                </Link>
            </div>

            <div className="z-10 w-full overflow-hidden mt-2 px-8 py-10 shadow-[0_30px_60px_rgba(0,0,0,0.3)] sm:max-w-md sm:rounded-3xl glass-panel border border-white/20 bg-white/10 backdrop-blur-xl">
                {children}
            </div>
        </div>
    );
}
