import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterConfigOptions, RouterLink } from '@angular/router';
import { BestSellingProductService } from '../best-selling-product.service';
import { Product } from '../product';
import { NgFor } from '@angular/common';
import { CartServiceService } from '../cart-service.service';
import { YourCartServiceService } from '../your-cart-service.service';
import { ShapeDetailComponent } from '../shape-detail/shape-detail.component';

@Component({
  selector: 'app-category-products',
  imports: [RouterLink,NgFor],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent {

  data: any = {}
  products: Product[] = []
  constructor(private _apiProductDetail: BestSellingProductService, private _router: Router, private _activatedRoute: ActivatedRoute,private _apiCrat:YourCartServiceService) { }
  gender: any = ''
  shape:any=''
  ngOnInit() {
    this.gender = this._activatedRoute.snapshot.paramMap.get('gender')
    this.shape=this._activatedRoute.snapshot.paramMap.get('shape')
    console.log(this.gender);
    
    
    if (this.gender == 'male') {

      this._apiProductDetail.filterProductByMale().subscribe((res) => {
        this.products = res
        console.log(this.products);
      })
      
    }
    else if (this.gender == 'women') {
      this._apiProductDetail.filterProductByWomen().subscribe((res) => {
        this.products = res
        console.log(this.products);

      })
    }
    else if (this.gender == 'kid') {
      this._apiProductDetail.filterProductByKid().subscribe((res) => {
        this.products = res
        console.log(this.products);

      })
    }
    else if (this.gender=='unisex'){
     
        this._apiProductDetail.filterProductByUnisex().subscribe((res) => {
          this.products = res
          console.log(this.products);

        
        })
    }
   else{
    this._apiProductDetail.getAllBestSelling().subscribe((res)=>{
      this.products=res
      this.products=this.products.filter((prod)=>{
        prod.frame_shape===this.shape
      })
    })
   }
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
