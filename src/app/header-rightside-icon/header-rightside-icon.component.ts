import { Component,inject,ViewChild,ViewContainerRef  } from '@angular/core';
import { RouterLink,Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { WishlistComponent } from "../wishlist/wishlist.component";
import { YourCartComponent } from "../your-cart/your-cart.component";
import { SlideComponent } from "../slide/slide.component";

@Component({
  selector: 'app-header-rightside-icon',
  imports: [RouterLink, LoginComponent, RouterOutlet, WishlistComponent, YourCartComponent, SlideComponent],
  templateUrl: './header-rightside-icon.component.html',
  styleUrl: './header-rightside-icon.component.css'
})
export class HeaderRightsideIconComponent {
  private router =inject(Router)
 
}
