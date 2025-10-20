export function setIntervalImmediate(fn: () => void, interval: number): number {
  fn();
  const handle = setInterval(fn, interval);
  return handle;
}

export function formatSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

export function beep(
  duration: number = 200,
  frequency: number = 440,
  volume: number = 1,
  type: OscillatorType = 'sine'
): void {
  const audioCtx = new AudioContext();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gainNode.gain.value = volume;

  oscillator.start();
  setTimeout(() => {
    oscillator.stop();
    audioCtx.close();
  }, duration);
}
