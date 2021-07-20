export class Store {
    private store_id: String="";
	private store_name: String="";
	private phone: String="";
	private email: String="";
	private street: String="";
	private city: String="";
	private state: String="";
	private zipcode: String="";
	private publish: String="";
	private registration_date: String="";
    private user_id: String=""
    
    
    constructor (store_id: String, store_name: String, phone: String, email: String, street: String, city: String, state: String, zipcode: String, publish: String, registration_date: String, user_id: String){
        this.store_id = store_id;
        this.store_name = store_name;
        this.phone = phone;
        this.email = email;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.publish = publish;
        this.registration_date = registration_date;
        this.user_id = user_id;
    }

}