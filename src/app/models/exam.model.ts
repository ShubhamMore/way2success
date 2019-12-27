export class ExamModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public examTitle: string;
  public outOfMarks: string;
  public passingMarks: string;
  public date: string;
  public branch: string;
  public courseType: string;
  public course: string;
  public batch: string;
  public subject: string;
  public marks: MarksModel[] = [];

  constructor(
    id: string,
    examTitle: string,
    outOfMarks: string,
    passingMarks: string,
    date: string,
    branch: string,
    courseType: string,
    course: string,
    batch: string,
    subject: string,
    marks: MarksModel[]
  ) {
    this._id = id;
    this.examTitle = examTitle;
    this.outOfMarks = outOfMarks;
    this.passingMarks = passingMarks;
    this.date = date;
    this.branch = branch;
    this.courseType = courseType;
    this.course = course;
    this.batch = batch;
    this.subject = subject;
    this.marks = marks;
  }
}

export class MarksModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public student: string;
  public marks: string;

  // tslint:disable-next-line: variable-name
  constructor(_id: string, student: string, marks: string) {
    this._id = _id;
    this.student = student;
    this.marks = marks;
  }
}
