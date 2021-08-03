import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempdataService {



  private loginData: any;
  private storeData: any;
  private token: any;
  private responseStatus: any;
  private message: string="";
  
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
    return this.loginData;
}

public setStoreData(loginData: any){
  this.loginData = loginData;
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


}
