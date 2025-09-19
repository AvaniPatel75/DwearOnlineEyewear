import { Component, Renderer2, HostListener } from '@angular/core';
import { BestSellingProductService } from '../best-selling-product.service';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { Product } from '../product';
import { BestSellingProductComponent } from "../best-selling-product/best-selling-product.component";
import { CategoryComponent } from '../category/category.component';

@Component({
    selector: 'app-menu',
    imports: [RouterLink, BestSellingProductComponent, CategoryComponent],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css'
})
export class MenuComponent {

    constructor(private _apiproduct: BestSellingProductService, private _router: Router, private _activatedRoute: ActivatedRoute, private renderer: Renderer2) { }
    category: any = ''
    shape: any = ''
    product: Product[] = []
    ngOnInin() {
        this.category = this._activatedRoute.snapshot.paramMap.get('category')
        this.shape = this._activatedRoute.snapshot.paramMap.get('shape')
        console.log(this.shape, this.category);

    }
    goToCategoryPageUsingMale(gender: any) {

        this._apiproduct.filterProductByMale().subscribe((res) => {
            console.log("Filtered Products:", res);
            this.product = res;

            if (Array.isArray(this.product) && this.product.length > 0) {
                this._router.navigate([`/gender/${gender}`]);
            } else {
                console.log("No products found for this brand.");
            }
        },
            (error) => {
                console.error("Error fetching products by brand:", error);
            })
    }
    goToCategoryPageUsingWomen(gender: any) {

        this._apiproduct.filterProductByWomen().subscribe((res) => {
            console.log("Filtered Products:", res);
            this.product = res;

            if (Array.isArray(this.product) && this.product.length > 0) {
                this._router.navigate([`/gender/${gender}`]);
            } else {
                console.log("No products found for this brand.");
            }

        },
            (error) => {
                console.error("Error fetching products by brand:", error);
            })
    }
    goToCategoryPageUsingKid(gender: any) {
        this._apiproduct.filterProductByKid().subscribe((res) => {
            console.log("Filtered Products:", res);
            this.product = res;

            if (Array.isArray(this.product) && this.product.length > 0) {
                this._router.navigate([`/gender/${gender}`]);
            } else {
                console.log("No products found for this brand.");
            }
        },
            (error) => {
                console.error("Error fetching products by brand:", error);
            })
    }
    goToCategoryPageUsingUnisex(gender: any) {
        this._apiproduct.filterProductByUnisex().subscribe((res) => {
            console.log("Filtered Products:", res);
            this.product = res;

            if (Array.isArray(this.product) && this.product.length > 0) {
                this._router.navigate([`/gender/${gender}`]);
            } else {
                console.log("No products found for this brand.");
            }
        },
            (error) => {
                console.error("Error fetching products by brand:", error);
            })

    }
    goToCategoryPageShape(shape: any) {
        this._apiproduct.getAllBestSelling().subscribe((res) => {
            // Assign the fetched products to this.product
            this.product = res;  
            
            // Filter products based on shape
            this.product = this.product.filter((prod) => prod.frame_shape === shape);
    
            console.log('Filtered product by shape', this.product);
        });
    }
    
    goToCategoryPageUsingbrands(brand: any) {
        this._apiproduct.filterProductByBrands(brand).subscribe(
            (res) => {
                console.log("Filtered Products BrandWise:", res);
                this.product = res;

                if (Array.isArray(this.product) && this.product.length > 0) {
                    this._router.navigate([`/product/${brand}`]);
                } else {
                    console.log("No products found for this brand.");
                }
            },
            (error) => {
                console.error("Error fetching products by brand:", error);
            }
        );
    }

    closeSidebar(gender: string) {
        this._router.navigate(['/gender', gender])
    }
}



