import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../services/product-service.service';
import { Product } from '../models/product.model';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
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

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
