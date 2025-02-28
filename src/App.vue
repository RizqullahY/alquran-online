<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="w-full bg-emerald-400 p-5 flex justify-between">
      <h1 class="text-2xl font-mono font-bold italic">RMD</h1>
      <nav class="w-40 flex justify-around">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
