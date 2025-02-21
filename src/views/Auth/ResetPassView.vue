<template>
    <div class="w-screen h-screen flex">
      <!-- Bagian Kiri (Background Hijau) -->
      <div class="w-1/2 h-full bg-[#03a980] flex flex-col justify-center items-center text-white">
        <div class="w-[60%] h-[80%] relative">
          <div class="w-full h-full object-cover bg-[url('./assets/frame229.png')] bg-cover bg-no-repeat"></div>
        </div>
        <span class="text-center text-lg font-light px-6 mt-6">
          "Your premier digital library for borrowing and reading books"
        </span>
      </div>
  
      <!-- Bagian Kanan (Form) -->
      <div class="w-1/2 h-full flex flex-col justify-center items-center px-20 bg-white relative">
        <img src="@/assets/logoswi.png" alt="SWI Logo" class="absolute top-6 w-24 h-auto" />
        <button class="absolute top-4 right-4 w-24 h-10 border border-[#03a980] text-[#03a980] rounded-lg hover:bg-[#03a980] hover:text-white transition">
          BACK
        </button>
        <h2 class="text-4xl font-semibold text-[#03a980] mb-2 mt-16">
          Forgot Password
        </h2>
        <p class="text-sm text-gray-500 mb-6">Please enter your username</p>
  
        <div class="w-full mb-4">
          <input type="text" placeholder="New Password" class="w-full h-14 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03a980]" />
        </div>
  
        <div class="w-full mb-4">
          <input type="text" placeholder="Confirm Password" class="w-full h-14 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03a980]" />
        </div>
  
        <button class="w-full h-14 bg-[#03a980] text-white font-bold rounded-lg hover:bg-[#028a66] transition">
          RESET PASSWORD
        </button>
      </div>
    </div>
</template>
  
<script setup></script>
  
<style scoped>
  /* Tambahkan custom styling jika diperlukan */
</style>
