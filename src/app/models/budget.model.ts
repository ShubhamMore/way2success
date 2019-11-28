export class BudgetModel {

    // tslint:disable-next-line: variable-name
    public _id: string;
    public title: string;
    public amount: string;
    public type: string;
    public date: string;

    // tslint:disable-next-line: variable-name
    constructor(_id: string, title: string, amount: string, type: string, date: string) {
        this._id = _id;
        this.title = title;
        this.amount = amount;
        this.type = type;
        this.date = date;
    }
}
