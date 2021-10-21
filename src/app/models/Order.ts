export class Order {
    private orderId: string;
    private customerId: string;
    private storeId: string
    private itemId: string;
    private itemPrice: string;
    private orderQty: string;
    private orderStatus: string;
    private orderDate: string;
    private paymentMethod: string;
    private shipMethod: string;
    private shippedDate: string;
    private shipVia: string;
    private shipTracking: string;
    

    constructor (orderId: string, customerId: string, storeId: string, itemId: string, itemPrice: string, orderQty: string, orderStatus: string, orderDate: string, paymentMethod: string, shipMethod: string, shippedDate: string, shipVia: string, shipTracking: string){
        this.orderId = orderId;
        this.customerId = customerId;
        this.storeId = storeId;
        this.itemId = itemId;
        this.itemPrice = itemPrice;
        this.orderQty = orderQty;
        this.orderStatus = orderStatus;
        this.orderDate = orderDate;
        this.paymentMethod = paymentMethod;
        this.shipMethod =shipMethod;
        this.shippedDate = shippedDate;
        this.shipVia = shipVia;
        this.shipTracking = shipTracking;
    }

}