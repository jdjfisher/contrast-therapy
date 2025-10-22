<script setup lang="ts">
import '@/index.css';
import TimerPanel from '@/components/panels/TimerPanel.vue';
import SettingsPanel from '@/components/panels/SettingsPanel.vue';
import AboutPanel from '@/components/panels/AboutPanel.vue';
import { ref } from 'vue';
import type { Settings } from './types';
import { useStorage } from '@/composables/storage';

const panel = ref<'timer' | 'settings' | 'about'>('timer');

const settings = useStorage<Settings>('settings-v1', {
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

      <div class="grid h-115 w-80 place-items-center rounded-lg border p-12 shadow">
        <transition name="fade" mode="out-in">
          <KeepAlive>
            <TimerPanel v-if="panel === 'timer'" v-bind="settings" />
            <SettingsPanel v-else-if="panel === 'settings'" v-model:settings="settings" />
            <AboutPanel v-else />
          </KeepAlive>
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
