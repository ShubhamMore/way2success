export class BranchModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public branchName: string,
    public address: string,
    public email: string,
    public phone: string
  ) {}
}
