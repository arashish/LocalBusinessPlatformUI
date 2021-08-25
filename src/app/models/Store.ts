export class Store {
    private storeId: String="";
	private storeName: String="";
	private phone: String="";
	private email: String="";
	private street: String="";
	private city: String="";
	private state: String="";
	private zipcode: String="";
	private publish: String="";
	private registrationDate: String="";
    private userId: String=""
    
    
    constructor (store_id: String, store_name: String, phone: String, email: String, street: String, city: String, state: String, zipcode: String, publish: String, registration_date: String, user_id: String){
        this.storeId = store_id;
        this.storeName = store_name;
        this.phone = phone;
        this.email = email;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.publish = publish;
        this.registrationDate = registration_date;
        this.userId = user_id;
    }

}