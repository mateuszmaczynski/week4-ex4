import * as CustomerModel from './Customer';

export class Customers {
    private CustomersList : Array<CustomerModel.Customer>;
    private suspendedList : Array<CustomerModel.Customer>;

    constructor(Customers : Array<CustomerModel.Customer> = []) {
        this.CustomersList = new Array<CustomerModel.Customer>();
        this.suspendedList = new Array<CustomerModel.Customer>();
        Customers.forEach(
            (Customer) => this.CustomersList.push(Customer)
        );
    }

    public suspend(suspended : CustomerModel.Customer) : CustomerModel.Customer{
        suspended.suspended = true;
        this.suspendedList.push(suspended);
        return suspended;
    }

    public list() : Array<CustomerModel.Customer> {
        return this.CustomersList;
    }

    public add(CustomerName : string, CustomerBalance : number) : Array<CustomerModel.Customer>  {
        let CustomerIds : Array<number> = this.CustomersList.map(
            (Customer) => Customer.getId()
        );
        let CustomerId : number = Math.max(...CustomerIds) + 1;

        let Customer = new CustomerModel.Customer(CustomerId, CustomerName, CustomerBalance);

        this.CustomersList.push(Customer);

        return this.CustomersList;
    }

    public delete(CustomerId : number) : Boolean {
        let deleted : Boolean = false;

        this.CustomersList = this.CustomersList.filter(
            (Customer : CustomerModel.Customer) => {
                deleted = deleted || Customer.getId() === CustomerId;
                return Customer.getId() !== CustomerId;
            }
        );

        return deleted;
    }

    public fetch(CustomerId : number) : CustomerModel.Customer {
        return CustomerId && this.CustomersList.filter(
            (Customer : CustomerModel.Customer) => Customer.getId() === CustomerId
        ).shift();
    }

    public find(CustomerQuery : string) : CustomerModel.Customer {
        let CustomerId : number = parseInt(CustomerQuery);
        CustomerQuery = CustomerQuery.toLowerCase();

        return this.CustomersList.filter(
            (Customer : CustomerModel.Customer) => Customer.getId() === CustomerId
                || Customer.getName().toLowerCase() === CustomerQuery
        ).shift();
    }
}