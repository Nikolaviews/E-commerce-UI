import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product-service.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: Product[] = [];
  randomProducts2: Product[] = [];
  randomProducts: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      error => {
        console.log('Error fetching products:', error);
      }
    );
  }

  loadRandomProducts() {
    this.productService.getRandomProducts().subscribe(
      (data: Product[]) => {
        this.randomProducts = data;
      },
      error => {
        console.log('Error fetching random products:', error);
      }
    );
  }

  loadRandomProducts2() {
    this.productService.getRandomProducts2().subscribe(
      (data: Product[]) => {
        this.randomProducts2 = data;
      },
      error => {
        console.log('Error fetching random products:', error);
      }
    );
  }

  addToCart(product: Product) {
    this.productService.addToCart(product).subscribe(
      response => {
        console.log('Product added to cart successfully:', response);
        // You can handle success message or update cart here
      },
      error => {
        console.log('Error adding product to cart:', error);
      }
    );
  }
}
