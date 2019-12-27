export class ExamModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public examTitle: string,
    public outOfMarks: string,
    public passingMarks: string,
    public date: string,
    public branch: string,
    public courseType: string,
    public course: string,
    public batch: string,
    public subject: string,
    public marks: MarksModel[]
  ) {}
}

export class MarksModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public student: string,
    public marks: string
  ) {}
}
