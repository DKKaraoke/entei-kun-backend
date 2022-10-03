/**
 * rand-r.ts
 * @author soltia48
 * @date 2022-10-03
 */

/**
 * Reentrant random function (rand_r)
 * @param seed Seed value
 * @return Random and new seed
 */
export const rand_r = (seed: number) => {
  let next = seed;
  let result: number;

  next = Math.imul(next, 1103515245) >>> 0;
  next += 12345;
  result = Math.floor(next / 65536) % 2048;

  next = Math.imul(next, 1103515245) >>> 0;
  next += 12345;
  result <<= 10;
  result ^= Math.floor(next / 65536) % 1024;

  next = Math.imul(next, 1103515245) >>> 0;
  next += 12345;
  result <<= 10;
  result ^= Math.floor(next / 65536) % 1024;

  return { random: result, newSeed: next };
};
