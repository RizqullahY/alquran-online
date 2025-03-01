<script setup lang="ts">
import { onMounted } from 'vue';
import { useSurah } from '@/hooks/useSurah';
import { useRouter } from 'vue-router';

const { surah, loading, error, fetchSurah } = useSurah();
const router = useRouter();

onMounted(fetchSurah);

const goToDetail = (nomor: number) => {
  router.push(`/surah/${nomor}`);
};
</script>

<template>
  <div>
    <h1>Daftar Surah</h1>

    <p v-if="loading">Loading...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <ul v-if="surah">
      <li v-for="s in surah" :key="s.nomor">
        <button @click="goToDetail(s.nomor)">
          {{ s.nomor }}. {{ s.nama_latin }} - {{ s.arti }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  margin: 5px;
  border-radius: 5px;
}
button:hover {
  background-color: #45a049;
}
</style>
