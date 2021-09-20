import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { TempdataService } from '../tempdata.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';
import { User } from '../models/User';

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
  active: string ="";
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

  constructor(private service:ApiService, private tempdata:TempdataService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loginData = this.tempdata.getloginData();
    this.user = this.loginData;
    this.id = this.loginData.id;
    this.firstname = this.loginData.firstname;
    this.lastname = this.loginData.lastname;
    this.username = this.loginData.username;
    this.password = this.loginData.password;
    this.usertype = this.loginData.usertype;
    this.active = this.loginData.active;
    this.registrationdate = this.loginData.registrationdate;
    this.phone = this.loginData.phone;

    this.address = this.loginData.address;
    this.city = this.loginData.city;
    this.state = this.loginData.state;
    this.zipcode = this.loginData.zipcode;
    
    this.country  = this.loginData.country;
    this.rating = this.loginData.rating;
    this.searchdistance = this.loginData.searchdistance;

    console.log(this.tempdata.getloginData());
    console.log(this.firstname);
  }

  Update(){
    let resp = this.service.updateProfile(new User(this.id,this.firstname, this.lastname, this.username, this.password, this.usertype, this.active, this.registrationdate, this.phone, this.address, this.city, this.state, this.zipcode, this.country, this.rating, this.searchdistance));
    resp.subscribe(data=>{
      this.tempdata.setMessage("The accound has been successfully updated!");
      this.dialog.open(MessageComponent);
      this.router.navigate(["/home"])
    })
  }

  HomePage(){
    this.router.navigate(["/home"])
  }


}
