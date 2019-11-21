export class ShoppingCartItem{
  title: any;
  imageUrl: any;
  price: any;
    // product: any;
    // quantity: number;
    constructor(public product: any, public quantity: number ){}
    get totalPrice(){return this.product.price * this.quantity}
}