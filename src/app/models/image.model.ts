export class ImageModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public category: string;
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

  constructor(
    id: string,
    category: string,
    imageName: string,
    secureUrl: string,
    publicId: string,
    createdAt: string,
    width: string,
    height: string
  ) {
    this._id = id;
    this.category = category;
    this.image_name = imageName;
    this.secure_url = secureUrl;
    this.public_id = publicId;
    this.created_at = createdAt;
    this.width = width;
    this.height = height;
  }
}
