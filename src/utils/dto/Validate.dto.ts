class validateType {
  email: (email: string) => boolean;
  URL: (url: string) => boolean;
  phone: (phone: string) => boolean;
  integer: (value: number) => boolean;
  positiveInteger: (value: number) => boolean;
  string: (value: string) => boolean;
  array: (value: any[]) => boolean;
  object: (value: object) => boolean;
  date: (date: string) => boolean;
  formatPhone: (phone: string) => string;
}

export default validateType;
