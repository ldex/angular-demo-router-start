import { Routes } from "@angular/router";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductInsertComponent } from "./product-insert/product-insert.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductsComponent } from "./products.component";

export const productsRoutes: Routes = [
    {
      path: 'products',
      component: ProductsComponent,
      children: [
        { path: '', component: ProductListComponent },
        { path: 'insert', component: ProductInsertComponent },
        { path: ':id', component: ProductDetailComponent }
      ]
    }
  ];