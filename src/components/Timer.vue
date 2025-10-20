<script setup lang="ts">
import { beep, formatSeconds, setIntervalImmediate } from '@/util';
import { computed, ref } from 'vue';

const props = defineProps<{
  coldDuration: number;
  hotDuration: number;
  cycles: number;
}>();

const INTERVAL_MS = 1000; // Reduce for testing purposes

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

  // Higher pitch beep for the start of the session
  beep(400, 880);

  intervalId = setIntervalImmediate(() => {
    if (running.value && countdown.value > 0) {
      countdown.value -= 1;
      return;
    }

    if (running.value && countdown.value === 0) {
      phase.value += 1;

      if (phase.value <= props.cycles * 2) {
        countdown.value = phaseType.value === 'cold' ? props.coldDuration : props.hotDuration;
        beep(200, phaseType.value === 'cold' ? 660 : 740);
      } else {
        stopTimer();
      }
    }
  }, INTERVAL_MS);
}

function stopTimer() {
  running.value = false;
  phase.value = 0;
  countdown.value = props.coldDuration;

  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  // Lower pitch beep for the end of the session
  beep(600, 220);
}
</script>

<template>
  <div class="grid gap-8 rounded-lg border p-12 shadow">
    <div
      class="text-center text-6xl font-semibold capitalize transition-opacity duration-500"
      :class="{
        'text-blue-500': phaseType === 'cold',
        'text-red-500': phaseType === 'hot',
        'opacity-5': !running,
      }"
    >
      {{ phaseType }}
    </div>

    <span class="text-center font-mono text-4xl">
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
