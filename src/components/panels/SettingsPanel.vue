<script setup lang="ts">
import type { Settings } from '@/types';
import { formatSeconds } from '@/util';
import { computed } from 'vue';

const settings = defineModel<Settings>('settings');

const sessionDuration = computed(
  () =>
    (settings.value!.coldDuration + settings.value!.hotDuration) * settings.value!.cycles +
    settings.value!.coldDuration
);
</script>

<template>
  <div class="grid gap-8">
    <h2 class="text-center font-mono text-sm font-bold">Settings</h2>

    <div class="space-y-4">
      <div class="flex items-center gap-2">
        <label for="beep" class="block text-sm font-medium">Beep Enabled</label>
        <input id="beep" type="checkbox" v-model="settings!.beepEnabled" />
      </div>

      <div class="space-y-2">
        <label for="coldDuration" class="flex items-center justify-between text-sm font-medium">
          Cold Duration <span class="font-mono">{{ formatSeconds(settings!.coldDuration) }}</span>
        </label>
        <input
          id="coldDuration"
          type="range"
          v-model.number="settings!.coldDuration"
          class="w-full"
          min="30"
          max="360"
          step="15"
        />
      </div>

      <div class="space-y-2">
        <label for="hotDuration" class="flex items-center justify-between text-sm font-medium">
          Hot Duration <span class="font-mono">{{ formatSeconds(settings!.hotDuration) }}</span>
        </label>
        <input
          id="hotDuration"
          type="range"
          v-model.number="settings!.hotDuration"
          class="w-full"
          min="30"
          max="360"
          step="15"
        />
      </div>

      <div class="space-y-2">
        <label for="cycles" class="flex items-center justify-between text-sm font-medium">
          Cycles <span class="font-mono">{{ settings!.cycles }}</span>
        </label>
        <input
          id="cycles"
          type="range"
          v-model.number="settings!.cycles"
          class="w-full"
          min="1"
          max="10"
          step="1"
        />
      </div>
    </div>

    <p class="text-center text-sm text-gray-500">
      Session duration:
      <span class="font-mono font-semibold">
        {{ formatSeconds(sessionDuration) }}
      </span>
    </p>
  </div>
</template>
