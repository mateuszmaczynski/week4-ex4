import * as ProductModel from './product';

export class Products {
    private productsList : Array<ProductModel.Product>;

    constructor(products : Array<ProductModel.Product> = []) {
        this.productsList = new Array<ProductModel.Product>();

        products.forEach(
            (product) => this.productsList.push(product)
        );
    }

    public list() : Array<ProductModel.Product> {
        return this.productsList;
    }

    public add(productName : string, productQuantity : number) : Array<ProductModel.Product>  {
        let productIds : Array<number> = this.productsList.map(
            (product) => product.getId()
        );
        let productId : number = Math.max(...productIds) + 1;

        let product = new ProductModel.Product(productId, productName, productQuantity);

        this.productsList.push(product);

        return this.productsList;
    }

    public delete(productId : number) : Boolean {
        let deleted : Boolean = false;

        this.productsList = this.productsList.filter(
            (product : ProductModel.Product) => {
                deleted = deleted || product.getId() === productId;
                return product.getId() !== productId;
            }
        );

        return deleted;
    }

    public fetch(productId : number) : ProductModel.Product {
        return productId && this.productsList.filter(
            (product : ProductModel.Product) => product.getId() === productId
        ).shift();
    }

    public find(productQuery : string) : ProductModel.Product {
        let productId : number = parseInt(productQuery);
        productQuery = productQuery.toLowerCase();

        return this.productsList.filter(
            (product : ProductModel.Product) => product.getId() === productId
                || product.getName().toLowerCase() === productQuery
        ).shift();
    }
}