<template>
  <div class="bg-green-100 flex">
    <NavbarPusat />

    <!-- Main Content -->
    <div class="flex-1 min-h-screen bg-green-100 px-6 md:px-12 lg:px-20 pt-5 mb-12 ml-50">
      <!-- Filter Waktu -->
      <div class="flex justify-center space-x-4 mt-6">
        <button v-for="filter in filters" :key="filter" @click="setActiveFilter(filter)" :class="[
          'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300',
          activeFilter === filter ? 'bg-[#03a980] text-white' : 'bg-gray-200 text-gray-700 hover:bg-[#028a66]'
        ]">
          {{ filter }}
        </button>
      </div>

      <!-- Data Summary Section -->
      <div class="flex justify-center mt-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full md:w-[100%] px-4 md:px-0">
          <!-- Pemasukan Summary -->
          <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 class="text-base md:text-lg font-semibold">Ringkasan Pemasukan</h3>
            <p class="text-gray-500 text-xs md:text-sm">Terakhir diperbarui 4 Feb 10:00 AM</p>
            <h2 class="text-lg md:text-2xl font-bold text-black mt-2">Rp12.000.000</h2>
            <p class="text-gray-500 text-xs md:text-sm">Pemasukan dalam {{ activeFilter }} terakhir</p>
            <div class="mt-4">
              <LineChart :chartData="chartData" />
            </div>
          </div>

          <!-- Pengeluaran Summary -->
          <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 class="text-base md:text-lg font-semibold">Ringkasan Pengeluaran</h3>
            <p class="text-gray-500 text-xs md:text-sm">Terakhir diperbarui 4 Feb 10:00 AM</p>
            <h2 class="text-lg md:text-2xl font-bold text-black mt-2">Rp9.500.000</h2>
            <p class="text-gray-500 text-xs md:text-sm">Pengeluaran dalam {{ activeFilter }} terakhir</p>
            <div class="mt-4">
              <LineChart :chartData="chartData" />
            </div>
          </div>
        </div>
      </div>

      <!-- Monthly and Yearly Data Section -->
      <div class="flex justify-center mt-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full md:w-[100%] px-4 md:px-0">
          <!-- Monthly Data -->
          <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 class="text-base md:text-lg font-semibold">Pendapatan Perbulan</h3>
            <div class="mt-4">
              <LineChart :chartData="monthlyData" />
            </div>
          </div>

          <!-- Yearly Data -->
          <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 class="text-base md:text-lg font-semibold">Pendapatan Pertahun</h3>
            <div class="mt-4">
              <LineChart :chartData="yearlyData" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue';
import NavbarPusat from '@/components/NavbarPusat.vue';

export default {
  components: {
    LineChart,
    NavbarPusat
  },
  data() {
    return {
      filters: ["Hari ini", "7 hari terakhir", "28 hari terakhir", "Perbulan", "Pertahun"],
      activeFilter: "7 hari terakhir",
      chartData: {},
      monthlyData: {},
      yearlyData: {},
    };
  },
  methods: {
    setActiveFilter(filter) {
      this.activeFilter = filter;
      this.fetchData();
    },
    async fetchData() {
      try {
        // Simulasi Fake API
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              daily: { labels: ["1 Feb", "2 Feb", "3 Feb"], data: [1000000, 2000000, 1500000] },
              monthly: { labels: ["Jan", "Feb", "Mar"], data: [12000000, 15000000, 18000000] },
              yearly: { labels: ["2022", "2023", "2024"], data: [100000000, 120000000, 150000000] },
            });
          }, 1000);
        });

        this.chartData = {
          labels: response.daily.labels,
          datasets: [{
            label: "Pendapatan",
            data: response.daily.data,
            borderColor: "#03a980",
            backgroundColor: "rgba(3, 169, 128, 0.2)",
            tension: 0.3,
            fill: true,
          }],
        };

        this.monthlyData = {
          labels: response.monthly.labels,
          datasets: [{
            label: "Pendapatan Bulanan",
            data: response.monthly.data,
            borderColor: "#ff9800",
            backgroundColor: "rgba(255, 152, 0, 0.2)",
            tension: 0.3,
            fill: true,
          }],
        };

        this.yearlyData = {
          labels: response.yearly.labels,
          datasets: [{
            label: "Pendapatan Tahunan",
            data: response.yearly.data,
            borderColor: "#3f51b5",
            backgroundColor: "rgba(63, 81, 181, 0.2)",
            tension: 0.3,
            fill: true,
          }],
        };

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
@media (max-width: 640px) {
  h3 {
    font-size: 14px;
  }

  h2 {
    font-size: 18px;
  }

  p {
    font-size: 12px;
  }

  .p-6 {
    padding: 1rem;
  }

  .mt-4 {
    margin-top: 1rem;
  }

  .grid-cols-1 {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  h3 {
    font-size: 16px;
  }

  h2 {
    font-size: 20px;
  }

  p {
    font-size: 14px;
  }

  .grid-cols-1 {
    grid-template-columns: 1fr 1fr;
  }

  .grid-cols-2 {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1025px) {
  h3 {
    font-size: 18px;
  }

  h2 {
    font-size: 24px;
  }

  p {
    font-size: 16px;
  }
}
</style>