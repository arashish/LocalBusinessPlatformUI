import { ItemWrapper } from "./ItemWrapper";
import { Store } from "./store";
import { User } from "./User";

export class UserData {
    private user: User;
    private store: Store;
    private item: ItemWrapper[];

    constructor (user: User, store: Store, item: ItemWrapper[]){
        this.user = user;
        this.store = store;
        this.item = item;
    }
}