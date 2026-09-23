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

            <div className="glass-panel overflow-hidden sm:rounded-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200/50">
                        <thead className="bg-slate-50/50 backdrop-blur-md">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/50">
                            {staff.data && staff.data.length > 0 ? (
                                staff.data.map((member) => (
                                    <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                                                        {member.name.charAt(0).toUpperCase()}
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{member.name} {member.id === authUser.id && <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full ml-1">(You)</span>}</div>
                                                    <div className="text-sm text-gray-500">{member.email}</div>
                                                    <div className="text-xs text-gray-400 mt-0.5">@{member.username || member.name.toLowerCase().replace(' ', '')}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                            {member.role || 'Staff'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${(!member.status || member.status === 'active') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {member.status || 'Active'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(member.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => openModal(member)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                            {member.id !== authUser.id && (
                                                <button onClick={() => handleDelete(member.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        No staff members found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                {staff.links && (
                    <div className="px-6 py-4 border-t border-gray-200">
                        <div className="text-sm text-gray-500">
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
