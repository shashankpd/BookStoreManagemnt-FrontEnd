import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookObj } from 'src/assets/booksInterface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private booksList = new BehaviorSubject<BookObj[]>([]);
  currentBookList = this.booksList.asObservable();

  changeState(value: BookObj[]) {
    this.booksList.next(value);
  }

  private cartItems: { [bookId: number]: BookObj & { quantity: number } } = {};
  
  private cartItemsSubject = new BehaviorSubject<(BookObj & { quantity: number })[]>([]);

  getCartItems(): Observable<(BookObj & { quantity: number })[]> {
    return this.cartItemsSubject.asObservable();
  }

  private cartItemCount = new BehaviorSubject<number>(0);
  getCartItemCount(): Observable<number> {
    return this.cartItemCount.asObservable();
  }
 
  
  clearCart() {
    this.cartItems = {};
    this.updateCartItemsSubject();
  }

  addToCart(book: BookObj, quantity: number = 1) {
    if (book.bookId === undefined) {
      console.error('Book ID is undefined');
      return;
    }

    if (this.cartItems[book.bookId]) {
      this.cartItems[book.bookId].quantity += quantity;
      // Prevent quantity from going below 1
      if (this.cartItems[book.bookId].quantity < 1) {
        this.cartItems[book.bookId].quantity = 1;
      }
    } else {
      this.cartItems[book.bookId] = { ...book, quantity: quantity > 0 ? quantity : 1 };
    }
    this.updateCartItemsSubject();
  }

  setCartItems(cartItems: (BookObj & { quantity: number })[]): void {
    this.cartItems = {};
    cartItems.forEach(item => {
      if (item.bookId !== undefined) { // Ensure bookId is not undefined
        this.cartItems[item.bookId] = item;
      } else {
        console.error('Book ID is undefined for item:', item);
      }
    });
    this.updateCartItemsSubject();
  }

  removeFromCart(book: BookObj) {
    if (book.bookId === undefined) {
      console.error('Book ID is undefined');
      return;
    }

    delete this.cartItems[book.bookId];
    this.updateCartItemsSubject();
  }

  updateCartItemQuantity(book: BookObj, quantity: number) {
    if (book.bookId === undefined) {
      console.error('Book ID is undefined');
      return;
    }

    if (this.cartItems[book.bookId]) {
      this.cartItems[book.bookId].quantity = quantity;
      this.updateCartItemsSubject();
    }
  }

  private updateCartItemsSubject() {
    const cartItemsArray = Object.values(this.cartItems);
    this.cartItemsSubject.next(cartItemsArray);
    this.cartItemCount.next(cartItemsArray.length);
  }
  

  constructor() { }
}
