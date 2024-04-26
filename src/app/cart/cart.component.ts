import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  displayedColumns: string[] = ['image', 'name', 'description', 'price', 'quantity', 'remove'];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe(
      (data: CartItem[]) => {
        this.cartItems = data;
      },
      error => {
        console.log('Error fetching cart items:', error);
      }
    );
  }

  updateQuantity(cartItemId: number, quantity: number): void {
    this.cartService.updateCartItemQuantity(cartItemId, quantity).subscribe(
      () => {
        this.loadCartItems();
      },
      error => {
        console.log('Error updating cart item quantity:', error);
      }
    );
  }

  removeItem(cartItemId: number): void {
    this.cartService.removeCartItem(cartItemId).subscribe(
      () => {
        this.loadCartItems();
      },
      error => {
        console.log('Error removing cart item:', error);
      }
    );
  }

  checkout(): void {
    // Implement checkout functionality
  }
}
