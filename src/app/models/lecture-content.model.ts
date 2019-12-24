export class LectureContentModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public lecture: string;
  // tslint:disable-next-line: variable-name
  public content_name: string;
  public contentType: string;
  // tslint:disable-next-line: variable-name
  public secure_url: string;
  // tslint:disable-next-line: variable-name
  public public_id: string;
  // tslint:disable-next-line: variable-name
  public created_at: string;

  constructor(
    id: string,
    lecture: string,
    contentName: string,
    contentType: string,
    secureUrl: string,
    publicId: string,
    createdAt: string
  ) {
    this._id = id;
    this.lecture = lecture;
    this.content_name = contentName;
    this.contentType = contentType;
    this.secure_url = secureUrl;
    this.public_id = publicId;
    this.created_at = createdAt;
  }
}
