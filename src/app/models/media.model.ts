export class MediaModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public title: string,
    public branch: string,
    public courseType: string,
    public course: string,
    public batch: string,
    public subject: string,
    public media: MediaContentModel,
    public duration: string,
    public startTime: string
  ) {}
}

export class MediaContentModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    // tslint:disable-next-line: variable-name
    public media_name: string,
    // tslint:disable-next-line: variable-name
    public secure_url: string,
    // tslint:disable-next-line: variable-name
    public public_id: string,
    // tslint:disable-next-line: variable-name
    public created_at: string
  ) {}
}
