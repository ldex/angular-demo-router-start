import { Observable, EMPTY, catchError, filter, map } from 'rxjs';
import { FavouriteService } from './../../services/favourite.service';
import { ProductService } from './../../services/product.service';
import { Product } from './../product.interface';
import { Component, OnInit, OnDestroy, ViewEncapsulation, HostBinding } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { fadeInAnimation } from 'src/app/animations';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services';
import { OrderBy } from '../orderBy.pipe';
import { AsyncPipe, UpperCasePipe, JsonPipe, SlicePipe, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
    imports: [
        RouterLink,
        AsyncPipe,
        UpperCasePipe,
        JsonPipe,
        SlicePipe,
        CurrencyPipe,
        OrderBy,
    ]
})
export class ProductListComponent implements OnInit {

    title = "Products";
    products$: Observable<Product[]>;
    productsNumber$: Observable<number>;
    sorter = "-modifiedDate";
    errorMessage: string;
    message: string = "";

    pageSize: number = 5;
    start: number = 0;
    end: number = this.pageSize;
    currentPage: number = 1;

    constructor(
        private productService: ProductService,
        private favouriteService: FavouriteService,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService) { }

    ngOnInit() {
        this.products$ = this.productService.products$.pipe(filter(products => products.length > 0))
        this.productsNumber$ = this.products$.pipe(map(products => products.length))
    }

    firstPage(): void {
        this.start = 0;
        this.end = this.pageSize;
        this.currentPage = 1;
    }

    nextPage(): void {
        this.start += this.pageSize;
        this.end += this.pageSize;
        this.currentPage++;
    }

    previousPage(): void {
        this.start -= this.pageSize;
        this.end -= this.pageSize;
        this.currentPage--;
    }

    loadMore(): void {
      this.productService.loadProducts();
    }

    sortList(propertyName: string): void {
        this.sorter = this.sorter.startsWith("-") ? propertyName : "-" + propertyName;
        this.firstPage();
    }

    onSelect(product: Product): void {
        this.router.navigate(['/products', product.id], {relativeTo: this.route});
    }

    newFavourite(product: Product): void {
        this.message = `Product
                        ${product.name}
                        added to your favourites!`;
    }

    get favourites(): number {
        return this.favouriteService.getFavouritesNb();
    }

    get isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
      }


}