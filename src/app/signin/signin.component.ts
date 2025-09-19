import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { SlideComponent } from '../slide/slide.component';

@Component({
  selector: 'app-signin',
  imports: [RouterLink,NgFor,NgIf,SlideComponent,ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  animations:[ 
        trigger('slideInOut', [
          state('hidden', style({ transform: 'translateY(-100%)', opacity: 0 })),
          state('visible', style({ transform: 'translateY(0)', opacity: 1 })),
          transition('hidden => visible', [
            animate('300ms ease-in-out')
          ]),
          transition('visible => hidden', [
            animate('300ms ease-in-out')
          ])
        ])]
})
export class SigninComponent {

  signUpForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,  // Inject the AuthService here
    private _router: Router
  ) {
    this.signUpForm = this._fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    // if (this.signUpForm.invalid) {
    //   console.log("invalid detail......");
      
    //   return;
    // }
  
    const userData = this.signUpForm.value;
    console.log(userData);
    
    this._authService.signUp(userData).subscribe(
      (response: any) => {
        
        this.successMessage = response.message;
        this.errorMessage = '';
        this.signUpForm.reset(); 
        // setTimeout(() => {
        //   this._router.navigate(['/']);
        // }, 2000);
        this._router.navigate(['/'])
        console.log('sign in successfull....');
      },
      (error) => {
        console.error('Signup error:', error);
        this.errorMessage = error?.error?.message || 'An error occurred during signup.';
        this.successMessage = '';
        // this._router.navigate(['/'])
      }
    );
  }
  
  backToMainPage(){
    this._router.navigate(['/'])
  }
}
