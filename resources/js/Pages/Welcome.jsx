import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome | GizmoCentral" />
            <div className="flex flex-col items-center justify-center min-h-screen p-4 font-['Poppins']">
                <div className="container w-full max-w-5xl px-4 mt-12 mx-auto text-center">
                    <div className="mb-4">
                        <img 
                            src="/assets/stamp.png" 
                            alt="GizmoCentral Stamp" 
                            className="max-w-[400px] h-auto mx-auto scale-150" 
                        />
                    </div>

                    <div className="mb-12 mt-16">
                        <p className="text-gray-500 md:text-lg">Point of Sales & Inventory Management</p>
                    </div>

                    <div className="flex flex-col flex-wrap items-stretch justify-center gap-6 sm:flex-row">
                        {auth.user ? (
                            <div className="w-full sm:w-8/12 md:w-5/12 lg:w-1/3">
                                <Link
                                    href={route('dashboard')}
                                    className="block h-full p-10 transition-all duration-300 border shadow-xl bg-gradient-to-br from-white/60 via-blue-50/60 to-indigo-100/60 backdrop-blur-lg border-white/60 rounded-3xl text-gray-900 hover:scale-105 hover:from-blue-200/70 hover:via-blue-100/70 hover:to-indigo-200/70 hover:shadow-2xl"
                                >
                                    <div className="mb-6 text-5xl text-blue-600">
                                        <i className="fa-solid fa-chart-line"></i>
                                    </div>
                                    <h3 className="mb-2 text-2xl font-bold">Dashboard</h3>
                                    <p className="text-sm text-gray-700">Go to your dashboard.</p>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="w-full sm:w-8/12 md:w-5/12 lg:w-1/3">
                                    <Link
                                        href={route('login')}
                                        className="block h-full p-10 transition-all duration-300 border shadow-xl bg-gradient-to-br from-white/60 via-blue-50/60 to-indigo-100/60 backdrop-blur-lg border-white/60 rounded-3xl text-gray-900 hover:scale-105 hover:from-blue-200/70 hover:via-blue-100/70 hover:to-indigo-200/70 hover:shadow-2xl"
                                    >
                                        <div className="mb-6 text-5xl text-blue-600">
                                            <i className="fa-solid fa-right-to-bracket"></i>
                                        </div>
                                        <h3 className="mb-2 text-2xl font-bold">Sign In</h3>
                                        <p className="text-sm text-gray-700">Access your dashboard and POS.</p>
                                    </Link>
                                </div>

                                <div className="w-full sm:w-8/12 md:w-5/12 lg:w-1/3">
                                    <Link
                                        href={route('register')}
                                        className="block h-full p-10 transition-all duration-300 border shadow-xl bg-gradient-to-br from-white/60 via-blue-50/60 to-indigo-100/60 backdrop-blur-lg border-white/60 rounded-3xl text-gray-900 hover:scale-105 hover:from-blue-200/70 hover:via-blue-100/70 hover:to-indigo-200/70 hover:shadow-2xl"
                                    >
                                        <div className="mb-6 text-5xl text-emerald-500">
                                            <i className="fa-solid fa-user-plus"></i>
                                        </div>
                                        <h3 className="mb-2 text-2xl font-bold">Create Account</h3>
                                        <p className="text-sm text-gray-700">Register a new staff or client account.</p>
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
