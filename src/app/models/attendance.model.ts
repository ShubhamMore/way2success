export class AttendanceModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public date: string;
  public branch: string;
  public batch: string;
  public subject: string;
  public attendance: StudentAttendanceModel[] = [];

  constructor(
    id: string,
    date: string,
    branch: string,
    batch: string,
    subject: string,
    attendance: StudentAttendanceModel[]
  ) {
    this._id = id;
    this.date = date;
    this.branch = branch;
    this.batch = batch;
    this.subject = subject;
    this.attendance = attendance;
  }
}

export class StudentAttendanceModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public student: string;
  public attendanceStatus: string;

  // tslint:disable-next-line: variable-name
  constructor(_id: string, student: string, attendanceStatus: string) {
    this._id = _id;
    this.student = student;
    this.attendanceStatus = attendanceStatus;
  }
}
