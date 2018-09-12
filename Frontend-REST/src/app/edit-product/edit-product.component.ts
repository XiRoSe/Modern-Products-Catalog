import { Component, Input, Output, EventEmitter} from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/Product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})

export class EditProductComponent {
  @Output() edit = new EventEmitter<any>(true);

  @Input() productId: number;
  @Input() product: Product;
  @Input() pName: string;
  @Input() description: string;
  @Input() cost: number;
  @Input() isEdit: boolean;

  constructor(private productsService: ProductsService) { }

// saving the edit of the product
  updateProduct() {
    this.productsService.updateProduct(this.product, this.pName, this.description, this.cost).subscribe();
  }

// telling products component whice product is in edit mode
  onEdit() {
      this.edit.emit(this.productId);
  }

// telling products component if product has finished edit mode
  editMode() {
    return this.isEdit;
  }

// changing edit val in products component
  finishEdit() {
    this.edit.emit(-1);
  }
}
