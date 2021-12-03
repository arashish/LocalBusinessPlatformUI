import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TempdataService } from './tempdata.service';
import { User } from './models/User';
import { UserData } from './models/UserData';
import { ItemWrapper } from './models/ItemWrapper';
import { Order } from './models/Order';
import { Store } from './models/store';
import { OrderData} from './models/OrderData'
import { MessageCenter } from './models/MessageCenter';
import { Review } from './models/Review';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private tempdata: TempdataService) { }

  baseUrl: string = "http://it494projectbackend-env-2.eba-fg2m6uvs.us-east-2.elasticbeanstalk.com";
  //baseUrl: string = "http://localhost:5000"

  public login(username:string, password:string){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ":" + password)})
    return this.http.get(this.baseUrl, {headers, responseType:'text'});
  }
  
  public home(): Observable<UserData>{
    let token = 'Bearer '+ this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.get<UserData>(this.baseUrl + '/home', {headers, responseType: 'text' as 'json'});
  }
  
  public signup(user: User): Observable<User>{
    console.log(user);
    return this.http.post<User>(this.baseUrl + '/signup', user);
  }

  public createstore(store: Store): Observable<Store>{
    let token = 'Bearer ' + this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.post<Store>(this.baseUrl + '/createstore', store, {headers, responseType: 'text' as 'json'});
  }

  public addItem(file: any): Observable<ItemWrapper>{
    let token = 'Bearer ' + this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.post<ItemWrapper>(this.baseUrl + '/additem', file, {headers});
  }

  public deleteItem(itemId: string){
    let token = 'Bearer ' + this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.delete(this.baseUrl + '/deleteitem/' + itemId, {headers});
  }

  public deleteStore(storeId: string){
    let token = 'Bearer ' + this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.delete(this.baseUrl + '/deletestore/' + storeId, {headers});
  }

  public updateProfile(user: User): Observable<User>{
    let token = 'Bearer ' + this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.post<User>(this.baseUrl + '/updateprofile', user, {headers, responseType: 'text' as 'json'});
  }


  public searchItem(itemName: string, category:string){
    let token = 'Bearer '+ this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    //let body = JSON.stringify({ 'itemName': itemName, 'category': category});
    return this.http.get(this.baseUrl +'/searchitem'+ "?itemName="+itemName +"&category="+ category, {headers});
  }

  public createorder(orders: any = []): Observable<Order>{
    let token = 'Bearer ' + this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.post<Order>(this.baseUrl + '/createorder', orders, {headers, responseType: 'text' as 'json'});
  }

  // public createmessage(messageCenter: MessageCenter): Observable<MessageCenter>{
  //   let token = 'Bearer ' + this.tempdata.getToken();
  //   const headers = new HttpHeaders().set("Authorization", token);
  //   return this.http.post<MessageCenter>('http://localhost:8080/createmessage', messageCenter, {headers, responseType: 'text' as 'json'});
  // }

  public updatemessage(messageCenter: MessageCenter): Observable<MessageCenter>{
    let token = 'Bearer ' + this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.post<MessageCenter>(this.baseUrl + '/updatemessage', messageCenter, {headers});
  }

  public deletemessage(messageCenter: MessageCenter): Observable<MessageCenter>{
    let token = 'Bearer ' + this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.post<MessageCenter>(this.baseUrl + '/deletemessage', messageCenter, {headers});
  }

  public shiporder(order: Order): Observable<Order>{
    let token = 'Bearer ' + this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.post<Order>(this.baseUrl + '/shiporder', order, {headers, responseType: 'text' as 'json'});
  }

  public checkorder(){
    let token = 'Bearer '+ this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.get(this.baseUrl + '/checkorder', {headers});
  }

  public orderstatus(){
    let token = 'Bearer '+ this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.get(this.baseUrl + '/orderstatus', {headers});
  }

  public createreview(review: any): Observable<Review>{
    let token = 'Bearer ' + this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.post<Review>(this.baseUrl + '/createreview', review, {headers, responseType: 'text' as 'json'});
  }

    public logout(){
    return this.http.get(this.baseUrl + '/logout');
  }



}
