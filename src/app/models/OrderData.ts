import { ItemWrapper } from "./ItemWrapper";
import { Order } from "./Order";
import { Store } from "./store";
import { User } from "./User";

export class OrderData {
    
    private order: Order;
    private customer: User;
    private store: Store;
    private item: ItemWrapper;

    constructor (order: Order, customer: User, store: Store, item: ItemWrapper){
        this.order = order;
        this.customer = customer;
        this.store = store;
        this.item = item;
    }
}