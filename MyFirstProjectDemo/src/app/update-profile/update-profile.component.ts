import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserValidationSigninService } from '../user-validation-signin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-profile',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {
  user: any = null;
  profileForm: FormGroup;
  // selectedFile: File | null = null;
  // previewImage: string | ArrayBuffer | null = null; 
  isAdded = false;
  userId: string = '';

  constructor(
    private _authService: UserValidationSigninService,
    private _router: Router,
    private _http: HttpClient,
    private _fb: FormBuilder
  ) {

    this.profileForm = this._fb.group({
      name: [''],
      phone: [''],
      street: [''],
      city: [''],
      state: [''],
      zip_code: [''],
      country: ['']
    })
  }
  ngOnInit() {

  }
  getUserProfile() {
    const token = this._authService.getToken();
    if (!token) {
      this._router.navigate(['/login']); // Redirect if no token
      return;
    }

    this._http.get('http://localhost:3002/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res: any) => {
        console.log('User Data:', res); // Debugging: Log user data
        this.user = res;
        this.userId = res._id; // Get user ID

        if (this.userId) {
          localStorage.setItem('userId', this.userId); // Store userId in localStorage
        }

        // Populate form
        this.profileForm.patchValue({
          name: res.name,
          phone: res.phone,
          address: {
            street: res.address?.street || '',
            city: res.address?.city || '',
            state: res.address?.state || '',
            zip_code: res.address?.zip_code || '',
            country: res.address?.country || ''
          }
        });

        this.isAdded = true;
      },
      error: () => this._authService.logout()
    });
  }

  logout() {
    this._authService.logout();
  }

  save() {
    const data = this.profileForm.value;

    if (this.isAdded) {
      this._authService.editUserDetail(this.userId, data).subscribe({
        next: () => this._router.navigate(['/']),
        
        error: (err) => console.error('Update error:', err)
      });
    } else {
      this._authService.addUser(data).subscribe({
        next: () => this._router.navigate(['/']),
        error: (err) => console.error('Add user error:', err)
      });
    }
  }
}






