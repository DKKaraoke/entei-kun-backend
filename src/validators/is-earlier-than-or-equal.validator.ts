/**
 * is-earlier-than-or-equal.validator.ts
 * @author soltia48
 * @date 2022-10-03
 */

import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

import { parseMilitaryTime } from "~/utilities/military-time";

/**
 * Is earlier than or equal
 * @param a Value A
 * @param b Value B
 * @return If true to A is earlier than or equal B, false to else
 */
export const isEarlierThanOrEqual = (a: string, b: string) => {
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
  return aValue <= bValue;
};

/**
 * Is earlier than or equal validation decorator
 * @param property Property name
 * @param validationOptions Validation options
 * @return Decorator function
 */
export function IsEarlierThanOrEqual(property: string, validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isEarlierThanOrEqual",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const relatedValue = (args.object as any)[relatedPropertyName];
          return isEarlierThanOrEqual(value, relatedValue);
        },
        defaultMessage(args: ValidationArguments) {
          return `Time ${args.value} is later than ${args.constraints[0]} property`;
        },
      },
    });
  };
}
