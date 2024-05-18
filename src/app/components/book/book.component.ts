import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/http-service/book-service/book.service';
import { BookObj } from 'src/assets/booksInterface';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() BookObjList !:BookObj[]
  searchString:string=''

  constructor(private bookService:BookService,private router:Router) { }

  ngOnInit(): void {
  }

  handleBook(book:BookObj){
    // this.bookService.changeState(book)
     this.router.navigate(["/dashboard/bookdetails", book.bookId])

}
}
