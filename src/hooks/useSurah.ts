import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Ayat {
  id: number;         // ID ayat dalam surah
  surah: number;      // Nomor surah
  nomor: number;      // Nomor ayat
  ar: string;         // Teks Arab
  tr: string;         // Transliteration
  idn: string;        // Terjemahan dalam bahasa Indonesia
}

// Interface untuk daftar surah
interface Surah {
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlah_ayat: number;
  tempat_turun: string;
  arti: string;
  deskripsi: string;
  audio: string;
}

// Interface untuk detail surah (termasuk ayat-ayatnya)
interface SurahDetail extends Surah {
  ayat?: Ayat[];
}

export function useSurah() {
  const surah = ref<Surah[] | null>(null);
  const surahDetail = ref<SurahDetail | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchSurah = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get<Surah[]>('https://quran-api.santrikoding.com/api/surah/');
      surah.value = response.data;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  const fetchSurahDetail = async (nomor: number) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get<SurahDetail>(`https://quran-api.santrikoding.com/api/surah/${nomor}`);
      surahDetail.value = response.data;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchSurah);

  return { surah, surahDetail, loading, error, fetchSurah, fetchSurahDetail };
}
