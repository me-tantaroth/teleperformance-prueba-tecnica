import { Pipe, PipeTransform } from '@angular/core';

interface DateWithNanoseconds {
  seconds: number;
  nanoseconds: number;
  toDate: () => Date;
}

@Pipe({
  name: 'dateMilliseconds',
})
export class DateMillisecondsPipe implements PipeTransform {
  transform(value: Date, ...args: unknown[]): Date {
    const validate: DateWithNanoseconds = <unknown>value as DateWithNanoseconds;

    if (!isNaN(validate?.seconds) || !isNaN(validate?.nanoseconds)) {
      value = validate.toDate();
    }

    return value;
  }
}
