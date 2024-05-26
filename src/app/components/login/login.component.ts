import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/http-service/User-service/user.service';
import { BookService } from 'src/app/services/http-service/book-service/book.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  templist: any;
  cartList: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public data: { value: string, cart: any }
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get loginControls() { return this.loginForm.controls; }

  handleLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.userService.loginApi(email, password).subscribe(
      (res: any) => {
        const token = res.data;
        localStorage.setItem('AuthToken', token);
        localStorage.setItem('userName', res.userName); // Assuming the response includes UserName
        localStorage.setItem('email', res.email);

        if (this.data.value === 'placeOrder') {
          this.templist = this.data.cart;

          // Pass the new token to the getCartDetailsApi method
          this.bookService.getCartDetailsApi(token).subscribe(
            (response) => {
              this.cartList = response.data;

              console.log(this.cartList)
              this.updateCart(this.templist, this.cartList, token);
              console.log('udated successfully.')
            },
            (err) => {
              console.error('Error fetching cart details:', err);
            }
          );
        } else {
          this.router.navigate(['/dashboard/books']);
        }
      },
      (err) => {
        console.error('Error logging in:', err);
      }
    );
  }

  updateCart(a: any, b: any,token:string) {
    for (const itemA of a) {
      const itemB = b.find((item:any) => item.bookId === itemA.bookId);
      if (itemB) {
          itemB.quantity += itemA.quantity;
          this.bookService.updateBookQuantity(itemB.bookId,itemB.quantity,token).subscribe(res=>console.log(res)
          
        )

      } else {
          b.push(itemA);
          this.bookService.AddBooktoCart(itemA.bookId,itemA.quantity,token).subscribe(res=>console.log(res)
          )
      }
  }
  return b;
}
}
