import { Component } from '@angular/core';
import { BestSellingProductService } from '../best-selling-product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../product';
import { NgFor, NgIf } from '@angular/common';
import { CartServiceService } from '../cart-service.service';
import { YourCartServiceService } from '../your-cart-service.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-viewall',
  imports: [RouterLink,NgIf,NgFor],
  templateUrl: './viewall.component.html',
  styleUrl: './viewall.component.css'
})
export class ViewallComponent {
    constructor(private _apiBrandsFilter:BestSellingProductService,
                private _activateRoute:ActivatedRoute,
                private _router:Router,
                private _apiCart:YourCartServiceService,
                private _apiOrder:OrderService
              ){}
  
    brand:any=''
    product:Product[]=[]
    ngOnInit(){
      this._apiBrandsFilter.getAllBestSelling().subscribe((res)=>{
        this.product=res
      })
    }
    gotoDetailPage(id:any){
      this._router.navigate(['',id])
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
          this._router.navigate(['/viewAll/:product']);
        },
        error: (error) => {
          console.error('Error adding item to cart', error);
        }
      });
    }
    addToOrder(data: any, event: Event) {
      event.preventDefault();
    
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Please log in first to add items to the order.');
        this._router.navigate(['/login']);
        return;
      }
    
      const orderData = {
        user_id: userId,
        product_id: data._id,
        selectedColor: data.frame_color,
        image_url: data.image_url,
        quantity: 1
      };
    
      console.log('Adding to order:', orderData);
    
      this._apiOrder.addToOrder(orderData).subscribe({
        next: (res) => {
          console.log('Item added to order:', res);
          this._router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error adding item to order', error);
        }
      });
    }
}
