'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  Package,
  Sparkles,
  ChevronRight,
  X,
} from 'lucide-react';

interface SidebarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export default function Sidebar({ onToggleSidebar, isSidebarOpen = true }: SidebarProps) {
    const pathname = usePathname();

    const menuItems = [
        {
            name: 'Dashboard',
            href: '/page/dashboard',
            icon: <LayoutDashboard className="w-5 h-5" />,
        },
        {
            name: 'Users',
            href: '/page/users',
            icon: <Users className="w-5 h-5" />,
        },
        {
            name: 'Products',
            href: '/page/products',
            icon: <Package className="w-5 h-5" />,
        },
    ];

    return (
        <>
            {/* Overlay untuk mobile */}
            {isSidebarOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={onToggleSidebar}
                />
            )}
            
            <aside className={`
                fixed lg:sticky top-0 left-0 h-svh bg-white/90 backdrop-blur-xl border-r border-gray-100 flex flex-col z-50
                transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                w-64
            `}>
                <div className="p-6 border-b border-gray-100/70">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    BeautyCare
                                </h1>
                                <p className="text-xs text-gray-500 font-medium">Admin Dashboard</p>
                            </div>
                        </div>
                        {/* Tombol X untuk menutup sidebar di mobile */}
                        <button
                            onClick={onToggleSidebar}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100/80 transition-colors duration-200 text-gray-600 hover:text-indigo-600"
                            aria-label="Close sidebar"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <nav className="flex-1 p-4">
                    <div className="mb-6">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-3">
                            Main Menu
                        </h3>
                        <ul className="space-y-1">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            onClick={() => {
                                                // Tutup sidebar di mobile saat menu diklik
                                                if (window.innerWidth < 1024) {
                                                    onToggleSidebar?.();
                                                }
                                            }}
                                            className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                                                isActive
                                                    ? 'bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                                                    : 'text-gray-600 hover:bg-gray-50/80 hover:text-indigo-600 hover:shadow-md'
                                            }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className={`p-1 rounded-lg ${
                                                    isActive 
                                                        ? 'text-white' 
                                                        : 'text-gray-400 group-hover:text-indigo-500'
                                                }`}>
                                                    {item.icon}
                                                </div>
                                                <span className="font-medium">{item.name}</span>
                                            </div>
                                            {isActive && (
                                                <ChevronRight className="w-4 h-4 opacity-80" />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </nav>

                <div className="p-4 border-t border-gray-100/70">
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200 cursor-pointer">
                        <div className="w-8 h-8 bg-linear-to-r from-gray-600 to-gray-400 rounded-full flex items-center justify-center">
                            <span className="text-xs font-semibold text-white">A</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                            <p className="text-xs text-gray-500 truncate">admin@beautycare.com</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}