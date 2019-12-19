export class ContactModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public address: string;
  public numbers: string[];
  public email: string;

  constructor(id: string, address: string, numbers: string[], email: string) {
    this._id = id;
    this.address = address;
    this.numbers = numbers;
    this.email = email;
  }
}
