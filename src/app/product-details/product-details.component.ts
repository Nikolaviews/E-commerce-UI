import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product!: Product;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { product: Product },
    private productService: ProductService
  ) {
    if (data && data.product) {
      this.product = data.product;
    } else {
      console.error('No product data provided');
    }
  }

  addToCart(product: Product): void {
    if (product) {
      this.productService.addToCart(product).subscribe(
        (response: any) => {
          console.log('Product added to cart:', response);
        },
        error => {
          console.log('Error adding product to cart:', error);
        }
      );
    } else {
      console.error('Invalid product');
    }
  }
}