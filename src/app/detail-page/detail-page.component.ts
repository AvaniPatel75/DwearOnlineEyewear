import { Component } from '@angular/core';
import { BestSellingProductComponent } from '../best-selling-product/best-selling-product.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BestSellingProductService } from '../best-selling-product.service';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { YourCartServiceService } from '../your-cart-service.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-detail-page',
  imports: [NgFor,NgIf,RouterLink,ReactiveFormsModule],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.css'
})
export class DetailPageComponent {

  constructor(private _apiDetail: BestSellingProductService, 
              private _router: Router, 
              private _activatedRoute: ActivatedRoute,
              private _fb:FormBuilder,
              private _apiCart:YourCartServiceService,
              private _apiOrder:OrderService
            ) { }
  isFormOpen=false
  isPlaced=false
  orderForm!:FormGroup
  id: any = ''
  data: any = {}
  img: string[] = [];
  ngOnInit() {
      const userId = localStorage.getItem('userId');
    
   
    this.orderForm = this._fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['', [Validators.required, Validators.minLength(6)]],
      country: ['', [Validators.required]],
      payment_method: ['Credit Card', Validators.required],
    });
    const id = this._activatedRoute.snapshot.params['_id']; // ❌ Wrong

    console.log(id);
    this._apiDetail.getByIdProduct(id).subscribe(
      (res) => {
          this.data = res;
          console.log('Product data:', res);
          // this._router.navigate(["", id]);
      },
      (error) => {
          console.error('Error fetching product by ID:', error);
      }
  );
  }
  // removeProduct(id: any) {
  //   this._apiCart.removeProductFromCart(id).subscribe({
  //     next: (res) => {
  //       console.log("Product removed:", res);
  //       // Update UI by fetching the updated cart
  //       this._apiWhishlist.getAll().subscribe((res) => { }) // Call a function that fetches the latest cart items
  //     },
  //     error: (err) => {
  //       console.error("Error removing product:", err);
  //     }
  //   });
  // }
  proceedToOrder(id:any) {
   this._router.navigate(['/placeOrder',id])
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
        this._router.navigate(['/',data._id]);
        this.orderForm.reset();
      this.isFormOpen = false;
      },
      error: (error) => {
        console.error('Error adding item to cart', error);
      }
    });
  }


}
