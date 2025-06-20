<template>
<div class="min-h-screen bg-gradient-to-br from-[#D7EDFD] via-[#E8F4FE] to-[#F0F8FF] overflow-hidden">


        <div class="absolute inset-0 opacity-30">
            <div class="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-blue-500/10 rounded-full blur-3xl pulse-slow"></div>
            <div class="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-tl from-cyan-300/15 to-blue-400/20 rounded-full blur-2xl pulse-slow" style="animation-delay: 2s"></div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-blue-200/10 to-indigo-300/15 rounded-full blur-xl animate-spin" style="animation-duration: 20s"></div>
        </div>

        <!-- Floating Shapes -->
        <div class="absolute inset-0 opacity-20">
            <div class="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full opacity-40 shadow-lg animate-float"></div>
            <div class="absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-cyan-300 to-blue-500 rounded-full animate-pulse opacity-30 shadow-md"></div>
            <div class="absolute bottom-20 left-32 w-24 h-24 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full animate-ping opacity-35 shadow-xl"></div>
            <div class="absolute bottom-40 right-10 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full opacity-40 shadow-md animate-float" style="animation-delay: 1s"></div>
        </div>

        <!-- Geometric Shapes -->
        <div class="absolute inset-0 opacity-15">
            <div class="absolute top-20 right-1/4 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 transform rotate-45 animate-spin shadow-lg" style="animation-duration: 8s"></div>
            <div class="absolute bottom-32 left-1/4 w-6 h-20 bg-gradient-to-t from-blue-300 to-cyan-400 rounded-full transform rotate-12 animate-pulse shadow-md"></div>
            <div class="absolute top-1/3 right-1/3 w-10 h-10 bg-gradient-to-br from-indigo-400 to-blue-500 transform rotate-12 animate-spin shadow-lg" style="animation-duration: 12s"></div>
        </div>

        <!-- Main Login Container -->
        <div class="relative z-10 min-h-screen flex items-center justify-center p-4">
            <div class="w-full max-w-md">
                <!-- Logo & Brand Section -->
                <div class="text-center mb-8 fade-in-up">

                    <h1 class="text-4xl font-bold gradient-text mb-2">Q-Mas Admin</h1>
                    <p class="text-gray-600 text-sm">Panti Asuhan KH Mas Mansyur Malang</p>
                    <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mt-3"></div>
                </div>

                <!-- Login Form -->
                <div class="glass-effect rounded-2xl p-8 shadow-2xl fade-in-up" style="animation-delay: 0.2s">
                    <!-- Success/Error Messages -->
                    <div v-if="successMessage" class="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                        <div class="flex items-center">
                            <i class="fas fa-check-circle mr-2"></i>
                            {{ successMessage }}
                        </div>
                    </div>
                    
                    <div v-if="errorMessage" class="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        <div class="flex items-center">
                            <i class="fas fa-exclamation-triangle mr-2"></i>
                            {{ errorMessage }}
                        </div>
                    </div>

                    <form @submit.prevent="handleLogin">
                        <!-- Username Field -->
                        <div class="mb-6">
                            <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
                                <i class="fas fa-user mr-2 text-blue-600"></i>Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                v-model="loginForm.username"
                                :class="[
                                    'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 input-focus',
                                    errors.username ? 'border-red-500' : ''
                                ]"
                                placeholder="Masukkan username Anda"
                                required
                            >
                            <p v-if="errors.username" class="mt-1 text-sm text-red-600">{{ errors.username }}</p>
                        </div>

                        <!-- Password Field -->
                        <div class="mb-6">
                            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                                <i class="fas fa-lock mr-2 text-blue-600"></i>Password
                            </label>
                            <div class="relative">
                                <input
                                    :type="showPassword ? 'text' : 'password'"
                                    id="password"
                                    v-model="loginForm.password"
                                    :class="[
                                        'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 input-focus pr-12',
                                        errors.password ? 'border-red-500' : ''
                                    ]"
                                    placeholder="Masukkan password Anda"
                                    required
                                >
                                <button
                                    type="button"
                                    @click="showPassword = !showPassword"
                                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                </button>
                            </div>
                            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
                        </div>

                        <!-- Remember Me & Forgot Password -->
                        <div class="flex items-center justify-between mb-6">
                            <label class="flex items-center">
                                <input
                                    type="checkbox"
                                    v-model="loginForm.rememberMe"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                >
                                <span class="ml-2 text-sm text-gray-600">Ingat saya</span>
                            </label>
                            <a href="#" class="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
                                Lupa password?
                            </a>
                        </div>

                        <!-- Login Button -->
                        <button
                            type="submit"
                            :disabled="loading"
                            class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 btn-hover disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span v-if="loading" class="flex items-center justify-center">
                                <i class="fas fa-spinner fa-spin mr-2"></i>
                                Masuk...
                            </span>
                            <span v-else class="flex items-center justify-center">
                                <i class="fas fa-sign-in-alt mr-2"></i>
                                Masuk ke Admin Panel
                            </span>
                        </button>
                    </form>

                    <!-- Divider -->
                    <div class="my-6">
                        <div class="relative">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-300"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-2 bg-white text-gray-500">atau</span>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Access Info -->
                    <div class="text-center">
                        <p class="text-sm text-gray-600 mb-2">Akses cepat untuk:</p>
                        <div class="flex justify-center space-x-4 text-xs">
                            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Kelola Pengaduan</span>
                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full">Kelola Pesanan</span>
                            <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Dashboard</span>
                        </div>
                    </div>
                </div>

                <!-- Footer Info -->
                <div class="text-center mt-8 fade-in-up" style="animation-delay: 0.4s">
                    <p class="text-sm text-gray-600">
                        © 2024 Q-Mas - Panti Asuhan KH Mas Mansyur Malang
                    </p>
                    <p class="text-xs text-gray-500 mt-1">
                        Sistem administrasi terpadu untuk pengelolaan bisnis air minum
                    </p>
                </div>
            </div>
        </div>

        <!-- Loading Overlay -->
        <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 flex items-center space-x-3">
                <i class="fas fa-spinner fa-spin text-blue-600 text-xl"></i>
                <span class="text-gray-700">Memproses login...</span>
            </div>
        </div>


