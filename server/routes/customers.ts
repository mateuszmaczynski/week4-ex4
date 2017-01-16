import * as express from 'express';
import * as Customer from '../model/customer';
import * as CustomersModel from '../model/customers';

export class Customers {
    private CustomerList : CustomersModel.Customers;
    private suspendedList : Array <Customer.Customer> = [];

    public static routes() : express.Router {
        let router : express.Router = express.Router();
        let CustomersRoute : Customers = new Customers();

        router.get('/customers/', CustomersRoute.index.bind(CustomersRoute));
        router.post('/customers/', CustomersRoute.create.bind(CustomersRoute));
        router.put('/customers/:customer_id', CustomersRoute.update.bind(CustomersRoute));
        router.delete('/Customers/:Customer_id', CustomersRoute.delete.bind(CustomersRoute));
        router.get('/customers/:customer', CustomersRoute.find.bind(CustomersRoute));
        router.post('/customers/delete/:customer_id', CustomersRoute.delete.bind(CustomersRoute));
        router.post('/customers/update/:customer_id', CustomersRoute.update.bind(CustomersRoute));
        router.post('/customers/suspend/:customer_id', CustomersRoute.suspend.bind(CustomersRoute));
        //lista pod customers/suspended
        return router;
    }

    constructor() {
        this.CustomerList = new CustomersModel.Customers([
            new Customer.Customer(1, 'Mike', 1000),
            new Customer.Customer(2, 'Bob', 200),
            new Customer.Customer(3, 'Ross')
        ]);
 
    }

    public suspend(req : express.Request, res : express.Response){
        
        let CustomerId: number = parseInt(req.params.customer_id);
        let Customer: Customer.Customer = this.CustomerList.fetch(CustomerId);
 
        if (!Customer) {
            res.status(404).send('Customer not found');
            return;
        }
        if (Customer.suspended){
            res.send('Customer already suspended');
            return;           
        }

        Customer = this.CustomerList.suspend(Customer);
        this.suspendedList.push(Customer);
        res.json(this.suspendedList);     

    }

    public index(req : express.Request, res : express.Response) {
        res.json(this.CustomerList.list());
    }

    public create(req : express.Request, res : express.Response) {
        let CustomerName : string = req.body.customer_name;
        let CustomerBalance : number = parseInt(req.body.balance) || 0;

        if (!CustomerName) {
            res.status(500).send('Customer name not found');
            return;
        }

        res.json(this.CustomerList.add(CustomerName, CustomerBalance));
    }

    public delete(req : express.Request, res : express.Response) {
        let CustomerId : number = parseInt(req.params.customer_id);
        let wasDeleted : Boolean = this.CustomerList.delete(CustomerId);

        if (!wasDeleted) {
            res.status(404).send('Customer not found');
            return;
        } else {
            res.json({success: true});
        }
    }

    public update(req: express.Request, res: express.Response) {
        let CustomerId: number = parseInt(req.params.customer_id);
        let Customer: Customer.Customer = this.CustomerList.fetch(CustomerId);
        let CustomerName: string = req.body.customer_name;
        let CustomerBalance: string = req.body.balance;

        if (!Customer) {
            res.status(404).send('Customer not found');
            return;
        }

        if (CustomerName !== undefined) {
            Customer.setName(CustomerName);
        }

        if (CustomerBalance !== undefined) {
            Customer.updateBalance(parseInt(CustomerBalance, 10));
        }

        res.json(Customer);
    }

    public find(req : express.Request, res : express.Response) {
        let CustomerQuery : string = req.params.customer;
        let Customer : Customer.Customer = this.CustomerList.find(CustomerQuery);

        if(CustomerQuery==='suspended'){
            res.json(this.suspendedList);
            return;
        }
        
        if (!Customer) {
            res.status(404).send('Customer not found');
            return;
        }

        res.json(Customer);
    }
}