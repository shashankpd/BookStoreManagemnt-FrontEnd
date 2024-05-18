import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/http-service/book-service/book.service';
import { DataService } from 'src/app/services/http-service/data-service/data.service';
import { BookObj } from 'src/assets/booksInterface';

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.scss']
})
export class BooksContainerComponent implements OnInit {
  booksList: BookObj[] = [];

  constructor(private dataService:DataService) { }

  ngOnInit(): void {

    this.dataService.currentBookList.subscribe(res=>this.booksList=res)
    
  }

}
