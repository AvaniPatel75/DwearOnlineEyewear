import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { BestSellingProductService } from '../best-selling-product.service';
import { Product } from '../product';
import { YourCartServiceService } from '../your-cart-service.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-shape-detail',
  imports: [RouterLink,NgFor,NgIf],
  templateUrl: './shape-detail.component.html',
  styleUrl: './shape-detail.component.css'
})
export class ShapeDetailComponent {
  data: any = {}
  products: Product[] = []
  constructor(private _apiProductDetail: BestSellingProductService, private _router: Router, private _activatedRoute: ActivatedRoute,private _apiCrat:YourCartServiceService) { }
  shape: any = ''
  ngOnInit() {
    this.shape = this._activatedRoute.snapshot.paramMap.get('shape')
    console.log(this.shape);
  
    this._apiProductDetail.getAllBestSelling().subscribe((res)=>{
      this.products=res
      this.products=this.products.filter((prod)=>{prod.frame_shape===this.shape})
      console.log('filtered by shpae in shape detail page',this.products);
      
    })
  }
  gotoDetailPage(id: any) {
    this._router.navigate(['',id])
  }
  addTocart(data: any) {

    const userId = localStorage.getItem('userId');
    if (!userId || userId === 'undefined' || userId === 'null') {
      alert('Please log in first to add items to the cart.');
      this._router.navigate(['/login']);
      return;
    }
    console.log('userid', userId, 'productid', data._id);

    const cartItem = {
      user_id: userId,
      product_id: data._id,
      quantity: Number(1),
      selectedColor: data.frame_color,
      total_price: data.price,
      image_url:data.image_url
    };
    console.log('cartItemafetr userid from localstorage',cartItem);

    this._apiCrat.addtocartProduct(cartItem).subscribe({
      next: (res) => {
        console.log('Item added to cart:', res);
        this._router.navigate(['/viewAll/:product']);
      },
      error: (error) => {
        console.error('Error adding item to cart', error);
      }
    });
  }
}
