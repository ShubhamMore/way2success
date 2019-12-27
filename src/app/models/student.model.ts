export class StudentModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public name: string,
    public birthDate: string,
    public phone: string,
    public email: string,
    public address: string,
    public branch: string,
    public courseType: string,
    public course: string,
    public batch: string,
    public subjects: string[],
    public status: string
  ) {}
}
