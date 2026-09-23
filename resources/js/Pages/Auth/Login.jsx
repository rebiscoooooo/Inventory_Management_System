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
        <div className="flex flex-col min-h-screen font-['Roboto']">
            <Head title="Login - GizmoCentral" />

            {/* Header */}
            <header className="bg-[#0EB1D2]/90 backdrop-blur-md text-white py-4 shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-lg mb-0 tracking-wide">GizmoCentral</h4>
                        <p className="mb-0 text-xs opacity-80 font-light">Point of Sales & Inventory System</p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 flex justify-center items-center flex-grow py-12">
                <div className="w-full max-w-md bg-white/50 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl overflow-hidden">
                    
                    <div className="text-center pt-10 px-8 pb-6">
                        <div className="bg-[#0EB1D2]/20 text-[#0EB1D2] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                            <i className="fa-solid fa-user text-2xl"></i>
                        </div>
                        <h3 className="font-bold text-gray-900 text-3xl mb-2">Sign In</h3>
                        <p className="text-gray-500 text-sm">Enter your credentials to access the system</p>
                    </div>

                    <div className="p-8 pt-2">
                        {status && (
                            <div className="bg-emerald-100/80 backdrop-blur-sm text-emerald-700 border-l-4 border-emerald-500 text-sm font-bold p-4 rounded-r-lg mb-6 shadow-sm">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="block text-gray-600 text-xs font-bold mb-2 tracking-wider">EMAIL ADDRESS</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                                        <i className="fa-solid fa-envelope"></i>
                                    </span>
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EB1D2] focus:border-transparent bg-white/60 backdrop-blur-sm transition-all text-gray-700 shadow-inner" 
                                        placeholder="Enter email address" 
                                        required 
                                        autoComplete="username"
                                        autoFocus
                                    />
                                </div>
                                {errors.email && <p className="mt-2 text-sm text-red-600 font-medium">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-600 text-xs font-bold mb-2 tracking-wider">PASSWORD</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                                        <i className="fa-solid fa-key"></i>
                                    </span>
                                    <input 
                                        type="password" 
                                        name="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EB1D2] focus:border-transparent bg-white/60 backdrop-blur-sm transition-all text-gray-700 shadow-inner" 
                                        placeholder="Enter password" 
                                        required 
                                        autoComplete="current-password"
                                    />
                                </div>
                                {errors.password && <p className="mt-2 text-sm text-red-600 font-medium">{errors.password}</p>}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded border-gray-300 text-[#0EB1D2] shadow-sm focus:ring-[#0EB1D2]"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-[#0EB1D2] hover:text-[#0A8EA8] hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            <div className="pt-2">
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full bg-[#0EB1D2] hover:bg-[#0A8EA8] text-white font-bold rounded-xl py-3.5 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-75"
                                >
                                    Login to Dashboard
                                </button>
                            </div>

                            <div className="text-center mt-8 flex justify-center items-center space-x-3">
                                <Link href="/" className="text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors">
                                    <i className="fa-solid fa-arrow-left mr-1"></i> Menu
                                </Link>
                                <span className="text-gray-300">|</span>
                                <Link href={route('register')} className="text-[#0EB1D2] hover:text-[#0A8EA8] font-bold text-sm transition-colors">
                                    Create an Account
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
