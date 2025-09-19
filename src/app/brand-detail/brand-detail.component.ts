import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryProductsComponent } from '../category-products/category-products.component';
import { BestSellingProductService } from '../best-selling-product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-brand-detail',
  imports: [NgFor,NgIf,RouterLink],
  templateUrl: './brand-detail.component.html',
  styleUrl: './brand-detail.component.css'
})
export class BrandDetailComponent {

  constructor(private _apiBrandsFilter:BestSellingProductService,private _activateRoute:ActivatedRoute,private _router:Router){}
  brand:any=''
  product:Product[]=[]
  ngOnInit(){
    this.brand=this._activateRoute.snapshot.paramMap.get('brand')
    this._apiBrandsFilter.getAllBestSelling().subscribe((res)=>{
      this.product=res
      this.product=this.product.filter((prod:any)=>prod.brand==this.brand)

    })
  }
  gotoDetailPage(id:any){
    this._router.navigate(['',id])
  }
}
