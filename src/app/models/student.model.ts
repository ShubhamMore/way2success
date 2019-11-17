export class StudentModel {
    // tslint:disable-next-line: variable-name
    public _id: string;
    public name: string;
    public birthDate: string;
    public phone: string;
    public email: string;
    public address: string;
    public branch: string;
    public course: string;
    public batch: string;
    public subjects: string[];
    public status: string;

    // tslint:disable-next-line: max-line-length
    constructor(id: string, name: string, birthDate: string, phone: string, email: string, address: string, branch: string, course: string, batch: string, subjects: string[], status: string) {
        this._id = id;
        this.name = name;
        this.birthDate = birthDate;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.branch = branch;
        this.course = course;
        this.batch = batch;
        this.subjects = subjects;
        this.status = status;
    }
}
