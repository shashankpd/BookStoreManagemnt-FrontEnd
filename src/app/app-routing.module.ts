import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { BooksHeaderComponent } from './components/books-header/books-header.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { BooksContainerComponent } from './components/books-container/books-container.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { SignupComponent } from './components/signup/signup.component';
import { WishlistComponent } from './components/wishlist/wishlist/wishlist.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';

const routes: Routes = [
  
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'loginSignup',component:LoginSignupComponent},
  { path:'customer', component:CustomerDetailsComponent },



  {path:'dashboard',component:DashboardComponent,
    children:[
     // {path:'book',component:BookComponent},
     {path:'books',component:BooksContainerComponent},
     {path:'bookdetails/:bookId',component:BookDetailsComponent},
     {path:'cart',component:CartDetailsComponent},
     {path:'wishlist',component:WishlistComponent},
    // {path:'orders', component:OrderDetailsComponent}
            ]
    },
    {path:"rrr",component:BookDetailsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
