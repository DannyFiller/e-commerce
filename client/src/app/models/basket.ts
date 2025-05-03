import { Product } from "./product"


export interface Basket {
    basketId: string
    items: Item[]
}
  
export class Item {
    constructor(product: Product,quanity:number)
    {
        this.productId = product.id;
        this.name = product.name;
        this.price = product.price;
        this.pictureUrl = product.pictureUrl;
        this.brand = product.brand;
        this.type = product.type;
        this.quantity = quanity;
    }
    
    productId: number
    name: string
    price: number
    pictureUrl: string
    brand: string
    type: string
    quantity: number
}
