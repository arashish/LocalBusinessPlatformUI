import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempdataService {



  private loginData: any;
  private storeData: any;
  private itemData!: any;
  private messageCenterData!: any;
  private searchData!: any;
  private orderData!: any;
  private token: any;
  private responseStatus: any;
  private message: string="";
  private rowNumber!: number;
  private cartItems: any = [ ];
  private orderId!: number;
  private messageUsername!: string;
  private tempMessageCenterData!: any;
  private requestFrom!: string;

  constructor() { 
  }

  public resetData(){ //for resetting temps when the user logs out
    this.loginData = "";
    this.storeData = "";
    this.itemData = "";
    this.searchData = "";
    this.messageCenterData = "";
    this.token = "";
    this.responseStatus = "";
    this.message = "";
    this.rowNumber = 0;
    this.cartItems = [];
    this.orderData = "";
    this.orderId =0;
    this.messageUsername ="";
    this.tempMessageCenterData = "";
    this.requestFrom = "";
  }

  public  getloginData(){
      return this.loginData;
  }

  public setLoginData(loginData: any){
    this.loginData = loginData;
  }

  public  getStoreData(){
    return this.storeData;
}

public setStoreData(storeData: any){
  this.storeData = storeData;
}

public  getItemData(){
  return this.itemData;
}

public setSearchData(searchData: any){
  this.searchData = searchData;
}

public  getSearchData(){
  return this.searchData;
}

public setItemData(itemData: any){
this.itemData = itemData;
}


public getMessageCenterData(){
  return this.messageCenterData;
}

public setMessageCenterData(messageCenterData: any){
  this.messageCenterData = messageCenterData;
}
  public  getResponseStatus(){
    return this.responseStatus;
  }

  public setResoponseStatus(responseStatus: any){
    this.responseStatus = responseStatus;
  }

  public  getToken(){
    return this.token;
  }

  public setToken(token: any){
    this.token = token;
  }

  public  getMessage(){
    return this.message;
  }

  public setMessage(message: any){
    this.message = message;
  }

  public  getCartItems(){
    return this.cartItems;
  }

  public setCartItems(cartItems: any){
    this.cartItems = cartItems;
  }

  public  getRowNumber(){
    return this.rowNumber;
  }

  public setRowNumber(rowNumber: number){
    this.rowNumber = rowNumber;
  }

  public getOrderData(){
    return this.orderData;
  }

  public setOrderData(orderData: any){
    this.orderData = orderData;
  }


  public getOrderId(){
    return this.orderId;
  }

  public setOrderId(orderId: number){
    this.orderId = orderId;
  }

  public getMessageUsername(){
    return this.messageUsername;
  }

  public setMessageUsername(messageUsername: string){
    this.messageUsername = messageUsername;
  }

  public getTempMessageCenterData(){
    return this.tempMessageCenterData;
  }

  public setTempMessageCenterData(tempMessageCenterData: any){
    return this.tempMessageCenterData = tempMessageCenterData;
  }

  public setRequestFrom(requestFrom: string){
    this.requestFrom = requestFrom;
  }

  public getRequestFrom(){
    return this.requestFrom;
  }
}
