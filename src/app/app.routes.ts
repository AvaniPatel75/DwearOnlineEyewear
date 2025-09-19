import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BrandDetailComponent } from './brand-detail/brand-detail.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { MainComponent } from './main/main.component';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { OfferPageComponent } from './offer-page/offer-page.component';
import { authGuard } from './auth.guard';
import { SigninComponent } from './signin/signin.component';

import { WishlistComponent } from './wishlist/wishlist.component';
import { YourCartComponent } from './your-cart/your-cart.component';
import { ViewallComponent } from './viewall/viewall.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ProceedTpOrderComponent } from './proceed-tp-order/proceed-tp-order.component';
import { AboutComponent } from './about/about.component';
import { ShopComponent } from './shop/shop.component';
import { ProdileeditComponent } from './prodileedit/prodileedit.component';
import { ShapeDetailComponent } from './shape-detail/shape-detail.component';


export const routes: Routes = [
    { path: '',component: MainComponent},
    
    //{ path: '/homes',component: MainComponent},
    { path: 'signin', component: SigninComponent},
    { path: 'login', component: LoginComponent},
    {path:'profile',component:ProfileComponent},
    {path:'aboutUs',component:AboutComponent},
    {path:'shopDetails',component:ShopComponent},
    {path:'updateProfile',component:ProdileeditComponent},
    // { path: 'home', component: AppComponent,canActivate:[authGuardGuard]},
    {path:'Yourcart',component:WishlistComponent},
    {path:'placeOrder/:_id',component:ProceedTpOrderComponent},
    {path:'orderDetail',component:YourCartComponent},
    {path:'viewAll/:product',component:ViewallComponent},
    // {path:'viewAll/bestSellingProducts',component:ViewallComponent,canActivate:[authGuard]},
    // {path:'viewAll/popularProducts',component:ViewallComponent,canActivate:[authGuard]},
    // {path:'viewAll/newArrivals',component:ViewallComponent,canActivate:[authGuard]},
    {path:'frameshape/:shape',component:CategoryProductsComponent},
    {path:'product/:brand',component:BrandDetailComponent},
    {path:'gender/:gender',component:CategoryProductsComponent},
    {path:'offerUpTo/:num',component:OfferPageComponent},
    {path:':_id',component:DetailPageComponent}
    
    
    
];
