<script setup lang="ts">
import { onMounted } from 'vue';
import { useSurah } from '@/hooks/useSurah';
import { useRoute, useRouter } from 'vue-router';

const { surahDetail, loading, error, fetchSurahDetail } = useSurah();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  const nomor = Number(route.params.nomor);
  if (!isNaN(nomor)) {
    fetchSurahDetail(nomor);
  }
});

const goBack = () => {
  router.push('/surah');
};
</script>

<template>
  <div>
    <button @click="goBack">Kembali</button>

    <p v-if="loading">Loading...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="surahDetail">
      <h2>{{ surahDetail.nama_latin }} ({{ surahDetail.nama }})</h2>
      <p><strong>Arti:</strong> {{ surahDetail.arti }}</p>
      <p><strong>Jumlah Ayat:</strong> {{ surahDetail.jumlah_ayat }}</p>
      <p><strong>Tempat Turun:</strong> {{ surahDetail.tempat_turun }}</p>
      <p><strong>Deskripsi:</strong> {{ surahDetail.deskripsi }}</p>

      <h3>Ayat:</h3>
      <ul>
        <li v-for="ayat in surahDetail.ayat" :key="ayat.nomor">
          <p><strong>Ayat {{ ayat.nomor }}:</strong></p>
          <p style="font-size: 24px; direction: rtl;">{{ ayat.ar }}</p>
          <p><em>{{ ayat.tr }}</em></p>
          <p>{{ ayat.idn }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  margin: 10px 0;
  border-radius: 5px;
}
button:hover {
  background-color: #0056b3;
}
</style>
