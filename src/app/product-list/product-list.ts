import { Component } from '@angular/core';

// The products page.
//
// Requirements:
// - When it starts, it loads the products with ProductApi. While they load, <p id="loading"> says
//   "Loading products...". Then a table shows one <tr class="product"> per product, with the name in a
//   <td class="name">, the price as money, the units in stock, and a <button class="delete">.
// - If loading fails, <p id="message"> says "Sorry, the products couldn't be loaded (500)." with the
//   response's status.
// - A <select id="category"> offers "All categories" (value "") and each category in ../product.ts.
//   Choosing one loads that category's products; choosing "All categories" loads them all again.
// - Clicking a product's Delete button deletes it with the API, and takes its row away when the API answers.
// - The Add a product form has <input id="new-name">, <input id="new-price">, <select id="new-category">
//   and a <button id="add-product">. Adding sends the product to the API (id 0, units in stock 0, not
//   discontinued), adds the product the API sends back to the end of the table, and empties the name
//   and price. With no name, <p id="message"> says "Give the product a name." and nothing is sent.
@Component({
  imports: [],
  selector: 'app-product-list',
  templateUrl: './product-list.html',
})
export class ProductList {
  // TODO: inject ProductApi, and the signals and methods the page needs.
}
