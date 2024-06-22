export function numberIdGenerator() {
  let id = 1;
  return () => id++;
}
