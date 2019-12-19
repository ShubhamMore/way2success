export class AboutModel {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public aim: string;
  public mission: string;
  public vision: string;

  constructor(id: string, aim: string, mission: string, vision: string) {
    this._id = id;
    this.aim = aim;
    this.mission = mission;
    this.vision = vision;
  }
}
