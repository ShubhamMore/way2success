export class AttendanceModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public date: string,
    public branch: string,
    public batch: string,
    public subject: string,
    public attendance: StudentAttendanceModel[]
  ) {}
}

export class StudentAttendanceModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public student: string,
    public attendanceStatus: string
  ) {}
}
