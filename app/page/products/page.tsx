'use client';
import Sidebar from '@/app/components/sidebar';
import produkData from '../../data/data_produk.json';
import Header from '@/app/components/header';
import { useEffect, useState } from 'react';

// Import Lucide Icons
import {
    Package,
    DollarSign,
    ShoppingCart,
    Star,
    Plus,
    Edit,
    Eye,
    TrendingUp,
    PackageOpen,
    Image,
    ShoppingBag,
    Archive
} from 'lucide-react';

export default function Products() {
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

    const getCategoryBadge = (category: string) => {
        const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
        if (category === 'Skincare') {
            return `${baseClasses} bg-blue-100 text-blue-800`;
        } else {
            return `${baseClasses} bg-pink-100 text-pink-800`;
        }
    };

    const getStockStatus = (stock: number) => {
        if (stock > 50) return { text: 'In Stock', class: 'text-green-600 bg-green-100' };
        if (stock > 20) return { text: 'Low Stock', class: 'text-yellow-600 bg-yellow-100' };
        return { text: 'Out of Stock', class: 'text-red-600 bg-red-100' };
    };

    const totalRevenue = produkData.reduce((total, product) => total + (product.price * product.sales), 0);
    const totalSales = produkData.reduce((total, product) => total + product.sales, 0);
    const averageRating = (produkData.reduce((total, product) => total + product.rating, 0) / produkData.length).toFixed(1);

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
                            {/* Page Header */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
                                    <p className="text-gray-600">Kelola produk kecantikan BeautyCare</p>
                                </div>
                                <button className="mt-4 sm:mt-0 bg-linear-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2">
                                    <Plus className="w-5 h-5" />
                                    Add New Product
                                </button>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600">Total Products</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-2">{produkData.length.toLocaleString()}</h3>
                                            <p className="text-sm text-blue-600 mt-1">
                                                {produkData.filter(p => p.stock > 0).length} available
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <Package className="w-6 h-6 text-blue-600" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600">Total Revenue</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-2">{formatCurrency(totalRevenue)}</h3>
                                            <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                                                <TrendingUp className="w-3 h-3" />
                                                +15.2% growth
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                            <DollarSign className="w-6 h-6 text-green-600" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600">Total Sales</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-2">
                                                {totalSales.toLocaleString()}
                                            </h3>
                                            <p className="text-sm text-purple-600 mt-1">
                                                Avg. {(totalSales / produkData.length).toFixed(0)} per product
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
                                            <p className="text-gray-600">Avg. Rating</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-2">
                                                {averageRating}
                                            </h3>
                                            <p className="text-sm text-yellow-600 mt-1 flex items-center gap-1">
                                                <Star className="w-3 h-3 fill-yellow-400" />
                                                {produkData.filter(p => p.rating >= 4).length} highly rated
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                            <Star className="w-6 h-6 text-yellow-600 fill-yellow-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Products Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {produkData.map((product) => {
                                    const stockStatus = getStockStatus(product.stock);
                                    return (
                                        <div key={product.id} className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                            {/* Product Image Section */}
                                            <div className="h-48 bg-linear-to-br from-indigo-100 to-purple-100 relative flex items-center justify-center">
                                                {/* Image Icon */}
                                                <div className="flex flex-col items-center justify-center text-indigo-400">
                                                    <Image className="w-12 h-12 mb-2" />
                                                    <span className="text-sm font-medium">Product Image</span>
                                                </div>
                                                
                                                {/* Category Badge */}
                                                <div className="absolute top-4 right-4">
                                                    <span className={getCategoryBadge(product.category)}>
                                                        {product.category}
                                                    </span>
                                                </div>
                                                
                                                {/* Stock Status */}
                                                <div className="absolute bottom-4 left-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${stockStatus.class}`}>
                                                        {stockStatus.text}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Product Info */}
                                            <div className="p-6">
                                                <div className="flex justify-between items-start mb-3">
                                                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                                    <div className="flex items-center space-x-1">
                                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                        <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                                                    </div>
                                                </div>

                                                <p className="text-2xl font-bold text-gray-900 mb-4">{formatCurrency(product.price)}</p>

                                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                                                    <div className="flex items-center space-x-2">
                                                        <ShoppingBag className="w-4 h-4" />
                                                        <span>{product.sales.toLocaleString()} sold</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <PackageOpen className="w-4 h-4" />
                                                        <span>{product.stock.toLocaleString()} in stock</span>
                                                    </div>
                                                </div>

                                                <div className="flex space-x-3">
                                                    <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                                                        <Edit className="w-4 h-4" />
                                                        Edit
                                                    </button>
                                                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                                        <Eye className="w-4 h-4" />
                                                        View
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}