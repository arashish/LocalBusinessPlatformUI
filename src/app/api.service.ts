import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  public login(username:string, password:string){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ":" + password)})
    return this.http.get('http://localhost:8080/', {headers, responseType:'json'});
  }

  public getInfo(){
    let username = "blk_mtl07@yahoo.com";
    let password = "123456";
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ":" + password)})
    return this.http.get('http://localhost:8080/', {headers, responseType:'json'});
  }


  myMethod() {
    return this.http.get('http://localhost:8080/', {responseType: 'json'})
  }
}
