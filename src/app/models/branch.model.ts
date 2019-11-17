export class BranchModel {

    // tslint:disable-next-line: variable-name
    public _id: string;
    public branchName: string;
    public address: string;
    public email: string;
    public phone: string;

    // tslint:disable-next-line: variable-name
    constructor(_id: string, branchName: string, address: string, email: string, phone: string) {
      this._id = _id;
      this.branchName = branchName;
      this.address = address;
      this.email = email;
      this.phone = phone;
    }
}
