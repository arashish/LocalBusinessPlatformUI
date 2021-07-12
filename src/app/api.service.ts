import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from './models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  public login(username:string, password:string){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ":" + password)})
    return this.http.get('http://localhost:8080/', {headers, responseType:'text'});
  }
  
  public home(getToken:string): Observable<User>{
    let token = 'Bearer ' + getToken;
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.get<User>('http://localhost:8080/home', {headers, responseType: 'text' as 'json'});
  }
  
  public signup(user: User): Observable<User>{
    return this.http.post<User>('http://localhost:8080/signup', user);
  }

  public updateProfile(getToken:string, user: User): Observable<User>{
    let token = 'Bearer ' + getToken;
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.post<User>('http://localhost:8080/updateprofile', user, {headers, responseType: 'text' as 'json'});
  }

  public logout(){
    return this.http.get('http://localhost:8080/logout');
  }

}
