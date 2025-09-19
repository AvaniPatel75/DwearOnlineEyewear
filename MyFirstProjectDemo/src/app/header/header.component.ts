import { Component,inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderLogoComponent } from "../header-logo/header-logo.component";
import { HeaderOptionComponent } from "../header-option/header-option.component";
import { HeaderHomePagesComponent } from "../header-home-pages/header-home-pages.component";
import { HeaderRightsideIconComponent } from "../header-rightside-icon/header-rightside-icon.component";

@Component({
  selector: 'app-header',
  imports: [ HeaderLogoComponent, HeaderOptionComponent, HeaderHomePagesComponent, HeaderRightsideIconComponent,RouterLink,RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router:Router){}

  openloginpage(event : Event){
    //event.preventDefault()
    // window.open('/login','_blank')
    this.router.navigate(['/login']);
  }
}
