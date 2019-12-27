export class CourseModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public courseName: string,
    public courseType: string,
    public branch: string,
    public batch: BatchModel[]
  ) {}
}

export class BatchModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public batchName: string,
    public subjects: SubjectModel[]
  ) {}
}

export class SubjectModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public subject: string,
    public fee: string
  ) {}
}
