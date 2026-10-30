import { Component } from '@angular/core';
import { ProductList } from './product-list/product-list';

@Component({
  imports: [ProductList],
  selector: 'app-root',
  template: `
    <main class="container py-4">
      <h1 class="h3 mb-3">Northwind Products</h1>
      <app-product-list />
    </main>
  `,
})
export class App {}
