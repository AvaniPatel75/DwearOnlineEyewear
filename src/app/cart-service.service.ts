import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  constructor(private _http:HttpClient,private _acativatedRoute:ActivatedRoute,private _authService:AuthService) { }
  private _url = 'http://localhost:3002/cart'; // Change according to your backend URL


  getAllCarts(): Observable<any> {
    return this._http.get(`${this._url}`);
  }

  getCartById(cartId: string): Observable<any> {
    return this._http.get(`${this._url}/${cartId}`);
  }

  addToCart(cartData: any,prodId:any,userId:any): Observable<any> {
    return this._http.post(`${this._url}/add`, cartData);
  }

  updateCart(cartId: string, updatedData: any): Observable<any> {
    return this._http.put(`${this._url}/${cartId}`, updatedData);
  }

  removeFromCart(cartId: string): Observable<any> {
    return this._http.delete(`${this._url}/${cartId}`);
  }

}
