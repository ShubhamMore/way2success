export class ReceiptModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public student: string,
    public branch: string,
    public courseType: string,
    public course: string,
    public batch: string,
    public date: string,
    public feeType: string,
    public amount: string,
    public paymentMode: string,
    public description: string,
    public chequeNumber: string,
    public chequeDate: string,
    public bankName: string,
    public bankBranch: string,
    public status: string
  ) {}
}
