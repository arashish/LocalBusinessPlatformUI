export class Order {
    private orderItemId: string;
    private orderQty: string;

    constructor (orderItemId: string, orderQty: string){
        this.orderItemId = orderItemId;
        this.orderQty = orderQty;
    }
}