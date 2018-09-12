import { Component, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component ({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})

export class CreateProductComponent {
  @Output() doneCreate = new EventEmitter<any>();

  constructor(private productsService: ProductsService, public ngxSmartModalService: NgxSmartModalService) { }

  // posting the new product from modal through service and adding it to the list at products component
  createProduct(sku: string, name: string, description: string, price: number) {
    this.productsService.createProduct(sku, name, description, price).subscribe((product) => {
      this.doneCreate.emit(product);
    });
  }
}
