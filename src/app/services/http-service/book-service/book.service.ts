import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpService:HttpService) { }

  getApi()
  {
     return this.httpService.getBookApiCall('/Book')
  }

  // getCartDetailsApi()
  // {
  //    return this.httpService.getCartDetailsApiCall('/Book')
  // }


}
