import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AboutComponent } from '../footer/about/about.component';
import { ContactUsComponent } from '../footer/contact-us/contact-us.component';
import { MessageWindowComponent } from '../message-window/message-window.component';
import { MessageCenter } from '../models/MessageCenter';
import { TempdataService } from '../tempdata.service';

@Component({
  selector: 'app-message-center',
  templateUrl: './message-center.component.html',
  styleUrls: ['./message-center.component.scss']
})
export class MessageCenterComponent implements OnInit {

  constructor(private service:ApiService, public tempdata:TempdataService, private router: Router, private dialog: MatDialog) { 
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
      if (this.tempdata.getloginData().usertype == 'buyer') {
        if (messageCenterData.messageCategory === 'INBOX' && messageCenterData.recipientUsername === this.user.username && messageCenterData.messageStatus === 'U') {
          this.unreadMessages = this.unreadMessages + 1;  
        }
      } else if (this.tempdata.getloginData().usertype == 'seller') {
        if (messageCenterData.messageCategory === 'INBOX' && messageCenterData.recipientUsername === this.tempdata.getStoreData().email && messageCenterData.messageStatus === 'U') {
          this.unreadMessages = this.unreadMessages + 1; 
        }
      }
    } 
    this.inbox();
    //To display the message after the message status changes from unread to read
    if (this.tempdata.getTempMessageCenterData() != null) {
      this.tempMessageCenterData = this.tempdata.getTempMessageCenterData();
      this.messageId = this.tempMessageCenterData.messageId;
      this.sender = this.tempMessageCenterData.senderUsername;
      this.recipient = this.tempMessageCenterData.recipientUsername;
      this.message = this.tempMessageCenterData.message;
      this.messageDate = this.tempMessageCenterData.messageDate;
      this.messageTime = this.tempMessageCenterData.messageTime;
      this.messageStatus = this.tempMessageCenterData.messageStatus;
      this.messageCat = this.tempMessageCenterData.messageCategory;
    }
    this.tempdata.setMessageCenterNotifications(this.unreadMessages); //new notification after an update
    //************************************************************************* */
  }

  inbox(){
    this.messageCategory = "Inbox";
    this.inboxMessages = [];
    this.messageId = 0; //reset
    for (var messageCenterData of this.messageCenterDatas)
    {
      if (this.tempdata.getloginData().usertype == 'buyer') { 
          if (messageCenterData.messageCategory === 'INBOX' && messageCenterData.recipientUsername === this.user.username) {
            this.inboxMessages.push(messageCenterData); //new MessageCenter(messageCenterData.messageId, messageCenterData.senderId, messageCenterData.recipientId, messageCenterData.message, messageCenterData.messageDate, messageCenterData.messageTime, messageCenterData.messageStatus, messageCenterData.messageCategory)
        }
      } else if (this.tempdata.getloginData().usertype == 'seller') {
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
    this.messageId = 0; //reset
    for (var messageCenterData of this.messageCenterDatas)
    {
      if (this.tempdata.getloginData().usertype == 'buyer') { 
            if (messageCenterData.messageCategory === 'INBOX' && messageCenterData.senderUsername === this.user.username) {
            this.inboxMessages.push(messageCenterData); //new MessageCenter(messageCenterData.messageId, messageCenterData.senderId, messageCenterData.recipientId, messageCenterData.message, messageCenterData.messageDate, messageCenterData.messageTime, messageCenterData.messageStatus, messageCenterData.messageCategory)
        }
      } else if (this.tempdata.getloginData().usertype == 'seller') {
        if (messageCenterData.messageCategory === 'INBOX' && messageCenterData.senderUsername === this.tempdata.getStoreData().email) {
          this.inboxMessages.push(messageCenterData); //new MessageCenter(messageCenterData.messageId, messageCenterData.senderId, messageCenterData.recipientId, messageCenterData.message, messageCenterData.messageDate, messageCenterData.messageTime, messageCenterData.messageStatus, messageCenterData.messageCategory)
        }
      }
    }
    this.clearDisplay();
  }

  deleted(){
    this.messageCategory = "Deleted";
    this.inboxMessages = [];
    this.messageId = 0; //reset
    console.log(this.messageCenterDatas);

    for (var messageCenterData of this.messageCenterDatas)
    {
      if (this.tempdata.getloginData().usertype == 'buyer') { 
            if (messageCenterData.messageCategory === 'DELETED' && messageCenterData.recipientUsername === this.user.username) {
            this.inboxMessages.push(messageCenterData); //new MessageCenter(messageCenterData.messageId, messageCenterData.senderId, messageCenterData.recipientId, messageCenterData.message, messageCenterData.messageDate, messageCenterData.messageTime, messageCenterData.messageStatus, messageCenterData.messageCategory)
        }
      } else if (this.tempdata.getloginData().usertype == 'seller') {
        if (messageCenterData.messageCategory === 'DELETED' && messageCenterData.recipientUsername === this.tempdata.getStoreData().email) {
          this.inboxMessages.push(messageCenterData); //new MessageCenter(messageCenterData.messageId, messageCenterData.senderId, messageCenterData.recipientId, messageCenterData.message, messageCenterData.messageDate, messageCenterData.messageTime, messageCenterData.messageStatus, messageCenterData.messageCategory)
        }
      }
    }
    this.clearDisplay();
  }

  messageId: number=0;
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
            this.messageId = messageCenterData.messageId;
            this.sender = messageCenterData.senderUsername;
            this.recipient = messageCenterData.recipientUsername;
            this.message = messageCenterData.message;
            this.messageDate = messageCenterData.messageDate;
            this.messageTime = messageCenterData.messageTime;
            this.messageStatus = "R";
            this.messageCat = messageCenterData.messageCategory;
            this.tempdata.setTempMessageCenterData(new MessageCenter(messageId,this.sender,this.recipient,this.message, this.messageDate, this.messageTime,this.messageStatus,this.messageCat));
            if (this.messageCategory == "Inbox"){
                this.updateMessage(messageId);
            }
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

  reply(){
    this.tempdata.setRequestFrom("MessageCenter");
    this.tempdata.setMessageUsername(this.sender);
    this.dialog.open(MessageWindowComponent);
  }

  delete(){
    if(confirm("Are you sure to delete?")) {
      this.messageObject = new MessageCenter(this.messageId,this.sender,this.recipient,this.message, this.messageDate, this.messageTime,this.messageStatus,"DELETED");
      let resp = this.service.updatemessage(this.messageObject);
      resp.subscribe(data=>{
        this.tempdata.setMessageCenterData(data);
        this.tempdata.setMessage("The message has been deleted!");
        this.messageId = 0; //reset
        this.tempdata.setTempMessageCenterData(null);
        this.clearDisplay();
        this.router.navigate(['/messagecenter']);
       })
    }
  }

  deletePermanently(){
    if(confirm("Are you sure you want to delete this permanenlty?")) {
      this.messageObject = new MessageCenter(this.messageId,this.sender,this.recipient,this.message, this.messageDate, this.messageTime,this.messageStatus,"DELETED");
      let resp = this.service.deletemessage(this.messageObject);
      resp.subscribe(data=>{
        this.tempdata.setMessageCenterData(data);
        this.messageCenterDatas = data;
        this.tempdata.setMessage("The message has been deleted permanently!");
        this.messageId = 0; //reset
        this.tempdata.setTempMessageCenterData(null);
        this.clearDisplay();
        this.deleted();
       })
    }
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
