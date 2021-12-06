import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { TempdataService } from '../tempdata.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';
import { User } from '../models/User';
import { FormControl, Validators } from '@angular/forms';
import { AboutComponent } from '../footer/about/about.component';
import { ContactUsComponent } from '../footer/contact-us/contact-us.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  id: string ="";
  firstname: string ="";
  lastname: string ="";
  username: string ="";
  password: string ="";
  usertype: string ="";
  registrationdate: string ="";
  phone: string="";

  address: string = "";
  city: string = "";
  state: string = "";
  zipcode: string ="";
  country: string = "";
  rating: string = "";
  searchdistance: string ="";

  loginData: any;
  user: any;

  constructor(private service:ApiService, public tempdata:TempdataService, private router: Router, private dialog: MatDialog) { }

  firstnameFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  lastnameFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  emailFormControl = new FormControl('',[Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"),])
  passwordFormControl = new FormControl('',[Validators.required, Validators.pattern("^.{8,}$"),]) //new FormControl('',[Validators.required, Validators.minLength(8)],)
  tempPasswordFormControl= new FormControl("", [Validators.required,]);
  userTypeFormControl = new FormControl('1')
  phoneFormControl = new FormControl('',[Validators.required, Validators.pattern("[0-9]{3}-[0-9]{3}-[0-9]{4}"),]) //was "^[0-9]+$"
  addressFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z0-9,. ]*"),])
  cityFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  stateFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z]{2}"),])
  countryFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  zipcodeFormControl = new FormControl('',[Validators.required, Validators.pattern("^[0-9-]{5,10}$"),])
  searchdistanceFormControl = new FormControl('',[Validators.required, Validators.pattern("^[0-9]+$"),]) //was "^[0-9]+$"

  ngOnInit(): void {
    this.loginData = this.tempdata.getloginData();
    this.user = this.loginData;
    this.id = this.loginData.id;
    this.firstname = this.loginData.firstname;
    this.lastname = this.loginData.lastname;
    this.username = this.loginData.username;
    this.password = this.loginData.password;
    this.tempPassword = this.loginData.password;
    this.usertype = this.loginData.usertype;
    this.registrationdate = this.loginData.registrationdate;
    this.phone = this.loginData.phone;

    this.address = this.loginData.address;
    this.city = this.loginData.city;
    this.state = this.loginData.state;
    this.zipcode = this.loginData.zipcode;
    
    this.country  = this.loginData.country;
    this.rating = this.loginData.rating;
    this.searchdistance = this.loginData.searchdistance;
  }

  tempPassword: string ="";
  passwordsMatch: boolean = true;
  checkPasswords(){
    if (this.tempPassword !== this.password) {
      this.passwordsMatch = false;
    } else {
      this.passwordsMatch = true;
    }
  }

  Update(){
    if (this.firstnameFormControl.hasError('pattern') || this.lastnameFormControl.hasError('pattern')  || this.emailFormControl.hasError('pattern') || this.passwordFormControl.hasError('pattern') || !this.passwordsMatch || this.phoneFormControl.hasError('pattern') || this.addressFormControl.hasError('pattern') || this.cityFormControl.hasError('pattern') || this.stateFormControl.hasError('pattern') || this.zipcodeFormControl.hasError('pattern') || this.countryFormControl.hasError('pattern') || this.searchdistanceFormControl.hasError('pattern')){
      this.tempdata.setMessage("Error: Please check your inputs and try again!");
      this.dialog.open(MessageComponent);
      return;
    }

    if (!this.firstname || !this.lastname || !this.username || !this.password || !this.usertype|| !this.address || !this.city || !this.state || !this.zipcode || !this.country || !this.searchdistance) {
      this.tempdata.setMessage("Please make sure to fill out at least these four fields: <br> -Firstname <br> -Lastname <br> -Email <br> -Password <br> -Full Address <br> -Search Distance");
      this.dialog.open(MessageComponent);
    } else {
      let resp = this.service.updateProfile(new User(this.id,this.firstname, this.lastname, this.username, this.password, this.usertype, this.registrationdate, this.phone, this.address, this.city, this.state, this.zipcode, this.country, this.rating, this.searchdistance));
      resp.subscribe(data=>{
        this.tempdata.setMessage("The accound has been successfully updated!");
        this.dialog.open(MessageComponent);
        this.router.navigate(["/home"])
      })
    }
  }

  HomePage(){
    this.router.navigate(["/home"])
  }

  footerPage(pageName: string){
    console.log(pageName);
    if (pageName=="about"){
      this.dialog.open(AboutComponent, {height: '600px',width: '450px'});
    }else if (pageName=="contactus"){
      this.dialog.open(ContactUsComponent, {height: '350px',width: '650px'});
    }    
  }


}
