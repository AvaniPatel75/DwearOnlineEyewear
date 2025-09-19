import { Component } from '@angular/core';
import { BestSellingProductComponent } from '../best-selling-product/best-selling-product.component';
import { BestSellingProductService } from '../best-selling-product.service';
import { Product } from '../product';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  //brand=['OJOS','Vincent','Lenskart Air','MASABA','Rhapsody','Pro Titanium','Sobita','Glided Jewels','Rich Acetate']
  product: Product[] = []
  data: any = {}
  constructor(private _apiBrand: BestSellingProductService, private _router: Router, private _activatedRoute: ActivatedRoute) { }
  brand: any = ""
  goToCategoryPageUsingbrands(brand: any) {

    this._router.navigate([`/product/${brand}`]);

  }

}