</div>
</template>

<script>
export default{
    data() {
        return {
            loginForm: {
                username: '',
                password: '',
                rememberMe: false
            },
            showPassword: false,
            loading: false,
            successMessage: '',
            errorMessage: '',
            errors: {}
        }
    },
    methods: {
        async handleLogin() {
            this.loading = true;
            this.errorMessage = '';
            this.successMessage = '';
            this.errors = {};

            // Validasi form
            if (!this.validateForm()) {
                this.loading = false;
                return;
            }

            try {
                // Simulasi API call
                await this.simulateLogin();
                
                this.successMessage = 'Login berhasil! Mengarahkan ke dashboard...';
                
                // Redirect ke dashboard setelah 2 detik
                setTimeout(() => {
                    // Redirect ke halaman admin dashboard
                    window.location.href = '/admin/dashboard';
                }, 2000);

            } catch (error) {
                this.errorMessage = error.message || 'Terjadi kesalahan saat login. Silakan coba lagi.';
            } finally {
                this.loading = false;
            }
        },

        validateForm() {
            let isValid = true;
            this.errors = {};

            // Validasi username
            if (!this.loginForm.username.trim()) {
                this.errors.username = 'Username harus diisi';
                isValid = false;
            } else if (this.loginForm.username.length < 3) {
                this.errors.username = 'Username minimal 3 karakter';
                isValid = false;
            }

            // Validasi password
            if (!this.loginForm.password) {
                this.errors.password = 'Password harus diisi';
                isValid = false;
            } else if (this.loginForm.password.length < 6) {
                this.errors.password = 'Password minimal 6 karakter';
                isValid = false;
            }

            return isValid;
        },

        async simulateLogin() {
            // Simulasi delay API
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Contoh kredensial admin (dalam implementasi nyata, ini akan dikirim ke server)
            const validCredentials = {
                username: 'admin',
                password: 'qmas123'
            };

            if (this.loginForm.username === validCredentials.username && 
                this.loginForm.password === validCredentials.password) {
                
                // Simpan token/session (dalam implementasi nyata)
                localStorage.setItem('qmas_admin_token', 'dummy_token_' + Date.now());
                localStorage.setItem('qmas_admin_user', JSON.stringify({
                    username: this.loginForm.username,
                    role: 'admin',
                    loginTime: new Date().toISOString()
                }));

                return { success: true };
            } else {
                throw new Error('Username atau password salah');
            }
        },

        // Auto-focus pada input username saat halaman dimuat
        focusUsername() {
            this.$nextTick(() => {
                document.getElementById('username').focus();
            });
        }
    },

    mounted() {
        // Cek apakah user sudah login
        const token = localStorage.getItem('qmas_admin_token');
        if (token) {
            // Redirect ke dashboard jika sudah login
            window.location.href = '/admin/dashboard';
        }

        this.focusUsername();

        // Auto-dismiss messages setelah 5 detik
        setTimeout(() => {
            this.successMessage = '';
            this.errorMessage = '';
        }, 5000);
    }
}
</script>

<style>
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

@keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse-slow {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}

.gradient-text {
    background: linear-gradient(45deg, #223dfc, #76aae4, #223dfc);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientShift 3s ease-in-out infinite;
}

.fade-in-up {
    animation: fadeInUp 0.8s ease-out;
}

.pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
}

.glass-effect {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.input-focus:focus {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(34, 61, 252, 0.15);
}

.btn-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(34, 61, 252, 0.3);
}
</style>