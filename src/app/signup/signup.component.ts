import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { TempdataService } from '../tempdata.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../models/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  id: string ="";
  firstname: string ="";
  lastname: string ="";
  username: string ="";
  password: string ="";
  usertype: string ="buyer"; //default
  registrationdate: string ="";
  phone: string="";

  address: string ="";
  city: string = "";
  state: string = "";
  zipcode: string =""; 
  country: string = "";
  rating: string = "0";
  searchdistance: string = "5";
  
  readytoclose: boolean = false;

  constructor(private service:ApiService, private router: Router, private tempData: TempdataService, private dialog: MatDialog, private dialogRef: MatDialog) { }

  ngOnInit(): void {
  }

  firstnameFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  lastnameFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  emailFormControl = new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),])
  passwordFormControl = new FormControl('',[Validators.required, Validators.minLength(8)],)
  userTypeFormControl = new FormControl('1')
  phoneFormControl = new FormControl('',[Validators.required, Validators.pattern("[0-9 ]{10}"),]) //was "^[0-9]+$"
  addressFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z0-9,. ]*"),])
  cityFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  stateFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z]{2}"),])
  countryFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  zipcodeFormControl = new FormControl('',[Validators.required, Validators.pattern("^[0-9-]{5,10}$"),])
  searchdistanceFormControl = new FormControl('',[Validators.required, Validators.pattern("^[0-9]+$"),]) //was "^[0-9]+$"

  SignUp(){
    if (!this.firstname || !this.lastname || !this.username || !this.password || !this.usertype) {
        this.tempData.setMessage("Please make sure to fill out at least these four fields: <br> -Firstname <br> -Lastname <br> -Email <br> -Password");
        this.dialog.open(MessageComponent);
    } else {
      let resp = this.service.signup(new User(this.id,this.firstname, this.lastname, this.username, this.password, this.usertype, this.registrationdate, this.phone, this.address, this.city, this.state.toUpperCase(), this.zipcode, this.country, this.rating, this.searchdistance));
      resp.subscribe(data=>{
        this.tempData.setResoponseStatus(data);
        this.tempData.setMessage("The accound has been successfully created!");
        this.dialogRef.closeAll();
        this.dialog.open(MessageComponent);
        this.router.navigate(["/login"])
      })
    }
  }
}
