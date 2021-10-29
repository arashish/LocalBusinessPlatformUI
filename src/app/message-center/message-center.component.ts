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

  constructor(private service:ApiService, private tempdata:TempdataService, private router: Router, private dialog: MatDialog) { }

  user: any;
  messageCenterDatas: any;
  messageCenterData: any;
  messageCategory!: string;

  //inboxMessages: any = [ ];
  inboxMessages: Array<MessageCenter> = [];

  ngOnInit(): void {
    this.user = this.tempdata.getloginData();
    this.messageCenterDatas = this.tempdata.getMessageCenterData();
    this.inbox();
  }

  inbox(){
    this.messageCategory = "Inbox";
    this.inboxMessages = [];
  }

  sent(){
    this.messageCategory = "Sent To";
    this.inboxMessages = [];
    for (var messageCenterData of this.messageCenterDatas) 
      {
        if (messageCenterData.messageCategory === 'INBOX' && messageCenterData.senderUsername === this.user.username)
          {
            this.inboxMessages.push(messageCenterData); //new MessageCenter(messageCenterData.messageId, messageCenterData.senderId, messageCenterData.recipientId, messageCenterData.message, messageCenterData.messageDate, messageCenterData.messageTime, messageCenterData.messageStatus, messageCenterData.messageCategory)
          }
      } 
  }

  deleted(){
    this.messageCategory = "Deleted";
    console.log("clicked deleted");
  }


  sender!: string;
  message!: string;
  messageDate!: string;
  messageTime!: string;

  displayMessage(messageId: number){
    for (var messageCenterData of this.messageCenterDatas) 
      {
        if (messageCenterData.messageId === messageId)
          {
            this.sender = messageCenterData.senderId;
            this.message = messageCenterData.message;
            this.messageDate = messageCenterData.messageDate;
            this.messageTime = messageCenterData.messageTime;
            break;
          }
      } 
  }

}
