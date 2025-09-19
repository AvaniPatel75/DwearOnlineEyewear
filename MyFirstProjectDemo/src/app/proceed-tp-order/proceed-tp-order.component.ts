import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../order.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { YourCartServiceService } from '../your-cart-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-proceed-tp-order',
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './proceed-tp-order.component.html',
  styleUrl: './proceed-tp-order.component.css'
})
export class ProceedTpOrderComponent {
  orderForm!: FormGroup;
  products: any[] = [];
  product: any = {}
  totalPrice: number = 0;
  id: any = ''
  constructor(
    private fb: FormBuilder,
    private _apiOrder: OrderService,
    private _router: Router,
    private _apiCart: YourCartServiceService,
    private _activatedRoute: ActivatedRoute,
    private _http: HttpClient
  ) { }

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.paramMap.get('_id');
    console.log("Proceed to order ID:", this.id);
    if (this.id) {
      this.getProductToOrder(this.id);
    } else {
      console.error("No product ID found in route!");
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Invalid UserId.....')
      return
    }
    this.orderForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['', [Validators.required, Validators.minLength(6)]],
      country: ['', [Validators.required]],
      payment_method: ['Credit Card', Validators.required],
    });
    
  }
  // getAllCartItems() {
  //   this._apiCart.getAll().subscribe(
  //     (res: any) => {
  //       this.products = res; // Assign the response correctly
  //       this.calculateTotalPrice();
  //     },
  //     (error) => {
  //       console.error('Error fetching cart items:', error);
  //     }
  //   );
  // }
  // calculateTotalPrice(): void {
  //   this.totalPrice = this.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // }
  getProductToOrder(id: string) {
    if (!id) {
      console.error("Product ID is missing");
      return;
    }
    this._apiCart.getCartById(id).subscribe(
      (res: any) => {
        this.product = res;
        console.log('Fetched product:', this.product);
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }
  placeOrder(product: any, event: Event) {
    event.preventDefault();

    if (this.orderForm.invalid) {
      alert("Please fill in all required fields.");
      return;
    }


    console.log('getby id', this.id, 'data', this.product);

    const orderDetails = {
      user_id: localStorage.getItem('userId'),
      order_status: 'Pending',
      delivery_estimate: '3-5 business days',
      street: this.orderForm.value.street,
      city: this.orderForm.value.city,
      state: this.orderForm.value.state,
      pin: this.orderForm.value.pin,
      country: this.orderForm.value.country,
      payment_method: this.orderForm.value.payment_method,
      items: [
        {
          product_id: this.product._id,
          model_no: this.product.model_no,
          price: this.product.price,
          selectedColor: this.product.frame_color,
          placedQuantity: 1,
          image_url: this.product.image_url
        }
      ]
    };
  }



  //   placeFinalOrder(id: string, orderData: any) {
  //     if (!id) {
  //       alert(' ID is missing');
  //       return;
  //     }

  //     // Prepare the final order data
  //     const finalOrderData = {
  //       ...orderData, 
  //      _id:id
  //     };

  //     console.log('placefinalorder', finalOrderData);

  //     // Send the order data to the backend (API endpoint to place the order)
  //     this._apiOrder.updateOrder(this.id,finalOrderData).subscribe(
  //       (response) => {
  //         console.log('Server Response:', response);
  //         alert('Your order has been placed successfully!');
  //         // Redirect or perform any other actions upon successful order placement
  //       },
  //       (error) => {
  //         console.error('Error placing order', error);
  //         alert('Error placing order. Please try again later.');
  //       }
  //     )
  //   }

}


