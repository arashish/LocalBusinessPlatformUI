import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempdataService {



  constructor() { }

  private loginData: any;

  public  getloginData(){
      return this.loginData;
  }

  public setLoginData(loginData: any){
    this.loginData = loginData;
  }

}
