export class MediaModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public title: string;
  public branch: string;
  public courseType: string;
  public course: string;
  public batch: string;
  public subject: string;
  public link: string;
  public duration: string;
  public startTime: string;

  constructor(
    id: string,
    title: string,
    branch: string,
    courseType: string,
    course: string,
    batch: string,
    subject: string,
    link: string,
    duration: string,
    startTime: string
  ) {
    this._id = id;
    this.title = title;
    this.branch = branch;
    this.courseType = courseType;
    this.course = course;
    this.batch = batch;
    this.subject = subject;
    this.link = link;
    this.duration = duration;
    this.startTime = startTime;
  }
}
