<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      
      <div class="absolute inset-0 opacity-30">
        <div class="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div class="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-tl from-cyan-300/15 to-blue-400/20 rounded-full blur-2xl animate-pulse-slow animation-delay-2"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-blue-200/10 to-indigo-300/15 rounded-full blur-xl animate-spin-slow"></div>
      </div>
      
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full animate-float shadow-lg"></div>
        <div class="absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-cyan-300 to-blue-500 rounded-full animate-pulse shadow-md"></div>
        <div class="absolute bottom-20 left-32 w-24 h-24 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full animate-ping shadow-xl"></div>
        <div class="absolute bottom-40 right-10 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full animate-float animation-delay-1 shadow-md"></div>
      </div>
  
      
      <div class="absolute inset-0 opacity-15">
        <div class="absolute top-20 right-1/4 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 transform rotate-45 animate-spin-slow shadow-lg"></div>
        <div class="absolute bottom-32 left-1/4 w-6 h-20 bg-gradient-to-t from-blue-300 to-cyan-400 rounded-full transform rotate-12 animate-pulse shadow-md"></div>
        <div class="absolute top-1/3 right-1/3 w-10 h-10 bg-gradient-to-br from-indigo-400 to-blue-500 transform rotate-12 animate-spin-slow shadow-lg"></div>
      </div>
  
      
      <div class="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-md">
          
          <div class="text-center mb-8 animate-fade-in-up">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-xl">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h1 class="text-4xl font-bold gradient-text mb-2">Q-Mas Admin</h1>
            <p class="text-gray-600 text-sm mb-3">Panti Asuhan KH Mas Mansyur Malang</p>
            <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto"></div>
          </div>
  
          
          <div class="glass-card rounded-3xl p-8 shadow-2xl animate-fade-in-up animation-delay-200">
            
            <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center animate-slide-in">
              <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              {{ successMessage }}
            </div>
            
            
            <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center animate-slide-in">
              <svg class="w-5 h-5 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
              {{ errorMessage }}
            </div>
  
            <form @submit.prevent="handleLogin" class="space-y-6">
              
              <div>
                <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                  <svg class="w-4 h-4 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  v-model="loginForm.email"
                  :class="[
                    'w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'
                  ]"
                  placeholder="Masukkan email Anda"
                  required
                >
                <p v-if="errors.email" class="mt-2 text-sm text-red-600 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                  </svg>
                  {{ errors.email }}
                </p>
              </div>
  
              
              <div>
                <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
                  <svg class="w-4 h-4 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  Password
                </label>
                <div class="relative">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="loginForm.password"
                    :class="[
                      'w-full px-4 py-3 pr-12 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                      errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'
                    ]"
                    placeholder="Masukkan password Anda"
                    required
                  >
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                    </svg>
                  </button>
                </div>
                <p v-if="errors.password" class="mt-2 text-sm text-red-600 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                  </svg>
                  {{ errors.password }}
                </p>
              </div>
              <div class="flex items-center justify-between">
                <label class="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="loginForm.rememberMe"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  >
                  <span class="ml-2 text-sm text-gray-600">Ingat saya</span>
                </label>
              </div>
  
              
              <button
                type="submit"
                :disabled="loading"
                class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span v-if="loading" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </span>
                <span v-else class="flex items-center justify-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                  </svg>
                  Masuk ke Admin Panel
                </span>
              </button>
            </form>
  
            
            <div class="my-8">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
              </div>
            </div>
          </div>
  
          
          <div class="text-center mt-8 animate-fade-in-up animation-delay-400">
            <p class="text-sm text-gray-600 font-medium">
              © 2024 Q-Mas - Panti Asuhan KH Mas Mansyur Malang
            </p>
            <p class="text-xs text-gray-500 mt-1">
              Sistem administrasi terpadu untuk pengelolaan bisnis air minum
            </p>
          </div>
        </div>
      </div>
  
      
      <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl p-8 flex flex-col items-center space-y-4 shadow-2xl">
          <svg class="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-gray-700 font-medium">Memproses login...</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'QMasAdminLogin',
    data() {
      return {
        loginForm: {
          email: '',
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
  
        // Validate form
        if (!this.validateForm()) {
          this.loading = false;
          return;
        }
  
        try {
          // Simulate API call
          await this.simulateLogin();
          
          this.successMessage = 'Login berhasil! Mengarahkan ke dashboard...';
        
          setTimeout(() => {
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
  
        // Validate email
        if (!this.loginForm.email.trim()) {
          this.errors.email = 'email harus diisi';
          isValid = false;
        } else if (this.loginForm.email.length < 3) {
          this.errors.email = 'email minimal 3 karakter';
          isValid = false;
        }
  
        // Validate password
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
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        const validCredentials = {
          email: 'admin@gmail.com',
          password: 'qmas123'
        };
  
        if (this.loginForm.email === validCredentials.email && 
            this.loginForm.password === validCredentials.password) {
          
          return { success: true };
        } else {
          throw new Error('Email atau password salah');
        }
      },
  
      focusEmail() {
        this.$nextTick(() => {
          const emailInput = document.getElementById('email');
          if (emailInput) {
            emailInput.focus();
          }
        });
      },
  
      clearMessages() {
        setTimeout(() => {
          this.successMessage = '';
          this.errorMessage = '';
        }, 5000);
      }
    },
  
    mounted() {
      this.focusEmail();
      this.clearMessages();
    }
  }
  </script>
  
  <style scoped>
  @keyframes float {
    0%, 100% { 
      transform: translateY(0px); 
    }
    50% { 
      transform: translateY(-15px); 
    }
  }
  
  @keyframes gradientShift {
    0%, 100% { 
      background-position: 0% 50%; 
    }
    50% { 
      background-position: 100% 50%; 
    }
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
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes pulse-slow {
    0%, 100% { 
      opacity: 0.3; 
      transform: scale(1);
    }
    50% { 
      opacity: 0.6; 
      transform: scale(1.05);
    }
  }
  
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  
  .animate-spin-slow {
    animation: spin 20s linear infinite;
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out;
  }
  
  .animate-slide-in {
    animation: slideIn 0.5s ease-out;
  }
  
  .animation-delay-1 {
    animation-delay: 1s;
  }
  
  .animation-delay-2 {
    animation-delay: 2s;
  }
  
  .animation-delay-200 {
    animation-delay: 0.2s;
  }
  
  .animation-delay-400 {
    animation-delay: 0.4s;
  }
  
  .gradient-text {
    background: linear-gradient(45deg, #2563eb, #3b82f6, #06b6d4, #2563eb);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 3s ease-in-out infinite;
  }
  
  .glass-card {
    backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  
  /* Enhanced focus states */
  input:focus {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.15);
  }
  
  button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(37, 99, 235, 0.3);
  }
  
  /* Custom scrollbar for better aesthetics */
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f5f9;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
  </style>