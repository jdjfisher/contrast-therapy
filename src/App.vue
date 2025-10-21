<script setup lang="ts">
import '@/index.css';
import Timer from '@/components/Timer.vue';
import Settings from '@/components/Settings.vue';
import About from '@/components/About.vue';
import { ref } from 'vue';
import type { Settings as SettingsType } from './types';

const panel = ref<'timer' | 'settings' | 'about'>('timer');

const settings = ref<SettingsType>({
  coldDuration: 60,
  hotDuration: 120,
  cycles: 5,
  beepEnabled: true,
});
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-4">
    <div>
      <div class="flex items-center justify-between gap-2">
        <h1 class="mb-1 font-mono text-xs font-bold">Contrast Therapy</h1>

        <transition name="fade" mode="out-in">
          <div class="flex gap-2" v-if="panel === 'timer'">
            <button
              class="icon-button cursor-pointer p-1 text-gray-500 transition-colors hover:text-gray-700"
              @click="panel = 'about'"
              title="About"
            >
              <i class="material-icons text-[16px]!"> help </i>
            </button>
            <button
              class="icon-button cursor-pointer p-1 text-gray-500 transition-colors hover:text-gray-700"
              @click="panel = 'settings'"
              title="Settings"
            >
              <i class="material-icons text-[16px]!"> settings </i>
            </button>
          </div>

          <button
            v-else
            class="icon-button cursor-pointer p-1 text-gray-500 transition-colors hover:text-gray-700"
            @click="panel = 'timer'"
            title="Back to Timer"
          >
            <i class="material-icons text-[16px]!"> arrow_back </i>
          </button>
        </transition>
      </div>

      <div class="grid h-96 w-80 place-items-center rounded-lg border p-12 shadow">
        <transition name="fade" mode="out-in">
          <Timer v-if="panel === 'timer'" v-bind="settings" />
          <Settings v-else-if="panel === 'settings'" v-model:settings="settings" />
          <About v-else />
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
