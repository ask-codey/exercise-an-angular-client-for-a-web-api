# Exercise: an Angular Client for a Web API

Exercise code for the lesson **Exercise: an Angular Client for a Web API** in the C# Full-Stack Bootcamp on [ask-codey.com](https://www.ask-codey.com).

Your products API from *Exercise: Northwind Web API* gets a front end: an Angular page that lists the products, filters them by category, deletes them and adds new ones.

## What's here

An Angular 22 app, with Bootstrap and a proxy (`proxy.conf.json`) that sends `/api` requests to the API at http://localhost:5179.

- `src/app/product.ts`: a product, and Northwind's categories. Ready to use.
- `src/app/product-api.ts`: the service that calls the API, for you to finish.
- `src/app/product-list/`: the products page, for you to finish.
- `src/app/client.spec.ts`: tests, with a pretend API, so they need nothing running. You don't need to change these.

The requirements are in the comments at the top of `product-api.ts` and `product-list.ts`.

## Getting started

```bash
npm install
npm test
```

## What to do

1. Finish `ProductApi`.
2. Finish `ProductList`.

Run `npm test` as you go. Then start your products API (from *Exercise: Northwind Web API*) and this app (`ng serve`), and open http://localhost:4200. If your API isn't at port 5179, change `proxy.conf.json`.

## Tips

- `HttpClient` comes from `@angular/common/http`, and needs no setup: `inject(HttpClient)`, then `get<Product[]>`, `post<Product>` and `delete<void>`: each returns an observable for the component to subscribe to.
- Keep the products, a loading flag and a message in signals, and set them from `subscribe({ next, error })`.
- `[ngModel]="categoryId()" (ngModelChange)="chooseCategory($event)"` reads the select's choice and runs a method when it changes.
- After a delete or an add, update the list signal with the API's answer, rather than loading everything again.

## Hand it in

When it works, push your solution to a public repo of your own on GitHub, then paste that repo's address into **Submit your exercise** on the lesson page at [ask-codey.com](https://www.ask-codey.com). That's what completes the lesson. The lesson page shows the Git commands, step by step.
