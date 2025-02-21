<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  props: {
    chartData: Object,
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.createChart();
  },
  watch: {
    chartData: {
      handler(newData) {
        if (this.chart) {
          this.chart.destroy(); // Hancurkan grafik lama sebelum membuat yang baru
        }
        this.createChart(newData);
      },
      deep: true, // Memastikan perubahan data yang dalam tetap terdeteksi
    },
  },
  methods: {
    createChart(data = this.chartData) {
      if (this.$refs.chartCanvas) {
        this.chart = new Chart(this.$refs.chartCanvas, {
          type: "line",
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: "Tanggal",
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: "Jumlah (Rp)",
                },
              },
            },
          },
        });
      }
    },
  },
  beforeUnmount() { // Menggantikan beforeDestroy()
    if (this.chart) {
      this.chart.destroy();
    }
  },
};
</script>

<style scoped>
div {
  height: 300px;
}
</style>