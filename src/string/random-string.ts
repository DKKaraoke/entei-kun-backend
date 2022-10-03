/**
 * random-string.ts
 * @author soltia48
 * @date 2022-10-03
 */

import { randomBytes } from "crypto";

export const charsetBase58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz".split("");
export const charsetNumber = "0123456789".split("");
export const charsetUpperAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export const charsetLowerAlpha = "abcdefghijklmnopqrstuvwxyz".split("");
export const charsetAlpha = charsetUpperAlpha.concat(charsetLowerAlpha);
export const charsetAlphaNum = charsetNumber.concat(charsetAlpha);

/**
 * Generate random string
 * @param length Length
 * @param charset Character set
 * @return Random string
 */
export const randomString = (length: number, charset = charsetBase58) => {
  return randomBytes(length).reduce(
    (previousValue, currentValue) => previousValue + charset[currentValue % charset.length],
    ""
  );
};
