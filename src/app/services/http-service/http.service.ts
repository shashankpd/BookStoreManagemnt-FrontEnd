import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookObj } from 'src/assets/booksInterface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient:HttpClient) { }
  baseUrl: string = 'https://localhost:7107/api';
  
  Header = new HttpHeaders({
    'Accept': "application/json",
    Authorization: `Bearer ${localStorage.getItem('AuthToken')}` || ""
  })

  ////////////////////////////////////////////
  private getHeaders(token?: string): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token || localStorage.getItem('AuthToken')}`
    });
  }
  ///////////////////////////////////////////

  getBookApiCall(endPoint:string)
    {
      return this.httpClient.get(`${this.baseUrl + endPoint}`,{
        headers:this.Header
      });
    }

    getCartDetailsApiCall(endPoint: string, token?: string): Observable<any> {
      const url = `${this.baseUrl}${endPoint}`;
    
      if (token!='' && token!=undefined) {
        return this.httpClient.get<any>(url, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`|| ""
          })
        });
      } else {
        return this.httpClient.get<any>(url, { headers: this.Header });
      }
    }

    // getCartDetailsApiCall(token?:string): Observable<any> {
    //   if(token!=''&& token!=undefined)
    //     {
    //       return this.httpClient.get<any>('https://localhost:7107/api/ShoppingCart/GetCartBooks', { headers:new  HttpHeaders({
    //         //'Accept': "application/json",
    //         Authorization: `Bearer ${token}` || ""
    //       })
    //      });
  
    //     }
    //   return this.httpClient.get<any>('https://localhost:7107/api/ShoppingCart/GetCartBooks', { headers:this.Header });
    // }
  

    // AddToCartApiCall(data: any,endPoint:string,token?: string)
    // {
    //   return this.httpClient.post(`${this.baseUrl + endPoint}`,data,{
    //     headers:this.Header
    //   });
    // }

   
    AddToCartApiCall(data: any, endPoint: string, token?: string): Observable<any> {
      const url = `${this.baseUrl}${endPoint}`;
      if (token != '' && token != undefined) {
        return this.httpClient.post<any>(url, data, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}` || ""
          })
        });
      } else {
        return this.httpClient.post<any>(url, data, { headers: this.Header });
      }
    }
  
    updateBookQuantityApiCall(data: any, endPoint: string, token?: string): Observable<any> {
      const url = `${this.baseUrl}${endPoint}`;
      if (token != '' && token != undefined) {
        return this.httpClient.put<any>(url, data, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}` || ""
          })
        });
      } else {
        return this.httpClient.put<any>(url, data, { headers: this.Header });
      }
    }

    loginSignUpApiCall(data: any, endPoint: string){
      return this.httpClient.post(`${this.baseUrl + endPoint}`, data);
    }

    RemoveItemFromCartApiCall(endPoint: string)
    {
      return this.httpClient.delete(`${this.baseUrl + endPoint}`,{
        headers:this.Header
      });
    }

    addToWishlist(book: BookObj, token?: string): Observable<any> {
      const requestBody = { bookId: book.bookId };
      const url = `https://localhost:7107/api/WishList/${book.bookId}`;
      
      let headers = new HttpHeaders();
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      } else {
        headers = this.Header;
      }
    
      return this.httpClient.post<any>(url, requestBody, { headers });
    }
    
    getAllWishlist(token?: string): Observable<any> {
      const url = 'https://localhost:7107/api/WishList/GetWishlistBooks';
    
      let headers = new HttpHeaders();
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      } else {
        headers = this.Header;
      }
    
      return this.httpClient.get<any>(url, { headers });
    }
    
    deleteWishlist(bookId: number, token?: string): Observable<any> {
      const url = `https://localhost:7107/api/WishList/DeleteWishlist/${bookId}`;
    
      let headers = new HttpHeaders();
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      } else {
        headers = this.Header;
      }
    
      return this.httpClient.delete<any>(url, { headers });
    }

    editAddressApiCall(addressId: number, requestBody: any, token?: string): Observable<any> {
      const url = `https://localhost:7107/api/Address/${addressId}`;
      let headers = this.Header; // Assume this.Header is defined somewhere
      if (token) {
        headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
      }
      return this.httpClient.put<any>(url, requestBody, { headers });
    }

    getAddress(token?:string): Observable<any> {
      if(token!=''&& token!=undefined)
        {
          return this.httpClient.get<any>('https://localhost:7107/api/Address', { headers:new  HttpHeaders({
            //'Accept': "application/json",
            Authorization: `Bearer ${token}` || ""
          })
         });
  
        }
      return this.httpClient.get<any>('https://localhost:7107/api/Address', { headers:this.Header });
    }

    AddAddressApiCall(requestBody: any, token?: string): Observable<any> {
      requestBody.type=Number(requestBody.type)
      const url = `https://localhost:7107/api/Address`;
      let headers = this.Header; // Assume this.Header is defined somewhere
      if (token) {
        headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
      }
      return this.httpClient.post<any>(url, requestBody, { headers });
    }
}
