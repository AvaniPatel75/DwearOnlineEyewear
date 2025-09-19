import { Component } from '@angular/core';
import { SlideComponent } from '../slide/slide.component';
import { CategoryComponent } from '../category/category.component';
import { BestSellingProductComponent } from '../best-selling-product/best-selling-product.component';
import { SellComponent } from '../sell/sell.component';
import { FeaturedProductComponent } from '../featured-product/featured-product.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { PopularProductComponent } from '../popular-product/popular-product.component';
import { LatestProductComponent } from '../latest-product/latest-product.component';
import { DownloadAppComponent } from '../download-app/download-app.component';
import { PeopleSearchComponent } from '../people-search/people-search.component';

@Component({
  selector: 'app-main',
  imports: [SlideComponent,CategoryComponent,BestSellingProductComponent,SellComponent,FeaturedProductComponent,SignUpComponent,PopularProductComponent,LatestProductComponent,DownloadAppComponent,PeopleSearchComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
