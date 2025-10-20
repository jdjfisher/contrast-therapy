export function setIntervalImmediate(fn: () => void, interval: number): number {
  fn();
  const handle = setInterval(fn, interval);
  return handle;
}

export function formatSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
