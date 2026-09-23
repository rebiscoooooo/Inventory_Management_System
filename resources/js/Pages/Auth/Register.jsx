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
        <div className="flex flex-col min-h-screen font-['Roboto']">
            <Head title="Register - GizmoCentral" />

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
                        <div className="bg-emerald-500/20 text-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                            <i className="fa-solid fa-user-plus text-2xl"></i>
                        </div>
                        <h3 className="font-bold text-gray-900 text-3xl mb-2">Create Account</h3>
                        <p className="text-gray-500 text-sm">Register as a new user in the system</p>
                    </div>

                    <div className="p-8 pt-2">
                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="block text-gray-600 text-xs font-bold mb-2 tracking-wider">FULL NAME</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                                        <i className="fa-solid fa-user"></i>
                                    </span>
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/60 backdrop-blur-sm transition-all text-gray-700 shadow-inner" 
                                        placeholder="Enter your full name" 
                                        required 
                                        autoComplete="name"
                                        autoFocus
                                    />
                                </div>
                                {errors.name && <p className="mt-2 text-sm text-red-600 font-medium">{errors.name}</p>}
                            </div>

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
                                        className="w-full pl-11 pr-4 py-3 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/60 backdrop-blur-sm transition-all text-gray-700 shadow-inner" 
                                        placeholder="Enter email address" 
                                        required 
                                        autoComplete="username"
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
                                        className="w-full pl-11 pr-4 py-3 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/60 backdrop-blur-sm transition-all text-gray-700 shadow-inner" 
                                        placeholder="Create a password" 
                                        required 
                                        autoComplete="new-password"
                                    />
                                </div>
                                {errors.password && <p className="mt-2 text-sm text-red-600 font-medium">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-600 text-xs font-bold mb-2 tracking-wider">CONFIRM PASSWORD</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                                        <i className="fa-solid fa-check"></i>
                                    </span>
                                    <input 
                                        type="password" 
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/60 backdrop-blur-sm transition-all text-gray-700 shadow-inner" 
                                        placeholder="Confirm your password" 
                                        required 
                                        autoComplete="new-password"
                                    />
                                </div>
                                {errors.password_confirmation && <p className="mt-2 text-sm text-red-600 font-medium">{errors.password_confirmation}</p>}
                            </div>

                            <div className="pt-2">
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl py-3.5 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-75"
                                >
                                    Register Account
                                </button>
                            </div>

                            <div className="text-center mt-8 flex justify-center items-center space-x-3">
                                <Link href="/" className="text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors">
                                    <i className="fa-solid fa-arrow-left mr-1"></i> Menu
                                </Link>
                                <span className="text-gray-300">|</span>
                                <Link href={route('login')} className="text-emerald-500 hover:text-emerald-600 font-bold text-sm transition-colors">
                                    Already have an account? Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
