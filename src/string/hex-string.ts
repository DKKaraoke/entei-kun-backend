/**
 * hex-string.ts
 * @author soltia48
 * @date 2022-10-03
 */

/**
 * From ArrayBuffer
 * @param buffer ArrayBuffer
 * @return Hex string
 */
export const fromArrayBuffer = (buffer: ArrayBuffer): string => {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
};
