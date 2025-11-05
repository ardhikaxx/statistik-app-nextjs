'use client';
import Sidebar from '@/app/components/sidebar';
import produkData from '../../data/data_produk.json';
import Header from '@/app/components/header';

export default function Products() {
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

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-100">
            <div className="flex">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 overflow-auto">
                        <div className="p-6 space-y-6">
                            {/* Page Header */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
                                    <p className="text-gray-600">Kelola produk kecantikan BeautyCare</p>
                                </div>
                                <button className="mt-4 sm:mt-0 bg-linear-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-200 transform hover:-translate-y-0.5">
                                    Add New Product
                                </button>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600">Total Products</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-2">{produkData.length}</h3>
                                        </div>
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600">Total Revenue</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-2">{formatCurrency(totalRevenue)}</h3>
                                        </div>
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 6l-2.5 1.5M12 14l2.5 1.5M12 14v1m0-1v-1m-6.5-1.5L12 13m-6.5 1.5L12 16m0 5a9 9 0 110-18 9 9 0 010 18z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600">Total Sales</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-2">
                                                {produkData.reduce((total, product) => total + product.sales, 0).toLocaleString()}
                                            </h3>
                                        </div>
                                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600">Avg. Rating</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-2">
                                                {(produkData.reduce((total, product) => total + product.rating, 0) / produkData.length).toFixed(1)}
                                            </h3>
                                        </div>
                                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
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
                                            {/* Product Image Placeholder */}
                                            <div className="h-48 bg-linear-to-br from-indigo-100 to-purple-100 relative">
                                                <div className="absolute top-4 right-4">
                                                    <span className={getCategoryBadge(product.category)}>
                                                        {product.category}
                                                    </span>
                                                </div>
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
                                                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                        <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                                                    </div>
                                                </div>

                                                <p className="text-2xl font-bold text-gray-900 mb-4">{formatCurrency(product.price)}</p>

                                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                                                    <div className="flex items-center space-x-2">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                        </svg>
                                                        <span>{product.sales} sold</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                                        </svg>
                                                        <span>{product.stock} in stock</span>
                                                    </div>
                                                </div>

                                                <div className="flex space-x-3">
                                                    <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                                                        Edit
                                                    </button>
                                                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
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