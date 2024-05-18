import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/http-service/book-service/book.service';
import { DataService } from 'src/app/services/http-service/data-service/data.service';
import { HttpService } from 'src/app/services/http-service/http.service';

import { SEARCH_ICON, PROFILE_ICON, CART_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-books-header',
  templateUrl: './books-header.component.html',
  styleUrls: ['./books-header.component.scss']
})
export class BooksHeaderComponent implements OnInit {

  constructor(private domSanitizer:DomSanitizer,private matIconRegistry:MatIconRegistry,private dialog:MatDialog,private router: Router,private httpService:HttpService,private dataService: DataService,private bookService:BookService)
  {
    matIconRegistry.addSvgIconLiteral("search-icon", domSanitizer.bypassSecurityTrustHtml(SEARCH_ICON)),
    matIconRegistry.addSvgIconLiteral("profile-icon", domSanitizer.bypassSecurityTrustHtml(PROFILE_ICON)),
    matIconRegistry.addSvgIconLiteral("cart-icon", domSanitizer.bypassSecurityTrustHtml(CART_ICON))

   }

  ngOnInit(): void {

    this.bookService.getApi().subscribe((res:any)=>this.dataService.changeState(res))
  }

}
