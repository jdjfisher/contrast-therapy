<script setup lang="ts">
import '@/index.css';
import Timer from './components/Timer.vue';
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-4">
    <div>
      <h1 class="mb-1 font-mono text-xs font-bold">Contrast Therapy</h1>
      <Timer :cold-duration="60" :hot-duration="120" :cycles="3" />
    </div>
  </div>
</template>
