import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempdataService {



  private loginData: any;
  private storeData: any;
  private itemData!: any;
  private token: any;
  private responseStatus: any;
  private message: string="";
  private rowNumber!: number;

  constructor() {
    this.token = "";
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

public setItemData(itemData: any){
this.itemData = itemData;
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

  public  getRowNumber(){
    return this.rowNumber;
  }

  public setRowNumber(rowNumber: number){
    this.rowNumber = rowNumber;
  }


}
