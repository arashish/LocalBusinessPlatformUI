import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempdataService {



  constructor() { }

  private loginData: any;
  private responseStatus: any;

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


}
