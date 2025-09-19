import { Component } from '@angular/core';
import { UserValidationSigninService } from '../user-validation-signin.service';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [NgFor,NgIf,JsonPipe,CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: any = null;
  isadded=0

  constructor(
    private _authService: UserValidationSigninService,
    private _router: Router,
    private _http: HttpClient,
    private _fb: FormBuilder
  ) {}


  ngOnInit() {
    if (!this._authService.isLoggedIn()) {
      this._router.navigate(['/login']); // Redirect if not logged in
    } else {
      this.getUserProfile();
    }
  }

  getUserProfile() {
    const token = this._authService.getToken();
    this._http.get('http://localhost:3002/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => this.user = res,
      error: () => this._authService.logout()
    });
  }

  logout() {
    this._authService.logout();
  }
  addUser(data:any){
    this._authService.addUser(data);
    console.log(data); 
  }
  
}
