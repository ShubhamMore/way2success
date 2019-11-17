export class AboutModel {

  // tslint:disable-next-line: variable-name
  public _id: string;
  public aim: string;
  public mission: string;
  public vision: string;

  // tslint:disable-next-line: variable-name
  constructor(_id: string, aim: string, mission: string, vision: string) {
    this._id = _id;
    this.aim = aim;
    this.mission = mission;
    this.vision = vision;
  }
}
