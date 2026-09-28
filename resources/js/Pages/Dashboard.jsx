import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard({ auth, stats, adminStats, chartData }) {
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold flex items-center gap-3 text-slate-800">
                        <i className="bi bi-person-badge text-blue-600"></i>Dashboard
                    </h2>
                    <span className="text-slate-500 font-medium">
                        <i className="bi bi-calendar3 mr-2"></i>
                        {today}
                    </span>
                </div>
            }
        >
            <Head title="Dashboard" />

            {/* Welcome Card */}
            <div className="dashboard-hero rounded-3xl p-8 mb-8 bg-white/85 border border-slate-200/80 shadow-[0_18px_45px_rgba(37,99,235,0.12)]">
                <div className="flex items-center">
                    <div className="mr-6">
                        <i className="bi bi-emoji-smile text-6xl text-amber-500"></i>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-slate-900">
                            Welcome back, {auth.user.first_name || auth.user.name}!
                        </h3>
                        <p className="mt-2 text-slate-500">
                            Have a great shift today. Here is your daily summary.
                        </p>
                    </div>
                </div>
            </div>

            {/* Statistics (Hidden for Admins) */}
            {!auth?.user?.roles?.includes('Admin') && (
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Sales */}
                    <div className="glass-panel p-6 flex items-center">
                        <div className="bg-green-100 rounded-2xl p-5 mr-5">
                            <i className="bi bi-wallet2 text-4xl text-green-600"></i>
                        </div>
                        <div>
                            <p className="uppercase text-sm tracking-wider text-slate-500 font-bold mb-1">
                                My Sales Today
                            </p>
                            <h2 className="text-4xl font-bold text-slate-900">
                                ₱{stats ? parseFloat(stats.today_sales || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
                            </h2>
                        </div>
                    </div>

                    {/* Customers */}
                    <div className="glass-panel p-6 flex items-center">
                        <div className="bg-blue-100 rounded-2xl p-5 mr-5">
                            <i className="bi bi-receipt text-4xl text-blue-600"></i>
                        </div>
                        <div>
                            <p className="uppercase text-sm tracking-wider text-slate-500 font-bold mb-1">
                                Customers Served
                            </p>
                            <h2 className="text-4xl font-bold text-slate-900">
                                {stats ? stats.today_transactions || 0 : 0}
                            </h2>
                        </div>
                    </div>
                </div>
            )}

            {/* Admin Analytics / Quick Actions Conditional Render */}
            {auth?.user?.roles?.includes('Admin') ? (
                <>
                    <h3 className="text-2xl font-bold mb-5 text-slate-800 flex items-center gap-2">
                        <i className="bi bi-bar-chart-line-fill text-purple-600"></i> System Analytics
                    </h3>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="glass-panel p-6 border-t-4 border-t-purple-500">
                            <p className="uppercase text-xs tracking-wider text-slate-500 font-bold mb-1">Total System Revenue</p>
                            <h2 className="text-3xl font-black text-slate-900">₱{parseFloat(adminStats.total_system_sales || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
                        </div>
                        <div className="glass-panel p-6 border-t-4 border-t-blue-500">
                            <p className="uppercase text-xs tracking-wider text-slate-500 font-bold mb-1">Total Inventory Items</p>
                            <h2 className="text-3xl font-black text-slate-900">{adminStats.total_inventory || 0} Units</h2>
                        </div>
                        <div className="glass-panel p-6 border-t-4 border-t-emerald-500">
                            <p className="uppercase text-xs tracking-wider text-slate-500 font-bold mb-1">Total Users</p>
                            <h2 className="text-3xl font-black text-slate-900">{adminStats.total_system_users || 0} Users</h2>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6 mb-8">
                        {/* 7-Day Sales Graph */}
                        <div className="lg:col-span-2 glass-panel p-6">
                            <h4 className="text-lg font-bold text-slate-800 mb-6">7-Day Sales Performance</h4>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₱${val}`} />
                                        <Tooltip 
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                                            formatter={(value) => [`₱${parseFloat(value).toLocaleString()}`, 'Sales']}
                                        />
                                        <Line type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={4} dot={{ r: 6, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Recent Transactions */}
                        <div className="glass-panel p-6">
                            <h4 className="text-lg font-bold text-slate-800 mb-6">Recent Transactions</h4>
                            <div className="space-y-4">
                                {adminStats.recent_transactions?.length > 0 ? adminStats.recent_transactions.map((tx) => (
                                    <div key={tx.id} className="flex justify-between items-center p-3 rounded-xl bg-slate-50/50 hover:bg-slate-100 transition-colors border border-slate-100">
                                        <div>
                                            <p className="font-bold text-slate-800">₱{parseFloat(tx.total_amount).toLocaleString()}</p>
                                            <p className="text-xs text-slate-500">By: {tx.cashier}</p>
                                        </div>
                                        <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-md">
                                            {new Date(tx.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </span>
                                    </div>
                                )) : (
                                    <p className="text-sm text-slate-500 text-center py-4">No recent transactions.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/* Quick Actions */}
                    <h3 className="text-2xl font-bold mb-5 text-slate-800 flex items-center gap-2">
                        <i className="bi bi-lightning-charge-fill text-amber-500"></i> Quick Actions
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* POS */}
                        <Link href={route('pos.index')} className="block group">
                            <div className="glass-panel p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(14,116,144,0.18)] hover:border-blue-500/50">
                                <i className="bi bi-calculator text-6xl text-blue-600 mb-4 block group-hover:scale-110 transition-transform"></i>
                                <h4 className="text-2xl font-bold text-slate-900">
                                    Open POS System
                                </h4>
                                <p className="mt-2 text-slate-500">
                                    Start processing customer orders
                                </p>
                            </div>
                        </Link>

                        {/* Profile */}
                        <Link href={route('profile.edit')} className="block group">
                            <div className="glass-panel p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(14,116,144,0.18)] hover:border-blue-500/50">
                                <i className="bi bi-person-gear text-6xl text-indigo-600 mb-4 block group-hover:scale-110 transition-transform"></i>
                                <h4 className="text-2xl font-bold text-slate-900">
                                    My Profile
                                </h4>
                                <p className="mt-2 text-slate-500">
                                    Update your account details
                                </p>
                            </div>
                        </Link>
                    </div>
                </>
            )}
        </AuthenticatedLayout>
    );
}
