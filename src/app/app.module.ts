import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';







import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksHeaderComponent } from './components/books-header/books-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookComponent } from './components/book/book.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { LoginComponent } from './components/login/login.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { BooksContainerComponent } from './components/books-container/books-container.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { WishlistComponent } from './components/wishlist/wishlist/wishlist.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';


@NgModule({
  declarations: [
    AppComponent,
    BooksHeaderComponent,
    BookComponent,
    BookDetailsComponent,
    CartDetailsComponent,
    LoginComponent,
    LoginSignupComponent,
    BooksContainerComponent,
    DashboardComponent,
    SignupComponent,
    WishlistComponent,
    CustomerDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
