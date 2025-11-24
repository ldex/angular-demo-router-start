import { Component, computed, inject, input, signal, Signal } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { ProductService } from '../product-service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [UpperCasePipe, CurrencyPipe, DatePipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  protected id = input.required<number>();

  constructor() {
  }

  private productResource = rxResource({
    params: () => this.id(),
    stream: ({ params: id }) => this.productService.getProductById(id),
  });

  protected readonly product = computed(() => this.productResource.value());

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
  }
}
