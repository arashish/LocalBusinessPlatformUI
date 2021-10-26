
export class MessageCenter{

    messageId : number;
    senderId: number;
    recipientId: number;
    message: string;
    messageDate: string;
    messageTime: string;
    messageStatus: string;

    constructor (messageId: number, senderId: number, recipientId: number, message: string, messageDate: string, messageTime: string, messageStatus: string){
        this.messageId = messageId;
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.message = message;
        this.messageDate = messageDate;
        this.messageTime = messageTime;
        this.messageStatus = messageStatus;        
    }

}