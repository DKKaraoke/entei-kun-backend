/**
 * is-later-than.validator.ts
 * @author soltia48
 * @date 2022-10-03
 */

import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

import { parseMilitaryTime } from "~/utilities/military-time";

/**
 * Is later than
 * @param a Value A
 * @param b Value B
 * @return If true to A is later than B, false to else
 */
export const isLaterThan = (a: string, b: string) => {
  const aTime = parseMilitaryTime(a);
  if (!aTime) {
    return false;
  }
  const bTime = parseMilitaryTime(b);
  if (!bTime) {
    return false;
  }
  const aValue = 60 * aTime.hour + aTime.minute;
  const bValue = 60 * bTime.hour + bTime.minute;
  return bValue <= aValue;
};

/**
 * Is later than validation decorator
 * @param property Property name
 * @param validationOptions Validation options
 * @return Decorator function
 */
export function IsLaterThan(property: string, validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isLaterThan",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const relatedValue = args.object[relatedPropertyName];
          return isLaterThan(value, relatedValue);
        },
        defaultMessage(args: ValidationArguments) {
          return `Time ${args.value} is earlier than or equal ${args.constraints[0]} property`;
        },
      },
    });
  };
}
