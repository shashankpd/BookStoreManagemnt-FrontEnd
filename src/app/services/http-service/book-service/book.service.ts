import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { BookObj } from 'src/assets/booksInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpService:HttpService) { }

  getApi()
  {
     return this.httpService.getBookApiCall('/Book')
  }

  getCartDetailsApi(token?: string) {
   return this.httpService.getCartDetailsApiCall('/ShoppingCart/GetCartBooks', token);
 }
   //  getCartDetailsApi(token?:string): Observable<any> {
   // return this.httpService.getCartDetailsApiCall(token);
   // }


   AddBooktoCart(book: BookObj, quantity: number, token?: string): Observable<any> {
    const payload = {
      bookId: book.bookId,
      quantity: quantity
    };
    return this.httpService.AddToCartApiCall(payload, '/ShoppingCart/AddToCart', token);
  }
  

  updateBookQuantity(book: BookObj, quantity: number,token?:string): Observable<any>
  {
     return this.httpService.updateBookQuantityApiCall({ bookId: book.bookId, quantity },'/ShoppingCart/UpdateQuantity',token)
  }

  RemoveItemFromCartApi(book: BookObj)
  {
     return this.httpService.RemoveItemFromCartApiCall(`/ShoppingCart/DeleteCart?id=${book.bookId}`)
  }

  addAllToWishlist(book: BookObj, token?: string): Observable<any>{
   return this.httpService.addToWishlist(book,token)
 }
 getAllBooksWishlist(token?: string): Observable<any>{
   return this.httpService.getAllWishlist(token)
 }

 deleteFromWishlist(bookId: number, token?: string): Observable<any> {
   return this.httpService.deleteWishlist(bookId, token);
 }

 editAddress(addressId: number, requestBody: any, token?: string): Observable<any> {
  return this.httpService.editAddressApiCall(addressId, requestBody, token);
}


 getAllAddress(token?: string): Observable<any>{
  return this.httpService.getAddress(token)
}

AddAdress(requestBody: any, token?: string): Observable<any> {
  return this.httpService.AddAddressApiCall(requestBody, token);
}

}
