import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { BestSellingProductComponent } from "./best-selling-product/best-selling-product.component";
import { PreloaderComponent } from "./preloader/preloader.component";
import { MenuComponent } from "./menu/menu.component";
import { HeaderComponent } from './header/header.component';
import { SlideComponent } from "./slide/slide.component";
import { CategoryComponent } from './category/category.component';
import { SellComponent } from "./sell/sell.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { PopularProductComponent } from "./popular-product/popular-product.component";
import { LatestProductComponent } from "./latest-product/latest-product.component";
import { DownloadAppComponent } from "./download-app/download-app.component";
import { FooterComponent } from "./footer/footer.component";
import { FooterBottomComponent } from "./footer-bottom/footer-bottom.component";
import { HeaderRightsideIconComponent } from './header-rightside-icon/header-rightside-icon.component';
import { FeaturedProductComponent } from './featured-product/featured-product.component';
import { routes } from './app.routes';
import { PeopleSearchComponent } from "./people-search/people-search.component";



@Component({
  selector: 'app-root',
  imports: [PreloaderComponent, MenuComponent, HeaderComponent, FooterComponent, FooterBottomComponent, RouterOutlet, SlideComponent,BestSellingProductComponent,CategoryComponent,SellComponent,SignUpComponent,PopularProductComponent,DownloadAppComponent,LatestProductComponent,HeaderRightsideIconComponent,FeaturedProductComponent,PeopleSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MyFirstProjectDemo';

  // product=[{
	
  //    brand_name :  "Lenskart Air" ,
  //    product_id :206049,
  //    product_type :  "Eyeglasses ",
  //    frame_type :  "Full Rim" ,
  //    frame_shape :  "Square" ,
  //    model_no :  "LA E15308" ,
  //    frame_size : " Wide ",
  //    frame_width : 139,
  //    frame_dimensions :  52-19-145 ,
  //    frame_color :  "Crystal Transparent" ,
  //    weight : 17,
  //    weight_group :  "Light" ,
  //    material : {
  //      overall :  "TR90 & Stainless Steel" ,
  //      frame_material :  "TR90" ,
  //      temple_material :  "Stainless Steel" 
  //   },
  
  //    prescription_type: "Bifocal / Progressive",
  //   frame_style: "Light-Weight",
  //   frame_style_secondary: "Standard",
  //   image_url: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-silver-full-rim-rectangle-lenskart-air-signia-la-e15308-c3-eyeglasses_g_2421_02_11_23.jpg",
     
  // additional_images:[
  //    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-silver-full-rim-rectangle-lenskart-air-signia-la-e15308-c3-eyeglasses_g_2421_02_11_23.jpg"   ,
  //   "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-silver-full-rim-rectangle-lenskart-air-signia-la-e15308-c3-eyeglasses_g_2420_02_11_23.jpg",
  //   "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-silver-full-rim-rectangle-lenskart-air-signia-la-e15308-c3-eyeglasses_g_2423_02_11_23.jpg",
  //   "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-silver-full-rim-rectangle-lenskart-air-signia-la-e15308-c3-eyeglasses_g_2423_02_11_23.jpg",
  //   "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-silver-full-rim-rectangle-lenskart-air-signia-la-e15308-c3-eyeglasses_g_2421_image_pla_02_11_23.jpg"
  // ],
  
  //   price: 3499.00,
  //   created_at:"2025-01-19",
  //   updated_at:"2025-01-19",
  // stock_quantity: 50,
  //   rating: 4.6,
  //    reviews_count : 100,
  //    available_colors : [ "Crystal Transparent" ,  "Black" ,  "Brown" ],
  //    is_active : true,
  //   gender : "male" 
  // },
  
  // {
  
  
  //    brand :  "Lenskart Air" ,
  //    product_id :231984,
  //    product_type :  "Eyeglasses" ,
  //    model_no :  "LA E13517" ,
  //    gender :  "male" ,
  //    frame_type :  "Full Rim" ,
  //    frame_shape :  "Rectangle" ,
  //    frame_size :  "Medium" ,
  //    frame_width : 135,
  //    frame_dimensions :  54-16-148 ,
  //    frame_color :  "Crystal Transparent" ,
  //    weight : 17,
  //    weight_group :  "Light" ,
  //    material : {
  //      frame :  "TR90" ,
  //      temple :  "Acetate" 
  //   },
  //    prescription_type :  "Bifocal / Progressive" ,
  //    frame_style :  "Light-Weight" ,
  //    frame_style_secondary :  "You" ,
  //    image_url :  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-gold-full-rim-rectangle-lenskart-air-essentials-la-e13517-c2-eyeglasses_csvfile-1695816787888-g_7549_0_image_pla.jpg" ,
    
  //   additional_images :[
  //    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-gold-full-rim-rectangle-lenskart-air-essentials-la-e13517-c2-eyeglasses_csvfile-1695816787888-g_7549_0_image_pla.jpg" ,
  //  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-gold-full-rim-rectangle-lenskart-air-essentials-la-e13517-c2-eyeglasses_csvfile-1695816767916-g_7546_27_09_2023.jpg" ,
  //  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-gold-full-rim-rectangle-lenskart-air-essentials-la-e13517-c2-eyeglasses_csvfile-1695816805735-g_7549_1_27_09_2023.jpeg" ,
  //  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-gold-full-rim-rectangle-lenskart-air-essentials-la-e13517-c2-eyeglasses_csvfile-1695816839570-g_7553_27_09_2023.jpeg" ,
  //  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-gold-full-rim-rectangle-lenskart-air-essentials-la-e13517-c2-eyeglasses_csvfile-1695816894886-g_7555_27_09_2023.jpeg" 
  // ],
  //    price : 2999.00,
  //    created_at :  "2025-01-19" ,
  //    updated_at :  "2025-01-19" ,
  //    stock_quantity : 50,
  //    rating : 4.6,
  //    reviews_count : 100,
  //    available_colors : [ "Crystal Transparent" ,  "Black" ,  "Brown" ],
  //    is_active : true, 
  // }
  // ]
}
