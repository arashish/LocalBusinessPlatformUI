import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import {HomeComponent} from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { OrderCheckComponent } from './order-check/order-check.component';
import { OrderShipComponent } from './order-ship/order-ship.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: '', redirectTo:"login",pathMatch:"full"},
  {path: 'login', component:LoginComponent},
  {path: 'home', component:HomeComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'cart', component:CartComponent},
  {path: 'ordercheck', component:OrderCheckComponent},
  {path: 'ordership', component:OrderShipComponent},
  {path: 'orderstatus', component:OrderStatusComponent},
  {path: 'logout', component:LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
