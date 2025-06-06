import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http:HttpClient) { }
  

  login(userDetails:any)
  {
    return this.http.post('https://librarymanagement-backend-1e5x.onrender.com/api/auth/login',userDetails)
  }

  getProducts()
  {
    const userData = JSON.parse(sessionStorage.getItem('user') || '{}');
    return this.http.get('https://librarymanagement-backend-1e5x.onrender.com/api/product/getBuyerProducts',{headers:{'userId': userData[0]?.userId}})
  }
  getSellerProducts()
  {
    const userData = JSON.parse(sessionStorage.getItem('user') || '{}');
    return this.http.get('https://librarymanagement-backend-1e5x.onrender.com/api/product/getSellerProducts',{headers:{'userId': userData[0]?.userId}})
  }

  addProduct(body:any)
  {
    return this.http.post('https://librarymanagement-backend-1e5x.onrender.com/api/product/addProducts',body)
  }

  updateProduct(body:any)
  {
    console.log(body)
    return this.http.post('https://librarymanagement-backend-1e5x.onrender.com/api/product/updateProducts',body)
  }

  checkoutOrder(body:any)
  {
    return this.http.post('https://librarymanagement-backend-1e5x.onrender.com/api/product/checkout',body)
  }

  getLibraryBooks()
  {
    return this.http.get('https://librarymanagement-backend-1e5x.onrender.com/getBooks')
  }

  saveChanges(body:any)
  {
    return this.http.post('https://librarymanagement-backend-1e5x.onrender.com/saveChanges',body)
  }
  deleteBook(ids:any)
  {
    return this.http.delete('https://librarymanagement-backend-1e5x.onrender.com/deleteSelectedBooks',{params:{'ids': ids}})
  }

  getLoanRecords()
  {
    return this.http.get('https://librarymanagement-backend-1e5x.onrender.com/getLoanRecords')
  }

  insertLoanData(data:any)
  {
    return this.http.post('https://librarymanagement-backend-1e5x.onrender.com/saveLoanRecords',data)
  }

  updateLoanData(data:any)
  {
    return this.http.post('https://librarymanagement-backend-1e5x.onrender.com/returnBooks',data)
  }

  search(search:any)
  {
    return this.http.get('https://librarymanagement-backend-1e5x.onrender.com/searchResults/'+search)
  }

  getMyLoanRecords()
  {
    const userData = JSON.parse(sessionStorage.getItem('user') || '{}');
    return this.http.get('https://librarymanagement-backend-1e5x.onrender.com/getMyLoanRecords',{headers:{'userId': userData[0]?.userId}})
  }
}
