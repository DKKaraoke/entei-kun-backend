/**
 * is-timezone.validator.ts
 * @author soltia48
 * @date 2022-10-03
 */

import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";
import * as dayjs from "dayjs";

/**
 * Is timezone validation decorator
 * @param property Property name
 * @param validationOptions Validation options
 * @return Decorator function
 */
export function IsTimezone(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isTimezone",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validate(value: any) {
          try {
            dayjs().tz(value);
          } catch (e) {
            return false;
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `Value ${args.value} is not timezone`;
        },
      },
    });
  };
}
