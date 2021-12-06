import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { TempdataService } from '../tempdata.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
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
  emailFormControl = new FormControl('',[Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"),])
  passwordFormControl = new FormControl('',[Validators.required, Validators.pattern("^.{8,}$"),]) //new FormControl('',[Validators.required, Validators.minLength(8)],)
  tempPasswordFormControl= new FormControl("", [Validators.required,]);

  userTypeFormControl = new FormControl('1')
  phoneFormControl = new FormControl('',[Validators.required, Validators.pattern("[0-9]{3}-[0-9]{3}-[0-9]{4}"),]) //was "^[0-9]+$"
  addressFormControl = new FormControl('',[Validators.required, Validators.pattern("[-a-zA-Z0-9,. ]*"),])
  cityFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  stateFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z]{2}"),])
  countryFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  zipcodeFormControl = new FormControl('',[Validators.required, Validators.pattern("^[0-9-]{5,10}$"),])
  searchdistanceFormControl = new FormControl('',[Validators.required, Validators.pattern("^[1-9]+$"),]) //was "^[0-9]+$"

  tempPassword: string ="";
  passwordsMatch: boolean = true;
  checkPasswords(){
    if (this.tempPassword !== this.password) {
      this.passwordsMatch = false;
    } else {
      this.passwordsMatch = true;
    }
  }

  SignUp(){
    if (this.firstnameFormControl.hasError('pattern') || this.lastnameFormControl.hasError('pattern')  || this.emailFormControl.hasError('pattern') || this.passwordFormControl.hasError('pattern') || !this.passwordsMatch || this.phoneFormControl.hasError('pattern') || this.addressFormControl.hasError('pattern') || this.cityFormControl.hasError('pattern') || this.stateFormControl.hasError('pattern') || this.zipcodeFormControl.hasError('pattern') || this.countryFormControl.hasError('pattern') || this.searchdistanceFormControl.hasError('pattern')){
      this.tempData.setMessage("Error: Please check your inputs and try again!");
      this.dialog.open(MessageComponent);
      return;
    }

    if (!this.firstname || !this.lastname || !this.username || !this.password || !this.usertype || !this.address || !this.city || !this.state || !this.zipcode || !this.country || !this.searchdistance) {
        this.tempData.setMessage("Please make sure to fill out at least these four fields: <br> -Firstname <br> -Lastname <br> -Email <br> -Password <br> -Full Address <br> -Search Distance");
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
