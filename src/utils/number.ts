export function numberIdGenerator() {
  let id = 1;
  return () => id++;
}

export function randomNumber(min: number, max: number) {
  if (min > max) return NaN;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomNumberArray(length: number, min: number, max: number) {
  const array = [];

  for (let i = 0; i < length; i++) {
    array.push(randomNumber(min, max));
  }

  return array;
}
