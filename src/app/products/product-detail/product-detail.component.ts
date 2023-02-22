import { Observable, Subscription } from 'rxjs';
import { ProductService } from './../../services/product.service';
import { FavouriteService } from './../../services/favourite.service';
import { Product } from './../product.interface';
import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { slideInOutAnimation } from 'src/app/animations';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product>;

  @Output() favouriteAdded = new EventEmitter<Product>();

  constructor(
    private favouriteService: FavouriteService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  deleteProduct(id: number) {
    this.productService
        .deleteProduct(id)
        .subscribe({
           next: () => {
                console.log('Product deleted.');
                this.productService.clearCache();
                this.router.navigateByUrl("/products");
            },
           error: e => console.log('Could not delete product. ' + e.message)
          }
        );
  }

  addToFavourites(product: Product) {
    this.favouriteAdded.emit(product);
    this.favouriteService.addToFavourites(product);
    this.router.navigateByUrl('/products');
  }

  ngOnInit() {
    let id = this.route.snapshot.params["id"];
    if (id) {
        this.product$ = this.productService.getProductById(id);
    }
  }

}
