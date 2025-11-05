'use client';
import { useState } from 'react';

export default function Header() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-100/50 border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent backdrop-blur-sm"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {/* Notifications */}
                        <button className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 0-6 6v2.25l-2 2v3h6.5" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            </svg>
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100/50 transition-colors"
                            >
                                <div className="w-8 h-8 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                    A
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-medium text-gray-900">Admin</p>
                                    <p className="text-xs text-gray-500">Administrator</p>
                                </div>
                                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-200/50 py-1">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50">Profile</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50">Settings</a>
                                    <a href="/login" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100/50">Logout</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}