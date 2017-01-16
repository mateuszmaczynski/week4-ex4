import * as express from 'express';
import * as Product from '../model/product';
import * as ProductsModel from '../model/products';

export class Products {
    private productList : ProductsModel.Products;

    public static routes() : express.Router {
        let router : express.Router = express.Router();
        let productsRoute : Products = new Products();

        router.get('/products/', productsRoute.index.bind(productsRoute));
        router.post('/products/', productsRoute.create.bind(productsRoute));
        router.put('/products/:product_id', productsRoute.update.bind(productsRoute));
        router.delete('/products/:product_id', productsRoute.delete.bind(productsRoute));
        router.get('/products/:product', productsRoute.find.bind(productsRoute));
        router.post('/products/delete/:product_id', productsRoute.delete.bind(productsRoute));
        router.post('/products/update/:product_id', productsRoute.update.bind(productsRoute));

        return router;
    }

    constructor() {
        this.productList = new ProductsModel.Products([
            new Product.Product(1, 'ABC', 1),
            new Product.Product(2, 'DEF', 12),
            new Product.Product(3, 'GHI')
        ]);
    }

    public index(req : express.Request, res : express.Response) {
        res.json(this.productList.list());
    }

    public create(req : express.Request, res : express.Response) {
        let productName : string = req.body.product_name;
        let productQuantity : number = parseInt(req.body.quantity) || 0;

        if (!productName) {
            res.status(500).send('Product name not found');
            return;
        }

        res.json(this.productList.add(productName, productQuantity));
    }

    public delete(req : express.Request, res : express.Response) {
        let productId : number = parseInt(req.params.product_id);
        let wasDeleted : Boolean = this.productList.delete(productId);

        if (!wasDeleted) {
            res.status(404).send('Product not found');
            return;
        } else {
            res.json({success: true});
        }
    }

    public update(req: express.Request, res: express.Response) {
        let productId: number = parseInt(req.params.product_id);
        let product: Product.Product = this.productList.fetch(productId);
        let productName: string = req.body.product_name;
        let productQuantity: string = req.body.quantity;

        if (!product) {
            res.status(404).send('Product not found');
            return;
        }

        if (productName !== undefined) {
            product.setName(productName);
        }

        if (productQuantity !== undefined) {
            product.updateQuantity(parseInt(productQuantity, 10));
        }

        res.json(product);
    }

    public find(req : express.Request, res : express.Response) {
        let productQuery : string = req.params.product;
        let product : Product.Product = this.productList.find(productQuery);

        if (!product) {
            res.status(404).send('Product not found');
            return;
        }

        res.json(product);
    }
}