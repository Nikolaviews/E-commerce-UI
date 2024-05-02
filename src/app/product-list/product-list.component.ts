import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product-service.service';
import { Product } from '../models/product.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  maxPrice: number = 0;
  filterOptions: any = { searchName: '', selectedProduct: '', priceRange: 0 };
  productDescriptions: any;

  constructor(
    private productService: ProductService,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  productDetails(product: Product): void {
    if (product && product.id) { 
      this.productService.getProductById(product.id).subscribe(
        (data: Product) => {
          this.bottomSheet.open(ProductDetailsComponent, {
            data: { product: data }
          });
        },
        error => {
          console.log('Error fetching product details:', error);
        }
      );
    } else {
      console.log('Invalid product or product ID');
    }
  }   

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.filteredProducts = [...this.products];
        this.maxPrice = Math.max(...this.products.map(product => product.price));
      },
      error => {
        console.log('Error fetching products:', error);
      }
    );
  }

  applyFilters(): void {
    let filteredList = [...this.products];
    if (this.filterOptions.searchName) {
      filteredList = filteredList.filter(product => product.name.toLowerCase().includes(this.filterOptions.searchName.toLowerCase()));
    }
    if (this.filterOptions.selectedDescription) {
      filteredList = filteredList.filter(product => product.description === this.filterOptions.selectedDescription);
    }
    if (this.filterOptions.selectedProduct) {
      filteredList = filteredList.filter(product => product.name === this.filterOptions.selectedProduct);
    }
    if (this.filterOptions.priceRange > 0) {
      filteredList = filteredList.filter(product => product.price <= this.filterOptions.priceRange);
    }
    this.filteredProducts = filteredList;
  }

  loadProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe(
      (data: any) => {
        this.productDetails(data);
      },
      (error) => {
        console.log('Error fetching product details:', error);
      }
    );
  }  

  addToCart(product: Product): void {
    this.productService.addToCart(product).subscribe(
      (response: any) => {
        console.log('Product added to cart:', response);
      },
      error => {
        console.log('Error adding product to cart:', error);
      }
    );
  }
}
