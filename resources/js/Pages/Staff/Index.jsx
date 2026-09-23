import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function StaffIndex({ staff }) {
    const authUser = usePage().props.auth.user;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        role: 'staff',
        status: 'active',
    });

    const openModal = (member = null) => {
        if (member) {
            setEditingStaff(member);
            setData({
                name: member.name,
                username: member.username || '',
                email: member.email,
                password: '',
                role: member.role || 'staff',
                status: member.status || 'active',
            });
        } else {
            setEditingStaff(null);
            reset();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingStaff) {
            put(route('staff.update', editingStaff.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('staff.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (id === authUser.id) {
            MySwal.fire({ icon: 'error', title: 'Action Denied', text: 'You cannot delete your own account.' });
            return;
        }
        MySwal.fire({
            title: 'Are you sure?',
            text: "This staff member will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#94a3b8',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('staff.destroy', id));
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold leading-tight text-gray-800">
                        Staff Management
                    </h2>
                    <button
                        onClick={() => openModal()}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors font-medium flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Add Staff Member
                    </button>
                </div>
            }
        >
            <Head title="Staff Management" />

            <div className="glass-panel overflow-hidden border border-white/40 shadow-2xl rounded-3xl p-1 mb-8">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/20">
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/20 backdrop-blur-md first:rounded-tl-2xl">User</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/20 backdrop-blur-md">Role</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/20 backdrop-blur-md">Status</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/20 backdrop-blur-md">Joined</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/20 backdrop-blur-md text-right last:rounded-tr-2xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/20 bg-white/30 backdrop-blur-sm">
                            {staff.data && staff.data.length > 0 ? (
                                staff.data.map((member) => (
                                    <tr key={member.id} className="hover:bg-white/60 transition-colors duration-300 group">
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-blue-50 flex items-center justify-center text-indigo-600 font-black text-xl shadow-sm border border-white/50">
                                                    {member.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-800 flex items-center gap-2">
                                                        {member.name}
                                                        {member.id === authUser.id && (
                                                            <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-blue-500 px-2 py-0.5 rounded-full shadow-sm">You</span>
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-slate-500 font-medium mt-0.5">{member.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <span className={`px-3 py-1 bg-white/50 border border-white/50 rounded-full text-xs font-bold shadow-sm inline-flex items-center gap-1.5 capitalize ${member.role === 'admin' ? 'text-purple-600' : 'text-slate-600'}`}>
                                                <i className={`bi ${member.role === 'admin' ? 'bi-shield-lock-fill' : 'bi-person-badge'}`}></i>
                                                {member.role || 'Staff'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <div className={`px-3 py-1 inline-flex items-center gap-2 rounded-full text-xs font-bold border shadow-sm ${
                                                (!member.status || member.status === 'active') 
                                                    ? 'bg-emerald-100/80 border-emerald-200 text-emerald-700' 
                                                    : 'bg-red-100/80 border-red-200 text-red-700'
                                            }`}>
                                                <div className={`w-2 h-2 rounded-full ${(!member.status || member.status === 'active') ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                                {member.status || 'Active'}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap text-sm text-slate-500 font-medium">
                                            {new Date(member.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap text-right text-sm">
                                            <button onClick={() => openModal(member)} className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-white/50 text-blue-600 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-md transition-all mr-2">
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            {member.id !== authUser.id && (
                                                <button onClick={() => handleDelete(member.id)} className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-white/50 text-red-500 hover:bg-red-500 hover:text-white shadow-sm hover:shadow-md transition-all">
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-16 text-center text-slate-500">
                                        <div className="mb-3 text-4xl text-slate-300"><i className="bi bi-people"></i></div>
                                        <p className="font-medium text-lg">No staff members found</p>
                                        <p className="text-sm">Click "Add Staff Member" to get started.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                {staff.links && (
                    <div className="px-8 py-5 bg-white/20 border-t border-white/20 flex justify-between items-center rounded-b-3xl backdrop-blur-md">
                        <div className="text-sm font-semibold text-slate-600">
                            Showing {staff.from} to {staff.to} of {staff.total} staff members
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom glass-panel backdrop-blur-xl border border-white/20 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-0">
                            <form onSubmit={submit}>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                                        <i className={`bi ${editingStaff ? 'bi-person-gear' : 'bi-person-plus'} mr-3 text-blue-600`}></i>
                                        {editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
                                    </h3>
                                    
                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                                            <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full bg-white/70 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm" required />
                                            {errors.name && <p className="mt-1 text-sm text-red-500 font-medium">{errors.name}</p>}
                                        </div>

                                        <div className="grid grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Username</label>
                                                <input type="text" value={data.username} onChange={e => setData('username', e.target.value)} className="w-full bg-white/70 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm" required />
                                                {errors.username && <p className="mt-1 text-sm text-red-500 font-medium">{errors.username}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                                                <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full bg-white/70 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm" required />
                                                {errors.email && <p className="mt-1 text-sm text-red-500 font-medium">{errors.email}</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                                Password {editingStaff && <span className="normal-case font-normal">(Leave blank to keep current)</span>}
                                            </label>
                                            <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} className="w-full bg-white/70 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm" {...(!editingStaff && { required: true })} />
                                            {errors.password && <p className="mt-1 text-sm text-red-500 font-medium">{errors.password}</p>}
                                        </div>

                                        <div className="grid grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Role</label>
                                                <select value={data.role} onChange={e => setData('role', e.target.value)} className="w-full bg-white/70 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm">
                                                    <option value="staff">Staff</option>
                                                    <option value="admin">Administrator</option>
                                                </select>
                                                {errors.role && <p className="mt-1 text-sm text-red-500 font-medium">{errors.role}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Status</label>
                                                <select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full bg-white/70 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm">
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                                {errors.status && <p className="mt-1 text-sm text-red-500 font-medium">{errors.status}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/40 border-t border-white/20 px-6 py-4 flex justify-end gap-3 rounded-b-2xl">
                                    <button type="button" onClick={closeModal} className="px-6 py-2.5 rounded-xl font-bold bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors shadow-sm border border-slate-200">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={processing} className="px-6 py-2.5 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50">
                                        {processing ? 'Saving...' : (editingStaff ? 'Update Staff' : 'Add Staff')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
