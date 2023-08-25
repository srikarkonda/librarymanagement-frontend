import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http:HttpClient) { }
  

  login(userDetails:any)
  {
    return this.http.post('http://localhost:3000/api/auth/login',userDetails)
  }

  getProducts()
  {
    const userData = JSON.parse(sessionStorage.getItem('user') || '{}');
    return this.http.get('http://localhost:3000/api/product/getBuyerProducts',{headers:{'userId': userData[0]?.userId}})
  }
  getSellerProducts()
  {
    const userData = JSON.parse(sessionStorage.getItem('user') || '{}');
    return this.http.get('http://localhost:3000/api/product/getSellerProducts',{headers:{'userId': userData[0]?.userId}})
  }

  addProduct(body:any)
  {
    return this.http.post('http://localhost:3000/api/product/addProducts',body)
  }

  updateProduct(body:any)
  {
    console.log(body)
    return this.http.post('http://localhost:3000/api/product/updateProducts',body)
  }

  checkoutOrder(body:any)
  {
    return this.http.post('http://localhost:3000/api/product/checkout',body)
  }

  getLibraryBooks()
  {
    return this.http.get('http://localhost:3000/getBooks')
  }

  saveChanges(body:any)
  {
    return this.http.post('http://localhost:3000/saveChanges',body)
  }
  deleteBook(ids:any)
  {
    return this.http.delete('http://localhost:3000/deleteSelectedBooks',{params:{'ids': ids}})
  }

  getLoanRecords()
  {
    return this.http.get('http://localhost:3000/getLoanRecords')
  }

  insertLoanData(data:any)
  {
    return this.http.post('http://localhost:3000/saveLoanRecords',data)
  }

  updateLoanData(data:any)
  {
    return this.http.post('http://localhost:3000/returnBooks',data)
  }

  search(search:any)
  {
    return this.http.get('http://localhost:3000/searchResults/'+search)
  }

  getMyLoanRecords()
  {
    const userData = JSON.parse(sessionStorage.getItem('user') || '{}');
    return this.http.get('http://localhost:3000/getMyLoanRecords',{headers:{'userId': userData[0]?.userId}})
  }
}
