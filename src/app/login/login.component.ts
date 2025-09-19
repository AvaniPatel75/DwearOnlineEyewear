import { Component,  } from '@angular/core';
import { RouterLink ,Router} from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { UserValidationSigninService } from '../user-validation-signin.service';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'

import { routes } from '../app.routes';
import { AuthService } from '../auth.service';
import { SlideComponent } from "../slide/slide.component";
@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule, SlideComponent,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('slideInOut', [
      state('hidden', style({ transform: 'translateY(-100%)', opacity: 0 })),
      state('visible', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('hidden => visible', [
        animate('300ms ease-in-out')
      ]),
      transition('visible => hidden', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class LoginComponent {
  isLogin:boolean=true
  loginForm:FormGroup;
  
  errMsg = '';

  constructor(private _authService:AuthService,private _router:Router,private _fb:FormBuilder,private _api:UserValidationSigninService){
    this.loginForm=this._fb.group({
      
      username:new FormControl('',[Validators.required,Validators.minLength(3)]),
      password:new FormControl('',[Validators.required,Validators.minLength(3)])
    })
    
  }
  ngOnInit(){
    if (this._authService.isLoggedIn()) {
      this._router.navigate(['/profile']); 
      console.log('hii login page done');
      
    }
  }
 
  // signIn(): void {
  //   const { username, email, password } = this.loginForm.value;
  
  //   if (this.loginForm.valid) {
  //     this._api.register(this.loginForm.value).subscribe(
  //       (res) => {
  //         console.log('Registration Successful', res);
  //         localStorage.setItem('authToken', res.token);
  //         this._router.navigate(['/']);
  //       },
  //       (error) => {
  //         console.error('Registration Failed...', error);
  //         this.errMsg = 'Error in registration process';
  //       }
  //     );
  //   } else {
  //     this.errMsg = 'Please fill in the correct information...';
  //   }
  // }

  
  login(): void {
  const { username, password } = this.loginForm.value;
    console.log(this.loginForm.value); // Ensure both username & password are defined

    console.log(username); 
    console.log(password); 
    console.log(this.loginForm.valid);
    
  if (this.loginForm.valid) {
    this._authService.login({ username, password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
    localStorage.setItem('username', res.user.username);
    localStorage.setItem('username', res.user.password);
        this._router.navigate(['']);
      },
      error: (err) => {
        console.log('Login failed:', err);
      }
    });
  } else {
    this.errMsg = 'Please fill in all fields';
  }
}

  onLogin() {
    this._router.navigate(['']);

  }

  signIn(){
    this._router.navigate(['/signin'])

  }
  backToMainPage(){
    this._router.navigate(['/'])
  }
  }
  

