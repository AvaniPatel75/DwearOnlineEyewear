import { Component } from '@angular/core';
import { BestSellingProductService } from '../best-selling-product.service';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../product';
import { NgFor } from '@angular/common';
import { YourCartServiceService } from '../your-cart-service.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-latest-product',
  imports: [NgFor,RouterLink],
  templateUrl: './latest-product.component.html',
  styleUrl: './latest-product.component.css'
})
export class LatestProductComponent {

  constructor(private _apiLatestProduct:BestSellingProductService,
              private _router:Router,
              private _apiCart:YourCartServiceService,
              private _apiOrder:OrderService
            ){}
  product:Product[]=[]
  data:any={}
  id:any=0
  
  ngOnInit(){
    const storedUserId=localStorage.getItem('userId')
    this._apiLatestProduct.getAllBestSelling().subscribe((res)=>{
      this.product=res
      const today = new Date();
      const last40Days = new Date();
      last40Days.setDate(today.getDate() - 40);
  
      this.product = this.product.filter((prod) => new Date(prod.created_at) >= last40Days);
    })
  }
  gotoDetailPage(id:any){
    console.log('inside gotodetailpage',id);
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
      image_url:data.image_url,
      total_price: data.price
    };
    console.log('cartItemafetr userid from localstorage',cartItem);

    this._apiCart.addtocartProduct(cartItem).subscribe({
      next: (res:any) => {
        console.log('Item added to cart:', res);
        this._router.navigate(['/']);
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
      price:data.price,
      model_no:data.model_no,
      selectedColor: data.frame_color,
      image_url: data.image_url,
      total_price:data.price,
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
