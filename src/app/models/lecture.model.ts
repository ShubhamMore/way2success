export class LectureModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public title: string,
    public startTime: string,
    public duration: string,
    public branch: string,
    public courseType: string,
    public course: string,
    public batch: string,
    public subject: string
  ) {}
}
