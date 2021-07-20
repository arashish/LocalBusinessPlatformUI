import { Store } from "./store";
import { User } from "./User";

export class UserData {
    private user: User;
    private store: Store;

    constructor (user: User, store: Store){
        this.user = user;
        this.store = store;
    }
}