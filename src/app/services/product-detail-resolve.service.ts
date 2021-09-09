import { ProductService } from './product.service';
import { Product } from './../products/product.interface';
import { Injectable }             from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, throwError }             from 'rxjs';
import { catchError } from "rxjs/operators";

@Injectable()
export class ProductDetailResolve implements Resolve<Product> {

  constructor(private ps: ProductService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product> | any {
    let id = +route.params['id'];
    return this.ps
            .getProductById(id)
            .pipe(
                catchError(
                    () => {
                        this.router.navigateByUrl('/products');
                        return throwError('Product not found!')
                    })
            );
  }

}