import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { BookObj } from 'src/assets/booksInterface';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpService:HttpService) { }

  getApi()
  {
     return this.httpService.getBookApiCall('/Book')
  }

  getCartDetailsApi()
  {
     return this.httpService.getCartDetailsApiCall('/ShoppingCart/GetCartBooks')
  }

  AddBooktoCart(book: BookObj, quantity: number)
  {
     return this.httpService.AddToCartApiCall({ bookId: book.bookId, quantity },'/ShoppingCart/AddToCart')
  }

  updateBookQuantity(book: BookObj, quantity: number)
  {
     return this.httpService.updateBookQuantityApiCall({ bookId: book.bookId, quantity },'/ShoppingCart/UpdateQuantity')
  }

  RemoveItemFromCartApi(book: BookObj)
  {
     return this.httpService.RemoveItemFromCartApiCall(`/ShoppingCart/DeleteCart?id=${book.bookId}`)
  }

}
