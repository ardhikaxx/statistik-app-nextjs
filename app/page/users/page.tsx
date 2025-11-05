'use client';
import Header from '@/app/components/header';
import userData from '../../data/data_user.json';
import Sidebar from '@/app/components/sidebar';
import { useEffect, useState } from 'react';
import {
    User,
    UserCheck,
    ShoppingCart,
    DollarSign,
    Plus,
    Edit,
    Trash2,
    Phone,
    Calendar,
    Mail
} from 'lucide-react';

export default function Users() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusBadge = (status: string) => {
        const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
        if (status === 'active') {
            return `${baseClasses} bg-green-100 text-green-800`;
        } else {
            return `${baseClasses} bg-red-100 text-red-800`;
        }
    };

    const totalUsers = userData.length;
    const activeUsers = userData.filter(user => user.status === 'active').length;
    const totalOrders = userData.reduce((total, user) => total + user.totalOrders, 0);
    const totalRevenue = userData.reduce((total, user) => total + user.totalSpent, 0);

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-100">
            <div className="flex h-screen">
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    onToggleSidebar={toggleSidebar}
                />
                <div className="flex-1 flex flex-col min-w-0">
                    <Header onToggleSidebar={toggleSidebar} />
                    <main className="flex-1 overflow-auto">
                        <div className="p-6 space-y-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                                    <p className="text-gray-600">Kelola data pengguna BeautyCare</p>
                                </div>
                                <button className="mt-4 sm:mt-0 bg-linear-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2">
                                    <Plus className="w-5 h-5" />
                                    Add New User
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600">Total Users</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-2">{totalUsers.toLocaleString()}</h3>
                                        </div>
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <User className="w-6 h-6 text-blue-600" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600">Active Users</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-2">
                                                {activeUsers.toLocaleString()}
                                            </h3>
                                            <p className="text-sm text-green-600 mt-1">
                                                {((activeUsers / totalUsers) * 100).toFixed(1)}% active rate
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                            <UserCheck className="w-6 h-6 text-green-600" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600">Total Orders</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-2">
                                                {totalOrders.toLocaleString()}
                                            </h3>
                                            <p className="text-sm text-purple-600 mt-1">
                                                Avg. {(totalOrders / totalUsers).toFixed(1)} per user
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                            <ShoppingCart className="w-6 h-6 text-purple-600" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600">Total Revenue</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-2">
                                                {formatCurrency(totalRevenue)}
                                            </h3>
                                            <p className="text-sm text-indigo-600 mt-1">
                                                Avg. {formatCurrency(totalRevenue / totalUsers)} per user
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                                            <DollarSign className="w-6 h-6 text-indigo-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-lg overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200/50">
                                    <div className="flex items-center gap-2">
                                        <User className="w-5 h-5 text-gray-700" />
                                        <h3 className="text-lg font-semibold text-gray-900">User List</h3>
                                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                                            {totalUsers} users
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-50/50 border-b border-gray-200/50">
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200/50">
                                            {userData.map((user) => (
                                                <tr key={user.id} className="hover:bg-gray-50/30 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                                                {user.name.charAt(0)}
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                                                    <Mail className="w-3 h-3" />
                                                                    {user.email}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900 flex items-center gap-1">
                                                            <Phone className="w-3 h-3" />
                                                            {user.phone}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900 flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {formatDate(user.joinDate)}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900 font-medium">
                                                            {user.totalOrders}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {formatCurrency(user.totalSpent)}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={getStatusBadge(user.status)}>
                                                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex items-center gap-2">
                                                            <button className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1 transition-colors">
                                                                <Edit className="w-4 h-4" />
                                                                Edit
                                                            </button>
                                                            <button className="text-red-600 hover:text-red-900 flex items-center gap-1 transition-colors">
                                                                <Trash2 className="w-4 h-4" />
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}