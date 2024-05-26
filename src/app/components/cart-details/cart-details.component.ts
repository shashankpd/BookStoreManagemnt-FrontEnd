import { Component, OnInit } from '@angular/core';
import { BookObj } from 'src/assets/booksInterface';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DROP_DOWN, LOCATION_ICON } from 'src/assets/svg-icons';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/http-service/data-service/data.service';
import { BookService } from 'src/app/services/http-service/book-service/book.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {
  showAddressDetails: boolean = false;
  showOrderSummary: boolean = false;
  cartItems: (BookObj & { quantity: number })[] = [];
  count: number = 1;
  authToken: string | null = null;
  orderId!:number

  selectedAddressId: number | null = null;

  onAddressSelected($event: number) {
    this.selectedAddressId = $event;
  }

  constructor(private dataService: DataService, private bookService: BookService,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private router: Router, private dialog: MatDialog) {
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
      this.bookService.getCartDetailsApi().subscribe((response) => {
        this.cartItems = response.data;
      });
    } else {
      // Auth token is not present, get cart items from DataService
      this.dataService.getCartItems().subscribe((cartItems) => {
        this.cartItems = cartItems;
      });
    }
  }
  

  removeFromCart(book: BookObj) {
    this.cartItems = this.cartItems.filter(item => item.bookId !== book.bookId);
    this.dataService.removeFromCart(book);
    if (book && book.bookId !== undefined) {
      this.bookService.RemoveItemFromCartApi(book).subscribe(() => {
        // Book removed successfully, update UI or perform any other actions
      }, error => {
        console.error('Error removing book from cart:', error);
      });
    }
  }

  increaseCount(book: BookObj) {
    if (book && book.quantity !== undefined) {
      book.quantity++;
      if (localStorage.getItem('AuthToken') != null) {
        // Auth token is present, update quantity via service
        this.bookService.updateBookQuantity(book, book.quantity).subscribe(() => {
          // Quantity updated successfully, perform any additional actions if needed
        }, error => {
          console.error('Error updating quantity:', error);
        });
      } else {
        // Auth token not present, update quantity in DataService only
        this.dataService.addToCart(book, 1); // Increase quantity by 1
      }
    }
  }
  
  decreaseCount(book: BookObj) {
    if (book && book.quantity !== undefined && book.quantity > 1) {
      book.quantity--;
      if (localStorage.getItem('AuthToken') != null) {
        // Auth token is present, update quantity via service
        this.bookService.updateBookQuantity(book,book.quantity).subscribe(() => {
          // Quantity updated successfully, perform any additional actions if needed
        }, error => {
          console.error('Error updating quantity:', error);
        });
      } else {
        // Auth token not present, update quantity in DataService only
        this.dataService.addToCart(book, -1); // Decrease quantity by 1
      }
    }
  }

  // handleCheckout() {
  //   if (this.authToken) {
  //     const bookIds = this.cartItems.map(item => item.bookId);
  //     const addressId = this.selectedAddressId;
  //     // this.orderId=
  
  //     // Check if addressId is valid (not null or undefined, and a valid integer)
  //     if (addressId != null && !isNaN(addressId)) {
  //       const order = {
  //         // orderId:this.orderId,
  //           addressId: addressId,
  //           bookIds: bookIds
  //       };
  
  //       this.bookService.addOrder(order, this.authToken).subscribe(response => {
  //         // this.orderId=response.data[0]
  //         console.log('Order placed successfully:', response);
  //        for(let i=0;i<bookIds.length;i++){
  //         this.bookService.deleteBookFromCart(bookIds[i]||0).subscribe(res=>console.log(res)
  //         )
  //        }
  //         this.router.navigate(['/dashboard/orders']);


  //       }, error => {
  //         console.error('Error placing order:', error);
  //       });
  //     } else {
  //       console.error('Invalid addressId:', addressId);
  //     }
  //   } else {
  //     // Handle authentication/token issues
  //   }
  // }


  handlePlaceOrder() {
    if (localStorage.getItem('AuthToken') != null) {
      // Logic for handling order placement when token is present
      
    } else {
      // Navigate to login/signup page
      this.router.navigate(['/dashboard/books']).then(() => {
        // Open dialog after navigation
        const dialogRef = this.dialog.open(LoginSignupComponent, {data:{value:'placeOrder',cart:this.cartItems} });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      });
    }
  }
}