export function logError(message: string) {
  const date = new Date();
  console.error(`[ERROR ${date.toISOString()}]`, message);
}

export function log(message: string) {
  const date = new Date();
  console.log(`[LOG ${date.toISOString()}]`, message);
}
