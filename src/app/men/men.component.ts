import { Component } from '@angular/core';
import { BestSellingProductService } from '../best-selling-product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../product';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-men',
  imports: [RouterLink,NgFor],
  templateUrl: './men.component.html',
  styleUrl: './men.component.css'
})
export class MenComponent {
    data: any = {}
    products: Product[] = []
    constructor(private _apiProductDetail: BestSellingProductService, private _router: Router, private _activatedRoute: ActivatedRoute) { }
    gender: any = ''
    ngOnInit() {
      this.gender = this._activatedRoute.snapshot.paramMap.get('gender')
      console.log(this.gender);
      
      
      if (this.gender == 'male') {
        this._apiProductDetail.filterProductByMale().subscribe((res) => {
          this.products = res
          console.log(this.products);
        })
      }
      else if (this.gender == 'women') {
        this._apiProductDetail.filterProductByWomen().subscribe((res) => {
          this.products = res
          console.log(this.products);
  
        })
      }
      else if (this.gender == 'kid') {
        this._apiProductDetail.filterProductByKid().subscribe((res) => {
          this.products = res
          console.log(this.products);
  
        })
      }
      else {
        if (this.gender == 'male') {
          this._apiProductDetail.filterProductByUnisex().subscribe((res) => {
            this.products = res
            console.log(this.products);
  
          })
        }
      }
    }
    gotoDetailPage(id: any) {
      this._router.navigate([id, '/detailPage'])
    }
  
}

