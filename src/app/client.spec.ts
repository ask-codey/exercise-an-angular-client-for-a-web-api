import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Product } from './product';
import { ProductApi } from './product-api';
import { ProductList } from './product-list/product-list';

// These tests give the app a pretend API: HttpTestingController catches each request, and the test answers
// it. So they need no API running. Run them with: npm test. You don't need to change this file.

const chai: Product = { productId: 1, productName: 'Chai', categoryId: 1, unitPrice: 18, unitsInStock: 39, discontinued: false };
const chang: Product = { productId: 2, productName: 'Chang', categoryId: 1, unitPrice: 19, unitsInStock: 17, discontinued: false };
const syrup: Product = { productId: 3, productName: 'Aniseed Syrup', categoryId: 2, unitPrice: 10, unitsInStock: 13, discontinued: false };

describe('ProductApi', () => {
  let api: ProductApi;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    api = TestBed.inject(ProductApi);
    http = TestBed.inject(HttpTestingController);
  });

  it('gets every product', () => {
    let products: Product[] = [];
    api.getAll().subscribe(p => (products = p));
    const request = http.expectOne('/api/products');
    expect(request.request.method).toBe('GET');
    request.flush([chai, chang]);
    expect(products.map(p => p.productName)).toEqual(['Chai', 'Chang']);
  });

  it("gets one category's products", () => {
    api.getAll(2).subscribe();
    expect(http.expectOne('/api/products?categoryId=2').request.method).toBe('GET');
  });

  it('adds a product, and gives back what the API sends', () => {
    let added: Product | undefined;
    api.add({ ...chai, productId: 0 }).subscribe(p => (added = p));
    const request = http.expectOne('/api/products');
    expect(request.request.method).toBe('POST');
    expect(request.request.body.productName).toBe('Chai');
    request.flush({ ...chai, productId: 78 });
    expect(added?.productId).toBe(78);
  });

  it('deletes a product', () => {
    api.delete(7).subscribe();
    expect(http.expectOne('/api/products/7').request.method).toBe('DELETE');
  });
});

describe('ProductList', () => {
  let fixture: ComponentFixture<ProductList>;
  let page: HTMLElement;
  let http: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    http = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ProductList);
    page = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  const names = () => [...page.querySelectorAll('tr.product td.name')].map(td => td.textContent?.trim());
  const message = () => page.querySelector('#message')?.textContent?.trim();

  async function answer(url: string, body: object | null, status = 200) {
    const request = http.expectOne(url);
    if (status === 200) {
      request.flush(body);
    } else {
      request.flush('error', { status, statusText: 'Error' });
    }
    await fixture.whenStable();
    return request;
  }

  async function type(selector: string, value: string) {
    const input = page.querySelector(selector) as HTMLInputElement;
    expect(input, `an input ${selector}`).toBeTruthy();
    input.value = value;
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
  }

  it('shows Loading while the products load, then the products', async () => {
    expect(page.querySelector('#loading')?.textContent?.trim()).toBe('Loading products...');
    await answer('/api/products', [chai, chang, syrup]);
    expect(page.querySelector('#loading')).toBeNull();
    expect(names()).toEqual(['Chai', 'Chang', 'Aniseed Syrup']);
  });

  it('says so when the products fail to load', async () => {
    await answer('/api/products', null, 500);
    expect(message()).toBe("Sorry, the products couldn't be loaded (500).");
  });

  it("loads a category's products when one is chosen", async () => {
    await answer('/api/products', [chai, chang, syrup]);
    const select = page.querySelector('#category') as HTMLSelectElement;
    expect(select, 'a select with the id category').toBeTruthy();
    select.value = '2';
    select.dispatchEvent(new Event('change'));
    await fixture.whenStable();
    await answer('/api/products?categoryId=2', [syrup]);
    expect(names()).toEqual(['Aniseed Syrup']);
  });

  it('deletes a product and takes its row away', async () => {
    await answer('/api/products', [chai, chang]);
    (page.querySelectorAll('tr.product button.delete')[0] as HTMLButtonElement).click();
    const request = await answer('/api/products/1', null);
    expect(request.request.method).toBe('DELETE');
    expect(names()).toEqual(['Chang']);
  });

  it('adds a product with the form', async () => {
    await answer('/api/products', [chai]);
    await type('#new-name', 'Trail Mix');
    await type('#new-price', '4.5');
    (page.querySelector('#add-product') as HTMLButtonElement).click();
    await fixture.whenStable();
    const request = http.expectOne('/api/products');
    expect(request.request.method).toBe('POST');
    expect(request.request.body.productName).toBe('Trail Mix');
    expect(request.request.body.unitPrice).toBe(4.5);
    request.flush({ ...request.request.body, productId: 78 });
    await fixture.whenStable();
    expect(names()).toEqual(['Chai', 'Trail Mix']);
    expect((page.querySelector('#new-name') as HTMLInputElement).value).toBe('');
  });

  it("doesn't send a product without a name", async () => {
    await answer('/api/products', [chai]);
    (page.querySelector('#add-product') as HTMLButtonElement).click();
    await fixture.whenStable();
    http.expectNone('/api/products');
    expect(message()).toBe('Give the product a name.');
  });
});
