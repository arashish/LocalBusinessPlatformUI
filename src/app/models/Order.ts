export class Order {
    private orderId: string;
    private customerId: string;
    private storeId: string
    private itemId: string;
    private itemPrice: string;
    private orderQty: string;
    private orderStatus: string;
    private orderDate: string;
    private shippedDate: string;
    private shipVia: string;

    constructor (orderId: string, customerId: string, storeId: string, itemId: string, itemPrice: string, orderQty: string, orderStatus: string, orderDate: string, shippedDate: string, shipVia: string){
        this.orderId = orderId;
        this.customerId = customerId;
        this.storeId = storeId;
        this.itemId = itemId;
        this.itemPrice = itemPrice;
        this.orderQty = orderQty;
        this.orderStatus = orderStatus;
        this.orderDate = orderDate;
        this.shippedDate = shippedDate
        this.shipVia = shipVia
    }

}