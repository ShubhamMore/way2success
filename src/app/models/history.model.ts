export class StudentHistoryModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public student: string;
  public history: HistoryModel[] = [];

  // tslint:disable-next-line: variable-name
  constructor(_id: string, student: string, history: HistoryModel[]) {
    this._id = _id;
    this.student = student;
    this.history = history;
  }
}

export class HistoryModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public date: string;
  public course: string;
  public batches: StudentHistoryBatch[];

  constructor(
    id: string,
    date: string,
    course: string,
    batches: StudentHistoryBatch[]
  ) {
    this._id = id;
    this.date = date;
    this.course = course;
    this.batches = batches;
  }
}

export class StudentHistoryBatch {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public batch: string;
  public subjects: string[];

  constructor(id: string, batch: string, subjects: string[]) {
    this._id = id;
    this.batch = batch;
    this.subjects = subjects;
  }
}
