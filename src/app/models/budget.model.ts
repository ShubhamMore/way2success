export class BudgetModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public title: string,
    public amount: string,
    public type: string,
    public date: string
  ) {}
}
