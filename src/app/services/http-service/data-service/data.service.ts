import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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


  constructor() { }
}
