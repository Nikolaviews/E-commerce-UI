import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8080/api/cart';

  constructor(private http: HttpClient) { }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}/items`);
  }

  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, { productId, quantity });
  }

  updateCartItemQuantity(cartItemId: number, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${cartItemId}`, { quantity });
  }

  removeCartItem(cartItemId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${cartItemId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/clear`);
  }
}
