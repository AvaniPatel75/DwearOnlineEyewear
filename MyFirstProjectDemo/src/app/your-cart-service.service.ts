import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { __runInitializers } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class YourCartServiceService {

  constructor(private _http:HttpClient) { }
  private _url='http://localhost:3002/cart/'
  addtocartProduct(data:any){
    console.log('sending back to ',data);
    return this._http.post<any>(this._url+'add',data)
  }
  removeProductFromCart(id:any){
    return this._http.delete(this._url+id)
  }
  getAll(){
    return this._http.get(this._url)
  }
  clearCart(user_id:any){
    return this._http.delete(this._url+user_id)
  }
  
    getCartById(cartId: string): Observable<any> {
      return this._http.get(`${this._url}/${cartId}`);
    }
  

}
