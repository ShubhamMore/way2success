export class ImageCategoryModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public category: string;

  constructor(id: string, category: string) {
    this._id = id;
    this.category = category;
  }
}
