export class ItemWrapper {
    private itemId: string="";
	private itemName: string="";
	private description: string="";
	private category: string="";
	private inventoryQty: string="";
	private price: string="";
    private storeId: string=""; 
    
    constructor (item_id: string, item_name: string, description: string, category: string, inventoryqty: string, price: string, store_id: string){
        this.itemId = item_id;
        this.itemName = item_name;
        this.description = description;
        this.category = category;
        this.inventoryQty = inventoryqty;
        this.price = price;
        this.storeId = store_id;
    }

}