import { Component, OnInit } from '@angular/core';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit{
  products:any
  cart=0
  enableCheckout = false
  checkoutProducts:any=[]
  constructor(private apiService:ApisService,) { }
  ngOnInit(): void {
    this.getProducts()
  }

  getProducts()
  {

    this.apiService.getProducts().subscribe({
      next:(data)=>{
      console.log(data)
      if(data){
       this.products = data;
      }
    },
    error:(error)=>{
      console.log(error)
    }
  })
  }

  buy(product:any)
  {
    this.cart++;
    const cartProducts= this.checkoutProducts.filter((data:any)=>data?.productId === product?.productId)
    console.log(cartProducts)
    product['checkoutQuantity'] = cartProducts?.length ==0?1:cartProducts[0]?.checkoutQuantity+1;
    console.log(product)
    this.checkoutProducts=this.checkoutProducts.filter((data:any)=>data?.productId !== product?.productId)
    this.checkoutProducts.push(product)
  }

}
