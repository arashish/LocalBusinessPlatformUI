export class User {
    private id: string ="";
    private firstname: string ="";
    private lastname: string ="";
    private username: string ="";
    private password: string ="";
    private usertype: string ="";
    private active: string ="";
    private registrationdate: string ="";
    private phone: string ="";

	private address: string ="";
	private city: string = "";
	private state: string ="";
	private country: string = "";
	private rating: string ="";
    private searchdistance = "";
    

    constructor (id: string, firstname: string, lastname: string, username: string, password: string, usertype: string, active: string, registrationdate: string, phone: string, address: string, city: string, state: string, country: string, rating: string, searchdistance: string){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.usertype = usertype;
        this.active = active;
        this.registrationdate = registrationdate;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.state = state;
        this.country = country;
        this.rating = rating;
        this.searchdistance = searchdistance;
    }

}
