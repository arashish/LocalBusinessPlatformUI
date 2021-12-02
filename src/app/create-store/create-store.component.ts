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

  storeData:any;
  isUpdateButtonVisible!: boolean;
  isDeleteButtonVisible!: boolean;
  isSaveButtonVisible!: boolean;

  ngOnInit(): void {
    if (this.tempData.getStoreData() != null){
          this.storeData = this.tempData.getStoreData();
          this.store_id = this.storeData.storeId;
          this.store_name = this.storeData.storeName;
          this.phone = this.storeData.phone;
          this.email = this.storeData.email;
          this.street = this.storeData.street;
          this.city = this.storeData.city;
          this.state = this.storeData.state;
          this.zipcode = this.storeData.zipcode;
          this.country = this.storeData.country;
          this.publish = this.storeData.publish;
          this.registration_date = this.storeData.registrationDate;
          this.user_id = this.storeData.userId;

          this.isUpdateButtonVisible = true;
          this.isDeleteButtonVisible = true;
          this.isSaveButtonVisible = false;
        } 

      else {
      this.isUpdateButtonVisible = false;
      this.isDeleteButtonVisible = false;
      this.isSaveButtonVisible = true;
    }
  }

  store_id: string="";
	store_name: string="";
	phone: string="";
	email: string="";
	street: string="";
	city: string="";
	state: string="";
	zipcode: string="";
  country: string="";
	publish: string="";
	registration_date: string="";
  user_id: string="";

  store_nameFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  phoneFormControl = new FormControl('',[Validators.required, Validators.pattern("[0-9 ]{10}"),])
  emailFormControl = new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),])
  streetFormControl = new FormControl('',[Validators.required, Validators.pattern("[-a-zA-Z0-9,. ]*"),])
  cityFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  stateFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z]{2}"),])
  countryFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  zipcodeFormControl = new FormControl('',[Validators.required, Validators.pattern("^[0-9-]{5,10}$"),])

  CreateStore(){
    if (this.store_nameFormControl.hasError('pattern') || this.phoneFormControl.hasError('pattern') || this.emailFormControl.hasError('pattern') || this.streetFormControl.hasError('pattern') || this.cityFormControl.hasError('pattern') || this.stateFormControl.hasError('pattern') || this.countryFormControl.hasError('pattern') || this.zipcodeFormControl.hasError('pattern')){
      this.tempData.setMessage("Please check your inputs and try again!");
      this.dialog.open(MessageComponent);
      return;
    }

    if (!this.store_name || !this.phone || !this.email || !this.street || !this.city || !this.state || !this.zipcode) {
        this.tempData.setMessage("Please fill out all the information and resubmit again!");
        this.dialog.open(MessageComponent);
    } else {
      this.user_id = this.tempData.getloginData().id; //Id of the user will be used to create a store
      let resp = this.service.createstore(new Store(this.store_id,this.store_name, this.phone, this.email, this.street, this.city, this.state, this.zipcode, this.country, this.publish, this.registration_date, this.user_id));
      resp.subscribe(data=>{
        this.tempData.setResoponseStatus(data);
        this.dialogRef.closeAll();
        this.tempData.setMessage("The store has been successfully saved!");
        this.dialog.open(MessageComponent);
        this.router.navigate(["/home"])
      })
    }
  }

  DeleteStore(){
    if (this.store_id != null){
      console.log(this.store_id);
      let resp = this.service.deleteStore(this.store_id);
      resp.subscribe(data=>{
        this.tempData.setResoponseStatus(data);
        this.tempData.setMessage("The store has been successfully deleted!");
        this.dialogRef.closeAll();
        this.dialog.open(MessageComponent);
        this.router.navigate(['/home']);
      })
    }
  }

}
