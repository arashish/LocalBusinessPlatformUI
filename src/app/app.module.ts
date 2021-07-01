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

import { FlexLayoutModule } from '@angular/flex-layout';
import { MessageComponent } from './message/message.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    MessageComponent
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
    MatRadioModule
  ],
  providers: [ApiService, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
