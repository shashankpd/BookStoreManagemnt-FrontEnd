import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BookService } from 'src/app/services/http-service/book-service/book.service';
import { DataService } from 'src/app/services/http-service/data-service/data.service';
import { BookObj } from 'src/assets/booksInterface';
import { DROP_DOWN, LOCATION_ICON } from 'src/assets/svg-icons';
import { LoginSignupComponent } from '../login-signup/login-signup.component';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {
 
  showAddressDetails: boolean = false;
  showOrderSummary: boolean = false;
  cartItems$!: Observable<(BookObj & { quantity: number })[]>;
  count: number = 1;

  constructor(private dataService: DataService,
    private bookService: BookService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private router: Router,
    private dialog: MatDialog) 
    {
      iconRegistry.addSvgIconLiteral("location-icon", sanitizer.bypassSecurityTrustHtml(LOCATION_ICON));
      iconRegistry.addSvgIconLiteral("drop-down-icon", sanitizer.bypassSecurityTrustHtml(DROP_DOWN)); 

    }

    toggleAddressDetails() {
      this.showAddressDetails = !this.showAddressDetails;
    }
  
    toggleOrderSummary() {
      this.showOrderSummary = !this.showOrderSummary;
    }

  ngOnInit(): void {
    const authToken = localStorage.getItem('AuthToken');

    if (authToken) {
      // Auth token is present, fetch all cart details
      this.bookService.getCartDetailsApi().pipe(
        map((response:any) => response.data)
      ).subscribe((cartItems: (BookObj & { quantity: number })[]) => {
        this.dataService.setCartItems(cartItems);  // Directly set cart items
      });
    }

    // Always fetch cart items, whether auth token is present or not
    this.cartItems$ = this.dataService.getCartItems();
  }

  removeFromCart(book: BookObj) {
    this.dataService.removeFromCart(book);
    if (book && book.bookId !== undefined) { // Assuming cartId is used to identify the book in the cart
      this.bookService.RemoveItemFromCartApi(book).subscribe(() => {
        // Book removed successfully, update UI or perform any other actions
      }, error => {
        // Handle error if API call fails
        console.error('Error removing book from cart:', error);
      });
    }
  }

  increaseCount(book: BookObj & { quantity: number }) {
    this.dataService.addToCart(book, 1); // Increase quantity by 1
    if (book && book.bookId !== undefined && book.quantity !== undefined) {
      this.bookService.updateBookQuantity(book, (book.quantity ?? 0)).subscribe(() => {
        // Quantity updated successfully, update UI or perform any other actions
      }, error => {
        console.error('Error updating book quantity:', error);
      });
    }
  }

   decreaseCount(book: BookObj & { quantity: number }) {
    if (book && book.quantity !== undefined && book.quantity > 1) {
      this.dataService.addToCart(book, -1); // Decrease quantity by 1
      if (book && book.bookId !== undefined) {
        this.bookService.updateBookQuantity(book, (book.quantity ?? 0)).subscribe(() => {
          // Quantity updated successfully, update UI or perform any other actions
        }, error => {
          console.error('Error updating book quantity:', error);
        });
      }
    }
  }

  handlePlaceOrder(data: any, choice?: string) {
    if (localStorage.getItem('AuthToken') != null) {
      // Logic for handling order placement when token is present
    } else {
      // Navigate to login/signup page
      this.router.navigate(['/dashboard/books']).then(() => {
        // Open dialog after navigation
        const dialogRef = this.dialog.open(LoginSignupComponent, { width: '720px', height: '480px' });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      });
    }
  }

}
