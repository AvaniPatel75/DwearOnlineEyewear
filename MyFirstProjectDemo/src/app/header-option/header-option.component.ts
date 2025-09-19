import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { BestSellingProductService } from '../best-selling-product.service';
import { Product } from '../product';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-header-option',
  imports: [RouterLink,NgFor],
  templateUrl: './header-option.component.html',
  styleUrl: './header-option.component.css'
})
export class HeaderOptionComponent {
  constructor(private _apiproduct: BestSellingProductService, private _router: Router, private _activatedRoute: ActivatedRoute) { }
  category: any = ''
  shape: any = ''
  product: Product[] = []
  selectedValue:any=''
  isAgain=0
  ngOnInin() {
    
  }
  
  goToCategoryPage(category: string): void {
    if (category) {
      this._router.navigate(['/gender', category]);
    }
  }

  onSearch(query: string): void {
    if (query.trim()) {
      this._router.navigate(['/search'], { queryParams: { q: query } });
    }
  }
  
}
