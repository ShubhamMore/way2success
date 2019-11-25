export class MediaModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public title: string;
  public branch: string;
  public course: string;
  public batch: string;
  public subject: string;
  public media: VideoModel;
  public duration: string;
  public startTime: string;
  // tslint:disable-next-line: max-line-length variable-name
  constructor(_id: string, title: string, branch: string, course: string, batch: string, subject: string, media: VideoModel, duration: string, startTime: string) {
    this._id = _id;
    this.title = title;
    this.branch = branch;
    this.course = course;
    this.batch = batch;
    this.subject = subject;
    this.media = media;
    this.duration = duration;
    this.startTime = startTime;
  }
}

export class VideoModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  // tslint:disable-next-line: variable-name
  public image_name: string;
  // tslint:disable-next-line: variable-name
  public secure_url: string;
  // tslint:disable-next-line: variable-name
  public public_id: string;
  // tslint:disable-next-line: variable-name
  public created_at: string;

  // tslint:disable-next-line: max-line-length variable-name
  constructor(_id: string, image_name: string, secure_url: string, public_id: string, created_at: string) {
    this._id = _id;
    this.image_name = image_name;
    this.secure_url = secure_url;
    this.public_id = public_id;
    this.created_at = created_at;
  }
}
