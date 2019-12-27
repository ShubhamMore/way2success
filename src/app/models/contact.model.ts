export class ContactModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public address: string,
    public numbers: string[],
    public email: string
  ) {}
}
