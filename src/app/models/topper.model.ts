export class TopperModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public name: string,
    public score: string,
    public year: string,
    public details: string,
    public image: TopperImageModel
  ) {}
}

export class TopperImageModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    // tslint:disable-next-line: variable-name
    public image_name: string,
    // tslint:disable-next-line: variable-name
    public secure_url: string,
    // tslint:disable-next-line: variable-name
    public public_id: string,
    // tslint:disable-next-line: variable-name
    public created_at: string,
    public width: string,
    public height: string
  ) {}
}
