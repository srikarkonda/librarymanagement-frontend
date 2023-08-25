import { Component, Input, OnInit } from '@angular/core';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  constructor(private apiService:ApisService,) { }
ngOnInit(): void {
  if(this.checkout)
  {
    console.log(this.checkout)
    this.checkout?.forEach((element:any) => {
      this.totalCost= this.totalCost + (element?.productPrice * element?.checkoutQuantity)
    });
    this.tax= this.totalCost*8/100; 

  }
}
@Input() checkout:any
totalCost=0
tax=0
    checkoutOrder()
    {
      this.apiService.checkoutOrder(this.checkout).subscribe({
        next:(data)=>{
        console.log(data)
      },
      error:(error)=>{
        console.log(error)
      }
})
}
}
