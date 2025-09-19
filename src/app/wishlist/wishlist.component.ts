import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { WhishlistServiceService } from '../whishlist-service.service';
import { CommonModule, JsonPipe, NgFor } from '@angular/common';
import { YourCartServiceService } from '../your-cart-service.service';
import { OrderService } from '../order.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-wishlist',
  imports: [RouterOutlet, NgFor, JsonPipe, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  @ViewChild('orderCheckCanvas', { static: false }) orderCheckCanvas!: ElementRef;
  data: any[] = []
  prod: any = {}
  order: any = {}
  orderForm!: FormGroup
  product: any = {}
  total_price = 0
  isFormOpen = false
  isPlaced = false
  totalPrice: Number = 0
  constructor(private _apiWhishlist: WhishlistServiceService, private _apiCart: YourCartServiceService, private _apiOrder: OrderService, private _router: Router, private _fb: FormBuilder) { }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Invalid UserId.....')
    }
    this.orderForm = this._fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['', [Validators.required, Validators.minLength(6)]],
      country: ['', [Validators.required]],
      payment_method: ['Credit Card', Validators.required],
    });

    this._apiCart.getAll().subscribe({
      next: (res: any) => {

        this.data = res;
        this.totalPrice = this.data.reduce((acc, item) => acc + item.total_price, 0);
        console.log(this.totalPrice);
        
        console.log("Total Price of All Products:", this.totalPrice);

        console.log('Cart data loaded:', this.data);
      },
      error: (err) => {
        console.error('Error fetching orders:', err);

      }
    });



  }


  // cancelOrder(orderId: string) {
  //   if (confirm("Are you sure you want to cancel this order?")) {
  //     this._apiCart.removeProductFromCart(orderId).subscribe({
  //       next: () => {
  //         alert("cart cancelled successfully");
  //         this.ngOnInit(); // Refresh order list
  //       },
  //       error: (error) => console.error("Error cancelling order", error)
  //     });
  //   }
  // }


 


  ngAfterViewInit() {
    console.log(this.orderCheckCanvas); // Ensure it exists
  }
  removeProduct(id: any) {
    this._apiCart.removeProductFromCart(id).subscribe({
      next: (res) => {
        console.log("Product removed:", res);
        // Update UI by fetching the updated cart
        this._apiWhishlist.getAll().subscribe((res) => { }) // Call a function that fetches the latest cart items
      },
      error: (err) => {
        console.error("Error removing product:", err);
      }
    });
  }
  // addToOrder(data:any,event:Event){
  //   this._apiOrder.addToOrder(data).subscribe((res)=>{
  //     this.order=res
  //   })
  // }
  proceedToOrder() {
    this.isFormOpen = true
  }
  placeOrder(data: any, event: Event) {
    // Check if the form is valid
    if (this.orderForm.invalid) {
      alert("Please fill in all the required fields.");
      return;
    }
    console.log('Form data to be sent:', this.orderForm.value);
  
    // Prepare the order data to send
    const items = data.map((item: any) => ({
      product_id: item.product_id,  // Product ID from the wishlist
      price: item.total_price,      // Total price of each item
      quantity: item.quantity,     // Quantity of the product
      selectedColor: item.selectedColor,  // Color selected
      image_url: item.image_url    // Image URL of the product
    }));
  console.log('items assigned:',items);
  
    const orderDetails = {
      user_id: localStorage.getItem('userId'),  // Assuming user ID is saved in local storage
      order_status: 'Pending',
      delivery_estimate: '3-5 business days',
      street: this.orderForm.value.street,
      city: this.orderForm.value.city,
      state: this.orderForm.value.state,
      pin: this.orderForm.value.pin,
      country: this.orderForm.value.country,
      payment_method: this.orderForm.value.payment_method,
      items: items  // Array of product details
    };
  console.log('orderdetail after product variable assigned',orderDetails);
  
    // Call the backend API to place the order
    this._apiOrder.addToOrder(orderDetails).subscribe(
      (res) => {
        this.isPlaced = true;
        console.log('Successfully added to order...');
        alert('Success! Order placed.')
        this._apiCart.clearCart(localStorage.getItem('userId')).subscribe((res)=>{
          console.log('clear cart',res);
        })
        this._router.navigate(['/orderDetail']);
      },
      (error) => {
        console.error('Error placing order:', error);
        alert('Failed to place order.');
      }
    );

  }
  


}
