export class CourseModel {

  // tslint:disable-next-line: variable-name
  public _id: string;
  public courseName: string;
  public branch: string;
  public batch: BatchModel[];

  // tslint:disable-next-line: variable-name
  constructor(_id: string, courseName: string, branch: string, batch: BatchModel[]) {
    this._id = _id;
    this.courseName = courseName;
    this.branch = branch;
    this.batch = batch;
  }
}

export class BatchModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public batchName: string;
  public subjects: SubjectModel[];

  // tslint:disable-next-line: variable-name
  constructor(_id: string, batchname: string, subjects: SubjectModel[]) {
  this._id = _id;
  this.batchName = batchname;
  this.subjects = subjects;
  }
}


export class SubjectModel {
// tslint:disable-next-line: variable-name
public _id: string;
public subject: string;
public fee: string;

// tslint:disable-next-line: variable-name
constructor(_id: string, batchname: string, subject: string, fee: string) {
  this._id = _id;
  this.subject = subject;
  this.fee = fee;
}
}
