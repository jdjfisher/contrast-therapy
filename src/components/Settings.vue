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
        <label for="coldDuration" class="block text-sm font-medium">Cold Duration (seconds)</label>
        <input
          id="coldDuration"
          type="number"
          v-model.number="settings!.coldDuration"
          class="w-full rounded border px-2 py-1"
          min="1"
          placeholder="Cold Duration (seconds)"
        />
      </div>

      <div class="space-y-2">
        <label for="hotDuration" class="block text-sm font-medium">Hot Duration (seconds)</label>
        <input
          id="hotDuration"
          type="number"
          v-model.number="settings!.hotDuration"
          class="w-full rounded border px-2 py-1"
          min="1"
          placeholder="Hot Duration (seconds)"
        />
      </div>

      <div class="space-y-2">
        <label for="cycles" class="block text-sm font-medium">Cycles</label>
        <input
          id="cycles"
          type="number"
          v-model.number="settings!.cycles"
          class="w-full rounded border px-2 py-1"
          min="1"
          placeholder="Cycles"
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
