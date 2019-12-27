export class LectureContentModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public lecture: string,
    // tslint:disable-next-line: variable-name
    public content_name: string,
    public contentType: string,
    // tslint:disable-next-line: variable-name
    public secure_url: string,
    // tslint:disable-next-line: variable-name
    public public_id: string,
    // tslint:disable-next-line: variable-name
    public created_at: string
  ) {}
}
