
export class MessageCenter{

    messageId : number;
    senderUsername: string;
    recipientUsername: string;
    message: string;
    messageDate: string;
    messageTime: string;
    messageStatus: string;
    messageCategory: string;

    constructor (messageId: number, senderUsername: string, recipientUsername: string, message: string, messageDate: string, messageTime: string, messageStatus: string, messageCategory: string){
        this.messageId = messageId;
        this.senderUsername = senderUsername;
        this.recipientUsername = recipientUsername;
        this.message = message;
        this.messageDate = messageDate;
        this.messageTime = messageTime;
        this.messageStatus = messageStatus;
        this.messageCategory = messageCategory;
    }

}