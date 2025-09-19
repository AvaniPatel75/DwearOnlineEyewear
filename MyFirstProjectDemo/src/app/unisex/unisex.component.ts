import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { BestSellingProductService } from '../best-selling-product.service';
import { Product } from '../product';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-unisex',
  imports: [RouterLink,NgFor],
  templateUrl: './unisex.component.html',
  styleUrl: './unisex.component.css'
})
export class UnisexComponent {
  data: any = {}
    products: Product[] = []
    constructor(private _apiProductDetail: BestSellingProductService, private _router: Router, private _activatedRoute: ActivatedRoute) { }
    gender: any = ''
    ngOnInit() {
      this.gender = this._activatedRoute.snapshot.paramMap.get('gender')
      console.log(this.gender);
        this._apiProductDetail.filterProductByUnisex().subscribe((res) => {
          this.products = res
          console.log(this.products);
        })
    }
    gotoDetailPage(id: any) {
      this._router.navigate([id, '/detailPage'])
    }
}
