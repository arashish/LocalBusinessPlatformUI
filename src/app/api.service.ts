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


  public login(username:string, password:string){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ":" + password)})
    return this.http.get('http://localhost:8080/', {headers, responseType:'text'});
  }
  
  public home(): Observable<UserData>{
    let token = 'Bearer '+ this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.get<UserData>('http://localhost:8080/home', {headers, responseType: 'text' as 'json'});
  }
  
  public signup(user: User): Observable<User>{
    console.log(user);
    return this.http.post<User>('http://localhost:8080/signup', user);
  }

  public createstore(store: Store): Observable<Store>{
    let token = 'Bearer ' + this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.post<Store>('http://localhost:8080/createstore', store, {headers, responseType: 'text' as 'json'});
  }

  public addItem(file: any): Observable<ItemWrapper>{
    let token = 'Bearer ' + this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.post<ItemWrapper>('http://localhost:8080/additem', file, {headers});
  }

  public deleteItem(itemId: string){
    let token = 'Bearer ' + this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.delete('http://localhost:8080/deleteitem/' + itemId, {headers});
  }

  public deleteStore(storeId: string){
    let token = 'Bearer ' + this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.delete('http://localhost:8080/deletestore/' + storeId, {headers});
  }

  public updateProfile(user: User): Observable<User>{
    let token = 'Bearer ' + this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.post<User>('http://localhost:8080/updateprofile', user, {headers, responseType: 'text' as 'json'});
  }


  public searchItem(itemName: string, category:string){
    let token = 'Bearer '+ this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    //let body = JSON.stringify({ 'itemName': itemName, 'category': category});
    return this.http.get('http://localhost:8080/searchitem'+ "?itemName="+itemName +"&category="+ category, {headers});
  }

  public createorder(orders: any = []): Observable<Order>{
    let token = 'Bearer ' + this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.post<Order>('http://localhost:8080/createorder', orders, {headers, responseType: 'text' as 'json'});
  }

  // public createmessage(messageCenter: MessageCenter): Observable<MessageCenter>{
  //   let token = 'Bearer ' + this.tempdata.getToken();
  //   const headers = new HttpHeaders().set("Authorization", token);
  //   return this.http.post<MessageCenter>('http://localhost:8080/createmessage', messageCenter, {headers, responseType: 'text' as 'json'});
  // }

  public updatemessage(messageCenter: MessageCenter): Observable<MessageCenter>{
    let token = 'Bearer ' + this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.post<MessageCenter>('http://localhost:8080/updatemessage', messageCenter, {headers});
  }

  public deletemessage(messageCenter: MessageCenter): Observable<MessageCenter>{
    let token = 'Bearer ' + this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.post<MessageCenter>('http://localhost:8080/deletemessage', messageCenter, {headers});
  }

  public shiporder(order: Order): Observable<Order>{
    let token = 'Bearer ' + this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.post<Order>('http://localhost:8080/shiporder', order, {headers, responseType: 'text' as 'json'});
  }

  public checkorder(){
    let token = 'Bearer '+ this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.get('http://localhost:8080/checkorder', {headers});
  }

  public orderstatus(){
    let token = 'Bearer '+ this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.get('http://localhost:8080/orderstatus', {headers});
  }

  public createreview(review: any): Observable<Review>{
    let token = 'Bearer ' + this.tempdata.getToken();
    const headers = new HttpHeaders().set("Authorization", token);
    return this.http.post<Review>('http://localhost:8080/createreview', review, {headers, responseType: 'text' as 'json'});
  }

    public logout(){
    return this.http.get('http://localhost:8080/logout');
  }



}
