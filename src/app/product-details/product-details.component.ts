import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product-service.service';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  product!: Product;
  selectedQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<ProductDetailsComponent>
  ) { }

  ngOnInit(): void {
    this.product = this.data.product;
    // If product is not passed through data, extract productId from route params
    if (!this.product && this.route.snapshot.params['id']) {
      this.productId = +this.route.snapshot.params['id'];
      this.loadProduct();
    }
  }

  loadProduct() {
    this.productService.getProductById(this.productId).subscribe(
      (data: Product) => {
        this.product = data;
      },
      error => {
        console.log('Error fetching product details:', error);
      }
    );
  }

  addToCart() {
    this.cartService.addToCart(this.product.id, this.selectedQuantity).subscribe(
      response => {
        console.log('Product added to cart successfully:', response);
      },
      error => {
        console.log('Error adding product to cart:', error);
      }
    );
  }

  close(): void {
    this.bottomSheetRef.dismiss();
  }

// trail
  products: Product[] = [];
  productDetails(product: Product): void {
    if (product && product.id) { // Check if the product ID is valid
      this.productService.getProductById(product.id).subscribe(
        (data: Product) => {
          console.log('Products visible');
        },
        error => {
          console.log('Error fetching product details:', error);
        }
      );
    } else {
      console.log('Invalid product or product ID');
    }
  }   
}
