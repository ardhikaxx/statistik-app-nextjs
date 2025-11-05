'use client';
import { useEffect, useRef, useState } from 'react';
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
import {
    TrendingUp,
    ShoppingCart,
    Users,
    DollarSign,
    Calendar,
    Package,
    Star,
    BarChart3,
    Target
} from 'lucide-react';

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

interface PenjualanItem {
    day: string;
    sales: number;
    orders: number;
}

interface MonthlyItem {
    month: string;
    sales: number;
    target: number;
}

interface Product {
    category: string;
}

interface SalesData {
    totalSales: number;
    monthlyGrowth: number;
    totalOrders: number;
    averageOrderValue: number;
    topProducts: Array<{
        name: string;
        sales: number;
    }>;
}

const penjualanDataTyped = penjualanData as {
    last7Days: PenjualanItem[];
    monthly: MonthlyItem[];
};

const produkDataTyped = produkData as Product[];
const salesDataTyped = salesData as SalesData;

export default function Dashboard() {
    const chartRef = useRef<ChartJS<'line'>>(null);
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

    const salesChartData = {
        labels: penjualanDataTyped.last7Days.map(item => item.day),
        datasets: [
            {
                label: 'Penjualan (Rp)',
                data: penjualanDataTyped.last7Days.map(item => item.sales),
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Jumlah Order',
                data: penjualanDataTyped.last7Days.map(item => item.orders * 100000),
                borderColor: 'rgb(236, 72, 153)',
                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const monthlyChartData = {
        labels: penjualanDataTyped.monthly.map(item => item.month),
        datasets: [
            {
                label: 'Actual Sales',
                data: penjualanDataTyped.monthly.map(item => item.sales),
                backgroundColor: 'rgba(99, 102, 241, 0.8)',
                borderColor: 'rgb(99, 102, 241)',
                borderWidth: 2,
                borderRadius: 6,
            },
            {
                label: 'Sales Target',
                data: penjualanDataTyped.monthly.map(item => item.target),
                backgroundColor: 'rgba(236, 72, 153, 0.6)',
                borderColor: 'rgb(236, 72, 153)',
                borderWidth: 2,
                borderRadius: 6,
            },
        ],
    };

    const categoryData = produkDataTyped.reduce((acc: Record<string, number>, product) => {
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
                                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                                    <p className="text-gray-600">Selamat datang di dashboard BeautyCare</p>
                                </div>
                                <div className="mt-4 sm:mt-0">
                                    <div className="bg-white/80 backdrop-blur-md rounded-lg border border-gray-200/50 px-4 py-2 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString('id-ID')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-500/25">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-indigo-100">Total Sales</p>
                                            <h3 className="text-2xl font-bold mt-2">{formatCurrency(salesDataTyped.totalSales)}</h3>
                                            <p className="text-indigo-100 text-sm mt-1 flex items-center gap-1">
                                                <TrendingUp className="w-4 h-4" />
                                                +{salesDataTyped.monthlyGrowth}% from last month
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                            <DollarSign className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600">Total Orders</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-2">
                                                {salesDataTyped.totalOrders.toLocaleString('id-ID')}
                                            </h3>
                                            <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                                                <TrendingUp className="w-4 h-4" />
                                                +12.5% growth
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                            <ShoppingCart className="w-6 h-6 text-green-600" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600">Total Users</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-2">{userData.length.toLocaleString()}</h3>
                                            <p className="text-blue-600 text-sm mt-1 flex items-center gap-1">
                                                <TrendingUp className="w-4 h-4" />
                                                +8 new this week
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <Users className="w-6 h-6 text-blue-600" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600">Avg. Order Value</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-2">{formatCurrency(salesDataTyped.averageOrderValue)}</h3>
                                            <p className="text-purple-600 text-sm mt-1 flex items-center gap-1">
                                                <TrendingUp className="w-4 h-4" />
                                                +5.2% from last month
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                            <Target className="w-6 h-6 text-purple-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                    <div className="flex items-center gap-2 mb-4">
                                        <BarChart3 className="w-5 h-5 text-gray-700" />
                                        <h3 className="text-lg font-semibold text-gray-900">Sales Trend (7 Hari Terakhir)</h3>
                                    </div>
                                    <div className="h-80">
                                        <Line ref={chartRef} data={salesChartData} options={chartOptions} />
                                    </div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                    <div className="flex items-center gap-2 mb-4">
                                        <TrendingUp className="w-5 h-5 text-gray-700" />
                                        <h3 className="text-lg font-semibold text-gray-900">Monthly Performance</h3>
                                    </div>
                                    <div className="h-80">
                                        <Bar data={monthlyChartData} options={chartOptions} />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg lg:col-span-1">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Package className="w-5 h-5 text-gray-700" />
                                        <h3 className="text-lg font-semibold text-gray-900">Product Categories</h3>
                                    </div>
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

                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg lg:col-span-2">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Star className="w-5 h-5 text-gray-700" />
                                        <h3 className="text-lg font-semibold text-gray-900">Top Selling Products</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {salesDataTyped.topProducts.map((product, index) => (
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
                                                    <p className="text-sm font-medium text-gray-900">{Math.round((product.sales / salesDataTyped.totalSales) * 100)}%</p>
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