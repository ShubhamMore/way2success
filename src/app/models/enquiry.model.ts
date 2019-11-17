export class EnquiryModel {

  // tslint:disable-next-line: variable-name
  public _id: string;
  public name: string;
  public phone: string;
  public email: string;
  public message: string;
  public date: string;
  public seen: string;
  public reply: ReplyModel[];

  // tslint:disable-next-line: variable-name
  constructor(_id: string, name: string, phone: string, email: string, message: string, date: string, seen: string, reply: ReplyModel[]) {
    this._id = _id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.message = message;
    this.date = date;
    this.seen = seen;
    this.reply = reply;
  }
}

export class ReplyModel {

  // tslint:disable-next-line: variable-name
  public _id: string;
  public subject: string;
  public message: string;
  public date: string;

  // tslint:disable-next-line: variable-name
  constructor(_id: string, subject: string, message: string, date: string) {
    this._id = _id;
    this.subject = subject;
    this.message = message;
    this.date = date;
  }
}
