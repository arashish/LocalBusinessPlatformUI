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
    

    constructor (id: string, firstname: string, lastname: string, username: string, password: string, usertype: string, active: string, registrationdate: string, phone: string ){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.usertype = usertype;
        this.active = active;
        this.registrationdate = registrationdate;
        this.phone = phone;
    }

}
