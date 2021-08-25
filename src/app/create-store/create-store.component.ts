import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MessageComponent } from '../message/message.component';
import { Store } from '../models/store';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.scss']
})
export class CreateStoreComponent implements OnInit {

  constructor(private service:ApiService, private router: Router, private tempData: TempdataService, private dialog: MatDialog, private dialogRef: MatDialog) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {return false;}; //to refresh the redirected page
  }

  ngOnInit(): void {
  }

  store_id: String="";
	store_name: String="";
	phone: String="";
	email: String="";
	street: String="";
	city: String="";
	state: String="";
	zipcode: String="";
	publish: String="";
	registration_date: String="";
  user_id: String="";

  store_nameFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  phoneFormControl = new FormControl('',[Validators.required, Validators.pattern("[0-9 ]{10}"),])
  emailFormControl = new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),])
  streetFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z0-9,. ]*"),])
  cityFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  stateFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z]*"),])
  zipcodeFormControl = new FormControl('',[Validators.required, Validators.pattern("[0-9]{5}"),])

  CreateStore(){
    if (!this.store_name || !this.phone || !this.email || !this.street || !this.city || !this.state || !this.zipcode) {
        this.tempData.setMessage("Please fill out all the information and resubmit again!");
        this.dialog.open(MessageComponent);
    } else {
      this.user_id = this.tempData.getloginData().id; //Id of the user will be used to create a store
      console.log(this.tempData);
      console.log(this.user_id);  
      let resp = this.service.createstore(new Store(this.store_id,this.store_name, this.phone, this.email, this.street, this.city, this.state, this.zipcode, this.publish, this.registration_date, this.user_id));
      resp.subscribe(data=>{
        this.tempData.setResoponseStatus(data);
        this.tempData.setMessage("The store has been successfully created!");
        this.dialogRef.closeAll();
        this.dialog.open(MessageComponent);
        this.router.navigate(["/home"])
      })
    }
  }

}
