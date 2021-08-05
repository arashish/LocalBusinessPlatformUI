export class ItemWrapper {
    private itemId: string="";
	private itemName: string="";
	private description: string="";
	private category: string="";
	private inventoryQty: string="";
	private price: string="";
    private itemImage: any;
    private storeId: string=""; 
    
    constructor (item_id: string, item_name: string, description: string, category: string, inventoryqty: string, price: string, itemImage: any, store_id: string){
        this.itemId = item_id;
        this.itemName = item_name;
        this.description = description;
        this.category = category;
        this.inventoryQty = inventoryqty;
        this.price = price;
        this.itemImage = itemImage;
        this.storeId = store_id;
    }

}