import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BestSellingProductService } from '../best-selling-product.service';
import { Product } from '../product';

@Component({
  selector: 'app-sell',
  imports: [RouterLink],
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.css'
})
export class SellComponent {

  num:any=0
  product:Product[]=[]
  constructor(private  _apiSale:BestSellingProductService,private _router:Router,private _activatedRouter:ActivatedRoute){}

  // ngOnInit(){
  //   this._apiSale.getAllBestSelling().subscribe((res)=>{
  //     this.product=res
  //   })
  // }
  offerpage(num:any){
    if(num==30){
      this._apiSale.offerUpTO30().subscribe((res)=>{
        this.product=res
      })
    }
    else if(num==40){
      this._apiSale.offerUpTO40().subscribe((res)=>{
        this.product=res
      })
    }
    else{
      this._apiSale.offerUpTO50().subscribe((res)=>{
        this.product=res
      })
    
    }
    this._router.navigate(['/offerUpTo',num])
  }
  
}
