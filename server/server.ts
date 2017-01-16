import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as IndexRoute from './routes/index';
import * as ProductsRoute from './routes/products';
import * as CustomersRoute from './routes/customers';

export class Server {
    private app: express.Express;

    public static bootstrap() : Server {
        return new Server();
    }

    constructor() {
        this.app = express();

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        this.setRoutes();
    }

    private setRoutes() {
        let router : express.Router = express.Router();        

        router.use(IndexRoute.Index.routes());
        router.use(ProductsRoute.Products.routes());
        router.use(CustomersRoute.Customers.routes());

        this.app.use(router);
    }

    public startServer() {
        this.app.listen(3000, function() {
            console.log('Application listening on 3000');
        });
    }
}