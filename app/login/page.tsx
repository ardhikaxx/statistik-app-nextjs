'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Import Lucide Icons
import {
    Lock,
    Mail,
    Sparkles,
    Eye,
    EyeOff
} from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/page/dashboard');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-100 p-4">
            <div className="max-w-md w-full">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-8 hover:shadow-2xl transition-all duration-300">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/25">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">BeautyCare</h1>
                        <p className="text-gray-600 mt-2">Admin Dashboard Login</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 pl-11 bg-white/50 border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200 hover:border-gray-300/80 text-black"
                                    placeholder="Masukkan Email Anda"
                                    required
                                />
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pl-11 pr-11 bg-white/50 border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200 hover:border-gray-300/80 text-black"
                                    placeholder="Masukkan Password Anda"
                                    required
                                />
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center space-x-2 text-gray-600">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-indigo-600 bg-white/50 border-gray-300/50 rounded focus:ring-indigo-500/50"
                                />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="text-indigo-600 hover:text-indigo-500 transition-colors">
                                Forgot password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-linear-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                        >
                            <Lock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            Masuk
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-200/50">
                        <p className="text-center text-sm text-gray-500">
                            © 2025 BeautyCare. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}