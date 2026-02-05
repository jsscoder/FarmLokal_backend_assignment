let failureCount = 0;
let lastFailure = 0;
const THRESHOLD = 5;
const RESET_TIME = 10000;

export function circuitBreaker<T>(fn: () => Promise<T>) {
  return async () => {
    const now = Date.now();

    if (failureCount >= THRESHOLD && now - lastFailure < RESET_TIME) {
      throw new Error("Circuit open");
    }

    try {
      const res = await fn();
      failureCount = 0;
      return res;
    } catch (err) {
      failureCount++;
      lastFailure = now;
      throw err;
    }
  };
}
