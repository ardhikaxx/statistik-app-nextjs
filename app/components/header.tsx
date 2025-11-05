'use client';
import { useState } from 'react';
import { Search, ChevronDown, User, Settings, LogOut, Menu } from 'lucide-react';

interface HeaderProps {
    onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="bg-white/90 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-20">
            <div className="px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                        <button
                            onClick={onToggleSidebar}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100/80 transition-colors duration-200 text-gray-600 hover:text-indigo-600"
                            aria-label="Toggle sidebar"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <div className="flex-1 max-w-2xl">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-600 z-30" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari Sesuatu..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-300 backdrop-blur-sm text-sm transition-all duration-200 placeholder-gray-400"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-gray-100/80 transition-all duration-200 group"
                            >
                                <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-indigo-500/30">
                                    A
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-semibold text-gray-900">Admin User</p>
                                    <p className="text-xs text-gray-500">Administrator</p>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 py-2 transform origin-top-right transition-all duration-200">
                                    {/* User Info */}
                                    <div className="px-4 py-3 border-b border-gray-100/50">
                                        <p className="text-sm font-semibold text-gray-900">Admin User</p>
                                        <p className="text-xs text-gray-500 mt-1">admin@beautycare.com</p>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-1">
                                        <a
                                            href="#"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50/80 transition-colors duration-150 group"
                                        >
                                            <User className="w-4 h-4 mr-3 text-gray-400 group-hover:text-indigo-500" />
                                            Profile Settings
                                        </a>
                                        <a
                                            href="#"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50/80 transition-colors duration-150 group"
                                        >
                                            <Settings className="w-4 h-4 mr-3 text-gray-400 group-hover:text-indigo-500" />
                                            Account Preferences
                                        </a>
                                    </div>
                                    <div className="border-t border-gray-100/50 pt-1">
                                        <a
                                            href="/login"
                                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50/80 transition-colors duration-150 group"
                                        >
                                            <LogOut className="w-4 h-4 mr-3" />
                                            Sign Out
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}