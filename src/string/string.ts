/**
 * string.ts
 * @author soltia48
 * @date 2022-10-03
 */

/**
 * Replace last
 * @param source Source
 * @param search Search value
 * @param replace Replace value
 * @return Replaced
 */
export const replaceLast = (source: string, search: string, replace: string) => {
  const parts = source.split(search);
  if (parts.length === 1) {
    return source;
  } else {
    return parts.slice(0, -1).join(search) + replace + parts.slice(-1);
  }
};

/**
 * Replace except last
 * @param source Source
 * @param search Search value
 * @param replace Replace value
 * @return Replaced
 */
export const replaceExceptLast = (source: string, search: string, replace: string) => {
  const parts = source.split(search);
  if (parts.length === 1) {
    return source;
  } else {
    return parts.slice(0, -1).join(replace) + search + parts.slice(-1);
  }
};
