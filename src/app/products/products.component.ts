import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/Product';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  products: Product[];
  edit = -1;
  showList = [];

  constructor(private productsService: ProductsService, public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.products = [];
    this.productsService.getProducts().subscribe(products => {
      products.forEach(prod => {
        if (prod != null) {
          this.products.push(prod);
        }
      });
    });
  }

  fillProducts(index: number) {
    if ((index + 4) <= this.products.length) {
      return this.products.slice(index, index + 4);
    } else {
      return this.products.slice(index, this.products.length);
    }
  }

  counter() {
    if ((this.products.length % 4) === 0) {
       return new Array(this.products.length / 4);
    } else {
      return new Array(Math.round(this.products.length / 4) + 1);
    }
  }

  removeProduct(product: Product) {
    if (confirm('Are you sure?')) {
      this.productsService.removeProduct(product.id).subscribe(() => {
        this.products.forEach((cur, index) => {
          if (product.id === cur.id) {
            this.products.splice(index, 1);
          }
        });
      });
    }
  }

  updateProduct(product: Product, pName: string, description: string, cost: number) {
    this.productsService.updateProduct(product, pName, description, cost).subscribe();
  }

  createProduct() {
    this.ngxSmartModalService.open('x');
  }
}
