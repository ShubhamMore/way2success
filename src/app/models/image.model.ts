export class ImageModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public category: string;
  public image: string;

  // tslint:disable-next-line: max-line-length
  constructor(id: string, category: string, image: string) {
    this._id = id;
    this.category = category;
    this.image = image;
  }
}
