import { Component , OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
// products list
  products: Product[];
// which product is in edit mode
  edit = -1;
// what products to show description for
  showList = [];
// carousel animation in intro;
  intro = true;

  constructor(private productsService: ProductsService) { }

// getting product list and adding it to local list
  ngOnInit() {
    this.products = [];
    this.productsService.getProducts().subscribe(products => {
      if (products.length > 0) {
        products.forEach(prod => {
            if (prod != null) {
              this.products.push(prod);
            }
          });
        }});
  }

// dividing products in view to chunks of four
  fillProducts(index: number) {
    if ((index + 4) <= this.products.length) {
      return this.products.slice(index, index + 4);
    } else {
      return this.products.slice(index, this.products.length);
    }
  }

// counting how many slides needed in view
  counter() {
    if ((this.products.length % 4) === 0) {
       return new Array(this.products.length / 4);
    } else {
      return new Array(Math.floor(this.products.length / 4) + 1);
    }
  }

// updating localy the deleted product
  deleteProductEvent(productId) {
      this.products.forEach((cur, index) => {
        if (productId === cur.id) {
          this.products.splice(index, 1);
        }
    });
  }

// telling which product user is edining for css
  editProductEvent(editVal) {
    this.edit = editVal;
  }

// pushing new product to local ist
  createProductEvent(newProduct) {
    this.products.push(newProduct);
  }

// changing classes for animation
  async paging() {
    this.intro = true;
    await setTimeout(() => this.intro = false, 1000);
  }
}
