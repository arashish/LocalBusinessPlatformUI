import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MessageCenter } from '../models/MessageCenter';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-message-center',
  templateUrl: './message-center.component.html',
  styleUrls: ['./message-center.component.scss']
})
export class MessageCenterComponent implements OnInit {

  constructor(private service:ApiService, private tempdata:TempdataService, private router: Router, private dialog: MatDialog) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {return false;}; //to refresh the redirected page
  }

  user: any;

  messageCenterDatas: any;
  messageCenterData: any;
  messageCategory!: string;
  tempMessageCenterData: any;
  unreadMessages: number=0;
  //inboxMessages: any = [ ];
  inboxMessages: Array<MessageCenter> = [];

  ngOnInit(): void {
    this.user = this.tempdata.getloginData();
    this.messageCenterDatas = this.tempdata.getMessageCenterData();
    this.unreadMessages = 0;
    for (var messageCenterData of this.messageCenterDatas)
    {
      if (this.tempdata.getStoreData().publish == false) {
        if (messageCenterData.messageCategory === 'INBOX' && messageCenterData.recipientUsername === this.user.username && messageCenterData.messageStatus === 'U') {
          this.unreadMessages = this.unreadMessages + 1;  
        }
      } else {
        if (messageCenterData.messageCategory === 'INBOX' && messageCenterData.recipientUsername === this.tempdata.getStoreData().email && messageCenterData.messageStatus === 'U') {
          this.unreadMessages = this.unreadMessages + 1; 
        }
      }
    } 
    this.inbox();
    //To display the message after the message status changes from unread to read
    this.tempMessageCenterData = this.tempdata.getTempMessageCenterData();
    this.sender = this.tempMessageCenterData.senderUsername;
    this.recipient = this.tempMessageCenterData.recipientUsername;
    this.message = this.tempMessageCenterData.message;
    this.messageDate = this.tempMessageCenterData.messageDate;
    this.messageTime = this.tempMessageCenterData.messageTime;
    this.messageCat = this.tempMessageCenterData.messageCategory;
    //************************************************************************* */
  }

  inbox(){
    this.messageCategory = "Inbox";
    this.inboxMessages = [];
    for (var messageCenterData of this.messageCenterDatas)
    {
      console.log(messageCenterData.messageCategory);
      console.log(messageCenterData.recipientUsername);
      if (this.tempdata.getStoreData().publish == false) {
        if (messageCenterData.messageCategory === 'INBOX' && messageCenterData.recipientUsername === this.user.username) {
            this.inboxMessages.push(messageCenterData); //new MessageCenter(messageCenterData.messageId, messageCenterData.senderId, messageCenterData.recipientId, messageCenterData.message, messageCenterData.messageDate, messageCenterData.messageTime, messageCenterData.messageStatus, messageCenterData.messageCategory)
          }
      } else {
        console.log(messageCenterData.messageCategory);
        console.log(messageCenterData.recipientUsername);
        if (messageCenterData.messageCategory === 'INBOX' && messageCenterData.recipientUsername === this.tempdata.getStoreData().email) {
          this.inboxMessages.push(messageCenterData); //new MessageCenter(messageCenterData.messageId, messageCenterData.senderId, messageCenterData.recipientId, messageCenterData.message, messageCenterData.messageDate, messageCenterData.messageTime, messageCenterData.messageStatus, messageCenterData.messageCategory)
        }
      }
    }
    this.clearDisplay();
  }

  sent(){
    this.messageCategory = "Sent To";
    this.inboxMessages = [];
    for (var messageCenterData of this.messageCenterDatas) 
    if (this.tempdata.getStoreData().publish == false) {
      if (messageCenterData.messageCategory === 'INBOX' && messageCenterData.senderUsername === this.user.username) {
          this.inboxMessages.push(messageCenterData); //new MessageCenter(messageCenterData.messageId, messageCenterData.senderId, messageCenterData.recipientId, messageCenterData.message, messageCenterData.messageDate, messageCenterData.messageTime, messageCenterData.messageStatus, messageCenterData.messageCategory)
        }
    } else {
      console.log(messageCenterData.messageCategory);
      console.log(messageCenterData.recipientUsername);
      if (messageCenterData.messageCategory === 'INBOX' && messageCenterData.senderUsername === this.tempdata.getStoreData().email) {
        this.inboxMessages.push(messageCenterData); //new MessageCenter(messageCenterData.messageId, messageCenterData.senderId, messageCenterData.recipientId, messageCenterData.message, messageCenterData.messageDate, messageCenterData.messageTime, messageCenterData.messageStatus, messageCenterData.messageCategory)
      }
    }
    this.clearDisplay();
  }

  deleted(){
    this.messageCategory = "Deleted";
    console.log("clicked deleted");
    this.clearDisplay();
  }


  sender!: string;
  recipient!: string;
  message!: string;
  messageDate!: string;
  messageTime!: string;
  messageStatus!: string;
  messageCat!: string;
  
  displayMessage(messageId: number){
    for (var messageCenterData of this.messageCenterDatas) 
      {
        if (messageCenterData.messageId === messageId)
          {
            this.sender = messageCenterData.senderUsername;
            this.recipient = messageCenterData.recipientUsername;
            this.message = messageCenterData.message;
            this.messageDate = messageCenterData.messageDate;
            this.messageTime = messageCenterData.messageTime;
            this.messageStatus = "R";
            this.messageCat = messageCenterData.messageCategory;
            this.tempdata.setTempMessageCenterData(new MessageCenter(messageId,this.sender,this.recipient,this.message, this.messageDate, this.messageTime,this.messageStatus,this.messageCat));
            this.updateMessage(messageId);
            break;
          }
      } 
  }

  messageObject: any;
  updateMessage(messageId: number){
    this.messageObject = new MessageCenter(messageId,this.sender,this.recipient,this.message, this.messageDate, this.messageTime,this.messageStatus,this.messageCat);
    let resp = this.service.updatemessage(this.messageObject);
    resp.subscribe(data=>{
      this.tempdata.setMessageCenterData(data);
      this.router.navigate(['/messagecenter']);
     })
  }

  clearDisplay(){
    this.sender = "";
    this.recipient = "";
    this.message = "";
    this.messageDate = "";
    this.messageTime = "";
    this.messageStatus = "";
    this.messageCat = "";
  }
}
