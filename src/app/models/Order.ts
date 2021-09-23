export class Order {
    private itemId: string;
    private itemName: string;
    private itemImage: string;
    private description: string;
    private category: string;
    private orderQty: string;
    private price: string;
    private sellerId: string;
    private sellerName: string;


    constructor (itemId: string, itemName: string, itemImage: string, description: string, category: string, orderQty: string, price: string, sellerId: string, sellerName: string){
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemImage = itemImage;
        this.description = description;
        this.category = category;
        this.orderQty = orderQty;
        this.price = price;
        this.sellerId = sellerId;
        this.sellerName = sellerName;
    }
}