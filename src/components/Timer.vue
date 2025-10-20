<script setup lang="ts">
import { formatSeconds, setIntervalImmediate } from '@/util';
import { computed, ref } from 'vue';

const props = defineProps<{
  coldDuration: number;
  hotDuration: number;
  cycles: number;
}>();

const INTERVAL_MS = 100; // Reduce for testing purposes

let intervalId: number | null = null;

const phase = ref(0);
const countdown = ref(props.coldDuration);
const running = ref(false);

// TODO: Display total session duration and progress
// const sessionDuration = computed(() => (props.coldDuration + props.hotDuration) * props.cycles + props.coldDuration);

const phaseType = computed(() => (phase.value % 2 === 0 ? 'cold' : 'hot'));

const formattedCountdown = computed(() => formatSeconds(countdown.value));

function startTimer() {
  running.value = true;
  phase.value = 0;
  countdown.value = props.coldDuration;

  intervalId = setIntervalImmediate(() => {
    if (running.value && countdown.value > 0) {
      countdown.value -= 1;
      return;
    }

    if (running.value && countdown.value === 0) {
      phase.value += 1;

      if (phase.value <= props.cycles * 2) {
        countdown.value = phaseType.value === 'cold' ? props.coldDuration : props.hotDuration;
      } else {
        running.value = false; // End of session
      }
    }
  }, INTERVAL_MS);
}

function stopTimer() {
  running.value = false;
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}
</script>

<template>
  <div class="grid gap-4 rounded-lg border p-8">
    <div
      class="text-center text-4xl font-semibold capitalize transition-colors"
      :class="{
        'text-blue-500': phaseType === 'cold',
        'text-red-500': phaseType === 'hot',
        'opacity-5': !running,
      }"
    >
      {{ phaseType }}
    </div>

    <span class="text-center font-mono">
      {{ formattedCountdown }}
    </span>

    <div class="flex gap-4">
      <button
        class="outlined cursor-pointer rounded-lg border border-blue-500 px-4 py-2 text-blue-500 shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="running"
        @click="startTimer"
      >
        Start
      </button>

      <button
        class="outlined cursor-pointer rounded-lg border border-red-500 px-4 py-2 text-red-500 shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="!running"
        @click="stopTimer"
      >
        Reset
      </button>
    </div>
  </div>
</template>
