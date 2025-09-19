import { Component } from '@angular/core';
import { BestSellingProductService } from '../best-selling-product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../product';
import { NgFor } from '@angular/common';
import { YourCartServiceComponent } from '../your-cart-service/your-cart-service.component';
import { YourCartServiceService } from '../your-cart-service.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-popular-product',
  imports: [NgFor,RouterLink],
  templateUrl: './popular-product.component.html',
  styleUrl: './popular-product.component.css'
})
export class PopularProductComponent {

  data:any={}
  id:any=0
  product:Product[]=[]
  constructor(private _apiPopularProduct:BestSellingProductService,
              private _router:Router,
              private _activatedRoute:ActivatedRoute,
              private _apiCart:YourCartServiceService,
              private _apiOrder:OrderService
            ){}

  ngOnInit(){

    this._apiPopularProduct.getAllBestSelling().subscribe((res:Product[])=>{
      this.product=res;
      this.product = this.product.filter((prod)=>prod.reviews_count<100)
      
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
    const image_url = data.image_url;
    const cartItem = {
      user_id: userId,
      product_id: data._id,
      quantity: Number(1),
      selectedColor: data.frame_color,
      total_price: data.price,
      image_url:image_url
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
      price:data.model_no,
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
