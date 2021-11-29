import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {FormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';  
import { ApiService } from './api.service';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule} from '@angular/material/input';
import { MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule } from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';


import { FlexLayoutModule } from '@angular/flex-layout';
import { MessageComponent } from './message/message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { CreateStoreComponent } from './create-store/create-store.component';
import { AddItemComponent } from './add-item/add-item.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderCheckComponent } from './order-check/order-check.component';
import { OrderShipComponent } from './order-ship/order-ship.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { DisplayStoreComponent } from './display-store/display-store.component';
import { MessageCenterComponent } from './message-center/message-center.component';
import { MessageWindowComponent } from './message-window/message-window.component';
import { RatingWindowComponent } from './rating-window/rating-window.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingListComponent } from './rating-list/rating-list.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AboutComponent } from './footer/about/about.component';
import { ContactUsComponent } from './footer/contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    MessageComponent,
    LogoutComponent,
    CreateStoreComponent,
    AddItemComponent,
    OrderItemComponent,
    CartComponent,
    CheckoutComponent,
    OrderCheckComponent,
    OrderShipComponent,
    OrderStatusComponent,
    DisplayStoreComponent,
    MessageCenterComponent,
    MessageWindowComponent,
    RatingWindowComponent,
    RatingListComponent,
    AboutComponent,
    ContactUsComponent
  ],
  entryComponents:[SignupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,    
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDialogModule,
    MatRadioModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSelectModule,
    MatBadgeModule,
    MatProgressBarModule,
    NgbModule
  ],
  providers: [ApiService, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
