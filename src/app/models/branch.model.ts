export class BranchModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public branchName: string;
  public address: string;
  public email: string;
  public phone: string;

  constructor(id: string, branchName: string, address: string, email: string, phone: string) {
    this._id = id;
    this.branchName = branchName;
    this.address = address;
    this.email = email;
    this.phone = phone;
  }
}
