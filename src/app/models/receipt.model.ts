export class ReceiptModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public student: string;
  public course: string;
  public branch: string;
  public batch: string;
  public date: string;
  public feeType: string;
  public amount: string;
  public paymentMode: string;
  public description: string;
  public chequeNumber: string;
  public chequeDate: string;
  public bankName: string;
  public bankBranch: string;
  public status: string;

  constructor(
    id: string,
    student: string,
    course: string,
    branch: string,
    batch: string,
    date: string,
    feeType: string,
    amount: string,
    paymentMode: string,
    description: string,
    chequeNumber: string,
    chequeDate: string,
    bankName: string,
    bankBranch: string,
    status: string
  ) {
    this._id = id;
    this.student = student;
    this.course = course;
    this.branch = branch;
    this.batch = batch;
    this.date = date;
    this.feeType = feeType;
    this.amount = amount;
    this.paymentMode = paymentMode;
    this.description = description;
    this.chequeNumber = chequeNumber;
    this.chequeDate = chequeDate;
    this.bankName = bankName;
    this.bankBranch = bankBranch;
    this.status = status;
  }
}
