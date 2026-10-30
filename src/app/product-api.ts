import { Service } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Product } from './product';

// Calls the products API from Exercise: Northwind Web API.
//
// Requirements:
// - getAll(categoryId) sends GET /api/products, or GET /api/products?categoryId=2 when a category is given.
// - add(product) sends POST /api/products with the product as JSON, and gives back the product the API
//   sends back.
// - delete(productId) sends DELETE /api/products/{productId}.
// - Each method returns the observable from HttpClient; it doesn't subscribe itself.
@Service()
export class ProductApi {
  getAll(categoryId?: number): Observable<Product[]> {
    return EMPTY;
  }

  add(product: Product): Observable<Product> {
    return EMPTY;
  }

  delete(productId: number): Observable<void> {
    return EMPTY;
  }
}
