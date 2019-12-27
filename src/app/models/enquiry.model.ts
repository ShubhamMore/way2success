export class EnquiryModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public name: string,
    public phone: string,
    public email: string,
    public message: string,
    public date: string,
    public seen: string,
    public reply: ReplyModel[]
  ) {}
}

export class ReplyModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public subject: string,
    public message: string,
    public date: string
  ) {}
}
