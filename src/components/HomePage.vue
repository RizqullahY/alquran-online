<template>
  <div>
    <!-- Loading Indicator -->
    <div v-if="loading" class="text-center text-xl font-bold text-blue-500">
      Loading data, please wait...
    </div>

    <!-- Error Message -->
    <div v-if="error" class="text-center text-xl font-bold text-red-500">
      Error: {{ error }}
    </div>

    <!-- Surah Cards -->
    <div v-else class="p-6 rounded shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        class="p-6 border bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl cursor-pointer"
        v-for="surah in data"
        :key="surah.nomor"
        @click="goToSurahDetail(surah.nomor)"  
      >
        <div class="flex items-start space-x-4">
          <h1 class="font-bold text-3xl text-slate-300">{{ surah.nomor }}</h1>
          <div class="flex flex-col">
            <h2 class="font-bold text-xl mb-2 text-slate-300">{{ surah.nama }}</h2>
            <p class="text-sm text-slate-300">
              {{ surah.nama_latin }} ({{ surah.jumlah_ayat }} Ayat)
            </p>
            <p class="text-sm text-slate-300">{{ surah.arti }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: [], // List of Surahs
      loading: true, // Loading state
      error: null, // Error state
    };
  },
  methods: {
    // Method to navigate to the Surah page with the ID as a route parameter
    goToSurahDetail(surahId) {
      this.$router.push({ name: 'surah', params: { id: surahId } });
    },
  },
  mounted() {
    // Fetch the Surah data
    axios
      .get("https://quran-api.santrikoding.com/api/surah")
      .then((response) => {
        this.data = response.data;
        this.loading = false;
      })
      .catch((err) => {
        this.error = err.message;
        this.loading = false;
      });
  },
};
</script>
