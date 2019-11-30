export class TopperModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public name: string;
  public score: string;
  public year: string;
  public details: string;
  public image: TopperImageModel;

  // tslint:disable-next-line: max-line-length
  constructor(id: string, name: string, score: string, year: string, details: string, image: TopperImageModel) {
      this._id = id;
      this.name = name;
      this.score = score;
      this.year = year;
      this.details = details;
      this.image = image;
  }
}

export class TopperImageModel {
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
  public width: string;
  public height: string;

  // tslint:disable-next-line: max-line-length variable-name
  constructor(_id: string, image_name: string, secure_url: string, public_id: string, created_at: string, width: string, height: string) {
    this._id = _id;
    this.image_name = image_name;
    this.secure_url = secure_url;
    this.public_id = public_id;
    this.created_at = created_at;
    this.width = width;
    this.height = height;
  }
}

