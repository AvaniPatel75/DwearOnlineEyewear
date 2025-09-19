import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WhishlistServiceService {
  private _url="http://localhost:3002/"
  constructor(private _http:HttpClient,private router:Router) { }

  getAll(){
    return this._http.get<any[]>(this._url+"cart")
  }
}
