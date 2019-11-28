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

  // tslint:disable-next-line: max-line-length variable-name
  constructor(_id: string, student: string, course: string, branch: string, batch: string, date: string, feeType: string, amount: string, paymentMode: string, description: string) {
      this._id = _id;
      this.student = student;
      this.course = course;
      this.branch = branch;
      this.batch = batch;
      this.date = date;
      this.feeType = feeType;
      this.amount = amount;
      this.paymentMode = paymentMode;
      this.description = description;
  }
}
