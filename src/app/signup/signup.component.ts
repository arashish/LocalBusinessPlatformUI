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
  usertype: string ="";
  active: string ="";
  registrationdate: string ="";
  phone: string="";

  readytoclose: boolean = false;

  constructor(private service:ApiService, private router: Router, private tempData: TempdataService, private dialog: MatDialog, private dialogRef: MatDialog) { }

  ngOnInit(): void {
  }

  firstnameFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  lastnameFormControl = new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z ]*"),])
  emailFormControl = new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),])
  passwordFormControl = new FormControl('',[Validators.required,Validators.minLength(8)],)
  userTypeFormControl = new FormControl(1)

  SignUp(){
    if (!this.firstname || !this.lastname || !this.username || !this.password || !this.usertype) {
        this.tempData.setMessage("Please fill out all the information and resubmit again!");
        this.dialog.open(MessageComponent);
    } else {
      let resp = this.service.signup(new User(this.id,this.firstname, this.lastname, this.username, this.password, this.usertype, this.active, this.registrationdate, this.phone));
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
