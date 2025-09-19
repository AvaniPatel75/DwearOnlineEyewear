import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from './product';
import { Observable, of, share, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BestSellingProductService {

  private _url="http://localhost:3002/"
  private products: Product[]=[]
  constructor(private _http:HttpClient,private _activatedRouter:ActivatedRoute) { }
  id:any=''
  data:any[]=[]
  brand:any=''
  gender:any=''
  shape:any=''  
  ngOnInit(){
    const storedUserId=localStorage.getItem('userId')
    console.log('Retrieved userId on Init:', storedUserId);
  }
  
  getByIdProduct(id:any):Observable<Product>{
    return this._http.get<any>(this._url+'product/'+id)
  }
  
  getAllBestSelling():Observable<Product[]>{
    return this._http.get<any[]>(this._url+"product");
  }
  filterProductByBrands(brand:any): Observable<Product[]> {
    this.brand = this._activatedRouter.snapshot.paramMap.get('brand');
    console.log('this bransd in service',brand);
    return this._http.get<Product[]>(this._url+'product/brand/'+ this.brand);
  }
  filterProductByMale():Observable<Product[]>{
    this.gender=this._activatedRouter.snapshot.paramMap.get('male');
    return this._http.get<Product[]>(this._url + "product/gender/male" );
  }
  filterProductByWomen():Observable<Product[]>{
    this.gender=this._activatedRouter.snapshot.paramMap.get('women');
    return this._http.get<Product[]>(this._url + "product/gender/women" );
  }
  filterProductByKid():Observable<Product[]>{
    this.gender=this._activatedRouter.snapshot.paramMap.get('kid');
    return this._http.get<Product[]>(this._url + "product/gender/kid" );
  }
  filterProductByUnisex():Observable<Product[]>{
    this.gender=this._activatedRouter.snapshot.paramMap.get('unisex');
    return this._http.get<Product[]>(this._url + "product/gender/unisex" );
  }
  filterProductByFrameShape():Observable<Product[]>{
    this.shape=this._activatedRouter.snapshot.paramMap.get('frame_shape');
    return this._http.get<Product[]>(this._url+'product/frameshape/'+this.shape)
  }
  // bestSelling():Observable<Product[]>{
  //  return  this._http.get<Product[]>(this._url+'bestSelling')
  // }
  // justArrived():Observable<Product[]>{
  //   return  this._http.get<Product[]>(this._url+'newArrival')
  // }
  // popularProduct():Observable<Product[]>{
  //   return  this._http.get<Product[]>(this._url+'popularProduct')
  // }
  // featuredProdyct():Observable<Product[]>{
  //   return  this._http.get<Product[]>(this._url+'featuredProduct')
  // }
  offerUpTO30():Observable<Product[]>{
    return this._http.get<Product[]>(this._url+'product/offerUpTo30')
  }
  offerUpTO40():Observable<Product[]>{
    return this._http.get<Product[]>(this._url+'product/offerUpTo40')
  }
  offerUpTO50():Observable<Product[]>{
    return this._http.get<Product[]>(this._url+'product/offerUpTo50')
  }
  
}

