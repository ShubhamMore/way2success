export class MediaModel {

    // tslint:disable-next-line: variable-name
    public _id: string;
    public title: string;
    public branch: string;
    public course: string;
    public batch: string;
    public subject: string;
    public link: string;
    public duration: string;
    public startTime: string;

    // tslint:disable-next-line: max-line-length variable-name
    constructor(_id: string, title: string, branch: string, course: string, batch: string, subject: string, link: string, duration: string, startTime: string) {
        this._id = _id;
        this.title = title;
        this.branch = branch;
        this.course = course;
        this.batch = batch;
        this.subject = subject;
        this.link = link;
        this.duration = duration;
        this.startTime = startTime;
    }
}
