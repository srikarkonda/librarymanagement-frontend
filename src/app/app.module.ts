import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LeftnavComponent } from './leftnav/leftnav.component';
import { BuyerComponent } from './buyer/buyer.component';
import { SellerComponent } from './seller/seller.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { ManagebooksComponent } from './managebooks/managebooks.component';
import { AgGridModule } from 'ag-grid-angular';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoanComponent } from './loan/loan.component';
import { MylistComponent } from './mylist/mylist.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LeftnavComponent,
    BuyerComponent,
    SellerComponent,
    CheckoutComponent,
    ManagebooksComponent,
    LoanComponent,
    MylistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,ReactiveFormsModule,
    FormsModule,
    AgGridModule,
    MatSlideToggleModule,
    ToastrModule.forRoot(
      {timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
