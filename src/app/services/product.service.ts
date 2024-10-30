import { Product } from "./../products/product.interface";
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import {
  Observable,
  BehaviorSubject,
  of,
  first,
  shareReplay,
  map,
  delay,
  filter,
  switchMap,
  mergeMap,
  tap
} from "rxjs";
import { config } from "../../environments/environment";

@Injectable()
export class ProductService {
  private baseUrl: string = `${config.apiUrl}/products`;

  private products = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.products.asObservable();
  mostExpensiveProduct$: Observable<Product>;
  pageToLoad = 1;
  productsToLoad = 10;

  constructor(private http: HttpClient) {
    this.loadProducts();
    this.initMostExpensiveProduct();
  }

  private initMostExpensiveProduct() {
    this.mostExpensiveProduct$ = this.products$.pipe(
      filter((products) => products.length != 0),
      //or skipWhile(products => products.length == 0),
      switchMap((products) =>
        of(products).pipe(
          map((products) =>
            [...products].sort((p1, p2) => (p1.price > p2.price ? -1 : 1))
          ),
          mergeMap((p) => p), // or mergeAll(),
          first() // complete!
        )
      )
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  insertProduct(newProduct: Product): Observable<Product> {
    newProduct.modifiedDate = new Date();
    return this.http.post<Product>(this.baseUrl, newProduct);
  }

  updateProduct(id: number, updatedProduct: Product): Observable<Product> {
    updatedProduct.id = id;
    updatedProduct.modifiedDate = new Date();
    return this.http.put<Product>(this.baseUrl + '/' + id, updatedProduct);
  }

  getProduct(id: number | string): Observable<Product> {
    let url: string = this.baseUrl + '/' + id;
    return this.http.get<Product>(url);
  }

  getProductById(id: number): Observable<Product> {
    return this.products$.pipe(
      mergeMap((p) => p),
      first((product) => product.id == id)
    );
  }

  loadProducts(): void {
    const params = {
      page: this.pageToLoad++,
      limit: this.productsToLoad,
      sortBy: 'modifiedDate',
      order: 'desc'
  }

    const options = {
      params: params,
    };

    this.http
      .get<Product[]>(this.baseUrl, options)
      .pipe(
        delay(500),
        shareReplay()
      )
      .subscribe(response => {
        let newProducts = response;
        let currentProducts = this.products.value;
        let mergedProducts = currentProducts.concat(newProducts);
        this.products.next(mergedProducts);
      });
  }

  clearList() {
    this.products.next([]);
    this.pageToLoad = 1;
    this.loadProducts();
  }
}
