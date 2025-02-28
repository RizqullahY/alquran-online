import {ref, onMounted} from 'vue';
import axios from 'axios';

interface Ayat{
  id: number;           // id surah
  surah:number;         // nomor surah, surah keberapa
  nomor: number;        // nomor sama kayak id??
  ar:string;            // bahasa arab
  tr:string;            // bahasa latin
  idn: string;          // terjemahan
}

// https://quran-api.santrikoding.com/api/surah/
interface Surah{
  nomor: number;
  nama: string;
  nama_latin:string;
  jumlah_ayat:number;
  tempat_turun: string;
  arti: string;
  deskripsi: string;
  audio: string;
}

// https://quran-api.santrikoding.com/api/surah/{nomor}
interface SurahDetail{
  nomor: number;
  nama: string;
  nama_latin:string;
  jumlah_ayat:number;
  tempat_turun: string;
  arti: string;
  deskripsi: string;
  audio: string;
  ayat? : Ayat[];
}

export function useSurah(){
  const surah = ref<Surah | null>(null);
  const surahDetail = ref<SurahDetail>;
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchSurah = async () => {
    loading.value = true;
    error.value = null;
    try{
      const response = await axios.get<Surah[]>('https://quran-api.santrikoding.com/api/surah/')
      surah.value = response.data;
    }catch(err){
      error.value = (err as Error).message;
    }finally{
      loading.value = false;
    }
  }

  const fetchSurahDetail = async (nomor: number) => {
    loading.value = true;
    error.value = null;
    try{
      const response = await axios.get<SurahDetail>(`https://quran-api.santrikoding.com/api/surah/${nomor}`)
      surahDetail.value = response.data;
    }catch(err){
      error.value =  (err as Error).message;
    }finally{
      loading.value = false;
    }
  }

  onMounted(fetchSurah);

  return {surah, surahDetail, loading, error, fetchSurah, fetchSurahDetail}
}
