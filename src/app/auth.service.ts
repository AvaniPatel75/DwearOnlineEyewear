import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {environment } from '../app/environment '



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient,private _router:Router) { }
  private _loginUrl='http://localhost:3002/user'

  signUp(userData: any) {
    return this._http.post(`http://localhost:3002/user/signin`, userData);
  }
  

  login(credentials: { username: string; password: string }) {
    return this._http.post(`${this._loginUrl}/login`, credentials);
  }
  

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    this._router.navigate(['/']);
  }
  
  

  getToken():string | null {
    return localStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');

    if (!token || !expiration) {
      return false;
    }

    const now = new Date().getTime();
    return now <= Number(expiration);
  }

// getUserId(): string | null {
//   const token = localStorage.getItem('token');
//   if (!token) return null;
//   const decoded: any = jwt_decode(token);
//   return decoded.userId; // Adjust based on your token payload structure
// }

}
