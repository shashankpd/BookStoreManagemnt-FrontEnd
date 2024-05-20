import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  getBookApiCall(endPoint:string)
    {
      return this.httpClient.get(`${this.baseUrl + endPoint}`,{
        headers:this.Header
      });
    }

    getCartDetailsApiCall(endPoint:string)
    {
      return this.httpClient.get(`${this.baseUrl + endPoint}`,{
        headers:this.Header
      });
    }

    AddToCartApiCall(data: any,endPoint:string)
    {
      return this.httpClient.post(`${this.baseUrl + endPoint}`,data,{
        headers:this.Header
      });
    }

    updateBookQuantityApiCall(data: any,endPoint:string)
    {
      return this.httpClient.put(`${this.baseUrl + endPoint}`,data,{
        headers:this.Header
      });
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

}
