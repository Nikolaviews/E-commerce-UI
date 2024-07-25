import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8060/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/showall`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getRandomProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/random`).pipe(
      catchError(this.handleError)
    );
  }
  getRandomProducts2(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/random2`).pipe(
      catchError(this.handleError)
    );
  }
  
  addToCart(product: Product): Observable<any> {
    return this.http.post(`${this.baseUrl}/addtocart`, product);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
