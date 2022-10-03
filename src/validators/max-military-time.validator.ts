/**
 * max-military-time.validator.ts
 * @author soltia48
 * @date 2022-10-03
 */

import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

import { isEarlierThanOrEqual } from "./is-earlier-than-or-equal.validator";

/**
 * Max military time validation decorator
 * @param property Property name
 * @param validationOptions Validation options
 * @return Decorator function
 */
export function MaxMilitaryTime(maxValue: string, validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "maxMilitaryTime",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [maxValue],
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validate(value: any, args: ValidationArguments) {
          const [maxValue] = args.constraints;
          return isEarlierThanOrEqual(value, maxValue);
        },
        defaultMessage(args: ValidationArguments) {
          return `Time ${args.value} is lateer than ${args.constraints[0]}`;
        },
      },
    });
  };
}
