import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: HttpClient) { }
  private _urlOrder = 'http://localhost:3002/order'

  getAllOrder() {
    return this._http.get(this._urlOrder)
  }
  removeProduct(id: any) {
    return this._http.delete(this._urlOrder + "/" + id)
  }
  addToOrder(orderData: any): Observable<any> {
    return this._http.post('http://localhost:3002/order/add', orderData);
  }
  placeOrder(id: any) {
    return this._http.patch(this._urlOrder + '/', id)
  }
  placeFinalOrder(id: any, orderData: any): Observable<any> {
    return this._http.put(this._urlOrder + "/" + id, orderData);
  }
  updateOrder(id: string, orderData: any): Observable<any> {
    return this._http.put(`http://localhost:3002/order/${id}`, orderData);
  }

}
