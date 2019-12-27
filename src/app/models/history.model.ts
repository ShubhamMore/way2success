export class StudentHistoryModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public student: string,
    public history: HistoryModel[]
  ) {}
}

export class HistoryModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public date: string,
    public course: string,
    public batches: StudentHistoryBatch[]
  ) {}
}

export class StudentHistoryBatch {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public batch: string,
    public subjects: string[]
  ) {}
}
