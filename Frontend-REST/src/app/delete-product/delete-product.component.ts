import { Component , Input , Output , EventEmitter } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/Product';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})

export class DeleteProductComponent {
@Input() product: Product;
@Output() viewDelete = new EventEmitter<any>();


  constructor(private productsService: ProductsService, private ngxSmartModalService: NgxSmartModalService) { }

// deleting the product from webservice through service and removing it from the list at products component
  removeProduct() {
    if (confirm('Are you sure you would like to delete this Product?')) {
      this.productsService.removeProduct(this.product.id).subscribe(() => {
        this.viewDelete.emit(this.product.id);
      });
    }
  }

}
