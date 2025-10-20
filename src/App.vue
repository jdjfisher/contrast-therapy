<script setup lang="ts">
import '@/index.css';
import Timer from '@/components/Timer.vue';
import Settings from '@/components/Settings.vue';
import { ref } from 'vue';

const showSettings = ref(false);
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-4">
    <div>
      <div class="flex items-center justify-between gap-2">
        <h1 class="mb-1 font-mono text-xs font-bold">Contrast Therapy</h1>

        <button
          class="icon-button cursor-pointer text-gray-500 transition-colors hover:text-gray-700"
          @click="showSettings = !showSettings"
          :title="showSettings ? 'Back to Timer' : 'Settings'"
        >
          <i class="material-icons text-[16px]!">
            {{ showSettings ? 'arrow_back' : 'settings' }}
          </i>
        </button>
      </div>

      <div class="grid h-96 w-80 place-items-center rounded-lg border p-12 shadow">
        <transition name="fade" mode="out-in">
          <Settings v-if="showSettings" />
          <Timer v-else :cold-duration="60" :hot-duration="120" :cycles="5" />
        </transition>
      </div>
    </div>

    <div class="group text-center text-xs text-gray-400 transition-colors hover:text-gray-600">
      Built by
      <a
        href="https://github.com/jdjfisher/contrast-therapy"
        target="_blank"
        rel="noopener noreferrer"
        class="font-mono group-hover:underline"
      >
        jdjfisher
      </a>
    </div>
  </div>
</template>
