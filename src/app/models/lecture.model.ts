export class LectureModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  title: string;
  date: string;
  branch: string;
  course: string;
  batch: string;
  subject: string;

  constructor(
    id: string,
    title: string,
    date: string,
    branch: string,
    course: string,
    batch: string,
    subject: string
  ) {
    this._id = id;
    this.title = title;
    this.date = date;
    this.branch = branch;
    this.course = course;
    this.batch = batch;
    this.subject = subject;
  }
}
