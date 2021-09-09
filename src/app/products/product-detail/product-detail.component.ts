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
  animations: [slideInOutAnimation]
})
export class ProductDetailComponent implements OnInit {

  @HostBinding('@slideInOutAnimation') animation = true;

  @Input() product: Product;
  product$: Observable<Product>;

  @Output() favouriteAdded = new EventEmitter<Product>();

  constructor(
    private favouriteService: FavouriteService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) { }

  deleteProduct(id: number) {
    if (window.confirm('Are you sure to delete this product ?')) {
      this.productService
          .deleteProduct(id)
          .subscribe(
              () => {
                  console.log('Product deleted.');
                  this.productService.clearCache();
                  this.router.navigateByUrl("/products");
              },
              error => console.log('Could not delete product. ' + error),
              () => console.log('Delete Product Complete.')
          );
    }
  }

  addToFavourites(product: Product) {
    this.favouriteAdded.emit(product);
    this.favouriteService.addToFavourites(product);
  }

  ngOnInit() {
    this.product = this.route.snapshot.data["product"];

    this.titleService.setTitle('Product details for: ' + this.product.name);

    // let id = this.route.snapshot.params["id"];
    // if (id) {
    //     this.product$ = this.productService.getProductById(id);
    // }
  }

}
