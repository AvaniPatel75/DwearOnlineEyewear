import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BestSellingProductService } from '../best-selling-product.service';
import { Product } from '../product';

@Component({

  selector: 'app-offer-page',
  imports: [RouterLink,NgFor,NgIf],
  templateUrl: './offer-page.component.html',
  styleUrl: './offer-page.component.css'
})
export class OfferPageComponent {

  constructor(private _api:BestSellingProductService,private _router:Router,private _activaedRoute:ActivatedRoute){}
  id:any=0
  num:any=0
  product:Product[]=[]
  ngOnInit(){
   this.num=this._activaedRoute.snapshot.paramMap.get('num')
   if(this.num==30){
    this._api.offerUpTO30().subscribe((res)=>{
      this.product=res
    })
   }
   else if(this.num==40){
    this._api.offerUpTO40().subscribe((res)=>{
      this.product=res
    })
   }
   else{
    this._api.offerUpTO50().subscribe((res)=>{
      this.product=res
    })
   }
  }
  gotoDetailPage(id:any){
    this._router.navigate(['',id])
  }
}
