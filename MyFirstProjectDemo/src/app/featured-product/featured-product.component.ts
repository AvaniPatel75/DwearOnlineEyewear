import { Component } from '@angular/core';
import { BestSellingProductService } from '../best-selling-product.service';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { Product } from '../product';
import { NgFor } from '@angular/common';
import { CartServiceService } from '../cart-service.service';
import { YourCartServiceComponent } from '../your-cart-service/your-cart-service.component';
import { AuthService } from '../auth.service';
import { YourCartServiceService } from '../your-cart-service.service';
import { FormsModule, NgModel } from '@angular/forms';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-featured-product',
  imports: [RouterLink,NgFor,FormsModule],
  templateUrl: './featured-product.component.html',
  styleUrl: './featured-product.component.css'
})
export class FeaturedProductComponent {
  product: Product[] = [];
  data:any={}
  minRating = 3;
  productQuantities: number[] = [];

  constructor(
    private _apiProduct: BestSellingProductService,
    private _router: Router,
    private _activatedRoute:ActivatedRoute,
    private _apiCart:YourCartServiceService,
    private _authService:AuthService,
    private _apiOrder:OrderService
  )
 { }
  id:any=0
  ngOnInit() {
    this.id=this._activatedRoute.snapshot.paramMap.get('id')
    // console.log("Id of bestdellingproduct by id",this.id);
    
   this._apiProduct.getAllBestSelling().subscribe((res:Product[])=>{
    this.product=res;
    this.product = this.product.filter((prod)=>prod.rating > 4.7)
    this.productQuantities = new Array(this.product.length).fill(1);
    
   })
  
  }
  getBestSellingById(id:any){
    this._apiProduct.getByIdProduct(id).subscribe((res)=>{
      this.data=res
  })
  }
  gotoDetailPage(id:any){
    this._apiProduct.getByIdProduct(id).subscribe((res)=>{
      this.data=res
      this._router.navigate([id])
    })
  }
  addTocart(data: any,event: Event) {
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
      quantity:Number(1),
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
    console.log('UserId from addToOrder:',userId);
    
    if (!userId) {
      alert('Please log in first to add items to the order.');
      this._router.navigate(['/login']);
      return;
    }
  
    const orderData = {
      user_id: userId,
      items: [ 
        {
          product_id: data._id,
          price: data.price,
          placedQuantity:Number(data.quantity)|1,
          selectedColor: data.frame_color,
          image_url: data.image_url,
          total_price: data.price,
          quantity: 1
        }
      ]
    };
  
    console.log('Sending Order Data:',orderData);
  
    this._apiOrder.addToOrder(orderData).subscribe({
      next: (res: any) => {
        console.log('Item added to order:', res);
        this._router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error adding item to order', error);
      }
    });
  }
  
}
