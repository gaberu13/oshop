import { ShoppingCart } from './shopping-cart';
export class Order{
    dataPlaced:number;
    items: any[];


    constructor(public userId: string,public shipping: any, shoppingCart:ShoppingCart){
        this.dataPlaced=new Date().getTime();
        this.items=shoppingCart.items
        // .map(r=>{
        //     return{
        //       product:{
        //         title: r.title,
        //         imageUrl:r.imageUrl,
        //         price:r.price
        //       },
        //       quantity:r.quantity,
        //       totalPrice:r.totalPrice
        //     }
        //     })

    }
}