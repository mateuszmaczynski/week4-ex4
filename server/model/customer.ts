export class Customer {
    private id : number;
    public suspended : boolean;

    constructor(id : number, public name : string, public balance: number = 0) {
        this.id = id;
        this.suspended = false;
    }

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public setName(newName: string) {
        this.name = newName;
    }

    public updateBalance(newBalance : number) {
        this.balance = newBalance;
    }

    public addMoney(addedBalance : number) {
        this.balance += addedBalance;
    }

    public subtractMoney(subtractedBalance : number) {
        this.balance -= subtractedBalance;
    }
}