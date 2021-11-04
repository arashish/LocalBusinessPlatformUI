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

  recipientUsername!: string;
  senderUsername!: string;
  message!: string;

  messageObject: any;

  recipientUsernameFormControl = new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$"),])

  constructor(private tempData: TempdataService, private router: Router, private service: ApiService, private dialogRef: MatDialogRef<LoginComponent>, private dialog: MatDialog) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {return false;}; //to refresh the redirected page
  }

  ngOnInit(): void {
      this.recipientUsername = this.tempData.getMessageUsername();

      if (this.tempData.getStoreData() != null){
        this.senderUsername = this.tempData.getStoreData().email; //if a store is sending it
      } else {
        this.senderUsername = this.tempData.getloginData().username; //if a non-store people sending it
      }
  }

  sendMessage(){
    const pipe = new DatePipe('en-US');
    const now = Date.now();
    const messageDate: string = pipe.transform(now, 'MM/dd/yyyy') as string;
    const messagetime: string = pipe.transform(now, 'HH:mm:ss') as string
    
    this.messageObject = new MessageCenter(0,this.senderUsername,this.recipientUsername,this.message, messageDate, messagetime,"U","INBOX");

    let resp = this.service.updatemessage(this.messageObject);
    resp.subscribe(data=>{
      this.tempData.setMessageCenterData(data);
      this.tempData.setMessage("Your message has been sent successfully!");
      this.dialogRef.close();
      this.dialog.open(MessageComponent);
      if (this.tempData.getRequestFrom() == "MessageCenter"){ //refresh the page if the request is coming from MessageCenter
          this.router.navigate(['/messagecenter']);
      }
    })

  }

  remainingText: number=500;

  valueChange(value: string) {
    this.remainingText = 500 - new String(value).length;
   }

}
