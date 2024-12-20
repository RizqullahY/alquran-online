<template>

<pre>

    <ul>
        <li v-for="ayat in surah.ayat">
            {{ ayat.ar }}
        </li>
    </ul>

</pre>
  
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        surah: null,  
      };
    },
    mounted() {
      const surahId = 1;  

      axios
        .get(`https://quran-api.santrikoding.com/api/surah/${surahId}`)
        .then((response) => {
          this.surah = response.data;
        })
        .catch((err) => {
          console.error(err);
        });
        console.log(response)
    },
  };
  </script>
  