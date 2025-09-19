import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { BestSellingProductService } from '../best-selling-product.service';
import { Product } from '../product';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-women',
  imports: [RouterLink,NgFor],
  templateUrl: './women.component.html',
  styleUrl: './women.component.css'
})
export class WomenComponent {
  data: any = {}
    products: Product[] = []
    constructor(private _apiProductDetail: BestSellingProductService, private _router: Router, private _activatedRoute: ActivatedRoute) { }
    gender: any = ''
    ngOnInit() {
      this.gender = this._activatedRoute.snapshot.paramMap.get('gender')
      console.log(this.gender);
        this._apiProductDetail.filterProductByWomen().subscribe((res) => {
          this.products = res
          console.log(this.products);
      
        })
    }
    gotoDetailPage(id: any) {
      this._router.navigate([id, '/detailPage'])
    }
}
