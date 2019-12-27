export class LectureModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  title: string;
  startTime: string;
  duration: string;
  branch: string;
  courseType: string;
  course: string;
  batch: string;
  subject: string;

  constructor(
    id: string,
    title: string,
    startTime: string,
    duration: string,
    branch: string,
    courseType: string,
    course: string,
    batch: string,
    subject: string
  ) {
    this._id = id;
    this.title = title;
    this.startTime = startTime;
    this.duration = duration;
    this.branch = branch;
    this.courseType = courseType;
    this.course = course;
    this.batch = batch;
    this.subject = subject;
  }
}
