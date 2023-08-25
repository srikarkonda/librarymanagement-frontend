import { Component, OnInit } from '@angular/core';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit{

  sellerProducts:any
  title="Sell Products"
  formData: {
    productName: string;
    productPrice: number;
    productDescription: string;
    quantity: number;
    productId: number;
    sellerId:number
  } = {
    productName: '',
    productPrice: 0,
    productDescription: '',
    quantity: 0,
    productId:0,
    sellerId:0
  };
  enableForm = false;
  constructor(private apiService:ApisService,) { }
  ngOnInit(): void {
    this.getSellerProducts()
  }
  
  getSellerProducts()
  {

    this.apiService.getSellerProducts().subscribe({
      next:(data)=>{
      console.log(data)
      if(data){
       this.sellerProducts = data;
      }
    },
    error:(error)=>{
      console.log(error)
    }
  })
  }

  addProducts()
  {
    if(this.title !=='Update Product')
    {
      const userData = JSON.parse(sessionStorage.getItem('user') || '{}');
      this.formData.sellerId = userData[0]?.userId
      this.apiService.addProduct(this.formData).subscribe({
        next:(data)=>{
        console.log(data)
        if(data){
         console.log(data)
         this.getSellerProducts()
         this.formData={
          productName: '',
          productPrice: 0,
          productDescription: '',
          quantity: 0,
          productId:0,
          sellerId:0
        };
         this.enableForm = false
        }
      },
      error:(error)=>{
        console.log(error)
        this.enableForm = false
        this.formData={
          productName: '',
          productPrice: 0,
          productDescription: '',
          quantity: 0,
          productId:0,
          sellerId:0
        };
      }
    })
    }
    else {
      this.title="Sell Products"
      this.apiService.updateProduct(this.formData).subscribe({
        next:(data)=>{
        console.log(data)
        if(data){
         console.log(data)
         this.enableForm = false
         this.formData={
          productName: '',
          productPrice: 0,
          productDescription: '',
          quantity: 0,
          productId:0,
          sellerId:0
        };
         this.getSellerProducts()
        }
      },
      error:(error)=>{
        console.log(error)
        this.enableForm = false
        this.formData={
          productName: '',
          productPrice: 0,
          productDescription: '',
          quantity: 0,
          productId:0,
          sellerId:0
        };
      }
    })
    }
   
  }

  edit(product:any)
  {
    this.title = "Update Product"
    this.formData.productDescription = product.productDescription,
    this.formData.productName = product.productName
    this.formData.productPrice = product.productPrice
    this.formData.quantity = product.quantity
    this.formData.productId = product.productId
    this.formData.sellerId = product.sellerId
    this.enableForm = true
  }
}
