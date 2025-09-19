import { Component, model } from '@angular/core';
import { BestSellingProductService } from '../best-selling-product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { NgFor, NgIf } from '@angular/common';
import { Product } from '../product';
import { YourCartServiceService } from '../your-cart-service.service';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-best-selling-product',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './best-selling-product.component.html',
  styleUrl: './best-selling-product.component.css'
})
export class BestSellingProductComponent {
  product: Product[] = [];
  data: any = {}
  minRating = 3;
  constructor(private _apiProduct: BestSellingProductService, 
              private _router: Router, 
              private _activatedRoute: ActivatedRoute, 
              private _apiCart: YourCartServiceService, 
              private _authService: AuthService,
              private _apiOrder:OrderService)
   { }
  id: any = 0
  ngOnInit() {


    this._apiProduct.getAllBestSelling().subscribe((res: Product[]) => {
      this.product = res;
      this.product = this.product.filter((prod) => prod.rating > 4.7)

    })
    // this.getBestSellingById(this.id)

  }

  gotoDetailPage(id: any) {
    this._router.navigate(['', id])

  }
  addTocart(data: any, event: Event) {
    event.preventDefault();

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

    this._apiCart.addtocartProduct(cartItem).subscribe({
      next: (res) => {
        console.log('Item added to cart:', res);
        this._router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error adding item to cart', error);
      }
    });
  }
  
  
  
  
  


}