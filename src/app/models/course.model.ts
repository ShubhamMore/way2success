export class CourseModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public courseName: string;
  public branch: string;
  public batch: BatchModel[];

  constructor(id: string, courseName: string, branch: string, batch: BatchModel[]) {
    this._id = id;
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

  constructor(id: string, batchname: string, subjects: SubjectModel[]) {
    this._id = id;
    this.batchName = batchname;
    this.subjects = subjects;
  }
}

export class SubjectModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public subject: string;
  public fee: string;

  constructor(id: string, batchname: string, subject: string, fee: string) {
    this._id = id;
    this.subject = subject;
    this.fee = fee;
  }
}
