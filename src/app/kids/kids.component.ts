import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { BestSellingProductService } from '../best-selling-product.service';
import { Product } from '../product';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-kids',
  imports: [RouterLink,NgFor],
  templateUrl: './kids.component.html',
  styleUrl: './kids.component.css'
})
export class KidsComponent {
  data: any = {}
    products: Product[] = []
    constructor(private _apiProductDetail: BestSellingProductService, private _router: Router, private _activatedRoute: ActivatedRoute) { }
    gender: any = ''
    ngOnInit() {
      this.gender = this._activatedRoute.snapshot.paramMap.get('gender')
      console.log(this.gender);
        this._apiProductDetail.filterProductByKid().subscribe((res) => {
          this.products = res
          console.log(this.products);
        })
    }
    gotoDetailPage(id: any) {
      this._router.navigate([id, '/detailPage'])
    }
}
