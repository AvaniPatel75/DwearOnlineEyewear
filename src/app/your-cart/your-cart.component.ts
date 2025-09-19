import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CartServiceService } from '../cart-service.service';
import { CommonModule, JsonPipe, NgFor } from '@angular/common';
import { SlideComponent } from '../slide/slide.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../auth';
import { OrderService } from '../order.service';
import { YourCartServiceService } from '../your-cart-service.service';
declare var bootstrap: any;

@Component({
  selector: 'app-your-cart',
  imports: [RouterLink, RouterOutlet, NgFor, JsonPipe, ReactiveFormsModule, CommonModule],
  templateUrl: './your-cart.component.html',
  styleUrl: './your-cart.component.css'
})

export class YourCartComponent {

  constructor(private _apiOrder: OrderService, private _apiCart: YourCartServiceService, private _router: Router, private _fb: FormBuilder) {

  }
  orderForm!: FormGroup
  data: any[] = []
  order: any = {}
  orders: any[] = []
  product: any = {}
  total_price = 0
  isFormOpen = false
  isPlaced=false
  //userId:any=''
  ngOnInit() {
    // this.userId=localStorage.getItem('userId')
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Invalid UserId.....')
      return
    }
    this._apiOrder.getAllOrder().subscribe({
      next: (res: any) => {
        this.data = res.map((order: any) => ({
          ...order,
          totalPrice: this.calculateTotalPrice(order) // Assign total price dynamically
        }));
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
        this.data = [];
      }
    });
   
  }
  

  cancelOrder(orderId: string) {
    if (confirm("Are you sure you want to cancel this order?")) {
      this._apiOrder.removeProduct(orderId).subscribe({
        next: () => {
          alert("Order cancelled successfully");
          this.ngOnInit(); // Refresh order list
        },
        error: (error) => console.error("Error cancelling order", error)
      });
    }
  }
  calculateTotalPrice(order: any): number {
    if (!order.items || order.items.length === 0) {
      return 0;
    }
    return order.items.reduce((sum: any, item: any) => sum + (item.price * item.placedQuantity || 0), 0);
  }


  //Function to place an order
  // placeOrder(order: any) {
  //   if (!order.totalPrice) {
  //     alert('Please calculate the total price first!');
  //     return;
  //   }

  //   const orderData = {
  //     user_id: order.user_id,
  //     items: order.items,
  //     total_price: order.totalPrice,
  //     payment_method: order.payment_method,
  //     delivery_estimate: order.delivery_estimate,
  //     country: order.country,
  //   };

  //   this._apiOrder.placeOrder(orderData).subscribe({
  //     next: (res: any) => {
  //       alert('Order placed successfully!');
  //       console.log('Order Response:', res);
  //     },
  //     error: (error) => {
  //       console.error('Error placing order', error);
  //     }
  //   });
  // }
  // proceddToOrder(event:Event){

  // }
  // buttonToggel() {
  //   this.isFormOpen = true
  // }
  placeOrder(order: any, event: Event) {
    if (this.orderForm.invalid) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Log the form data for inspection
    console.log('Form data to be sent:', this.orderForm.value);

    // Validate required fields
    // if (!data.userId || !data.items || !data.total_price) {
    //   console.error('Missing required fields in order form data.');
    //   alert('Missing required fields in order form data.');
    //   return;
    // }
    console.log('order', order);
    // this._apiOrder.getAllOrder().subscribe((res) => {
    //   this.product = {
    //     user_id: localStorage.getItem('userId'),
    //     order_status: 'Pending',
    //     delivery_estimate: '3-5 business days',
    //     street: this.orderForm.value.street,
    //     city: this.orderForm.value.city,
    //     state: this.orderForm.value.state,
    //     pin: this.orderForm.value.pin,
    //     country: this.orderForm.value.country,
    //     payment_method: this.orderForm.value.payment_method,
    //     items: order.items // Include the order items
    //   }
    //   console.log('inside get all method ...', this.product);
    //   this.orders.push(this.product)
    //   console.log('ordersArray:',this.orders);
      
    //   // this._apiOrder.addToOrder(this.product).subscribe((res) => {
      //   console.log('added success...1d5c');

      // })

    //})
    //Now, combine 'data' with the values from 'orderForm'
    this.product = {
      user_id:localStorage.getItem('userId'),
      order_status: 'Pending',
      delivery_estimate: '3-5 business days',
      street: this.orderForm.value.street,
      city: this.orderForm.value.city,
      state: this.orderForm.value.state,
      pin: this.orderForm.value.pin,
      country: this.orderForm.value.country,
      payment_method: this.orderForm.value.payment_method,
      items: order.items.map((item: any) => ({
        product_id: item.product_id,        // Ensure to pass product ID
        price: item.price,                  // Include the price
        quantity: item.placedQuantity,      // Quantity ordered
        selectedColor: item.selectedColor, 
        image_url:item.image_url // Selected color
      }))  // Include the order items
    };
    console.log('product', this.product);
    

    // Proceed with the API call
    this._apiOrder.addToOrder(this.product).subscribe(
      (res) => {
        this.isPlaced=true
        console.log('Successfully added to order...');
        alert('Success! Order placed.');
        // this.product.order_status='Placed'
        this._router.navigate(['/orderDetail'])
      },
      (error) => {
        console.error('Error placing order:', error);
        alert('Failed to place order.');
      }
    );

  }
  





}
