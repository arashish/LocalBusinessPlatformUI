import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { MessageComponent } from '../message/message.component';
import { MessageCenter } from '../models/MessageCenter';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-message-window',
  templateUrl: './message-window.component.html',
  styleUrls: ['./message-window.component.scss']
})
export class MessageWindowComponent implements OnInit {

  storeId!: number;
  senderId!: number;
  message!: string;

  messageObject: any;

  storeIdFormControl = new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$"),])

  constructor(private tempData: TempdataService, private router: Router, private service: ApiService, private dialogRef: MatDialogRef<LoginComponent>, private dialog: MatDialog) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {return false;}; //to refresh the redirected page
  }

  ngOnInit(): void {
    this.storeId = this.tempData.getStoreId();
    this.senderId = this.tempData.getloginData().id;
  }

  sendMessage(){
    const pipe = new DatePipe('en-US');
    const now = Date.now();
    const messageDate: string = pipe.transform(now, 'MM/dd/yyyy') as string;
    const messagetime: string = pipe.transform(now, 'HH:mm:ss') as string
    
    this.messageObject = new MessageCenter(0,this.senderId,this.storeId,this.message, messageDate, messagetime,"U");

    console.log(this.messageObject);
    let resp = this.service.createmessage(this.messageObject);
    resp.subscribe(data=>{
      this.tempData.setResoponseStatus(data);
      this.tempData.setMessage("Your message has been sent. The store representative will get back to you!");
      this.dialogRef.close();
      this.dialog.open(MessageComponent);
    })


  }

  remainingText: number=500;

  valueChange(value: string) {
    this.remainingText = 500 - new String(value).length;
   }

}
