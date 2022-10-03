/**
 * military-time.ts
 * @author soltia48
 * @date 2022-10-03
 */

/**
 * Military time object
 */
export interface MilitaryTimeObject {
  hour: number;
  minute: number;
  second: number;
}

/**
 * Parse military time
 * @param value Value
 * @return Hour and minute
 */
export const parseMilitaryTime = (value: string) => {
  if (typeof value !== "string") {
    return;
  }

  const matches = value.match(/^([01][0-9]|2[0-3]):?([0-5][0-9])?:?([0-5][0-9])?$/);
  if (!matches || matches.length < 2) {
    return;
  }
  return {
    hour: parseInt(matches[1], 10),
    minute: matches[2] ? parseInt(matches[2], 10) : 0,
    second: matches[3] ? parseInt(matches[3], 10) : 0,
  } as MilitaryTimeObject;
};

/**
 * Military time to number
 * @param value Value
 * @return Minutes
 */
export const mlitaryTimeToNumber = (value: string) => {
  const parsed = parseMilitaryTime(value);
  if (!parsed) {
    return;
  }
  return 3600 * parsed.hour + 60 * parsed.minute + parsed.second;
};

/**
 * Number to military time
 * @param value Minutes
 * @return Military time
 */
export const numberToMilitaryTime = (value: number, exportSecond = true) => {
  const hour = Math.floor(value / 3600) % 24;
  const minute = Math.floor(value / 60) % 60;
  const second = value % 60;
  let result = `${("00" + hour).slice(-2)}:${("00" + minute).slice(-2)}`;
  if (exportSecond) {
    result += `:${("00" + second).slice(-2)}`;
  }
  return result;
};

/**
 * Add military time
 * @param value Value
 * @param addition Addition
 * @return value + addition
 */
export const addMilitaryTime = (value: string, addition: Partial<MilitaryTimeObject>) => {
  let valueNumber = mlitaryTimeToNumber(value);
  if (valueNumber === undefined) {
    return;
  }
  if (addition.hour) {
    valueNumber += 3600 * addition.hour;
  }
  if (addition.minute) {
    valueNumber += 60 * addition.minute;
  }
  if (addition.second) {
    valueNumber += addition.second;
  }
  return numberToMilitaryTime(valueNumber);
};
