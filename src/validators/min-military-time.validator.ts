/**
 * min-military-time.validator.ts
 * @author soltia48
 * @date 2022-10-03
 */

import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

import { isLaterThanOrEqual } from "./is-later-than-or-equal.validator";

/**
 * Min military time validation decorator
 * @param property Property name
 * @param validationOptions Validation options
 * @return Decorator function
 */
export function MinMilitaryTime(minValue: string, validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "minMilitaryTime",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [minValue],
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validate(value: any, args: ValidationArguments) {
          const [minValue] = args.constraints;
          return isLaterThanOrEqual(value, minValue);
        },
        defaultMessage(args: ValidationArguments) {
          return `Time ${args.value} is earlier than ${args.constraints[0]}`;
        },
      },
    });
  };
}
