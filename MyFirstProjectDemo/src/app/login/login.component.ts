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
      
      username:new FormControl('',[Validators.required,Validators.minLength(8)]),
      password:new FormControl('',[Validators.required,Validators.minLength(8)])
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

    if (this.loginForm.valid) {
      this._authService.login({username,password}).subscribe({
        next: (res: any) => {
          const expirationTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
          localStorage.setItem('token', res.token);
          localStorage.setItem('username',res.username)
          localStorage.setItem('userId',res.userId)
          this._router.navigate(['/']);
          localStorage.setItem('expiration', expirationTime.toString());
          this._router.navigate(['/profile']);
          console.log('login successful.............');
          
        },
        error: (error) => {
          alert('Invalid credentials');
        }
      });
      
    
    } else {
      this.errMsg = 'Please fill in all fields correctly';
    }
  }
  onLogin() {
    this.login();
  }

  signIn(){
    this._router.navigate(['/signin'])

  }
  backToMainPage(){
    this._router.navigate(['/'])
  }
  }
  

