import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

    // getCartDetailsApiCall(endPoint:string)
    // {
    //   return this.httpClient.get(`${this.baseUrl + endPoint}`,{
    //     headers:this.Header
    //   });
    // }

}
