export class TopperModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public name: string;
  public score: string;
  public year: string;
  public details: string;
  public image: string;

  // tslint:disable-next-line: max-line-length
  constructor(id: string, name: string, score: string, year: string, details: string, image: string) {
      this._id = id;
      this.name = name;
      this.score = score;
      this.year = year;
      this.details = details;
      this.image = image;
  }
}
