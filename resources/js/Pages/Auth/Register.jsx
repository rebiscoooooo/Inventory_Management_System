import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex flex-col min-h-screen overflow-hidden bg-slate-900 selection:bg-emerald-500 selection:text-white relative">
            {/* Premium Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 -left-4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/80 to-slate-900"></div>
            </div>
            
            <div className="relative z-10 flex flex-col min-h-screen">
                <Head title="Register | GizmoCentral" />

                {/* Main Content */}
                <div className="container mx-auto px-4 flex justify-center items-center flex-grow py-12">
                    <div className="w-full max-w-md animate-fade-in-up">
                        
                        {/* Logo Header */}
                        <div className="text-center mb-8">
                            <Link href="/" className="inline-block hover:scale-105 transition-transform duration-300">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl shadow-emerald-500/30 p-3 border border-white/20 mx-auto mb-4">
                                    <img src="/assets/stamp.png" alt="Logo" className="w-full h-full object-contain filter brightness-0 invert" />
                                </div>
                                <h2 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200">
                                    Join GizmoCentral
                                </h2>
                            </Link>
                            <p className="mt-2 text-slate-400 font-medium">Create your account and start managing.</p>
                        </div>

                        {/* Glassmorphism Card */}
                        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-3xl overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
                            
                            <div className="p-8 relative z-10">
                                <form onSubmit={submit} className="space-y-6">
                                    <div>
                                        <label className="block text-slate-300 text-xs font-bold mb-2 tracking-wider uppercase">Full Name</label>
                                        <div className="relative group">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-emerald-400 transition-colors">
                                                <i className="bi bi-person-fill"></i>
                                            </span>
                                            <input 
                                                type="text" 
                                                name="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:bg-white/10 transition-all text-white placeholder-slate-500 shadow-inner" 
                                                placeholder="Enter your full name" 
                                                required 
                                                autoComplete="name"
                                                autoFocus
                                            />
                                        </div>
                                        {errors.name && <p className="mt-2 text-sm text-red-400 font-medium flex items-center gap-1"><i className="bi bi-exclamation-circle"></i> {errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-slate-300 text-xs font-bold mb-2 tracking-wider uppercase">Email Address</label>
                                        <div className="relative group">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-emerald-400 transition-colors">
                                                <i className="bi bi-envelope-fill"></i>
                                            </span>
                                            <input 
                                                type="email" 
                                                name="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:bg-white/10 transition-all text-white placeholder-slate-500 shadow-inner" 
                                                placeholder="Enter your email" 
                                                required 
                                                autoComplete="username"
                                            />
                                        </div>
                                        {errors.email && <p className="mt-2 text-sm text-red-400 font-medium flex items-center gap-1"><i className="bi bi-exclamation-circle"></i> {errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-slate-300 text-xs font-bold mb-2 tracking-wider uppercase">Password</label>
                                        <div className="relative group">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-emerald-400 transition-colors">
                                                <i className="bi bi-key-fill"></i>
                                            </span>
                                            <input 
                                                type="password" 
                                                name="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:bg-white/10 transition-all text-white placeholder-slate-500 shadow-inner" 
                                                placeholder="Create a password" 
                                                required 
                                                autoComplete="new-password"
                                            />
                                        </div>
                                        {errors.password && <p className="mt-2 text-sm text-red-400 font-medium flex items-center gap-1"><i className="bi bi-exclamation-circle"></i> {errors.password}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-slate-300 text-xs font-bold mb-2 tracking-wider uppercase">Confirm Password</label>
                                        <div className="relative group">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-emerald-400 transition-colors">
                                                <i className="bi bi-check-circle-fill"></i>
                                            </span>
                                            <input 
                                                type="password" 
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:bg-white/10 transition-all text-white placeholder-slate-500 shadow-inner" 
                                                placeholder="Confirm your password" 
                                                required 
                                                autoComplete="new-password"
                                            />
                                        </div>
                                        {errors.password_confirmation && <p className="mt-2 text-sm text-red-400 font-medium flex items-center gap-1"><i className="bi bi-exclamation-circle"></i> {errors.password_confirmation}</p>}
                                    </div>

                                    <div className="pt-4">
                                        <button 
                                            type="submit" 
                                            disabled={processing}
                                            className="relative group overflow-hidden rounded-xl w-full"
                                        >
                                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 group-hover:scale-105 transition-transform duration-300"></span>
                                            <span className="relative text-sm font-bold text-white px-6 py-4 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                                                {processing ? (
                                                    <i className="bi bi-arrow-repeat animate-spin text-xl"></i>
                                                ) : (
                                                    'Create Account'
                                                )}
                                            </span>
                                        </button>
                                    </div>

                                    <div className="text-center mt-6 pt-6 border-t border-white/10">
                                        <p className="text-slate-400 text-sm">
                                            Already have an account?{' '}
                                            <Link href={route('login')} className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors hover:underline">
                                                Sign in here
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in-up {
                        animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
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
        </div>
    );
}
