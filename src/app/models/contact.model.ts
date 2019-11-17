export class ContactModel {

  // tslint:disable-next-line: variable-name
  public _id: string;
  public address: string;
  public numbers: string[];
  public email: string;

  // tslint:disable-next-line: variable-name
  constructor(_id: string, address: string, numbers: string[], email: string) {
    this._id = _id;
    this.address = address;
    this.numbers = numbers;
    this.email = email;
  }
}
