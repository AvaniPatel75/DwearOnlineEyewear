import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserValidationSigninService {
  private _url = "http://localhost:3002/user"
  private _urlDetail = "http://localhost:3002/userDetail"
  constructor(private _http: HttpClient, private router: Router) { }

  signUp(userData: any) {
    return this._http.post(`${this._url}/signUp`, userData);
  }

  login(credentials: any) {
    return this._http.post(`${this._url}/login`, credentials);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    //const expiration = localStorage.getItem('expiration');

    if (!token) {
      console.log('user not found');

      return false;
    }
    console.log(token);

    return true;

  }

  getToken() {
    return localStorage.getItem('token');
  }
  // getProfile() {
  //   return this._http.get('/api/profile', { withCredentials: true });
  // }
  editProfile() {
    return this._http.get(this._urlDetail + "")
  }
  editUserDetail(id: any, data: any) {
    return this._http.put(this._urlDetail + id, data)
  }
  addUser(data: any) {
    return this._http.post(this._urlDetail + '', data)
  }
  getUserProfileById(id:any){
    return this._http.get(this._urlDetail+''+id)
  }
  // editProfile(id:any){
  //   return this._http.put(this._urlDetail)
  // }
  getAllDetail(){
    return this._http.get(this._urlDetail)
  }
}
