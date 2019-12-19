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
  constructor(
    id: string,
    title: string,
    branch: string,
    course: string,
    batch: string,
    subject: string,
    media: VideoModel,
    duration: string,
    startTime: string
  ) {
    this._id = id;
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

  constructor(
    id: string,
    imageName: string,
    secureUrl: string,
    publicId: string,
    createdAt: string
  ) {
    this._id = id;
    this.image_name = imageName;
    this.secure_url = secureUrl;
    this.public_id = publicId;
    this.created_at = createdAt;
  }
}
