import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempdataService {



  private loginData: any;
  private token: any;
  private responseStatus: any;
  
  constructor() {
    this.token = "";
  }

  public  getloginData(){
      return this.loginData;
  }

  public setLoginData(loginData: any){
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

}
