import { Injectable } from '@nestjs/common';
import { Validate } from './utils';

@Injectable()
export class UtilsService {
  validateEmail(email: string) {
    return Validate.email(email);
  }

  validateURL(url: string) {
    return Validate.URL(url);
  }

  validatePhone(phone: string) {
    return Validate.phone(phone);
  }

  validateInteger(value: number) {
    return Validate.integer(value);
  }

  validatePositiveInteger(value: number) {
    return Validate.positiveInteger(value);
  }

  validateString(value: string) {
    return Validate.string(value);
  }

  validateArray(value: any[]) {
    return Validate.array(value);
  }

  validateObject(value: object) {
    return Validate.object(value);
  }

  validateDate(date: string) {
    return Validate.date(date);
  }

  formatPhone(phone: string) {
    return Validate.formatPhone(phone);
  }
}
