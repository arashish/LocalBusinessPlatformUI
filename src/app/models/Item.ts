export class Item {
    private item_id: String="";
	private item_name: String="";
	private description: String="";
	private category: String="";
	private inventoryqty: String="";
	private price: String="";
    private item_image: String="";
    
    constructor (item_id: string, item_name: string, description: string, category: string, inventoryqty: string, price: string){
        this.item_id = item_id;
        this.item_name = item_name;
        this.description = description;
        this.category = category;
        this.inventoryqty = inventoryqty;
        this.price = price;
    }

}