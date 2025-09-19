import { Component } from '@angular/core';
import { UserValidationSigninService } from '../user-validation-signin.service';

@Component({
  selector: 'app-prodileedit',
  imports: [],
  templateUrl: './prodileedit.component.html',
  styleUrl: './prodileedit.component.css'
})
export class ProdileeditComponent {
  
  detail:any={}
  private _url='http://localhost:3002/userDetail'

 constructor(private _api:UserValidationSigninService){}

 getProfileDetail(){
  this._api.getAllDetail().subscribe((res)=>{
    this.detail=res
  })
 }

}
