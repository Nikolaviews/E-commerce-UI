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

  constructor(
    private productService: ProductService,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  productDetails(product: Product): void {
    if (product && product.id) { // Check if the product ID is valid
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
      },
      error => {
        console.log('Error fetching products:', error);
      }
    );
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

  applyFilters(filters: any): void {
    this.filteredProducts = this.products.filter(product => product.name.includes(filters.searchName));

    if (filters.selectedProduct) {
      this.filteredProducts = this.filteredProducts.filter(product => product.name === filters.selectedProduct);
    }
    this.filteredProducts = this.filteredProducts.filter(product => product.price <= filters.priceRange);
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
