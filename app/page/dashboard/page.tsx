'use client';
import { useRef } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import salesData from '../../data/data_sales.json';
import penjualanData from '../../data/data_penjualan.json';
import produkData from '../../data/data_produk.json';
import userData from '../../data/data_user.json';
import Sidebar from '@/app/components/sidebar';
import Header from '@/app/components/header';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default function Dashboard() {
    const chartRef = useRef<ChartJS<'line'>>(null);

    const salesChartData = {
        labels: penjualanData.last7Days.map(item => item.day),
        datasets: [
            {
                label: 'Penjualan (Rp)',
                data: penjualanData.last7Days.map(item => item.sales),
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Jumlah Order',
                data: penjualanData.last7Days.map(item => item.orders * 100000),
                borderColor: 'rgb(236, 72, 153)',
                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const monthlyChartData = {
        labels: penjualanData.monthly.map(item => item.month),
        datasets: [
            {
                label: 'Actual Sales',
                data: penjualanData.monthly.map(item => item.sales),
                backgroundColor: 'rgba(99, 102, 241, 0.8)',
                borderColor: 'rgb(99, 102, 241)',
                borderWidth: 2,
                borderRadius: 6,
            },
            {
                label: 'Sales Target',
                data: penjualanData.monthly.map(item => item.target),
                backgroundColor: 'rgba(236, 72, 153, 0.6)',
                borderColor: 'rgb(236, 72, 153)',
                borderWidth: 2,
                borderRadius: 6,
            },
        ],
    };

    // Product Category Data for Doughnut
    const categoryData = produkData.reduce((acc: any, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {});

    const doughnutData = {
        labels: Object.keys(categoryData),
        datasets: [
            {
                data: Object.values(categoryData),
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                ],
                borderColor: [
                    'rgb(99, 102, 241)',
                    'rgb(236, 72, 153)',
                    'rgb(16, 185, 129)',
                ],
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
            },
            x: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
            },
        },
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

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
                                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                                    <p className="text-gray-600">Selamat datang di dashboard BeautyCare</p>
                                </div>
                                <div className="mt-4 sm:mt-0">
                                    <div className="bg-white/80 backdrop-blur-md rounded-lg border border-gray-200/50 px-4 py-2">
                                        <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString('id-ID')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Total Sales Card */}
                                <div className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-500/25">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-indigo-100">Total Sales</p>
                                            <h3 className="text-2xl font-bold mt-2">{formatCurrency(salesData.totalSales)}</h3>
                                            <p className="text-indigo-100 text-sm mt-1">+{salesData.monthlyGrowth}% from last month</p>
                                        </div>
                                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 6l-2.5 1.5M12 14l2.5 1.5M12 14v1m0-1v-1m-6.5-1.5L12 13m-6.5 1.5L12 16m0 5a9 9 0 110-18 9 9 0 010 18z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Total Orders Card */}
                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600">Total Orders</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-2">{salesData.totalOrders.toLocaleString()}</h3>
                                            <p className="text-green-600 text-sm mt-1">+12.5% growth</p>
                                        </div>
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Total Users Card */}
                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600">Total Users</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-2">{userData.length.toLocaleString()}</h3>
                                            <p className="text-blue-600 text-sm mt-1">+8 new this week</p>
                                        </div>
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Average Order Value Card */}
                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600">Avg. Order Value</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-2">{formatCurrency(salesData.averageOrderValue)}</h3>
                                            <p className="text-purple-600 text-sm mt-1">+5.2% from last month</p>
                                        </div>
                                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8l3 5m0 0l3-5m-3 5v4m-3-5h6m-6 3h6m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Charts Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Sales Trend Chart */}
                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend (7 Hari Terakhir)</h3>
                                    <div className="h-80">
                                        <Line ref={chartRef} data={salesChartData} options={chartOptions} />
                                    </div>
                                </div>

                                {/* Monthly Performance */}
                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance</h3>
                                    <div className="h-80">
                                        <Bar data={monthlyChartData} options={chartOptions} />
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Product Categories */}
                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg lg:col-span-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Categories</h3>
                                    <div className="h-64">
                                        <Doughnut
                                            data={doughnutData}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: false,
                                                plugins: {
                                                    legend: {
                                                        position: 'bottom' as const,
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Top Products */}
                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg lg:col-span-2">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
                                    <div className="space-y-4">
                                        {salesData.topProducts.map((product, index) => (
                                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg border border-gray-200/50">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 bg-linear-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{product.name}</p>
                                                        <p className="text-sm text-gray-600">{formatCurrency(product.sales)}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-medium text-gray-900">{Math.round((product.sales / salesData.totalSales) * 100)}%</p>
                                                    <p className="text-xs text-gray-600">of total sales</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}