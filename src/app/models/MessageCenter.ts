
export class MessageCenter{

    messageId : number;
    senderId: number;
    recipientId: number;
    message: string;
    messageDate: string;
    messageTime: string;
    messageStatus: string;
    messageCategory: string;

    constructor (messageId: number, senderId: number, recipientId: number, message: string, messageDate: string, messageTime: string, messageStatus: string, messageCategory: string){
        this.messageId = messageId;
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.message = message;
        this.messageDate = messageDate;
        this.messageTime = messageTime;
        this.messageStatus = messageStatus;
        this.messageCategory = messageCategory;
    }

}