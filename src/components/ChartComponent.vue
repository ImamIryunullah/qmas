<template>
    <div>
      <h3 class="text-xl font-bold mb-4">Chart Data</h3>
      <div class="bg-white p-4 shadow-md rounded-md">
        <ul>
          <li v-for="(item, index) in data" :key="index">
            {{ item.date }}: Rp{{ item.value.toLocaleString() }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styles for the chart component here */
  </style>
  