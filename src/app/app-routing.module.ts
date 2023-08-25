import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LeftnavComponent } from './leftnav/leftnav.component';
import { BuyerComponent } from './buyer/buyer.component';
import { SellerComponent } from './seller/seller.component';
import { ManagebooksComponent } from './managebooks/managebooks.component';
import { LoanComponent } from './loan/loan.component';
import { MylistComponent } from './mylist/mylist.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: LeftnavComponent,
  children:[{
    path: 'library', component: ManagebooksComponent},
    {path: 'loan', component: LoanComponent},
    {path: 'myList', component: MylistComponent},
  ] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
