export class Cart {
    private itemId: string;
    private itemName: string;
    private itemImage: string;
    private description: string;
    private category: string;
    private orderQty: string;
    private price: string;
    private storeId: string;
    private storeName: string;


    constructor (itemId: string, itemName: string, itemImage: string, description: string, category: string, orderQty: string, price: string, storeId: string, storeName: string){
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemImage = itemImage;
        this.description = description;
        this.category = category;
        this.orderQty = orderQty;
        this.price = price;
        this.storeId = storeId;
        this.storeName = storeName;
    }
}