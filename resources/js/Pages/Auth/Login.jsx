import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex flex-col min-h-screen overflow-hidden bg-slate-900 selection:bg-blue-500 selection:text-white relative">
            {/* Premium Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/80 to-slate-900"></div>
            </div>
            
            <div className="relative z-10 flex flex-col min-h-screen">
                <Head title="Login | GizmoCentral" />

                {/* Main Content */}
                <div className="container mx-auto px-4 flex justify-center items-center flex-grow py-12">
                    <div className="w-full max-w-md animate-fade-in-up">
                        
                        {/* Logo Header */}
                        <div className="text-center mb-8">
                            <Link href="/" className="inline-block hover:scale-105 transition-transform duration-300">
                                <div className="bg-gradient-to-br flex items-center justify-center p-3 mx-auto mb-4">
                                    <img src="/assets/stamp.png" alt="Logo" className="w-full h-full object-contain filter brightness-0 invert" />
                                </div>
                            </Link>
                            <p className="mt-2 text-slate-300 font-medium">Welcome back! Please enter your details.</p>
                        </div>

                        {/* Glassmorphism Card */}
                        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-3xl overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
                            
                            <div className="p-8 relative z-10">
                                {status && (
                                    <div className="bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md text-emerald-400 text-sm font-bold p-4 rounded-xl mb-6 shadow-lg flex items-center gap-3">
                                        <i className="bi bi-check-circle-fill text-lg"></i>
                                        {status}
                                    </div>
                                )}

                                <form onSubmit={submit} className="space-y-6">
                                    <div>
                                        <label className="block text-slate-300 text-xs font-bold mb-2 tracking-wider uppercase">Email Address</label>
                                        <div className="relative group">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-blue-400 transition-colors">
                                                <i className="bi bi-envelope-fill"></i>
                                            </span>
                                            <input 
                                                type="email" 
                                                name="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/10 transition-all text-white placeholder-slate-500 shadow-inner" 
                                                placeholder="Enter your email" 
                                                required 
                                                autoComplete="username"
                                                autoFocus
                                            />
                                        </div>
                                        {errors.email && <p className="mt-2 text-sm text-red-400 font-medium flex items-center gap-1"><i className="bi bi-exclamation-circle"></i> {errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-slate-300 text-xs font-bold mb-2 tracking-wider uppercase">Password</label>
                                        <div className="relative group">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-blue-400 transition-colors">
                                                <i className="bi bi-key-fill"></i>
                                            </span>
                                            <input 
                                                type="password" 
                                                name="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/10 transition-all text-white placeholder-slate-500 shadow-inner" 
                                                placeholder="••••••••" 
                                                required 
                                                autoComplete="current-password"
                                            />
                                        </div>
                                        {errors.password && <p className="mt-2 text-sm text-red-400 font-medium flex items-center gap-1"><i className="bi bi-exclamation-circle"></i> {errors.password}</p>}
                                    </div>

                                    {/* Remember Me */}
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="remember"
                                                    checked={data.remember}
                                                    onChange={(e) => setData('remember', e.target.checked)}
                                                    className="peer sr-only"
                                                />
                                                <div className="w-5 h-5 border border-white/20 rounded bg-white/5 peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all flex items-center justify-center">
                                                    <i className="bi bi-check text-white opacity-0 peer-checked:opacity-100 transition-opacity"></i>
                                                </div>
                                            </div>
                                            <span className="ml-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
                                        </label>

                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors font-medium"
                                            >
                                                Forgot password?
                                            </Link>
                                        )}
                                    </div>

                                    <div className="pt-4">
                                        <button 
                                            type="submit" 
                                            disabled={processing}
                                            className="relative group overflow-hidden rounded-xl w-full"
                                        >
                                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 group-hover:scale-105 transition-transform duration-300"></span>
                                            <span className="relative text-sm font-bold text-white px-6 py-4 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                                                {processing ? (
                                                    <i className="bi bi-arrow-repeat animate-spin text-xl"></i>
                                                ) : (
                                                    'Log In'
                                                )}
                                            </span>
                                        </button>
                                    </div>

                                    <div className="text-center mt-6 pt-6 border-t border-white/10">
                                        <p className="text-slate-400 text-sm">
                                            Don't have an account?{' '}
                                            <Link href={route('register')} className="text-blue-400 hover:text-blue-300 font-bold transition-colors hover:underline">
                                                Sign up now
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
